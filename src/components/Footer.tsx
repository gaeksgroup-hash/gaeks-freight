import React from 'react';
import { Mail, PhoneCall } from 'lucide-react';
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

  return (
    <footer className="border-t border-white/15 bg-[#082f34] text-slate-300">
      <div className="page-shell py-12">
        <div className="grid gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <img src="/logos/gaek-symbol.png?v=7" alt="GAEKS" className="h-8 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">Koordinasi freight, kepabeanan, dan pengiriman darat untuk kargo bisnis.</p>
            <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:gap-6">
              <a href={'https://wa.me/' + whatsAppNumber(brandData.whatsappNumber || '6285608561745')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-cyan-300"><PhoneCall className="h-4 w-4" />{brandData.whatsappDisplay || '+62 856 0856 1745'}</a>
              <a href={'mailto:' + (brandData.salesEmail || 'Sales01@gaeks.com')} className="inline-flex min-h-11 items-center gap-2 hover:text-cyan-300"><Mail className="h-4 w-4" />{brandData.salesEmail || 'Sales01@gaeks.com'}</a>
            </div>
          </div>
          <nav aria-label="Navigasi footer" className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm sm:grid-cols-3">
            {[
              ['services', 'Layanan'], ['calculator', 'Kalkulator'], ['network', 'Rute'],
              ['news', 'Berita'], ['contact', 'Kontak'], ['home', 'Beranda']
            ].map(([page, label]) => <a key={page} href={'#' + page} onClick={(e) => nav(page, e)} className="inline-flex min-h-11 items-center hover:text-cyan-300">{label}</a>)}
          </nav>
        </div>
        <div className="mt-10 border-t border-white/15 pt-6 text-xs text-slate-500">© {new Date().getFullYear()} GAEKS · Global Andalan Ekspress</div>
      </div>
    </footer>
  );
};
