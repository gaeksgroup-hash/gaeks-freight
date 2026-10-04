// filepath: /src/App.tsx
import React, { Suspense, useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { Footer } from './components/Footer';
import { HomeEditorial } from './components/HomeEditorial';
import { Language } from './types/freight';
import { getStoredBranding, getStoredSeo, GAEKS_UPDATE_EVENT, syncFromServer } from './utils/adminStorage';
import { applySiteLanguage, getPreferredLanguage, preloadTranslationEngine } from './utils/siteTranslator';

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
  const [activeArticleId, setActiveArticleId] = useState<string>('');
  const getServiceSlug = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.startsWith('/layanan/')) return path.substring('/layanan/'.length);
    if (hash.startsWith('#service=')) return hash.substring('#service='.length);
    return '';
  };

  // Sinkronisasi server Hostinger otomatis pada saat dibuka, polling berkala, dan saat tab aktif
  useEffect(() => {
    syncFromServer();

    // Polling ringan untuk pembaruan lintas perangkat; edit pada tab yang sama tetap memakai event lokal.
    const interval = setInterval(() => {
      syncFromServer();
    }, 60000);

    const onFocus = () => syncFromServer();
    window.addEventListener('focus', onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    const applyMetadata = () => {
      const seo = getStoredSeo();
      const branding = getStoredBranding();
      document.title = seo.siteTitle;
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
      setMeta('meta[name="description"]', 'content', seo.metaDescription);
      setMeta('meta[name="keywords"]', 'content', seo.keywords);
      setMeta('meta[name="robots"]', 'content', seo.robotsIndex ? 'index, follow' : 'noindex, nofollow');
      setMeta('meta[property="og:title"]', 'content', seo.ogTitle);
      setMeta('meta[property="og:description"]', 'content', seo.ogDescription);
      setMeta('meta[property="og:image"]', 'content', seo.ogImageUrl);
      let icon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
      if (!icon) { icon = document.createElement('link'); icon.rel = 'icon'; document.head.appendChild(icon); }
      icon.href = branding.faviconUrl;
    };
    applyMetadata();
    window.addEventListener(GAEKS_UPDATE_EVENT, applyMetadata);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, applyMetadata);
  }, []);

  const getInitialPage = () => {
    const path = window.location.pathname.replace('/', '').toLowerCase();
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (path === 'operator' || hash === 'operator' || hash === 'admin') {
      return 'operator';
    }
    if (getServiceSlug()) return 'service';
    if (['home', 'services', 'tracking', 'calculator', 'network', 'news', 'contact'].includes(hash)) {
      return hash;
    }
    if (path === 'tracking') return 'tracking';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage());
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');
  const [activeServiceSlug, setActiveServiceSlug] = useState<string>(getServiceSlug());

  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '').toLowerCase();
      const path = window.location.pathname.replace('/', '').toLowerCase();
      
      if (path === 'operator' || fullHash === 'operator' || fullHash === 'admin') {
        setCurrentPage('operator');
      } else if (fullHash.startsWith('service=') || path.startsWith('/layanan/')) {
        setActiveServiceSlug(getServiceSlug());
        setCurrentPage('service');
      } else if (fullHash.startsWith('news?id=')) {
        const articleId = fullHash.includes('id=') ? fullHash.substring(fullHash.indexOf('id=') + 3) : '';
        setActiveArticleId(articleId);
        setCurrentPage('news');
      } else if (path === 'tracking' && !fullHash) {
        setCurrentPage('tracking');
      } else if (['home', 'services', 'tracking', 'calculator', 'network', 'news', 'contact'].includes(fullHash)) {
        setActiveArticleId('');
        setActiveServiceSlug('');
        setCurrentPage(fullHash);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    window.location.hash = page;
    setActiveArticleId('');
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForQuote(serviceName);
    navigateTo('calculator');
  };

  const handleOpenService = (serviceId: string) => {
    setActiveServiceSlug(serviceId);
    window.location.hash = 'service=' + serviceId;
    setCurrentPage('service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticleDetail = (articleId: string) => {
    setActiveArticleId(articleId);
    window.location.hash = 'news?id=' + articleId;
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
    if (isOperatorPage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.getElementById('public-content');
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    const register = () => root.querySelectorAll('section:not(.scroll-reveal)').forEach((section) => {
      section.classList.add('scroll-reveal');
      observer.observe(section);
    });
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(root, { childList: true, subtree: true });
    return () => { mutations.disconnect(); observer.disconnect(); };
  }, [currentPage, isOperatorPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5f1] text-[#12363a] font-sans">
      <Toaster position="bottom-right" richColors closeButton />

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
            <ServicesCarousel onSelectService={handleSelectService} onOpenService={handleOpenService} currentLang={currentLang} />
          </div>
        )}

        {currentPage === 'service' && (
          <ServiceDetailPage slug={activeServiceSlug} currentLang={currentLang} onBack={() => navigateTo('services')} onQuote={handleSelectService} />
        )}

        {currentPage === 'calculator' && (
          <div className="pt-24">
            <SmartCalculator prefillService={selectedServiceForQuote} />
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
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'home' && (
          <>
            <Hero onNavigate={navigateTo} onOpenService={handleOpenService} currentLang={currentLang} />
            <ServicesCarousel onSelectService={handleSelectService} onOpenService={handleOpenService} currentLang={currentLang} />
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
