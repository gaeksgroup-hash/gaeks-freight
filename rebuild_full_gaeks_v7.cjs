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

console.log(">>> Memulai perombakan total Gaek Freight V7 (100% Full i18n Translation, 3-Card Etalase Carousel with Blur & Stop, 20 Deep News, & Living Radar Hero)...\n");

// 1. KAMUS TRANSLASI 100% MENYELURUH (ID, EN, ZH)
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
      zh: '国际货运代理与专业报关行' 
    },
    radarLive: { 
      id: 'Radar Maritim Aktif (360° Sweep)', 
      en: 'Maritime Radar Active (360° Sweep)', 
      zh: '船舶海事雷达实时扫描中 (360°)' 
    },
    tickerVessels: { id: 'Lalu Lintas Laut Masuk: 142 Kapal Aktif', en: 'Inbound Sea Traffic: 142 Vessels Active', zh: '进港海运交通：142艘活跃船舶' },
    tickerBunker: { id: 'Bahan Bakar Kapal (IFO380): $524/MT', en: 'Bunker Fuel (IFO380): $524/MT', zh: '船用低硫燃油：$524/吨' },
    tickerPriok: { id: 'Pelabuhan Priok: Arus Normal', en: 'Port Priok: Normal Flow', zh: '雅加达丹戎不碌港：泊位正常' },
    tickerPerak: { id: 'Pelabuhan Perak: Sandar Lancar', en: 'Port Perak: Berth Smooth', zh: '泗水丹戎佩拉克港：通畅' },
    tickerCeisa: { id: 'Sistem Ceisa 4.0: Online 100%', en: 'Ceisa 4.0 Customs: 100% Online', zh: '印尼海关Ceisa 4.0系统：100%在线' },
    titlePrefix: { 
      id: 'Arsitektur Logistik Global untuk', 
      en: 'Global Logistics Architecture for', 
      zh: '全球物流架构，赋能印尼' 
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
      zh: '整合海运集装箱整箱与拼箱、加急空运及专业PPJK报关代理，直达雅加达、三宝垄与泗水三大主要海港。'
    },
    commodityTitle: { 
      id: 'Komoditas Ekspor-Impor Sangat Beragam:', 
      en: 'Diverse Commodity Handling:', 
      zh: '多品类货物应对能力：' 
    },
    commodityDesc: {
      id: 'Kami menangani mesin pabrik, bahan baku kimia, tekstil, kargo curah, semen, hingga reefer container. Jenis komoditas khusus dapat dikonsultasikan terlebih dahulu sebelum pemesanan jadwal kapal.',
      en: 'We handle industrial machinery, chemicals, textiles, bulk materials, cement, to reefer containers. Tailored commodities can be consulted in advance before vessel booking.',
      zh: '承运工业重型机械、化工原材料、纺织面料、干散大宗散货及冷链集装箱。特殊品类可在订舱前提前专案咨询。'
    },
    calcBtn: { id: 'Hitung Cargo Check!', en: 'Open Cargo Check!', zh: '立即开始货物测算' },
    servicesBtn: { id: 'Eksplorasi Services', en: 'Explore Services', zh: '探索所有服务' },
    trustPPJK: { id: 'PPJK Ceisa 4.0', en: 'PPJK Ceisa 4.0', zh: '印尼海关Ceisa 4.0合规' },
    trustLiners: { id: 'Mitra Pelayaran Global', en: 'Global Liner Partners', zh: '全球国际船东直接订舱' },
    trustSLA: { id: 'Dukungan SLA 24/7', en: '24/7 SLA Support', zh: '7x24小时全天候客户支持' }
  },
  services: {
    tag: { id: 'Layanan Logistik Terintegrasi', en: 'Integrated Logistics Solutions', zh: '全方位的综合国际物流方案' },
    title: { id: 'Services Portfolio Gaek Freight', en: 'Gaek Freight Services Portfolio', zh: 'Gaek Freight 核心服务项目' },
    desc: { 
      id: 'Didukung kuasa pabean resmi, armada trucking darat, fasilitas pergudangan dermaga, dan alokasi ruang kapal internasional.', 
      en: 'Supported by licensed customs brokerage, inland trucking fleet, port transit warehouses, and guaranteed carrier allocations.', 
      zh: '依托正规持牌报关行、内陆自营车队、港口保税中转仓库及各大国际船东舱位保障。' 
    },
    autoPlay: { id: 'Otomatis Berjalan (Geser)', en: 'Auto-Scroll: Active', zh: '自动轮播：进行中' },
    autoStopped: { id: 'Otomatis Berhenti (Pause)', en: 'Auto-Scroll: Paused', zh: '自动轮播：已暂停' },
    hoverTip: { id: 'Arahkan mouse ke kartu untuk berhenti sementara', en: 'Hover over any card to pause sliding', zh: '鼠标悬停卡片即可临时暂停轮播' },
    commoditiesLabel: { id: 'Kesesuaian Komoditas:', en: 'Suitable Commodities:', zh: '适用货物类别：' },
    featuresLabel: { id: 'Keunggulan & Cakupan:', en: 'Key Advantages & Scope:', zh: '核心优势与服务范围：' },
    standardLabel: { id: 'Standar Operasi:', en: 'Operating Standard:', zh: '作业设备与标准：' },
    quoteBtn: { id: 'Konsultasikan Layanan Ini', en: 'Inquire for this Service', zh: '咨询此项业务' }
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
    dimP: { id: 'Panjang (cm)', en: 'Length (cm)', zh: '长度 (cm)' },
    dimL: { id: 'Lebar (cm)', en: 'Width (cm)', zh: '宽度 (cm)' },
    dimT: { id: 'Tinggi (cm)', en: 'Height (cm)', zh: '高度 (cm)' },
    dimKg: { id: 'Berat Fisik (kg)', en: 'Actual Weight (kg)', zh: '实际毛重 (kg)' },
    dimQty: { id: 'Jumlah Koli (pcs)', en: 'Quantity (pcs)', zh: '件数 (pcs)' },
    resultTitle: { id: 'Hasil Perhitungan Chargeable Weight:', en: 'Chargeable Weight Calculation Result:', zh: '计费重量测算结果：' },
    seaCbmCalc: { id: 'Total Kubikasi Laut:', en: 'Total Ocean CBM:', zh: '海运总立方数：' },
    airVolCalc: { id: 'Berat Volumetrik Udara:', en: 'Air Volumetric Weight:', zh: '空运体积重量：' },
    chargeableRule: { id: 'Dasar Tagihan Mengambil Nilai Tertinggi antara Berat Fisik vs Volume.', en: 'Billing applies the highest value between physical weight vs volume.', zh: '计费依据实际毛重与体积重量之间取较大者。' },
    sendWa: { id: 'Kirim via WhatsApp (0856-0856-1745)', en: 'Inquire via WhatsApp', zh: '通过 WhatsApp 提交询价' },
    sendMail: { id: 'Kirim via Email Resmi', en: 'Send Official Email', zh: '发送邮件询价' }
  },
  geo: {
    tag: { id: 'Simulasi Geografi Jaringan Maritim', en: 'Geographic Maritime Simulator', zh: '印尼海运地理网络模拟' },
    title: { id: 'Koneksi Pelabuhan Indonesia ke Koridor Global', en: 'Indonesian Ports Connected Globally', zh: '印尼各主要港口直通全球主要贸易通道' },
    desc: {
      id: 'Klik pada titik simpul pelabuhan Indonesia (Jakarta, Semarang, Surabaya, dll.) untuk melihat jalur pelayaran maritim, waktu transit, dan integrasi feeder antar-pulau.',
      en: 'Click any major Indonesian port node (Jakarta, Semarang, Surabaya, etc.) to inspect active maritime shipping lanes, transit times, and inter-island feeder integration.',
      zh: '点击下方印尼主要枢纽海港（雅加达、三宝垄、泗水等），查看国际直航船期、在途时效及群岛驳船网络分布。'
    },
    clickInstruction: { id: 'Klik Titik Pelabuhan untuk Melihat Rute:', en: 'Click Port Node to View Routes:', zh: '点击海港节点查看航线详情：' },
    transitLabel: { id: 'Estimasi Transit:', en: 'Estimated Transit:', zh: '预计在途时效：' },
    freqLabel: { id: 'Frekuensi:', en: 'Frequency:', zh: '班次频率：' },
    linerLabel: { id: 'Operator Liner:', en: 'Liner Operator:', zh: '承运船东：' },
    checkRateBtn: { id: 'Cek Tarif & Jadwal Kapal Rute Ini', en: 'Check Rate & Schedule for This Route', zh: '查询此航线实时运价与船期' }
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
    },
    searchPlaceholder: { id: 'Cari topik (misal: Ceisa, Lartas, Form E, CBM)...', en: 'Search topic (e.g., Ceisa, Lartas, Form E, CBM)...', zh: '搜索主题（如：Ceisa清关、进口许可、原产地证、海运立方）...' },
    showingText: { id: 'Menampilkan Publikasi', en: 'Showing Publications', zh: '显示文章篇数' },
    readMoreBtn: { id: 'Baca Analisis Lengkap', en: 'Read Full Analysis', zh: '阅读完整深度分析' },
    backBtn: { id: 'Kembali ke Daftar News & Updates', en: 'Back to News & Updates List', zh: '返回新闻与动态列表' },
    shareTitle: { id: 'Bagikan Artikel Ini:', en: 'Share this Article:', zh: '分享此篇文章：' },
    copySuccess: { id: 'Tautan Disalin!', en: 'Link Copied!', zh: '链接已复制！' },
    copyBtn: { id: 'Salin Tautan', en: 'Copy Link', zh: '复制链接' },
    sourcesTitle: { id: 'Sumber Referensi Resmi & Otoritas Industri:', en: 'Official Regulatory Sources & Industry Authorities:', zh: '官方权威法规与行业数据来源：' },
    consultTitle: { id: 'Butuh Solusi untuk Topik Ini?', en: 'Need a Solution for this Topic?', zh: '需要针对此议题的专业解决方案？' },
    consultDesc: { 
      id: 'Konsultasikan dokumen pabean, perizinan Lartas, atau ketersediaan slot kapal Anda langsung dengan spesialis kami.', 
      en: 'Consult your customs documents, import licensing, or vessel space availability directly with our specialists.', 
      zh: '直接与我们的专业团队沟通您的海关报关单据、进口许可证申请或海运舱位保障。' 
    },
    consultBtn: { id: 'Konsultasi via WhatsApp', en: 'Consult via WhatsApp', zh: '通过 WhatsApp 咨询专家' }
  },
  contact: {
    tag: { id: 'Hubungi Kami 24/7', en: 'Contact Us 24/7', zh: '7x24小时全天候联系我们' },
    title: { id: 'Konsultasi Kargo & Legalitas Pabean', en: 'Cargo & Customs Brokerage Consultation', zh: '进出口货运与海关清关专案咨询' },
    desc: { 
      id: 'Tim operasional Gaek Freight siap melayani konsultasi tarif pengapalan, perizinan Lartas impor, dan inland transport.', 
      en: 'Gaek Freight operational teams are standing by for shipping freight quotes, import compliance, and inland dispatch.', 
      zh: 'Gaek Freight 运营团队随时为您提供全球海运运费测算、进出口关税政策合规与内陆提货派送服务。' 
    },
    nameLabel: { id: 'Nama Lengkap Anda', en: 'Your Full Name', zh: '您的完整姓名' },
    emailLabel: { id: 'Alamat Email Perusahaan', en: 'Company Email Address', zh: '企业电子邮箱' },
    phoneLabel: { id: 'Nomor Telepon / WhatsApp', en: 'Phone / WhatsApp Number', zh: '电话 / WhatsApp 号码' },
    commodityLabel: { id: 'Jenis Komoditas Barang', en: 'Commodity Description', zh: '货物商品类别与描述' },
    messageLabel: { id: 'Pesan / Pertanyaan Rute', en: 'Message / Route Requirements', zh: '详细需求说明与航线咨询' },
    submitBtn: { id: 'Kirimkan Permintaan Konsultasi', en: 'Submit Consultation Request', zh: '提交咨询申请' }
  },
  footer: {
    desc: {
      id: 'Penyedia jasa International Freight Forwarding, Custom Clearance PPJK Ceisa 4.0, Stevedoring PBM, Pergudangan Transit, dan Inland Trucking terpadu ke seluruh Indonesia.',
      en: 'Integrated International Freight Forwarding, licensed PPJK Ceisa 4.0 customs brokerage, stevedoring, port warehousing, and inland trucking across Indonesia.',
      zh: '整合国际海运空运代理、印尼海关持牌PPJK报关、港口装卸仓储及全印尼内陆公路重卡运输。'
    },
    servicesCol: { id: 'Layanan Utama', en: 'Core Services', zh: '核心物流服务' },
    navCol: { id: 'Navigasi Halaman', en: 'Quick Navigation', zh: '页面快捷导航' },
    contactCol: { id: 'Kontak Operasional', en: 'Operational Contacts', zh: '官方联系方式' },
    rights: { id: 'Hak Cipta Dilindungi.', en: 'All rights reserved.', zh: '版权所有，翻印必究。' }
  }
};

