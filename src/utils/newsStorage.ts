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
