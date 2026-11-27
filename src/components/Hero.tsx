import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calculator, PackageSearch, Route } from 'lucide-react';
import { Language } from '../types/freight';
import { DEFAULT_HERO, getStoredHero, getStoredServices, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
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
    trackingTitle: 'Shipment Track', trackingDescription: 'Status & milestone kargo',
    utilities: [['Lacak shipment', 'AWB, B/L, GJO, atau kontainer', 'tracking'], ['Hitung kebutuhan kargo', 'CBM dan berat volumetrik', 'calculator'], ['Cari rute pengiriman', 'Jadwal laut dan udara', 'network']]
  },
  en: {
    eyebrow: 'Freight forwarding and customs', title: 'Cargo moves better with a clear plan.',
    body: 'GAEKS coordinates ocean and air freight, customs clearance, and inland delivery through one operations team.',
    primary: 'Request an estimate', secondary: 'View services', detail: 'View details', featured: 'Selected service',
    trackingTitle: 'Shipment Track', trackingDescription: 'Cargo status & milestones',
    utilities: [['Track a shipment', 'AWB, B/L, GJO, or container', 'tracking'], ['Calculate cargo', 'CBM and volumetric weight', 'calculator'], ['Find a route', 'Ocean and air schedules', 'network']]
  },
  zh: {
    eyebrow: '货运代理与清关服务', title: '清晰规划，让货物高效流转。', body: 'GAEKS 通过一个运营团队协调海运、空运、清关和陆路配送。',
    primary: '获取估算', secondary: '查看服务', detail: '查看详情', featured: '精选服务',
    trackingTitle: '查询货件', trackingDescription: '货物状态与运输节点',
    utilities: [['查询货件', '空运单、提单、工单或集装箱', 'tracking'], ['计算货物数据', '体积与体积重量', 'calculator'], ['查找运输路线', '海运及空运班次', 'network']]
  }
} as const;

