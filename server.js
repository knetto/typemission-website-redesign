const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'font/eot',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime'
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/log-layout') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      fs.writeFileSync(path.join(__dirname, 'layout.txt'), body);
      res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end('OK');
    });
    return;
  }

  console.log(`Request: ${req.method} ${req.url}`);
  // Decode URL to handle spaces and special chars
  let safeUrl;
  try {
    safeUrl = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  } catch (e) {
    safeUrl = req.url.split('?')[0].split('#')[0];
  }
  
  let filePath = path.join(__dirname, safeUrl);

  // If path is a directory or has no extension, handle pretty URLs
  let ext = path.extname(filePath);
  if (!ext) {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      ext = '.html';
    } else {
      if (fs.existsSync(filePath + '.html')) {
        filePath += '.html';
        ext = '.html';
      } else if (fs.existsSync(filePath + '/index.html')) {
        filePath += '/index.html';
        ext = '.html';
      }
    }
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const mime = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 
    'Content-Type': mime,
    'Access-Control-Allow-Origin': '*'
  });
  
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
});

server.listen(PORT, () => {
  console.log(`Local development server is running at http://localhost:${PORT}`);
});
