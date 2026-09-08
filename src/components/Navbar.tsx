// filepath: /src/components/Navbar.tsx
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Subtitle: Global Andalan Ekspress */}
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 group text-left">
          <div className="bg-gradient-to-tr from-cyan-400 to-emerald-400 p-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
            <Ship className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight block leading-none text-white font-sans">Gaek Freight</span>
            <span className="text-[10px] text-cyan-400 tracking-widest uppercase font-extrabold block mt-0.5">
              Global Andalan Ekspress
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider text-slate-300">
          <button onClick={() => handleNavClick('home')} className={`transition-colors hover:text-cyan-400 ${currentTab === 'home' ? 'text-cyan-400 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.home)}
          </button>
          <button onClick={() => handleNavClick('services')} className={`transition-colors hover:text-cyan-400 ${currentTab === 'services' ? 'text-cyan-400 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.services)}
          </button>
          <button onClick={() => handleNavClick('calculator')} className={`transition-colors hover:text-cyan-400 ${currentTab === 'calculator' ? 'text-cyan-400 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.calculator)}
          </button>
          <button onClick={() => handleNavClick('network')} className={`transition-colors hover:text-cyan-400 ${currentTab === 'network' ? 'text-cyan-400 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.network)}
          </button>
          <button onClick={() => handleNavClick('news')} className={`transition-colors hover:text-cyan-400 ${currentTab === 'news' ? 'text-cyan-400 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.news)}
          </button>
          <button onClick={() => handleNavClick('contact')} className={`transition-colors hover:text-cyan-400 ${currentTab === 'contact' ? 'text-cyan-400 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.contact)}
          </button>

          {/* Real-time Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 hover:border-cyan-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentLang === 'id' ? '🇮🇩 ID' : currentLang === 'en' ? '🇬🇧 EN' : '🇨🇳 中文'}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 text-xs">
                <button onClick={() => { onSelectLang('id'); setLangMenuOpen(false); }} className="w-full text-left px-3.5 py-1.5 hover:bg-slate-800 text-slate-200 flex items-center space-x-2"><span>🇮🇩</span><span>Bahasa ID</span></button>
                <button onClick={() => { onSelectLang('en'); setLangMenuOpen(false); }} className="w-full text-left px-3.5 py-1.5 hover:bg-slate-800 text-slate-200 flex items-center space-x-2"><span>🇬🇧</span><span>English</span></button>
                <button onClick={() => { onSelectLang('zh'); setLangMenuOpen(false); }} className="w-full text-left px-3.5 py-1.5 hover:bg-slate-800 text-slate-200 flex items-center space-x-2"><span>🇨🇳</span><span>中文 (简体)</span></button>
              </div>
            )}
          </div>

          <a 
            href="https://wa.me/6285608561745?text=Halo%20Gaek%20Freight,%20saya%20ingin%20konsultasi%20kargo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-md shadow-cyan-500/20 hover:scale-105"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0856-0856-1745</span>
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={() => onSelectLang(currentLang === 'id' ? 'en' : currentLang === 'en' ? 'zh' : 'id')}
            className="px-2 py-1 bg-slate-900 rounded text-[11px] font-bold text-cyan-400 border border-slate-700"
          >
            {currentLang.toUpperCase()}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-6 space-y-4 text-left">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Home</button>
          <button onClick={() => handleNavClick('services')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Services</button>
          <button onClick={() => handleNavClick('calculator')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Cargo Check!</button>
          <button onClick={() => handleNavClick('network')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Route & Schedule</button>
          <button onClick={() => handleNavClick('news')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">News & Updates</button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Contact Us</button>
          <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="block text-center py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs">
            WhatsApp 0856-0856-1745
          </a>
        </div>
      )}
    </header>
  );
};
