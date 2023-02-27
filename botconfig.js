require('dotenv').config();

module.exports = {
    env: {
        Discord_Application: {
            Token: process.env.CLIENT_TOKEN,
            ClientID: process.env.CLIENT_ID,
            required: "true"
        },
        OpenAI: {
            apiKey: process.env.APIKEY,
            required: "true"
        }
    }
}