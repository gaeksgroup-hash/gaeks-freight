import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://gaeks.com';
const response = await fetch(`${origin}/api/sync.php`, { headers: { Accept: 'application/json' } });
if (!response.ok) throw new Error(`Konten publik: HTTP ${response.status}`);
const content = await response.json();
if (!content || typeof content !== 'object' || !Array.isArray(content.services) || !Array.isArray(content.articles)) {
  throw new Error('Struktur konten publik tidak dikenali.');
}

const privateDir = join(root, 'gaeks-private');
await mkdir(privateDir, { recursive: true });
await writeFile(join(privateDir, 'site_content.json'), JSON.stringify(content, null, 2) + '\n');

const media = new Set();
function collect(value) {
  if (typeof value === 'string' && value.startsWith('/uploads/')) media.add(value);
  else if (Array.isArray(value)) value.forEach(collect);
  else if (value && typeof value === 'object') Object.values(value).forEach(collect);
}
collect(content);
let downloaded = 0;
const missing = [];
for (const path of media) {
  if (!/^\/uploads\/[a-zA-Z0-9._-]+$/.test(path)) continue;
  const destination = join(root, 'public', path.slice(1));
  try { await access(destination); continue; } catch { /* missing local media */ }
  const asset = await fetch(`${origin}${path}`);
  if (asset.status === 404) {
    missing.push(path);
    continue;
  }
  if (!asset.ok) throw new Error(`Media ${path}: HTTP ${asset.status}`);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(await asset.arrayBuffer()));
  downloaded++;
}
console.log(`Konten publik tersalin ke gaeks-private/site_content.json; ${downloaded} media baru diunduh.`);
if (missing.length) console.warn(`${missing.length} referensi media tidak tersedia di situs aktif:\n${missing.join('\n')}`);
