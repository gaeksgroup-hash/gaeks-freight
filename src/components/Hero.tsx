import React, { useEffect, useState } from 'react';
import { ArrowRight, Calculator, PackageSearch, Route } from 'lucide-react';
import { Language } from '../types/freight';
import { getStoredHero, getStoredServices, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { HeroServiceHeadline } from './HeroServiceHeadline';

export interface HeroProps {
  onNavigate?: (page: string) => void;
  onOpenService?: (serviceId: string) => void;
  currentLang?: Language;
}

const copy = {
  id: {
    eyebrow: 'Freight forwarding dan kepabeanan', title: 'Kargo bergerak dengan rencana yang jelas.',
    body: 'GAEKS mengatur freight laut dan udara, kepabeanan, serta pengiriman darat melalui satu tim operasional.',
    primary: 'Minta estimasi', secondary: 'Lihat layanan', detail: 'Lihat detail', featured: 'Layanan pilihan',
    utilities: [['Lacak shipment', 'AWB, B/L, GJO, atau kontainer', 'tracking'], ['Hitung kebutuhan kargo', 'CBM dan berat volumetrik', 'calculator'], ['Cari rute pengiriman', 'Jadwal laut dan udara', 'network']]
  },
  en: {
    eyebrow: 'Freight forwarding and customs', title: 'Cargo moves better with a clear plan.',
    body: 'GAEKS coordinates ocean and air freight, customs clearance, and inland delivery through one operations team.',
    primary: 'Request an estimate', secondary: 'View services', detail: 'View details', featured: 'Selected service',
    utilities: [['Track a shipment', 'AWB, B/L, GJO, or container', 'tracking'], ['Calculate cargo', 'CBM and volumetric weight', 'calculator'], ['Find a route', 'Ocean and air schedules', 'network']]
  },
  zh: {
    eyebrow: '货运代理与清关服务', title: '清晰规划，让货物高效流转。', body: 'GAEKS 通过一个运营团队协调海运、空运、清关和陆路配送。',
    primary: '获取估算', secondary: '查看服务', detail: '查看详情', featured: '精选服务',
    utilities: [['查询货件', '空运单、提单、工单或集装箱', 'tracking'], ['计算货物数据', '体积与体积重量', 'calculator'], ['查找运输路线', '海运及空运班次', 'network']]
  }
} as const;

const icons = [PackageSearch, Calculator, Route];
const imageVariant = (url: string, width: number) => url.includes('images.unsplash.com') ? url.replace(/([?&])w=\d+/i, `$1w=${width}`).replace(/([?&])q=\d+/i, '$1q=72') : url;

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenService, currentLang = 'id' }) => {
  const [heroSettings, setHeroSettings] = useState(getStoredHero());
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const baseText = copy[currentLang];
  const text = currentLang === 'id' ? { ...baseText, eyebrow: heroSettings.eyebrow, title: `${heroSettings.titlePrefix}${heroSettings.titleHighlight}${heroSettings.titleSuffix}`, body: heroSettings.caption, primary: heroSettings.primaryLabel, secondary: heroSettings.secondaryLabel } : baseText;
  const firstService = getStoredServices()[0];
  const posterUrl = heroSettings.imageUrl || firstService?.imageUrl;
  const posterSrcSet = posterUrl?.includes('images.unsplash.com') ? [720, 1280, 1920].map((width) => `${imageVariant(posterUrl, width)} ${width}w`).join(', ') : undefined;

  useEffect(() => {
    const reload = () => { setHeroSettings(getStoredHero()); setLoadVideo(false); setVideoVisible(false); };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  useEffect(() => {
    if (heroSettings.bgType !== 'video' || !heroSettings.videoUrl || heroSettings.videoLoadMode === 'poster-only' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (heroSettings.videoLoadMode === 'adaptive' && window.matchMedia('(max-width: 1023px)').matches) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g' || connection?.effectiveType === '3g') return;
    let idleId = 0;
    let fallbackTimer = 0;
    let started = false;
    const startVideo = () => { if (!started) { started = true; setLoadVideo(true); } };
    const timer = setTimeout(() => {
      const idleWindow = window as Window & { requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number };
      if (typeof idleWindow.requestIdleCallback === 'function') {
        idleId = idleWindow.requestIdleCallback(startVideo, { timeout: 2000 });
        fallbackTimer = setTimeout(startVideo, 2200);
      } else startVideo();
    }, Math.max(0, Math.min(10000, Number(heroSettings.videoLoadDelayMs) || 0)));
    return () => { if (idleId) window.cancelIdleCallback(idleId); window.clearTimeout(timer); if (fallbackTimer) window.clearTimeout(fallbackTimer); };
  }, [heroSettings.bgType, heroSettings.videoLoadDelayMs, heroSettings.videoLoadMode, heroSettings.videoUrl]);

  return (
    <section id="home" aria-labelledby="hero-title" className="border-b border-slate-200 bg-[#062d32] pt-16 text-white">
      <div className="relative isolate overflow-hidden">
        {heroSettings.bgType !== 'none' && posterUrl && <img src={imageVariant(posterUrl, 1920)} srcSet={posterSrcSet} sizes="100vw" alt="" width="1920" height="1080" decoding="async" className="absolute inset-0 -z-30 h-full w-full object-cover" />}
        {heroSettings.bgType === 'video' && loadVideo && heroSettings.videoUrl && <video key={heroSettings.videoUrl} className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-700 ${videoVisible ? 'opacity-100' : 'opacity-0'}`} autoPlay muted loop playsInline preload="none" poster={posterUrl} aria-hidden="true" onCanPlay={() => setVideoVisible(true)}><source src={heroSettings.videoUrl} /></video>}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,29,33,.96)_0%,rgba(3,29,33,.82)_55%,rgba(3,29,33,.58)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(3,29,33,.93)_0%,rgba(3,29,33,.78)_58%,rgba(3,29,33,.9)_100%)]" />
        <div className="page-shell grid min-h-[600px] min-w-0 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-16">
          <div className="min-w-0 flex flex-col justify-center py-14 sm:py-20 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">{text.eyebrow}</p>
            <h1 id="hero-title" className="mt-5 max-w-3xl break-words font-display text-3xl font-bold leading-[1.04] tracking-[-0.04em] text-white min-[360px]:text-4xl sm:text-5xl lg:text-6xl">{text.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">{text.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4"><button type="button" onClick={() => onNavigate?.('calculator')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-[#062d32] transition-colors hover:bg-cyan-200">{text.primary}<ArrowRight className="h-4 w-4" /></button><button type="button" onClick={() => onNavigate?.('services')} className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-bold text-white underline-offset-4 hover:underline">{text.secondary}<ArrowRight className="h-4 w-4" /></button></div>
          </div>
          <HeroServiceHeadline currentLang={currentLang} onOpenService={onOpenService} detailLabel={text.detail} eyebrow={text.featured} />
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl bg-white md:grid-cols-3">
        {text.utilities.map(([title, description, page], index) => { const Icon = icons[index]; return <button key={page} type="button" onClick={() => onNavigate?.(page)} className="group flex min-h-[104px] items-center gap-4 border-b border-slate-200 px-5 py-5 text-left transition-colors hover:bg-cyan-50 md:border-b-0 md:border-r last:border-r-0"><Icon className="h-5 w-5 shrink-0 text-cyan-700" /><span className="min-w-0 flex-1"><strong className="block text-sm font-bold text-[#12363a]">{title}</strong><span className="mt-1 block text-sm text-slate-500">{description}</span></span><ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1" /></button>; })}
      </div>
    </section>
  );
};
