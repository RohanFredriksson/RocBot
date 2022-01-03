const { SlashCommandBuilder } = require('@discordjs/builders');

const name = 'unpause';
const description = 'Unpause the playback of a song.';
const aliases = [];
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

        channel = interaction.getVoiceChannel();

        if (channel == null) {
            interaction.send('Im not playing any song!');
            return;
        }   

        guildId = interaction.getGuildId();

        // Create a new audio player if one doesn't exist.
        if (!audioPlayerManager.hasPlayer(guildId)) {
            interaction.send('Im not playing any song!');
            return;
        } 
        
        // Update the channel and interaction objects in the audio player if it exists.
        else {
            audioPlayerManager.updatePlayer(guildId, channel, interaction);
        }

        audioPlayer = audioPlayerManager.getPlayer(guildId);
        interaction.send('Unpaused playback.');
        audioPlayer.unpause();

	}

};