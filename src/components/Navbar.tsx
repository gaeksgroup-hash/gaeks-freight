// filepath: /src/components/Navbar.tsx
import React, { useState } from 'react';
import { Ship, Menu, X, ExternalLink, PhoneCall } from 'lucide-react';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-navy/95 backdrop-blur-md border-b border-brand-darkBlue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 group text-left">
          <div className="bg-brand-orange group-hover:bg-brand-orangeHover transition-colors p-2.5 rounded-xl shadow-lg shadow-brand-orange/20">
            <Ship className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider block leading-none">GAEKS FREIGHT</span>
            <span className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">GAEKS GROUP LOGISTICS</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-300">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`transition-colors hover:text-brand-orange ${currentTab === 'home' ? 'text-brand-orange font-bold' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('services')} 
            className={`transition-colors hover:text-brand-orange ${currentTab === 'services' ? 'text-brand-orange font-bold' : ''}`}
          >
            7 Layanan Kargo
          </button>
          <button 
            onClick={() => handleNavClick('calculator')} 
            className={`transition-colors hover:text-brand-orange ${currentTab === 'calculator' ? 'text-brand-orange font-bold' : ''}`}
          >
            Kalkulator & Port
          </button>
          <button 
            onClick={() => handleNavClick('network')} 
            className={`transition-colors hover:text-brand-orange ${currentTab === 'network' ? 'text-brand-orange font-bold' : ''}`}
          >
            Peta Rute Global
          </button>
          <button 
            onClick={() => handleNavClick('news')} 
            className={`transition-colors hover:text-brand-orange ${currentTab === 'news' ? 'text-brand-orange font-bold' : ''}`}
          >
            Berita & Regulasi
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className={`transition-colors hover:text-brand-orange ${currentTab === 'contact' ? 'text-brand-orange font-bold' : ''}`}
          >
            Contact Us
          </button>
          
          <a 
            href="https://dgp.gaeks.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-1 text-xs bg-brand-darkBlue border border-brand-steel/50 px-3 py-1.5 rounded-full hover:border-brand-orange transition-all text-slate-200"
          >
            <span>DGP Digital</span>
            <ExternalLink className="w-3 h-3 text-brand-orange" />
          </a>

          <a 
            href="https://wa.me/6285608561745?text=Halo%20GAEKS%20Freight,%20saya%20ingin%20konsultasi%20kargo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-emerald-900/40"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0856-0856-1745</span>
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-navy border-b border-brand-darkBlue px-6 py-6 space-y-4 text-left">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left font-semibold text-slate-200">Home</button>
          <button onClick={() => handleNavClick('services')} className="block w-full text-left font-semibold text-slate-200">7 Layanan Kargo</button>
          <button onClick={() => handleNavClick('calculator')} className="block w-full text-left font-semibold text-slate-200">Kalkulator CBM & Port</button>
          <button onClick={() => handleNavClick('network')} className="block w-full text-left font-semibold text-slate-200">Peta Rute Global</button>
          <button onClick={() => handleNavClick('news')} className="block w-full text-left font-semibold text-slate-200">Berita & Regulasi</button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left font-semibold text-slate-200">Contact Us</button>
          <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="block text-center py-2.5 bg-emerald-600 rounded-lg text-white font-bold text-xs">
            Hubungi WhatsApp 0856-0856-1745
          </a>
        </div>
      )}
    </header>
  );
};
