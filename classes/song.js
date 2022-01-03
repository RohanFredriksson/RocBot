const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {

    Song: class Song {

        constructor(title, url) {
            this.title = title;
            this.url = url;
        }

        static parse(str) {
            var json = JSON.parse(str);
            return new Song(json.title, json.url);
        }

        static async videoFinder(searchTerms) {
            var videoResult = await ytSearch(searchTerms);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        static async getSong(searchTerms) {

            if (ytdl.validateURL(searchTerms)) {

                var songInfo = await ytdl.getInfo(searchTerms);
                return new Song(songInfo.videoDetails.title, songInfo.videoDetails.video_url);

            } else {

                var video = await Song.videoFinder(searchTerms.join(' '));
                if (video) {
                    return new Song(video.title, video.url);
                } 
                return null;

            }

        }

        static async getUrl(searchTerms) {
            
            if (ytdl.validateURL(searchTerms)) {

                var songInfo = await ytdl.getInfo(searchTerms);
                return songInfo.videoDetails.video_url;

            } else {

                var video = await Song.videoFinder(searchTerms.join(' '));
                if (video) {
                    return video.url
                } 
                return null;

            }

        }

    }

}