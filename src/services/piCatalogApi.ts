import { operatorFetch } from '../utils/adminStorage';
import { PiCatalog, PiCatalogItem } from '../types/piCatalog';

export async function fetchPiCatalog(): Promise<PiCatalog> {
  const response = await fetch('/api/pi-catalog.php', { cache: 'no-store' });
  if (!response.ok) throw new Error('Daftar PI belum tersedia dari server.');
  if (response.headers.get('content-type')?.includes('application/json')) {
    const data = await response.json();
    if (!Array.isArray(data.items)) throw new Error('Format daftar PI tidak valid.');
    return data as PiCatalog;
  }
  // Vite preview has no PHP runtime; it serves index.html for unknown paths.
  const fallback = await fetch('/api/pi_catalog_seed.json', { cache: 'no-store' });
  if (!fallback.ok) throw new Error('Daftar PI belum tersedia.');
  return fallback.json() as Promise<PiCatalog>;
}

export async function savePiCatalog(items: PiCatalogItem[]): Promise<void> {
  const response = await operatorFetch('/api/pi-catalog.php', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items }),
  });
  const result = await response.json();
  if (!response.ok || result.status !== 'success') throw new Error(result.message || 'Daftar PI belum dapat disimpan.');
}
