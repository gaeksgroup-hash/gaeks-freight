import searchIntelligence from '../../public/api/search_intelligence.json';

export interface SearchRouteMeta {
  title: string;
  description: string;
  heading: string;
  body: string;
}

export interface SearchRouteConfig {
  schemaType: string;
  enAvailable: boolean;
  id: SearchRouteMeta;
  en?: SearchRouteMeta;
}

export const SEARCH_BASE_URL = searchIntelligence.baseUrl;
export const SEARCH_ORG = searchIntelligence.organization;
export const SERVICE_SLUGS = searchIntelligence.serviceSlugs as Record<string, string>;
export const SERVICE_RELATIONS = searchIntelligence.serviceRelations as Record<
  string,
  { relatedServices: string[]; tools: string[]; articles: string[] }
>;
export const SEARCH_ROUTES = searchIntelligence.routes as Record<string, SearchRouteConfig>;
export const SEARCH_REDIRECTS = searchIntelligence.routeRedirects as Record<string, string>;

export const TOOL_LINKS: Record<string, { label: string; labelEn: string; href: string; page: string; note: string }> = {
  calculator: {
    label: 'Kalkulator Kargo (CBM & Volumetrik)',
    labelEn: 'Cargo Calculator (CBM & Volumetric)',
    href: '/kalkulator/',
    page: 'calculator',
    note: 'Hitung CBM dan chargeable weight sebelum meminta penawaran.',
  },
  network: {
    label: 'Rute dan Jadwal Pengiriman',
    labelEn: 'Routes & Schedules',
    href: '/rute-pengiriman/',
    page: 'network',
    note: 'Tinjau koridor pelabuhan, bandara, dan referensi waktu tempuh.',
  },
  tracking: {
    label: 'Pelacakan Pengiriman',
    labelEn: 'Shipment Tracking',
    href: '/tracking/',
    page: 'tracking',
    note: 'Pantau milestone HAWB, B/L, atau kontainer.',
  },
  rates: {
    label: 'Informasi Tarif Pengiriman',
    labelEn: 'Freight Rate Information',
    href: '/tarif-pengiriman/',
    page: 'rates',
    note: 'Pahami faktor biaya dan siapkan data penawaran.',
  },
  contact: {
    label: 'Formulir Konsultasi Pengiriman',
    labelEn: 'Quote & Consultation Form',
    href: '/kontak/',
    page: 'contact',
    note: 'Kirim brief pengiriman untuk diarahkan ke tim terkait.',
  },
  phones: {
    label: 'Direktori Telepon & WhatsApp Tim',
    labelEn: 'Team Phone & WhatsApp Directory',
    href: '/kontak/telepon/',
    page: 'phones',
    note: 'Lihat daftar nomor langsung per kelompok layanan.',
  },
};
