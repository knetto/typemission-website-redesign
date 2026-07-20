const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        searchDir(fullPath);
      }
    } else if (file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('<iframe') || content.includes('iframe')) {
        console.log(`Found iframe in: ${fullPath}`);
        // print lines containing iframe
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.includes('iframe')) {
            console.log(`  Line ${index + 1}: ${line.trim().substring(0, 150)}`);
          }
        });
      }
    }
  });
}

searchDir(path.join(__dirname, '..'));
