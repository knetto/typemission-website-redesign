const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');

const DOMAIN = 'https://www.typemission.be';
const ALTERNATE_DOMAIN = 'https://typemission.be';

const SEED_URLS = [
  'https://www.typemission.be/',
  'https://www.typemission.be/wachtlijst-dankjewel/',
  'https://www.typemission.be/aanmelden/',
  'https://www.typemission.be/proefles_mobiel/',
  'https://www.typemission.be/op-missie-met-mr-i/',
  'https://www.typemission.be/over-ons/',
  'https://www.typemission.be/hoe-werkt-het/',
  'https://www.typemission.be/gratis-typespelletje/',
  'https://www.typemission.be/typetris/',
  'https://www.typemission.be/wachtwoord-vergeten/',
  'https://www.typemission.be/scholenactie/',
  'https://www.typemission.be/proefles/',
  'https://www.typemission.be/typecursus-bestellen/',
  'https://www.typemission.be/typecursus-prijzen/',
  'https://www.typemission.be/typecursus-voor-scholen/',
  'https://www.typemission.be/reviews/',
  'https://www.typemission.be/faq/',
  'https://www.typemission.be/inloggen/',
  'https://www.typemission.be/contact/',
  'https://www.typemission.be/category/blog/',
  'https://www.typemission.be/category/update/',
  'https://www.typemission.be/update/nieuwe-update-juli-2025/',
  'https://www.typemission.be/blog/het-belang-van-motivatie-bij-een-typecursus/',
  'https://www.typemission.be/blog/hoe-combineer-ik-blind-leren-typen-met-schoolactiviteiten-2/',
  'https://www.typemission.be/blog/hoe-blind-typen-kinderen-helpt-om-beter-te-presteren-op-school/',
  'https://www.typemission.be/blog/einstein-basisschool-aan-de-slag-met-typemission/',
  'https://www.typemission.be/blog/waarom-een-gratis-typecursus-vaak-niet-werkt/',
  'https://www.typemission.be/blog/blind-leren-typen-ook-goed-voor-taalvaardigheid/',
  'https://www.typemission.be/blog/de-voordelen-van-een-typecursus-voor-kinderen/',
  'https://www.typemission.be/blog/wanneer-is-mijn-kind-klaar-voor-een-typecursus/',
  'https://www.typemission.be/blog/waarom-zou-u-uw-kind-een-typecursus-laten-volgen/'
];

const downloadedAssets = new Set();
const downloadedPages = new Set();

// Helper to determine if a URL is local to the typemission.be website
function isLocalUrl(urlStr) {
  try {
    if (urlStr.startsWith('/') && !urlStr.startsWith('//')) return true;
    const url = new URL(urlStr);
    return url.hostname === 'www.typemission.be' || url.hostname === 'typemission.be';
  } catch (e) {
    return false;
  }
}

// Convert absolute URLs on typemission.be domain to relative or root-relative paths
function getLocalPath(urlStr, isPage = false) {
  try {
    let pathname;
    if (urlStr.startsWith('/') && !urlStr.startsWith('//')) {
      pathname = urlStr.split('?')[0].split('#')[0];
    } else {
      const url = new URL(urlStr);
      pathname = url.pathname;
    }

    if (isPage) {
      // Pages are mapped to directory index.html files
      // e.g. /over-ons/ -> /over-ons/index.html
      // / -> /index.html
      let cleanPath = pathname;
      if (cleanPath.endsWith('/')) {
        cleanPath += 'index.html';
      } else if (!path.extname(cleanPath)) {
        cleanPath += '/index.html';
      }
      return cleanPath;
    }

    return pathname;
  } catch (e) {
    return urlStr;
  }
}

// Fetch and save binary/text resources
async function downloadAsset(urlStr, referer = DOMAIN) {
  if (!urlStr || urlStr.startsWith('data:') || urlStr.startsWith('javascript:')) return null;

  // Resolve relative URLs
  let fullUrl;
  try {
    fullUrl = new URL(urlStr, referer).toString();
  } catch (e) {
    console.error(`Failed to resolve URL: ${urlStr} with referer: ${referer}`);
    return null;
  }

  // Only download local assets
  if (!isLocalUrl(fullUrl)) return null;

  const localRelPath = getLocalPath(fullUrl, false);
  // Remove starting slash for fs paths
  const localFilePath = path.join(__dirname, localRelPath.startsWith('/') ? localRelPath.slice(1) : localRelPath);

  if (downloadedAssets.has(localFilePath)) {
    return localRelPath;
  }
  downloadedAssets.add(localFilePath);

  console.log(`Downloading asset: ${fullUrl} -> ${localFilePath}`);

  try {
    const response = await axios({
      method: 'get',
      url: fullUrl,
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Referer': referer
      },
      timeout: 15000
    });

    // Ensure directory exists
    const dir = path.dirname(localFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(localFilePath, response.data);

    // If it's a CSS file, parse it to extract other assets (fonts, background images)
    if (localFilePath.endsWith('.css')) {
      await parseAndDownloadCssAssets(localFilePath, fullUrl);
    }

    return localRelPath;
  } catch (e) {
    console.error(`Error downloading asset ${fullUrl}: ${e.message}`);
    return null;
  }
}

