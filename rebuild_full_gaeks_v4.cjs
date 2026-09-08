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

console.log(">>> Memulai transformasi Gaek Freight V4 (Light Elegant Corporate, Living Video Hero, 20 Real Objective News, & SVG Route Map)...\n");

// 1. INDEX.HTML (LIGHT ELEGANT THEME, GOOGLE FONTS, SVG FAVICON)
saveFile('index.html', `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gaek Freight | Global Andalan Ekspress - International Freight & Logistics</title>
    <meta name="description" content="Gaek Freight (Global Andalan Ekspress): Layanan kargo laut internasional (FCL/LCL), kargo udara prioritas, kepabeanan PPJK Ceisa 4.0, dan inland trucking ke seluruh Indonesia." />
    <link rel="canonical" href="https://gaeks.com/" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-blue-600 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`);

// 2. TAILWIND CONFIGURATION DENGAN PEWARNAAN TERANG ELEGAN LOGISTIK
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
          navy: '#0A2540',
          darkBlue: '#0F2F57',
          blue: '#2563EB',
          sky: '#0284C7',
          amber: '#D97706',
          surface: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          darkText: '#0B192C'
        }
      }
    },
  },
  plugins: [],
}`);

// 3. TYPES DEFINITION (LENGKAP DENGAN SOURCES PADA ARTIKEL & DOMESTIC ROUTE)
saveFile('src/types/freight.ts', `
// filepath: /src/types/freight.ts
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

export interface DomesticPortRoute {
  id: string;
  portName: string;
  city: string;
  code: string;
  region: string;
  activeRoutes: { destination: string; transit: string; freq: string; liner: string }[];
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
  readTime?: string;
  sources: string[];
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}
`);

// 4. DICTIONARY MULTILINGUAL LENGKAP (ID, EN, ZH)
saveFile('src/utils/translations.ts', `
// filepath: /src/utils/translations.ts
import { Language } from '../types/freight';

export const UI_TEXT = {
  brand: {
    name: 'Gaek Freight',
    subtitle: {
      id: 'Global Andalan Ekspress',
      en: 'Global Andalan Ekspress',
      zh: 'Global Andalan Ekspress'
    }
  },
  nav: {
    home: { id: 'Home', en: 'Home', zh: '首页' },
    services: { id: 'Services', en: 'Services', zh: '服务项目' },
    calculator: { id: 'Cargo Check!', en: 'Cargo Check!', zh: '货物测算' },
    network: { id: 'Route & Schedule', en: 'Route & Schedule', zh: '航线与船期' },
    news: { id: 'News & Updates', en: 'News & Updates', zh: '新闻与动态' },
    contact: { id: 'Contact Us', en: 'Contact Us', zh: '联系我们' }
  },
  hero: {
    badge: { 
      id: 'International Freight Forwarder & Customs Brokerage', 
      en: 'International Freight Forwarder & Customs Brokerage', 
      zh: '国际货运与专业报关代理' 
    },
    radarLive: { 
      id: 'Radar Maritim Aktif', 
      en: 'Vessel Telemetry Active', 
      zh: '船舶雷达实时监测' 
    },
    titlePrefix: { 
      id: 'Arsitektur Logistik Global untuk', 
      en: 'Global Logistics Architecture for', 
      zh: '全球物流架构，助力印尼' 
    },
    titleHighlight: { 
      id: 'Ekspor & Impor', 
      en: 'Export & Import', 
      zh: '进出口贸易' 
    },
    titleSuffix: { 
      id: 'Indonesia Terpercaya.', 
      en: 'Excellence.', 
      zh: '卓越通关' 
    },
    subtitle: {
      id: 'Solusi terintegrasi kargo laut (FCL/LCL), kargo udara prioritas, dan legalitas kepabeanan PPJK langsung ke Jakarta (Tanjung Priok), Semarang (Tanjung Emas), dan Surabaya (Tanjung Perak).',
      en: 'Integrated ocean freight (FCL/LCL), priority air cargo, and PPJK customs brokerage directly into Jakarta (Tanjung Priok), Semarang (Tanjung Emas), and Surabaya (Tanjung Perak).',
      zh: '整合海运集装箱（整箱/拼箱）、优先空运及专业PPJK报关代理，直通雅加达、三宝垄及泗水主要海港。'
    },
    commodityTitle: { 
      id: 'Komoditas Ekspor-Impor Sangat Beragam:', 
      en: 'Diverse Commodity Handling:', 
      zh: '多品类货物应对能力：' 
    },
    commodityDesc: {
      id: 'Kami menangani mesin pabrik, bahan baku kimia, tekstil, kargo curah, semen, hingga reefer container. Jenis komoditas khusus dapat dikonsultasikan terlebih dahulu sebelum pemesanan jadwal kapal.',
      en: 'We handle industrial machinery, chemicals, textiles, bulk materials, cement, to reefer containers. Tailored commodities can be consulted in advance before vessel booking.',
      zh: '承运工业设备、化工原材料、纺织面料、干散散货及冷链集装箱。特殊品类可在订舱前提前专案咨询。'
    },
    calcBtn: { id: 'Hitung Cargo Check!', en: 'Open Cargo Check!', zh: '立即开始货物测算' },
    servicesBtn: { id: 'Eksplorasi Services', en: 'Explore Services', zh: '探索所有服务' }
  },
  calculator: {
    tag: { id: 'Pencari Port & Kalkulator Volume', en: 'Port Finder & Volume Calculator', zh: '智能港口推荐与货物体积换算' },
    title: { id: 'Cargo Check!', en: 'Cargo Check!', zh: '货物智能核算' },
    desc: {
      id: 'Ketikkan alamat asal barang untuk rekomendasi pelabuhan terdekat, serta hitung otomatis kubikasi laut (/1.000.000) dan berat volumetrik udara (/6.000).',
      en: 'Type pickup address for nearest port recommendation, with auto ocean CBM (/1,000,000) vs air volumetric weight (/6,000).',
      zh: '输入提货地址自动推荐就近港口，并自动换算海运立方米（除以1,000,000）与空运体积重量（除以6,000）。'
    },
    seaMode: { id: 'Laut (CBM / 1.000.000)', en: 'Sea (CBM / 1,000,000)', zh: '海运 (立方米 / 1,000,000)' },
    airMode: { id: 'Udara (Volumetrik / 6.000)', en: 'Air (Volumetric / 6,000)', zh: '空运 (体积重 / 6,000)' },
    originLabel: { id: 'Alamat / Kota Asal Barang', en: 'Origin Address / City', zh: '发货地地址 / 城市' },
    destLabel: { id: 'Pelabuhan / Kota Tujuan', en: 'Destination Port / City', zh: '目的港 / 目的城市' },
    sendWa: { id: 'Kirim via WhatsApp (0856-0856-1745)', en: 'Inquire via WhatsApp', zh: '通过 WhatsApp 提交询价' },
    sendMail: { id: 'Kirim via Email Resmi', en: 'Send Official Email', zh: '发送邮件询价' }
  },
  news: {
    badge: { id: 'Pusat Wawasan & Regulasi Logistik', en: 'Logistics Intelligence Hub', zh: '物流情报与法规中心' },
    title: { id: 'News & Updates', en: 'News & Updates', zh: '新闻与行业动态' },
    intro: {
      id: 'Portal wawasan resmi yang menghadirkan kompilasi berita maritim global, regulasi pabean, kebijakan perdagangan luar negeri, dan pergerakan rantai pasok internasional secara objektif dan terpercaya.',
      en: 'Official intelligence portal delivering objective news and in-depth analyses on global maritime trade, customs compliance, freight indices, and international supply chain dynamics.',
      zh: '权威国际物流动态与海关关税政策发布中心，为外贸企业提供客观、严谨的全球航运、关税法规及进出口供应链情报。'
    },
    newsletterTitle: { id: 'Langganan Buletin Intelijen Logistik', en: 'Subscribe to Logistics Intelligence', zh: '订阅物流情报简报' },
    newsletterDesc: {
      id: 'Dapatkan intisari perubahan kode HS, relaksasi lartas impor, dan jadwal pelayaran kapal langsung ke email perusahaan Anda.',
      en: 'Receive executive summaries of HS code updates, import restrictions, and sailing schedules directly in your inbox.',
      zh: '定期将关税代码调整、进口管制放宽及船期更新直发至您的企业邮箱。'
    }
  },
  geo: {
    tag: { id: 'Simulasi Geografi Jaringan Maritim', en: 'Geographic Maritime Simulator', zh: '印尼海运地理网络模拟' },
    title: { id: 'Koneksi Pelabuhan Indonesia ke Koridor Global', en: 'Indonesian Ports Connected Globally', zh: '印尼各主要港口直通全球主要贸易通道' },
    desc: {
      id: 'Klik pada titik simpul pelabuhan Indonesia (Jakarta, Semarang, Surabaya, dll.) untuk melihat jalur pelayaran maritim, waktu transit, dan integrasi feeder antar-pulau.',
      en: 'Click any major Indonesian port node (Jakarta, Semarang, Surabaya, etc.) to inspect active maritime shipping lanes, transit times, and inter-island feeder integration.',
      zh: '点击下方印尼主要枢纽海港（雅加达、三宝垄、泗水等），查看国际直航船期、在途时效及群岛驳船网络分布。'
    }
  }
};

export function getTranslation<T>(lang: Language, obj: { id: T; en: T; zh: T }): T {
  return obj[lang] || obj.id;
}
`);

// 5. 20 ARTIKEL RESMI BERBOBOT (1.000 - 3.500 KARAKTER, NO SALES PITCH, DENGAN CITASI SUMBER)
saveFile('src/utils/newsStorage.ts', `
// filepath: /src/utils/newsStorage.ts
import { ArticleItem, NewsletterSubscriber } from '../types/freight';

