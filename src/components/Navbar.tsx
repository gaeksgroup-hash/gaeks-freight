// filepath: /src/components/Navbar.tsx
import React, { useState } from 'react';
import { Ship, Menu, X, ArrowRight, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-navy/95 backdrop-blur-md border-b border-brand-darkBlue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="bg-brand-orange group-hover:bg-brand-orangeHover transition-colors p-2.5 rounded-xl shadow-lg shadow-brand-orange/20">
            <Ship className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider block leading-none">GAEKS FREIGHT</span>
            <span className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">GAEKS GROUP LOGISTICS</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-300">
          <a href="#services" className="hover:text-brand-orange transition-colors">Services</a>
          <a href="#calculator" className="hover:text-brand-orange transition-colors">CBM Calculator</a>
          <a href="#coverage" className="hover:text-brand-orange transition-colors">Port Network</a>
          
          {/* Subdomain link to DGP */}
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
            href="#calculator" 
            className="flex items-center space-x-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-brand-orange/20 hover:scale-[1.02]"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-4 h-4" />
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
        <div className="md:hidden bg-brand-navy border-b border-brand-darkBlue px-6 py-6 space-y-4">
          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block text-base font-semibold text-slate-200 hover:text-brand-orange"
          >
            Services
          </a>
          <a 
            href="#calculator" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block text-base font-semibold text-slate-200 hover:text-brand-orange"
          >
            CBM & Weight Calculator
          </a>
          <a 
            href="#coverage" 
            onClick={() => setMobileMenuOpen(false)} 
            className="block text-base font-semibold text-slate-200 hover:text-brand-orange"
          >
            Port Network
          </a>
          <a 
            href="https://dgp.gaeks.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between text-sm py-2 px-3 bg-brand-darkBlue rounded-lg text-slate-300"
          >
            <span>Digital Gaeks Product (DGP)</span>
            <ExternalLink className="w-4 h-4 text-brand-orange" />
          </a>
        </div>
      )}
    </header>
  );
};