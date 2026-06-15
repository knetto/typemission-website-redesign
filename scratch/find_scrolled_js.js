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

console.log('--- Searching for banner-height or header-scrolled-down ---');
walkDir('.', (filePath) => {
  if (!filePath.endsWith('.html') && !filePath.endsWith('.js')) return;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('header-scrolled-down') || content.includes('--banner-height')) {
      console.log(`Found in: ${filePath}`);
      // Find matching lines
      let idx = 0;
      while ((idx = content.indexOf('header-scrolled-down', idx)) !== -1) {
        console.log(`  header-scrolled-down context: ${content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 150)).replace(/\r?\n/g, ' ')}`);
        idx += 'header-scrolled-down'.length;
      }
      idx = 0;
      while ((idx = content.indexOf('--banner-height', idx)) !== -1) {
        console.log(`  --banner-height context: ${content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 150)).replace(/\r?\n/g, ' ')}`);
        idx += '--banner-height'.length;
      }
    }
  } catch (e) {
    // Ignore
  }
});
