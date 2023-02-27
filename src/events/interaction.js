const { Events } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.run(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

            const logEntry = `User ${interaction.user.id} executed command '${interaction.commandName}' and received an error on ${new Date().toUTCString()}'.`;
            fs.appendFileSync('log.txt', logEntry + '\n');
        }
    }
}