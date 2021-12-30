const { SlashCommandBuilder } = require('@discordjs/builders');

const name = 'ping';
const description = 'Replies with Pong';
const aliases = [];
const operatorOnly = true;

module.exports = {

    name: name,
    description: description,
    aliases: aliases,
	operatorOnly: operatorOnly,

	data: new SlashCommandBuilder()
			  .setName('ping')
			  .setDescription('Replies with Pong!'),

	async execute(interaction, args) {
		await interaction.reply('Pong!');
	}

};