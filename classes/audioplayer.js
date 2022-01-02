const { createAudioPlayer, NoSubscriberBehavior } = require("@discordjs/voice")
const ytdl = require('ytdl-core');

module.exports = {

    AudioPlayer: class AudioPlayer {

        constructor() {

            this.player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                }
            });

            this.player.on('error', error => {
                console.error(error);
            });

        }

        play(url) {
            const stream = ytdl(url, { filter: 'audioonly' })
            const resource = createAudioResource(stream);
            this.player.play(resource);
        }

        pause() {
            this.player.pause();
        }

        unpause() {
            this.player.unpause();
        }

    }

}