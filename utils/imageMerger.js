const Jimp = require('jimp');

async function imageMerger(urls, numImages, size) {
  const sizes = {
    1: [size, size],
    2: [size * 2, size],
    4: [size * 2, size * 2],
    6: [size * 3, size * 2],
    9: [size * 3, size * 3]
  };

  const [mergedWidth, mergedHeight] = sizes[numImages];
  const imageSize = Math.floor(mergedWidth / Math.ceil(Math.sqrt(numImages)));

  const images = await Promise.all(urls.map(url => Jimp.read(url)));
  const mergedImage = new Jimp(mergedWidth, mergedHeight);

  images.forEach((image, i) => {
    const row = Math.floor(i / Math.ceil(Math.sqrt(numImages)));
    const col = i % Math.ceil(Math.sqrt(numImages));
    mergedImage.blit(image, col * imageSize, row * imageSize);
  });

  if (mergedImage.bitmap.width == mergedImage.bitmap.height && numImages == 9) mergedImage.resize(2048, 2048);

  return mergedImage;
}

async function mergedBuffer(urls, numImages, size) {
  const mergedImage = await imageMerger(urls, numImages, size);
  const imageBuffer = await mergedImage.getBufferAsync(Jimp.MIME_JPEG);

  return imageBuffer;
}

module.exports = mergedBuffer;