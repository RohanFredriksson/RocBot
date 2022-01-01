const { SlashCommandBuilder } = require('@discordjs/builders');
const { reply, titleCase } = require('./../util.js');

const name = 'removesong';
const description = 'Remove songs from existing pools!';
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
                    .setDescription("Enter a pool name that you wish to remove a song from.")
                    .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("query")
                    .setDescription("Enter search terms or a YouTube URL for the song name.")
                    .setRequired(true)
                )
            ],

	async execute(interaction, command, args, client, user) {

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
            reply(interaction, 'Pool "' + titleCase(poolName) + '" could not be found.');
            return;
        }

        if (await !pool.hasSong(args)) {
            reply(interaction, 'Song requested is not in pool "' + titleCase(poolName) + '"');
            return;
        }

        song = await pool.getSong(args)
        title = song.title;

        await pool.removeSong(args);
        user.save();

        reply(interaction, 'Song "' + title + '" was successfully removed from pool "' + titleCase(poolName) + '"');

	}

};