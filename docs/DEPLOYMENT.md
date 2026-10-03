# Deployment GAEKS Freight

## Jalur produksi

Repository GitHub:

`https://github.com/gaeksgroup-hash/gaeks-freight`

Branch produksi: `main`.

Hostinger terhubung langsung ke repository dan menjalankan build setelah commit baru masuk ke `main`. GitHub Actions dan FTP tidak digunakan.

## Konfigurasi build aktif

| Pengaturan | Nilai |
| --- | --- |
| Runtime | Node.js 22 |
| App type | Vite |
| Package manager | npm |
| Build script | `build` |
| Output directory | `dist` |
| Source | GitHub, branch `main` |

Perintah yang setara secara lokal:

```bash
npm ci
npm run build
```

## Prosedur release

1. Pastikan working tree bersih.
2. Jalankan `npm run build`.
3. Periksa perubahan dengan `git diff --check`.
4. Commit dengan pesan yang menjelaskan hasil pengguna.
5. Push commit ke `main`.
6. Tunggu build Hostinger berstatus `completed`.
7. Periksa `https://gaeks.com/` dan route yang berubah.

## Pemeriksaan produksi minimum

- Halaman utama mengembalikan HTTP 200 dan memuat konten GAEKS.
- `/layanan/ppjk-customs-clearance` mengembalikan aplikasi, bukan 404.
- `/api/site_content.json` mengembalikan JSON.
- Navbar desktop tidak bertabrakan pada lebar 1024 piksel.
- Menu ponsel tidak menimbulkan overflow horizontal.
- Tautan WhatsApp menggunakan awalan negara `62`.

## Rollback

Gunakan commit produksi terakhir yang diketahui stabil, lalu buat revert commit dan push ke `main`:

```bash
git revert <commit-yang-bermasalah>
git push origin main
```

Revert menjaga riwayat perubahan dan kembali memicu build otomatis Hostinger.

## Catatan

- Jangan menjalankan script `rebuild_*.cjs`, `update_*.cjs`, atau `build_all_gaeks.cjs` sebagai prosedur deployment. File tersebut adalah tooling historis.
- Jangan mengaktifkan kembali endpoint POST legacy tanpa autentikasi dan otorisasi server.
- `dist/` adalah hasil build lokal dan tidak disimpan di Git.
