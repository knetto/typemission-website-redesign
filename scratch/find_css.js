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

classes.forEach(cls => {
  const clsRegex = new RegExp(`\\.elementor-316\\s+[^\\{]*${cls}[^\\{]*\\{[^\\}]*\\}`, 'g');
  let m;
  console.log(`=== CSS for ${cls} ===`);
  while ((m = clsRegex.exec(css)) !== null) {
    console.log(m[0]);
  }
});
