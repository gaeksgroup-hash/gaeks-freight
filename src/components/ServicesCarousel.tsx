// filepath: /src/components/ServicesCarousel.tsx
import React, { useState } from 'react';
import { 
  FileCheck2, 
  Warehouse, 
  Truck, 
  Layers, 
  Box, 
  Container, 
  PlaneTakeoff, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { ServiceDetail } from '../types/freight';

const SERVICES: ServiceDetail[] = [
  {
    id: 'ppjk',
    title: 'PPJK (Customs Clearance)',
    category: 'Regulasi & Kepabeanan',
    tagline: 'Penyelesaian PIB, PEB, dan audit kepatuhan jalur hijau.',
    description: 'Kuasa kepabeanan resmi dengan sistem EDI terkoneksi langsung ke INSW dan Ceisa Bea Cukai untuk pengeluaran barang tanpa denda demurrage.',
    features: ['Klasifikasi Penetapan HS Code Legal', 'Penanganan Jalur Hijau, Kuning, & Merah', 'Pengurusan Izin Impor Khusus (Lartas/PI/LS)'],
    equipment: 'Sistem Terintegrasi Ceisa 4.0'
  },
  {
    id: 'gudang-pbm',
    title: 'Gudang & PBM',
    category: 'Perusahaan Bongkar Muat & Warehouse',
    tagline: 'Stevedoring profesional dan pergudangan transit pelabuhan.',
    description: 'Layanan bongkar muat kapal (stevedoring/cargodoring) serta fasilitas gudang konsolidasi berstandar keamanan tinggi dekat dermaga utama.',
    features: ['Fasilitas Penyimpanan Kargo Kering & Curah', 'Forklift Kapasitas 3T - 45T & Reach Stacker', 'Cross-Docking & Sorting Management'],
    equipment: 'Gudang Kawasan Pabean & Non-Pabean'
  },
  {
    id: 'domestic-truck',
    title: 'Domestic Trucking',
    category: 'Inland Transport',
    tagline: 'Armada distribusi darat multi-moda ke seluruh pelosok pulau.',
    description: 'Penjemputan dan pengantaran kargo terjadwal dari dermaga pelabuhan ke pabrik atau gudang akhir dengan pemantauan satelit real-time.',
    features: ['Trailer Petikemas 20ft & 40ft Standar/HC', 'CDD Box, Fuso Berat, hingga Wingbox 32 Ton', 'Tracking GPS Armada 24 Jam Terbuka'],
    equipment: '100+ Unit Armada Siap Jalan'
  },
  {
    id: 'project-cargo',
    title: 'Project Cargo & Heavy Lift',
    category: 'Specialized Industrial',
    tagline: 'Penanganan muatan berukuran raksasa dan berbobot ekstrem.',
    description: 'Rekayasa logistik untuk mesin pabrik, genset turbin, struktur baja industri, dan muatan over-dimension/over-weight (ODOW).',
    features: ['Route Survey & Bridge Clearance Analysis', 'Lowbed, Multi-Axle, & Flat Rack Provision', 'Pengawalan Khusus & Asuransi All-Risk Cargo'],
    equipment: 'Multi-Axle Hydraulic Trailer'
  },
  {
    id: 'lcl',
    title: 'LCL (Less than Container Load)',
    category: 'Konsolidasi Laut Ekonomis',
    tagline: 'Kirim barang tanpa harus menyewa satu kontainer penuh.',
    description: 'Solusi hemat bagi importir/eksportir dengan volume muatan di bawah 15 CBM melalui sistem konsolidasi mingguan terjadwal.',
    features: ['Perhitungan Tarif Berbasis Kubikasi Murni (CBM)', 'Jadwal Sailing Konsolidasi Mingguan Tetap', 'Unstuffing Cepat di CFS Gudang Pelabuhan'],
    equipment: 'Weekly Direct Consolidation Box'
  },
  {
    id: 'fcl',
    title: 'FCL (Full Container Load)',
    category: 'Kontainer Eksklusif Internasional',
    tagline: 'Kontrak slot langsung dengan ocean shipping line terkemuka.',
    description: 'Penyediaan peti kemas 20ft, 40ft General Purpose, 40ft High Cube, Reefer berpendingin, serta Open Top untuk rute internasional utama.',
    features: ['Alokasi Ruang Kapal Dijamin Pada Peak Season', 'Free Time Demurrage & Detention Lebih Panjang', 'Door-to-Door atau Port-to-Port Transparan'],
    equipment: '20ft, 40ft GP, 40ft HC, Reefer'
  },
  {
    id: 'air-shipment',
    title: 'Air Shipment Priority',
    category: 'Kargo Udara Ekspres',
    tagline: 'Waktu transit singkat untuk kargo berprioritas kritis.',
    description: 'Layanan kargo udara reguler dan charter kargo untuk pengiriman sampel cepat, suku cadang manufaktur darurat, dan kargo berharga tinggi.',
    features: ['Next-Flight-Out Prioritas Tertinggi', 'Door-to-Airport & Door-to-Door Service', 'Pengurusan Air Waybill (AWB) Kilat'],
    equipment: 'Direct Airline Space Contracts'
  }
];

export const ServicesCarousel: React.FC<{ onSelectService: (name: string) => void }> = ({ onSelectService }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'ppjk': return <FileCheck2 className="w-8 h-8 text-brand-orange" />;
      case 'gudang-pbm': return <Warehouse className="w-8 h-8 text-brand-orange" />;
      case 'domestic-truck': return <Truck className="w-8 h-8 text-brand-orange" />;
      case 'project-cargo': return <Layers className="w-8 h-8 text-brand-orange" />;
      case 'lcl': return <Box className="w-8 h-8 text-brand-orange" />;
      case 'fcl': return <Container className="w-8 h-8 text-brand-orange" />;
      case 'air-shipment': return <PlaneTakeoff className="w-8 h-8 text-brand-orange" />;
      default: return <Container className="w-8 h-8 text-brand-orange" />;
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? SERVICES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SERVICES.length - 1 ? 0 : prev + 1));
  };

  const current = SERVICES[currentIndex];

  return (
    <section id="services" className="py-24 bg-brand-surface border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange block mb-2">
              Layanan End-to-End Logistik
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              7 Solusi Terintegrasi GAEKS GROUP
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl">
              Navigasikan kargo Anda dengan dukungan perizinan pabean, armada truk sendiri, dan alokasi ruang kapal internasional.
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-xl border border-brand-border bg-white text-brand-navy hover:bg-brand-navy hover:text-white transition-colors shadow-sm"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-500">
              {currentIndex + 1} / {SERVICES.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-xl border border-brand-border bg-white text-brand-navy hover:bg-brand-navy hover:text-white transition-colors shadow-sm"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Interactive Card */}
        <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-12 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-brand-orange/10 rounded-2xl">
                  {getServiceIcon(current.id)}
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
                    {current.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">
                    {current.title}
                  </h3>
                </div>
              </div>

              <p className="text-lg font-semibold text-slate-700">
                "{current.tagline}"
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {current.description}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Spesifikasi & Keunggulan Layanan:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectService(current.title)}
                  className="inline-flex items-center space-x-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-brand-orange/20 transition-all hover:scale-[1.02]"
                >
                  <span>Ajukan Inquiry Layanan Ini</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3.5 py-2.5 rounded-lg border border-slate-200">
                  Standar: <span className="text-slate-800">{current.equipment}</span>
                </div>
              </div>
            </div>

            {/* Service Carousel Selector Pills */}
            <div className="lg:col-span-5 bg-brand-navy rounded-2xl p-6 text-white space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-4">
                Daftar Seluruh Layanan (Klik untuk Memilih)
              </span>
              {SERVICES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between text-xs sm:text-sm font-semibold transition-all ${
                    idx === currentIndex
                      ? 'bg-brand-orange text-white shadow-lg'
                      : 'hover:bg-brand-darkBlue text-slate-300'
                  }`}
                >
                  <span className="truncate">{s.title}</span>
                  <span className="text-[10px] uppercase font-bold opacity-80 pl-2">{s.category.split(' ')[0]}</span>
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
