const fs = require('fs');

module.exports = (client) => {
  
  fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')).forEach(file => {
    const command = require(`../commands/${file}`);
    client.commands.set(command.name, command);
  })
}