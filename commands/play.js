const { SlashCommandBuilder } = require('@discordjs/builders');
const { titleCase } = require('./../util.js');

const name = 'play';
const description = 'Play songs and queue song pools!';
const aliases = ['playsong','playpool','join'];
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
                )
                .addStringOption(option =>
                    option.setName('query')
                    .setDescription("Enter search terms or a YouTube URL.")
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
                    .addChoice("random", "random")
                    .addChoice("ordered", "ordered")
                )
            ],

	async execute(interaction, command, args, client, user, audioPlayerManager) {

        if (args.length < 1) {
            interaction.send('Not enough arguments! Please specify a song or pool.');
            return;
        }

        channel = interaction.getVoiceChannel();

        if (channel == null) {
            interaction.send('Please join a voice channel to play a song!');
            return;
        }   

        interaction.defer();
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
            audioPlayer.setPool(user.getPool(poolName));
            
            interaction.send(`Now playing from pool "${titleCase(poolName)}".`);
            return;

        }

        await audioPlayer.addSong(args);

	}

};