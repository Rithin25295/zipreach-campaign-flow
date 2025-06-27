import puppeteer from 'puppeteer';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePreview() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  
  // Set viewport to match Facebook OG image dimensions
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 2, // Retina quality
  });

  // Load the preview component
  await page.goto('http://localhost:5173/preview');
  
  // Wait for animations to complete
  await page.waitForTimeout(2000);

  // Take the screenshot
  await page.screenshot({
    path: join(__dirname, '../public/preview.png'),
    quality: 100,
  });

  await browser.close();
  console.log('Preview image generated successfully!');
}

generatePreview().catch(console.error); 