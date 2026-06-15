const fs = require('fs');
const path = require('path');

const DOMAINS = [
  'https://www.typemission.be',
  'https://typemission.be',
  'http://www.typemission.be',
  'http://typemission.be'
];

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

console.log('Scanning CSS files to rewrite absolute URLs...');

walkDir(__dirname, (filePath) => {
  if (!filePath.endsWith('.css')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace absolute URLs to local domain with root-relative paths
    // Example: url(https://www.typemission.be/wp-content/...) -> url(/wp-content/...)
    for (const domain of DOMAINS) {
      const escapedDomain = domain.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Look for domain in url() or as absolute paths
      const regex = new RegExp(escapedDomain, 'g');
      content = content.replace(regex, '');
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated CSS file: ${filePath}`);
    }
  } catch (e) {
    console.error(`Error processing CSS file ${filePath}: ${e.message}`);
  }
});

console.log('CSS URL fix complete!');
