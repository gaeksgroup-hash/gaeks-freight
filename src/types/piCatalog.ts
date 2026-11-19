export interface PiCatalogItem {
  id: string;
  hsCode: string;
  commodity: string;
  status: 'ready' | 'to_be_confirmed';
  sourceLabel: string;
  sourceUrl: string;
  verifiedAt: string | null;
  note: string;
}

export interface PiCatalog {
  updatedAt: string | null;
  items: PiCatalogItem[];
}
