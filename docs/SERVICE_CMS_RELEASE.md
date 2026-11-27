# Pembaruan layanan dan inquiry — 27 November 2026

## Peta topik, URL, dan kontak awal

| Topik | URL | Kelompok / WhatsApp / email |
| --- | --- | --- |
| FCL ekspor/impor; memilih jasa FCL terbaik sesuai kebutuhan | /layanan/freight-laut-fcl/ | FCL · +6285608561745 · info@gaeks.com |
| Air shipment, ekspor/impor udara; kriteria pemilihan layanan | /layanan/freight-udara/ | Air · +6287722440148 · aksa@gaeks.com |
| Jasa impor/ekspor, dokumen, Customs Clearance Jakarta/Semarang/Surabaya, SKI | /layanan/ppjk-customs-clearance/ | PPJK · +6285608561745 · info@gaeks.com |
| Undername Jakarta/Semarang/Surabaya, Persetujuan Impor, PI besi baja | /layanan/undername-impor-pi/ | Undername · +6285608561745 · info@gaeks.com |
| Trucking domestic | /layanan/trucking/ | General · +6281393453375 · Cs@gaeks.com |
| Penyediaan / sewa kapal RORO dan breakbulk | /layanan/roro-breakbulk/ | General · +6281393453375 · Cs@gaeks.com |
| Project Cargo | /layanan/project-cargo-heavy-lift/ | General · +6281393453375 · Cs@gaeks.com |
| Gudang dan PBM | /layanan/pergudangan-stevedoring/ | General · +6281393453375 · Cs@gaeks.com |
| LCL | /layanan/freight-laut-lcl/ | General · +6281393453375 · Cs@gaeks.com |

Kota dibahas dalam bagian layanan yang relevan, tanpa halaman kota duplikat. Semua kelompok, pemetaan, kontak, tampilan nomor, dan CTA dikelola di Operator → Brand & Kontak. Halaman layanan, FAQ, bagian kota, gambar/alt, SEO title, description, canonical, status, serta bukti dikelola di Operator → Layanan. Pratinjau teks tersedia sebelum simpan. Kontak yang tidak dipetakan memakai kelompok `general`.

## Bukti dan redaksi

Pemilik secara eksplisit mengonfirmasi pada 27 November 2026: pengalaman impor proyek dengan kapal RORO, kepabeanan general cargo, pengurusan SKI dan undername PI, prioritas biaya efisien dan kualitas shipment udara, serta solusi atas keputusan proses pengiriman. Redaksi menyebut konfirmasi pemilik sebagai sumber; tidak disajikan sebagai verifikasi pelanggan independen. Tidak ditambahkan angka proyek, nama pelanggan, sertifikasi, peringkat, testimonial, ataupun jaminan izin.

Portofolio rinci masih disiapkan. Kolom CMS tersedia untuk judul/detail proyek, sumber, tanggal, izin publikasi, dan catatan bahan internal. Hanya bukti lengkap yang diizinkan untuk publikasi tampil pada API publik dan HTML. Bahan selanjutnya: tanggal shipment, rute, jenis muatan, dokumentasi pendukung, hasil terukur, foto, dan izin menyebut pelanggan.

