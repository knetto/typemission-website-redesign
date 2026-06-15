const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'afbeelingen');
const files = fs.readdirSync(dir);

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (path.extname(file).toLowerCase() === '.png') {
    const buffer = fs.readFileSync(filePath);
    // PNG dimensions are at offset 16 (width) and 20 (height), 4 bytes each, big-endian
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    console.log(`${file}: ${width}x${height} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
  }
});
