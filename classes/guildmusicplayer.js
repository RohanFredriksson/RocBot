const { Connection } = require('./connection.js');
const { AudioPlayer } = require('./audioplayer.js');
const { SongHandler } = require('./songhandler.js');
const { AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {

    GuildMusicPlayer: class GuildMusicPlayer {

        constructor(channel) {

            this.connection = new Connection(channel);
            this.audioPlayer = new AudioPlayer();
            this.songHandler = new SongHandler();

            this.audioPlayer.player.on(AudioPlayerStatus.Idle, () => {
                this.skip();
            });

            this.connection.join();
            this.connection.subscribe(this.audioPlayer);

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
                this.pause();
                return;
            }

            this.unpause();
            this.audioPlayer.play(song.url);

        }

        async play(searchTerms) {
            await this.songHandler.addSong(searchTerms);
            this.unpause();
        }

        disconnect() {
            this.connection.disconnect();
        }

    }

}