const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../proefles/index.html');
let html = fs.readFileSync(targetFile, 'utf8');

// Replace old CSS rules with sleek, compact proportions
const oldStyleRegex = /<style id="proefles-mobile-redesign">[\s\S]*?<\/style>/;

const sleekCss = `
<style id="proefles-mobile-redesign">
/* TypeMission Mobile Proefles - Sleek & Compact Proportions */
@media (max-width: 1024px) {
  /* Outer Section */
  .elementor-51 .elementor-element.elementor-element-3fa2f6f {
    padding: 20px 14px 36px 14px !important;
    background: #f8fafc !important;
    min-height: auto !important;
  }

  /* Video Hero Container - Crisp 16:9 widescreen, no crop */
  .elementor-51 .elementor-element.elementor-element-ff0187c {
    min-height: unset !important;
    height: auto !important;
    aspect-ratio: 16 / 9 !important;
    width: 100% !important;
    max-width: 550px !important;
    margin: 0 auto 18px auto !important;
    border-radius: 16px !important;
    overflow: hidden !important;
    box-shadow: 0 8px 25px rgba(59, 7, 51, 0.15) !important;
    border: 2px solid #88a4ec !important;
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

  /* Hero Card Container */
  .elementor-51 .elementor-element.elementor-element-535d8fd {
    min-height: auto !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: 550px !important;
    margin: 0 auto !important;
  }

  .elementor-51 .elementor-element.elementor-element-b89a0d5 {
    padding: 20px 16px !important;
    background: #3b0733 !important;
    border-radius: 16px !important;
    box-shadow: 0 10px 30px rgba(59, 7, 51, 0.22) !important;
    box-sizing: border-box !important;
  }

  /* Badge */
  .elementor-51 .elementor-element.elementor-element-a0ae750 .elementor-heading-title {
    display: inline-block !important;
    background: #88a4ec !important;
    color: #ffffff !important;
    padding: 4px 12px !important;
    border-radius: 16px !important;
    font-family: 'Orbitron', sans-serif !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.8px !important;
    margin-bottom: 12px !important;
  }

  /* Heading */
  .elementor-51 .elementor-element.elementor-element-ce38c25 .elementor-heading-title {
    font-family: 'Orbitron', sans-serif !important;
    font-size: 20px !important;
    line-height: 1.35 !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin-bottom: 12px !important;
    text-align: left !important;
  }

  /* Paragraph Text */
  .elementor-51 .elementor-element.elementor-element-60ab56b {
    color: #ffffff !important;
    font-family: 'Roboto', sans-serif !important;
    font-size: 14px !important;
    font-weight: 300 !important;
    line-height: 1.55 !important;
    margin-bottom: 18px !important;
  }

  .elementor-51 .elementor-element.elementor-element-60ab56b p {
    margin-bottom: 8px !important;
  }

  /* WhatsApp Share Card - Compact & Sleek */
  .tm-share-child-card {
    background: #88a4ec !important;
    border-radius: 14px !important;
    padding: 16px 14px !important;
    margin-bottom: 18px !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12) !important;
    box-sizing: border-box !important;
    color: #ffffff !important;
  }

  .tm-share-header {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    margin-bottom: 10px !important;
  }

  .tm-share-icon-badge {
    width: 36px !important;
    height: 36px !important;
    border-radius: 8px !important;
    background: #25D366 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3) !important;
  }

  .tm-share-icon-badge svg {
    fill: #ffffff !important;
    width: 20px !important;
    height: 20px !important;
  }

  .tm-share-title-wrap h3 {
    font-family: 'Orbitron', sans-serif !important;
    font-size: 14.5px !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin: 0 0 2px 0 !important;
  }

  .tm-share-title-wrap p {
    font-family: 'Roboto', sans-serif !important;
    font-size: 12.5px !important;
    font-weight: 300 !important;
    color: #ffffff !important;
    margin: 0 !important;
    line-height: 1.35 !important;
  }

  .tm-share-buttons-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    margin-top: 12px !important;
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
    gap: 6px !important;
    background: #25D366 !important;
    color: #ffffff !important;
    font-family: 'Orbitron', sans-serif !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    padding: 10px 14px !important;
    border-radius: 8px !important;
    text-decoration: none !important;
    transition: all 0.2s ease !important;
    border: none !important;
    flex: 1 !important;
  }

  .tm-whatsapp-btn:hover {
    background: #20bd5a !important;
  }

  .tm-copy-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    background: transparent !important;
    color: #ffffff !important;
    border: 1.5px solid #ffffff !important;
    font-family: 'Orbitron', sans-serif !important;
    font-size: 12.5px !important;
    font-weight: 600 !important;
    padding: 9px 14px !important;
    border-radius: 8px !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    flex: 1 !important;
  }

  .tm-copy-btn.copied {
    background: #ffffff !important;
    color: #3b0733 !important;
  }

  /* Form Container - Sleek & Compact Proportions */
  .elementor-51 .elementor-element.elementor-element-2407457 {
    background: rgba(0, 0, 0, 0.2) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    border-radius: 12px !important;
    padding: 16px 14px !important;
    margin-top: 6px !important;
    box-sizing: border-box !important;
  }

  .tm-form-title-badge {
    font-family: 'Orbitron', sans-serif !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    margin-bottom: 12px !important;
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
    gap: 10px !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group {
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Inputs: Height 42px, radius 8px (Compact & sleek, down from 55-60px) */
  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group .elementor-field:not(.elementor-acceptance-field) {
    width: 100% !important;
    height: 42px !important;
    border-radius: 8px !important;
    padding: 0 14px !important;
    font-size: 14px !important;
    font-family: 'Roboto', sans-serif !important;
    background-color: #ffffff !important;
    border: 1px solid #cbd5e1 !important;
    color: #1e293b !important;
    box-shadow: none !important;
    box-sizing: border-box !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-group .elementor-field:focus {
    border-color: #e48e35 !important;
    outline: none !important;
    box-shadow: 0 0 0 2.5px rgba(228, 142, 53, 0.25) !important;
  }

  /* Checkbox Option */
  .elementor-field-type-acceptance {
    width: 100% !important;
    margin: 4px 0 !important;
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
    gap: 8px !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .elementor-field-type-acceptance input[type="checkbox"],
  .elementor-field-type-acceptance .elementor-acceptance-field {
    appearance: checkbox !important;
    -webkit-appearance: checkbox !important;
    width: 16px !important;
    max-width: 16px !important;
    min-width: 16px !important;
    height: 16px !important;
    max-height: 16px !important;
    min-height: 16px !important;
    margin: 2px 0 0 0 !important;
    padding: 0 !important;
    background-color: transparent !important;
    background-image: none !important;
    border-radius: 3px !important;
    border: 1px solid #cbd5e1 !important;
    flex-shrink: 0 !important;
    cursor: pointer !important;
    box-shadow: none !important;
    display: inline-block !important;
  }

  .elementor-field-type-acceptance label {
    font-family: 'Roboto', sans-serif !important;
    font-size: 13px !important;
    line-height: 1.4 !important;
    color: #ffffff !important;
    font-weight: 300 !important;
    margin: 0 !important;
    padding: 0 !important;
    cursor: pointer !important;
    display: block !important;
    flex: 1 !important;
    word-break: break-word !important;
  }

  /* Submit Button: Height 44px, radius 8px (Compact & proportional) */
  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-field-type-submit {
    width: 100% !important;
    margin-top: 4px !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-button[type=submit] {
    width: 100% !important;
    height: 44px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: #e48e35 !important;
    border-radius: 8px !important;
    font-family: 'Orbitron', sans-serif !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    letter-spacing: 0.6px !important;
    text-transform: uppercase !important;
    color: #ffffff !important;
    border: none !important;
    box-shadow: 0 3px 10px rgba(228, 142, 53, 0.35) !important;
    transition: all 0.2s ease !important;
    cursor: pointer !important;
  }

  .elementor-51 .elementor-element.elementor-element-2407457 .elementor-button[type=submit]:hover {
    background-color: #f5b05f !important;
    transform: translateY(-1px) !important;
  }

  /* Footnote text below form */
  .elementor-51 .elementor-element.elementor-element-c5acc52 {
    font-size: 11.5px !important;
    line-height: 1.45 !important;
    color: rgba(255, 255, 255, 0.75) !important;
    margin-top: 12px !important;
  }
}
</style>
`;

html = html.replace(oldStyleRegex, sleekCss.trim());

fs.writeFileSync(targetFile, html, 'utf8');

// Copy to proefles_mobiel/index.html
if (fs.existsSync(path.join(__dirname, '../proefles_mobiel/index.html'))) {
  fs.copyFileSync(targetFile, path.join(__dirname, '../proefles_mobiel/index.html'));
}

console.log('Successfully adjusted form proportions to sleek, compact sizes!');
