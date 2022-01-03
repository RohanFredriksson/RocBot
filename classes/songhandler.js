const { Queue } = require('./queue.js');

module.exports = {

    SongHandler: class SongHandler {

        constructor(interaction) {

            this.interaction = interaction;

            this.pool = null;
            this.queue = new Queue(interaction);

        }

        getNext() {

            var song = null;

            if (this.queue != null) {
                
                song = this.queue.getNext();

                if (song != null) {
                    return song;
                }

            }

            if (this.pool != null) {

                song = this.pool.getRandomSong();

                if (song != null) {
                    return song;
                }

            }

            this.queue = new Queue();
            return song;

        }

        setPool(pool) {
            this.pool = pool;
        }

        setInteraction(interaction) {
            this.interaction = interaction;  
            this.queue.setInteraction(interaction); 
        }

        async addSong(searchTerms) {
            await this.queue.addSong(searchTerms);
        }

    }

}