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
import { Language } from './types/freight';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('id');
  const [activeArticleId, setActiveArticleId] = useState<string>('');

  const getInitialPage = () => {
    const path = window.location.pathname.replace('/', '').toLowerCase();
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (path === 'operator' || hash === 'operator' || hash === 'admin') {
      return 'operator';
    }
    if (['home', 'services', 'calculator', 'network', 'news', 'contact'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage());
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '').toLowerCase();
      const path = window.location.pathname.replace('/', '').toLowerCase();
      
      if (path === 'operator' || fullHash === 'operator' || fullHash === 'admin') {
        setCurrentPage('operator');
      } else if (fullHash.startsWith('news?id=')) {
        const articleId = fullHash.includes('id=') ? fullHash.substring(fullHash.indexOf('id=') + 3) : '';
        setActiveArticleId(articleId);
        setCurrentPage('news');
      } else if (['home', 'services', 'calculator', 'network', 'news', 'contact'].includes(fullHash)) {
        setActiveArticleId('');
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
    window.location.hash = page;
    setActiveArticleId('');
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForQuote(serviceName);
    navigateTo('calculator');
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

      {/* Sembunyikan Navbar & Footer publik saat berada di halaman Operator Admin */}
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
            <ServicesCarousel onSelectService={handleSelectService} currentLang={currentLang} />
          </div>
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
            <ServicesCarousel onSelectService={handleSelectService} currentLang={currentLang} />
            <SmartCalculator prefillService={selectedServiceForQuote} />
            <InteractiveMap />
            <StatsNetwork />
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
