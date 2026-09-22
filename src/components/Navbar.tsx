import React, { useEffect, useState } from 'react';
import { Menu, PhoneCall, X } from 'lucide-react';
import { Language } from '../types/freight';
import { getStoredBranding, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';

export interface NavbarProps {
  currentTab?: string;
  onNavigate?: (page: string) => void;
  currentLang: Language;
  onSelectLang?: (lang: Language) => void;
  onLanguageChange?: (lang: Language) => void;
}

const navigation = [
  { page: 'home', desktop: 'Beranda', mobile: 'Beranda' },
  { page: 'services', desktop: 'Layanan', mobile: 'Layanan' },
  { page: 'calculator', desktop: 'Kalkulator', mobile: 'Kalkulator Kargo' },
  { page: 'network', desktop: 'Rute & Jadwal', mobile: 'Rute & Jadwal' },
  { page: 'news', desktop: 'Berita', mobile: 'Berita & Pembaruan' },
  { page: 'contact', desktop: 'Kontak', mobile: 'Hubungi Kami' }
];

const languageOptions: Array<{ value: Language; label: string; short: string }> = [
  { value: 'id', label: 'Indonesia', short: 'ID' },
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'zh', label: '中文', short: '中文' }
];

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

  useEffect(() => {
    const reload = () => setBrandData(getStoredBranding());
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 block h-16 border-b border-white/10 bg-[#011c20] text-white">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={(event) => handleNav('home', event)}
          className="inline-flex min-h-11 shrink-0 items-center"
          aria-label="GAEKS Freight, ke beranda"
        >
          <img
            src="/logos/gaek-symbol.png?v=7"
            onError={(event) => {
              const target = event.currentTarget;
              target.onerror = null;
              target.src = '/logos/gaek-symbol.svg';
            }}
            alt="GAEKS"
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </a>

        <nav aria-label="Navigasi utama" className="hidden min-w-0 items-center justify-center gap-1 lg:flex">
          {navigation.map(({ page, desktop }) => (
            <a
              key={page}
              href={`#${page}`}
              onClick={(event) => handleNav(page, event)}
              aria-current={currentTab === page ? 'page' : undefined}
              className={`inline-flex min-h-11 items-center whitespace-nowrap border-b-2 px-2 text-sm font-medium transition-colors ${
                currentTab === page
                  ? 'border-cyan-400 text-white'
                  : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              {desktop}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <label htmlFor="desktop-language" className="sr-only">Pilih bahasa</label>
          <select
            id="desktop-language"
            value={currentLang}
            onChange={(event) => handleTriggerLanguage(event.target.value as Language)}
            className="min-h-11 cursor-pointer rounded-md border border-white/20 bg-[#011c20] px-2 text-sm text-white"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.short}</option>
            ))}
          </select>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-[#011417] transition-colors hover:bg-cyan-300"
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
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-white/20 px-3 text-sm font-medium lg:hidden"
        >
          <span>Menu</span>
          {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#011c20] px-4 pb-5 shadow-lg lg:hidden">
          <nav aria-label="Navigasi seluler" className="mx-auto max-w-7xl">
            <div className="py-2">
              {navigation.map(({ page, mobile }) => (
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
                  {mobile}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
              <label htmlFor="mobile-language" className="text-sm text-slate-300">Bahasa</label>
              <select
                id="mobile-language"
                value={currentLang}
                onChange={(event) => handleTriggerLanguage(event.target.value as Language)}
                className="min-h-11 w-full rounded-md border border-white/20 bg-[#011c20] px-3 text-base text-white sm:w-auto"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
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