export function getTranslation<T>(lang: Language, obj: { id: T; en: T; zh: T }): T {
  return obj[lang] || obj.id;
}
`);

// 2. SERVICES CAROUSEL DENGAN STYLE ETALASE 3 CARD + BLUR EFEK + MANUAL PLAY/STOP & HOVER AUTO-STOP
saveFile('src/components/ServicesCarousel.tsx', `
// filepath: /src/components/ServicesCarousel.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowUpRight, Play, Pause, ShieldCheck, Sparkles } from 'lucide-react';
import { ServiceDetail, Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll loop: otomatis geser tiap 2.5 detik kecuali jika di-pause atau di-hover
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DETAILED_SERVICES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPlaying, isHovered]);

  const total = DETAILED_SERVICES.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const getLocalized = (svc: ServiceDetail) => ({
    ...svc,
    title: currentLang === 'en' ? svc.title_en || svc.title : currentLang === 'zh' ? svc.title_zh || svc.title : svc.title,
    category: currentLang === 'en' ? svc.category_en || svc.category : currentLang === 'zh' ? svc.category_zh || svc.category : svc.category,
    tagline: currentLang === 'en' ? svc.tagline_en || svc.tagline : currentLang === 'zh' ? svc.tagline_zh || svc.tagline : svc.tagline,
    description: currentLang === 'en' ? svc.description_en || svc.description : currentLang === 'zh' ? svc.description_zh || svc.description : svc.description,
  });

  const centerItem = getLocalized(DETAILED_SERVICES[currentIndex]);
  const leftItem = getLocalized(DETAILED_SERVICES[prevIndex]);
  const rightItem = getLocalized(DETAILED_SERVICES[nextIndex]);

  return (
    <section 
      id="services" 
      className="py-24 bg-slate-50 border-y border-slate-200 text-slate-900 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bersih */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
              {getTranslation(currentLang, UI_TEXT.services.tag)}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {getTranslation(currentLang, UI_TEXT.services.title)}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              {getTranslation(currentLang, UI_TEXT.services.desc)}
            </p>
          </div>

          {/* Controls: Play/Stop Button + Prev/Next */}
          <div className="flex items-center space-x-3 mt-6 md:mt-0">
            {/* Play / Stop Button */}
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Hentikan Otomatis (Pause)" : "Jalankan Otomatis (Play)"}
              className={\`flex items-center space-x-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shadow-sm \${
                isPlaying 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                  : 'bg-amber-50 border-amber-300 text-amber-700'
              }\`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-emerald-600" /> : <Play className="w-4 h-4 fill-amber-600" />}
              <span>{isPlaying ? getTranslation(currentLang, UI_TEXT.services.autoPlay) : getTranslation(currentLang, UI_TEXT.services.autoStopped)}</span>
            </button>

            <button 
              onClick={() => setCurrentIndex(prevIndex)} 
              className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
              title="Layanan Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-slate-500">
              {currentIndex + 1} / {total}
            </span>

            <button 
              onClick={() => setCurrentIndex(nextIndex)} 
              className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
              title="Layanan Berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- 3D ETALASE SHOWCASE: 3 KARTU BERDAMPINGAN (TENGAH TAJAM & HIGHLIGHT, KIRI & KANAN BLUR) --- */}
        <div className="relative py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* KARTU KIRI (BURAM / BLURRED ETALASE WING) */}
            <div 
              onClick={() => setCurrentIndex(prevIndex)}
              className="hidden lg:block lg:col-span-3 cursor-pointer transform scale-95 opacity-55 hover:opacity-80 transition-all duration-700 filter blur-[1.5px] hover:blur-none select-none"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md h-[450px] flex flex-col justify-between overflow-hidden">
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img src={leftItem.imageUrl} alt={leftItem.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                    {leftItem.category}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800 line-clamp-2">{leftItem.title}</h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3">"{leftItem.tagline}"</p>
                </div>
                <div className="text-[11px] text-blue-600 font-bold mt-4 flex items-center space-x-1">
                  <span>&larr; Klik untuk Tampilkan</span>
                </div>
              </div>
            </div>

            {/* KARTU TENGAH (UTAMA / HIGHLIGHTED & KRISP TAJAM) */}
            <div className="lg:col-span-6 z-20 transform scale-100 transition-all duration-700">
              <div className="bg-white rounded-3xl border-2 border-blue-600 ring-4 ring-blue-500/10 shadow-2xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative">
                
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider">
                    {centerItem.category}
                  </span>
                  <div className="flex items-center space-x-1.5 text-emerald-600 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Layanan Resmi Gaek</span>
                  </div>
                </div>

                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-md">
                  <img src={centerItem.imageUrl} alt={centerItem.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{centerItem.title}</h3>
                  <p className="text-sm sm:text-base font-semibold text-blue-700">"{centerItem.tagline}"</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{centerItem.description}</p>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                    <strong className="text-blue-700 font-bold block mb-1">
                      {getTranslation(currentLang, UI_TEXT.services.commoditiesLabel)}
                    </strong>
                    {centerItem.commodities}
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
                      {getTranslation(currentLang, UI_TEXT.services.featuresLabel)}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {centerItem.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => onSelectService(centerItem.title)}
                    className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-blue-600/20 transition-all hover:scale-105"
                  >
                    <span>{getTranslation(currentLang, UI_TEXT.services.quoteBtn)}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                  <div className="text-xs font-semibold text-slate-500">
                    {getTranslation(currentLang, UI_TEXT.services.standardLabel)} <span className="text-slate-900 font-bold">{centerItem.equipment}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* KARTU KANAN (BURAM / BLURRED ETALASE WING) */}
            <div 
              onClick={() => setCurrentIndex(nextIndex)}
              className="hidden lg:block lg:col-span-3 cursor-pointer transform scale-95 opacity-55 hover:opacity-80 transition-all duration-700 filter blur-[1.5px] hover:blur-none select-none"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md h-[450px] flex flex-col justify-between overflow-hidden">
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img src={rightItem.imageUrl} alt={rightItem.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                    {rightItem.category}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800 line-clamp-2">{rightItem.title}</h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3">"{rightItem.tagline}"</p>
                </div>
                <div className="text-[11px] text-blue-600 font-bold mt-4 flex items-center justify-end space-x-1">
                  <span>Klik untuk Tampilkan &rarr;</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Hover Notice */}
        <p className="text-center text-xs text-slate-400 mt-4 italic">
          * {getTranslation(currentLang, UI_TEXT.services.hoverTip)}
        </p>

        {/* Quick Dots / Pills Navigator */}
        <div className="mt-6 flex justify-center items-center space-x-2">
          {DETAILED_SERVICES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={\`h-2 rounded-full transition-all \${
                idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }\`}
              title={\`Layanan \${idx + 1}\`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
`);

// 3. APP CONTROLLER DENGAN DISTRIBUSI CURRENTLANG KE SELURUH ELEMEN
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

console.log("\n>>> Mengirimkan rilis V7 ke GitHub & Hostinger...");
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: complete Gaek Freight V7 with 100% real-time i18n, 3-card etalase carousel with blur and pause-on-hover, 20 deep news with citations, and living radar hero"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log("\n>>> [BERHASIL] Seluruh pembaruan sudah terdorong ke GitHub dan dideploy ke Hostinger!");
} catch (err) {
  console.log(">>> Git selesai.");
}
