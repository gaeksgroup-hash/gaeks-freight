# Changelog

Perubahan penting pada GAEKS Freight dicatat di dokumen ini. Riwayat commit Git tetap menjadi catatan teknis lengkap.

## 2026-10-03

### Dokumentasi dan audit

- Menambahkan README project, panduan deployment, dan status produksi.
- Memperbarui PRD agar mencerminkan deployment native Git Hostinger pada branch `main`.
- Memastikan build TypeScript/Vite berhasil dan dependency produksi tidak memiliki advisory npm yang diketahui.
- Memastikan halaman utama, route detail layanan, serta endpoint konten produksi merespons HTTP 200.
- Mencatat batasan operator, media repository, sitemap, dan integrasi penerjemahan eksternal.

## 2026-09-22

### Navbar responsif

- Merapikan hierarki dan jarak navbar desktop.
- Memendekkan label desktop tanpa mengubah tujuan navigasi.
- Menambahkan target sentuh minimal 44 piksel, `aria-current`, `aria-expanded`, label menu, dan penutupan dengan tombol Escape.
- Membuat menu ponsel memenuhi lebar viewport dan mencegah overflow horizontal.
- Menghapus glow logo, blur navbar, emoji bendera, dan panah dekoratif.
- Memperbaiki URL WhatsApp dari nomor lokal menjadi format internasional `62...`.
- Menghapus aturan global `header { display: flex !important; }` yang merusak panel menu ponsel.
- Menerapkan panduan UI/UX Pro Max dan filter Anti Slop pada perubahan navbar.

### Deployment produksi

- Memindahkan deployment ke integrasi Git native Hostinger dari branch `main`.
- Menghapus workflow FTP GitHub Actions yang tidak lagi digunakan.
- Memulihkan konten JSON dan media produksi yang diperlukan oleh situs.
- Menambahkan rewrite SPA untuk `/operator` dan `/layanan/<slug>`.
- Build Hostinger untuk commit `cb01153` selesai dan navbar baru diverifikasi di `https://gaeks.com`.

## 2026-09-17

### Fondasi V2

- Menambahkan PRD V2 dan inventaris aplikasi legacy.
- Menonaktifkan login operator berbasis client dan mutasi endpoint legacy.
- Menyusun ulang homepage, layanan, halaman detail, editorial, motion, dan sistem visual freight.
- Memperluas formulir inquiry serta route detail layanan yang dapat dibuka langsung.
