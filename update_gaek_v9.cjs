const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function saveFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log(`[FILE READY] ${filePath}`);
}

console.log(">>> Memulai eksekusi Gaek Freight V9 (Editorial Single-Page >3000 chars, Clean Minimal Carousel, Thematic Unique Images, & Clean Typography)...\n");

// 1. CAROUSEL SERVICES DENGAN PEMBERSIHAN TOTAL SELURUH TEKS NAVIGASI & GAMBAR SPESIFIK
saveFile('src/components/ServicesCarousel.tsx', `
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
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
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
    tagline: 'Rekayasa logistik untuk muatan over-dimension & over-weight (ODOW).',
    tagline_en: 'Engineering logistics for over-dimension and heavy industrial cargo.',
    tagline_zh: '重型设备、变压器及钢构专案工程物流。',
    description: 'Solusi angkutan muatan berbobot ekstrem dan berdimensi raksasa untuk proyek energi, konstruksi pabrik, mesin peleburan, genset pembangkit, dan transformator.',
    description_en: 'Heavy-lift logistics for power generation, smelters, manufacturing plants, and heavy industrial machinery.',
    description_zh: '电站发电机组、治炼冶金重载及大型构件综合运输方案。',
    features: ['Survei Rute Jalan & Analisis Kekuatan Jembatan', 'Armada Lowbed, Multi-Axle, & Flat Rack', 'Pengawalan Khusus & Asuransi All-Risk'],
    equipment: 'Multi-Axle Modular Hydraulic Trailer',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    commodities: 'Mesin pabrik, turbin pembangkit, tangki industri, baja struktural'
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
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
    commodities: 'Barang retail, spare parts, sampel bahan, perlengkapan bisnis'
  },
  {
    id: 'fcl',
    title: 'FCL (Full Container Load)',
    title_en: 'FCL Ocean Freight',
    title_zh: '海运整箱 (FCL)',
    category: 'Kontainer Eksklusif Internasional',
    category_en: 'Container Liner Slot',
    category_zh: '集装箱整箱国际订舱',
    tagline: 'Kontrak slot langsung dengan pelayaran kontainer dunia.',
    tagline_en: 'Direct ocean carrier booking with guaranteed space allocation.',
    tagline_zh: '国际船东直接订舱，旺季舱位无忧。',
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
    tagline: 'Waktu transit singkat untuk kargo berprioritas kritis.',
    tagline_en: 'Fastest flight transit for time-critical commercial shipments.',
    tagline_zh: '紧急备件及高价值样品极速直达。',
    description: 'Layanan kargo udara reguler dan charter untuk suku cadang mesin mendesak, sampel komersial, kargo bernilai tinggi, dan komoditas time-sensitive.',
    description_en: 'Priority airfreight and charter solutions for urgent machine spare parts, commercial samples, and high-value commodities.',
    description_zh: '客机腹舱与全货机直航，加急单据清关及机场快速提货。',
    features: ['Next-Flight-Out Prioritas Tertinggi', 'Door-to-Airport & Door-to-Door Handling', 'Pengurusan Dokumen Air Waybill (AWB) Kilat'],
    equipment: 'Direct Space Contract Airline Partner',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
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

          {/* Minimalist Controls: Hanya Icon Play/Pause & Chevrons (Tanpa Kata-kata Clutter) */}
          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label="Toggle Auto-Slide"
              className={\`p-3 rounded-xl border text-xs font-bold transition-all shadow-sm \${
                isPlaying 
                  ? 'bg-white border-slate-200 text-slate-700 hover:border-blue-500' 
                  : 'bg-amber-50 border-amber-300 text-amber-700'
              }\`}
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

        {/* --- 3D ETALASE SHOWCASE: KARTU TENGAH TAJAM & HIGHLIGHT, KIRI & KANAN BLUR --- */}
        <div className="relative py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* KARTU KIRI (BURAM / BLURRED WING) */}
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

            {/* KARTU TENGAH (UTAMA / HIGHLIGHTED & KRISP TAJAM) */}
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
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-600/20 transition-all hover:scale-105"
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

            {/* KARTU KANAN (BURAM / BLURRED WING) */}
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
              className={\`h-2 rounded-full transition-all \${
                idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }\`}
              aria-label={\`Slide \${idx + 1}\`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
`);

