const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
const content = fs.readFileSync(filePath, 'utf-8');

const startIdx = content.indexOf('<div class="elementor-element elementor-element-fcba14e');
if (startIdx !== -1) {
  // Let's print about 6000 characters to get the whole container
  console.log(content.slice(startIdx, startIdx + 6000));
} else {
  console.log('Hero container div not found');
}
