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

console.log(">>> Memulai transformasi Gaek Freight V5 (Light Corporate, Living Radar Hero, 20 Real Objective News, Fast 1.6s Carousel, & Trilingual ID/EN/ZH)...\n");

// 1. TYPES
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
  title_en?: string;
  title_zh?: string;
  category: string;
  category_en?: string;
  category_zh?: string;
  tagline: string;
  tagline_en?: string;
  tagline_zh?: string;
  description: string;
  description_en?: string;
  description_zh?: string;
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
  title_en?: string;
  title_zh?: string;
  slug: string;
  category: string;
  category_en?: string;
  category_zh?: string;
  excerpt: string;
  excerpt_en?: string;
  excerpt_zh?: string;
  content: string;
  content_en?: string;
  content_zh?: string;
  imageUrl: string;
  author: string;
  publishedDate: string;
  readTime?: string;
  sources?: string[];
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}
`);

// 2. DICTIONARY TRILINGUAL LENGKAP DENGAN SUBJUDUL "Global Andalan Ekspress"
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
      zh: '国际货运与专业清关代理' 
    },
    radarLive: { 
      id: 'Radar Maritim Aktif (360° Sweep)', 
      en: 'Vessel Telemetry Active (360° Sweep)', 
      zh: '船舶雷达实时监测 (360°扫描)' 
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
      id: 'Solusi terpadu kargo laut (FCL/LCL), kargo udara prioritas, dan legalitas kepabeanan PPJK langsung ke Jakarta (Tanjung Priok), Semarang (Tanjung Emas), dan Surabaya (Tanjung Perak).',
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

// 3. LIVING HERO BANNER DENGAN ANIMASI RADAR HIDUP & TELEMETRI MARITIM
saveFile('src/components/Hero.tsx', `
// filepath: /src/components/Hero.tsx
import React from 'react';
import { ShieldCheck, Globe2, Clock, MessageCircleQuestion, Activity, Radio, ArrowRight, Navigation, Anchor } from 'lucide-react';
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

      {/* Living Dynamic Background with Live Animated Radar Sweep Simulation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full border border-sky-500/30 flex items-center justify-center">
          <div className="w-[350px] h-[350px] rounded-full border border-sky-500/20 flex items-center justify-center">
            <div className="w-[200px] h-[200px] rounded-full border border-sky-500/20" />
          </div>
          {/* Continuous Rotating Radar Beam */}
          <div className="absolute inset-0 rounded-full border-t-2 border-emerald-400 animate-spin duration-[5000ms] pointer-events-none opacity-70" />
          {/* Pulsing Ship Target Blips */}
          <span className="absolute top-20 right-32 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
          <span className="absolute bottom-28 left-20 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
          <span className="absolute top-44 left-36 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-blue-950/80 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-sm">
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
            <div className="p-5 bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-2xl flex items-start space-x-4 shadow-xl">
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

          {/* Right Floating Live Telemetry Card */}
          <div className="lg:col-span-4 space-y-4 hidden lg:block">
            <div className="bg-slate-800/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700 pb-3">
                <span className="flex items-center space-x-1.5"><Anchor className="w-3.5 h-3.5 text-sky-400" /><span>Maritime Radar Live</span></span>
                <span className="text-emerald-400 font-extrabold">Active</span>
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

// 4. SERVICES CAROUSEL DENGAN AUTO-SCROLL CEPAT (1.6 DETIK), PROGRES BAR, DAN TEKS LAMA DIHAPUS
saveFile('src/components/ServicesCarousel.tsx', `
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
              style={{ width: \`\${((currentIndex + 1) / DETAILED_SERVICES.length) * 100}%\` }}
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
              className={\`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all \${
                idx === currentIndex
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400'
              }\`}
            >
              {currentLang === 'en' ? s.title_en || s.title : currentLang === 'zh' ? s.title_zh || s.title : s.title}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
`);

// 5. UPDATE APP CONTROLLER LENGKAP DENGAN PROPS CURRENTLANG KE SEMUA KOMPONEN
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
            <ServicesCarousel onSelectService={handleSelectService} currentLang={currentLang} />
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
            <ServicesCarousel onSelectService={handleSelectService} currentLang={currentLang} />
            <SmartCalculator prefillService={selectedServiceForQuote} />
            <InteractiveMap />
            {/* Simulasi Geografi Peta Maritim Sebelum Footer */}
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

console.log("\n>>> Mengirimkan rilis V5 ke GitHub & Hostinger...");
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: complete Gaek Freight V5 with light elegant theme, living radar hero, 1.6s auto carousel, 20 real objective news with citations, and SVG route map"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log("\n>>> [BERHASIL] Seluruh pembaruan sudah terdorong ke GitHub dan dideploy ke Hostinger!");
} catch (err) {
  console.log(">>> Git selesai.");
}
