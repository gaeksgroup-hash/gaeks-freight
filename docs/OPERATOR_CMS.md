# Operator dan CMS GAEKS

Panel operator tersedia di `https://gaeks.com/operator` dan `https://gaeks.com/#operator`.

## Peran

| Peran | Modul |
| --- | --- |
| Gaekadmin | Semua modul, termasuk Pengguna & Peran |
| Administrator Website | Brand & Kontak, Navigasi & Footer, Beranda, Layanan, Media, dan daftar Newsletter |
| CMS Berita | CMS Berita, Media, dan daftar Newsletter |
| SEO | SEO |

Pembatasan peran diperiksa oleh antarmuka dan endpoint PHP. Menyembunyikan menu di browser bukan satu satunya kontrol akses.

## Penyimpanan global

- Branding, beranda, navigasi, footer, layanan, artikel, dan SEO ditulis ke `gaeks-private/site_content.json` di luar checkout Git dan `public_html`.
- Browser publik mengambil data melalui `/api/sync.php` saat halaman dibuka, saat tab kembali aktif, dan setiap 15 detik.
- Tab operator dan publik pada perangkat yang sama memakai BroadcastChannel serta storage event agar perubahan yang baru disimpan tampil langsung.
- Penyimpanan browser hanya menjadi cache tampilan. Sumber bersama tetap berkas server.
- Akun operator, hash kata sandi, subscriber, token newsletter, log pengiriman, dan konfigurasi SMTP disimpan di `gaeks-private` di luar `public_html`.

## Pengguna baru

1. Masuk sebagai `Gaekadmin`.
2. Buka **Pengguna & Peran**.
3. Pilih **Tambah pengguna**.
4. Isi username, nama, peran, dan kata sandi minimal 12 karakter.
5. Simpan. Pengguna dapat langsung masuk dan hanya melihat modul sesuai perannya.

## Publikasi berita

1. Pengguna Gaekadmin atau CMS membuka **CMS Berita**.
2. Pilih **Tulis berita**, isi judul, kategori, tanggal, ringkasan, foto, isi, dan sumber.
3. Pilih **Simpan ke server**.
4. Artikel langsung tersedia di halaman Berita dan ringkasan homepage.
5. Jika ID artikel belum pernah ada, server mengirim newsletter kepada subscriber berstatus aktif.

Mengedit artikel yang sudah ada tidak mengirim broadcast ulang. Menghapus artikel juga tidak mengirim email.

## Aset dan media

Media yang diunggah dari panel diproses sebelum dipublikasikan ke `/uploads`:

- Gambar diringkas ke ukuran maksimum 1920 piksel dan WebP kualitas 82 melalui Imagick atau GD.
- GIF animasi diperkecil dan ditulis ulang oleh Imagick tanpa membuang animasinya.
- Video maksimal 90 detik dirender di browser operator menjadi WebM 720p, 24 fps, tanpa audio. Poster WebP dibuat otomatis dan diisi ke pengaturan hero.
- Endpoint menolak video yang tidak melewati renderer operator. Indeks media disimpan di `gaeks-private/media_library.json` sehingga tidak tertimpa deployment Git.

Pada modul Beranda, operator dapat memilih mode video **Adaptif**, **Semua perangkat yang mampu**, atau **Poster saja**, serta jeda sebelum video diminta. Hapus media hanya jika aset tersebut sudah tidak dipakai oleh logo, layanan, hero, atau artikel.

## Media sosial

1. Buka **Navigasi & Footer**.
2. Pada bagian **Media sosial**, pilih **Tambah**.
3. Pilih platform dari dropdown dan masukkan URL profil lengkap.
4. Simpan ke server. Ikon platform muncul otomatis di footer dan halaman Kontak.

Platform yang tersedia: Instagram, Facebook, LinkedIn, YouTube, X, dan TikTok.

## Keamanan

- Cookie sesi memakai `Secure`, `HttpOnly`, dan `SameSite=Strict`.
- Semua perubahan memakai token CSRF.
- Akun utama Gaekadmin tidak dapat diedit atau dihapus dari endpoint pengguna.
- Kata sandi operator tambahan disimpan sebagai hash PHP dan tidak pernah dikirim kembali ke browser.