// Parse a stylesheet to extract fonts and background images
async function parseAndDownloadCssAssets(cssFilePath, cssUrl) {
  try {
    let cssContent = fs.readFileSync(cssFilePath, 'utf8');
    const urlRegex = /url\(['"]?([^'")]+)['"]?\)/g;
    let match;
    const fontPromises = [];

    while ((match = urlRegex.exec(cssContent)) !== null) {
      const assetUrl = match[1];
      if (assetUrl.startsWith('data:')) continue;

      // Queue download of the CSS resource
      fontPromises.push((async () => {
        const localRel = await downloadAsset(assetUrl, cssUrl);
        if (localRel) {
          // Inside CSS, we should rewrite it to be relative if possible,
          // or we can make it root-relative. Let's make it root relative or relative.
          // Since it's downloaded to the original structure, the relative structure remains identical!
        }
      })());
    }

    await Promise.all(fontPromises);
  } catch (e) {
    console.error(`Error parsing CSS file ${cssFilePath}: ${e.message}`);
  }
}

// Parse srcset strings
function extractUrlsFromSrcset(srcsetStr) {
  if (!srcsetStr) return [];
  const urls = [];
  const parts = srcsetStr.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const urlPart = trimmed.split(/\s+/)[0];
    if (urlPart) {
      urls.push(urlPart);
    }
  }
  return urls;
}

