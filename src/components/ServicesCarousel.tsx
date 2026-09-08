import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { ServiceDetail } from '../types/freight';

export const DETAILED_SERVICES: ServiceDetail[] = [
  {
    id: 'ppjk',
    title: 'PPJK (Customs Clearance)',
    category: 'Legalitas & Kepabeanan',
    tagline: 'Penyelesaian PIB, PEB, jalur hijau, dan mitigasi demurrage pabean.',
    description: 'Kuasa kepabeanan resmi terhubung langsung ke portal INSW dan Ceisa Bea Cukai. Kami memastikan verifikasi dokumen, validasi HS code, dan kepatuhan perizinan impor bebas denda.',
    features: ['Penetapan Klasifikasi HS Code Akurat', 'Penanganan Jalur Hijau, Kuning, & Merah', 'Pengurusan Persetujuan Impor (PI) & Lartas'],
    equipment: 'Sistem Terintegrasi Ceisa 4.0 Bea Cukai',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    commodities: 'Komoditas industri, bahan baku, tekstil, mesin, barang umum (dapat dikonsultasikan)'
  },
  {
    id: 'gudang-pbm',
    title: 'Gudang & PBM (Bongkar Muat)',
    category: 'Perusahaan Bongkar Muat & Warehouse',
    tagline: 'Stevedoring dermaga dan fasilitas pergudangan transit strategis.',
    description: 'Fasilitas bongkar muat kapal pelabuhan (stevedoring, cargodoring, receiving/delivery) didukung fasilitas gudang konsolidasi berstandar keamanan tinggi dekat area lini 1 dermaga.',
    features: ['Fasilitas Penyimpanan Kargo Kering & Tertutup', 'Armada Forklift 3T - 45T & Reach Stacker', 'Cross-docking, Sorting, & Palletizing'],
    equipment: 'Gudang Kawasan Pabean & Non-Pabean',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    commodities: 'Curah kering, kargo palet, semen kemasan, bahan pangan industri'
  },
  {
    id: 'domestic-truck',
    title: 'Domestic Trucking',
    category: 'Inland Fleet Distribution',
    tagline: 'Armada distribusi multi-moda dari pelabuhan langsung ke pabrik Anda.',
    description: 'Layanan angkutan darat terjadwal yang menjangkau seluruh pulau Jawa, Sumatra, dan Bali dengan pengawasan posisi armada via GPS satelit 24 jam nonstop.',
    features: ['Trailer Petikemas 20ft & 40ft (Standar & HC)', 'Truk CDD Box, Fuso Berat, hingga Wingbox 32T', 'Monitoring GPS Terintegrasi Real-time'],
    equipment: '100+ Unit Armada Siap Jalan',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80',
    commodities: 'Kargo industri, consumer goods, semen, bahan bangunan, suku cadang'
  },
  {
    id: 'project-cargo',
    title: 'Project Cargo & Heavy Lift',
    category: 'Specialized Industrial Logistics',
    tagline: 'Rekayasa logistik untuk muatan over-dimension & over-weight (ODOW).',
    description: 'Solusi angkutan muatan berbobot ekstrem dan berdimensi raksasa untuk proyek energi, konstruksi pabrik, mesin peleburan, genset pembangkit, dan transformator.',
    features: ['Survei Rute Jalan & Analisis Kekuatan Jembatan', 'Armada Lowbed, Multi-Axle, & Flat Rack', 'Pengawalan Khusus & Asuransi All-Risk'],
    equipment: 'Multi-Axle Modular Hydraulic Trailer',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    commodities: 'Mesin pabrik, turbin pembangkit, tangki industri, baja struktural'
  },
  {
    id: 'lcl',
    title: 'LCL (Less than Container Load)',
    category: 'Konsolidasi Laut Ekonomis',
    tagline: 'Kirim barang tanpa harus menyewa satu peti kemas penuh.',
    description: 'Solusi hemat bagi importir dan UKM dengan volume di bawah 15 CBM melalui sistem konsolidasi mingguan terjadwal dari hub Asia Timur dan Asean.',
    features: ['Perhitungan Tarif Berbasis Kubikasi Murni (CBM)', 'Jadwal Konsolidasi Mingguan Tetap', 'Unstuffing Cepat di CFS Gudang Pelabuhan'],
    equipment: 'Weekly Dedicated Consolidation Box',
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
    commodities: 'Barang retail, spare parts, sampel bahan, perlengkapan bisnis'
  },
  {
    id: 'fcl',
    title: 'FCL (Full Container Load)',
    category: 'Kontainer Eksklusif Internasional',
    tagline: 'Kontrak slot langsung dengan pelayaran kontainer dunia.',
    description: 'Penyediaan kontainer 20ft, 40ft General Purpose, 40ft High Cube, Reefer berpendingin, serta Open Top untuk rute utama langsung ke Jakarta, Semarang, dan Surabaya.',
    features: ['Alokasi Ruang Kapal Dijamin Saat Peak Season', 'Free Time Demurrage & Detention Lebih Panjang', 'Pilihan Door-to-Door atau Port-to-Port Transparan'],
    equipment: 'Kontainer 20ft, 40ft GP, 40ft HC, Reefer',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
    commodities: 'Manufaktur massal, bahan baku kimia, resin, komoditas ekspor'
  },
  {
    id: 'air-shipment',
    title: 'Air Shipment Priority',
    category: 'Kargo Udara Ekspres',
    tagline: 'Waktu transit singkat untuk kargo berprioritas kritis.',
    description: 'Layanan kargo udara reguler dan charter untuk suku cadang mesin mendesak, sampel komersial, kargo bernilai tinggi, dan komoditas time-sensitive.',
    features: ['Next-Flight-Out Prioritas Tertinggi', 'Door-to-Airport & Door-to-Door Handling', 'Pengurusan Dokumen Air Waybill (AWB) Kilat'],
    equipment: 'Direct Space Contract Airline Partner',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
    commodities: 'Sampel ekspor, suku cadang mesin, elektronik presisi, farmasi'
  }
];

