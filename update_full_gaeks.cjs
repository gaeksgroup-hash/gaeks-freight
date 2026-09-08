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

console.log(">>> Memulai perakitan seluruh komponen GAEKS FREIGHT V2...\n");

// 0. Bersihkan file lama
try {
  if (fs.existsSync('src/components/Calculator.tsx')) fs.unlinkSync('src/components/Calculator.tsx');
  if (fs.existsSync('src/components/Services.tsx')) fs.unlinkSync('src/components/Services.tsx');
} catch (e) {}

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

// 2. PORTS DATABASE
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
  { name: "Surabaya & Gresik", "port": "Pelabuhan Tanjung Perak", code: "IDSUB", country: "Indonesia", region: "Jawa Timur", gateway: "Surabaya (Tanjung Perak)", note: "Hub maritim internasional Jawa Timur & Kawasan JIIPE", keywords: ["surabaya", "gresik", "perak"] },
  { name: "Sidoarjo & Pasuruan", port: "Pelabuhan Tanjung Perak", code: "IDSUB", country: "Indonesia", region: "Jawa Timur", gateway: "Surabaya (Tanjung Perak)", note: "Akses kawasan PIER & Waru ke Tanjung Perak via Tol", keywords: ["sidoarjo", "pasuruan", "gempol"] },
  { name: "Malang & Kediri", port: "Pelabuhan Tanjung Perak", code: "IDSUB", country: "Indonesia", region: "Jawa Timur", gateway: "Surabaya (Tanjung Perak)", note: "± 90 km via Tol Pandaan-Malang ke Tanjung Perak", keywords: ["malang", "kediri", "blitar", "mojokerto"] },
  { name: "Medan & Belawan", port: "Pelabuhan Belawan", code: "IDBLW", country: "Indonesia", region: "Sumatra Utara", gateway: "Pelabuhan Belawan", note: "Pintu gerbang peti kemas internasional Sumatra Utara", keywords: ["medan", "belawan", "binjai"] },
  { name: "Batam", port: "Pelabuhan Batu Ampar", code: "IDBTH", country: "Indonesia", region: "Kepulauan Riau", gateway: "Batu Ampar (Batam)", note: "Free Trade Zone & koneksi feeder langsung Singapura", keywords: ["batam", "ampar"] },
  { name: "Lampung", port: "Pelabuhan Panjang", code: "IDPNJ", country: "Indonesia", region: "Lampung", gateway: "Pelabuhan Panjang", note: "Gerbang logistik ekspor hasil bumi Sumatra Selatan", keywords: ["lampung", "panjang"] },
  { name: "Shanghai", port: "Port of Shanghai (Yangshan)", code: "CNSHA", country: "China", region: "Asia Timur", gateway: "Jakarta / Surabaya Direct", note: "Pelabuhan tersibuk dunia, sailing direct 10-14 hari ke Indonesia", keywords: ["shanghai", "cnsha", "yangshan"] },
  { name: "Ningbo-Zhoushan", port: "Ningbo-Zhoushan Port", code: "CNNGB", country: "China", region: "Asia Timur", gateway: "Jakarta / Semarang / Surabaya", note: "Pusat industri manufaktur Zhejiang", keywords: ["ningbo", "zhoushan", "cnngb"] },
  { name: "Shenzhen (Yantian)", port: "Shenzhen Yantian / Shekou", code: "CNYTN", country: "China", region: "Asia Timur", gateway: "Jakarta / Surabaya Direct", note: "Hub kargo elektronik & gadget Tiongkok Selatan", keywords: ["shenzhen", "yantian", "shekou", "cnytn"] },
  { name: "Guangzhou (Nansha)", port: "Guangzhou Nansha Port", code: "CNNSA", country: "China", region: "Asia Timur", gateway: "Jakarta / Surabaya Direct", note: "Pusat manufaktur Guangdong", keywords: ["guangzhou", "nansha", "cnnsa", "canton"] },
  { name: "Qingdao", port: "Qingdao Port", code: "CNQDG", country: "China", region: "Asia Timur", gateway: "Jakarta (Tanjung Priok)", note: "Hub kargo komoditas dan industri Tiongkok Utara", keywords: ["qingdao", "cnqdg"] },
  { name: "Tianjin (Xingang)", port: "Tianjin Port", code: "CNTXG", country: "China", region: "Asia Timur", gateway: "Jakarta (Tanjung Priok)", note: "Gerbang laut maritim kawasan Beijing-Tianjin", keywords: ["tianjin", "xingang", "cntxg"] },
  { name: "Hong Kong", port: "Hong Kong Port (Kwai Chung)", code: "HKHKG", country: "Hong Kong", region: "Asia Timur", gateway: "Jakarta / Surabaya Direct", note: "Hub logistik bebas bea internasional", keywords: ["hong kong", "hongkong", "hkhkg"] },
  { name: "Busan", port: "Port of Busan", code: "KRPUS", country: "South Korea", region: "Asia Timur", gateway: "Jakarta / Surabaya Direct", note: "Pelabuhan transshipment terbesar Korea Selatan", keywords: ["busan", "krpus", "korea"] },
  { name: "Incheon", port: "Incheon Port", code: "KRINC", country: "South Korea", region: "Asia Timur", gateway: "Jakarta (Tanjung Priok)", note: "Gerbang laut kawasan metropolitan Seoul", keywords: ["incheon", "krinc", "seoul"] },
  { name: "Kaohsiung", port: "Kaohsiung Port", code: "TWKHH", country: "Taiwan", region: "Asia Timur", gateway: "Jakarta / Surabaya Direct", note: "Pelabuhan kontainer terbesar di Taiwan", keywords: ["kaohsiung", "twkhh", "taiwan"] },
  { name: "Tokyo & Yokohama", port: "Port of Tokyo / Yokohama", code: "JPTYO", country: "Japan", region: "Asia Timur", gateway: "Jakarta (Tanjung Priok) Direct", note: "Gerbang konsumsi & industri otomotif Jepang", keywords: ["tokyo", "yokohama", "jepang", "japan", "jptyo"] },
  { name: "Osaka & Kobe", port: "Port of Osaka / Kobe", code: "JPOSA", country: "Japan", region: "Asia Timur", gateway: "Jakarta / Surabaya", note: "Pusat industri wilayah Kansai", keywords: ["osaka", "kobe", "jposa", "jpukb"] },
  { name: "Singapore", port: "Port of Singapore (PSA)", code: "SGSIN", country: "Singapore", region: "Asia Tenggara", gateway: "Jakarta / Semarang / Surabaya (Daily)", note: "Hub transshipment utama Asia Tenggara, feeder harian", keywords: ["singapore", "singapura", "sgsin", "psa"] },
  { name: "Port Klang", port: "Port Klang (Northport/Westports)", code: "MYPKG", country: "Malaysia", region: "Asia Tenggara", gateway: "Jakarta / Belawan / Surabaya", note: "Pelabuhan utama Malaysia, koneksi feeder rutin", keywords: ["klang", "mypkg", "malaysia"] },
  { name: "Tanjung Pelepas", port: "Port of Tanjung Pelepas (PTP)", code: "MYTPP", country: "Malaysia", region: "Asia Tenggara", gateway: "Jakarta / Surabaya", note: "Hub transshipment Selat Malaka", keywords: ["pelepas", "mytpp", "johor"] },
  { name: "Ho Chi Minh (Cat Lai)", port: "Cat Lai Port", code: "VNSGN", country: "Vietnam", region: "Asia Tenggara", gateway: "Jakarta / Surabaya Direct", note: "Pusat manufaktur Vietnam Selatan", keywords: ["ho chi minh", "cat lai", "vietnam", "vnsgn"] },
  { name: "Hai Phong", port: "Hai Phong Port", code: "VNHPH", country: "Vietnam", region: "Asia Tenggara", gateway: "Jakarta (Tanjung Priok)", note: "Gerbang kargo Hanoi & Vietnam Utara", keywords: ["hai phong", "hanoi", "vnhph"] },
  { name: "Bangkok & Laem Chabang", port: "Laem Chabang Port", code: "THLCH", country: "Thailand", region: "Asia Tenggara", gateway: "Jakarta / Surabaya Direct", note: "Pelabuhan kontainer laut dalam terbesar Thailand", keywords: ["bangkok", "laem chabang", "thailand", "thlch"] },
  { name: "Manila", port: "Manila Port (MICT)", code: "PHMNL", country: "Philippines", region: "Asia Tenggara", gateway: "Jakarta / Surabaya", note: "Gerbang peti kemas utama Filipina", keywords: ["manila", "filipina", "philippines", "phmnl"] },
  { name: "Nhava Sheva (JNPT)", port: "Jawaharlal Nehru Port (JNPT)", code: "INNSA", country: "India", region: "Asia Selatan", gateway: "Jakarta / Surabaya Direct", note: "Pelabuhan peti kemas tersibuk India", keywords: ["nhava sheva", "jnpt", "mumbai", "innsa", "india"] },
  { name: "Mundra", port: "Mundra Port (Adani)", code: "INMUN", country: "India", region: "Asia Selatan", gateway: "Jakarta / Surabaya Direct", note: "Pelabuhan swasta komersial terbesar Gujarat", keywords: ["mundra", "inmun", "gujarat"] },
  { name: "Chennai", port: "Chennai Port", code: "INMAA", country: "India", region: "Asia Selatan", gateway: "Jakarta (Tanjung Priok)", note: "Hub ekspor otomotif & manufaktur India Selatan", keywords: ["chennai", "inmaa"] },
  { name: "Colombo", port: "Port of Colombo", code: "LKCMB", country: "Sri Lanka", region: "Asia Selatan", gateway: "Jakarta / Surabaya", note: "Hub transshipment strategis Samudra Hindia", keywords: ["colombo", "lkcmb", "sri lanka"] },
  { name: "Chittagong", port: "Chattogram Port", code: "BDCGP", country: "Bangladesh", region: "Asia Selatan", gateway: "Jakarta (Tanjung Priok)", note: "Pusat ekspor garmen & tekstil Bangladesh", keywords: ["chittagong", "chattogram", "bdcgp", "bangladesh"] },
  { name: "Jebel Ali (Dubai)", port: "Jebel Ali Port (DP World)", code: "AEJEA", country: "UAE", region: "Timur Tengah", gateway: "Jakarta / Surabaya Direct", note: "Pelabuhan kontainer terbesar di Timur Tengah", keywords: ["dubai", "jebel ali", "aejea", "uae", "emirates"] },
  { name: "Abu Dhabi (Khalifa)", port: "Khalifa Port", code: "AEKHL", country: "UAE", region: "Timur Tengah", gateway: "Jakarta / Surabaya", note: "Pelabuhan semi-otomatis tercanggih Teluk Arab", keywords: ["abu dhabi", "khalifa", "aekhl"] },
  { name: "Jeddah", port: "Jeddah Islamic Port", code: "SAJED", country: "Saudi Arabia", region: "Timur Tengah", gateway: "Jakarta (Tanjung Priok) Direct", note: "Pelabuhan terbesar Laut Merah Arab Saudi", keywords: ["jeddah", "saudi", "arab", "sajed"] },
  { name: "Dammam", port: "King Abdulaziz Port", code: "SADMM", country: "Saudi Arabia", region: "Timur Tengah", gateway: "Jakarta / Surabaya", note: "Pusat logistik Teluk Arab Saudi", keywords: ["dammam", "sadmm"] },
  { name: "Rotterdam", port: "Port of Rotterdam", code: "NLRTM", country: "Netherlands", region: "Eropa", gateway: "Jakarta / Surabaya Direct", note: "Pelabuhan terbesar di Eropa, transit 28-34 hari", keywords: ["rotterdam", "belanda", "netherlands", "nlrtm"] },
  { name: "Antwerp", port: "Port of Antwerp-Bruges", code: "BEANR", country: "Belgium", region: "Eropa", gateway: "Jakarta (Tanjung Priok)", note: "Hub industri petrokimia & kargo Eropa", keywords: ["antwerp", "belgia", "belgium", "beanr"] },
  { name: "Hamburg", port: "Port of Hamburg", code: "DEHAM", country: "Germany", region: "Eropa", gateway: "Jakarta (Tanjung Priok)", note: "Gerbang perdagangan maritim Jerman", keywords: ["hamburg", "jerman", "germany", "deham"] },
  { name: "Le Havre", port: "HAROPA Port (Le Havre)", code: "FRLEH", country: "France", region: "Eropa", gateway: "Jakarta (Tanjung Priok)", note: "Gerbang maritim utama Prancis", keywords: ["le havre", "prancis", "france", "frleh"] },
  { name: "Valencia", port: "Port of Valencia", code: "ESVLC", country: "Spain", region: "Eropa", gateway: "Jakarta (Tanjung Priok)", note: "Pelabuhan kontainer tersibuk di Mediterania", keywords: ["valencia", "spanyol", "spain", "esvlc"] },
  { name: "Felixstowe", port: "Port of Felixstowe", code: "GBFXT", country: "UK", region: "Eropa", gateway: "Jakarta (Tanjung Priok)", note: "Pelabuhan peti kemas terbesar di Inggris", keywords: ["felixstowe", "inggris", "uk", "gbfxt", "london"] }
], null, 2));

