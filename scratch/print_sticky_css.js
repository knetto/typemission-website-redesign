const fs = require('fs');
const filePath = 'wp-content/cache/autoptimize/css/autoptimize_single_bf83e39a3e5d6481dc16702d1eb77f16.css';

try {
  const content = fs.readFileSync(filePath, 'utf8');
  const idx = content.indexOf('Sticky Header styling');
  if (idx !== -1) {
    console.log(content.substring(idx - 100));
  } else {
    console.log('Not found');
  }
} catch (e) {
  console.error(e.message);
}
