const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Find the start of the body or main header area
const bodyIdx = content.indexOf('<body');
const headerArea = content.substring(bodyIdx, bodyIdx + 50000); // look at the first 50KB of the body

// Let's write a small parser or matcher to print the hierarchy of divs/sections inside the header
// We can find all elements with class elementor-element and output their tags
const regex = /<[^>]*class="[^"]*elementor-element[^"]*"[^>]*>/gi;
let match;
console.log('--- Elementor elements in the first 50KB of body ---');
let count = 0;
while ((match = regex.exec(headerArea)) !== null && count < 30) {
  console.log(`${count}: ${match[0].substring(0, 300)}`);
  count++;
}
