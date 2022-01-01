const { SlashCommandBuilder } = require('@discordjs/builders');
const { reply, getId, getGuildId, getUserId } = require('./../util.js');

const name = 'ping';
const description = 'Replies with Pong';
const aliases = [];
const operatorOnly = false;

module.exports = {

    name: name,
    description: description,
    aliases: aliases,
	operatorOnly: operatorOnly,

	data: 	[
				new SlashCommandBuilder()
				.setName(name)
				.setDescription(description)
			],

	async execute(interaction, args, client, userData) {

		const userId = getUserId(interaction);
		const guildId = getGuildId(interaction);

		const guild = client.guilds.cache.get(guildId);
		const member = guild.members.cache.get(userId);
		const voiceChannel = member.voiceChannel;

		console.log(voiceChannel);

		//console.log(client.guilds.cache.get(interaction.guild_id));

		await reply(interaction, 'Pong!');
	}

};