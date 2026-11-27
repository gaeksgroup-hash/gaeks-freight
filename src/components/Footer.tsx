import React from 'react';
import { ArrowUpRight, Mail, MapPin, PackageSearch, PhoneCall } from 'lucide-react';
import { Language } from '../types/freight';
import {
  getStoredBranding,
  getStoredServices,
  getStoredSiteSettings,
  getSiteCopy,
  GAEKS_UPDATE_EVENT,
} from '../utils/adminStorage';
import { measureContactClick } from '../utils/quoteFlow';
import { customerContactTeams } from '../utils/contactDirectory';
import { SocialLinks } from './SocialLinks';
import { pagePaths } from '../utils/routes';
import { WhatsAppIcon } from './ContactActions';

export interface FooterProps {
  onNavigate?: (page: string) => void;
  currentLang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [brand, setBrand] = React.useState(getStoredBranding);
  const [settings, setSettings] = React.useState(getStoredSiteSettings);
  const [services, setServices] = React.useState(getStoredServices);

  React.useEffect(() => {
    const reload = () => {
      setBrand(getStoredBranding());
      setSettings(getStoredSiteSettings());
      setServices(getStoredServices());
    };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const nav = (page: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      onNavigate(page);
    }
  };

  const copy = getSiteCopy();
  const teams = customerContactTeams(brand.contactGroups || [], services, copy);
  const links = settings.navigation.filter((item) => item.visible && item.page !== 'home');

  return (
    <footer className="freight-footer">
      <div className="page-shell">
        <div className="footer-tracking">
          <div className="footer-tracking-copy">
            <p className="footer-kicker">{copy.footerTrackingLabel}</p>
            <h2>{settings.footerHeading}</h2>
          </div>
          <a href={pagePaths.tracking} onClick={(event) => nav('tracking', event)} className="footer-track-link">
            <span className="footer-track-link-label">
              <PackageSearch size={20} aria-hidden="true" />
              <span>{copy.footerTrackingCta}</span>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" className="footer-track-arrow" />
          </a>
        </div>

        <div className="footer-brand-bar">
          <div className="footer-identity">
            <a className="footer-logo" href="/" onClick={(event) => nav('home', event)} aria-label="GAEKS, beranda">
              <img src={brand.footerLogoUrl || brand.symbolLogoUrl} width="180" height="52" alt="GAEKS" loading="lazy" />
            </a>
            <p>{settings.footerTagline}</p>
            {settings.socialLinks.length > 0 && (
              <div className="footer-social">
                <SocialLinks links={settings.socialLinks} showLabels tone="dark" />
              </div>
            )}
          </div>

          <nav className="footer-navigation" aria-label="Navigasi footer">
            <h3>{copy.footerNavigationLabel}</h3>
            <div className="footer-nav-grid">
              {links.map(({ page, label }) => (
                <a key={page} href={pagePaths[page] || '/'} onClick={(event) => nav(page, event)}>
                  <span>{label}</span>
                  <ArrowUpRight size={14} aria-hidden="true" className="footer-nav-arrow" />
                </a>
              ))}
            </div>
          </nav>
        </div>

        <section className="footer-desks" aria-labelledby="footer-contact-heading">
          <div className="footer-desks-head">
            <h3 id="footer-contact-heading">{copy.footerContactLabel}</h3>
            <a className="footer-directory" href={pagePaths.phones} onClick={(event) => nav('phones', event)}>
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
            <span className="footer-legal-sep" aria-hidden="true" />
            <nav className="footer-legal-links" aria-label="Legal">
              <a href={pagePaths.terms} onClick={(event) => nav('terms', event)}>
                Terms of Use Website
              </a>
              <span className="footer-legal-pipe" aria-hidden="true">|</span>
              <a href={pagePaths.privacy} onClick={(event) => nav('privacy', event)}>
                Privacy Terms
              </a>
            </nav>
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
