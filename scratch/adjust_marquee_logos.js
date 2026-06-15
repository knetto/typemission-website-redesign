const fs = require('fs');
const filePath = 'wp-content/cache/autoptimize/css/autoptimize_single_bf83e39a3e5d6481dc16702d1eb77f16.css';

const targetBlock = `.logo-marquee-item {
  padding: 0 45px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

.logo-marquee-item img {
  height: 48px !important;
  width: auto !important;
  max-width: 160px !important;
  object-fit: contain !important;
  filter: grayscale(100%) opacity(0.55) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}`;

const replacementBlock = `.logo-marquee-item {
  padding: 0 45px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

@media (max-width: 767px) {
  .logo-marquee-item {
    padding: 0 20px !important;
  }
}

.logo-marquee-item img {
  height: 60px !important;
  width: auto !important;
  max-width: 200px !important;
  object-fit: contain !important;
  filter: grayscale(100%) opacity(0.55) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}`;

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const normalizedTarget = targetBlock.replace(/\r\n/g, '\n');
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const normalizedReplacement = replacementBlock.replace(/\r\n/g, '\n');
  
  if (normalizedContent.includes(normalizedTarget)) {
    const updatedContent = normalizedContent.replace(normalizedTarget, normalizedReplacement);
    const finalContent = content.includes('\r\n') 
      ? updatedContent.replace(/\n/g, '\r\n') 
      : updatedContent;
      
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log('Successfully updated logo marquee styles in autoptimize_single_bf83e39a3e5d6481dc16702d1eb77f16.css!');
  } else {
    console.error('Target CSS block not found!');
  }
} catch (e) {
  console.error('Error modifying CSS:', e.message);
}
