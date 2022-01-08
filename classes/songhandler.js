const { NoSubscriberBehavior } = require('@discordjs/voice');
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

                song = this.pool.getNext();

                if (song != null) {
                    return song;
                }

            }

            this.queue = new Queue();
            return song;

        }

        toggleShuffle() {

            if (this.pool == null) {
                this.interaction.send(`🚫 **|** You must be playing from a pool to toggle the shuffle!`);
                return;
            }

            this.shuffle = !this.shuffle;

            if (this.shuffle) {

                this.interaction.send(`🔀 **|** **Shuffle: On**`);

                if (this.pool != null) {
                    this.pool.setShuffle(true);
                }
                
                return;
            }

            else {

                this.interaction.send(`🔀 **|** **Shuffle: Off**`);

                if (this.pool != null) {
                    this.pool.setShuffle(false);
                }

                return;
            }

        }

        setPool(pool) {
            this.pool = pool;
            this.pool.setShuffle(this.shuffle);
        }

        setInteraction(interaction) {
            this.interaction = interaction;  
            this.queue.setInteraction(interaction); 
        }

        setShuffle(shuffle) {

            this.shuffle = shuffle;

            if (this.shuffle) {
                this.interaction.send(`🔀 **|** **Shuffle: On**`);
            }

            else {
                this.interaction.send(`🔀 **|** **Shuffle: Off**`);
            }

            if (this.pool != null) {
                this.pool.setShuffle(shuffle);
            }

        }

        async addSong(searchTerms) {
            await this.queue.addSong(searchTerms);
        }

    }

}