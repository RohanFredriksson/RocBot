const { Client, Intents, ClientVoiceManager, Collection } = require('discord.js');
const { token } = require('./config.json');
const { operators } = require('./operators.json');
const database = require('./database.js');
const fs = require('fs');

const prefix = '$';

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {

    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    command.aliases.forEach(alias => {
        client.commands.set(alias, command);
    });

}

client.once('ready', () => {
    console.log('RocBot is now online!');
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const command = interaction.commandName.toLowerCase();
    const args = [];
    const userData = database.getUser(interaction.user.id);

    if (typeof interaction.options !== 'undefined') {
        interaction.options._hoistedOptions.forEach(option => {
            args.push('' + option.value);
        });
    }

    execute(interaction, command, args, userData);

});

client.on('messageCreate', (message) => {

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const userData = database.getUser(message.author.id);

    execute(message, command, args, userData);

});

client.login(token);

function execute(interaction, command, args, userData,) {

    if (client.commands.get(command).operatorOnly && !operators.includes(id)) {
        interaction.reply("You don't have sufficient permission to use this command");
        return;
    }

    client.commands.get(command).execute(interaction, args, client, userData);

}