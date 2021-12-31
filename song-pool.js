const database = require('./database.js');

module.exports = {

    getPool(name, json) {

        for (i = 0; i < json.length; i++) {

            var pool = json[i];
            if (pool.name == name) {
                return pool;
            }

        }

        return null;

    },

    addPool(name, json) {

        if (module.exports.getPool(name, json) != null) {
            return;
        }

        newPool = {
            name: name,
            songs: []
        }

        json.push(newPool);

    },

    removePool(name, json) {

        for (i = 0; i < json.length; i++) {

            var pool = json[i];
            if (pool.name == name) {
                json.splice(i, 1);
                return;
            }

        }

    },

    hasSongInPool(name, title, json) {

        for (i = 0; i < json.length; i++) {

            var pool = json[i];
            if (pool.name == name) {
                
                for (j = 0; j < pool.songs.length; j++) {

                    song = pool.songs[j];
                    if (song.title == title) {
                        return true;
                    }

                }
                return false;
            }

        }
        return false;
    },

    addSongToPool(name, song, json) {

        if (module.exports.hasSongInPool(name, song.title, json)) {
            return;
        }

        for (i = 0; i < json.length; i++) {

            var pool = json[i];
            if (pool.name == name) {
                pool.songs.push(song);
                return;
            }

        }

    },

    removeSongFromPool(name, title, json) {

        for (i = 0; i < json.length; i++) {

            var pool = json[i];
            if (pool.name == name) {
                
                for (j = 0; j < pool.songs.length; j++) {

                    song = pool.songs[j];
                    if (song.title == title) {
                        pool.songs.splice(j, 1);
                        return;
                    }

                }

            }

        }

    }

}