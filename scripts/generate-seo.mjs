import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const siConfig = JSON.parse(await readFile('public/api/search_intelligence.json', 'utf8'));
const baseUrl = (siConfig.baseUrl || 'https://gaeks.com').replace(/\/$/, '');
const content = JSON.parse(await readFile('public/api/site_content.json', 'utf8'));
const contactGroups = JSON.parse(await readFile('public/api/contact_groups_seed.json', 'utf8'));
const serviceEditorial = JSON.parse(await readFile('public/api/service_editorial_seed.json', 'utf8'));
const knowledge = JSON.parse(await readFile('src/data/serviceKnowledge.json', 'utf8'));
const editorialById = new Map(serviceEditorial.map((item) => [item.id, item]));
const serviceContact = (serviceId) =>
  contactGroups.find((g) => g.serviceIds.includes(serviceId)) ||
  contactGroups.find((g) => g.id === 'general') ||
  contactGroups[0];

const normalizeCompare = (rows) =>
  Array.isArray(rows)
    ? rows.map((row) => (Array.isArray(row) ? row : [row.option || row[0] || '', row.fit || row[1] || '', row.prep || row[2] || '']))
    : [];

const normalizeFaq = (rows) =>
  Array.isArray(rows)
    ? rows.map((row) => (Array.isArray(row) ? row : [row.q || row.question || '', row.a || row.answer || ''])).filter(([q, a]) => q && a)
    : [];

const serviceInfo = (service, lang = 'id') => {
  const ed = editorialById.get(service.id) || service;
  const k = knowledge[service.id] || {};
  const summary =
    lang === 'en'
      ? ed.heroSummary_en || ed.summary_en || service.summary_en || ed.summary || k.summary || service.description
      : ed.heroSummary || service.summary || ed.summary || k.summary || service.description;
  const compare = normalizeCompare(service.compare?.length ? service.compare : ed.compareRows?.length ? ed.compareRows : k.compare || []);
  const faq = normalizeFaq(service.faq?.length ? service.faq : ed.faqs?.length ? ed.faqs : k.faq || []);
  return { summary, compare, faq };
};

const staging = process.env.GAEKS_STAGING === '1';
let template = await readFile('dist/index.html', 'utf8');
template = template.replace(/\s*<meta name="keywords"[^>]*\/?>/gi, '');
if (staging) {
  template = template.replace(/<meta name="robots"[^>]*\/?>/, '<meta name="robots" content="noindex, nofollow" />');
  await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
}
await writeFile('dist/index.html', template);

const slugs = siConfig.serviceSlugs || {};
const routes = [];

for (const [routePath, meta] of Object.entries(siConfig.routes || {})) {
  const idCopy = meta.id || {};
  const enAvailable = Boolean(meta.enAvailable && meta.en);
  const enPath = routePath === '/' ? '/en/' : `/en${routePath}`;
  routes.push({
    path: routePath,
    lang: 'id',
    schemaType: meta.schemaType || 'WebPage',
    canonical: `${baseUrl}${routePath}`,
    alternates: enAvailable
      ? [
          { hreflang: 'id-ID', href: `${baseUrl}${routePath}` },
          { hreflang: 'en', href: `${baseUrl}${enPath}` },
          { hreflang: 'x-default', href: `${baseUrl}${routePath}` },
        ]
      : [
          { hreflang: 'id-ID', href: `${baseUrl}${routePath}` },
          { hreflang: 'x-default', href: `${baseUrl}${routePath}` },
        ],
    title: idCopy.title || 'GAEKS Freight',
    description: idCopy.description || '',
    heading: idCopy.heading || idCopy.title || 'GAEKS Freight',
    body: idCopy.body || idCopy.description || '',
  });
  if (enAvailable) {
    const enCopy = meta.en;
    routes.push({
      path: enPath,
      lang: 'en',
      schemaType: meta.schemaType || 'WebPage',
      canonical: `${baseUrl}${enPath}`,
      alternates: [
        { hreflang: 'id-ID', href: `${baseUrl}${routePath}` },
        { hreflang: 'en', href: `${baseUrl}${enPath}` },
        { hreflang: 'x-default', href: `${baseUrl}${routePath}` },
      ],
      title: enCopy.title || idCopy.title,
      description: enCopy.description || idCopy.description,
      heading: enCopy.heading || idCopy.heading,
      body: enCopy.body || idCopy.body,
    });
  }
}

