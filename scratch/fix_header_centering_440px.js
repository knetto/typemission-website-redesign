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

const targetMobileCSS = `    /* Default layout for narrow mobile screens (<380px): align text to the left, button to the right */
    .elementor-element-b54a980 > .e-con-inner {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding-left: 12px !important;
      padding-right: 12px !important;
      gap: 8px !important;
    }
    .elementor-element-680f272.elementor-hidden-mobile {
      display: flex !important;
      width: auto !important;
      flex-grow: 1 !important;
      justify-content: flex-start !important;
      align-items: center !important;
    }
    .elementor-element-8eb8dd5 .elementor-heading-title {
      text-align: left !important;
    }
    .elementor-element-b81a3ab {
      width: auto !important;
      flex-shrink: 0 !important;
      display: flex !important;
      align-items: center !important;
    }

    /* For screens >= 380px: Center the text relative to the screen and position login button on the right */
    @media (min-width: 380px) {
      .elementor-element-b54a980 > .e-con-inner {
        position: relative !important;
        justify-content: center !important;
      }
      .elementor-element-680f272.elementor-hidden-mobile {
        justify-content: center !important;
      }
      .elementor-element-8eb8dd5 .elementor-heading-title {
        text-align: center !important;
      }
      .elementor-element-b81a3ab {
        position: absolute !important;
        right: 12px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
      }
    }`;

const replacementMobileCSS = `    /* Default layout for narrow mobile screens (<440px): align text to the left, button to the right */
    .elementor-element-b54a980 > .e-con-inner {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding-left: 12px !important;
      padding-right: 12px !important;
      gap: 8px !important;
    }
    .elementor-element-680f272.elementor-hidden-mobile {
      display: flex !important;
      width: auto !important;
      flex-grow: 1 !important;
      justify-content: flex-start !important;
      align-items: center !important;
    }
    .elementor-element-8eb8dd5 .elementor-heading-title {
      text-align: left !important;
    }
    .elementor-element-b81a3ab {
      width: auto !important;
      flex-shrink: 0 !important;
      display: flex !important;
      align-items: center !important;
    }

    /* For screens >= 440px: Center the text relative to the screen and position login button on the right */
    @media (min-width: 440px) {
      .elementor-element-b54a980 > .e-con-inner {
        position: relative !important;
        justify-content: center !important;
      }
      .elementor-element-680f272.elementor-hidden-mobile {
        justify-content: center !important;
      }
      .elementor-element-8eb8dd5 .elementor-heading-title {
        text-align: center !important;
      }
      .elementor-element-b81a3ab {
        position: absolute !important;
        right: 12px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
      }
    }`;

console.log('Scanning HTML files to update centering breakpoint to 440px...');

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

console.log(`Breakpoint update complete! Modified ${count} HTML files.`);