Persyaratan impor harus diperiksa menurut HS code, komoditas, dan ketentuan saat shipment. Referensi: [Bea Cukai: impor untuk dipakai](https://beacukai.go.id/impor-untuk-dipakai) dan [INSW](https://insw.go.id/intr).

## Implementasi

Footer diperbarui dengan panel tracking, hierarki judul/nomor kontak yang lebih kuat, navigasi ringkas, dan informasi perusahaan. Label baru dan metadata halaman layanan/kontak dapat disunting di Operator → Navigasi & Footer → Redaksi halaman layanan, kontak, dan footer. Arah desain serta alasan pemilihannya tercatat dalam `DESIGN.md`.

Standar Codex Cloud/lokal kini memiliki `AGENTS.md`, snapshot 310 file skill terkunci, pemeriksaan integritas, CLI desain/panduan versi tetap, setup Windows/Linux, serta workflow GitHub Actions. Tes browser tidak lagi bergantung pada folder temporer atau Edge tertentu.

- `src/utils/adminStorage.ts`, `quoteFlow.ts`: model kontak, pemetaan, fallback, konteks RFQ, dan sinkronisasi.
- `ServiceCmsEditors.tsx`, `OperatorAdmin.tsx`: editor kontak, bagian halaman, bukti, metadata, draf/terbit, pratinjau.
- `ServiceDetailPage.tsx`, `QuoteForm.tsx`, `ContactPage.tsx`, `Footer.tsx`, `Navbar.tsx`, `SmartCalculator.tsx`, `InteractiveMap.tsx`, `NewsPage.tsx`, `App.tsx`: konsumsi data CMS dan routing kontak.
- `public/api/_service_content.php`: migrasi versi 2 (layanan/kontak dan redaksi UI), validasi, filter publik, dan pemetaan server. Cadangan sebelum migrasi disimpan di penyimpanan privat sebagai `site_content.json.before-service-cms-v1` dan tidak ditimpa saat migrasi berikutnya.
- `service.php`, `page.php`, `_page_template.php`, `sitemap.php`, `sync.php`, `.htaccess`: HTML/metadata/schema dinamis, sitemap draf/terbit, redirect www, simpan atomik, serta halaman kontak dan daftar layanan untuk crawler.
- `contact_groups_seed.json`, `service_editorial_seed.json`: nilai awal migrasi; setelah migrasi, data privat server menjadi sumber utama.
- Integrasi ERP tetap menggunakan endpoint yang sudah ada. Tidak ada perubahan akun atau kampanye Google Ads.

## Pengujian

`npm run build`, lint PHP, serta `tests/cms-workflow.mjs`. Tes memakai akun sementara hanya di lokal dan memulihkan konten setelah selesai. Mencakup login, penolakan tanpa sesi/CSRF, perubahan kontak sampai HTML server, SEO title dan FAQ schema, draf 404, pengecualian sitemap/API publik, simpan lewat UI Operator, routing WhatsApp RFQ, dan overflow ponsel/desktop. Tidak ada pesan WhatsApp/email yang dikirim. Keberhasilan tracking shipment nyata belum diklaim tanpa nomor shipment valid.

Tes browser memakai Playwright dan axe-core yang terkunci di `package-lock.json`. Jalankan `npm ci`, `npx playwright install chromium`, preview PHP lokal, lalu `npm run test:cms`. Windows dapat memakai `GAEKS_BROWSER_CHANNEL=msedge`. Tes menulis hanya data lokal di `gaeks-private` dan memulihkannya. Panduan lintas Windows/Linux ada di `docs/PROJECT_STANDARDS.md`.

## Baseline dan pengukuran 30/60 hari

Belum tersedia akses metrik Google Search Console atau Bing Webmaster Tools pada sesi ini. Impresi, klik, posisi, indeks akun, dan kutipan AI: **belum diukur**, bukan nol. Diperlukan akses baca properti `gaeks.com` atau ekspor laporan bertanggal. Verifikasi kepemilikan/DNS hanya diperlukan bila properti belum dibuat; jangan mengganti record verifikasi yang sudah ada.

| Waktu | Pemeriksaan |
| --- | --- |
| Hari rilis | Simpan URL, HTTP status, canonical, sitemap, HTML/schema; ekspor 28 hari terakhir dari GSC/Bing bila akses tersedia; rekam tanggal rilis |
| +30 hari (27 Desember 2026) | Bandingkan 28 hari sebelum/sesudah per URL dan kelompok query; indeks, impresi, klik, CTR, posisi rata-rata dengan konteks; catat branded/nonbranded dan negara/perangkat |
| +60 hari (26 Januari 2027) | Ulangi perbandingan; tinjau halaman tak terindeks, query relevan, kutipan AI, dan qualified inquiry menurut kelompok layanan |

Untuk jawaban AI, simpan prompt tetap, tanggal, produk/model, lokasi/bahasa, URL yang dikutip, dan tangkapan hasil. Bedakan observasi sampel dari data populasi. Gunakan laporan AI resmi GSC/Bing jika tersedia pada akun, dengan definisi metrik yang ditampilkan. [Panduan Google tentang fitur AI](https://developers.google.com/search/docs/appearance/ai-features) tetap menekankan dasar SEO dan konten yang membantu.

Event `gaeks_contact_click` hanya menandai klik pembuka WhatsApp/email. Qualified inquiry harus dikonfirmasi tim berdasarkan pesan masuk, kecocokan layanan, dan kebutuhan shipment; klik bukan lead terverifikasi. Tidak ada klaim posisi nomor satu atau janji kutipan AI. Rencana ini tidak membuat otomatisasi terjadwal.