const publishedServices = (content.services || []).filter((s) => (s.status || 'published') === 'published');
for (const service of publishedServices) {
  const ed = editorialById.get(service.id) || service;
  const slug = slugs[service.id] || service.id;
  const idPath = `/layanan/${slug}/`;
  const enPath = `/en/layanan/${slug}/`;
  const alternates = [
    { hreflang: 'id-ID', href: `${baseUrl}${idPath}` },
    { hreflang: 'en', href: `${baseUrl}${enPath}` },
    { hreflang: 'x-default', href: `${baseUrl}${idPath}` },
  ];
  const infoId = serviceInfo(service, 'id');
  routes.push({
    path: idPath,
    lang: 'id',
    schemaType: 'WebPage',
    canonical: `${baseUrl}${idPath}`,
    alternates,
    title: ed.seoTitle || service.seoTitle || `${service.landingTitle || service.title} | GAEKS Freight`,
    description: ed.metaDescription || service.metaDescription || service.landingDescription || infoId.summary,
    heading: service.landingTitle || ed.landingTitle || service.title,
    body: service.landingDescription || ed.landingDescription || infoId.summary,
    service,
    ed,
    info: infoId,
  });
  const infoEn = serviceInfo(service, 'en');
  routes.push({
    path: enPath,
    lang: 'en',
    schemaType: 'WebPage',
    canonical: `${baseUrl}${enPath}`,
    alternates,
    title: ed.seoTitle_en || `${ed.landingTitle_en || service.title} | GAEKS Freight Indonesia`,
    description: ed.metaDescription_en || infoEn.summary,
    heading: ed.landingTitle_en || `${service.title} Indonesia`,
    body: ed.landingDescription_en || infoEn.summary,
    service,
    ed,
    info: infoEn,
  });
}

const adPresentations = {
  fcl: ['PENGIRIMAN PETI KEMAS PENUH', 'Satu brief untuk membahas kebutuhan kontainer, rute, dan titik serah.', 'fcl'],
  'air-shipment': ['PENGIRIMAN KARGO UDARA', 'Data berat dan dimensi yang jelas membantu peninjauan kargo udara.', 'air'],
  ppjk: ['PENGURUSAN KEPABEANAN', 'Mulai dari komoditas dan dokumen, lalu tentukan proses pabean yang relevan.', 'ppjk'],
  'undername-impor': ['IMPORTASI DAN PERIZINAN', 'Jelaskan barang dan pihak importir sebelum menentukan langkah perizinan.', 'undername'],
};

const orgData = siConfig.organization || {};
const orgId = orgData['@id'] || `${baseUrl}/#organization`;
const generalGroup = serviceContact('general');
const tradeGroup = serviceContact('ppjk');
const airGroup = serviceContact('air-shipment');
const areaServedLocations = (orgData.areaServed || []).map((loc) => ({ '@type': loc.type || 'Place', name: loc.name }));

