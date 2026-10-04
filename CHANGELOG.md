# Changelog

Perubahan penting pada GAEKS Freight dicatat di dokumen ini. Riwayat commit Git tetap menjadi catatan teknis lengkap.

## 2026-10-04

### Hero headline dan akselerasi pembuka

- Menghapus panel gambar carousel yang bersaing dengan headline utama dan menggantinya dengan carousel teks layanan yang mengambang pada bidang hero yang sama.
- Menambahkan pemisah responsif agar headline utama dan headline layanan tetap terbaca sebagai dua bagian pada tablet dan ponsel.
- Menghapus gambar layanan kedua dari hero sehingga browser hanya memuat satu visual utama.
- Mengganti animasi Framer Motion dengan transisi CSS kecil dan menghapus dependency beserta chunk animasi sekitar 45 KB gzip.
- Menampilkan poster terlebih dahulu serta menunda request video sampai halaman selesai dimuat dan browser senggang.
- Memakai poster responsif pada tablet, ponsel, data saver, koneksi 3G atau lebih lambat, dan reduced motion sehingga video besar tidak diminta.
- Menghapus stylesheet Google Fonts dari jalur pembuka dan memakai font sistem untuk menghindari request render blocking.
- Menambahkan cache immutable untuk GIF, MP4, dan WebM serta pengaturan poster video pada operator.
- Memadatkan panel newsletter ponsel menjadi satu bidang dengan input dan tombol dalam satu baris.

### Penyempurnaan seluruh frontend dan beranda dinamis

- Menggunakan media operator sebagai background hero dengan pilihan video, GIF, gambar, atau tanpa media serta lapisan kontras tetap agar judul selalu terbaca.
- Menambahkan pengelolaan Our Networks dan Our Clients di modul Beranda operator; kedua section membaca data server dan otomatis tidak dirender ketika kosong.
- Menempatkan Our Networks sebagai deretan badge logo ringkas di atas Layanan dan Our Clients sebagai grid logo di bawah Layanan.
- Melindungi istilah `(Less than Container Load)` dan `(Full Container Load)` dari penerjemahan otomatis.
- Menghapus seluruh simbol em dash yang tampil pada kalkulator, tracking, daftar lokasi, dan operator newsletter.
- Menghapus badge jumlah database yang tidak dibutuhkan dari kepala kalkulator.
- Mendesain ulang pendaftaran newsletter menjadi panel berwarna dengan hierarki, persetujuan, dan tombol yang lebih jelas.
- Memeriksa route home, layanan, kalkulator, tracking, rute, berita, dan kontak pada desktop serta ponsel; tidak ditemukan overflow horizontal atau target tombol di bawah 40 piksel.

### Kalkulator rute multimoda

- Mengubah kalkulator menjadi halaman aplikasi dengan pilihan Laut, Udara, dan Inland serta ringkasan rute yang selalu terlihat.
- Menambahkan registry 500 pelabuhan dari `LIST SEAPORT.pdf` dan 574 bandara dari `AIRPORT LIST.pdf`, memakai kode yang sama dengan ERP.
- Menambahkan 514 kabupaten/kota Indonesia untuk pencarian rute inland berdasarkan data wilayah Kemendagri 2025.
- Menambahkan autocomplete sejak satu karakter, pencarian berdasarkan nama, kota, negara, provinsi, atau kode, navigasi keyboard, serta status lokasi tidak ditemukan.
- Menambahkan fungsi tukar asal dan tujuan serta menyimpan pilihan rute terpisah untuk setiap moda.
- Menyesuaikan dasar tagihan dan saran awal untuk ocean freight, air cargo, dan domestic trucking.

### Penerjemahan situs realtime

- Memusatkan pemilihan bahasa Indonesia, Inggris, dan Mandarin agar seluruh konten publik, termasuk konten dari operator, mengikuti bahasa aktif.
- Menghapus reload saat bendera dipilih; perubahan bahasa diterapkan langsung dan pilihan tersimpan untuk kunjungan berikutnya.
- Memuat mesin penerjemahan setelah konten utama agar pembukaan situs tetap ringan.
- Menyembunyikan banner, spinner, tooltip, dan elemen antarmuka Google Translate dari halaman publik.
- Menerapkan ulang bahasa aktif setelah navigasi SPA, pembukaan artikel atau layanan, dan pembaruan konten operator.

### Daftar layanan

- Mengubah daftar layanan menjadi baris berlatar lembut dengan jarak yang lebih jelas antarlayanan.
- Menambahkan respons hover dan fokus berupa perubahan warna, border, bayangan ringan, serta indikator buka yang lebih tegas.
- Merapikan panel detail dengan pemisah, padding responsif, dan gambar bersudut halus.
- Memperbaiki ambang animasi reveal agar daftar layanan yang panjang langsung terlihat pada layar pendek.

### Navigasi, bahasa, dan media sosial

