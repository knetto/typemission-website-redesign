const fs = require('fs');

const htmlFile = 'index.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const targetRule = `  .hero-checklist-new .check-icon-svg {
    width: 22px;
    height: 22px;
    color: #3b0733; /* Deep purple checkmark */
    margin-right: 12px;
    flex-shrink: 0;
    background: #9ad744; /* Vibrant solid green circle */
    border-radius: 50%;
    padding: 4px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }`;

const replacementRule = `  .hero-checklist-new .check-icon-svg {
    width: 22px;
    height: 22px;
    color: #3b0733; /* Deep purple checkmark */
    margin-right: 12px;
    flex-shrink: 0;
    background: #9ad744; /* Vibrant solid green circle */
    border-radius: 50%;
    padding: 4px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    stroke-width: 4.5px !important; /* Made checkmark stroke thicker */
  }`;

if (content.includes(targetRule)) {
  content = content.replace(targetRule, replacementRule);
  fs.writeFileSync(htmlFile, content, 'utf8');
  console.log('Successfully made checkmarks thicker in index.html!');
} else {
  console.error('ERROR: Could not find target checkmark CSS rule in index.html');
}
