const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

function findOccurrences(query) {
  let indices = [];
  let pos = content.indexOf(query);
  while (pos !== -1) {
    indices.push(pos);
    pos = content.indexOf(query, pos + 1);
  }
  return indices;
}

console.log('775ec8f indices:', findOccurrences('775ec8f'));
console.log('8951b71 indices:', findOccurrences('8951b71'));
