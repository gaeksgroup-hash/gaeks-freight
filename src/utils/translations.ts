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
