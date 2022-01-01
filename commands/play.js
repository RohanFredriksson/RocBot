const { SlashCommandBuilder } = require('@discordjs/builders');
const { reply, getId } = require('../util.js');
const { getPool, removePool } = require('../song-pool.js');
const database = require('../database.js');
const util = require('../util.js');

const name = 'play';
const description = 'Play a song or play a song pool!';
const aliases = [];
const operatorOnly = false;

module.exports = {

    name: name,
    description: description,
    aliases: aliases,
	operatorOnly: operatorOnly,

	data:   [    
                new SlashCommandBuilder()
			    .setName(name)
			    .setDescription(description)
                .addStringOption(option =>
                    option.setName("pool")
                    .setDescription("Enter the pool name that you wish to remove.")
                    .setRequired(true)
                )
            ],

    async execute(interaction, args, client, userData) {

        const id = getUserId(interaction);

        reply(interaction, 'Not implemented yet!');
        return;

	}

};