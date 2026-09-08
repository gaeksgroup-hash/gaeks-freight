// filepath: /src/components/Navbar.tsx
import React, { useState } from 'react';
import { Ship, Menu, X, ArrowRight, ExternalLink, PhoneCall } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'services' | 'calculator' | 'network' | 'contact';
  onNavigate: (tab: 'home' | 'services' | 'calculator' | 'network' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'services' | 'calculator' | 'network' | 'contact') => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold text-slate-300">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`transition-colors hover:text-brand-orange ${currentTab === 'home' ? 'text-brand-orange' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('services')} 
            className={`transition-colors hover:text-brand-orange ${currentTab === 'services' ? 'text-brand-orange' : ''}`}
          >
            7 Layanan Kargo
          </button>
          <button 
            onClick={() => handleNavClick('calculator')} 
            className={`transition-colors hover:text-brand-orange ${currentTab === 'calculator' ? 'text-brand-orange' : ''}`}
          >
            Kalkulator & Port
          </button>
          <button 
            onClick={() => handleNavClick('network')} 
            className={`transition-colors hover:text-brand-orange ${currentTab === 'network' ? 'text-brand-orange' : ''}`}
          >
            Peta Rute Global
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className={`transition-colors hover:text-brand-orange ${currentTab === 'contact' ? 'text-brand-orange' : ''}`}
          >
            Contact Us
          </button>
          
          {/* External Subdomain link to DGP */}
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
            className="flex items-center space-x-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-brand-orange/20"
          >
            <PhoneCall className="w-4 h-4" />
            <span>0856-0856-1745</span>
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-navy border-b border-brand-darkBlue px-6 py-6 space-y-4 text-left">
          <button 
            onClick={() => handleNavClick('home')} 
            className="block w-full text-left text-base font-semibold text-slate-200 hover:text-brand-orange"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('services')} 
            className="block w-full text-left text-base font-semibold text-slate-200 hover:text-brand-orange"
          >
            7 Layanan Kargo
          </button>
          <button 
            onClick={() => handleNavClick('calculator')} 
            className="block w-full text-left text-base font-semibold text-slate-200 hover:text-brand-orange"
          >
            Kalkulator & Port Terdekat
          </button>
          <button 
            onClick={() => handleNavClick('network')} 
            className="block w-full text-left text-base font-semibold text-slate-200 hover:text-brand-orange"
          >
            Peta Rute Global
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className="block w-full text-left text-base font-semibold text-slate-200 hover:text-brand-orange"
          >
            Contact Us
          </button>
          <a 
            href="https://wa.me/6285608561745" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between text-sm py-2 px-3 bg-emerald-700 rounded-lg text-white font-bold"
          >
            <span>Hubungi WhatsApp Langsung</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
