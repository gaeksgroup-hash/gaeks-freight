# Pembaruan layanan dan inquiry — 27 November 2026

## Peta topik, URL, dan kontak awal

| Topik | URL | Kelompok / WhatsApp / email |
| --- | --- | --- |
| FCL ekspor/impor; memilih jasa FCL terbaik sesuai kebutuhan | /layanan/freight-laut-fcl/ | FCL · +6285608561745 · info@gaeks.com |
| Air shipment, ekspor/impor udara; kriteria pemilihan layanan | /layanan/freight-udara/ | Air · +6287722440148 · aksa@gaeks.com |
| Jasa impor/ekspor, dokumen, Customs Clearance Jakarta/Semarang/Surabaya, SKI | /layanan/ppjk-customs-clearance/ | PPJK · +6285608561745 · info@gaeks.com |
| Undername Jakarta/Semarang/Surabaya, Persetujuan Impor, PI besi baja | /layanan/undername-impor-pi/ | Undername · +6285608561745 · info@gaeks.com |
| Trucking domestic | /layanan/trucking/ | General · +6281393453375 · Cs@gaeks.com |
| Penyediaan / sewa kapal RORO dan breakbulk | /layanan/roro-breakbulk/ | FCL/Info · +6285608561745 · info@gaeks.com |
| Project Cargo | /layanan/project-cargo-heavy-lift/ | FCL/Info · +6285608561745 · info@gaeks.com |
| Gudang dan PBM | /layanan/pergudangan-stevedoring/ | General · +6281393453375 · Cs@gaeks.com |
| LCL | /layanan/freight-laut-lcl/ | General · +6281393453375 · Cs@gaeks.com |

Kota dibahas dalam bagian layanan yang relevan, tanpa halaman kota duplikat. Semua kelompok, pemetaan, kontak, tampilan nomor, dan CTA dikelola di Operator → Brand & Kontak. Halaman layanan, FAQ, bagian kota, gambar/alt, SEO title, description, canonical, status, serta bukti dikelola di Operator → Layanan. Pratinjau teks tersedia sebelum simpan. Kontak yang tidak dipetakan memakai kelompok `general`.

Koreksi pemilik 27 November 2026: RORO/breakbulk dan Project Cargo diarahkan ke nomor Info; CS memuat general inquiry, trucking, gudang, dan LCL. Migrasi CMS versi 4 menyimpan cadangan privat `site_content.json.before-contact-routing-v2`, mengubah hanya pemetaan dua layanan tersebut dan label bawaan terkait. Direktori mengikuti komposisi Tracking: gradien biru laut, ilustrasi maritim yang sudah disetujui, serta daftar kontak terangkat. Penanda cakupan layanan berupa titik visual, bukan em dash.

## Bukti dan redaksi

Pemilik secara eksplisit mengonfirmasi pada 27 November 2026: pengalaman impor proyek dengan kapal RORO, kepabeanan general cargo, pengurusan SKI dan undername PI, prioritas biaya efisien dan kualitas shipment udara, serta solusi atas keputusan proses pengiriman. Redaksi menyebut konfirmasi pemilik sebagai sumber; tidak disajikan sebagai verifikasi pelanggan independen. Tidak ditambahkan angka proyek, nama pelanggan, sertifikasi, peringkat, testimonial, ataupun jaminan izin.

Portofolio rinci masih disiapkan. Kolom CMS tersedia untuk judul/detail proyek, sumber, tanggal, izin publikasi, dan catatan bahan internal. Hanya bukti lengkap yang diizinkan untuk publikasi tampil pada API publik dan HTML. Bahan selanjutnya: tanggal shipment, rute, jenis muatan, dokumentasi pendukung, hasil terukur, foto, dan izin menyebut pelanggan.

