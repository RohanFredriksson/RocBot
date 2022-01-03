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
            this.songs.push(await Song.getSong(searchTerms));
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