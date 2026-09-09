// filepath: /src/components/Navbar.tsx
import React, { useState } from 'react';
import { Ship, Menu, X, PhoneCall, Globe } from 'lucide-react';
import { toast } from 'sonner';
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

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(10); } catch (e) {}
    }
  };

  const handleNavClick = (tab: string) => {
    triggerHaptic();
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: Language) => {
    triggerHaptic();
    onSelectLang(lang);
    setLangMenuOpen(false);

    const langCode = lang === 'zh' ? 'zh-CN' : lang;
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }

    const langName = lang === 'id' ? 'Bahasa Indonesia' : lang === 'en' ? 'English (US)' : '中文 (简体)';
    toast.success(`Bahasa diubah: ${langName}`, {
      description: 'Seluruh konten dan formulir telah diperbarui secara real-time.'
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl saturate-180 border-b border-slate-200/60 text-slate-900 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Subtitle */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center space-x-3 group text-left active:scale-[0.98] transition-transform duration-200"
        >
          <div className="bg-gradient-to-tr from-blue-700 to-sky-500 p-2.5 rounded-2xl shadow-md shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/30">
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
          {(['home', 'services', 'calculator', 'network', 'news', 'contact'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => handleNavClick(tab)} 
              className={`transition-all duration-200 hover:text-blue-600 active:scale-95 ${
                currentTab === tab ? 'text-blue-700 font-black' : ''
              }`}
            >
              {getTranslation(currentLang, UI_TEXT.nav[tab])}
            </button>
          ))}

          {/* Real-time Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200/80 text-xs font-bold text-slate-800 hover:border-blue-500 active:scale-95 transition-all shadow-sm"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentLang === 'id' ? '🇮🇩 ID' : currentLang === 'en' ? '🇬🇧 EN' : '🇨🇳 中文'}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 text-xs font-medium animate-in fade-in zoom-in-95 duration-200">
                <button onClick={() => handleLanguageChange('id')} className="w-full text-left px-4 py-2 hover:bg-blue-50 text-slate-800 flex items-center space-x-2.5 transition-colors"><span>🇮🇩</span><span>Bahasa ID</span></button>
                <button onClick={() => handleLanguageChange('en')} className="w-full text-left px-4 py-2 hover:bg-blue-50 text-slate-800 flex items-center space-x-2.5 transition-colors"><span>🇬🇧</span><span>English (EN)</span></button>
                <button onClick={() => handleLanguageChange('zh')} className="w-full text-left px-4 py-2 hover:bg-blue-50 text-slate-800 flex items-center space-x-2.5 transition-colors"><span>🇨🇳</span><span>中文 (简体)</span></button>
              </div>
            )}
          </div>

          <a 
            href="https://wa.me/6285608561745?text=Halo%20Gaek%20Freight,%20saya%20ingin%20konsultasi%20kargo."
            target="_blank"
            rel="noopener noreferrer"
            onClick={triggerHaptic}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all duration-200"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0856-0856-1745</span>
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={() => handleLanguageChange(currentLang === 'id' ? 'en' : currentLang === 'en' ? 'zh' : 'id')}
            className="px-2.5 py-1 bg-slate-100 rounded-xl text-[11px] font-bold text-blue-700 border border-slate-200 active:scale-95 transition-all"
          >
            {currentLang.toUpperCase()}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600 hover:text-slate-900 active:scale-95 transition-all">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-6 py-6 space-y-4 text-left shadow-2xl animate-in slide-in-from-top duration-200">
          {(['home', 'services', 'calculator', 'network', 'news', 'contact'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => handleNavClick(tab)} 
              className="block w-full text-left text-sm font-bold text-slate-800 uppercase"
            >
              {getTranslation(currentLang, UI_TEXT.nav[tab])}
            </button>
          ))}
          <a 
            href="https://wa.me/6285608561745" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-center py-3 bg-blue-600 text-white font-bold rounded-xl text-xs active:scale-95 transition-all shadow-md shadow-blue-500/20"
          >
            WhatsApp 0856-0856-1745
          </a>
        </div>
      )}
    </header>
  );
};