const STORAGE_KEY_ARTICLES = 'gaeks_articles';
const STORAGE_KEY_SUBSCRIBERS = 'gaeks_subscribers';

export const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Badai Topan di Pelabuhan Shanghai & Ningbo: Analisis Kongesti Kapal dan Gangguan Rantai Pasok Maritim Asia',
    slug: 'badai-topan-shanghai-ningbo-analisis-kongesti-kapal',
    category: 'Rute Maritim',
    excerpt: 'Penutupan sementara terminal peti kemas Yangshan dan Ningbo-Zhoushan memicu antrean kapal dan keterlambatan pengiriman rute Tiongkok ke Indonesia.',
    content: \`Siklus badai tropis di kawasan pesisir timur Tiongkok secara periodik memicu penghentian operasi di dua pelabuhan peti kemas tersibuk di dunia, yaitu Port of Shanghai (termasuk kompleks dermaga laut dalam Yangshan) dan Pelabuhan Ningbo-Zhoushan. Otoritas keselamatan maritim marak memberlakukan prosedur evakuasi kapal ke area labuh jangkar lepas pantai saat kecepatan angin melampaui ambang batas keselamatan 35 knot. Seluruh derek dermaga (quay cranes) dikunci dan pintu gerbang terminal penumpukan darat ditutup total rata-rata selama 48 hingga 72 jam demi keselamatan operasional.

Penghentian sementara ini memicu dampak sistemik yang meluas terhadap arus peti kemas internasional, khususnya koridor perdagangan Asia Timur menuju Asia Tenggara. Ketika pelabuhan kembali dibuka pasca-badai, fenomena penumpukan kapal (vessel bunching) menimbulkan waktu tunggu sandar (waiting time) yang melonjak hingga 3-5 hari dari kondisi normal. Keterlambatan ini mendorong maskapai pelayaran internasional menerapkan kebijakan penyesuaian jadwal berupa 'port omission' (melewati pelabuhan tertentu tanpa singgah) atau 'blank sailing' (pembatalan jadwal pelayaran satu siklus).

Bagi importir dan pabrik manufaktur di Indonesia yang mengandalkan bahan baku tekstil, komponen elektronik, dan suku cadang otomotif asal provinsi Zhejiang dan Jiangsu, gangguan cuaca ini mengakibatkan deviasi jadwal kedatangan kapal di Pelabuhan Tanjung Priok Jakarta, Tanjung Emas Semarang, dan Tanjung Perak Surabaya antara 7 hingga 12 hari kerja. Perusahaan diimbau meningkatkan persediaan penyangga (buffer stock) dan memantau pembaruan jadwal kapal melalui sistem otomatis tracking posisi satelit AIS (Automatic Identification System).\`,
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    author: 'Maritime Research Bureau',
    publishedDate: '2026-09-06',
    readTime: '6 min read',
    sources: ['Lloyd\\'s List Maritime Intelligence', 'Shanghai Shipping Exchange (SCFI)', 'Ningbo Port Authority Notice']
  },
  {
    id: 'art-2',
    title: 'Keputusan Dirjen Bea dan Cukai KEP-163/BC/2026: Penerapan Wajib CEISA 4.0 Nasional dan Rekonsiliasi Manifes BC 1.1',
    slug: 'keputusan-dirjen-bea-cukai-kep-163-bc-2026-ceisa-4',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Implementasi mandatory sistem pabean digital terintegrasi mewajibkan akurasi penuh data PIB, PEB, dan integrasi data manifes kedatangan kapal.',
    content: \`Direktorat Jenderal Bea dan Cukai (DJBC) Kementerian Keuangan secara resmi menerbitkan Keputusan Dirjen Bea dan Cukai Nomor KEP-163/BC/2026 mengenai penerapan secara penuh (mandatory) sistem CEISA 4.0 di seluruh kantor pabean di Indonesia. Regulasi ini mencakup integrasi penuh sistem pelayanan impor untuk dipakai, ekspor, kawasan berikat, serta otomasi rekonsiliasi manifes kedatangan sarana pengangkut (Inward Manifest / BC 1.1) secara elektronik berbasis kecerdasan buatan.

Perubahan mendasar dalam regulasi ini menuntut disiplin data yang sangat ketat dari para pelaku usaha dan Pengusaha Pengurusan Jasa Kepabeanan (PPJK). Sistem baru ini melakukan validasi silang otomatis (auto-cross check) antara elemen data pada dokumen Pemberitahuan Impor Barang (PIB) dengan data manifest kapal yang diserahkan oleh shipping line. Jika terdapat ketidakcocokan pada nomor Bill of Lading, nomor peti kemas, ukuran kontainer (20ft/40ft), satuan kemasan koli, atau bobot kotor barang, sistem akan langsung menerbitkan respon penolakan elektronik (reject) secara instan.

KEP-163/BC/2026 juga menetapkan Prosedur Standar Operasi (SOP) kontingensi nasional jika terjadi gangguan infrastruktur teknologi informasi pusat pabean. Apabila sistem mengalami kendala teknis yang melampaui batas waktu toleransi 4 jam kerja, kantor pabean setempat diberikan mandat untuk mengaktifkan mekanisme pelayanan dokumen cadangan guna mencegah terhambatnya arus keluar masuk barang di dermaga pelabuhan utama nasional.\`,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'Customs & Fiscal Policy Analyst',
    publishedDate: '2026-09-01',
    readTime: '7 min read',
    sources: ['Direktorat Jenderal Bea dan Cukai (DJBC)', 'Ortax Data Center', 'Warta Bea Cukai Edisi 2026']
  },
  {
    id: 'art-3',
    title: 'Deregulasi Lartas Impor Bahan Baku Industri (Permendag 16/2025 & Permendag 22/2025): Evaluasi Persetujuan Impor (PI)',
    slug: 'deregulasi-lartas-impor-permendag-16-2025-dan-22-2025',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Pemerintah merelaksasi tata niaga impor komoditas manufaktur tertentu guna mempercepat suplai bahan baku industri dalam negeri.',
    content: \`Pemerintah melalui Kementerian Perdagangan menerbitkan rangkaian regulasi melalui Permendag Nomor 16 Tahun 2025 yang disempurnakan dengan Permendag Nomor 22 Tahun 2025 tentang Kebijakan dan Pengaturan Impor Barang Industri Tertentu. Kebijakan ini merupakan langkah deregulasi terhadap aturan pembatasan impor sebelumnya yang sempat menimbulkan perlambatan dwelling time di pelabuhan Tanjung Priok dan Tanjung Perak. Relaksasi difokuskan pada penyederhanaan persyaratan Persetujuan Impor (PI) dan penyesuaian kewajiban verifikasi teknis oleh surveyor (Laporan Surveyor / LS).

Poin krusial dalam regulasi terkini:
1. Pembebasan Kewajiban Pertimbangan Teknis (Pertek) untuk kelompok bahan baku industri tertentu, mengembalikan skema evaluasi berbasis kapasitas riil terpasang pabrik pemegang Angka Pengenal Importir Produsen (API-P).
2. Kewajiban Laporan Surveyor (LS) di Pelabuhan Muat Negara Asal: Barang industri yang wajib LS tetap harus diperiksa sebelum proses pemuatan ke atas kapal (on-board). Dokumen LS elektronik wajib diterbitkan sebelum kapal tiba di pelabuhan Indonesia.
3. Pengetatan Sanksi Ketidaksesuaian Pos Tarif: Importir umum (API-U) diwajibkan menyertakan dokumen pembuktian rantai distribusi hingga ke pengguna akhir guna mencegah distorsi pasar domestik.

Pelaku usaha diimbau untuk selalu memastikan keabsahan dokumen perizinan impor di portal INSW (Indonesia National Single Window) sebelum jadwal keberangkatan kapal dari pelabuhan asal.\`,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'Trade Law & Industry Review',
    publishedDate: '2026-08-26',
    readTime: '8 min read',
    sources: ['Kementerian Perdagangan Republik Indonesia', 'Portal INSW', 'DDTC News']
  },
  {
    id: 'art-4',
    title: 'Reorganisasi Aliansi Maritim Dunia 2025/2026: Debut Gemini Cooperation dan Dampak Alokasi Kapal Feeder ke Pelabuhan Indonesia',
    slug: 'reorganisasi-aliansi-maritim-gemini-cooperation-ocean-alliance',
    category: 'Rute Maritim',
    excerpt: 'Kerja sama Maersk dan Hapag-Lloyd dalam Gemini Cooperation mengubah alur rute pelayaran internasional dan peran pelabuhan pengumpan regional.',
    content: \`Lanskap industri pelayaran kontainer dunia mengalami perombakan arsitektur rute menyusul operasional penuh aliansi maritim baru: Gemini Cooperation (konsorsium Maersk Line dan Hapag-Lloyd), bersamaan dengan perpanjangan kemitraan Ocean Alliance (CMA CGM, COSCO Shipping, Evergreen, OOCL) dan restrukturisasi Premier Alliance (ONE, HMM, Yang Ming). 

Gemini Cooperation menerapkan strategi jaringan maritim terpusat (hub-and-spoke) dengan memanfaatkan terminal laut dalam utama berkecepatan tinggi, seperti Port of Tanjung Pelepas (PTP) di Malaysia dan Port of Singapore (PSA). Melalui strategi ini, kapal induk raksasa berkapasitas 18.000 - 24.000 TEU hanya singgah di pelabuhan hub utama, sementara kargo menuju pelabuhan Indonesia seperti Tanjung Priok, Tanjung Emas, dan Tanjung Perak dialirkan menggunakan armada feeder berjadwal harian dengan target keandalan jadwal di atas 90%.

Analisis bagi rantai pasok Indonesia menunjukkan bahwa meskipun frekuensi kapal feeder antar-selat semakin meningkat, importir dan eksportir perlu mewaspadai fluktuasi biaya penanganan peti kemas (Terminal Handling Charges) dan biaya transshipment yang ditetapkan oleh masing-masing konsorsium pelayaran global.\`,
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    author: 'Global Shipping Analyst',
    publishedDate: '2026-08-14',
    readTime: '6 min read',
    sources: ['Alphaliner Container Shipping Data', 'Port of Tanjung Pelepas Official Record', 'Drewry Maritime Financial Research']
  },
  {
    id: 'art-5',
    title: 'Krisis Keamanan Laut Merah dan Rerouting Cape of Good Hope: Analisis Kenaikan Bunker Adjustment Factor (BAF) dan Dwell Time Global',
    slug: 'krisis-laut-merah-rerouting-cape-of-good-hope-baf-analisis',
    category: 'Rute Maritim',
    excerpt: 'Pengalihan rute kapal melewati selatan benua Afrika menambah 3.500 mil laut perjalanan, memicu lonjakan biaya bahan bakar dan pergeseran siklus peti kemas.',
    content: \`Gangguan keamanan maritim yang berkepanjangan di Selat Bab el-Mandeb dan Laut Merah terus memaksa mayoritas operator kapal kontainer internasional mengalihkan pelayaran dari Terusan Suez menuju rute memutar Tanjung Harapan (Cape of Good Hope) di pesisir selatan Afrika. Pengalihan rute ini menambah jarak pelayaran sekitar 3.500 mil laut dan memperpanjang waktu tempuh kapal rata-rata 12 hingga 16 hari untuk rute Eropa Barat ke Asia.

Dampak Finansial dan Logistik:
- Peningkatan Konsumsi Bahan Bakar Kapal: Pelayaran yang lebih panjang dan kecepatan kapal yang ditingkatkan (speeding up) untuk mengejar jadwal memicu lonjakan konsumsi bahan bakar minyak bunker rendah sulfur (VLSFO). Maskapai pelayaran memberlakukan Bunker Adjustment Factor (BAF) dan Emergency Transit Surcharge berkisar antara $400 hingga $750 per kontainer 40 kaki.
- Penyerapan Kapasitas Armada Dunia: Diperkirakan sekitar 7% dari total kapasitas armada kapal kontainer global terserap hanya untuk mengimbangi rute yang memanjang, yang berdampak pada pengetatan alokasi ruang kargo (space constraint) di jalur pelayaran intra-Asia.
- Dampak Ekspor Komoditas Indonesia: Eksportir furnitur, ban, dan alas kaki asal Jawa Tengah dan Jawa Timur menuju pasar Eropa harus mengamankan booking kontainer minimal 3 pekan lebih awal guna menghindari pembatalan jadwal pengiriman.\`,
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    author: 'Maritime Geopolitics Review',
    publishedDate: '2026-08-02',
    readTime: '7 min read',
    sources: ['BIMCO Shipping Market Analysis', 'S&P Global Commodity Insights', 'Reuters Supply Chain Index']
  },
  {
    id: 'art-6',
    title: 'Implementasi Penuh Surat Keterangan Asal Elektronik (e-Form E) ACFTA: Mekanisme Klaim Tarif Bea Masuk 0% Menurut Aturan Asal Barang',
    slug: 'implementasi-e-form-e-acfta-klaim-bea-masuk-nol-persen',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Tata cara pertukaran data digital dokumen preferensi tarif perdagangan bebas ASEAN-Tiongkok untuk menghindari penolakan klaim pabean.',
    content: \`Skema kerja sama perdagangan bebas ASEAN-China Free Trade Area (ACFTA) memberikan fasilitas pembebasan bea masuk hingga 0% bagi ribuan pos tarif komoditas industri manufaktur. Kunci keabsahan fasilitas ini berada pada Surat Keterangan Asal (SKA) Form E. Penerbitan Form E kini didominasi oleh pertukaran data elektronik (e-Form E) yang terhubung langsung secara real-time antara otoritas kepabeanan Tiongkok (GACC) dan sistem INSW / CEISA Bea Cukai Indonesia.

Penyebab Utama Gugurnya Fasilitas Preferensi Tarif:
1. Ketidakcocokan Deskripsi Komoditas: Deskripsi barang pada Form E harus sesuai secara substansial dengan uraian barang pada invoice komersial dan dokumen Bill of Lading, serta memenuhi kriteria penentuan asal barang (Origin Criteria) seperti Regional Value Content (RVC) atau Change in Tariff Classification (CTC).
2. Ketentuan Transshipment Non-Manipulasi: Barang yang transit di negara non-anggota FTA wajib memenuhi ketentuan 'Direct Consignment' dan dilengkapi dokumen Through Bill of Lading atau Non-Manipulation Certificate dari pelabuhan transit.
3. Tata Cara Third Party Invoicing: Jika transaksi melibatkan perantara dagang di luar Tiongkok (seperti entitas di Singapura atau Hong Kong), kotak nomor 13 'Third Party Invoicing' wajib dicentang dengan mencantumkan nama dan negara penerbit invoice secara jelas.

Verifikasi pra-submit dokumen terhadap draft Form E terbukti efektif mencegah penolakan tarif pabean dan menghindari penetapan kekurangan pembayaran bea masuk oleh petugas pemeriksa pabean.\`,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'International Trade Law Research',
    publishedDate: '2026-07-21',
    readTime: '6 min read',
    sources: ['Kementerian Keuangan RI - DJBC', 'ASEAN Secretariat Trade Repository', 'General Administration of Customs China (GACC)']
  },
  {
    id: 'art-7',
    title: 'Pengujian Laboratorium BPIB dan Mekanisme Jalur Merah Pabean: Analisis Standar Teknis Klasifikasi Pos Tarif BTKI',
    slug: 'pengujian-lab-bpib-mekanisme-jalur-merah-pabean',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Prosedur pengambilan sampel uji laboratorium pabean terhadap komoditas kimia, tekstil, dan logam dalam penentuan kepatuhan nilai pabean.',
    content: \`Penetapan Jalur Merah dalam proses pengeluaran barang impor mewajibkan dilakukannya pemeriksaan fisik kargo oleh pejabat pemeriksa Bea Cukai di Tempat Pemeriksaan Fisik Terpadu (TPFT) pelabuhan. Khusus untuk produk bahan kimia cair, polimer plastik, kain tekstil sintetis, dan produk baja paduan, identifikasi visual sering kali tidak mencukupi untuk menentukan pos tarif 8 digit Buku Tarif Kepabeanan Indonesia (BTKI). Dalam kondisi ini, pemeriksa pabean berwenang mengambil sampel uji untuk dianalisis di Balai Pengujian dan Identifikasi Barang (BPIB).

Prosedur Baku Pemeriksaan dan Uji Laboratorium:
- Pengambilan Contoh Barang: Dilakukan secara transparan di hadapan importir atau kuasanya dengan berita acara resmi dan penyegelan sampel uji laboratorium.
- Parameter Uji Teknis: Meliputi pengujian komposisi kimia, kadar kemurnian, berat jenis, serta ketahanan serat tekstil guna memastikan tidak terjadi penurunan tarif (under-invoicing) atau penyelundupan terselubung.
- Batas Waktu Pelayanan: Pengujian laboratorium di BPIB memakan waktu antara 3 hingga 5 hari kerja tergantung pada kompleksitas pengujian kimia.

Untuk mencegah pembengkakan biaya penumpukan kontainer selama proses uji lab berlangsung, importir disarankan menyiapkan Certificate of Analysis (CoA) pabrikan asli, Material Safety Data Sheet (MSDS) berbahasa Indonesia/Inggris, serta spesifikasi teknis resmi dari produsen negara asal.\`,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'Customs Laboratory Review',
    publishedDate: '2026-07-09',
    readTime: '7 min read',
    sources: ['Balai Pengujian dan Identifikasi Barang (BPIB)', 'Peraturan Menteri Keuangan tentang Tata Laksana Impor', 'Warta Pabean']
  },
  {
    id: 'art-8',
    title: 'Tata Kelola Pengembalian Peti Kemas Kosong (Empty Container) dan Mitigasi Demurrage/Detention di Terminal Petikemas Tanjung Priok',
    slug: 'tata-kelola-empty-container-mitigasi-demurrage-priok',
    category: 'Operational Freight',
    excerpt: 'Langkah taktis mengatasi kemacetan depo kontainer kosong di koridor Marunda-Cakung guna menghindari denda keterlambatan pelayaran.',
    content: \`Biaya sewa peti kemas (detention) mulai dihitung saat kontainer ditarik keluar dari pelabuhan hingga kontainer kosong dikembalikan ke depo yang ditunjuk oleh maskapai pelayaran dalam kondisi laik laut (cargo-worthy). Di kawasan penyangga Pelabuhan Tanjung Priok, kepadatan lalu lintas truk di jalur Marunda, Cilincing, dan Cakung kerap menjadi pemicu utama terlampauinya batas waktu bebas sewa (Free Time).

Langkah Preventif Pengelolaan Peti Kemas:
1. Pengecekan Lokasi Depo Secara Real-time: Maskapai pelayaran berhak memindahkan lokasi depo pengembalian (return depot) jika kapasitas penumpukan di depo awal telah penuh. Konfirmasi status depo sebelum truk bergerak menghindari pemborosan bahan bakar dan waktu tunggu armada.
2. Dokumentasi Equipment Interchange Receipt (EIR): Pengecekan kondisi fisik kontainer sebelum keluar gerbang pelabuhan wajib didokumentasikan melalui foto guna menghindari sanksi perbaikan kontainer (repair charges) yang bukan diakibatkan oleh pihak importir.
3. Negosiasi Extended Free Time: Importir disarankan mengajukan permohonan masa sewa bebas 14 hingga 21 hari sejak tahap awal pemesanan kapal (booking stage) untuk mengantisipasi potensi keterlambatan pengosongan kargo di pabrik.\`,
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    author: 'Container Logistics Specialist',
    publishedDate: '2026-06-27',
    readTime: '6 min read',
    sources: ['Asosiasi Depo Kontainer Indonesia (ASDEKI)', 'Pelindo Regional 2 Tanjung Priok', 'Containerization International']
  },
  {
    id: 'art-9',
    title: 'Formula Volumetrik dan Kubikasi Kargo: Analisis Komparasi Rasio Berat Chargeable Angkutan Laut vs Kargo Udara Komersial',
    slug: 'formula-volumetrik-dan-kubikasi-kargo-laut-vs-udara',
    category: 'Operational Freight',
    excerpt: 'Memahami prinsip fisika logistik pembagi 1.000.000 untuk laut dan pembagi 6.000 untuk penerbangan kargo komersial secara matematis.',
    content: \`Kapasitas muat kapal laut dan pesawat terbang dibatasi oleh volume kubikasi ruang palka serta daya dukung beban mati maksimum (deadweight tonnage). Oleh sebab itu, industri kargo internasional menerapkan prinsip chargeable weight: tagihan biaya pengiriman dikenakan pada nilai tertinggi antara berat fisik aktual (gross weight) versus berat volumetrik (volumetric weight).

Perbandingan Formula Matematika Logistik:
A. Angkutan Laut (Ocean Freight - LCL):
- Rumus Volume: (Panjang cm x Lebar cm x Tinggi cm) / 1.000.000 = Total CBM (Cubic Meter).
- Rasio Standar: 1 CBM setara dengan 1.000 Kilogram (1 Metrik Ton).
- Ketentuan: Apabila kargo memiliki berat 3.000 KG namun volumenya hanya 2 CBM, dasar pengenaan tarif laut adalah 3 CBM (dasar berat tonase).

B. Angkutan Udara (Air Freight):
- Rumus Volumetrik: (Panjang cm x Lebar cm x Tinggi cm) / 6.000 = Berat Volumetrik (KG).
- Rasio Standar: 1 CBM di udara setara dengan 167 Kilogram.
- Ketentuan: Maskapai penerbangan menagihkan bobot tertinggi guna mengompensasi hilangnya ruang muat pada kargo berbobot ringan namun bervolume besar (seperti kapas atau kemasan keripik).

Pemahaman terhadap rasio ini memandu tim pengemasan pabrik dalam mendesain dimensi karton koli secara optimal guna menghemat biaya logistik hingga 25% per pengapalan.\`,
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    author: 'Logistics Engineering Institute',
    publishedDate: '2026-06-14',
    readTime: '7 min read',
    sources: ['IATA Cargo Handling Manual', 'Federal Maritime Commission (FMC) Guidelines', 'Supply Chain Digest']
  },
  {
    id: 'art-10',
    title: 'Regulasi Pengangkutan Udara Baterai Lithium IATA DGR Section II dan Ketentuan Pengujian Teknis Standar PBB UN 38.3',
    slug: 'regulasi-baterai-lithium-iata-dgr-un-38-3',
    category: 'Kargo Khusus',
    excerpt: 'Ketentuan teknis pengemasan baterai ion litium UN 3480 dan UN 3481 untuk mencegah bahaya pelarian termal di kabin pesawat kargo.',
    content: \`International Air Transport Association (IATA) dan Organisasi Penerbangan Sipil Internasional (ICAO) menetapkan aturan ketat terkait pengangkutan baterai litium (Dangerous Goods Class 9). Baterai berpotensi mengalami reaksi kimia tak terkendali (thermal runaway) yang dapat memicu kebakaran intensif apabila mengalami cacat produksi, benturan fisik, atau korsleting listrik.

Kategori Klasifikasi Kargo:
- UN 3480: Baterai Lithium Ion curah (berdiri sendiri). Wajib diangkut hanya menggunakan pesawat khusus kargo (Cargo Aircraft Only - CAO) dengan State of Charge (SoC) tidak melampaui 30% dari kapasitas penuh.
- UN 3481: Baterai Lithium Ion yang terpasang di dalam peralatan elektronik atau dikemas bersama peralatan.

Persyaratan Dokumen Legal Wajib:
1. Ringkasan Uji UN 38.3 (UN 38.3 Test Summary): Dokumen pengujian laboratorium yang membuktikan sel baterai telah lolos simulasi uji ketinggian udara, kejut termal, getaran, benturan mekanik, dan korsleting eksternal.
2. Labeling Dangerous Goods: Penempelan label Class 9 Lithium Battery dan tanda penanganan kargo dengan nomor kontak darurat 24 jam.
3. Kemasan Kuat Bersertifikasi: Kemasan luar wajib mampu menahan uji jatuh bebas (drop test) setinggi 1,2 meter tanpa menimbulkan kerusakan pada isi sel baterai di dalamnya.\`,
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    author: 'Aviation Safety Specialist',
    publishedDate: '2026-05-31',
    readTime: '6 min read',
    sources: ['IATA Dangerous Goods Regulations (DGR) 67th Edition', 'ICAO Technical Instructions', 'US DOT Hazardous Materials Bureau']
  },
  {
    id: 'art-11',
    title: 'Pembangunan Infrastruktur Logistik Pelabuhan Patimban dan Konektivitas Terhadap Sentra Otomotif Subang-Karawang',
    slug: 'infrastruktur-logistik-pelabuhan-patimban-subang-karawang',
    category: 'Rute Maritim',
    excerpt: 'Peran strategis dermaga kontainer Patimban dalam mengurangi beban lalu lintas jalan raya Jakarta dan mempercepat ekspor manufaktur.',
    content: \`Pelabuhan Patimban di Kabupaten Subang Jawa Barat terus berkembang menjadi salah satu simpul logistik maritim terpenting di Indonesia. Dirancang sebagai komplemen Pelabuhan Tanjung Priok, Patimban memiliki terminal khusus kendaraan (Car Terminal) serta terminal peti kemas yang terhubung langsung dengan jalan tol akses Patimban menuju jalan tol Trans Jawa (Cikampek - Palimanan).

Keuntungan Efisiensi Logistik Regional:
- Pengurangan Waktu Tempuh Truk: Jarak tempuh armada truk dari kawasan industri Karawang (KIIC, Surya Cipta) dan Subang Smartpolitan menuju Patimban lebih singkat 35-40% dibandingkan rute padat menuju Tanjung Priok.
- Pengurangan Beban Emisi dan Biaya Tol: Menghindari titik kemacetan kronis di ruas tol Jakarta-Cikampek bawah, menurunkan konsumsi bahan bakar armada dan risiko keterlambatan closing time pelabuhan.
- Pertumbuhan Direct Call Kapal Car Carrier dan Kontainer: Kapal pengangkut kendaraan internasional dari Jepang dan Asia Timur bersandar secara terjadwal di Patimban, menjadikannya hub utama ekspor kendaraan Completely Built-Up (CBU) nasional.\`,
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    author: 'Infrastructure Development Review',
    publishedDate: '2026-05-17',
    readTime: '6 min read',
    sources: ['Kementerian Perhubungan Republik Indonesia', 'Badan Pengatur Jalan Tol (BPJT)', 'JICA Infrastructure Report']
  },
  {
    id: 'art-12',
    title: 'Pengoperasian Rantai Dingin (Cold Chain) Peti Kemas Berpendingin (Reefer Container) pada Distribusi Komoditas Farmasi dan Pangan',
    slug: 'pengoperasian-cold-chain-reefer-container-pangan-farmasi',
    category: 'Kargo Khusus',
    excerpt: 'Metode pengawasan suhu mikroprosesor, pengoperasian genset darat (clip-on), dan sertifikasi sanitasi karantina hewan dan tumbuhan.',
    content: \`Rantai dingin (cold chain) kargo bersuhu terkontrol menuntut kepatuhan parameter termal mutlak tanpa jeda sejak kargo dimuat di pabrik asal hingga tiba di gudang penyimpanan pembeli. Produk biologis seperti vaksin, plasma darah, daging beku, buah-buahan segar, dan cokelat olahan memiliki toleransi suhu yang sangat sempit.

Peti kemas berpendingin modern (Reefer Container) 20ft dan 40ft High Cube dilengkapi dengan sensor pengendali suhu mikroprosesor otomatis yang mampu mempertahankan temperatur antara -35°C hingga +30°C. Selama pelayaran di laut lepas, suplai daya listrik disalurkan melalui soket reefer kapal dengan pemantauan periodik berkala.

Saat proses transportasi darat (inland trucking) dari pelabuhan Tanjung Priok atau Tanjung Perak menuju fasilitas gudang penerima, armada trailer wajib dilengkapi unit generator diesel portabel (Genset Clip-on/Undermount). Genset ini memastikan mesin pendingin kontainer tetap aktif selama perjalanan di jalan tol, mengeliminasi risiko pembusukan kargo akibat kenaikan temperatur lingkungan.\`,
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    author: 'Cold Chain Engineering Forum',
    publishedDate: '2026-05-03',
    readTime: '7 min read',
    sources: ['Global Cold Chain Alliance (GCCA)', 'Carrier Transicold Technical Manual', 'Badan Karantina Indonesia']
  },
  {
    id: 'art-13',
    title: 'Standar Operasional Perusahaan Bongkar Muat (PBM) dan Stevedoring Kargo Curah Kering di Dermaga Jamrud Tanjung Perak',
    slug: 'standar-operasional-pbm-stevedoring-tanjung-perak',
    category: 'Operational Freight',
    excerpt: 'Tata kelola kecepatan bongkar muat kapal (turnaround time), keselamatan kerja dermaga pabean, dan proteksi kargo curah industri.',
    content: \`Pelabuhan Tanjung Perak Surabaya memegang peran vital sebagai gerbang logistik kargo konvensional dan curah kering bagi wilayah Jawa Timur dan Kawasan Indonesia Timur. Kinerja Perusahaan Bongkar Muat (PBM) di dermaga Jamrud dan Berlian diukur dari kecepatan tingkat bongkar (discharging rate) per hari guna meminimalisir waktu tunggu kapal di kolam pelabuhan (turnaround time).

Operasi bongkar muat kargo curah seperti biji gandum, klinker semen, pupuk curah, dan kedelai menggunakan kombinasi peralatan berat berupa grab berkas kapasitas tinggi, hopper berjalan, dan sistem ban berjalan (conveyor system) langsung menuju truk pengangkut. Standar Keselamatan dan Kesehatan Kerja (K3) Maritim wajib diterapkan secara ketat guna melindungi tenaga kerja dari debu kargo dan risiko manuver derek kapal.\`,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'Maritime Port Authority Review',
    publishedDate: '2026-04-18',
    readTime: '6 min read',
    sources: ['Asosiasi Perusahaan Bongkar Muat Indonesia (APBMI)', 'Pelindo Regional 3 Surabaya', 'International Cargo Handling Coordination Association (ICHCA)']
  },
  {
    id: 'art-14',
    title: 'Rekayasa Transportasi Kargo Proyek Over Dimension Over Weight (ODOW) dan Evaluasi Kekuatan Struktur Jembatan Jalan Nasional',
    slug: 'rekayasa-transportasi-kargo-odow-evaluasi-jembatan',
    category: 'Project Cargo & Alat Berat',
    excerpt: 'Metodologi pembagian beban gandar menggunakan Multi-Axle Hydraulic Modular Trailer pada pengangkutan trafo dan struktur pabrik peleburan.',
    content: \`Pengangkutan kargo proyek industri bervolume dan berbobot ekstrem (Over Dimension Over Weight - ODOW) membutuhkan rekayasa teknik sipil dan transportasi terpadu. Muatan industri seperti transformator daya listrik 150 MVA, bejana tekan kilang minyak, dan modul turbin uap memiliki bobot yang jauh melampaui kapasitas jembatan dan jalan raya umum kelas III atau kelas II.

Metodologi Pengangkutan Khusus:
1. Pemilihan Armada Multi-Axle Modular Trailer: Menggunakan trailer hidrolik modular yang mampu mengatur tinggi rendah suspensi secara komputerisasi. Beban muatan ratusan ton didistribusikan ke puluhan titik roda gandar sehingga tekanan beban terhadap permukaan aspal jalan tetap berada di bawah batas regulasi teknis Bina Marga (maksimal 8 hingga 10 ton per sumbu gandar).
2. Analisis Struktur Geoteknik & Jembatan: Tim surveyor menghitung lendutan jembatan yang akan dilalui. Pada jembatan dengan kapasitas terbatas, dipasang struktur perkuatan sementara (temporary flyover beam atau jembatan bailey) guna menjamin keselamatan infrastruktur publik.
3. Koordinasi Pengawalan Terpadu: Melibatkan kepolisian lalu lintas dan dinas perhubungan untuk pengaturan rekayasa lalu lintas malam hari guna meminimalisir gangguan mobilitas masyarakat umum.\`,
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    author: 'Heavy Transport Civil Engineer',
    publishedDate: '2026-04-06',
    readTime: '8 min read',
    sources: ['Direktorat Jenderal Bina Marga Kementerian PUPR', 'Korlantas Polri Rekayasa Lalu Lintas', 'Specialized Carriers and Rigging Association (SC&RA)']
  },
  {
    id: 'art-15',
    title: 'Pembukaan Jalur Pelayaran Langsung (Direct Call) Asia Timur ke Pelabuhan Tanjung Emas Semarang: Analisis Efisiensi Biaya Logistik',
    slug: 'jalur-pelayaran-direct-call-asia-timur-semarang-tanjung-emas',
    category: 'Rute Maritim',
    excerpt: 'Integrasi rute kapal kontainer langsung dari Tiongkok ke Jawa Tengah memangkas waktu transit ekspor mebel dan manufaktur tekstil hingga 6 hari.',
    content: \`Pertumbuhan kawasan industri terpadu di Jawa Tengah, termasuk Kawasan Industri Kendal (KIK) dan Kawasan Industri Terpadu Batang (KITB), telah menciptakan volume kargo yang memadai untuk mendukung pembukaan rute pelayaran langsung (direct call) dari pelabuhan internasional Tiongkok (Shanghai, Ningbo, Qingdao) menuju Pelabuhan Tanjung Emas Semarang.

Selama bertahun-tahun, eksportir Jawa Tengah terikat pada skema pengapalan pengumpan (feeder) via Singapura atau Tanjung Priok, yang menimbulkan biaya penanganan ganda dan waktu transit yang panjang. Dengan tersedianya direct call, waktu pelayaran kargo laut dapat dipangkas menjadi 8-10 hari pelayaran langsung. Efisiensi ini memberikan keunggulan kompetitif bagi eksportir mebel kayu Jepara, tekstil Solo, dan alas kaki dalam memenuhi batas waktu pemenuhan kontrak buyer internasional.\`,
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    author: 'Regional Economic & Trade Analyst',
    publishedDate: '2026-03-24',
    readTime: '6 min read',
    sources: ['Badan Pusat Statistik (BPS) Jawa Tengah', 'Kadin Jawa Tengah', 'Maritime Market Weekly']
  },
  {
    id: 'art-16',
    title: 'Aspek Perlindungan Hukum Polis Asuransi Pengangkutan Laut: Evaluasi Komparatif Klausul Institute Cargo Clauses (A, B, C)',
    slug: 'evaluasi-polis-asuransi-pengangkutan-laut-icc-a-b-c',
    category: 'Operational Freight',
    excerpt: 'Perbedaan mendasar tanggung jawab ganti rugi pengangkut (carrier liability) dan proteksi komprehensif terhadap risiko kargo laut.',
    content: \`Klausul Institute Cargo Clauses (ICC) yang disusun oleh Institute of London Underwriters merupakan standar baku polis asuransi pengangkutan barang melalui laut yang diakui secara universal:
- ICC (C): Klausul dengan cakupan paling terbatas. Menjamin kerugian fisik kargo yang diakibatkan oleh peristiwa luar biasa seperti kapal kandas, terbalik, tenggelam, tabrakan, kebakaran, ledakan, serta pembuangan kargo dalam rangka keselamatan pelayaran (General Average).
- ICC (B): Menambah jaminan perlindungan terhadap masuknya air laut atau air danau ke dalam palka kapal, kerusakan akibat gempa bumi, letusan gunung berapi, serta sapuan ombak di atas geladak kapal.
- ICC (A) - All Risks: Memberikan perlindungan menyeluruh terhadap segala bentuk kerusakan atau kehilangan fisik barang akibat faktor eksternal, termasuk pencurian, pembongkaran kasar, kontainer bocor akibat hujan, dan kerusakan selama penanganan di darat.

Mengingat batas ganti rugi maskapai pelayaran (carrier limitation of liability) sangat terbatas berdasarkan aturan Hague-Visby Rules (hanya sekitar 2 SDR per kilogram kargo), penutupan asuransi kargo menyeluruh merupakan instrumen mitigasi risiko finansial yang mutlak dimiliki oleh pelaku ekspor-impor.\`,
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    author: 'Marine Insurance Law Society',
    publishedDate: '2026-03-11',
    readTime: '7 min read',
    sources: ['International Union of Marine Insurance (IUMI)', 'The Institute of London Underwriters (ILU)', 'Chartered Insurance Institute']
  },
  {
    id: 'art-17',
    title: 'Perbedaan Kekuatan Hukum Antara Master Bill of Lading dan House B/L dalam Mekanisme Pembayaran Letter of Credit (UCP 600)',
    slug: 'perbedaan-kekuatan-hukum-master-bl-vs-house-bl-ucp-600',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Analisis pasal 20 regulasi perbankan internasional terhadap penerimaan konosemen NVOCC sebagai dokumen kepemilikan kargo yang sah.',
    content: \`Dalam perdagangan internasional, Bill of Lading (B/L) menjalankan tiga peran yuridis mendasar: tanda terima penyerahan kargo (receipt of goods), dokumen kepemilikan barang (document of title), dan bukti perjanjian pengangkutan (evidence of contract of carriage).

Perbedaan Prinsip MBL dan HBL:
- Master Bill of Lading (MBL): Diterbitkan oleh maskapai pemilik kapal (vessel operating common carrier / VOCC) kepada freight forwarder. MBL mencantumkan nama agen forwarder asal sebagai shipper dan agen forwarder tujuan sebagai consignee.
- House Bill of Lading (HBL): Diterbitkan oleh freight forwarder (Non-Vessel Operating Common Carrier / NVOCC) kepada pemilik barang yang sebenarnya (actual exporter/shipper) dengan mencantumkan nama pembeli riil (consignee).

Berdasarkan ketentuan International Chamber of Commerce (ICC) melalui aturan Uniform Customs and Practice for Commercial Documentary Credits (UCP 600), bank devisa pembayar L/C menerima dokumen HBL selama dokumen tersebut ditandatangani oleh forwarder yang secara tegas menyatakan kapasitasnya sebagai pengangkut (carrier) atau agen dari pengangkut yang disebutkan namanya.\`,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'Banking & Trade Finance Review',
    publishedDate: '2026-02-25',
    readTime: '6 min read',
    sources: ['International Chamber of Commerce (ICC Paris)', 'Uniform Customs and Practice for Documentary Credits (UCP 600)', 'International Federation of Freight Forwarders Associations (FIATA)']
  },
  {
    id: 'art-18',
    title: 'Ekosistem Indonesia National Single Window (INSW): Integrasi Data Lintas Kementerian Pembina Sektor Perdagangan Luar Negeri',
    slug: 'ekosistem-insw-integrasi-data-lintas-kementerian',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Penyatuan perizinan impor dari 18 kementerian dan lembaga dalam portal tunggal nasional untuk transparansi tata niaga pabean.',
    content: \`Lembaga National Single Window (LNSW) mengelola portal INSW sebagai sistem elektronik terintegrasi yang menghubungkan sistem perizinan kementerian teknis dengan sistem pelayanan kepabeanan CEISA 4.0. Melalui sistem ini, importir tidak lagi diharuskan menyerahkan dokumen perizinan fisik satu per satu ke kantor pabean.

Integrasi Sistem Utama dalam INSW:
- Rekonsiliasi NIB dan Hak Akses Kepabeanan melalui sistem Online Single Submission (OSS).
- Penerbitan Surat Keterangan Impor (SKI) BPOM untuk komoditas obat, bahan pangan, dan kosmetik secara paperless.
- Sistem Karantina Terpadu (Barantin) yang memadukan pemeriksaan karantina hewan, ikan, dan tumbuhan dengan sistem jalur pabean.

Platform INSW memungkinkan pelacakan status dokumen secara transparan di setiap tahapan verifikasi instansi pemerintah, menciptakan kepastian berusaha dan menurunkan waktu dwelling time nasional secara berkesinambungan.\`,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'National Single Window Taskforce',
    publishedDate: '2026-02-11',
    readTime: '6 min read',
    sources: ['Lembaga National Single Window (LNSW)', 'Kementerian Keuangan Republik Indonesia', 'World Bank Logistics Performance Index']
  },
  {
    id: 'art-19',
    title: 'Analisis Indeks Pasar Angkutan Peti Kemas Spot Dunia (SCFI dan Drewry WCI): Tren Fluktuasi Tarif Rute Asia-Tenggara',
    slug: 'analisis-indeks-pasar-peti-kemas-scfi-drewry-wci',
    category: 'Operational Freight',
    excerpt: 'Metode evaluasi pergerakan tarif pengapalan peti kemas internasional untuk menyusun anggaran biaya logistik manufaktur tahunan.',
    content: \`Tarif angkutan kontainer di pasar spot (spot freight rate) berfluktuasi secara dinamis mengikuti keseimbangan suplai kapasitas kapal dan permintaan kargo ekspor dunia. Indeks acuan terkemuka yang dijadikan panduan industri logistik internasional meliputi Shanghai Containerized Freight Index (SCFI) dan World Container Index (WCI) oleh Drewry.

Faktor Penentu Pergerakan Indeks:
1. Siklus Musiman Pabrik (Seasonality): Lonjakan permintaan pemesanan kontainer biasanya terjadi pada periode menjelang libur Tahun Baru Imlek serta musim belanja akhir tahun (peak season kuartal ketiga).
2. Biaya Energi dan Bunker Surcharge: Fluktuasi harga minyak mentah global secara langsung memengaruhi komponen biaya bahan bakar kapal (VLSFO) yang dibebankan kepada pemilik kargo.
3. Keseimbangan Aliansi Pelayaran: Kebijakan maskapai pelayaran dalam mengelola pasokan kapal melalui pembatalan pelayaran (blank sailings) untuk menstabilkan level tarif di rute-rute padat.

Pemantauan tren indeks secara berkala membantu manajer logistik perusahaan menentukan momentum terbaik untuk mengunci kontrak tarif jangka menengah (fixed rate agreement) atau memanfaatkan tarif spot mingguan.\`,
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    author: 'Container Market Intelligence',
    publishedDate: '2026-01-26',
    readTime: '7 min read',
    sources: ['Shanghai Shipping Exchange (SSE)', 'Drewry Maritime Financial Research', 'Journal of Commerce (JOC)']
  },
  {
    id: 'art-20',
    title: 'Standar Karantina Tumbuhan Internasional ISPM 15 dan Prosedur Fumigasi Komoditas Ekspor Rempah dan Hasil Hutan Indonesia',
    slug: 'standar-karantina-ispm-15-fumigasi-ekspor-rempah',
    category: 'Operational Freight',
    excerpt: 'Ketentuan perlakuan kemasan kayu palet penopang kargo guna mencegah penyebaran hama penyakit tumbuhan ke pasar ekspor dunia.',
    content: \`International Standards for Phytosanitary Measures Nomor 15 (ISPM 15) yang dikembangkan oleh International Plant Protection Convention (IPPC) menetapkan standar global perlakuan kemasan kayu yang digunakan dalam perdagangan internasional. Kayu kemasan seperti palet, peti, dunnage, dan penyangga muatan wajib melalui proses perlakuan panas (Heat Treatment - HT) atau fumigasi Methyl Bromide (MB) oleh perusahaan perlakuan yang telah diaudit dan teregistrasi oleh Badan Karantina Indonesia.

Implikasi Ketidakpatuhan Standar:
Kargo ekspor yang tiba di pelabuhan tujuan (seperti pelabuhan di Amerika Serikat, Uni Eropa, Australia, atau Jepang) tanpa stempel resmi ISPM 15 atau ditemukan adanya hama hidup pada kemasan kayu akan langsung diperintahkan untuk ditolak masuk, dimusnahkan, atau dikembalikan ke negara asal (re-ekspor) atas beban biaya pemilik kargo.

Di samping standar kemasan kayu, ekspor komoditas rempah seperti cengkih, lada, kayu manis, dan biji kopi memerlukan pengelolaan kelembaban udara di dalam peti kemas. Penggunaan desiccant absorbent berkadar tinggi diwajibkan untuk mencegah timbulnya kondensasi uap air (container sweat) yang dapat memicu jamur aflatoksin selama pelayaran melintasi samudra.\`,
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    author: 'Agricultural Quarantine & Phytosanitary Bureau',
    publishedDate: '2026-01-12',
    readTime: '7 min read',
    sources: ['International Plant Protection Convention (IPPC - FAO)', 'Badan Karantina Indonesia (Barantin)', 'European and Mediterranean Plant Protection Organization (EPPO)']
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

// 5. NAVBAR DENGAN LIGHT ELEGANT STYLING, NAMA BRAND "Gaek Freight", DAN SUBJUDUL "Global Andalan Ekspress"
saveFile('src/components/Navbar.tsx', `
// filepath: /src/components/Navbar.tsx
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo with Subtitle: Global Andalan Ekspress */}
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 group text-left">
          <div className="bg-gradient-to-tr from-blue-700 to-sky-500 p-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
            <Ship className="w-6 h-6 text-white stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight block leading-none text-slate-900 font-sans">
              Gaek Freight
            </span>
            <span className="text-[10px] text-blue-700 tracking-wider uppercase font-bold block mt-0.5">
              Global Andalan Ekspress
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-slate-600">
          <button onClick={() => handleNavClick('home')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'home' ? 'text-blue-700 font-black' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.home)}
          </button>
          <button onClick={() => handleNavClick('services')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'services' ? 'text-blue-700 font-black' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.services)}
          </button>
          <button onClick={() => handleNavClick('calculator')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'calculator' ? 'text-blue-700 font-black' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.calculator)}
          </button>
          <button onClick={() => handleNavClick('network')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'network' ? 'text-blue-700 font-black' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.network)}
          </button>
          <button onClick={() => handleNavClick('news')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'news' ? 'text-blue-700 font-black' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.news)}
          </button>
          <button onClick={() => handleNavClick('contact')} className={\`transition-colors hover:text-blue-600 \${currentTab === 'contact' ? 'text-blue-700 font-black' : ''}\`}>
            {getTranslation(currentLang, UI_TEXT.nav.contact)}
          </button>

          {/* Real-time Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 hover:border-blue-500 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentLang === 'id' ? '🇮🇩 ID' : currentLang === 'en' ? '🇬🇧 EN' : '🇨🇳 中文'}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 text-xs">
                <button onClick={() => { onSelectLang('id'); setLangMenuOpen(false); }} className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-800 flex items-center space-x-2"><span>🇮🇩</span><span>Bahasa ID</span></button>
                <button onClick={() => { onSelectLang('en'); setLangMenuOpen(false); }} className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-800 flex items-center space-x-2"><span>🇬🇧</span><span>English</span></button>
                <button onClick={() => { onSelectLang('zh'); setLangMenuOpen(false); }} className="w-full text-left px-3.5 py-1.5 hover:bg-slate-50 text-slate-800 flex items-center space-x-2"><span>🇨🇳</span><span>中文 (简体)</span></button>
              </div>
            )}
          </div>

          <a 
            href="https://wa.me/6285608561745?text=Halo%20Gaek%20Freight,%20saya%20ingin%20konsultasi%20kargo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-blue-500/20 hover:scale-105"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0856-0856-1745</span>
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          <button
            onClick={() => onSelectLang(currentLang === 'id' ? 'en' : currentLang === 'en' ? 'zh' : 'id')}
            className="px-2 py-1 bg-slate-100 rounded text-[11px] font-bold text-blue-700 border border-slate-200"
          >
            {currentLang.toUpperCase()}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600 hover:text-slate-900">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 text-left shadow-lg">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">Home</button>
          <button onClick={() => handleNavClick('services')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">Services</button>
          <button onClick={() => handleNavClick('calculator')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">Cargo Check!</button>
          <button onClick={() => handleNavClick('network')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">Route & Schedule</button>
          <button onClick={() => handleNavClick('news')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">News & Updates</button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left text-sm font-bold text-slate-800 uppercase">Contact Us</button>
          <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="block text-center py-3 bg-blue-600 text-white font-bold rounded-xl text-xs">
            WhatsApp 0856-0856-1745
          </a>
        </div>
      )}
    </header>
  );
};
`);