const organization = {
  '@type': 'Organization',
  '@id': orgId,
  name: orgData.name || 'GAEKS Freight',
  legalName: orgData.legalName || 'PT Global Andalan Ekspress',
  alternateName: orgData.alternateName || 'GAEKS',
  slogan: orgData.slogan || 'Powered by People. Driven by Technology. Focused on You.',
  url: `${baseUrl}/`,
  logo: orgData.logo || `${baseUrl}/logos/gaek-symbol.png`,
  email: generalGroup.email,
  telephone: generalGroup.whatsappDisplay,
  sameAs: ['https://www.instagram.com/gaeksfreight/'],
  knowsAbout: orgData.knowsAbout || [
    'Freight Forwarding Internasional',
    'FCL Ocean Freight Export dan Import',
    'Air Freight Export dan Import',
    'LCL Consolidation Ocean Freight',
    'Jasa PPJK dan Customs Clearance Indonesia',
    'Undername Impor dan Persetujuan Impor (PI)',
    'Penyediaan Kapal RORO dan Breakbulk',
    'Project Cargo dan Heavy Lift',
    'Trucking Domestik',
    'Pergudangan dan Bongkar Muat',
  ],
  contactPoint: [
    { '@type': 'ContactPoint', contactType: 'Customs Clearance, FCL & Undername', telephone: tradeGroup.whatsappDisplay, email: tradeGroup.email, areaServed: 'ID', availableLanguage: ['Indonesian', 'English'] },
    { '@type': 'ContactPoint', contactType: 'Air Freight Desk', telephone: airGroup.whatsappDisplay, email: airGroup.email, areaServed: 'ID', availableLanguage: ['Indonesian', 'English'] },
    { '@type': 'ContactPoint', contactType: 'Project Cargo, Domestic & General CS', telephone: generalGroup.whatsappDisplay, email: generalGroup.email, areaServed: 'ID', availableLanguage: ['Indonesian', 'English'] },
  ],
};

const localBusiness = {
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${baseUrl}/#local-business`,
  name: `${orgData.name || 'GAEKS Freight'} - ${orgData.legalName || 'PT Global Andalan Ekspress'}`,
  url: `${baseUrl}/`,
  parentOrganization: { '@id': orgId },
  address: {
    '@type': 'PostalAddress',
    addressLocality: orgData.address?.addressLocality || 'Tanjung Priok',
    addressRegion: orgData.address?.addressRegion || 'DKI Jakarta',
    addressCountry: orgData.address?.addressCountry || 'ID',
  },
  areaServed: areaServedLocations,
  serviceType: [
    'Freight Forwarding',
    'FCL Ocean Freight',
    'Air Freight',
    'PPJK Customs Clearance',
    'LCL Consolidation',
    'Undername Impor & PI',
    'RORO & Breakbulk Vessel Sourcing',
    'Project Cargo & Heavy Lift',
  ],
};

const websiteNode = {
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  url: `${baseUrl}/`,
  name: 'GAEKS Freight',
  inLanguage: ['id-ID', 'en'],
  publisher: { '@id': orgId },
};

const escapeHtml = (s) => String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const jsonScript = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], index) => ({ '@type': 'ListItem', position: index + 1, name, item })),
});

const homeAeoFaqId = [
  ['Layanan apa saja yang ditangani GAEKS Freight?', 'PT Global Andalan Ekspress (GAEKS Freight) berfokus pada pengiriman laut FCL ekspor/impor dan kargo udara (Air Freight), didukung jasa kepabeanan PPJK & customs clearance (PIB/PEB), konsolidasi LCL, undername impor dan Persetujuan Impor (PI), penyediaan kapal RORO dan breakbulk, project cargo, trucking domestik, serta pergudangan.'],
  ['Apa perbedaan pengiriman FCL dan LCL di GAEKS?', 'FCL (Full Container Load) menggunakan satu kontainer penuh 20ft/40ft/40ft HC secara eksklusif untuk satu pengirim, sedangkan LCL (Less than Container Load) menggabungkan muatan bervolume lebih kecil dalam satu kontainer konsolidasi dengan perhitungan CBM.'],
  ['Dokumen apa saja yang diperlukan untuk jasa PPJK dan customs clearance?', 'Dokumen awal meliputi Commercial Invoice, Packing List, dokumen pengangkutan (Bill of Lading atau Air Waybill), uraian barang/HS Code, serta izin khusus komoditas seperti Persetujuan Impor (PI) atau Lartas bila dipersyaratkan.'],
  ['Bagaimana cara menghitung CBM kontainer atau berat volumetrik air freight?', 'Anda dapat menggunakan Kalkulator Kargo GAEKS di gaeks.com/kalkulator/ untuk menghitung CBM laut dan berat volumetrik udara (P x L x T / 6.000) terlebih dahulu sebelum meminta penawaran.'],
];

