require('dotenv').config();
const { REST, Routes } = require("discord.js");
const { ClientID, Token } = require("../botconfig.js").env.Discord_Application;

module.exports = (client) => {

    const commands = Array.from(client.commands.values()).filter(command => !!command.run);

    console.log(ClientID)
    console.log(Token)

    const rest = new REST({ version: '10' }).setToken(Token);

    (async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(ClientID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
    })();
}