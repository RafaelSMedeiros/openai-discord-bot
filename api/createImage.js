const { openai } = require("./apiconfig");

module.exports = async function imageCreate(prompt, userDiscordID, numImages, imageSize) {
    return await openai.createImage({
        prompt: prompt,
        n: numImages,
        size: imageSize,
        user: userDiscordID
    });
}
