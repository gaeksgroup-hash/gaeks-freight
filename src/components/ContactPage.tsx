import React, { useEffect, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getStoredBranding, getStoredSiteSettings, getSiteCopy, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { contactLink, measureContactClick, quoteContext, resolveContact } from '../utils/quoteFlow';
import { SocialLinks } from './SocialLinks';
import { QuoteForm } from './QuoteForm';
import { ContactDirectory } from './ContactDirectory';

export const ContactPage: React.FC = () => {
  const [branding, setBranding] = useState(getStoredBranding);
  const [siteSettings, setSiteSettings] = useState(getStoredSiteSettings);
  const [service, setService] = useState(() => quoteContext().service);
  useEffect(() => {
    const reload = () => { setBranding(getStoredBranding()); setSiteSettings(getStoredSiteSettings()); };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);
  const contact = resolveContact(service);
  const copy = getSiteCopy();
  return <main className="contact-page"><div className="page-shell">
    <div className="contact-layout">
      <header className="contact-intro"><p className="section-label">{copy.contactLabel}</p><h1>{copy.contactHeading}</h1><p className="service-muted">{copy.contactIntro}</p>
        <div className="contact-assignment" aria-live="polite"><p className="contact-team-label">{copy.contactTeamLabel}</p><h2>{contact.name}</h2><a href={contactLink('whatsapp', service)} onClick={() => measureContactClick('whatsapp', service)}><Phone size={18} aria-hidden="true" />{contact.whatsappDisplay}</a><a href={contactLink('email', service)} onClick={() => measureContactClick('email', service)}><Mail size={18} aria-hidden="true" />{contact.email}</a></div>
        {branding.companyAddress && <p className="contact-address"><MapPin size={18} aria-hidden="true" />{branding.companyAddress}</p>}
        {siteSettings.socialLinks.length > 0 && <div className="mt-5"><SocialLinks links={siteSettings.socialLinks} showLabels tone="light" /></div>}
      </header>
      <QuoteForm defaultService={service} onServiceChange={setService} />
    </div>
    <ContactDirectory groups={branding.contactGroups || []} />
  </div></main>;
};
