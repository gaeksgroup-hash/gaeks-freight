import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GAEKS_UPDATE_EVENT, getStoredCorporate } from '../utils/adminStorage';
import { pagePaths } from '../utils/routes';

export const CareersPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [corporate, setCorporate] = useState(getStoredCorporate);

  useEffect(() => {
    const reload = () => setCorporate(getStoredCorporate());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const { careers } = corporate;
  const openPositions = (careers.positions || []).filter((pos) => pos.status === 'published');

  const navTo = (page: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <div className="bg-[#F8FAFC] pt-16 text-[#12363a]">
      <header className="border-b border-slate-200 bg-[#012E34] py-16 text-white sm:py-20">
        <div className="page-shell grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a3edf2]">{careers.label}</p>
            <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl">
              {careers.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#dbeaea] sm:text-lg">{careers.description}</p>
          </div>

          <figure className="overflow-hidden rounded-xl border border-white/15 bg-[#041e23]">
            <img
              src={careers.heroImageUrl}
              alt={careers.heroImageAlt}
              width={1200}
              height={800}
              fetchPriority="high"
              decoding="async"
              className="aspect-[3/2] w-full object-cover"
            />
          </figure>
        </div>
      </header>

      {/* Budaya Kerja */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20" aria-labelledby="career-culture-title">
        <div className="page-shell">
          <div className="max-w-2xl">
            <p className="section-label">Karyawan dan Budaya Kerja</p>
            <h2 id="career-culture-title" className="section-title text-balance">
              {careers.cultureHeading}
            </h2>
          </div>

          <ol className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {careers.commitments.map((item, index) => (
              <li
                key={item.title}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 py-5 sm:grid-cols-[3.5rem_minmax(0,.38fr)_minmax(0,.62fr)] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-sm font-bold text-[#0a5861] tabular-nums notranslate" translate="no">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-base font-bold text-[#012E34] sm:text-lg">{item.title}</h3>
                <p className="col-start-2 text-sm leading-6 text-slate-600 sm:col-start-3 sm:text-base">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Peluang Karier */}
      <section className="py-16 sm:py-20" aria-labelledby="career-openings-title">
        <div className="page-shell">
          <p className="section-label">Rekrutmen</p>
          <h2 id="career-openings-title" className="section-title">
            {careers.openingsHeading}
          </h2>

          {openPositions.length === 0 ? (
            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 sm:p-10">
              <h3 className="font-display text-2xl font-bold text-[#012E34]">{careers.emptyTitle}</h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{careers.emptyBody}</p>
              <div className="mt-7">
                <a href={pagePaths.about} onClick={(event) => navTo('about', event)} className="button-primary">
                  <span>{careers.emptyCtaLabel}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200 bg-white">
              {openPositions.map((pos) => (
                <article key={pos.id} className="grid gap-4 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#0a5861]">
                      {pos.department} · {pos.location} · {pos.employmentType}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-[#012E34]">{pos.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{pos.summary}</p>
                  </div>
                  <a href={pagePaths.contact} onClick={(event) => navTo('contact', event)} className="button-secondary shrink-0">
                    <span>Hubungi Kami</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
