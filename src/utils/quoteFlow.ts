import { getStoredBranding, getStoredServices } from './adminStorage';
import { serviceSlug } from './routes';
export type QuoteService = string;
export type QuoteDirection = 'impor' | 'ekspor';
export type QuoteCity = 'Jakarta' | 'Semarang' | 'Surabaya' | '';

export const serviceLabels: Record<QuoteService, string> = {
  fcl: 'Freight Laut FCL', air: 'Air Freight', ppjk: 'PPJK / Customs Clearance', undername: 'Undername Impor & PI',
};

export function quoteContext(defaultService: QuoteService = 'general') {
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  const normalized = service === 'air-shipment' ? 'air' : service === 'undername-impor' ? 'undername' : service || defaultService;
  const available = new Set(['general', 'air', 'undername', ...getStoredServices().map(item => item.id)]);
  const direction = params.get('direction');
  const city = params.get('city')?.toLowerCase();
  const utm = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .map((key) => [key, params.get(key)])
    .filter((entry): entry is [string, string] => Boolean(entry[1] && entry[1].length <= 200)));
  if (Object.keys(utm).length) sessionStorage.setItem('gaeks_quote_utm', JSON.stringify(utm));
  return {
    service: available.has(normalized) ? normalized : 'general',
    direction: direction === 'impor' || direction === 'ekspor' ? direction : 'impor' as QuoteDirection,
    city: (city === 'jakarta' ? 'Jakarta' : city === 'semarang' ? 'Semarang' : city === 'surabaya' ? 'Surabaya' : '') as QuoteCity,
  };
}

export function whatsappDigits(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  return digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
}

export function currentQuoteService(): QuoteService | 'other' {
  const path = window.location.pathname.replace(/\/$/, '');
  if (path === '/layanan/freight-laut-fcl') return 'fcl';
  if (path === '/layanan/freight-udara') return 'air';
  if (path === '/layanan/ppjk-customs-clearance') return 'ppjk';
  if (path === '/layanan/undername-impor-pi') return 'undername';
  const service = new URLSearchParams(window.location.search).get('service');
  return service || getStoredServices().find(item => path === '/layanan/' + serviceSlug(item.id))?.id || 'general';
}

export function measureContactClick(channel: 'whatsapp' | 'email', service: QuoteService | 'other'): void {
  // A click or opened composer is never a confirmed or qualified inquiry.
  const layer = (window as Window & { dataLayer?: Array<Record<string, string>> }).dataLayer;
  layer?.push({ event: 'gaeks_contact_click', channel, service });
}

export function resolveContact(service = currentQuoteService()) {
  const groups = getStoredBranding().contactGroups || [];
  const aliases: Record<string,string> = { air: 'air-shipment', undername: 'undername-impor', other: 'general' };
  const id = aliases[service] || service;
  return groups.find(group => group.serviceIds.includes(id)) || groups.find(group => group.id === 'general') || groups[0];
}
export function serviceLabel(service: string) {
  const aliases: Record<string,string> = { air: 'air-shipment', undername: 'undername-impor' };
  return getStoredServices().find(item => item.id === (aliases[service] || service))?.title || serviceLabels[service] || 'General inquiry';
}
export function contactLink(channel: 'whatsapp' | 'email', service = currentQuoteService()) {
  const group = resolveContact(service);
  const message = 'Halo GAEKS, saya ingin berkonsultasi tentang ' + serviceLabel(service) + '.';
  return channel === 'whatsapp' ? 'https://wa.me/' + whatsappDigits(group.whatsappNumber) + '?text=' + encodeURIComponent(message) : 'mailto:' + group.email + '?subject=' + encodeURIComponent(serviceLabel(service)) + '&body=' + encodeURIComponent(message);
}
