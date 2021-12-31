const { SlashCommandBuilder } = require('@discordjs/builders');
const { send, reply } = require('./../util.js');
const { getPool, addPool, removePool } = require('./../song-pool.js');
const database = require('../database.js');
const util = require('./../util.js');

const name = 'pool';
const description = 'Add or remove song pools!';
const aliases = [];
const operatorOnly = false;

const invalidPoolNames = ['create', 'delete'];

module.exports = {

    name: name,
    description: description,
    aliases: aliases,
	operatorOnly: operatorOnly,

	data: new SlashCommandBuilder()
			    .setName('pool')
			    .setDescription('Replies with Pong!')
                .addStringOption(option =>
                    option.setName("mode")
                    .setDescription("Create or Delete. Enter a pool name to see more details.")
                    .setRequired(true)
                    .addChoice("create", "create")
                    .addChoice("delete", "delete")
                )
                .addStringOption(option =>
                    option.setName("pool")
                    .setDescription("Pool name.")
                ),

	async execute(interaction, args, id, userData) {

        if (args.length < 1) {
            reply(interaction, 'Not enough arguments!');
            return;
        }

        mode = args[0].toLowerCase();

        if (mode == 'create') {

            if (args.length < 2) {
                reply(interaction, 'Not enough arguments!');
                return;
            }

            poolname = args[1].toLowerCase();

            if (getPool(poolname, userData) != null) {
                reply(interaction, 'Pool already exists! Pools can not have the same name.');
                return;
            }

            if (invalidPoolNames.includes(poolname)) {
                reply(interaction, 'Invalid pool name! Please try another name.');
                return;
            }

            addPool(poolname, userData);
            database.updateUser(id, userData);

            reply(interaction, 'Pool \"' + util.capitalizeFirstLetter(poolname) + '\" created!');
            return;

        }

        else if (mode == 'delete') {
            
            if (args.length < 2) {
                reply(interaction, 'Not enough arguments!');
                return;
            }

            poolname = args[1].toLowerCase();

            if (getPool(poolname, userData) == null) {
                reply(interaction, 'Pool does not exist!');
                return;
            }

            removePool(poolname, userData);
            database.updateUser(id, userData);

            reply(interaction, 'Pool \"' + util.capitalizeFirstLetter(poolname) + '\" removed!');
            return;

        }

        else {
            reply(interaction, 'Not implemented yet!');
            return;
        }

	}

};