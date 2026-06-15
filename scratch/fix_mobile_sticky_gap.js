const fs = require('fs');
const path = require('path');

const filePath = 'wp-includes/js/jquery/jquery.min.js';

const targetCode = `    function updateBannerHeight() {
      var banner = window.innerWidth >= 1025 ? 
        document.querySelector('.elementor-element-b54a980') : 
        document.querySelector('.elementor-element-7a5649f');
      if (banner && banner.offsetHeight > 0) {
        document.documentElement.style.setProperty('--banner-height', banner.offsetHeight + 'px');
      } else {
        document.documentElement.style.setProperty('--banner-height', '0px');
      }
    }`;

const replacementCode = `    function updateBannerHeight() {
      // Use .elementor-element-b54a980 as the single active announcement bar across all viewports
      var banner = document.querySelector('.elementor-element-b54a980');
      if (banner && banner.offsetHeight > 0) {
        document.documentElement.style.setProperty('--banner-height', banner.offsetHeight + 'px');
      } else {
        document.documentElement.style.setProperty('--banner-height', '0px');
      }
    }`;

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Normalize line endings to ensure match
  const normalizedTarget = targetCode.replace(/\r\n/g, '\n');
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const normalizedReplacement = replacementCode.replace(/\r\n/g, '\n');
  
  if (normalizedContent.includes(normalizedTarget)) {
    const updatedContent = normalizedContent.replace(normalizedTarget, normalizedReplacement);
    
    // Write back with original line endings
    const finalContent = content.includes('\r\n') 
      ? updatedContent.replace(/\n/g, '\r\n') 
      : updatedContent;
      
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log('Successfully updated wp-includes/js/jquery/jquery.min.js!');
  } else {
    console.error('Target code not found in jquery.min.js!');
  }
} catch (e) {
  console.error('Error modifying jquery.min.js:', e.message);
}
