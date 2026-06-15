const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

function search(query) {
  let idx = 0;
  console.log(`--- Searching for "${query}" ---`);
  while ((idx = content.indexOf(query, idx)) !== -1) {
    console.log(`Found at index ${idx}:`);
    console.log(content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + query.length + 150)));
    console.log('\n---------------------------------\n');
    idx += query.length;
  }
}

search('79a8349');
search('sticky');
