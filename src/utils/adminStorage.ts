import { NewsletterSubscriber, ServiceDetail } from '../types/freight';
import { DETAILED_SERVICES } from '../components/ServicesCarousel';

export interface BrandingSettings {
  faviconUrl: string;
  symbolLogoUrl: string;
  fullLogoUrl: string;
  navbarLogoUrl: string;
  footerLogoUrl: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  salesEmail: string;
  infoEmail: string;
  companyAddress: string;
}

export interface HeroSettings {
  bgType: 'video' | 'image';
  videoUrl: string;
  imageUrl: string;
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  caption: string;
  primaryLabel: string;
  secondaryLabel: string;
  commodityTitle: string;
  commodityCaption: string;
}

export interface NavigationItem { page: string; label: string; mobileLabel: string; visible: boolean; }
export type SocialPlatform = 'instagram' | 'facebook' | 'linkedin' | 'youtube' | 'x' | 'tiktok';
export interface SocialLink { id: string; platform: SocialPlatform; url: string; label?: string; }
export interface SiteSettings {
  footerTagline: string;
  footerHeading: string;
  digitalProductLabel: string;
  digitalProductUrl: string;
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
}
export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  robotsIndex: boolean;
}
export type OperatorRole = 'super_admin' | 'website_admin' | 'cms' | 'seo';
export interface OperatorUser { username: string; displayName: string; role: OperatorRole; permissions: string[]; }
export interface ManagedOperator { username: string; displayName: string; role: OperatorRole; active: boolean; createdAt?: string; updatedAt?: string; }

const STORAGE_KEY_BRANDING = 'gaeks_branding_v8';
const STORAGE_KEY_HERO = 'gaeks_hero_v8';
const STORAGE_KEY_SERVICES = 'gaeks_services_v8';
const STORAGE_KEY_SITE = 'gaeks_site_settings_v1';
const STORAGE_KEY_SEO = 'gaeks_seo_v1';
const STORAGE_KEY_ARTICLES = 'gaeks_articles_v15_full';
export const GAEKS_UPDATE_EVENT = 'gaeks_auto_update_event';
let operatorCsrfToken = '';
let operatorUser: OperatorUser | null = null;

export const DEFAULT_BRANDING: BrandingSettings = {
  faviconUrl: '/favicon.png?v=8',
  symbolLogoUrl: '/logos/gaek-symbol.png?v=7',
  fullLogoUrl: '/logos/gaek-full.png?v=7',
  navbarLogoUrl: '/logos/gaek-symbol.png?v=7',
  footerLogoUrl: '/logos/gaek-symbol.png?v=7',
  whatsappNumber: '085608561745',
  whatsappDisplay: '+62 856 0856 1745',
  salesEmail: 'Sales01@gaeks.com',
  infoEmail: 'info@gaeks.com',
  companyAddress: 'Tanjung Priok, Jakarta & Banten, Indonesia',
};
export const DEFAULT_HERO: HeroSettings = {
  bgType: 'video',
  videoUrl: 'https://cdn.pixabay.com/video/2020/05/25/40149-425134707_large.mp4',
  imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1920&q=80',
  eyebrow: 'Freight forwarding dan kepabeanan',
  titlePrefix: 'Kargo bergerak ',
  titleHighlight: 'dengan rencana',
  titleSuffix: ' yang jelas.',
  caption: 'GAEKS mengatur freight laut dan udara, kepabeanan, serta pengiriman darat melalui satu tim operasional.',
  primaryLabel: 'Minta estimasi', secondaryLabel: 'Lihat layanan',
  commodityTitle: 'Konsultasi Regulasi & Komoditas Khusus',
  commodityCaption: 'Konsultasikan perizinan Lartas, SNI, dan verifikasi LS komoditas Anda bersama tim ahli kepabeanan kami.',
};
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  footerTagline: 'Koordinasi freight, kepabeanan, dan pengiriman darat untuk kargo bisnis.',
  footerHeading: 'Temukan shipment dari satu nomor referensi.',
  digitalProductLabel: 'Gaeks Digital Product', digitalProductUrl: 'https://gdp.gaeks.com',
  navigation: [
    { page: 'home', label: 'Beranda', mobileLabel: 'Beranda', visible: true },
    { page: 'services', label: 'Layanan', mobileLabel: 'Layanan', visible: true },
    { page: 'tracking', label: 'Tracking', mobileLabel: 'Shipment Tracking', visible: true },
    { page: 'calculator', label: 'Kalkulator', mobileLabel: 'Kalkulator Kargo', visible: true },
    { page: 'network', label: 'Rute & Jadwal', mobileLabel: 'Rute & Jadwal', visible: true },
    { page: 'news', label: 'Berita', mobileLabel: 'Berita & Pembaruan', visible: true },
    { page: 'contact', label: 'Kontak', mobileLabel: 'Hubungi Kami', visible: true },
  ],
  socialLinks: [],
};
export const DEFAULT_SEO: SeoSettings = {
  siteTitle: 'GAEKS | Freight Forwarding & Customs Clearance Indonesia',
  metaDescription: 'Layanan freight forwarding, customs clearance, ocean freight, air freight, dan trucking untuk kebutuhan kargo bisnis.',
  keywords: 'freight forwarding, customs clearance, PPJK, ocean freight, air freight, trucking Indonesia',
  ogTitle: 'GAEKS | Global Andalan Ekspress',
  ogDescription: 'Koordinasi freight dan kepabeanan untuk kargo bisnis.',
  ogImageUrl: '/logos/gaek-full.png?v=7', robotsIndex: true,
};

