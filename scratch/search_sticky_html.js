const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /elementor-sticky/gi;
let match;
console.log('--- Matching elementor-sticky in index.html ---');
while ((match = regex.exec(content)) !== null) {
  const index = match.index;
  console.log(`Index ${index}:`);
  console.log(content.substring(Math.max(0, index - 150), Math.min(content.length, index + 150)));
  console.log('-------------------\n');
}
