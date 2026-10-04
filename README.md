# GAEKS Freight

Website produksi [gaeks.com](https://gaeks.com) untuk layanan freight forwarding, PPJK, LCL/FCL, air cargo, trucking, pergudangan, dan project cargo.

## Stack

- React 18, TypeScript, dan Vite 5.
- Tailwind CSS 3.
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
