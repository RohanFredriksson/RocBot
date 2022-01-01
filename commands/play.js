const { SlashCommandBuilder } = require('@discordjs/builders');
const { reply, titleCase } = require('./../util.js');

const name = 'play';
const description = 'Play songs and queue song pools!';
const aliases = ['playsong','playpool'];
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
                    .addChoice("ordered", "ordered")
                    .addChoice("random", "random")
                )

            ],

	async execute(interaction, command, args, client, user) {

	}

};