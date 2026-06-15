const fs = require('fs');

const htmlFile = 'index.html';
let content = fs.readFileSync(htmlFile, 'utf8');

// 1. Remove hidden classes from parent container 775ec8f
const parentClassQuery = 'class="elementor-element elementor-element-775ec8f e-con-full elementor-hidden-tablet elementor-hidden-mobile e-flex e-con e-parent"';
const cleanParentClass = 'class="elementor-element elementor-element-775ec8f e-con-full e-flex e-con e-parent"';

if (content.includes(parentClassQuery)) {
  content = content.replace(parentClassQuery, cleanParentClass);
  console.log('Removed hidden-mobile/hidden-tablet classes from parent container 775ec8f.');
} else {
  console.log('Parent container 775ec8f class query not found (might already be cleaned).');
}

// 2. Replace desktop hero fcba14e container
const heroStartQuery = '<div class="elementor-element elementor-element-fcba14e';
const startIndex = content.indexOf(heroStartQuery);

if (startIndex === -1) {
  console.error('ERROR: Could not find the start of the hero container');
  process.exit(1);
}

// Find matching close div by counting open/close tags
let openDivs = 0;
let currentIndex = startIndex;
let endIndex = -1;

while (currentIndex < content.length) {
  const nextOpen = content.indexOf('<div', currentIndex);
  const nextClose = content.indexOf('</div>', currentIndex);

  if (nextOpen === -1 && nextClose === -1) {
    break;
  }

  if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
    openDivs++;
    currentIndex = nextOpen + 4;
  } else {
    openDivs--;
    if (openDivs === 0) {
      endIndex = nextClose + 6;
      break;
    }
    currentIndex = nextClose + 6;
  }
}

if (endIndex === -1) {
  console.error('ERROR: Could not find the end of the hero container');
  process.exit(1);
}

console.log(`Desktop hero block found: indices ${startIndex} to ${endIndex}`);

// 3. Find mobile duplicate hero 8951b71
const mobileQuery = '<div class="elementor-element elementor-element-8951b71';
const mobileStartIndex = content.indexOf(mobileQuery);
let mobileEndIndex = -1;

if (mobileStartIndex !== -1) {
  let mobOpenDivs = 0;
  let mobCurrentIndex = mobileStartIndex;
  while (mobCurrentIndex < content.length) {
    const nextOpen = content.indexOf('<div', mobCurrentIndex);
    const nextClose = content.indexOf('</div>', mobCurrentIndex);

    if (nextOpen === -1 && nextClose === -1) {
      break;
    }

    if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
      mobOpenDivs++;
      mobCurrentIndex = nextOpen + 4;
    } else {
      mobOpenDivs--;
      if (mobOpenDivs === 0) {
        mobileEndIndex = nextClose + 6;
        break;
      }
      mobCurrentIndex = nextClose + 6;
    }
  }
  console.log(`Mobile hero block found: indices ${mobileStartIndex} to ${mobileEndIndex}`);
} else {
  console.log('Mobile duplicate hero 8951b71 not found (already deleted?).');
}

// 4. Custom CSS Styles
const customStyleBlock = `
<style id="custom-hero-redesign-styles">
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
    width: 20px;
    height: 20px;
    color: #9ad744;
    margin-right: 12px;
    flex-shrink: 0;
    background: rgba(154, 215, 68, 0.15);
    border-radius: 50%;
    padding: 3px;
    border: 1px solid rgba(154, 215, 68, 0.3);
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

  /* Glassmorphism Counter/Rating badges */
  .elementor-316 .elementor-element.elementor-element-43c4cdd,
  .elementor-316 .elementor-element.elementor-element-0bfd35f {
    background: rgba(255, 255, 255, 0.08) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(10px);
    border-radius: 12px !important;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
    padding: 15px 20px !important;
  }
  .elementor-316 .elementor-element.elementor-element-43c4cdd:hover,
  .elementor-316 .elementor-element.elementor-element-0bfd35f:hover {
    background: rgba(255, 255, 255, 0.14) !important;
    border-color: rgba(255, 255, 255, 0.25) !important;
    transform: translateY(-3px);
    box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.35);
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
</style>
`;

