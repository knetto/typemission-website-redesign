const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const headerIdx = content.indexOf('<header');
if (headerIdx !== -1) {
  const headerEnd = content.indexOf('</header>', headerIdx);
  const headerContent = content.substring(headerIdx, headerEnd + 9);
  
  console.log('--- HEADER CONTENT NARRATIVE ---');
  // Find all opening tags within <header>
  const regex = /<([a-zA-Z0-9]+)[^>]*(id|class)="[^"]*"[^>]*>/gi;
  let match;
  while ((match = regex.exec(headerContent)) !== null) {
    const fullTag = match[0];
    if (fullTag.includes('elementor-element') || fullTag.includes('header')) {
      console.log(fullTag.substring(0, 150));
    }
  }
} else {
  console.log('No <header> element found!');
}
