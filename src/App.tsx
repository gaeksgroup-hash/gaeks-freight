// filepath: /src/App.tsx
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Calculator } from './components/Calculator';
import { StatsNetwork } from './components/StatsNetwork';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-surface text-slate-800">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Calculator />
        <StatsNetwork />
      </main>
      <Footer />
    </div>
  );
};

export default App;