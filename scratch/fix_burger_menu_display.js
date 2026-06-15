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

const targetCSS = `  /* Premium Burger Menu Toggle and Sidebar Animations */
  .elementor-menu-toggle {
    background-color: transparent !important;
    border-radius: 0 !important;
    padding: 0 !important;
    color: var(--e-global-color-primary) !important;
    transition: all 0.3s ease !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .elementor-menu-toggle:hover,
  .elementor-menu-toggle:focus {
    background-color: transparent !important;
    color: var(--e-global-color-accent) !important;
    transform: scale(1.15) !important;
  }

  .elementor-menu-toggle svg {
    fill: var(--e-global-color-primary) !important;
    width: 28px !important;
    height: 28px !important;
    transition: fill 0.3s ease !important;
  }

  .elementor-menu-toggle:hover svg,
  .elementor-menu-toggle:focus svg {
    fill: var(--e-global-color-accent) !important;
  }`;

const replacementCSS = `  /* Premium Burger Menu Toggle and Sidebar Animations */
  .elementor-menu-toggle {
    background-color: transparent !important;
    border-radius: 0 !important;
    padding: 0 !important;
    color: var(--e-global-color-primary) !important;
    transition: all 0.3s ease !important;
  }

  .elementor-menu-toggle:hover,
  .elementor-menu-toggle:focus {
    background-color: transparent !important;
    color: var(--e-global-color-accent) !important;
    transform: scale(1.15) !important;
  }

  .elementor-menu-toggle svg {
    fill: var(--e-global-color-primary) !important;
    width: 28px !important;
    height: 28px !important;
    transition: fill 0.3s ease !important;
  }

  .elementor-menu-toggle:hover svg,
  .elementor-menu-toggle:focus svg {
    fill: var(--e-global-color-accent) !important;
  }

  /* Style for the mobile burger menu icon button (removing the grey circular background) */
  .elementor-element.elementor-element-02425f5 .elementor-icon {
    background-color: transparent !important;
    color: var(--e-global-color-primary) !important;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
    padding: 0 !important;
    width: auto !important;
    height: auto !important;
    display: inline-flex !important;
    box-shadow: none !important;
  }

  .elementor-element.elementor-element-02425f5 .elementor-icon svg {
    fill: var(--e-global-color-primary) !important;
    width: 28px !important;
    height: 28px !important;
    transition: fill 0.3s ease, transform 0.3s ease !important;
  }

  .elementor-element.elementor-element-02425f5 .elementor-icon:hover svg,
  .elementor-element.elementor-element-02425f5 .elementor-icon:focus svg {
    fill: var(--e-global-color-accent) !important;
    transform: scale(1.15) !important;
  }`;

console.log('Scanning HTML files to fix burger menu toggle display and style...');

let count = 0;
walkDir(path.join(__dirname, '..'), (filePath) => {
  if (!filePath.endsWith('.html')) return;

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Normalizing spacing inside targetCSS to match differences in line breaks if any
    const normalizedTarget = targetCSS.replace(/\r\n/g, '\n');
    const normalizedContent = content.replace(/\r\n/g, '\n');

    if (normalizedContent.includes(normalizedTarget)) {
      const updatedContent = normalizedContent.replace(normalizedTarget, replacementCSS.replace(/\r\n/g, '\n'));
      // Keep original line endings style of the file
      fs.writeFileSync(filePath, content.includes('\r\n') ? updatedContent.replace(/\n/g, '\r\n') : updatedContent, 'utf8');
      console.log(`Updated HTML file: ${filePath}`);
      count++;
    } else {
      // Let's do a fallback replace in case spacing is slightly different
      const strippedTarget = targetCSS.replace(/\s+/g, '');
      const strippedContent = content.replace(/\s+/g, '');
      if (strippedContent.includes(strippedTarget)) {
        console.log(`Found matching stripped content in ${filePath}, but direct replace failed due to whitespace differences. Let's fix...`);
      }
    }
  } catch (e) {
    console.error(`Error processing file ${filePath}: ${e.message}`);
  }
});

console.log(`Burger menu display fix complete! Modified ${count} HTML files.`);
