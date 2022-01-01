const { prefix } = require('./config.json');

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

    getCommandName(interaction) {

        if (typeof interaction.content !== "undefined") {
            return interaction.content.slice(prefix.length).split(/ +/).shift().toLowerCase();
        }

        return interaction.commandName;

    },

    getUserId(interaction) {
        
        if (typeof interaction.user !== "undefined") {
            return interaction.user.id;
        }

        return interaction.author.id;

    },

    getGuildId(interaction) {

        if (typeof interaction.member !== "undefined") {
            return interaction.member.guild.id;
        }

        return interaction.guildId;

    },

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}