const homeAeoFaqEn = [
  ['What services does GAEKS Freight handle?', 'PT Global Andalan Ekspress (GAEKS Freight) specializes in FCL ocean freight export/import and air freight, supported by PPJK customs brokerage (PIB/PEB), LCL consolidation, undername import & Import Approval (PI), RORO and breakbulk vessel sourcing, project cargo, domestic trucking, and warehousing across Indonesia.'],
  ['What is the difference between FCL and LCL ocean freight at GAEKS?', 'FCL allocates a dedicated 20ft, 40ft, or 40ft HC container to one shipper, while LCL consolidates smaller cargo billed by CBM or weight ton.'],
  ['What documents are required for Indonesia customs clearance?', 'Typical initial documents include Commercial Invoice, Packing List, Bill of Lading or Air Waybill, accurate HS codes, and commodity import permits such as Persetujuan Impor (PI) or Lartas approvals when regulated.'],
  ['Can GAEKS Freight arrange RORO, breakbulk vessels, and project cargo?', 'Yes. GAEKS assists with RORO vessel sourcing for rolling vehicles and wheeled equipment, breakbulk shipping for steel or oversized cargo, and project logistics execution.'],
];

const routeFaq = [
  ['Apakah waktu tempuh di halaman ini sudah pasti?', 'Belum. Waktu tempuh adalah rujukan dan perlu dikonfirmasi bersama jadwal, transit, dan ketersediaan ruang saat pemesanan.'],
  ['Data apa yang diperlukan untuk meminta rute?', 'Siapkan titik asal dan tujuan, komoditas, berat, volume, kesiapan barang, serta target waktu tiba.'],
  ['Kapan memilih laut atau udara?', 'Bandingkan volume, nilai barang, target waktu, penanganan, serta biaya total sampai titik penerima.'],
];
const faqSchema = (faq) => ({ '@type': 'FAQPage', mainEntity: faq.map(([name, answer]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text: answer } })) });
const serviceById = new Map(publishedServices.map((s) => [s.id, s]));

