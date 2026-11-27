import { ContactGroup, getSiteCopy, getStoredBranding, getStoredServices } from './adminStorage';
import { ServiceDetail } from '../types/freight';
import { serviceSlug, serviceSlugs } from './routes';

export type QuoteService = string;
export type QuoteDirection = 'impor' | 'ekspor';
export type QuoteCity = 'Jakarta' | 'Semarang' | 'Surabaya' | '';

export const serviceLabels: Record<QuoteService, string> = {
  fcl: 'Freight Laut FCL',
  air: 'Air Freight',
  ppjk: 'Kepabeanan / PPJK',
  undername: 'Undername Impor & PI',
  'project-cargo': 'Project Cargo',
  'domestic-truck': 'Trucking Domestik',
  'gudang-pbm': 'Gudang & PBM',
  lcl: 'Freight Laut LCL',
  'roro-breakbulk': 'RORO & Breakbulk',
  general: 'CS GAEKS',
};

const SERVICE_ALIASES: Record<string, string> = {
  air: 'air-shipment',
  undername: 'undername-impor',
  other: 'general',
};

const SLUG_TO_ID: Record<string, string> = Object.fromEntries(
  Object.entries(serviceSlugs).map(([id, slug]) => [slug, id])
);

export function normalizeServiceId(service: string): string {
  const clean = service.trim().replace(/^\/+|\/+$/g, '');
  if (SERVICE_ALIASES[clean]) return SERVICE_ALIASES[clean];
  if (SLUG_TO_ID[clean]) return SLUG_TO_ID[clean];
  const matched = getStoredServices().find((item) => serviceSlug(item.id) === clean);
  return matched ? matched.id : clean;
}

