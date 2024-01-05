const { SlashCommandBuilder } = require('@discordjs/builders');

const name = 'ez4ence';
const description = 'Stops whatever you are playing and plays EZ4ENCE on repeat!';
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

        guildId = interaction.getGuildId();
        channel = interaction.getVoiceChannel();

        if (channel == null) {interaction.send('🚫 **|** To use this command, you must be in a voice channel!'); return;}
        if (!audioPlayerManager.hasPlayer(interaction.getGuildId())) {audioPlayerManager.createPlayer(guildId, channel, interaction);}
        audioPlayerManager.updatePlayer(guildId, channel, interaction);
        audioPlayer = audioPlayerManager.getPlayer(guildId);

        url = "https://www.youtube.com/watch?v=qemNTh_1yFo&ab_channel=TheVerkkars-Topic";

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