// Main page crawler
async function crawlPage(pageUrl) {
  if (downloadedPages.has(pageUrl)) return;
  downloadedPages.add(pageUrl);

  console.log(`\n========================================`);
  console.log(`CRAWLING PAGE: ${pageUrl}`);
  console.log(`========================================`);

  try {
    const response = await axios.get(pageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      },
      timeout: 20000
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Extract and download resources
    const assetPromises = [];

    // 1. Stylesheets
    $('link[rel="stylesheet"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href) {
        assetPromises.push(downloadAsset(href, pageUrl));
      }
    });

    // 2. Favicons and icons
    $('link[rel*="icon"], link[rel="apple-touch-icon"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href) {
        assetPromises.push(downloadAsset(href, pageUrl));
      }
    });

    // 3. Scripts
    $('script[src]').each((i, el) => {
      const src = $(el).attr('src');
      if (src) {
        assetPromises.push(downloadAsset(src, pageUrl));
      }
    });

    // 4. Images (including lazy loaded, srcset, sizes etc)
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      const dataSrc = $(el).attr('data-src');
      const lazySrc = $(el).attr('data-lazy-src');
      const srcset = $(el).attr('srcset');
      const dataSrcset = $(el).attr('data-srcset');

      if (src) assetPromises.push(downloadAsset(src, pageUrl));
      if (dataSrc) assetPromises.push(downloadAsset(dataSrc, pageUrl));
      if (lazySrc) assetPromises.push(downloadAsset(lazySrc, pageUrl));

      if (srcset) {
        const urls = extractUrlsFromSrcset(srcset);
        for (const u of urls) assetPromises.push(downloadAsset(u, pageUrl));
      }
      if (dataSrcset) {
        const urls = extractUrlsFromSrcset(dataSrcset);
        for (const u of urls) assetPromises.push(downloadAsset(u, pageUrl));
      }
    });

    // 5. Source elements (video/picture sources)
    $('source').each((i, el) => {
      const src = $(el).attr('src');
      const srcset = $(el).attr('srcset');
      if (src) assetPromises.push(downloadAsset(src, pageUrl));
      if (srcset) {
        const urls = extractUrlsFromSrcset(srcset);
        for (const u of urls) assetPromises.push(downloadAsset(u, pageUrl));
      }
    });

    // 6. Meta og:image and twitter:image
    $('meta[property="og:image"], meta[name="twitter:image"]').each((i, el) => {
      const content = $(el).attr('content');
      if (content) {
        assetPromises.push(downloadAsset(content, pageUrl));
      }
    });

    // 7. Inline background styles and style attributes
    $('[style]').each((i, el) => {
      const style = $(el).attr('style');
      const urlRegex = /url\(['"]?([^'")]+)['"]?\)/g;
      let match;
      while ((match = urlRegex.exec(style)) !== null) {
        const assetUrl = match[1];
        assetPromises.push(downloadAsset(assetUrl, pageUrl));
      }
    });

    // Wait for all assets on this page to finish downloading
    await Promise.all(assetPromises);

    // Now modify the HTML to use local references
    // Rewrites for scripts, stylesheets, images, links
    
    // Rewrite links to other pages (convert to absolute root-relative with slash, or include index.html)
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && isLocalUrl(href)) {
        const localPath = getLocalPath(href, true);
        $(el).attr('href', localPath);
      }
    });

    // Rewrite stylesheet hrefs
    $('link[rel="stylesheet"]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && isLocalUrl(href)) {
        $(el).attr('href', getLocalPath(href, false));
      }
    });

    // Rewrite script srcs
    $('script[src]').each((i, el) => {
      const src = $(el).attr('src');
      if (src && isLocalUrl(src)) {
        $(el).attr('src', getLocalPath(src, false));
      }
    });

    // Rewrite image srcs and srcsets
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      const dataSrc = $(el).attr('data-src');
      const lazySrc = $(el).attr('data-lazy-src');
      const srcset = $(el).attr('srcset');
      const dataSrcset = $(el).attr('data-srcset');

      if (src && isLocalUrl(src)) $(el).attr('src', getLocalPath(src, false));
      if (dataSrc && isLocalUrl(dataSrc)) $(el).attr('data-src', getLocalPath(dataSrc, false));
      if (lazySrc && isLocalUrl(lazySrc)) $(el).attr('data-lazy-src', getLocalPath(lazySrc, false));

      if (srcset) {
        const parts = srcset.split(',').map(part => {
          const trimmed = part.trim();
          if (!trimmed) return '';
          const matchUrl = trimmed.split(/\s+/)[0];
          const descriptor = trimmed.substring(matchUrl.length);
          if (isLocalUrl(matchUrl)) {
            return getLocalPath(matchUrl, false) + descriptor;
          }
          return trimmed;
        });
        $(el).attr('srcset', parts.join(', '));
      }

      if (dataSrcset) {
        const parts = dataSrcset.split(',').map(part => {
          const trimmed = part.trim();
          if (!trimmed) return '';
          const matchUrl = trimmed.split(/\s+/)[0];
          const descriptor = trimmed.substring(matchUrl.length);
          if (isLocalUrl(matchUrl)) {
            return getLocalPath(matchUrl, false) + descriptor;
          }
          return trimmed;
        });
        $(el).attr('data-srcset', parts.join(', '));
      }
    });

    // Rewrite sources
    $('source').each((i, el) => {
      const src = $(el).attr('src');
      const srcset = $(el).attr('srcset');

      if (src && isLocalUrl(src)) $(el).attr('src', getLocalPath(src, false));
      if (srcset) {
        const parts = srcset.split(',').map(part => {
          const trimmed = part.trim();
          if (!trimmed) return '';
          const matchUrl = trimmed.split(/\s+/)[0];
          const descriptor = trimmed.substring(matchUrl.length);
          if (isLocalUrl(matchUrl)) {
            return getLocalPath(matchUrl, false) + descriptor;
          }
          return trimmed;
        });
        $(el).attr('srcset', parts.join(', '));
      }
    });

    // Rewrite style attributes containing url()
    $('[style]').each((i, el) => {
      let style = $(el).attr('style');
      const urlRegex = /url\(['"]?([^'")]+)['"]?\)/g;
      let match;
      let newStyle = style;
      while ((match = urlRegex.exec(style)) !== null) {
        const assetUrl = match[1];
        if (isLocalUrl(assetUrl)) {
          newStyle = newStyle.replace(assetUrl, getLocalPath(assetUrl, false));
        }
      }
      $(el).attr('style', newStyle);
    });

    // Save modified HTML
    const pageLocalRelPath = getLocalPath(pageUrl, true);
    const pageLocalFilePath = path.join(__dirname, pageLocalRelPath.startsWith('/') ? pageLocalRelPath.slice(1) : pageLocalRelPath);

    const dir = path.dirname(pageLocalFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(pageLocalFilePath, $.html());
    console.log(`Saved page: ${pageUrl} -> ${pageLocalFilePath}`);

  } catch (e) {
    console.error(`Failed to crawl page ${pageUrl}: ${e.message}`);
  }
}

// Run the crawler
async function run() {
  console.log('Starting site crawler for typemission.be...');
  for (const url of SEED_URLS) {
    await crawlPage(url);
  }
  console.log('\n========================================');
  console.log('Crawl completed successfully!');
  console.log(`Downloaded ${downloadedPages.size} pages and ${downloadedAssets.size} assets.`);
  console.log('========================================');
}

run();
