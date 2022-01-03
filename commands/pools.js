const { SlashCommandBuilder } = require('@discordjs/builders');
const { reply, titleCase } = require('../util.js');

const name = 'pools';
const description = 'List all the pool on your profile!';
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
            ],

    async execute(interaction, command, args, client, user, musicPlayer) {

        list = '';

        pools = user.pools;
        for (var [key, value] of pools.entries()) {
            list = list + key + '\n';
        }

        interaction.send(list);

	}

};