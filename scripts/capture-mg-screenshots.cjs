const { chromium } = require("playwright");
const path = require("node:path");

const OUT_DIR = path.resolve("public/metrics/case-studies/mg-employees");
const URL = "https://workplacepensions.mandg.com/employees/";

async function dismissCookies(page) {
  const essential = page.getByRole("button", { name: /Essential cookies only/i });
  if (await essential.isVisible({ timeout: 3000 }).catch(() => false)) {
    await essential.click();
    await page.waitForTimeout(400);
  }
}

async function capture(page, filename, scrollTo) {
  await scrollTo(page);
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(OUT_DIR, filename),
    fullPage: false,
  });
  console.log("saved", filename);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(URL, { waitUntil: "networkidle" });

  await capture(page, "hero-above-fold.png", async (p) => {
    await p.evaluate(() => window.scrollTo(0, 0));
  });

  await capture(page, "hero-contrast.png", async (p) => {
    await p.evaluate(() => window.scrollTo(0, 0));
  });

  await dismissCookies(page);

  await capture(page, "cta-hierarchy.png", async (p) => {
    const register = p.getByRole("link", { name: /Register now/i });
    await register.scrollIntoViewIfNeeded();
    await p.evaluate(() => window.scrollBy(0, -120));
  });

  await capture(page, "content-jargon.png", async (p) => {
    const manage = p.getByRole("heading", { name: /Manage your policy online/i });
    await manage.scrollIntoViewIfNeeded();
    await p.evaluate(() => window.scrollBy(0, -280));
  });

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
