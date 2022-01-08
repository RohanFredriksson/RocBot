const { Song } = require('./song');
const { shuffle } = require('./../util.js');

module.exports = {

    Pool: class Pool {

        constructor(name, songs) {
            
            if (songs === undefined) {
                songs = [];
            }
            
            this.name = name;
            this.isShuffled = true;

            this.songs = songs;
            this.songsShuffled = [...songs];

            this.head = 0;
            this.shuffleHead = 0;

            this.shuffle();

        }

        clear() {
            this.songs = [];
        }

        getNext() {

            if (this.isShuffled) {
                return this.getRandomSong();
            }

            if (this.songs.length == 0) {
                return null;
            }

            if (this.head >= this.songs.length) {
                this.head = 0;
            }

            return this.songs[this.head++];

        }

        getRandomSong() {

            if (this.songsShuffled.length == 0) {
                return null;
            }

            if (this.shuffleHead >= this.songsShuffled.length) {
                this.shuffleHead = 0;
            }

            return this.songsShuffled[this.shuffleHead++];

        }

        async hasSong(searchTerms) {

            const url = await Song.getUrl(searchTerms);

            for (let i = 0; i < this.songs.length; i++) {

                if (this.songs[i].url == url) {
                    return true;
                }

            }

            return false;

        }

        async getSong(searchTerms) {

            const url = await Song.getUrl(searchTerms);

            for (let i = 0; i < this.songs.length; i++) {

                if (this.songs[i].url == url) {
                    return this.songs[i];
                }

            }

            return null;

        }

        async addSong(searchTerms) {
            
            if (await this.hasSong(searchTerms)) {
                return;
            }

            this.songs.push(await Song.getSong(searchTerms));
            this.shuffle();

        }

        async removeSong(searchTerms) {

            const url = await Song.getUrl(searchTerms);

            for (let i = 0; i < this.songs.length; i++) {

                if (this.songs[i].url == url) {
                    this.songs.splice(i, 1);
                    this.shuffle();
                    return;
                }

            }

        }

        shuffle() {
            shuffle(this.songsShuffled);
        }

        setShuffle(isShuffled) {

            this.isShuffled = isShuffled;

            if (this.isShuffled) {
                this.shuffle();
                return;
            }

        }
    
        static parse(str) {
            
            const json = JSON.parse(str);
            const newSongs = [];

            for (let i = 0; i < json.songs.length; i++) {
                newSongs.push(Song.parse(JSON.stringify(json.songs[i])));
            }

            return new Pool(json.name, newSongs);

        }
    
    }

}

