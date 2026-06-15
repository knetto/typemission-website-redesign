const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Blue background style live:', data.includes('background: #607db5 !important;'));
    console.log('Purple checkmark color live:', data.includes('color: #3b0733; /* Deep purple checkmark */'));
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
