const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const query = '<div class="elementor-element elementor-element-fcba14e';
const startIndex = content.indexOf(query);

if (startIndex === -1) {
  console.log('Hero start not found');
  process.exit(1);
}

console.log(`Hero starts at index ${startIndex}`);

// Let's find the matching closing div by counting open/close tags
let openDivs = 0;
let currentIndex = startIndex;
let foundEnd = false;

while (currentIndex < content.length) {
  const nextOpen = content.indexOf('<div', currentIndex);
  const nextClose = content.indexOf('</div>', currentIndex);

  if (nextOpen === -1 && nextClose === -1) {
    break;
  }

  // Find which one comes first
  if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
    openDivs++;
    currentIndex = nextOpen + 4;
  } else {
    openDivs--;
    if (openDivs === 0) {
      // Found the matching closing tag!
      const endIndex = nextClose + 6;
      console.log(`Hero ends at index ${endIndex} (length: ${endIndex - startIndex} chars)`);
      const heroHtml = content.substring(startIndex, endIndex);
      fs.writeFileSync('scratch/hero_extracted.html', heroHtml, 'utf8');
      console.log('Saved extracted hero to scratch/hero_extracted.html');
      foundEnd = true;
      break;
    }
    currentIndex = nextClose + 6;
  }
}

if (!foundEnd) {
  console.log('Could not find matching closing div');
}