Persyaratan impor harus diperiksa menurut HS code, komoditas, dan ketentuan saat shipment. Referensi: [Bea Cukai: impor untuk dipakai](https://beacukai.go.id/impor-untuk-dipakai) dan [INSW](https://insw.go.id/intr).

## Implementasi

Footer diperbarui dengan panel tracking, tiga email (CS, Info, Aksa), navigasi ringkas, dan informasi perusahaan. Sesuai koreksi terbaru pemilik, footer tidak lagi memilih satu nomor/kontak berdasarkan layanan. Tautan **Lihat kontak telepon** membuka `/kontak/telepon/` dengan nomor yang dikelompokkan, cakupan layanan, WhatsApp, telepon, email, dan petunjuk persiapan inquiry. FCL/PPJK/Undername memakai satu baris karena nomor yang sama. Sumber nomor/email tetap Brand & Kontak; label, judul, dan metadata baru dapat disunting di Operator → Navigasi & Footer → Redaksi halaman layanan, kontak, dan footer. Arah desain serta alasan pemilihannya tercatat dalam `DESIGN.md`.

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

## Koreksi footer dan direktori telepon

Pengujian lokal tambahan: build, lint 18 file PHP, integritas 310 file skill, 24 kombinasi halaman/viewport (375/768/1024/1440), axe pada main/footer kontak, telepon, dan air di 375/1440. Ketiga email tampil di footer; tidak ada tautan nomor langsung di footer. Tautan direktori dibuka dengan Enter, history Back kembali ke layanan. Tiga nomor unik memuat seluruh sembilan layanan, tujuan WhatsApp/tel diperiksa tanpa membuka aplikasi atau mengirim pesan. Judul dan email yang disimpan di CMS lokal muncul pada HTML server direktori; canonical, ContactPage schema, breadcrumbs, dan sitemap juga diperiksa. Screenshot `phones-375.png` dan `phones-1440.png` ditinjau visual.

Modern Web Guidance `breadcrumbs`: gunakan nav berlabel, daftar berurutan, `aria-current="page"`, serta pemisah dekoratif. UI/UX Pro Max menegaskan hierarki heading dan navigasi halaman bertingkat. Tidak ditambahkan ketersediaan staf atau janji waktu respons yang belum dikonfirmasi.

Kode koreksi: `4ae2cf2be29152297a28b2dbfdc3e5619c5154ba`. [Pengujian Linux/Chromium 45984301802](https://github.com/gaeksgroup-hash/gaeks-freight/actions/runs/45984301802) selesai success. Build Hostinger staging completed; audit baca-saja staging pada 27 November 2026 17:43 WIB memastikan HTTP 200, HTML/schema/canonical/sitemap, tiga email footer, tautan direktori, tiga nomor, sembilan layanan, lebar 1440/375, dan tidak ada exception JavaScript. Artifact `test-results/staging-phones-*` menyimpan hasil audit dan screenshot; audit produksi memakai pola `test-results/production-phones-*` sesudah promosi main.

## Verifikasi rilis langsung sebelumnya

Kode rilis: `4b5ba1c01be140956b3f6295afd131afedab04be`. Hostinger melaporkan build staging `01a21c8b-cd62-72fd-9d7a-6e5da84f3347` dan produksi `01a21c8d-da19-71c7-81a3-c904e50dfb5c` selesai **completed** pada commit tersebut. [GitHub Actions Linux/Chromium](https://github.com/gaeksgroup-hash/gaeks-freight/actions/runs/45982266706) juga **success**.

Audit produksi baca-saja pada 27 November 2026, 17:31 WIB:

- Sembilan URL layanan pada tabel di atas mengembalikan HTTP 200; title CMS, canonical, schema JSON-LD, izin indeks, dan keikutsertaan sitemap diperiksa.
- Beranda, daftar layanan, kontak, tracking, serta Operator mengembalikan HTTP 200. API publik menunjukkan migrasi CMS versi 2, sembilan layanan dan lima kelompok kontak.
- `https://www.gaeks.com/` mengalihkan 301 ke `https://gaeks.com/`; HTTP mengalihkan ke HTTPS. HTTP dengan www melalui dua redirect (HTTPS www, lalu domain utama).
- Pada rilis awal, halaman air freight menampilkan kontak Air pada footer; perilaku ini digantikan oleh tiga email dan direktori telepon sesuai koreksi pemilik di atas. Halaman kontak dengan parameter undername memilih layanan yang sesuai; lebar 375 px tidak meluap. Tidak ditemukan exception JavaScript pada alur yang diperiksa.
- Screenshot produksi `test-results/production-footer-desktop.png` diperiksa visual; screenshot halaman dan JSON audit disimpan di `test-results/production-*`. Direktori artifact lokal ini tidak dipublikasikan dalam repository.
- Staging diperiksa terpisah: sembilan layanan, metadata/schema/sitemap, noindex, kontak footer, dan reflow kontak. Tidak ada mutasi data pengujian pada produksi.

Batas yang sudah ada sebelum rilis: tiga URL media lama dari konten produksi mengembalikan 404 saat penarikan demo, yaitu video/poster hero `1791915131-8afd4eca-lv_0_20261004214354-optimized.webm`, `1791915131-e31c7018-lv_0_20261004214354-poster-optimized.webp`, dan gambar `1795022773-c132e433-443962-optimized.webp` di `/uploads/`. Rilis footer ini tidak memulihkan ketiga aset tersebut. Hasil tes di atas tidak berarti semua aset lama atau seluruh alur ERP telah diverifikasi.

## Baseline dan pengukuran 30/60 hari

Belum tersedia akses metrik Google Search Console atau Bing Webmaster Tools pada sesi ini. Impresi, klik, posisi, indeks akun, dan kutipan AI: **belum diukur**, bukan nol. Diperlukan akses baca properti `gaeks.com` atau ekspor laporan bertanggal. Verifikasi kepemilikan/DNS hanya diperlukan bila properti belum dibuat; jangan mengganti record verifikasi yang sudah ada.

| Waktu | Pemeriksaan |
| --- | --- |
| Hari rilis | Simpan URL, HTTP status, canonical, sitemap, HTML/schema; ekspor 28 hari terakhir dari GSC/Bing bila akses tersedia; rekam tanggal rilis |
| +30 hari (27 Desember 2026) | Bandingkan 28 hari sebelum/sesudah per URL dan kelompok query; indeks, impresi, klik, CTR, posisi rata-rata dengan konteks; catat branded/nonbranded dan negara/perangkat |
| +60 hari (26 Januari 2027) | Ulangi perbandingan; tinjau halaman tak terindeks, query relevan, kutipan AI, dan qualified inquiry menurut kelompok layanan |

Untuk jawaban AI, simpan prompt tetap, tanggal, produk/model, lokasi/bahasa, URL yang dikutip, dan tangkapan hasil. Bedakan observasi sampel dari data populasi. Gunakan laporan AI resmi GSC/Bing jika tersedia pada akun, dengan definisi metrik yang ditampilkan. [Panduan Google tentang fitur AI](https://developers.google.com/search/docs/appearance/ai-features) tetap menekankan dasar SEO dan konten yang membantu.

Event `gaeks_contact_click` hanya menandai klik pembuka WhatsApp/email. Qualified inquiry harus dikonfirmasi tim berdasarkan pesan masuk, kecocokan layanan, dan kebutuhan shipment; klik bukan lead terverifikasi. Tidak ada klaim posisi nomor satu atau janji kutipan AI. Rencana ini tidak membuat otomatisasi terjadwal.
