const fs = require('fs');
const content = fs.readFileSync('../index.html', 'utf8');
const lines = content.split('\n');

const targets = [
  '5dabf3d',
  '3cd5a9b',
  'c31833b',
  'de4286c',
  'a6ffbc7'
];

lines.forEach((line, index) => {
  if (targets.some(t => line.includes(t))) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
