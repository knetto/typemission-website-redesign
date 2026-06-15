const fs = require('fs');
const filePath = 'wp-content/cache/autoptimize/css/autoptimize_single_bf83e39a3e5d6481dc16702d1eb77f16.css';

try {
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log('--- Checking for elementor-sticky rules ---');
  let idx = 0;
  while ((idx = content.indexOf('elementor-sticky', idx)) !== -1) {
    console.log(content.substring(Math.max(0, idx - 50), Math.min(content.length, idx + 200)));
    console.log('-------------------\n');
    idx += 'elementor-sticky'.length;
  }
} catch (e) {
  console.error(e.message);
}
