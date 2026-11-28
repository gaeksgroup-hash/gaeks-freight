export const pagePaths: Record<string, string> = {
  home: '/',
  services: '/layanan/',
  network: '/rute-pengiriman/',
  calculator: '/kalkulator/',
  tracking: '/tracking/',
  rates: '/tarif-pengiriman/',
  carriers: '/maskapai-dan-pelayaran/',
  about: '/tentang-kami/',
  careers: '/karier/',
  news: '/berita/',
  contact: '/kontak/',
  phones: '/kontak/telepon/',
  terms: '/terms-of-use/',
  privacy: '/privacy-terms/',
  operator: '/operator/',
};

export const EN_PREFIX_PAGES = new Set(['home', 'services', 'rates', 'about', 'contact']);

export function localizedPagePath(page: string, lang: 'id' | 'en' = 'id'): string {
  const base = pagePaths[page] || '/';
  if (lang === 'en' && EN_PREFIX_PAGES.has(page)) {
    return base === '/' ? '/en/' : `/en${base}`;
  }
  return base;
}

export function stripLangPrefix(pathname: string): { path: string; isEn: boolean } {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (normalized === '/en/') {
    return { path: '/', isEn: true };
  }
  if (normalized.startsWith('/en/')) {
    return { path: normalized.slice(3), isEn: true };
  }
  return { path: normalized, isEn: false };
}

export const routeAliases: Record<string, string> = {
  carrier: 'carriers',
  karir: 'careers',
  rate: 'rates',
  about: 'about',
};

export const serviceSlugs: Record<string, string> = {
  ppjk: 'ppjk-customs-clearance',
  'gudang-pbm': 'pergudangan-stevedoring',
  'domestic-truck': 'trucking',
  'project-cargo': 'project-cargo-heavy-lift',
  lcl: 'freight-laut-lcl',
  fcl: 'freight-laut-fcl',
  'air-shipment': 'freight-udara',
  'undername-impor': 'undername-impor-pi',
  'roro-breakbulk': 'roro-breakbulk',
};

export const serviceSlug = (id: string) => serviceSlugs[id] || id;
export const servicePath = (id: string, lang: 'id' | 'en' = 'id') =>
  lang === 'en' ? `/en/layanan/${serviceSlug(id)}/` : `/layanan/${serviceSlug(id)}/`;
export const matchesServiceRoute = (id: string, route: string) => id === route || serviceSlug(id) === route;
