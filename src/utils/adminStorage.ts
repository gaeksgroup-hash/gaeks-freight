// filepath: /src/utils/adminStorage.ts
import { ServiceDetail } from '../types/freight';
import { DETAILED_SERVICES } from '../components/ServicesCarousel';
import { getStoredArticles, getSubscribers } from './newsStorage';

export interface BrandingSettings {
  faviconUrl: string;
  symbolLogoUrl: string;
  fullLogoUrl: string;
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
  titlePrefix: string;
  titlePrefix_en?: string;
  titlePrefix_zh?: string;
  titleHighlight: string;
  titleHighlight_en?: string;
  titleHighlight_zh?: string;
  titleSuffix: string;
  titleSuffix_en?: string;
  titleSuffix_zh?: string;
  caption: string;
  caption_en?: string;
  caption_zh?: string;
  commodityTitle: string;
  commodityTitle_en?: string;
  commodityTitle_zh?: string;
  commodityCaption: string;
  commodityCaption_en?: string;
  commodityCaption_zh?: string;
}

const STORAGE_KEY_BRANDING = 'gaeks_branding_v5';
const STORAGE_KEY_HERO = 'gaeks_hero_v5';
const STORAGE_KEY_SERVICES = 'gaeks_services_v5';
const STORAGE_KEY_AUTH = 'gaeks_operator_auth_session';
export const GAEKS_UPDATE_EVENT = 'gaeks_auto_update_event';

export const DEFAULT_BRANDING: BrandingSettings = {
  faviconUrl: '/favicon.png?v=8',
  symbolLogoUrl: '/logos/gaek-symbol.png?v=7',
  fullLogoUrl: '/logos/gaek-full.png?v=7',
  whatsappNumber: '085608561745',
  whatsappDisplay: '+62 0856-0856-1745',
  salesEmail: 'Sales01@gaeks.com',
  infoEmail: 'info@gaeks.com',
  companyAddress: 'Tanjung Priok, Jakarta & Banten, Indonesia'
};

export const DEFAULT_HERO: HeroSettings = {
  bgType: 'video',
  videoUrl: 'https://cdn.pixabay.com/video/2020/05/25/40149-425134707_large.mp4',
  imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1920&q=80',
  titlePrefix: 'GAEKS: ',
  titlePrefix_en: 'GAEKS: ',
  titlePrefix_zh: 'GAEKS: ',
  titleHighlight: 'Jasa Import & PPJK',
  titleHighlight_en: 'Import & Customs Clearance',
  titleHighlight_zh: '专业清关与国际进出口',
  titleSuffix: ', Solusi LCL Murah & Project Cargo',
  titleSuffix_en: ', LCL Ocean & Project Cargo Solutions',
  titleSuffix_zh: '，经济型拼箱与特种工程物流',
  caption: 'Mitra resmi Global Andalan Ekspress (GAEKS) untuk kepabeanan Indonesian Customs Clearance (PPJK Ceisa 4.0), konsolidasi Import LCL Murah, kontainer FCL, serta penanganan Project Cargo alat berat ke seluruh pelabuhan utama Indonesia.',
  caption_en: 'Official partner Global Andalan Ekspress (GAEKS) for Indonesian Customs Clearance (PPJK Ceisa 4.0), economical LCL consolidation, FCL containers, and heavy-lift project cargo across all major Indonesian ports.',
  caption_zh: 'GAEKS 官方直连印尼海关 Ceisa 4.0 报关系统，为您提供海运整箱（FCL）、散货拼箱（LCL）、特种重大件运输及内陆全境卡车派送服务。',
  commodityTitle: 'Konsultasi Regulasi & Komoditas Khusus',
  commodityTitle_en: 'Specialized Cargo & Trade Compliance',
  commodityTitle_zh: '海关监管商品准入合规咨询',
  commodityCaption: 'Konsultasikan perizinan Lartas, SNI, dan verifikasi LS komoditas Anda bersama tim ahli pabean kami.',
  commodityCaption_en: 'Consult import licensing, SNI standards, and pre-shipment surveyor reports with our licensed brokerage specialists.',
  commodityCaption_zh: '专业团队协助处理印尼进出口限制类商品配额审批、SNI 认证及装运前商检（LS）合规。'
};

