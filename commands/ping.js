const { SlashCommandBuilder } = require('@discordjs/builders');
const { send, reply } = require('./../util.js');

const name = 'ping';
const description = 'Replies with Pong';
const aliases = [];
const operatorOnly = false;

module.exports = {

    name: name,
    description: description,
    aliases: aliases,
	operatorOnly: operatorOnly,

	data: new SlashCommandBuilder()
			  .setName('ping')
			  .setDescription('Replies with Pong!'),

	async execute(interaction, args, id, userData) {
		await reply(interaction, 'Pong!');
	}

};