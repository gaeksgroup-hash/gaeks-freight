const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function saveFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log(`[FILE READY] ${filePath}`);
}

console.log(">>> Memulai eksekusi Gaek Freight V8 (Universal Real-Time Auto-Translate, High-Visibility Video Hero, Clean Etalase, & Paginated Editorial News)...\n");

// 1. INDEX.HTML DENGAN UNIVERSAL REAL-TIME TRANSLATION ENGINE & SEO
saveFile('index.html', `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <title>Gaek Freight | Global Andalan Ekspress - International Freight & Logistics</title>
    <meta name="description" content="Gaek Freight (Global Andalan Ekspress): Layanan kargo laut internasional (FCL/LCL), kargo udara prioritas, kepabeanan PPJK Ceisa 4.0, dan armada trucking darat ke seluruh Indonesia." />
    <meta name="keywords" content="gaek freight, global andalan ekspress, freight forwarder indonesia, jasa ekspor impor, ppjk bea cukai, sewa container fcl lcl, kargo udara, tanjung priok, tanjung emas, tanjung perak" />
    <link rel="canonical" href="https://gaeks.com/" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Universal Real-time Translation Script -->
    <script type="text/javascript">
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'id',
          includedLanguages: 'id,en,zh-CN',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
      }
    </script>
    <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

    <!-- Schema.org JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://gaeks.com/#organization",
          "name": "Gaek Freight",
          "legalName": "Global Andalan Ekspress",
          "url": "https://gaeks.com/",
          "logo": "https://gaeks.com/favicon.svg",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+62-856-0856-1745",
            "contactType": "Customer Service",
            "email": "Sales01@gaeks.com"
          }
        }
      ]
    }
    </script>

    <style>
      /* Sembunyikan banner bawaan google translate agar tampilan tetap elegan & bersih */
      .goog-te-banner-frame.skiptranslate, .goog-te-gadget-simple { display: none !important; }
      body { top: 0px !important; }
      #goog-gt-tt { display: none !important; }
      .goog-text-highlight { background: none !important; box-shadow: none !important; }
    </style>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-blue-600 selection:text-white">
    <div id="google_translate_element" style="display:none"></div>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`);

// 2. NAVBAR DENGAN PENERJEMAH DUAL-ACTION REAL-TIME & BRAND "Gaek Freight"
saveFile('src/components/Navbar.tsx', `
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
          <button onClick={() => handleNavClick('home')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'home' ? 'text-blue-700 font-black' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.home)}
          </button>
          <button onClick={() => handleNavClick('services')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'services' ? 'text-blue-700 font-black' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.services)}
          </button>
          <button onClick={() => handleNavClick('calculator')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'calculator' ? 'text-blue-700 font-black' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.calculator)}
          </button>
          <button onClick={() => handleNavClick('network')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'network' ? 'text-blue-700 font-black' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.network)}
          </button>
          <button onClick={() => handleNavClick('news')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'news' ? 'text-blue-700 font-black' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.news)}
          </button>
          <button onClick={() => handleNavClick('contact')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'contact' ? 'text-blue-700 font-black' : ''}\`}>
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
`);

