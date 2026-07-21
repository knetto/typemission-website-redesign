const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../proefles/index.html');
let html = fs.readFileSync(targetFile, 'utf8');

// 1. Add CSS rules before </head> if not present
const cssRules = `
<style id="proefles-mobile-redesign">
/* Custom Mobile Improvements for Proefles Page */
@media (max-width: 1024px) {
  /* Parent Section Container */
  .elementor-51 .elementor-element.elementor-element-3fa2f6f {
    padding: 24px 16px 40px 16px !important;
    background: linear-gradient(180deg, #3b0733 0%, #1a0217 100%) !important;
    min-height: auto !important;
  }

  /* Video Hero Container Fix - Prevent video cropping */
  .elementor-51 .elementor-element.elementor-element-ff0187c {
    min-height: unset !important;
    height: auto !important;
    aspect-ratio: 16 / 9 !important;
    width: 100% !important;
    max-width: 650px !important;
    margin: 0 auto 24px auto !important;
    border-radius: 18px !important;
    overflow: hidden !important;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(136, 164, 236, 0.25) !important;
    border: 2px solid rgba(136, 164, 236, 0.4) !important;
    background: #0d010c !important;
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
    object-fit: contain !important; /* Preserves 16:9 ratio without cropping! */
    object-position: center !important;
    background: #000 !important;
  }

  /* Content Box Card */
  .elementor-51 .elementor-element.elementor-element-535d8fd {
    min-height: auto !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: 650px !important;
    margin: 0 auto !important;
  }

  .elementor-51 .elementor-element.elementor-element-b89a0d5 {
    padding: 24px 20px !important;
    background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    border-radius: 20px !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35) !important;
  }

  /* Headings & Text */
  .elementor-51 .elementor-element.elementor-element-a0ae750 .elementor-heading-title {
    display: inline-block !important;
    background: rgba(136, 164, 236, 0.15) !important;
    color: #88a4ec !important;
    border: 1px solid rgba(136, 164, 236, 0.3) !important;
    padding: 5px 14px !important;
    border-radius: 20px !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    margin-bottom: 12px !important;
  }

  .elementor-51 .elementor-element.elementor-element-ce38c25 .elementor-heading-title {
    font-family: 'Orbitron', sans-serif !important;
    font-size: 22px !important;
    line-height: 1.35 !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin-bottom: 14px !important;
    text-align: left !important;
  }

  .elementor-51 .elementor-element.elementor-element-60ab56b {
    color: #dcf3fb !important;
    font-size: 15px !important;
    line-height: 1.6 !important;
    margin-bottom: 24px !important;
  }

  .elementor-51 .elementor-element.elementor-element-60ab56b p {
    margin-bottom: 10px !important;
  }

  /* WhatsApp & Share Box Styling */
  .tm-share-child-card {
    background: linear-gradient(135deg, rgba(37, 211, 102, 0.12) 0%, rgba(18, 140, 126, 0.18) 100%) !important;
    border: 1.5px solid rgba(37, 211, 102, 0.4) !important;
    border-radius: 16px !important;
    padding: 20px 18px !important;
    margin-bottom: 24px !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25) !important;
  }

  .tm-share-header {
    display: flex !important;
    align-items: center !important;
    gap: 14px !important;
    margin-bottom: 14px !important;
  }

  .tm-share-icon-badge {
    width: 44px !important;
    height: 44px !important;
    border-radius: 12px !important;
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    box-shadow: 0 4px 14px rgba(37, 211, 102, 0.45) !important;
  }

  .tm-share-icon-badge svg {
    fill: #ffffff !important;
    width: 24px !important;
    height: 24px !important;
  }

  .tm-share-title-wrap h3 {
    font-family: 'Orbitron', sans-serif !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin: 0 0 4px 0 !important;
  }

  .tm-share-title-wrap p {
    font-size: 13px !important;
    color: #dcf3fb !important;
    margin: 0 !important;
    line-height: 1.4 !important;
  }

  .tm-share-buttons-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
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
    gap: 10px !important;
    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%) !important;
    color: #ffffff !important;
    font-family: 'Orbitron', sans-serif !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    padding: 14px 18px !important;
    border-radius: 12px !important;
    text-decoration: none !important;
    transition: all 0.25s ease !important;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35) !important;
    border: none !important;
    flex: 1 !important;
  }

  .tm-whatsapp-btn:hover, .tm-whatsapp-btn:focus {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 22px rgba(37, 211, 102, 0.55) !important;
    color: #ffffff !important;
  }

  .tm-copy-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    background: rgba(255, 255, 255, 0.1) !important;
    color: #ffffff !important;
    border: 1px solid rgba(255, 255, 255, 0.25) !important;
    font-family: 'Roboto', sans-serif !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    padding: 14px 16px !important;
    border-radius: 12px !important;
    cursor: pointer !important;
    transition: all 0.25s ease !important;
    flex: 1 !important;
  }

  .tm-copy-btn:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    border-color: #ffffff !important;
  }

  .tm-copy-btn.copied {
    background: rgba(138, 213, 80, 0.25) !important;
    border-color: #8ad550 !important;
    color: #8ad550 !important;
  }

  /* Form Section Styling */
  .elementor-51 .elementor-element.elementor-element-2407457 {
    background: rgba(0, 0, 0, 0.25) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 16px !important;
    padding: 20px 16px !important;
    margin-top: 10px !important;
  }

  .tm-form-title-badge {
    font-family: 'Orbitron', sans-serif !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    color: #ffffff !important;
    margin-bottom: 16px !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group .elementor-field {
    border-radius: 10px !important;
    padding: 12px 14px !important;
    font-size: 15px !important;
    background-color: #ffffff !important;
    border: 1px solid #cbd5e1 !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group .elementor-field:focus {
    border-color: #e48e35 !important;
    box-shadow: 0 0 0 3px rgba(228, 142, 53, 0.25) !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-button[type=submit] {
    width: 100% !important;
    background: linear-gradient(135deg, #e48e35 0%, #d47e25 100%) !important;
    border-radius: 12px !important;
    font-family: 'Orbitron', sans-serif !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    letter-spacing: 0.5px !important;
    padding: 14px 20px !important;
    box-shadow: 0 4px 15px rgba(228, 142, 53, 0.4) !important;
    transition: all 0.25s ease !important;
    margin-top: 6px !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-button[type=submit]:hover {
    background: linear-gradient(135deg, #f5b05f 0%, #e48e35 100%) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(228, 142, 53, 0.6) !important;
  }

  .elementor-51 .elementor-element.elementor-element-c5acc52 {
    font-size: 12px !important;
    opacity: 0.75 !important;
    margin-top: 14px !important;
  }
}
</style>
`;

