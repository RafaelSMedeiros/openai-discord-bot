const { Configuration, OpenAIApi } = require("openai");
const { apiKey } = require("../botconfig.js").env.OpenAI;

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

module.exports = { openai };