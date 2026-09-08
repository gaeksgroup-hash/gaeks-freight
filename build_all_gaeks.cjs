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

console.log(">>> Memulai perakitan seluruh arsitektur GAEKS GROUP V2...\n");

// 0. Bersihkan file lama yang bentrok
try {
  if (fs.existsSync('src/components/Calculator.tsx')) fs.unlinkSync('src/components/Calculator.tsx');
  if (fs.existsSync('src/components/Services.tsx')) fs.unlinkSync('src/components/Services.tsx');
} catch (e) {}

// 1. INDEX.HTML (SEO, GOOGLE FONTS, SCHEMA.ORG, NO DGP)
saveFile('index.html', `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GAEKS GROUP | International Freight Forwarder, PPJK & Supply Chain Logistics</title>
    <meta name="description" content="Portal resmi GAEKS GROUP (GAEKS FREIGHT). Solusi terpadu Ocean Freight (FCL/LCL), Air Cargo Priority, Custom Brokerage PPJK Ceisa 4.0, Gudang PBM, dan Domestic Trucking ke seluruh Indonesia." />
    <meta name="keywords" content="freight forwarding indonesia, jasa ekspor impor, ppjk bea cukai, sewa container fcl lcl, kargo udara internasional, pergudangan pbm pelabuhan, inland trucking, tanjung priok, tanjung emas, tanjung perak, gaeks group, gaeks freight" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
    <link rel="canonical" href="https://gaeks.com/" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://gaeks.com/" />
    <meta property="og:site_name" content="GAEKS GROUP" />
    <meta property="og:title" content="GAEKS GROUP | International Freight Forwarding & Logistics Solutions" />
    <meta property="og:description" content="Layanan kargo laut, kargo udara ekspres, legalitas pabean PPJK, dan armada trucking darat terintegrasi dengan kepastian jadwal dan tarif kompetitif." />
    <meta property="og:image" content="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://gaeks.com/#organization",
          "name": "GAEKS GROUP",
          "url": "https://gaeks.com/",
          "logo": "https://gaeks.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+62-856-0856-1745",
            "contactType": "Customer Service & Sales",
            "email": "Sales01@gaeks.com",
            "areaServed": "ID",
            "availableLanguage": ["Indonesian", "English"]
          }
        },
        {
          "@type": "LogisticsService",
          "@id": "https://gaeks.com/#service",
          "name": "GAEKS FREIGHT",
          "provider": { "@id": "https://gaeks.com/#organization" },
          "serviceType": "International Freight Forwarding & Customs Brokerage",
          "areaServed": "Worldwide"
        }
      ]
    }
    </script>
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased font-sans selection:bg-brand-orange selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`);

// 2. TAILWIND CONFIG
saveFile('tailwind.config.js', `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: '#030816',
          darkBlue: '#0A152E',
          card: '#0F1E3D',
          steel: '#22355D',
          orange: '#FF5722',
          orangeHover: '#EA430D',
          amber: '#F59E0B',
          surface: '#F8FAFC',
          border: '#1E293B'
        }
      }
    },
  },
  plugins: [],
}`);

