const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf-8');

// Find and replace the tablet spies styles:
// .hero-layer-spies { left: 10%; height: 90%; }
// with:
// .hero-layer-spies { left: 38%; height: 125%; bottom: -25%; }
const target = /\.hero-layer-spies\s*\{\s*left:\s*10%;\s*height:\s*90%;\s*\}/;
if (target.test(content)) {
  content = content.replace(target, `.hero-layer-spies {
      left: 38%;
      height: 125%;
      bottom: -25%;
    }`);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully updated tablet spies style!');
} else {
  console.log('Tablet spies style pattern not found or already updated.');
}
