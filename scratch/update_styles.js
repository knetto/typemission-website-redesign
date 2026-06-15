const fs = require('fs');

const htmlFile = 'index.html';
let content = fs.readFileSync(htmlFile, 'utf8');

const startStyleQuery = '<style id="custom-hero-redesign-styles">';
const startIdx = content.indexOf(startStyleQuery);
if (startIdx === -1) {
  console.error('ERROR: Could not find custom style block start');
  process.exit(1);
}

const endStyleQuery = '</style>';
const endIdx = content.indexOf(endStyleQuery, startIdx);
if (endIdx === -1) {
  console.error('ERROR: Could not find custom style block end');
  process.exit(1);
}

console.log(`Style block found at indices ${startIdx} to ${endIdx}`);

const updatedStyleBlock = `<style id="custom-hero-redesign-styles">
  /* Checkbox styling */
  .hero-checklist-new {
    list-style: none;
    padding: 0;
    margin: 20px 0 30px 0;
  }
  .hero-checklist-new li {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: 300;
    color: #fff;
  }
  .hero-checklist-new .check-icon-svg {
    width: 22px;
    height: 22px;
    color: #3b0733; /* Deep purple checkmark */
    margin-right: 12px;
    flex-shrink: 0;
    background: #9ad744; /* Vibrant solid green circle */
    border-radius: 50%;
    padding: 4px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* Button animations */
  .elementor-316 .elementor-element.elementor-element-c694225 .elementor-button,
  .elementor-316 .elementor-element.elementor-element-07ce5d1 .elementor-button {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  }
  .elementor-316 .elementor-element.elementor-element-c694225 .elementor-button:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 20px rgba(228, 142, 53, 0.4);
  }
  .elementor-316 .elementor-element.elementor-element-07ce5d1 .elementor-button:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
  }

  /* Blue Counter/Rating badges */
  .elementor-316 .elementor-element.elementor-element-43c4cdd,
  .elementor-316 .elementor-element.elementor-element-0bfd35f {
    background: #607db5 !important;
    border: none !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    padding: 15px 20px !important;
  }
  .elementor-316 .elementor-element.elementor-element-43c4cdd:hover,
  .elementor-316 .elementor-element.elementor-element-0bfd35f:hover {
    background: #718ec4 !important;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  }

  /* Base hidden class for mobile image helper */
  .hero-mobile-image-clip {
    display: none;
  }

  /* Tablet / Desktop overlap fixes */
  @media (max-width: 1024px) {
    .elementor-316 .elementor-element.elementor-element-fcba14e:not(.elementor-motion-effects-element-type-background),
    .elementor-316 .elementor-element.elementor-element-fcba14e>.elementor-motion-effects-container>.elementor-motion-effects-layer {
      background-image: linear-gradient(90deg, rgba(56, 3, 46, 0.95) 0%, rgba(56, 3, 46, 0.7) 60%, rgba(56, 3, 46, 0.3) 100%), 
                        url("https://www.typemission.be/wp-content/uploads/2025/03/Typemission_HEROWEBSITE_version3-scaled.webp") !important;
      background-position: 85% center !important;
    }
  }

  /* Mobile responsive overrides */
  @media (max-width: 767px) {
    .elementor-316 .elementor-element.elementor-element-fcba14e:not(.elementor-motion-effects-element-type-background),
    .elementor-316 .elementor-element.elementor-element-fcba14e>.elementor-motion-effects-container>.elementor-motion-effects-layer {
      background-image: none !important;
      background-color: #38032e !important;
    }
    
    .elementor-316 .elementor-element.elementor-element-fcba14e {
      min-height: auto !important;
      display: flex !important;
      flex-direction: column !important;
      padding: 0 !important;
      overflow: hidden !important;
      border-radius: 20px !important;
    }

    .hero-mobile-image-clip {
      display: block;
      width: 100%;
      height: 250px;
      background-image: url("https://www.typemission.be/wp-content/uploads/2025/03/Typemission_HEROWEBSITE_version3-scaled.webp");
      background-position: 80% center;
      background-size: cover;
      clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
      z-index: 2;
    }

    .elementor-316 .elementor-element.elementor-element-143ce33 {
      padding-top: 20px !important;
      padding-bottom: 40px !important;
      padding-left: 20px !important;
      padding-right: 20px !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }

    .elementor-316 .elementor-element.elementor-element-f351f83 {
      width: 100% !important;
      margin: 0 !important;
    }

    .elementor-316 .elementor-element.elementor-element-cd07f65 .elementor-heading-title {
      font-size: 30px !important;
      text-align: center !important;
      line-height: 1.25 !important;
      margin-bottom: 15px !important;
    }

    .hero-description {
      text-align: center !important;
      font-size: 16px !important;
      line-height: 1.45 !important;
    }

    .hero-checklist-new {
      margin: 20px auto 25px auto !important;
      max-width: 320px !important;
    }

    .hero-checklist-new li {
      font-size: 15px !important;
      margin-bottom: 10px !important;
    }

    .elementor-316 .elementor-element.elementor-element-ecb8136 {
      flex-direction: column !important;
      align-items: center !important;
      gap: 12px !important;
      padding-bottom: 30px !important;
      width: 100% !important;
    }

    .elementor-316 .elementor-element.elementor-element-c694225,
    .elementor-316 .elementor-element.elementor-element-07ce5d1 {
      width: 100% !important;
      margin: 0 !important;
    }

    .elementor-316 .elementor-element.elementor-element-c694225 .elementor-button,
    .elementor-316 .elementor-element.elementor-element-07ce5d1 .elementor-button {
      width: 100% !important;
      text-align: center !important;
      padding: 14px 20px !important;
      font-size: 16px !important;
      box-sizing: border-box !important;
    }

    .elementor-316 .elementor-element.elementor-element-07ce5d1.elementor-hidden-mobile {
      display: block !important;
    }

    .elementor-316 .elementor-element.elementor-element-6c51155 {
      display: flex !important;
      flex-direction: row !important;
      justify-content: center !important;
      gap: 15px !important;
      flex-wrap: nowrap !important;
      width: 100% !important;
    }
    .elementor-316 .elementor-element.elementor-element-43c4cdd,
    .elementor-316 .elementor-element.elementor-element-0bfd35f {
      width: calc(50% - 8px) !important;
      margin: 0 !important;
      box-sizing: border-box !important;
    }
  }
</style>`;

const updatedContent = content.substring(0, startIdx) + updatedStyleBlock + content.substring(endIdx + endStyleQuery.length);
fs.writeFileSync(htmlFile, updatedContent, 'utf8');
console.log('Successfully updated checklist checkmarks and made rating blocks blue again!');
