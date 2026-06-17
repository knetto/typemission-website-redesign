const { spawn } = require('child_process');
const http = require('http');

console.log('Spawning Chrome headlessly...');
const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  'http://localhost:3000'
]);

chrome.on('error', (err) => {
  console.error('Failed to start Chrome:', err);
  process.exit(1);
});

// Wait 2 seconds for Chrome to start and load the page
setTimeout(() => {
  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
      try {
        const targets = JSON.parse(data);
        const pageTarget = targets.find(t => t.type === 'page');
        if (!pageTarget) {
          console.error('No page target found in Chrome devtools.');
          chrome.kill();
          process.exit(1);
        }

        const wsUrl = pageTarget.webSocketDebuggerUrl;
        console.log('Connecting to WebSocket:', wsUrl);

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          console.log('WebSocket connection open. Enabling Runtime, Log, and Input...');
          ws.send(JSON.stringify({ id: 1, method: 'Log.enable' }));
          ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
          ws.send(JSON.stringify({ id: 3, method: 'Input.enable' }));
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          
          if (msg.method === 'Runtime.consoleAPICalled') {
            const args = msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
            console.log(`[CONSOLE ${msg.params.type.toUpperCase()}] ${args}`);
          }
          
          if (msg.method === 'Log.entryAdded') {
            console.log(`[LOG ${msg.params.entry.level.toUpperCase()}] ${msg.params.entry.text} (${msg.params.entry.url})`);
          }
          
          if (msg.method === 'Runtime.exceptionThrown') {
            console.error('[EXCEPTION]', msg.params.exceptionDetails.exception.description);
          }
        };

        // Scroll action after 2 seconds
        setTimeout(() => {
          console.log('Sending scroll input (wheel)...');
          // Send a mouse wheel event to scroll down
          ws.send(JSON.stringify({
            id: 10,
            method: 'Input.dispatchMouseEvent',
            params: {
              type: 'mouseWheel',
              x: 100,
              y: 100,
              deltaX: 0,
              deltaY: 300
            }
          }));
        }, 2000);

        // Let it run for another 2 seconds to collect scroll logs, then shut down
        setTimeout(() => {
          console.log('Shutting down Chrome...');
          ws.close();
          chrome.kill();
          process.exit(0);
        }, 5000);

      } catch (err) {
        console.error('Failed to parse target JSON:', err);
        chrome.kill();
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    console.error('Failed to query DevTools targets:', err.message);
    chrome.kill();
    process.exit(1);
  });
}, 2000);