// 3. TYPES
saveFile('src/types/freight.ts', `
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

// 4. PORTS DATABASE
saveFile('src/utils/ports.json', JSON.stringify([
  { name: "Jakarta & Jabodetabek", port: "Pelabuhan Tanjung Priok", code: "IDJKT", country: "Indonesia", region: "DKI Jakarta", gateway: "Jakarta (Tanjung Priok)", note: "Gateway utama peti kemas internasional Jawa Barat", keywords: ["jakarta", "tangerang", "depok", "bogor", "priok"] },
  { name: "Bekasi & Cikarang", port: "Pelabuhan Tanjung Priok", code: "IDJKT", country: "Indonesia", region: "Jawa Barat", gateway: "Jakarta (Tanjung Priok)", note: "Akses langsung Tol Cibitung-Cilincing (JTCC) & Cikarang Dry Port", keywords: ["bekasi", "cikarang", "cibitung", "tambun"] },
  { name: "Karawang & Purwakarta", port: "Pelabuhan Tanjung Priok", code: "IDJKT", country: "Indonesia", region: "Jawa Barat", gateway: "Jakarta (Tanjung Priok)", note: "Hub industri manufaktur KIIC, Suryacipta ke Tanjung Priok", keywords: ["karawang", "purwakarta", "klari"] },
  { name: "Cilegon & Serang", port: "Pelabuhan Ciwandan / Cigading / Merak Mas", code: "IDCIW", country: "Indonesia", region: "Banten", gateway: "Jakarta (Tanjung Priok)", note: "Kawasan industri baja & petrokimia Selat Sunda", keywords: ["cilegon", "serang", "merak", "banten"] },
  { name: "Bandung & Subang", port: "Pelabuhan Tanjung Priok / Patimban", code: "IDPTB", country: "Indonesia", region: "Jawa Barat", gateway: "Jakarta (Tanjung Priok)", note: "Akses Patimban & Tol Cipularang ke Tanjung Priok", keywords: ["bandung", "subang", "cimahi", "patimban"] },
  { name: "Semarang", port: "Pelabuhan Tanjung Emas", code: "IDSRG", country: "Indonesia", region: "Jawa Tengah", gateway: "Semarang (Tanjung Emas)", note: "Pelabuhan peti kemas utama Jawa Tengah", keywords: ["semarang", "emas"] },
  { name: "Solo & Surakarta", port: "Pelabuhan Tanjung Emas", code: "IDSRG", country: "Indonesia", region: "Jawa Tengah", gateway: "Semarang (Tanjung Emas)", note: "± 100 km via Tol Solo-Semarang (±1.5 jam)", keywords: ["solo", "surakarta", "boyolali", "klaten", "sukoharjo"] },
  { name: "Yogyakarta", port: "Pelabuhan Tanjung Emas", code: "IDSRG", country: "Indonesia", region: "DIY", gateway: "Semarang (Tanjung Emas)", note: "± 125 km via rute Magelang/Tol Bawen ke Tanjung Emas", keywords: ["jogja", "yogyakarta", "sleman", "bantul"] },
  { name: "Kudus & Jepara", port: "Pelabuhan Tanjung Emas", code: "IDSRG", country: "Indonesia", region: "Jawa Tengah", gateway: "Semarang (Tanjung Emas)", note: "Sentra ekspor furniture & industri ke Tanjung Emas", keywords: ["kudus", "jepara", "pati", "demak"] },
  { name: "Surabaya & Gresik", port: "Pelabuhan Tanjung Perak", code: "IDSUB", country: "Indonesia", region: "Jawa Timur", gateway: "Surabaya (Tanjung Perak)", note: "Hub maritim internasional Jawa Timur & Kawasan JIIPE", keywords: ["surabaya", "gresik", "perak"] },
  { name: "Sidoarjo & Pasuruan", port: "Pelabuhan Tanjung Perak", code: "IDSUB", country: "Indonesia", region: "Jawa Timur", gateway: "Surabaya (Tanjung Perak)", note: "Akses kawasan PIER & Waru ke Tanjung Perak via Tol", keywords: ["sidoarjo", "pasuruan", "gempol"] },
  { name: "Malang & Kediri", port: "Pelabuhan Tanjung Perak", code: "IDSUB", country: "Indonesia", region: "Jawa Timur", gateway: "Surabaya (Tanjung Perak)", note: "± 90 km via Tol Pandaan-Malang ke Tanjung Perak", keywords: ["malang", "kediri", "blitar", "mojokerto"] },
  { name: "Medan & Belawan", port: "Pelabuhan Belawan", code: "IDBLW", country: "Indonesia", region: "Sumatra Utara", gateway: "Pelabuhan Belawan", note: "Pintu gerbang peti kemas internasional Sumatra Utara", keywords: ["medan", "belawan", "binjai"] },
  { name: "Batam", port: "Pelabuhan Batu Ampar", code: "IDBTH", country: "Indonesia", region: "Kepulauan Riau", gateway: "Batu Ampar (Batam)", note: "Free Trade Zone & koneksi feeder langsung Singapura", keywords: ["batam", "ampar"] },
  { name: "Lampung", port: "Pelabuhan Panjang", code: "IDPNJ", country: "Indonesia", region: "Lampung", gateway: "Pelabuhan Panjang", note: "Gerbang logistik ekspor hasil bumi Sumatra Selatan", keywords: ["lampung", "panjang"] },
  { name: "Shanghai", port: "Port of Shanghai (Yangshan)", code: "CNSHA", country: "China", region: "Asia Timur", gateway: "Jakarta / Surabaya Direct", note: "Pelabuhan tersibuk dunia, sailing direct 10-14 hari ke Indonesia", keywords: ["shanghai", "cnsha", "yangshan"] },
  { name: "Ningbo-Zhoushan", port: "Ningbo-Zhoushan Port", code: "CNNGB", country: "China", region: "Asia Timur", gateway: "Jakarta / Semarang / Surabaya", note: "Pusat industri manufaktur Zhejiang", keywords: ["ningbo", "zhoushan", "cnngb"] },
  { name: "Shenzhen (Yantian)", port: "Shenzhen Yantian / Shekou", code: "CNYTN", country: "China", region: "Asia Timur", gateway: "Jakarta / Surabaya Direct", note: "Hub kargo elektronik & gadget Tiongkok Selatan", keywords: ["shenzhen", "yantian", "shekou", "cnytn"] },
  { name: "Guangzhou (Nansha)", port: "Guangzhou Nansha Port", code: "CNNSA", country: "China", region: "Asia Timur", gateway: "Jakarta / Surabaya Direct", note: "Pusat manufaktur Guangdong", keywords: ["guangzhou", "nansha", "cnnsa", "canton"] },
  { name: "Singapore", port: "Port of Singapore (PSA)", code: "SGSIN", country: "Singapore", region: "Asia Tenggara", gateway: "Jakarta / Semarang / Surabaya (Daily)", note: "Hub transshipment utama Asia Tenggara, feeder harian", keywords: ["singapore", "singapura", "sgsin", "psa"] },
  { name: "Port Klang", port: "Port Klang (Northport/Westports)", code: "MYPKG", country: "Malaysia", region: "Asia Tenggara", gateway: "Jakarta / Belawan / Surabaya", note: "Pelabuhan utama Malaysia, koneksi feeder rutin", keywords: ["klang", "mypkg", "malaysia"] },
  { name: "Jebel Ali (Dubai)", port: "Jebel Ali Port (DP World)", code: "AEJEA", country: "UAE", region: "Timur Tengah", gateway: "Jakarta / Surabaya Direct", note: "Pelabuhan kontainer terbesar di Timur Tengah", keywords: ["dubai", "jebel ali", "aejea", "uae", "emirates"] },
  { name: "Rotterdam", port: "Port of Rotterdam", code: "NLRTM", country: "Netherlands", region: "Eropa", gateway: "Jakarta / Surabaya Direct", note: "Pelabuhan terbesar di Eropa, transit 28-34 hari", keywords: ["rotterdam", "belanda", "netherlands", "nlrtm"] }
], null, 2));

// 5. PORT FINDER LOGIC
saveFile('src/utils/portFinder.ts', `
import { PortEntry } from '../types/freight';
import portsData from './ports.json';

export const COMPREHENSIVE_PORTS: PortEntry[] = portsData as PortEntry[];

export function findSmartNearestPort(inputAddress: string): PortEntry | null {
  if (!inputAddress || inputAddress.trim().length < 2) return null;
  const query = inputAddress.toLowerCase().trim();

  const matchedByKeyword = COMPREHENSIVE_PORTS.find(p => 
    p.keywords.some(k => query.includes(k) || k.includes(query))
  );
  if (matchedByKeyword) return matchedByKeyword;

  const matchedByNameOrCode = COMPREHENSIVE_PORTS.find(p => 
    p.name.toLowerCase().includes(query) ||
    p.port.toLowerCase().includes(query) ||
    p.code.toLowerCase() === query ||
    query.includes(p.country.toLowerCase())
  );
  
  return matchedByNameOrCode || null;
}
`);

// 6. 20 ARTIKEL RESMI DENGAN TANGGAL HISTORIS (BACKDATE)
saveFile('src/utils/newsStorage.ts', `
import { ArticleItem, NewsletterSubscriber } from '../types/freight';

const STORAGE_KEY_ARTICLES = 'gaeks_articles';
const STORAGE_KEY_SUBSCRIBERS = 'gaeks_subscribers';

export const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Panduan Praktis Integrasi Ceisa 4.0 Bea Cukai & Verifikasi Dokumen Pabean',
    slug: 'panduan-integrasi-ceisa-4-bea-cukai',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Pahami alur submit dokumen PIB/PEB secara elektronik, validasi dokumen perizinan, dan mitigasi risiko respon SPPB pabean.',
    content: 'Penerapan sistem CEISA 4.0 oleh Direktorat Jenderal Bea dan Cukai menuntut importir memiliki kepatuhan data tingkat tinggi. Setiap elemen data pada invoice, packing list, hingga Bill of Lading (B/L) harus sinkron dengan database INSW. Melalui layanan PPJK resmi GAEKS FREIGHT, proses verifikasi data pabean diaudit sebelum pengiriman elektronik guna meminimalisir Notul (Nota Pembetulan) dan biaya penumpukan di dermaga lini 1.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    author: 'Tim Regulasi Pabean GAEKS',
    publishedDate: '2026-09-05'
  },
  {
    id: 'art-2',
    title: 'Deregulasi Kebijakan Impor & Relaksasi Lartas: Strategi Importir 2026',
    slug: 'deregulasi-kebijakan-impor-relaksasi-lartas',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Analisis mendalam mengenai perubahan pembatasan impor komoditas industri tertentu dan kemudahan pengajuan Persetujuan Impor (PI).',
    content: 'Perubahan regulasi perdagangan luar negeri menuntut pelaku industri manufaktur memantau aturan Larangan dan Pembatasan (Lartas). Komoditas seperti bahan baku plastik, tekstil, dan suku cadang mesin membutuhkan koordinasi antara Laporan Surveyor (LS) dan Persetujuan Impor (PI). GAEKS GROUP mendampingi klien dari tahap pra-pengapalan untuk memastikan dokumen perizinan telah terbit sebelum kontainer dimuat.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    author: 'Trade Compliance GAEKS',
    publishedDate: '2026-08-28'
  },
  {
    id: 'art-3',
    title: 'Aliansi Pelayaran Global 2025/2026: Gemini Cooperation vs Ocean Alliance',
    slug: 'aliansi-pelayaran-global-gemini-ocean-alliance',
    category: 'Rute Maritim',
    excerpt: 'Dampak konfigurasi ulang aliansi pelayaran kapal kontainer dunia terhadap ketersediaan slot kapal dan jadwal direct call ke Indonesia.',
    content: 'Pembentukan Gemini Cooperation (Maersk dan Hapag-Lloyd) serta restrukturisasi Ocean Alliance mengubah peta jaringan kargo laut internasional. Bagi pelaku usaha di Indonesia, perubahan jadwal ini memengaruhi waktu singgah di hub transshipment seperti Singapura dan Tanjung Pelepas sebelum kargo diteruskan ke Tanjung Priok, Tanjung Emas, atau Tanjung Perak. GAEKS FREIGHT menjaga alokasi ruang langsung untuk stabilitas jadwal sailing.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
    author: 'Commercial Trade Specialist',
    publishedDate: '2026-08-15'
  },
  {
    id: 'art-4',
    title: 'Strategi Jitu Menghindari Biaya Demurrage & Detention di Pelabuhan Tanjung Priok',
    slug: 'strategi-menghindari-demurrage-detention-priok',
    category: 'Operational Freight',
    excerpt: 'Langkah praktis memperpanjang Free Time, penyelesaian DO elektronik kilat, dan koordinasi trucking pengembalian empty container.',
    content: 'Demurrage dan detention merupakan beban biaya tersembunyi yang sering membengkak jika dokumen impor terlambat diserahkan. Kunci pencegahannya adalah memastikan Delivery Order (DO) rilis sebelum kapal sandar, memilih forwarder yang memiliki negosiasi Free Time 14-21 hari, serta kesiapan armada trailer penarik kontainer untuk langsung membawa muatan ke gudang pabrik.',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    author: 'Port Operations Manager GAEKS',
    publishedDate: '2026-08-01'
  },
  {
    id: 'art-5',
    title: 'Fasilitas Surat Keterangan Asal (SKA) Form E: Nikmati Bea Masuk 0% Impor Tiongkok',
    slug: 'fasilitas-ska-form-e-bea-masuk-nol-persen',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Cara memanfaatkan skema ASEAN-China FTA (ACFTA) dengan validasi Certificate of Origin Form E elektronik guna memangkas tarif pabean.',
    content: 'Banyak importir membayar bea masuk standar karena kekeliruan pada format Form E atau ketidaksesuaian deskripsi barang dengan Bill of Lading. Dengan validasi e-Form E secara digital melalui portal pabean, perusahaan importir di Indonesia berhak memperoleh preferensi tarif bea masuk hingga 0% untuk ribuan pos tarif HS code komoditas industri.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    author: 'Tim Tarif & Klasifikasi GAEKS',
    publishedDate: '2026-07-20'
  },
  {
    id: 'art-6',
    title: 'Perbandingan FCL vs LCL: Mengoptimalkan Anggaran Pengiriman Kargo Laut',
    slug: 'perbandingan-fcl-vs-lcl-efisiensi-anggaran',
    category: 'Operational Freight',
    excerpt: 'Analisis titik impas volume (break-even point CBM) untuk menentukan kapan kargo harus dikonsolidasi atau menyewa kontainer mandiri.',
    content: 'Saat kargo berada di bawah volume 15 CBM, pengiriman Less than Container Load (LCL) memberikan efisiensi luar biasa karena tagihan dihitung strictly berdasarkan kubikasi. Namun, ketika muatan mencapai 16-18 CBM, menyewa satu unit FCL 20ft sering kali lebih hemat biaya per unit serta mengurangi risiko kerusakan akibat proses konsolidasi barang campuran di gudang CFS.',
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
    author: 'Commercial Logistics Lead',
    publishedDate: '2026-07-08'
  },
  {
    id: 'art-7',
    title: 'Incoterms 2020: Panduan Memilih Klausul FOB, CIF, atau DDP untuk Bisnis',
    slug: 'incoterms-2020-fob-cif-ddp',
    category: 'Operational Freight',
    excerpt: 'Ketahui batas tanggung jawab biaya, risiko kerusakan, dan asuransi kargo antara pihak penjual dan pembeli internasional.',
    content: 'Memilih Incoterms yang tepat dapat menyelamatkan arus kas perusahaan. Membeli dengan klausul FOB (Free on Board) memberikan kendali penuh kepada importir dalam memilih freight forwarder sendiri dan menegosiasikan tarif angkut yang lebih kompetitif dibandingkan menyerahkan biaya pengiriman kepada supplier asing (CIF).',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    author: 'Senior Supply Chain Advisor',
    publishedDate: '2026-06-25'
  },
  {
    id: 'art-8',
    title: 'Mekanisme Penetapan Jalur Hijau, Kuning, dan Merah oleh Sistem Profil Risiko Pabean',
    slug: 'mekanisme-jalur-hijau-kuning-merah-pabean',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Bagaimana Ditjen Bea dan Cukai menilai profil kepatuhan importir, jenis komoditas, dan negara asal dalam penentuan jalur pengeluaran barang.',
    content: 'Jalur Merah (pemeriksaan fisik kargo dan dokumen) memerlukan waktu 2-4 hari kerja tambahan di pelabuhan. Untuk mempertahankan reputasi Jalur Hijau, perusahaan wajib menjaga track record pabean yang bersih, kesesuaian nilai pabean dengan harga pasar, serta kepatuhan pelaporan SPT tahunan secara konsisten.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    author: 'Customs Broker Specialist',
    publishedDate: '2026-06-12'
  },
  {
    id: 'art-9',
    title: 'Metode Perhitungan Kubikasi CBM Laut vs Volumetrik Kargo Udara',
    slug: 'perhitungan-cbm-laut-vs-volumetrik-udara',
    category: 'Operational Freight',
    excerpt: 'Pahami rumus matematika logistik: pembagian 1.000.000 untuk laut dan pembagian 6.000 untuk udara guna menentukan bobot chargeable.',
    content: 'Banyak pemilik barang terkejut saat invoice kargo berbeda dari berat timbangan fisik. Dalam pengiriman laut, 1 CBM memiliki ekuivalensi berat 1.000 KG (1 Ton). Sedangkan dalam kargo udara, 1 CBM setara dengan 167 KG (pembagi 6.000). Maskapai dan liner selalu menggunakan angka tertinggi antara bobot fisik vs volume sebagai basis tagihan resmi.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
    author: 'Logistics Engineering Team',
    publishedDate: '2026-05-30'
  },
  {
    id: 'art-10',
    title: 'Standardisasi IATA DGR untuk Pengiriman Kargo Baterai Lithium Udara',
    slug: 'standardisasi-iata-dgr-baterai-lithium-udara',
    category: 'Kargo Khusus',
    excerpt: 'Prosedur keselamatan pengangkutan baterai lithium (UN 3480 / UN 3481), kelayakan packing Dangerous Goods, dan dokumen MSDS.',
    content: 'Pengiriman perangkat elektronik bertenaga baterai lithium melalui pesawat udara tunduk pada regulasi ketat IATA Dangerous Goods Regulations. Kemasan kargo wajib lolos uji drop test, dilengkapi label Hazard Class 9, dan disertai sertifikasi uji UN 38.3 untuk memastikan penerbangan aman dari risiko kebakaran spontan.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
    author: 'Aviation Cargo Specialist',
    publishedDate: '2026-05-18'
  },
  {
    id: 'art-11',
    title: 'Konektivitas Pelabuhan Patimban Terhadap Koridor Industri Subang-Karawang',
    slug: 'konektivitas-pelabuhan-patimban-subang-karawang',
    category: 'Rute Maritim',
    excerpt: 'Peluang percepatan distribusi ekspor otomotif dan kontainer manufaktur tanpa melewati kemacetan jalur Jakarta.',
    content: 'Pelabuhan Patimban di Subang terus meningkatkan kapasitas dermaga kontainernya. Bagi pabrik di kawasan industri Cikarang, Karawang, dan Subang, pemanfaatan Patimban memangkas waktu tempuh truk hingga 40% dibandingkan menuju Tanjung Priok, sekaligus mengurangi risiko keterlambatan jadwal penutupan closing gate pelabuhan.',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80',
    author: 'Port Hinterland Analyst',
    publishedDate: '2026-05-02'
  },
  {
    id: 'art-12',
    title: 'Tata Laksana Pengoperasian Reefer Container pada Komoditas Bersuhu Dingin',
    slug: 'tata-laksana-reefer-container-komoditas-dingin',
    category: 'Kargo Khusus',
    excerpt: 'Menjaga rantai dingin (cold chain) kargo daging, buah segar, seafood, dan farmasi dari pelabuhan asal hingga gudang konsumen.',
    content: 'Kontainer berpendingin (Reefer Container) membutuhkan suplai daya listrik berkesinambungan dan kalibrasi sensor suhu otomatis. GAEKS FREIGHT menyediakan layanan genset mobile saat kontainer ditarik di jalan tol darat (trucking reefer) guna memastikan integritas mutu komoditas tidak mengalami kenaikan temperatur.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
    author: 'Cold Chain Specialist',
    publishedDate: '2026-04-19'
  },
  {
    id: 'art-13',
    title: 'Optimalisasi Stevedoring & Pergudangan PBM di Tanjung Perak Surabaya',
    slug: 'optimalisasi-stevedoring-pbm-tanjung-perak',
    category: 'Operational Freight',
    excerpt: 'Manajemen bongkar muat kapal curah kering dan kargo umum dengan standar operasional cepat tanpa antrean lama.',
    content: 'Keberhasilan operasional Perusahaan Bongkar Muat (PBM) ditentukan oleh ketersediaan alat berat seperti grab, hopper, forklift kapasitas tinggi, dan reach stacker. Penanganan yang efisien di dermaga Jamrud dan Berlian Tanjung Perak mempercepat turnaround time kapal dan menurunkan biaya sewa sandar.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    author: 'PBM Operations Surabaya',
    publishedDate: '2026-04-05'
  },
  {
    id: 'art-14',
    title: 'Manajemen Risiko Angkutan Project Cargo & Alat Berat Muatan ODOW',
    slug: 'manajemen-risiko-project-cargo-odow',
    category: 'Project Cargo & Alat Berat',
    excerpt: 'Tahapan survei rute, rekayasa kekuatan jembatan, dan perizinan dispensasi jalan untuk pengangkutan struktur industri raksasa.',
    content: 'Pengangkutan kargo Over Dimension Over Weight (ODOW) seperti turbin pembangkit listrik dan tangki kimia membutuhkan perencanaan matang. Tim GAEKS memetakan rute jalan raya, titik belok tajam, kabel tegangan tinggi, serta kekuatan jembatan yang dilintasi menggunakan armada multi-axle modular hydraulic trailer.',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    author: 'Heavy Lift Project Director',
    publishedDate: '2026-03-22'
  },
  {
    id: 'art-15',
    title: 'Jalur Pelayaran Direct Call Tiongkok ke Semarang Tanjung Emas',
    slug: 'direct-call-tiongkok-semarang-tanjung-emas',
    category: 'Rute Maritim',
    excerpt: 'Mendorong ekspor furniture Jepara dan garmen Solo melalui rute langsung kapal kontainer internasional tanpa singgah di Singapura.',
    content: 'Pelabuhan Tanjung Emas Semarang kini melayani pelayaran langsung dari pelabuhan utama Tiongkok (Shanghai dan Ningbo). Direct service ini memangkas waktu pengiriman menjadi 8-11 hari, memberikan keunggulan kompetitif besar bagi industri tekstil dan mebel Jawa Tengah yang berorientasi ekspor.',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    author: 'Central Java Route Planner',
    publishedDate: '2026-03-10'
  },
  {
    id: 'art-16',
    title: 'Pentingnya Perlindungan Asuransi Pengangkutan Laut (Marine Cargo Insurance)',
    slug: 'perlindungan-asuransi-marine-cargo-insurance',
    category: 'Operational Freight',
    excerpt: 'Memahami klausul Institute Cargo Clauses (A, B, C) untuk memproteksi nilai investasi barang dari risiko badai dan kecelakaan kapal.',
    content: 'Banyak pelaku usaha mengira tanggung jawab maskapai pelayaran mencakup ganti rugi penuh saat kontainer jatuh ke laut. Pada kenyataannya, ganti rugi pengangkut (carrier liability) sangat terbatas per kilogram kargo. Mengasuransikan kargo dengan klausul All-Risk (ICC A) merupakan benteng proteksi finansial mutlak.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
    author: 'Risk & Insurance Advisor',
    publishedDate: '2026-02-25'
  },
  {
    id: 'art-17',
    title: 'Memahami Fungsi Hukum Master Bill of Lading vs House B/L',
    slug: 'fungsi-master-bill-of-lading-vs-house-bl',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Peran B/L sebagai dokumen kepemilikan kargo, bukti kontrak angkutan, dan tanda terima barang resmi antara forwarder dan liner.',
    content: 'House B/L diterbitkan oleh freight forwarder kepada pihak shipper riil, sedangkan Master B/L diterbitkan oleh shipping line utama kepada agen forwarder. Ketepatan penulisan nama consignee (To Order of Bank) pada B/L menjadi prasyarat krusial dalam pencairan fasilitas pembayaran Letter of Credit (L/C).',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    author: 'Legal & Shipping Documentation',
    publishedDate: '2026-02-12'
  },
  {
    id: 'art-18',
    title: 'Integrasi Ekosistem Indonesia National Single Window (INSW) Terpadu',
    slug: 'integrasi-ekosistem-insw-terpadu',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Sinkronisasi data perizinan ekspor-impor antar kementerian dalam satu pintu guna percepatan waktu dwell time nasional.',
    content: 'Portal INSW menjembatani sistem perizinan dari Kementerian Perdagangan, Kementerian Pertanian (Karantina), BPOM, dan Bea Cukai. Verifikasi nomor NIB dan sertifikat standar yang terhubung secara otomatis di INSW mempercepat validasi sebelum dokumen pabean diproses oleh petugas verifikator.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    author: 'Regulatory Affairs Manager',
    publishedDate: '2026-01-29'
  },
  {
    id: 'art-19',
    title: 'Dampak Biaya Bunker Adjustment Factor (BAF) pada Fluktuasi Tarif Kargo Laut',
    slug: 'dampak-bunker-adjustment-factor-tarif-laut',
    category: 'Operational Freight',
    excerpt: 'Bagaimana harga minyak bahan bakar kapal dunia VLSFO memengaruhi fluktuasi biaya angkut laut bulanan.',
    content: 'Bunker Adjustment Factor (BAF) adalah komponen biaya variabel yang disesuaikan secara periodik oleh pelayaran kontainer dunia. Memahami tren pergerakan bahan bakar minyak bunker membantu manajer pengadaan (procurement) mengunci kontrak tarif jangka menengah yang lebih stabil.',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    author: 'Freight Market Analyst',
    publishedDate: '2026-01-15'
  },
  {
    id: 'art-20',
    title: 'Panduan Sukses Ekspor Produk Agrikultur & Hasil Hutan Indonesia',
    slug: 'panduan-sukses-ekspor-agrikultur-hasil-hutan',
    category: 'Operational Freight',
    excerpt: 'Persyaratan sertifikat fitosanitari, fumigasi ISPM 15 pada palet kayu, dan kepatuhan standar karantina negara tujuan ekspor.',
    content: 'Eksportir komoditas kopi, rempah-rempah, dan arang briket wajib memastikan kemasan kayu memenuhi standar fumigasi bertaraf ISPM 15. Kegagalan memenuhi standar fumigasi dapat berakibat kargo ditolak masuk dan diperintahkan re-ekspor oleh otoritas karantina negara mitra seperti Amerika Serikat dan Uni Eropa.',
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
    author: 'Agricultural Export Team',
    publishedDate: '2026-01-02'
  }
];