export function notifyLocalUpdate(): void {
  window.dispatchEvent(new CustomEvent(GAEKS_UPDATE_EVENT, { detail: { timestamp: Date.now() } }));
  try { const channel = new BroadcastChannel('gaeks_sync_channel'); channel.postMessage({ type: 'AUTO_UPDATE', timestamp: Date.now() }); channel.close(); } catch {}
}
function readObject<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? { ...fallback, ...JSON.parse(raw) } : fallback; } catch { return fallback; }
}
function writeObject<T>(key: string, data: T): void { localStorage.setItem(key, JSON.stringify(data)); notifyLocalUpdate(); }

export async function syncFromServer(): Promise<boolean> {
  try {
    let response = await fetch('/api/site_content.json?t=' + Date.now(), { cache: 'no-store' });
    if (!response.ok) response = await fetch('/api/sync.php?t=' + Date.now(), { cache: 'no-store' });
    if (!response.ok) return false;
    const data = await response.json();
    if (!data || data.status === 'empty') return false;
    if (data.branding) localStorage.setItem(STORAGE_KEY_BRANDING, JSON.stringify(data.branding));
    if (data.hero) localStorage.setItem(STORAGE_KEY_HERO, JSON.stringify(data.hero));
    if (data.siteSettings) localStorage.setItem(STORAGE_KEY_SITE, JSON.stringify(data.siteSettings));
    if (data.seo) localStorage.setItem(STORAGE_KEY_SEO, JSON.stringify(data.seo));
    if (Array.isArray(data.services)) localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(data.services));
    if (Array.isArray(data.articles)) localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(data.articles));
    notifyLocalUpdate(); return true;
  } catch { return false; }
}

export interface ServerSaveResult { success: boolean; message: string; newsletter?: { articles: number; sent: number; failed: number }; }
export async function saveSectionToServer(section: 'branding' | 'hero' | 'siteSettings' | 'services' | 'articles' | 'seo', payload: unknown): Promise<ServerSaveResult> {
  try {
    const response = await operatorFetch('/api/sync.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section, payload }) });
    const result = await response.json();
    if (!response.ok || result.status !== 'success') return { success: false, message: result.message || 'Konten belum dapat disimpan.' };
    if (section === 'branding') saveStoredBranding(payload as BrandingSettings);
    if (section === 'hero') saveStoredHero(payload as HeroSettings);
    if (section === 'siteSettings') saveStoredSiteSettings(payload as SiteSettings);
    if (section === 'services') saveStoredServices(payload as ServiceDetail[]);
    if (section === 'articles') { localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(payload)); notifyLocalUpdate(); }
    if (section === 'seo') saveStoredSeo(payload as SeoSettings);
    return { success: true, message: result.message || 'Konten tersimpan.', newsletter: result.newsletter };
  } catch (error) { return { success: false, message: error instanceof Error ? error.message : 'Koneksi server gagal.' }; }
}

