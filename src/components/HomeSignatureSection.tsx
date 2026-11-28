import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GAEKS_UPDATE_EVENT, getStoredCorporate } from '../utils/adminStorage';
import { pagePaths } from '../utils/routes';

export const HomeSignatureSection: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [corporate, setCorporate] = useState(getStoredCorporate);

  useEffect(() => {
    const reload = () => setCorporate(getStoredCorporate());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const { homeSignature, brand } = corporate;

  return (
    <section
      aria-labelledby="signature-principles-title"
      className="border-b border-[#0f454c] bg-[#012E34] py-16 text-white sm:py-20"
    >
      <div className="page-shell grid min-w-0 grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,.88fr)_minmax(0,1.12fr)] lg:gap-16">
        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a3edf2]">{homeSignature.label}</p>
            <h2
              id="signature-principles-title"
              className="mt-4 max-w-xl text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-4xl"
            >
              {homeSignature.headline}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#cfe3e4]">
              {brand.heroDescription}
            </p>
          </div>

          <div className="mt-8 border-t border-white/15 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9ceef4]">Komitmen Kami</p>
            <p className="mt-2 text-base font-semibold text-white">{brand.promise}</p>
            <div className="mt-6">
              <a
                href={pagePaths.about}
                onClick={(event) => {
                  if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
                    event.preventDefault();
                    onNavigate('about');
                  }
                }}
                className="btn-press inline-flex min-h-11 items-center gap-2.5 rounded-md bg-[#a3edf2] px-5 py-3 text-sm font-bold text-[#012E34] transition-colors hover:bg-white"
              >
                <span>{homeSignature.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <ol className="divide-y divide-white/15 border-y border-white/15" aria-label={homeSignature.label}>
          {homeSignature.principles.map((item) => (
            <li key={item.number} className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-4 py-4 sm:py-5">
              <span className="font-mono text-xs font-bold tracking-[0.12em] text-[#a3edf2] tabular-nums notranslate" translate="no">
                {item.number}
              </span>
              <span className="text-base font-semibold leading-snug text-white sm:text-lg">{item.title}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
