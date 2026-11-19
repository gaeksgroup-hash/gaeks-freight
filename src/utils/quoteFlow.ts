export type QuoteService = 'fcl' | 'air' | 'ppjk' | 'undername';
export type QuoteDirection = 'impor' | 'ekspor';
export type QuoteCity = 'Jakarta' | 'Semarang' | 'Surabaya' | '';

export const serviceLabels: Record<QuoteService, string> = {
  fcl: 'Freight Laut FCL', air: 'Air Freight', ppjk: 'PPJK / Customs Clearance', undername: 'Undername Impor & PI',
};

export function quoteContext(defaultService: QuoteService = 'ppjk') {
  const params = new URLSearchParams(window.location.search);
  const service = params.get('service');
  const direction = params.get('direction');
  const city = params.get('city')?.toLowerCase();
  const utm = Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .map((key) => [key, params.get(key)])
    .filter((entry): entry is [string, string] => Boolean(entry[1] && entry[1].length <= 200)));
  if (Object.keys(utm).length) sessionStorage.setItem('gaeks_quote_utm', JSON.stringify(utm));
  return {
    service: service === 'fcl' || service === 'air' || service === 'ppjk' || service === 'undername' ? service : defaultService,
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
  return service === 'fcl' || service === 'air' || service === 'ppjk' || service === 'undername' ? service : 'other';
}

export function measureContactClick(channel: 'whatsapp' | 'email', service: QuoteService | 'other'): void {
  // A click or opened composer is never a confirmed or qualified inquiry.
  const layer = (window as Window & { dataLayer?: Array<Record<string, string>> }).dataLayer;
  layer?.push({ event: 'gaeks_contact_click', channel, service });
}
