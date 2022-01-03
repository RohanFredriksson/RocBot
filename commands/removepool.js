const { SlashCommandBuilder } = require('@discordjs/builders');
const { titleCase } = require('../util.js');

const name = 'removepool';
const description = 'Remove an existing song pool for your profile!';
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
                    .setDescription("Enter the pool name of the pool you wish to remove.")
                    .setRequired(true)
                )
            ],

    async execute(interaction, command, args, client, user, audioPlayerManager) {

        const id = user.id;
    
        if (args.length < 1) {
            interaction.send('🚫 **|** Not enough arguments! Please specify the name of the song pool you wish to remove');
            return;
        }

        pool = args[0].toLowerCase();

        if (!user.hasPool(pool)) {
            interaction.send('🚫 **|** Pool does not exist! Nothing happened')
            return;
        }

        user.removePool(pool);
        user.save();

        interaction.send(`🗑️ **|** Pool **${titleCase(pool)}** was successfully removed!`);

	}

};