if (!html.includes('id="proefles-mobile-redesign"')) {
  html = html.replace('</head>', `${cssRules}\n</head>`);
}

// 2. Share card HTML block
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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

if (!html.includes('class="tm-share-child-card"')) {
  const targetDataId = 'data-id="2407457"';
  const dataIdIdx = html.indexOf(targetDataId);
  if (dataIdIdx !== -1) {
    const formDivStart = html.lastIndexOf('<div', dataIdIdx);
    if (formDivStart !== -1) {
      html = html.slice(0, formDivStart) + shareCardHtml + '\n' + html.slice(formDivStart);
    }
  }
}

// Add form header title if not added
if (!html.includes('class="tm-form-title-badge"')) {
  const formTag = '<form class="elementor-form"';
  const formIdx = html.indexOf(formTag);
  if (formIdx !== -1) {
    const titleHtml = '<div class="tm-form-title-badge">✉️ Herinnering via e-mail ontvangen</div>\n';
    html = html.slice(0, formIdx + formTag.length) + '>' + titleHtml + html.slice(formIdx + formTag.length + 1);
  }
}

// 3. Add script for copyProeflesLink
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

if (!html.includes('id="proefles-copy-script"')) {
  html = html.replace('</body>', `${copyScript}\n</body>`);
}

fs.writeFileSync(targetFile, html, 'utf8');

// Copy to proefles_mobiel if it exists
if (fs.existsSync(path.join(__dirname, '../proefles_mobiel/index.html'))) {
  fs.copyFileSync(targetFile, path.join(__dirname, '../proefles_mobiel/index.html'));
}

console.log('Successfully updated proefles/index.html and proefles_mobiel/index.html');
