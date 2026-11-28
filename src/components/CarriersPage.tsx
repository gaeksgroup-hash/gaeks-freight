import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Plane, Ship } from 'lucide-react';
import { GAEKS_UPDATE_EVENT, getStoredCorporate } from '../utils/adminStorage';
import { pagePaths } from '../utils/routes';

export const CarriersPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [corporate, setCorporate] = useState(getStoredCorporate);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'airline' | 'shipping_line'>('all');

  useEffect(() => {
    const reload = () => setCorporate(getStoredCorporate());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const { carriers } = corporate;
  const publishedCarriers = (carriers.items || []).filter((item) => item.status === 'published');
  const visibleCarriers = publishedCarriers.filter((item) => categoryFilter === 'all' || item.category === categoryFilter);

  const navTo = (page: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <div className="bg-[#F8FAFC] pt-16 text-[#12363a]">
      <header className="border-b border-slate-200 bg-[#012E34] py-16 text-white sm:py-20">
        <div className="page-shell">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a3edf2]">{carriers.label}</p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl">
            {carriers.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#dbeaea] sm:text-lg">{carriers.description}</p>
        </div>
      </header>

      <div className="page-shell py-14 sm:py-20">
        {publishedCarriers.length === 0 ? (
          <div className="space-y-10">
            <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-10" aria-labelledby="carrier-empty-title">
              <p className="section-label">Direktori Penyedia Angkutan</p>
              <h2 id="carrier-empty-title" className="mt-3 max-w-2xl font-display text-2xl font-bold tracking-[-0.025em] text-[#012E34] sm:text-3xl">
                {carriers.emptyTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{carriers.emptyBody}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={pagePaths.contact} onClick={(event) => navTo('contact', event)} className="button-primary">
                  <span>{carriers.primaryCtaLabel}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href={pagePaths.network} onClick={(event) => navTo('network', event)} className="button-secondary">
                  <span>{carriers.secondaryCtaLabel}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2" aria-label="Kategori penyedia angkutan">
              <article className="border-t-2 border-[#012E34] bg-white p-6 sm:p-7">
                <div className="flex items-center gap-3 text-[#012E34]">
                  <Plane className="h-5 w-5 text-[#0a5861]" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold">{carriers.airlinesTitle}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{carriers.airlinesNote}</p>
              </article>

              <article className="border-t-2 border-[#012E34] bg-white p-6 sm:p-7">
                <div className="flex items-center gap-3 text-[#012E34]">
                  <Ship className="h-5 w-5 text-[#0a5861]" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold">{carriers.shippingLinesTitle}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{carriers.shippingLinesNote}</p>
              </article>
            </section>
          </div>
        ) : (
          <section aria-label="Daftar maskapai dan perusahaan pelayaran">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex flex-wrap gap-2">
                {([
                  ['all', 'Semua Kategori'],
                  ['airline', carriers.airlinesTitle],
                  ['shipping_line', carriers.shippingLinesTitle],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategoryFilter(key)}
                    aria-pressed={categoryFilter === key}
                    className={`min-h-11 rounded-md px-4 text-sm font-bold transition-colors ${
                      categoryFilter === key ? 'bg-[#012E34] text-white' : 'border border-slate-300 bg-white text-[#12363a] hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-sm text-slate-600">{visibleCarriers.length} penyedia ditampilkan</p>
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
              {visibleCarriers.map((item) => (
                <article key={item.id} className="grid gap-4 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="flex items-start gap-4">
                    {item.approvedLogo && item.logoUrl && (
                      <img src={item.logoUrl} alt={item.name} width={96} height={40} className="h-10 w-24 shrink-0 object-contain" loading="lazy" />
                    )}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-[#0a5861]">
                        {item.category === 'airline' ? carriers.airlinesTitle : carriers.shippingLinesTitle}
                      </p>
                      <h2 className="mt-1 font-display text-lg font-bold text-[#012E34]">{item.name}</h2>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.serviceScope} · {item.corridors}
                      </p>
                      {item.scheduleSummary && <p className="mt-1 text-xs text-slate-500">{item.scheduleSummary}</p>}
                    </div>
                  </div>
                  {item.officialUrl && (
                    <a
                      href={item.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-secondary shrink-0"
                    >
                      <span>Situs Resmi</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
