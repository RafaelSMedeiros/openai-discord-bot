const { Client, GatewayIntentBits, Collection } = require('discord.js');
const env = require('../botconfig.js').env
const slashRefresh = require('../utils/slashRefresh');

// const isRequiredFieldsFilled = Object.values(env).every(obj => obj.required !== 'true' || Object.values(obj).every(val => val));
// if (!isRequiredFieldsFilled) {
//     console.error('One or more required fields are missing in botconfig.js');
//     process.exit();

// }

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.events = new Collection();

client.loadCommands = (client) => require('../src/handlers/commandsHandler')(client);
client.loadCommands(client);

slashRefresh(client);

client.loadEvents = (client) => require('../src/handlers/eventsHandler')(client);
client.loadEvents(client);

module.exports = client;