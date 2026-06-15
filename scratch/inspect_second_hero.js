const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const query = 'De leukste typecursus voor kinderen';
const index = content.indexOf(query, 215000); // search after first hero

if (index === -1) {
  console.log('Second hero not found');
} else {
  // Let's print the structure around it (start 1500 chars before, end 3500 chars after)
  console.log(content.substring(index - 1500, index + 3500));
}
