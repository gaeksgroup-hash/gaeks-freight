import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const errors = [];
const check = (cond, msg) => {
  if (!cond) errors.push(msg);
};

const si = JSON.parse(await readFile('public/api/search_intelligence.json', 'utf8'));
const services = JSON.parse(await readFile('public/api/service_editorial_seed.json', 'utf8'));
const articles = JSON.parse(await readFile('public/api/articles_seed.json', 'utf8'));
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const llms = await readFile('dist/llms.txt', 'utf8');
const llmsFull = await readFile('dist/llms-full.txt', 'utf8');

const titles = new Map();
const descriptions = new Map();

// Check pre-rendered Indonesian & English public HTML files
for (const [routePath, meta] of Object.entries(si.routes || {})) {
  const variants = [{ path: routePath, lang: 'id' }];
  if (meta.enAvailable) {
    variants.push({ path: routePath === '/' ? '/en/' : `/en${routePath}`, lang: 'en' });
  }
  for (const variant of variants) {
    const htmlPath = join('dist', variant.path, 'index.html');
    const html = await readFile(htmlPath, 'utf8').catch(() => '');
    check(Boolean(html), `Missing pre-rendered HTML: ${htmlPath}`);
    if (!html) continue;

    check(!/<meta name="keywords"/i.test(html), `Forbidden <meta name="keywords"> found in ${htmlPath}`);
    check(/<link rel="canonical" href="https:\/\/gaeks\.com/.test(html), `Missing canonical in ${htmlPath}`);
    check(/<script type="application\/ld\+json">/.test(html), `Missing JSON-LD in ${htmlPath}`);
    check(!/(tiga besar|3 besar|top 3|peringkat 3|nomor 1)/i.test(html), `Cancelled top-3 claim found in ${htmlPath}`);

    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch?.[1]?.trim() || '';
    check(title.length >= 20, `Title too short in ${htmlPath}: ${title}`);
    check(!titles.has(title), `Duplicate title "${title}" across ${titles.get(title)} and ${htmlPath}`);
    titles.set(title, htmlPath);

    const descMatch = html.match(/<meta name="description" content="([^"]*)"/i);
    const desc = descMatch?.[1]?.trim() || '';
    check(desc.length >= 60, `Description too short in ${htmlPath}`);
    check(!descriptions.has(desc), `Duplicate description across ${descriptions.get(desc)} and ${htmlPath}`);
    descriptions.set(desc, htmlPath);

    if (meta.enAvailable) {
      check(/hreflang="id-ID"/.test(html) && /hreflang="en"/.test(html) && /hreflang="x-default"/.test(html), `Missing reciprocal hreflang tags in ${htmlPath}`);
    }
    check(sitemap.includes(`<loc>https://gaeks.com${variant.path}</loc>`), `Route missing from sitemap.xml: ${variant.path}`);
  }
}

// Check all 9 services (ID + EN)
for (const svc of services) {
  const slug = si.serviceSlugs?.[svc.id] || svc.id;
  for (const prefix of ['', '/en']) {
    const p = `${prefix}/layanan/${slug}/`;
    const htmlPath = join('dist', p, 'index.html');
    const html = await readFile(htmlPath, 'utf8').catch(() => '');
    check(Boolean(html), `Missing service HTML: ${htmlPath}`);
    check(sitemap.includes(`<loc>https://gaeks.com${p}</loc>`), `Service missing from sitemap.xml: ${p}`);
    if (html) {
      check(!/<meta name="keywords"/i.test(html), `Meta keywords present in ${htmlPath}`);
      check(/hreflang="en"/.test(html) && /hreflang="id-ID"/.test(html), `Missing hreflang on service ${htmlPath}`);
      check(/@type":"FAQPage"/.test(html) || (svc.faq?.length || 0) === 0, `Missing FAQPage schema on ${htmlPath}`);
    }
  }
  const imgRaw = svc.imageUrl || '';
  if (imgRaw.startsWith('/')) {
    await access(join('public', imgRaw.slice(1))).catch(() => errors.push(`Missing service image in public/: ${imgRaw}`));
  }
}

// Check /operator/ strictly noindex & excluded from sitemap
const opHtml = await readFile(join('dist', 'operator', 'index.html'), 'utf8').catch(() => '');
check(Boolean(opHtml), 'Missing pre-rendered dist/operator/index.html');
check(/<meta name="robots" content="noindex, nofollow, noarchive"/i.test(opHtml), 'dist/operator/index.html lacks strict noindex');
check(!sitemap.includes('/operator/'), '/operator/ must NEVER appear in sitemap.xml');

// Check article uniqueness & non-boilerplate slugs
const articleBodies = new Set();
for (const art of articles) {
  check(!String(art.slug || '').startsWith('analisis-komprehensif-logistik-maritim-'), `Legacy boilerplate slug still in articles_seed.json: ${art.slug}`);
  check(!articleBodies.has(art.content), `Duplicate article content detected for ${art.id}`);
  articleBodies.add(art.content);
  check(sitemap.includes(`/berita/${art.slug}/`), `Article missing from sitemap.xml: ${art.slug}`);
}

// Check llms.txt & llms-full.txt coverage
check(llms.includes('RORO') && llms.includes('FCL') && llms.includes('Air Freight'), 'llms.txt missing core service coverage');
check(llms.includes('PT Global Andalan Ekspress'), 'llms.txt missing legal entity');
check(llmsFull.includes('Pertanyaan Umum'), 'llms-full.txt missing AEO FAQ block');

if (errors.length > 0) {
  console.error(`FAIL: Search Intelligence verification found ${errors.length} issue(s):`);
  for (const err of errors) console.error(' -', err);
  process.exit(1);
}

console.log(`PASS: Search Intelligence verified (${services.length} services ID+EN, ${articles.length} unique articles, noindex /operator/, reciprocal hreflang, 0 meta keywords, sitemap & llms.txt OK).`);
