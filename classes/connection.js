const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {

    Connection: class Connection {

        constructor(channel) {
        
            this.channelId = channel.id;
            this.guildId = channel.guild.id;
            this.adapterCreator = channel.guild.voiceAdapterCreator;
            this.connection = null;
            
        }

        join() {

            this.connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator 
            });

        }

        disconnect() {

            if (this.connection != null) {
                this.connection.destroy();
                this.connection = null;
            }

        }

        subscribe(player) {
            this.connection.subscribe(player);
        }

        unsubscribe() {
            this.connection.unsubscribe();
        }

    }

}