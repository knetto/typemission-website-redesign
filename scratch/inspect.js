const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
const content = fs.readFileSync(filePath, 'utf-8');

// Print characters between 207000 and 212500
console.log(content.slice(207000, 212500));