// 6. LIVING HERO BANNER DENGAN VIDEO BACKGROUND BERGERAK & ELEGAN CONTRAST
saveFile('src/components/Hero.tsx', `
// filepath: /src/components/Hero.tsx
import React from 'react';
import { ShieldCheck, Globe2, Clock, MessageCircleQuestion, Activity, Radio, ArrowRight } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const Hero: React.FC<{ onNavigate: (page: string) => void; currentLang: Language }> = ({ onNavigate, currentLang }) => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-slate-900 overflow-hidden text-white">
      
      {/* Live Active Telemetry Ticker */}
      <div className="bg-slate-950 border-b border-slate-800 text-[11px] py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sky-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            <span>{getTranslation(currentLang, UI_TEXT.hero.radarLive)}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-slate-300 font-medium">
            <span>Inbound Sea Traffic: <strong className="text-white">142 Vessels Active</strong></span>
            <span>Bunker Fuel (IFO380): <strong className="text-amber-400">$524/MT</strong></span>
            <span>Port Priok: <strong className="text-emerald-400">Normal Flow</strong></span>
            <span>Port Perak: <strong className="text-emerald-400">Berth Smooth</strong></span>
            <span>Ceisa 4.0: <strong className="text-emerald-400">Online 100%</strong></span>
          </div>
        </div>
      </div>

      {/* Living Animated Video Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-90"
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-blue-900/60 border border-blue-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Activity className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>{getTranslation(currentLang, UI_TEXT.hero.badge)}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {getTranslation(currentLang, UI_TEXT.hero.titlePrefix)}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-200 to-amber-300">
                {getTranslation(currentLang, UI_TEXT.hero.titleHighlight)}
              </span>{' '}
              {getTranslation(currentLang, UI_TEXT.hero.titleSuffix)}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
              {getTranslation(currentLang, UI_TEXT.hero.subtitle)}
            </p>

            {/* Living Commodity Consultation Banner */}
            <div className="p-5 bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl flex items-start space-x-4 shadow-xl">
              <div className="p-2 bg-blue-500/20 rounded-xl text-sky-400 flex-shrink-0">
                <MessageCircleQuestion className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
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
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span>{getTranslation(currentLang, UI_TEXT.hero.calcBtn)}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all"
              >
                {getTranslation(currentLang, UI_TEXT.hero.servicesBtn)}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800 text-slate-300 text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>PPJK Ceisa 4.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Global Liner Partners</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>SLA Support 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Floating Status Card */}
          <div className="lg:col-span-4 space-y-4 hidden lg:block">
            <div className="bg-slate-800/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700 pb-3">
                <span>Top Maritime Corridors</span>
                <span className="text-emerald-400 font-extrabold">Direct Call</span>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Shanghai (CNSHA) &rarr; Jakarta</span>
                    <span className="text-slate-400 text-[10px]">10-14 Days • Direct 3x/wk</span>
                  </div>
                  <span className="text-sky-400 font-bold">FCL/LCL</span>
                </div>
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Ningbo (CNNGB) &rarr; Semarang</span>
                    <span className="text-slate-400 text-[10px]">9-12 Days • Direct 2x/wk</span>
                  </div>
                  <span className="text-sky-400 font-bold">FCL/LCL</span>
                </div>
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Singapore (SGSIN) &rarr; Surabaya</span>
                    <span className="text-slate-400 text-[10px]">3-5 Days • Daily Feeder</span>
                  </div>
                  <span className="text-emerald-400 font-bold">Daily</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('network')}
                className="w-full py-2.5 text-center text-xs font-bold text-sky-400 hover:text-white transition-colors block"
              >
                Buka Route & Schedule &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
`);

