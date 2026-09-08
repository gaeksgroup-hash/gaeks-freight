const fs = require('fs');
const path = require('path');

function saveFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log(`[SUCCESS] Dibuat: ${filePath}`);
}

// 1. TYPES
saveFile('src/types/freight.ts', `
// filepath: /src/types/freight.ts
export type ShippingMode = 'ocean' | 'air';

export interface PortEntry {
  name: string;
  port: string;
  code: string;
  country: string;
  region: string;
  gateway: string;
  note: string;
  keywords: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  equipment: string;
  imageUrl: string;
  commodities: string;
}

export interface RouteData {
  id: string;
  originName: string;
  originCountry: string;
  destinationPort: 'Jakarta (Tanjung Priok)' | 'Semarang (Tanjung Emas)' | 'Surabaya (Tanjung Perak)';
  seaTransitDays: string;
  airTransitDays: string;
  departureFreq: string;
  commodities: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedDate: string;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}
`);

// 2. NEWS STORAGE & SEED UTILITY
saveFile('src/utils/newsStorage.ts', `
// filepath: /src/utils/newsStorage.ts
import { ArticleItem, NewsletterSubscriber } from '../types/freight';

const STORAGE_KEY_ARTICLES = 'gaeks_articles';
const STORAGE_KEY_SUBSCRIBERS = 'gaeks_subscribers';

export const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Panduan Praktis Pengurusan PPJK & Kepatuhan Lartas Impor 2026',
    slug: 'panduan-ppjk-lartas-2026',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Langkah strategis mengamankan izin impor, kesesuaian kode HS, dan pencegahan risiko jalur merah di pelabuhan utama.',
    content: 'Pemeriksaan kepabeanan di Pelabuhan Tanjung Priok, Tanjung Emas, dan Tanjung Perak kini semakin ketat dengan integrasi penuh sistem Ceisa 4.0. Importir wajib memastikan nomor PIB dan dokumen pelengkap Lartas/Perizinan Impor (PI) terverifikasi sebelum kapal sandar guna menghindari denda demurrage.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    author: 'Tim Regulasi GAEKS',
    publishedDate: '05 September 2026'
  },
  {
    id: 'art-2',
    title: 'Optimalisasi Biaya Kargo Laut: Kapan Harus Memilih FCL vs LCL?',
    slug: 'optimasi-kargo-fcl-vs-lcl',
    category: 'Operational Freight',
    excerpt: 'Perbandingan komprehensif efisiensi tarif berbasis CBM kubikasi vs sewa kontainer penuh untuk rute Asia Timur ke Indonesia.',
    content: 'Bagi pelaku industri dengan volume muatan di bawah 15 CBM, opsi Less than Container Load (LCL) memberikan fleksibilitas anggaran pengiriman tanpa komitmen sewa 1 kontainer penuh. Namun ketika volume menyentuh 15-20 CBM, opsi FCL 20ft menjadi jauh lebih ekonomis.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
    author: 'Commercial Logistics GAEKS',
    publishedDate: '01 September 2026'
  },
  {
    id: 'art-3',
    title: 'Koneksi Feeder Langsung: Rute Pelayaran Tiongkok ke Jakarta, Semarang, & Surabaya',
    slug: 'koneksi-feeder-tiongkok-ke-indonesia',
    category: 'Rute Maritim',
    excerpt: 'Jadwal reguler kapal kontainer langsung dari Shanghai, Ningbo, dan Shenzhen dengan waktu transit 9 hingga 14 hari.',
    content: 'GAEKS FREIGHT memperkuat alokasi ruang kargo laut dengan jaringan pelayaran langsung (direct call) dan feeder transshipment via Singapura untuk memastikan kargo pabrik dan proyek industri tiba sesuai jadwal SLA.',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    author: 'Trade Lane Team GAEKS',
    publishedDate: '28 Agustus 2026'
  }
];

export function getStoredArticles(): ArticleItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ARTICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    return JSON.parse(raw);
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

// 3. HERO COMPONENT DENGAN GAMBAR REPRESENTATIF
saveFile('src/components/Hero.tsx', `
// filepath: /src/components/Hero.tsx
import React from 'react';
import { ShieldCheck, Globe2, Clock, Sparkles, MessageCircleQuestion } from 'lucide-react';

export const Hero: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 bg-brand-navy overflow-hidden">
      {/* Visual Background with Logistics Vessels */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-darkBlue border border-brand-steel/40 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span>International Freight Forwarder & Customs Broker</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Arsitektur Logistik Global untuk Skala <span className="text-brand-orange">Ekspor & Impor</span> Indonesia.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Menghubungkan rantai pasok Anda langsung dari seluruh dunia ke <strong>Jakarta (Tanjung Priok)</strong>, <strong>Semarang (Tanjung Emas)</strong>, dan <strong>Surabaya (Tanjung Perak)</strong> dengan kepastian jadwal, legalitas kepabeanan PPJK, dan armada trucking terintegrasi.
          </p>

          {/* Commodity Flexibility Banner */}
          <div className="mt-6 p-4 bg-brand-darkBlue/80 border border-brand-orange/40 rounded-2xl flex items-start space-x-3 text-slate-200">
            <MessageCircleQuestion className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="text-white">Komoditas Sangat Beragam:</strong> Kami melayani bahan baku manufaktur, mesin industri, semen, tekstil, komoditas curah, hingga kargo bersuhu dingin (reefer). <span className="text-brand-orange font-semibold">Jenis komoditas khusus dapat dikonsultasikan terlebih dahulu sebelum keberangkatan.</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('calculator')}
              className="bg-brand-orange hover:bg-brand-orangeHover text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-xl shadow-brand-orange/25 transition-all hover:-translate-y-0.5"
            >
              Hitung CBM & Port Terdekat
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="bg-brand-darkBlue hover:bg-brand-steel border border-brand-steel/50 text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base transition-all"
            >
              Jelajahi 7 Layanan Kargo
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-brand-darkBlue grid grid-cols-3 gap-4 text-slate-300">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-orange flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Legalitas PPJK Resmi</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Globe2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Global Ocean Liner</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Clock className="w-5 h-5 text-brand-orange flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">SLA Pelabuhan 24/7</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
`);

// 4. SERVICES CAROUSEL DENGAN GAMBAR REPRESENTATIF
saveFile('src/components/ServicesCarousel.tsx', `
// filepath: /src/components/ServicesCarousel.tsx
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
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

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? DETAILED_SERVICES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === DETAILED_SERVICES.length - 1 ? 0 : prev + 1));
  };

  const current = DETAILED_SERVICES[currentIndex];

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
              Didukung infrastruktur legal pabean, armada truk sendiri, pergudangan pelabuhan, dan slot liner dunia.
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-xl border border-brand-border bg-white text-brand-navy hover:bg-brand-navy hover:text-white transition-colors shadow-sm"
              aria-label="Previous Service"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-500">
              {currentIndex + 1} / {DETAILED_SERVICES.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-xl border border-brand-border bg-white text-brand-navy hover:bg-brand-navy hover:text-white transition-colors shadow-sm"
              aria-label="Next Service"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Highlighted Service Card */}
        <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-2xl shadow-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img 
                src={current.imageUrl} 
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 bg-brand-navy/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/20">
                {current.category}
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="hidden lg:inline-block text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">
                  {current.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">
                  {current.title}
                </h3>
                <p className="mt-2 text-base font-semibold text-slate-700">
                  "{current.tagline}"
                </p>
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {current.description}
                </p>

                {/* Commodity Suitability Callout */}
                <div className="mt-5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                  <strong className="text-brand-navy font-bold">Kesesuaian Komoditas: </strong>
                  {current.commodities}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    Keunggulan & Cakupan:
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
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                <button
                  onClick={() => onSelectService(current.title)}
                  className="inline-flex items-center space-x-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-brand-orange/20 transition-all hover:scale-[1.02]"
                >
                  <span>Konsultasikan Komoditas Ini</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="text-xs font-semibold text-slate-500">
                  Standar Alat: <span className="text-brand-navy font-bold">{current.equipment}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Service Navigation Strip */}
        <div className="mt-8 flex overflow-x-auto pb-2 gap-3 no-scrollbar">
          {DETAILED_SERVICES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                idx === currentIndex
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-white text-slate-600 border border-brand-border hover:border-brand-orange'
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
`);

// 5. NEWS PAGE & NEWSLETTER COMPONENT
saveFile('src/components/NewsPage.tsx', `
// filepath: /src/components/NewsPage.tsx
import React, { useState } from 'react';
import { Newspaper, Send, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { getStoredArticles, addSubscriber } from '../utils/newsStorage';
import { ArticleItem } from '../types/freight';

export const NewsPage: React.FC = () => {
  const [articles] = useState<ArticleItem[]>(getStoredArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const filtered = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    const ok = addSubscriber(emailInput);
    if (ok) {
      setSubscribeStatus('Terima kasih! Anda telah terdaftar di newsletter berkala GAEKS GROUP.');
      setEmailInput('');
    } else {
      setSubscribeStatus('Email Anda sudah terdaftar sebelumnya.');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-brand-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange block mb-2">
            Pusat Informasi & Regulasi Kargo
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight">
            Update Industri, Kebijakan Pabean, & Rute
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Ikuti perkembangan terkini mengenai lartas impor, jadwal pelayaran reguler, panduan CBM, dan efisiensi rantai pasok Indonesia.
          </p>
        </div>

        {/* Newsletter Subscription Card */}
        <div className="mb-16 bg-gradient-to-r from-brand-navy to-brand-darkBlue rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-2">
              Langganan Berita Berkala
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-3">
              Dapatkan Ringkasan Tarif & Regulasi Ekspor-Impor
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              Kirimkan update resmi perubahan kode HS, kebijakan jalur hijau, dan jadwal kapal langsung ke kotak masuk email Anda.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Masukkan alamat email Anda..."
                className="px-4 py-3 rounded-xl text-slate-900 text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
            </form>

            {subscribeStatus && (
              <div className="mt-3 flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{subscribeStatus}</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel atau kata kunci regulasi..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none bg-white"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Menampilkan {filtered.length} Publikasi
          </span>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-brand-navy/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[11px] font-bold">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-[11px] text-slate-400 font-semibold block mb-2">
                    {item.publishedDate} • Oleh {item.author}
                  </span>
                  <h3 className="text-lg font-black text-brand-navy leading-snug mb-3 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="text-xs font-bold text-brand-orange hover:text-brand-orangeHover flex items-center space-x-1"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Article Modal Detail */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="relative h-56 rounded-2xl overflow-hidden">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase">{selectedArticle.category}</span>
                <h2 className="text-2xl font-black text-brand-navy mt-1">{selectedArticle.title}</h2>
                <span className="text-xs text-slate-400 block mt-1">{selectedArticle.publishedDate} • Oleh {selectedArticle.author}</span>
              </div>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-4">
                {selectedArticle.content}
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-brand-navy text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-brand-darkBlue"
                >
                  Tutup Artikel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
`);

// 6. ADMIN CMS DASHBOARD COMPONENT (AUTH: Admingaekspost, email @gaeks.com, pass: gaeksnewsku001)
saveFile('src/components/AdminCMS.tsx', `
// filepath: /src/components/AdminCMS.tsx
import React, { useState } from 'react';
import { Lock, UserCheck, PlusCircle, Trash2, Mail, LogOut, CheckCircle, ShieldAlert } from 'lucide-react';
import { ArticleItem, NewsletterSubscriber } from '../types/freight';
import { getStoredArticles, saveStoredArticles, getSubscribers } from '../utils/newsStorage';

export const AdminCMS: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [articles, setArticles] = useState<ArticleItem[]>(getStoredArticles());
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(getSubscribers());

  // Form New Article
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Regulasi Kepabeanan');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80');
  const [authorName, setAuthorName] = useState('Admin GAEKS');
  const [publishSuccess, setPublishSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userValid = usernameInput.trim() === 'Admingaekspost';
    const emailValid = emailInput.trim().toLowerCase().endsWith('@gaeks.com');
    const passValid = passwordInput === 'gaeksnewsku001';

    if (!userValid) {
      setLoginError('Username salah. Wajib menggunakan Admingaekspost.');
      return;
    }
    if (!emailValid) {
      setLoginError('Email wajib menggunakan akun resmi berakhiran @gaeks.com (contoh: info@gaeks.com, admin@gaeks.com).');
      return;
    }
    if (!passValid) {
      setLoginError('Password otorisasi salah.');
      return;
    }

    setIsAuthenticated(true);
    setLoginError('');
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newArt: ArticleItem = {
      id: 'art-' + Date.now(),
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newCategory,
      excerpt: newExcerpt || newContent.substring(0, 120) + '...',
      content: newContent,
      imageUrl: newImageUrl,
      author: authorName,
      publishedDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
    };

    const updated = [newArt, ...articles];
    setArticles(updated);
    saveStoredArticles(updated);

    // Reset Form
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setPublishSuccess('Artikel berhasil dipublikasikan langsung ke halaman Berita & Publikasi!');
    setTimeout(() => setPublishSuccess(''), 4000);
  };

  const handleDeleteArticle = (id: string) => {
    if (!window.confirm('Yakin ingin menghapus artikel ini?')) return;
    const updated = articles.filter(a => a.id !== id);
    setArticles(updated);
    saveStoredArticles(updated);
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-brand-surface flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-brand-border p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center mx-auto text-brand-orange">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-brand-navy">Portal CMS GAEKS GROUP</h2>
            <p className="text-xs text-slate-500">
              Otorisasi internal khusus staf editorial. Wajib menggunakan akun email resmi <strong className="text-slate-800">@gaeks.com</strong>.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2 text-xs text-red-700 font-semibold">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Username Otorisasi</label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Admingaekspost"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Resmi (@gaeks.com)</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="nama@gaeks.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-navy hover:bg-brand-darkBlue text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-brand-navy/30"
            >
              Masuk Dashboard CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Bar Dashboard */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border shadow-sm">
          <div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              Sesi Login Terverifikasi (@gaeks.com)
            </span>
            <h1 className="text-2xl font-black text-brand-navy mt-1">Dashboard Konten & Newsletter</h1>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center space-x-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Post New Article Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-brand-border p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <PlusCircle className="w-4 h-4" />
              <span>Publikasikan Berita Baru</span>
            </div>

            {publishSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-xs text-emerald-700 font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>{publishSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Update Regulasi Jalur Pabean Impor Pelabuhan..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Berita</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none bg-white"
                  >
                    <option value="Regulasi Kepabeanan">Regulasi Kepabeanan</option>
                    <option value="Operational Freight">Operational Freight</option>
                    <option value="Rute Maritim">Rute Maritim</option>
                    <option value="Update Komoditas">Update Komoditas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Penulis / Editor</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Gambar Header (Unsplash / CDN)</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ringkasan (Excerpt)</label>
                <input
                  type="text"
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Ringkasan singkat untuk kartu pratinjau..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Konten Lengkap Berita *</label>
                <textarea
                  rows={6}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Tuliskan isi artikel lengkap di sini..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                Terbitkan ke Website Utama
              </button>
            </form>
          </div>

          {/* Manage Articles & Subscribers List */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Newsletter Subscribers Box */}
            <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-brand-navy text-xs font-bold uppercase tracking-wider">
                <Mail className="w-4 h-4 text-brand-orange" />
                <span>Pelanggan Newsletter ({subscribers.length})</span>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-2 text-xs">
                {subscribers.length === 0 ? (
                  <p className="text-slate-400 italic">Belum ada pelanggan terdaftar.</p>
                ) : (
                  subscribers.map((s, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{s.email}</span>
                      <span className="text-[10px] text-slate-400">{new Date(s.subscribedAt).toLocaleDateString()}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Existing Articles List */}
            <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm space-y-4">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Daftar Artikel Aktif ({articles.length})
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {articles.map((art) => (
                  <div key={art.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-start justify-between space-x-2">
                    <div>
                      <span className="text-[10px] font-bold text-brand-orange block uppercase">{art.category}</span>
                      <h4 className="text-xs font-bold text-brand-navy leading-snug">{art.title}</h4>
                      <span className="text-[10px] text-slate-400">{art.publishedDate}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteArticle(art.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
`);

// 7. APP CONTROLLER DENGAN HASH-BASED ROUTER
saveFile('src/App.tsx', `
// filepath: /src/App.tsx
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { SmartCalculator } from './components/SmartCalculator';
import { InteractiveMap } from './components/InteractiveMap';
import { NewsPage } from './components/NewsPage';
import { AdminCMS } from './components/AdminCMS';
import { ContactPage } from './components/ContactPage';
import { StatsNetwork } from './components/StatsNetwork';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['home', 'services', 'calculator', 'network', 'news', 'contact', 'admin'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage());
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'services', 'calculator', 'network', 'news', 'contact', 'admin'].includes(page)) {
        setCurrentPage(page);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: string) => {
    window.location.hash = page;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForQuote(serviceName);
    navigateTo('calculator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-surface text-slate-800">
      <Navbar currentTab={currentPage as any} onNavigate={navigateTo} />

      <main className="flex-grow">
        {currentPage === 'services' && (
          <div className="pt-24">
            <ServicesCarousel onSelectService={handleSelectService} />
          </div>
        )}

        {currentPage === 'calculator' && (
          <div className="pt-24">
            <SmartCalculator prefillService={selectedServiceForQuote} />
          </div>
        )}

        {currentPage === 'network' && (
          <div className="pt-24">
            <InteractiveMap />
          </div>
        )}

        {currentPage === 'news' && (
          <NewsPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'admin' && (
          <AdminCMS />
        )}

        {currentPage === 'home' && (
          <>
            <Hero onNavigate={navigateTo} />
            <ServicesCarousel onSelectService={handleSelectService} />
            <SmartCalculator prefillService={selectedServiceForQuote} />
            <InteractiveMap />
            <StatsNetwork />
          </>
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
`);

console.log("\n>>> Setup V2 selesai! Seluruh file baru berhasil disusun secara modular.");
