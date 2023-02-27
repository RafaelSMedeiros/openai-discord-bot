const { Token } = require('./botconfig.js').env.Discord_Application
const client = require('./utils/botLoader')

client.login(Token);