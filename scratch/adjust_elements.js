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

// Replace helicopter left position on desktop
styleContent = styleContent.replace(/left:\s*48%;\s*\/\*\s*Positioned\s*relative/g, 'left: 51%; /* Positioned relative');

// Replace helicopter left position on tablet (inside @media max-width: 1024px)
const tabletMediaStart = styleContent.indexOf('@media (max-width: 1024px)');
if (tabletMediaStart !== -1) {
  const tabletMediaEnd = styleContent.indexOf('}', tabletMediaStart);
  let tabletBlock = styleContent.slice(tabletMediaStart, tabletMediaEnd + 1);
  tabletBlock = tabletBlock.replace(/left:\s*45%;/g, 'left: 48%;');
  // tablet spies: left: 5%, height: 115%, bottom: -10%
  tabletBlock = tabletBlock.replace(/\.hero-layer-spies\s*\{[^}]*\}/g, `.hero-layer-spies {
      left: 5%;
      height: 115%;
      bottom: -10%;
    }`);
  
  styleContent = styleContent.slice(0, tabletMediaStart) + tabletBlock + styleContent.slice(tabletMediaEnd + 1);
}

// Replace desktop spies: bottom: -15%; left: 8%; height: 125%; width: auto; z-index: 3;
styleContent = styleContent.replace(/\.hero-layer-spies\s*\{[^}]*\}/, `.hero-layer-spies {
    bottom: -15%;
    left: 8%;
    height: 125%;
    width: auto;
    z-index: 3;
  }`);

content = content.slice(0, startIdx + startTag.length) + styleContent + content.slice(endIdx);
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully adjusted spies, girl spy, and helicopter size/position in index.html!');
