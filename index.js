const fs = require('fs');
const { Client, Intents, ClientVoiceManager, Collection } = require('discord.js');
const { token } = require('./config.json');
const { User } = require('./classes/user.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});//, Intents.FLAGS.GUILD_VOICE_STATES] });
client.commands = new Collection();

const prefix = '$';
const operators = ['202264121461309440'];

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

function execute(interaction, command, args, user,) {

    if (typeof client.commands.get(command) === undefined) {
        return;
    }

    if (client.commands.get(command).operatorOnly && !operators.includes(id)) {
        interaction.reply("You don't have sufficient permission to use this command");
        return;
    }

    client.commands.get(command).execute(interaction, command, args, client, user);

}