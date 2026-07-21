const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../proefles/index.html');
let html = fs.readFileSync(targetFile, 'utf8');

// 1. Build CSS rules
const cssRules = `
<style id="proefles-mobile-redesign">
/* TypeMission Mobile Proefles - 100% Brand-Matching Design */
@media (max-width: 1024px) {
  /* Outer Section - Clean background like homepage */
  .elementor-51 .elementor-element.elementor-element-3fa2f6f {
    padding: 20px 14px 40px 14px !important;
    background: #f8fafc !important;
    min-height: auto !important;
  }

  /* Video Hero Container - Aspect ratio 16:9 widescreen, no crop */
  .elementor-51 .elementor-element.elementor-element-ff0187c {
    min-height: unset !important;
    height: auto !important;
    aspect-ratio: 16 / 9 !important;
    width: 100% !important;
    max-width: 600px !important;
    margin: 0 auto 20px auto !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    box-shadow: 0 10px 30px rgba(59, 7, 51, 0.15) !important;
    border: 3px solid #88a4ec !important;
    background: #000000 !important;
    position: relative !important;
  }

  .elementor-51 .elementor-element.elementor-element-ff0187c .elementor-background-video-container {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }

  .elementor-51 .elementor-element.elementor-element-ff0187c video.elementor-background-video-hosted {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain !important;
    object-position: center !important;
    background: #000000 !important;
  }

  /* Main Hero Card Container - Solid TypeMission Purple (#3b0733) */
  .elementor-51 .elementor-element.elementor-element-535d8fd {
    min-height: auto !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: 600px !important;
    margin: 0 auto !important;
  }

  .elementor-51 .elementor-element.elementor-element-b89a0d5 {
    padding: 24px 20px !important;
    background: #3b0733 !important;
    border-radius: 20px !important;
    box-shadow: 0 12px 35px rgba(59, 7, 51, 0.25) !important;
    box-sizing: border-box !important;
  }

  /* Badge - Periwinkle Blue (#88a4ec) */
  .elementor-51 .elementor-element.elementor-element-a0ae750 .elementor-heading-title {
    display: inline-block !important;
    background: #88a4ec !important;
    color: #ffffff !important;
    padding: 5px 16px !important;
    border-radius: 20px !important;
    font-family: 'Orbitron', sans-serif !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    margin-bottom: 14px !important;
  }

  /* Heading */
  .elementor-51 .elementor-element.elementor-element-ce38c25 .elementor-heading-title {
    font-family: 'Orbitron', sans-serif !important;
    font-size: 22px !important;
    line-height: 1.35 !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin-bottom: 14px !important;
    text-align: left !important;
  }

  /* Paragraph Text */
  .elementor-51 .elementor-element.elementor-element-60ab56b {
    color: #ffffff !important;
    font-family: 'Roboto', sans-serif !important;
    font-size: 15px !important;
    font-weight: 300 !important;
    line-height: 1.6 !important;
    margin-bottom: 22px !important;
  }

  .elementor-51 .elementor-element.elementor-element-60ab56b p {
    margin-bottom: 10px !important;
  }

  /* WhatsApp Share Card - TypeMission Periwinkle Card (#88a4ec) */
  .tm-share-child-card {
    background: #88a4ec !important;
    border-radius: 16px !important;
    padding: 20px 18px !important;
    margin-bottom: 22px !important;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15) !important;
    box-sizing: border-box !important;
    color: #ffffff !important;
  }

  .tm-share-header {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    margin-bottom: 12px !important;
  }

  .tm-share-icon-badge {
    width: 42px !important;
    height: 42px !important;
    border-radius: 10px !important;
    background: #25D366 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35) !important;
  }

  .tm-share-icon-badge svg {
    fill: #ffffff !important;
    width: 22px !important;
    height: 22px !important;
  }

  .tm-share-title-wrap h3 {
    font-family: 'Orbitron', sans-serif !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin: 0 0 4px 0 !important;
  }

  .tm-share-title-wrap p {
    font-family: 'Roboto', sans-serif !important;
    font-size: 13.5px !important;
    font-weight: 300 !important;
    color: #ffffff !important;
    margin: 0 !important;
    line-height: 1.4 !important;
  }

  .tm-share-buttons-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    margin-top: 14px !important;
  }

  @media (min-width: 480px) {
    .tm-share-buttons-grid {
      flex-direction: row !important;
    }
  }

  .tm-whatsapp-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    background: #25D366 !important;
    color: #ffffff !important;
    font-family: 'Orbitron', sans-serif !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    padding: 12px 18px !important;
    border-radius: 10px !important;
    text-decoration: none !important;
    transition: all 0.2s ease !important;
    border: none !important;
    flex: 1 !important;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35) !important;
  }

  .tm-whatsapp-btn:hover, .tm-whatsapp-btn:focus {
    background: #20bd5a !important;
    color: #ffffff !important;
    transform: translateY(-1px) !important;
  }

  .tm-copy-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    background: transparent !important;
    color: #ffffff !important;
    border: 2px solid #ffffff !important;
    font-family: 'Orbitron', sans-serif !important;
    font-size: 13.5px !important;
    font-weight: 600 !important;
    padding: 10px 16px !important;
    border-radius: 10px !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    flex: 1 !important;
  }

  .tm-copy-btn:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    color: #ffffff !important;
  }

  .tm-copy-btn.copied {
    background: #ffffff !important;
    color: #3b0733 !important;
    border-color: #ffffff !important;
  }

  /* Form Container */
  .elementor-51 .elementor-element.elementor-element-2407457 {
    background: rgba(0, 0, 0, 0.2) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 16px !important;
    padding: 20px 18px !important;
    margin-top: 10px !important;
    box-sizing: border-box !important;
  }

  .tm-form-title-badge {
    font-family: 'Orbitron', sans-serif !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin-bottom: 16px !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  /* Hide empty recaptcha placeholder */
  .elementor-field-type-recaptcha_v3 {
    display: none !important;
  }

  /* Form fields wrapper */
  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-form-fields-wrapper {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group {
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group .elementor-field:not(.elementor-acceptance-field) {
    width: 100% !important;
    height: 48px !important;
    border-radius: 10px !important;
    padding: 0 14px !important;
    font-size: 15px !important;
    font-family: 'Roboto', sans-serif !important;
    background-color: #ffffff !important;
    border: 2px solid #cbd5e1 !important;
    color: #1e293b !important;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05) !important;
    box-sizing: border-box !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group .elementor-field:focus {
    border-color: #e48e35 !important;
    outline: none !important;
    box-shadow: 0 0 0 3px rgba(228, 142, 53, 0.25) !important;
  }

  /* CHECKBOX BUG FIX - Override Elementor styles */
  .elementor-field-type-acceptance {
    width: 100% !important;
    margin: 8px 0 !important;
    padding: 0 !important;
  }

  .elementor-field-type-acceptance .elementor-field-subgroup {
    display: block !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .elementor-field-type-acceptance .elementor-field-option {
    display: flex !important;
    align-items: flex-start !important;
    gap: 10px !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .elementor-field-type-acceptance input[type="checkbox"],
  .elementor-field-type-acceptance .elementor-acceptance-field {
    appearance: checkbox !important;
    -webkit-appearance: checkbox !important;
    width: 18px !important;
    max-width: 18px !important;
    min-width: 18px !important;
    height: 18px !important;
    max-height: 18px !important;
    min-height: 18px !important;
    margin: 2px 0 0 0 !important;
    padding: 0 !important;
    background-color: transparent !important;
    background-image: none !important;
    border-radius: 4px !important;
    border: 1px solid #cbd5e1 !important;
    flex-shrink: 0 !important;
    cursor: pointer !important;
    box-shadow: none !important;
    display: inline-block !important;
  }

  .elementor-field-type-acceptance label {
    font-family: 'Roboto', sans-serif !important;
    font-size: 13.5px !important;
    line-height: 1.45 !important;
    color: #ffffff !important;
    font-weight: 300 !important;
    margin: 0 !important;
    padding: 0 !important;
    cursor: pointer !important;
    display: block !important;
    flex: 1 !important;
    word-break: break-word !important;
    overflow: visible !important;
  }

  /* Submit Button - Solid Orange CTA TypeMission style (#e48e35) */
  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-type-submit {
    width: 100% !important;
    margin-top: 6px !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-button[type=submit] {
    width: 100% !important;
    height: 50px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: #e48e35 !important;
    border-radius: 10px !important;
    font-family: 'Orbitron', sans-serif !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    letter-spacing: 0.8px !important;
    text-transform: uppercase !important;
    color: #ffffff !important;
    border: none !important;
    box-shadow: 0 4px 15px rgba(228, 142, 53, 0.4) !important;
    transition: all 0.2s ease !important;
    cursor: pointer !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-button[type=submit]:hover,
  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-button[type=submit]:focus {
    background-color: #f5b05f !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 6px 20px rgba(228, 142, 53, 0.6) !important;
    color: #ffffff !important;
  }

  /* Footnote text below form */
  .elementor-51 .elementor-element.elementor-element-c5acc52 {
    font-size: 12px !important;
    line-height: 1.5 !important;
    color: rgba(255, 255, 255, 0.8) !important;
    margin-top: 14px !important;
  }
}
</style>
`;