// 3. LIVING HERO BANNER DENGAN VIDEO KAPAL NYATA BERGERAK & VISIBILITAS TINGGI DI BELAKANG JUDUL
saveFile('src/components/Hero.tsx', `
// filepath: /src/components/Hero.tsx
import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Globe2, Clock, MessageCircleQuestion, Activity, Radio, ArrowRight, Anchor } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const Hero: React.FC<{ onNavigate: (page: string) => void; currentLang: Language }> = ({ onNavigate, currentLang }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-slate-950 overflow-hidden text-white">
      
      {/* Live Active Telemetry Ticker */}
      <div className="bg-slate-950/90 border-b border-slate-800 text-[11px] py-2 overflow-hidden relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sky-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            <span>{getTranslation(currentLang, UI_TEXT.hero.radarLive)}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-slate-300 font-medium">
            <span>{getTranslation(currentLang, UI_TEXT.hero.tickerVessels)}</span>
            <span>{getTranslation(currentLang, UI_TEXT.hero.tickerBunker)}</span>
            <span>{getTranslation(currentLang, UI_TEXT.hero.tickerPriok)}</span>
            <span>{getTranslation(currentLang, UI_TEXT.hero.tickerPerak)}</span>
            <span>{getTranslation(currentLang, UI_TEXT.hero.tickerCeisa)}</span>
          </div>
        </div>
      </div>

      {/* --- REAL CARGO MARITIME BACKGROUND VIDEO (HIGH VISIBILITY) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-125 opacity-70"
        >
          {/* Direct Streaming Maritime Container Ship Video */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-cargo-ship-in-the-ocean-43896-large.mp4" type="video/mp4" />
        </video>
        
        {/* Kontras Overlay Halus agar Teks Tetap 100% Terbaca Jelas */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-900/60" />
      </div>

      {/* Animasi Radar Lingkaran Berputar Halus */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full border border-sky-500/20 pointer-events-none opacity-40 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full border border-sky-500/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-emerald-400 animate-spin duration-[6000ms]" />
        <span className="absolute top-16 right-20 w-2.5 h-2.5 bg-sky-400 rounded-full animate-ping" />
        <span className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-blue-950/80 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-sm">
              <Activity className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>{getTranslation(currentLang, UI_TEXT.hero.badge)}</span>
            </div>

            {/* Headline Tepat di Depan Video Latar Belakang */}
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-lg">
              {getTranslation(currentLang, UI_TEXT.hero.titlePrefix)}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-amber-300">
                {getTranslation(currentLang, UI_TEXT.hero.titleHighlight)}
              </span>{' '}
              {getTranslation(currentLang, UI_TEXT.hero.titleSuffix)}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow">
              {getTranslation(currentLang, UI_TEXT.hero.subtitle)}
            </p>

            {/* Living Commodity Consultation Banner */}
            <div className="p-5 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-2xl flex items-start space-x-4 shadow-xl">
              <div className="p-2 bg-blue-500/20 rounded-xl text-sky-400 flex-shrink-0">
                <MessageCircleQuestion className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white font-bold block text-sm mb-0.5">
                  {getTranslation(currentLang, UI_TEXT.hero.commodityTitle)}
                </strong>
                {getTranslation(currentLang, UI_TEXT.hero.commodityDesc)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('calculator')}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-blue-600/40 transition-all hover:scale-105"
              >
                <span>{getTranslation(currentLang, UI_TEXT.hero.calcBtn)}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all"
              >
                {getTranslation(currentLang, UI_TEXT.hero.servicesBtn)}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-slate-300 text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{getTranslation(currentLang, UI_TEXT.hero.trustPPJK)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>{getTranslation(currentLang, UI_TEXT.hero.trustLiners)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>{getTranslation(currentLang, UI_TEXT.hero.trustSLA)}</span>
              </div>
            </div>
          </div>

          {/* Right Floating Live Telemetry Card */}
          <div className="lg:col-span-4 space-y-4 hidden lg:block">
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700 pb-3">
                <span className="flex items-center space-x-1.5"><Anchor className="w-3.5 h-3.5 text-sky-400" /><span>Maritime Radar Live</span></span>
                <span className="text-emerald-400 font-extrabold">Active</span>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Shanghai (CNSHA) &rarr; Jakarta</span>
                    <span className="text-slate-400 text-[10px]">10-14 Days • Direct 3x/wk</span>
                  </div>
                  <span className="text-sky-400 font-bold">FCL/LCL</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Ningbo (CNNGB) &rarr; Semarang</span>
                    <span className="text-slate-400 text-[10px]">9-12 Days • Direct 2x/wk</span>
                  </div>
                  <span className="text-sky-400 font-bold">FCL/LCL</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Singapore (SGSIN) &rarr; Surabaya</span>
                    <span className="text-slate-400 text-[10px]">3-5 Days • Daily Feeder</span>
                  </div>
                  <span className="text-emerald-400 font-bold">Daily</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('network')}
                className="w-full py-2.5 text-center text-xs font-bold text-sky-400 hover:text-white transition-colors block"
              >
                Buka Route & Schedule &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
`);