export const getStoredBranding = () => readObject(STORAGE_KEY_BRANDING, DEFAULT_BRANDING);
export const saveStoredBranding = (data: BrandingSettings) => writeObject(STORAGE_KEY_BRANDING, data);
export const getStoredHero = () => readObject(STORAGE_KEY_HERO, DEFAULT_HERO);
export const saveStoredHero = (data: HeroSettings) => writeObject(STORAGE_KEY_HERO, data);
export const getStoredSiteSettings = () => {
  const stored = readObject(STORAGE_KEY_SITE, DEFAULT_SITE_SETTINGS);
  const supportedPlatforms: SocialPlatform[] = ['instagram', 'facebook', 'linkedin', 'youtube', 'x', 'tiktok'];
  const socialLinks = Array.isArray(stored.socialLinks) ? stored.socialLinks.map((link) => {
    const legacy = String(link.label || '').toLowerCase();
    const platform = supportedPlatforms.includes(link.platform) ? link.platform : supportedPlatforms.includes(legacy as SocialPlatform) ? legacy as SocialPlatform : 'instagram';
    return { ...link, platform };
  }) : [];
  return { ...stored, navigation: Array.isArray(stored.navigation) ? stored.navigation : DEFAULT_SITE_SETTINGS.navigation, socialLinks };
};
export const saveStoredSiteSettings = (data: SiteSettings) => writeObject(STORAGE_KEY_SITE, data);
export const getStoredSeo = () => readObject(STORAGE_KEY_SEO, DEFAULT_SEO);
export const saveStoredSeo = (data: SeoSettings) => writeObject(STORAGE_KEY_SEO, data);
export function getStoredServices(): ServiceDetail[] {
  try { const raw = localStorage.getItem(STORAGE_KEY_SERVICES); if (!raw) return DETAILED_SERVICES; const parsed = JSON.parse(raw); return Array.isArray(parsed) ? parsed : DETAILED_SERVICES; } catch { return DETAILED_SERVICES; }
}
export function saveStoredServices(services: ServiceDetail[]): void { localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(services)); notifyLocalUpdate(); }

function setSession(result: { csrfToken?: string; user?: OperatorUser | null }): OperatorUser | null { operatorCsrfToken = result.csrfToken || ''; operatorUser = result.user || null; return operatorUser; }
export async function getOperatorSession(): Promise<OperatorUser | null> {
  try { const response = await fetch('/api/auth.php', { credentials: 'same-origin', cache: 'no-store' }); const result = await response.json(); if (response.ok && result.authenticated) return setSession(result); } catch {}
  operatorCsrfToken = ''; operatorUser = null; return null;
}
export const isOperatorLoggedIn = async () => (await getOperatorSession()) !== null;
export const getCurrentOperator = () => operatorUser;
export const hasPermission = (permission: string, user = operatorUser) => Boolean(user && (user.permissions.includes('*') || user.permissions.includes(permission)));
export async function loginOperator(user: string, pass: string): Promise<{ success: boolean; message?: string; user?: OperatorUser }> {
  try {
    const response = await fetch('/api/auth.php', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: user, password: pass }) });
    const result = await response.json();
    if (response.ok && result.authenticated && result.user) { setSession(result); return { success: true, user: result.user }; }
    return { success: false, message: result.message || 'Autentikasi gagal.' };
  } catch { return { success: false, message: 'Server autentikasi tidak dapat dihubungi.' }; }
}
export async function logoutOperator(): Promise<void> { try { await operatorFetch('/api/auth.php', { method: 'DELETE' }); } finally { operatorCsrfToken = ''; operatorUser = null; } }
export async function operatorFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  if (!operatorCsrfToken) await getOperatorSession();
  const headers = new Headers(init.headers);
  if (operatorCsrfToken && init.method && init.method.toUpperCase() !== 'GET') headers.set('X-CSRF-Token', operatorCsrfToken);
  return fetch(input, { ...init, credentials: 'same-origin', headers });
}
export async function fetchOperators(): Promise<ManagedOperator[]> {
  const response = await operatorFetch('/api/operators.php'); const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Daftar pengguna belum dapat dimuat.'); return result.operators || [];
}
export async function saveOperatorAccount(operator: ManagedOperator & { password?: string }): Promise<ManagedOperator> {
  const response = await operatorFetch('/api/operators.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(operator) }); const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Akun belum dapat disimpan.'); return result.operator;
}
export async function deleteOperatorAccount(username: string): Promise<void> {
  const response = await operatorFetch('/api/operators.php', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username }) }); const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Akun belum dapat dihapus.');
}
export function exportSubscribersToCSV(subs: NewsletterSubscriber[]): void {
  if (subs.length === 0) { alert('Belum ada subscriber terdaftar.'); return; }
  const headers = 'Email,Status,Tanggal Langganan,Tanggal Konfirmasi\n';
  const rows = subs.map((s) => `"${s.email}","${s.status}","${s.subscribedAt}","${s.confirmedAt || ''}"`).join('\n');
  const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' }); const url = URL.createObjectURL(blob); const link = document.createElement('a');
  link.href = url; link.download = `gaeks_subscribers_${new Date().toISOString().split('T')[0]}.csv`; link.click(); URL.revokeObjectURL(url);
}
