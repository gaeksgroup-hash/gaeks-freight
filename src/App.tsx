// filepath: /src/App.tsx
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { SmartCalculator } from './components/SmartCalculator';
import { InteractiveMap } from './components/InteractiveMap';
import { NewsPage } from './components/NewsPage';
import { AdminCMS } from './components/AdminCMS';
import { ContactPage } from './components/ContactPage';
import { StatsNetwork } from './components/StatsNetwork';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['home', 'services', 'calculator', 'network', 'news', 'contact', 'admin'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage());
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'services', 'calculator', 'network', 'news', 'contact', 'admin'].includes(page)) {
        setCurrentPage(page);
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
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForQuote(serviceName);
    navigateTo('calculator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-surface text-slate-800">
      <Navbar currentTab={currentPage} onNavigate={navigateTo} />

      <main className="flex-grow">
        {currentPage === 'services' && (
          <div className="pt-24">
            <ServicesCarousel onSelectService={handleSelectService} />
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
          <NewsPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'admin' && (
          <AdminCMS />
        )}

        {currentPage === 'home' && (
          <>
            <Hero onNavigate={navigateTo} />
            <ServicesCarousel onSelectService={handleSelectService} />
            <SmartCalculator prefillService={selectedServiceForQuote} />
            <InteractiveMap />
            <StatsNetwork />
          </>
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