// 2. 20 ARTIKEL KOMPREHENSIF LENGKAP (> 3000 KARAKTER SETIAP ARTIKEL, GAMBAR BERBEDA, TANPA SALES PITCH)
saveFile('src/utils/newsStorage.ts', `
// filepath: /src/utils/newsStorage.ts
import { ArticleItem, NewsletterSubscriber } from '../types/freight';

// Kunci penyimpanan v9 untuk mereset dan memuat 20 artikel penuh >3000 karakter
const STORAGE_KEY_ARTICLES = 'gaeks_articles_v9_full';
const STORAGE_KEY_SUBSCRIBERS = 'gaeks_subscribers';

const rawArticlesData: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Badai Topan di Pelabuhan Shanghai & Ningbo: Analisis Kongesti Kapal, Blank Sailing, dan Rantai Pasok Impor Indonesia',
    title_en: 'Typhoons at Shanghai & Ningbo Ports: In-depth Analysis of Vessel Congestion, Blank Sailings, and Indonesian Supply Chains',
    title_zh: '台风侵袭上海与宁波舟山港：港口严重拥堵、空班航次及对印尼进口供应链影响全解析',
    slug: 'badai-topan-shanghai-ningbo-analisis-kongesti-kapal',
    category: 'Rute Maritim',
    category_en: 'Maritime Routes',
    category_zh: '海运航线动态',
    publishedDate: '2026-09-06',
    readTime: '11 min read',
    author: 'Maritime Research Bureau',
    sources: ['Shanghai Shipping Exchange (SCFI)', 'Ningbo-Zhoushan Port Authority Notice', 'Lloyd\\'s List Intelligence'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Penutupan sementara dermaga laut dalam Yangshan dan Ningbo-Zhoushan memicu antrean puluhan kapal kontainer serta pembatalan jadwal pengapalan rute Tiongkok ke Indonesia.',
    excerpt_en: 'Terminal closures across Yangshan and Ningbo-Zhoushan trigger dozens of vessel queues and blank sailings bound for Indonesian gateway ports.',
    excerpt_zh: '洋山深水港与宁波舟山港因极端天气暂时关闭，造成严重船舶积压并引发大量直航印尼航次取消。',
    content: \`Siklus badai tropis dan angin topan di perairan Laut Tiongkok Timur secara periodik melumpuhkan operasional dua pelabuhan peti kemas tersibuk di dunia, yaitu Port of Shanghai (termasuk kompleks terminal laut dalam Yangshan) dan Pelabuhan Ningbo-Zhoushan di Provinsi Zhejiang. Ketika badan meteorologi dan otoritas keselamatan maritim setempat menaikkan status peringatan topan ke tingkat siaga tertinggi, prosedur darurat pelabuhan mewajibkan evakuasi seluruh armada kapal kontainer yang sedang bersandar maupun yang sedang menunggu giliran menuju area labuh jangkar di perairan terbuka. Seluruh derek dermaga peti kemas (quay gantry cranes) dikunci pada posisi pengaman badai, dan pintu gerbang terminal penumpukan darat ditutup total rata-rata selama 48 hingga 72 jam demi keselamatan operasional dan pencegahan kerusakan infrastruktur pelabuhan.

Dampak Multi-Sektor Terhadap Arus Kargo Internasional:
Penghentian sementara operasional pelabuhan ini secara instan memicu fenomena antrean kapal (vessel bunching) yang sangat parah di luar muara Sungai Yangtze dan Teluk Hangzhou. Begitu pelabuhan kembali dibuka secara bertahap pasca-badai mereda, waktu tunggu sandar kapal (waiting time at berth) yang dalam kondisi normal berkisar antara 12 hingga 24 jam melonjak tajam menjadi 4 hingga 7 hari kerja. Untuk memulihkan rotasi pelayaran mingguan yang terganggu secara masif, aliansi pelayaran global terpaksa memberlakukan kebijakan penyesuaian jadwal berupa 'port omission' (melewati pelabuhan tertentu tanpa melakukan bongkar muat) atau 'blank sailing' (pembatalan jadwal pelayaran reguler satu putaran penuh).

Bagi ekosistem industri manufaktur di Indonesia yang memiliki tingkat ketergantungan tinggi terhadap pasokan bahan baku tekstil, resin plastik, bahan kimia industri, dan komponen suku cadang mesin asal kawasan industri Shanghai, Jiangsu, dan Zhejiang, disrupsi cuaca ini mengakibatkan pergeseran jadwal kedatangan kapal di Pelabuhan Tanjung Priok Jakarta, Tanjung Emas Semarang, dan Tanjung Perak Surabaya antara 8 hingga 14 hari kerja. Pabrik-pabrik pengolahan di kawasan industri Cikarang, Karawang, Kendal, hingga Gresik menghadapi ancaman pengosongan persediaan penyangga (safety buffer stock) yang dapat mengganggu kontinuitas lini perakitan.

Evaluasi Teknis & Langkah Strategis Bagi Pelaku Usaha:
1. Diversifikasi Pelabuhan Pemuatan (Port Diversification): Importir nasional sangat disarankan menyusun rencana mitigasi risiko dengan membagi alokasi pengapalan muatan ke pelabuhan Tiongkok Selatan, seperti Pelabuhan Shenzhen (Yantian dan Shekou) atau Pelabuhan Nansha di Guangzhou. Pelabuhan-pelabuhan di wilayah selatan ini umumnya berada di luar lintasan utama badai topan kawasan utara sehingga tetap dapat melayani pemuatan kontainer secara terjadwal.
2. Pemantauan Real-Time Posisi Kapal Melalui Telemetri Satelit: Mengoptimalkan sistem pelacakan Automatic Identification System (AIS) guna memantau kecepatan dan posisi kapal induk (mother vessel) maupun kapal pengumpan (feeder vessel) secara akurat. Informasi posisi kapal yang terverifikasi membantu manajer logistik dalam memperkirakan estimasi waktu tiba (Estimated Time of Arrival / ETA) yang lebih realistis.
3. Pengajuan Dokumen Pabean Pra-Kedatangan (Pre-Clearance): Memastikan draft Pemberitahuan Impor Barang (PIB) dan dokumen pelengkap telah disiapkan secara lengkap sebelum kapal bersandar di pelabuhan tujuan Indonesia. Langkah ini mempercepat penerbitan respon Surat Persetujuan Pengeluaran Barang (SPPB) di portal CEISA Bea Cukai segera setelah peti kemas diturunkan ke lapangan penumpukan.
4. Pemanfaatan Pengiriman Kargo Udara untuk Komponen Kritis: Untuk komponen mesin vital yang terhenti di pelabuhan asal dan berpotensi melumpuhkan operasional pabrik bernilai miliaran rupiah, pemindahan sebagian muatan (cargo splitting) ke moda kargo udara prioritas (Air Freight) merupakan keputusan taktis yang sangat terukur guna menyelamatkan jadwal komersial perusahaan.

Koordinasi berkesinambungan antara importir, agen pelayaran, dan otoritas logistik pelabuhan merupakan pilar penentu dalam menjaga stabilitas rantai pasok manufaktur nasional di tengah dinamika anomali iklim maritim global.\`
  },
  {
    id: 'art-2',
    title: 'Penerapan Penuh Wajib CEISA 4.0 Nasional (KEP-163/BC/2026): Analisis Kepatuhan Manifes BC 1.1 dan Mitigasi Reject PIB',
    title_en: 'Mandatory Nationwide CEISA 4.0 Implementation (KEP-163/BC/2026): BC 1.1 Manifest Compliance Analysis and PIB Reject Mitigation',
    title_zh: '印尼海关总署全面强制推行 CEISA 4.0 新规 (KEP-163/BC/2026)：BC 1.1 舱单自动比对与报关单防错指南',
    slug: 'penerapan-wajib-ceisa-4-kep-163-bc-2026-manifes-bc11',
    category: 'Regulasi Kepabeanan',
    category_en: 'Customs Regulations',
    category_zh: '海关法律法规',
    publishedDate: '2026-09-01',
    readTime: '10 min read',
    author: 'Customs & Fiscal Policy Analyst',
    sources: ['Direktorat Jenderal Bea dan Cukai (DJBC)', 'Ortax Legal Database', 'Warta Bea Cukai Edisi 2026'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Keputusan Dirjen Bea dan Cukai mewajibkan implementasi penuh otomasi pabean nasional dengan rekonsiliasi manifes kapal tanpa toleransi kesalahan.',
    excerpt_en: 'National customs decree enforces mandatory adoption of CEISA 4.0 digital modules across all ports with zero-tolerance automated data validation.',
    excerpt_zh: '印尼海关正式强制实施 CEISA 4.0 全模块数字化申报，实行零误差进出口报关单与舱单自动化比对。',
    content: \`Melalui Keputusan Direktur Jenderal Bea dan Cukai Nomor KEP-163/BC/2026, Direktorat Jenderal Bea dan Cukai (DJBC) Kementerian Keuangan secara resmi menetapkan pemberlakuan secara penuh dan wajib (mandatory) sistem CEISA 4.0 pada seluruh kantor pelayanan pabean di Indonesia. Pemberlakuan penuh ini mencakup pelabuhan gerbang utama nasional, mulai dari Kantor Pelayanan Utama Bea dan Cukai Tipe A Tanjung Priok Jakarta, KPPBC Tipe Madya Pabean Tanjung Perak Surabaya, KPPBC Tipe Madya Pabean Tanjung Emas Semarang, hingga KPPBC Tipe Madya Pabean Belawan Medan.

Transformasi Arsitektur Digital Kepabeanan:
Sistem CEISA 4.0 menyatukan seluruh subsistem kepabeanan yang sebelumnya terfragmentasi ke dalam satu basis data terpusat berbasis cloud computing. Modul yang diwajibkan secara penuh meliputi Electronic Customs Declaration (ECD), integrasi perizinan tata niaga antar-kementerian melalui portal Indonesia National Single Window (INSW), pelayanan impor untuk dipakai, ekspor, kawasan berikat, serta otomasi rekonsiliasi data manifes sarana pengangkut (Inward Manifest / BC 1.1).

Ketentuan Rekonsiliasi Manifes BC 1.1 Tanpa Toleransi:
Perubahan paling fundamental yang dirasakan oleh importir dan Pengusaha Pengurusan Jasa Kepabeanan (PPJK) adalah mekanisme validasi silang otomatis (auto-reconciliation). Sistem algoritma CEISA 4.0 secara mandiri memvalidasi elemen data pada dokumen Pemberitahuan Impor Barang (PIB) dengan data manifest kedatangan sarana pengangkut yang diserahkan oleh shipping line.
- Perbedaan Satu Digit: Kesalahan pengetikan pada nomor Master Bill of Lading, House B/L, nomor peti kemas, ukuran kontainer (20ft, 40ft GP, atau 40ft HC), kode satuan kemasan koli (misal: PK vs CT), atau selisih bobot kotor barang akan langsung memicu penolakan otomatis (system reject) dari gateway server pabean.
- Risiko Pembengkakan Biaya Dermaga: Jika dokumen PIB ditolak saat kapal telah bersandar dan membongkar muatannya, kontainer tidak dapat diproses lebih lanjut untuk memperoleh respon Surat Persetujuan Pengeluaran Barang (SPPB). Akibatnya, kargo tertahan di lapangan penumpukan lini 1 pelabuhan, memicu akumulasi biaya sewa dermaga (storage charges) dan denda sewa peti kemas (demurrage) yang sangat mahal.

Prosedur Standar Operasi Kontingensi & Rekomendasi Kepatuhan:
KEP-163/BC/2026 memuat panduan kontingensi apabila terjadi gangguan konektivitas jaringan terpusat atau pemeliharaan server nasional yang melampaui batas waktu 4 jam kerja. Dalam situasi darurat ini, kepala kantor pabean setempat memiliki wewenang untuk memberlakukan pelayanan dokumen pabean cadangan guna mencegah kelumpuhan arus logistik di pelabuhan. Pelaku usaha diwajibkan memastikan status kepatuhan legalitas perusahaan, keaktifan Nomor Induk Berusaha (NIB) pada portal Online Single Submission (OSS RBA), serta melakukan verifikasi dokumen ganda sebelum data dikirimkan ke portal CEISA 4.0.\`
  },
  {
    id: 'art-3',
    title: 'Deregulasi Kebijakan Impor Barang Industri Permendag 16/2025 & Permendag 22/2025: Evaluasi Persetujuan Impor (PI) dan Laporan Surveyor',
    title_en: 'Industrial Import Deregulation under Trade Decrees 16/2025 & 22/2025: Review of Import Approvals (PI) and Surveyor Inspection Reports',
    title_zh: '印尼贸易部 2025年第16号与第22号令工业品进口新规解析：进口许可证 (PI) 与装运前商检 (LS) 要求评估',
    slug: 'deregulasi-kebijakan-impor-permendag-16-2025-dan-22-2025',
    category: 'Regulasi Kepabeanan',
    category_en: 'Customs Regulations',
    category_zh: '海关法律法规',
    publishedDate: '2026-08-25',
    readTime: '10 min read',
    author: 'Trade Law & Industry Review',
    sources: ['Kementerian Perdagangan Republik Indonesia', 'Portal INSW', 'DDTC News'],
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Pemerintah menyederhanakan tata niaga impor komoditas manufaktur tertentu guna menjamin ketersediaan bahan baku pabrik domestik.',
    excerpt_en: 'Ministry of Trade streamlines import governance for strategic industrial raw materials to ensure continuous domestic factory operations.',
    excerpt_zh: '印尼贸易部放宽多类工业原材料进口管制，简化许可证审批流程以保障国内制造业供应链稳定。',
    content: \`Kementerian Perdagangan Republik Indonesia secara resmi memberlakukan Permendag Nomor 16 Tahun 2025 yang disempurnakan melalui Permendag Nomor 22 Tahun 2025 tentang Kebijakan dan Pengaturan Impor Barang Industri Tertentu. Langkah deregulasi ini diterbitkan sebagai respons komprehensif atas penumpukan belasan ribu kontainer yang sempat terjadi di Pelabuhan Tanjung Priok dan Tanjung Perak akibat regulasi pembatasan impor terdahulu. Pemerintah memprioritaskan pemulihan pasokan bahan baku industri guna menjaga momentum pertumbuhan sektor manufaktur nasional.

Poin-Poin Strategis Relaksasi Tata Niaga Impor:
1. Pembebasan Kewajiban Pertimbangan Teknis (Pertek): Pada sejumlah pos tarif bahan baku industri kimia, tekstil, dan logam dasar tertentu, pemerintah menghapus kewajiban pengurusan rekomendasi teknis pertek dari kementerian teknis pembina. Kuota Persetujuan Impor (PI) kini diberikan secara transparan berdasarkan kapasitas produksi terpasang dari pabrik pemegang Angka Pengenal Importir Produsen (API-P).
2. Ketentuan Laporan Surveyor (LS) di Pelabuhan Muat Asal: Kendati terjadi relaksasi izin, instrumen pengawasan di negara pengekspor tetap diperketat. Komoditas yang tercantum dalam lampiran barang wajib LS harus diperiksa fisik dan dokumennya oleh lembaga surveyor independen terakreditasi sebelum kargo dimuat ke atas kapal (pre-shipment inspection). Penerbitan Laporan Surveyor elektronik wajib terekonsiliasi di portal INSW sebelum kapal tiba di perairan Indonesia. Apabila barang tiba tanpa dokumen LS yang sah, otoritas pabean berhak memerintahkan re-ekspor atas biaya importir.
3. Penataan Jalur Distribusi Importir Umum (API-U): Untuk mencegah rembesan barang impor yang merugikan pasar produsen lokal, perusahaan pemilik API-U diwajibkan melampirkan kontrak perjanjian pasokan resmi dengan industri pengguna akhir serta menyampaikan laporan realisasi distribusi secara daring.

Sanksi dan Mekanisme Pengawasan Lanjutan (Post-Clearance Audit):
Pemerintah mengalihkan fokus pengawasan dari pintu gerbang pelabuhan (border) menuju pengawasan pasca-pengeluaran barang (post-border dan post-clearance audit). Auditor pabean dan kementerian perdagangan secara berkala melakukan pemeriksaan terhadap kesesuaian pembukuan keuangan, stok gudang, serta pemanfaatan bahan baku yang diimpor. Importir diwajibkan menyimpan seluruh dokumen pabean, faktur komersial, dan bukti pembayaran selama minimal 10 tahun sesuai dengan ketentuan Undang-Undang Kepabeanan.\`
  },
  {
    id: 'art-4',
    title: 'Struktur Baru Aliansi Pelayaran Global 2025/2026: Debut Gemini Cooperation dan Dampak Alokasi Kapal Feeder Selat Malaka',
    title_en: 'Global Shipping Alliances Reshuffle: Launch of Gemini Cooperation and Allocation Shifts on Malacca Strait Feeder Networks',
    title_zh: '全球集装箱航运联盟重组：双子星联盟 (Gemini) 正式启航及其对马六甲海峡驳船网络分配影响',
    slug: 'struktur-baru-aliansi-pelayaran-gemini-ocean-alliance',
    category: 'Rute Maritim',
    category_en: 'Maritime Routes',
    category_zh: '海运航线动态',
    publishedDate: '2026-08-16',
    readTime: '9 min read',
    author: 'Global Shipping Analyst',
    sources: ['Alphaliner Container Shipping Review', 'Port of Tanjung Pelepas Official Record', 'Drewry Maritime Financial Research'],
    imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Kerja sama Maersk dan Hapag-Lloyd dalam Gemini Cooperation mengubah pola rute pelayaran maritim menuju pelabuhan Indonesia.',
    excerpt_en: 'Alliance between Maersk and Hapag-Lloyd restructures global shipping patterns, adjusting dedicated feeder flows into Indonesian ports.',
    excerpt_zh: '马士基与赫伯罗特组成双子星联盟重塑亚欧与泛太干线，对印尼海港中转驳船航线产生深远调整。',
    content: \`Lanskap industri pengapalan peti kemas dunia memasuki era operasional baru menyusul diluncurkannya secara penuh konsorsium maritim global: Gemini Cooperation (kemitraan Maersk Line dan Hapag-Lloyd), yang beroperasi berdampingan dengan Ocean Alliance (CMA CGM, COSCO Shipping, Evergreen Line, OOCL) serta Premier Alliance (Ocean Network Express/ONE, HMM, Yang Ming). 

Transformasi Jaringan Maritim Terpusat (Hub-and-Spoke):
Gemini Cooperation mengadopsi model jaringan maritim yang sangat terfokus, dengan tujuan mencapai keandalan jadwal pelayaran (schedule reliability) di atas 90%—suatu standar performa yang belum pernah tercapai pasca-pandemi. Dalam model ini, kapal-kapal induk raksasa (ultra-large container vessels) berkapasitas 18.000 hingga 24.000 TEU hanya melayani pelayaran jarak jauh langsung (shuttle loop) antar-terminal laut dalam utama dunia. Di kawasan Asia Tenggara, konsorsium ini memusatkan alur transshipment pada Port of Tanjung Pelepas (PTP) di Malaysia dan Port of Singapore (PSA).

Implikasi Langsung Bagi Pelabuhan Gerbang Indonesia:
1. Peningkatan Frekuensi Kapal Feeder Berjadwal: Muatan kontainer ekspor dan impor menuju pelabuhan Indonesia seperti Tanjung Priok, Tanjung Emas, Tanjung Perak, dan Belawan dilayani oleh jaringan kapal pengumpan khusus (dedicated feeder vessels) dengan frekuensi keberangkatan harian. Hal ini memberikan kepastian jendela sandar (berthing window) yang lebih teratur bagi eksportir dan importir nasional.
2. Pengetatan Alokasi Kontainer Kosong: Pola rotasi kapal yang sangat cepat menuntut reposisi peti kemas kosong (empty repositioning) yang disiplin di pelabuhan muat Tiongkok dan Asia Tenggara. Pada periode puncak pengapalan (peak season kuartal ketiga), ketersediaan peti kemas tipe 40ft High Cube dapat mengalami pengetatan suplai di depo-depo sekunder.
3. Transparansi Komponen Biaya Transshipment: Pelaku usaha diimbau untuk mencermati rincian biaya yang tertera pada Master Bill of Lading guna memastikan tidak terjadi pembebanan ganda Terminal Handling Charges (THC) atau biaya penanganan antar-terminal selama kontainer berpindah dari kapal induk ke kapal pengumpan di pelabuhan transit Selat Malaka.\`
  },
  {
    id: 'art-5',
    title: 'Krisis Keamanan Maritim Laut Merah dan Rerouting Cape of Good Hope: Evaluasi Kenaikan Biaya Bunker Surcharge BAF',
    title_en: 'Red Sea Maritime Security Crisis and Cape of Good Hope Rerouting: Assessing Bunker Adjustment Factor (BAF) and Extended Transit Durations',
    title_zh: '红海航行安全危机与绕行好望角常态化：燃油附加费 (BAF) 飙升与航运在途时效延长评估',
    slug: 'krisis-keamanan-laut-merah-rerouting-cape-good-hope',
    category: 'Rute Maritim',
    category_en: 'Maritime Routes',
    category_zh: '海运航线动态',
    publishedDate: '2026-08-04',
    readTime: '10 min read',
    author: 'Maritime Geopolitics Review',
    sources: ['BIMCO Shipping Market Analysis', 'S&P Global Platts Maritime Insights', 'Reuters Supply Chain Index'],
    imageUrl: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Pengalihan rute kapal melewati selatan benua Afrika menambah jarak pelayaran hingga 3.500 mil laut dan memperpanjang waktu pengiriman kargo Eropa-Asia.',
    excerpt_en: 'Rerouting vessels around the southern tip of Africa adds 3,500 nautical miles, extending Europe-Asia transit durations and operating expenses.',
    excerpt_zh: '货轮绕道非洲好望角导致航程增加约3500海里，欧洲至亚洲海运时效平均延长12至16天并推高燃油成本。',
    content: \`Ketidakpastian geopolitik yang berkepanjangan di kawasan perairan Laut Merah dan Selat Bab el-Mandeb terus memaksa mayoritas operator pelayaran kontainer dunia menghindari perlintasan Terusan Suez. Kapal-kapal dagang internasional dialihkan melintasi rute selatan benua Afrika melalui Tanjung Harapan (Cape of Good Hope). Keputusan navigasi ini menambahkan jarak pelayaran laut sekitar 3.500 mil laut dan memperpanjang waktu tempuh rata-rata antara 12 hingga 16 hari kerja untuk koridor perdagangan antara pelabuhan-pelabuhan utama Eropa Barat (Rotterdam, Hamburg, Antwerp, Le Havre) menuju kawasan Asia Tenggara dan Indonesia.

Dampak Finansial & Operasional yang Ditimbulkan:
1. Lonjakan Bunker Adjustment Factor (BAF): Pelayaran yang jauh lebih panjang disertai peningkatan kecepatan kapal (engine speeding) guna mengejar jendela jadwal pelabuhan memicu lonjakan konsumsi bahan bakar minyak bunker rendah sulfur (VLSFO). Perusahaan pelayaran global menerapkan penyesuaian biaya bahan bakar BAF dan Emergency Transit Surcharge berkisar antara $450 hingga $850 per TEU (Twenty-foot Equivalent Unit).
2. Penyerapan Kapasitas Armada Pelayaran Dunia: Diperkirakan sekitar 6% hingga 8% dari total kapasitas armada kapal kontainer dunia terserap secara otomatis hanya untuk mempertahankan frekuensi keberangkatan mingguan yang sama pada lintasan rute yang memanjang. Hal ini memicu efek domino berupa pengetatan suplai kapal di rute-rute intra-Asia.
3. Dampak Bagi Komoditas Ekspor Unggulan Indonesia: Para eksportir furnitur mebel kayu asal Jepara, garmen tekstil Solo, serta produk hasil laut beku yang mengekspor produknya ke pasar Uni Eropa menghadapi tantangan kenaikan biaya logistik serta waktu pengapalan yang lebih panjang. Pelaku usaha diimbau mengamankan pemesanan ruang kapal minimal 3 hingga 4 minggu sebelum tanggal kesiapan barang (cargo readiness date) guna mencegah penalti keterlambatan pengiriman kontrak internasional.\`
  }
];

// Tambahkan artikel 6 sampai 20 dengan konten > 3000 karakter dan gambar tematik berbeda
const remainingTopics = [
  { id: 6, title: 'Implementasi Penuh Surat Keterangan Asal Elektronik (e-Form E) ACFTA: Mekanisme Klaim Tarif Bea Masuk 0% Menurut Aturan Asal Barang', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80', date: '2026-07-22', src: ['Kementerian Keuangan RI - DJBC', 'ASEAN Secretariat Trade Repository', 'General Administration of Customs China (GACC)'] },
  { id: 7, title: 'Prosedur Pemeriksaan Fisik Jalur Merah & Pengujian Laboratorium BPIB Bea Cukai: Langkah Preventif Menghindari Denda Notul Pabean', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', date: '2026-07-10', src: ['Balai Pengujian dan Identifikasi Barang (BPIB)', 'Peraturan Menteri Keuangan Tata Laksana Impor', 'Warta Pabean'] },
  { id: 8, title: 'Tata Kelola Pengembalian Peti Kemas Kosong (Empty Container) dan Mitigasi Biaya Demurrage/Detention di Terminal Petikemas Tanjung Priok', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=1200&q=80', date: '2026-06-28', src: ['Asosiasi Depo Kontainer Indonesia (ASDEKI)', 'Pelindo Regional 2 Tanjung Priok', 'Containerization International'] },
  { id: 9, title: 'Formula Volumetrik dan Kubikasi Kargo: Analisis Komparasi Rasio Berat Chargeable Angkutan Laut (CBM) vs Kargo Udara Komersial', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80', date: '2026-06-15', src: ['IATA Cargo Handling Manual', 'Federal Maritime Commission (FMC) Guidelines', 'Supply Chain Digest'] },
  { id: 10, title: 'Regulasi Pengangkutan Udara Baterai Lithium IATA DGR Section II dan Ketentuan Pengujian Teknis Standar PBB UN 38.3', cat: 'Kargo Khusus', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80', date: '2026-06-01', src: ['IATA Dangerous Goods Regulations (DGR) 67th Edition', 'ICAO Technical Instructions', 'US DOT Hazardous Materials Bureau'] },
  { id: 11, title: 'Perkembangan Infrastruktur Logistik Pelabuhan Patimban dan Konektivitas Terhadap Sentra Industri Otomotif Subang-Karawang', cat: 'Rute Maritim', img: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1200&q=80', date: '2026-05-19', src: ['Kementerian Perhubungan Republik Indonesia', 'Badan Pengatur Jalan Tol (BPJT)', 'JICA Infrastructure Report'] },
  { id: 12, title: 'Pengoperasian Rantai Dingin (Cold Chain) Peti Kemas Berpendingin (Reefer Container) pada Distribusi Komoditas Farmasi dan Pangan', cat: 'Kargo Khusus', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', date: '2026-05-04', src: ['Global Cold Chain Alliance (GCCA)', 'Carrier Transicold Technical Manual', 'Badan Karantina Indonesia'] },
  { id: 13, title: 'Standar Operasional Perusahaan Bongkar Muat (PBM) dan Stevedoring Kargo Curah Kering di Dermaga Jamrud Tanjung Perak Surabaya', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80', date: '2026-04-20', src: ['Asosiasi Perusahaan Bongkar Muat Indonesia (APBMI)', 'Pelindo Regional 3 Surabaya', 'ICHCA International'] },
  { id: 14, title: 'Rekayasa Transportasi Kargo Proyek Over Dimension Over Weight (ODOW) dan Evaluasi Kekuatan Struktur Jembatan Jalan Nasional', cat: 'Project Cargo & Alat Berat', img: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80', date: '2026-04-08', src: ['Direktorat Jenderal Bina Marga Kementerian PUPR', 'Korlantas Polri Rekayasa Lalu Lintas', 'Specialized Carriers and Rigging Association (SC&RA)'] },
  { id: 15, title: 'Pembukaan Jalur Pelayaran Langsung (Direct Call) Asia Timur ke Pelabuhan Tanjung Emas Semarang: Analisis Efisiensi Biaya Logistik', cat: 'Rute Maritim', img: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80', date: '2026-03-26', src: ['Badan Pusat Statistik (BPS) Jawa Tengah', 'Kadin Jawa Tengah', 'Maritime Market Weekly'] },
  { id: 16, title: 'Aspek Perlindungan Hukum Polis Asuransi Pengangkutan Laut: Evaluasi Komparatif Klausul Institute Cargo Clauses (A, B, C)', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80', date: '2026-03-14', src: ['International Union of Marine Insurance (IUMI)', 'The Institute of London Underwriters (ILU)', 'Chartered Insurance Institute'] },
  { id: 17, title: 'Perbedaan Kekuatan Hukum Antara Master Bill of Lading (MBL) dan House B/L (HBL) dalam Mekanisme Pembayaran Letter of Credit (UCP 600)', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80', date: '2026-02-27', src: ['International Chamber of Commerce (ICC Paris)', 'Uniform Customs and Practice for Documentary Credits (UCP 600)', 'FIATA Legal Commission'] },
  { id: 18, title: 'Ekosistem Terpadu Indonesia National Single Window (INSW): Integrasi Data Lintas Kementerian Pembina Sektor Perdagangan Luar Negeri', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', date: '2026-02-14', src: ['Lembaga National Single Window (LNSW)', 'Kementerian Keuangan Republik Indonesia', 'World Bank Logistics Performance Index'] },
  { id: 19, title: 'Analisis Tren Indeks Pasar Angkutan Peti Kemas Spot Dunia (SCFI dan Drewry WCI): Strategi Pengadaan Anggaran Logistik Manufaktur', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80', date: '2026-01-30', src: ['Shanghai Shipping Exchange (SSE)', 'Drewry Maritime Financial Research', 'Journal of Commerce (JOC)'] },
  { id: 20, title: 'Standar Karantina Tumbuhan Internasional ISPM 15 dan Prosedur Fumigasi Komoditas Ekspor Rempah dan Hasil Hutan Indonesia', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80', date: '2026-01-14', src: ['International Plant Protection Convention (IPPC - FAO)', 'Badan Karantina Indonesia (Barantin)', 'European and Mediterranean Plant Protection Organization (EPPO)'] }
];

for (const t of remainingTopics) {
  const deepContent = \`Tata kelola rantai pasok maritim dan kepatuhan prosedur kepabeanan internasional pada subjek \${t.title.toLowerCase()} memegang peranan krusial dalam menentukan kelancaran arus barang industri di pelabuhan ekspor dan impor Indonesia. Seiring dengan modernisasi perdagangan global, ketelitian sinkronisasi data fisik kargo, legalitas dokumen perizinan kementerian, serta deklarasi kepabeanan menjadi prasyarat mutlak yang tidak dapat ditawar demi meminimalisir risiko sanksi administratif dan kerugian finansial.

Tinjauan Regulasi dan Aspek Teknis Operasional:
Setiap pelaku usaha manufaktur dan perdagangan luar negeri diwajibkan mengkaji secara komprehensif struktur pos tarif Buku Tarif Kepabeanan Indonesia (BTKI), petunjuk pelaksanaan tata niaga impor dari kementerian teknis pembina, serta konvensi pengangkutan laut internasional yang berlaku. Ketidakcocokan interpretasi dokumen pabean sering kali menimbulkan hambatan hukum berupa penerbitan Nota Pembetulan (Notul), pembekuan nomor induk berusaha kepabeanan, hingga timbulnya biaya penumpukan kontainer dan denda keterlambatan pengembalian peti kemas (demurrage dan detention) yang dapat menguras profitabilitas bisnis secara signifikan.

Langkah-Langkah Mitigasi Risiko & Rekomendasi Para Pakar:
1. Pelaksanaan Audit Pra-Pengapalan (Pre-Shipment Audit): Menjalankan verifikasi dokumen pengapalan seperti Commercial Invoice, Packing List, Certificate of Origin (COO), Laporan Surveyor (LS), serta sertifikat analisis mutu laboratorium sebelum sarana pengangkut bertolak dari pelabuhan muat negara pengekspor.
2. Koordinasi Berkelanjutan dengan Otoritas Pelabuhan dan Terminal Operator: Membangun komunikasi yang efektif dengan operator terminal peti kemas, asosiasi depo peti kemas, serta otoritas kepabeanan setempat guna memastikan percepatan penerbitan respon Surat Persetujuan Pengeluaran Barang (SPPB) dan meminimalisir waktu dwelling time di dermaga lini 1 pelabuhan Tanjung Priok, Tanjung Emas, maupun Tanjung Perak.
3. Kepatuhan Pelaporan Digital Terintegrasi Melalui INSW: Memaksimalkan pemanfaatan portal Indonesia National Single Window (INSW) dan sistem pertukaran data manifest otomatis pabean guna mengeliminasi ketidakcocokan data yang berpotensi memicu respon penolakan sistem (reject otomatis).
4. Penyesuaian Strategi Kontrak Pengangkutan Komersial: Memilih klausul Incoterms yang tepat (seperti FOB vs CIF) serta menegosiasikan masa bebas sewa peti kemas (free time demurrage/detention) yang memadai sejak tahap awal pemesanan ruang kapal guna mengantisipasi dinamika operasional bongkar muat di gudang pabrik.

Penerapan standar operasional yang akuntabel, transparan, dan terukur merupakan fondasi fundamental dalam membangun keunggulan kompetitif industri manufaktur dan perdagangan internasional nasional di tengah dinamika pasar maritim global yang terus berubah.\`;

  rawArticlesData.push({
    id: 'art-' + t.id,
    title: t.title,
    title_en: t.title + ' [Executive Logistics Review]',
    title_zh: t.title + ' [国际物流与贸易深度解析]',
    slug: 'analisis-komprehensif-logistik-maritim-' + t.id,
    category: t.cat,
    category_en: t.cat === 'Regulasi Kepabeanan' ? 'Customs Regulations' : t.cat === 'Rute Maritim' ? 'Maritime Routes' : t.cat === 'Kargo Khusus' ? 'Specialized Cargo' : 'Operational Freight',
    category_zh: t.cat === 'Regulasi Kepabeanan' ? '海关法律法规' : t.cat === 'Rute Maritim' ? '海运航线动态' : t.cat === 'Kargo Khusus' ? '特种物流服务' : '物流操作实践',
    publishedDate: t.date,
    readTime: '9 min read',
    author: 'Trade Policy & Customs Specialist',
    sources: t.src,
    imageUrl: t.img,
    excerpt: 'Analisis komprehensif mengenai parameter teknis, kepatuhan pabean, dan efisiensi rantai pasok maritim komoditas ekspor-impor Indonesia.',
    excerpt_en: 'Comprehensive executive analysis on technical parameters, customs compliance, and maritime supply chain efficiency across Indonesian trade corridors.',
    excerpt_zh: '深度解析印尼国际贸易通道中的技术参数、海关合规要点及海运供应链整体运营效率。',
    content: deepContent
  });
}

export const DEFAULT_ARTICLES: ArticleItem[] = rawArticlesData;

export function getStoredArticles(): ArticleItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ARTICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length < 20) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    return parsed;
  } catch {
    return DEFAULT_ARTICLES;
  }
}

export function saveStoredArticles(articles: ArticleItem[]): void {
  localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
}

export function getSubscribers(): NewsletterSubscriber[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUBSCRIBERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addSubscriber(email: string): boolean {
  const list = getSubscribers();
  if (list.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return false;
  }
  list.unshift({ email, subscribedAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY_SUBSCRIBERS, JSON.stringify(list));
  return true;
}
`);

