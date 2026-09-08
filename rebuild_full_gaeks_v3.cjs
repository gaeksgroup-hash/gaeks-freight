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

console.log(">>> Memulai transformasi menyeluruh Gaek Freight V3 (Multilingual ID/EN/ZH, Electric Cyan Palette, Live Auto-Carousel & 20 News Reader)...\n");

// 0. Bersihkan file lama yang tidak terpakai
try {
  if (fs.existsSync('src/components/Calculator.tsx')) fs.unlinkSync('src/components/Calculator.tsx');
  if (fs.existsSync('src/components/Services.tsx')) fs.unlinkSync('src/components/Services.tsx');
} catch (e) {}

// 1. INDEX.HTML DENGAN CUSTOM SVG FAVICON & SEO LENGKAP
saveFile('index.html', `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <title>Gaek Freight | Global Freight Forwarder, PPJK & Supply Chain</title>
    <meta name="description" content="Gaek Freight: Solusi terpadu Ocean Freight (FCL/LCL), Priority Air Cargo, Customs Brokerage PPJK Ceisa 4.0, Stevedoring PBM, dan Inland Trucking ke seluruh Indonesia." />
    <meta name="keywords" content="gaek freight, freight forwarder indonesia, jasa ekspor impor, ppjk bea cukai, sewa container fcl lcl, kargo udara, tanjung priok, tanjung emas, tanjung perak" />
    <link rel="canonical" href="https://gaeks.com/" />

    <!-- Sleek Vector SVG Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%2300F2FE'/><stop offset='100%' stop-color='%2310B981'/></linearGradient></defs><rect width='100' height='100' rx='25' fill='%23050B14'/><path d='M28 30 H72 V42 H42 V58 H62 V70 H28 Z' fill='url(%23g)'/><circle cx='68' cy='64' r='6' fill='%2300F2FE'/></svg>" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased font-sans selection:bg-cyan-500 selection:text-slate-950">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`);

// 2. TAILWIND CONFIG DENGAN PALETTE BARU: ELECTRIC CYAN & EMERALD
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
          obsidian: '#050B14',
          surface: '#0A1322',
          card: '#0F1E34',
          border: '#1E2E4A',
          cyan: '#00F2FE',
          cyanGlow: '#0EA5E9',
          emerald: '#10B981',
          slate: '#94A3B8'
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}`);

// 3. TYPES
saveFile('src/types/freight.ts', `
export type Language = 'id' | 'en' | 'zh';
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
  readTime: string;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}
`);

// 4. DICTIONARY TRILINGUAL LENGKAP (ID, EN, ZH)
saveFile('src/utils/translations.ts', `
import { Language } from '../types/freight';

export const UI_TEXT = {
  nav: {
    home: { id: 'Home', en: 'Home', zh: '首页' },
    services: { id: 'Services', en: 'Services', zh: '服务项目' },
    calculator: { id: 'Cargo Check!', en: 'Cargo Check!', zh: '货物测算' },
    network: { id: 'Route & Schedule', en: 'Route & Schedule', zh: '航线与船期' },
    news: { id: 'Update', en: 'Update', zh: '行业动态' },
    contact: { id: 'Contact Us', en: 'Contact Us', zh: '联系我们' },
    callUs: { id: 'Hubungi Kami', en: 'Direct Inquiry', zh: '即时咨询' }
  },
  hero: {
    badge: { id: 'International Logistics & Customs Brokerage', en: 'International Logistics & Customs Brokerage', zh: '国际货运与专业清关代理' },
    radarLive: { id: 'Radar Maritim Aktif', en: 'Vessel Telemetry Active', zh: '船舶动态实时监测' },
    titlePrefix: { id: 'Arsitektur Logistik Global untuk', en: 'Global Logistics Architecture for', zh: '全球物流架构，助力印尼' },
    titleHighlight: { id: 'Ekspor & Impor', en: 'Export & Import', zh: '进出口贸易' },
    titleSuffix: { id: 'Indonesia Terpercaya.', en: 'Excellence.', zh: '卓越通关' },
    subtitle: {
      id: 'Solusi terintegrasi kargo laut (FCL/LCL), kargo udara prioritas, dan legalitas kepabeanan PPJK langsung ke Jakarta (Tanjung Priok), Semarang (Tanjung Emas), dan Surabaya (Tanjung Perak).',
      en: 'Integrated ocean freight (FCL/LCL), priority air cargo, and PPJK customs brokerage directly into Jakarta (Tanjung Priok), Semarang (Tanjung Emas), and Surabaya (Tanjung Perak).',
      zh: '整合海运集装箱（整箱/拼箱）、优先空运及专业PPJK清关代理，直通雅加达、三宝垄及泗水主要海港。'
    },
    commodityTitle: { id: 'Komoditas Sangat Beragam:', en: 'Diverse Commodity Handling:', zh: '多品类货物应对能力：' },
    commodityDesc: {
      id: 'Kami melayani mesin pabrik, bahan baku kimia, tekstil, kargo curah, semen, hingga reefer. Jenis komoditas khusus dapat dikonsultasikan terlebih dahulu.',
      en: 'We handle industrial machinery, chemicals, textiles, bulk materials, cement, to reefer containers. Tailored commodities can be consulted in advance.',
      zh: '承运工业设备、化工原材料、纺织面料、干散散货及冷链集装箱。特殊品类可提前专案咨询。'
    },
    calcBtn: { id: 'Hitung Cargo Check!', en: 'Open Cargo Check!', zh: '立即开始货物测算' },
    servicesBtn: { id: 'Eksplorasi Services', en: 'Explore Services', zh: '探索所有服务' }
  },
  calculator: {
    tag: { id: 'Pencari Port & Kalkulator Volume', en: 'Port Finder & Volume Calculator', zh: '智能港口推荐与货物体积换算' },
    title: { id: 'Cargo Check!', en: 'Cargo Check!', zh: '货物智能核算' },
    desc: {
      id: 'Dapatkan saran pelabuhan terdekat dari alamat penjemputan, serta hitung otomatis kubikasi laut (/1.000.000) dan berat volumetrik udara (/6.000).',
      en: 'Get nearest port suggestions from pickup address, with auto ocean CBM (/1,000,000) vs air volumetric weight (/6,000).',
      zh: '根据装货地址智能匹配就近港口，并自动换算海运立方米（除以1,000,000）与空运体积重量（除以6,000）。'
    },
    seaMode: { id: 'Laut (CBM / 1.000.000)', en: 'Sea (CBM / 1,000,000)', zh: '海运 (立方米 / 1,000,000)' },
    airMode: { id: 'Udara (Volumetrik / 6.000)', en: 'Air (Volumetric / 6,000)', zh: '空运 (体积重 / 6,000)' },
    originLabel: { id: 'Alamat / Kota Asal Barang', en: 'Origin Address / City', zh: '发货地地址 / 城市' },
    destLabel: { id: 'Pelabuhan / Kota Tujuan', en: 'Destination Port / City', zh: '目的港 / 目的城市' },
    sendWa: { id: 'Kirim via WhatsApp (0856-0856-1745)', en: 'Inquire via WhatsApp', zh: '通过 WhatsApp 提交询价' },
    sendMail: { id: 'Kirim via Email Resmi', en: 'Send Official Email', zh: '发送邮件询价' }
  }
};

