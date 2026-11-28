# 07. AI Crawler Accessibility & LLM Visibility Policy

## Kebijakan `robots.txt`
Berkas `public/robots.txt` mengizinkan perayapan halaman publik untuk mesin pencari dan bot pencarian AI berikut, sambil memblokir `/operator/` dan `/api/`:
- Google: `Googlebot`, `Google-Extended`
- Bing / Microsoft Copilot: `Bingbot`
- OpenAI: `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`
- Anthropic: `ClaudeBot`, `Claude-SearchBot`
- Perplexity: `PerplexityBot`
- Default wildcard (`User-agent: *`): `Allow: /`, `Disallow: /operator/`, `Disallow: /api/`.
- Environment staging (`GAEKS_STAGING=1`): selalu `Disallow: /` agar staging tidak terindeks mesin pencari maupun AI.

## Kebijakan `robots` & `X-Robots-Tag`
- Halaman publik terindeks (non-staging): `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`.
- Halaman internal `/operator/`: `<meta name="robots" content="noindex, nofollow, noarchive" />` dan header HTTP `X-Robots-Tag: noindex, nofollow, noarchive` (dilarang muncul di `sitemap.xml`).
- Parameter pencarian tracking (`/tracking/?*`): header HTTP dan meta `noindex, nofollow` agar kueri nomor resi tidak masuk indeks.

## Berkas `llms.txt` & `llms-full.txt`
- Dihasilkan otomatis pada setiap `npm run build` via `scripts/generate-seo.mjs` langsung dari `public/api/search_intelligence.json`, `site_content.json`, dan `contact_groups_seed.json`.
- `public/llms.txt` menyajikan ringkasan identitas PT Global Andalan Ekspress, tagline resmi, cakupan pelabuhan Indonesia, tautan halaman utama ID & EN, dan ringkasan seluruh 9 layanan (termasuk RORO & Breakbulk serta Project Cargo).
- `public/llms-full.txt` menambahkan Q&A referensi AEO (ID & EN), spesifikasi data penawaran, FAQ per layanan, dan kontak 3 meja spesialis.

## Keterbacaan Raw HTML (Non-JS Crawlers)
- Setiap rute layanan, berita, beranda, layanan index, kontak, serta `/en/` memiliki fallback HTML yang memuat H1, ringkasan, tabel perbandingan (layanan), FAQ, tautan layanan terkait, dan JSON-LD di raw HTML tanpa memerlukan eksekusi JavaScript.
