const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
const content = fs.readFileSync(filePath, 'utf-8');

const startTag = '<style id="custom-hero-redesign-styles">';
const endTag = '</style>';

const startIdx = content.indexOf(startTag);
const endIdx = content.indexOf(endTag, startIdx);

const styleContent = content.slice(startIdx + startTag.length, endIdx);

console.log('Matches for .hero-layer-spies:');
let match;
const regex = /\.hero-layer-spies\s*\{[^}]*\}/g;
while ((match = regex.exec(styleContent)) !== null) {
  console.log(`Match at index ${match.index}:`);
  console.log(JSON.stringify(match[0]));
}
