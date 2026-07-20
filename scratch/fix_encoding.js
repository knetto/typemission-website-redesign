const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../leaderboard-iframe/index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Perform replacements of double-encoded UTF-8 sequences
const replacements = [
  { search: 'â€”', replace: '—' },
  { search: 'â–¾', replace: '▾' },
  { search: 'â–´', replace: '▴' },
  { search: 'â”€', replace: '─' }
];

replacements.forEach(({ search, replace }) => {
  // Use split/join to replace all occurrences
  content = content.split(search).join(replace);
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully cleaned up corrupted characters in leaderboard-iframe/index.html!');
