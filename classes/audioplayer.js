const { createAudioPlayer, createAudioResource, NoSubscriberBehavior, AudioPlayerStatus } = require("@discordjs/voice")
const { Connection } = require('./connection.js');
const { SongHandler } = require('./songhandler.js');

const ytdl = require('ytdl-core');

module.exports = {

    AudioPlayer: class AudioPlayer {

        constructor(channel, interaction, audioPlayerManager) {

            this.channel = channel;
            this.interaction = interaction;
            this.audioPlayerManager = audioPlayerManager;

            this.connection = new Connection(channel);
            this.songHandler = new SongHandler(interaction);

            this.audioPlayer = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                }
            });

            this.audioPlayer.on('error', error => {
                console.error(error);
            });

            this.audioPlayer.on(AudioPlayerStatus.Idle, () => {

                if (this.channel.members.size == 1) {
                    this.disconnect();
                }

                this.skip();

            })

            this.connection.join();
            this.connection.subscribe(this.audioPlayer);

            this.emptyChecker = setInterval(() => {

                if (this.channel.members.size == 1) {
                    this.disconnect();
                }

            }, 5000);

            this.isPlaying = false;

        }

        disconnect() {

            clearInterval(this.emptyChecker);
            this.connection.unsubscribe();
            this.connection.disconnect();
            this.audioPlayerManager.removePlayer(this.channel.guild.id);

        }

        play(url) {
            var stream = ytdl(url, { filter: 'audioonly' })
            var resource = createAudioResource(stream);
            this.audioPlayer.play(resource);
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
            this.play(song.url);
            this.interaction.send(`🎵 **|** Now playing: **${song.title}**`);

        }

        setPool(pool) {
            
            this.songHandler.setPool(pool);

            if(!this.isPlaying) {
                this.isPlaying = true;
                this.skip();
            }

        }

        setChannel(channel) {

            if (channel == null) {
                throw new Error('Channel can not be null.');
            }

            if (this.channel.id == channel.id) {
                return;
            }

            this.connection.unsubscribe();
            this.connection.disconnect();
            this.connection = new Connection(channel);
            this.connection.subscribe(this.audioPlayer);

        }

        setInteraction(interaction) {
            this.interaction = interaction;
            this.songHandler.setInteraction(interaction);
        }

        async addSong(searchTerms) {
            
            await this.songHandler.addSong(searchTerms);

            if(!this.isPlaying) {
                this.isPlaying = true;
                this.skip();
            }

        }

        toggleShuffle() {
            this.songHandler.toggleShuffle();
        }

    }

}