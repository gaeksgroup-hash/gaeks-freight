export const pagePaths: Record<string, string> = {
  home: '/', services: '/layanan/', network: '/rute-pengiriman/', calculator: '/kalkulator/',
  tracking: '/tracking/', news: '/berita/', contact: '/kontak/', operator: '/operator/'
};

export const serviceSlugs: Record<string, string> = {
  ppjk: 'ppjk-customs-clearance', 'gudang-pbm': 'pergudangan-stevedoring',
  'domestic-truck': 'trucking', 'project-cargo': 'project-cargo-heavy-lift',
  lcl: 'freight-laut-lcl', fcl: 'freight-laut-fcl', 'air-shipment': 'freight-udara', 'undername-impor': 'undername-impor-pi'
};

export const servicePath = (id: string) => `/layanan/${serviceSlugs[id] || id}/`;
