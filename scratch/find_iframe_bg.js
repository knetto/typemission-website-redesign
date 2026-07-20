const fs = require('fs');
const path = require('path');

const cssContent = fs.readFileSync(path.join(__dirname, '../leaderboard-iframe/styles.css'), 'utf8');
const lines = cssContent.split('\n');

lines.forEach((line, index) => {
  if (line.includes('iframe-mode')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
