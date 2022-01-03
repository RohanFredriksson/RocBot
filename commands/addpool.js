const { SlashCommandBuilder } = require('@discordjs/builders');
const { titleCase } = require('../util.js');

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

    async execute(interaction, command, args, client, user, audioPlayerManager) {

        const id = user.id;
    
        if (args.length < 1) {
            interaction.send('🚫 **|** Not enough arguments! Please enter a name for the new song pool');
            return;
        }

        pool = args[0].toLowerCase();

        if (user.hasPool(pool)) {
            interaction.send('🚫 **|** Song pool already exists! Song pools can not have the same name');
            return;
        }

        user.addPool(pool);
        user.save();

        interaction.send(`✅ **|** Pool **${titleCase(pool)}** created!`)

	}

};