import React, { useEffect, useState } from 'react';
import { ArrowRight, PhoneCall, Ship, Plane, Check } from 'lucide-react';
import { GAEKS_UPDATE_EVENT, getStoredCorporate } from '../utils/adminStorage';
import { pagePaths } from '../utils/routes';

export const RateCardPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [corporate, setCorporate] = useState(getStoredCorporate);
  const [modeFilter, setModeFilter] = useState<'all' | 'ocean' | 'air'>('all');

  useEffect(() => {
    const reload = () => setCorporate(getStoredCorporate());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const { rateCard } = corporate;
  const publishedRates = (rateCard.items || []).filter((item) => item.status === 'published');
  const visibleRates = publishedRates.filter((item) => modeFilter === 'all' || item.mode === modeFilter);

  const openQuoteWithTariff = (event: React.MouseEvent<HTMLAnchorElement>, detail?: string) => {
    const params = new URLSearchParams({ category: 'tarif' });
    if (detail) params.set('note', detail);
    const targetUrl = `${pagePaths.contact}?${params.toString()}#quote-form`;
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      window.history.pushState({}, '', targetUrl);
      onNavigate('contact');
      window.setTimeout(() => {
        document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  };

  return (
    <div className="bg-[#F8FAFC] pt-16 text-[#12363a]">
      <header className="border-b border-slate-200 bg-[#012E34] py-16 text-white sm:py-20">
        <div className="page-shell">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a3edf2]">{rateCard.label}</p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl">
            {rateCard.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#dbeaea] sm:text-lg">{rateCard.description}</p>
        </div>
      </header>

      <div className="page-shell py-14 sm:py-20">
        {publishedRates.length === 0 ? (
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:items-start lg:gap-14">
            <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-10" aria-labelledby="rate-empty-title">
              <p className="section-label">Status Ketersediaan</p>
              <h2 id="rate-empty-title" className="mt-3 font-display text-2xl font-bold tracking-[-0.025em] text-[#012E34] sm:text-3xl">
                {rateCard.emptyTitle}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{rateCard.emptyBody}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`${pagePaths.contact}?category=tarif#quote-form`}
                  onClick={(event) => openQuoteWithTariff(event)}
                  className="button-primary"
                >
                  <span>{rateCard.primaryCtaLabel}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={pagePaths.phones}
                  onClick={(event) => {
                    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
                      event.preventDefault();
                      onNavigate('phones');
                    }
                  }}
                  className="button-secondary"
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  <span>{rateCard.secondaryCtaLabel}</span>
                </a>
              </div>
            </section>

            <aside className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8" aria-labelledby="rate-prep-heading">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0a5861]">Persiapan Penawaran</p>
              <h3 id="rate-prep-heading" className="mt-2 font-display text-lg font-bold text-[#012E34]">
                {rateCard.preparationHeading}
              </h3>
              <ul className="mt-5 space-y-3 border-t border-slate-200 pt-5">
                {rateCard.preparationItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#0a5861]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        ) : (
          <section aria-label="Daftar tarif pengiriman">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex gap-2">
                {([
                  ['all', 'Semua Moda'],
                  ['ocean', 'Pengiriman Laut'],
                  ['air', 'Pengiriman Udara'],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setModeFilter(key)}
                    aria-pressed={modeFilter === key}
                    className={`min-h-11 rounded-md px-4 text-sm font-bold transition-colors ${
                      modeFilter === key ? 'bg-[#012E34] text-white' : 'border border-slate-300 bg-white text-[#12363a] hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-sm text-slate-600">{visibleRates.length} tarif tersedia</p>
            </div>

            <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
              {visibleRates.map((rate) => (
                <article key={rate.id} className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#0a5861]">
                      {rate.mode === 'air' ? <Plane className="h-4 w-4" aria-hidden="true" /> : <Ship className="h-4 w-4" aria-hidden="true" />}
                      <span>{rate.serviceType}</span>
                      <span>·</span>
                      <span>{rate.containerOrCargoType}</span>
                    </div>
                    <h2 className="mt-2 font-display text-lg font-bold text-[#012E34]">
                      {rate.originPortOrAirport || rate.origin} → {rate.destinationPortOrAirport || rate.destination}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Cakupan: {rate.costScope} · Berlaku s/d {rate.validUntil}
                    </p>
                    {rate.terms && <p className="mt-1 text-xs text-slate-500">{rate.terms}</p>}
                  </div>
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <p className="font-display text-xl font-bold text-[#012E34] tabular-nums">
                      {rate.currency} {rate.rate}
                    </p>
                    <a
                      href={`${pagePaths.contact}?category=tarif&note=${encodeURIComponent(`${rate.serviceType} ${rate.origin} - ${rate.destination}`)}#quote-form`}
                      onClick={(event) => openQuoteWithTariff(event, `${rate.serviceType} ${rate.origin} - ${rate.destination}`)}
                      className="button-primary"
                    >
                      <span>{rateCard.primaryCtaLabel}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
