# Standar kerja GAEKS: Codex Cloud dan lokal

Keputusan pemilik, 27 November 2026: gunakan Anti Slop, UI/UX Pro Max, dan Modern Web Guidance untuk UI yang stylish, berkarakter, efisien, serta nyaman di ponsel. Standar disimpan dalam repository agar tidak bergantung pada percakapan, plugin global, drive Windows, atau mesin tertentu.

## Urutan acuan

Instruksi terbaru pengguna > `AGENTS.md` > `DESIGN.md` untuk arah visual > skill yang relevan. `docs/PRD_GAEKS_WEB_V2.md` adalah referensi kebutuhan dan roadmap; teknologi usulannya tidak mengganti stack yang sedang berjalan. Jika file wajib hilang, sebutkan path yang hilang dan tanyakan kepada pengguna sebelum mengklaim mengikuti standar.

## Skill yang dibundel

| Sumber | Lokasi | Peran |
| --- | --- | --- |
| [Anti Slop](https://github.com/miqdadbadjuber/anti-slop) | `.agents/skills/antislop*` | Filter kualitas visual, copy, aksesibilitas, mobile, dan pemeriksaan akhir |
| [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | `.agents/skills/ui-ux-pro-max` | Pencarian metode desain dan pola UX berdasarkan konteks |
| [Modern Web Guidance source](https://github.com/GoogleChrome/modern-web-guidance-src) / [distribution](https://github.com/GoogleChrome/modern-web-guidance) | `.agents/skills/modern-web-guidance` | HTML/CSS/API browser, performa, aksesibilitas, fallback |

Versi dan SHA-256 file dicatat di `SKILL_SOURCES.json`. Skill ada dalam checkout; instalasi global dan koneksi Hostinger tidak diperlukan untuk membacanya. Codex dapat menemukannya pada giliran/sesi berikutnya; `AGENTS.md` juga menunjuk langsung ke file agar panduan tetap dapat dibaca manual. `CLAUDE.md` hanya menunjuk standar bersama, bukan salinan kebijakan lain.

Anti Slop dijalankan selama pengerjaan (`during`) dan diperiksa sebelum rilis. Tidak ada perubahan preferensi global pengguna. Permintaan awal untuk langsung bekerja dan mengikuti standar proyek cukup untuk workflow ini; jangan membuat putaran persetujuan baru dari default installer.

## Setup dari checkout baru

Kebutuhan: Git, Node.js 22.12+ (22 LTS untuk kesetaraan hosting), npm, Python 3.10+, PHP 8.3 dengan JSON/session/fileinfo dan GD untuk media. Tidak ada path absolut mesin pengembang dalam perintah berikut.

```sh
npm ci
npm run standards:check
npm run project:doctor
npm run build
npm run demo
```

Frontend dev: `http://127.0.0.1:5173`; API PHP: port 8001. Untuk pengujian hasil build dan HTML server gunakan `npm run demo:preview` pada port 4173 di terminal terpisah. Demo mengisolasi data ke `gaeks-private/`, yang tidak masuk Git, dan menonaktifkan pengiriman email.

Windows: `npm run demo:setup` memasang PHP lokal bila diperlukan. Python dapat dipasang dengan `winget install --id Python.Python.3.13 --exact --scope user`. Terminal baru mungkin diperlukan agar PATH diperbarui. `GAEKS_PHP` dan `GAEKS_PYTHON` boleh menunjuk executable khusus.

Codex Cloud/Linux: sediakan Node 22, Python 3, dan PHP 8.3 pada setup environment. Contoh pada Ubuntu dengan paket PHP 8.3 tersedia: `sudo apt-get update` lalu `sudo apt-get install -y php8.3-cli php8.3-gd php8.3-mbstring python3`. Ini langkah setup, bukan perintah untuk dijalankan diam-diam pada setiap tugas. Jika paket tidak tersedia, gunakan image yang menyediakan PHP 8.3 atau laporkan kebutuhan environment. `npm run demo:setup` memeriksa PHP di Linux dan menjelaskan kebutuhan, tanpa menjalankan PowerShell.

Untuk browser test, jalankan `npx playwright install chromium`; di image Linux yang belum memiliki pustaka browser gunakan `npx playwright install --with-deps chromium` pada tahap setup. `GAEKS_BROWSER_CHANNEL=msedge` dapat digunakan di Windows yang sudah memiliki Edge. CI menggunakan Chromium bawaan Playwright.

`npm run demo:sync` mengunduh konten publik produksi bila jaringan tersedia. Jangan mengambil password, data pelanggan, atau database privat untuk demo. Tanpa jaringan, seed repository tetap tersedia. Hostinger/GitHub credentials hanya diperlukan untuk operasi yang memang mengakses layanan tersebut.

## Workflow UI/UX

1. Baca instruksi dan desain; identifikasi tugas pengguna, CTA utama, konten CMS, dan kondisi kosong/loading/error.
2. Cari Modern Web Guidance dahulu. CLI terkunci: `npm run guidance -- search "disclosure accordion sections"`, kemudian `npm run guidance -- retrieve "accordion"`. Tidak perlu installer saat setiap task. Offline: baca guide lokal terkait, catat bahwa pencarian CLI tidak berjalan, jangan mengarang hasil.
3. Gunakan UI/UX Pro Max dari root: `npm run design:search -- "logistics freight corporate" --design-system -p "GAEKS Freight"`. Gunakan `--domain ux` untuk masalah spesifik atau `--stack react` untuk implementasi. Tinjau kesesuaian hasil sebelum mengadopsinya. Warna, font, angka live, dan template hasil pencarian tidak otomatis menjadi keputusan proyek.
4. Tulis alasan komposisi, hierarki, warna, foto, elevasi, dan interaksi di `DESIGN.md` atau laporan perubahan. Gunakan aset operator yang ada; jangan membuat logo, testimoni, angka, atau identitas pelanggan fiktif.
5. Implementasikan langsung pada komponen/CSS. Konten layanan, kontak, CTA, FAQ, bukti, dan metadata tetap berasal dari CMS. Konten SEO yang terlihat server harus konsisten dengan frontend.
6. Periksa mobile, tablet, desktop, fokus keyboard, formulir, error/loading/empty, reduced motion, overflow, kontras, dan konten panjang. Review screenshot secara visual; assertion otomatis tidak menilai keindahan.
7. Simpan bukti Anti Slop delivery review dan hasil pengujian. Nyatakan batas cakupan jika bagian lain belum diuji.

Browser policy: utamakan fitur Baseline Widely Available. Fitur lebih baru harus terdeteksi dan menurun ke perilaku native yang tetap fungsional; jangan menambah polyfill besar untuk dekorasi. Tidak ada animasi wajib untuk mengakses konten.

## Pemeriksaan sebelum rilis

```sh
npm run standards:check
npm run build
npm run php:lint
npm run seo:check
# Jalankan demo:preview di terminal lain, lalu:
npm run test:cms
```

Test CMS hanya boleh menulis ke localhost dan selalu memulihkan data/uji operator. Test mencakup auth/CSRF, simpan CMS, HTML/schema server, draft/sitemap, routing kontak, dan UI. Jangan menjalankan perubahan data pengujian pada domain produksi. Untuk perubahan ringan pilih pengujian sesuai dampaknya; jangan mengklaim seluruh checklist lolos jika belum dijalankan.

## Hosting dan data

- Produksi: `https://gaeks.com`, alias `www.gaeks.com`, branch `main`.
- Staging: `https://trusty-mediumvioletred-octopus-86.hostingersite.com`, branch `develop`, wajib noindex dan tanpa email keluar.
- Push memicu auto-deploy Hostinger. Verifikasi build selesai dan URL live sebelum melaporkan rilis.
- `.hostinger/site.json` bersifat lokal; environment cloud mengatur koneksi sendiri. Jangan memasukkan token/password ke dokumen atau source.
- File produksi privat milik server; pertahankan backup sebelum migrasi. Jangan menimpa CMS dengan seed saat update.
- Laporan perubahan yang sedang dikerjakan: `docs/SERVICE_CMS_RELEASE.md`.
- Dokumentasi & kebijakan GAEKS Search Intelligence 1.0: `docs/search-intelligence/01_GAEKS_SEARCH_STRATEGY.md` s.d. `10_GAEKS_SEO_CHANGE_POLICY.md`.

## Memperbarui skill

Pembaruan dilakukan secara sengaja sebagai perubahan repository: baca perubahan upstream, pilih commit/versi, ganti snapshot terkait, pertahankan lisensi, perbarui manifest dan lockfile, tinjau perubahan aturan, lalu jalankan pemeriksaan. Jangan menjalankan `npx ...@latest install` sebagai setup rutin karena hasilnya dapat berbeda antara cloud dan lokal. Jangan mengubah file vendor untuk melonggarkan aturan secara tersembunyi; tuliskan keputusan proyek di `AGENTS.md`.

`npm run standards:check` memverifikasi berkas penting dan hash snapshot. Pemeriksaan ini mendeteksi file hilang/berubah; tidak menjamin semua agent otomatis patuh atau menggantikan review UI/UX.
