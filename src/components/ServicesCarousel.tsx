// filepath: /src/components/ServicesCarousel.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowUpRight, Play, Pause, ShieldCheck } from 'lucide-react';
import { ServiceDetail, Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

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
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1000&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1000&q=80',
    commodities: 'Sampel ekspor, suku cadang mesin, elektronik presisi, farmasi'
  }
];

export const ServicesCarousel: React.FC<{ onSelectService: (serviceName: string) => void; currentLang?: Language }> = ({ onSelectService, currentLang = 'id' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DETAILED_SERVICES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered]);

  const total = DETAILED_SERVICES.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const getLocalized = (svc: ServiceDetail) => ({
    ...svc,
    title: currentLang === 'en' ? svc.title_en || svc.title : currentLang === 'zh' ? svc.title_zh || svc.title : svc.title,
    category: currentLang === 'en' ? svc.category_en || svc.category : currentLang === 'zh' ? svc.category_zh || svc.category : svc.category,
    tagline: currentLang === 'en' ? svc.tagline_en || svc.tagline : currentLang === 'zh' ? svc.tagline_zh || svc.tagline : svc.tagline,
    description: currentLang === 'en' ? svc.description_en || svc.description : currentLang === 'zh' ? svc.description_zh || svc.description : svc.description,
  });

  const centerItem = getLocalized(DETAILED_SERVICES[currentIndex]);
  const leftItem = getLocalized(DETAILED_SERVICES[prevIndex]);
  const rightItem = getLocalized(DETAILED_SERVICES[nextIndex]);

  return (
    <section 
      id="services" 
      className="py-24 bg-slate-50 border-y border-slate-200 text-slate-900 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bersih */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
              {getTranslation(currentLang, UI_TEXT.services.tag)}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {getTranslation(currentLang, UI_TEXT.services.title)}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              {getTranslation(currentLang, UI_TEXT.services.desc)}
            </p>
          </div>

          {/* Minimalist Controls */}
          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label="Toggle Auto-Slide"
              className={`p-3 rounded-xl border text-xs font-bold transition-all shadow-sm ${
                isPlaying 
                  ? 'bg-white border-slate-200 text-slate-700 hover:border-blue-500' 
                  : 'bg-amber-50 border-amber-300 text-amber-700'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-700" /> : <Play className="w-4 h-4 fill-amber-700" />}
            </button>

            <button 
              onClick={() => setCurrentIndex(prevIndex)} 
              aria-label="Previous Service"
              className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setCurrentIndex(nextIndex)} 
              aria-label="Next Service"
              className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- 3D ETALASE SHOWCASE --- */}
        <div className="relative py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* KARTU KIRI (BURAM) */}
            <div 
              onClick={() => setCurrentIndex(prevIndex)}
              className="hidden lg:block lg:col-span-3 cursor-pointer transform scale-95 opacity-55 hover:opacity-85 transition-all duration-700 filter blur-[1.5px] hover:blur-none"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md h-[460px] flex flex-col justify-between overflow-hidden">
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img src={leftItem.imageUrl} alt={leftItem.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                    {leftItem.category}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800 line-clamp-2">{leftItem.title}</h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3">"{leftItem.tagline}"</p>
                </div>
                <div className="text-xs text-blue-600 font-bold mt-4">
                  {currentIndex === 0 ? total : currentIndex} / {total}
                </div>
              </div>
            </div>

            {/* KARTU TENGAH (UTAMA & TAJAM) */}
            <div className="lg:col-span-6 z-20 transform scale-100 transition-all duration-700">
              <div className="bg-white rounded-3xl border-2 border-blue-600 ring-4 ring-blue-500/10 shadow-2xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative">
                
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider">
                    {centerItem.category}
                  </span>
                  <div className="flex items-center space-x-1.5 text-emerald-600 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Layanan Resmi Gaek</span>
                  </div>
                </div>

                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-md">
                  <img src={centerItem.imageUrl} alt={centerItem.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{centerItem.title}</h3>
                  <p className="text-sm sm:text-base font-semibold text-blue-700">"{centerItem.tagline}"</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{centerItem.description}</p>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                    <strong className="text-blue-700 font-bold block mb-1">
                      {getTranslation(currentLang, UI_TEXT.services.commoditiesLabel)}
                    </strong>
                    {centerItem.commodities}
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                      {getTranslation(currentLang, UI_TEXT.services.featuresLabel)}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {centerItem.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => onSelectService(centerItem.title)}
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>{getTranslation(currentLang, UI_TEXT.services.quoteBtn)}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                  <div className="text-xs font-semibold text-slate-500">
                    {getTranslation(currentLang, UI_TEXT.services.standardLabel)} <span className="text-slate-900 font-bold">{centerItem.equipment}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* KARTU KANAN (BURAM) */}
            <div 
              onClick={() => setCurrentIndex(nextIndex)}
              className="hidden lg:block lg:col-span-3 cursor-pointer transform scale-95 opacity-55 hover:opacity-85 transition-all duration-700 filter blur-[1.5px] hover:blur-none"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md h-[460px] flex flex-col justify-between overflow-hidden">
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img src={rightItem.imageUrl} alt={rightItem.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                    {rightItem.category}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800 line-clamp-2">{rightItem.title}</h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3">"{rightItem.tagline}"</p>
                </div>
                <div className="text-xs text-blue-600 font-bold mt-4 flex items-center justify-end">
                  {nextIndex + 1} / {total}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Minimal Indicators */}
        <div className="mt-8 flex justify-center items-center space-x-2">
          {DETAILED_SERVICES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
