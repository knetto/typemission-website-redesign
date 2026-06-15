const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Let's find all occurrences of "De leukste typecursus" or "Beoordeeld met een 8,8"
const searchTexts = [
  'De leukste typecursus',
  'Beoordeeld met een 8,8',
  'Speel de gratis proefles',
  'Video voor ouders'
];

searchTexts.forEach(text => {
  let count = 0;
  let pos = content.indexOf(text);
  console.log(`=== Matches for "${text}" ===`);
  while (pos !== -1) {
    count++;
    // Get a chunk around it
    const start = Math.max(0, pos - 100);
    const end = Math.min(content.length, pos + 250);
    console.log(`Match ${count} at index ${pos}:`);
    console.log(content.substring(start, end).replace(/\n/g, ' '));
    console.log('-----------------------------------');
    pos = content.indexOf(text, pos + 1);
  }
});
