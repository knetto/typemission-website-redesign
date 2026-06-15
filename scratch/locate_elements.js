const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
const lines = fs.readFileSync(filePath, 'utf-8').split('\n');

function findLineWithSubstring(substr, startFrom = 0) {
  for (let i = startFrom; i < lines.length; i++) {
    if (lines[i].includes(substr)) {
      return i + 1; // 1-based line number
    }
  }
  return -1;
}

const customStyleLineStart = findLineWithSubstring('<style id="custom-hero-redesign-styles">');
let customStyleLineEnd = -1;
if (customStyleLineStart !== -1) {
  customStyleLineEnd = findLineWithSubstring('</style>', customStyleLineStart - 1);
}

const heroContainerLine = findLineWithSubstring('class="elementor-element elementor-element-fcba14e');
const bodyCloseLine = findLineWithSubstring('</body>');

console.log(`custom-hero-redesign-styles: starts at line ${customStyleLineStart}, ends at line ${customStyleLineEnd}`);
console.log(`hero container starts at line ${heroContainerLine}`);
console.log(`body closing tag is at line ${bodyCloseLine}`);

// Print lines around style tag to verify content
if (customStyleLineStart !== -1 && customStyleLineEnd !== -1) {
  console.log('\n--- Style Tag start content ---');
  console.log(lines.slice(customStyleLineStart - 1, customStyleLineStart + 3).join('\n'));
  console.log('--- Style Tag end content ---');
  console.log(lines.slice(customStyleLineEnd - 3, customStyleLineEnd).join('\n'));
}

if (heroContainerLine !== -1) {
  console.log('\n--- Hero Container line content ---');
  console.log(lines.slice(heroContainerLine - 1, heroContainerLine + 2).join('\n'));
}
