import React, { useState } from 'react';
import { Ship, Menu, X, PhoneCall, Globe } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, currentLang, onSelectLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-obsidian/90 backdrop-blur-xl border-b border-brand-border text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 group text-left">
          <div className="bg-gradient-to-tr from-brand-cyan to-brand-emerald p-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
            <Ship className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight block leading-none text-white">Gaek Freight</span>
            <span className="text-[10px] text-brand-cyan tracking-widest uppercase font-extrabold">GLOBAL LOGISTICS</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider text-slate-300">
          <button onClick={() => handleNavClick('home')} className={`transition-colors hover:text-brand-cyan ${currentTab === 'home' ? 'text-brand-cyan font-extrabold' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.home)}
          </button>
          <button onClick={() => handleNavClick('services')} className={`transition-colors hover:text-brand-cyan ${currentTab === 'services' ? 'text-brand-cyan font-extrabold' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.services)}
          </button>
          <button onClick={() => handleNavClick('calculator')} className={`transition-colors hover:text-brand-cyan ${currentTab === 'calculator' ? 'text-brand-cyan font-extrabold' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.calculator)}
          </button>
          <button onClick={() => handleNavClick('network')} className={`transition-colors hover:text-brand-cyan ${currentTab === 'network' ? 'text-brand-cyan font-extrabold' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.network)}
          </button>
          <button onClick={() => handleNavClick('news')} className={`transition-colors hover:text-brand-cyan ${currentTab === 'news' ? 'text-brand-cyan font-extrabold' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.news)}
          </button>
          <button onClick={() => handleNavClick('contact')} className={`transition-colors hover:text-brand-cyan ${currentTab === 'contact' ? 'text-brand-cyan font-extrabold' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.contact)}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-xs font-bold text-slate-200 hover:border-brand-cyan transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-brand-cyan" />
              <span>{currentLang === 'id' ? '🇮🇩 ID' : currentLang === 'en' ? '🇬🇧 EN' : '🇨🇳 中文'}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-brand-card border border-brand-border rounded-xl shadow-2xl py-1 z-50 text-xs">
                <button onClick={() => { onSelectLang('id'); setLangMenuOpen(false); }} className="w-full text-left px-3 py-1.5 hover:bg-brand-surface text-slate-200">🇮🇩 Bahasa</button>
                <button onClick={() => { onSelectLang('en'); setLangMenuOpen(false); }} className="w-full text-left px-3 py-1.5 hover:bg-brand-surface text-slate-200">🇬🇧 English</button>
                <button onClick={() => { onSelectLang('zh'); setLangMenuOpen(false); }} className="w-full text-left px-3 py-1.5 hover:bg-brand-surface text-slate-200">🇨🇳 中文 (简体)</button>
              </div>
            )}
          </div>

          <a 
            href="https://wa.me/6285608561745?text=Halo%20Gaek%20Freight,%20saya%20ingin%20konsultasi%20kargo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gradient-to-r from-brand-cyan to-brand-emerald hover:from-cyan-400 hover:to-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-md shadow-cyan-500/20 hover:scale-105"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0856-0856-1745</span>
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={() => onSelectLang(currentLang === 'id' ? 'en' : currentLang === 'en' ? 'zh' : 'id')}
            className="px-2 py-1 bg-brand-surface rounded text-[11px] font-bold text-brand-cyan border border-brand-border"
          >
            {currentLang.toUpperCase()}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-obsidian border-b border-brand-border px-6 py-6 space-y-4 text-left">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Home</button>
          <button onClick={() => handleNavClick('services')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Services</button>
          <button onClick={() => handleNavClick('calculator')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Cargo Check!</button>
          <button onClick={() => handleNavClick('network')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Route & Schedule</button>
          <button onClick={() => handleNavClick('news')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Update</button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Contact Us</button>
          <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="block text-center py-3 bg-gradient-to-r from-brand-cyan to-brand-emerald text-slate-950 font-extrabold rounded-xl text-xs">
            WhatsApp 0856-0856-1745
          </a>
        </div>
      )}
    </header>
  );
};
