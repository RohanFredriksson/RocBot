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

    titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        return splitStr.join(' '); 
    }

}