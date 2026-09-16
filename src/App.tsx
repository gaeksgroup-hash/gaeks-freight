// filepath: /src/App.tsx
import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { SmartCalculator } from './components/SmartCalculator';
import { InteractiveMap } from './components/InteractiveMap';
import { NewsPage } from './components/NewsPage';
import { OperatorAdmin } from './components/OperatorAdmin';
import { ContactPage } from './components/ContactPage';
import { StatsNetwork } from './components/StatsNetwork';
import { Footer } from './components/Footer';
import { HomeEditorial } from './components/HomeEditorial';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { Language } from './types/freight';
import { syncFromServer } from './utils/adminStorage';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('id');
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

    // Polling setiap 15 detik untuk memeriksa pembaruan server otomatis
    const interval = setInterval(() => {
      syncFromServer();
    }, 15000);

    const onFocus = () => syncFromServer();
    window.addEventListener('focus', onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const getInitialPage = () => {
    const path = window.location.pathname.replace('/', '').toLowerCase();
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (path === 'operator' || hash === 'operator' || hash === 'admin') {
      return 'operator';
    }
    if (getServiceSlug()) return 'service';
    if (['home', 'services', 'calculator', 'network', 'news', 'contact'].includes(hash)) {
      return hash;
    }
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
      } else if (['home', 'services', 'calculator', 'network', 'news', 'contact'].includes(fullHash)) {
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
    if (window.location.pathname.startsWith('/layanan/')) {
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

  return (
    <div className="min-h-screen flex flex-col bg-[#011417] text-slate-100 font-sans">
      <Toaster position="bottom-right" richColors closeButton />

      {!isOperatorPage && (
        <Navbar 
          currentTab={currentPage} 
          onNavigate={navigateTo} 
          currentLang={currentLang} 
          onSelectLang={setCurrentLang} 
        />
      )}

      <main className="flex-grow">
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
            <Hero onNavigate={navigateTo} currentLang={currentLang} />
            <ServicesCarousel onSelectService={handleSelectService} onOpenService={handleOpenService} currentLang={currentLang} />
            <SmartCalculator prefillService={selectedServiceForQuote} />
            <InteractiveMap />
            <StatsNetwork />
            <HomeEditorial
              currentLang={currentLang}
              onNavigate={navigateTo}
              onSelectArticle={handleOpenArticleDetail}
            />
          </>
        )}
      </main>

      {!isOperatorPage && (
        <Footer onNavigate={navigateTo} currentLang={currentLang} />
      )}
    </div>
  );
};

export default App;