html = html.replace('</head>', `${cssRules}\n</head>`);

// 2. Single Share Card HTML (inserted before form 2407457)
const shareCardHtml = `
<div class="tm-share-child-card">
  <div class="tm-share-header">
    <div class="tm-share-icon-badge">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.84L0 24l6.337-1.5c1.671.895 3.58 1.5 5.663 1.5 6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.849 0-3.579-.497-5.078-1.366l-.364-.21-3.774.894.912-3.682-.232-.37C2.569 15.744 2 13.931 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    </div>
    <div class="tm-share-title-wrap">
      <h3>Stuur proefles naar je kind</h3>
      <p>Stuur een bericht via WhatsApp zodat je kind direct kan spelen op de computer!</p>
    </div>
  </div>
  <div class="tm-share-buttons-grid">
    <a href="https://api.whatsapp.com/send?text=Hoi!%20Speel%20hier%20de%20gratis%20TypeMission%20proefles%20op%20de%20computer:%20https://www.typemission.be/proefles/" target="_blank" class="tm-whatsapp-btn">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.84L0 24l6.337-1.5c1.671.895 3.58 1.5 5.663 1.5 6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.849 0-3.579-.497-5.078-1.366l-.364-.21-3.774.894.912-3.682-.232-.37C2.569 15.744 2 13.931 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      <span>Stuur via WhatsApp</span>
    </a>
    <button type="button" class="tm-copy-btn" onclick="copyProeflesLink(this)">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
      <span class="tm-copy-text">Kopieer link</span>
    </button>
  </div>
</div>
`;

