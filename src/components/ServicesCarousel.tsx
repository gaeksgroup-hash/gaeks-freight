import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { ServiceDetail, Language } from '../types/freight';
import { getStoredServices, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { ServiceTitle } from './ServiceTitle';

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
  }
];


export const ServicesCarousel: React.FC<{
  onSelectService: (serviceName: string) => void;
  onOpenService?: (serviceId: string) => void;
  currentLang?: Language;
}> = ({ onSelectService, onOpenService, currentLang = 'id' }) => {
  const [servicesList, setServicesList] = useState<ServiceDetail[]>(getStoredServices());

  useEffect(() => {
    const reload = () => setServicesList(getStoredServices());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const getLocalized = (service: ServiceDetail) => ({
    title: currentLang === 'en' ? service.title_en || service.title : currentLang === 'zh' ? service.title_zh || service.title : service.title,
    category: currentLang === 'en' ? service.category_en || service.category : currentLang === 'zh' ? service.category_zh || service.category : service.category,
    tagline: currentLang === 'en' ? service.tagline_en || service.tagline : currentLang === 'zh' ? service.tagline_zh || service.tagline : service.tagline,
    description: currentLang === 'en' ? service.description_en || service.description : currentLang === 'zh' ? service.description_zh || service.description : service.description,
  });

  return (
    <section id="services" aria-labelledby="services-title" className="section-block">
      <div className="page-shell">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <header className="min-w-0">
            <p className="section-label">Layanan</p>
            <h2 id="services-title" className="section-title">Pilih bagian perjalanan kargo yang perlu kami tangani.</h2>
            <p className="section-copy">Setiap layanan diringkas dalam satu baris. Buka detailnya hanya saat dibutuhkan.</p>
            <p className="mt-8 text-sm font-semibold text-slate-500">{servicesList.length} layanan tersedia</p>
          </header>

          <div className="min-w-0 space-y-2 rounded-2xl bg-[#e8efed] p-2 sm:p-3">
            {servicesList.map((service, index) => {
              const item = getLocalized(service);
              return (
                <details key={service.id} className="group overflow-hidden rounded-xl border border-transparent bg-[#f8faf8] transition-[background-color,border-color,box-shadow] duration-300 hover:border-cyan-700/20 hover:bg-white hover:shadow-[0_10px_28px_rgba(8,47,52,0.08)] open:border-cyan-700/25 open:bg-white open:shadow-[0_12px_32px_rgba(8,47,52,0.09)]">
                  <summary className="flex min-h-[74px] items-center gap-2 px-3 py-3 transition-colors duration-300 group-hover:bg-cyan-50/45 group-open:bg-[#f1f8f6] sm:min-h-[82px] sm:gap-4 sm:px-5 sm:py-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white font-mono text-[10px] font-semibold text-slate-500 transition-colors duration-300 group-hover:border-cyan-600/30 group-hover:text-cyan-800 group-open:border-cyan-700/35 group-open:bg-cyan-50 group-open:text-cyan-800 sm:h-8 sm:w-8 sm:text-[11px]">{String(index + 1).padStart(2, '0')}</span>
                    <span className="min-w-0 flex-1">
                      <strong className="block break-words text-sm font-bold leading-5 text-[#12363a] transition-colors duration-300 group-hover:text-[#076876] sm:text-base"><ServiceTitle title={item.title} /></strong>
                      <span className="mt-1 block truncate text-xs text-slate-500 transition-colors duration-300 group-hover:text-slate-600 sm:text-sm">{item.category}</span>
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-[color,background-color,border-color] duration-300 group-hover:border-cyan-600/30 group-hover:bg-cyan-50 group-hover:text-cyan-800 group-open:border-cyan-700 group-open:bg-[#0a5861] group-open:text-white sm:h-9 sm:w-9">
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                    </span>
                  </summary>
                  <div className="grid min-w-0 gap-5 border-t border-slate-200/80 px-3 pb-5 pt-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6 sm:px-5 sm:pb-7 sm:pt-5">
                    <img src={service.imageUrl} alt="" loading="lazy" className="h-36 w-full rounded-lg object-cover sm:h-full" />
                    <div>
                      <p className="font-semibold text-[#12363a]">{item.tagline}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                      <ul className="mt-5 grid gap-2">
                        {service.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex gap-2 text-sm text-slate-600"><Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" aria-hidden="true" />{feature}</li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button type="button" onClick={() => onSelectService(item.title)} className="button-primary">Minta estimasi<ArrowRight className="h-4 w-4" /></button>
                        {onOpenService && <button type="button" onClick={() => onOpenService(service.id)} className="button-link">Detail layanan<ArrowRight className="h-4 w-4" /></button>}
                      </div>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
