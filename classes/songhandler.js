const { Queue } = require('./queue.js');

module.exports = {

    SongHandler: class SongHandler {

        constructor(interaction) {

            this.interaction = interaction;

            this.pool = null;
            this.queue = new Queue(interaction);
            this.shuffle = true;

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

                if (this.shuffle) {
                    song = this.pool.getRandomSong();
                }

                else {
                    song = this.pool.getNext();
                }

                if (song != null) {
                    return song;
                }

            }

            this.queue = new Queue();
            return song;

        }

        toggleShuffle() {

            this.shuffle = !this.shuffle;

            if (this.shuffle) {
                this.interaction.send(`🔀 **|** **Shuffle: On**`);
                return;
            }

            else {
                this.interaction.send(`🔀 **|** **Shuffle: Off**`);
                return;
            }

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