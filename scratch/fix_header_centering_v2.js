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

const targetMobileResets = `    /* Reset margins and paddings on widgets and inner elements to prevent alignment issues */
    .elementor-element-8eb8dd5,
    .elementor-element-58771ad,
    .elementor-element-8eb8dd5 .elementor-heading-title,
    .elementor-element-8eb8dd5 .elementor-widget-container,
    .elementor-element-58771ad .elementor-widget-container,
    .elementor-element-58771ad .elementor-button-wrapper {
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Match font styles exactly and align them vertically */
    .elementor-element-8eb8dd5 .elementor-heading-title,
    .elementor-element-58771ad .elementor-button {
      font-size: 14px !important;
      font-weight: 600 !important;
      font-family: "Roboto", Sans-serif !important;
      line-height: 1.2 !important;
      display: inline-flex !important;
      align-items: center !important;
    }
    
    /* Reset extra paddings/borders on button and center text */
    .elementor-element-58771ad .elementor-button {
      border: none !important;
      padding: 0 !important;
      margin: 0 !important;
      background: transparent !important;
      color: #ffffff !important;
      fill: #ffffff !important;
    }`;

const replacementMobileResets = `    /* Reset margins/paddings and force flex centering on all wrappers to ensure perfect vertical alignment */
    .elementor-element-680f272,
    .elementor-element-b81a3ab,
    .elementor-element-8eb8dd5,
    .elementor-element-58771ad,
    .elementor-element-8eb8dd5 .elementor-widget-container,
    .elementor-element-58771ad .elementor-widget-container,
    .elementor-element-58771ad .elementor-button-wrapper {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      height: auto !important;
      min-height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .elementor-element-b81a3ab {
      justify-content: flex-end !important; /* Keep button aligned to the right */
    }
    
    /* Match font styles exactly and align them vertically */
    .elementor-element-8eb8dd5 .elementor-heading-title,
    .elementor-element-58771ad .elementor-button {
      font-size: 14px !important;
      font-weight: 600 !important;
      font-family: "Roboto", Sans-serif !important;
      line-height: 1.2 !important;
      display: inline-flex !important;
      align-items: center !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Reset extra paddings/borders on button and center text */
    .elementor-element-58771ad .elementor-button {
      border: none !important;
      padding: 0 !important;
      margin: 0 !important;
      background: transparent !important;
      color: #ffffff !important;
      fill: #ffffff !important;
    }`;

console.log('Scanning HTML files to apply centering V2...');

let count = 0;
walkDir(path.join(__dirname, '..'), (filePath) => {
  if (!filePath.endsWith('.html')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    const normalizedTarget = targetMobileResets.replace(/\r\n/g, '\n');
    const normalizedContent = content.replace(/\r\n/g, '\n');

    if (normalizedContent.includes(normalizedTarget)) {
      const updatedContent = normalizedContent.replace(normalizedTarget, replacementMobileResets.replace(/\r\n/g, '\n'));
      fs.writeFileSync(filePath, content.includes('\r\n') ? updatedContent.replace(/\n/g, '\r\n') : updatedContent, 'utf8');
      console.log(`Updated HTML file: ${filePath}`);
      count++;
    }
  } catch (e) {
    console.error(`Error processing file ${filePath}: ${e.message}`);
  }
});

console.log(`Centering V2 complete! Modified ${count} HTML files.`);
