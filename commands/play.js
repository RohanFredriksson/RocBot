const { SlashCommandBuilder } = require('@discordjs/builders');
const { titleCase } = require('./../util.js');
const ytpl = require('ytpl');

const name = 'play';
const description = 'Play songs and queue song pools!';
const aliases = ['p','playsong','playpool','playlist'];
const operatorOnly = false;

module.exports = {

    name: name,
    description: description,
    aliases: aliases,
	operatorOnly: operatorOnly,

	data:   [
                new SlashCommandBuilder()
			    .setName('playsong')
			    .setDescription('Play a song.')
                .addStringOption(option =>
                    option.setName("song")
                    .setDescription("Enter a song to play.")
                    .setRequired(true)
                ),
                new SlashCommandBuilder()
			    .setName('playpool')
			    .setDescription('Play a pool of songs.')
                .addStringOption(option =>
                    option.setName("pool")
                    .setDescription("Enter a song pool to play.")
                    .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("order")
                    .setDescription("Choose whether the songs should be played in chronological order or randomly picked.")
                    .addChoices(
                        {name: "shuffled", value: "shuffled"},  
                        {name: "ordered", value: "ordered"},  
                    )
                ),
                new SlashCommandBuilder()
			    .setName('playlist')
			    .setDescription('Play a YouTube playlist.')
                .addStringOption(option =>
                    option.setName("url")
                    .setDescription("Enter a YouTube playlist url.")
                    .setRequired(true)
                ),
            ],

	async execute(interaction, command, args, client, user, audioPlayerManager) {

        if (args.length < 1) {
            interaction.send('🚫 **|** Not enough arguments! Please specify a song or pool');
            return;
        }

        guildId = interaction.getGuildId();
        channel = interaction.getVoiceChannel();

        if (channel == null) {interaction.send('🚫 **|** To use this command, you must be in a voice channel!'); return;}
        if (!audioPlayerManager.hasPlayer(interaction.getGuildId())) {audioPlayerManager.createPlayer(guildId, channel, interaction);}
        audioPlayerManager.updatePlayer(guildId, channel, interaction);
        audioPlayer = audioPlayerManager.getPlayer(guildId);

        orderedAliases = ['ordered', 'order'];
        shuffleAliases = ['shuffled', 'random', 'shuffle'];

        ordered = false;
        if (orderedAliases.includes(args[args.length-1])) {args.pop(); ordered = true;} 
        else if (shuffleAliases.includes(args[args.length-1])) {args.pop();}

        // Check if the user entered a pool name, set the pool.
        if (user.hasPool(args.join(' ')) && command != 'playsong') {
            poolName = args.join(' ');
            interaction.send(`🎶 **|** Now playing from pool **${titleCase(poolName)}**`);
            audioPlayer.setShuffle(ordered);
            audioPlayer.setPool(user.getPool(poolName));
            return;
        }

        if (command == 'playpool') {
            interaction.send(`🚫 **|** Could not find specified pool.`);
            return;
        }

        // If the user entered a playlist.
        if (await ytpl.validateID(args[0])) {
            await audioPlayer.queuePlaylist(args[0]);
            return;
        }

        await audioPlayer.addSong(args);

	}

};