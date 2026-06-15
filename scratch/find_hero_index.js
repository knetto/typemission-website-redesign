const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const query = 'class="elementor-element elementor-element-fcba14e';
const index = content.indexOf(query);
if (index === -1) {
  console.log('Not found');
} else {
  // Find which line this character is on
  const linesBefore = content.substring(0, index).split('\n');
  console.log(`Found query at index ${index}, line ${linesBefore.length}`);
  
  // Let's print the line content around it (first 1000 characters of that line)
  const lineIndex = linesBefore.length - 1;
  const lines = content.split('\n');
  console.log(`Line length: ${lines[lineIndex].length}`);
  console.log(`Line content prefix: ${lines[lineIndex].substring(0, 1000)}`);
}
