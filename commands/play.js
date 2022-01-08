const { SlashCommandBuilder } = require('@discordjs/builders');
const { titleCase } = require('./../util.js');

const name = 'play';
const description = 'Play songs and queue song pools!';
const aliases = ['p','playsong','playpool'];
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
                    .addChoice("shuffled", "shuffled")
                    .addChoice("ordered", "ordered")
                )
            ],

	async execute(interaction, command, args, client, user, audioPlayerManager) {

        if (args.length < 1) {
            interaction.send('🚫 **|** Not enough arguments! Please specify a song or pool');
            return;
        }

        channel = interaction.getVoiceChannel();

        if (channel == null) {
            interaction.send('🚫 **|** To use this command, I must be in a voice channel!');
            return;
        }   

        guildId = interaction.getGuildId();

        // Create a new audio player if one doesn't exist.
        if (!audioPlayerManager.hasPlayer(guildId)) {
            audioPlayerManager.createPlayer(guildId, channel, interaction);
        } 
        
        // Update the channel and interaction objects in the audio player if it exists.
        else {
            audioPlayerManager.updatePlayer(guildId, channel, interaction);
        }

        audioPlayer = audioPlayerManager.getPlayer(guildId);

        // Check if the user entered a pool name, set the pool.
        if (user.hasPool(args[0].toLowerCase())) {

            poolName = args[0].toLowerCase();
            interaction.send(`🎶 **|** Now playing from pool **${titleCase(poolName)}**`);

            if (args[args.length-1].toLowerCase() == 'ordered') {
                audioPlayer.setShuffle(false);
            } else {
                audioPlayer.setShuffle(true);
            }

            audioPlayer.setPool(user.getPool(poolName));
            return;

        }

        await audioPlayer.addSong(args);

	}

};