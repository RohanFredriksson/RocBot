const { Song } = require('./song');

module.exports = {

    Queue: class Queue {

        constructor(interaction) {
            this.interaction = interaction;
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

        setInteraction(interaction) {
            this.interaction = interaction;
        }

        async addSong(searchTerms) {
            var song = await Song.getSong(searchTerms);
            this.songs.push(song);
            this.interaction.send(`✅ **|** **${song.title}** added to the queue.`);
        }

        async removeSong(searchTerms) {

            var url = await Song.getUrl(searchTerms);
            for (var i = 0; i < this.songs.length; i++) {
                
                if (this.songs[i].url == url) {
                    this.songs.splice(i, 1);
                    return;
                }

            }

        }

    }

}