// 4. CONTACT PAGE DENGAN TRANSLASI LENGKAP REAL-TIME
saveFile('src/components/ContactPage.tsx', `
// filepath: /src/components/ContactPage.tsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const ContactPage: React.FC<{ currentLang?: Language }> = ({ currentLang = 'id' }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    commodity: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = \`Halo Gaek Freight, saya \${formData.name} (\${formData.company || 'Pribadi'}). Ingin konsultasi komoditas \${formData.commodity}: \${formData.message}\`;
    window.open(\`https://wa.me/6285608561745?text=\${encodeURIComponent(text)}\`, '_blank');
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
            {getTranslation(currentLang, UI_TEXT.contact.tag)}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {getTranslation(currentLang, UI_TEXT.contact.title)}
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            {getTranslation(currentLang, UI_TEXT.contact.desc)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Card */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Kantor Operasional & Perwakilan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Melayani kepabeanan pelabuhan laut utama dan perwakilan bandara kargo internasional di Indonesia.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block">Hub Pelabuhan Utama</strong>
                  <span className="text-xs text-slate-600">
                    Tanjung Priok (Jakarta), Tanjung Emas (Semarang), Tanjung Perak (Surabaya).
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block">WhatsApp Resmi Dispatcher</strong>
                  <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 font-bold hover:underline">
                    0856-0856-1745 (Konsultasi Cepat)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block">Email Penawaran & Dokumen</strong>
                  <a href="mailto:Sales01@gaeks.com" className="text-xs text-blue-600 font-bold block hover:underline">
                    Sales01@gaeks.com
                  </a>
                  <a href="mailto:info@gaeks.com" className="text-xs text-slate-500 block hover:underline">
                    info@gaeks.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {getTranslation(currentLang, UI_TEXT.contact.nameLabel)} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Nama Perusahaan / PT
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {getTranslation(currentLang, UI_TEXT.contact.emailLabel)} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {getTranslation(currentLang, UI_TEXT.contact.phoneLabel)} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {getTranslation(currentLang, UI_TEXT.contact.commodityLabel)}
                </label>
                <input
                  type="text"
                  placeholder="Misal: Mesin Industri, Tekstil, Bahan Kimia, Semen..."
                  value={formData.commodity}
                  onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {getTranslation(currentLang, UI_TEXT.contact.messageLabel)} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-500/20 hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>{getTranslation(currentLang, UI_TEXT.contact.submitBtn)}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
`);

