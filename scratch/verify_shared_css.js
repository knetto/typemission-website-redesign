const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === 'scratch' || f === '.gemini') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

console.log('--- Checking HTML files for CSS references ---');
let matches = 0;
let total = 0;
walkDir('.', (filePath) => {
  if (!filePath.endsWith('.html')) return;
  total++;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('autoptimize_single_bf83e39a3e5d6481dc16702d1eb77f16.css')) {
      matches++;
    } else {
      console.log(`Does NOT reference: ${filePath}`);
    }
  } catch (e) {
    // Ignore
  }
});
console.log(`Matches: ${matches} / Total HTML files: ${total}`);
