import puppeteer from 'puppeteer';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePreview() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  // Set viewport to match social media preview dimensions
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 2, // Retina quality
  });

  // Set simplified, bold HTML for OG image
  await page.setContent(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{
          width:1200px;height:630px;
          display:flex;align-items:center;justify-content:center;
          background:linear-gradient(135deg,#7c3aed 0%,#2563eb 100%);
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
          color:#fff;
        }
        .center{max-width:90%;text-align:center}
        h1{
          font-size:88px;line-height:1;
          font-weight:800;
          background:linear-gradient(90deg,#ffffff,#dbeafe);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          margin-bottom:24px;
        }
        h2{font-size:36px;font-weight:500;opacity:.92;margin-bottom:48px}
        .badges{display:flex;gap:24px;justify-content:center;font-size:22px;font-weight:600}
        .badge{
          padding:14px 24px;border-radius:9999px;
          background:rgba(255,255,255,.15);backdrop-filter:blur(6px);
        }
      </style>
    </head>
    <body>
      <div class="center">
        <h1>ZipReach</h1>
        <h2>Campaigns on Command</h2>
        <div class="badges">
          <div class="badge">🎯 Create</div>
          <div class="badge">🤖 Optimise</div>
          <div class="badge">📈 Analyse</div>
          <div class="badge">🚀 Scale</div>
        </div>
      </div>
    </body>
  </html>`);

  // Wait a moment for any animations
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Take the screenshot
  const screenshotPath = join(__dirname, '../public/preview.png') as `${string}.png`;
  await page.screenshot({ path: screenshotPath });

  await browser.close();
  console.log('Preview image generated successfully!');
}

generatePreview(); 