export function getStoredArticles(): ArticleItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ARTICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ARTICLES;
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

// 7. NAVBAR (NO DGP)
saveFile('src/components/Navbar.tsx', `
import React, { useState } from 'react';
import { Ship, Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-navy/90 backdrop-blur-xl border-b border-slate-800/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 group text-left">
          <div className="bg-gradient-to-tr from-brand-orange to-amber-500 p-2.5 rounded-xl shadow-lg shadow-brand-orange/20 transition-transform group-hover:scale-105">
            <Ship className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider block leading-none font-sans">GAEKS GROUP</span>
            <span className="text-[10px] text-brand-orange tracking-widest uppercase font-bold">FREIGHT FORWARDING & LOGISTICS</span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-slate-300">
          <button onClick={() => handleNavClick('home')} className={\`transition-colors hover:text-brand-orange \${currentTab === 'home' ? 'text-brand-orange' : ''}\`}>Home</button>
          <button onClick={() => handleNavClick('services')} className={\`transition-colors hover:text-brand-orange \${currentTab === 'services' ? 'text-brand-orange' : ''}\`}>7 Layanan Kargo</button>
          <button onClick={() => handleNavClick('calculator')} className={\`transition-colors hover:text-brand-orange \${currentTab === 'calculator' ? 'text-brand-orange' : ''}\`}>Kalkulator & Port</button>
          <button onClick={() => handleNavClick('network')} className={\`transition-colors hover:text-brand-orange \${currentTab === 'network' ? 'text-brand-orange' : ''}\`}>Peta Rute Global</button>
          <button onClick={() => handleNavClick('news')} className={\`transition-colors hover:text-brand-orange \${currentTab === 'news' ? 'text-brand-orange' : ''}\`}>Berita & Regulasi</button>
          <button onClick={() => handleNavClick('contact')} className={\`transition-colors hover:text-brand-orange \${currentTab === 'contact' ? 'text-brand-orange' : ''}\`}>Contact Us</button>

          <a 
            href="https://wa.me/6285608561745?text=Halo%20GAEKS%20GROUP,%20saya%20ingin%20konsultasi%20kargo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-emerald-900/40 hover:scale-105"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0856-0856-1745</span>
          </a>
        </nav>

        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-navy border-b border-slate-800 px-6 py-6 space-y-4 text-left">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Home</button>
          <button onClick={() => handleNavClick('services')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">7 Layanan Kargo</button>
          <button onClick={() => handleNavClick('calculator')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Kalkulator CBM & Port</button>
          <button onClick={() => handleNavClick('network')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Peta Rute Global</button>
          <button onClick={() => handleNavClick('news')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Berita & Regulasi</button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Contact Us</button>
          <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="block text-center py-3 bg-emerald-600 rounded-xl text-white font-bold text-xs">
            Hubungi WhatsApp 0856-0856-1745
          </a>
        </div>
      )}
    </header>
  );
};
`);

