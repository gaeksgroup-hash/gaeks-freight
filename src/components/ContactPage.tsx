import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import {
  getSiteCopy,
  getStoredBranding,
  getStoredSiteSettings,
  GAEKS_UPDATE_EVENT,
} from '../utils/adminStorage';
import { measureContactClick, quoteContext, resolveServiceContact, SmartRoutingResult } from '../utils/quoteFlow';
import { SocialLinks } from './SocialLinks';
import { QuoteForm } from './QuoteForm';
import { ContactDirectory } from './ContactDirectory';
import { CopyEmailButton } from './ContactActions';

const PREPARATION_CHECKLIST = [
  'Kota, pelabuhan, atau bandara asal serta tujuan pengiriman.',
  'Jenis komoditas dan estimasi berat kotor atau volume CBM.',
  'Pilihan moda atau skema Incoterms (FOB, CIF, Door-to-Door) bila ada.',
  'Invoice & Packing List awal untuk peninjauan kepabeanan / PI.',
];

export const ContactPage: React.FC = () => {
  const [branding, setBranding] = useState(getStoredBranding);
  const [siteSettings, setSiteSettings] = useState(getStoredSiteSettings);
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
      setCopy(getSiteCopy());
    };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const activeContact = liveRouting?.resolved || resolveServiceContact(service);

  return (
    <div className="bg-gradient-to-b from-[#e8f0f2] via-[#f3f7f7] to-[#f8fafc] pt-16 text-[#12363a]">
      <header className="relative overflow-hidden border-b border-[#18606a]/60 bg-gradient-to-br from-[#012228] via-[#012E34] to-[#08444d] pt-12 pb-24 text-white sm:pt-16 sm:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(163,237,242,0.14),transparent_55%)]"
        />
        <div className="page-shell relative">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a3edf2]">
              <span className="h-0.5 w-6 bg-[#3cd3e3]" aria-hidden="true" />
              {copy.contactLabel}
            </p>
            <h1 className="mt-3 text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl">
              {copy.contactHeading}
            </h1>
            <p className="mt-4 text-base leading-7 text-[#d4e7e8] sm:text-lg">{copy.contactIntro}</p>
          </div>
        </div>
      </header>

      <div className="page-shell relative z-10 -mt-12 pb-12 sm:-mt-16 sm:pb-16">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-10">
          <div className="space-y-6">
            <QuoteForm
              defaultService={service}
              onServiceChange={setService}
              onRoutingChange={handleRoutingChange}
              showEmailCopy={false}
            />

            <aside
              className="rounded-2xl border border-[#14555e] border-l-4 border-l-[#3cd3e3] bg-gradient-to-br from-[#022a30] to-[#063a42] p-6 text-white shadow-[0_18px_36px_-18px_rgba(1,46,52,0.35)] sm:p-7"
              aria-live="polite"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9beaf2]">{copy.contactTeamLabel}</p>
                  <h2 className="mt-1.5 font-display text-xl font-bold text-white sm:text-2xl">{activeContact.group.name}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#cce2e3]">
                    Penawaran Anda dari formulir di atas diarahkan ke desk ini untuk peninjauan rute, jadwal, dan kelengkapan dokumen.
                  </p>
                </div>

                <div className="shrink-0 space-y-2.5 border-t border-white/15 pt-4 text-sm text-[#e1eceb] sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <a
                    href={`tel:+${activeContact.whatsappNumber}`}
                    className="inline-flex min-h-11 items-center gap-2 font-semibold text-white hover:underline"
                  >
                    <Phone size={16} className="text-[#9beaf2]" aria-hidden="true" />
                    <span>{activeContact.whatsappDisplay}</span>
                  </a>
                  <div className="flex flex-wrap items-center gap-2">
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
                      className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 hover:text-white"
                    >
                      <Mail size={16} className="text-[#9beaf2]" aria-hidden="true" />
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
            </aside>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24">
            <section
              aria-labelledby="quick-prep-heading"
              className="rounded-2xl border border-[#14555e] bg-gradient-to-br from-[#012a30] to-[#073f47] p-6 text-white shadow-[0_22px_44px_-18px_rgba(1,46,52,0.4)] sm:p-7"
            >
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9beaf2]">Checklist Brief</p>
              <h2 id="quick-prep-heading" className="mt-1.5 font-display text-lg font-bold text-white sm:text-xl">
                Persiapan Data untuk Penawaran Cepat
              </h2>
              <ul className="mt-5 space-y-3.5 border-t border-white/15 pt-5">
                {PREPARATION_CHECKLIST.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#dcebeb]">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#257985] bg-[#0b4750] text-[#9beaf2]">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {(branding.companyAddress || siteSettings.socialLinks.length > 0) && (
              <section
                aria-labelledby="office-info-heading"
                className="rounded-2xl border border-[#c7dce2] bg-white/95 p-6 shadow-[0_12px_28px_-16px_rgba(1,46,52,0.16)]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0a6783]">Lokasi &amp; Kanal Resmi</p>
                <h2 id="office-info-heading" className="sr-only">
                  Lokasi operasional dan media sosial GAEKS
                </h2>
                {branding.companyAddress && (
                  <p className="mt-3 flex items-start gap-3 text-sm font-medium leading-6 text-[#12363a]">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f6] text-[#0b6873]">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="pt-1">{branding.companyAddress}</span>
                  </p>
                )}
                {siteSettings.socialLinks.length > 0 && (
                  <div className="mt-4 border-t border-slate-200/80 pt-4">
                    <SocialLinks links={siteSettings.socialLinks} showLabels tone="light" />
                  </div>
                )}
              </section>
            )}
          </div>
        </div>

        <ContactDirectory groups={branding.contactGroups || []} />
      </div>
    </div>
  );
};