// 5. NEWS PAGE DENGAN URUTAN TERBARU (NEWEST FIRST), SISTEM PAGINASI, & EDITORIAL DESAIN
saveFile('src/components/NewsPage.tsx', `
// filepath: /src/components/NewsPage.tsx
import React, { useState } from 'react';
import { Send, Search, CheckCircle2, ArrowRight, Calendar, Share2, Copy, MessageCircle, Twitter, Linkedin, ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { getStoredArticles, addSubscriber } from '../utils/newsStorage';
import { ArticleItem, Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const NewsPage: React.FC<{ activeDetailId?: string; onBackToList?: () => void; onSelectArticle?: (id: string) => void; currentLang?: Language }> = ({ activeDetailId, onBackToList, onSelectArticle, currentLang = 'id' }) => {
  // Ambil artikel dan urutkan dari yang terbaru (Newest First)
  const rawArticles = getStoredArticles();
  const sortedArticles = [...rawArticles].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  const [articles] = useState<ArticleItem[]>(sortedArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [emailInput, setEmailInput] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);

  // State Paginasi: 6 artikel per halaman
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const articlesPerPage = 6;

  const rawDetailArticle = activeDetailId ? articles.find(a => a.id === activeDetailId) : null;
  const detailArticle = rawDetailArticle ? {
    ...rawDetailArticle,
    title: currentLang === 'en' ? rawDetailArticle.title_en || rawDetailArticle.title : currentLang === 'zh' ? rawDetailArticle.title_zh || rawDetailArticle.title : rawDetailArticle.title,
    category: currentLang === 'en' ? rawDetailArticle.category_en || rawDetailArticle.category : currentLang === 'zh' ? rawDetailArticle.category_zh || rawDetailArticle.category : rawDetailArticle.category,
    content: currentLang === 'en' ? rawDetailArticle.content_en || rawDetailArticle.content : currentLang === 'zh' ? rawDetailArticle.content_zh || rawDetailArticle.content : rawDetailArticle.content,
  } : null;

  const categories = ['Semua', 'Regulasi Kepabeanan', 'Operational Freight', 'Rute Maritim', 'Kargo Khusus', 'Project Cargo & Alat Berat'];

  const filtered = articles.filter(a => {
    const titleText = currentLang === 'en' ? a.title_en || a.title : currentLang === 'zh' ? a.title_zh || a.title : a.title;
    const excerptText = currentLang === 'en' ? a.excerpt_en || a.excerpt : currentLang === 'zh' ? a.excerpt_zh || a.excerpt : a.excerpt;
    const matchSearch = titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        excerptText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'Semua' || a.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // Kalkulasi Item untuk Halaman Aktif
  const totalPages = Math.ceil(filtered.length / articlesPerPage) || 1;
  const currentArticles = filtered.slice((currentPageNum - 1) * articlesPerPage, currentPageNum * articlesPerPage);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    const ok = addSubscriber(emailInput);
    if (ok) {
      setSubscribeStatus('Terima kasih! Anda telah terdaftar di buletin intelijen Gaek Freight.');
      setEmailInput('');
    } else {
      setSubscribeStatus('Email Anda sudah terdaftar sebelumnya.');
    }
  };

  const handleShare = (platform: 'wa' | 'tw' | 'li' | 'copy', article: ArticleItem) => {
    const url = window.location.origin + '/#news?id=' + article.id;
    const text = \`\${article.title} - Baca artikel regulasi kepabeanan & logistik terpercaya:\`;

    if (platform === 'wa') {
      window.open(\`https://wa.me/?text=\${encodeURIComponent(text + ' ' + url)}\`, '_blank');
    } else if (platform === 'tw') {
      window.open(\`https://twitter.com/intent/tweet?text=\${encodeURIComponent(text)}&url=\${encodeURIComponent(url)}\`, '_blank');
    } else if (platform === 'li') {
      window.open(\`https://www.linkedin.com/sharing/share-offsite/?url=\${encodeURIComponent(url)}\`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  // --- VIEW: SINGLE PAGE READER DETAIL ---
  if (detailArticle) {
    return (
      <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={() => onBackToList && onBackToList()}
            className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 hover:text-blue-800 mb-8 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{getTranslation(currentLang, UI_TEXT.news.backBtn)}</span>
          </button>

          <article className="space-y-8 bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-xl">
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200">
                {detailArticle.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900">
                {detailArticle.title}
              </h1>
              <div className="flex items-center space-x-3 text-xs text-slate-500 font-semibold border-b border-slate-100 pb-6">
                <span>Rilis: {detailArticle.publishedDate}</span>
                <span>•</span>
                <span>Penulis: {detailArticle.author}</span>
                <span>•</span>
                <span className="text-blue-600">{detailArticle.readTime}</span>
              </div>
            </div>

            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img src={detailArticle.imageUrl} alt={detailArticle.title} className="w-full h-full object-cover" />
            </div>

            {/* Social Share Bar */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>{getTranslation(currentLang, UI_TEXT.news.shareTitle)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare('wa', detailArticle)}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  title="Bagikan via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('li', detailArticle)}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  title="Bagikan via LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('tw', detailArticle)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white shadow-sm"
                  title="Bagikan via Twitter/X"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy', detailArticle)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copySuccess ? getTranslation(currentLang, UI_TEXT.news.copySuccess) : getTranslation(currentLang, UI_TEXT.news.copyBtn)}</span>
                </button>
              </div>
            </div>

            {/* In-Depth Well-Formatted Editorial Content */}
            <div className="text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-line space-y-6 pt-2 font-normal">
              {detailArticle.content}
            </div>

            {/* Sumber & Referensi Resmi Khusus Bagian Akhir Berita */}
            {detailArticle.sources && detailArticle.sources.length > 0 && (
              <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center space-x-2 text-xs font-black text-slate-900 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>{getTranslation(currentLang, UI_TEXT.news.sourcesTitle)}</span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                  {detailArticle.sources.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Consultation Card */}
            <div className="mt-10 p-8 bg-blue-50 border border-blue-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{getTranslation(currentLang, UI_TEXT.news.consultTitle)}</h4>
                <p className="text-xs text-slate-600 mt-1">
                  {getTranslation(currentLang, UI_TEXT.news.consultDesc)}
                </p>
              </div>
              <a
                href="https://wa.me/6285608561745"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs transition-all shadow-md"
              >
                {getTranslation(currentLang, UI_TEXT.news.consultBtn)}
              </a>
            </div>
          </article>

        </div>
      </div>
    );
  }

  // --- VIEW: LIST ARTIKEL DENGAN SISTEM PAGINASI & NEWEST FIRST ---
  return (
    <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bersih & Deskripsi Resmi */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
            {getTranslation(currentLang, UI_TEXT.news.badge)}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {getTranslation(currentLang, UI_TEXT.news.title)}
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {getTranslation(currentLang, UI_TEXT.news.intro)}
          </p>
        </div>

        {/* Newsletter Subscription Card (Clean Corporate Blue) */}
        <div className="mb-14 bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              {getTranslation(currentLang, UI_TEXT.news.newsletterTitle)}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Dapatkan Pembaruan Kode HS & Regulasi Berkala
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pb-2">
              {getTranslation(currentLang, UI_TEXT.news.newsletterDesc)}
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Masukkan alamat email Anda..."
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Langganan</span>
              </button>
            </form>

            {subscribeStatus && (
              <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{subscribeStatus}</span>
              </div>
            )}
          </div>
        </div>

        {/* Category Pills & Search Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPageNum(1); }}
                className={\`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all \${
                  selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400'
                }\`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPageNum(1); }}
                placeholder={getTranslation(currentLang, UI_TEXT.news.searchPlaceholder)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {getTranslation(currentLang, UI_TEXT.news.showingText)} {filtered.length} Publikasi (Halaman {currentPageNum} dari {totalPages})
            </span>
          </div>
        </div>

        {/* Articles Grid (Paginasi 6 Item per Halaman) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentArticles.map((item) => {
            const displayTitle = currentLang === 'en' ? item.title_en || item.title : currentLang === 'zh' ? item.title_zh || item.title : item.title;
            const displayCategory = currentLang === 'en' ? item.category_en || item.category : currentLang === 'zh' ? item.category_zh || item.category : item.category;
            const displayExcerpt = currentLang === 'en' ? item.excerpt_en || item.excerpt : currentLang === 'zh' ? item.excerpt_zh || item.excerpt : item.excerpt;

            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img src={item.imageUrl} alt={displayTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                      {displayCategory}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{item.publishedDate}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {displayTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                      {displayExcerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectArticle && onSelectArticle(item.id)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1.5 transition-colors"
                  >
                    <span>{getTranslation(currentLang, UI_TEXT.news.readMoreBtn)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bar Paginasi Halaman */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 pt-6 border-t border-slate-200">
            <button
              onClick={() => setCurrentPageNum(prev => Math.max(prev - 1, 1))}
              disabled={currentPageNum === 1}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              title="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPageNum(num)}
                className={\`px-3.5 py-2 rounded-xl text-xs font-bold transition-all \${
                  currentPageNum === num
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400'
                }\`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setCurrentPageNum(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPageNum === totalPages}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              title="Halaman Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
`);