// 8. LIVING HERO BANNER
saveFile('src/components/Hero.tsx', `
import React from 'react';
import { ShieldCheck, Globe2, Clock, MessageCircleQuestion, Activity, Radio, ArrowRight } from 'lucide-react';

export const Hero: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-slate-950 overflow-hidden text-white">
      <div className="bg-brand-darkBlue/90 border-b border-slate-800/80 text-[11px] py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-brand-orange font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>GAEKS Vessel Radar Live</span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-slate-300 font-medium">
            <span>Inbound Sea Traffic: <strong className="text-white">142 Vessels Active</strong></span>
            <span>Bunker Fuel (IFO380): <strong className="text-emerald-400">$524/MT</strong></span>
            <span>Port Priok: <strong className="text-emerald-400">Normal Flow</strong></span>
            <span>Port Perak: <strong className="text-emerald-400">Berth Smooth</strong></span>
            <span>Ceisa 4.0: <strong className="text-emerald-400">Online 100%</strong></span>
          </div>
        </div>
      </div>

      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none scale-105 animate-pulse duration-[8000ms]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-brand-darkBlue/90 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-brand-orange animate-spin" />
              <span>International Freight Forwarder & Customs Broker</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Arsitektur Logistik Global untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-orange-500">Ekspor & Impor</span> Indonesia.
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              Solusi kargo kontainer laut (FCL/LCL), kargo udara prioritas, dan legalitas kepabeanan terintegrasi langsung menuju <strong>Jakarta (Tanjung Priok)</strong>, <strong>Semarang (Tanjung Emas)</strong>, dan <strong>Surabaya (Tanjung Perak)</strong>.
            </p>

            <div className="p-5 bg-brand-darkBlue/80 backdrop-blur-md border border-brand-orange/50 rounded-2xl flex items-start space-x-4 shadow-xl">
              <div className="p-2 bg-brand-orange/20 rounded-xl text-brand-orange flex-shrink-0">
                <MessageCircleQuestion className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white font-bold block text-sm mb-0.5">Komoditas Ekspor-Impor Sangat Beragam:</strong>
                Kami menangani mesin industri, bahan baku kimia, tekstil, komoditas curah kering, semen, hingga kargo berpendingin (reefer). <span className="text-brand-orange font-semibold">Jenis komoditas khusus dapat dikonsultasikan terlebih dahulu sebelum pemesanan jadwal kapal.</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('calculator')}
                className="flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-brand-orange/20 transition-all hover:scale-105"
              >
                <span>Hitung CBM & Port Terdekat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-brand-darkBlue hover:bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all"
              >
                Jelajahi 7 Layanan Kargo
              </button>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-slate-300">
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

          <div className="lg:col-span-4 space-y-4 hidden lg:block">
            <div className="bg-brand-darkBlue/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
                <span>Rute Maritim Populer</span>
                <span className="text-emerald-400">Direct Sailing</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Shanghai (CNSHA) &rarr; Jakarta</span>
                    <span className="text-slate-400 text-[10px]">Direct 10-14 Hari • 3x/Minggu</span>
                  </div>
                  <span className="text-brand-orange font-bold">FCL/LCL</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Ningbo (CNNGB) &rarr; Semarang</span>
                    <span className="text-slate-400 text-[10px]">Direct 9-12 Hari • 2x/Minggu</span>
                  </div>
                  <span className="text-brand-orange font-bold">FCL/LCL</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Singapore (SGSIN) &rarr; Surabaya</span>
                    <span className="text-slate-400 text-[10px]">Feeder 3-5 Hari • Harian</span>
                  </div>
                  <span className="text-brand-orange font-bold">Daily</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('network')}
                className="w-full py-2.5 text-center text-xs font-bold text-brand-orange hover:text-white transition-colors block"
              >
                Buka Peta Pelayaran Interaktif &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
`);

