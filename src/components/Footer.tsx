import React from 'react';
import { ArrowRight, Mail, MapPin, PackageSearch, PhoneCall } from 'lucide-react';
import { Language } from '../types/freight';
import { getStoredBranding, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';

export interface FooterProps {
  onNavigate?: (page: string) => void;
  currentLang?: Language;
}

const whatsAppNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return digits.startsWith('0') ? '62' + digits.slice(1) : digits;
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [brandData, setBrandData] = React.useState(getStoredBranding());

  React.useEffect(() => {
    const reload = () => setBrandData(getStoredBranding());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const nav = (page: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      event.preventDefault();
      onNavigate(page);
    }
  };

  const navLinks = [
    ['services', 'Layanan'], ['tracking', 'Shipment Tracking'], ['calculator', 'Kalkulator'],
    ['network', 'Rute & Jadwal'], ['news', 'Berita'], ['contact', 'Kontak']
  ];

  return (
    <footer className="border-t border-white/15 bg-[#082f34] text-slate-300">
      <div className="page-shell">
        <div className="flex flex-col gap-6 border-b border-white/15 py-9 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Status pengiriman</p>
            <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">Temukan shipment dari satu nomor referensi.</h2>
          </div>
          <a href="#tracking" onClick={(event) => nav('tracking', event)} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-cyan-300 px-5 text-sm font-bold text-white hover:bg-white/10"><PackageSearch className="h-4 w-4" />Lacak shipment<ArrowRight className="h-4 w-4" /></a>
        </div>

        <div className="grid gap-10 py-11 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <img src="/logos/gaek-full.svg" alt="GAEKS" className="h-8 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Koordinasi freight, kepabeanan, dan pengiriman darat untuk kargo bisnis.</p>
            <div className="mt-5 grid gap-1 text-sm">
              <a href={'https://wa.me/' + whatsAppNumber(brandData.whatsappNumber || '6285608561745')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 hover:text-cyan-300"><PhoneCall className="h-4 w-4 text-cyan-300" />{brandData.whatsappDisplay || '+62 856 0856 1745'}</a>
              <a href={'mailto:' + (brandData.salesEmail || 'Sales01@gaeks.com')} className="inline-flex min-h-11 items-center gap-3 hover:text-cyan-300"><Mail className="h-4 w-4 text-cyan-300" />{brandData.salesEmail || 'Sales01@gaeks.com'}</a>
            </div>
          </div>

          <nav aria-label="Navigasi footer">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Jelajahi</p>
            <div className="mt-3 grid grid-cols-2 gap-x-6">
              {navLinks.map(([page, label]) => <a key={page} href={'#' + page} onClick={(event) => nav(page, event)} className="inline-flex min-h-11 items-center text-sm hover:text-cyan-300">{label}</a>)}
            </div>
          </nav>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Basis operasional</p>
            <div className="mt-4 flex gap-3 text-sm leading-6 text-slate-400">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
              <span>{brandData.companyAddress || 'Tanjung Priok, Jakarta & Banten, Indonesia'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} GAEKS · Global Andalan Ekspress</span>
          <a href="https://gdp.gaeks.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-slate-400 hover:text-cyan-300">Gaeks Digital Product<ArrowRight className="h-3.5 w-3.5" /></a>
        </div>
      </div>
    </footer>
  );
};