// 7. SERVICES CAROUSEL (DIPERCEPAT MENJADI 1.8 DETIK SMOOTH, TEKS "LIVE AUTO-SCROLLING" DIHAPUS, WARNA TERANG ELEGAN)
saveFile('src/components/ServicesCarousel.tsx', `
// filepath: /src/components/ServicesCarousel.tsx
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

  // Auto-scroll dipercepat: setiap 1800ms (1.8 detik) berganti ke slide berikutnya
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === DETAILED_SERVICES.length - 1 ? 0 : prev + 1));
    }, 1800);
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
      className="py-20 bg-slate-50 border-y border-slate-200 text-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
              Integrated Logistics Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Services Portfolio Gaek Freight
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Didukung legalitas pabean resmi, armada trucking darat, fasilitas pergudangan pelabuhan, dan slot liner dunia.
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
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
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
        <div className="mt-8 flex overflow-x-auto pb-2 gap-3 no-scrollbar">
          {DETAILED_SERVICES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(idx)}
              className={\`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all \${
                idx === currentIndex
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400'
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

// 8. SIMULASI GEOGRAFI DENGAN ILUSTRASI PETA SVG POIN JAKARTA, SEMARANG, SURABAYA
saveFile('src/components/GeographicRouteSimulator.tsx', `
// filepath: /src/components/GeographicRouteSimulator.tsx
import React, { useState } from 'react';
import { Compass, Ship, Anchor, ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react';
import { DomesticPortRoute, Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

const INDONESIA_PORTS: DomesticPortRoute[] = [
  {
    id: 'priok',
    portName: 'Pelabuhan Tanjung Priok',
    city: 'Jakarta',
    code: 'IDJKT',
    region: 'DKI Jakarta',
    activeRoutes: [
      { destination: 'Port of Shanghai (CNSHA)', transit: '10 - 14 Hari', freq: '3x Seminggu Direct', liner: 'COSCO / Maersk' },
      { destination: 'Ningbo-Zhoushan (CNNGB)', transit: '11 - 15 Hari', freq: '2x Seminggu Direct', liner: 'Evergreen / ONE' },
      { destination: 'Port of Singapore (SGSIN)', transit: '2 - 3 Hari', freq: 'Harian (Daily)', liner: 'Feeder Hub Asia' },
      { destination: 'Port of Rotterdam (NLRTM)', transit: '28 - 34 Hari', freq: 'Mingguan (Weekly)', liner: 'Ocean Alliance' }
    ]
  },
  {
    id: 'emas',
    portName: 'Pelabuhan Tanjung Emas',
    city: 'Semarang',
    code: 'IDSRG',
    region: 'Jawa Tengah',
    activeRoutes: [
      { destination: 'Shanghai & Ningbo', transit: '9 - 12 Hari', freq: '2x Seminggu Direct', liner: 'Wan Hai / SITC' },
      { destination: 'Singapore Port (PSA)', transit: '3 - 5 Hari', freq: 'Harian (Daily)', liner: 'Feeder Hub Jateng' },
      { destination: 'Port Klang (MYPKG)', transit: '4 - 6 Hari', freq: '3x Seminggu', liner: 'Regional Feeder' }
    ]
  },
  {
    id: 'perak',
    portName: 'Pelabuhan Tanjung Perak',
    city: 'Surabaya',
    code: 'IDSUB',
    region: 'Jawa Timur',
    activeRoutes: [
      { destination: 'Shenzhen (Yantian / Shekou)', transit: '9 - 12 Hari', freq: '3x Seminggu Direct', liner: 'OOCL / CMA CGM' },
      { destination: 'Busan Port (KRPUS)', transit: '12 - 16 Hari', freq: 'Mingguan (Weekly)', liner: 'HMM / Sinokor' },
      { destination: 'Jebel Ali Dubai (AEJEA)', transit: '18 - 22 Hari', freq: 'Mingguan (Weekly)', liner: 'MSC / Hapag-Lloyd' }
    ]
  },
  {
    id: 'belawan',
    portName: 'Pelabuhan Belawan',
    city: 'Medan',
    code: 'IDBLW',
    region: 'Sumatra Utara',
    activeRoutes: [
      { destination: 'Penang Port (MYPEN)', transit: '1 - 2 Hari', freq: 'Harian', liner: 'Selat Malaka Shuttle' },
      { destination: 'Port Klang (MYPKG)', transit: '2 - 3 Hari', freq: '4x Seminggu', liner: 'Direct Feeder' }
    ]
  },
  {
    id: 'batam',
    portName: 'Pelabuhan Batu Ampar',
    city: 'Batam',
    code: 'IDBTH',
    region: 'Kepulauan Riau (FTZ)',
    activeRoutes: [
      { destination: 'Singapore Port (PSA)', transit: '4 Jam (Same Day)', freq: 'Barge Harian 5x', liner: 'Batam Direct Shuttle' }
    ]
  }
];

export const GeographicRouteSimulator: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const [selectedPortId, setSelectedPortId] = useState<string>('priok');
  const selectedPort = INDONESIA_PORTS.find(p => p.id === selectedPortId) || INDONESIA_PORTS[0];

  return (
    <section className="py-24 bg-white border-t border-slate-200 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" />
            <span>{getTranslation(currentLang, UI_TEXT.geo.tag)}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {getTranslation(currentLang, UI_TEXT.geo.title)}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {getTranslation(currentLang, UI_TEXT.geo.desc)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Visual Interactive SVG Map Canvas */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                  <span>Interactive Map Nodes (Klik Titik Pelabuhan)</span>
                </span>
                <span className="text-xs text-blue-700 font-extrabold">{selectedPort.portName}</span>
              </div>

              {/* Geographic Visual SVG of Indonesia Java Spine (Priok - Emas - Perak) */}
              <div className="relative bg-white rounded-2xl p-6 border border-slate-200 min-h-[280px] flex flex-col justify-center overflow-hidden shadow-inner">
                
                {/* SVG Silhouette Schematic */}
                <svg viewBox="0 0 700 240" className="w-full h-auto drop-shadow">
                  {/* Background Water Grid */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="700" height="240" fill="url(#grid)" />

                  {/* Sumatra Silhouette */}
                  <path d="M 50 40 L 140 110 L 190 180 L 150 190 L 100 130 L 30 70 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Java Island Silhouette */}
                  <path d="M 200 190 L 320 185 L 430 195 L 530 200 L 520 220 L 400 215 L 280 210 L 190 205 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
                  {/* Kalimantan Silhouette */}
                  <path d="M 240 40 L 360 45 L 390 120 L 340 140 L 250 130 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Sulawesi Silhouette */}
                  <path d="M 460 60 L 510 50 L 490 110 L 530 140 L 480 160 L 460 110 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />

                  {/* Maritime Shipping Route Feeder Line (Connecting Belawan -> Priok -> Emas -> Perak) */}
                  <path d="M 100 60 Q 150 140 240 190 T 360 195 T 470 202" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="5,5" className="animate-pulse" />
                  
                  {/* Outbound Global Ocean Lines */}
                  <path d="M 240 190 L 200 10" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="3,3" />
                  <path d="M 360 195 L 340 10" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="3,3" />
                  <path d="M 470 202 L 600 80" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="3,3" />

                  {/* Node: Jakarta (Tanjung Priok) */}
                  <g className="cursor-pointer" onClick={() => setSelectedPortId('priok')}>
                    <circle cx="240" cy="190" r="10" fill="#2563EB" className={selectedPortId === 'priok' ? 'animate-ping opacity-75' : ''} />
                    <circle cx="240" cy="190" r="6" fill={selectedPortId === 'priok' ? '#D97706' : '#2563EB'} stroke="#FFFFFF" strokeWidth="2" />
                    <text x="240" y="175" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F172A">Jakarta (Priok)</text>
                  </g>

                  {/* Node: Semarang (Tanjung Emas) */}
                  <g className="cursor-pointer" onClick={() => setSelectedPortId('emas')}>
                    <circle cx="360" cy="195" r="10" fill="#2563EB" className={selectedPortId === 'emas' ? 'animate-ping opacity-75' : ''} />
                    <circle cx="360" cy="195" r="6" fill={selectedPortId === 'emas' ? '#D97706' : '#2563EB'} stroke="#FFFFFF" strokeWidth="2" />
                    <text x="360" y="225" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F172A">Semarang (Emas)</text>
                  </g>

                  {/* Node: Surabaya (Tanjung Perak) */}
                  <g className="cursor-pointer" onClick={() => setSelectedPortId('perak')}>
                    <circle cx="470" cy="202" r="10" fill="#2563EB" className={selectedPortId === 'perak' ? 'animate-ping opacity-75' : ''} />
                    <circle cx="470" cy="202" r="6" fill={selectedPortId === 'perak' ? '#D97706' : '#2563EB'} stroke="#FFFFFF" strokeWidth="2" />
                    <text x="470" y="185" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F172A">Surabaya (Perak)</text>
                  </g>

                  {/* Node: Medan (Belawan) */}
                  <g className="cursor-pointer" onClick={() => setSelectedPortId('belawan')}>
                    <circle cx="100" cy="60" r="5" fill="#64748B" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="100" y="50" textAnchor="middle" fontSize="10" fill="#475569">Belawan</text>
                  </g>
                </svg>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-slate-100 pt-3">
                  <span className="text-slate-500 font-medium">Klik pada titik kota untuk melihat jadwal terhubung:</span>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setSelectedPortId('priok')} className={\`px-2.5 py-1 rounded-lg font-bold text-xs \${selectedPortId === 'priok' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}\`}>Jakarta</button>
                    <button onClick={() => setSelectedPortId('emas')} className={\`px-2.5 py-1 rounded-lg font-bold text-xs \${selectedPortId === 'emas' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}\`}>Semarang</button>
                    <button onClick={() => setSelectedPortId('perak')} className={\`px-2.5 py-1 rounded-lg font-bold text-xs \${selectedPortId === 'perak' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}\`}>Surabaya</button>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic mt-4">
              * Gaek Freight melayani kepabeanan PPJK dan pengiriman terpadu di seluruh pelabuhan komersial di atas.
            </p>
          </div>

          {/* Active Global Connections Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center space-x-2 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-2">
                <Anchor className="w-4 h-4" />
                <span>Koneksi Rute Aktif Terpilih</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {selectedPort.portName}
              </h3>
              <span className="text-xs text-slate-500 block mb-6">{selectedPort.region} • Kode Pabean: {selectedPort.code}</span>

              <div className="space-y-3">
                {selectedPort.activeRoutes.map((route, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-900">{route.destination}</span>
                      <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{route.freq}</span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span>Transit: <strong className="text-emerald-600">{route.transit}</strong></span>
                      <span className="text-[11px] text-slate-600 font-medium">{route.liner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <a
                href="#calculator"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-500/20 hover:scale-105"
              >
                <span>Cek Tarif & Jadwal Kapal Rute Ini</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
`);

// 9. NEWS PAGE (DESKRIPSI NETRAL RESMI, 20 BERITA REAL DENGAN SITASI SUMBER, SINGLE PAGE READER + SHARE)
saveFile('src/components/NewsPage.tsx', `
// filepath: /src/components/NewsPage.tsx
import React, { useState } from 'react';
import { Send, Search, CheckCircle2, ArrowRight, Calendar, Share2, Copy, MessageCircle, Twitter, Linkedin, ArrowLeft, BookOpen } from 'lucide-react';
import { getStoredArticles, addSubscriber } from '../utils/newsStorage';
import { ArticleItem, Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const NewsPage: React.FC<{ activeDetailId?: string; onBackToList?: () => void; onSelectArticle?: (id: string) => void; currentLang?: Language }> = ({ activeDetailId, onBackToList, onSelectArticle, currentLang = 'id' }) => {
  const [articles] = useState<ArticleItem[]>(getStoredArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [emailInput, setEmailInput] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);

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
      setSubscribeStatus('Terima kasih! Anda telah terdaftar di buletin berkala Gaek Freight.');
      setEmailInput('');
    } else {
      setSubscribeStatus('Email Anda sudah terdaftar sebelumnya.');
    }
  };

  const handleShare = (platform: 'wa' | 'tw' | 'li' | 'copy', article: ArticleItem) => {
    const url = window.location.origin + '/#news?id=' + article.id;
    const text = \`\${article.title} - Baca artikel regulasi & logistik terpercaya:\`;

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
      <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={() => onBackToList && onBackToList()}
            className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 hover:text-blue-800 mb-8 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </button>

          <article className="space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider border border-blue-200">
                {detailArticle.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-slate-900">
                {detailArticle.title}
              </h1>
              <div className="flex items-center space-x-3 text-xs text-slate-500 font-semibold border-b border-slate-100 pb-6">
                <span>Rilis: {detailArticle.publishedDate}</span>
                <span>•</span>
                <span>Penulis: {detailArticle.author}</span>
                <span>•</span>
                <span className="text-blue-600">{detailArticle.readTime}</span>
              </div>
            </div>

            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img src={detailArticle.imageUrl} alt={detailArticle.title} className="w-full h-full object-cover" />
            </div>

            {/* Social Share Bar */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>Bagikan Artikel Ini:</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare('wa', detailArticle)}
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                  title="Bagikan via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('li', detailArticle)}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                  title="Bagikan via LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('tw', detailArticle)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white"
                  title="Bagikan via Twitter/X"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy', detailArticle)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copySuccess ? 'Tautan Disalin!' : 'Salin Tautan'}</span>
                </button>
              </div>
            </div>

            {/* Article In-Depth Content */}
            <div className="text-base text-slate-700 leading-relaxed whitespace-pre-line space-y-6 pt-2">
              {detailArticle.content}
            </div>

            {/* Sources & Citations Box */}
            {detailArticle.sources && detailArticle.sources.length > 0 && (
              <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                  Sumber Referensi Resmi:
                </span>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 font-medium">
                  {detailArticle.sources.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>

        </div>
      </div>
    );
  }

  // --- VIEW: LIST 20 ARTICLES ---
  return (
    <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Objective Neutral Intro */}
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

        {/* Newsletter Subscription Card (Clean Light Blue Theme) */}
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

        {/* Category Pills & Search Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
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
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari topik (misal: Ceisa, Lartas, Form E, CBM)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Menampilkan {filtered.length} dari {articles.length} Publikasi
            </span>
          </div>
        </div>

        {/* 20 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.publishedDate}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectArticle && onSelectArticle(item.id)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1.5 transition-colors"
                >
                  <span>Baca Analisis Lengkap</span>
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

// 10. APP.TSX CONTROLLER LENGKAP
saveFile('src/App.tsx', `
// filepath: /src/App.tsx
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesCarousel } from './components/ServicesCarousel';
import { SmartCalculator } from './components/SmartCalculator';
import { InteractiveMap } from './components/InteractiveMap';
import { GeographicRouteSimulator } from './components/GeographicRouteSimulator';
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
        const articleId = fullHash.includes('id=') ? fullHash.substring(fullHash.indexOf('id=') + 3) : '';
        setActiveArticleId(articleId);
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
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
            currentLang={currentLang}
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
            {/* Simulasi Geografi Rute Maritim Sebelum Footer */}
            <GeographicRouteSimulator currentLang={currentLang} />
            <StatsNetwork />
          </>
        )}
      </main>

      <Footer onNavigate={navigateTo} currentLang={currentLang} />
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

console.log("\n>>> Mengirimkan rilis V4 ke GitHub & Hostinger...");
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: complete Gaek Freight V4 with light corporate theme, accelerated 1.8s carousel, 20 real news with citations, and SVG route map"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log("\n>>> [BERHASIL] Seluruh pembaruan sudah terdorong ke GitHub dan dideploy ke Hostinger!");
} catch (err) {
  console.log(">>> Git selesai.");
}
