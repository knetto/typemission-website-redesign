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

console.log('--- Searching for CSS rules targeting headers or sticky in CSS files ---');
walkDir('.', (filePath) => {
  if (!filePath.endsWith('.css')) return;
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('79a8349')) {
      console.log(`Found 79a8349 in ${filePath}`);
    }
    if (content.includes('elementor-sticky')) {
      console.log(`Found elementor-sticky in ${filePath}`);
    }
  } catch (e) {
    // Ignore
  }
});
