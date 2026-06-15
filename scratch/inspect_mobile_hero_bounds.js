const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const query = '<div class="elementor-element elementor-element-8951b71';
const startIndex = content.indexOf(query);

if (startIndex === -1) {
  console.log('Mobile hero not found');
  process.exit(1);
}

console.log(`Mobile hero starts at index ${startIndex}`);

let openDivs = 0;
let currentIndex = startIndex;
let foundEnd = false;

while (currentIndex < content.length) {
  const nextOpen = content.indexOf('<div', currentIndex);
  const nextClose = content.indexOf('</div>', currentIndex);

  if (nextOpen === -1 && nextClose === -1) {
    break;
  }

  if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
    openDivs++;
    currentIndex = nextOpen + 4;
  } else {
    openDivs--;
    if (openDivs === 0) {
      const endIndex = nextClose + 6;
      console.log(`Mobile hero ends at index ${endIndex} (length: ${endIndex - startIndex} chars)`);
      const extracted = content.substring(startIndex, endIndex);
      fs.writeFileSync('scratch/mobile_hero_extracted.html', extracted, 'utf8');
      foundEnd = true;
      break;
    }
    currentIndex = nextClose + 6;
  }
}

if (!foundEnd) {
  console.log('Could not find matching closing div');
}
