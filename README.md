# GAEKS Freight

Website produksi [gaeks.com](https://gaeks.com) untuk layanan freight forwarding, PPJK, LCL/FCL, air cargo, trucking, pergudangan, dan project cargo.

## Stack

- React 18, TypeScript, dan Vite 5.
- Tailwind CSS 3.
- Framer Motion untuk interaksi yang memang membutuhkan gerak.
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

## Keadaan operator

Mutasi konten dan media dari halaman operator sengaja dinonaktifkan sampai autentikasi server tersedia. Login operator selalu ditolak dan endpoint POST legacy mengembalikan HTTP 410. Situs publik tetap membaca konten dari file JSON produksi.

Lihat [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md) untuk hasil audit terbaru dan batasan yang masih terbuka.

## Riwayat perubahan

Perubahan penting dicatat di [CHANGELOG.md](CHANGELOG.md). Riwayat teknis lengkap tetap tersedia melalui commit Git.
