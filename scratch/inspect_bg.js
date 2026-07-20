const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const lines = content.split('\n');

const keywords = ['dcf3fb', 'linear-gradient', 'background-image', 'background:'];

lines.forEach((line, index) => {
  const lower = line.toLowerCase();
  keywords.forEach(keyword => {
    if (lower.includes(keyword)) {
      console.log(`Line ${index + 1}: ${line.trim().substring(0, 150)}`);
    }
  });
});
