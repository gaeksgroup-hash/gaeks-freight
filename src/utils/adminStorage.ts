// filepath: /src/utils/adminStorage.ts
import { ServiceDetail } from '../types/freight';
import { DETAILED_SERVICES } from '../components/ServicesCarousel';
import { getStoredArticles, saveStoredArticles, getSubscribers } from './newsStorage';

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

const STORAGE_KEY_BRANDING = 'gaeks_branding_v2';
const STORAGE_KEY_SERVICES = 'gaeks_services_v2';
const STORAGE_KEY_AUTH = 'gaeks_operator_auth_session';

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
}

export function getStoredServices(): ServiceDetail[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SERVICES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(DETAILED_SERVICES));
      return DETAILED_SERVICES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DETAILED_SERVICES;
    return parsed;
  } catch {
    return DETAILED_SERVICES;
  }
}

export function saveStoredServices(services: ServiceDetail[]): void {
  localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(services));
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