const targetDataId = 'data-id="2407457"';
const dataIdIdx = html.indexOf(targetDataId);
if (dataIdIdx !== -1) {
  const formDivStart = html.lastIndexOf('<div', dataIdIdx);
  if (formDivStart !== -1) {
    html = html.slice(0, formDivStart) + shareCardHtml + '\n' + html.slice(formDivStart);
  }
}

// 3. Form Title Badge inside form
const formTagIdx = html.indexOf('<form class="elementor-form"');
if (formTagIdx !== -1) {
  const formEndTagIdx = html.indexOf('>', formTagIdx);
  const titleHtml = `
  <div class="tm-form-title-badge">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
    <span>Herinnering via e-mail ontvangen</span>
  </div>`;
  html = html.slice(0, formEndTagIdx + 1) + titleHtml + html.slice(formEndTagIdx + 1);
}

// 4. JS Script
const copyScript = `
<script id="proefles-copy-script">
function copyProeflesLink(btn) {
  const link = "https://www.typemission.be/proefles/";
  const textEl = btn.querySelector('.tm-copy-text');
  const origText = textEl ? textEl.textContent : 'Kopieer link';
  
  function showCopied() {
    if (textEl) textEl.textContent = 'Gekopieerd! ✨';
    btn.classList.add('copied');
    setTimeout(() => {
      if (textEl) textEl.textContent = origText;
      btn.classList.remove('copied');
    }, 2500);
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(link).then(showCopied).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }

  function fallbackCopy() {
    const input = document.createElement('input');
    input.value = link;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showCopied();
    } catch(e) {}
    document.body.removeChild(input);
  }
}
</script>
`;

html = html.replace('</body>', `${copyScript}\n</body>`);

fs.writeFileSync(targetFile, html, 'utf8');

// Also update proefles_mobiel/index.html
if (fs.existsSync(path.join(__dirname, '../proefles_mobiel/index.html'))) {
  fs.copyFileSync(targetFile, path.join(__dirname, '../proefles_mobiel/index.html'));
}

console.log('Successfully applied clean build to proefles/index.html');
