// filepath: /src/App.tsx
import React, { Suspense, useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { Footer } from './components/Footer';
import { HomeEditorial } from './components/HomeEditorial';
import { HomeClients, HomeNetworks } from './components/HomePartners';
import { Language } from './types/freight';
import { getStoredBranding, getStoredSeo, getStoredServices, GAEKS_UPDATE_EVENT, syncFromServer } from './utils/adminStorage';
import { applySiteLanguage, getPreferredLanguage, preloadTranslationEngine } from './utils/siteTranslator';
import { matchesServiceRoute, pagePaths, servicePath, serviceSlug } from './utils/routes';
import { isPublishedArticle, serviceContent } from './utils/serviceContent';
import { getStoredArticles } from './utils/newsStorage';
import { articlePath, articleSlug } from './utils/articleRoutes';
import { quoteContext } from './utils/quoteFlow';
import { adLanding } from './data/adLanding';

const SmartCalculator = React.lazy(() => import('./components/SmartCalculator').then((module) => ({ default: module.SmartCalculator })));
const InteractiveMap = React.lazy(() => import('./components/InteractiveMap').then((module) => ({ default: module.InteractiveMap })));
const NewsPage = React.lazy(() => import('./components/NewsPage').then((module) => ({ default: module.NewsPage })));
const OperatorAdmin = React.lazy(() => import('./components/OperatorAdmin').then((module) => ({ default: module.OperatorAdmin })));
const ContactPage = React.lazy(() => import('./components/ContactPage').then((module) => ({ default: module.ContactPage })));
const ServiceDetailPage = React.lazy(() => import('./components/ServiceDetailPage').then((module) => ({ default: module.ServiceDetailPage })));
const ShipmentTracking = React.lazy(() => import('./components/ShipmentTracking').then((module) => ({ default: module.ShipmentTracking })));

const PageFallback = () => <div className="min-h-[60vh] bg-[#f4f5f1] pt-32 text-center text-sm text-slate-500">Memuat halaman…</div>;

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
    if (path.startsWith('berita/')) return 'news';
    if (['home', 'services', 'tracking', 'calculator', 'network', 'news', 'contact'].includes(hash)) {
      return hash;
    }
    const paths: Record<string, string> = { layanan: 'services', tracking: 'tracking', 'rute-pengiriman': 'network', kalkulator: 'calculator', berita: 'news', kontak: 'contact' };
    if (paths[path]) return paths[path];
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
      const branding = getStoredBranding();
      const detailService = currentPage === 'service' ? getStoredServices().find((item) => matchesServiceRoute(item.id, activeServiceSlug)) : undefined;
      const routeTitles: Record<string, string> = { services: 'Layanan Freight & Logistik', network: 'Rute Pengiriman', calculator: 'Kalkulator Kargo', tracking: 'Lacak Pengiriman', news: 'Berita Logistik', contact: 'Kontak & Permintaan Penawaran' };
      const routeDescriptions: Record<string, string> = {
        services: 'Bandingkan layanan LCL, FCL, air freight, kepabeanan, pergudangan, trucking, dan project cargo.',
        network: 'Jelajahi koridor laut dan udara. Jadwal, kapasitas, dan waktu tempuh dikonfirmasi saat pemesanan.',
        calculator: 'Rencanakan kebutuhan kapasitas dan moda pengiriman sebelum meminta penawaran freight.',
        tracking: 'Periksa status shipment GAEKS menggunakan nomor pengiriman.',
        news: 'Baca pembaruan terkait logistik, rute, dan kepabeanan dari GAEKS.',
        contact: 'Hubungi tim GAEKS untuk mendiskusikan rute, kargo, dokumen, dan kebutuhan penawaran.'
      };
      const knowledge = detailService ? serviceContent(detailService) : undefined;
      const adType = detailService?.id === 'fcl' ? 'fcl' : detailService?.id === 'air-shipment' ? 'air' : detailService?.id === 'ppjk' ? 'ppjk' : detailService?.id === 'undername-impor' ? 'undername' : null;
      const detailArticle = currentPage === 'news' && activeArticleId ? getStoredArticles().find((article) => isPublishedArticle(article) && (article.id === activeArticleId || articleSlug(article) === activeArticleId)) : undefined;
      const description = detailArticle?.excerpt || (adType ? detailService?.landingDescription || adLanding[adType].intro : knowledge?.summary) || routeDescriptions[currentPage] || seo.metaDescription;
      document.title = detailArticle ? `${detailArticle.title} | GAEKS News` : detailService ? `${adType ? detailService.landingTitle || adLanding[adType].title : detailService.title} | GAEKS Freight` : currentPage === 'home' ? seo.siteTitle : `${routeTitles[currentPage] || 'GAEKS Freight'} | GAEKS Freight`;
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
      setMeta('meta[name="robots"]', 'content', currentPage === 'operator' || !seo.robotsIndex ? 'noindex, nofollow' : 'index, follow');
      setMeta('meta[property="og:title"]', 'content', document.title);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[property="og:image"]', 'content', new URL(seo.ogImageUrl, 'https://gaeks.com').href);
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
      canonical.href = `https://gaeks.com${detailArticle ? articlePath(detailArticle) : window.location.pathname}`;
      setMeta('meta[property="og:url"]', 'content', canonical.href);
      const orgId = 'https://gaeks.com/#organization';
      const graph: Record<string, unknown>[] = [
        { '@type': 'Organization', '@id': orgId, name: 'GAEKS Freight', legalName: 'Global Andalan Ekspress', url: 'https://gaeks.com', logo: 'https://gaeks.com/logos/gaek-symbol.png', email: branding.salesEmail, telephone: branding.whatsappDisplay },
        { '@type': 'LocalBusiness', '@id': 'https://gaeks.com/#local-business', name: 'GAEKS Freight', url: 'https://gaeks.com', parentOrganization: { '@id': orgId }, address: { '@type': 'PostalAddress', addressLocality: 'Tanjung Priok', addressRegion: 'DKI Jakarta', addressCountry: 'ID' } },
        { '@type': 'WebPage', '@id': canonical.href, url: canonical.href, name: document.title, description, inLanguage: 'id-ID' }
      ];
      if (currentPage === 'home') graph.push({ '@type': 'WebSite', '@id': 'https://gaeks.com/#website', url: 'https://gaeks.com', name: 'GAEKS Freight', inLanguage: 'id-ID' });
      if (detailService && knowledge) {
        graph.push({ '@type': 'Service', name: detailService.title, serviceType: detailService.category, description, provider: { '@id': orgId }, areaServed: { '@type': 'Country', name: 'Indonesia' }, url: canonical.href });
        graph.push({ '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://gaeks.com/' },
          { '@type': 'ListItem', position: 2, name: 'Layanan', item: 'https://gaeks.com/layanan/' },
          { '@type': 'ListItem', position: 3, name: detailService.title, item: canonical.href }
        ] });
        graph.push({ '@type': 'FAQPage', mainEntity: (adType ? adLanding[adType].faqs.map(({ question, answer }) => [question, answer] as [string, string]) : knowledge.faq).map(([name, answer]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text: answer } })) });
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
      let icon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
      if (!icon) { icon = document.createElement('link'); icon.rel = 'icon'; document.head.appendChild(icon); }
      icon.href = branding.faviconUrl;
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
      } else if (!fullHash && Object.entries(pagePaths).some(([, value]) => value.replace(/^\/+|\/+$/g, '') === path)) {
        setActiveServiceSlug('');
        setCurrentPage(Object.entries(pagePaths).find(([, value]) => value.replace(/^\/+|\/+$/g, '') === path)?.[0] || 'home');
      } else if (['home', 'services', 'tracking', 'calculator', 'network', 'news', 'contact'].includes(fullHash)) {
        setActiveArticleId('');
        setActiveServiceSlug('');
        setCurrentPage(fullHash);
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
    const target = new URL(pagePaths[page] || '/', window.location.origin);
    if (page === 'contact' && activeServiceSlug) {
      const selected = activeServiceSlug === 'fcl' || activeServiceSlug === 'freight-laut-fcl' ? 'fcl' : activeServiceSlug === 'air-shipment' || activeServiceSlug === 'freight-udara' ? 'air' : activeServiceSlug === 'ppjk' || activeServiceSlug === 'ppjk-customs-clearance' ? 'ppjk' : activeServiceSlug === 'undername-impor' || activeServiceSlug === 'undername-impor-pi' ? 'undername' : '';
      if (selected) {
        const context = quoteContext(selected);
        target.searchParams.set('service', selected);
        target.searchParams.set('direction', selected === 'undername' ? 'impor' : context.direction);
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
    setSelectedServiceForQuote(serviceName);
    navigateTo('calculator');
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

  useEffect(() => {
    if (isOperatorPage || typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.getElementById('public-content');
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
    const register = () => root.querySelectorAll('section:not(.scroll-reveal):not([data-reveal="custom"])').forEach((section) => {
      section.classList.add('scroll-reveal');
      if (section.getBoundingClientRect().top < window.innerHeight * 0.92) {
        section.classList.add('scroll-reveal-visible');
      } else {
        observer.observe(section);
      }
    });
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(root, { childList: true, subtree: true });
    return () => { mutations.disconnect(); observer.disconnect(); };
  }, [currentPage, isOperatorPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5f1] text-[#12363a] font-sans">
      <Toaster position="bottom-right" richColors closeButton />
      {!isOperatorPage && <a href="#public-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[70] focus:bg-white focus:px-4 focus:py-3">Lewati navigasi</a>}

      {!isOperatorPage && (
        <Navbar 
          currentTab={currentPage} 
          onNavigate={navigateTo} 
          currentLang={currentLang} 
          onSelectLang={handleLanguageChange}
        />
      )}

      <main id="public-content" className="flex-grow">
        <div key={currentPage} className="page-transition">
        <Suspense fallback={<PageFallback />}>
        {currentPage === 'operator' && (
          <OperatorAdmin onNavigate={navigateTo} />
        )}

        {currentPage === 'services' && (
          <div className="pt-24">
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

        {currentPage === 'home' && (
          <>
            <Hero onNavigate={navigateTo} onOpenService={handleOpenService} currentLang={currentLang} />
            <HomeNetworks />
            <ServicesCarousel onSelectService={handleSelectService} onOpenService={handleOpenService} currentLang={currentLang} />
            <HomeClients />
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
