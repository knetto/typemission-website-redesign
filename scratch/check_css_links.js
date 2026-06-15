const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
console.log('Includes bf83e39a3e5d6481dc16702d1eb77f16:', content.includes('bf83e39a3e5d6481dc16702d1eb77f16'));

// Let's print out all <link rel="stylesheet"> elements in index.html
const regex = /<link[^>]*rel="stylesheet"[^>]*>/gi;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(match[0]);
}
