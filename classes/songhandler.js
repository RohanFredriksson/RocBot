const { Queue } = require('./queue.js');

module.exports = {

    SongHandler: class SongHandler {

        constructor(pool) {

            if (pool === undefined) {
                this.pool = null;
                this.queue = new Queue();
            }

            else {
                this.pool = pool;
                this.queue = null;
            }
            
        }

        getNext() {

            if (this.queue != null) {
                return this.queue.getNext();
            }

            else if (this.pool != null) {
                return this.pool.getRandomSong();
            }

            this.queue = new Queue();

        }

        async addSong(searchTerms) {
            await this.queue.addSong(searchTerms);
        }

    }

}