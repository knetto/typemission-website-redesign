const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === '.gemini') return;
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
      padding-top: 8px !important;
      padding-bottom: 8px !important;
    }`;

const replacementMobileContent = `    /* Lay out promo text and login button side-by-side in the light blue bar */
    .elementor-element-b54a980 {
      padding-top: 4px !important;
      padding-bottom: 4px !important;
      min-height: auto !important;
    }
    
    .elementor-element-b54a980 > .e-con-inner {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      min-height: auto !important;
    }`;

const targetDesktopContent = `  /* Reduce height of header top blue bar on desktop/tablet */
  @media (min-width: 768px) {
    .elementor-element-b54a980 {
      padding-top: 6px !important;
      padding-bottom: 6px !important;
      min-height: auto !important;
    }`;

const replacementDesktopContent = `  /* Reduce height of header top blue bar on desktop/tablet */
  @media (min-width: 768px) {
    .elementor-element-b54a980 {
      padding-top: 4px !important;
      padding-bottom: 4px !important;
      min-height: auto !important;
    }`;

console.log('Scanning HTML files to update top bar padding...');

let count = 0;
walkDir(path.join(__dirname, '..'), (filePath) => {
  if (!filePath.endsWith('.html')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    if (content.includes(targetMobileContent)) {
      content = content.replace(targetMobileContent, replacementMobileContent);
    }
    
    if (content.includes(targetDesktopContent)) {
      content = content.replace(targetDesktopContent, replacementDesktopContent);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated HTML file: ${filePath}`);
      count++;
    }
  } catch (e) {
    console.error(`Error processing file ${filePath}: ${e.message}`);
  }
});

console.log(`Update complete! Modified ${count} HTML files.`);
