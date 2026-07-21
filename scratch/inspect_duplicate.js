const fs = require('fs');
const html = fs.readFileSync('proefles/index.html', 'utf8');

const idx = html.indexOf('Stuur via WhatsApp');
console.log('First occurrence of Stuur via WhatsApp:', idx);
const idx2 = html.indexOf('Stuur via WhatsApp', idx + 1);
console.log('Second occurrence of Stuur via WhatsApp:', idx2);

if (idx !== -1) {
  console.log('Snippet around first:');
  console.log(html.slice(idx - 100, idx + 300));
}
if (idx2 !== -1) {
  console.log('Snippet around second:');
  console.log(html.slice(idx2 - 100, idx2 + 300));
}
