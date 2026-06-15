const fs = require('fs');

const fileNew = 'c:/Users/corne/Documents/stage/website improvements/site clone simular small fixes/index.html';
const fileOld = 'c:/Users/corne/Documents/stage/website improvements/site clone simular small fixes/index.html.bak';

const newContent = fs.readFileSync(fileNew, 'utf8');
const oldContent = fs.readFileSync(fileOld, 'utf8');

console.log(`New size: ${newContent.length} chars, Old size: ${oldContent.length} chars.`);

let firstMismatch = -1;
for (let i = 0; i < Math.min(newContent.length, oldContent.length); i++) {
  if (newContent[i] !== oldContent[i]) {
    firstMismatch = i;
    break;
  }
}

if (firstMismatch !== -1) {
  console.log(`First mismatch at index ${firstMismatch}`);
  console.log('\n--- OLD AROUND MISMATCH ---');
  console.log(oldContent.substring(Math.max(0, firstMismatch - 50), firstMismatch + 800));
  console.log('\n--- NEW AROUND MISMATCH ---');
  console.log(newContent.substring(Math.max(0, firstMismatch - 50), firstMismatch + 800));
} else {
  console.log('No mismatch found up to the length of the shorter file.');
}
