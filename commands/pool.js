const { SlashCommandBuilder } = require('@discordjs/builders');
const { reply, titleCase } = require('../util.js');

const name = 'pool';
const description = 'List all the songs in a pool on your profile!';
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
                    option.setName("name")
                    .setDescription("Enter a song pool to list.")
                    .setRequired(true)
                )
            ],

    async execute(interaction, command, args, client, user) {

        if (args.length < 1) {
            reply(interaction, 'Not enough arguments!');
            return;
        }

        poolName = args[0].toLowerCase();
        pool = user.getPool(poolName);

        if (pool == null) {
            reply(interaction, 'Pool does not exist!');
            return;
        }

        list = '';

        songs = pool.songs;
        for (var [key, value] of songs.entries()) {
            list = list + value.title + '\n';
        }

        reply(interaction, list);

	}

};