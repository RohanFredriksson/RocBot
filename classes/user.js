const fs = require('fs');
const { Pool } = require('./pool.js');

module.exports = {

    User: class User {

        constructor(id, pools) {

            if (pools === undefined) {
                pools = new Map();
            }

            this.id = id;
            this.pools = pools;
        }

        hasPool(name) {
            return this.pools.has(name);
        }

        getPool(name) {
            return this.pools.get(name)
        }

        addPool(name) {

            if (this.hasPool()) {
                return;
            }

            this.pools.set(name, new Pool(name));

        }

        removePool(name) {
            this.pools.delete(name);
        }

        save() {
            fs.writeFileSync('./data/' + this.id + '.json', this.stringify());
        }

        stringify() {

            var poolString = '{';
            for (var [key, value] of this.pools.entries()) {
                poolString = poolString + `"${key}":${value.stringify()},`;
            }

            if (this.pools.size > 0) {
                poolString = poolString.slice(0, -1);
            }

            poolString = poolString + '}';

            return `{"id":"${this.id}","pools":${poolString}}`;

        }

        static load(id) {

            var userFiles = fs.readdirSync('./data').filter(file => file.endsWith('.json'));
            for (var file of userFiles) {
                
                if (file == id + '.json') {
        
                    try {
                        return User.parse(fs.readFileSync('./data/' + file, 'utf8'));
                    }
                    
                    catch (err) {
                        console.log(err);
                        continue;
                    }
        
                }
                
            }
    
            var newUser = new User(id);
            newUser.save();
            return newUser;

        }

        static parse(str) {

            var json = JSON.parse(str);
            
            var newPools = new Map();
            Object.keys(json.pools).forEach(pool => {
                newPools.set(pool, Pool.parse(JSON.stringify(json.pools[pool])));
            });

            return new User(json.id, newPools);
        }

    }

}