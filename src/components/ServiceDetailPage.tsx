import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Mail } from 'lucide-react';
import { Language } from '../types/freight';
import { GAEKS_UPDATE_EVENT, getStoredServices, getSiteCopy } from '../utils/adminStorage';
import { matchesServiceRoute, pagePaths } from '../utils/routes';
import { measureContactClick, resolveServiceContact } from '../utils/quoteFlow';
import { QuoteForm } from './QuoteForm';
import { PiCatalogTable } from './PiCatalogTable';
import { CopyEmailButton, WhatsAppIcon } from './ContactActions';

export const ServiceDetailPage: React.FC<{
  slug: string;
  currentLang?: Language;
  onBack: () => void;
  onQuote: (name: string) => void;
}> = ({ slug, onBack }) => {
  const [services, setServices] = useState(getStoredServices);
  const [copy, setCopy] = useState(getSiteCopy);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const heroActionsRef = useRef<HTMLDivElement | null>(null);
  const quoteSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reload = () => {
      setServices(getStoredServices());
      setCopy(getSiteCopy());
    };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const service = services.find((item) => matchesServiceRoute(item.id, slug));

  useEffect(() => {
    if (!service || typeof IntersectionObserver === 'undefined') return;
    let heroVisible = true;
    let formVisible = false;
    const sync = () => setShowFloatingBar(!heroVisible && !formVisible);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry ? entry.isIntersecting : false;
        sync();
      },
      { threshold: 0.1 }
    );
    const formObserver = new IntersectionObserver(
      ([entry]) => {
        formVisible = entry ? entry.isIntersecting : false;
        sync();
      },
      { threshold: 0.05 }
    );

    if (heroActionsRef.current) heroObserver.observe(heroActionsRef.current);
    if (quoteSectionRef.current) formObserver.observe(quoteSectionRef.current);
    return () => {
      heroObserver.disconnect();
      formObserver.disconnect();
    };
  }, [service?.id]);

  if (!service) {
    return (
      <main className="page-shell py-32">
        <h1 className="section-title">Layanan belum tersedia.</h1>
        <p className="section-copy">Halaman ini belum diterbitkan atau sudah dipindahkan.</p>
        <button type="button" className="button-primary mt-6" onClick={onBack}>
          Lihat layanan lainnya
        </button>
      </main>
    );
  }

  const contact = resolveServiceContact(service.id);
  const evidence = service.evidence?.filter((item) => item.approved && item.source && item.date && item.detail) || [];
  const heroSummary = service.heroSummary?.trim() || service.landingDescription?.trim() || service.tagline || service.description;

  return (
    <div className="service-detail pb-24 md:pb-0">
      <header className="service-overview">
        <div className="page-shell">
          <a className="service-back" href={pagePaths.services}>
            {copy.serviceBack}
          </a>
          <div className="service-overview-grid">
            <div className="service-intro">
              <p className="service-category">{service.category}</p>
              <h1>{service.landingTitle || service.title}</h1>
              <p className="service-summary">{heroSummary}</p>

              <div ref={heroActionsRef} className="service-actions-row">
                <a
                  className="service-primary"
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => measureContactClick('whatsapp', service.id)}
                >
                  <WhatsAppIcon size={18} />
                  <span>{contact.whatsappLabel}</span>
                </a>
                <a
                  className="service-email-cta"
                  href={contact.emailUrl}
                  onClick={() => measureContactClick('email', service.id)}
                >
                  <Mail size={18} aria-hidden="true" />
                  <span>{contact.emailLabel}</span>
                </a>
              </div>

              <div className="service-email-copy-row">
                <span className="inline-flex items-center gap-2 text-sm text-[#e1eceb]">
                  <Mail size={15} aria-hidden="true" />
                  <span className="select-all font-medium">{contact.email}</span>
                </span>
                <CopyEmailButton
                  email={contact.email}
                  label={copy.serviceCopyEmailLabel}
                  copiedLabel={copy.serviceCopiedEmailLabel}
                  failedLabel={copy.serviceCopyFailedLabel}
                  tone="dark"
                />
              </div>

              <p className="service-reassurance">{copy.serviceReassurance}</p>
            </div>
            {service.imageUrl && (
              <figure className="service-photo">
                <img src={service.imageUrl} alt={service.imageAlt || ''} width="960" height="800" fetchPriority="high" />
                <figcaption>{service.title}</figcaption>
              </figure>
            )}
          </div>
        </div>
      </header>

      <div className="page-shell service-content">
        <section className="service-scope" aria-labelledby="scope-heading">
          <div>
            <p className="section-label">{copy.scopeLabel}</p>
            <h2 id="scope-heading" className="service-heading">
              {copy.scopeHeading}
            </h2>
            {service.summary && service.summary !== heroSummary && <p className="service-muted mb-3">{service.summary}</p>}
            {service.equipment && <p className="service-equipment">{service.equipment}</p>}
            {service.commodities && <p className="service-muted">{service.commodities}</p>}
          </div>
          <ul className="service-scope-list">
            {service.features.map((feature, index) => (
              <li key={index}>
                <span aria-hidden="true" className="service-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {!!service.sections?.length && (
          <section className="service-guide" aria-labelledby="guide-heading">
            <div>
              <p className="section-label">{copy.guideLabel}</p>
              <h2 className="service-heading" id="guide-heading">
                {copy.guideHeading}
              </h2>
              <p className="service-muted">{copy.serviceGuideNote}</p>
            </div>
            <div className="service-disclosures">
              {service.sections.map((section, index) => {
                const isCityOrQuotaSection = /jakarta|semarang|surabaya|kuota/i.test(section.title);
                return (
                  <details key={index} open={index === 0 || isCityOrQuotaSection}>
                    <summary>
                      <ChevronRight size={19} aria-hidden="true" />
                      <span>{section.title}</span>
                    </summary>
                    <div className="service-disclosure-body">
                      <p>{section.body}</p>
                    </div>
                  </details>
                );
              })}
            </div>
          </section>
        )}

        {!!service.compare?.length && (
          <section className="service-comparison" aria-labelledby="compare-heading">
            <h2 className="service-heading" id="compare-heading">
              {copy.compareHeading}
            </h2>
            <div className="service-table-scroll" role="region" aria-label="Tabel perbandingan layanan, dapat digeser" tabIndex={0}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">{copy.compareOption}</th>
                    <th scope="col">{copy.compareAudience}</th>
                    <th scope="col">{copy.compareInput}</th>
                  </tr>
                </thead>
                <tbody>
                  {service.compare.map((row, index) => (
                    <tr key={index}>
                      {row.map((cell, column) => (column === 0 ? <th scope="row" key={column}>{cell}</th> : <td key={column}>{cell}</td>))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {evidence.length > 0 && (
          <section className="service-experience" aria-labelledby="experience-heading">
            <div>
              <p className="service-category">{copy.experienceLabel}</p>
              <h2 className="service-heading" id="experience-heading">
                {copy.experienceHeading}
              </h2>
            </div>
            <div>
              {evidence.map((proof, index) => (
                <article key={index}>
                  <h3>{proof.title}</h3>
                  <p>{proof.detail}</p>
                  <p className="service-source">
                    {proof.source} ·{' '}
                    <time dateTime={proof.date}>
                      {new Date(proof.date + 'T12:00:00').toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {!!service.faq?.length && (
          <section className="service-guide" aria-labelledby="faq-heading">
            <div>
              <p className="section-label">{copy.faqLabel}</p>
              <h2 id="faq-heading" className="service-heading">
                {copy.faqHeading}
              </h2>
            </div>
            <div className="service-disclosures">
              {service.faq.map(([question, answer], index) => (
                <details key={index}>
                  <summary>
                    <ChevronRight size={19} aria-hidden="true" />
                    <span>{question}</span>
                  </summary>
                  <div className="service-disclosure-body">
                    <p>{answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {service.id === 'undername-impor' && <PiCatalogTable />}

        <section ref={quoteSectionRef} className="service-inquiry" aria-label="Tambahkan detail untuk penawaran">
          <div className="service-inquiry-intro">
            <p className="section-label">{copy.inquiryLabel}</p>
            <h2 className="service-heading">{copy.inquiryHeading}</h2>
          </div>
          <QuoteForm
            key={service.id}
            defaultService={service.id === 'air-shipment' ? 'air' : service.id === 'undername-impor' ? 'undername' : service.id}
            showEmailCopy={false}
          />
        </section>
      </div>

      {showFloatingBar && (
        <div
          className="fixed inset-x-0 bottom-0 z-30 border-t border-cyan-900 bg-[#082f34] px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(1,28,32,0.28)] md:hidden"
          role="region"
          aria-label={`Kontak cepat ${contact.serviceName}`}
        >
          <div className="mx-auto grid max-w-lg grid-cols-[minmax(0,1fr)_auto] gap-2">
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => measureContactClick('whatsapp', service.id)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#a3edf2] px-3 text-sm font-bold text-[#082f34] transition-colors hover:bg-white"
            >
              <WhatsAppIcon size={17} />
              <span className="truncate">{contact.whatsappLabel}</span>
            </a>
            <a
              href={contact.emailUrl}
              onClick={() => measureContactClick('email', service.id)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-3.5 text-sm font-bold text-white transition-colors hover:bg-white/20"
            >
              <Mail size={17} aria-hidden="true" />
              <span>{contact.emailLabel}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
