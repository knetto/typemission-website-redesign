const fs = require('fs');
let html = fs.readFileSync('proefles/index.html', 'utf8');

// Replace all tm-share-child-card blocks cleanly
html = html.replace(/<div class="tm-share-child-card">[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/g, '');
html = html.replace(/<div class="tm-form-title-badge">[\s\S]*?<\/div>/g, '');
html = html.replace(/<style id="proefles-mobile-redesign">[\s\S]*?<\/style>/g, '');
html = html.replace(/<script id="proefles-copy-script">[\s\S]*?<\/script>/g, '');

console.log('Remaining tm-share-child-card:', html.includes('tm-share-child-card'));
fs.writeFileSync('proefles/index.html', html, 'utf8');
