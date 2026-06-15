const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Look for style blocks
const regex = /<style[^>]*>([\s\S]*?)<\/style>/g;
let match;
let css = '';
while ((match = regex.exec(content)) !== null) {
  css += match[1] + '\n';
}

const classes = ['fcba14e', '143ce33', 'f351f83', 'cd07f65', '3e3ed40', '62df2b2', 'ecb8136', 'c694225', '07ce5d1', '6c51155', '43c4cdd', '0bfd35f'];

// Look for @media queries
const mediaRegex = /@media\s*\([^\)]+\)\s*\{([^\{]*\{[^\}]*\}[^\}]*)*\}/g;
let mediaMatch;
while ((mediaMatch = mediaRegex.exec(css)) !== null) {
  const mediaContent = mediaMatch[0];
  let foundAny = false;
  let result = mediaMatch[0].substring(0, mediaMatch[0].indexOf('{') + 1) + '\n';
  
  classes.forEach(cls => {
    const clsRegex = new RegExp(`\\.elementor-316\\s+[^\\{]*${cls}[^\\{]*\\{[^\\}]*\\}`, 'g');
    let m;
    while ((m = clsRegex.exec(mediaContent)) !== null) {
      result += '  ' + m[0] + '\n';
      foundAny = true;
    }
  });
  
  if (foundAny) {
    result += '}';
    console.log(result);
    console.log('-------------------------------------------');
  }
}
