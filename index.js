const fs = require('fs');
const { Client, Intents, ClientVoiceManager, Collection } = require('discord.js');
const { AudioPlayerManager } = require('./classes/audioplayermanager.js');
const { User } = require('./classes/user.js');
const { Interaction } = require('./classes/interaction.js');

const { token } = require('./config.json');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
client.commands = new Collection();

const prefix = '$';
const operators = ['202264121461309440'];

// Set up commands.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {

    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    command.aliases.forEach(alias => {
        client.commands.set(alias, command);
    });

}

// Audio Player Manager.
const audioPlayerManager = new AudioPlayerManager();

client.once('ready', () => {
    console.log('RocBot is now online!');
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const command = interaction.commandName.toLowerCase();
    const args = [];
    const user = User.load(interaction.user.id);

    if (typeof interaction.options !== 'undefined') {
        interaction.options._hoistedOptions.forEach(option => {
            args.push('' + option.value);
        });
    }

    execute(interaction, command, args, user);

});

client.on('messageCreate', (message) => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const user = User.load(message.author.id);

    execute(message, command, args, user);

});

client.login(token);

function execute(interaction, command, args, user) {

    if (typeof client.commands.get(command) === 'undefined') {
        return;
    }

    interaction = new Interaction(interaction);

    if (client.commands.get(command).operatorOnly && !operators.includes(id)) {
        interaction.send("You don't have sufficient permission to use this command");
        return;
    }

    client.commands.get(command).execute(interaction, command, args, client, user, audioPlayerManager);

}