export function quoteContext(defaultService: QuoteService = 'general') {
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  const normalized = service === 'air-shipment' ? 'air' : service === 'undername-impor' ? 'undername' : service || defaultService;
  const available = new Set(['general', 'air', 'undername', ...getStoredServices().map((item) => item.id)]);
  const direction = params.get('direction')?.toLowerCase();
  const explicitDirection: QuoteDirection | '' = direction === 'impor' || direction === 'ekspor' ? direction : '';
  const city = params.get('city')?.toLowerCase();
  const utm = Object.fromEntries(
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
      .map((key) => [key, params.get(key)])
      .filter((entry): entry is [string, string] => Boolean(entry[1] && entry[1].length <= 200))
  );
  if (Object.keys(utm).length) {
    try {
      sessionStorage.setItem('gaeks_quote_utm', JSON.stringify(utm));
    } catch {}
  }
  return {
    service: available.has(normalized) ? normalized : 'general',
    direction: (explicitDirection || 'impor') as QuoteDirection,
    explicitDirection,
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
  const fromCatalog = getStoredServices().find((item) => path === '/layanan/' + serviceSlug(item.id))?.id;
  if (fromCatalog) return fromCatalog;
  const service = new URLSearchParams(window.location.search).get('service');
  return service || 'general';
}

export function measureContactClick(channel: 'whatsapp' | 'email', service: QuoteService | 'other'): void {
  // A click or opened composer is never a confirmed or qualified inquiry.
  try {
    const layer = (window as Window & { dataLayer?: Array<Record<string, string>> }).dataLayer;
    layer?.push({ event: 'gaeks_contact_click', channel, service });
  } catch {}
}

export function resolveContact(service = currentQuoteService()): ContactGroup {
  const groups = getStoredBranding().contactGroups || [];
  const id = normalizeServiceId(service);
  return groups.find((group) => group.serviceIds.includes(id)) || groups.find((group) => group.id === 'general') || groups[0];
}

export function resolveServiceRecord(service = currentQuoteService()): ServiceDetail | undefined {
  const id = normalizeServiceId(service);
  if (id === 'general') return undefined;
  return getStoredServices().find((item) => item.id === id);
}

export function serviceLabel(service: string): string {
  const id = normalizeServiceId(service);
  const record = getStoredServices().find((item) => item.id === id);
  return record?.ctaServiceName?.trim() || record?.title || serviceLabels[service] || serviceLabels[id] || 'Pengiriman GAEKS';
}

function applyTemplate(
  template: string,
  vars: { service: string; direction: string; city: string; capitalizeContext?: boolean }
): string {
  const dirText = vars.direction
    ? vars.capitalizeContext
      ? vars.direction.charAt(0).toUpperCase() + vars.direction.slice(1)
      : vars.direction.toLowerCase()
    : '';
  const cityText = vars.city ? vars.city.trim() : '';
  let result = template
    .replace(/\{service\}/gi, vars.service)
    .replace(/\{(?:arah|direction)\}/gi, dirText)
    .replace(/\{(?:kota|city)\}/gi, cityText);
  if (!cityText) {
    result = result.replace(/\s+di(?=\s*(?:[.,!?]|$))/gi, '');
  }
  return result
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export interface ResolvedServiceContact {
  group: ContactGroup;
  service?: ServiceDetail;
  serviceName: string;
  whatsappLabel: string;
  emailLabel: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  whatsappMessage: string;
  emailSubject: string;
  whatsappUrl: string;
  emailUrl: string;
}

export function resolveServiceContact(
  service = currentQuoteService(),
  options: { city?: string; direction?: QuoteDirection | ''; extraBody?: string } = {}
): ResolvedServiceContact {
  const group = resolveContact(service);
  const record = resolveServiceRecord(service);
  const copy = getSiteCopy();
  const context = typeof window !== 'undefined' ? quoteContext() : { explicitDirection: '' as const, city: '' as const };
  const city = options.city !== undefined ? options.city : context.city;
  const direction = options.direction !== undefined ? options.direction : context.explicitDirection;
  const serviceName = record?.ctaServiceName?.trim() || serviceLabel(service);

  const rawWaLabel = record?.whatsappCtaLabel?.trim() || group?.ctaText || 'Chat Tim {service}';
  const whatsappLabel = applyTemplate(rawWaLabel, {
    service: service === 'general' && !record ? 'CS' : serviceName,
    direction,
    city,
    capitalizeContext: true,
  });

  const emailLabel = record?.emailCtaLabel?.trim() || group?.emailCtaText?.trim() || copy.serviceEmailCta || 'Kirim Email';

  const rawWaTemplate =
    record?.whatsappTemplate?.trim() ||
    group?.whatsappTemplate?.trim() ||
    'Halo tim GAEKS, saya ingin konsultasi {service} {arah} di {kota}.';
  const baseMessage = applyTemplate(rawWaTemplate, {
    service: service === 'general' && !record ? 'pengiriman' : serviceName,
    direction,
    city,
  });
  const whatsappMessage = options.extraBody ? `${baseMessage}\n\n${options.extraBody}` : baseMessage;

  const rawSubjectTemplate =
    record?.emailSubject?.trim() ||
    group?.emailSubjectTemplate?.trim() ||
    'Konsultasi {service} {arah} {kota}';
  const emailSubject = applyTemplate(rawSubjectTemplate, {
    service: service === 'general' && !record ? 'Pengiriman GAEKS' : serviceName,
    direction,
    city,
    capitalizeContext: true,
  });

  const number = whatsappDigits(group?.whatsappNumber || '');
  const email = group?.email || '';
  const whatsappUrl = number ? `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage)}` : '#';
  const emailUrl = email
    ? `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(whatsappMessage)}`
    : '#';

  return {
    group,
    service: record,
    serviceName,
    whatsappLabel,
    emailLabel,
    whatsappNumber: number,
    whatsappDisplay: group?.whatsappDisplay || (number ? `+${number}` : ''),
    email,
    whatsappMessage,
    emailSubject,
    whatsappUrl,
    emailUrl,
  };
}

export function contactLink(
  channel: 'whatsapp' | 'email',
  service = currentQuoteService(),
  options: { city?: string; direction?: QuoteDirection | ''; extraBody?: string } = {}
): string {
  const resolved = resolveServiceContact(service, options);
  return channel === 'whatsapp' ? resolved.whatsappUrl : resolved.emailUrl;
}
