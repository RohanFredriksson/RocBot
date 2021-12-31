const { SlashCommandBuilder } = require('@discordjs/builders');
const { send, reply } = require('./../util.js');

const name = 'pool';
const description = 'Add or remove song pools!';
const aliases = [];
const operatorOnly = false;

module.exports = {

    name: name,
    description: description,
    aliases: aliases,
	operatorOnly: operatorOnly,

	data: new SlashCommandBuilder()
			    .setName('pool')
			    .setDescription('Replies with Pong!')
                .addStringOption(option =>
                    option.setName("device")
                      .setDescription("Some argument")
                      .setRequired(true)
                      .addChoice("Arg A", "A")
                      .addChoice("Arg B", "B")
                  ),

	async execute(interaction, args, id, userData) {
		await reply(interaction, 'Pong!');
	}

};