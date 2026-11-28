import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import {
  getSiteCopy,
  getStoredBranding,
  getStoredServices,
  getStoredSiteSettings,
  GAEKS_UPDATE_EVENT,
} from '../utils/adminStorage';
import { customerContactTeams } from '../utils/contactDirectory';
import { measureContactClick, quoteContext, resolveServiceContact, SmartRoutingResult } from '../utils/quoteFlow';
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
  const [liveRouting, setLiveRouting] = useState<SmartRoutingResult | null>(null);
  const formSendRef = useRef<((channel: 'whatsapp' | 'email') => void) | null>(null);

  const handleRoutingChange = useCallback((routing: SmartRoutingResult, onSend: (channel: 'whatsapp' | 'email') => void) => {
    setLiveRouting(routing);
    formSendRef.current = onSend;
  }, []);

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

  const activeContact = liveRouting?.resolved || resolveServiceContact(service);
  const teams = customerContactTeams(branding.contactGroups || [], services, copy);

  return (
    <div className="bg-[#F8FAFC] pt-16 text-[#12363a]">
      <header className="border-b border-[#0f454c] bg-[#012E34] py-14 text-white sm:py-16">
        <div className="page-shell flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a3edf2]">{copy.contactLabel}</p>
            <h1 className="mt-3 text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl">
              {copy.contactHeading}
            </h1>
            <p className="mt-4 text-base leading-7 text-[#dbeaea] sm:text-lg">{copy.contactIntro}</p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            {branding.companyAddress && (
              <p className="inline-flex items-center gap-2 text-sm text-[#dbeaea]">
                <MapPin className="h-4 w-4 shrink-0 text-[#a3edf2]" aria-hidden="true" />
                <span>{branding.companyAddress}</span>
              </p>
            )}
            {siteSettings.socialLinks.length > 0 && (
              <SocialLinks links={siteSettings.socialLinks} showLabels tone="dark" />
            )}
          </div>
        </div>
      </header>

      <div className="page-shell py-10 sm:py-14">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:gap-10">
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#0f454c] bg-[#012E34] p-6 text-white shadow-sm sm:p-7" aria-live="polite">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a3edf2]">{copy.contactTeamLabel}</p>
              <h2 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">{activeContact.group.name}</h2>
              <p className="mt-2 text-sm leading-6 text-[#cce2e3]">
                Terhubung langsung dengan tim operasional terkait untuk peninjauan rute, jadwal, dan kelengkapan dokumen.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href={activeContact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (formSendRef.current) {
                      e.preventDefault();
                      formSendRef.current('whatsapp');
                    } else {
                      measureContactClick('whatsapp', service);
                    }
                  }}
                  className="btn-press inline-flex min-h-11 items-center gap-2 rounded-md bg-[#a3edf2] px-4 py-2 text-sm font-bold text-[#012E34] transition-colors hover:bg-white"
                >
                  <WhatsAppIcon size={17} />
                  <span>{activeContact.whatsappLabel}</span>
                </a>
                <a
                  href={activeContact.emailUrl}
                  onClick={(e) => {
                    if (formSendRef.current) {
                      e.preventDefault();
                      formSendRef.current('email');
                    } else {
                      measureContactClick('email', service);
                    }
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/30 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Mail size={17} aria-hidden="true" />
                  <span>{activeContact.emailLabel}</span>
                </a>
              </div>

              <div className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm text-[#e1eceb]">
                <a
                  href={`tel:+${activeContact.whatsappNumber}`}
                  className="inline-flex min-h-11 items-center gap-2 hover:underline"
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>{activeContact.whatsappDisplay}</span>
                </a>
                <div className="flex flex-wrap items-center gap-2">
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
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-display text-base font-bold text-[#012E34]">Persiapan Data untuk Penawaran Cepat</h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-600">
                <li>· Kota, pelabuhan, atau bandara asal serta tujuan pengiriman.</li>
                <li>· Jenis komoditas dan estimasi berat kotor atau volume CBM.</li>
                <li>· Pilihan moda atau skema Incoterms (FOB, CIF, Door-to-Door) bila ada.</li>
                <li>· Invoice &amp; Packing List awal untuk peninjauan kepabeanan / PI.</li>
              </ul>
            </div>
          </aside>

          <QuoteForm defaultService={service} onServiceChange={setService} onRoutingChange={handleRoutingChange} />
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
