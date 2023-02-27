const fs = require('fs');

module.exports = function appLog(userID, command, details) {
    const logEntry = `User ${userID} executed command '${command}' with prompt '${details}' on ${new Date().toUTCString()}'.`;
    fs.appendFileSync('log.txt', logEntry + '\n');
}