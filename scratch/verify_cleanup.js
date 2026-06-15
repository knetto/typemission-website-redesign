const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const regex = /<div[^>]*data-id="775ec8f"[^>]*>/g;
const match = regex.exec(content);
if (match) {
  console.log('Parent tag:', match[0]);
  console.log('Contains elementor-hidden-mobile:', match[0].includes('elementor-hidden-mobile'));
  console.log('Contains elementor-hidden-tablet:', match[0].includes('elementor-hidden-tablet'));
} else {
  console.log('Tag 775ec8f not found');
}
