const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');

const { reply } = require('./../util.js');
const { getPool, addSongToPool, hasSongInPool } = require('./../song-pool.js');
const database = require('../database.js');
const util = require('./../util.js');
const { videoFinder } = require('./../youtube.js');

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

	async execute(interaction, args, client, userData) {

        const id = getUserId(interaction);

        if (args.length < 1) {
            reply(interaction, 'No song pool provided! Please specify a song pool to add a song in.');
            return;
        }

        if (args.length < 2) {
            reply(interaction, 'No song provided! To add a song please enter some search terms or a YouTube link.');
            return;
        }

        poolName = args.shift().toLowerCase();
        if (getPool(poolName, userData) == null) {
            reply(interaction, 'Pool "' + util.capitalizeFirstLetter(poolName) + '" could not be found.');
            return;
        }

        song = {};
        if (ytdl.validateURL(args[0])) {

            const songInfo = await ytdl.getInfo(args[0]);
            song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url };

        } else {

            const video = await videoFinder(args.join(' '));

            if (video) {
                song = {title: video.title, url: video.url};
            } else {
                reply(interaction, 'Could not find the requested video');
                return;
            }

        }

        if (hasSongInPool(poolName, song.title, userData)) {
            reply(interaction, 'Song "' + song.title + '" is already in pool "' + util.capitalizeFirstLetter(poolName) + '"');
            return;
        }

        addSongToPool(poolName, song, userData);
        database.updateUser(id, userData);
        reply(interaction, 'Song "' + song.title + '" was successfully added to pool "' + util.capitalizeFirstLetter(poolName) + '"');

	}

};