for (const route of routes) {
  const isEn = route.lang === 'en';
  const url = route.canonical;
  const graph = [
    organization,
    localBusiness,
    websiteNode,
    {
      '@type': route.schemaType || 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: isEn ? 'en' : 'id-ID',
      isPartOf: { '@id': `${baseUrl}/#website` },
    },
  ];
  if (route.path === '/' || route.path === '/en/') {
    graph.push({
      '@type': 'OfferCatalog',
      name: isEn ? 'GAEKS Freight Services Catalog' : 'Katalog Layanan Freight Forwarding & Kepabeanan GAEKS Freight',
      itemListElement: publishedServices.map((s, idx) => ({
        '@type': 'Offer',
        position: idx + 1,
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          serviceType: s.category,
          url: `${baseUrl}${isEn ? '/en' : ''}/layanan/${slugs[s.id] || s.id}/`,
        },
      })),
    });
    graph.push(faqSchema(isEn ? homeAeoFaqEn : homeAeoFaqId));
  } else if (route.service) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: route.service.title,
      serviceType: route.service.category,
      description: route.info.summary,
      provider: { '@id': orgId },
      areaServed: areaServedLocations,
      inLanguage: isEn ? 'en' : 'id-ID',
      url,
    });
    graph.push(
      breadcrumb([
        [isEn ? 'Home' : 'Beranda', `${baseUrl}${isEn ? '/en/' : '/'}`],
        [isEn ? 'Services' : 'Layanan', `${baseUrl}${isEn ? '/en/layanan/' : '/layanan/'}`],
        [route.service.title, url],
      ])
    );
    if (route.info.faq.length) graph.push(faqSchema(route.info.faq));
  } else {
    graph.push(
      breadcrumb([
        [isEn ? 'Home' : 'Beranda', `${baseUrl}${isEn ? '/en/' : '/'}`],
        [route.heading, url],
      ])
    );
  }
  if (route.path === '/rute-pengiriman/') graph.push(faqSchema(routeFaq));

  const robotsVal = staging ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const altTags = (route.alternates || []).map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n    ');
  const head = `<meta name="description" content="${escapeHtml(route.description)}" />\n    <meta name="robots" content="${robotsVal}" />\n    <link rel="canonical" href="${url}" />\n    ${altTags}\n    <meta property="og:type" content="website" />\n    <meta property="og:locale" content="${isEn ? 'en_US' : 'id_ID'}" />\n    <meta property="og:site_name" content="GAEKS Freight" />\n    <meta property="og:url" content="${url}" />\n    <meta property="og:title" content="${escapeHtml(route.title)}" />\n    <meta property="og:description" content="${escapeHtml(route.description)}" />\n    <meta property="og:image" content="${baseUrl}/logos/gaek-symbol.png" />\n    ${jsonScript({ '@context': 'https://schema.org', '@graph': graph })}`;

  let html = template
    .replace(/<html\s+lang="[^"]*"/, `<html lang="${isEn ? 'en' : 'id'}"`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/\s*<meta name="(?:description|robots|keywords)"[^>]*\/?>/gi, '')
    .replace(/\s*<link rel="(?:canonical|alternate)"[^>]*\/?>/gi, '')
    .replace(/\s*<meta property="og:(?:type|url|title|description|image|locale|site_name)"[^>]*\/?>/gi, '')
    .replace('</head>', `${head}\n  </head>`);

  if (route.path !== '/' && route.path !== '/en/') {
    html = html.replace(/\s*<link rel="preload" as="image"[^>]*\/?>/g, '');
  }

  const serviceLinks =
    route.path === '/' || route.path === '/en/' || route.path === '/layanan/' || route.path === '/en/layanan/'
      ? `<nav aria-label="Layanan freight">${publishedServices.map((item) => `<a href="${baseUrl}${isEn ? '/en' : ''}/layanan/${slugs[item.id] || item.id}/">${escapeHtml(item.title)}</a>`).join(' · ')}</nav>`
      : '';
  const relSpec = route.service ? siConfig.serviceRelations?.[route.service.id] : null;
  const relHtml =
    relSpec && Array.isArray(relSpec.relatedServices)
      ? `<section><h2>${isEn ? 'Related Services' : 'Layanan Terkait'}</h2><ul>${relSpec.relatedServices
          .filter((rid) => serviceById.has(rid))
          .map((rid) => `<li><a href="${isEn ? '/en' : ''}/layanan/${slugs[rid] || rid}/">${escapeHtml(serviceById.get(rid).title)}</a></li>`)
          .join('')}</ul><p><a href="/kalkulator/">Kalkulator CBM</a> · <a href="/rute-pengiriman/">Rute Pengiriman</a> · <a href="/tracking/">Pelacakan</a></p></section>`
      : '';
  const table = route.info?.compare.length
    ? `<section><h2>${isEn ? 'Option Comparison' : 'Perbandingan pilihan'}</h2><table><thead><tr><th>${isEn ? 'Option' : 'Pilihan'}</th><th>${isEn ? 'Best fit' : 'Paling sesuai untuk'}</th><th>${isEn ? 'Initial data' : 'Data awal'}</th></tr></thead><tbody>${route.info.compare.map(([name, use, data]) => `<tr><th>${escapeHtml(name)}</th><td>${escapeHtml(use)}</td><td>${escapeHtml(data)}</td></tr>`).join('')}</tbody></table></section>`
    : '';
  const faq = route.info?.faq || (route.path === '/rute-pengiriman/' ? routeFaq : []);
  const faqHtml = faq.length
    ? `<section><h2>${isEn ? 'Technical Questions' : 'Pertanyaan teknis'}</h2>${faq.map(([q, a]) => `<article><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></article>`).join('')}</section>`
    : '';

  const ed = route.ed;
  const grp = route.service ? serviceContact(route.service.id) : null;
  const svcName = ed?.ctaServiceName || route.service?.title || '';
  const waMsg = (ed?.whatsappTemplate || grp?.whatsappTemplate || 'Halo tim GAEKS, saya ingin konsultasi {service}.')
    .replace(/\{service\}/gi, svcName)
    .replace(/\s*\{(?:arah|direction)\}/gi, '')
    .replace(/\s+di\s+\{(?:kota|city)\}/gi, '')
    .replace(/\s*\{(?:kota|city)\}/gi, '')
    .trim();
  const waLabel = (ed?.whatsappCtaLabel || grp?.ctaText || `Chat Tim ${svcName}`).replace(/\{service\}/gi, svcName);
  const waUrl = grp ? `https://wa.me/${grp.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(waMsg)}` : '/kontak/';
  const mailUrl = grp ? `mailto:${grp.email}?subject=${encodeURIComponent(`Konsultasi ${svcName}`)}&body=${encodeURIComponent(waMsg)}` : '/kontak/';
  const ad = route.service && !isEn && adPresentations[route.service.id];
  const heroImage = route.service?.imageUrl || route.service?.image || '/uploads/gaeks-hero-cargo-poster.webp';
  const srStyle = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';

  const initial = ad
    ? `<main class="min-h-screen bg-[#f3f4ef] pt-16 text-[#12363a]"><section class="relative isolate overflow-hidden bg-[#062b30] text-white"><div class="absolute inset-0 -z-10 overflow-hidden"><img src="${escapeHtml(heroImage)}" alt="" class="h-full w-full object-cover opacity-30"><div class="absolute inset-0 bg-gradient-to-r from-[#062b30] via-[#062b30]/90 to-[#062b30]/55"></div></div><div class="page-shell relative py-9 pb-16 sm:py-14 lg:py-20"><a href="/layanan/" class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-200">Semua layanan</a><div class="mt-8 max-w-4xl"><p class="inline-flex border-l-2 border-cyan-300 pl-3 text-xs font-bold uppercase tracking-[.24em] text-cyan-200">${escapeHtml(ad[0])}</p><h1 class="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-[-.055em] sm:text-6xl lg:text-7xl">${escapeHtml(route.heading)}</h1><p class="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">${escapeHtml(route.info?.summary || route.body)}</p><div class="mt-8"><a href="#service-quote-section" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-6 text-sm font-bold text-[#062b30]">Ajukan Penawaran</a></div></div></div></section>${table}${faqHtml}${relHtml}<section id="service-quote-section" class="page-shell py-8"><p><a href="${escapeHtml(waUrl)}">${escapeHtml(waLabel)}</a> · <a href="${escapeHtml(mailUrl)}">Kirim Email (${escapeHtml(grp?.email || '')})</a></p></section></main>`
    : route.service
      ? `<div class="min-h-screen bg-[#f4f5f1] pt-16 text-[#12363a]"><section class="page-shell py-10 sm:py-14"><a href="${isEn ? '/en/layanan/' : '/layanan/'}" class="button-link">${isEn ? 'All services' : 'Semua layanan'}</a><div class="mt-7 grid min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden border border-slate-200 bg-white lg:grid-cols-2"><div class="min-w-0 p-6 sm:p-10 lg:p-12"><p class="section-label">${escapeHtml(route.service.category)}</p><h1 class="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">${escapeHtml(route.heading)}</h1><p class="mt-5 text-lg font-semibold text-cyan-800">${escapeHtml(route.service.tagline)}</p><p class="mt-5 text-base leading-7 text-slate-600">${escapeHtml(route.info?.summary || route.body)}</p><div class="mt-8"><a class="button-primary" href="#service-quote-section">${isEn ? 'Request Service Quote' : 'Ajukan Penawaran'}</a></div></div><img src="${escapeHtml(heroImage)}" alt="${escapeHtml(route.service.imageAlt || route.service.title)}" width="960" height="640" class="min-h-[280px] h-full w-full object-cover"></div>${table}${faqHtml}${relHtml}<section id="service-quote-section" class="py-8"><a class="button-primary" href="${escapeHtml(waUrl)}">${escapeHtml(waLabel)}</a> <a class="button-secondary" href="${escapeHtml(mailUrl)}">${isEn ? 'Send Email' : 'Kirim Email'} (${escapeHtml(grp?.email || '')})</a></section></section></div>`
      : route.path === '/' || route.path === '/en/'
        ? `<main style="min-height:100vh;background:#062d32;color:#fff;font-family:Inter,ui-sans-serif,system-ui,sans-serif"><section style="min-height:664px;display:flex;align-items:center;padding:6.5rem 1.5rem 4rem"><div style="max-width:72rem;width:100%;margin:0 auto"><h1 style="font-size:clamp(2rem,4.5vw,3.75rem);line-height:1.04;letter-spacing:-.04em;margin:0 0 1.25rem;max-width:18ch">${escapeHtml(route.heading)}</h1><p style="font-size:1.05rem;line-height:1.65;max-width:52ch;color:#dbeaea;margin:0">${escapeHtml(route.body)}</p></div></section><div style="${srStyle}">${serviceLinks}${table}${faqHtml}<p><a href="${isEn ? '/en/kontak/' : '/kontak/'}">${isEn ? 'Contact our team' : 'Kontak tim'}</a></p></div></main>`
        : `<main style="min-height:100vh;background:#f4f5f1;color:#12363a;font-family:Inter,ui-sans-serif,system-ui,sans-serif"><section style="max-width:72rem;margin:0 auto;padding:7.5rem 1.5rem 3rem"><h1 style="font-size:clamp(2rem,4vw,3.25rem);line-height:1.08;letter-spacing:-.035em;margin:0 0 1rem;max-width:22ch">${escapeHtml(route.heading)}</h1><p style="font-size:1.05rem;line-height:1.65;max-width:56ch;color:#4b6265;margin:0">${escapeHtml(route.body)}</p></section><div style="${srStyle}">${serviceLinks}${table}${faqHtml}<p><a href="${isEn ? '/en/kontak/' : '/kontak/'}">${isEn ? 'Contact our team' : 'Kontak tim'}</a></p></div></main>`;

  html = html.replace('<div id="root"></div>', `<div id="root">${initial}</div>`);
  const dir = join('dist', route.path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html);
}