// 9. SERVICES CAROUSEL DENGAN FOTO HIGH-RES
saveFile('src/components/ServicesCarousel.tsx', `
import React, { useState } from 'react';
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

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? DETAILED_SERVICES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === DETAILED_SERVICES.length - 1 ? 0 : prev + 1));
  };

  const current = DETAILED_SERVICES[currentIndex];

  return (
    <section id="services" className="py-24 bg-slate-900 border-y border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange block mb-2">
              Layanan End-to-End Logistik
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              7 Solusi Terpadu GAEKS GROUP
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
              Didukung infrastruktur legal pabean, armada truk sendiri, pergudangan pelabuhan, dan slot liner dunia.
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            <button onClick={handlePrev} className="p-3.5 rounded-xl border border-slate-700 bg-slate-800 text-white hover:bg-brand-orange transition-colors shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-400">
              {currentIndex + 1} / {DETAILED_SERVICES.length}
            </span>
            <button onClick={handleNext} className="p-3.5 rounded-xl border border-slate-700 bg-slate-800 text-white hover:bg-brand-orange transition-colors shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-brand-darkBlue rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full">
              <img src={current.imageUrl} alt={current.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/20">
                {current.category}
              </div>
            </div>

            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="hidden lg:inline-block text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">
                  {current.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{current.title}</h3>
                <p className="mt-2 text-base font-semibold text-slate-300">"{current.tagline}"</p>
                <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">{current.description}</p>

                <div className="mt-5 p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
                  <strong className="text-brand-orange font-bold block mb-1">Kesesuaian Komoditas:</strong>
                  {current.commodities}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Keunggulan & Cakupan:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
                <button
                  onClick={() => onSelectService(current.title)}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-brand-orange/20 transition-all hover:scale-105"
                >
                  <span>Konsultasikan Komoditas Ini</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="text-xs font-semibold text-slate-400">
                  Standar: <span className="text-white font-bold">{current.equipment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
`);

// 10. SMART CALCULATOR
saveFile('src/components/SmartCalculator.tsx', `
import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Send, Mail, MapPin, Ship, Plane, Scale, Anchor } from 'lucide-react';
import { ShippingMode, PortEntry } from '../types/freight';
import { findSmartNearestPort } from '../utils/portFinder';

export const SmartCalculator: React.FC<{ prefillService?: string }> = ({ prefillService }) => {
  const [mode, setMode] = useState<ShippingMode>('ocean');
  const [originAddress, setOriginAddress] = useState('Cikarang, Bekasi');
  const [destinationCity, setDestinationCity] = useState('Semarang (Tanjung Emas)');
  const [suggestedPort, setSuggestedPort] = useState<PortEntry | null>(null);

  const [lengthCm, setLengthCm] = useState<number>(120);
  const [widthCm, setWidthCm] = useState<number>(80);
  const [heightCm, setHeightCm] = useState<number>(100);
  const [pieces, setPieces] = useState<number>(2);
  const [actualWeightKgPerPiece, setActualWeightKgPerPiece] = useState<number>(150);

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');

  useEffect(() => {
    const found = findSmartNearestPort(originAddress);
    setSuggestedPort(found);
  }, [originAddress]);

  const totalActualWeightKg = actualWeightKgPerPiece * pieces;
  const totalVolumeCbm = ((lengthCm * widthCm * heightCm) / 1000000) * pieces;
  const oceanWeightInTon = totalActualWeightKg / 1000;
  const oceanChargeableCbm = Math.max(totalVolumeCbm, oceanWeightInTon);
  const isOceanWeightDominant = oceanWeightInTon > totalVolumeCbm;

  const airVolumetricWeightKg = ((lengthCm * widthCm * heightCm) / 6000) * pieces;
  const airChargeableWeightKg = Math.max(totalActualWeightKg, airVolumetricWeightKg);
  const isAirVolumetricDominant = airVolumetricWeightKg > totalActualWeightKg;

  const buildSummaryText = () => {
    const portText = suggestedPort 
      ? \`Pelabuhan Terdekat yang Disarankan: \${suggestedPort.port} (\${suggestedPort.code}) - Gateway: \${suggestedPort.gateway}\`
      : 'Pelabuhan Terdekat: Mengikuti koordinat penjemputan';

    return \`*INQUIRY PENGIRIMAN KARGO - GAEKS GROUP*
Layanan: \${prefillService || (mode === 'ocean' ? 'Ocean Freight (FCL/LCL)' : 'Air Freight Cargo')}
Perusahaan: \${companyName || '-'} (Kontak: \${contactName || '-'})

*DETAIL RUTE & PELABUHAN:*
- Alamat Muat / Pick-up: \${originAddress}
- \${portText}
- Pelabuhan / Kota Tujuan: \${destinationCity}

*SPESIFIKASI KARGO:*
- Dimensi per Koli: \${lengthCm} x \${widthCm} x \${heightCm} cm
- Jumlah Koli: \${pieces} Koli
- Total Berat Fisik: \${totalActualWeightKg.toLocaleString()} KG
\${mode === 'ocean' 
  ? \`- Total Volume Kubikasi: \${totalVolumeCbm.toFixed(3)} CBM
- Dasar Chargeable Laut (/1.000.000): \${oceanChargeableCbm.toFixed(3)} CBM (\${isOceanWeightDominant ? 'Dasar Bobot Tonase' : 'Dasar Kubikasi CBM'})\`
  : \`- Berat Volumetrik Udara (/6.000): \${airVolumetricWeightKg.toFixed(1)} KG
- Dasar Chargeable Udara: \${airChargeableWeightKg.toFixed(1)} KG (\${isAirVolumetricDominant ? 'Dasar Volumetrik' : 'Dasar Berat Aktual'})\`}

Mohon informasi jadwal sailing/flight terdekat, estimasi biaya kargo, dan penanganan PPJK. Terima kasih.\`;
  };

  const handleSendWhatsApp = () => {
    const text = buildSummaryText();
    window.open(\`https://wa.me/6285608561745?text=\${encodeURIComponent(text)}\`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(\`[INQUIRY KARGO] \${companyName || 'Klien Baru'} - Rute \${originAddress} ke \${destinationCity}\`);
    const body = encodeURIComponent(buildSummaryText());
    window.location.href = \`mailto:Sales01@gaeks.com,info@gaeks.com?subject=\${subject}&body=\${body}\`;
  };

  return (
    <section id="calculator" className="py-20 bg-slate-900 border-y border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase mb-3">
            <CalcIcon className="w-4 h-4" />
            <span>Smart Port-Finder & Freight Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Pencari Port Terdekat & Kalkulator Kargo
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Ketikkan alamat asal barang untuk rekomendasi pelabuhan terdekat, serta hitung otomatis kubikasi laut (/1.000.000) dan berat volumetrik udara (/6.000).
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-brand-darkBlue rounded-3xl shadow-2xl border border-slate-800 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  1. Pilih Moda Pengiriman
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode('ocean')}
                    className={\`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border flex items-center justify-center space-x-2 transition-all \${
                      mode === 'ocean' ? 'bg-brand-orange text-white border-brand-orange shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-800'
                    }\`}
                  >
                    <Ship className="w-4 h-4" />
                    <span>Laut (CBM / 1.000.000)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('air')}
                    className={\`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border flex items-center justify-center space-x-2 transition-all \${
                      mode === 'air' ? 'bg-brand-orange text-white border-brand-orange shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-800'
                    }\`}
                  >
                    <Plane className="w-4 h-4" />
                    <span>Udara (Volumetrik / 6.000)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  2. Lokasi Asal Barang (Sistem Smart Port)
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={originAddress}
                      onChange={(e) => setOriginAddress(e.target.value)}
                      placeholder="Ketik kota/alamat, contoh: Cikarang, Solo, Surabaya, Shanghai, Ningbo, Rotterdam..."
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>

                  {suggestedPort && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-brand-orange/40 space-y-1.5 shadow-md">
                      <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
                        <Anchor className="w-4 h-4" />
                        <span>Saran Pelabuhan Terdekat:</span>
                      </div>
                      <div className="text-base font-black text-white">
                        {suggestedPort.port} ({suggestedPort.code})
                      </div>
                      <div className="text-xs text-slate-300 flex flex-wrap gap-x-4">
                        <span>Negara: <strong className="text-white">{suggestedPort.country} ({suggestedPort.region})</strong></span>
                        <span>Gateway: <strong className="text-brand-orange">{suggestedPort.gateway}</strong></span>
                      </div>
                      <p className="text-[11px] text-slate-400 italic pt-1">
                        Catatan: {suggestedPort.note}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Pelabuhan / Kota Tujuan</label>
                    <input
                      type="text"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  3. Dimensi Kargo per Koli (Centimeter)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold">Panjang (P) cm</span>
                    <input
                      type="number"
                      min="1"
                      value={lengthCm}
                      onChange={(e) => setLengthCm(Math.max(1, Number(e.target.value)))}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold">Lebar (L) cm</span>
                    <input
                      type="number"
                      min="1"
                      value={widthCm}
                      onChange={(e) => setWidthCm(Math.max(1, Number(e.target.value)))}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold">Tinggi (T) cm</span>
                    <input
                      type="number"
                      min="1"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Math.max(1, Number(e.target.value)))}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white font-bold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Jumlah Koli (Pcs)</label>
                  <input
                    type="number"
                    min="1"
                    value={pieces}
                    onChange={(e) => setPieces(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Berat Fisik Aktual (KG/Pcs)</label>
                  <input
                    type="number"
                    min="1"
                    value={actualWeightKgPerPiece}
                    onChange={(e) => setActualWeightKgPerPiece(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Nama Perusahaan (Opsional)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="PT / CV..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Nama PIC Kontak</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Nama Anda..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-lg border border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                  <Scale className="w-4 h-4" />
                  <span>Kalkulasi Chargeable Basis</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-semibold block">Total Berat Fisik Aktual</span>
                    <div className="text-2xl font-black text-white mt-1">
                      {totalActualWeightKg.toLocaleString()} <span className="text-sm font-bold text-slate-400">KG</span>
                    </div>
                  </div>

                  {mode === 'ocean' ? (
                    <>
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 font-semibold block">Volume Kubikasi (P x L x T / 1.000.000)</span>
                        <div className="text-2xl font-black text-white mt-1">
                          {totalVolumeCbm.toFixed(3)} <span className="text-sm font-bold text-brand-orange">CBM</span>
                        </div>
                      </div>

                      <div className="bg-brand-orange/15 p-4 rounded-xl border border-brand-orange/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-orange uppercase">Dasar Tagihan Laut</span>
                          <span className="text-[10px] bg-brand-orange text-white px-2 py-0.5 rounded font-bold">Tertinggi</span>
                        </div>
                        <div className="text-3xl font-black text-white mt-1">
                          {oceanChargeableCbm.toFixed(3)} <span className="text-lg text-brand-orange">CBM</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-2">
                          {isOceanWeightDominant ? 'Dihitung berdasarkan berat tonase (1 Ton = 1 CBM).' : 'Dihitung berdasarkan total kubikasi murni kargo laut.'}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 font-semibold block">Berat Volumetrik Udara (P x L x T / 6.000)</span>
                        <div className="text-2xl font-black text-white mt-1">
                          {airVolumetricWeightKg.toFixed(1)} <span className="text-sm font-bold text-brand-orange">KG</span>
                        </div>
                      </div>

                      <div className="bg-brand-orange/15 p-4 rounded-xl border border-brand-orange/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-orange uppercase">Chargeable Weight Udara</span>
                          <span className="text-[10px] bg-brand-orange text-white px-2 py-0.5 rounded font-bold">Tertinggi</span>
                        </div>
                        <div className="text-3xl font-black text-white mt-1">
                          {airChargeableWeightKg.toFixed(1)} <span className="text-lg text-brand-orange">KG</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-2">
                          {isAirVolumetricDominant ? 'Dihitung dari berat volumetrik udara karena kargo berukuran besar.' : 'Dihitung dari berat fisik aktual kargo.'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-md shadow-emerald-900/40"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim via WhatsApp (0856-0856-1745)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all"
                >
                  <Mail className="w-4 h-4 text-brand-orange" />
                  <span>Kirim via Email (Sales01@gaeks.com)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
`);

