const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { Song } = require('./song');
const { getRandomInt } = require('./../util.js');

module.exports = {

    Pool: class Pool {

        constructor(name, songs) {
            
            if (songs === undefined) {
                songs = new Map();
            }
            
            this.name = name;
            this.songs = songs;

        }

        clear() {
            this.songs = new Map();
        }

        getRandomSong() {

            if (this.songs.size == 0) {
                return null;
            }

            if (this.songs.size == 1) {
                var song = this.getSongList()[0];
                return song;
            }

            var song = this.getSongList()[getRandomInt(0,this.songs.size)];
            return song;

        }

        getSongList() {

            var list = [];
            for (var song of this.songs.keys()) {
                list.push(this.songs.get(song));
            }

            return list;

        }

        async hasSong(searchTerms) {

            var url = await Pool.getUrl(searchTerms);
            return this.songs.has(url);

        }

        async getSong(searchTerms) {

            var url = await Pool.getUrl(searchTerms);
            return this.songs.get(url);

        }

        async addSong(searchTerms) {
            
            if (await this.hasSong(searchTerms)) {
                return;
            }

            this.songs.set(await Pool.getUrl(searchTerms), await Pool.getSong(searchTerms));

        }

        async removeSong(searchTerms) {

            var url = await Pool.getUrl(searchTerms);
            this.songs.delete(url);

        }
    
        static parse(str) {
            
            var json = JSON.parse(str);

            var newSongs = new Map();
            Object.keys(json.songs).forEach(song => {
                newSongs.set(json.songs[song].url, Song.parse(JSON.stringify(json.songs[song])));
            });

            return new Pool(json.name, newSongs);
        }

        stringify() {
                
            var songString = `{`;
            for (var [key, value] of this.songs.entries()) {
                songString = songString + `"${key}":${this.songs.get(key).stringify()},`;
            }

            if (this.songs.size > 0) {
                songString = songString.slice(0, -1);
            }

            songString = songString + '}';

            return `{"name":"${this.name}","songs":${songString}}`;

        }

        static async videoFinder(query) {
            var videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        static async getUrl(searchTerms) {

            if (ytdl.validateURL(searchTerms)) {

                var songInfo = await ytdl.getInfo(searchTerms);
                return songInfo.videoDetails.video_url;

            } else {

                var video = await Pool.videoFinder(searchTerms.join(' '));
                if (video) {
                    return video.url;
                } 
                return null;

            }

        }

        static async getSong(searchTerms) {

            if (ytdl.validateURL(searchTerms)) {

                var songInfo = await ytdl.getInfo(searchTerms);
                return new Song(songInfo.videoDetails.title, songInfo.videoDetails.video_url);

            } else {

                var video = await Pool.videoFinder(searchTerms.join(' '));
                if (video) {
                    return new Song(video.title, video.url);
                } 
                return null;

            }

        }
    
    }

}

