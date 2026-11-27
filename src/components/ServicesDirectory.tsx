import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Language, ServiceDetail } from '../types/freight';
import { getSiteCopy } from '../utils/adminStorage';
import { ServiceTitle } from './ServiceTitle';
import { servicePath } from '../utils/routes';

export function ServicesDirectory({
  services,
  currentLang,
  onSelectService,
  onOpenService,
}: {
  services: ServiceDetail[];
  currentLang: Language;
  onSelectService: (serviceName: string) => void;
  onOpenService?: (serviceId: string) => void;
}) {
  const [selectedId, setSelectedId] = React.useState(services[0]?.id || '');
  const selected = services.find((item) => item.id === selectedId) || services[0];
  const [imageFailed, setImageFailed] = React.useState(false);
  React.useEffect(() => setImageFailed(false), [selected?.id]);
  const copy = getSiteCopy();

  const localize = (service: ServiceDetail) => ({
    title: currentLang === 'en' ? service.title_en || service.title : currentLang === 'zh' ? service.title_zh || service.title : service.title,
    category: currentLang === 'en' ? service.category_en || service.category : currentLang === 'zh' ? service.category_zh || service.category : service.category,
    tagline: currentLang === 'en' ? service.tagline_en || service.tagline : currentLang === 'zh' ? service.tagline_zh || service.tagline : service.tagline,
    description: currentLang === 'en' ? service.description_en || service.description : currentLang === 'zh' ? service.description_zh || service.description : service.description,
  });

  return (
    <section id="services" className="services-directory" aria-labelledby="services-title">
      <header className="services-directory-hero">
        <img
          className="services-directory-hero-image"
          src="/uploads/gaeks-hero-cargo-poster.webp"
          alt=""
          width="1440"
          height="810"
          fetchPriority="high"
          decoding="async"
        />
        <div className="page-shell services-directory-hero-inner">
          <div>
            <p className="services-directory-eyebrow">{copy.servicesEyebrow}</p>
            <h1 id="services-title">{copy.servicesHeading}</h1>
          </div>
          <p className="services-directory-intro">{copy.servicesIntro}</p>
        </div>
      </header>

      <div className="page-shell services-directory-layout">
        <div className="services-directory-picker">
          <div className="services-directory-nav-head">
            <span>{copy.servicesListLabel}</span>
            <span>{String(services.length).padStart(2, '0')}</span>
          </div>
          <nav className="services-directory-nav" aria-label={copy.servicesListLabel}>
            {services.map((service, index) => {
              const item = localize(service);
              return (
                <button
                  type="button"
                  key={service.id}
                  aria-pressed={selected?.id === service.id}
                  onClick={() => setSelectedId(service.id)}
                  className="services-directory-choice"
                >
                  <span className="services-directory-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="services-directory-choice-text">
                    <strong>
                      <ServiceTitle title={item.title} />
                    </strong>
                    <small>{item.category}</small>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              );
            })}
          </nav>
        </div>

        {!selected && (
          <div className="services-directory-empty">
            <p>{copy.servicesEmpty}</p>
            <a href="/kontak/">
              {copy.servicesEmptyCta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        )}

        {selected && (
          <article className="services-directory-preview" aria-live="polite">
            <div className="services-directory-photo" key={selected.id}>
              <img
                src={imageFailed ? '/uploads/gaeks-hero-cargo-poster.webp' : selected.imageUrl}
                alt=""
                width="960"
                height="640"
                loading="eager"
                onError={() => setImageFailed(true)}
              />
              <span>{copy.servicesPreviewLabel}</span>
            </div>
            <div className="services-directory-preview-body" key={`${selected.id}-${currentLang}`}>
              <p className="services-directory-category">{localize(selected).category}</p>
              <h2>
                <ServiceTitle title={localize(selected).title} />
              </h2>
              <p className="services-directory-tagline">{localize(selected).tagline}</p>
              <p className="services-directory-description">{localize(selected).description}</p>
              <div className="services-directory-actions">
                <a
                  href={servicePath(selected.id)}
                  onClick={(event) => {
                    if (onOpenService && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
                      event.preventDefault();
                      onOpenService(selected.id);
                    }
                  }}
                >
                  {copy.servicesDetailCta}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <button type="button" onClick={() => onSelectService(selected.id)}>
                  {copy.servicesQuoteCta}
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