const newHeroHtml = `
<div class="elementor-element elementor-element-fcba14e e-con-full e-flex e-con e-child hero-container-redesign" data-id="fcba14e" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
  <div class="hero-mobile-image-clip"></div>
  <div class="elementor-element elementor-element-143ce33 e-flex e-con-boxed e-con e-child" data-id="143ce33" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
    <div class="e-con-inner">
      <div class="elementor-element elementor-element-f351f83 e-con-full e-flex e-con e-child" data-id="f351f83" data-element_type="container" data-e-type="container">
        <div class="elementor-element elementor-element-cd07f65 elementor-widget elementor-widget-heading" data-id="cd07f65" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
          <div class="elementor-widget-container">
            <h1 class="elementor-heading-title elementor-size-default">De leukste typecursus voor kinderen!</h1>
          </div>
        </div>
        <div class="elementor-element elementor-element-3e3ed40 elementor-widget elementor-widget-text-editor" data-id="3e3ed40" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
          <div class="elementor-widget-container">
            <p class="hero-description">Stap in de wereld van de SuperSpySchool. Met een spannend spionnenavontuur en leuke games leert je kind spelenderwijs blind typen!</p>
            <ul class="hero-checklist-new">
              <li>
                <svg class="check-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Spannend interactief spionnenverhaal</span>
              </li>
              <li>
                <svg class="check-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Leuke en leerzame typespelletjes</span>
              </li>
              <li>
                <svg class="check-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Gratis fysiek spionnen-startpakket</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="elementor-element elementor-element-62df2b2 e-flex e-con-boxed e-con e-child" data-id="62df2b2" data-element_type="container" data-e-type="container">
          <div class="e-con-inner">
            <div class="elementor-element elementor-element-ecb8136 e-con-full e-flex e-con e-child" data-id="ecb8136" data-element_type="container" data-e-type="container">
              <div class="elementor-element elementor-element-c694225 elementor-widget elementor-widget-button" data-id="c694225" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
                <div class="elementor-widget-container">
                  <div class="elementor-button-wrapper">
                    <a class="elementor-button elementor-button-link elementor-size-sm" href="#TypeMission_video" autoplay="" id="Bekijk_video">
                      <span class="elementor-button-content-wrapper">
                        <span class="elementor-button-text">Video voor ouders</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="elementor-element elementor-element-07ce5d1 elementor-widget elementor-widget-button" data-id="07ce5d1" data-element_type="widget" data-e-type="widget" data-widget_type="button.default">
                <div class="elementor-widget-container">
                  <div class="elementor-button-wrapper">
                    <a class="elementor-button elementor-button-link elementor-size-sm" href="/proefles/index.html">
                      <span class="elementor-button-content-wrapper">
                        <span class="elementor-button-text">Speel de gratis proefles</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="elementor-element elementor-element-6c51155 e-con-full e-flex e-con e-child" data-id="6c51155" data-element_type="container" data-e-type="container">
          <div class="elementor-element elementor-element-43c4cdd e-con-full e-flex e-con e-child" data-id="43c4cdd" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
            <div class="elementor-element elementor-element-89e1674 elementor-widget elementor-widget-counter" data-id="89e1674" data-element_type="widget" data-e-type="widget" data-widget_type="counter.default">
              <div class="elementor-widget-container">
                <div class="elementor-counter">
                  <div class="elementor-counter-number-wrapper">
                    <span class="elementor-counter-number-prefix"></span>
                    <span class="elementor-counter-number" data-duration="500" data-to-value="100" data-from-value="1" data-delimiter=",">100</span>
                    <span class="elementor-counter-number-suffix">K+</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="elementor-element elementor-element-7d2ecf6 elementor-widget elementor-widget-text-editor" data-id="7d2ecf6" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
              <div class="elementor-widget-container">
                <p><strong>Geslaagde cursisten</strong></p>
              </div>
            </div>
          </div>
          <a class="elementor-element elementor-element-0bfd35f e-con-full e-flex e-con e-child" data-id="0bfd35f" data-element_type="container" data-e-type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" href="/reviews/index.html">
            <div class="elementor-element elementor-element-0b21bef elementor-widget elementor-widget-rating" data-id="0b21bef" data-element_type="widget" data-e-type="widget" data-widget_type="rating.default">
              <div class="elementor-widget-container">
                <div class="e-rating" itemtype="https://schema.org/Rating" itemscope="" itemprop="reviewRating">
                  <meta itemprop="worstRating" content="0">
                  <meta itemprop="bestRating" content="5">
                  <div class="e-rating-wrapper" itemprop="ratingValue" content="4.5" role="img" aria-label="Beoordeling: 4.5 uit 5">
                    <div class="e-icon">
                      <div class="e-icon-wrapper e-icon-marked">
                        <svg aria-hidden="true" class="e-font-icon-svg e-eicon-star" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path></svg>
                      </div>
                      <div class="e-icon-wrapper e-icon-unmarked">
                        <svg aria-hidden="true" class="e-font-icon-svg e-eicon-star" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path></svg>
                      </div>
                    </div>
                    <div class="e-icon">
                      <div class="e-icon-wrapper e-icon-marked">
                        <svg aria-hidden="true" class="e-font-icon-svg e-eicon-star" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path></svg>
                      </div>
                      <div class="e-icon-wrapper e-icon-unmarked">
                        <svg aria-hidden="true" class="e-font-icon-svg e-eicon-star" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path></svg>
                      </div>
                    </div>
                    <div class="e-icon">
                      <div class="e-icon-wrapper e-icon-marked">
                        <svg aria-hidden="true" class="e-font-icon-svg e-eicon-star" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path></svg>
                      </div>
                      <div class="e-icon-wrapper e-icon-unmarked">
                        <svg aria-hidden="true" class="e-font-icon-svg e-eicon-star" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path></svg>
                      </div>
                    </div>
                    <div class="e-icon">
                      <div class="e-icon-wrapper e-icon-marked">
                        <svg aria-hidden="true" class="e-font-icon-svg e-eicon-star" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path></svg>
                      </div>
                      <div class="e-icon-wrapper e-icon-unmarked">
                        <svg aria-hidden="true" class="e-font-icon-svg e-eicon-star" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path></svg>
                      </div>
                    </div>
                    <div class="e-icon">
                      <div class="e-icon-wrapper e-icon-marked" style="--e-rating-icon-marked-width: 50%;">
                        <svg aria-hidden="true" class="e-font-icon-svg e-eicon-star" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path></svg>
                      </div>
                      <div class="e-icon-wrapper e-icon-unmarked">
                        <svg aria-hidden="true" class="e-font-icon-svg e-eicon-star" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="elementor-element elementor-element-2821be5 elementor-widget elementor-widget-text-editor" data-id="2821be5" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
              <div class="elementor-widget-container">
                <p><strong>Klantscore</strong></p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// Insert customStyleBlock + newHeroHtml in place of fcba14e
const firstHeroPlaceholder = content.substring(0, startIndex) + customStyleBlock + newHeroHtml + content.substring(endIndex);

// Now search for the mobile block 8951b71 in this new string and remove it
const updatedStart = firstHeroPlaceholder.indexOf(mobileQuery);
if (updatedStart !== -1) {
  let mobOpenDivs = 0;
  let mobCurrentIndex = updatedStart;
  let mobEndIndex = -1;
  while (mobCurrentIndex < firstHeroPlaceholder.length) {
    const nextOpen = firstHeroPlaceholder.indexOf('<div', mobCurrentIndex);
    const nextClose = firstHeroPlaceholder.indexOf('</div>', mobCurrentIndex);

    if (nextOpen === -1 && nextClose === -1) {
      break;
    }

    if (nextOpen !== -1 && (nextClose === -1 || nextOpen < nextClose)) {
      mobOpenDivs++;
      mobCurrentIndex = nextOpen + 4;
    } else {
      mobOpenDivs--;
      if (mobOpenDivs === 0) {
        mobEndIndex = nextClose + 6;
        break;
      }
      mobCurrentIndex = nextClose + 6;
    }
  }
  
  if (mobEndIndex !== -1) {
    // Delete the mobile hero container
    const finalContent = firstHeroPlaceholder.substring(0, updatedStart) + firstHeroPlaceholder.substring(mobEndIndex);
    fs.writeFileSync(htmlFile, finalContent, 'utf8');
    console.log('Successfully replaced desktop hero and deleted mobile hero block!');
  } else {
    console.error('ERROR: Could not find the end of mobile hero block');
  }
} else {
  // Mobile hero already deleted, just write updated firstHeroPlaceholder
  fs.writeFileSync(htmlFile, firstHeroPlaceholder, 'utf8');
  console.log('Successfully replaced desktop hero container (mobile hero was not present).');
}
