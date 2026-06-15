const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Locate style tags
const startTag = '<style id="custom-hero-redesign-styles">';
const endTag = '</style>';

const startIdx = content.indexOf(startTag);
const endIdx = content.indexOf(endTag, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find CSS style tags');
  process.exit(1);
}

let styleContent = content.slice(startIdx + startTag.length, endIdx);

// Replace desktop helicopter styling
// top: 15%; left: 43%; width: 12%; z-index: 2;
styleContent = styleContent.replace(/\.hero-layer-heli\s*\{[^}]*\}/, `.hero-layer-heli {
    top: 22%;
    left: 44%; /* Hovering further left/lower over the slant */
    width: 17%;
    z-index: 2; /* Behind spies */
  }`);

// Replace desktop spies styling
// bottom: -15%; left: 51%; height: 125%; width: auto; z-index: 3;
styleContent = styleContent.replace(/\.hero-layer-spies\s*\{[^}]*\}/, `.hero-layer-spies {
    bottom: -36%;
    left: 42%; /* Shifted left to overlap the slant divider significantly */
    height: 140%;
    width: auto;
    z-index: 3;
  }`);

// Replace desktop girl styling
styleContent = styleContent.replace(/\.hero-layer-girl\s*\{[^}]*\}/, `.hero-layer-girl {
    bottom: -1%;
    right: -2%;
    height: 72%;
    width: auto;
    z-index: 4;
  }`);

// Replace tablet styling in media query
const tabletMediaStart = styleContent.indexOf('@media (max-width: 1024px)');
if (tabletMediaStart !== -1) {
  const tabletMediaEnd = styleContent.indexOf('}', tabletMediaStart);
  let tabletBlock = styleContent.slice(tabletMediaStart, tabletMediaEnd + 1);
  
  // Adjust tablet sizes
  tabletBlock = tabletBlock.replace(/left:\s*36%;\s*width:\s*15%;/g, 'left: 36%; width: 18%; top: 22%;');
  tabletBlock = tabletBlock.replace(/left:\s*45%;\s*height:\s*110%;\s*bottom:\s*-10%;/g, 'left: 38%; height: 125%; bottom: -25%;');
  tabletBlock = tabletBlock.replace(/height:\s*62%;/g, 'height: 68%;');
  
  styleContent = styleContent.slice(0, tabletMediaStart) + tabletBlock + styleContent.slice(tabletMediaEnd + 1);
}

content = content.slice(0, startIdx + startTag.length) + styleContent + content.slice(endIdx);
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully applied version 2 CSS adjustments to spies, helicopter, and typing girl!');
