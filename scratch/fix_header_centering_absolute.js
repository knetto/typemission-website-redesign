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

const targetMobileCSS = `    .elementor-element-b54a980 > .e-con-inner {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding-left: 12px !important;
      padding-right: 12px !important;
      gap: 12px !important;
    }
    
    /* Ensure containers behave as inline-flex items */
    .elementor-element-b81a3ab {
      width: auto !important;
      flex-shrink: 0 !important;
      display: flex !important;
      align-items: center !important;
    }`;

const replacementMobileCSS = `    .elementor-element-b54a980 > .e-con-inner {
      position: relative !important;
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      justify-content: center !important;
      padding-left: 12px !important;
      padding-right: 12px !important;
      gap: 12px !important;
    }
    
    /* Absolute position the login button on the right to keep text centered */
    .elementor-element-b81a3ab {
      position: absolute !important;
      right: 12px !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      width: auto !important;
      flex-shrink: 0 !important;
      display: flex !important;
      align-items: center !important;
    }`;

console.log('Scanning HTML files to center mobile header text...');

let count = 0;
walkDir(path.join(__dirname, '..'), (filePath) => {
  if (!filePath.endsWith('.html')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    const normalizedTarget = targetMobileCSS.replace(/\r\n/g, '\n');
    const normalizedContent = content.replace(/\r\n/g, '\n');

    if (normalizedContent.includes(normalizedTarget)) {
      const updatedContent = normalizedContent.replace(normalizedTarget, replacementMobileCSS.replace(/\r\n/g, '\n'));
      fs.writeFileSync(filePath, content.includes('\r\n') ? updatedContent.replace(/\n/g, '\r\n') : updatedContent, 'utf8');
      console.log(`Updated HTML file: ${filePath}`);
      count++;
    }
  } catch (e) {
    console.error(`Error processing file ${filePath}: ${e.message}`);
  }
});

console.log(`Absolute centering complete! Modified ${count} HTML files.`);
