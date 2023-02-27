const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		client.user.setPresence({
			activities: [
				{
					name: 'Generating creative images using OpenAI technology.',
					type: 5
				}
			],
			status: 'online'
		});

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};