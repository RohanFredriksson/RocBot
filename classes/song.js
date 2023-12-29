const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { PassThrough } = require('stream');

module.exports = {

    Song: class Song {

        constructor(title, url) {
            this.title = title;
            this.url = url;
        }

        static parse(str) {
            const json = JSON.parse(str);
            return new Song(json.title, json.url);
        }

        static async videoFinder(searchTerms) {
            const videoResult = await ytSearch(searchTerms);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        static async getSong(searchTerms) {

            // If the list is empty return
            if (searchTerms.length == 0) {return null;}

            // See if we have been given a youtube link.
            if (ytdl.validateURL(searchTerms[0])) {
                const songInfo = await ytdl.getInfo(searchTerms[0]);
                return new Song(songInfo.videoDetails.title, songInfo.videoDetails.video_url);
            } 

            // Look up the search terms.
            const video = await Song.videoFinder(searchTerms.join(' '));
            if (video) {return new Song(video.title, video.url);} 
            return null;

        }

        static async getUrl(searchTerms) {
            
            // If the list is empty return
            if (searchTerms.length == 0) {return null;}

            // See if we have been given a youtube link.
            if (ytdl.validateURL(searchTerms[0])) {
                const songInfo = await ytdl.getInfo(searchTerms[0]);
                return songInfo.videoDetails.video_url;
            } 

            // Look up the search terms.
            const video = await Song.videoFinder(searchTerms.join(' '));
            if (video) {return video.url} 
            return null;

        }

        async getStream() {

            const stream = new PassThrough();

            const info = await ytdl.getInfo(this.url);
            const format = ytdl.chooseFormat(info.formats, {
                filter: "audioonly",
                quality: "highestaudio"
            });
            const options = { lang: "en" };
            const chunkSize = 512 * 1024;
            
            let current = -1;
            const contentLength = Number(format.contentLength);

            if (contentLength < chunkSize) {
                ytdl.downloadFromInfo(info, {format, ...options})
                .on("error", er => stream.emit("error", er))
                .pipe(stream);
            }

            else {

                const pipeNextStream = () => {
                    
                    current++;
                    let end = chunkSize * (current + 1) - 1;
                    
                    if (end >= contentLength) {
                        end = undefined;
                    }

                    const nextStream = ytdl.downloadFromInfo(info, {format, ...options, range: {
                        start: chunkSize * current, end
                    }});

                    nextStream
                    .on("error", er => stream.emit("error", er))
                    .pipe(stream, {end: end === undefined});

                    if (end !== undefined) {
                        nextStream.on("end", () => {
                            pipeNextStream();
                        });
                    }

                };

                pipeNextStream();

            }

            return stream;

        }

    }

}