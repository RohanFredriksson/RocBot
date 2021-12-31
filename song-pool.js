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

    }

}