// filepath: /src/App.tsx
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { SmartCalculator } from './components/SmartCalculator';
import { InteractiveMap } from './components/InteractiveMap';
import { ContactPage } from './components/ContactPage';
import { StatsNetwork } from './components/StatsNetwork';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'services' | 'calculator' | 'network' | 'contact'>('home');
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForQuote(serviceTitle);
    setCurrentTab('calculator');
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-surface text-slate-800">
      <Navbar currentTab={currentTab} onNavigate={setCurrentTab} />

      <main className="flex-grow">
        {currentTab === 'contact' ? (
          <ContactPage />
        ) : (
          <>
            <Hero />
            <ServicesCarousel onSelectService={handleSelectService} />
            <SmartCalculator prefillService={selectedServiceForQuote} />
            <InteractiveMap />
            <StatsNetwork />
          </>
        )}
      </main>

      <Footer onNavigate={setCurrentTab} />
    </div>
  );
};

export default App;
