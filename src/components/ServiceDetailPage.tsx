import React, { useEffect, useState } from 'react';
import { ChevronRight, Mail, Phone } from 'lucide-react';
import { Language } from '../types/freight';
import { GAEKS_UPDATE_EVENT, getStoredServices, getSiteCopy } from '../utils/adminStorage';
import { matchesServiceRoute } from '../utils/routes';
import { contactLink, measureContactClick, resolveContact } from '../utils/quoteFlow';
import { QuoteForm } from './QuoteForm';
import { PiCatalogTable } from './PiCatalogTable';

export const ServiceDetailPage: React.FC<{
  slug: string;
  currentLang?: Language;
  onBack: () => void;
  onQuote: (name: string) => void;
}> = ({ slug, onBack }) => {
  const [services, setServices] = useState(getStoredServices);
  useEffect(() => {
    const reload = () => setServices(getStoredServices());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);
  const service = services.find(item => matchesServiceRoute(item.id, slug));
  if (!service) return <main className="page-shell py-32">
    <h1 className="section-title">Layanan belum tersedia.</h1>
    <p className="section-copy">Halaman ini belum diterbitkan atau sudah dipindahkan.</p>
    <button className="button-primary mt-6" onClick={onBack}>Lihat layanan lainnya</button>
  </main>;
  const contact = resolveContact(service.id);
  const copy = getSiteCopy();
  const evidence = service.evidence?.filter(item => item.approved && item.source && item.date && item.detail) || [];
  return <main className="service-detail">
    <header className="service-overview"><div className="page-shell">
      <a className="service-back" href="/layanan/">{copy.serviceBack}</a>
      <div className="service-overview-grid">
        <div className="service-intro">
          <p className="service-category">{service.category}</p>
          <h1>{service.landingTitle || service.title}</h1>
          <p className="service-summary">{service.summary || service.description}</p>
          <a className="service-primary" href="#quote-form">{contact.ctaText}</a>
          <a className="service-direct" href={contactLink('whatsapp', service.id)} onClick={() => measureContactClick('whatsapp', service.id)}><Phone aria-hidden="true" size={17} />{contact.whatsappDisplay}</a>
        </div>
        {service.imageUrl && <figure className="service-photo"><img src={service.imageUrl} alt={service.imageAlt || ''} width="960" height="800" fetchPriority="high" /><figcaption>{service.title}</figcaption></figure>}
      </div>
    </div></header>
    <div className="page-shell service-content">
      <section className="service-scope" aria-labelledby="scope-heading">
        <div><p className="section-label">{copy.scopeLabel}</p><h2 id="scope-heading" className="service-heading">{copy.scopeHeading}</h2>
          {service.equipment && <p className="service-equipment">{service.equipment}</p>}{service.commodities && <p className="service-muted">{service.commodities}</p>}
        </div>
        <ul className="service-scope-list">{service.features.map((feature, index) => <li key={index}><span aria-hidden="true" className="service-index">{String(index + 1).padStart(2, '0')}</span><span>{feature}</span></li>)}</ul>
      </section>
      {!!service.sections?.length && <section className="service-guide" aria-labelledby="guide-heading">
        <div><p className="section-label">{copy.guideLabel}</p><h2 className="service-heading" id="guide-heading">{copy.guideHeading}</h2></div>
        <div className="service-disclosures">{service.sections.map((section, index) => <details key={index} open={index === 0}><summary><ChevronRight size={19} aria-hidden="true" /><span>{section.title}</span></summary><div className="service-disclosure-body"><p>{section.body}</p></div></details>)}</div>
      </section>}
      {!!service.compare?.length && <section className="service-comparison" aria-labelledby="compare-heading">
        <h2 className="service-heading" id="compare-heading">{copy.compareHeading}</h2>
        <div className="service-table-scroll" role="region" aria-label="Tabel perbandingan layanan, dapat digeser" tabIndex={0}><table><thead><tr><th scope="col">{copy.compareOption}</th><th scope="col">{copy.compareAudience}</th><th scope="col">{copy.compareInput}</th></tr></thead><tbody>{service.compare.map((row, index) => <tr key={index}>{row.map((cell, column) => column === 0 ? <th scope="row" key={column}>{cell}</th> : <td key={column}>{cell}</td>)}</tr>)}</tbody></table></div>
      </section>}
      {evidence.length > 0 && <section className="service-experience" aria-labelledby="experience-heading">
        <div><p className="service-category">{copy.experienceLabel}</p><h2 className="service-heading" id="experience-heading">{copy.experienceHeading}</h2></div>
        <div>{evidence.map((proof, index) => <article key={index}><h3>{proof.title}</h3><p>{proof.detail}</p><p className="service-source">{proof.source} · <time dateTime={proof.date}>{new Date(proof.date + 'T12:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</time></p></article>)}</div>
      </section>}
      {!!service.faq?.length && <section className="service-guide" aria-labelledby="faq-heading">
        <div><p className="section-label">{copy.faqLabel}</p><h2 id="faq-heading" className="service-heading">{copy.faqHeading}</h2></div>
        <div className="service-disclosures">{service.faq.map(([question, answer], index) => <details key={index}><summary><ChevronRight size={19} aria-hidden="true" /><span>{question}</span></summary><div className="service-disclosure-body"><p>{answer}</p></div></details>)}</div>
      </section>}
      {service.id === 'undername-impor' && <PiCatalogTable />}
      <section className="service-inquiry" aria-label="Konsultasi dan penawaran">
        <div className="service-inquiry-intro"><p className="section-label">{copy.inquiryLabel}</p><h2 className="service-heading">{copy.inquiryHeading}</h2><p className="service-muted">{contact.name}</p><a href={contactLink('email', service.id)} onClick={() => measureContactClick('email', service.id)} className="service-email"><Mail size={18} aria-hidden="true" />{contact.email}</a></div>
        <QuoteForm key={service.id} defaultService={service.id === 'air-shipment' ? 'air' : service.id === 'undername-impor' ? 'undername' : service.id} />
      </section>
    </div>
  </main>;
};
