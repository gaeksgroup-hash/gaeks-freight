# Status Project GAEKS Freight

Tanggal audit: 4 Oktober 2026.

## Ringkasan

Situs publik aktif di `https://gaeks.com` dan dibangun otomatis oleh Hostinger dari branch `main`. Versi aplikasi saat audit menggunakan React 18, TypeScript 5, Vite 5, dan Tailwind CSS 3.

## Pemeriksaan yang lulus

- `npm run build`: lulus, 1.896 modul diproses dengan route khusus dan carousel dipisah menjadi chunk lazy-load.
- `npx tsc --noEmit`: lulus.
- `git diff --check`: lulus.
- `git fsck --full`: lulus.
- `npm audit --omit=dev`: 0 advisory pada dependency produksi.
- Halaman utama: HTTP 200.
- Route `/layanan/ppjk-customs-clearance`: HTTP 200.
- `/api/site_content.json` dan `/api/sync.php` GET: HTTP 200. Endpoint pengguna, media, dan daftar newsletter menolak pengunjung tanpa sesi dengan HTTP 401.
- Deployment navbar commit `cb01153`: build Hostinger selesai dan tampilan live terverifikasi.

## Keadaan fitur

| Area | Status |
| --- | --- |
| Homepage dan layanan | Aktif |
| Kalkulator kargo | Aktif |
| Rute dan jadwal | Aktif |
| Berita | Aktif dari data repository |
| Kontak dan WhatsApp | Aktif |
| Shipment Tracking | Terintegrasi ke endpoint publik ERP; menunggu nomor produksi untuk validasi respons sukses |
| Bahasa | Pilihan ID/EN/ZH tersedia |
| Detail layanan | Aktif melalui route `/layanan/<slug>` |
| Desain publik ringkas | Aktif; data panjang memakai daftar dan disclosure |
| Operator login | Aktif dengan sesi server, CSRF, dan rate limit login |
| Simpan konten ke server | Aktif untuk operator terautentikasi |
| Upload/hapus media | Aktif untuk operator terautentikasi |
| Newsletter | Double opt-in, daftar operator, unsubscribe, dan broadcast artikel baru aktif |
| Operator multiuser | Peran Gaekadmin, Administrator Website, CMS Berita, dan SEO aktif dengan izin server per modul |
| Pengaturan situs global | Branding, kontak, navigasi, footer, sosial, hero, layanan, berita, dan SEO tersimpan di server dan diterapkan ke publik |
| Media hero dan logo partner | Video/GIF/gambar hero, Our Networks, dan Our Clients dikelola dari operator; section partner kosong tidak dirender |

## Batasan yang masih terbuka

1. Konten publik masih memakai JSON server dengan browser storage sebagai cache; PostgreSQL pada PRD belum diterapkan.
2. File video produksi sekitar 23 MB disimpan di repository. Object storage/CDN akan mengurangi ukuran clone dan deployment.
3. Sitemap masih berisi hash URL dan tanggal `lastmod` lama. Sitemap sebaiknya dipindahkan ke URL halaman yang dapat diindeks setelah route publik stabil.
4. Penerjemahan otomatis dapat mengirim potongan teks ke MyMemory API. Perlu keputusan privasi dan fallback sebelum digunakan untuk konten sensitif.
5. Script generator lama masih disimpan untuk referensi. Script tersebut dapat menimpa source dan tidak menjadi bagian workflow release.
6. PRD V2 adalah target arsitektur. Implementasi produksi saat ini masih aplikasi Vite dengan endpoint PHP untuk kebutuhan server ringan.
7. Hostinger Reach belum tersedia untuk akun ini (API 403), sehingga broadcast memakai mail transport Hostinger. SPF, DKIM, dan DMARC domain tersedia; statistik bounce/click lanjutan menunggu provider kampanye.
8. Nomor tracking contoh pada dokumentasi ERP merespons `SHIPMENT_NOT_FOUND` saat audit 4 Oktober 2026. State sukses sudah disiapkan, tetapi perlu diverifikasi kembali memakai nomor shipment produksi yang valid.

## Riwayat deployment terakhir

| Commit | Hasil |
| --- | --- |
| `376bb94` | Operator multiuser, izin per modul, CMS berita, pengaturan situs global, dan SEO live terverifikasi |
| `4d5e55e` | Carousel layanan operator, Shipment Tracking ERP, footer baru, lazy chunks, dan cache aset live terverifikasi |
| `8f37b6c` | Penyederhanaan frontend 4 Oktober 2026, live di produksi dan terverifikasi |
| `cb01153` | Navbar responsif, build Hostinger completed |
| `d347542` | Konten/media produksi dipulihkan, build completed |
| `86eb665` | Rewrite SPA ditambahkan, build completed |

Catatan perubahan manusiawi tersedia di [../CHANGELOG.md](../CHANGELOG.md); detail per file tetap tersedia melalui `git log` dan `git show`.
