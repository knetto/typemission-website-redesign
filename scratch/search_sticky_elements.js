const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Search for any occurrence of "elementor-sticky" or "sticky" in data-settings or class lists
// Let's print out the full tags of elements that contain "sticky" in data-settings
const regex = /<[^>]*sticky[^>]*>/gi;
let match;
console.log('--- Matching tags containing "sticky" ---');
while ((match = regex.exec(content)) !== null) {
  console.log(match[0]);
}

console.log('--- Matching style rules containing "elementor-sticky" or "sticky" ---');
const styleRegex = /[^}]*sticky[^}]*\{[^}]*\}/gi;
while ((match = styleRegex.exec(content)) !== null) {
  console.log(match[0].trim());
}
