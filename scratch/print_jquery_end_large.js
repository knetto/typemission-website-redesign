const fs = require('fs');
const filePath = 'wp-includes/js/jquery/jquery.min.js';

try {
  const content = fs.readFileSync(filePath, 'utf8');
  const idx = content.indexOf('header-scrolled-down');
  if (idx !== -1) {
    console.log(content.substring(idx - 1500));
  } else {
    console.log('Not found');
  }
} catch (e) {
  console.error(e.message);
}
