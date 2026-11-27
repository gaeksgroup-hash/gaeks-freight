import assert from 'node:assert/strict';
import {readFile,writeFile,unlink,mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import {join} from 'node:path';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {findRuntime} from '../scripts/project-tools.mjs';
const base='http://127.0.0.1:4173';
await fetch(base+'/api/sync.php');
const contentPath='gaeks-private/site_content.json',usersPath='gaeks-private/operators.json';
const original=await readFile(contentPath);let users=null;try{users=await readFile(usersPath)}catch{}
const password=randomBytes(24).toString('hex');
const php=findRuntime('php');assert.ok(php,'PHP is required');
const hash=spawnSync(php,['-r','echo password_hash(stream_get_contents(STDIN), PASSWORD_DEFAULT);'],{input:password,encoding:'utf8'}).stdout;
await writeFile(usersPath,JSON.stringify([{username:'cms-local-test',displayName:'Local test',role:'website_admin',active:true,passwordHash:hash}]));
let browser;
try{
 const login=await fetch(base+'/api/auth.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:'cms-local-test',password})});
 const auth=await login.json();assert.equal(auth.authenticated,true);
 const cookie=login.headers.getSetCookie().map(c=>c.split(';')[0]).join('; ');
 const headers={'Content-Type':'application/json',Cookie:cookie,'X-CSRF-Token':auth.csrfToken};
 const data=JSON.parse(original);
 assert.equal(data.serviceCmsVersion,4);
 assert.equal(data.branding.contactGroups.find(g=>g.id==='general').serviceIds.includes('project-cargo'),false);
 assert.equal(data.branding.contactGroups.find(g=>g.id==='fcl').serviceIds.includes('roro-breakbulk'),true);
 assert.equal(data.hero.imageUrl,'/uploads/gaeks-hero-cargo-poster.webp');
 assert.equal(data.hero.videoUrl,'/uploads/gaeks-hero-cargo-optimized.webm');
 for(const service of data.services){const path=new URL(service.canonical).pathname;const response=await fetch(base+path);assert.equal(response.status,200,path);assert.match(await response.text(),/application\/ld\+json/);}
 const save=(section,payload,extra=headers)=>fetch(base+'/api/sync.php',{method:'POST',headers:extra,body:JSON.stringify({section,payload})});
 assert.equal((await save('branding',data.branding,{'Content-Type':'application/json'})).status,401);
 assert.equal((await save('branding',data.branding,{'Content-Type':'application/json',Cookie:cookie})).status,403);
 const changed=structuredClone(data.branding);changed.contactGroups.find(g=>g.id==='air').email='local-check@example.com';
 assert.equal((await save('branding',changed)).status,200);
 assert.match(await (await fetch(base+'/layanan/freight-udara/')).text(),/local-check@example.com/);
 const phoneSsr=await(await fetch(base+'/kontak/telepon/')).text();assert.match(phoneSsr,/local-check@example.com/);assert.match(phoneSsr,/ContactPage/);assert.match(phoneSsr,/https:\/\/gaeks.com\/kontak\/telepon\//);
 assert.ok((await(await fetch(base+'/sitemap.xml')).text()).includes('/kontak/telepon/'));
 const site=structuredClone(data.siteSettings);site.uiCopy.contactMetaTitle='CMS contact metadata test';site.uiCopy.footerTrackingCta='Lacak tes CMS';assert.equal((await save('siteSettings',site)).status,200);assert.match(await(await fetch(base+'/kontak/')).text(),/<title>CMS contact metadata test<\/title>/);
 site.uiCopy.phoneHeading='Tim telepon dari CMS';assert.equal((await save('siteSettings',site)).status,200);assert.match(await(await fetch(base+'/kontak/telepon/')).text(),/<h1>Tim telepon dari CMS<\/h1>/);
 const services=structuredClone(data.services);const air=services.find(s=>s.id==='air-shipment');air.seoTitle='CMS test title';air.faq=[['CMS test question','CMS test answer']];
 const saved=await save('services',services); assert.equal(saved.status,200,await saved.text());
 const html=await(await fetch(base+'/layanan/freight-udara/')).text();assert.match(html,/<title>CMS test title<\/title>/);assert.match(html,/CMS test answer/);assert.match(html,/FAQPage/);
 air.status='draft';assert.equal((await save('services',services)).status,200);
 assert.equal((await fetch(base+'/layanan/freight-udara/')).status,404);
 assert.ok(!(await(await fetch(base+'/sitemap.xml')).text()).includes('/layanan/freight-udara/'));
 assert.ok(!(await(await fetch(base+'/api/sync.php')).json()).services.some(s=>s.id==='air-shipment'));
 await writeFile(contentPath,original);
 browser=await chromium.launch({...(process.env.GAEKS_BROWSER_CHANNEL?{channel:process.env.GAEKS_BROWSER_CHANNEL}:{}),headless:true});const context=await browser.newContext({viewport:{width:375,height:844}});const page=await context.newPage();
 await mkdir('test-results',{recursive:true});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [375,768,1024,1440]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/kontak/','/kontak/telepon/','/layanan/freight-udara/','/layanan/roro-breakbulk/','/tracking/']){
   await page.goto(base+route);await page.waitForTimeout(700);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,route+' overflow at '+width);
   if(route==='/'){const poster=page.locator('#home img').first();assert.ok((await poster.evaluate(el=>el.naturalWidth))>0,'hero poster loaded at '+width);}
   if(route==='/kontak/'||route==='/kontak/telepon/'||route==='/layanan/freight-udara/'){
    await page.screenshot({path:`test-results/${route.includes('freight')?'air':route.includes('telepon')?'phones':'contact'}-${width}.png`,fullPage:true});
    if(width===375||width===1440){const a11y=await new AxeBuilder({page}).include('main').include('footer').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(a11y.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],route+' accessibility');await page.locator('footer').screenshot({path:`test-results/footer-${width}.png`});}
   }
  }
 }
 await page.goto(base+'/layanan/freight-udara/');
 const footerAddresses=await page.locator('footer a[href^="mailto:"]').evaluateAll(links=>links.map(link=>link.getAttribute('href').toLowerCase()));
 assert.deepEqual(footerAddresses,['mailto:cs@gaeks.com','mailto:info@gaeks.com','mailto:aksa@gaeks.com']);
 assert.equal(await page.locator('footer a[href^="tel:"], footer a[href*="wa.me"]').count(),0);
 await page.locator('.footer-directory').focus();await page.keyboard.press('Enter');await page.waitForURL('**/kontak/telepon/');
 await page.locator('.phone-number').first().waitFor();
 assert.equal(await page.locator('.phone-team').count(),3);
 const phoneLinks=await page.locator('.phone-whatsapp').evaluateAll(links=>links.map(link=>new URL(link.href).pathname));
 assert.deepEqual(phoneLinks,['/6281393453375','/6285608561745','/6287722440148']);
 assert.equal(await page.locator('.phone-team-scope li').count(),data.services.length);
 assert.match(await page.locator('.phone-team').first().innerText(),/general inquiry/i);
 assert.match(await page.locator('.phone-team').nth(1).innerText(),/RORO/);
 assert.match(await page.locator('.phone-team').nth(1).innerText(),/Project Cargo/);
 assert.equal(await page.locator('.phone-breadcrumb [aria-current="page"]').getAttribute('href'),'/kontak/telepon/');
 await page.goBack();await page.waitForURL('**/layanan/freight-udara/');
 const summary=page.locator('.service-disclosures summary').last();await summary.focus();await page.keyboard.press('Enter');assert.equal(await summary.evaluate(el=>el.parentElement.open),true);await page.keyboard.press('Enter');assert.equal(await summary.evaluate(el=>el.parentElement.open),false);
 await page.locator('.service-primary').click();assert.match(page.url(),/#quote-form$/);
 for(const href of await page.locator('footer a[href^="/"]').evaluateAll(links=>links.map(link=>link.getAttribute('href')))){assert.equal((await fetch(base+href.split('#')[0])).status,200,'footer '+href);}
 await page.locator('.footer-track-link').focus();await page.keyboard.press('Enter');await page.waitForTimeout(500);assert.match(page.url(),/\/tracking\/$/);
 await page.goto(base+'/operator/');await page.getByLabel('Username',{exact:true}).fill('cms-local-test');await page.getByLabel('Kata sandi',{exact:true}).fill(password);await page.getByRole('button',{name:'Masuk ke ruang kerja',exact:true}).click();
 await page.getByRole('navigation',{name:'Modul operator'}).getByRole('button',{name:'Brand & Kontak',exact:true}).click();
 await page.getByLabel('Nama kelompok',{exact:true}).first().fill('CMS browser contact');await page.getByRole('button',{name:'Simpan ke server',exact:true}).click();
 await page.waitForTimeout(600);assert.match(await(await fetch(base+'/kontak/')).text(),/CMS browser contact/);
 await page.goto(base+'/kontak/?service=air');await page.waitForTimeout(800);
 assert.ok(await page.locator('a[href*="aksa@gaeks.com"]').count());
 await page.evaluate(()=>{window.open=(url)=>{window.__quoteTarget=String(url);return null;};});
 for(const [name,value] of Object.entries({name:'Test lokal',company:'Test company',phone:'08123456789',email:'test@example.com',origin:'Jakarta',destination:'Semarang',commodity:'General cargo'}))await page.locator('[name="'+name+'"]').fill(value);
 await page.locator('input[type=checkbox][required]').check();
 for(const [service,phone] of [['fcl','6285608561745'],['air','6287722440148'],['ppjk','6285608561745'],['undername','6285608561745'],['project-cargo','6285608561745'],['roro-breakbulk','6285608561745'],['general','6281393453375']]){
   await page.locator('#quote-form select').first().selectOption(service);await page.locator('#quote-form button[type=submit]').click();
   assert.ok((await page.evaluate(()=>window.__quoteTarget)).startsWith('https://wa.me/'+phone+'?text='));
 }
 await page.setViewportSize({width:1440,height:1000});await page.reload();await page.waitForTimeout(700);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.goto(base+'/kontak/');assert.equal(await page.locator('.contact-directory a').getAttribute('href'),'/kontak/telepon/');
 await page.setViewportSize({width:375,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
 assert.deepEqual(errors,[]);
 console.log('PASS: auth/CSRF; CMS save to SSR/schema; draft/sitemap; operator save; 6 RFQ destinations; 24 route/viewport renders; main-content axe checks; disclosure keyboard; inquiry anchor; 3 footer emails; phone directory navigation/back, grouped numbers and service coverage; reduced motion. Screenshots: test-results/.');
}finally{await browser?.close();await writeFile(contentPath,original);if(users)await writeFile(usersPath,users);else await unlink(usersPath);}
