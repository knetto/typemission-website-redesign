const fs = require('fs');

const file = 'c:/Users/corne/Documents/stage/website improvements/site clone simular small fixes/index.html';
let content = fs.readFileSync(file, 'utf8');

const brokenBlock = `<p class="hero-subtitle">Stap in de wereld van de SuperSpySchool. Met een spannend spionnenavontuur en leuke games leert je kind gegarandeerd blind typen met 10 vingers!</p><ul class="hero-checklist"><li><span class="check-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span class="check-text"><strong>8,8</strong> gemiddelde klantbeoordeling</span></li><li><span class="check-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span class="check-text">Leren typen via een <strong>interactieve spionnengame</strong></span></li><li><span class="check-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span class="check-text">Inclusief <strong>leuke games</strong> en typespelletjes</span></li><li><span class="check-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span class="check-text">Ontvang een <strong>gratis fysiek startpakket</strong> thuis</span></li></ul>`;

const originalBlock = `<p>Bij de TypeMission typecursus leert uw kind met spannende missies, leuke typespelletjes en een tof spionnen verhaal snel en foutloos blind typen.</p><p>✅ Beoordeeld met een 8,8<br>✅ Spannend spionnenverhaal<br>✅ Leuke typespelletjes<br>✅ Gratis spionnen startpakket</p>`;

if (content.includes(brokenBlock)) {
  content = content.replace(brokenBlock, originalBlock);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully restored original hero block in index.html!');
} else {
  console.log('Could not find the exact broken block in index.html!');
  // Let's do a partial search to see if whitespace differs
  const partialText = 'Stap in de wereld van de SuperSpySchool';
  if (content.includes(partialText)) {
    console.log('Found partial text, but exact match failed. Let\'s check formatting.');
  }
}
