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

  // Set HTML content directly for better control
  await page.setContent(`
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            background: linear-gradient(135deg, #7c3aed, #2563eb);
            font-family: system-ui, -apple-system, sans-serif;
            color: white;
            overflow: hidden;
          }
          .container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            padding: 60px;
            box-sizing: border-box;
          }
          .left {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            z-index: 2;
          }
          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          .title {
            font-size: 72px;
            font-weight: bold;
            margin: 0 0 24px 0;
            background: linear-gradient(to right, #fff, #e2e8f0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1;
          }
          .subtitle {
            font-size: 28px;
            opacity: 0.9;
            margin: 0 0 40px 0;
            line-height: 1.4;
          }
          .features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .feature {
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 16px;
            border-radius: 12px;
            backdrop-filter: blur(10px);
          }
          .feature-icon {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
          }
          .feature-text {
            font-size: 18px;
            font-weight: 500;
          }
          .preview-container {
            position: relative;
            width: 480px;
            height: 400px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            overflow: hidden;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          .preview-header {
            padding: 16px;
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .preview-content {
            padding: 24px;
          }
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .metric-card {
            background: rgba(255, 255, 255, 0.05);
            padding: 16px;
            border-radius: 12px;
            text-align: center;
          }
          .metric-value {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 4px;
          }
          .metric-label {
            font-size: 14px;
            opacity: 0.7;
          }
          .decorative-blur {
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 300px;
            background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(37, 99, 235, 0) 70%);
            filter: blur(60px);
            z-index: 1;
          }
          .blur-1 {
            top: -200px;
            right: -100px;
            transform: rotate(45deg);
          }
          .blur-2 {
            bottom: -300px;
            left: -200px;
            transform: rotate(-45deg);
          }
        </style>
      </head>
      <body>
        <div class="decorative-blur blur-1"></div>
        <div class="decorative-blur blur-2"></div>
        <div class="container">
          <div class="left">
            <h1 class="title">ZipReach</h1>
            <p class="subtitle">AI-Powered Multi-Channel<br/>Marketing Automation</p>
            <div class="features">
              <div class="feature">
                <div class="feature-icon">🎯</div>
                <div class="feature-text">Smart Targeting</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🤖</div>
                <div class="feature-text">AI Automation</div>
              </div>
              <div class="feature">
                <div class="feature-icon">📊</div>
                <div class="feature-text">Analytics</div>
              </div>
              <div class="feature">
                <div class="feature-icon">🚀</div>
                <div class="feature-text">Performance</div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="preview-container">
              <div class="preview-header">
                <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #7c3aed, #2563eb); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">Z</div>
                <div style="font-weight: 500;">Campaign Dashboard</div>
              </div>
              <div class="preview-content">
                <div class="metrics-grid">
                  <div class="metric-card">
                    <div class="metric-value">3.8×</div>
                    <div class="metric-label">ROAS</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-value">145K</div>
                    <div class="metric-label">Impressions</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-value">8.2K</div>
                    <div class="metric-label">Clicks</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-value">$9.6K</div>
                    <div class="metric-label">Revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);

  // Wait a moment for any animations
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Take the screenshot
  await page.screenshot({
    path: join(__dirname, '../public/preview.png'),
  });

  await browser.close();
  console.log('Preview image generated successfully!');
}

generatePreview(); 