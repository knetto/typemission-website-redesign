const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Thicker checkmark style live:', data.includes('stroke-width: 4.5px !important; /* Made checkmark stroke thicker */'));
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
