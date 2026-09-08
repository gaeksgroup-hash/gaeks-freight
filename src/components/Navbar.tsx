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

  // Memicu translasi universal real-time pada seluruh elemen DOM
  const handleLanguageChange = (lang: Language) => {
    onSelectLang(lang);
    setLangMenuOpen(false);

    const langCode = lang === 'zh' ? 'zh-CN' : lang;
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Subtitle: Global Andalan Ekspress */}
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 group text-left">
          <div className="bg-gradient-to-tr from-blue-700 to-sky-500 p-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
            <Ship className="w-6 h-6 text-white stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight block leading-none text-slate-900 font-sans">
              Gaek Freight
            </span>
            <span className="text-[10px] text-blue-700 tracking-wider uppercase font-bold block mt-0.5">
              Global Andalan Ekspress
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-slate-600">
          <button onClick={() => handleNavClick('home')} className={`transition-colors hover:text-blue-600 ${currentTab === 'home' ? 'text-blue-700 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.home)}
          </button>
          <button onClick={() => handleNavClick('services')} className={`transition-colors hover:text-blue-600 ${currentTab === 'services' ? 'text-blue-700 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.services)}
          </button>
          <button onClick={() => handleNavClick('calculator')} className={`transition-colors hover:text-blue-600 ${currentTab === 'calculator' ? 'text-blue-700 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.calculator)}
          </button>
          <button onClick={() => handleNavClick('network')} className={`transition-colors hover:text-blue-600 ${currentTab === 'network' ? 'text-blue-700 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.network)}
          </button>
          <button onClick={() => handleNavClick('news')} className={`transition-colors hover:text-blue-600 ${currentTab === 'news' ? 'text-blue-700 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.news)}
          </button>
          <button onClick={() => handleNavClick('contact')} className={`transition-colors hover:text-blue-600 ${currentTab === 'contact' ? 'text-blue-700 font-black' : ''}`}>
            {getTranslation(currentLang, UI_TEXT.nav.contact)}
          </button>

          {/* Real-time Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:border-blue-500 transition-colors shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentLang === 'id' ? '🇮🇩 ID' : currentLang === 'en' ? '🇬🇧 EN' : '🇨🇳 中文'}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 text-xs font-medium">
                <button onClick={() => handleLanguageChange('id')} className="w-full text-left px-3.5 py-2 hover:bg-blue-50 text-slate-800 flex items-center space-x-2"><span>🇮🇩</span><span>Bahasa ID</span></button>
                <button onClick={() => handleLanguageChange('en')} className="w-full text-left px-3.5 py-2 hover:bg-blue-50 text-slate-800 flex items-center space-x-2"><span>🇬🇧</span><span>English (EN)</span></button>
                <button onClick={() => handleLanguageChange('zh')} className="w-full text-left px-3.5 py-2 hover:bg-blue-50 text-slate-800 flex items-center space-x-2"><span>🇨🇳</span><span>中文 (简体)</span></button>
              </div>
            )}
          </div>

          <a 
            href="https://wa.me/6285608561745?text=Halo%20Gaek%20Freight,%20saya%20ingin%20konsultasi%20kargo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-blue-500/20 hover:scale-105"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0856-0856-1745</span>
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={() => handleLanguageChange(currentLang === 'id' ? 'en' : currentLang === 'en' ? 'zh' : 'id')}
            className="px-2 py-1 bg-slate-100 rounded text-[11px] font-bold text-blue-700 border border-slate-200"
          >
            {currentLang.toUpperCase()}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600 hover:text-slate-900">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 text-left shadow-lg">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">Home</button>
          <button onClick={() => handleNavClick('services')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">Services</button>
          <button onClick={() => handleNavClick('calculator')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">Cargo Check!</button>
          <button onClick={() => handleNavClick('network')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">Route & Schedule</button>
          <button onClick={() => handleNavClick('news')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">News & Updates</button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">Contact Us</button>
          <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="block text-center py-3 bg-blue-600 text-white font-bold rounded-xl text-xs">
            WhatsApp 0856-0856-1745
          </a>
        </div>
      )}
    </header>
  );
};
