const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
const content = fs.readFileSync(filePath, 'utf-8');

// Find the style tags containing "hero-container-redesign" or "fcba14e"
// We want to print the CSS blocks. Let's find all CSS around the style tags.
let pos = 0;
while ((pos = content.indexOf('<style', pos)) !== -1) {
  const endStyle = content.indexOf('</style>', pos);
  if (endStyle !== -1) {
    const styleContent = content.slice(pos, endStyle + 8);
    if (styleContent.includes('hero-container-redesign') || styleContent.includes('fcba14e') || styleContent.includes('hero-mobile-image-clip')) {
      console.log(`=== Style Tag at index ${pos} ===`);
      console.log(styleContent);
      console.log('='.repeat(40));
    }
  }
  pos = endStyle !== -1 ? endStyle + 8 : pos + 1;
}
