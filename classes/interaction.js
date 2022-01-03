module.exports = {

    Interaction: class Interaction {

        constructor(interaction) {
            
            this.interaction = interaction;
            this.deferred = false;
            this.firstMessage = true;
            this.firstReplySent = false;

            var json = interaction.toJSON()

            if (json['type'] == 'APPLICATION_COMMAND') {
                this.isInteraction = true;
            }

            else {
                this.isInteraction = false;
            }

        }

        defer() {
            
            if (!this.isInteraction) {
                return;
            }

            this.deferred = true;
            this.interaction.deferReply();

        }

        async send(output) {

            if (!this.isInteraction) {
                this.interaction.channel.send(output);
            }

            else if (this.firstMessage && this.deferred) {

                this.interaction.editReply(output);
                this.firstMessage = false;

            }

            else if (this.firstMessage) {
                
                this.interaction.reply(output);
                this.firstMessage = false;
                this.firstReplySent = true;

            }

            else {

                if (this.firstReplySent) {

                    setTimeout(() => {
                        this.interaction.followUp(output)
                        this.firstReplySent = false;
                    }, 1000);
                    return;

                }

                this.interaction.followUp(output);
                
            }

        }

    }

}