// Pre-render /operator/ with strict noindex, nofollow, noarchive
{
  const operatorHtml = template
    .replace(/<title>[^<]*<\/title>/, '<title>Operator CMS | GAEKS Freight</title>')
    .replace(/\s*<meta name="(?:description|robots|keywords)"[^>]*\/?>/gi, '')
    .replace('</head>', '<meta name="robots" content="noindex, nofollow, noarchive" />\n  </head>');
  await mkdir(join('dist', 'operator'), { recursive: true });
  await writeFile(join('dist', 'operator', 'index.html'), operatorHtml);
}

const sourceDate = new Date(Math.max((await stat('public/api/site_content.json')).mtimeMs, (await stat('public/api/search_intelligence.json')).mtimeMs)).toISOString().slice(0, 10);
const articleSlug = (article) =>
  article.slug && !article.slug.startsWith('analisis-komprehensif-logistik-maritim-')
    ? article.slug
    : `${article.title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 96)}-${article.id.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`;
const publishedArticles = (content.articles || []).filter((article) => article.status !== 'draft' && article.publishedDate <= sourceDate);
const sitemapUrls = routes
  .map((route) => [`${baseUrl}${route.path}`, sourceDate])
  .concat(publishedArticles.map((article) => [`${baseUrl}/berita/${articleSlug(article)}/`, (article.updatedAt || article.publishedDate).slice(0, 10)]));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(([url, date]) => `  <url><loc>${escapeHtml(url)}</loc><lastmod>${date}</lastmod></url>`).join('\n')}\n</urlset>\n`;
await writeFile('public/sitemap.xml', sitemap);
await writeFile('dist/sitemap.xml', sitemap);

const serviceLines = publishedServices.map((item) => `- [${item.title}](${baseUrl}/layanan/${slugs[item.id] || item.id}/): ${serviceInfo(item, 'id').summary}`);
const serviceLinesEn = publishedServices.map((item) => `- [${item.title}](${baseUrl}/en/layanan/${slugs[item.id] || item.id}/): ${serviceInfo(item, 'en').summary}`);

const llms = `# GAEKS Freight (PT Global Andalan Ekspress)

