const fs = require('fs');
const path = require('path');

function findMatchingFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        findMatchingFiles(fullPath);
      }
    } else {
      const lower = entry.name.toLowerCase();
      if (lower.includes('test') || lower.includes('leader') || lower.includes('game') || lower.includes('range') || lower.includes('shoot')) {
        console.log(`Found: ${fullPath}`);
      }
    }
  }
}

findMatchingFiles(path.join(__dirname, '..'));
