# RocBot 🎵
#### Description
A Discord Music Bot that can stream music from YouTube to a discord server voice channel. With easy to use commands, a user can stream their favourite music by entering key search terms or providing a YouTube link. Users can also create their own playlists / import YouTube playlists / play YouTube playlists with simple to use commands.
#### Commands *(More information can be found in the slash command descriptions.)*
- **Play**: Provide a YouTube URL, YouTube Search Terms, or a Pool name to play music from. The bot will join your current voice channel and play the music you have specified.
- **Pause**: Pauses the current music playback.
- **Unpause**: Unpauses the current music playback.
- **Queue**: Displays a list of songs in the queue.
- **Clear**: Clears the songs in the queue.
- **Mute**: Mutes "Now Playing" notifications.
- **Unmute**: Unmutes "Now Playing" notifications.
- **NowPlaying**: Displays the name of the song which is currently playing.
- **Repeat**: Repeats the song that is currently playing when it finishes.
- **Shuffle**: Shuffles the order of songs playback in the pool.
- **Skip**: Skips the current song and plays the next song.
- **Disconnect**: Causes the bot to leave the current channel.
- **Pools**: Displays a list of all user created playlists.
- **Pool**: Enter a user created playlist name and it will display a list of songs in that playlist.
- **AddPool**: Create a new playlist for the user.
- **RemovePool**: Remove a playlist from the users playlists collection.
- **AddSong**: Add a song to a user created playlist.
- **RemoveSong**: Remove a song from a user created playlist.
#### How to Use
To host this music bot on your own server, follow these steps.
1. Ensure you have a recent version of node and npm. I am using node 17.7.1 and npm 8.5.2 to host this bot.
2. Make a Discord Application in the Discord Developer Portal for the bot. https://discord.com/developers/applications
3. Clone this repository. https://github.com/RohanFredriksson/RocBot.git
4. Run npm install to download all required dependencies of the project.
5. Create a file called config.json in the root of this repository. The file should have the following structure; fill it in with your own details.
```{json}
{
        "token": "<Your Discord bot token>",
        "clientId": "<Your Discord bot client id>",
        "guildId": "<The guild id of your server>",
        "operators": ["The", "user", "ids", "of", "every", "operator", "you", "wish", "to", "have", ...],
        "prefix": "<The prefix for all the commands on the server>"
}
```
6. At this point you are all ready to go. Run the command "node index.js" to host the Discord bot or use a process manager to manage the application.

#### Reasoning
Ever since music bots such as Rhythm and Groovy were taken down, my Discord server has lacked a nice way to listen to music with my friends. As a learning experience I decided to make my own music bot to fill this gap. I had worked with discord.js v11 prior to this project, but never had constructed anything useful so I saw this as a great opportunity to build something for an actual client. My friends provided great feedback for features that they wanted implemented and I would introduce these features. Through this experience I have become comfortable working with the discord.js v13 and audio streams, and have provided a product an excellent product to real users. As a bonus I can now can enjoy music with my friends once again.
