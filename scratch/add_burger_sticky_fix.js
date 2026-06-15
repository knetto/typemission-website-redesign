const fs = require('fs');
const filePath = 'wp-content/cache/autoptimize/css/autoptimize_single_bf83e39a3e5d6481dc16702d1eb77f16.css';

const rule = `
/* Disable individual sticky behavior on mobile burger menu icon since the parent header is already sticky */
.elementor-element.elementor-element-02425f5 {
  position: static !important;
  top: auto !important;
}
`;

try {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('Disable individual sticky behavior on mobile burger menu icon')) {
    content += rule;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully appended rule to autoptimize_single_bf83e39a3e5d6481dc16702d1eb77f16.css!');
  } else {
    console.log('Rule already exists in autoptimize_single_bf83e39a3e5d6481dc16702d1eb77f16.css.');
  }
} catch (e) {
  console.error('Error updating CSS file:', e.message);
}
