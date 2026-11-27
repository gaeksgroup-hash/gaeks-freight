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
  assert.equal(data.serviceCmsVersion, 6);
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
  }

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
  assert.equal((await save('branding', changed)).status, 200);
  assert.match(await (await fetch(base + '/layanan/freight-udara/')).text(), /local-check@example\.com/);

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

  // Responsive overflow, screenshots, and axe accessibility across viewports
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '/',
      '/layanan/',
      '/kontak/',
      '/kontak/telepon/',
      '/layanan/ppjk-customs-clearance/',
      '/layanan/freight-laut-fcl/',
      '/layanan/freight-udara/',
      '/layanan/undername-impor-pi/',
      '/layanan/project-cargo-heavy-lift/',
      '/kalkulator/',
      '/tracking/',
    ]) {
      await page.goto(base + route);
      await page.waitForTimeout(550);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${route} overflow at ${width}`);
      if (route === '/') {
        const poster = page.locator('#home img').first();
        assert.ok((await poster.evaluate((el) => el.naturalWidth)) > 0, `hero poster loaded at ${width}`);
      }
      if (
        route === '/' ||
        route === '/layanan/' ||
        route === '/kontak/' ||
        route === '/kontak/telepon/' ||
        route === '/layanan/ppjk-customs-clearance/' ||
        route === '/layanan/freight-laut-fcl/' ||
        route === '/layanan/freight-udara/' ||
        route === '/layanan/undername-impor-pi/' ||
        route === '/layanan/project-cargo-heavy-lift/' ||
        route === '/kalkulator/'
      ) {
        const tag = route.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
        if (width === 375 || width === 1440) {
          await page.screenshot({ path: `test-results/${tag}-${width}.png`, fullPage: true });
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
  await page.locator('.services-directory-choice').nth(1).click();
  assert.equal(await page.locator('.services-directory-choice').nth(1).getAttribute('aria-pressed'), 'true');
  assert.match(await page.locator('.services-directory-preview h2').innerText(), /Gudang/);

  // Header CTA on Air Freight says "Chat WhatsApp" while routing to Air Freight team (+6287722440148)
  await page.goto(base + '/layanan/freight-udara/?direction=ekspor');
  await page.waitForTimeout(400);
  assert.equal(await page.locator('.service-primary').innerText(), 'Chat WhatsApp');
  const airWaHref = await page.locator('.service-primary').getAttribute('href');
  assert.ok(airWaHref.startsWith('https://wa.me/6287722440148?text='), airWaHref);
  const airMailHref = await page.locator('.service-email-cta').getAttribute('href');
  assert.ok(airMailHref.startsWith('mailto:aksa@gaeks.com?subject='), airMailHref);
  assert.match(decodeURIComponent(airMailHref), /Konsultasi Air Freight Ekspor/);
  // Header CTA on Air Freight points to Air Freight team with concise "Chat WhatsApp" label
  const navWaLink = page.locator('header nav ~ div a[href*="wa.me"]');
  assert.equal(await navWaLink.innerText(), 'Chat WhatsApp');
  const navWaHref = await navWaLink.getAttribute('href');
  assert.ok(navWaHref.startsWith('https://wa.me/6287722440148?text='), navWaHref);
  // Copy email button works & announces status
  await page.locator('.service-email-copy-row button').click();
  assert.equal(await page.locator('.service-email-copy-row [role="status"]').innerText(), 'Tersalin');

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

  // Scenario 6: Operator changes a contact in local CMS -> fresh visitor session sees updated target -> restore
  await page.goto(base + '/operator/');
  await page.getByLabel('Username', { exact: true }).fill('cms-local-test');
  await page.getByLabel('Kata sandi', { exact: true }).fill(password);
  await page.getByRole('button', { name: 'Masuk ke ruang kerja', exact: true }).click();
  await page.getByRole('navigation', { name: 'Modul operator' }).getByRole('button', { name: 'Brand & Kontak', exact: true }).click();
  await page.getByLabel('Email tim', { exact: true }).nth(3).fill('udara-uji@example.com');
  await page.getByRole('button', { name: 'Simpan ke server', exact: true }).click();
  await page.waitForTimeout(700);

  const freshContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const freshPage = await freshContext.newPage();
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

  // Restore original CMS file immediately after verification
  await writeFile(contentPath, original);

  // Contact page 3 grouped teams + QuoteForm routing for all groups
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
  for (const [service, phone] of [
    ['fcl', '6285608561745'],
    ['air', '6287722440148'],
    ['ppjk', '6285608561745'],
    ['undername', '6285608561745'],
    ['project-cargo', '6281393453375'],
    ['roro-breakbulk', '6285608561745'],
    ['general', '6281393453375'],
  ]) {
    await page.locator('#quote-form select').first().selectOption(service);
    await page.locator('#quote-form button[type=submit]').click();
    assert.ok((await page.evaluate(() => window.__quoteTarget)).startsWith('https://wa.me/' + phone + '?text='));
  }

  await page.setViewportSize({ width: 375, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await page.waitForTimeout(500);
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  assert.deepEqual(errors, []);

  console.log(
    'PASS: auth/CSRF; v6 migration; Project Cargo->CS; all 6 buyer/operator scenarios; empty QuoteForm; analytics single-fire & blocked fallback; SSR/schema; 40 route/viewport overflow checks; axe a11y; keyboard; reduced motion.'
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
