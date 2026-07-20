const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../leaderboard-iframe/script.js'), 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('iframe-mode') || line.includes('classList.remove')) {
    console.log(`Line ${index + 1}: ${line.trim().substring(0, 150)}`);
  }
});
