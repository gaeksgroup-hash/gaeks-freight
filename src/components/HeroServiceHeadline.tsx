import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Language, ServiceDetail } from '../types/freight';
import { GAEKS_UPDATE_EVENT, getStoredServices } from '../utils/adminStorage';
import { ServiceTitle } from './ServiceTitle';

const localize = (service: ServiceDetail, language: Language) => ({
  title: language === 'en' ? service.title_en || service.title : language === 'zh' ? service.title_zh || service.title : service.title,
  tagline: language === 'en' ? service.tagline_en || service.tagline : language === 'zh' ? service.tagline_zh || service.tagline : service.tagline,
});

export const HeroServiceHeadline: React.FC<{ currentLang: Language; onOpenService?: (id: string) => void; detailLabel: string; eyebrow: string }> = ({ currentLang, onOpenService, detailLabel, eyebrow }) => {
  const [services, setServices] = useState(getStoredServices());
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = services[activeIndex] || services[0];
  const content = useMemo(() => active ? localize(active, currentLang) : null, [active, currentLang]);

  useEffect(() => { const reload = () => { setServices(getStoredServices()); setActiveIndex(0); }; window.addEventListener(GAEKS_UPDATE_EVENT, reload); return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload); }, []);
  useEffect(() => {
    if (paused || services.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setActiveIndex((index) => (index + 1) % services.length), 5600);
    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, services.length]);

  if (!active || !content) return null;
  const move = (step: number) => setActiveIndex((index) => (index + step + services.length) % services.length);

  return (
    <aside aria-label={eyebrow} className="flex flex-col justify-end border-t border-white/25 py-8 lg:my-16 lg:border-l lg:border-t-0 lg:py-7 lg:pl-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">{eyebrow}</p>
      <div key={`${active.id}-${currentLang}`} className="service-headline-enter"><h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-4xl"><ServiceTitle title={content.title} /></h2><p className="mt-4 max-w-lg text-sm leading-6 text-slate-200 sm:text-base">{content.tagline}</p></div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/25 pt-5"><button type="button" onClick={() => onOpenService?.(active.id)} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline-offset-4 hover:underline">{detailLabel}<ArrowRight className="h-4 w-4" /></button><div className="flex items-center gap-2"><button type="button" onClick={() => move(-1)} aria-label="Layanan sebelumnya" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/35 text-white transition-colors hover:bg-white hover:text-[#062d32]"><ArrowLeft className="h-4 w-4" /></button><button type="button" onClick={() => move(1)} aria-label="Layanan berikutnya" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/35 text-white transition-colors hover:bg-white hover:text-[#062d32]"><ArrowRight className="h-4 w-4" /></button></div></div>
      <div className="mt-4 flex gap-1.5" aria-label="Pilih layanan">{services.map((service, index) => <button key={service.id} type="button" onClick={() => setActiveIndex(index)} aria-label={`Tampilkan ${localize(service, currentLang).title}`} aria-current={index === activeIndex ? 'true' : undefined} className="flex min-h-11 items-center"><span className={`block h-0.5 transition-[width,background-color] ${index === activeIndex ? 'w-8 bg-cyan-200' : 'w-3 bg-white/35 hover:bg-white/70'}`} /></button>)}</div>
    </aside>
  );
};
