const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../proefles/index.html');
let html = fs.readFileSync(targetFile, 'utf8');

// Strip all style tags with id="proefles-mobile-redesign"
html = html.replace(/<style id="proefles-mobile-redesign">[\s\S]*?<\/style>/gi, '');

// Strip all script tags with id="proefles-copy-script"
html = html.replace(/<script id="proefles-copy-script">[\s\S]*?<\/script>/gi, '');

// Strip all instances of tm-share-child-card
while (html.includes('tm-share-child-card')) {
  const start = html.indexOf('<div class="tm-share-child-card">');
  if (start === -1) break;
  // Find matching closing div for tm-share-child-card
  // The card has 2 inner divs: tm-share-header and tm-share-buttons-grid
  // So it ends after 3 </div>'s
  let pos = start;
  let count = 0;
  while (count < 3) {
    const divEnd = html.indexOf('</div>', pos);
    if (divEnd === -1) break;
    count++;
    pos = divEnd + 6;
  }
  html = html.slice(0, start) + html.slice(pos);
}

// Strip all instances of tm-form-title-badge
while (html.includes('tm-form-title-badge')) {
  const start = html.indexOf('<div class="tm-form-title-badge">');
  if (start === -1) break;
  const end = html.indexOf('</div>', start) + 6;
  html = html.slice(0, start) + html.slice(end);
}

// Ensure clean <form> tag
const brokenFormRegex = /<form class="elementor-form"[\s\S]*?>/;
const cleanFormTag = '<form class="elementor-form" method="post" name="Contact Form" aria-label="Contact Form">';
html = html.replace(brokenFormRegex, cleanFormTag);

fs.writeFileSync(targetFile, html, 'utf8');
console.log('Cleaned all duplicates from proefles/index.html');
