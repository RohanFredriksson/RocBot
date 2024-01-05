const { SlashCommandBuilder } = require('@discordjs/builders');
const { titleCase } = require('../util.js');
const ytpl = require('ytpl');

const name = 'sickomode';
const description = 'Stops whatever you are playing and plays SICKO MODE on repeat!';
const aliases = ['sicko'];
const operatorOnly = false;

module.exports = {

    name: name,
    description: description,
    aliases: aliases,
	operatorOnly: operatorOnly,

	data:   [
                new SlashCommandBuilder()
			    .setName(name)
			    .setDescription(description)
            ],

	async execute(interaction, command, args, client, user, audioPlayerManager) {

        if (command == 'sicko' && args < 1) {return;}
        if (command == 'sicko' && args[0].toLowerCase() != 'mode') {return;}

        guildId = interaction.getGuildId();
        channel = interaction.getVoiceChannel();

        if (channel == null) {interaction.send('🚫 **|** To use this command, you must be in a voice channel!'); return;}
        if (!audioPlayerManager.hasPlayer(interaction.getGuildId())) {audioPlayerManager.createPlayer(guildId, channel, interaction);}
        audioPlayerManager.updatePlayer(guildId, channel, interaction);
        audioPlayer = audioPlayerManager.getPlayer(guildId);

        url = "https://www.youtube.com/watch?v=6ONRf7h3Mdk&ab_channel=TravisScottVEVO";

        if (audioPlayer.isPlaying) {
            audioPlayer.clearQueue();
            await audioPlayer.addSong([url]);
            audioPlayer.setRepeat(false);
            audioPlayer.skip();
            audioPlayer.setRepeat(true);
        }

        else {
            await audioPlayer.addSong([url]);
            audioPlayer.setRepeat(true);
        }

	}

};