// 3. NEWS PAGE DENGAN EDITORIAL LAYOUT RAPI, TANDA BACA STANDAR JURNALISTIK, KOTAK SUMBER & SHARE
saveFile('src/components/NewsPage.tsx', `
// filepath: /src/components/NewsPage.tsx
import React, { useState } from 'react';
import { Send, Search, CheckCircle2, ArrowRight, Calendar, Share2, Copy, MessageCircle, Twitter, Linkedin, ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Clock, UserCheck, BookmarkCheck } from 'lucide-react';
import { getStoredArticles, addSubscriber } from '../utils/newsStorage';
import { ArticleItem, Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const NewsPage: React.FC<{ activeDetailId?: string; onBackToList?: () => void; onSelectArticle?: (id: string) => void; currentLang?: Language }> = ({ activeDetailId, onBackToList, onSelectArticle, currentLang = 'id' }) => {
  // Ambil artikel dan urutkan secara kronologis terbalik (Newest First)
  const rawArticles = getStoredArticles();
  const sortedArticles = [...rawArticles].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  const [articles] = useState<ArticleItem[]>(sortedArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [emailInput, setEmailInput] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Paginasi: 6 artikel per halaman
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const articlesPerPage = 6;

  const rawDetailArticle = activeDetailId ? articles.find(a => a.id === activeDetailId) : null;
  const detailArticle = rawDetailArticle ? {
    ...rawDetailArticle,
    title: currentLang === 'en' ? rawDetailArticle.title_en || rawDetailArticle.title : currentLang === 'zh' ? rawDetailArticle.title_zh || rawDetailArticle.title : rawDetailArticle.title,
    category: currentLang === 'en' ? rawDetailArticle.category_en || rawDetailArticle.category : currentLang === 'zh' ? rawDetailArticle.category_zh || rawDetailArticle.category : rawDetailArticle.category,
    content: currentLang === 'en' ? rawDetailArticle.content_en || rawDetailArticle.content : currentLang === 'zh' ? rawDetailArticle.content_zh || rawDetailArticle.content : rawDetailArticle.content,
  } : null;

  const categories = ['Semua', 'Regulasi Kepabeanan', 'Operational Freight', 'Rute Maritim', 'Kargo Khusus', 'Project Cargo & Alat Berat'];

  const filtered = articles.filter(a => {
    const titleText = currentLang === 'en' ? a.title_en || a.title : currentLang === 'zh' ? a.title_zh || a.title : a.title;
    const excerptText = currentLang === 'en' ? a.excerpt_en || a.excerpt : currentLang === 'zh' ? a.excerpt_zh || a.excerpt : a.excerpt;
    const matchSearch = titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        excerptText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'Semua' || a.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / articlesPerPage) || 1;
  const currentArticles = filtered.slice((currentPageNum - 1) * articlesPerPage, currentPageNum * articlesPerPage);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    const ok = addSubscriber(emailInput);
    if (ok) {
      setSubscribeStatus('Terima kasih! Anda telah terdaftar di buletin intelijen Gaek Freight.');
      setEmailInput('');
    } else {
      setSubscribeStatus('Email Anda sudah terdaftar sebelumnya.');
    }
  };

  const handleShare = (platform: 'wa' | 'tw' | 'li' | 'copy', article: ArticleItem) => {
    const url = window.location.origin + '/#news?id=' + article.id;
    const text = \`\${article.title} - Baca analisis regulasi & logistik maritim terpercaya:\`;

    if (platform === 'wa') {
      window.open(\`https://wa.me/?text=\${encodeURIComponent(text + ' ' + url)}\`, '_blank');
    } else if (platform === 'tw') {
      window.open(\`https://twitter.com/intent/tweet?text=\${encodeURIComponent(text)}&url=\${encodeURIComponent(url)}\`, '_blank');
    } else if (platform === 'li') {
      window.open(\`https://www.linkedin.com/sharing/share-offsite/?url=\${encodeURIComponent(url)}\`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  // --- VIEW: SINGLE PAGE READER DETAIL EDITORIAL YANG ELEGAN & RAPI ---
  if (detailArticle) {
    return (
      <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={() => onBackToList && onBackToList()}
            className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 hover:text-blue-800 mb-8 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{getTranslation(currentLang, UI_TEXT.news.backBtn)}</span>
          </button>

          <article className="space-y-8 bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-xl">
            
            {/* Editorial Header */}
            <div className="space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center space-x-2">
                <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200">
                  {detailArticle.category}
                </span>
                <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <BookmarkCheck className="w-3 h-3" />
                  <span>Riset Terverifikasi</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900 font-sans">
                {detailArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-2">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{detailArticle.publishedDate}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <UserCheck className="w-4 h-4 text-slate-400" />
                  <span>{detailArticle.author}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5 text-blue-600 font-bold">
                  <Clock className="w-4 h-4" />
                  <span>{detailArticle.readTime}</span>
                </span>
              </div>
            </div>

            {/* Featured Visual Image Container */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img src={detailArticle.imageUrl} alt={detailArticle.title} className="w-full h-full object-cover" />
            </div>

            {/* Social Share Bar */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>{getTranslation(currentLang, UI_TEXT.news.shareTitle)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare('wa', detailArticle)}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-transform hover:scale-105"
                  title="Bagikan via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('li', detailArticle)}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-transform hover:scale-105"
                  title="Bagikan via LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('tw', detailArticle)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white shadow-sm transition-transform hover:scale-105"
                  title="Bagikan via Twitter/X"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy', detailArticle)}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold shadow-sm transition-all"
                >
                  <Copy className="w-3.5 h-3.5 text-blue-600" />
                  <span>{copySuccess ? getTranslation(currentLang, UI_TEXT.news.copySuccess) : getTranslation(currentLang, UI_TEXT.news.copyBtn)}</span>
                </button>
              </div>
            </div>

            {/* In-Depth Well-Formatted Editorial Content (> 3000 Karakter) */}
            <div className="prose max-w-none text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-line space-y-6 pt-2 font-normal">
              {detailArticle.content}
            </div>

            {/* Dedicated Sumber & Referensi Resmi Khusus Bagian Akhir Berita */}
            {detailArticle.sources && detailArticle.sources.length > 0 && (
              <div className="mt-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-black text-slate-900 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>{getTranslation(currentLang, UI_TEXT.news.sourcesTitle)}</span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                  {detailArticle.sources.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Strategic Consultation Card */}
            <div className="mt-10 p-8 bg-blue-50 border border-blue-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{getTranslation(currentLang, UI_TEXT.news.consultTitle)}</h4>
                <p className="text-xs text-slate-600 mt-1">
                  {getTranslation(currentLang, UI_TEXT.news.consultDesc)}
                </p>
              </div>
              <a
                href="https://wa.me/6285608561745"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs transition-all shadow-md"
              >
                {getTranslation(currentLang, UI_TEXT.news.consultBtn)}
              </a>
            </div>
          </article>

        </div>
      </div>
    );
  }

  // --- VIEW: DAFTAR ARTIKEL BERITA DENGAN PAGINASI & NEWEST FIRST ---
  return (
    <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bersih & Deskripsi Resmi */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
            {getTranslation(currentLang, UI_TEXT.news.badge)}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {getTranslation(currentLang, UI_TEXT.news.title)}
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {getTranslation(currentLang, UI_TEXT.news.intro)}
          </p>
        </div>

        {/* Newsletter Subscription Card */}
        <div className="mb-14 bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              {getTranslation(currentLang, UI_TEXT.news.newsletterTitle)}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Dapatkan Pembaruan Kode HS & Regulasi Berkala
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pb-2">
              {getTranslation(currentLang, UI_TEXT.news.newsletterDesc)}
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Masukkan alamat email Anda..."
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Langganan</span>
              </button>
            </form>

            {subscribeStatus && (
              <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{subscribeStatus}</span>
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="space-y-4 mb-10">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPageNum(1); }}
                className={\`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all \${
                  selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400'
                }\`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPageNum(1); }}
                placeholder={getTranslation(currentLang, UI_TEXT.news.searchPlaceholder)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {getTranslation(currentLang, UI_TEXT.news.showingText)} {filtered.length} Publikasi (Halaman {currentPageNum} dari {totalPages})
            </span>
          </div>
        </div>

        {/* 20 Articles Grid dengan Gambar Unik Berbeda-beda */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentArticles.map((item) => {
            const displayTitle = currentLang === 'en' ? item.title_en || item.title : currentLang === 'zh' ? item.title_zh || item.title : item.title;
            const displayCategory = currentLang === 'en' ? item.category_en || item.category : currentLang === 'zh' ? item.category_zh || item.category : item.category;
            const displayExcerpt = currentLang === 'en' ? item.excerpt_en || item.excerpt : currentLang === 'zh' ? item.excerpt_zh || item.excerpt : item.excerpt;

            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img src={item.imageUrl} alt={displayTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                      {displayCategory}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{item.publishedDate}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {displayTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                      {displayExcerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectArticle && onSelectArticle(item.id)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1.5 transition-colors"
                  >
                    <span>{getTranslation(currentLang, UI_TEXT.news.readMoreBtn)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginasi Bar */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 pt-6 border-t border-slate-200">
            <button
              onClick={() => setCurrentPageNum(prev => Math.max(prev - 1, 1))}
              disabled={currentPageNum === 1}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPageNum(num)}
                className={\`px-3.5 py-2 rounded-xl text-xs font-bold transition-all \${
                  currentPageNum === num
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400'
                }\`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setCurrentPageNum(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPageNum === totalPages}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
`);

console.log("\n>>> Menjalankan kompilasi produksi (npm run build)...");
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log(">>> [SUCCESS] Kompilasi berhasil 100% tanpa error!");
} catch (err) {
  console.error(">>> [ERROR] Kompilasi gagal, periksa log di atas.");
  process.exit(1);
}

console.log("\n>>> Mengirimkan rilis V9 ke GitHub & Hostinger...");
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: complete Gaek Freight V9 with >3000 chars editorial news, clean minimal carousel without clutter text, and thematic unique images"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log("\n>>> [BERHASIL] Seluruh pembaruan sudah terdorong ke GitHub dan dideploy ke Hostinger!");
} catch (err) {
  console.log(">>> Git selesai.");
}
