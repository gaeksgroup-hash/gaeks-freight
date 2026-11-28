# 08. International SEO Specification (`/en/` & `hreflang`)

## Arsitektur Bahasa & URL
- **Bahasa Utama (Default)**: Bahasa Indonesia pada root URL tanpa prefiks bahasa (contoh: `https://gaeks.com/`, `https://gaeks.com/layanan/`, `https://gaeks.com/layanan/freight-laut-fcl/`).
- **Varian Bahasa Inggris**: Subdirektori bersih `/en/` untuk rute prioritas bernilai bisnis internasional (`enAvailable: true` pada `public/api/search_intelligence.json`):
  - `https://gaeks.com/en/` (`<-> /`)
  - `https://gaeks.com/en/layanan/` (`<-> /layanan/`)
  - `https://gaeks.com/en/tentang-kami/` (`<-> /tentang-kami/`)
  - `https://gaeks.com/en/tarif-pengiriman/` (`<-> /tarif-pengiriman/`)
  - `https://gaeks.com/en/kontak/` (`<-> /kontak/`)
  - Seluruh 9 rute detail layanan: `https://gaeks.com/en/layanan/<slug>/` (`<-> /layanan/<slug>/`).
- **Halaman Monolingual ID**: Halaman alat bantu khusus atau hukum lokal (`/kalkulator/`, `/tracking/`, `/rute-pengiriman/`, `/maskapai-dan-pelayaran/`, `/karier/`, `/berita/`, `/kontak/telepon/`, `/terms-of-use/`, `/privacy-terms/`) mempertahankan canonical ID tanpa `hreflang="en"` agar tidak menimbulkan halaman dwibahasa tipis atau belum terlokalisasi penuh.

## Aturan Tag `hreflang` Resiprokal & Canonical
1. Setiap halaman dwibahasa wajib memiliki:
   - Self-referencing `<link rel="canonical">` menunjuk URL bahasanya sendiri (`/en/...` menkanonisasi ke `/en/...`, bukan ke ID).
   - `<link rel="alternate" hreflang="id-ID" href="https://gaeks.com/<id-path>">`
   - `<link rel="alternate" hreflang="en" href="https://gaeks.com/en/<id-path>">`
   - `<link rel="alternate" hreflang="x-default" href="https://gaeks.com/<id-path>">`
2. Atribut `<html lang="en">` dan `<meta property="og:locale" content="en_US">` diterapkan konsisten pada `/en/*`, baik pada pre-rendered HTML (`scripts/generate-seo.mjs`), PHP SSR (`public/api/_page_template.php`, `service.php`), maupun SPA hydration (`src/App.tsx`).
3. Fitur pemilih bahasa di `Navbar` pada halaman non-prefix (`/`) tetap menerjemahkan halaman secara langsung via `siteTranslator` agar alur kerja pengguna yang sudah berjalan tidak terganggu.
4. Pengisi teks Mandarin (`zh`) tetap menggunakan terjemahan client-side tanpa jalur URL terpisah sebelum terjemahan statis terverifikasi disetujui.
