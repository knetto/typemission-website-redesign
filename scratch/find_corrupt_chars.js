const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../leaderboard-iframe/index.html'), 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('â')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
