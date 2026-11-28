import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calculator, PackageSearch, Route } from 'lucide-react';
import { Language } from '../types/freight';
import { DEFAULT_HERO, getStoredCorporate, getStoredHero, getStoredServices, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { HeroServiceHeadline } from './HeroServiceHeadline';

export interface HeroProps {
  onNavigate?: (page: string) => void;
  onOpenService?: (serviceId: string) => void;
  currentLang?: Language;
}

const copy = {
  id: {
    eyebrow: 'FREIGHT FORWARDING DAN LOGISTIK INTERNASIONAL',
    body: 'Kami memadukan keahlian, teknologi, dan tindakan nyata untuk menghadirkan solusi logistik yang lebih cepat, efisien, dan transparan.',
    primary: 'Minta Penawaran',
    secondary: 'Lihat Layanan',
    detail: 'Selengkapnya',
    featured: 'Layanan pilihan',
    trackingTitle: 'Pelacakan Pengiriman',
    trackingDescription: 'Status & milestone pengiriman',
    utilities: [
      ['Lacak Pengiriman', 'AWB, B/L, GJO, atau kontainer', 'tracking'],
      ['Kalkulator Kargo', 'CBM dan berat volumetrik', 'calculator'],
      ['Rute dan Jadwal', 'Jadwal laut dan udara', 'network'],
    ],
  },
  en: {
    eyebrow: 'INTERNATIONAL FREIGHT FORWARDING & LOGISTICS',
    body: 'We combine human expertise, intelligent technology, and real action to deliver faster, smarter, and more transparent logistics.',
    primary: 'Get a Quote',
    secondary: 'Services',
    detail: 'Learn More',
    featured: 'Selected service',
    trackingTitle: 'Shipment Tracking',
    trackingDescription: 'Cargo status & milestones',
    utilities: [
      ['Track Shipment', 'AWB, B/L, GJO, or container', 'tracking'],
      ['Cargo Calculator', 'CBM and volumetric weight', 'calculator'],
      ['Routes & Schedules', 'Ocean and air schedules', 'network'],
    ],
  },
  zh: {
    eyebrow: '国际货运代理与物流解决方案',
    body: '我们结合专业人力、智能技术与务实行动，为您提供更快速、高效且透明的国际物流方案。',
    primary: '获取报价',
    secondary: '查看服务',
    detail: '了解更多',
    featured: '精选服务',
    trackingTitle: '货物追踪',
    trackingDescription: '实时查询运输状态与节点',
    utilities: [
      ['追踪货件', '空运单、提单、工单或集装箱', 'tracking'],
      ['货物测算', '体积与体积重量换算', 'calculator'],
      ['航线与船期', '海运及空运班次', 'network'],
    ],
  },
} as const;

const icons = [PackageSearch, Calculator, Route];
const imageVariant = (url: string, width: number) =>
  url.includes('images.unsplash.com') ? url.replace(/([?&])w=\d+/i, `$1w=${width}`).replace(/([?&])q=\d+/i, '$1q=72') : url;
const missingHeroPoster = '/uploads/1791915131-e31c7018-lv_0_20261004214354-poster-optimized.webp';
const missingHeroVideo = '/uploads/1791915131-8afd4eca-lv_0_20261004214354-optimized.webm';
const legacyHeroTitles = new Set(['Kargo bergerak dengan rencana yang jelas.']);

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenService, currentLang = 'id' }) => {
  const [heroSettings, setHeroSettings] = useState(getStoredHero());
  const [corporate, setCorporate] = useState(getStoredCorporate());
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const reload = () => {
      const nextHero = getStoredHero();
      setHeroSettings((prev) => {
        if (prev.videoUrl !== nextHero.videoUrl || prev.bgType !== nextHero.bgType) {
          setLoadVideo(false);
          setVideoVisible(false);
        }
        return nextHero;
      });
      setCorporate(getStoredCorporate());
    };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const rawLiveTitle = `${heroSettings.titlePrefix}${heroSettings.titleHighlight}${heroSettings.titleSuffix}`.trim();
  const isDefaultHeroTitle = !rawLiveTitle || legacyHeroTitles.has(rawLiveTitle) || rawLiveTitle === `${DEFAULT_HERO.titlePrefix}${DEFAULT_HERO.titleHighlight}${DEFAULT_HERO.titleSuffix}`.trim();
  const officialTaglineLines =
    currentLang === 'en' ? corporate.brand.officialTaglineEn : corporate.brand.officialTaglineId;
  const preserveOfficialEnTagline = currentLang === 'en' && isDefaultHeroTitle;
  const baseText = copy[currentLang];

  const isLegacyCaption = heroSettings.caption.trim() === 'GAEKS mengatur freight laut dan udara, kepabeanan, serta pengiriman darat melalui satu tim operasional.';
  const liveBody = isLegacyCaption ? DEFAULT_HERO.caption : heroSettings.caption;
  const pickField = (live: string, defaultVal: string, translatedVal: string) =>
    currentLang === 'id' || live.trim() !== defaultVal.trim() ? live : translatedVal;

  const text = {
    ...baseText,
    eyebrow: pickField(heroSettings.eyebrow === 'Freight forwarding dan kepabeanan' ? DEFAULT_HERO.eyebrow : heroSettings.eyebrow, DEFAULT_HERO.eyebrow, baseText.eyebrow),
    body: pickField(liveBody, DEFAULT_HERO.caption, baseText.body),
    primary: pickField(heroSettings.primaryLabel === 'Minta estimasi' ? DEFAULT_HERO.primaryLabel : heroSettings.primaryLabel, DEFAULT_HERO.primaryLabel, baseText.primary),
    secondary: pickField(heroSettings.secondaryLabel === 'Lihat layanan' ? DEFAULT_HERO.secondaryLabel : heroSettings.secondaryLabel, DEFAULT_HERO.secondaryLabel, baseText.secondary),
  };

  const firstService = getStoredServices()[0];
  const [posterFailed, setPosterFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const posterUrl = posterFailed || heroSettings.imageUrl === missingHeroPoster ? '/uploads/gaeks-hero-cargo-poster.webp' : heroSettings.imageUrl || firstService?.imageUrl;
  const videoUrl = heroSettings.videoUrl === missingHeroVideo ? '/uploads/gaeks-hero-cargo-optimized.webm' : heroSettings.videoUrl;
  const posterSrcSet = posterUrl?.includes('images.unsplash.com') ? [720, 1280, 1920].map((width) => `${imageVariant(posterUrl, width)} ${width}w`).join(', ') : undefined;
  const mobileVideoUrl = videoUrl === '/uploads/gaeks-hero-cargo-optimized.webm' ? '/uploads/gaeks-hero-cargo-mobile.webm' : null;
  const isCompactViewport = typeof window !== 'undefined' && window.innerWidth < 768;
  const activeVideoSrc = isCompactViewport && mobileVideoUrl ? mobileVideoUrl : videoUrl;

  useEffect(() => {
    if (loadVideo || heroSettings.bgType !== 'video' || !videoUrl || videoFailed || heroSettings.videoLoadMode === 'poster-only' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (connection?.saveData) return;
    if (heroSettings.videoLoadMode === 'adaptive' && ['slow-2g', '2g'].includes(connection?.effectiveType || '')) return;
    let timerId: number | undefined;
    const rawDelay = Number(heroSettings.videoLoadDelayMs);
    // Stream right after initial render frame without artificial 1200-1400ms wait (and avoid rAF throttling in background tabs).
    const effectiveDelay = Number.isFinite(rawDelay) && rawDelay > 0 && rawDelay !== 1400 && rawDelay !== 1200 ? Math.min(rawDelay, 600) : 0;
    timerId = window.setTimeout(() => setLoadVideo(true), effectiveDelay);
    return () => {
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [loadVideo, heroSettings.bgType, heroSettings.videoLoadMode, heroSettings.videoLoadDelayMs, videoUrl, videoFailed]);

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
        {heroSettings.bgType !== 'none' && posterUrl && (
          <img
            src={imageVariant(posterUrl, 1920)}
            srcSet={posterSrcSet}
            sizes="100vw"
            alt=""
            width="1920"
            height="1080"
            decoding="async"
            fetchPriority="high"
            onError={() => setPosterFailed(true)}
            className={`absolute inset-0 -z-30 h-full w-full object-cover ${
              heroSettings.bgType === 'video' ? `hero-poster-motion ${videoVisible ? 'hero-poster-paused' : ''}` : ''
            }`}
          />
        )}
        {heroSettings.bgType === 'video' && loadVideo && !videoFailed && activeVideoSrc && (
          <video
            ref={videoRef}
            key={activeVideoSrc}
            src={activeVideoSrc}
            className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-500 ${videoVisible ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterUrl}
            aria-hidden="true"
            onCanPlay={(event) => {
              if (!document.hidden && event.currentTarget.paused) {
                void event.currentTarget.play().catch(() => {});
              }
            }}
            onPlaying={() => setVideoVisible(true)}
            onError={() => {
              setVideoVisible(false);
              setVideoFailed(true);
            }}
          />
        )}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,29,33,.86)_0%,rgba(3,29,33,.68)_54%,rgba(3,29,33,.44)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(3,29,33,.82)_0%,rgba(3,29,33,.62)_58%,rgba(3,29,33,.82)_100%)]" />
        <div className="page-shell grid min-h-[600px] min-w-0 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-16">
          <div className="min-w-0 flex flex-col justify-center py-14 sm:py-20 lg:py-24">
            <p className="hero-choreo-lead text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">{text.eyebrow}</p>
            <h1
              id="hero-title"
              className={`hero-choreo-lead mt-5 max-w-3xl break-words font-display text-3xl font-bold leading-[1.06] tracking-[-0.035em] text-white min-[360px]:text-4xl sm:text-5xl lg:text-[3.35rem] ${
                preserveOfficialEnTagline ? 'notranslate' : ''
              }`}
              translate={preserveOfficialEnTagline ? 'no' : undefined}
            >
              {isDefaultHeroTitle
                ? officialTaglineLines.map((line, idx) => (
                    <React.Fragment key={line}>
                      {idx > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))
                : `${heroSettings.titlePrefix}${heroSettings.titleHighlight}${heroSettings.titleSuffix}`}
            </h1>
            <p className="hero-choreo-support mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">{text.body}</p>
            <div className="hero-choreo-support mt-7">
              <a
                href="/tracking/"
                onClick={(event) => {
                  if (onNavigate) {
                    event.preventDefault();
                    onNavigate('tracking');
                  }
                }}
                className="hero-track-cta group"
                aria-label={`${text.trackingTitle}: ${text.trackingDescription}`}
              >
                <span className="hero-track-icon" aria-hidden="true">
                  <PackageSearch className="h-5 w-5" />
                </span>
                <span className="min-w-0 text-left">
                  <strong className="block text-sm leading-tight">{text.trackingTitle}</strong>
                  <span className="mt-0.5 block text-[11px] font-medium text-cyan-100/80">{text.trackingDescription}</span>
                </span>
                <ArrowRight className="hero-track-arrow ml-1 h-4 w-4 shrink-0 text-cyan-200" aria-hidden="true" />
              </a>
            </div>
            <div className="hero-choreo-action mt-5 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) {
                    window.history.pushState({}, '', '/kontak/#quote-form');
                    onNavigate('contact');
                    window.setTimeout(() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
                  }
                }}
                className="btn-press inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold text-[#012E34] transition-colors hover:bg-cyan-200"
              >
                {text.primary}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('services')}
                className="btn-press inline-flex min-h-11 items-center gap-2 px-1 text-sm font-bold text-white underline-offset-4 hover:underline"
              >
                {text.secondary}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <HeroServiceHeadline currentLang={currentLang} onOpenService={onOpenService} detailLabel={text.detail} eyebrow={text.featured} />
        </div>
      </div>
      <div className="hero-utilities mx-auto grid max-w-7xl bg-white md:grid-cols-3">
        {text.utilities.map(([title, description, page], index) => {
          const Icon = icons[index];
          return (
            <button
              key={page}
              type="button"
              onClick={() => onNavigate?.(page)}
              className="hero-utility-item group flex min-h-[104px] items-center gap-4 border-b border-slate-200 px-5 py-5 text-left md:border-b-0 md:border-r last:border-r-0"
            >
              <span className="hero-utility-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef5f4] text-[#0a5861]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <strong className="block text-sm font-bold text-[#12363a]">{title}</strong>
                <span className="mt-1 block text-sm text-slate-600">{description}</span>
              </span>
              <ArrowRight className="hero-utility-arrow h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
};
