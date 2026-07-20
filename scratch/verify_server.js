const http = require('http');

function checkUrl(url, expectedTerm) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200 && (!expectedTerm || data.includes(expectedTerm))) {
          console.log(`Success: ${url} loads with status 200`);
          resolve(true);
        } else {
          console.error(`Failure: ${url} returned status ${res.statusCode}`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.error(`Error connecting to ${url}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  const homeOk = await checkUrl('http://localhost:3000/', 'leaderboard-iframe/index.html');
  const iframeOk = await checkUrl('http://localhost:3000/leaderboard-iframe/index.html', 'styles.css');
  const stylesOk = await checkUrl('http://localhost:3000/leaderboard-iframe/styles.css');
  const scriptOk = await checkUrl('http://localhost:3000/leaderboard-iframe/script.js');
  
  if (homeOk && iframeOk && stylesOk && scriptOk) {
    console.log('\n--- ALL VERIFICATIONS PASSED ---');
  } else {
    console.error('\n--- SOME VERIFICATIONS FAILED ---');
  }
}

run();
