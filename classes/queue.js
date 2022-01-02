const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { Song } = require('./song');

module.exports = {

    Queue: class Queue {

        constructor() {
            this.songs = [];
        }

        getNext() {

            if (this.songs.length == 0) {
                return null;
            }

            return this.songs.shift();

        }

        clear() {
            this.songs = [];
        }

        async addSong(searchTerms) {
            this.songs.push(await Queue.getSong(searchTerms));
        }

        async removeSong(searchTerms) {

            var url = await Queue.getUrl(searchTerms);
            for (var i = 0; i < this.songs.length; i++) {
                
                if (this.songs[i].url == url) {
                    this.songs.splice(i, 1);
                    return;
                }

            }

        }

        static async getUrl(searchTerms) {

            if (ytdl.validateURL(searchTerms)) {

                var songInfo = await ytdl.getInfo(searchTerms);
                return songInfo.videoDetails.video_url;

            } else {

                var video = await Queue.videoFinder(searchTerms.join(' '));
                if (video) {
                    return video.url;
                } 
                return null;

            }

        }

        static async videoFinder(query) {
            var videoResult = await ytSearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        static async getSong(searchTerms) {

            if (ytdl.validateURL(searchTerms)) {

                var songInfo = await ytdl.getInfo(searchTerms);
                return new Song(songInfo.videoDetails.title, songInfo.videoDetails.video_url);

            } else {

                var video = await Queue.videoFinder(searchTerms.join(' '));
                if (video) {
                    return new Song(video.title, video.url);
                } 
                return null;

            }

        }

    }

}