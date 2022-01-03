const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const name = 'queue';
const description = 'Displays the queue.';
const aliases = ['q'];
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
            interaction.send('🚫 **|** To use this command, I must be in a voice channel!');
            return;
        }   

        guildId = interaction.getGuildId();

        // See if an audio player has been created for the channel.
        if (!audioPlayerManager.hasPlayer(guildId)) {
            interaction.send('🚫 **|** To use this command, I must be in a voice channel!');
            return;
        } 
        
        // Update the channel and interaction objects in the audio player if it exists.
        else {
            audioPlayerManager.updatePlayer(guildId, channel, interaction);
        }

        audioPlayer = audioPlayerManager.getPlayer(guildId);

        const embed = new MessageEmbed()
            .setColor('FFA500')
            .setTitle(`Queue`);

        songs = audioPlayer.songHandler.queue.songs;

        if (songs.length == 0) {
            embed.setDescription('Hmm, this seems to be empty.');
        }

        else {

            list = '';
            for (i = 0; i < songs.length; i++) {
                song = songs[i];
                list = list + `${i+1}. **${song.title}**\n`;
            }

            embed.setDescription(list);

        }

        interaction.send({embeds: [embed]});

	}

};