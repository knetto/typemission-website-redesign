const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const heroStart = content.indexOf('class="elementor-element elementor-element-fcba14e');
if (heroStart === -1) {
  console.log('Hero section not found by class.');
} else {
  // Let's find the closing tag or print a good chunk
  // We want to find where the hero section ends.
  // The hero section contains child containers, let's print the first 6000 chars of it.
  console.log(content.substring(heroStart - 50, heroStart + 8000));
}
