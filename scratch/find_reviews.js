const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const lines = content.split('\n');

const keywords = ['review', 'reviews', 'recensie', 'beoordeling', 'ster', 'ervaring', 'feedback', 'wat zeggen'];

lines.forEach((line, index) => {
  const lowerLine = line.toLowerCase();
  keywords.forEach(keyword => {
    if (lowerLine.includes(keyword)) {
      console.log(`Line ${index + 1} [${keyword}]: ${line.trim().substring(0, 150)}`);
    }
  });
});
