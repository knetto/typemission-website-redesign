const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../leaderboard-iframe/styles.css');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `/* Transparent background in iframe mode */
html,
body.iframe-mode,
body.iframe-mode main,
body.iframe-mode .test-section {
  background: transparent !important;
}`;

const replacementStr = `/* White background in iframe mode */
html,
body.iframe-mode,
body.iframe-mode main,
body.iframe-mode .test-section {
  background: #ffffff !important;
}`;

// Normalize line endings to avoid issues with CRLF vs LF
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = targetStr.replace(/\r\n/g, '\n');
const normalizedReplacement = replacementStr.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const updatedContent = normalizedContent.replace(normalizedTarget, normalizedReplacement);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log('Successfully changed iframe background to white in styles.css!');
} else {
  console.error('Target background CSS block not found in styles.css!');
}
