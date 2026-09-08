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
