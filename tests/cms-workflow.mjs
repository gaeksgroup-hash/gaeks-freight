import assert from 'node:assert/strict';
import { readFile, writeFile, unlink, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { findRuntime } from '../scripts/project-tools.mjs';

const base = process.env.GAEKS_TEST_BASE || 'http://127.0.0.1:4173';
await fetch(base + '/api/sync.php');

const contentPath = 'gaeks-private/site_content.json';
const usersPath = 'gaeks-private/operators.json';
const original = await readFile(contentPath);
let users = null;
try {
  users = await readFile(usersPath);
} catch {}

const password = randomBytes(24).toString('hex');
const php = findRuntime('php');
assert.ok(php, 'PHP is required');
const hash = spawnSync(php, ['-r', 'echo password_hash(stream_get_contents(STDIN), PASSWORD_DEFAULT);'], {
  input: password,
  encoding: 'utf8',
}).stdout;
await writeFile(
  usersPath,
  JSON.stringify([{ username: 'cms-local-test', displayName: 'Local test', role: 'website_admin', active: true, passwordHash: hash }])
);

let browser;
try {
  const login = await fetch(base + '/api/auth.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'cms-local-test', password }),
  });
  const auth = await login.json();
  assert.equal(auth.authenticated, true);
  const cookie = login.headers
    .getSetCookie()
    .map((c) => c.split(';')[0])
    .join('; ');
  const headers = { 'Content-Type': 'application/json', Cookie: cookie, 'X-CSRF-Token': auth.csrfToken };

  const data = JSON.parse(original);
  assert.equal(data.serviceCmsVersion, 7);
  assert.equal(data.branding.contactGroups.find((g) => g.id === 'general').serviceIds.includes('project-cargo'), true);
  assert.equal(data.branding.contactGroups.find((g) => g.id === 'fcl').serviceIds.includes('project-cargo'), false);
  assert.equal(data.branding.contactGroups.find((g) => g.id === 'fcl').serviceIds.includes('roro-breakbulk'), true);
  assert.equal(data.hero.imageUrl, '/uploads/gaeks-hero-cargo-poster.webp');
  assert.equal(data.hero.videoUrl, '/uploads/gaeks-hero-cargo-optimized.webm');

  for (const service of data.services) {
    const path = new URL(service.canonical).pathname;
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /wa\.me\//);
    assert.match(html, /mailto:/);
    assert.doesNotMatch(html, /<meta name="keywords"/i);
    assert.match(html, /hreflang="en"/);
  }

  // Verify Search Intelligence /operator/ strict noindex, /en/ SSR hreflang, and legacy alias 301 redirect
  const opResp = await fetch(base + '/operator/');
  const opHtml = await opResp.text();
  assert.match(opResp.headers.get('x-robots-tag') || '', /noindex/i);
  assert.match(opHtml, /noindex,\s*nofollow,\s*noarchive/i);
  const enHomeHtml = await (await fetch(base + '/en/')).text();
  assert.match(enHomeHtml, /<html lang="en"/i);
  assert.match(enHomeHtml, /hreflang="id-ID"/);
  const aliasResp = await fetch(base + '/carrier/', { redirect: 'manual' });
  assert.equal(aliasResp.status, 301);
  assert.equal(aliasResp.headers.get('location'), '/maskapai-dan-pelayaran/');

  // Verify Project Cargo SSR explicitly routes to CS (+6281393453375 / Cs@gaeks.com) and NOT FCL
  const projectSsr = await (await fetch(base + '/layanan/project-cargo-heavy-lift/')).text();
  assert.match(projectSsr, /6281393453375/);
  assert.match(projectSsr, /Cs@gaeks\.com/i);
  assert.match(projectSsr, /Chat WhatsApp/);

  const save = (section, payload, extra = headers) =>
    fetch(base + '/api/sync.php', { method: 'POST', headers: extra, body: JSON.stringify({ section, payload }) });
  assert.equal((await save('branding', data.branding, { 'Content-Type': 'application/json' })).status, 401);
  assert.equal((await save('branding', data.branding, { 'Content-Type': 'application/json', Cookie: cookie })).status, 403);

  const changed = structuredClone(data.branding);
  changed.contactGroups.find((g) => g.id === 'air').email = 'local-check@example.com';
  changed.faviconUrl = '/uploads/custom-favicon-test.webp';
  assert.equal((await save('branding', changed)).status, 200);
  assert.match(await (await fetch(base + '/layanan/freight-udara/')).text(), /local-check@example\.com/);
  const homeSsrWithFavicon = await (await fetch(base + '/')).text();
  assert.match(homeSsrWithFavicon, /<link rel="icon" type="image\/webp" href="\/uploads\/custom-favicon-test\.webp">/);

  const phoneSsr = await (await fetch(base + '/kontak/telepon/')).text();
  assert.match(phoneSsr, /local-check@example\.com/);
  assert.match(phoneSsr, /ContactPage/);
  assert.match(phoneSsr, /https:\/\/gaeks\.com\/kontak\/telepon\//);
  assert.ok((await (await fetch(base + '/sitemap.xml')).text()).includes('/kontak/telepon/'));

  const site = structuredClone(data.siteSettings);
  site.uiCopy.contactMetaTitle = 'CMS contact metadata test';
  site.uiCopy.footerTrackingCta = 'Lacak tes CMS';
  assert.equal((await save('siteSettings', site)).status, 200);
  assert.match(await (await fetch(base + '/kontak/')).text(), /<title>CMS contact metadata test<\/title>/);

  site.uiCopy.phoneHeading = 'Tim telepon dari CMS';
  assert.equal((await save('siteSettings', site)).status, 200);
  assert.match(await (await fetch(base + '/kontak/telepon/')).text(), /<h1>Tim telepon dari CMS<\/h1>/);

  const services = structuredClone(data.services);
  const air = services.find((s) => s.id === 'air-shipment');
  air.seoTitle = 'CMS test title';
  air.faq = [['CMS test question', 'CMS test answer']];
  const saved = await save('services', services);
  assert.equal(saved.status, 200, await saved.text());
  const html = await (await fetch(base + '/layanan/freight-udara/')).text();
  assert.match(html, /<title>CMS test title<\/title>/);
  assert.match(html, /CMS test answer/);
  assert.match(html, /FAQPage/);

  air.status = 'draft';
  assert.equal((await save('services', services)).status, 200);
  assert.equal((await fetch(base + '/layanan/freight-udara/')).status, 404);
  assert.ok(!(await (await fetch(base + '/sitemap.xml')).text()).includes('/layanan/freight-udara/'));
  assert.ok(!(await (await fetch(base + '/api/sync.php')).json()).services.some((s) => s.id === 'air-shipment'));

  // Restore original CMS content before browser scenario tests
  await writeFile(contentPath, original);

  browser = await chromium.launch({
    ...(process.env.GAEKS_BROWSER_CHANNEL ? { channel: process.env.GAEKS_BROWSER_CHANNEL } : {}),
    headless: true,
  });
  const context = await browser.newContext({ viewport: { width: 375, height: 844 }, permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  await mkdir('test-results', { recursive: true });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  // Responsive overflow, screenshots, and axe accessibility across requested breakpoints (360..1920)
  for (const width of [360, 375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '/',
      '/layanan/',
      '/tentang-kami/',
      '/tarif-pengiriman/',
      '/maskapai-dan-pelayaran/',
      '/karier/',
      '/kontak/',
      '/kontak/telepon/',
      '/layanan/ppjk-customs-clearance/',
      '/layanan/freight-laut-fcl/',
      '/layanan/freight-udara/',
      '/layanan/undername-impor-pi/',
      '/layanan/project-cargo-heavy-lift/',
      '/kalkulator/',
      '/tracking/',
      '/rute-pengiriman/',
      '/berita/',
    ]) {
      await page.goto(base + route);
      await page.waitForTimeout(450);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${route} overflow at ${width}`);
      if (route === '/') {
        const poster = page.locator('#home img').first();
        assert.ok((await poster.evaluate((el) => el.naturalWidth)) > 0, `hero poster loaded at ${width}`);
      }
      if (
        (width === 390 || width === 1440) &&
        ['/', '/layanan/', '/tentang-kami/', '/tarif-pengiriman/', '/maskapai-dan-pelayaran/', '/karier/', '/kontak/', '/tracking/', '/kalkulator/', '/rute-pengiriman/', '/berita/'].includes(route)
      ) {
        const tag = route.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
        await page.screenshot({ path: `test-results/upgrade-${tag}-${width}.png`, fullPage: true });
        const a11y = await new AxeBuilder({ page })
          .include('main')
          .include('footer')
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        assert.deepEqual(
          a11y.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
          [],
          `${route} accessibility at ${width}`
        );
      }
    }
  }

  // Home Services timeline: collapsed initially, icon nodes, 1.5s slideshow advances in view, expands on click
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + '/');
  const servicesSection = page.locator('#services');
  await servicesSection.scrollIntoViewIfNeeded();
  assert.equal(await servicesSection.locator('[aria-expanded="true"]').count(), 0);
  const firstStepText = await servicesSection.locator('.services-step-icon-node').first().innerText();
  assert.equal(firstStepText.trim(), '');
  await page.waitForTimeout(1650);
  assert.equal(await servicesSection.locator('[data-spotlight="true"]').count(), 1);
  await servicesSection.locator('.shipping-step-trigger').nth(2).click();
  assert.equal(await servicesSection.locator('[aria-expanded="true"]').count(), 1);

  // Scenario 1: Customs clearance Semarang without HS code
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto(base + '/layanan/ppjk-customs-clearance/?city=semarang');
  await page.waitForTimeout(400);
  const ppjkWaHref = await page.locator('.service-primary').getAttribute('href');
  assert.ok(ppjkWaHref.startsWith('https://wa.me/6285608561745?text='), ppjkWaHref);
  assert.match(decodeURIComponent(ppjkWaHref), /Semarang/i);
  assert.equal(await page.locator('.service-primary').innerText(), 'Chat WhatsApp');
  const ppjkMailHref = await page.locator('.service-email-cta').getAttribute('href');
  assert.ok(ppjkMailHref.startsWith('mailto:info@gaeks.com?subject='), ppjkMailHref);

  // Verify sticky mobile bar appears after scrolling past hero, has both WA & email, and hides on #quote-form
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(250);
  const stickyRegion = page.locator('[role="region"][aria-label^="Kontak cepat"]');
  await stickyRegion.waitFor({ state: 'visible' });
  assert.ok((await stickyRegion.locator('a[href^="https://wa.me/6285608561745"]').count()) === 1);
  assert.ok((await stickyRegion.locator('a[href^="mailto:info@gaeks.com"]').count()) === 1);
  await page.locator('#quote-form').scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  assert.equal(await stickyRegion.count(), 0);

  // Verify empty QuoteForm still works on click (WhatsApp & Email) and analytics fires once per click + survives blocked dataLayer
  await page.evaluate(() => {
    window.dataLayer = [];
    window.__openedUrls = [];
    window.open = (url) => {
      window.__openedUrls.push(String(url));
      return null;
    };
  });
  await page.locator('#quote-form button[type="submit"]').click();
  let dl = await page.evaluate(() => window.dataLayer);
  assert.equal(dl.length, 1);
  assert.deepEqual(dl[0], { event: 'gaeks_contact_click', channel: 'whatsapp', service: 'ppjk' });
  assert.ok((await page.evaluate(() => window.__openedUrls[0])).startsWith('https://wa.me/6285608561745?text='));

  // Analytics blocked (throwing dataLayer.push) must NOT break buttons
  await page.evaluate(() => {
    window.dataLayer = {
      push() {
        throw new Error('Blocked by extension');
      },
    };
  });
  await page.locator('#quote-form button[type="submit"]').click();
  assert.equal((await page.evaluate(() => window.__openedUrls)).length, 2);

  // Verify /layanan/ matches production master-detail directory and CollectionPage/ItemList SSR
  const layananSsr = await (await fetch(base + '/layanan/')).text();
  assert.match(layananSsr, /CollectionPage/);
  assert.match(layananSsr, /ItemList/);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + '/layanan/');
  await page.waitForTimeout(400);
  const secondChoice = page.locator('.services-directory-choice').nth(1);
  const secondTitle = (await secondChoice.innerText())
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !/^\d+$/.test(line));
  await secondChoice.click();
  assert.equal(await secondChoice.getAttribute('aria-pressed'), 'true');
  assert.ok(secondTitle, 'Expected second service title in directory choice');
  assert.match(await page.locator('.services-directory-preview h2').innerText(), new RegExp(secondTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));

  // Header CTA on Air Freight says "Chat WhatsApp" while routing to Air Freight team (+6287722440148)
  await page.goto(base + '/layanan/freight-udara/?direction=ekspor');
  await page.waitForTimeout(400);
  assert.equal(await page.locator('.service-primary').innerText(), 'Chat WhatsApp');
  const airWaHref = await page.locator('.service-primary').getAttribute('href');
  assert.ok(airWaHref.startsWith('https://wa.me/6287722440148?text='), airWaHref);
  const airMailHref = await page.locator('.service-email-cta').getAttribute('href');
  assert.ok(airMailHref.startsWith('mailto:aksa@gaeks.com?subject='), airMailHref);
  assert.match(decodeURIComponent(airMailHref), /Konsultasi Air Freight Ekspor/);
  // Header primary CTA points to quote form with formal label "Minta Penawaran"
  const navQuoteLink = page.locator('header nav ~ div a[href*="/kontak/"]');
  assert.equal((await navQuoteLink.innerText()).trim(), 'Minta Penawaran');
  // Desktop navigation dropdown opens cleanly via click/keyboard, does not clip, and closes on Escape
  const servicesDropdownTrigger = page.locator('header nav button', { hasText: 'Layanan' }).first();
  await servicesDropdownTrigger.click();
  await page.waitForTimeout(250);
  assert.equal(await servicesDropdownTrigger.getAttribute('aria-expanded'), 'true');
  await page.screenshot({ path: 'test-results/upgrade-nav-dropdown-1440.png' });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  assert.equal(await servicesDropdownTrigger.getAttribute('aria-expanded'), 'false');
  // Copy email button works & announces status on air freight detail page
  await page.locator('.service-email-copy-row button').click();
  await page.locator('.service-email-copy-row button[data-copied="true"]').waitFor({ state: 'visible', timeout: 5000 });
  assert.equal((await page.locator('.service-email-copy-row [role="status"]').innerText()).trim(), 'Tersalin');

  // Verify corporate pages: Tentang Kami, Tarif Pengiriman, Maskapai & Pelayaran, Karier
  await page.goto(base + '/tentang-kami/');
  await page.waitForTimeout(400);
  const aboutText = await page.locator('main').innerText();
  assert.doesNotMatch(aboutText, /\binsan\b/i);
  assert.match(aboutText, /Lebih dari sekadar pengiriman\.\s+Kami memahami nilai di baliknya\./);
  assert.match(aboutText, /Membentuk standar baru dalam industri freight forwarding/);
  assert.match(aboutText, /Solusi nyata\./);
  assert.equal(await page.locator('a[download][href="/documents/GAEKS-Freight-Vision-Mission-and-Brand-Identity-Final.pdf"]').count(), 1);
  assert.equal(await page.locator('a[href*="Arahan"]').count(), 0);
  await page.goto(base + '/tarif-pengiriman/');
  await page.waitForTimeout(400);
  assert.match(await page.locator('main').innerText(), /Informasi tarif belum tersedia secara daring\./);
  await page.goto(base + '/maskapai-dan-pelayaran/');
  await page.waitForTimeout(400);
  assert.match(await page.locator('main').innerText(), /Direktori penyedia angkutan belum tersedia secara daring\./);
  await page.goto(base + '/karier/');
  await page.waitForTimeout(400);
  const careersText = await page.locator('main').innerText();
  assert.match(careersText, /Saat ini belum ada lowongan yang tersedia\./);
  assert.doesNotMatch(careersText, /Lamar Sekarang/i);

  // Scenario 3: FCL without container size (page + SmartCalculator empty/unfilled)
  await page.goto(base + '/layanan/freight-laut-fcl/');
  await page.waitForTimeout(400);
  assert.ok((await page.locator('.service-primary').getAttribute('href')).startsWith('https://wa.me/6285608561745?text='));
  assert.ok((await page.locator('.service-email-cta').getAttribute('href')).startsWith('mailto:info@gaeks.com?subject='));
  await page.goto(base + '/kalkulator/');
  await page.waitForTimeout(400);
  // Clear cargo inputs so nothing is filled, verify FCL & Air contact links still work
  const calcInputs = page.locator('#calculator input[type="number"]');
  const inputCount = await calcInputs.count();
  for (let i = 0; i < inputCount; i++) await calcInputs.nth(i).fill('0');
  const fclCalcWa = await page.locator('#calculator a[href^="https://wa.me/"]').first().getAttribute('href');
  assert.ok(fclCalcWa.startsWith('https://wa.me/6285608561745?text='), fclCalcWa);
  await page.getByRole('button', { name: /Udara/i }).click();
  const airCalcWa = await page.locator('#calculator a[href^="https://wa.me/"]').first().getAttribute('href');
  const airCalcMail = await page.locator('#calculator a[href^="mailto:"]').first().getAttribute('href');
  assert.ok(airCalcWa.startsWith('https://wa.me/6287722440148?text='), airCalcWa);
  assert.ok(airCalcMail.startsWith('mailto:aksa@gaeks.com?subject='), airCalcMail);

  // Scenario 4: Undername / PI Surabaya
  await page.goto(base + '/layanan/undername-impor-pi/?city=surabaya');
  await page.waitForTimeout(400);
  const undernameWa = await page.locator('.service-primary').getAttribute('href');
  const undernameMail = await page.locator('.service-email-cta').getAttribute('href');
  assert.ok(undernameWa.startsWith('https://wa.me/6285608561745?text='), undernameWa);
  assert.match(decodeURIComponent(undernameWa), /Surabaya/i);
  assert.ok(undernameMail.startsWith('mailto:info@gaeks.com?subject='), undernameMail);

  // Scenario 5: Project Cargo points to CS (+6281393453375 / Cs@gaeks.com) and NOT FCL
  await page.goto(base + '/layanan/project-cargo-heavy-lift/');
  await page.waitForTimeout(400);
  assert.equal(await page.locator('.service-primary').innerText(), 'Chat WhatsApp');
  const pcWa = await page.locator('.service-primary').getAttribute('href');
  const pcMail = await page.locator('.service-email-cta').getAttribute('href');
  assert.ok(pcWa.startsWith('https://wa.me/6281393453375?text='), pcWa);
  assert.doesNotMatch(decodeURIComponent(pcWa), /FCL/i);
  assert.ok(pcMail.startsWith('mailto:Cs@gaeks.com?subject='), pcMail);

  // Footer & Phone directory checks
  assert.equal(await page.locator('.footer-team-index').count(), 0);
  assert.ok((await page.locator('.footer-social a[href*="instagram.com/gaeksfreight"]').count()) >= 1);
  const footerWa = await page.locator('footer a[href*="wa.me"]').evaluateAll((links) => links.map((l) => new URL(l.href).pathname));
  assert.deepEqual(footerWa, ['/6285608561745', '/6287722440148', '/6281393453375']);
  const footerAddresses = await page.locator('footer a[href^="mailto:"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href').split('?')[0].toLowerCase())
  );
  assert.deepEqual(footerAddresses, ['mailto:info@gaeks.com', 'mailto:aksa@gaeks.com', 'mailto:cs@gaeks.com']);

  await page.locator('.footer-directory').focus();
  await page.keyboard.press('Enter');
  await page.waitForURL('**/kontak/telepon/');
  await page.locator('.phone-number').first().waitFor();
  assert.equal(await page.locator('.phone-team').count(), 3);
  const phoneLinks = await page.locator('.phone-whatsapp').evaluateAll((links) => links.map((link) => new URL(link.href).pathname));
  assert.deepEqual(phoneLinks, ['/6285608561745', '/6287722440148', '/6281393453375']);
  assert.match(await page.locator('.phone-team').nth(2).innerText(), /Project Cargo/i);

  // Disclosure keyboard check
  await page.goto(base + '/layanan/freight-udara/');
  const summary = page.locator('.service-disclosures summary').last();
  await summary.focus();
  await page.keyboard.press('Enter');
  assert.equal(await summary.evaluate((el) => el.parentElement.open), true);
  await page.keyboard.press('Enter');
  assert.equal(await summary.evaluate((el) => el.parentElement.open), false);

  // Scenario 6: Operator changes a contact + service tagline + favicon in local CMS -> fresh visitor session sees updates even when translating -> restore
  await page.goto(base + '/operator/');
  await page.getByLabel('Username', { exact: true }).fill('cms-local-test');
  await page.getByLabel('Kata sandi', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Masuk ke ruang kerja', exact: true }).click();
  await page.getByRole('navigation', { name: 'Modul operator' }).getByRole('button', { name: 'Brand & Kontak', exact: true }).click();
  await page.getByLabel('URL Favicon', { exact: true }).fill('/uploads/custom-favicon-live.webp');
  await page.getByLabel('Email tim', { exact: true }).nth(3).fill('udara-uji@example.com');
  await page.getByRole('button', { name: 'Simpan ke server', exact: true }).click();
  await page.waitForTimeout(700);
  await page.getByRole('navigation', { name: 'Modul operator' }).getByRole('button', { name: 'Layanan', exact: true }).click();
  await page.getByRole('button', { name: 'Edit' }).first().click();
  await page.getByLabel('Tagline', { exact: true }).fill('Tagline baru uji kepabeanan GAEKS.');
  await page.getByRole('button', { name: 'Simpan ke server', exact: true }).click();
  await page.waitForTimeout(700);

  const freshContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const freshPage = await freshContext.newPage();
  await freshPage.route('https://translate.google.com/**', (route) => route.abort());
  await freshPage.goto(base + '/');
  await freshPage.waitForTimeout(600);
  const faviconAttrs = await freshPage.locator('head link[rel="icon"]').evaluate((el) => ({
    href: el.getAttribute('href'),
    type: el.getAttribute('type'),
  }));
  assert.deepEqual(faviconAttrs, { href: '/uploads/custom-favicon-live.webp', type: 'image/webp' });
  assert.match(await freshPage.locator('#home aside').innerText(), /Tagline baru uji kepabeanan GAEKS\./);
  await freshPage.locator('#services .shipping-step-trigger').first().click();
  await freshPage.locator('#services .shipping-step-panel .services-step-body').first().waitFor({ state: 'visible', timeout: 3000 });
  assert.match(await freshPage.locator('#services').innerText(), /Tagline baru uji kepabeanan GAEKS\./);
  await freshPage.locator('header summary[aria-label^="Bahasa aktif"]').click();
  await freshPage.getByRole('button', { name: 'English', exact: true }).click();
  await freshPage.waitForTimeout(200);
  const translatedHeroTitle = await freshPage.locator('#hero-title').innerText();
  assert.match(translatedHeroTitle, /Powered by People\./);
  assert.match(translatedHeroTitle, /Driven by Technology\./);
  assert.match(translatedHeroTitle, /Focused on You\./);
  const translatedHeroAside = await freshPage.locator('#home aside').innerText();
  const translatedServices = await freshPage.locator('#services').innerText();
  assert.match(translatedHeroAside, /Tagline baru uji kepabeanan GAEKS\./);
  assert.doesNotMatch(translatedHeroAside, /Swift PIB\/PEB processing/);
  assert.match(translatedServices, /Tagline baru uji kepabeanan GAEKS\./);
  assert.doesNotMatch(translatedServices, /Swift PIB\/PEB processing/);
  await freshPage.goto(base + '/layanan/freight-udara/');
  await freshPage.waitForTimeout(600);
  assert.ok((await freshPage.locator('.service-email-cta').getAttribute('href')).startsWith('mailto:udara-uji@example.com?'));
  await freshPage.goto(base + '/kontak/');
  await freshPage.waitForTimeout(600);
  assert.ok((await freshPage.locator('a[href^="mailto:udara-uji@example.com"]').count()) >= 1);
  await freshPage.goto(base + '/kalkulator/');
  await freshPage.waitForTimeout(600);
  await freshPage.getByRole('button', { name: /Udara/i }).click();
  assert.ok((await freshPage.locator('#calculator a[href^="mailto:udara-uji@example.com"]').count()) >= 1);
  await freshContext.close();

  // Verify CMS corporate section roundtrip (draft gating + published rate item live update)
  const corpSaved = {
    ...(data.corporate || {}),
    rateCard: {
      ...(data.corporate?.rateCard || {}),
      items: [
        {
          id: 'rate-cms-published',
          status: 'published',
          mode: 'ocean',
          serviceType: 'FCL',
          origin: 'Jakarta',
          destination: 'Singapore',
          originPortOrAirport: 'Tanjung Priok (IDTPP)',
          destinationPortOrAirport: 'PSA Singapore (SGSIN)',
          containerOrCargoType: '20ft Container',
          rate: '950',
          currency: 'USD',
          validUntil: '2026-12-31',
          costScope: 'Port-to-Port',
          terms: 'Jadwal mingguan.',
        },
        {
          id: 'rate-cms-draft',
          status: 'draft',
          mode: 'air',
          serviceType: 'Air Freight',
          origin: 'CGK',
          destination: 'HKG',
          originPortOrAirport: 'Soekarno-Hatta (CGK)',
          destinationPortOrAirport: 'Hong Kong (HKG)',
          containerOrCargoType: 'General Cargo',
          rate: '4.5',
          currency: 'USD',
          validUntil: '2026-12-31',
          costScope: 'Airport-to-Airport',
          terms: 'Draft item must stay hidden.',
        },
      ],
    },
  };
  assert.equal((await save('corporate', corpSaved)).status, 200);
  const corpContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const corpPage = await corpContext.newPage();
  await corpPage.goto(base + '/tarif-pengiriman/');
  await corpPage.waitForTimeout(500);
  const rateText = await corpPage.locator('main').innerText();
  assert.match(rateText, /Tanjung Priok \(IDTPP\)/);
  assert.match(rateText, /PSA Singapore \(SGSIN\)/);
  assert.doesNotMatch(rateText, /Hong Kong \(HKG\)/);
  await corpContext.close();

  // Restore original CMS file immediately after verification
  await writeFile(contentPath, original);

  // Contact page 3 grouped teams + simplified multi-service QuoteForm + Smart routing + CMS Inquiry DB logging
  await page.goto(base + '/kontak/?service=air');
  await page.waitForTimeout(600);
  assert.equal(await page.locator('.contact-directory a').getAttribute('href'), '/kontak/telepon/');
  assert.ok((await page.locator('a[href^="mailto:aksa@gaeks.com"]').count()) >= 1);
  await page.evaluate(() => {
    window.open = (url) => {
      window.__quoteTarget = String(url);
      return null;
    };
  });
  await page.locator('#quote-form button[type=submit]').click();
  assert.ok((await page.evaluate(() => window.__quoteTarget)).startsWith('https://wa.me/6287722440148?text='));

  // Remove preselected Air, verify majority lean: FCL + PPJK (2) vs Domestic Trucking (1) -> routes to Trade/Customs (+6285608561745)
  await page.locator('#quote-form button[aria-label^="Hapus Air Shipment Priority"]').click();
  await page.locator('#quote-form button[aria-controls$="-services-list"]').click();
  await page.locator('#quote-form [role="group"] label', { hasText: 'FCL (Full Container Load)' }).click();
  await page.locator('#quote-form [role="group"] label', { hasText: 'PPJK (Customs Clearance)' }).click();
  await page.locator('#quote-form [role="group"] label', { hasText: 'Domestic Trucking' }).click();
  await page.locator('#quote-form button[type=submit]').click();
  assert.ok((await page.evaluate(() => window.__quoteTarget)).startsWith('https://wa.me/6285608561745?text='));

  // Remove PPJK -> now FCL (1) vs Domestic Trucking (1) is 50/50 tie -> routes to CS (+6281393453375), fill form (without "PIC" labels) and verify chained WhatsApp + Email + CMS logging
  await page.locator('#quote-form button[aria-label^="Hapus PPJK"]').click();
  const quoteFormText = await page.locator('#quote-form').innerText();
  assert.equal(/\bPIC\b/.test(quoteFormText), false);
  await page.locator('#quote-form input[name="company"]').fill('PT Samudra Uji Mandiri');
  await page.locator('#quote-form input[name="picName"]').fill('Budi Santoso');
  await page.locator('#quote-form input[name="picPhone"]').fill('081234567890');
  await page.locator('#quote-form input[name="picEmail"]').fill('budi@samudrauji.example');
  await page.locator('#quote-form textarea[name="description"]').fill('Butuh koordinasi FCL dan trucking ke Cikarang.');
  await page.locator('#quote-form button[type=submit]').click();
  const chainedWa = await page.evaluate(() => window.__quoteTarget);
  assert.ok(chainedWa.startsWith('https://wa.me/6281393453375?text='));
  assert.match(decodeURIComponent(chainedWa), /PT Samudra Uji Mandiri/);
  assert.match(decodeURIComponent(chainedWa), /Budi Santoso/);
  const sidebarMailto = await page.locator('aside a[href^="mailto:Cs@gaeks.com"]').first().getAttribute('href');
  assert.match(decodeURIComponent(sidebarMailto || ''), /PT Samudra Uji Mandiri/);
  await page.getByText('Data tercatat di sistem GAEKS.').waitFor({ timeout: 5000 });

  // Verify Operator CMS recorded this inquiry under Permintaan Masuk tab, then clean up test inquiry
  await page.goto(base + '/operator/?module=inquiries');
  await page.getByText('PT Samudra Uji Mandiri').waitFor({ timeout: 8000 });
  const inqText = await page.locator('#public-content').innerText();
  assert.match(inqText, /PT Samudra Uji Mandiri/);
  assert.match(inqText, /Budi Santoso/);
  await page.evaluate(async () => {
    const res = await fetch('/api/inquiries.php');
    const data = await res.json();
    const target = (data.inquiries || []).find((i) => i.company === 'PT Samudra Uji Mandiri');
    if (target) {
      const csrf = await (await fetch('/api/auth.php')).json();
      await fetch('/api/inquiries.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf.csrfToken || '' },
        body: JSON.stringify({ id: target.id }),
      });
    }
  });

  await page.setViewportSize({ width: 375, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await page.waitForTimeout(500);
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  assert.deepEqual(errors, []);

  console.log(
    'PASS: auth/CSRF; v7 Search Intelligence migration; Project Cargo->CS; /operator/ noindex; /en/ hreflang; all 6 buyer/operator scenarios; smart multi-service QuoteForm + CMS Inquiry DB; analytics; SSR/schema; 40 route/viewport overflow checks; axe a11y; keyboard; reduced motion.'
  );
} finally {
  await browser?.close();
  await writeFile(contentPath, original);
  if (users) await writeFile(usersPath, users);
  else {
    try {
      await unlink(usersPath);
    } catch {}
  }
}
