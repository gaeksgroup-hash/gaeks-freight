// filepath: /src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Globe } from 'lucide-react';
import { Language } from '../types/freight';
import { getStoredBranding, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [brandData, setBrandData] = useState(getStoredBranding());

  useEffect(() => {
    const reload = () => setBrandData(getStoredBranding());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y > 35) setScrolled(true);
          else if (y < 10) setScrolled(false);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Memicu penerjemahan instan 100% seluruh teks di website
  const handleTriggerLanguage = (lang: Language) => {
    if (onSelectLang) onSelectLang(lang);
    if (onLanguageChange) onLanguageChange(lang);

    const targetCode = lang === 'en' ? 'en' : lang === 'zh' ? 'zh-CN' : 'id';
    document.cookie = `googtrans=/id/${targetCode}; path=/;`;
    document.cookie = `googtrans=/id/${targetCode}; path=/; domain=${window.location.hostname};`;

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = targetCode;
      select.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  const handleNav = (page: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-200 will-change-transform transform-gpu ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm' 
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => handleNav('home', e)}
          className="flex items-center space-x-2 group cursor-pointer flex-shrink-0" 
          aria-label="Gaek Freight Home"
        >
          <img 
            src={brandData.symbolLogoUrl || "/logos/gaek-symbol.png"} 
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              target.src = '/logos/gaek-symbol.svg';
            }}
            alt="GAEKS" 
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105" 
          />
        </a>

        <nav className="hidden md:flex items-center space-x-7 text-xs font-bold text-slate-700">
          <a href="#home" onClick={(e) => handleNav('home', e)} className={`transition-colors py-1 ${currentTab === 'home' ? 'text-[#012E34] font-black border-b-2 border-[#012E34]' : 'hover:text-cyan-600'}`}>Beranda</a>
          <a href="#services" onClick={(e) => handleNav('services', e)} className={`transition-colors py-1 ${currentTab === 'services' ? 'text-[#012E34] font-black border-b-2 border-[#012E34]' : 'hover:text-cyan-600'}`}>Layanan</a>
          <a href="#calculator" onClick={(e) => handleNav('calculator', e)} className={`transition-colors py-1 ${currentTab === 'calculator' ? 'text-[#012E34] font-black border-b-2 border-[#012E34]' : 'hover:text-cyan-600'}`}>Kalkulator Kargo</a>
          <a href="#network" onClick={(e) => handleNav('network', e)} className={`transition-colors py-1 ${currentTab === 'network' ? 'text-[#012E34] font-black border-b-2 border-[#012E34]' : 'hover:text-cyan-600'}`}>Rute & Jadwal</a>
          <a href="#news" onClick={(e) => handleNav('news', e)} className={`transition-colors py-1 ${currentTab === 'news' ? 'text-[#012E34] font-black border-b-2 border-[#012E34]' : 'hover:text-cyan-600'}`}>News & Updates</a>
          <a href="#contact" onClick={(e) => handleNav('contact', e)} className={`transition-colors py-1 ${currentTab === 'contact' ? 'text-[#012E34] font-black border-b-2 border-[#012E34]' : 'hover:text-cyan-600'}`}>Hubungi Kami</a>
        </nav>

        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-bold">
            <Globe className="w-3.5 h-3.5 text-cyan-600 ml-1" />
            <button 
              onClick={() => handleTriggerLanguage('id')} 
              className={`px-2 py-0.5 rounded-lg transition-all ${currentLang === 'id' ? 'bg-[#012E34] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              ID
            </button>
            <button 
              onClick={() => handleTriggerLanguage('en')} 
              className={`px-2 py-0.5 rounded-lg transition-all ${currentLang === 'en' ? 'bg-[#012E34] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              EN
            </button>
            <button 
              onClick={() => handleTriggerLanguage('zh')} 
              className={`px-2 py-0.5 rounded-lg transition-all ${currentLang === 'zh' ? 'bg-[#012E34] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              中文
            </button>
          </div>

          <a
            href={`https://wa.me/${brandData.whatsappNumber || '6285608561745'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#012E34] to-cyan-600 hover:from-[#011C20] hover:to-cyan-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{brandData.whatsappDisplay || '0856-0856-1745'}</span>
          </a>
        </div>

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
    </header>
  );
};
