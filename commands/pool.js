const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { titleCase } = require('./../util.js');

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

    async execute(interaction, command, args, client, user, audioPlayerManager) {

        if (args.length < 1) {
            interaction.send('🚫 **|** Not enough arguments! Please enter a song pool name')
            return;
        }
        
        pool = user.getPool(user.getPoolNameFromArgs(args));

        if (pool == null) {
            interaction.send('🚫 **|** Pool does not exist!')
            return;
        }

        const embed = new EmbedBuilder()
            .setColor('FFA500')
            .setTitle(`${titleCase(pool.name)}`);

        songs = pool.songs;

        if (songs.length == 0) {
            embed.setDescription('Hmm, this seems to be empty.');
            interaction.send({embeds: [embed]});
            return;
        }

        list = '';
        for (i = 0; i < songs.length; i++) {list = list + `**${i+1}.** [${songs[i].title}](${songs[i].url})\n`;}
        embed.setDescription(list);
        interaction.send({embeds: [embed]});

	}

};