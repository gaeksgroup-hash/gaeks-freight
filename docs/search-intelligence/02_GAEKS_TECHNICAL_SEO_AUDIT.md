# 02. GAEKS Technical SEO & Production Audit

## Metodologi Audit
Audit dilakukan terhadap:
1. Live production (`https://gaeks.com`, `https://www.gaeks.com`, dan 24 rute publik serta endpoint `robots.txt`, `sitemap.xml`, `llms.txt`).
2. Repository lokal (`public/api/*.php`, `public/.htaccess`, `scripts/generate-seo.mjs`, `src/App.tsx`, dan JSON seeds).

## Temuan P0-P2 Sebelum Implementasi & Status Perbaikan

| ID | Kategori | Kondisi Awal Teramati | Risiko | Tindakan yang Diimplementasikan | Status |
|---|---|---|---|---|---|
| P0-1 | Indexability / Keamanan | `/operator/` mengembalikan `<meta name="robots" content="index, follow">` di raw HTML | Halaman internal Operator CMS dapat terindeks | Pre-render `dist/operator/index.html` (`noindex, nofollow, noarchive`), header HTTP `X-Robots-Tag` pada `.htaccess` & `local-router.php`, serta guard di `App.tsx` | Diperbaiki |
| P0-2 | Kualitas Konten | 19 artikel (`art-2`..`art-20`) berisi teks boilerplate identik dan slug `analisis-komprehensif-logistik-maritim-*` | Penalti kualitas & duplikasi indeks | Penulisan ulang seluruh 22 artikel unik pada `articles_seed.json` & `site_content.json`, migrasi PHP v7 aman, dan HTTP 301 slug lama di `article.php` | Diperbaiki |
| P1-1 | Internal Linking | `roro-breakbulk` dan `project-cargo` tidak tampil di `Navbar.tsx` dan `Footer.tsx`, dan RORO memakai gambar stok berulang | Halaman layanan yatim & sinyal prioritas lemah | Kedua layanan ditambahkan ke Navbar dropdown & Footer, RORO memakai aset `/uploads/1789234361_387709.webp`, dan relasi layanan terpasang di `ServiceDetailPage.tsx` | Diperbaiki |
| P1-2 | Duplicate / Alias Routes | `/carrier/`, `/karir/`, `/rate/`, `/about/` melayani halaman tanpa HTTP 301 redirect | Kanibalisasi & pembagian ekuitas tautan | Redirect 301 permanen di `public/.htaccess` dan `scripts/local-router.php` menuju rute kanonik Indonesia | Diperbaiki |
| P1-3 | Intent Overlap & Boilerplate | `project-cargo` & `roro-breakbulk` berbagi fokus RORO pada tagline; paragraf proses kerja layanan seragam | Kanibalisasi kata kunci RORO vs Project Cargo | Pemisahan intent jelas: `roro-breakbulk` fokus sewa/charter kapal RORO & breakbulk; `project-cargo` fokus heavy lift, engineering, route survey; proses kerja unik di setiap layanan | Diperbaiki |
| P1-4 | Metadata Legacy | `<meta name="keywords">` masih dipancarkan di PHP SSR, `index.html`, dan `App.tsx` | Sinyal usang & kebocoran strategi kata kunci | Dihapus dari `index.html`, `_page_template.php`, `generate-seo.mjs`, `App.tsx`, dan ditandai internal-only di Operator CMS | Diperbaiki |
| P2-1 | Performance / bfcache | Header `Cache-Control: no-store` pada `_page_template.php` dan `sitemap.php` | Menghambat browser Back/Forward Cache (`bfcache`) | Diubah ke `Cache-Control: no-cache, must-revalidate` untuk halaman publik (endpoint privat/auth tetap `no-store`) | Diperbaiki |
| P2-2 | SSR Entity Consistency | `/layanan/` & `/kontak/telepon/` tidak memancarkan `Organization @id` penuh; `/kontak/` H1 menyalin `<title>` | Fragmentasi knowledge graph & H1 kurang deskriptif | Disatukan via `public/api/_search_intelligence.php`; H1 `/kontak/` memakai heading halaman spesifik | Diperbaiki |

## Verifikasi WWW vs Non-WWW
Hasil pemeriksaan HTTP langsung terhadap live site:
- `https://www.gaeks.com/` -> `301 Moved Permanently` ke `https://gaeks.com/`.
- `http://www.gaeks.com/` -> `301` -> `https://www.gaeks.com/` -> `301` -> `https://gaeks.com/`.
- Seluruh tag `<link rel="canonical">`, `sitemap.xml`, dan `Organization` mengacu ke host kanonik tunggal `https://gaeks.com`.

## Keterbatasan Terdokumentasi
Akses Google Search Console, Google Analytics 4, Bing Webmaster Tools, dan kredensial server produksi Hostinger tidak tersedia di sesi ini. Validasi dilakukan secara lokal pada build produksi (`dist/`), PHP 8.3 local server, `scripts/verify-seo.mjs`, dan Playwright end-to-end (`tests/cms-workflow.mjs`).
