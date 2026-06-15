const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

function countMatches(regex) {
  const matches = content.match(regex);
  return matches ? matches.length : 0;
}

console.log('HTML tag 775ec8f occurrences:', countMatches(/<div[^>]*data-id="775ec8f"/g));
console.log('HTML tag fcba14e occurrences:', countMatches(/<div[^>]*data-id="fcba14e"/g));
console.log('HTML tag 8951b71 occurrences:', countMatches(/<div[^>]*data-id="8951b71"/g));
console.log('HTML tag c6d8f09 occurrences:', countMatches(/<div[^>]*data-id="c6d8f09"/g));
