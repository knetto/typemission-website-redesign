const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /data-settings="([^"]*)"/gi;
let match;
console.log('--- Extracted sticky data-settings ---');
while ((match = regex.exec(content)) !== null) {
  const decoded = match[1].replace(/&quot;/g, '"');
  if (decoded.includes('sticky')) {
    const tagStart = content.lastIndexOf('<', match.index);
    const tagEnd = content.indexOf('>', match.index);
    console.log(`Tag: ${content.substring(tagStart, tagEnd + 1)}`);
    console.log(`Decoded: ${decoded}`);
    console.log('-------------------\n');
  }
}
