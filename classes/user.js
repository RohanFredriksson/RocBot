const fs = require('fs');
const { Pool } = require('./pool.js');

module.exports = {

    User: class User {

        constructor(id, pools) {

            if (pools === undefined) {
                pools = [];
            }

            this.id = id;
            this.pools = pools;
        }

        hasPool(name) {

            for (var i = 0; i < this.pools.length; i++) {

                if (this.pools[i].name == name) {
                    return true;
                }

            }

            return false;
        }

        getPool(name) {
            
            for (var i = 0; i < this.pools.length; i++) {

                if (this.pools[i].name == name) {
                    return this.pools[i];
                }

            }

            return null;

        }

        addPool(name) {

            if (this.hasPool(name)) {
                return;
            }

            this.pools.push(new Pool(name));

        }

        removePool(name) {
            
            for (var i = 0; i < this.pools.length; i++) {

                if (this.pools[i].name == name) {
                    this.pools.splice(i, 1);
                    return;
                }

            }

        }

        save() {
            fs.writeFileSync('./data/' + this.id + '.json', this.stringify());
        }

        stringify() {
            return JSON.stringify(this, null, 2);
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
            //newUser.save();
            return newUser;

        }

        static parse(str) {

            var json = JSON.parse(str);

            var newPools = [];
            for (var i = 0; i < json.pools.length; i++) {
                newPools.push(Pool.parse(JSON.stringify(json.pools[i])));
            }

            return new User(json.id, newPools);
        }

    }

}