import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const baseUrl = 'https://gaeks.com';
const content = JSON.parse(await readFile('public/api/site_content.json', 'utf8'));
const contactGroups = JSON.parse(await readFile('public/api/contact_groups_seed.json', 'utf8'));
const serviceEditorial = JSON.parse(await readFile('public/api/service_editorial_seed.json', 'utf8'));
const knowledge = JSON.parse(await readFile('src/data/serviceKnowledge.json', 'utf8'));
const editorialById = new Map(serviceEditorial.map((item) => [item.id, item]));
const serviceContact = (serviceId) => contactGroups.find((g) => g.serviceIds.includes(serviceId)) || contactGroups.find((g) => g.id === 'general') || contactGroups[0];
const serviceInfo = (service) => ({
  summary: service.summary || knowledge[service.id]?.summary || service.description,
  compare: service.compare?.length ? service.compare : knowledge[service.id]?.compare || [],
  faq: service.faq?.length ? service.faq : knowledge[service.id]?.faq || [],
});
const staging = process.env.GAEKS_STAGING === '1';
let template = await readFile('dist/index.html', 'utf8');
if (staging) {
  template = template.replace(/<meta name="robots"[^>]*\/>/, '<meta name="robots" content="noindex, nofollow" />');
  await writeFile('dist/index.html', template);
  await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
}
const routes = [
  {
    path: '/',
    title: 'GAEKS Freight | Jasa Freight Forwarding, FCL, LCL, PPJK & Air Freight Indonesia',
    description: 'PT Global Andalan Ekspress (GAEKS Freight) menyediakan jasa pengiriman laut FCL dan LCL, jasa PPJK & customs clearance resmi, jasa pengiriman udara prioritas, undername impor/PI, trucking, dan project cargo di Indonesia.',
    heading: 'Diperkuat oleh Manusia. Digerakkan oleh Teknologi. Berfokus pada Anda.',
    body: 'Kami memadukan keahlian, teknologi, dan tindakan nyata untuk menghadirkan solusi logistik FCL, LCL, PPJK customs clearance, freight udara, dan kepabeanan yang lebih cepat, efisien, dan transparan.',
  },
  { path: '/layanan/', title: 'Jasa Freight Forwarding FCL, LCL, PPJK & Air Freight | GAEKS Freight', description: 'Bandingkan layanan pengiriman laut FCL & LCL, jasa PPJK & customs clearance, jasa pengiriman udara terbaik, undername impor/PI, pergudangan, trucking, dan project cargo.', heading: 'Layanan freight untuk setiap jenis kargo.', body: 'Pilih layanan pengiriman FCL, LCL, PPJK, air freight, atau trucking berdasarkan volume, sifat barang, kesiapan dokumen, dan tujuan pengiriman.' },
  { path: '/rute-pengiriman/', title: 'Rute dan Jadwal Pengiriman Laut & Udara | GAEKS Freight', description: 'Jelajahi koridor pelabuhan dan bandara utama untuk pengiriman FCL, LCL, dan kargo udara. Jadwal, kapasitas, dan waktu tempuh dikonfirmasi saat pemesanan.', heading: 'Rute dan jadwal pengiriman laut serta udara.', body: 'Rute dipilih dari asal, tujuan, jenis barang, target waktu, dan kebutuhan dokumen. Waktu tempuh yang tampil merupakan rujukan dan perlu dikonfirmasi untuk setiap pengiriman.' },
  { path: '/kalkulator/', title: 'Kalkulator Kargo CBM & Berat Volumetrik | GAEKS Freight', description: 'Hitung CBM, berat volumetrik air freight, dan perkiraan kebutuhan kontainer FCL atau LCL sebelum meminta penawaran.', heading: 'Rencanakan rute dan kapasitas kargo.', body: 'Masukkan detail dimensi dan berat barang untuk memulai perencanaan pengiriman FCL, LCL, atau udara.' },
  { path: '/tarif-pengiriman/', title: 'Tarif Pengiriman FCL, LCL & Kargo Udara | GAEKS Freight', description: 'Dapatkan informasi tarif pengiriman laut FCL, LCL, kargo udara, dan kepabeanan PPJK sesuai rute, komoditas, serta jadwal pengiriman Anda.', heading: 'Rencanakan pengiriman Anda dengan informasi tarif yang tepat.', body: 'Dapatkan informasi tarif yang disesuaikan dengan rute, jenis kargo, kebutuhan layanan, dan jadwal pengiriman Anda.' },
  { path: '/maskapai-dan-pelayaran/', title: 'Maskapai dan Perusahaan Pelayaran | GAEKS Freight', description: 'Pemilihan maskapai kargo udara dan perusahaan pelayaran FCL/LCL mempertimbangkan rute, kapasitas, jadwal, dan karakteristik komoditas.', heading: 'Pilihan angkutan untuk kebutuhan pengiriman Anda.', body: 'Pemilihan maskapai dan perusahaan pelayaran mempertimbangkan rute, kapasitas, jadwal, karakteristik kargo, serta kebutuhan pengiriman pelanggan.' },
  { path: '/tentang-kami/', title: 'Tentang Kami | GAEKS Freight · PT Global Andalan Ekspress', description: 'Mengenal PT Global Andalan Ekspress (GAEKS Freight): perusahaan freight forwarding dan logistik internasional di Indonesia dengan fondasi manusia, sistem ERP terintegrasi, dan keahlian kepabeanan.', heading: 'Lebih dari sekadar pengiriman. Kami memahami nilai di baliknya.', body: 'PT Global Andalan Ekspress — Diperkuat oleh Manusia. Digerakkan oleh Teknologi. Berfokus pada Anda.' },
  { path: '/karier/', title: 'Karier di GAEKS Freight | PT Global Andalan Ekspress', description: 'Bertumbuh bersama PT Global Andalan Ekspress (GAEKS Freight): budaya kerja yang menghargai kesejahteraan, pengembangan kompetensi logistik, dan kolaborasi.', heading: 'Bertumbuh bersama. Membangun masa depan logistik.', body: 'Kami percaya bahwa perusahaan yang kuat dibangun oleh manusia yang dihargai, didukung, dan diberi kesempatan untuk terus berkembang.' },
  { path: '/tracking/', title: 'Pelacakan Pengiriman HAWB, B/L & Kontainer | GAEKS Freight', description: 'Periksa status milestone pengiriman FCL, LCL, kargo udara, dan customs clearance GAEKS menggunakan nomor referensi HAWB, B/L, atau kontainer.', heading: 'Pelacakan Pengiriman', body: 'Gunakan nomor referensi pengiriman untuk melihat milestone terbaru yang tersedia.' },
  { path: '/berita/', title: 'Wawasan dan Berita Logistik & Kepabeanan | GAEKS Freight', description: 'Baca wawasan regulasi kepabeanan PPJK, jalur maritim, kargo udara, dan supply chain internasional dari tim GAEKS Freight.', heading: 'Wawasan dan berita logistik.', body: 'Informasi untuk membantu keputusan pengiriman.' },
  { path: '/kontak/', title: 'Hubungi Kami & Permintaan Penawaran Freight | GAEKS Freight', description: 'Hubungi tim spesialis FCL, LCL, PPJK customs clearance, kargo udara, dan project cargo GAEKS Freight via WhatsApp atau email.', heading: 'Diskusikan kebutuhan pengiriman Anda.', body: 'Sertakan asal, tujuan, jenis komoditas, volume, berat, dan target waktu agar tim dapat meninjau kebutuhan Anda.' },
  { path: '/terms-of-use/', title: 'Ketentuan Penggunaan Situs Web | GAEKS Freight', description: 'Ketentuan penggunaan resmi situs web PT Global Andalan Ekspress (GAEKS Freight), perusahaan freight forwarding dan logistik internasional.', heading: 'Ketentuan Penggunaan Website', body: 'Ketentuan Penggunaan Situs Web PT Global Andalan Ekspress (GAEKS). Tanggal Efektif: 1 Februari 2025. Versi Dokumen: 1.0.' },
  { path: '/privacy-terms/', title: 'Kebijakan Privasi | GAEKS Freight', description: 'Kebijakan pelindungan data pribadi PT Global Andalan Ekspress (GAEKS Freight) dalam operasional situs web dan layanan freight forwarding.', heading: 'Kebijakan Privasi', body: 'Kebijakan Pelindungan Data Pribadi PT Global Andalan Ekspress (GAEKS). Tanggal Efektif: 1 Februari 2025. Versi Dokumen: 1.0.' }
];
const slugs = {
  ppjk: 'ppjk-customs-clearance', 'gudang-pbm': 'pergudangan-stevedoring',
  'domestic-truck': 'trucking', 'project-cargo': 'project-cargo-heavy-lift',
  lcl: 'freight-laut-lcl', fcl: 'freight-laut-fcl', 'air-shipment': 'freight-udara', 'undername-impor': 'undername-impor-pi'
};
const adPresentations = {
  fcl: ['PENGIRIMAN PETI KEMAS PENUH', 'Satu brief untuk membahas kebutuhan kontainer, rute, dan titik serah.', 'fcl'],
  'air-shipment': ['PENGIRIMAN KARGO UDARA', 'Data berat dan dimensi yang jelas membantu peninjauan kargo udara.', 'air'],
  ppjk: ['PENGURUSAN KEPABEANAN', 'Mulai dari komoditas dan dokumen, lalu tentukan proses pabean yang relevan.', 'ppjk'],
  'undername-impor': ['IMPORTASI DAN PERIZINAN', 'Jelaskan barang dan pihak importir sebelum menentukan langkah perizinan.', 'undername']
};
const orgId = `${baseUrl}/#organization`;
const generalGroup = serviceContact('general');
const tradeGroup = serviceContact('ppjk');
const airGroup = serviceContact('air-shipment');
const areaServedLocations = [
  { '@type': 'Country', name: 'Indonesia' },
  { '@type': 'City', name: 'Jakarta' },
  { '@type': 'City', name: 'Semarang' },
  { '@type': 'City', name: 'Surabaya' },
];
const organization = {
  '@type': 'Organization',
  '@id': orgId,
  name: 'GAEKS Freight',
  legalName: 'PT Global Andalan Ekspress',
  url: baseUrl,
  logo: `${baseUrl}/logos/gaek-symbol.png`,
  email: generalGroup.email,
  telephone: generalGroup.whatsappDisplay,
  sameAs: ['https://www.instagram.com/gaeksfreight/'],
  knowsAbout: [
    'Freight Forwarding Internasional',
    'Pengiriman Laut FCL (Full Container Load)',
    'Pengiriman Laut LCL (Less than Container Load)',
    'Jasa PPJK dan Customs Clearance Indonesia',
    'Jasa Pengiriman Udara (Air Freight)',
    'Undername Impor dan Persetujuan Impor (PI)',
    'Project Cargo dan Heavy Lift',
    'Trucking Domestik dan Pergudangan',
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
  name: 'GAEKS Freight — PT Global Andalan Ekspress',
  url: baseUrl,
  parentOrganization: { '@id': orgId },
  address: { '@type': 'PostalAddress', addressLocality: 'Tanjung Priok', addressRegion: 'DKI Jakarta', addressCountry: 'ID' },
  areaServed: areaServedLocations,
  serviceType: ['Freight Forwarding', 'PPJK Customs Clearance', 'FCL Ocean Freight', 'LCL Consolidation', 'Air Freight', 'Undername Impor & PI'],
};
const escapeHtml = (s) => String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const jsonScript = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
const breadcrumb = (name, path) => ({ '@type': 'BreadcrumbList', itemListElement: [
  { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${baseUrl}/` },
  { '@type': 'ListItem', position: 2, name: 'Layanan', item: `${baseUrl}/layanan/` },
  { '@type': 'ListItem', position: 3, name, item: `${baseUrl}${path}` }
] });
const homeAeoFaq = [
  ['Layanan apa saja yang ditangani GAEKS Freight?', 'PT Global Andalan Ekspress (GAEKS Freight) melayani pengiriman laut FCL dan LCL, jasa kepabeanan PPJK dan customs clearance (PIB/PEB), pengiriman udara prioritas, perizinan impor dan undername/PI, transportasi darat, pergudangan, serta project cargo.'],
  ['Apa perbedaan pengiriman FCL dan LCL di GAEKS?', 'FCL (Full Container Load) menggunakan satu kontainer penuh secara eksklusif untuk satu pengiriman, cocok untuk volume besar atau muatan khusus. LCL (Less than Container Load) menggabungkan muatan dengan volume lebih kecil secara konsolidasi bersama pengirim lain.'],
  ['Dokumen apa saja yang diperlukan untuk jasa PPJK dan customs clearance?', 'Dokumen awal meliputi Commercial Invoice, Packing List, dokumen pengangkutan (Bill of Lading atau Air Waybill), uraian barang/HS Code, serta izin khusus komoditas seperti Persetujuan Impor (PI) atau Lartas bila dipersyaratkan.'],
  ['Bagaimana cara menghitung biaya dan kapasitas kargo udara atau laut?', 'Anda dapat menggunakan Kalkulator Kargo GAEKS di gaeks.com/kalkulator/ untuk menghitung CBM dan berat volumetrik terlebih dahulu, lalu mengirimkan spesifikasi asal, tujuan, dan komoditas ke tim kami untuk penawaran sesuai jadwal aktual.'],
];
const routeFaq = [
  ['Apakah waktu tempuh di halaman ini sudah pasti?', 'Belum. Waktu tempuh adalah rujukan dan perlu dikonfirmasi bersama jadwal, transit, dan ketersediaan ruang saat pemesanan.'],
  ['Data apa yang diperlukan untuk meminta rute?', 'Siapkan titik asal dan tujuan, komoditas, berat, volume, kesiapan barang, serta target waktu tiba.'],
  ['Kapan memilih laut atau udara?', 'Bandingkan volume, nilai barang, target waktu, penanganan, serta biaya total sampai titik penerima.']
];
const faqSchema = (faq) => ({ '@type': 'FAQPage', mainEntity: faq.map(([name, answer]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text: answer } })) });

for (const service of content.services) {
  const path = `/layanan/${slugs[service.id] || service.id}/`;
  const info = serviceInfo(service);
  routes.push({ path, title: `${service.landingTitle || service.title} | GAEKS Freight`, description: service.landingDescription || info.summary, heading: service.landingTitle || service.title, body: service.landingDescription || info.summary, service, info });
}

for (const route of routes) {
  const url = baseUrl + route.path;
  const graph = [organization, localBusiness, { '@type': 'WebPage', '@id': url, url, name: route.title, description: route.description, inLanguage: 'id-ID', isPartOf: { '@id': `${baseUrl}/#website` } }];
  if (route.path === '/') {
    graph.push({ '@type': 'WebSite', '@id': `${baseUrl}/#website`, url: baseUrl, name: 'GAEKS Freight', inLanguage: 'id-ID' });
    graph.push({
      '@type': 'OfferCatalog',
      name: 'Katalog Layanan Freight Forwarding & Kepabeanan GAEKS Freight',
      itemListElement: content.services.map((s, idx) => ({
        '@type': 'Offer',
        position: idx + 1,
        itemOffered: { '@type': 'Service', name: s.title, serviceType: s.category, url: `${baseUrl}/layanan/${slugs[s.id] || s.id}/` },
      })),
    });
    graph.push(faqSchema(homeAeoFaq));
  }
  if (route.service) {
    graph.push({ '@type': 'Service', name: route.service.title, serviceType: route.service.category, description: route.info.summary, provider: { '@id': orgId }, areaServed: areaServedLocations, url });
    graph.push(breadcrumb(route.service.title, route.path));
    if (route.info.faq.length) graph.push(faqSchema(route.info.faq));
  }
  if (route.path === '/rute-pengiriman/') graph.push(faqSchema(routeFaq));
  const head = `<meta name="description" content="${escapeHtml(route.description)}" />\n    <link rel="canonical" href="${url}" />\n    <link rel="alternate" hreflang="id-ID" href="${url}" />\n    <link rel="alternate" hreflang="x-default" href="${url}" />\n    <meta property="og:type" content="website" />\n    <meta property="og:locale" content="id_ID" />\n    <meta property="og:url" content="${url}" />\n    <meta property="og:title" content="${escapeHtml(route.title)}" />\n    <meta property="og:description" content="${escapeHtml(route.description)}" />\n    <meta property="og:image" content="${baseUrl}/uploads/gaeks-hero-cargo-poster.webp" />\n    ${jsonScript({ '@context': 'https://schema.org', '@graph': graph })}`;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description"[^>]*\/>/, '')
    .replace(/<link rel="canonical"[^>]*\/>/, '')
    .replace(/<meta property="og:(?:type|url|title|description|image)"[^>]*\/>/g, '')
    .replace('</head>', `${head}\n  </head>`);
  if (route.path !== '/') html = html.replace(/\s*<link rel="preload" as="image"[^>]*\/>/, '');
  const serviceLinks = route.path === '/' || route.path === '/layanan/' ? `<nav aria-label="Layanan freight">${content.services.map((item) => `<a href="${baseUrl}/layanan/${slugs[item.id] || item.id}/">${escapeHtml(item.title)}</a>`).join(' · ')}</nav>` : '';
  const table = route.info?.compare.length ? `<section><h2>Perbandingan pilihan</h2><table><thead><tr><th>Pilihan</th><th>Paling sesuai untuk</th><th>Data awal</th></tr></thead><tbody>${route.info.compare.map(([name, use, data]) => `<tr><th>${escapeHtml(name)}</th><td>${escapeHtml(use)}</td><td>${escapeHtml(data)}</td></tr>`).join('')}</tbody></table></section>` : '';
  const faq = route.info?.faq || (route.path === '/rute-pengiriman/' ? routeFaq : []);
  const faqHtml = faq.length ? `<section><h2>Pertanyaan teknis</h2>${faq.map(([q, a]) => `<article><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></article>`).join('')}</section>` : '';
  const ed = route.service ? editorialById.get(route.service.id) : null;
  const grp = route.service ? serviceContact(route.service.id) : null;
  const svcName = ed?.ctaServiceName || route.service?.title || '';
  const waMsg = (ed?.whatsappTemplate || grp?.whatsappTemplate || 'Halo tim GAEKS, saya ingin konsultasi {service}.').replace(/\{service\}/gi, svcName).replace(/\s*\{(?:arah|direction)\}/gi, '').replace(/\s+di\s+\{(?:kota|city)\}/gi, '').replace(/\s*\{(?:kota|city)\}/gi, '').trim();
  const waLabel = (ed?.whatsappCtaLabel || grp?.ctaText || `Chat Tim ${svcName}`).replace(/\{service\}/gi, svcName);
  const waUrl = grp ? `https://wa.me/${grp.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(waMsg)}` : '/kontak/';
  const mailUrl = grp ? `mailto:${grp.email}?subject=${encodeURIComponent(`Konsultasi ${svcName}`)}&body=${encodeURIComponent(waMsg)}` : '/kontak/';
  const ad = route.service && adPresentations[route.service.id];
  const srStyle = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
  const initial = ad
    ? `<main class="min-h-screen bg-[#f3f4ef] pt-16 text-[#12363a]"><section class="relative isolate overflow-hidden bg-[#062b30] text-white"><div class="absolute inset-0 -z-10 overflow-hidden"><img src="${escapeHtml(route.service.imageUrl)}" alt="" class="h-full w-full object-cover opacity-30"><div class="absolute inset-0 bg-gradient-to-r from-[#062b30] via-[#062b30]/90 to-[#062b30]/55"></div></div><div class="page-shell relative py-9 pb-16 sm:py-14 lg:py-20"><a href="/layanan/" class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-200">Semua layanan</a><div class="mt-8 grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.55fr)] lg:gap-16"><div><p class="inline-flex border-l-2 border-cyan-300 pl-3 text-xs font-bold uppercase tracking-[.24em] text-cyan-200">${escapeHtml(ad[0])}</p><h1 class="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-[-.055em] sm:text-6xl lg:text-7xl">${escapeHtml(route.heading)}</h1><p class="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">${escapeHtml(ed?.heroSummary || route.body)}</p><div class="mt-8 flex flex-wrap gap-3"><a href="${escapeHtml(waUrl)}" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-6 text-sm font-bold text-[#062b30]">${escapeHtml(waLabel)}</a><a href="${escapeHtml(mailUrl)}" class="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/40 px-6 text-sm font-bold text-white">Kirim Email</a></div></div><aside class="border-t border-white/40 bg-[#0a383d]/80 p-6 backdrop-blur-sm sm:p-7 lg:border-l lg:border-t-0"><p class="text-xs font-bold uppercase tracking-[.2em] text-cyan-200">Kontak tim</p><p class="mt-4 text-xl font-semibold leading-7">${escapeHtml(grp?.email || '')}</p></aside></div></div></section></main>`
    : route.service
      ? `<div class="min-h-screen bg-[#f4f5f1] pt-16 text-[#12363a]"><section class="page-shell py-10 sm:py-14"><a href="/layanan/" class="button-link">Semua layanan</a><div class="mt-7 grid min-w-0 grid-cols-[minmax(0,1fr)] overflow-hidden border border-slate-200 bg-white lg:grid-cols-2"><div class="min-w-0 p-6 sm:p-10 lg:p-12"><p class="section-label">${escapeHtml(route.service.category)}</p><h1 class="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">${escapeHtml(route.heading)}</h1><p class="mt-5 text-lg font-semibold text-cyan-800">${escapeHtml(route.service.tagline)}</p><p class="mt-5 text-base leading-7 text-slate-600">${escapeHtml(ed?.heroSummary || route.body)}</p><div class="mt-8 flex flex-wrap gap-3"><a class="button-primary" href="${escapeHtml(waUrl)}">${escapeHtml(waLabel)}</a><a class="button-secondary" href="${escapeHtml(mailUrl)}">Kirim Email (${escapeHtml(grp?.email || '')})</a></div></div><img src="${escapeHtml(route.service.imageUrl)}" alt="" width="960" height="640" class="min-h-[280px] h-full w-full object-cover"></div>${table}${faqHtml}</section></div>`
      : route.path === '/'
        ? `<main style="min-height:100vh;background:#062d32;color:#fff;font-family:Inter,ui-sans-serif,system-ui,sans-serif"><section style="min-height:664px;display:flex;align-items:center;padding:6.5rem 1.5rem 4rem"><div style="max-width:72rem;width:100%;margin:0 auto"><h1 style="font-size:clamp(2rem,4.5vw,3.75rem);line-height:1.04;letter-spacing:-.04em;margin:0 0 1.25rem;max-width:18ch">${escapeHtml(route.heading)}</h1><p style="font-size:1.05rem;line-height:1.65;max-width:52ch;color:#dbeaea;margin:0">${escapeHtml(route.body)}</p></div></section><div style="${srStyle}">${serviceLinks}${table}${faqHtml}<p><a href="/kontak/">Kontak tim</a></p></div></main>`
        : `<main style="min-height:100vh;background:#f4f5f1;color:#12363a;font-family:Inter,ui-sans-serif,system-ui,sans-serif"><section style="max-width:72rem;margin:0 auto;padding:7.5rem 1.5rem 3rem"><h1 style="font-size:clamp(2rem,4vw,3.25rem);line-height:1.08;letter-spacing:-.035em;margin:0 0 1rem;max-width:22ch">${escapeHtml(route.heading)}</h1><p style="font-size:1.05rem;line-height:1.65;max-width:56ch;color:#4b6265;margin:0">${escapeHtml(route.body)}</p></section><div style="${srStyle}">${serviceLinks}${table}${faqHtml}<p><a href="/kontak/">Kontak tim</a></p></div></main>`;
  const fallback = `<div id="root">${initial}</div>`;
  html = html.replace('<div id="root"></div>', fallback);
  const dir = join('dist', route.path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html);
}

const sourceDate = new Date(Math.max((await stat('public/api/site_content.json')).mtimeMs, (await stat('src/data/serviceKnowledge.json')).mtimeMs)).toISOString().slice(0, 10);
const articleSlug = (article) => article.slug && !article.slug.startsWith('analisis-komprehensif-logistik-maritim-')
  ? article.slug
  : `${article.title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 96)}-${article.id.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`;
const publishedArticles = content.articles.filter((article) => article.status !== 'draft' && article.publishedDate <= sourceDate);
const sitemapUrls = routes.map((route) => [`${baseUrl}${route.path}`, sourceDate]).concat(publishedArticles.map((article) => [`${baseUrl}/berita/${articleSlug(article)}/`, (article.updatedAt || article.publishedDate).slice(0, 10)]));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(([url, date]) => `  <url><loc>${escapeHtml(url)}</loc><lastmod>${date}</lastmod></url>`).join('\n')}\n</urlset>\n`;
await writeFile('public/sitemap.xml', sitemap);
await writeFile('dist/sitemap.xml', sitemap);
const serviceLines = content.services.map((item) => `- [${item.title}](${baseUrl}/layanan/${slugs[item.id] || item.id}/): ${serviceInfo(item).summary}`);
const llms = `# GAEKS Freight (PT Global Andalan Ekspress)

> Tagline Resmi: "Diperkuat oleh Manusia. Digerakkan oleh Teknologi. Berfokus pada Anda." ("Powered by People. Driven by Technology. Focused on You.")

GAEKS Freight (PT Global Andalan Ekspress) adalah perusahaan freight forwarding internasional dan jasa kepabeanan (PPJK) berbasis di Tanjung Priok, Jakarta & Banten, yang melayani pengiriman FCL, LCL, air freight, customs clearance (PIB/PEB), undername impor & Persetujuan Impor (PI), transportasi darat, pergudangan, dan project cargo di seluruh Indonesia (termasuk Jakarta, Semarang, dan Surabaya). Jadwal, tarif, ketersediaan ruang, serta ketentuan dokumen harus dikonfirmasi untuk setiap pengiriman.

## Halaman Utama & Alat Bantu Pengiriman

- [Beranda](${baseUrl}/)
- [Layanan Freight Forwarding & PPJK](${baseUrl}/layanan/)
- [Tentang Kami — Visi, Misi & Keunggulan Digital](${baseUrl}/tentang-kami/)
- [Pelacakan Pengiriman HAWB, B/L & Kontainer](${baseUrl}/tracking/)
- [Kalkulator Kargo CBM & Berat Volumetrik](${baseUrl}/kalkulator/)
- [Rute dan Jadwal Pengiriman](${baseUrl}/rute-pengiriman/)
- [Tarif Pengiriman](${baseUrl}/tarif-pengiriman/)
- [Maskapai dan Perusahaan Pelayaran](${baseUrl}/maskapai-dan-pelayaran/)
- [Wawasan dan Berita Logistik](${baseUrl}/berita/)
- [Karier di GAEKS](${baseUrl}/karier/)
- [Hubungi Kami & Permintaan Penawaran](${baseUrl}/kontak/)

## Panduan Layanan

${serviceLines.join('\n')}
`;
const full = `${llms}\n## Pertanyaan Umum (AEO Reference)\n\n${homeAeoFaq.map(([q, a]) => `- **${q}**: ${a}`).join('\n')}\n\n## Data untuk Penawaran\n\nSiapkan rute asal dan tujuan, moda (FCL, LCL, udara, atau trucking), Incoterms, jenis komoditas, berat kotor, volume CBM/dimensi kemasan, target waktu kirim, serta invoice dan packing list bila tersedia.\n\n## FAQ Spesifik Layanan\n\n${content.services.map((item) => `### ${item.title}\n${serviceInfo(item).faq.map(([q,a]) => `- ${q} ${a}`).join('\n')}`).join('\n\n')}\n\n## Kontak Spesialis\n\n- Kepabeanan (PPJK), FCL & Undername: ${tradeGroup.whatsappDisplay} / ${tradeGroup.email}\n- Kargo Udara (Air Freight): ${airGroup.whatsappDisplay} / ${airGroup.email}\n- Project Cargo, Domestik & CS Umum: ${generalGroup.whatsappDisplay} / ${generalGroup.email}\n`;
for (const [name, text] of [['llms.txt', llms], ['llms-full.txt', full]]) {
  await writeFile(join('public', name), text);
  await writeFile(join('dist', name), text);
}
console.log(`Generated ${routes.length} public HTML pages, sitemap.xml, llms.txt, and llms-full.txt`);
