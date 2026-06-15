const fs = require('fs');
const content = fs.readFileSync('c:/Users/corne/Documents/stage/website improvements/site clone simular small fixes/index.html', 'utf8');

const query = 'hero-subtitle';
let index = 0;
while (true) {
  const found = content.indexOf(query, index);
  if (found === -1) break;
  console.log(`Found ${query} at index ${found}:`);
  console.log(content.substring(Math.max(0, found - 150), found + 500));
  console.log('\n------------------\n');
  index = found + query.length;
}
