const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
for (let i = 85; i <= 95; i++) {
  if (lines[i]) {
    console.log(`Line ${i + 1}: ${lines[i].substring(0, 500)}...`);
  }
}