> Tagline Resmi: "Diperkuat oleh Manusia. Digerakkan oleh Teknologi. Berfokus pada Anda." ("Powered by People. Driven by Technology. Focused on You.")

GAEKS Freight (PT Global Andalan Ekspress) adalah perusahaan freight forwarding internasional dan jasa kepabeanan (PPJK) di Indonesia dengan fokus keunggulan pada FCL Export/Import dan Air Freight Export/Import, didukung LCL, Customs Clearance/PPJK (PIB/PEB), Undername Impor & Persetujuan Impor (PI, termasuk PI besi dan baja), penyediaan/sewa kapal RORO dan Breakbulk, Project Cargo & Heavy Lift, Domestic Trucking, serta Pergudangan & Bongkar Muat di Jakarta (Tanjung Priok), Semarang, dan Surabaya. Jadwal, kapasitas ruang, tarif, dan persyaratan izin dikonfirmasi untuk setiap pengiriman.

## Halaman Utama & Alat Bantu Pengiriman

- [Beranda](${baseUrl}/)
- [English Overview](${baseUrl}/en/)
- [Layanan Freight Forwarding, PPJK, Undername/PI & Kapal](${baseUrl}/layanan/)
- [Services Index (English)](${baseUrl}/en/layanan/)
- [Tentang Kami: Visi, Misi & Keunggulan Digital](${baseUrl}/tentang-kami/)
- [About GAEKS Freight (English)](${baseUrl}/en/tentang-kami/)
- [Pelacakan Pengiriman HAWB, B/L & Kontainer](${baseUrl}/tracking/)
- [Kalkulator Kargo CBM & Berat Volumetrik](${baseUrl}/kalkulator/)
- [Rute dan Jadwal Pengiriman](${baseUrl}/rute-pengiriman/)
- [Tarif Pengiriman](${baseUrl}/tarif-pengiriman/)
- [Maskapai dan Perusahaan Pelayaran](${baseUrl}/maskapai-dan-pelayaran/)
- [Wawasan dan Berita Logistik](${baseUrl}/berita/)
- [Karier di GAEKS](${baseUrl}/karier/)
- [Hubungi Kami & Permintaan Penawaran](${baseUrl}/kontak/)
- [Direktori Telepon & WhatsApp Spesialis](${baseUrl}/kontak/telepon/)

