const axios = require('axios');
const Jimp = require('jimp');
const math = require('math');

module.exports = async function resizeImage(imageURL) {
    const { data } = await axios.get(imageURL, { responseType: 'arraybuffer' });
    const image = await Jimp.read(data);
    
    if (image.getWidth() != image.getHeight()) {
        const newDimension = math.min(image.getWidth(), image.getHeight());
        image.resize(newDimension, newDimension);
    }

    return await image.getBufferAsync(Jimp.MIME_PNG);
}