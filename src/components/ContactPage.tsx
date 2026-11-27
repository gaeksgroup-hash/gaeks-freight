import React, { useEffect, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
  getSiteCopy,
  getStoredBranding,
  getStoredServices,
  getStoredSiteSettings,
  GAEKS_UPDATE_EVENT,
} from '../utils/adminStorage';
import { customerContactTeams } from '../utils/contactDirectory';
import { measureContactClick, quoteContext, resolveServiceContact } from '../utils/quoteFlow';
import { SocialLinks } from './SocialLinks';
import { QuoteForm } from './QuoteForm';
import { ContactDirectory } from './ContactDirectory';
import { CopyEmailButton, WhatsAppIcon } from './ContactActions';

export const ContactPage: React.FC = () => {
  const [branding, setBranding] = useState(getStoredBranding);
  const [siteSettings, setSiteSettings] = useState(getStoredSiteSettings);
  const [services, setServices] = useState(getStoredServices);
  const [copy, setCopy] = useState(getSiteCopy);
  const [service, setService] = useState(() => quoteContext().service);

  useEffect(() => {
    const reload = () => {
      setBranding(getStoredBranding());
      setSiteSettings(getStoredSiteSettings());
      setServices(getStoredServices());
      setCopy(getSiteCopy());
    };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const activeContact = resolveServiceContact(service);
  const teams = customerContactTeams(branding.contactGroups || [], services, copy);

  return (
    <div className="contact-page">
      <div className="page-shell">
        <div className="contact-layout">
          <header className="contact-intro">
            <p className="section-label">{copy.contactLabel}</p>
            <h1>{copy.contactHeading}</h1>
            <p className="service-muted">{copy.contactIntro}</p>

            <div className="contact-assignment" aria-live="polite">
              <p className="contact-team-label">{copy.contactTeamLabel}</p>
              <h2>{activeContact.group.name}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={activeContact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => measureContactClick('whatsapp', service)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#a3edf2] px-4 py-2 text-sm font-bold text-[#082f34] transition-colors hover:bg-white"
                >
                  <WhatsAppIcon size={17} />
                  <span>{activeContact.whatsappLabel}</span>
                </a>
                <a
                  href={activeContact.emailUrl}
                  onClick={() => measureContactClick('email', service)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/35 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Mail size={17} aria-hidden="true" />
                  <span>{activeContact.emailLabel}</span>
                </a>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#e1eceb]">
                <a
                  href={`tel:+${activeContact.whatsappNumber}`}
                  className="inline-flex min-h-11 items-center gap-2 hover:underline"
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>{activeContact.whatsappDisplay}</span>
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={activeContact.emailUrl}
                  onClick={() => measureContactClick('email', service)}
                  className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4"
                >
                  <Mail size={16} aria-hidden="true" />
                  <span>{activeContact.email}</span>
                </a>
                <CopyEmailButton
                  email={activeContact.email}
                  label={copy.serviceCopyEmailLabel}
                  copiedLabel={copy.serviceCopiedEmailLabel}
                  failedLabel={copy.serviceCopyFailedLabel}
                  tone="dark"
                />
              </div>
            </div>

            {branding.companyAddress && (
              <p className="contact-address">
                <MapPin size={18} aria-hidden="true" />
                {branding.companyAddress}
              </p>
            )}
            {siteSettings.socialLinks.length > 0 && (
              <div className="mt-5">
                <SocialLinks links={siteSettings.socialLinks} showLabels tone="light" />
              </div>
            )}
          </header>

          <QuoteForm defaultService={service} onServiceChange={setService} />
        </div>

        <section className="mt-12 border-t border-[#c7d4d2] pt-10" aria-labelledby="contact-teams-heading">
          <div className="max-w-2xl">
            <p className="section-label">{copy.phoneEyebrow}</p>
            <h2 id="contact-teams-heading" className="mt-2 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
              {copy.contactDirectory}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#4b6265]">{copy.contactGroupsIntro}</p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {teams.map((team) => (
              <article
                key={team.key}
                className="flex flex-col justify-between rounded-xl border border-[#c7d4d2] bg-white p-5 sm:p-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#12363a]">{team.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4b6265]">{team.description}</p>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={team.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => measureContactClick('whatsapp', team.primaryServiceId)}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#0a454b] px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#07383d]"
                    >
                      <WhatsAppIcon size={16} />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={team.emailUrl}
                      onClick={() => measureContactClick('email', team.primaryServiceId)}
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-bold text-[#12363a] transition-colors hover:border-cyan-700 hover:bg-cyan-50"
                    >
                      <Mail size={16} aria-hidden="true" />
                      <span>{copy.serviceEmailCta || 'Kirim Email'}</span>
                    </a>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4b6265]">
                    <a href={`tel:+${team.whatsappNumber}`} className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-[#12363a] hover:underline">
                      <Phone size={14} aria-hidden="true" />
                      <span>{team.whatsappDisplay}</span>
                    </a>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={team.emailUrl}
                        onClick={() => measureContactClick('email', team.primaryServiceId)}
                        className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-[#0a5861] underline underline-offset-4"
                      >
                        <Mail size={14} aria-hidden="true" />
                        <span>{team.email}</span>
                      </a>
                      <CopyEmailButton
                        email={team.email}
                        label={copy.serviceCopyEmailLabel}
                        copiedLabel={copy.serviceCopiedEmailLabel}
                        failedLabel={copy.serviceCopyFailedLabel}
                        tone="light"
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ContactDirectory groups={branding.contactGroups || []} />
      </div>
    </div>
  );
};
