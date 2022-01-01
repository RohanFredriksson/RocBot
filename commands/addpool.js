const { SlashCommandBuilder } = require('@discordjs/builders');
const { reply, titleCase } = require('../util.js');

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

    async execute(interaction, args, client, user) {

        const id = user.id;
    
        if (args.length < 1) {
            reply(interaction, 'Not enough arguments!');
            return;
        }

        pool = args[0].toLowerCase();

        if (user.hasPool(pool)) {
            reply(interaction, 'Pool already exists! Pools can not have the same name.');
            return;
        }

        user.addPool(pool);
        user.save();

        reply(interaction, 'Pool \"' + titleCase(pool) + '\" created!');

	}

};