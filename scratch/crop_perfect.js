const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../afbeelingen/Miss JI en kind.png');
const outputPath = path.join(__dirname, '../afbeelingen/Miss_JI_en_kind_cropped.webp');

// Crop coordinates:
// X range: 105 to 2182 (width 2078)
// Y range: 810 to 1890 (height 1080)
sharp(inputPath)
  .extract({ left: 105, top: 810, width: 2078, height: 1080 })
  .webp({ quality: 80 })
  .toFile(outputPath)
  .then(info => {
    console.log('Successfully cropped and converted image to WebP:');
    console.log(info);
  })
  .catch(err => {
    console.error('Error during image processing:', err);
  });