const icons = [PackageSearch, Calculator, Route];
const imageVariant = (url: string, width: number) => url.includes('images.unsplash.com') ? url.replace(/([?&])w=\d+/i, `$1w=${width}`).replace(/([?&])q=\d+/i, '$1q=72') : url;
const missingHeroPoster = '/uploads/1791915131-e31c7018-lv_0_20261004214354-poster-optimized.webp';
const missingHeroVideo = '/uploads/1791915131-8afd4eca-lv_0_20261004214354-optimized.webm';

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenService, currentLang = 'id' }) => {
  const [heroSettings, setHeroSettings] = useState(getStoredHero());
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const baseText = copy[currentLang];
  const liveTitle = `${heroSettings.titlePrefix}${heroSettings.titleHighlight}${heroSettings.titleSuffix}`;
  const defaultTitle = `${DEFAULT_HERO.titlePrefix}${DEFAULT_HERO.titleHighlight}${DEFAULT_HERO.titleSuffix}`;
  const pickHeroCopy = (live: string, fallbackDefault: string, translated: string) =>
    currentLang === 'id' || live.trim() !== fallbackDefault.trim() ? live : translated;
  const text = {
    ...baseText,
    eyebrow: pickHeroCopy(heroSettings.eyebrow, DEFAULT_HERO.eyebrow, baseText.eyebrow),
    title: pickHeroCopy(liveTitle, defaultTitle, baseText.title),
    body: pickHeroCopy(heroSettings.caption, DEFAULT_HERO.caption, baseText.body),
    primary: pickHeroCopy(heroSettings.primaryLabel, DEFAULT_HERO.primaryLabel, baseText.primary),
    secondary: pickHeroCopy(heroSettings.secondaryLabel, DEFAULT_HERO.secondaryLabel, baseText.secondary),
  };
  const firstService = getStoredServices()[0];
  const [posterFailed, setPosterFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const posterUrl = posterFailed || heroSettings.imageUrl === missingHeroPoster ? '/uploads/gaeks-hero-cargo-poster.webp' : heroSettings.imageUrl || firstService?.imageUrl;
  const videoUrl = heroSettings.videoUrl === missingHeroVideo ? '/uploads/gaeks-hero-cargo-optimized.webm' : heroSettings.videoUrl;
  const posterSrcSet = posterUrl?.includes('images.unsplash.com') ? [720, 1280, 1920].map((width) => `${imageVariant(posterUrl, width)} ${width}w`).join(', ') : undefined;
  const mobileVideoUrl = videoUrl === '/uploads/gaeks-hero-cargo-optimized.webm' ? '/uploads/gaeks-hero-cargo-mobile.webm' : null;
  const videoType = /\.mp4(?:\?|$)/i.test(videoUrl) ? 'video/mp4' : 'video/webm';

  useEffect(() => {
    const reload = () => { setHeroSettings(getStoredHero()); setLoadVideo(false); setVideoVisible(false); setPosterFailed(false); setVideoFailed(false); };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  useEffect(() => {
    if (heroSettings.bgType !== 'video' || !videoUrl || videoFailed || heroSettings.videoLoadMode === 'poster-only' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (heroSettings.videoLoadMode === 'adaptive' && window.innerWidth < 768) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData) return;
    if (heroSettings.videoLoadMode === 'adaptive' && ['slow-2g', '2g', '3g'].includes(connection?.effectiveType || '')) return;
    let timerId: number | undefined;
    let idleId: number | undefined;
    const triggerVideo = () => {
      const delay = Math.max(400, Number(heroSettings.videoLoadDelayMs) || 1200);
      timerId = window.setTimeout(() => setLoadVideo(true), delay);
    };
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idleId = window.requestIdleCallback(triggerVideo, { timeout: 1500 });
      } else {
        triggerVideo();
      }
    };
    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }
    return () => {
      window.removeEventListener('load', schedule);
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [heroSettings.bgType, heroSettings.videoLoadMode, heroSettings.videoLoadDelayMs, videoUrl, videoFailed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!loadVideo || !video) return;
    const syncPlayback = () => {
      if (document.hidden) video.pause();
      else void video.play().catch(() => setVideoVisible(false));
    };
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    return () => document.removeEventListener('visibilitychange', syncPlayback);
  }, [loadVideo, videoUrl]);

  return (
    <section id="home" aria-labelledby="hero-title" className="border-b border-slate-200 bg-[#062d32] pt-16 text-white">
      <div className="relative isolate overflow-hidden">
        {heroSettings.bgType !== 'none' && posterUrl && <img src={imageVariant(posterUrl, 1920)} srcSet={posterSrcSet} sizes="100vw" alt="" width="1920" height="1080" decoding="async" fetchPriority="high" onError={() => setPosterFailed(true)} className={`absolute inset-0 -z-30 h-full w-full object-cover ${heroSettings.bgType === 'video' ? `hero-poster-motion ${videoVisible ? 'hero-poster-paused' : ''}` : ''}`} />}
        {heroSettings.bgType === 'video' && loadVideo && !videoFailed && videoUrl && <video ref={videoRef} key={videoUrl} className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-700 ${videoVisible ? 'opacity-100' : 'opacity-0'}`} autoPlay muted loop playsInline preload="metadata" poster={posterUrl} aria-hidden="true" onPlaying={() => setVideoVisible(true)} onError={() => {setVideoVisible(false);setVideoFailed(true);}}>{mobileVideoUrl && <source src={mobileVideoUrl} type="video/webm" media="(max-width: 767px)" />}<source src={videoUrl} type={videoType} /></video>}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,29,33,.83)_0%,rgba(3,29,33,.67)_54%,rgba(3,29,33,.42)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(3,29,33,.78)_0%,rgba(3,29,33,.59)_58%,rgba(3,29,33,.78)_100%)]" />
        <div className="page-shell grid min-h-[600px] min-w-0 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-16">
          <div className="min-w-0 flex flex-col justify-center py-14 sm:py-20 lg:py-24">
            <p className="hero-choreo-lead text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">{text.eyebrow}</p>
            <h1 id="hero-title" className="hero-choreo-lead mt-5 max-w-3xl break-words font-display text-3xl font-bold leading-[1.04] tracking-[-0.04em] text-white min-[360px]:text-4xl sm:text-5xl lg:text-6xl">{text.title}</h1>
            <p className="hero-choreo-support mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">{text.body}</p>
            <div className="hero-choreo-support mt-7">
              <a href="/tracking/" onClick={(event) => { if (onNavigate) { event.preventDefault(); onNavigate('tracking'); } }} className="hero-track-cta group" aria-label={`${text.trackingTitle}: ${text.trackingDescription}`}>
                <span className="hero-track-icon" aria-hidden="true"><PackageSearch className="h-5 w-5" /></span>
                <span className="min-w-0 text-left"><strong className="block text-sm leading-tight">{text.trackingTitle}</strong><span className="mt-0.5 block text-[11px] font-medium text-cyan-100/80">{text.trackingDescription}</span></span>
                <ArrowRight className="hero-track-arrow ml-1 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
              </a>
            </div>
            <div className="hero-choreo-action mt-5 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => onNavigate?.('calculator')} className="btn-press inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-[#062d32] transition-colors hover:bg-cyan-200">{text.primary}<ArrowRight className="h-4 w-4" /></button>
              <button type="button" onClick={() => onNavigate?.('services')} className="btn-press inline-flex min-h-11 items-center gap-2 px-1 text-sm font-bold text-white underline-offset-4 hover:underline">{text.secondary}<ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
          <HeroServiceHeadline currentLang={currentLang} onOpenService={onOpenService} detailLabel={text.detail} eyebrow={text.featured} />
        </div>
      </div>
      <div className="hero-utilities mx-auto grid max-w-7xl bg-white md:grid-cols-3">
        {text.utilities.map(([title, description, page], index) => { const Icon = icons[index]; return <button key={page} type="button" onClick={() => onNavigate?.(page)} className="hero-utility-item group flex min-h-[104px] items-center gap-4 border-b border-slate-200 px-5 py-5 text-left md:border-b-0 md:border-r last:border-r-0"><span className="hero-utility-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef5f4] text-[#0a5861]"><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="min-w-0 flex-1"><strong className="block text-sm font-bold text-[#12363a]">{title}</strong><span className="mt-1 block text-sm text-slate-600">{description}</span></span><ArrowRight className="hero-utility-arrow h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" /></button>; })}
      </div>
    </section>
  );
};
