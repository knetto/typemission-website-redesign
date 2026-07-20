const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const target = $('.typetest-leaderboard-section');
if (target.length === 0) {
  console.log('Target not found!');
  process.exit(1);
}

// Print parents
const parents = [];
target.parents().each((i, el) => {
  const classes = $(el).attr('class') || '';
  const id = $(el).attr('id') || '';
  const style = $(el).attr('style') || '';
  parents.push(`${el.name}${id ? '#' + id : ''}${classes ? '.' + classes.split(' ').join('.') : ''} [style: ${style}]`);
});

console.log('Nesting hierarchy (inner to outer):');
parents.forEach((p, i) => console.log(`  ${i}: ${p}`));
