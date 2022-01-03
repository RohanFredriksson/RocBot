const { SlashCommandBuilder } = require('@discordjs/builders');
const { reply, titleCase, deferReply } = require('./../util.js');

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

	async execute(interaction, command, args, client, user, musicPlayer) {

        const id = user.id;

        if (args.length < 1) {
            interaction.send('No song pool provided! Please specify a song pool to add a song in.');
            return;
        }

        if (args.length < 2) {
            interaction.send('No song provided! To add a song please enter some search terms or a YouTube link.');
            return;
        }

        interaction.defer();

        poolName = args.shift().toLowerCase();
        pool = user.getPool(poolName);

        if (pool == null) {
            interaction.send('Pool "' + titleCase(poolName) + '" could not be found.');
            return;
        }

        if (await pool.hasSong(args)) {

            song = await pool.getSong(args)
            title = song.title;

            interaction.send('Song "' + title + '" is already in pool "' + titleCase(poolName) + '"')
            return;
        }

        await pool.addSong(args);

        song = await pool.getSong(args)
        
        if (song === undefined) {
            return;
        }

        title = song.title;
        user.save();

        interaction.send('Song "' + title + '" was successfully added to pool "' + titleCase(poolName) + '"')

	}

};