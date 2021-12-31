const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');

const { reply } = require('./../util.js');
const { getPool, removeSongFromPool, hasSongInPool } = require('./../song-pool.js');
const database = require('../database.js');
const util = require('./../util.js');
const { videoFinder } = require('./../youtube.js');

const name = 'removesong';
const description = 'Remove songs from pools!';
const aliases = [];
const operatorOnly = false;

module.exports = {

    name: name,
    description: description,
    aliases: aliases,
	operatorOnly: operatorOnly,

	data: new SlashCommandBuilder()
			    .setName(name)
			    .setDescription(description)
                .addStringOption(option =>
                    option.setName("pool")
                    .setDescription("Enter a pool name to remove a song from.")
                    .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("query")
                    .setDescription("Enter search terms or a YouTube URL.")
                    .setRequired(true)
                ),

	async execute(interaction, args, id, userData) {

        if (args.length < 1) {
            reply(interaction, 'No song pool provided! Please specify a song pool to remove a song from.');
            return;
        }

        if (args.length < 2) {
            reply(interaction, 'No song provided! To remove a song please enter some search terms or a YouTube link.');
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

        if (!hasSongInPool(poolName, song.title, userData)) {
            reply(interaction, 'Song "' + song.title + '" is not in pool "' + util.capitalizeFirstLetter(poolName) + '"');
            return;
        }

        removeSongFromPool(poolName, song.url, userData);
        database.updateUser(id, userData);
        reply(interaction, 'Song "' + song.title + '" was successfully remove from pool "' + util.capitalizeFirstLetter(poolName) + '"');

	}

};