// 11. INTERACTIVE MAP
saveFile('src/components/InteractiveMap.tsx', `
import React, { useState } from 'react';
import { Ship, Plane, Clock, Anchor, Compass } from 'lucide-react';
import { RouteData } from '../types/freight';

const GLOBAL_ROUTES: RouteData[] = [
  {
    id: 'china-shanghai',
    originName: 'Shanghai & Ningbo',
    originCountry: 'Tiongkok (China)',
    destinationPort: 'Jakarta (Tanjung Priok)',
    seaTransitDays: '10 - 14 Hari',
    airTransitDays: '1 - 2 Hari',
    departureFreq: '3x Seminggu Direct',
    commodities: 'Mesin Industri, Elektronik, Bahan Baku Tekstil, Plastik'
  },
  {
    id: 'china-shenzhen',
    originName: 'Shenzhen & Guangzhou',
    originCountry: 'Tiongkok Selatan',
    destinationPort: 'Surabaya (Tanjung Perak)',
    seaTransitDays: '9 - 12 Hari',
    airTransitDays: '1 - 2 Hari',
    departureFreq: '2x Seminggu Direct',
    commodities: 'Suku Cadang, Hardware, Consumer Goods, Aksesori'
  },
  {
    id: 'singapore-hub',
    originName: 'Singapore Port (PSA)',
    originCountry: 'Singapura (Asean Hub)',
    destinationPort: 'Semarang (Tanjung Emas)',
    seaTransitDays: '3 - 5 Hari',
    airTransitDays: 'Same Day / 24 Jam',
    departureFreq: 'Harian (Daily Feeder)',
    commodities: 'Transshipment Eropa & US, Kimia Khusus, Spare Parts'
  },
  {
    id: 'europe-rotterdam',
    originName: 'Rotterdam & Hamburg',
    originCountry: 'Eropa Barat',
    destinationPort: 'Jakarta (Tanjung Priok)',
    seaTransitDays: '28 - 34 Hari',
    airTransitDays: '3 - 4 Hari',
    departureFreq: 'Mingguan (Weekly)',
    commodities: 'Alat Berat, Farmasi, Komponen Otomotif, Mesin Presisi'
  },
  {
    id: 'middle-east-dubai',
    originName: 'Jebel Ali (Dubai)',
    originCountry: 'Timur Tengah (UAE)',
    destinationPort: 'Surabaya (Tanjung Perak)',
    seaTransitDays: '18 - 22 Hari',
    airTransitDays: '2 - 3 Hari',
    departureFreq: 'Mingguan (Weekly)',
    commodities: 'Petrokimia, Minyak & Gas, Pangan Kurma, Polimer'
  },
  {
    id: 'us-los-angeles',
    originName: 'Los Angeles & Long Beach',
    originCountry: 'Amerika Serikat (US West Coast)',
    destinationPort: 'Jakarta (Tanjung Priok)',
    seaTransitDays: '25 - 30 Hari',
    airTransitDays: '3 - 5 Hari',
    departureFreq: 'Mingguan (Weekly)',
    commodities: 'Pertanian Kedelai/Gandum, Resin, Teknologi Tinggi'
  }
];

function getPortSubname(dest: string): string {
  const openParen = dest.indexOf('(');
  const closeParen = dest.indexOf(')');
  if (openParen !== -1 && closeParen !== -1) {
    return dest.substring(openParen + 1, closeParen);
  }
  return 'Indonesia';
}

export const InteractiveMap: React.FC = () => {
  const [activeRouteId, setActiveRouteId] = useState<string>('china-shanghai');
  const selectedRoute = GLOBAL_ROUTES.find(r => r.id === activeRouteId) || GLOBAL_ROUTES[0];

  return (
    <section id="network" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Global Corridors to Indonesia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Rute Pelayaran Dunia Langsung ke Jakarta, Semarang, & Surabaya
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Koneksi langsung dari pelabuhan manufaktur global utama dengan clearance cepat di 3 pelabuhan gerbang impor utama Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-brand-darkBlue border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
                  <span>Interactive Route Simulator</span>
                </span>
                <span className="text-[11px] text-slate-400">Pilih rute untuk melihat detail transit</span>
              </div>

              <div className="flex flex-wrap gap-2.5 mb-8">
                {GLOBAL_ROUTES.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => setActiveRouteId(route.id)}
                    className={\`px-3.5 py-2 rounded-xl text-xs font-bold transition-all \${
                      activeRouteId === route.id
                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 scale-[1.02]'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }\`}
                  >
                    {route.originName} ({route.originCountry.split(' ')[0]})
                  </button>
                ))}
              </div>

              <div className="relative bg-slate-950 rounded-2xl p-6 border border-slate-800 min-h-[260px] flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="w-full sm:w-auto bg-slate-900 p-4 rounded-xl border border-brand-orange/40 text-center sm:text-left">
                    <span className="text-[10px] text-brand-orange uppercase font-bold tracking-wider block">Pelabuhan Muat Asal</span>
                    <h4 className="text-lg font-black text-white">{selectedRoute.originName}</h4>
                    <span className="text-xs text-slate-400">{selectedRoute.originCountry}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-1 my-2 sm:my-0">
                    <div className="flex items-center space-x-3 text-brand-orange">
                      <Ship className="w-5 h-5 animate-pulse" />
                      <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-brand-orange to-slate-400 relative">
                        <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-400 transform rotate-45" />
                      </div>
                      <Plane className="w-5 h-5 text-slate-400" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Jalur Maritim & Udara</span>
                  </div>

                  <div className="w-full sm:w-auto bg-slate-900 p-4 rounded-xl border border-emerald-500/40 text-center sm:text-left">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block">Pelabuhan Tujuan Bongkar</span>
                    <h4 className="text-lg font-black text-white">{selectedRoute.destinationPort.split(' ')[0]}</h4>
                    <span className="text-xs text-slate-400">
                      {getPortSubname(selectedRoute.destinationPort)}
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
                  <div className={\`p-2 rounded-lg \${selectedRoute.destinationPort.includes('Jakarta') ? 'bg-brand-orange/20 border border-brand-orange' : 'bg-slate-900'}\`}>
                    <span className="text-[11px] font-bold block text-white">Jakarta</span>
                    <span className="text-[9px] text-slate-400">Tanjung Priok</span>
                  </div>
                  <div className={\`p-2 rounded-lg \${selectedRoute.destinationPort.includes('Semarang') ? 'bg-brand-orange/20 border border-brand-orange' : 'bg-slate-900'}\`}>
                    <span className="text-[11px] font-bold block text-white">Semarang</span>
                    <span className="text-[9px] text-slate-400">Tanjung Emas</span>
                  </div>
                  <div className={\`p-2 rounded-lg \${selectedRoute.destinationPort.includes('Surabaya') ? 'bg-brand-orange/20 border border-brand-orange' : 'bg-slate-900'}\`}>
                    <span className="text-[11px] font-bold block text-white">Surabaya</span>
                    <span className="text-[9px] text-slate-400">Tanjung Perak</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-xs text-slate-400 flex items-center space-x-2">
              <Anchor className="w-4 h-4 text-brand-orange flex-shrink-0" />
              <span>Seluruh rute telah dilengkapi izin jalur pabean impor & trucking inland door-to-door.</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-brand-darkBlue border border-slate-800 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
                Estimasi Waktu & Frekuensi
              </span>
              <h3 className="text-2xl font-black text-white mb-6">
                {selectedRoute.originName} &rarr; {selectedRoute.destinationPort.split(' ')[0]}
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-slate-950 text-white rounded-lg">
                      <Ship className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-bold block">Ocean Transit Time</span>
                      <span className="text-base font-black text-white">{selectedRoute.seaTransitDays}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">FCL & LCL</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-slate-950 text-white rounded-lg">
                      <Plane className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-bold block">Air Freight Transit</span>
                      <span className="text-base font-black text-white">{selectedRoute.airTransitDays}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-400 bg-sky-950 px-2.5 py-1 rounded-md border border-sky-800">Express Priority</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center space-x-2 text-xs text-slate-400 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Jadwal Keberangkatan:</span>
                  </div>
                  <div className="text-sm font-bold text-slate-200">{selectedRoute.departureFreq}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold block mb-1">Komoditas Utama Koridor Ini:</span>
                  <p className="text-xs font-semibold text-slate-300 leading-relaxed">
                    {selectedRoute.commodities}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800">
              <a
                href="#calculator"
                className="w-full block text-center bg-brand-orange hover:bg-brand-orangeHover text-white py-3.5 px-4 rounded-xl font-bold text-sm transition-all shadow-md shadow-brand-orange/20"
              >
                Hitung Tarif untuk Rute Ini
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
`);

