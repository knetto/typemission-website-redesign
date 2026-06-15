const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Find all HTML tags that are at the top level or header containers
// Usually containers with class e-parent or elementor-top-section
const regex = /<(div|section|header)[^>]*(e-parent|elementor-top-section|elementor-header)[^>]*>/gi;
let match;
console.log('--- Top-level structural containers ---');
while ((match = regex.exec(content)) !== null) {
  console.log(match[0].substring(0, 300));
}
