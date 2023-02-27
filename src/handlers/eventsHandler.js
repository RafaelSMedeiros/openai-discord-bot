const fs = require('fs');

module.exports = (client) => {
  
  fs.readdirSync('./src/events').filter(file => file.endsWith('.js')).forEach(file => {
    const event = require(`../events/${file}`);
    client.events.set(event.name, event);
  })

  client.events.forEach((event) => {
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  });
}