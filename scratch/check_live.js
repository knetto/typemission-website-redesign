const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Server returns hero-checklist-new:', data.includes('hero-checklist-new'));
  });
}).on('error', (err) => {
  console.error('Error fetching live server:', err.message);
});