// 12. NEWS PAGE (20 ARTIKEL + FILTER + SEARCH + NEWSLETTER)
saveFile('src/components/NewsPage.tsx', `
import React, { useState } from 'react';
import { Send, Search, CheckCircle2, ArrowRight, Calendar } from 'lucide-react';
import { getStoredArticles, addSubscriber } from '../utils/newsStorage';
import { ArticleItem } from '../types/freight';

export const NewsPage: React.FC = () => {
  const [articles] = useState<ArticleItem[]>(getStoredArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [emailInput, setEmailInput] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const categories = ['Semua', 'Regulasi Kepabeanan', 'Operational Freight', 'Rute Maritim', 'Kargo Khusus', 'Project Cargo & Alat Berat'];

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'Semua' || a.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    const ok = addSubscriber(emailInput);
    if (ok) {
      setSubscribeStatus('Terima kasih! Anda telah terdaftar di newsletter resmi GAEKS GROUP.');
      setEmailInput('');
    } else {
      setSubscribeStatus('Email Anda sudah terdaftar sebelumnya.');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange block mb-2">
            Pusat Edukasi & Regulasi Ekspor-Impor
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Update Industri, Kebijakan Pabean, & Rute
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Kumpulan 20 artikel komprehensif seputar regulasi Ceisa 4.0, kebijakan Lartas impor, perhitungan CBM, dan dinamika pelayaran maritim dunia.
          </p>
        </div>

        <div className="mb-14 bg-gradient-to-r from-brand-darkBlue to-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block">
              Langganan Buletin Intelijen Logistik
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Dapatkan Pembaruan Kode HS & Tarif Kapal Berkala
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pb-2">
              Kirimkan pembaruan regulasi jalur pabean dan tren freight rate langsung ke email perusahaan Anda.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Masukkan alamat email Anda..."
                className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-brand-orange/20"
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

        <div className="space-y-4 mb-10">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={\`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all \${
                  selectedCategory === cat ? 'bg-brand-orange text-white shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800'
                }\`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik (misal: Ceisa, Lartas, Form E, CBM)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Menampilkan {filtered.length} dari {articles.length} Publikasi
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="bg-brand-darkBlue/80 rounded-3xl border border-slate-800/80 overflow-hidden shadow-sm hover:shadow-2xl hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md text-brand-orange px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border border-slate-800">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{item.publishedDate}</span>
                    <span>•</span>
                    <span>Oleh {item.author}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="text-xs font-bold text-brand-orange hover:text-amber-400 flex items-center space-x-1.5 transition-colors"
                >
                  <span>Baca Analisis Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-800">
                <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-orange uppercase">{selectedArticle.category}</span>
                <h2 className="text-2xl font-black mt-1 leading-snug">{selectedArticle.title}</h2>
                <span className="text-xs text-slate-400 block mt-1">Dipublikasikan pada {selectedArticle.publishedDate} • Oleh {selectedArticle.author}</span>
              </div>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-800 pt-4">
                {selectedArticle.content}
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-brand-orange hover:bg-brand-orangeHover text-white px-6 py-2.5 rounded-xl font-bold text-xs"
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

// 13. ADMIN CMS
saveFile('src/components/AdminCMS.tsx', `
import React, { useState } from 'react';
import { Lock, PlusCircle, Trash2, Mail, LogOut, CheckCircle, ShieldAlert } from 'lucide-react';
import { ArticleItem, NewsletterSubscriber } from '../types/freight';
import { getStoredArticles, saveStoredArticles, getSubscribers } from '../utils/newsStorage';

export const AdminCMS: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [articles, setArticles] = useState<ArticleItem[]>(getStoredArticles());
  const [subscribers] = useState<NewsletterSubscriber[]>(getSubscribers());

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Regulasi Kepabeanan');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80');
  const [authorName, setAuthorName] = useState('Editorial GAEKS');
  const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);
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
      setLoginError('Akses ditolak: Email wajib menggunakan domain resmi @gaeks.com (contoh: admin@gaeks.com).');
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
      publishedDate: customDate
    };

    const updated = [newArt, ...articles];
    setArticles(updated);
    saveStoredArticles(updated);

    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setPublishSuccess('Artikel berhasil dipublikasikan langsung ke halaman Berita!');
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
      <div className="pt-36 pb-24 min-h-screen bg-slate-950 flex items-center justify-center px-4 text-white">
        <div className="max-w-md w-full bg-brand-darkBlue border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto text-brand-orange">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-white">Portal CMS GAEKS GROUP</h2>
            <p className="text-xs text-slate-400">
              Otorisasi internal khusus staf editorial. Wajib menggunakan akun email terverifikasi <strong className="text-brand-orange">@gaeks.com</strong>.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-950/80 border border-red-800 rounded-xl flex items-start space-x-2 text-xs text-red-300 font-semibold">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Username Otorisasi</label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Admingaekspost"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Email Resmi (@gaeks.com)</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="editor@gaeks.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg"
            >
              Masuk Dashboard CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-darkBlue p-6 rounded-3xl border border-slate-800 shadow-sm">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-md">
              Sesi Login Terverifikasi (@gaeks.com)
            </span>
            <h1 className="text-2xl font-black mt-1">Dashboard Konten & Newsletter</h1>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center space-x-2 text-xs font-bold text-red-400 hover:text-white bg-red-950/80 hover:bg-red-900 border border-red-800 px-4 py-2.5 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-brand-darkBlue rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <PlusCircle className="w-4 h-4" />
              <span>Publikasikan Berita Baru (Dukungan Backdate)</span>
            </div>

            {publishSuccess && (
              <div className="p-3 bg-emerald-950 border border-emerald-800 rounded-xl flex items-center space-x-2 text-xs text-emerald-300 font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>{publishSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Ketentuan Baru Lartas Impor Komoditas Industri..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kategori Berita</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:outline-none"
                  >
                    <option value="Regulasi Kepabeanan">Regulasi Kepabeanan</option>
                    <option value="Operational Freight">Operational Freight</option>
                    <option value="Rute Maritim">Rute Maritim</option>
                    <option value="Kargo Khusus">Kargo Khusus</option>
                    <option value="Project Cargo & Alat Berat">Project Cargo & Alat Berat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Tanggal Rilis (Bisa Backdate)</label>
                  <input
                    type="date"
                    required
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nama Penulis</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">URL Gambar Header</label>
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Ringkasan (Excerpt)</label>
                <input
                  type="text"
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Konten Lengkap Berita *</label>
                <textarea
                  rows={6}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Tuliskan isi artikel..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg"
              >
                Terbitkan ke Website Utama
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-darkBlue rounded-3xl border border-slate-800 p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-white text-xs font-bold uppercase tracking-wider">
                <Mail className="w-4 h-4 text-brand-orange" />
                <span>Pelanggan Newsletter ({subscribers.length})</span>
              </div>
              <div className="max-h-44 overflow-y-auto space-y-2 text-xs">
                {subscribers.length === 0 ? (
                  <p className="text-slate-500 italic">Belum ada pelanggan terdaftar.</p>
                ) : (
                  subscribers.map((s, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-900 rounded-lg flex items-center justify-between border border-slate-800">
                      <span className="font-semibold text-slate-200">{s.email}</span>
                      <span className="text-[10px] text-slate-500">{new Date(s.subscribedAt).toLocaleDateString()}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-brand-darkBlue rounded-3xl border border-slate-800 p-6 shadow-sm space-y-4">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Daftar Artikel Aktif ({articles.length})
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {articles.map((art) => (
                  <div key={art.id} className="p-3 rounded-xl border border-slate-800 bg-slate-900 flex items-start justify-between space-x-2">
                    <div>
                      <span className="text-[10px] font-bold text-brand-orange block uppercase">{art.category}</span>
                      <h4 className="text-xs font-bold text-white leading-snug">{art.title}</h4>
                      <span className="text-[10px] text-slate-400">{art.publishedDate}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteArticle(art.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
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

// 14. CONTACT PAGE
saveFile('src/components/ContactPage.tsx', `
import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('PPJK');
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = \`Halo GAEKS GROUP (gaeks.com), saya ingin konsultasi kargo:
- Nama: \${name}
- Perusahaan: \${company || '-'}
- Kontak: \${phone} | \${email}
- Layanan: \${service}
- Pesan: \${message}\`;

    window.open(\`https://wa.me/6285608561745?text=\${encodeURIComponent(text)}\`, '_blank');
  };

  const handleSendMail = () => {
    const subject = encodeURIComponent(\`[INQUIRY KONTAK] \${company || name} - Layanan \${service}\`);
    const body = encodeURIComponent(\`Nama: \${name}\\nPerusahaan: \${company}\\nTelepon: \${phone}\\nEmail: \${email}\\nLayanan: \${service}\\n\\nPesan:\\n\${message}\`);
    window.location.href = \`mailto:Sales01@gaeks.com,info@gaeks.com?subject=\${subject}&body=\${body}\`;
  };

  return (
    <section className="pt-32 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange block mb-2">
            Hubungi GAEKS GROUP
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Konsultasi Rute, Kepabeanan, & Tarif Kargo
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Tim freight specialist kami siap merespons kebutuhan ekspor, impor, custom clearance PPJK, pergudangan PBM, hingga distribusi inland trucking Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-darkBlue text-white rounded-3xl p-8 space-y-6 border border-slate-800 shadow-xl">
              <h3 className="text-xl font-black border-b border-slate-800 pb-4">
                Kontak Resmi Operasional
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">WhatsApp Langsung</span>
                    <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-white hover:text-brand-orange transition-colors">
                      +62 856-0856-1745
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Email Sales & Inquiry</span>
                    <a href="mailto:Sales01@gaeks.com" className="font-bold text-white hover:text-brand-orange block transition-colors">
                      Sales01@gaeks.com
                    </a>
                    <span className="text-xs text-slate-400 block font-semibold mt-2">Email Informasi Umum</span>
                    <a href="mailto:info@gaeks.com" className="font-bold text-white hover:text-brand-orange block transition-colors">
                      info@gaeks.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Wilayah Pelabuhan Utama</span>
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed block">
                      Tanjung Priok (Jakarta), Tanjung Emas (Semarang), Tanjung Perak (Surabaya).
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Jam Operasional</span>
                    <span className="text-xs text-slate-300 block">
                      Senin - Sabtu: 08.00 - 18.00 WIB (Monitoring 24/7)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-darkBlue rounded-2xl border border-slate-800 p-6 shadow-sm flex items-center space-x-3 text-slate-300">
              <ShieldCheck className="w-6 h-6 text-brand-orange flex-shrink-0" />
              <p className="text-xs leading-relaxed">
                Kerahasiaan dokumen invoice, packing list, dan perizinan kepabeanan Anda dilindungi oleh standar operasional PPJK resmi.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-brand-darkBlue rounded-3xl border border-slate-800 p-8 sm:p-10 shadow-xl">
            <h3 className="text-2xl font-black text-white mb-2">Formulir Permintaan Penawaran Tarif</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Kirimkan detail spesifikasi kargo Anda, tim kami akan merespons dalam 1x24 jam kerja.
            </p>

            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nama Perusahaan</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="PT / CV..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="0812xxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Alamat Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="email@perusahaan.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Layanan yang Dibutuhkan</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm font-semibold text-white focus:outline-none"
                >
                  <option value="PPJK (Customs Clearance)">PPJK (Customs Clearance)</option>
                  <option value="Gudang / PBM (Bongkar Muat)">Gudang / PBM (Bongkar Muat)</option>
                  <option value="Domestic Trucking">Domestic Trucking</option>
                  <option value="Project Cargo & Heavy Lift">Project Cargo & Heavy Lift</option>
                  <option value="Ocean Freight LCL">Ocean Freight LCL</option>
                  <option value="Ocean Freight FCL">Ocean Freight FCL</option>
                  <option value="Air Shipment Priority">Air Shipment Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Rincian Kargo / Komoditas</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Sebutkan rute pengiriman, jenis komoditas, perkiraan tonase/CBM, dan target waktu pengiriman..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim via WhatsApp (0856-0856-1745)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendMail}
                  className="flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all border border-slate-700"
                >
                  <Mail className="w-4 h-4 text-brand-orange" />
                  <span>Kirim via Email Resmi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
`);

// 15. STATS NETWORK
saveFile('src/components/StatsNetwork.tsx', `
import React from 'react';
import { Anchor, Compass, Award, ShieldAlert } from 'lucide-react';

export const StatsNetwork: React.FC = () => {
  return (
    <section id="coverage" className="py-20 bg-slate-950 border-t border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-slate-800 pb-16">
          <div className="flex flex-col items-center">
            <Anchor className="w-6 h-6 text-brand-orange mb-2" />
            <div className="text-4xl sm:text-5xl font-black text-brand-orange">150+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Koneksi Pelabuhan Dunia</div>
          </div>
          <div className="flex flex-col items-center">
            <Compass className="w-6 h-6 text-brand-orange mb-2" />
            <div className="text-4xl sm:text-5xl font-black text-brand-orange">99.2%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Tingkat Ketepatan Jadwal</div>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-brand-orange mb-2" />
            <div className="text-4xl sm:text-5xl font-black text-brand-orange">24/7</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Dukungan Tracking & Support</div>
          </div>
          <div className="flex flex-col items-center">
            <ShieldAlert className="w-6 h-6 text-brand-orange mb-2" />
            <div className="text-4xl sm:text-5xl font-black text-brand-orange">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-2">Kepatuhan Regulasi Bea Cukai</div>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Butuh Penanganan Komoditas Tertentu?</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Mulai dari kargo umum (general cargo), semen, bahan baku industri, tekstil, mesin berat, hingga produk bersuhu terkontrol (reefer container).
          </p>
          <a
            href="https://wa.me/6285608561745?text=Halo%20GAEKS%20GROUP,%20saya%20ingin%20berdiskusi%20tentang%20proyek%20pengiriman%20kargo."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white hover:bg-slate-100 text-slate-900 px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg"
          >
            Hubungi Spesialis Kargo Kami
          </a>
        </div>
      </div>
    </section>
  );
};
`);

// 16. FOOTER (NO DGP)
saveFile('src/components/Footer.tsx', `
import React from 'react';
import { Ship, Mail, Phone, MapPin, Lock } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-tr from-brand-orange to-amber-500 p-2 rounded-lg text-white">
                <Ship className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-wider">GAEKS GROUP</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Perusahaan penyedia jasa International Freight Forwarding, Custom Clearance PPJK Ceisa 4.0, Stevedoring PBM, Pergudangan Transit, dan Inland Trucking terpadu.
            </p>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} GAEKS GROUP (gaeks.com). All rights reserved.
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">7 Layanan Utama</h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">PPJK (Customs Clearance)</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Gudang & PBM</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Domestic Trucking</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Project Cargo & Heavy Lift</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Ocean Freight LCL & FCL</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Air Shipment Priority</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Navigasi Halaman</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white">Home Portal</button></li>
              <li><button onClick={() => onNavigate('calculator')} className="hover:text-white">Kalkulator CBM & Port</button></li>
              <li><button onClick={() => onNavigate('network')} className="hover:text-white">Peta Rute Maritim Global</button></li>
              <li><button onClick={() => onNavigate('news')} className="hover:text-white">Berita & Regulasi Kargo</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Formulir Contact Us</button></li>
              <li className="pt-2">
                <button onClick={() => onNavigate('admin')} className="flex items-center space-x-1.5 text-[11px] text-slate-500 hover:text-brand-orange transition-colors">
                  <Lock className="w-3 h-3" />
                  <span>Portal CMS (@gaeks.com)</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Kontak Resmi Operasional</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="hover:text-white font-bold">
                  +62 856-0856-1745
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-orange flex-shrink-0" />
                <a href="mailto:Sales01@gaeks.com" className="hover:text-white font-bold">
                  Sales01@gaeks.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <a href="mailto:info@gaeks.com" className="hover:text-white">
                  info@gaeks.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                <span>Pelabuhan Tanjung Priok (Jakarta), Tanjung Emas (Semarang), Tanjung Perak (Surabaya).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
`);

// 17. APP CONTROLLER
saveFile('src/App.tsx', `
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
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar currentTab={currentPage} onNavigate={navigateTo} />

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

console.log("\n>>> Seluruh 17 file telah berhasil dirakit.");
console.log(">>> Menjalankan kompilasi produksi (npm run build)...");
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log(">>> [SUCCESS] Kompilasi berhasil tanpa error!");
} catch (err) {
  console.error(">>> [ERROR] Kompilasi gagal, periksa pesan di atas.");
  process.exit(1);
}

console.log("\n>>> Mengirim pembaruan ke GitHub (git push origin main)...");
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: complete v2 with living hero banner, 20 news articles, admin cms with backdate, and SEO"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log("\n>>> [BERHASIL] Pembaruan telah terkirim ke GitHub dan diproses auto-deploy ke Hostinger!");
} catch (err) {
  console.log(">>> Git selesai.");
}
