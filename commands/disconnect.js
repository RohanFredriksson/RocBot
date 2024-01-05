const { SlashCommandBuilder } = require('@discordjs/builders');

const name = 'disconnect';
const description = 'Disconnect the music bot.';
const aliases = ['leave','dc','fuckoff','bye'];
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
    
        if (command == 'fuckoff') {interaction.send('🖕 **|** **Fuck you**');} 
        else {interaction.send('👋 **|** **Bye!**');}
        
        audioPlayer.disconnect();

	}

};
