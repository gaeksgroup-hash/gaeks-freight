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
