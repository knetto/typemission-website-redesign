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

console.log('--- Searching for "elementor-sticky" or custom sticky CSS/JS ---');
walkDir('.', (filePath) => {
  if (!filePath.endsWith('.html') && !filePath.endsWith('.css') && !filePath.endsWith('.js')) return;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('elementor-sticky')) {
      console.log(`Found in file: ${filePath}`);
      // Find matching lines/substrings
      let idx = 0;
      while ((idx = content.indexOf('elementor-sticky', idx)) !== -1) {
        console.log(`  Context: ${content.substring(Math.max(0, idx - 80), Math.min(content.length, idx + 100)).replace(/\r?\n/g, ' ')}`);
        idx += 'elementor-sticky'.length;
      }
    }
  } catch (e) {
    // Ignore error
  }
});
