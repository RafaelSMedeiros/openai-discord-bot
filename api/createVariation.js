const { openai } = require("./apiconfig");
const resizeImage = require("../utils/imageResizer.js");
const fs = require('fs');
const tmp = require('tmp');

module.exports = async function imageVariation(imageURL, userDiscordID, numImages, imageSize) {
    const buffer = await resizeImage(imageURL);

    const tempFile = tmp.fileSync({ postfix: '.png' });
    fs.writeFileSync(tempFile.name, buffer);

    const response = await openai.createImageVariation(
        fs.createReadStream(tempFile.name),
        numImages,
        imageSize,
        'url',
        userDiscordID
    );

    tempFile.removeCallback();

    return response;
}