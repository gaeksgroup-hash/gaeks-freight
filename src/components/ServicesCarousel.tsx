// filepath: /src/components/ServicesCarousel.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { ServiceDetail, Language } from '../types/freight';

export const DETAILED_SERVICES: ServiceDetail[] = [
  {
    id: 'ppjk',
    title: 'PPJK (Customs Clearance)',
    title_en: 'PPJK Customs Brokerage',
    title_zh: 'PPJK 报关代理服务',
    category: 'Legalitas & Kepabeanan',
    category_en: 'Customs Compliance',
    category_zh: '海关清关与合规',
    tagline: 'Penyelesaian PIB, PEB, jalur hijau, dan mitigasi demurrage pabean.',
    tagline_en: 'Swift import/export clearance and port demurrage mitigation.',
    tagline_zh: '进出口报关单快速放行及滞港费用风险控制。',
    description: 'Kuasa kepabeanan resmi terhubung langsung ke portal INSW dan Ceisa Bea Cukai. Kami memastikan verifikasi dokumen, validasi HS code, dan kepatuhan perizinan impor bebas denda.',
    description_en: 'Licensed customs brokerage connected directly to INSW and Ceisa 4.0. We ensure document compliance, HS code verification, and zero-penalty customs audit.',
    description_zh: '直连印尼海关 Ceisa 4.0 及 INSW 系统，确保商品代码精准归类与免罚通关。',
    features: ['Penetapan Klasifikasi HS Code Akurat', 'Penanganan Jalur Hijau, Kuning, & Merah', 'Pengurusan Persetujuan Impor (PI) & Lartas'],
    equipment: 'Sistem Terintegrasi Ceisa 4.0 Bea Cukai',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
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
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll dipercepat menjadi 1600ms (1.6 detik) dengan pergeseran mulus
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === DETAILED_SERVICES.length - 1 ? 0 : prev + 1));
    }, 1600);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? DETAILED_SERVICES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === DETAILED_SERVICES.length - 1 ? 0 : prev + 1));
  };

  const rawCurrent = DETAILED_SERVICES[currentIndex];
  const current = {
    ...rawCurrent,
    title: currentLang === 'en' ? rawCurrent.title_en || rawCurrent.title : currentLang === 'zh' ? rawCurrent.title_zh || rawCurrent.title : rawCurrent.title,
    category: currentLang === 'en' ? rawCurrent.category_en || rawCurrent.category : currentLang === 'zh' ? rawCurrent.category_zh || rawCurrent.category : rawCurrent.category,
    tagline: currentLang === 'en' ? rawCurrent.tagline_en || rawCurrent.tagline : currentLang === 'zh' ? rawCurrent.tagline_zh || rawCurrent.tagline : rawCurrent.tagline,
    description: currentLang === 'en' ? rawCurrent.description_en || rawCurrent.description : currentLang === 'zh' ? rawCurrent.description_zh || rawCurrent.description : rawCurrent.description,
  };

  return (
    <section 
      id="services" 
      className="py-20 bg-slate-50 border-y border-slate-200 text-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Teks Live Auto Scrolling Telah Dihapus) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
              Integrated Global Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Services Portfolio Gaek Freight
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Didukung legalitas pabean resmi, armada trucking darat, fasilitas pergudangan pelabuhan, dan alokasi liner dunia.
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button onClick={handlePrev} className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-blue-600 hover:text-white transition-colors shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-500">
              {currentIndex + 1} / {DETAILED_SERVICES.length}
            </span>
            <button onClick={handleNext} className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-blue-600 hover:text-white transition-colors shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Service Card (Clean Light Corporate) */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl transition-all duration-500">
          
          {/* Animated Slide Progress Bar */}
          <div className="w-full bg-slate-100 h-1">
            <div 
              className="bg-blue-600 h-1 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / DETAILED_SERVICES.length) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden bg-slate-100">
              <img src={current.imageUrl} alt={current.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-black border border-white/20">
                {current.category}
              </div>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="hidden lg:inline-block text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  {current.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{current.title}</h3>
                <p className="mt-2 text-base font-semibold text-slate-700">"{current.tagline}"</p>
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{current.description}</p>

                <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                  <strong className="text-blue-700 font-bold block mb-1">Kesesuaian Komoditas:</strong>
                  {current.commodities}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Keunggulan & Cakupan:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                <button
                  onClick={() => onSelectService(current.title)}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-600/20 transition-all hover:scale-105"
                >
                  <span>Konsultasikan Komoditas Ini</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                </button>
                <div className="text-xs font-semibold text-slate-500">
                  Standar: <span className="text-slate-900 font-bold">{current.equipment}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Slider Quick Selectors */}
        <div className="mt-6 flex overflow-x-auto pb-2 gap-3 no-scrollbar">
          {DETAILED_SERVICES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                idx === currentIndex
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400'
              }`}
            >
              {currentLang === 'en' ? s.title_en || s.title : currentLang === 'zh' ? s.title_zh || s.title : s.title}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
