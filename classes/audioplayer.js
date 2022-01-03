const { createAudioPlayer, NoSubscriberBehavior, AudioPlayerStatus } = require("@discordjs/voice")
const { Connection } = require('./connection.js');
const { SongHandler } = require('./songhandler.js');

const ytdl = require('ytdl-core');

module.exports = {

    AudioPlayer: class AudioPlayer {

        constructor(channel) {

            this.connection = new Connection(channel);
            this.songHandler = new SongHandler();

            this.joined = false;

            this.audioPlayer = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                }
            });

            this.audioPlayer.on('error', error => {
                console.error(error);
            });

            this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
                this.audioPlayer.skip();
            })

        }

        join() {    
            this.connection.join();
            this.joined = true;
        }

        disconnect() {
            this.connection.disconnect();
            this.joined = false;
        }

        play(url) {
            const stream = ytdl(url, { filter: 'audioonly' })
            const resource = createAudioResource(stream);
            this.player.play(resource);
        }

        pause() {
            this.audioPlayer.pause();
        }

        unpause() {
            this.audioPlayer.unpause();
        }

        skip() {

            var song = this.songHandler.getNext();
            
            if (song == null) {
                this.disconnect();
                return;
            }

            this.unpause();
            this.audioPlayer.play(song.url);

        }

        async addSong(searchTerms) {
            this.songHandler.addSong(searchTerms);
        }

    }

}