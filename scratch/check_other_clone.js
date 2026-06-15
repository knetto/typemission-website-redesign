const fs = require('fs');
const path = require('path');

const otherDir = 'c:/Users/corne/Documents/stage/website improvements/site clone';

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else {
      callback(dirPath);
    }
  });
}

console.log(`Scanning ${otherDir} for 'hero-subtitle' or custom styles...`);
walkDir(otherDir, (filePath) => {
  if (filePath.endsWith('.css') || filePath.endsWith('.html') || filePath.endsWith('.js')) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('hero-subtitle')) {
      console.log(`Found 'hero-subtitle' in: ${filePath}`);
      // If it is CSS, print the content
      if (filePath.endsWith('.css')) {
        console.log(content);
      }
    }
  }
});
