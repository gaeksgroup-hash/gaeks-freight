# Rilis indeks layanan, 27 November 2026

## Arah dan perubahan

Design Read: halaman penemuan layanan B2B bagi importir dan tim operasional, dengan bahasa visual editorial maritim GAEKS. ENERGY 2 / RHYTHM 3 / MOTION 1. Acuan visual proyek ada di `DESIGN.md`; skill bersama diperiksa lewat `npm run standards:check`.

`/layanan/` kini memakai pembuka foto kargo bernuansa teal, daftar sembilan layanan yang ringkas, dan satu panel pratinjau yang mengikuti pilihan. Desktop menempatkan daftar di sisi foto dan rincian; ponsel memakai pilihan horizontal yang dapat digeser. Bentuk ini menaruh perbandingan cepat lebih dulu, lalu tautan menuju halaman detail dan permintaan penawaran. Foto dan ringkasan masuk dengan transisi opacity/transform singkat saat pilihan berubah. Tidak ada animasi berjalan terus; pengaturan reduced motion menampilkan keadaan akhir tanpa transisi tersebut.

Judul, pengantar, label, CTA, status layanan, foto, serta deskripsi berasal dari CMS dan seed yang bisa diedit di Operator. Ketika tidak ada layanan terbit, tersedia pesan dan tautan kontak. Gambar yang gagal dimuat beralih ke poster lokal. Foto poster lokal berukuran 54.448 byte, memiliki dimensi dan prioritas muat tinggi; ukuran transfer total halaman dan Core Web Vitals lapangan belum diukur.

## SEO, AEO, GEO

HTML server `/layanan/` menampilkan satu H1, pengantar, judul, ringkasan, dan tautan kanonis untuk setiap layanan terbit. JSON-LD `CollectionPage` dan `ItemList` memakai daftar yang sama; React menjaga schema ketika navigasi tanpa muat ulang. Metadata title, description, canonical, dan status indeks tetap bersumber dari CMS serta aturan staging. Hero dipreload sebagai gambar prioritas tinggi pada HTML awal. Layanan draf tetap dikecualikan dari HTML publik, API publik, dan sitemap.

Ini membuat katalog dapat dibaca crawler tanpa menunggu interaksi dan menjaga data terstruktur sesuai teks terlihat. Tidak ada klaim bahwa Google memberi rich result, halaman telah terindeks, atau asisten AI telah mengutipnya. Status indeks, impresi, query, sitasi AI, dan dampak inquiry memerlukan data Search Console/Bing seperti dicatat dalam `AEO_GEO_AUDIT_2026-11-27.md`. File `llms.txt` bukan syarat Google untuk fitur AI.

## Bukti lokal

- `npm run standards:check`: 310 file skill terpin diverifikasi.
- `npm run build`: TypeScript, Vite, dan generator SEO lulus.
- `npm run php:lint`: 18 file PHP lulus.
- `npm run test:cms`: 28 kombinasi rute dan viewport pada 375, 768, 1024, 1440 px; tidak ada overflow atau exception JavaScript. Screenshot `/layanan/` pada keempat lebar disimpan di `test-results/`, dan 375/1440 telah ditinjau visual.
- Tes memeriksa poster hero termuat, semua sembilan pilihan tampil, Enter memilih RORO, tautan detail mengarah ke `/layanan/roro-breakbulk/`, serta perubahan heading CMS sampai HTML server. HTML server memiliki `CollectionPage`, `ItemList`, dan sembilan URL kanonis. axe-core pada main/footer di 375/1440 tidak melaporkan pelanggaran WCAG 2 A/AA dan 2.1 AA pada rute yang diuji. Ini bukan sertifikasi WCAG seluruh situs.
- Gambar layanan dari CMS dapat bergantung pada sumber eksternal. Fallback lokal diuji lewat kode, tetapi semua kondisi gagal jaringan/CDN belum disimulasikan. Lighthouse dan metrik pengguna nyata belum dijalankan.

## Anti Slop delivery gate

Pemeriksaan hanya untuk UI dan copy baru pada indeks layanan; komponen bersama diuji pada rute yang disebut di atas.

