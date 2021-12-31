const { SlashCommandBuilder } = require('@discordjs/builders');
const { send, reply } = require('./../util.js');
const { getPool, removePool } = require('./../song-pool.js');
const database = require('./../database.js');
const util = require('./../util.js');

const name = 'deletepool';
const description = 'Remove a song pool for your profile!';
const aliases = [];
const operatorOnly = false;

module.exports = {

    name: name,
    description: description,
    aliases: aliases,
	operatorOnly: operatorOnly,

	data: new SlashCommandBuilder()
			    .setName(name)
			    .setDescription(description)
                .addStringOption(option =>
                    option.setName("pool")
                    .setDescription("Enter the pool name that you wish to remove.")
                    .setRequired(true)
                ),

	async execute(interaction, args, id, userData) {

        if (args.length < 1) {
            reply(interaction, 'Not enough arguments!');
            return;
        }

        poolName = args[0].toLowerCase();

        if (getPool(poolName, userData) == null) {
            reply(interaction, 'Pool does not exist!');
            return;
        }

        removePool(poolName, userData);
        database.updateUser(id, userData);

        reply(interaction, 'Pool \"' + util.capitalizeFirstLetter(poolName) + '\" removed!');
        return;

	}

};