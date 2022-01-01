const { SlashCommandBuilder } = require('@discordjs/builders');
const { reply, getUserId, getGuildId } = require('../util.js');
const { getPool } = require('../song-pool.js');
const database = require('../database.js');
const util = require('../util.js');

const name = 'play';
const description = 'Play a song or play a song pool!';
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
                    .setDescription("Enter the pool name that you wish to remove.")
                    .setRequired(true)
                )
            ],

    async execute(interaction, args, client, userData) {

        const userId = getUserId(interaction);
		const guildId = getGuildId(interaction);

		const guild = client.guilds.cache.get(guildId);
		const member = guild.members.cache.get(userId);
		const voiceChannel = member.voice.channel;

        console.log(voiceChannel);

        reply(interaction, 'Not implemented yet!');
        return;

	}

};