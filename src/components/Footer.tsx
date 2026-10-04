import React from 'react';
import { ArrowRight, Mail, MapPin, PackageSearch, PhoneCall } from 'lucide-react';
import { Language } from '../types/freight';
import { getStoredBranding, getStoredSiteSettings, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { SocialLinks } from './SocialLinks';

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
  const [siteSettings, setSiteSettings] = React.useState(getStoredSiteSettings());

  React.useEffect(() => {
    const reload = () => { setBrandData(getStoredBranding()); setSiteSettings(getStoredSiteSettings()); };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const nav = (page: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      event.preventDefault();
      onNavigate(page);
    }
  };

  const navLinks = siteSettings.navigation.filter((item) => item.visible && item.page !== 'home');

  return (
    <footer className="border-t border-white/15 bg-[#082f34] text-slate-300">
      <div className="page-shell">
        <div className="flex flex-col gap-4 border-b border-white/15 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Status pengiriman</p>
            <h2 className="mt-1.5 text-lg font-bold leading-tight text-white sm:text-xl">{siteSettings.footerHeading}</h2>
          </div>
          <a href="#tracking" onClick={(event) => nav('tracking', event)} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-cyan-300 px-5 text-sm font-bold text-white hover:bg-white/10"><PackageSearch className="h-4 w-4" />Lacak shipment<ArrowRight className="h-4 w-4" /></a>
        </div>

        <div className="grid gap-7 py-7 md:grid-cols-[1.15fr_1fr_.85fr] md:gap-8">
          <div>
            <img src={brandData.footerLogoUrl || brandData.symbolLogoUrl} alt="GAEKS" className="h-7 w-auto brightness-0 invert" />
            <p className="mt-3 max-w-sm text-sm leading-5 text-slate-400">{siteSettings.footerTagline}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 text-sm">
              <a href={'https://wa.me/' + whatsAppNumber(brandData.whatsappNumber || '6285608561745')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-cyan-300"><PhoneCall className="h-4 w-4 text-cyan-300" />{brandData.whatsappDisplay || '+62 856 0856 1745'}</a>
              <a href={'mailto:' + (brandData.salesEmail || 'Sales01@gaeks.com')} className="inline-flex min-h-11 items-center gap-2 hover:text-cyan-300"><Mail className="h-4 w-4 text-cyan-300" />{brandData.salesEmail || 'Sales01@gaeks.com'}</a>
            </div>
          </div>

          <nav aria-label="Navigasi footer">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Jelajahi</p>
            <div className="mt-2 grid grid-cols-2 gap-x-5">
              {navLinks.map(({ page, label }) => <a key={page} href={'#' + page} onClick={(event) => nav(page, event)} className="inline-flex min-h-11 items-center text-sm leading-none hover:text-cyan-300">{label}</a>)}
            </div>
            {siteSettings.socialLinks.length > 0 && <div className="mt-2"><SocialLinks links={siteSettings.socialLinks} tone="dark" /></div>}
          </nav>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Basis operasional</p>
            <div className="mt-3 flex gap-2.5 text-sm leading-5 text-slate-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              <span>{brandData.companyAddress || 'Tanjung Priok, Jakarta & Banten, Indonesia'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-t border-white/15 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} GAEKS · Global Andalan Ekspress</span>
          <a href={siteSettings.digitalProductUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-slate-400 hover:text-cyan-300">{siteSettings.digitalProductLabel}<ArrowRight className="h-3.5 w-3.5" /></a>
        </div>
      </div>
    </footer>
  );
};
