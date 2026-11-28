# 01. GAEKS Search Strategy (`GAEKS Search Intelligence 1.0`)

## Identitas & Source of Truth
- **Legal Entity**: PT Global Andalan Ekspress
- **Brand**: GAEKS Freight (`https://gaeks.com`)
- **Tagline Resmi**: `"Powered by People. Driven by Technology. Focused on You."` (`"Diperkuat oleh Manusia. Digerakkan oleh Teknologi. Berfokus pada Anda."`)
- **Visi Resmi**: Membentuk standar baru dalam industri freight forwarding yang berlandaskan kesejahteraan karyawan, kepemimpinan teknologi, kekayaan intelektual, dan keunggulan operasional, dengan menempatkan pelanggan sebagai pusat setiap keputusan, mengubah kompleksitas menjadi efisiensi, serta mewujudkan solusi melalui tindakan nyata dan hasil yang transparan.
- **Kebijakan Klaim**: Klaim peringkat tiga besar dibatalkan permanen. Jangan menulis klaim peringkat 3 besar, nama pelanggan fiktif, tanggal pengiriman fiktif, atau tarif estimasi tanpa dasar CMS.

## Fokus Komersial & Pilar Layanan
- **Fokus Keunggulan Utama**:
  1. FCL Export & FCL Import (`/layanan/freight-laut-fcl/`)
  2. Air Freight Export & Air Freight Import (`/layanan/freight-udara/`)
- **Layanan Kompetensi & Pengembangan Komersial**:
  3. LCL Export & Import (`/layanan/freight-laut-lcl/`)
  4. Customs Clearance & Jasa PPJK (`/layanan/ppjk-customs-clearance/`)
  5. Undername Impor & Persetujuan Impor (PI, termasuk PI besi & baja) (`/layanan/undername-impor-pi/`)
  6. Penyediaan / Sewa Kapal RORO & Breakbulk (`/layanan/roro-breakbulk/`)
  7. Project Cargo & Heavy Lift (`/layanan/project-cargo-heavy-lift/`)
  8. Domestic Trucking (`/layanan/trucking/`)
  9. Pergudangan & Bongkar Muat (`/layanan/pergudangan-stevedoring/`)

## Delapan Aspek Optimasi Terpadu
GAEKS memperlakukan kedelapan aspek berikut sebagai satu arsitektur terpadu berbasis `public/api/search_intelligence.json`, seed editorial terkurasi, SSR PHP (`public/api/*.php`), dan pre-rendered HTML (`scripts/generate-seo.mjs`):
1. **SEO**: Indexability bersih (`/operator/` strict `noindex`), canonical konsisten `https://gaeks.com`, 301 redirect alias (`/carrier/`, `/karir/`, `/rate/`, `/about/`), metadata unik per rute, zero `<meta name="keywords">`, zero duplikasi konten artikel.
2. **SXO**: Panduan interaktif yang terhubung pada `/kalkulator/` dan `/tracking/`, navigasi lengkap ke semua 9 layanan (termasuk RORO/Breakbulk & Project Cargo), serta section *Layanan & Alat Terkait* di setiap detail layanan.
3. **LLMO & GEO**: Jawaban terstruktur, fakta entitas eksplisit pada ringkasan hero, tabel perbandingan opsi pengiriman, FAQ berorientasi keputusan bisnis, dan berkas `llms.txt` + `llms-full.txt` yang sinkron dengan CMS.
4. **AIO & AISO**: Struktur heading jelas (1 H1 unik), paragraf definisi 40-60 kata di awal halaman, markup tabel & FAQ standar yang dapat dikutip langsung oleh Google AI Overviews, ChatGPT Search, Perplexity, Microsoft Copilot, Claude, dan Gemini.
5. **GSO & VSO**: Bahasa natural Indonesia & Inggris bernada konsultatif (pertanyaan prosedural "apa dokumen PPJK", "bedanya RORO vs Project Cargo", "kapan pilih FCL vs Air Freight").

## Sumber Tunggal Kebenaran (SSOT) Arsitektur
- Konfigurasi rute, entitas organisasi, relasi antar layanan, dan pasangan bahasa ID/EN: `public/api/search_intelligence.json` (dibaca oleh `src/data/searchIntelligence.ts`, `public/api/_search_intelligence.php`, dan `scripts/generate-seo.mjs`).
- Katalog layanan & FAQ: `public/api/service_editorial_seed.json` (disinkronkan dengan `public/api/site_content.json` serta migrasi aman PHP v7).
- Artikel wawasan & berita: `public/api/articles_seed.json` (22 artikel unik tanpa duplikasi template).
