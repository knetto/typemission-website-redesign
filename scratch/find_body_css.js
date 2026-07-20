const fs = require('fs');
const path = require('path');

const cssContent = fs.readFileSync(path.join(__dirname, '../leaderboard-iframe/styles.css'), 'utf8');
const lines = cssContent.split('\n');

for (let i = 0; i < 200; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
