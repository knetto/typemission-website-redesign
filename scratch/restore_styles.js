const fs = require('fs');

const src = 'C:\\Users\\corne\\Documents\\stage\\Typetests prototypes\\final\\iframe version\\leaderboard-iframe\\styles.css';
const dest = 'C:\\Users\\corne\\Documents\\stage\\website improvements\\site clone simular small fixes\\leaderboard-iframe\\styles.css';

fs.copyFileSync(src, dest);
console.log('Restored styles.css successfully!');
