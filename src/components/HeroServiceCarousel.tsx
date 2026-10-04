import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Language, ServiceDetail } from '../types/freight';
import { GAEKS_UPDATE_EVENT, getStoredServices } from '../utils/adminStorage';

interface HeroServiceCarouselProps {
  currentLang: Language;
  onOpenService?: (serviceId: string) => void;
  detailLabel: string;
}

const localize = (service: ServiceDetail, language: Language) => ({
  title: language === 'en' ? service.title_en || service.title : language === 'zh' ? service.title_zh || service.title : service.title,
  tagline: language === 'en' ? service.tagline_en || service.tagline : language === 'zh' ? service.tagline_zh || service.tagline : service.tagline
});

export const HeroServiceCarousel: React.FC<HeroServiceCarouselProps> = ({ currentLang, onOpenService, detailLabel }) => {
  const [services, setServices] = useState<ServiceDetail[]>(getStoredServices());
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const activeService = services[activeIndex] || services[0];
  const activeContent = useMemo(() => activeService ? localize(activeService, currentLang) : null, [activeService, currentLang]);

  useEffect(() => {
    const reload = () => {
      setServices(getStoredServices());
      setActiveIndex(0);
    };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || services.length < 2) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((index) => (index + 1) % services.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, services.length]);

  useEffect(() => {
    if (services.length < 2) return;
    const timer = window.setTimeout(() => {
      const next = new Image();
      next.decoding = 'async';
      next.src = services[(activeIndex + 1) % services.length].imageUrl;
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [activeIndex, services]);

  const move = (nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex((index) => (index + nextDirection + services.length) % services.length);
  };
  if (!activeService || !activeContent) return null;

  return (
    <div className="relative h-full w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div key={activeService.id} className="absolute inset-0" initial={reduceMotion ? false : { opacity: 0, x: direction * 28, scale: 1.035 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, x: direction * -18 }} transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}>
          <img src={activeService.imageUrl} alt={activeContent.title} width="1200" height="800" decoding="async" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082e33]/95 via-[#082e33]/15 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white sm:p-7">
        <AnimatePresence mode="wait">
          <motion.div key={activeService.id + '-copy'} initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -10 }} transition={{ duration: reduceMotion ? 0 : 0.42, ease: 'easeOut' }}>
            <h2 className="max-w-lg text-2xl font-bold leading-tight sm:text-3xl">{activeContent.title}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200">{activeContent.tagline}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/25 pt-4">
          <button type="button" onClick={() => onOpenService?.(activeService.id)} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline-offset-4 hover:underline">{detailLabel}<ArrowRight className="h-4 w-4" /></button>
          <div className="flex gap-2">
            <button type="button" onClick={() => move(-1)} aria-label="Layanan sebelumnya" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/35 bg-[#082e33]/65 hover:bg-[#082e33]"><ArrowLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Layanan berikutnya" className="inline-flex min-h-11 min-w-11 items-center justify-center border border-white/35 bg-[#082e33]/65 hover:bg-[#082e33]"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
