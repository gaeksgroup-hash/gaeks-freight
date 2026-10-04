import React, { Suspense, useEffect, useState } from 'react';
import { ArrowRight, Calculator, PackageSearch, Route } from 'lucide-react';
import { Language } from '../types/freight';
import { getStoredHero, getStoredServices, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';

const HeroServiceCarousel = React.lazy(() => import('./HeroServiceCarousel').then((module) => ({ default: module.HeroServiceCarousel })));

export interface HeroProps {
  onNavigate?: (page: string) => void;
  onOpenService?: (serviceId: string) => void;
  currentLang?: Language;
}

const copy = {
  id: {
    eyebrow: 'Freight forwarding dan kepabeanan',
    title: 'Kargo bergerak dengan rencana yang jelas.',
    body: 'GAEKS mengatur freight laut dan udara, kepabeanan, serta pengiriman darat melalui satu tim operasional.',
    primary: 'Minta estimasi', secondary: 'Lihat layanan', detail: 'Lihat detail',
    utilities: [
      ['Lacak shipment', 'AWB, B/L, GJO, atau kontainer', 'tracking'],
      ['Hitung kebutuhan kargo', 'CBM dan berat volumetrik', 'calculator'],
      ['Cari rute pengiriman', 'Jadwal laut dan udara', 'network']
    ]
  },
  en: {
    eyebrow: 'Freight forwarding and customs',
    title: 'Cargo moves better with a clear plan.',
    body: 'GAEKS coordinates ocean and air freight, customs clearance, and inland delivery through one operations team.',
    primary: 'Request an estimate', secondary: 'View services', detail: 'View details',
    utilities: [
      ['Track a shipment', 'AWB, B/L, GJO, or container', 'tracking'],
      ['Calculate cargo', 'CBM and volumetric weight', 'calculator'],
      ['Find a route', 'Ocean and air schedules', 'network']
    ]
  },
  zh: {
    eyebrow: '货运代理与清关服务',
    title: '清晰规划，让货物高效流转。',
    body: 'GAEKS 通过一个运营团队协调海运、空运、清关和陆路配送。',
    primary: '获取估算', secondary: '查看服务', detail: '查看详情',
    utilities: [
      ['查询货件', '空运单、提单、工单或集装箱', 'tracking'],
      ['计算货物数据', '体积与体积重量', 'calculator'],
      ['查找运输路线', '海运及空运班次', 'network']
    ]
  }
} as const;

const icons = [PackageSearch, Calculator, Route];

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenService, currentLang = 'id' }) => {
  const [enhanced, setEnhanced] = useState(false);
  const [heroSettings, setHeroSettings] = useState(getStoredHero());
  const baseText = copy[currentLang];
  const text = currentLang === 'id' ? {
    ...baseText,
    eyebrow: heroSettings.eyebrow,
    title: `${heroSettings.titlePrefix}${heroSettings.titleHighlight}${heroSettings.titleSuffix}`,
    body: heroSettings.caption,
    primary: heroSettings.primaryLabel,
    secondary: heroSettings.secondaryLabel,
  } : baseText;
  const firstService = getStoredServices()[0];
  const backgroundUrl = heroSettings.bgType === 'video' ? heroSettings.videoUrl : heroSettings.imageUrl;

  useEffect(() => {
    const timer = window.setTimeout(() => setEnhanced(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reload = () => setHeroSettings(getStoredHero());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  return (
    <section id="home" aria-labelledby="hero-title" className="border-b border-slate-200 bg-[#062d32] pt-16 text-white">
      <div className="relative isolate overflow-hidden">
        {heroSettings.bgType === 'video' && backgroundUrl && <video key={backgroundUrl} className="absolute inset-0 -z-20 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={heroSettings.imageUrl || firstService?.imageUrl} aria-hidden="true"><source src={backgroundUrl} /></video>}
        {(heroSettings.bgType === 'image' || heroSettings.bgType === 'gif') && backgroundUrl && <img src={backgroundUrl} alt="" width="1920" height="1080" decoding="async" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover" />}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,29,33,.96)_0%,rgba(3,29,33,.86)_48%,rgba(3,29,33,.55)_100%)]" />
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex min-h-[520px] flex-col justify-center px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">{text.eyebrow}</p>
          <h1 id="hero-title" className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">{text.title}</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">{text.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => onNavigate?.('calculator')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-[#062d32] transition-colors hover:bg-cyan-200">{text.primary}<ArrowRight className="h-4 w-4" /></button>
            <button type="button" onClick={() => onNavigate?.('services')} className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-bold text-white underline-offset-4 hover:underline">{text.secondary}<ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden border-white/20 bg-[#0b3438] lg:m-8 lg:min-h-[456px] lg:border">
          <Suspense fallback={<HeroFallback imageUrl={firstService?.imageUrl} title={firstService?.title} />}>
            {enhanced ? <HeroServiceCarousel currentLang={currentLang} onOpenService={onOpenService} detailLabel={text.detail} /> : <HeroFallback imageUrl={firstService?.imageUrl} title={firstService?.title} />}
          </Suspense>
        </div>
      </div>
      </div>

      <div className="mx-auto grid max-w-7xl bg-white md:grid-cols-3">
        {text.utilities.map(([title, description, page], index) => {
          const Icon = icons[index];
          return (
            <button key={page} type="button" onClick={() => onNavigate?.(page)} className="group flex min-h-[112px] items-center gap-4 border-b border-slate-200 px-5 py-5 text-left transition-colors hover:bg-cyan-50 md:border-b-0 md:border-r last:border-r-0">
              <Icon className="h-5 w-5 shrink-0 text-cyan-700" />
              <span className="min-w-0 flex-1"><strong className="block text-sm font-bold text-[#12363a]">{title}</strong><span className="mt-1 block text-sm text-slate-500">{description}</span></span>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" />
            </button>
          );
        })}
      </div>
    </section>
  );
};

const HeroFallback: React.FC<{ imageUrl?: string; title?: string }> = ({ imageUrl, title }) => (
  <>
    <img src={imageUrl} alt={title || ''} width="1200" height="800" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#082e33]/80 via-transparent to-transparent" />
  </>
);
