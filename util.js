module.exports = {

    send(interaction, output) {
        interaction.channel.send(output);
    },

    reply(interaction, output) {

        json = interaction.toJSON()

        if (json['type'] == 'DEFAULT') {
            interaction.channel.send(output);
        }

        else if (json['type'] == 'APPLICATION_COMMAND') {
            interaction.reply(output);
        }
        
    },

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}