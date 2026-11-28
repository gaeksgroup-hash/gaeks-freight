# 10. GAEKS SEO & Search Intelligence Change Policy

Kebijakan perubahan agar fondasi Search Intelligence tetap utuh di setiap rilis mendatang.

## Aturan Wajib Sebelum Mengubah Rute, Schema, atau Metadata
1. **Satu Sumber Konfigurasi**: Setiap penambahan atau perubahan rute publik wajib memperbarui `public/api/search_intelligence.json` dan `src/utils/routes.ts` terlebih dahulu agar PHP SSR, `scripts/generate-seo.mjs`, `sitemap.xml`, dan React `App.tsx` tetap sinkron.
2. **Kebijakan Rute Baru & Penghapusan Rute**:
   - Dilarang menghapus atau mengganti slug layanan/artikel terbit tanpa menambahkan HTTP `301 Permanent Redirect` di `public/.htaccess`, `scripts/local-router.php` (atau handler PHP terkait).
   - Halaman utilitas internal (`/operator/`, `/api/*`) dan parameter query tracking wajib selalu membawa `noindex, nofollow`.
3. **Anti-Slop & Anti-Duplikasi Konten**:
   - Dilarang memublikasikan artikel baru dengan template paragraf seragam atau slug boilerplate.
   - Setiap layanan baru wajib memiliki `seoTitle`, `metaDescription`, paragraf proses kerja unik, tabel `compare` (minimal 3 opsi), `faq` unik (minimal 3 pertanyaan), serta alokasi ke `contactGroups` di `OperatorAdmin`.
   - Tag `<meta name="keywords">` dilarang ditambahkan kembali ke HTML publik.
4. **Anti-Klaim Dilarang**:
   - Dilarang menambahkan klaim "peringkat tiga besar", nama klien fiktif, tanggal pengiriman fiktif, testimoni buatan, atau angka penghematan tanpa sumber terverifikasi dari pemilik perusahaan.
5. **Verifikasi Wajib Sebelum Push / Merge**:
   - Jalankan berurutan:
     - `npm run standards:check`
     - `npm run build` (otomatis mengeksekusi `scripts/generate-seo.mjs`)
     - `npm run php:lint`
     - `npm run seo:check`
     - `npm run demo:preview` + `npm run test:cms`
   - Jangan pernah push langsung ke `develop` (staging) atau `main` (production) sebelum seluruh pengecekan di atas berstatus `PASS` dan persetujuan rilis eksplisit diberikan pemilik.