export function notifyLocalUpdate(): void {
  try {
    window.dispatchEvent(new CustomEvent(GAEKS_UPDATE_EVENT, { detail: { timestamp: Date.now() } }));
    const channel = new BroadcastChannel('gaeks_sync_channel');
    channel.postMessage({ type: 'AUTO_UPDATE', timestamp: Date.now() });
    channel.close();
  } catch (e) {}
}

// Mengambil data global dari Hostinger server saat website dimuat oleh perangkat manapun
export async function syncFromServer(): Promise<boolean> {
  try {
    // 1. Coba baca dari file statis cepat /api/site_content.json
    let res = await fetch('/api/site_content.json?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) {
      // Fallback ke sync.php
      res = await fetch('/api/sync.php?t=' + Date.now(), { cache: 'no-store' });
    }

    if (res.ok) {
      const data = await res.json();
      if (data && data.status !== 'empty') {
        if (data.branding) localStorage.setItem(STORAGE_KEY_BRANDING, JSON.stringify(data.branding));
        if (data.hero) localStorage.setItem(STORAGE_KEY_HERO, JSON.stringify(data.hero));
        if (data.services && Array.isArray(data.services) && data.services.length > 0) {
          localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(data.services));
        }
        if (data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
          localStorage.setItem('gaeks_articles_v15_full', JSON.stringify(data.articles));
        }
        notifyLocalUpdate();
        return true;
      }
    }
    return false;
  } catch (err) {
    return false;
  }
}

// Menyimpan data langsung ke server Hostinger secara global
export async function saveToServerGlobally(): Promise<{ success: boolean; message: string }> {
  try {
    const payload = {
      branding: getStoredBranding(),
      hero: getStoredHero(),
      services: getStoredServices(),
      articles: getStoredArticles(),
      subscribers: getSubscribers(),
      updatedAt: Date.now()
    };

    const res = await fetch('/api/sync.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        authPassword: 'Adagagap499!',
        payload: payload
      })
    });

    const result = await res.json();
    if (res.ok && result.status === 'success') {
      notifyLocalUpdate();
      return { success: true, message: 'Berhasil disimpan permanen di server Hostinger!' };
    }
    return { success: false, message: result.message || 'Gagal menyimpan ke server' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Koneksi ke server gagal' };
  }
}

export function getStoredBranding(): BrandingSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BRANDING);
    if (!raw) return DEFAULT_BRANDING;
    return { ...DEFAULT_BRANDING, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_BRANDING;
  }
}

export function saveStoredBranding(data: BrandingSettings): void {
  localStorage.setItem(STORAGE_KEY_BRANDING, JSON.stringify(data));
  notifyLocalUpdate();
}

export function getStoredHero(): HeroSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HERO);
    if (!raw) return DEFAULT_HERO;
    return { ...DEFAULT_HERO, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_HERO;
  }
}

export function saveStoredHero(data: HeroSettings): void {
  localStorage.setItem(STORAGE_KEY_HERO, JSON.stringify(data));
  notifyLocalUpdate();
}

export function getStoredServices(): ServiceDetail[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SERVICES);
    if (!raw) return DETAILED_SERVICES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DETAILED_SERVICES;
    return parsed;
  } catch {
    return DETAILED_SERVICES;
  }
}

export function saveStoredServices(services: ServiceDetail[]): void {
  localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(services));
  notifyLocalUpdate();
}

export function isOperatorLoggedIn(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true' || localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
  } catch {
    return false;
  }
}

export function loginOperator(user: string, pass: string): boolean {
  if (user.trim() === 'Gaekadmin' && pass === 'Adagagap499!') {
    sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
    localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    return true;
  }
  return false;
}

export function logoutOperator(): void {
  sessionStorage.removeItem(STORAGE_KEY_AUTH);
  localStorage.removeItem(STORAGE_KEY_AUTH);
}

export function exportSubscribersToCSV(): void {
  const subs = getSubscribers();
  if (subs.length === 0) {
    alert('Belum ada subscriber terdaftar.');
    return;
  }
  const headers = 'Email,Tanggal Langganan\n';
  const rows = subs.map(s => `"${s.email}","${s.subscribedAt}"`).join('\n');
  const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `gaeks_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
