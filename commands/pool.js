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

    async execute(interaction, command, args, client, user, musicPlayer) {

        if (args.length < 1) {
            interaction.send('Not enough arguments!')
            return;
        }

        poolName = args[0].toLowerCase();
        pool = user.getPool(poolName);

        if (pool == null) {
            interaction.send('Pool does not exist!')
            return;
        }

        list = '';

        songs = pool.songs;
        for (var [key, value] of songs.entries()) {
            list = list + value.title + '\n';
        }

        interaction.send(list)

	}

};