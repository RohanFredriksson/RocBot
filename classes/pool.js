const { Song } = require('./song');
const { getRandomInt } = require('./../util.js');

module.exports = {

    Pool: class Pool {

        constructor(name, songs) {
            
            if (songs === undefined) {
                songs = [];
            }
            
            this.name = name;
            this.songs = songs;

        }

        clear() {
            this.songs = [];
        }

        getRandomSong() {

            if (this.songs.length == 0) {
                return null;
            }

            if (this.songs.length == 1) {
                return this.songs[0];
            }

            return this.songs[getRandomInt(0,this.songs.length)];

        }

        async hasSong(searchTerms) {

            var url = await Song.getUrl(searchTerms);

            for (var i = 0; i < this.songs.length; i++) {

                if (this.songs[i].url == url) {
                    return true;
                }

            }

            return false;

        }

        async getSong(searchTerms) {

            var url = await Song.getUrl(searchTerms);

            for (var i = 0; i < this.songs.length; i++) {

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
    
        static parse(str) {
            
            var json = JSON.parse(str);

            var newSongs = [];
            for (var i = 0; i < json.songs.length; i++) {
                newSongs.push(Song.parse(JSON.stringify(json.songs[i])));
            }

            return new Pool(json.name, newSongs);

        }
    
    }

}

