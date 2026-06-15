const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

function inspectEl(id) {
  const idx = content.indexOf(`data-id="${id}"`);
  if (idx !== -1) {
    const start = content.lastIndexOf('<', idx);
    // Find the end tag (matching div closure)
    // For simplicity, print 1000 characters
    console.log(`--- Element ${id} ---`);
    console.log(content.substring(start, start + 1200));
  } else {
    console.log(`Element ${id} not found`);
  }
}

inspectEl('7a5649f');
inspectEl('b54a980');
