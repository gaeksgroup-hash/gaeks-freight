import React, { useEffect, useState } from 'react';
import { ChevronDown, Menu, PhoneCall, X } from 'lucide-react';
import { Language } from '../types/freight';
import { getStoredBranding, getStoredSiteSettings, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';

export interface NavbarProps {
  currentTab?: string;
  onNavigate?: (page: string) => void;
  currentLang: Language;
  onSelectLang?: (lang: Language) => void;
  onLanguageChange?: (lang: Language) => void;
}

const languageOptions: Array<{ value: Language; label: string; flagSrc: string }> = [
  { value: 'id', label: 'Bahasa Indonesia', flagSrc: '/flags/id.svg' },
  { value: 'en', label: 'English', flagSrc: '/flags/gb.svg' },
  { value: 'zh', label: '中文', flagSrc: '/flags/cn.svg' }
];

const LanguageMenu: React.FC<{ currentLang: Language; onSelect: (language: Language) => void; align?: 'left' | 'right' }> = ({ currentLang, onSelect, align = 'right' }) => {
  const detailsRef = React.useRef<HTMLDetailsElement>(null);
  const current = languageOptions.find((option) => option.value === currentLang) || languageOptions[0];
  return <details ref={detailsRef} className="group relative">
    <summary aria-label={`Bahasa aktif: ${current.label}`} title={current.label} className="flex min-h-11 min-w-14 cursor-pointer list-none items-center justify-center gap-1 rounded-full border border-white/20 px-2 text-xl transition-colors hover:border-cyan-300 hover:bg-white/5 [&::-webkit-details-marker]:hidden">
      <img src={current.flagSrc} alt="" width="24" height="18" className="h-[18px] w-6 rounded-[2px] object-cover shadow-sm" /><ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true" />
    </summary>
    <div className={`absolute top-[calc(100%+.5rem)] z-50 flex gap-1 rounded-xl border border-white/15 bg-[#082f34] p-1.5 shadow-xl ${align === 'right' ? 'right-0' : 'left-0'}`}>
      {languageOptions.map((option) => <button key={option.value} type="button" aria-label={option.label} title={option.label} aria-current={currentLang === option.value ? 'true' : undefined} onClick={() => { onSelect(option.value); detailsRef.current?.removeAttribute('open'); }} className={`flex h-11 w-12 items-center justify-center rounded-lg transition-colors ${currentLang === option.value ? 'bg-cyan-400/20 ring-1 ring-cyan-300/60' : 'hover:bg-white/10'}`}><img src={option.flagSrc} alt="" width="28" height="21" className="h-[21px] w-7 rounded-[2px] object-cover shadow-sm" /></button>)}
    </div>
  </details>;
};

const getWhatsAppNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return digits.startsWith('0') ? `62${digits.slice(1)}` : digits || '6285608561745';
};

export const Navbar: React.FC<NavbarProps> = ({
  currentTab = 'home',
  onNavigate,
  currentLang = 'id',
  onSelectLang,
  onLanguageChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandData, setBrandData] = useState(getStoredBranding());
  const [siteSettings, setSiteSettings] = useState(getStoredSiteSettings());

  useEffect(() => {
    const reload = () => { setBrandData(getStoredBranding()); setSiteSettings(getStoredSiteSettings()); };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileMenuOpen]);

  const handleTriggerLanguage = (lang: Language) => {
    onSelectLang?.(lang);
    onLanguageChange?.(lang);
    setMobileMenuOpen(false);

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

  const handleNav = (page: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      event.preventDefault();
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  const whatsAppUrl = `https://wa.me/${getWhatsAppNumber(brandData.whatsappNumber || '')}`;
  const navigation = siteSettings.navigation.filter((item) => item.visible);

  return (
    <header className="fixed inset-x-0 top-0 z-50 block h-16 border-b border-white/10 bg-[#011c20] text-white">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={(event) => handleNav('home', event)}
          className="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="GAEKS Freight, ke beranda"
        >
          <img
            src={brandData.navbarLogoUrl || brandData.symbolLogoUrl}
            onError={(event) => {
              const target = event.currentTarget;
              target.onerror = null;
              target.src = '/logos/gaek-symbol.svg';
            }}
            alt="GAEKS"
            className="h-9 w-auto object-contain brightness-0 invert"
          />
        </a>

        <nav aria-label="Navigasi utama" className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex">
          {navigation.map(({ page, label }) => (
            <a
              key={page}
              href={`#${page}`}
              onClick={(event) => handleNav(page, event)}
              aria-current={currentTab === page ? 'page' : undefined}
              className={`inline-flex min-h-11 items-center whitespace-nowrap border-b-2 px-2.5 text-[13px] font-semibold transition-colors ${
                currentTab === page
                  ? 'border-cyan-400 text-white'
                  : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <LanguageMenu currentLang={currentLang} onSelect={handleTriggerLanguage} />
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cyan-400 px-4 text-sm font-bold text-[#011417] transition-colors hover:bg-cyan-300"
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            Chat WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/20 px-3 text-sm font-semibold xl:hidden"
        >
          <span>Menu</span>
          {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#011c20] px-4 pb-5 shadow-lg xl:hidden">
          <nav aria-label="Navigasi seluler" className="mx-auto max-w-7xl">
            <div className="py-2">
              {navigation.map(({ page, mobileLabel }) => (
                <a
                  key={page}
                  href={`#${page}`}
                  onClick={(event) => handleNav(page, event)}
                  aria-current={currentTab === page ? 'page' : undefined}
                  className={`flex min-h-12 items-center border-l-2 px-4 text-base ${
                    currentTab === page
                      ? 'border-cyan-400 bg-white/10 font-semibold text-white'
                      : 'border-transparent text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {mobileLabel}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
              <span className="sr-only">Pilih bahasa</span>
              <LanguageMenu currentLang={currentLang} onSelect={handleTriggerLanguage} align="left" />
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-cyan-400 px-4 text-sm font-semibold text-[#011417] sm:ml-auto sm:w-auto"
              >
                <PhoneCall className="h-4 w-4" aria-hidden="true" />
                Chat WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
