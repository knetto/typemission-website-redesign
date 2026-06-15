const fs = require('fs');

function beautifyHTML(html) {
  let formatted = '';
  let indent = 0;
  const tokens = html.split(/(<\/?[a-zA-Z0-9\-]+[^>]*>)/);
  
  for (let token of tokens) {
    token = token.trim();
    if (!token) continue;
    
    if (token.startsWith('</')) {
      indent--;
      formatted += '  '.repeat(Math.max(0, indent)) + token + '\n';
    } else if (token.startsWith('<') && !token.endsWith('/>') && !token.startsWith('<!') && !token.startsWith('<meta') && !token.startsWith('<link') && !token.startsWith('<img') && !token.startsWith('<br') && !token.startsWith('<hr')) {
      formatted += '  '.repeat(Math.max(0, indent)) + token + '\n';
      indent++;
    } else {
      formatted += '  '.repeat(Math.max(0, indent)) + token + '\n';
    }
  }
  return formatted;
}

const rawHtml = fs.readFileSync('scratch/hero_extracted.html', 'utf8');
const beautified = beautifyHTML(rawHtml);
fs.writeFileSync('scratch/hero_beautified.html', beautified, 'utf8');
console.log('Saved beautified hero to scratch/hero_beautified.html');
