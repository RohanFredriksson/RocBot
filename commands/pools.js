const { SlashCommandBuilder } = require('@discordjs/builders');

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
        pools.forEach(pool => {
            list = list + pool.name + '\n';
        });

        interaction.send(list);

	}

};