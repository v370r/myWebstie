const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 440, height: 956 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });

  await page.goto('http://localhost:8892/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Home
  await page.screenshot({ path: 'test-iphone16-home.png', fullPage: true });
  console.log('Home scrollHeight:', await page.evaluate(() => document.documentElement.scrollHeight));

  // Navigate to Services
  await page.locator('#menu-icon').click();
  await page.waitForTimeout(500);
  await page.locator('header nav a', { hasText: 'Services' }).click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'test-iphone16-services.png', fullPage: true });
  console.log('Services scrollHeight:', await page.evaluate(() => document.documentElement.scrollHeight));

  // Navigate to Resume
  await page.locator('#menu-icon').click();
  await page.waitForTimeout(500);
  await page.locator('header nav a', { hasText: 'Resume' }).click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'test-iphone16-resume.png', fullPage: true });
  console.log('Resume scrollHeight:', await page.evaluate(() => document.documentElement.scrollHeight));

  // Navigate to Portfolio
  await page.locator('#menu-icon').click();
  await page.waitForTimeout(500);
  await page.locator('header nav a', { hasText: 'Portfolio' }).click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'test-iphone16-portfolio.png', fullPage: true });
  console.log('Portfolio scrollHeight:', await page.evaluate(() => document.documentElement.scrollHeight));

  // Navigate to Contact
  await page.locator('#menu-icon').click();
  await page.waitForTimeout(500);
  await page.locator('header nav a', { hasText: 'Contact' }).click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'test-iphone16-contact.png', fullPage: true });
  console.log('Contact scrollHeight:', await page.evaluate(() => document.documentElement.scrollHeight));

  await browser.close();
  console.log('Done!');
})();
