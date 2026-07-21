const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../proefles/index.html');
let html = fs.readFileSync(targetFile, 'utf8');

// 1. Fix the broken <form> tag
// Replace the broken snippet:
// <form class="elementor-form"><div class="tm-form-title-badge">...</div>\nmethod="post" name="Contact Form" aria-label="Contact Form">
// With clean valid HTML:
const brokenSnippetRegex = /<form class="elementor-form">[\s\S]*?method="post" name="Contact Form" aria-label="Contact Form">/;
const cleanFormHtml = `<form class="elementor-form" method="post" name="Contact Form" aria-label="Contact Form">
  <div class="tm-form-title-badge">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#88a4ec" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
    <span>Herinnering via e-mail ontvangen</span>
  </div>`;

if (brokenSnippetRegex.test(html)) {
  html = html.replace(brokenSnippetRegex, cleanFormHtml);
  console.log('Fixed broken <form> tag structure');
}

// 2. Replace or update <style id="proefles-mobile-redesign"> with 100% polished CSS
const newCss = `
<style id="proefles-mobile-redesign">
/* TypeMission Mobile Proefles Styling */
@media (max-width: 1024px) {
  /* Main Section Container */
  .elementor-51 .elementor-element.elementor-element-3fa2f6f {
    padding: 24px 16px 40px 16px !important;
    background: linear-gradient(180deg, #3b0733 0%, #1a0217 100%) !important;
    min-height: auto !important;
  }

  /* Video Hero Container - Fixed ratio, no cropping */
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
    object-fit: contain !important;
    object-position: center !important;
    background: #000 !important;
  }

  /* Content Container Card */
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

  /* WhatsApp & Share Section */
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

  /* Form Container & Layout */
  .elementor-51 .elementor-element.elementor-element-2407457 {
    background: rgba(15, 3, 15, 0.45) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    border-radius: 18px !important;
    padding: 22px 18px !important;
    margin-top: 10px !important;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1) !important;
  }

  /* Title badge inside form */
  .tm-form-title-badge {
    font-family: 'Orbitron', sans-serif !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin-bottom: 18px !important;
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    letter-spacing: 0.3px !important;
  }

  /* Hide empty recaptcha dot/space */
  .elementor-field-type-recaptcha_v3 {
    display: none !important;
  }

  /* Input fields wrapper */
  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-form-fields-wrapper {
    display: flex !important;
    flex-direction: column !important;
    gap: 14px !important;
    margin: 0 !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group {
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group .elementor-field {
    width: 100% !important;
    height: 48px !important;
    border-radius: 12px !important;
    padding: 0 16px !important;
    font-size: 15px !important;
    font-family: 'Roboto', sans-serif !important;
    background-color: #ffffff !important;
    border: 2px solid #e2e8f0 !important;
    color: #0f172a !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1) !important;
    box-sizing: border-box !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group .elementor-field::placeholder {
    color: #94a3b8 !important;
    opacity: 1 !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group .elementor-field:focus {
    border-color: #e48e35 !important;
    outline: none !important;
    box-shadow: 0 0 0 3.5px rgba(228, 142, 53, 0.3) !important;
  }

  /* Checkbox & Acceptance label */
  .elementor-field-type-acceptance .elementor-field-subgroup {
    display: flex !important;
    align-items: flex-start !important;
    gap: 10px !important;
    margin-top: 4px !important;
  }

  .elementor-field-type-acceptance .elementor-field-option {
    display: flex !important;
    align-items: flex-start !important;
    gap: 10px !important;
    width: 100% !important;
  }

  .elementor-field-type-acceptance input[type="checkbox"] {
    width: 20px !important;
    height: 20px !important;
    accent-color: #e48e35 !important;
    border-radius: 4px !important;
    margin-top: 2px !important;
    flex-shrink: 0 !important;
    cursor: pointer !important;
  }

  .elementor-field-type-acceptance label {
    font-family: 'Roboto', sans-serif !important;
    font-size: 14px !important;
    line-height: 1.45 !important;
    color: #dcf3fb !important;
    font-weight: 400 !important;
    cursor: pointer !important;
  }

  /* Submit button styling */
  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-type-submit {
    width: 100% !important;
    margin-top: 6px !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-button[type=submit] {
    width: 100% !important;
    height: 52px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: linear-gradient(135deg, #e48e35 0%, #d47e25 100%) !important;
    border-radius: 12px !important;
    font-family: 'Orbitron', sans-serif !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    letter-spacing: 1px !important;
    text-transform: uppercase !important;
    color: #ffffff !important;
    border: none !important;
    box-shadow: 0 6px 20px rgba(228, 142, 53, 0.45) !important;
    transition: all 0.25s ease !important;
    cursor: pointer !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-button[type=submit]:hover,
  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-button[type=submit]:focus {
    background: linear-gradient(135deg, #f5b05f 0%, #e48e35 100%) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(228, 142, 53, 0.65) !important;
    color: #ffffff !important;
  }

  /* Footnote text below form */
  .elementor-51 .elementor-element.elementor-element-c5acc52 {
    font-size: 12.5px !important;
    line-height: 1.5 !important;
    color: #94a3b8 !important;
    margin-top: 16px !important;
  }
}
</style>
`;

// Replace existing style tag
if (html.includes('id="proefles-mobile-redesign"')) {
  html = html.replace(/<style id="proefles-mobile-redesign">[\s\S]*?<\/style>/, newCss.trim());
} else {
  html = html.replace('</head>', `${newCss.trim()}\n</head>`);
}

fs.writeFileSync(targetFile, html, 'utf8');

// Also update proefles_mobiel/index.html
if (fs.existsSync(path.join(__dirname, '../proefles_mobiel/index.html'))) {
  fs.copyFileSync(targetFile, path.join(__dirname, '../proefles_mobiel/index.html'));
}

console.log('Successfully fixed proefles form and CSS');