// 3. PORT FINDER LOGIC
saveFile('src/utils/portFinder.ts', `
// filepath: /src/utils/portFinder.ts
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

// 4. NEWS STORAGE & SEED
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

// 5. NAVBAR
saveFile('src/components/Navbar.tsx', `
// filepath: /src/components/Navbar.tsx
import React, { useState } from 'react';
import { Ship, Menu, X, ExternalLink, PhoneCall } from 'lucide-react';

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-navy/95 backdrop-blur-md border-b border-brand-darkBlue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button onClick={() => handleNavClick('home')} className="flex items-center space-x-3 group text-left">
          <div className="bg-brand-orange group-hover:bg-brand-orangeHover transition-colors p-2.5 rounded-xl shadow-lg shadow-brand-orange/20">
            <Ship className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider block leading-none">GAEKS FREIGHT</span>
            <span className="text-[10px] text-slate-400 tracking-widest uppercase font-semibold">GAEKS GROUP LOGISTICS</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-300">
          <button 
            onClick={() => handleNavClick('home')} 
            className={\`transition-colors hover:text-brand-orange \${currentTab === 'home' ? 'text-brand-orange font-bold' : ''}\`}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('services')} 
            className={\`transition-colors hover:text-brand-orange \${currentTab === 'services' ? 'text-brand-orange font-bold' : ''}\`}
          >
            7 Layanan Kargo
          </button>
          <button 
            onClick={() => handleNavClick('calculator')} 
            className={\`transition-colors hover:text-brand-orange \${currentTab === 'calculator' ? 'text-brand-orange font-bold' : ''}\`}
          >
            Kalkulator & Port
          </button>
          <button 
            onClick={() => handleNavClick('network')} 
            className={\`transition-colors hover:text-brand-orange \${currentTab === 'network' ? 'text-brand-orange font-bold' : ''}\`}
          >
            Peta Rute Global
          </button>
          <button 
            onClick={() => handleNavClick('news')} 
            className={\`transition-colors hover:text-brand-orange \${currentTab === 'news' ? 'text-brand-orange font-bold' : ''}\`}
          >
            Berita & Regulasi
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className={\`transition-colors hover:text-brand-orange \${currentTab === 'contact' ? 'text-brand-orange font-bold' : ''}\`}
          >
            Contact Us
          </button>
          
          <a 
            href="https://dgp.gaeks.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-1 text-xs bg-brand-darkBlue border border-brand-steel/50 px-3 py-1.5 rounded-full hover:border-brand-orange transition-all text-slate-200"
          >
            <span>DGP Digital</span>
            <ExternalLink className="w-3 h-3 text-brand-orange" />
          </a>

          <a 
            href="https://wa.me/6285608561745?text=Halo%20GAEKS%20Freight,%20saya%20ingin%20konsultasi%20kargo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md shadow-emerald-900/40"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>0856-0856-1745</span>
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-navy border-b border-brand-darkBlue px-6 py-6 space-y-4 text-left">
          <button onClick={() => handleNavClick('home')} className="block w-full text-left font-semibold text-slate-200">Home</button>
          <button onClick={() => handleNavClick('services')} className="block w-full text-left font-semibold text-slate-200">7 Layanan Kargo</button>
          <button onClick={() => handleNavClick('calculator')} className="block w-full text-left font-semibold text-slate-200">Kalkulator CBM & Port</button>
          <button onClick={() => handleNavClick('network')} className="block w-full text-left font-semibold text-slate-200">Peta Rute Global</button>
          <button onClick={() => handleNavClick('news')} className="block w-full text-left font-semibold text-slate-200">Berita & Regulasi</button>
          <button onClick={() => handleNavClick('contact')} className="block w-full text-left font-semibold text-slate-200">Contact Us</button>
          <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="block text-center py-2.5 bg-emerald-600 rounded-lg text-white font-bold text-xs">
            Hubungi WhatsApp 0856-0856-1745
          </a>
        </div>
      )}
    </header>
  );
};
`);

// 6. HERO COMPONENT DENGAN GAMBAR REPRESENTATIF
saveFile('src/components/Hero.tsx', `
// filepath: /src/components/Hero.tsx
import React from 'react';
import { ShieldCheck, Globe2, Clock, MessageCircleQuestion } from 'lucide-react';

export const Hero: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 bg-brand-navy overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/85" />

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
            Menghubungkan rantai pasok Anda langsung dari seluruh dunia ke <strong>Jakarta (Tanjung Priok)</strong>, <strong>Semarang (Tanjung Emas)</strong>, dan <strong>Surabaya (Tanjung Perak)</strong> dengan kepastian jadwal kapal, legalitas kepabeanan PPJK, dan armada trucking terintegrasi.
          </p>

          <div className="mt-6 p-4 bg-brand-darkBlue/80 border border-brand-orange/40 rounded-2xl flex items-start space-x-3 text-slate-200">
            <MessageCircleQuestion className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="text-white">Komoditas Sangat Beragam:</strong> Kami melayani bahan baku manufaktur, mesin industri, semen, tekstil, komoditas curah, hingga kargo bersuhu dingin (reefer). <span className="text-brand-orange font-semibold">Jenis komoditas khusus dapat dikonsultasikan terlebih dahulu sebelum pemesanan jadwal kapal.</span>
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

// 7. SERVICES CAROUSEL
saveFile('src/components/ServicesCarousel.tsx', `
// filepath: /src/components/ServicesCarousel.tsx
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
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-500">
              {currentIndex + 1} / {DETAILED_SERVICES.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-xl border border-brand-border bg-white text-brand-navy hover:bg-brand-navy hover:text-white transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-2xl shadow-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
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

      </div>
    </section>
  );
};
`);

// 8. SMART CALCULATOR
saveFile('src/components/SmartCalculator.tsx', `
// filepath: /src/components/SmartCalculator.tsx
import React, { useState, useEffect } from 'react';
import { 
  Calculator as CalcIcon, 
  Send, 
  Mail, 
  MapPin, 
  Ship, 
  Plane, 
  Scale, 
  Anchor
} from 'lucide-react';
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

  // Rumus Laut: (P x L x T / 1.000.000) * pieces = Total CBM
  const totalVolumeCbm = ((lengthCm * widthCm * heightCm) / 1000000) * pieces;
  const oceanWeightInTon = totalActualWeightKg / 1000;
  const oceanChargeableCbm = Math.max(totalVolumeCbm, oceanWeightInTon);
  const isOceanWeightDominant = oceanWeightInTon > totalVolumeCbm;

  // Rumus Udara: (P x L x T / 6.000) * pieces = Volumetric Weight KG
  const airVolumetricWeightKg = ((lengthCm * widthCm * heightCm) / 6000) * pieces;
  const airChargeableWeightKg = Math.max(totalActualWeightKg, airVolumetricWeightKg);
  const isAirVolumetricDominant = airVolumetricWeightKg > totalActualWeightKg;

  const buildSummaryText = () => {
    const portText = suggestedPort 
      ? \`Pelabuhan Terdekat yang Disarankan: \${suggestedPort.port} (\${suggestedPort.code}) - Gateway: \${suggestedPort.gateway}\`
      : 'Pelabuhan Terdekat: Mengikuti koordinat penjemputan';

    return \`*INQUIRY PENGIRIMAN KARGO - GAEKS FREIGHT*
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
    const url = \`https://wa.me/6285608561745?text=\${encodeURIComponent(text)}\`;
    window.open(url, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(\`[INQUIRY KARGO] \${companyName || 'Klien Baru'} - Rute \${originAddress} ke \${destinationCity}\`);
    const body = encodeURIComponent(buildSummaryText());
    window.location.href = \`mailto:Sales01@gaeks.com,info@gaeks.com?subject=\${subject}&body=\${body}\`;
  };

  return (
    <section id="calculator" className="py-20 bg-brand-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase mb-3">
            <CalcIcon className="w-4 h-4" />
            <span>Smart Port-Finder & Freight Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Pencari Port Terdekat & Kalkulator Kargo
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Ketikkan alamat asal barang Anda untuk rekomendasi pelabuhan terdekat, serta hitung otomatis kubikasi laut (/1.000.000) dan berat volumetrik udara (/6.000).
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-brand-border p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Pilih Moda Pengiriman
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode('ocean')}
                    className={\`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border flex items-center justify-center space-x-2 transition-all \${
                      mode === 'ocean' 
                        ? 'bg-brand-navy text-white border-brand-navy shadow-md' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }\`}
                  >
                    <Ship className="w-4 h-4 text-brand-orange" />
                    <span>Laut (CBM / 1.000.000)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('air')}
                    className={\`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border flex items-center justify-center space-x-2 transition-all \${
                      mode === 'air' 
                        ? 'bg-brand-navy text-white border-brand-navy shadow-md' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }\`}
                  >
                    <Plane className="w-4 h-4 text-brand-orange" />
                    <span>Udara (Volumetrik / 6.000)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. Lokasi Asal Barang (Sistem Smart Port)
                </label>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Alamat / Kota / Kawasan Industri Penjemputan</span>
                      <span className="text-[10px] text-brand-orange font-bold">Auto-suggest Port Aktif</span>
                    </div>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={originAddress}
                        onChange={(e) => setOriginAddress(e.target.value)}
                        placeholder="Ketik kota/alamat, contoh: Cikarang, Solo, Surabaya, Shanghai, Ningbo, Rotterdam..."
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  {suggestedPort && (
                    <div className="p-4 bg-brand-navy text-white rounded-2xl border border-brand-orange/40 space-y-1.5 shadow-md">
                      <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
                        <Anchor className="w-4 h-4" />
                        <span>Saran Pelabuhan Terdekat:</span>
                      </div>
                      <div className="text-base font-black text-white">
                        {suggestedPort.port} ({suggestedPort.code})
                      </div>
                      <div className="text-xs text-slate-300 flex flex-wrap gap-x-4">
                        <span>Negara/Wilayah: <strong className="text-white">{suggestedPort.country} ({suggestedPort.region})</strong></span>
                        <span>Gateway: <strong className="text-brand-orange">{suggestedPort.gateway}</strong></span>
                      </div>
                      <p className="text-[11px] text-slate-400 italic pt-1">
                        Catatan: {suggestedPort.note}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Pelabuhan / Kota Tujuan</label>
                    <input
                      type="text"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      placeholder="Contoh: Jakarta (Tanjung Priok), Semarang (Tanjung Emas), Surabaya (Tanjung Perak)..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  3. Dimensi Kargo per Koli (Centimeter)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold">Panjang (P) cm</span>
                    <input
                      type="number"
                      min="1"
                      value={lengthCm}
                      onChange={(e) => setLengthCm(Math.max(1, Number(e.target.value)))}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold">Lebar (L) cm</span>
                    <input
                      type="number"
                      min="1"
                      value={widthCm}
                      onChange={(e) => setWidthCm(Math.max(1, Number(e.target.value)))}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold">Tinggi (T) cm</span>
                    <input
                      type="number"
                      min="1"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Math.max(1, Number(e.target.value)))}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Koli (Pcs)</label>
                  <input
                    type="number"
                    min="1"
                    value={pieces}
                    onChange={(e) => setPieces(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Berat Fisik Aktual (KG/Pcs)</label>
                  <input
                    type="number"
                    min="1"
                    value={actualWeightKgPerPiece}
                    onChange={(e) => setActualWeightKgPerPiece(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Nama Perusahaan (Opsional)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="PT / CV..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Nama PIC Kontak</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Nama Anda..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

            </div>

            <div className="lg:col-span-5 bg-brand-navy rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                  <Scale className="w-4 h-4" />
                  <span>Kalkulasi Chargeable Basis</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-brand-darkBlue/70 p-4 rounded-xl border border-brand-steel/30">
                    <span className="text-xs text-slate-400 font-semibold block">Total Berat Fisik Aktual</span>
                    <div className="text-2xl font-black text-white mt-1">
                      {totalActualWeightKg.toLocaleString()} <span className="text-sm font-bold text-slate-400">KG</span>
                    </div>
                  </div>

                  {mode === 'ocean' ? (
                    <>
                      <div className="bg-brand-darkBlue/70 p-4 rounded-xl border border-brand-steel/30">
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
                          {isOceanWeightDominant 
                            ? 'Dihitung berdasarkan berat tonase (1 Ton = 1 CBM) karena bobot kargo melampaui kubikasi.' 
                            : 'Dihitung berdasarkan kubikasi murni kargo laut.'}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-brand-darkBlue/70 p-4 rounded-xl border border-brand-steel/30">
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
                          {isAirVolumetricDominant 
                            ? 'Dihitung dari berat volumetrik udara karena kargo bervolume besar namun ringan.' 
                            : 'Dihitung dari berat aktual kargo.'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <span className="text-xs text-slate-400 block font-semibold text-center">
                  Kirim Inquiry untuk Penawaran Tarif Resmi:
                </span>
                
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
                  className="w-full flex items-center justify-center space-x-2 bg-brand-darkBlue hover:bg-brand-steel border border-brand-steel/50 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all"
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

// 9. INTERACTIVE MAP
saveFile('src/components/InteractiveMap.tsx', `
// filepath: /src/components/InteractiveMap.tsx
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
    <section id="network" className="py-24 bg-brand-navy text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Global Corridors to Indonesia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Rute Pelayaran Dunia Langsung ke Jakarta, Semarang, & Surabaya
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Koneksi langsung dari pelabuhan manufaktur global utama dengan clearance cepat di 3 pelabuhan gerbang impor utama Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-7 bg-brand-darkBlue/70 border border-brand-steel/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-brand-steel/40 pb-4 mb-6">
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
                        : 'bg-brand-navy/80 text-slate-300 border border-brand-steel/40 hover:border-brand-orange/50'
                    }\`}
                  >
                    {route.originName} ({route.originCountry.split(' ')[0]})
                  </button>
                ))}
              </div>

              <div className="relative bg-brand-navy rounded-2xl p-6 border border-brand-steel/30 min-h-[260px] flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  
                  <div className="w-full sm:w-auto bg-brand-darkBlue p-4 rounded-xl border border-brand-orange/40 text-center sm:text-left">
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

                  <div className="w-full sm:w-auto bg-brand-darkBlue p-4 rounded-xl border border-emerald-500/40 text-center sm:text-left">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block">Pelabuhan Tujuan Bongkar</span>
                    <h4 className="text-lg font-black text-white">{selectedRoute.destinationPort.split(' ')[0]}</h4>
                    <span className="text-xs text-slate-400">
                      {getPortSubname(selectedRoute.destinationPort)}
                    </span>
                  </div>

                </div>

                <div className="mt-8 pt-6 border-t border-brand-steel/30 grid grid-cols-3 gap-2 text-center">
                  <div className={\`p-2 rounded-lg \${selectedRoute.destinationPort.includes('Jakarta') ? 'bg-brand-orange/20 border border-brand-orange' : 'bg-brand-darkBlue/50'}\`}>
                    <span className="text-[11px] font-bold block text-white">Jakarta</span>
                    <span className="text-[9px] text-slate-400">Tanjung Priok</span>
                  </div>
                  <div className={\`p-2 rounded-lg \${selectedRoute.destinationPort.includes('Semarang') ? 'bg-brand-orange/20 border border-brand-orange' : 'bg-brand-darkBlue/50'}\`}>
                    <span className="text-[11px] font-bold block text-white">Semarang</span>
                    <span className="text-[9px] text-slate-400">Tanjung Emas</span>
                  </div>
                  <div className={\`p-2 rounded-lg \${selectedRoute.destinationPort.includes('Surabaya') ? 'bg-brand-orange/20 border border-brand-orange' : 'bg-brand-darkBlue/50'}\`}>
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

          <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
                Estimasi Waktu & Frekuensi
              </span>
              <h3 className="text-2xl font-black text-brand-navy mb-6">
                {selectedRoute.originName} &rarr; {selectedRoute.destinationPort.split(' ')[0]}
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-brand-surface border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-brand-navy text-white rounded-lg">
                      <Ship className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-bold block">Ocean Transit Time</span>
                      <span className="text-base font-black text-brand-navy">{selectedRoute.seaTransitDays}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">FCL & LCL</span>
                </div>

                <div className="p-4 rounded-xl bg-brand-surface border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-brand-navy text-white rounded-lg">
                      <Plane className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-bold block">Air Freight Transit</span>
                      <span className="text-base font-black text-brand-navy">{selectedRoute.airTransitDays}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">Express Priority</span>
                </div>

                <div className="p-4 rounded-xl bg-brand-surface border border-slate-200">
                  <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Jadwal Keberangkatan:</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800">{selectedRoute.departureFreq}</div>
                </div>

                <div className="p-4 rounded-xl bg-brand-surface border border-slate-200">
                  <span className="text-xs text-slate-500 font-bold block mb-1">Komoditas Utama Koridor Ini:</span>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    {selectedRoute.commodities}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200">
              <a
                href="#calculator"
                className="w-full block text-center bg-brand-navy hover:bg-brand-darkBlue text-white py-3.5 px-4 rounded-xl font-bold text-sm transition-all shadow-md"
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

// 10. NEWS PAGE
saveFile('src/components/NewsPage.tsx', `
// filepath: /src/components/NewsPage.tsx
import React, { useState } from 'react';
import { Send, Search, CheckCircle2, ArrowRight } from 'lucide-react';
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

// 11. ADMIN CMS COMPONENT
saveFile('src/components/AdminCMS.tsx', `
// filepath: /src/components/AdminCMS.tsx
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
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(getSubscribers());

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

          <div className="lg:col-span-5 space-y-6">
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

// 12. CONTACT PAGE
saveFile('src/components/ContactPage.tsx', `
// filepath: /src/components/ContactPage.tsx
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
    const text = \`Halo GAEKS FREIGHT (gaeks.com), saya ingin konsultasi kargo:
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
    <section className="pt-32 pb-24 bg-brand-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange block mb-2">
            Hubungi GAEKS FREIGHT
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight">
            Konsultasi Rute, Kepabeanan, & Tarif Kargo
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Tim freight specialist kami siap merespons kebutuhan ekspor, impor, custom clearance PPJK, pergudangan PBM, hingga distribusi inland trucking Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-navy text-white rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-black border-b border-brand-darkBlue pb-4">
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
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed block">
                      Tanjung Priok (Jakarta), Tanjung Emas (Semarang), Tanjung Perak (Surabaya).
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Jam Operasional</span>
                    <span className="text-xs text-slate-200 block">
                      Senin - Sabtu: 08.00 - 18.00 WIB (Monitoring 24/7)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm flex items-center space-x-3 text-slate-700">
              <ShieldCheck className="w-6 h-6 text-brand-orange flex-shrink-0" />
              <p className="text-xs leading-relaxed">
                Kerahasiaan dokumen invoice, packing list, dan perizinan kepabeanan Anda dilindungi oleh kode etik PPJK resmi.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-brand-border p-8 sm:p-10 shadow-xl">
            <h3 className="text-2xl font-black text-brand-navy mb-2">Formulir Pertanyaan & Permintaan Tarif</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Kirimkan detail kebutuhan kargo Anda, tim kami akan merespons dalam 1x24 jam kerja.
            </p>

            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Perusahaan</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="PT / CV..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="0812xxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="email@perusahaan.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Layanan yang Dibutuhkan</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-brand-orange focus:outline-none bg-white"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Rincian Kargo / Komoditas</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Sebutkan rute pengiriman, jenis komoditas, perkiraan tonase/CBM, dan target waktu pengiriman..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
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
                  className="flex items-center justify-center space-x-2 bg-brand-navy hover:bg-brand-darkBlue text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all"
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

// 13. STATS NETWORK
saveFile('src/components/StatsNetwork.tsx', `
// filepath: /src/components/StatsNetwork.tsx
import React from 'react';
import { Anchor, Compass, Award, ShieldAlert } from 'lucide-react';

export const StatsNetwork: React.FC = () => {
  return (
    <section id="coverage" className="py-20 bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-brand-darkBlue pb-16">
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
            href="https://wa.me/6285608561745?text=Halo%20GAEKS%20Freight,%20saya%20ingin%20berdiskusi%20tentang%20proyek%20pengiriman%20kargo%20saya."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white hover:bg-slate-100 text-brand-navy px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg"
          >
            Hubungi Spesialis Kargo Kami
          </a>
        </div>
      </div>
    </section>
  );
};
`);

// 14. FOOTER
saveFile('src/components/Footer.tsx', `
// filepath: /src/components/Footer.tsx
import React from 'react';
import { Ship, Mail, Phone, MapPin, ExternalLink, Lock } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-navy border-t border-brand-darkBlue text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-orange p-2 rounded-lg text-white">
                <Ship className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white tracking-wider">GAEKS FREIGHT</span>
            </div>
            <p className="text-xs leading-relaxed">
              Solusi International Freight Forwarding, Custom Brokerage PPJK, Bongkar Muat PBM, Pergudangan, dan Domestic Trucking terintegrasi di bawah <strong>GAEKS GROUP</strong>.
            </p>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} GAEKS GROUP (gaeks.com). All rights reserved.
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">7 Layanan Kargo</h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">PPJK (Customs Clearance)</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Gudang & PBM</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Domestic Trucking</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-brand-orange">Project Cargo (ODOW)</button></li>
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
              <li>
                <a 
                  href="https://dgp.gaeks.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-1 text-brand-orange font-semibold hover:underline"
                >
                  <span>DGP (Digital Gaeks Product)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="flex items-center space-x-1 text-[11px] text-slate-500 hover:text-brand-orange transition-colors"
                >
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
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
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

// 15. MAIN APP CONTROLLER
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

console.log("\n>>> Menjalankan kompilasi aset produksi (npm run build)...");
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log(">>> [SUCCESS] Build produksi selesai tanpa error!");
} catch (err) {
  console.error(">>> [ERROR] Kompilasi gagal, periksa log di atas.");
  process.exit(1);
}

console.log("\n>>> Mengirimkan pembaruan ke GitHub (git push origin main)...");
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: complete interactive v2 with representative imagery, news, cms, and calculator"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log("\n>>> [BERHASIL] Seluruh pembaruan sudah terkirim ke GitHub dan sedang otomatis di-deploy ke Hostinger!");
} catch (err) {
  console.log(">>> Git commit/push selesai.");
}
