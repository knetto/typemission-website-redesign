const fs = require('fs');
const path = require('path');

function getFiles(dir, files_ = []) {
  const files = fs.readdirSync(dir);
  for (let i in files) {
    const name = path.join(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      if (!name.includes('node_modules') && !name.includes('.git')) {
        getFiles(name, files_);
      }
    } else {
      const ext = path.extname(name).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        files_.push({
          path: name,
          size: fs.statSync(name).size
        });
      }
    }
  }
  return files_;
}

const allImages = getFiles(path.join(__dirname, '..'));
console.log(`Filtering large images (> 0.2 MB) and images in "afbeelingen":`);
allImages
  .filter(img => img.size > 200 * 1024 || img.path.includes('afbeelingen'))
  .sort((a, b) => b.size - a.size)
  .forEach(img => {
    console.log(`- ${path.relative(path.join(__dirname, '..'), img.path)} (${(img.size / 1024 / 1024).toFixed(2)} MB)`);
  });
