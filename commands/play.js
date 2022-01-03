const { SlashCommandBuilder } = require('@discordjs/builders');
const { Connection } = require('./../classes/connection.js');

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

	async execute(interaction, command, args, client, user, musicPlayer) {

        channel = interaction.getVoiceChannel();
        
        if (channel == null) {
            return;
        }

        conn = new Connection(channel);
        conn.join();

        const { createAudioPlayer, NoSubscriberBehavior, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            }
        });

        const ytdl = require('ytdl-core');
        stream = ytdl("https://www.youtube.com/watch?v=6ONRf7h3Mdk&ab_channel=TravisScottVEVO", { filter: 'audioonly' })
        resource = createAudioResource(stream);
        
        conn.subscribe(player);
        player.play(resource);

        //setTimeout(() => {conn.disconnect()}, 10000);


	}

};