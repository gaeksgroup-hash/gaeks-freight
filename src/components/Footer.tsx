import React from 'react';
import { ArrowUpRight, Mail, MapPin, PackageSearch, PhoneCall } from 'lucide-react';
import { Language } from '../types/freight';
import {
  getStoredBranding,
  getStoredCorporate,
  getStoredServices,
  getStoredSiteSettings,
  getSiteCopy,
  GAEKS_UPDATE_EVENT,
} from '../utils/adminStorage';
import { measureContactClick } from '../utils/quoteFlow';
import { customerContactTeams } from '../utils/contactDirectory';
import { SocialLinks } from './SocialLinks';
import { pagePaths, servicePath } from '../utils/routes';
import { WhatsAppIcon } from './ContactActions';

export interface FooterProps {
  onNavigate?: (page: string) => void;
  currentLang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [brand, setBrand] = React.useState(getStoredBranding);
  const [settings, setSettings] = React.useState(getStoredSiteSettings);
  const [services, setServices] = React.useState(getStoredServices);
  const [corporate, setCorporate] = React.useState(getStoredCorporate);

  React.useEffect(() => {
    const reload = () => {
      setBrand(getStoredBranding());
      setSettings(getStoredSiteSettings());
      setServices(getStoredServices());
      setCorporate(getStoredCorporate());
    };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const nav = (page: string, href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      window.history.pushState({}, '', href);
      onNavigate(page);
    }
  };

  const copy = getSiteCopy();
  const teams = customerContactTeams(brand.contactGroups || [], services, copy);

  const footerGroups = [
    {
      title: 'Layanan',
      links: [
        { label: 'Pengiriman Laut (FCL)', href: servicePath('fcl'), page: 'service' },
        { label: 'Pengiriman Laut (LCL)', href: servicePath('lcl'), page: 'service' },
        { label: 'Pengiriman Udara', href: servicePath('air-shipment'), page: 'service' },
        { label: 'Kepabeanan (PPJK)', href: servicePath('ppjk'), page: 'service' },
        { label: 'Transportasi Darat', href: servicePath('domestic-truck'), page: 'service' },
        { label: 'Perizinan Impor & Undername', href: servicePath('undername-impor'), page: 'service' },
        { label: 'Pergudangan', href: servicePath('gudang-pbm'), page: 'service' },
      ],
    },
    {
      title: 'Alat Bantu Pengiriman',
      links: [
        { label: 'Pelacakan Pengiriman', href: pagePaths.tracking, page: 'tracking' },
        { label: 'Kalkulator Kargo', href: pagePaths.calculator, page: 'calculator' },
        { label: 'Rute dan Jadwal', href: pagePaths.network, page: 'network' },
        { label: 'Tarif Pengiriman', href: pagePaths.rates, page: 'rates' },
        { label: 'Maskapai dan Perusahaan Pelayaran', href: pagePaths.carriers, page: 'carriers' },
      ],
    },
    {
      title: 'Perusahaan',
      links: [
        { label: 'Tentang Kami', href: pagePaths.about, page: 'about' },
        { label: 'Karier', href: pagePaths.careers, page: 'careers' },
        { label: 'Wawasan dan Berita', href: pagePaths.news, page: 'news' },
        { label: 'Hubungi Kami', href: pagePaths.contact, page: 'contact' },
      ],
    },
    {
      title: 'Informasi Legal',
      links: [
        { label: 'Ketentuan Penggunaan', href: pagePaths.terms, page: 'terms' },
        { label: 'Kebijakan Privasi', href: pagePaths.privacy, page: 'privacy' },
      ],
    },
  ];

  const trackingLabel = copy.footerTrackingLabel === 'Shipment tracking' ? 'Pelacakan Pengiriman' : copy.footerTrackingLabel;
  const trackingCta = copy.footerTrackingCta === 'Lacak shipment' ? 'Lacak Pengiriman' : copy.footerTrackingCta;
  const trackingHeading =
    settings.footerHeading === 'Temukan shipment dari satu nomor referensi.'
      ? 'Temukan pengiriman Anda dari satu nomor referensi.'
      : settings.footerHeading;

  return (
    <footer className="freight-footer">
      <div className="page-shell">
        <div className="footer-tracking">
          <div className="footer-tracking-copy">
            <p className="footer-kicker">{trackingLabel}</p>
            <h2>{trackingHeading}</h2>
          </div>
          <a href={pagePaths.tracking} onClick={(event) => nav('tracking', pagePaths.tracking, event)} className="footer-track-link">
            <span className="footer-track-link-label">
              <PackageSearch size={20} aria-hidden="true" />
              <span>{trackingCta}</span>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" className="footer-track-arrow" />
          </a>
        </div>

        <div className="footer-brand-bar footer-brand-bar--directory">
          <div className="footer-identity">
            <a className="footer-logo" href="/" onClick={(event) => nav('home', '/', event)} aria-label="GAEKS, beranda">
              <img src={brand.footerLogoUrl || brand.symbolLogoUrl} width="180" height="52" alt="GAEKS" loading="lazy" />
            </a>
            <p>{settings.footerTagline || corporate.brand.promise}</p>
            {settings.socialLinks.length > 0 && (
              <div className="footer-social">
                <SocialLinks links={settings.socialLinks} showLabels tone="dark" />
              </div>
            )}
          </div>

          <nav className="footer-nav-columns" aria-label="Navigasi footer">
            {footerGroups.map((group) => (
              <div key={group.title} className="footer-nav-group">
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} onClick={(event) => nav(item.page, item.href, event)}>
                        <span>{item.label}</span>
                        <ArrowUpRight size={13} aria-hidden="true" className="footer-nav-arrow" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <section className="footer-desks" aria-labelledby="footer-contact-heading">
          <div className="footer-desks-head">
            <h3 id="footer-contact-heading">{copy.footerContactLabel}</h3>
            <a className="footer-directory" href={pagePaths.phones} onClick={(event) => nav('phones', pagePaths.phones, event)}>
              <PhoneCall size={15} aria-hidden="true" />
              <span>{copy.footerPhoneDirectory}</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          <ul className="footer-teams">
            {teams.map((team) => (
              <li key={team.key} className="footer-team-row">
                <div className="footer-team-head">
                  <span className="footer-team-name">{team.title}</span>
                </div>
                <div className="footer-team-links">
                  <a
                    className="footer-wa-link"
                    href={team.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => measureContactClick('whatsapp', team.primaryServiceId)}
                    aria-label={`WhatsApp ${team.title}: ${team.whatsappDisplay}`}
                  >
                    <WhatsAppIcon size={15} />
                    <span>{team.whatsappDisplay}</span>
                  </a>
                  <a
                    className="footer-email"
                    href={team.emailUrl}
                    onClick={() => measureContactClick('email', team.primaryServiceId)}
                  >
                    <Mail size={15} aria-hidden="true" />
                    <span>{team.email}</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="footer-base">
          <div className="footer-base-meta">
            <div className="footer-address">
              <MapPin size={15} aria-hidden="true" />
              <span>{brand.companyAddress}</span>
            </div>
            <span className="footer-legal-sep" aria-hidden="true" />
            <span className="footer-copyright">
              © {new Date().getFullYear()} {copy.footerCompanyName}
            </span>
          </div>
          <a className="footer-digital" href={settings.digitalProductUrl} target="_blank" rel="noopener noreferrer">
            <span>{settings.digitalProductLabel}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
