const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../afbeelingen/Miss JI en kind.png');

sharp(inputPath)
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const width = info.width;
    const stride = width * 4;

    console.log('Row densities from Y = 1700 to 1950:');
    for (let y = 1700; y <= 1950; y += 10) {
      let count = 0;
      for (let x = 0; x < width; x++) {
        const alpha = data[y * stride + x * 4 + 3];
        if (alpha > 5) count++;
      }
      console.log(`Y = ${y}: ${count}`);
    }
  })
  .catch(err => {
    console.error(err);
  });
