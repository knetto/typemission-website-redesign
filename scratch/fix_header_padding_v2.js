const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === 'scratch') return;
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const targetMobileContent = `    /* Lay out promo text and login button side-by-side in the light blue bar */
    .elementor-element-b54a980 {
      padding-top: 4px !important;
      padding-bottom: 4px !important;
      min-height: auto !important;
    }`;

const replacementMobileContent = `    /* Lay out promo text and login button side-by-side in the light blue bar */
    .elementor-element-b54a980 {
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      min-height: auto !important;
    }`;

const targetDesktopContent = `  /* Reduce height of header top blue bar on desktop/tablet */
  @media (min-width: 768px) {
    .elementor-element-b54a980 {
      padding-top: 4px !important;
      padding-bottom: 4px !important;
      min-height: auto !important;
    }`;

const replacementDesktopContent = `  /* Reduce height of header top blue bar on desktop/tablet */
  @media (min-width: 768px) {
    .elementor-element-b54a980 {
      padding-top: 8px !important;
      padding-bottom: 8px !important;
      min-height: auto !important;
    }`;

console.log('Scanning HTML files to adjust top bar padding to 8px...');

let count = 0;
walkDir(path.join(__dirname, '..'), (filePath) => {
  if (!filePath.endsWith('.html')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    const normalizedContent = content.replace(/\r\n/g, '\n');

    let updatedContent = normalizedContent;
    if (updatedContent.includes(targetMobileContent.replace(/\r\n/g, '\n'))) {
      updatedContent = updatedContent.replace(targetMobileContent.replace(/\r\n/g, '\n'), replacementMobileContent.replace(/\r\n/g, '\n'));
    }
    
    if (updatedContent.includes(targetDesktopContent.replace(/\r\n/g, '\n'))) {
      updatedContent = updatedContent.replace(targetDesktopContent.replace(/\r\n/g, '\n'), replacementDesktopContent.replace(/\r\n/g, '\n'));
    }

    if (updatedContent !== normalizedContent) {
      fs.writeFileSync(filePath, content.includes('\r\n') ? updatedContent.replace(/\n/g, '\r\n') : updatedContent, 'utf8');
      console.log(`Updated HTML file: ${filePath}`);
      count++;
    }
  } catch (e) {
    console.error(`Error processing file ${filePath}: ${e.message}`);
  }
});

console.log(`Padding adjust complete! Modified ${count} HTML files.`);