export const ServicesCarousel: React.FC<{ onSelectService: (serviceName: string) => void }> = ({ onSelectService }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll Timer: otomatis geser ke samping tiap 4.5 detik
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === DETAILED_SERVICES.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? DETAILED_SERVICES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === DETAILED_SERVICES.length - 1 ? 0 : prev + 1));
  };

  const current = DETAILED_SERVICES[currentIndex];

  return (
    <section 
      id="services" 
      className="py-24 bg-brand-surface border-y border-brand-border text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-brand-cyan text-xs font-black uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-ping" />
              <span>Live Auto-Scrolling Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Services Portfolio Gaek Freight
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Didukung legalitas pabean resmi, armada truk sendiri, pergudangan pelabuhan, dan slot liner dunia.
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button onClick={handlePrev} className="p-3.5 rounded-xl border border-brand-border bg-brand-card text-white hover:bg-brand-cyan hover:text-slate-950 transition-colors shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-400">
              {currentIndex + 1} / {DETAILED_SERVICES.length}
            </span>
            <button onClick={handleNext} className="p-3.5 rounded-xl border border-brand-border bg-brand-card text-white hover:bg-brand-cyan hover:text-slate-950 transition-colors shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Service Card */}
        <div className="bg-brand-card rounded-3xl border border-brand-border overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden">
              <img src={current.imageUrl} alt={current.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute top-4 left-4 bg-brand-obsidian/90 backdrop-blur-md text-brand-cyan px-3.5 py-1.5 rounded-full text-xs font-black border border-brand-border">
                {current.category}
              </div>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="hidden lg:inline-block text-xs font-bold text-brand-cyan uppercase tracking-wider mb-2">
                  {current.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{current.title}</h3>
                <p className="mt-2 text-base font-semibold text-slate-300">"{current.tagline}"</p>
                <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">{current.description}</p>

                <div className="mt-5 p-4 bg-brand-obsidian border border-brand-border rounded-xl text-xs text-slate-300">
                  <strong className="text-brand-cyan font-bold block mb-1">Kesesuaian Komoditas:</strong>
                  {current.commodities}
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Keunggulan & Cakupan:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-brand-border">
                <button
                  onClick={() => onSelectService(current.title)}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-cyan to-brand-emerald text-slate-950 px-6 py-3 rounded-xl font-black text-sm shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
                >
                  <span>Konsultasikan Komoditas Ini</span>
                  <ArrowUpRight className="w-4 h-4 stroke-" />
                </button>
                <div className="text-xs font-semibold text-slate-400">
                  Standar: <span className="text-white font-bold">{current.equipment}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Service Selector Pills */}
        <div className="mt-8 flex overflow-x-auto pb-2 gap-3 no-scrollbar">
          {DETAILED_SERVICES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                idx === currentIndex
                  ? 'bg-brand-cyan text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-brand-card text-slate-400 border border-brand-border hover:text-white'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