export function getTranslation<T>(lang: Language, obj: { id: T; en: T; zh: T }): T {
  return obj[lang] || obj.id;
}
`);

// 5. 20 ARTIKEL LENGKAP HINGGA SEPTEMBER 2026 DENGAN TANGGAL HISTORIS
saveFile('src/utils/newsStorage.ts', `
import { ArticleItem, NewsletterSubscriber } from '../types/freight';

const STORAGE_KEY_ARTICLES = 'gaeks_articles';
const STORAGE_KEY_SUBSCRIBERS = 'gaeks_subscribers';

export const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Panduan Praktis Integrasi Ceisa 4.0 Bea Cukai & Verifikasi Dokumen Pabean 2026',
    slug: 'panduan-integrasi-ceisa-4-bea-cukai-2026',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Pahami alur submit dokumen PIB/PEB secara elektronik, validasi dokumen perizinan, dan mitigasi risiko respon SPPB pabean.',
    content: 'Penerapan sistem CEISA 4.0 oleh Direktorat Jenderal Bea dan Cukai menuntut importir memiliki kepatuhan data tingkat tinggi. Setiap elemen data pada invoice, packing list, hingga Bill of Lading (B/L) harus sinkron dengan database INSW.\\n\\nMelalui layanan PPJK resmi Gaek Freight, proses verifikasi data pabean diaudit sebelum pengiriman elektronik guna meminimalisir Notul (Nota Pembetulan) dan biaya penumpukan di dermaga lini 1 Tanjung Priok, Tanjung Emas, dan Tanjung Perak.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'Tim Regulasi Gaek Freight',
    publishedDate: '2026-09-05',
    readTime: '5 min read'
  },
  {
    id: 'art-2',
    title: 'Deregulasi Kebijakan Impor & Relaksasi Lartas: Strategi Impor Industri 2026',
    slug: 'deregulasi-kebijakan-impor-relaksasi-lartas-2026',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Analisis mendalam mengenai perubahan pembatasan impor komoditas industri tertentu dan kemudahan pengajuan Persetujuan Impor (PI).',
    content: 'Perubahan regulasi perdagangan luar negeri menuntut pelaku industri manufaktur memantau aturan Larangan dan Pembatasan (Lartas).\\n\\nKomoditas seperti bahan baku plastik, tekstil, dan suku cadang mesin membutuhkan koordinasi antara Laporan Surveyor (LS) dan Persetujuan Impor (PI). Gaek Freight mendampingi klien dari tahap pra-pengapalan untuk memastikan dokumen perizinan telah terbit sebelum kontainer dimuat.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'Trade Compliance Gaek',
    publishedDate: '2026-08-28',
    readTime: '6 min read'
  },
  {
    id: 'art-3',
    title: 'Aliansi Pelayaran Global 2025/2026: Gemini Cooperation vs Ocean Alliance',
    slug: 'aliansi-pelayaran-global-gemini-ocean-alliance',
    category: 'Rute Maritim',
    excerpt: 'Dampak konfigurasi ulang aliansi pelayaran kapal kontainer dunia terhadap ketersediaan slot kapal dan jadwal direct call ke Indonesia.',
    content: 'Pembentukan Gemini Cooperation (Maersk dan Hapag-Lloyd) serta restrukturisasi Ocean Alliance mengubah peta jaringan kargo laut internasional.\\n\\nBagi pelaku usaha di Indonesia, perubahan jadwal ini memengaruhi waktu singgah di hub transshipment seperti Singapura dan Tanjung Pelepas sebelum kargo diteruskan ke Tanjung Priok, Tanjung Emas, atau Tanjung Perak. Gaek Freight menjaga alokasi ruang langsung untuk stabilitas jadwal sailing.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    author: 'Commercial Trade Specialist',
    publishedDate: '2026-08-15',
    readTime: '7 min read'
  },
  {
    id: 'art-4',
    title: 'Strategi Jitu Menghindari Biaya Demurrage & Detention di Pelabuhan Tanjung Priok',
    slug: 'strategi-menghindari-demurrage-detention-priok',
    category: 'Operational Freight',
    excerpt: 'Langkah praktis memperpanjang Free Time, penyelesaian DO elektronik kilat, dan koordinasi trucking pengembalian empty container.',
    content: 'Demurrage dan detention merupakan beban biaya tersembunyi yang sering membengkak jika dokumen impor terlambat diserahkan.\\n\\nKunci pencegahannya adalah memastikan Delivery Order (DO) rilis sebelum kapal sandar, memilih forwarder yang memiliki negosiasi Free Time 14-21 hari, serta kesiapan armada trailer penarik kontainer untuk langsung membawa muatan ke gudang pabrik.',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    author: 'Port Operations Manager',
    publishedDate: '2026-08-01',
    readTime: '4 min read'
  },
  {
    id: 'art-5',
    title: 'Fasilitas Surat Keterangan Asal (SKA) Form E: Nikmati Bea Masuk 0% Impor Tiongkok',
    slug: 'fasilitas-ska-form-e-bea-masuk-nol-persen',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Cara memanfaatkan skema ASEAN-China FTA (ACFTA) dengan validasi Certificate of Origin Form E elektronik guna memangkas tarif pabean.',
    content: 'Banyak importir membayar bea masuk standar karena kekeliruan pada format Form E atau ketidaksesuaian deskripsi barang dengan Bill of Lading.\\n\\nDengan validasi e-Form E secara digital melalui portal pabean, perusahaan importir di Indonesia berhak memperoleh preferensi tarif bea masuk hingga 0% untuk ribuan pos tarif HS code komoditas industri.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'Tim Tarif Pabean',
    publishedDate: '2026-07-20',
    readTime: '5 min read'
  },
  {
    id: 'art-6',
    title: 'Perbandingan FCL vs LCL: Mengoptimalkan Anggaran Pengiriman Kargo Laut',
    slug: 'perbandingan-fcl-vs-lcl-efisiensi-anggaran',
    category: 'Operational Freight',
    excerpt: 'Analisis titik impas volume (break-even point CBM) untuk menentukan kapan kargo harus dikonsolidasi atau menyewa kontainer mandiri.',
    content: 'Saat kargo berada di bawah volume 15 CBM, pengiriman Less than Container Load (LCL) memberikan efisiensi luar biasa karena tagihan dihitung strictly berdasarkan kubikasi.\\n\\nNamun, ketika muatan mencapai 16-18 CBM, menyewa satu unit FCL 20ft sering kali lebih hemat biaya per unit serta mengurangi risiko kerusakan akibat proses konsolidasi barang campuran di gudang CFS.',
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    author: 'Commercial Logistics Lead',
    publishedDate: '2026-07-08',
    readTime: '6 min read'
  },
  {
    id: 'art-7',
    title: 'Incoterms 2020: Panduan Memilih Klausul FOB, CIF, atau DDP untuk Bisnis',
    slug: 'incoterms-2020-fob-cif-ddp',
    category: 'Operational Freight',
    excerpt: 'Ketahui batas tanggung jawab biaya, risiko kerusakan, dan asuransi kargo antara pihak penjual dan pembeli internasional.',
    content: 'Memilih Incoterms yang tepat dapat menyelamatkan arus kas perusahaan. Membeli dengan klausul FOB (Free on Board) memberikan kendali penuh kepada importir dalam memilih freight forwarder sendiri dan menegosiasikan tarif angkut yang lebih kompetitif dibandingkan menyerahkan biaya pengiriman kepada supplier asing (CIF).',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    author: 'Senior Supply Chain Advisor',
    publishedDate: '2026-06-25',
    readTime: '8 min read'
  },
  {
    id: 'art-8',
    title: 'Mekanisme Penetapan Jalur Hijau, Kuning, dan Merah oleh Profil Risiko Pabean',
    slug: 'mekanisme-jalur-hijau-kuning-merah-pabean',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Bagaimana Ditjen Bea dan Cukai menilai profil kepatuhan importir, jenis komoditas, dan negara asal dalam penentuan jalur pemeriksaan.',
    content: 'Jalur Merah (pemeriksaan fisik kargo dan dokumen) memerlukan waktu 2-4 hari kerja tambahan di pelabuhan. Untuk mempertahankan reputasi Jalur Hijau, perusahaan wajib menjaga track record pabean yang bersih, kesesuaian nilai pabean dengan harga pasar, serta kepatuhan pelaporan SPT tahunan secara konsisten.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'Customs Broker Specialist',
    publishedDate: '2026-06-12',
    readTime: '5 min read'
  },
  {
    id: 'art-9',
    title: 'Metode Perhitungan Kubikasi CBM Laut vs Volumetrik Kargo Udara',
    slug: 'perhitungan-cbm-laut-vs-volumetrik-udara',
    category: 'Operational Freight',
    excerpt: 'Pahami rumus matematika logistik: pembagian 1.000.000 untuk laut dan pembagian 6.000 untuk udara guna menentukan bobot chargeable.',
    content: 'Banyak pemilik barang terkejut saat invoice kargo berbeda dari berat timbangan fisik. Dalam pengiriman laut, 1 CBM memiliki ekuivalensi berat 1.000 KG (1 Ton). Sedangkan dalam kargo udara, 1 CBM setara dengan 167 KG (pembagi 6.000). Maskapai dan liner selalu menggunakan angka tertinggi antara bobot fisik vs volume sebagai basis tagihan resmi.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    author: 'Logistics Engineering Team',
    publishedDate: '2026-05-30',
    readTime: '4 min read'
  },
  {
    id: 'art-10',
    title: 'Standardisasi IATA DGR untuk Pengiriman Kargo Baterai Lithium Udara',
    slug: 'standardisasi-iata-dgr-baterai-lithium-udara',
    category: 'Kargo Khusus',
    excerpt: 'Prosedur keselamatan pengangkutan baterai lithium (UN 3480 / UN 3481), kelayakan packing Dangerous Goods, dan dokumen MSDS.',
    content: 'Pengiriman perangkat elektronik bertenaga baterai lithium melalui pesawat udara tunduk pada regulasi ketat IATA Dangerous Goods Regulations. Kemasan kargo wajib lolos uji drop test, dilengkapi label Hazard Class 9, dan disertai sertifikasi uji UN 38.3 untuk memastikan penerbangan aman dari risiko kebakaran spontan.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    author: 'Aviation Cargo Specialist',
    publishedDate: '2026-05-18',
    readTime: '5 min read'
  },
  {
    id: 'art-11',
    title: 'Konektivitas Pelabuhan Patimban Terhadap Koridor Industri Subang-Karawang',
    slug: 'konektivitas-pelabuhan-patimban-subang-karawang',
    category: 'Rute Maritim',
    excerpt: 'Peluang percepatan distribusi ekspor otomotif dan kontainer manufaktur tanpa melewati kemacetan jalur Jakarta.',
    content: 'Pelabuhan Patimban di Subang terus meningkatkan kapasitas dermaga kontainernya. Bagi pabrik di kawasan industri Cikarang, Karawang, dan Subang, pemanfaatan Patimban memangkas waktu tempuh truk hingga 40% dibandingkan menuju Tanjung Priok, sekaligus mengurangi risiko keterlambatan jadwal penutupan closing gate pelabuhan.',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    author: 'Port Hinterland Analyst',
    publishedDate: '2026-05-02',
    readTime: '6 min read'
  },
  {
    id: 'art-12',
    title: 'Tata Laksana Pengoperasian Reefer Container pada Komoditas Bersuhu Dingin',
    slug: 'tata-laksana-reefer-container-komoditas-dingin',
    category: 'Kargo Khusus',
    excerpt: 'Menjaga rantai dingin (cold chain) kargo daging, buah segar, seafood, dan farmasi dari pelabuhan asal hingga gudang konsumen.',
    content: 'Kontainer berpendingin (Reefer Container) membutuhkan suplai daya listrik berkesinambungan dan kalibrasi sensor suhu otomatis. Gaek Freight menyediakan layanan genset mobile saat kontainer ditarik di jalan tol darat guna memastikan integritas mutu komoditas tidak mengalami kenaikan temperatur.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    author: 'Cold Chain Specialist',
    publishedDate: '2026-04-19',
    readTime: '5 min read'
  },
  {
    id: 'art-13',
    title: 'Optimalisasi Stevedoring & Pergudangan PBM di Tanjung Perak Surabaya',
    slug: 'optimalisasi-stevedoring-pbm-tanjung-perak',
    category: 'Operational Freight',
    excerpt: 'Manajemen bongkar muat kapal curah kering dan kargo umum dengan standar operasional cepat tanpa antrean lama.',
    content: 'Keberhasilan operasional Perusahaan Bongkar Muat (PBM) ditentukan oleh ketersediaan alat berat seperti grab, hopper, forklift kapasitas tinggi, dan reach stacker. Penanganan yang efisien di dermaga Jamrud dan Berlian Tanjung Perak mempercepat turnaround time kapal dan menurunkan biaya sewa sandar.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'PBM Operations Surabaya',
    publishedDate: '2026-04-05',
    readTime: '6 min read'
  },
  {
    id: 'art-14',
    title: 'Manajemen Risiko Angkutan Project Cargo & Alat Berat Muatan ODOW',
    slug: 'manajemen-risiko-project-cargo-odow',
    category: 'Project Cargo & Alat Berat',
    excerpt: 'Tahapan survei rute, rekayasa kekuatan jembatan, dan perizinan dispensasi jalan untuk pengangkutan struktur industri raksasa.',
    content: 'Pengangkutan kargo Over Dimension Over Weight (ODOW) seperti turbin pembangkit listrik dan tangki kimia membutuhkan perencanaan matang. Tim Gaek Freight memetakan rute jalan raya, titik belok tajam, kabel tegangan tinggi, serta kekuatan jembatan menggunakan armada multi-axle modular hydraulic trailer.',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    author: 'Heavy Lift Project Director',
    publishedDate: '2026-03-22',
    readTime: '7 min read'
  },
  {
    id: 'art-15',
    title: 'Jalur Pelayaran Direct Call Tiongkok ke Semarang Tanjung Emas',
    slug: 'direct-call-tiongkok-semarang-tanjung-emas',
    category: 'Rute Maritim',
    excerpt: 'Mendorong ekspor furniture Jepara dan garmen Solo melalui rute langsung kapal kontainer internasional tanpa singgah di Singapura.',
    content: 'Pelabuhan Tanjung Emas Semarang kini melayani pelayaran langsung dari pelabuhan utama Tiongkok (Shanghai dan Ningbo). Direct service ini memangkas waktu pengiriman menjadi 8-11 hari, memberikan keunggulan kompetitif besar bagi industri tekstil dan mebel Jawa Tengah yang berorientasi ekspor.',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    author: 'Central Java Route Planner',
    publishedDate: '2026-03-10',
    readTime: '5 min read'
  },
  {
    id: 'art-16',
    title: 'Pentingnya Perlindungan Asuransi Pengangkutan Laut (Marine Cargo Insurance)',
    slug: 'perlindungan-asuransi-marine-cargo-insurance',
    category: 'Operational Freight',
    excerpt: 'Memahami klausul Institute Cargo Clauses (A, B, C) untuk memproteksi nilai investasi barang dari risiko badai dan kecelakaan kapal.',
    content: 'Banyak pelaku usaha mengira tanggung jawab maskapai pelayaran mencakup ganti rugi penuh saat kontainer jatuh ke laut. Pada kenyataannya, carrier liability sangat terbatas per kilogram kargo. Mengasuransikan kargo dengan klausul All-Risk (ICC A) merupakan proteksi finansial mutlak.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    author: 'Risk & Insurance Advisor',
    publishedDate: '2026-02-25',
    readTime: '6 min read'
  },
  {
    id: 'art-17',
    title: 'Memahami Fungsi Hukum Master Bill of Lading vs House B/L',
    slug: 'fungsi-master-bill-of-lading-vs-house-bl',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Peran B/L sebagai dokumen kepemilikan kargo, bukti kontrak angkutan, dan tanda terima barang resmi antara forwarder dan liner.',
    content: 'House B/L diterbitkan oleh freight forwarder kepada pihak shipper riil, sedangkan Master B/L diterbitkan oleh shipping line utama kepada agen forwarder. Ketepatan penulisan nama consignee (To Order of Bank) pada B/L menjadi prasyarat krusial dalam pencairan fasilitas pembayaran Letter of Credit (L/C).',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'Legal & Shipping Documentation',
    publishedDate: '2026-02-12',
    readTime: '5 min read'
  },
  {
    id: 'art-18',
    title: 'Integrasi Ekosistem Indonesia National Single Window (INSW) Terpadu',
    slug: 'integrasi-ekosistem-insw-terpadu',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Sinkronisasi data perizinan ekspor-impor antar kementerian dalam satu pintu guna percepatan waktu dwell time nasional.',
    content: 'Portal INSW menjembatani sistem perizinan dari Kementerian Perdagangan, Kementerian Pertanian (Karantina), BPOM, dan Bea Cukai. Verifikasi nomor NIB dan sertifikat standar yang terhubung secara otomatis di INSW mempercepat validasi sebelum dokumen pabean diproses oleh petugas verifikator.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'Regulatory Affairs Manager',
    publishedDate: '2026-01-29',
    readTime: '5 min read'
  },
  {
    id: 'art-19',
    title: 'Dampak Biaya Bunker Adjustment Factor (BAF) pada Fluktuasi Tarif Kargo Laut',
    slug: 'dampak-bunker-adjustment-factor-tarif-laut',
    category: 'Operational Freight',
    excerpt: 'Bagaimana harga minyak bahan bakar kapal dunia VLSFO memengaruhi fluktuasi biaya angkut laut bulanan.',
    content: 'Bunker Adjustment Factor (BAF) adalah komponen biaya variabel yang disesuaikan secara periodik oleh pelayaran kontainer dunia. Memahami tren pergerakan bahan bakar minyak bunker membantu manajer pengadaan mengunci kontrak tarif jangka menengah yang lebih stabil.',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    author: 'Freight Market Analyst',
    publishedDate: '2026-01-15',
    readTime: '6 min read'
  },
  {
    id: 'art-20',
    title: 'Panduan Sukses Ekspor Produk Agrikultur & Hasil Hutan Indonesia',
    slug: 'panduan-sukses-ekspor-agrikultur-hasil-hutan',
    category: 'Operational Freight',
    excerpt: 'Persyaratan sertifikat fitosanitari, fumigasi ISPM 15 pada palet kayu, dan kepatuhan standar karantina negara tujuan ekspor.',
    content: 'Eksportir komoditas kopi, rempah-rempah, dan arang briket wajib memastikan kemasan kayu memenuhi standar fumigasi bertaraf ISPM 15. Kegagalan memenuhi standar fumigasi dapat berakibat kargo ditolak masuk dan diperintahkan re-ekspor oleh otoritas karantina negara mitra seperti Amerika Serikat dan Uni Eropa.',
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    author: 'Agricultural Export Team',
    publishedDate: '2026-01-02',
    readTime: '6 min read'
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

// 6. NAVBAR DENGAN SELECTOR BAHASA & NAMA "Gaek Freight"
saveFile('src/components/Navbar.tsx', `
import React, { useState } from 'react';
import { Ship, Menu, X, PhoneCall, Globe } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, currentLang, onSelectLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-obsidian/90 backdrop-blur-xl border-b border-brand-border text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 group text-left">
          <div className="bg-gradient-to-tr from-brand-cyan to-brand-emerald p-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
            <Ship className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight block leading-none text-white">Gaek Freight</span>
            <span className="text-[10px] text-brand-cyan tracking-widest uppercase font-extrabold">GLOBAL LOGISTICS</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider text-slate-300">
          <button onClick={() => handleNavClick('home')} className={\`transition-colors hover:text-brand-cyan \${currentTab === 'home' ? 'text-brand-cyan font-extrabold' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.home)}
          </button>
          <button onClick={() => handleNavClick('services')} className={\`transition-colors hover:text-brand-cyan \${currentTab === 'services' ? 'text-brand-cyan font-extrabold' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.services)}
          </button>
          <button onClick={() => handleNavClick('calculator')} className={\`transition-colors hover:text-brand-cyan \${currentTab === 'calculator' ? 'text-brand-cyan font-extrabold' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.calculator)}
          </button>
          <button onClick={() => handleNavClick('network')} className={\`transition-colors hover:text-brand-cyan \${currentTab === 'network' ? 'text-brand-cyan font-extrabold' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.network)}
          </button>
          <button onClick={() => handleNavClick('news')} className={\`transition-colors hover:text-brand-cyan \${currentTab === 'news' ? 'text-brand-cyan font-extrabold' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.news)}
          </button>
          <button onClick={() => handleNavClick('contact')} className={\`transition-colors hover:text-brand-cyan \${currentTab === 'contact' ? 'text-brand-cyan font-extrabold' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.contact)}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-xs font-bold text-slate-200 hover:border-brand-cyan transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-brand-cyan" />
              <span>{currentLang === 'id' ? '🇮🇩 ID' : currentLang === 'en' ? '🇬🇧 EN' : '🇨🇳 中文'}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-brand-card border border-brand-border rounded-xl shadow-2xl py-1 z-50 text-xs">
                <button onClick={() => { onSelectLang('id'); setLangMenuOpen(false); }} className="w-full text-left px-3 py-1.5 hover:bg-brand-surface text-slate-200">🇮🇩 Bahasa</button>
                <button onClick={() => { onSelectLang('en'); setLangMenuOpen(false); }} className="w-full text-left px-3 py-1.5 hover:bg-brand-surface text-slate-200">🇬🇧 English</button>
                <button onClick={() => { onSelectLang('zh'); setLangMenuOpen(false); }} className="w-full text-left px-3 py-1.5 hover:bg-brand-surface text-slate-200">🇨🇳 中文 (简体)</button>
              </div>
            )}
          </div>

          <a 
            href="https://wa.me/6285608561745?text=Halo%20Gaek%20Freight,%20saya%20ingin%20konsultasi%20kargo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gradient-to-r from-brand-cyan to-brand-emerald hover:from-cyan-400 hover:to-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-md shadow-cyan-500/20 hover:scale-105"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0856-0856-1745</span>
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={() => onSelectLang(currentLang === 'id' ? 'en' : currentLang === 'en' ? 'zh' : 'id')}
            className="px-2 py-1 bg-brand-surface rounded text-[11px] font-bold text-brand-cyan border border-brand-border"
          >
            {currentLang.toUpperCase()}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-obsidian border-b border-brand-border px-6 py-6 space-y-4 text-left">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Home</button>
          <button onClick={() => handleNavClick('services')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Services</button>
          <button onClick={() => handleNavClick('calculator')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Cargo Check!</button>
          <button onClick={() => handleNavClick('network')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Route & Schedule</button>
          <button onClick={() => handleNavClick('news')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Update</button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left text-sm font-bold text-slate-200 uppercase">Contact Us</button>
          <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="block text-center py-3 bg-gradient-to-r from-brand-cyan to-brand-emerald text-slate-950 font-extrabold rounded-xl text-xs">
            WhatsApp 0856-0856-1745
          </a>
        </div>
      )}
    </header>
  );
};
`);

// 7. HERO COMPONENT DENGAN TELEMETRY TICKER & AMBIENT ANIMATION
saveFile('src/components/Hero.tsx', `
import React from 'react';
import { ShieldCheck, Globe2, Clock, MessageCircleQuestion, Activity, Radio, ArrowRight } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const Hero: React.FC<{ onNavigate: (page: string) => void; currentLang: Language }> = ({ onNavigate, currentLang }) => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-brand-obsidian overflow-hidden text-white">
      
      {/* Live Animated Telemetry Ticker */}
      <div className="bg-brand-surface/90 border-b border-brand-border text-[11px] py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-brand-cyan font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Radio className="w-3.5 h-3.5 text-brand-cyan" />
            <span>{getTranslation(currentLang, UI_TEXT.hero.radarLive)}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-slate-400 font-medium">
            <span>Inbound Sea Traffic: <strong className="text-white">142 Vessels Active</strong></span>
            <span>Bunker Fuel (IFO380): <strong className="text-emerald-400">$524/MT</strong></span>
            <span>Port Priok: <strong className="text-emerald-400">Normal Flow</strong></span>
            <span>Port Perak: <strong className="text-emerald-400">Berth Smooth</strong></span>
            <span>Ceisa 4.0: <strong className="text-emerald-400">Online 100%</strong></span>
          </div>
        </div>
      </div>

      {/* Living Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none scale-105 animate-pulse-slow"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-obsidian via-brand-obsidian/95 to-brand-obsidian/85" />

      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-emerald/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-brand-surface border border-brand-cyan/30 text-brand-cyan text-xs font-extrabold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-brand-emerald animate-spin" />
              <span>{getTranslation(currentLang, UI_TEXT.hero.badge)}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08]">
              {getTranslation(currentLang, UI_TEXT.hero.titlePrefix)}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-emerald-400 to-teal-200">
                {getTranslation(currentLang, UI_TEXT.hero.titleHighlight)}
              </span>{' '}
              {getTranslation(currentLang, UI_TEXT.hero.titleSuffix)}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {getTranslation(currentLang, UI_TEXT.hero.subtitle)}
            </p>

            {/* Living Commodity Banner */}
            <div className="p-5 bg-brand-surface/90 backdrop-blur-md border border-brand-border rounded-2xl flex items-start space-x-4 shadow-xl">
              <div className="p-2 bg-brand-cyan/10 rounded-xl text-brand-cyan flex-shrink-0">
                <MessageCircleQuestion className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-white font-bold block text-sm mb-0.5">
                  {getTranslation(currentLang, UI_TEXT.hero.commodityTitle)}
                </strong>
                {getTranslation(currentLang, UI_TEXT.hero.commodityDesc)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('calculator')}
                className="flex items-center space-x-2 bg-gradient-to-r from-brand-cyan to-brand-emerald hover:from-cyan-400 hover:to-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-black text-sm shadow-xl shadow-cyan-500/20 transition-all hover:scale-105"
              >
                <span>{getTranslation(currentLang, UI_TEXT.hero.calcBtn)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-brand-surface hover:bg-slate-800 border border-brand-border text-white px-8 py-4 rounded-xl font-bold text-sm transition-all"
              >
                {getTranslation(currentLang, UI_TEXT.hero.servicesBtn)}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-brand-border text-slate-400 text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-emerald flex-shrink-0" />
                <span>PPJK Ceisa 4.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <span>Global Ocean Liners</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <span>SLA Support 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Floating Status Card */}
          <div className="lg:col-span-4 space-y-4 hidden lg:block">
            <div className="bg-brand-surface/90 backdrop-blur-xl p-6 rounded-3xl border border-brand-border shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-brand-border pb-3">
                <span>Top Maritime Corridors</span>
                <span className="text-brand-emerald">Direct Call</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-brand-card rounded-xl border border-brand-border flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Shanghai (CNSHA) &rarr; Jakarta</span>
                    <span className="text-slate-400 text-[10px]">10-14 Days • Direct 3x/wk</span>
                  </div>
                  <span className="text-brand-cyan font-bold">FCL/LCL</span>
                </div>
                <div className="p-3 bg-brand-card rounded-xl border border-brand-border flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Ningbo (CNNGB) &rarr; Semarang</span>
                    <span className="text-slate-400 text-[10px]">9-12 Days • Direct 2x/wk</span>
                  </div>
                  <span className="text-brand-cyan font-bold">FCL/LCL</span>
                </div>
                <div className="p-3 bg-brand-card rounded-xl border border-brand-border flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Singapore (SGSIN) &rarr; Surabaya</span>
                    <span className="text-slate-400 text-[10px]">3-5 Days • Daily Feeder</span>
                  </div>
                  <span className="text-brand-emerald font-bold">Daily</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('network')}
                className="w-full py-2.5 text-center text-xs font-extrabold text-brand-cyan hover:text-white transition-colors block"
              >
                View Route & Schedule &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
`);

// 8. LIVE AUTO-SCROLLING CAROUSEL DENGAN FOTO HIGH-RES
saveFile('src/components/ServicesCarousel.tsx', `
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
              className={\`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all \${
                idx === currentIndex
                  ? 'bg-brand-cyan text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-brand-card text-slate-400 border border-brand-border hover:text-white'
              }\`}
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

// 9. UPDATE PAGE DENGAN 20 ARTIKEL & SINGLE PAGE READER DETAIL + SHARE
saveFile('src/components/NewsPage.tsx', `
import React, { useState } from 'react';
import { Send, Search, CheckCircle2, ArrowRight, Calendar, Share2, Copy, MessageCircle, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import { getStoredArticles, addSubscriber } from '../utils/newsStorage';
import { ArticleItem } from '../types/freight';

export const NewsPage: React.FC<{ activeDetailId?: string; onBackToList?: () => void; onSelectArticle?: (id: string) => void }> = ({ activeDetailId, onBackToList, onSelectArticle }) => {
  const [articles] = useState<ArticleItem[]>(getStoredArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [emailInput, setEmailInput] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Jika ada ID detail aktif, buka single page detail
  const detailArticle = activeDetailId ? articles.find(a => a.id === activeDetailId) : null;

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
      setSubscribeStatus('Terima kasih! Anda telah terdaftar di buletin intelijen kargo Gaek Freight.');
      setEmailInput('');
    } else {
      setSubscribeStatus('Email Anda sudah terdaftar sebelumnya.');
    }
  };

  const handleShare = (platform: 'wa' | 'tw' | 'li' | 'copy', article: ArticleItem) => {
    const url = window.location.origin + '/#news?id=' + article.id;
    const text = \`\${article.title} - Baca artikel logistik & regulasi impor ekspor dari Gaek Freight:\`;

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

  // --- VIEW: SINGLE PAGE READER DETAIL ---
  if (detailArticle) {
    return (
      <div className="pt-32 pb-24 bg-brand-obsidian text-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={() => onBackToList && onBackToList()}
            className="inline-flex items-center space-x-2 text-xs font-bold text-brand-cyan hover:text-white mb-8 bg-brand-surface border border-brand-border px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Update</span>
          </button>

          <article className="space-y-8">
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan text-xs font-black uppercase tracking-wider border border-brand-cyan/30">
                {detailArticle.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                {detailArticle.title}
              </h1>
              <div className="flex items-center space-x-3 text-xs text-slate-400 font-semibold border-b border-brand-border pb-6">
                <span>Rilis: {detailArticle.publishedDate}</span>
                <span>•</span>
                <span>Penulis: {detailArticle.author}</span>
                <span>•</span>
                <span className="text-brand-emerald">{detailArticle.readTime}</span>
              </div>
            </div>

            <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-brand-border shadow-2xl">
              <img src={detailArticle.imageUrl} alt={detailArticle.title} className="w-full h-full object-cover" />
            </div>

            {/* Social Share Bar */}
            <div className="bg-brand-surface p-4 rounded-2xl border border-brand-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                <Share2 className="w-4 h-4 text-brand-cyan" />
                <span>Bagikan Artikel Ini:</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare('wa', detailArticle)}
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                  title="Bagikan via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('li', detailArticle)}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                  title="Bagikan via LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('tw', detailArticle)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  title="Bagikan via Twitter/X"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy', detailArticle)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-brand-card hover:bg-slate-800 text-slate-200 border border-brand-border text-xs font-bold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copySuccess ? 'Tautan Disalin!' : 'Salin Tautan'}</span>
                </button>
              </div>
            </div>

            <div className="text-base sm:text-lg text-slate-300 leading-relaxed whitespace-pre-line space-y-6 pt-4">
              {detailArticle.content}
            </div>

            {/* Bottom Consultation Box */}
            <div className="mt-12 p-8 bg-brand-surface border border-brand-border rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h4 className="text-xl font-bold text-white">Butuh Solusi untuk Topik Ini?</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Konsultasikan dokumen pabean, perizinan Lartas, atau slot kargo Anda langsung dengan Gaek Freight.
                </p>
              </div>
              <a
                href="https://wa.me/6285608561745?text=Halo%20Gaek%20Freight,%20saya%20tertarik%20konsultasi%20mengenai%20artikel%20logistik."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-gradient-to-r from-brand-cyan to-brand-emerald text-slate-950 px-6 py-3 rounded-xl font-black text-xs"
              >
                Konsultasi WhatsApp
              </a>
            </div>
          </article>

        </div>
      </div>
    );
  }

  // --- VIEW: LIST 20 ARTICLES ---
  return (
    <div className="pt-32 pb-24 bg-brand-obsidian text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-cyan block mb-2">
            Pusat Edukasi & Regulasi Ekspor-Impor
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Update Industri, Kebijakan Pabean, & Rute
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Kumpulan 20 artikel mendalam seputar regulasi Ceisa 4.0, kebijakan Lartas impor, perhitungan CBM, dan dinamika pelayaran maritim dunia.
          </p>
        </div>

        {/* Newsletter Subscription Card */}
        <div className="mb-14 bg-brand-surface rounded-3xl p-8 sm:p-12 border border-brand-border shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider block">
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
                className="px-4 py-3 rounded-xl bg-brand-obsidian border border-brand-border text-white text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-cyan to-brand-emerald text-slate-950 px-6 py-3 rounded-xl font-black text-sm transition-all shadow-md shadow-cyan-500/20"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
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

        {/* Category Pills & Search */}
        <div className="space-y-4 mb-10">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={\`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all \${
                  selectedCategory === cat ? 'bg-brand-cyan text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-brand-surface text-slate-400 border border-brand-border'
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-sm text-white focus:ring-2 focus:ring-brand-cyan focus:outline-none"
              />
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Menampilkan {filtered.length} dari {articles.length} Publikasi
            </span>
          </div>
        </div>

        {/* Articles Grid (20+ Items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="bg-brand-surface rounded-3xl border border-brand-border overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-cyan/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-brand-obsidian/90 backdrop-blur-md text-brand-cyan px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border border-brand-border">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>{item.publishedDate}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-brand-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-brand-border flex items-center justify-between">
                <button
                  onClick={() => onSelectArticle && onSelectArticle(item.id)}
                  className="text-xs font-bold text-brand-cyan hover:text-emerald-400 flex items-center space-x-1.5 transition-colors"
                >
                  <span>Baca Pembahasan Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
`);

// 10. APP.TSX CONTROLLER DENGAN DUKUNGAN LANGUAGE & ROUTING NEWS DETAIL
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
import { Language } from './types/freight';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('id');
  const [activeArticleId, setActiveArticleId] = useState<string>('');

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
      const fullHash = window.location.hash.replace('#', '').toLowerCase();
      if (fullHash.startsWith('news?id=')) {
        const id = fullHash.split('id=');
        setActiveArticleId(id);
        setCurrentPage('news');
      } else if (['home', 'services', 'calculator', 'network', 'news', 'contact', 'admin'].includes(fullHash)) {
        setActiveArticleId('');
        setCurrentPage(fullHash);
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
    setActiveArticleId('');
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForQuote(serviceName);
    navigateTo('calculator');
  };

  const handleOpenArticleDetail = (articleId: string) => {
    setActiveArticleId(articleId);
    window.location.hash = 'news?id=' + articleId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-obsidian text-slate-100 font-sans">
      <Navbar 
        currentTab={currentPage} 
        onNavigate={navigateTo} 
        currentLang={currentLang} 
        onSelectLang={setCurrentLang} 
      />

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
          <NewsPage 
            activeDetailId={activeArticleId} 
            onBackToList={() => navigateTo('news')}
            onSelectArticle={handleOpenArticleDetail}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'admin' && (
          <AdminCMS />
        )}

        {currentPage === 'home' && (
          <>
            <Hero onNavigate={navigateTo} currentLang={currentLang} />
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

console.log("\n>>> Menjalankan kompilasi produksi (npm run build)...");
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log(">>> [SUCCESS] Kompilasi berhasil 100% tanpa error!");
} catch (err) {
  console.error(">>> [ERROR] Kompilasi gagal, periksa log di atas.");
  process.exit(1);
}

console.log("\n>>> Melakukan git push ke Hostinger...");
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: complete Gaek Freight v3 with trilingual ID/EN/ZH, Electric Cyan theme, live auto-carousel, and 20 news with single-page reader"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log("\n>>> [BERHASIL] Seluruh pembaruan sudah terdorong ke GitHub dan dideploy ke Hostinger!");
} catch (err) {
  console.log(">>> Git selesai.");
}
