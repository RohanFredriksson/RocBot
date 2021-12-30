const { Client, Intents, ClientVoiceManager } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
    console.log("RocBot is now online!");
});

client.login(token);