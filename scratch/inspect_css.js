const fs = require('fs');
const path = require('path');

const cssContent = fs.readFileSync(path.join(__dirname, '../leaderboard-iframe/styles.css'), 'utf8');
const lines = cssContent.split('\n');

lines.forEach((line, index) => {
  if (line.includes('.test-section') || line.includes('#typetest')) {
    console.log(`Line ${index + 1}: ${line.trim().substring(0, 150)}`);
  }
});
