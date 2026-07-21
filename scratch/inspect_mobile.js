const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../proefles/index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const targetStr = 'elementor-element-3fa2f6f e-con-full elementor-hidden-desktop';
const startIdx = html.indexOf(targetStr);
if (startIdx !== -1) {
  const chunk = html.slice(startIdx + 1500, startIdx + 5000);
  console.log("Chunk 2:");
  console.log(chunk);
}
