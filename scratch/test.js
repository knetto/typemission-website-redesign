const fs = require('fs');
const html = fs.readFileSync('proefles/index.html', 'utf8');

let pos = 0;
let count = 0;
while ((pos = html.indexOf('Stuur via WhatsApp', pos)) !== -1) {
  count++;
  console.log(`Occurrence ${count} at pos ${pos}:`);
  console.log(html.slice(pos - 60, pos + 100));
  pos += 18;
}
