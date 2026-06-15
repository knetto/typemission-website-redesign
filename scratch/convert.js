const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../afbeelingen/Miss JI en kind cropped.png');
const outputPath = path.join(__dirname, '../afbeelingen/Miss_JI_en_kind_cropped.webp');

sharp(inputPath)
  .webp({ quality: 80 })
  .toFile(outputPath)
  .then(info => {
    console.log('Successfully converted image to WebP:');
    console.log(info);
  })
  .catch(err => {
    console.error('Error converting image:', err);
  });
