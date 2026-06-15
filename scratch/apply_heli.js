const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Update the CSS Style block
const startTag = '<style id="custom-hero-redesign-styles">';
const endTag = '</style>';

const startIdx = content.indexOf(startTag);
const endIdx = content.indexOf(endTag, startIdx);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find CSS style tags');
  process.exit(1);
}

const newStyles = `
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
    stroke-width: 4.5px !important; /* Made checkmark stroke thicker */
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

  /* Base hidden class for mobile image helper and visual container */
  .hero-mobile-image-clip {
    display: none;
  }

  /* Desktop Multi-layer Hero & Parallax styling */
  .elementor-316 .elementor-element.elementor-element-fcba14e {
    position: relative !important;
    overflow: hidden !important;
    background-color: #38032e !important;
    background-image: none !important;
  }
  .elementor-316 .elementor-element.elementor-element-fcba14e:not(.elementor-motion-effects-element-type-background),
  .elementor-316 .elementor-element.elementor-element-fcba14e>.elementor-motion-effects-container>.elementor-motion-effects-layer {
    background-image: none !important;
    background-color: #38032e !important;
  }

  .elementor-316 .elementor-element.elementor-element-143ce33 {
    position: relative !important;
    z-index: 2 !important;
    pointer-events: auto !important;
  }

  .hero-visual-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 55%;
    height: 100%;
    overflow: hidden;
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
    z-index: 1;
    pointer-events: none; /* Allows hover and click on elements under it if needed */
  }

  .hero-layer {
    position: absolute;
    will-change: transform;
  }

  .hero-layer-bg {
    top: -5%;
    left: -10%;
    width: 120%;
    height: 110%;
    background-image: url("afbeelingen/background.webp");
    background-size: cover;
    background-position: center;
    z-index: 1;
  }

  .hero-layer-heli {
    top: 15%;
    left: 48%; /* Positioned relative to the entire hero width, hovering over the slant */
    width: 12%;
    z-index: 3; /* Placed above visual container (z-index: 1) and text column (z-index: 2) */
  }
  .hero-layer-heli img {
    width: 100%;
    height: auto;
  }

  .hero-layer-spies {
    bottom: -1%;
    left: 15%;
    height: 95%;
    width: auto;
    z-index: 3;
  }
  .hero-layer-spies img {
    height: 100%;
    width: auto;
  }

  .hero-layer-girl {
    bottom: -1%;
    right: -2%;
    height: 68%;
    width: auto;
    z-index: 4;
  }
  .hero-layer-girl img {
    height: 100%;
    width: auto;
  }

  /* Tablet / Desktop overlap fixes */
  @media (max-width: 1024px) {
    .hero-visual-container {
      width: 50%;
      clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%);
    }
    .hero-layer-spies {
      left: 10%;
      height: 90%;
    }
    .hero-layer-girl {
      right: -5%;
      height: 62%;
    }
    .hero-layer-heli {
      left: 45%;
      width: 15%;
    }
  }

  /* Mobile responsive overrides */
  @media (max-width: 767px) {
    .hero-visual-container {
      display: none !important;
    }
    
    .hero-layer-heli {
      display: none !important;
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
      height: 320px;
      background-image: url("afbeelingen/meisje_schuin.webp");
      background-position: center 30%;
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
`;

content = content.slice(0, startIdx + startTag.length) + newStyles + content.slice(endIdx);

// 2. Update the HTML Markup block
const htmlSearch = `<div class="hero-visual-container">
    <div class="hero-layer hero-layer-bg" data-depth="0.05"></div>
    <div class="hero-layer hero-layer-heli" data-depth="0.25">
      <img src="afbeelingen/helicopter.webp" alt="Helikopter">
    </div>
    <div class="hero-layer hero-layer-spies" data-depth="0.10">
      <img src="afbeelingen/spies.webp" alt="Spionnen">
    </div>
    <div class="hero-layer hero-layer-girl" data-depth="0.18">
      <img src="afbeelingen/meisje_schuin.webp" alt="Typend meisje">
    </div>
  </div>`;

// Replace taking carriage returns into account
const cleanHtmlSearch = htmlSearch.replace(/\r?\n/g, '\\r?\\n');
const regex = new RegExp(cleanHtmlSearch);

const htmlReplace = `<div class="hero-visual-container">
    <div class="hero-layer hero-layer-bg" data-depth="0.05"></div>
    <div class="hero-layer hero-layer-spies" data-depth="0.10">
      <img src="afbeelingen/spies.webp" alt="Spionnen">
    </div>
    <div class="hero-layer hero-layer-girl" data-depth="0.18">
      <img src="afbeelingen/meisje_schuin.webp" alt="Typend meisje">
    </div>
  </div>
  
  <!-- Helicopter placed outside the clipped container so it can fly over the slant line -->
  <div class="hero-layer hero-layer-heli" data-depth="0.25">
    <img src="afbeelingen/helicopter.webp" alt="Helikopter">
  </div>`;

if (!regex.test(content)) {
  console.error('Could not find HTML search pattern in index.html');
  process.exit(1);
}

content = content.replace(regex, htmlReplace);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully moved helicopter outside visual container in index.html!');
