const { SlashCommandBuilder } = require('@discordjs/builders');
const { reply, capitalizeFirstLetter } = require('./../util.js');

const name = 'addsong';
const description = 'Add songs to pools!';
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
                    .setDescription("Enter a pool name to add a song to.")
                    .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("query")
                    .setDescription("Enter search terms or a YouTube URL.")
                    .setRequired(true)
                )
            ],

	async execute(interaction, args, client, user) {

        const id = user.id;

        if (args.length < 1) {
            reply(interaction, 'No song pool provided! Please specify a song pool to add a song in.');
            return;
        }

        if (args.length < 2) {
            reply(interaction, 'No song provided! To add a song please enter some search terms or a YouTube link.');
            return;
        }

        poolName = args.shift().toLowerCase();
        pool = user.getPool(poolName);

        if (pool == null) {
            reply(interaction, 'Pool "' + capitalizeFirstLetter(poolName) + '" could not be found.');
            return;
        }

        if (await pool.hasSong(args)) {

            song = await pool.getSong(args)
            title = song.title;

            reply(interaction, 'Song "' + title + '" is already in pool "' + capitalizeFirstLetter(poolName) + '"');
            return;
        }

        await pool.addSong(args);

        song = await pool.getSong(args)
        title = song.title;
        user.save();

        reply(interaction, 'Song "' + title + '" was successfully added to pool "' + capitalizeFirstLetter(poolName) + '"');

	}

};