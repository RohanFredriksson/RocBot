const { Client, Intents, ClientVoiceManager, Collection } = require('discord.js');
const { token } = require('./config.json');
const { operators } = require('./operators.json');
const fs = require('fs');

const client = new Client({intents: [Intents.FLAGS.GUILDS] });
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

    if (typeof interaction.options !== 'undefined') {
        interaction.options._hoistedOptions.forEach(option => {
            args.push('' + option.value);
        });
    }

    if (client.commands.get(command).operatorOnly && !operators.includes(interaction.user.id)) {
        interaction.reply("You don't have sufficient permission to use this command");
    }

    client.commands.get(command).execute(interaction, args);

});

client.login(token);