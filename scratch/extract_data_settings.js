const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /data-settings="([^"]*)"/gi;
let match;
console.log('--- Extracted data-settings ---');
while ((match = regex.exec(content)) !== null) {
  // Decode HTML entities
  const decoded = match[1].replace(/&quot;/g, '"');
  // Check if it contains sticky or top or position
  if (decoded.includes('sticky') || decoded.includes('top') || decoded.includes('position')) {
    // Print the element tag context too
    const tagStart = content.lastIndexOf('<', match.index);
    const tagEnd = content.indexOf('>', match.index);
    console.log(`Tag: ${content.substring(tagStart, tagEnd + 1)}`);
    console.log(`Decoded: ${decoded}`);
    console.log('-------------------\n');
  }
}
