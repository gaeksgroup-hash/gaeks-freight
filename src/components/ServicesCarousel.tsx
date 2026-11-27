import React, { useEffect, useId, useRef, useState } from 'react';
import { Anchor, ArrowRight, ArrowUpRight, Boxes, Check, ChevronDown, Container, FileCheck2, Layers, Plane, ShieldCheck, Ship, Truck, Warehouse } from 'lucide-react';
import { ServiceDetail, Language } from '../types/freight';
import { getStoredServices, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { ServiceTitle } from './ServiceTitle';
import { ServicesDirectory } from './ServicesDirectory';
import { servicePath } from '../utils/routes';

export const DETAILED_SERVICES: ServiceDetail[] = [
  {
    id: 'ppjk',
    title: 'PPJK (Customs Clearance)',
    title_en: 'PPJK Customs Clearance',
    title_zh: 'PPJK 专业海关清关',
    category: 'Legalitas & Kepabeanan',
    category_en: 'Customs Compliance',
    category_zh: '海关清关与合规',
    tagline: 'Penyelesaian PIB, PEB, jalur hijau, dan mitigasi demurrage pabean.',
    tagline_en: 'Swift PIB/PEB processing and port demurrage risk mitigation.',
    tagline_zh: '进出口报关单快速放行及滞港费用风险严格控制。',
    description: 'Kuasa kepabeanan resmi terhubung langsung ke portal INSW dan Ceisa Bea Cukai. Kami memastikan verifikasi dokumen, validasi HS code, dan kepatuhan perizinan impor bebas denda.',
    description_en: 'Licensed customs brokerage connected directly to INSW and Ceisa 4.0. We ensure document compliance, HS code verification, and zero-penalty customs audit.',
    description_zh: '直连印尼海关 Ceisa 4.0 及 INSW 系统，确保商品代码精准归类与免罚高效通关。',
    features: ['Penetapan Klasifikasi HS Code Akurat', 'Penanganan Jalur Hijau, Kuning, & Merah', 'Pengurusan Persetujuan Impor (PI) & Lartas'],
    equipment: 'Sistem Terintegrasi Ceisa 4.0 Bea Cukai',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    commodities: 'Komoditas industri, bahan baku, tekstil, mesin, barang umum (dapat dikonsultasikan)'
  },
  {
    id: 'gudang-pbm',
    title: 'Gudang & PBM (Bongkar Muat)',
    title_en: 'Stevedoring & Port Warehousing',
    title_zh: '装卸驳运与港口仓储',
    category: 'Perusahaan Bongkar Muat & Warehouse',
    category_en: 'Stevedoring & Warehouse',
    category_zh: '港区装卸与仓储物流',
    tagline: 'Stevedoring dermaga dan fasilitas pergudangan transit strategis.',
    tagline_en: 'Berth stevedoring and strategic transit storage.',
    tagline_zh: '专业码头驳运装卸及一线保税中转仓储。',
    description: 'Fasilitas bongkar muat kapal pelabuhan (stevedoring, cargodoring, receiving/delivery) didukung fasilitas gudang konsolidasi berstandar keamanan tinggi dekat area lini 1 dermaga.',
    description_en: 'Complete vessel stevedoring, cargodoring, and receiving/delivery supported by secure line-1 port warehouse facilities.',
    description_zh: '完备的货船装卸驳运及一线保税监管仓库配套。',
    features: ['Fasilitas Penyimpanan Kargo Kering & Tertutup', 'Armada Forklift 3T - 45T & Reach Stacker', 'Cross-docking, Sorting, & Palletizing'],
    equipment: 'Gudang Kawasan Pabean & Non-Pabean',
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    commodities: 'Curah kering, kargo palet, semen kemasan, bahan pangan industri'
  },
  {
    id: 'domestic-truck',
    title: 'Domestic Trucking',
    title_en: 'Inland Domestic Trucking',
    title_zh: '印尼内陆公路卡车运输',
    category: 'Inland Fleet Distribution',
    category_en: 'Inland Fleet',
    category_zh: '内陆车队调度',
    tagline: 'Armada distribusi multi-moda dari pelabuhan langsung ke pabrik Anda.',
    tagline_en: 'Multimodal delivery straight from container terminal to factory.',
    tagline_zh: '自营重型卡车车队，码头直达工厂仓库。',
    description: 'Layanan angkutan darat terjadwal yang menjangkau seluruh pulau Jawa, Sumatra, dan Bali dengan pengawasan posisi armada via GPS satelit 24 jam nonstop.',
    description_en: 'Scheduled road freight spanning Java, Sumatra, and Bali backed by 24/7 real-time satellite GPS tracking.',
    description_zh: '覆盖爪哇、苏门答腊及巴厘岛的全程卫星定位卡车运输。',
    features: ['Trailer Petikemas 20ft & 40ft (Standar & HC)', 'Truk CDD Box, Fuso Berat, hingga Wingbox 32T', 'Monitoring GPS Terintegrasi Real-time'],
    equipment: '100+ Unit Armada Siap Jalan',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    commodities: 'Kargo industri, consumer goods, semen, bahan bangunan, suku cadang'
  },
  {
    id: 'project-cargo',
    title: 'Project Cargo & Heavy Lift',
    title_en: 'Project Cargo & Heavy Lift',
    title_zh: '重大件与工程特种物流',
    category: 'Specialized Industrial Logistics',
    category_en: 'Heavy Machinery Transport',
    category_zh: '超重超宽大件运输',
    tagline: 'Breakbulk & RoRo untuk alat berat tambang, dump truck, dan modul industri raksasa.',
    tagline_en: 'Breakbulk & RoRo solutions for heavy mining dump trucks and massive industrial modules.',
    tagline_zh: '重大件散杂货 (Breakbulk) 与滚装 (Ro-Ro) 运输矿山自卸车及重型工业装备。',
    description: 'Solusi angkutan muatan berbobot ekstrem dan berdimensi raksasa untuk proyek energi, konstruksi pabrik, armada dump truck pertambangan, genset pembangkit, dan transformator.',
    description_en: 'Heavy-lift logistics for power generation, smelters, mining dump trucks, manufacturing plants, and heavy industrial machinery.',
    description_zh: '矿山重型自卸车、电站发电机组、大型冶金设备综合专案运输方案。',
    features: ['Survei Rute Jalan & Analisis Kekuatan Jembatan', 'Armada Multi-Axle Modular Hydraulic Trailer', 'Pengapalan Kapal Breakbulk & Kapal Ro-Ro'],
    equipment: 'Multi-Axle Modular Hydraulic Trailer',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    commodities: 'Dump truck tambang, excavator, mesin pabrik, turbin pembangkit, tangki industri, baja'
  },
  {
    id: 'lcl',
    title: 'LCL (Less than Container Load)',
    title_en: 'LCL Ocean Consolidation',
    title_zh: '海运散货拼箱 (LCL)',
    category: 'Konsolidasi Laut Ekonomis',
    category_en: 'Sea Consolidation',
    category_zh: '经济型海运拼箱',
    tagline: 'Kirim barang tanpa harus menyewa satu peti kemas penuh.',
    tagline_en: 'Cost-effective consolidation without booking an entire container.',
    tagline_zh: '按立方米计费，无需租赁整箱即可出运。',
    description: 'Solusi hemat bagi importir dan UKM dengan volume di bawah 15 CBM melalui sistem konsolidasi mingguan terjadwal dari hub Asia Timur dan Asean.',
    description_en: 'Economical cargo consolidation for shipments under 15 CBM with weekly sailing schedules from Asian manufacturing ports.',
    description_zh: '每周固定船期，散货拼箱直达印尼海关监管仓库快速拆箱。',
    features: ['Perhitungan Tarif Berbasis Kubikasi Murni (CBM)', 'Jadwal Konsolidasi Mingguan Tetap', 'Unstuffing Cepat di CFS Gudang Pelabuhan'],
    equipment: 'Weekly Dedicated Consolidation Box',
    imageUrl: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80',
    commodities: 'Barang retail, palet kemasan kayu, spare parts, sampel bahan, perlengkapan bisnis'
  },
  {
    id: 'fcl',
    title: 'FCL (Full Container Load)',
    title_en: 'FCL Ocean Freight',
    title_zh: '海运整箱 (FCL)',
    category: 'Kontainer Eksklusif Internasional',
    category_en: 'Container Liner Slot',
    category_zh: '集装箱整箱国际订舱',
    tagline: 'Pelayaran kontainer samudra penuh langsung ke pelabuhan utama Indonesia.',
    tagline_en: 'Direct ocean carrier booking with dedicated full container slots.',
    tagline_zh: '整箱国际海运直航订舱，专属集装箱安全出运。',
    description: 'Penyediaan kontainer 20ft, 40ft General Purpose, 40ft High Cube, Reefer berpendingin, serta Open Top untuk rute utama langsung ke Jakarta, Semarang, dan Surabaya.',
    description_en: 'Dedicated 20ft, 40ft GP, 40ft HC, Reefer, and Open Top equipment with direct calls to Tanjung Priok, Tanjung Emas, and Tanjung Perak.',
    description_zh: '提供 20GP/40GP/40HQ 及特种箱，直航印尼三大核心海港。',
    features: ['Alokasi Ruang Kapal Dijamin Saat Peak Season', 'Free Time Demurrage & Detention Lebih Panjang', 'Pilihan Door-to-Door atau Port-to-Port Transparan'],
    equipment: 'Kontainer 20ft, 40ft GP, 40ft HC, Reefer',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    commodities: 'Manufaktur massal, bahan baku kimia, resin, komoditas ekspor'
  },
  {
    id: 'air-shipment',
    title: 'Air Shipment Priority',
    title_en: 'Priority Air Cargo',
    title_zh: '优先航空货运',
    category: 'Kargo Udara Ekspres',
    category_en: 'Express Airfreight',
    category_zh: '时效级航空快运',
    tagline: 'Penanganan kargo udara di apron bandara untuk kargo berprioritas kritis.',
    tagline_en: 'Airport tarmac cargo handling for critical time-sensitive shipments.',
    tagline_zh: '机场停机坪及货运站快速装运，紧急备件极速出运。',
    description: 'Layanan kargo udara reguler dan charter untuk suku cadang mesin mendesak, sampel komersial, kargo bernilai tinggi, dan komoditas time-sensitive dengan pemrosesan AWB kilat di bandara.',
    description_en: 'Priority airfreight and charter solutions for urgent machine spare parts, commercial samples, and high-value commodities with rapid airport terminal processing.',
    description_zh: '客机腹舱与全货机直航，机场货站优先配舱与快速分拨。',
    features: ['Next-Flight-Out Prioritas Tertinggi', 'Door-to-Airport & Door-to-Door Handling', 'Pengurusan Dokumen Air Waybill (AWB) Kilat'],
    equipment: 'Direct Space Contract Airline Partner',
    imageUrl: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1200&q=80',
    commodities: 'Sampel ekspor, suku cadang mesin, elektronik presisi, farmasi'
  },
  {
    id: 'undername-impor',
    title: 'Undername Impor & Persetujuan Impor (PI)',
    category: 'Importasi dan perizinan',
    tagline: 'Bahas kebutuhan undername dan PI berdasarkan komoditas serta dokumen impor.',
    description: 'GAEKS menyediakan jasa undername impor dan pendampingan pengurusan Persetujuan Impor (PI). Kebutuhan PI dan kelayakan proses ditinjau berdasarkan HS code, spesifikasi barang, serta ketentuan yang berlaku.',
    landingTitle: 'Undername Impor & Persetujuan Impor',
    landingDescription: 'Dua kebutuhan yang sering bertemu dalam satu shipment: penggunaan entitas importir dan pemeriksaan izin PI. Jelaskan barang serta dokumen Anda agar tim dapat meninjau langkah yang relevan.',
    features: ['Konsultasi skema undername impor', 'Pemeriksaan kebutuhan Persetujuan Impor', 'Peninjauan dokumen dan HS code'],
    equipment: 'Peninjauan dokumen impor sesuai kebutuhan komoditas',
    imageUrl: '/uploads/gaeks-hero-cargo-poster.webp',
    commodities: 'Kebutuhan impor yang dapat ditinjau berdasarkan jenis barang dan peraturan',
  }
];


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

  const getLocalized = (service: ServiceDetail) => ({
    title: currentLang === 'en' ? service.title_en || service.title : currentLang === 'zh' ? service.title_zh || service.title : service.title,
    category: currentLang === 'en' ? service.category_en || service.category : currentLang === 'zh' ? service.category_zh || service.category : service.category,
    tagline: currentLang === 'en' ? service.tagline_en || service.tagline : currentLang === 'zh' ? service.tagline_zh || service.tagline : service.tagline,
    description: currentLang === 'en' ? service.description_en || service.description : currentLang === 'zh' ? service.description_zh || service.description : service.description,
  });

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
