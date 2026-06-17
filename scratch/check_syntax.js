const fs = require('fs');
const cheerio = require('cheerio');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('script').each((index, el) => {
  const scriptContent = $(el).text();
  const src = $(el).attr('src');
  if (src) {
    console.log(`Script ${index}: External (${src})`);
    return;
  }
  if (!scriptContent.trim()) {
    return;
  }
  console.log(`Script ${index}: Checking inline script...`);
  try {
    new vm.Script(scriptContent);
    console.log(`Script ${index}: Syntax OK`);
  } catch (err) {
    console.error(`Script ${index}: Syntax Error:`, err.message);
    // Print lines around error
    const lines = scriptContent.split('\n');
    console.log('Error Location Context:');
    lines.forEach((line, lineIdx) => {
      console.log(`${lineIdx + 1}: ${line}`);
    });
  }
});
