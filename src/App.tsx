import { resolveContact } from './utils/quoteFlow';
// filepath: /src/App.tsx
import React, { Suspense, useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { Footer } from './components/Footer';
import { HomeEditorial } from './components/HomeEditorial';
import { HomeClients, HomeNetworks } from './components/HomePartners';
import { HomeSignatureSection } from './components/HomeSignatureSection';
import { Language } from './types/freight';
import { getStoredBranding, getStoredCorporate, getStoredSeo, getStoredServices, getStoredSiteSettings, GAEKS_UPDATE_EVENT, syncFromServer } from './utils/adminStorage';
import { applySiteLanguage, getPreferredLanguage, preloadTranslationEngine } from './utils/siteTranslator';
import { matchesServiceRoute, pagePaths, routeAliases, servicePath, serviceSlug } from './utils/routes';
import { getSiteCopy } from './utils/adminStorage';
import { isPublishedArticle, serviceContent } from './utils/serviceContent';
import { getStoredArticles } from './utils/newsStorage';
import { articlePath, articleSlug } from './utils/articleRoutes';
import { quoteContext } from './utils/quoteFlow';
import { adLanding } from './data/adLanding';
import { inferFaviconMimeType } from './utils/localizeContent';

const LEGAL_DOC_META = {
  terms: {
    route: '/terms-of-use/',
    pageTitle: 'Terms of Use Website',
    seoTitle: 'Terms of Use Website | GAEKS',
    metaDescription: 'Read the official website terms of use of PT Global Andalan Ekspress (GAEKS), an international freight forwarding and logistics company.'
  },
  privacy: {
    route: '/privacy-terms/',
    pageTitle: 'Privacy Terms',
    seoTitle: 'Privacy Terms | GAEKS',
    metaDescription: 'Learn how PT Global Andalan Ekspress (GAEKS) collects, processes, protects, and manages personal data in its freight forwarding and logistics activities.'
  }
} as const;

const SmartCalculator = React.lazy(() => import('./components/SmartCalculator').then((module) => ({ default: module.SmartCalculator })));
const InteractiveMap = React.lazy(() => import('./components/InteractiveMap').then((module) => ({ default: module.InteractiveMap })));
const NewsPage = React.lazy(() => import('./components/NewsPage').then((module) => ({ default: module.NewsPage })));
const OperatorAdmin = React.lazy(() => import('./components/OperatorAdmin').then((module) => ({ default: module.OperatorAdmin })));
const ContactPage = React.lazy(() => import('./components/ContactPage').then((module) => ({ default: module.ContactPage })));
const PhoneContactsPage = React.lazy(() => import('./components/PhoneContactsPage').then((module) => ({ default: module.PhoneContactsPage })));
const LegalDocumentPage = React.lazy(() => import('./components/LegalDocumentPage').then((module) => ({ default: module.LegalDocumentPage })));
const ServiceDetailPage = React.lazy(() => import('./components/ServiceDetailPage').then((module) => ({ default: module.ServiceDetailPage })));
const ShipmentTracking = React.lazy(() => import('./components/ShipmentTracking').then((module) => ({ default: module.ShipmentTracking })));
const AboutPage = React.lazy(() => import('./components/AboutPage').then((module) => ({ default: module.AboutPage })));
const RateCardPage = React.lazy(() => import('./components/RateCardPage').then((module) => ({ default: module.RateCardPage })));
const CarriersPage = React.lazy(() => import('./components/CarriersPage').then((module) => ({ default: module.CarriersPage })));
const CareersPage = React.lazy(() => import('./components/CareersPage').then((module) => ({ default: module.CareersPage })));
const Toaster = React.lazy(() => import('sonner').then((module) => ({ default: module.Toaster })));

const PageFallback = ({ tracking = false }: { tracking?: boolean }) => <div className={`${tracking ? 'min-h-[736px] bg-[#f8fafc] sm:min-h-[660px]' : 'min-h-[60vh] bg-[#f4f5f1]'} pt-32 text-center text-sm text-slate-500`}>Memuat halaman…</div>;

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>(() => getPreferredLanguage());
  const [activeArticleId, setActiveArticleId] = useState<string>(() => window.location.pathname.match(/^\/berita\/([^/]+)\/?$/)?.[1] || '');
  const getServiceSlug = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.startsWith('/layanan/')) return path.substring('/layanan/'.length).replace(/\/$/, '');
    if (hash.startsWith('#service=')) return hash.substring('#service='.length);
    return '';
  };

  const getInitialPage = () => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (path === 'operator' || hash === 'operator' || hash === 'admin') {
      return 'operator';
    }
    if (getServiceSlug()) return 'service';
    if (path === 'kontak/telepon') return 'phones';
    if (path.startsWith('berita/')) return 'news';
    if (['home', 'services', 'tracking', 'calculator', 'network', 'news', 'contact'].includes(hash)) {
      return hash;
    }
    const paths: Record<string, string> = {
      layanan: 'services',
      tracking: 'tracking',
      'rute-pengiriman': 'network',
      kalkulator: 'calculator',
      'tarif-pengiriman': 'rates',
      'maskapai-dan-pelayaran': 'carriers',
      carrier: 'carriers',
      'tentang-kami': 'about',
      karier: 'careers',
      berita: 'news',
      kontak: 'contact',
      'terms-of-use': 'terms',
      'privacy-terms': 'privacy'
    };
    if (paths[path]) return paths[path];
    if (routeAliases[path]) return routeAliases[path];
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage());
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');
  const [activeServiceSlug, setActiveServiceSlug] = useState<string>(getServiceSlug());

  // Sinkronisasi server Hostinger otomatis pada saat dibuka, polling berkala, dan saat tab aktif
  useEffect(() => {
    syncFromServer();

    // Pembaruan lintas perangkat tetap ringan, sedangkan tab pada perangkat yang sama menerima BroadcastChannel secara langsung.
    const interval = setInterval(() => {
      syncFromServer();
    }, 15000);

    const onFocus = () => syncFromServer();
    const publishLocalRefresh = () => window.dispatchEvent(new CustomEvent(GAEKS_UPDATE_EVENT, { detail: { timestamp: Date.now() } }));
    const onStorage = (event: StorageEvent) => {
      if (event.key?.startsWith('gaeks_')) publishLocalRefresh();
    };
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('gaeks_sync_channel');
      channel.onmessage = publishLocalRefresh;
    } catch {}
    window.addEventListener('focus', onFocus);
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onStorage);
      channel?.close();
    };
  }, []);

  useEffect(() => {
    const applyMetadata = () => {
      const seo = getStoredSeo();
      const copy = getSiteCopy();
      const branding = getStoredBranding();
      const corporate = getStoredCorporate();
      const detailService = currentPage === 'service' ? getStoredServices().find((item) => matchesServiceRoute(item.id, activeServiceSlug)) : undefined;
      const routeTitles: Record<string, string> = {
        services: 'Layanan Freight & Logistik',
        network: 'Rute dan Jadwal',
        calculator: 'Kalkulator Kargo',
        tracking: 'Pelacakan Pengiriman',
        rates: corporate.rateCard.seoTitle,
        carriers: corporate.carriers.seoTitle,
        about: corporate.about.seoTitle,
        careers: corporate.careers.seoTitle,
        news: 'Wawasan dan Berita Logistik',
        contact: 'Hubungi Kami & Permintaan Penawaran',
        terms: LEGAL_DOC_META.terms.seoTitle,
        privacy: LEGAL_DOC_META.privacy.seoTitle
      };
      const routeDescriptions: Record<string, string> = {
        services: copy.servicesMetaDescription,
        network: 'Jelajahi koridor laut dan udara. Jadwal, kapasitas, dan waktu tempuh dikonfirmasi saat pemesanan.',
        calculator: 'Rencanakan kebutuhan kapasitas dan moda pengiriman sebelum meminta penawaran freight.',
        tracking: 'Periksa status pengiriman GAEKS menggunakan nomor referensi HAWB, B/L, atau kontainer.',
        rates: corporate.rateCard.metaDescription,
        carriers: corporate.carriers.metaDescription,
        about: corporate.about.metaDescription,
        careers: corporate.careers.metaDescription,
        news: 'Baca wawasan dan berita terkait logistik, rute, dan kepabeanan dari GAEKS.',
        contact: copy.contactMetaDescription,
        phones: copy.phoneMetaDescription,
        terms: LEGAL_DOC_META.terms.metaDescription,
        privacy: LEGAL_DOC_META.privacy.metaDescription
      };
      const knowledge = detailService ? {summary: detailService.summary || detailService.description, faq: detailService.faq || [], compare: detailService.compare || []} : undefined;
      const adType = detailService?.id === 'fcl' ? 'fcl' : detailService?.id === 'air-shipment' ? 'air' : detailService?.id === 'ppjk' ? 'ppjk' : detailService?.id === 'undername-impor' ? 'undername' : null;
      const detailArticle = currentPage === 'news' && activeArticleId ? getStoredArticles().find((article) => isPublishedArticle(article) && (article.id === activeArticleId || articleSlug(article) === activeArticleId)) : undefined;
      const description = detailArticle?.excerpt || (detailService?.metaDescription || knowledge?.summary) || routeDescriptions[currentPage] || seo.metaDescription;
      document.title = detailArticle ? `${detailArticle.title} | GAEKS News` : detailService ? (detailService.seoTitle || `${detailService.title} | GAEKS Freight`) : currentPage === 'home' ? seo.siteTitle : `${routeTitles[currentPage] || 'GAEKS Freight'} | GAEKS Freight`;
      if (currentPage === 'services') document.title = copy.servicesMetaTitle;
      if (currentPage === 'contact') document.title = copy.contactMetaTitle;
      if (currentPage === 'phones') document.title = copy.phoneMetaTitle;
      if (currentPage === 'about') document.title = corporate.about.seoTitle;
      if (currentPage === 'rates') document.title = corporate.rateCard.seoTitle;
      if (currentPage === 'carriers') document.title = corporate.carriers.seoTitle;
      if (currentPage === 'careers') document.title = corporate.careers.seoTitle;
      if (currentPage === 'terms') document.title = LEGAL_DOC_META.terms.seoTitle;
      if (currentPage === 'privacy') document.title = LEGAL_DOC_META.privacy.seoTitle;
      const setMeta = (selector: string, attribute: string, value: string) => {
        let element = document.querySelector(selector) as HTMLMetaElement | null;
        if (!element) {
          element = document.createElement('meta');
          const match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
          if (match) element.setAttribute(match[1], match[2]);
          document.head.appendChild(element);
        }
        element.setAttribute(attribute, value);
      };
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[name="keywords"]', 'content', seo.keywords);
      setMeta('meta[name="robots"]', 'content', currentPage === 'operator' || !seo.robotsIndex || window.location.hostname.endsWith('.hostingersite.com') ? 'noindex, nofollow' : 'index, follow');
      setMeta('meta[property="og:title"]', 'content', currentPage === 'home' && seo.ogTitle ? seo.ogTitle : document.title);
      setMeta('meta[property="og:description"]', 'content', currentPage === 'home' && seo.ogDescription ? seo.ogDescription : description);
      setMeta('meta[property="og:image"]', 'content', new URL(seo.ogImageUrl || '/logos/gaek-symbol.png', 'https://gaeks.com').href);
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
      canonical.href = detailService?.canonical || `https://gaeks.com${detailArticle ? articlePath(detailArticle) : window.location.pathname}`;
      setMeta('meta[property="og:url"]', 'content', canonical.href);
      const orgId = 'https://gaeks.com/#organization';
      const logoUrl = new URL(branding.symbolLogoUrl || branding.navbarLogoUrl || '/logos/gaek-symbol.png', 'https://gaeks.com').href;
      const areaServedIndonesia = [
        { '@type': 'Country', name: 'Indonesia' },
        { '@type': 'City', name: 'Jakarta' },
        { '@type': 'City', name: 'Semarang' },
        { '@type': 'City', name: 'Surabaya' },
      ];
      const graph: Record<string, unknown>[] = [
        {
          '@type': 'Organization',
          '@id': orgId,
          name: 'GAEKS Freight',
          legalName: 'PT Global Andalan Ekspress',
          url: 'https://gaeks.com',
          logo: logoUrl,
          email: resolveContact('general').email,
          telephone: resolveContact('general').whatsappDisplay,
          sameAs: (getStoredSiteSettings().socialLinks || []).map((s) => s.url).filter(Boolean),
          knowsAbout: ['Freight Forwarding Internasional', 'Pengiriman Laut FCL', 'Pengiriman Laut LCL', 'Jasa PPJK & Customs Clearance', 'Air Freight', 'Undername Impor & PI', 'Project Cargo', 'Domestic Trucking'],
        },
        {
          '@type': ['LocalBusiness', 'ProfessionalService'],
          '@id': 'https://gaeks.com/#local-business',
          name: 'GAEKS Freight — PT Global Andalan Ekspress',
          url: 'https://gaeks.com',
          parentOrganization: { '@id': orgId },
          address: { '@type': 'PostalAddress', addressLocality: 'Tanjung Priok', addressRegion: 'DKI Jakarta', addressCountry: 'ID' },
          areaServed: areaServedIndonesia,
        },
        { '@type': 'WebPage', '@id': canonical.href, url: canonical.href, name: document.title, description, inLanguage: 'id-ID' }
      ];
      if (currentPage === 'home') {
        graph.push({ '@type': 'WebSite', '@id': 'https://gaeks.com/#website', url: 'https://gaeks.com', name: 'GAEKS Freight', inLanguage: 'id-ID' });
        graph.push({
          '@type': 'FAQPage',
          mainEntity: [
            ['Layanan apa saja yang ditangani GAEKS Freight?', 'PT Global Andalan Ekspress (GAEKS Freight) melayani pengiriman laut FCL dan LCL, jasa kepabeanan PPJK dan customs clearance (PIB/PEB), pengiriman udara prioritas, perizinan impor dan undername/PI, transportasi darat, pergudangan, serta project cargo.'],
            ['Apa perbedaan pengiriman FCL dan LCL di GAEKS?', 'FCL menggunakan satu kontainer penuh secara eksklusif untuk muatan volume besar, sedangkan LCL menggabungkan kargo volume lebih kecil secara konsolidasi bersama pengirim lain.'],
            ['Dokumen apa yang disiapkan untuk customs clearance PPJK?', 'Siapkan Commercial Invoice, Packing List, dokumen pengangkutan (B/L atau AWB), HS Code atau deskripsi barang, serta izin komoditas terkait seperti Persetujuan Impor (PI) bila diperlukan.'],
          ].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
        });
      }
      if (currentPage === 'services') {
        graph[2]['@type'] = 'CollectionPage';
        graph.push({ '@type': 'ItemList', name: copy.servicesListLabel, itemListElement: getStoredServices().map((service, index) => ({ '@type': 'ListItem', position: index + 1, name: service.title, url: service.canonical || `https://gaeks.com${servicePath(service.id)}` })) });
      }
      if (currentPage === 'phones') {
        graph[2]['@type'] = 'ContactPage';
        graph.push({ '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: copy.phoneHomeLabel, item: 'https://gaeks.com/' },
          { '@type': 'ListItem', position: 2, name: copy.phoneContactLabel, item: 'https://gaeks.com/kontak/' },
          { '@type': 'ListItem', position: 3, name: copy.phonePageLabel, item: canonical.href }
        ] });
      }
      if (currentPage === 'terms' || currentPage === 'privacy') {
        const legalDoc = currentPage === 'terms' ? LEGAL_DOC_META.terms : LEGAL_DOC_META.privacy;
        canonical.href = `https://gaeks.com${legalDoc.route}`;
        setMeta('meta[property="og:url"]', 'content', canonical.href);
        graph[2]['@id'] = canonical.href;
        graph[2]['url'] = canonical.href;
        graph.push({ '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gaeks.com/' },
          { '@type': 'ListItem', position: 2, name: legalDoc.pageTitle, item: canonical.href }
        ] });
      }
      if (detailService && knowledge) {
        graph.push({ '@type': 'Service', name: detailService.title, serviceType: detailService.category, description, provider: { '@id': orgId }, areaServed: { '@type': 'Country', name: 'Indonesia' }, url: canonical.href });
        graph.push({ '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://gaeks.com/' },
          { '@type': 'ListItem', position: 2, name: 'Layanan', item: 'https://gaeks.com/layanan/' },
          { '@type': 'ListItem', position: 3, name: detailService.title, item: canonical.href }
        ] });
        graph.push({ '@type': 'FAQPage', mainEntity: knowledge.faq.map(([name, answer]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text: answer } })) });
      }
      if (detailArticle) {
        graph.push({ '@type': 'NewsArticle', headline: detailArticle.title, description: detailArticle.excerpt, datePublished: detailArticle.publishedDate, dateModified: detailArticle.updatedAt || detailArticle.publishedDate, image: new URL(detailArticle.imageUrl, 'https://gaeks.com').href, author: { '@type': 'Organization', name: detailArticle.author || 'GAEKS Editorial' }, publisher: { '@id': orgId }, mainEntityOfPage: canonical.href });
        graph.push({ '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://gaeks.com/' },
          { '@type': 'ListItem', position: 2, name: 'Berita', item: 'https://gaeks.com/berita/' },
          { '@type': 'ListItem', position: 3, name: detailArticle.title, item: canonical.href }
        ] });
      }
      if (currentPage === 'network') {
        const routeFaq = [
          ['Apakah waktu tempuh di halaman ini sudah pasti?', 'Belum. Waktu tempuh adalah rujukan dan perlu dikonfirmasi bersama jadwal, transit, dan ketersediaan ruang saat pemesanan.'],
          ['Data apa yang diperlukan untuk meminta rute?', 'Siapkan titik asal dan tujuan, komoditas, berat, volume, kesiapan barang, serta target waktu tiba.'],
          ['Kapan memilih laut atau udara?', 'Bandingkan volume, nilai barang, target waktu, penanganan, serta biaya total sampai titik penerima.']
        ];
        graph.push({ '@type': 'FAQPage', mainEntity: routeFaq.map(([name, answer]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text: answer } })) });
      }
      let structuredData = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
      if (!structuredData) { structuredData = document.createElement('script'); structuredData.type = 'application/ld+json'; document.head.appendChild(structuredData); }
      structuredData.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
      const faviconUrl = branding.faviconUrl || '/favicon.svg?v=9';
      const faviconMime = inferFaviconMimeType(faviconUrl);
      for (const rel of ['icon', 'shortcut icon', 'apple-touch-icon'] as const) {
        let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
        if (!link) {
          link = document.createElement('link');
          link.rel = rel;
          document.head.appendChild(link);
        }
        if (rel === 'icon' && faviconMime) link.type = faviconMime;
        else link.removeAttribute('type');
        if (link.getAttribute('href') !== faviconUrl) link.href = faviconUrl;
      }
    };
    applyMetadata();
    window.addEventListener(GAEKS_UPDATE_EVENT, applyMetadata);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, applyMetadata);
  }, [currentPage, activeServiceSlug, activeArticleId]);

  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '').toLowerCase();
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      
      if (path === 'operator' || fullHash === 'operator' || fullHash === 'admin') {
        setCurrentPage('operator');
      } else if (fullHash.startsWith('service=') || path.startsWith('layanan/')) {
        setActiveServiceSlug(getServiceSlug());
        setCurrentPage('service');
      } else if (fullHash.startsWith('news?id=')) {
        const articleId = fullHash.includes('id=') ? fullHash.substring(fullHash.indexOf('id=') + 3) : '';
        setActiveArticleId(articleId);
        setCurrentPage('news');
      } else if (path.startsWith('berita/')) {
        setActiveArticleId(path.substring('berita/'.length));
        setCurrentPage('news');
      } else if (['home', 'services', 'tracking', 'calculator', 'network', 'rates', 'carriers', 'about', 'careers', 'news', 'contact'].includes(fullHash)) {
        setActiveArticleId('');
        setActiveServiceSlug('');
        setCurrentPage(fullHash);
      } else if (Object.entries(pagePaths).some(([, value]) => value.replace(/^\/+|\/+$/g, '') === path)) {
        setActiveServiceSlug('');
        setCurrentPage(Object.entries(pagePaths).find(([, value]) => value.replace(/^\/+|\/+$/g, '') === path)?.[0] || 'home');
        if (fullHash) return;
      } else if (routeAliases[path]) {
        setActiveServiceSlug('');
        setCurrentPage(routeAliases[path]);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (window.location.hash) handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => { window.removeEventListener('hashchange', handleHashChange); window.removeEventListener('popstate', handleHashChange); };
  }, []);

  const navigateTo = (page: string) => {
    const slugFromPath = page === 'service' ? getServiceSlug() : '';
    if (page === 'service' && slugFromPath) {
      setActiveArticleId('');
      setActiveServiceSlug(slugFromPath);
      setCurrentPage('service');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = new URL(pagePaths[page] || '/', window.location.origin);
    if (page === 'contact' && window.location.pathname === target.pathname && (window.location.search || window.location.hash)) {
      setActiveArticleId('');
      setActiveServiceSlug('');
      setCurrentPage('contact');
      return;
    }
    if (page === 'contact' && activeServiceSlug) {
      const matched = getStoredServices().find((item) => matchesServiceRoute(item.id, activeServiceSlug));
      const selected = matched
        ? matched.id === 'air-shipment'
          ? 'air'
          : matched.id === 'undername-impor'
            ? 'undername'
            : matched.id
        : activeServiceSlug;
      if (selected) {
        const context = quoteContext(selected);
        target.searchParams.set('service', selected);
        if (context.explicitDirection) target.searchParams.set('direction', context.explicitDirection);
        if (context.city) target.searchParams.set('city', context.city);
        const incoming = new URLSearchParams(window.location.search);
        for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) { const value = incoming.get(key); if (value && value.length <= 200) target.searchParams.set(key, value); }
      }
    }
    window.history.pushState({}, '', target.pathname + target.search);
    setActiveArticleId('');
    setActiveServiceSlug('');
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceName: string) => {
    const service = getStoredServices().find(item => item.title === serviceName || item.id === serviceName);
    window.location.assign('/kontak/?service=' + encodeURIComponent(service?.id || 'general'));
  };

  const handleOpenService = (serviceId: string) => {
    setActiveServiceSlug(serviceSlug(serviceId));
    window.history.pushState({}, '', servicePath(serviceId));
    setCurrentPage('service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticleDetail = (articleId: string) => {
    setActiveArticleId(articleId);
    const article = getStoredArticles().find((item) => item.id === articleId);
    window.history.pushState({}, '', article ? articlePath(article) : pagePaths.news);
    setCurrentPage('news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isOperatorPage = currentPage === 'operator';

  useEffect(() => {
    if (isOperatorPage) return;

    const canUseIdleCallback = typeof window.requestIdleCallback === 'function';
    const schedule = canUseIdleCallback
      ? window.requestIdleCallback(() => preloadTranslationEngine(), { timeout: 1800 })
      : window.setTimeout(() => preloadTranslationEngine(), 800);

    return () => {
      if (canUseIdleCallback) window.cancelIdleCallback(schedule);
      else window.clearTimeout(schedule);
    };
  }, [isOperatorPage]);

  useEffect(() => {
    if (isOperatorPage || currentLang === 'id') return;
    const timer = window.setTimeout(() => {
      void applySiteLanguage(currentLang);
    }, 80);
    return () => window.clearTimeout(timer);
  }, [currentLang, currentPage, activeArticleId, activeServiceSlug, isOperatorPage]);

  useEffect(() => {
    if (isOperatorPage) return;
    const reapply = () => {
      if (currentLang !== 'id') window.setTimeout(() => void applySiteLanguage(currentLang), 80);
    };
    window.addEventListener(GAEKS_UPDATE_EVENT, reapply);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reapply);
  }, [currentLang, isOperatorPage]);

  const handleLanguageChange = (language: Language) => {
    setCurrentLang(language);
    void applySiteLanguage(language);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5f1] text-[#12363a] font-sans">
      <Suspense fallback={null}>
        <Toaster position="bottom-right" richColors closeButton />
      </Suspense>
      {!isOperatorPage && <a href="#public-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[70] focus:bg-white focus:px-4 focus:py-3">Lewati navigasi</a>}

      {!isOperatorPage && (
        <Navbar
          currentTab={currentPage}
          activeServiceSlug={activeServiceSlug}
          onNavigate={navigateTo}
          currentLang={currentLang}
          onSelectLang={handleLanguageChange}
        />
      )}

      <main id="public-content" className="flex-grow">
        <div key={currentPage} className="page-transition">
        <Suspense fallback={<PageFallback tracking={currentPage === 'tracking'} />}>
        {currentPage === 'operator' && (
          <OperatorAdmin onNavigate={navigateTo} />
        )}

        {currentPage === 'services' && (
          <div className="pt-16">
            <ServicesCarousel standalone onSelectService={handleSelectService} onOpenService={handleOpenService} currentLang={currentLang} />
          </div>
        )}

        {currentPage === 'service' && (
          <ServiceDetailPage slug={activeServiceSlug} currentLang={currentLang} onBack={() => navigateTo('services')} onQuote={handleSelectService} />
        )}

        {currentPage === 'calculator' && (
          <div className="pt-24">
            <SmartCalculator prefillService={selectedServiceForQuote} currentLang={currentLang} />
          </div>
        )}

        {currentPage === 'tracking' && (
          <ShipmentTracking />
        )}

        {currentPage === 'network' && (
          <div className="pt-24">
            <InteractiveMap />
          </div>
        )}

        {currentPage === 'news' && (
          <NewsPage 
            activeDetailId={activeArticleId} 
            onBackToList={() => navigateTo('news')}
            onSelectArticle={handleOpenArticleDetail}
            currentLang={currentLang}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
        {currentPage === 'phones' && <PhoneContactsPage />}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} currentLang={currentLang} />}
        {currentPage === 'rates' && <RateCardPage onNavigate={navigateTo} />}
        {currentPage === 'carriers' && <CarriersPage onNavigate={navigateTo} />}
        {currentPage === 'careers' && <CareersPage onNavigate={navigateTo} />}
        {currentPage === 'terms' && <LegalDocumentPage documentType="terms" onNavigate={navigateTo} />}
        {currentPage === 'privacy' && <LegalDocumentPage documentType="privacy" onNavigate={navigateTo} />}

        {currentPage === 'home' && (
          <>
            <Hero onNavigate={navigateTo} onOpenService={handleOpenService} currentLang={currentLang} />
            <HomeNetworks />
            <ServicesCarousel onSelectService={handleSelectService} onOpenService={handleOpenService} onViewAll={() => navigateTo('services')} currentLang={currentLang} />
            <HomeClients />
            <HomeSignatureSection onNavigate={navigateTo} />
            <HomeEditorial
              currentLang={currentLang}
              onNavigate={navigateTo}
              onSelectArticle={handleOpenArticleDetail}
            />
          </>
        )}
        </Suspense>
        </div>
      </main>

      {!isOperatorPage && (
        <Footer onNavigate={navigateTo} currentLang={currentLang} />
      )}
    </div>
  );
};

export default App;
