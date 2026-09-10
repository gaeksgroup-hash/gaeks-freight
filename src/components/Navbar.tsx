// filepath: /src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Globe } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export interface NavbarProps {
  currentTab?: string;
  onNavigate?: (page: string) => void;
  currentLang: Language;
  onSelectLang?: (lang: Language) => void;
  onLanguageChange?: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentTab = 'home',
  onNavigate,
  currentLang = 'id',
  onSelectLang,
  onLanguageChange 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLang = (lang: Language) => {
    if (onSelectLang) onSelectLang(lang);
    if (onLanguageChange) onLanguageChange(lang);
  };

  const handleNav = (page: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/85 backdrop-blur-2xl border-b border-slate-200/80 shadow-sm py-2' 
        : 'bg-white/95 backdrop-blur-xl border-b border-slate-200/50 py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo Symbol Saja (Tanpa teks duplikasi) */}
        <a 
          href="#home" 
          onClick={(e) => handleNav('home', e)}
          className="flex items-center space-x-2 group cursor-pointer" 
          aria-label="Gaek Freight Home"
        >
          <img 
            src="/logos/gaek-symbol.png?v=3" 
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/logos/logo-gaek-symbol-only.jpg';
            }}
            alt="GAEKS" 
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold text-slate-700">
          <a 
            href="#home" 
            onClick={(e) => handleNav('home', e)}
            className={`transition-colors ${currentTab === 'home' ? 'text-[#012E34] font-black' : 'hover:text-cyan-600'}`}
          >
            {getTranslation(currentLang, UI_TEXT.nav.home)}
          </a>
          <a 
            href="#services" 
            onClick={(e) => handleNav('services', e)}
            className={`transition-colors ${currentTab === 'services' ? 'text-[#012E34] font-black' : 'hover:text-cyan-600'}`}
          >
            {getTranslation(currentLang, UI_TEXT.nav.services)}
          </a>
          <a 
            href="#calculator" 
            onClick={(e) => handleNav('calculator', e)}
            className={`transition-colors ${currentTab === 'calculator' ? 'text-[#012E34] font-black' : 'hover:text-cyan-600'}`}
          >
            {getTranslation(currentLang, UI_TEXT.nav.calculator)}
          </a>
          <a 
            href="#network" 
            onClick={(e) => handleNav('network', e)}
            className={`transition-colors ${currentTab === 'network' ? 'text-[#012E34] font-black' : 'hover:text-cyan-600'}`}
          >
            {getTranslation(currentLang, UI_TEXT.nav.network)}
          </a>
          <a 
            href="#news" 
            onClick={(e) => handleNav('news', e)}
            className={`transition-colors ${currentTab === 'news' ? 'text-[#012E34] font-black' : 'hover:text-cyan-600'}`}
          >
            {getTranslation(currentLang, UI_TEXT.nav.news)}
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNav('contact', e)}
            className={`transition-colors ${currentTab === 'contact' ? 'text-[#012E34] font-black' : 'hover:text-cyan-600'}`}
          >
            {getTranslation(currentLang, UI_TEXT.nav.contact)}
          </a>
        </nav>

        {/* Selector Bahasa & Tombol Kontak */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-bold">
            <Globe className="w-3.5 h-3.5 text-cyan-600 ml-1.5" />
            <button 
              onClick={() => handleLang('id')} 
              className={`px-2 py-1 rounded-lg transition-all ${currentLang === 'id' ? 'bg-[#012E34] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              ID
            </button>
            <button 
              onClick={() => handleLang('en')} 
              className={`px-2 py-1 rounded-lg transition-all ${currentLang === 'en' ? 'bg-[#012E34] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              EN
            </button>
            <button 
              onClick={() => handleLang('zh')} 
              className={`px-2 py-1 rounded-lg transition-all ${currentLang === 'zh' ? 'bg-[#012E34] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              中文
            </button>
          </div>

          <a
            href="https://wa.me/6285608561745"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#012E34] to-cyan-600 hover:from-[#011C20] hover:to-cyan-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-cyan-950/20 active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0856-0856-1745</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#012E34] hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <a onClick={(e) => handleNav('home', e)} href="#home" className="block py-2 text-sm font-bold text-slate-800">{getTranslation(currentLang, UI_TEXT.nav.home)}</a>
          <a onClick={(e) => handleNav('services', e)} href="#services" className="block py-2 text-sm font-bold text-slate-800">{getTranslation(currentLang, UI_TEXT.nav.services)}</a>
          <a onClick={(e) => handleNav('calculator', e)} href="#calculator" className="block py-2 text-sm font-bold text-slate-800">{getTranslation(currentLang, UI_TEXT.nav.calculator)}</a>
          <a onClick={(e) => handleNav('network', e)} href="#network" className="block py-2 text-sm font-bold text-slate-800">{getTranslation(currentLang, UI_TEXT.nav.network)}</a>
          <a onClick={(e) => handleNav('news', e)} href="#news" className="block py-2 text-sm font-bold text-slate-800">{getTranslation(currentLang, UI_TEXT.nav.news)}</a>
          <a onClick={(e) => handleNav('contact', e)} href="#contact" className="block py-2 text-sm font-bold text-slate-800">{getTranslation(currentLang, UI_TEXT.nav.contact)}</a>
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500">Bahasa:</span>
            <div className="flex space-x-2 text-xs font-bold">
              <button onClick={() => handleLang('id')} className={`px-2 py-1 rounded ${currentLang === 'id' ? 'bg-[#012E34] text-white' : 'text-slate-600'}`}>ID</button>
              <button onClick={() => handleLang('en')} className={`px-2 py-1 rounded ${currentLang === 'en' ? 'bg-[#012E34] text-white' : 'text-slate-600'}`}>EN</button>
              <button onClick={() => handleLang('zh')} className={`px-2 py-1 rounded ${currentLang === 'zh' ? 'bg-[#012E34] text-white' : 'text-slate-600'}`}>中文</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
