const { SlashCommandBuilder } = require('@discordjs/builders');

const name = 'nowplaying';
const description = 'Get the name of the song currently playing.';
const aliases = ['np','currentsong'];
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

        currentSong = audioPlayer.getCurrentSong();

        if (currentSong == null) {interaction.send('🚫 **|** No songs are currently playing!'); return;}
        interaction.send(`🎵 **|** Now playing: **${currentSong.title}**`);

	}

};