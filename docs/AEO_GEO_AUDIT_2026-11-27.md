# Audit AEO/GEO GAEKS — 27 November 2026

**Status: fondasi teknis dan redaksi layanan sudah terbit; hasil indeks, trafik, serta kutipan AI belum terukur.** Tidak ada dasar untuk menyatakan AEO/GEO telah selesai secara hasil.

Audit baca-saja produksi: beranda, daftar layanan, halaman kontak, direktori telepon, dan sembilan layanan mengembalikan HTTP 200, satu H1, title, canonical HTTPS, metadata indeks, serta JSON-LD. Ketigabelas URL masuk sitemap dinamis. `robots.txt` mengizinkan perayapan publik dan menunjuk sitemap, sambil mengecualikan Operator/API. Layanan yang berstatus draf dikecualikan oleh server dari halaman, API publik, dan sitemap. Pengalaman RORO, kepabeanan general cargo, SKI, undername PI, pilihan udara, dan keputusan pengiriman sudah ditulis berdasarkan konfirmasi pemilik, tanpa portofolio fiktif.

Yang belum dapat dinyatakan selesai:

- Status indeks tiap URL, crawl errors, impresi, klik, query, dan posisi di Google Search Console/Bing Webmaster Tools belum diperoleh. Kelayakan teknis tidak menjamin indeks.
- Kutipan AI dan kualitas inquiry belum punya baseline akun. Bing menyediakan laporan AI Performance untuk sitasi; data sampel perlu ditafsirkan sebagai tren, bukan semua kemunculan.
- Bukti portofolio bernama, tanggal shipment, foto pendukung, dan izin publikasi masih disiapkan. CMS menyediakan kolom dan hanya menerbitkan bukti lengkap yang disetujui.
- Satu gambar artikel lama di `/uploads/1795022773-c132e433-443962-optimized.webp` masih 404 pada audit terdahulu. Pemilik konten perlu memilih pengganti yang benar; jangan menganggap gambar umum sebagai bukti proyek.

Perbaikan pada rilis ini: dua URL hero dari CMS lama terbukti 404, sedangkan poster dan video cadangan yang sudah ada di Hostinger mengembalikan 200. Migrasi server versi 3 mengganti **hanya dua path lama tersebut**, mencadangkan data privat sebelumnya, dan menjaga pilihan media baru operator. Frontend memakai fallback bila gambar/video pilihan berikutnya gagal; poster prioritas tinggi tetap terlihat saat video ditunda atau gagal. Ini memperbaiki pengalaman halaman pertama, bukan bukti skor Core Web Vitals lapangan.

Menurut [panduan Google untuk fitur AI](https://developers.google.com/search/docs/appearance/ai-features) dan [optimasi generative AI](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), halaman harus dapat diindeks, informasinya terlihat dalam teks, kontennya membantu, dan schema konsisten dengan konten yang terlihat. Google tidak mewajibkan file `llms.txt` atau schema khusus AI, serta tidak menjamin kutipan AI. [Bing AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c) dapat dipakai untuk mengukur halaman yang disitasi setelah properti tersedia.

Langkah berikutnya yang memerlukan akses data akun: ekspor GSC dan Bing bertanggal untuk URL prioritas, periksa status indeks dan query, lalu bandingkan hasil 30/60 hari menurut `docs/SERVICE_CMS_RELEASE.md`. Jangan menyajikan angka nol ketika data belum tersedia.