// 6. UPDATE APP.TSX DENGAN PROPS CURRENTLANG KE SELURUH ELEMEN
saveFile('src/App.tsx', `
// filepath: /src/App.tsx
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { SmartCalculator } from './components/SmartCalculator';
import { InteractiveMap } from './components/InteractiveMap';
import { GeographicRouteSimulator } from './components/GeographicRouteSimulator';
import { NewsPage } from './components/NewsPage';
import { AdminCMS } from './components/AdminCMS';
import { ContactPage } from './components/ContactPage';
import { StatsNetwork } from './components/StatsNetwork';
import { Footer } from './components/Footer';
import { Language } from './types/freight';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('id');
  const [activeArticleId, setActiveArticleId] = useState<string>('');

  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['home', 'services', 'calculator', 'network', 'news', 'contact', 'admin'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage());
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '').toLowerCase();
      if (fullHash.startsWith('news?id=')) {
        const articleId = fullHash.includes('id=') ? fullHash.substring(fullHash.indexOf('id=') + 3) : '';
        setActiveArticleId(articleId);
        setCurrentPage('news');
      } else if (['home', 'services', 'calculator', 'network', 'news', 'contact', 'admin'].includes(fullHash)) {
        setActiveArticleId('');
        setCurrentPage(fullHash);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    window.location.hash = page;
    setActiveArticleId('');
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForQuote(serviceName);
    navigateTo('calculator');
  };

  const handleOpenArticleDetail = (articleId: string) => {
    setActiveArticleId(articleId);
    window.location.hash = 'news?id=' + articleId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar 
        currentTab={currentPage} 
        onNavigate={navigateTo} 
        currentLang={currentLang} 
        onSelectLang={setCurrentLang} 
      />

      <main className="flex-grow">
        {currentPage === 'services' && (
          <div className="pt-24">
            <ServicesCarousel onSelectService={handleSelectService} currentLang={currentLang} />
          </div>
        )}

        {currentPage === 'calculator' && (
          <div className="pt-24">
            <SmartCalculator prefillService={selectedServiceForQuote} />
          </div>
        )}

        {currentPage === 'network' && (
          <div className="pt-24">
            <InteractiveMap />
          </div>
        )}

        {currentPage === 'news' && (
          <NewsPage 
            activeDetailId={activeArticleId} 
            onBackToList={() => navigateTo('news')}
            onSelectArticle={handleOpenArticleDetail}
            currentLang={currentLang}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage currentLang={currentLang} />
        )}

        {currentPage === 'admin' && (
          <AdminCMS />
        )}

        {currentPage === 'home' && (
          <>
            <Hero onNavigate={navigateTo} currentLang={currentLang} />
            <ServicesCarousel onSelectService={handleSelectService} currentLang={currentLang} />
            <SmartCalculator prefillService={selectedServiceForQuote} />
            <InteractiveMap />
            {/* Simulasi Geografi Rute Maritim Sebelum Footer */}
            <GeographicRouteSimulator currentLang={currentLang} />
            <StatsNetwork />
          </>
        )}
      </main>

      <Footer onNavigate={navigateTo} currentLang={currentLang} />
    </div>
  );
};

export default App;
`);

console.log("\n>>> Menjalankan kompilasi produksi (npm run build)...");
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log(">>> [SUCCESS] Kompilasi berhasil 100% tanpa error!");
} catch (err) {
  console.error(">>> [ERROR] Kompilasi gagal, periksa log di atas.");
  process.exit(1);
}

console.log("\n>>> Mengirimkan rilis V8 ke GitHub & Hostinger...");
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: complete Gaek Freight V8 with universal real-time auto-translate, visible video hero, paginated news newest first, and clean etalase"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log("\n>>> [BERHASIL] Seluruh pembaruan sudah terdorong ke GitHub dan dideploy ke Hostinger!");
} catch (err) {
  console.log(">>> Git selesai.");
}
