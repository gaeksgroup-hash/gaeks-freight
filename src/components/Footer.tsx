import React from 'react';
import { ArrowUpRight, Mail, MapPin, PackageSearch, PhoneCall } from 'lucide-react';
import { Language } from '../types/freight';
import { getStoredBranding, getStoredSiteSettings, getSiteCopy, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { contactLink, currentQuoteService, measureContactClick, resolveContact } from '../utils/quoteFlow';
import { SocialLinks } from './SocialLinks';
import { pagePaths } from '../utils/routes';

export interface FooterProps { onNavigate?: (page: string) => void; currentLang?: Language; }

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [brand, setBrand] = React.useState(getStoredBranding);
  const [settings, setSettings] = React.useState(getStoredSiteSettings);
  React.useEffect(() => {
    const reload = () => { setBrand(getStoredBranding()); setSettings(getStoredSiteSettings()); };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);
  const nav = (page: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault(); onNavigate(page);
    }
  };
  const contact = resolveContact();
  const copy = getSiteCopy();
  const links = settings.navigation.filter(item => item.visible && item.page !== 'home');
  return <footer className="freight-footer">
    <div className="page-shell">
      <div className="footer-tracking">
        <div><p className="footer-kicker">{copy.footerTrackingLabel}</p><h2>{settings.footerHeading}</h2></div>
        <a href={pagePaths.tracking} onClick={event => nav('tracking', event)} className="footer-track-link"><PackageSearch size={24} aria-hidden="true" /><span>{copy.footerTrackingCta}</span><ArrowUpRight size={22} aria-hidden="true" /></a>
      </div>
      <div className="footer-main">
        <div className="footer-identity">
          <a className="footer-logo" href="/" onClick={event => nav('home', event)} aria-label="GAEKS, beranda"><img src={brand.footerLogoUrl || brand.symbolLogoUrl} width="180" height="52" alt="GAEKS" loading="lazy" /></a>
          <p>{settings.footerTagline}</p>
          {settings.socialLinks.length > 0 && <SocialLinks links={settings.socialLinks} tone="dark" />}
        </div>
        <nav className="footer-navigation" aria-label="Navigasi footer"><h3>{copy.footerNavigationLabel}</h3><div>{links.map(({ page, label }) => <a key={page} href={pagePaths[page] || '/'} onClick={event => nav(page, event)}>{label}</a>)}</div></nav>
        <div className="footer-contact"><h3>{copy.footerContactLabel}</h3><p className="footer-contact-name">{contact.name}</p>
          <a className="footer-phone" href={contactLink('whatsapp')} onClick={() => measureContactClick('whatsapp', currentQuoteService())}><PhoneCall size={19} aria-hidden="true" /><span>{contact.whatsappDisplay}</span></a>
          <a className="footer-email" href={contactLink('email')} onClick={() => measureContactClick('email', currentQuoteService())}><Mail size={18} aria-hidden="true" /><span>{contact.email}</span></a>
          <a className="footer-directory" href="/kontak/#kontak-layanan">{copy.footerDirectory}<ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="footer-base">
        <div className="footer-address"><MapPin size={17} aria-hidden="true" /><span>{brand.companyAddress}</span></div>
        <div className="footer-legal"><span>© {new Date().getFullYear()} {copy.footerCompanyName}</span><a href={settings.digitalProductUrl} target="_blank" rel="noopener noreferrer">{settings.digitalProductLabel}<ArrowUpRight size={15} aria-hidden="true" /></a></div>
      </div>
    </div>
  </footer>;
};
