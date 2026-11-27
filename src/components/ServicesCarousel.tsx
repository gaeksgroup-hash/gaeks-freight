import React, { useEffect, useId, useRef, useState } from 'react';
import { Anchor, ArrowRight, ArrowUpRight, Boxes, Check, ChevronDown, Container, FileCheck2, Layers, Plane, ShieldCheck, Ship, Truck, Warehouse } from 'lucide-react';
import { ServiceDetail, Language } from '../types/freight';
import { getStoredServices, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { DETAILED_SERVICES } from '../data/defaultServices';
import { localizeService } from '../utils/localizeContent';
import { ServiceTitle } from './ServiceTitle';
import { ServicesDirectory } from './ServicesDirectory';
import { servicePath } from '../utils/routes';

export { DETAILED_SERVICES };


const serviceIcon = (id: string) => {
  if (id === 'ppjk') return FileCheck2;
  if (id === 'gudang-pbm') return Warehouse;
  if (id === 'domestic-truck') return Truck;
  if (id === 'project-cargo') return Anchor;
  if (id === 'lcl') return Boxes;
  if (id === 'fcl') return Container;
  if (id === 'air-shipment') return Plane;
  if (id === 'undername-impor') return ShieldCheck;
  if (id.includes('roro')) return Ship;
  return Layers;
};

const previewPhotoUrl = (url: string) =>
  url.includes('images.unsplash.com')
    ? url
        .replace(/([?&])w=\d+/i, '$1w=720')
        .replace(/([?&])q=\d+/i, '$1q=70') + (url.includes('fm=') ? '' : '&fm=webp')
    : url;

export const ServicesCarousel: React.FC<{
  onSelectService: (serviceName: string) => void;
  onOpenService?: (serviceId: string) => void;
  onViewAll?: () => void;
  currentLang?: Language;
  standalone?: boolean;
}> = ({ onSelectService, onOpenService, onViewAll, currentLang = 'id', standalone = false }) => {
  const [servicesList, setServicesList] = useState<ServiceDetail[]>(getStoredServices());
  const [activeId, setActiveId] = useState<string>('');
  const [hoverId, setHoverId] = useState<string>('');
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [reveal, setReveal] = useState<'static' | 'entered'>('static');
  const sectionRef = useRef<HTMLDivElement>(null);
  const decodedCacheRef = useRef<Set<string>>(new Set());
  const timelineId = useId();

  useEffect(() => {
    const reload = () => {
      const next = getStoredServices();
      setServicesList(next);
      setActiveId((cur) => (cur && next.some((s) => s.id === cur) ? cur : ''));
      setHoverId((cur) => (cur && next.some((s) => s.id === cur) ? cur : ''));
      setSpotlightIndex(0);
    };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        setIsInView(visible);
        if (visible && !reduced) setReveal('entered');
      },
      { threshold: 0.05, rootMargin: '140px 0px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const ensureDecoded = React.useCallback((url: string): Promise<void> => {
    if (!url || decodedCacheRef.current.has(url)) return Promise.resolve();
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      const finish = () => {
        decodedCacheRef.current.add(url);
        resolve();
      };
      img.onload = () => {
        if (typeof img.decode === 'function') {
          img.decode().then(finish, finish);
        } else {
          finish();
        }
      };
      img.onerror = () => resolve();
      img.src = url;
    });
  }, []);

  // Warm up next 2 slides quietly after entering view so transitions never stutter.
  useEffect(() => {
    if (!isInView || standalone || servicesList.length < 2) return;
    for (const offset of [1, 2]) {
      const candidate = servicesList[(spotlightIndex + offset) % servicesList.length];
      if (candidate?.imageUrl && !failedImages[candidate.id]) {
        void ensureDecoded(previewPhotoUrl(candidate.imageUrl));
      }
    }
  }, [isInView, standalone, spotlightIndex, servicesList, failedImages, ensureDecoded]);

  const getLocalized = (service: ServiceDetail) => localizeService(service, currentLang);

  const spotlightService = servicesList[spotlightIndex % Math.max(1, servicesList.length)] || servicesList[0];
  const expandedService = activeId ? servicesList.find((s) => s.id === activeId) : undefined;
  const hoveredService = hoverId ? servicesList.find((s) => s.id === hoverId) : undefined;
  const activeDisplayService = expandedService || hoveredService || spotlightService || servicesList[0];
  const displayContent = activeDisplayService ? getLocalized(activeDisplayService) : null;
  const targetPhotoSrc =
    activeDisplayService && !failedImages[activeDisplayService.id] && activeDisplayService.imageUrl
      ? previewPhotoUrl(activeDisplayService.imageUrl)
      : '/uploads/gaeks-hero-cargo-poster.webp';

  const [baseSrc, setBaseSrc] = useState<string>(targetPhotoSrc);
  const [overlaySrc, setOverlaySrc] = useState<string>('');
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const isFading = Boolean(overlaySrc);

  // Chained 1.5s slideshow: waits for image decode and transition settle so slides never stutter or collide.
  useEffect(() => {
    if (standalone || !isInView || paused || activeId || isFading || servicesList.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (document.hidden) return;
      const nextIdx = (spotlightIndex + 1) % servicesList.length;
      const nextSvc = servicesList[nextIdx];
      const nextUrl =
        nextSvc?.imageUrl && !failedImages[nextSvc.id] ? previewPhotoUrl(nextSvc.imageUrl) : '/uploads/gaeks-hero-cargo-poster.webp';
      void Promise.race([ensureDecoded(nextUrl), new Promise<void>((r) => window.setTimeout(r, 900))]).then(() => {
        if (!cancelled) setSpotlightIndex(nextIdx);
      });
    }, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [standalone, isInView, paused, activeId, isFading, spotlightIndex, servicesList, failedImages, ensureDecoded]);

  useEffect(() => {
    if (standalone || !targetPhotoSrc || targetPhotoSrc === baseSrc) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBaseSrc(targetPhotoSrc);
      setOverlaySrc('');
      setOverlayVisible(false);
      return;
    }
    let cancelled = false;
    void ensureDecoded(targetPhotoSrc).then(() => {
      if (cancelled) return;
      setOverlayVisible(false);
      setOverlaySrc(targetPhotoSrc);
    });
    return () => {
      cancelled = true;
    };
  }, [standalone, targetPhotoSrc, baseSrc, ensureDecoded]);

  useEffect(() => {
    if (!overlaySrc) return;
    const showFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setOverlayVisible(true));
    });
    const commit = window.setTimeout(() => {
      setBaseSrc(overlaySrc);
      setOverlaySrc('');
      setOverlayVisible(false);
    }, 520);
    return () => {
      window.cancelAnimationFrame(showFrame);
      window.clearTimeout(commit);
    };
  }, [overlaySrc]);

  if (standalone) return <ServicesDirectory services={servicesList} currentLang={currentLang} onSelectService={onSelectService} onOpenService={onOpenService} />;

  const toggleService = (id: string) => {
    setActiveId((current) => (current === id ? '' : id));
  };

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      data-reveal="custom"
      className="section-block bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHoverId('');
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={sectionRef}
        data-timeline-reveal={reveal}
        className="page-shell services-flow grid min-w-0 grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-16"
      >
        <header className="min-w-0 lg:sticky lg:top-24">
          <p className="section-label">Layanan</p>
          <h2 id="services-title" className="section-title">Layanan freight forwarding dan kepabeanan.</h2>
          <p className="section-copy">Pengiriman laut, udara, dan darat, serta dukungan kepabeanan dan pergudangan sesuai kebutuhan kargo.</p>

          {activeDisplayService && displayContent && (
            <div className="services-flow-preview mt-7 hidden overflow-hidden rounded-2xl border border-[#d4dedd] bg-[#062d32] text-white shadow-[0_18px_40px_-24px_rgba(8,47,52,0.45)] lg:block">
              <div className="services-flow-media relative aspect-[16/10] overflow-hidden bg-[#041e23]">
                <img
                  src={baseSrc}
                  alt={displayContent.title}
                  decoding="async"
                  fetchPriority="low"
                  onError={() => {
                    if (activeDisplayService) setFailedImages((prev) => ({ ...prev, [activeDisplayService.id]: true }));
                    setBaseSrc('/uploads/gaeks-hero-cargo-poster.webp');
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {overlaySrc && (
                  <img
                    src={overlaySrc}
                    alt=""
                    aria-hidden="true"
                    decoding="async"
                    onError={() => {
                      if (activeDisplayService) setFailedImages((prev) => ({ ...prev, [activeDisplayService.id]: true }));
                      setOverlaySrc('');
                      setOverlayVisible(false);
                    }}
                    className={`services-fade-layer absolute inset-0 h-full w-full object-cover ${overlayVisible ? 'is-visible' : ''}`}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(3,25,30,0.92)_100%)]" aria-hidden="true" />
                <div key={activeDisplayService.id} className="services-flow-caption pointer-events-none absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-200">{displayContent.category}</p>
                  <p className="mt-1 text-lg font-bold leading-snug text-white">
                    <ServiceTitle title={displayContent.title} />
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
                <a
                  href={servicePath(activeDisplayService.id)}
                  onClick={(event) => {
                    if (onOpenService && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
                      event.preventDefault();
                      onOpenService(activeDisplayService.id);
                    }
                  }}
                  className="btn-press inline-flex min-h-11 items-center gap-2 font-bold text-cyan-200 transition-colors hover:text-white"
                >
                  <span>Pelajari layanan</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <span className="font-mono text-xs font-semibold tabular-nums text-cyan-100/80">
                  {servicesList.length} layanan tersedia
                </span>
              </div>
            </div>
          )}

          {onViewAll && (
            <button type="button" onClick={onViewAll} className="button-link mt-5">
              <span>Lihat seluruh direktori layanan</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </header>

        <ol className="shipping-timeline services-timeline min-w-0 !mt-0" aria-label="Daftar layanan GAEKS">
          {servicesList.map((service, index) => {
            const item = getLocalized(service);
            const Icon = serviceIcon(service.id);
            const expanded = activeId === service.id;
            const highlighted = !activeId && (hoverId ? hoverId === service.id : spotlightService?.id === service.id);
            const triggerId = `${timelineId}-svc-trigger-${service.id}`;
            const panelId = `${timelineId}-svc-panel-${service.id}`;
            const thumbSrc =
              !failedImages[service.id] && service.imageUrl ? previewPhotoUrl(service.imageUrl) : '/uploads/gaeks-hero-cargo-poster.webp';

            return (
              <li
                key={service.id}
                className="shipping-step"
                data-active={expanded}
                data-spotlight={highlighted}
                style={{ '--step-index': index } as React.CSSProperties}
                onMouseEnter={() => setHoverId(service.id)}
              >
                <span className="shipping-step-number services-step-icon-node" aria-hidden="true">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.85} />
                </span>
                <div className="shipping-step-card">
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      className="shipping-step-trigger"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => toggleService(service.id)}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[#12363a]">
                          <ServiceTitle title={item.title} />
                        </span>
                        <span className="mt-0.5 block text-xs font-medium text-slate-600">{item.category}</span>
                      </span>
                      <ChevronDown className="shipping-step-chevron" aria-hidden="true" />
                    </button>
                  </h3>

                  <div id={panelId} role="region" aria-labelledby={triggerId} aria-hidden={!expanded} className="shipping-step-panel">
                    <div className="shipping-step-panel-inner">
                      <div className="services-step-body px-3.5 pb-5 pt-1 sm:px-5">
                        <img
                          src={thumbSrc}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          onError={() => setFailedImages((prev) => ({ ...prev, [service.id]: true }))}
                          className="mb-3.5 h-36 w-full rounded-lg object-cover lg:hidden"
                        />
                        <p className="text-sm font-semibold leading-6 text-[#12363a]">{item.tagline}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                        {service.features?.length > 0 && (
                          <ul className="mt-4 grid gap-1.5">
                            {service.features.slice(0, 3).map((feature) => (
                              <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0a5861]" aria-hidden="true" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <button type="button" onClick={() => onSelectService(service.id)} className="button-primary btn-press">
                            <span>Minta estimasi</span>
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <a
                            href={servicePath(service.id)}
                            onClick={(event) => {
                              if (onOpenService && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
                                event.preventDefault();
                                onOpenService(service.id);
                              }
                            }}
                            className="button-link"
                          >
                            <span>Detail layanan</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
