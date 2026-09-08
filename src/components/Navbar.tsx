import React, { useState } from 'react';
import { Ship, Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-navy/90 backdrop-blur-xl border-b border-slate-800/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 group text-left">
          <div className="bg-gradient-to-tr from-brand-orange to-amber-500 p-2.5 rounded-xl shadow-lg shadow-brand-orange/20 transition-transform group-hover:scale-105">
            <Ship className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider block leading-none font-sans">GAEKS GROUP</span>
            <span className="text-[10px] text-brand-orange tracking-widest uppercase font-bold">FREIGHT FORWARDING & LOGISTICS</span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-slate-300">
          <button onClick={() => handleNavClick('home')} className={`transition-colors hover:text-brand-orange ${currentTab === 'home' ? 'text-brand-orange' : ''}`}>Home</button>
          <button onClick={() => handleNavClick('services')} className={`transition-colors hover:text-brand-orange ${currentTab === 'services' ? 'text-brand-orange' : ''}`}>7 Layanan Kargo</button>
          <button onClick={() => handleNavClick('calculator')} className={`transition-colors hover:text-brand-orange ${currentTab === 'calculator' ? 'text-brand-orange' : ''}`}>Kalkulator & Port</button>
          <button onClick={() => handleNavClick('network')} className={`transition-colors hover:text-brand-orange ${currentTab === 'network' ? 'text-brand-orange' : ''}`}>Peta Rute Global</button>
          <button onClick={() => handleNavClick('news')} className={`transition-colors hover:text-brand-orange ${currentTab === 'news' ? 'text-brand-orange' : ''}`}>Berita & Regulasi</button>
          <button onClick={() => handleNavClick('contact')} className={`transition-colors hover:text-brand-orange ${currentTab === 'contact' ? 'text-brand-orange' : ''}`}>Contact Us</button>

          <a 
            href="https://wa.me/6285608561745?text=Halo%20GAEKS%20GROUP,%20saya%20ingin%20konsultasi%20kargo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-emerald-900/40 hover:scale-105"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0856-0856-1745</span>
          </a>
        </nav>

        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-navy border-b border-slate-800 px-6 py-6 space-y-4 text-left">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Home</button>
          <button onClick={() => handleNavClick('services')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">7 Layanan Kargo</button>
          <button onClick={() => handleNavClick('calculator')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Kalkulator CBM & Port</button>
          <button onClick={() => handleNavClick('network')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Peta Rute Global</button>
          <button onClick={() => handleNavClick('news')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Berita & Regulasi</button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Contact Us</button>
          <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="block text-center py-3 bg-emerald-600 rounded-xl text-white font-bold text-xs">
            Hubungi WhatsApp 0856-0856-1745
          </a>
        </div>
      )}
    </header>
  );
};
