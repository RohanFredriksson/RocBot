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

    deferReply(interaction) {

        json = interaction.toJSON()
        if (json['type'] == 'APPLICATION_COMMAND') {
            interaction.deferReply();
        }

    },

    followUp(interaction, output) {

        json = interaction.toJSON()

        if (json['type'] == 'DEFAULT') {
            interaction.channel.send(output);
        }

        else if (json['type'] == 'APPLICATION_COMMAND') {
            interaction.followUp(output);
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

    getVoiceChannel(interaction) {
        return interaction.member.voice.channel;
    },

    titleCase(str) {

        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }

        return splitStr.join(' '); 
        
    },

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}