## Panduan Layanan (Bahasa Indonesia)

${serviceLines.join('\n')}

## Services Overview (English)

${serviceLinesEn.join('\n')}
`;

const full = `${llms}\n## Pertanyaan Umum (AEO Reference)\n\n${homeAeoFaqId.map(([q, a]) => `- **${q}**: ${a}`).join('\n')}\n\n## Frequently Asked Questions (English)\n\n${homeAeoFaqEn.map(([q, a]) => `- **${q}**: ${a}`).join('\n')}\n\n## Data untuk Penawaran\n\nSiapkan rute asal dan tujuan, moda (FCL, Air Freight, LCL, RORO, Breakbulk, Project Cargo, atau Trucking), Incoterms, jenis komoditas dan HS Code, berat kotor, volume CBM/dimensi kemasan, target waktu kirim, serta Invoice dan Packing List bila tersedia.\n\n## FAQ Spesifik Layanan\n\n${publishedServices.map((item) => `### ${item.title}\n${serviceInfo(item, 'id').faq.map(([q, a]) => `- ${q} ${a}`).join('\n')}`).join('\n\n')}\n\n## Kontak Spesialis\n\n- Kepabeanan (PPJK), FCL & Undername: ${tradeGroup.whatsappDisplay} / ${tradeGroup.email}\n- Kargo Udara (Air Freight): ${airGroup.whatsappDisplay} / ${airGroup.email}\n- RORO, Breakbulk, Project Cargo, Domestik & CS Umum: ${generalGroup.whatsappDisplay} / ${generalGroup.email}\n`;

for (const [name, text] of [['llms.txt', llms], ['llms-full.txt', full]]) {
  await writeFile(join('public', name), text);
  await writeFile(join('dist', name), text);
}

console.log(`Generated ${routes.length} public HTML pages (+ /operator/ noindex), sitemap.xml (${sitemapUrls.length} URLs), llms.txt, and llms-full.txt`);