- Mengubah pengaturan media sosial operator menjadi dropdown platform agar ikon Instagram, Facebook, LinkedIn, YouTube, X, atau TikTok dipilih otomatis.
- Menampilkan tautan sosial sebagai ikon ringkas di footer dan sebagai tombol berlabel pada halaman Kontak.
- Mengganti pemilih bahasa navbar menjadi dropdown aset SVG bendera Indonesia, Inggris, dan Tiongkok tanpa singkatan teks serta mempertahankan nama bahasa untuk pembaca layar.
- Memindahkan breakpoint navigasi penuh ke layar yang lebih lebar agar navbar tidak berdesakan pada laptop kecil dan tablet.
- Menambahkan transisi halaman serta reveal saat scroll dengan CSS dan IntersectionObserver; reduced motion tetap dihormati.
- Mempertahankan Framer Motion carousel sebagai chunk terpisah agar animasi tambahan tidak memperbesar JavaScript pembuka secara berarti.

### Operator multiuser dan CMS global

- Menambahkan akun operator tersimpan privat dengan peran Gaekadmin, Administrator Website, CMS Berita, dan SEO.
- Menegakkan izin per modul di endpoint server untuk konten, media, newsletter, SEO, dan manajemen pengguna.
- Menambahkan panel Pengguna & Peran untuk membuat, menonaktifkan, memperbarui, dan menghapus akun operator; akun utama Gaekadmin tidak dapat dihapus.
- Memisahkan penyimpanan operator per bagian agar perubahan satu modul tidak menimpa data modul lain.
- Menambahkan pengaturan global untuk favicon, logo navbar, logo footer, nomor WhatsApp, email, alamat, menu, footer, media sosial, dan tautan produk digital.
- Menambahkan pengaturan SEO untuk judul, deskripsi, kata kunci, Open Graph, dan kebijakan indeks.
- Menghubungkan Hero, Navbar, Contact, Footer, daftar layanan, serta berita publik ke data server operator.
- Melengkapi CMS berita dengan tombol tambah, editor artikel, hapus, foto, sumber, penulis, tanggal publikasi, dan broadcast newsletter saat artikel baru diterbitkan.
- Memastikan pembaruan berita dan layanan yang tiba setelah halaman dibuka langsung dirender tanpa reload manual.

### Footer, carousel, dan newsletter

- Memadatkan jarak vertikal footer, navigasi, kontak, serta bilah legal tanpa mengurangi target interaksi.
- Menghidupkan carousel hero dengan pergantian otomatis 5,2 detik, gerak gambar ringan, transisi arah, indikator layanan, gesture geser, dan progress line.
- Mempertahankan penghentian carousel saat hover/fokus serta dukungan reduced motion.
- Memindahkan pendaftaran newsletter dari localStorage ke endpoint PHP dan penyimpanan privat di luar public web root.
- Menambahkan konfirmasi email, persetujuan eksplisit, rate limit, honeypot, status pelanggan, dan tautan berhenti berlangganan satu klik.
- Mengaktifkan autentikasi operator berbasis sesi server, cookie HttpOnly/Secure/SameSite, CSRF, dan pembatasan percobaan login.
- Menampilkan daftar subscriber global beserta status dan ekspor CSV di panel operator.
- Mengirim newsletter otomatis dari `news@gaeks.com` saat artikel baru dipublikasikan, dengan header `List-Unsubscribe` dan catatan hasil pengiriman.
- Menambahkan transport SMTP Hostinger dengan konfigurasi privat di luar `public_html`; PHP mail tetap menjadi fallback saat SMTP belum dikonfigurasi.
- Menghapus data subscriber dari file konten publik.

### Carousel layanan dan shipment tracking

- Mengubah gambar hero menjadi carousel layanan yang memakai data dari Manajemen Layanan & Foto operator.
- Menambahkan animasi transisi Framer Motion yang menghormati reduced motion, berhenti saat berinteraksi, dan hanya merender satu slide.
- Menambahkan halaman Shipment Tracking untuk AWB/HAWB, B/L/HBL, GJO, nomor kontainer, dan nomor dokumen.
- Menambahkan client API ERP dengan timeout, penanganan CORS, state loading, not found, error, serta adapter milestone dan timeline.
- Menambahkan route `/#tracking` dan `/tracking`, navigasi utama, pintasan hero, serta CTA footer.
- Memecah halaman khusus dan carousel animasi menjadi chunk terpisah agar JavaScript pembuka lebih kecil.
- Mempertahankan logo GAEKS asli, memakai favicon SVG, dan menambahkan cache header untuk aset versi.
- Menyederhanakan tracking agar sebelum pencarian hanya menampilkan input; hasil difokuskan pada status dan milestone.
- Menambahkan tautan kecil Gaeks Digital Product di footer.

### Penyederhanaan frontend

- Mengganti hero yang padat dengan satu pesan utama, satu CTA, dan tiga pintasan tugas.
- Menghapus status operasional semu, angka tanpa sumber, carousel otomatis, efek glow, serta kartu dekoratif berulang.
- Mengubah katalog layanan, rute, proses, dan rincian data menjadi daftar ringkas dengan disclosure.
- Memisahkan kalkulator dan direktori rute dari homepage agar setiap alat memiliki halaman kerja sendiri.
- Menyederhanakan kalkulator menjadi kelompok input dan satu panel hasil yang tetap mudah dibaca.
- Mengubah berita menjadi daftar yang dapat dicari dan menyederhanakan halaman artikel.
- Merapikan formulir kontak, halaman detail layanan, dan footer.
- Menambahkan `DESIGN.md` sebagai acuan visual, kepadatan, interaksi, dan gaya bahasa.
- Memverifikasi build produksi dan tampilan desktop serta ponsel di browser lokal.

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
