# GAEKS Freight

Website produksi [gaeks.com](https://gaeks.com) untuk layanan freight forwarding, PPJK, LCL/FCL, air cargo, trucking, pergudangan, dan project cargo.

## Mulai di sini: cloud dan lokal

Baca [AGENTS.md](AGENTS.md), [standar proyek](docs/PROJECT_STANDARDS.md), dan [arah desain](DESIGN.md) sebelum mengubah UI. Skill Anti Slop, UI/UX Pro Max, dan Modern Web Guidance dibundel di `.agents/skills/` dengan versi terkunci. Gunakan `npm ci`, `npm run standards:check`, dan `npm run project:doctor` pada checkout baru. Panduan setup Windows/Linux, browser test, dan batas deployment tersedia dalam standar proyek.

## Stack

- React 18, TypeScript, dan Vite 8.
- Tailwind CSS 4.
- CSS transition ringan untuk carousel headline dan perpindahan halaman.
- Hostinger Node.js Application dengan sumber GitHub branch `main`.

## Menjalankan secara lokal

```bash
npm ci
npm run dev
```

Build produksi:

```bash
npm run build
npm run preview
```

Hasil build berada di `dist/`.

### Demo lokal dengan API PHP

Situs produksi memakai PHP 8.3 untuk API operator dan konten. Pada Windows, jalankan:

```bash
npm ci
npm run demo:setup
npm run demo:sync
npm run demo
```

Buka `http://127.0.0.1:5173/`. Perintah `demo` menyalakan Vite dan PHP lokal; tekan Ctrl+C untuk menghentikan keduanya. `demo:setup` mengunduh PHP 8.3.37 ke `%LOCALAPPDATA%\GaeksFreight` dan memasang Visual C++ Redistributable x64 bila diperlukan. Untuk memakai PHP lain, set `GAEKS_PHP` ke path executable PHP sebelum menjalankan demo.

`demo:sync` menyalin konten dan media yang terbuka untuk publik dari situs aktif ke penyimpanan lokal `gaeks-private/`. Folder tersebut diabaikan Git. Jalankan ulang hanya saat ingin menyegarkan data demo, karena konten lokal akan terganti. API demo memakai penyimpanan lokal dan tidak mengirim email newsletter. Shipment Tracking tetap membaca endpoint publik ERP.

Untuk memeriksa hasil build bersama API PHP dan routing SEO lokal:

```bash
npm run build
npm run demo:preview
```

Buka `http://127.0.0.1:4173/`. Server PHP bawaan hanya untuk penggunaan lokal. [Dokumentasi PHP](https://www.php.net/manual/en/features.commandline.webserver.php) menjelaskan batasan server tersebut.

## Struktur utama

- `src/components/`: halaman dan komponen antarmuka.
- `src/utils/`: konten lokal, sinkronisasi baca, penerjemahan, dan perhitungan rute.
- `public/api/site_content.json`: sumber konten bersama yang dibaca oleh aplikasi.
- `public/uploads/`: media produksi yang ikut dalam deployment.
- `docs/`: PRD, inventaris legacy, status, dan panduan deployment.

## Navigasi

Halaman utama menggunakan hash navigation. Detail layanan juga tersedia melalui URL `/layanan/<slug>`. Rewrite untuk route aplikasi didefinisikan di `public/.htaccess`.

## Deployment

Setiap push ke `main` memicu build otomatis Hostinger. Konfigurasi aktif:

- Node.js 22
- Package manager: npm
- Build command: `npm run build`
- Output directory: `dist`

Prosedur verifikasi dan rollback ada di [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Operator dan newsletter

Halaman operator memakai sesi PHP server dengan cookie HttpOnly, CSRF, dan pembatasan percobaan login. Mutasi konten serta media memerlukan sesi operator yang valid.

`Gaekadmin` dapat membuat akun Administrator Website, CMS Berita, dan SEO. Setiap peran hanya menerima modul dan izin server yang diperlukan. Panduan modul dan matriks akses tersedia di [docs/OPERATOR_CMS.md](docs/OPERATOR_CMS.md).

Pelanggan newsletter disimpan di direktori privat di luar web root. Pendaftaran publik memakai konfirmasi email dan tautan berhenti berlangganan. Publikasi artikel baru melalui operator mengirim pembaruan individual dari `news@gaeks.com` kepada subscriber aktif.

Konfigurasi SMTP produksi dijelaskan di [docs/SMTP_SETUP.md](docs/SMTP_SETUP.md). Kredensial disimpan di hosting di luar repository dan `public_html`.

Lihat [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md) untuk hasil audit terbaru dan batasan yang masih terbuka.

## Riwayat perubahan

Perubahan penting dicatat di [CHANGELOG.md](CHANGELOG.md). Riwayat teknis lengkap tetap tersedia melalui commit Git.
