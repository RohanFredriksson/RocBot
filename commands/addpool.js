const { SlashCommandBuilder } = require('@discordjs/builders');
const { reply } = require('../util.js');
const { getPool, addPool } = require('../song-pool.js');
const database = require('../database.js');
const util = require('../util.js');

const name = 'addpool';
const description = 'Create a new song pool for your profile!';
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
                    .setDescription("Enter a pool name for the new pool.")
                    .setRequired(true)
                )
            ],

    async execute(interaction, args, client, userData) {

        const id = getUserId(interaction);
    
        if (args.length < 1) {
            reply(interaction, 'Not enough arguments!');
            return;
        }

        poolName = args[0].toLowerCase();

        if (getPool(poolName, userData) != null) {
            reply(interaction, 'Pool already exists! Pools can not have the same name.');
            return;
        }

        addPool(poolName, userData);
        database.updateUser(id, userData);

        reply(interaction, 'Pool \"' + util.capitalizeFirstLetter(poolName) + '\" created!');

	}

};