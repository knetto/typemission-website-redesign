const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

function findCssRulesFor(id) {
  console.log(`--- CSS Rules for ${id} ---`);
  // Look for styles matching the ID
  const regex = new RegExp(`[^}]*${id}[^}]*\\{[^}]*\\}`, 'gi');
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(match[0].trim());
  }
}

findCssRulesFor('22a54df');
findCssRulesFor('79a8349');
