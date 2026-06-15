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

console.log('--- Searching for sticky/fixed css styles ---');
walkDir('.', (filePath) => {
  if (!filePath.endsWith('.html') && !filePath.endsWith('.css') && !filePath.endsWith('.js')) return;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('position:fixed') || content.includes('position: fixed') || 
        content.includes('position:sticky') || content.includes('position: sticky')) {
      console.log(`Found in: ${filePath}`);
      // Find matching lines
      let idx = 0;
      while ((idx = content.indexOf('position:', idx)) !== -1) {
        const sub = content.substring(idx, idx + 40);
        if (sub.includes('fixed') || sub.includes('sticky')) {
          console.log(`  Context: ${content.substring(Math.max(0, idx - 80), Math.min(content.length, idx + 100)).replace(/\r?\n/g, ' ')}`);
        }
        idx += 'position:'.length;
      }
    }
  } catch (e) {
    // Ignore
  }
});