- R-02 PASS: copy baru tidak memuat em dash.
- R-03 PASS: tidak ada overflow pada 375/768/1024/1440 px.
- R-17 PASS: angka 09 dihitung dari panjang daftar CMS, tanpa statistik pemasaran.
- R-18 PASS: tidak ditambah testimoni.
- R-23 PASS: poster dan foto memakai aset yang sudah ada; tidak dibuat logo, persona, atau identitas baru.
- R-24 PASS: tautan detail dan kontak mengarah ke rute yang ada.
- R-25 PASS: axe-core tidak menemukan kegagalan kontras pada main/footer di 375/1440 px; nomor daftar digelapkan setelah temuan awal.
- R-26 PASS: tombol pilihan mengubah pratinjau, CTA detail membuka rute layanan, CTA diskusi membuka alur penawaran.
- R-27 PASS: daftar kosong memiliki pesan dan tautan kontak; foto gagal memakai poster lokal.
- R-28 PASS: tidak ditambah FAQ generik.
- R-32 PASS: Enter pada pilihan RORO dan fokus keyboard berfungsi; outline fokus terlihat.
- R-33 PASS: perubahan ada di komponen, CSS, dan PHP sumber.
- R-34 PASS: tidak ada toggle tema baru.
- R-35 PASS: build dan tes klik/keyboard lokal selesai; navigasi detail, penawaran, dan pilihan diuji.
- R-36 PASS: tidak dibuat klaim metrik, sertifikasi, atau proyek baru.
- R-37 PASS: arah dan dial diambil dari `DESIGN.md` sebelum implementasi.
- R-38 PASS: konten layanan tetap dari CMS, tanpa data pelanggan rekaan.
- R-39 PASS: kontrol native berlabel, fokus tampak, gambar dekoratif `alt=""`, dan reduced motion dihormati.
- R-40 PASS: foto hero memiliki dimensi dan `fetchpriority="high"`; pratinjau memiliki dimensi; tidak dilaporkan angka performa yang belum diukur.
- R-01 PASS: lapisan teal pada foto memperkuat identitas dan menjaga kontras teks.
- R-04 PASS: ikon panah menandai pilihan dan arah tindakan, bukan hiasan acak.
- R-06 PASS: tipografi tegas pada judul dan label kecil mengikuti bahasa editorial maritim di `DESIGN.md`.
- R-07 PASS: tidak ada grid dekoratif.
- R-08 PASS: panah pada daftar menandai pratinjau yang dapat dipilih; panah CTA menandai navigasi atau langkah berikut.
- R-09 PASS: label kecil adalah penunjuk bagian, tanpa badge klaim.
- R-10 PASS: tidak ada glassmorphism.
- R-12 PASS: hanya panel rincian terangkat untuk menjaga hierarki.
- R-13 PASS: tidak ada glow.
- R-14 PASS: sembilan pilihan berupa manifest ringkas, bukan sembilan kartu besar yang sama.
- R-19 PASS: hanya transisi perubahan pilihan; tidak ada loop dekoratif.
- R-22 PASS: foto kargo relevan dengan layanan; tidak ada ilustrasi generik baru.
- Liveliness PASS: ENERGY 2 / RHYTHM 3 / MOTION 1; foto dan judul menjadi fokus, daftar memberi ritme, cyan dipakai pada aksi/pilihan, motif manifest berulang, ruang kosong memisahkan pekerjaan utama.
- C-1 PASS: foto, kedalaman satu panel, serta pilihan horizontal masing-masing melayani identitas, hierarki, dan pemakaian ponsel.
- C-2 PASS: semua kontrol baru memiliki tujuan dan perilaku.
- C-3 PASS: hanya pembuka, pemilihan layanan, dan rincian pilihan yang ditambahkan.
- C-4 PASS: empat lebar, keyboard, reduced motion, fallback foto, dan keadaan kosong diperiksa; kegagalan CDN menyeluruh belum diuji.
- C-5 PASS: tidak ada klaim, statistik, atau testimoni buatan.
- R-05 PASS: halaman mengikuti struktur katalog dan pratinjau, bukan pola hero plus kartu seragam.
- R-11 PASS: radius kecil pada kontrol dan panel; tidak semua elemen berbentuk pil.
- R-15 PASS: CTA spesifik pada layanan dan shipment.
- R-16 PASS: copy baru tidak memakai istilah promosi AI generik.
- R-20 PASS: foto freight, teal GAEKS, dan manifest layanan membuat halaman terkait langsung dengan konteks bisnisnya.
- R-21 PASS: permukaan gelap hanya pada pembuka bermerek, bukan tema gelap paksa seluruh halaman.
- R-29 PASS: palet teal, off white, netral, serta aksen cyan terkendali.
- R-30 PASS: tidak menyalin pola produk lain.
- R-31 PASS: alasan komposisi, warna, fotografi, elevasi, dan interaksi dicatat di `DESIGN.md`.

## Modern Web Guidance

- `motion`: animasikan opacity dan transform saja pada perubahan pilihan, dalam `prefers-reduced-motion: no-preference`; tampilan statis tetap lengkap.
- `optimize-image-priority`: poster hero adalah gambar prioritas tinggi dan tidak dimuat lazy; gambar lain tidak diberi prioritas tinggi.
