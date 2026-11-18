# Konfigurasi SMTP Newsletter GAEKS

Newsletter membaca kredensial SMTP dari file privat berikut pada hosting:

```text
/home/u922552590/domains/gaeks.com/gaeks-private/smtp.php
```

File berada di luar `public_html`, tidak ikut Git, dan tidak dapat diakses melalui URL situs.

## Isi file

```php
<?php
return [
    'host' => 'smtp.hostinger.com',
    'port' => 465,
    'encryption' => 'ssl',
    'username' => 'news@gaeks.com',
    'password' => 'GANTI_DENGAN_PASSWORD_EMAIL_NEWS',
];
```

Simpan file dengan permission `600` bila pengaturan permission tersedia. Jika koneksi SSL port 465 tidak tersedia, gunakan port `587` dengan nilai encryption `starttls`.

## Pemeriksaan

1. Buka `/operator` dan login.
2. Buka menu **Subscriber Buletin**.
3. Status pengirim harus berubah dari **fallback PHP mail** menjadi **SMTP terautentikasi**.
4. Daftarkan ulang alamat yang masih berstatus pending untuk mengirim ulang email konfirmasi.

## Pengiriman artikel

Artikel berstatus **Terbit** dikirim setelah dipublikasikan atau setelah isi editorialnya berubah. Setiap versi dikirim satu kali ke setiap alamat aktif. Email yang gagal tetap berada di antrean privat dan dicoba kembali. Operator dapat melihat jumlah antrean serta menekan **Proses antrean** di menu Newsletter. Setiap email memiliki tautan berhenti berlangganan.

Untuk memproses antrean tanpa menunggu kunjungan situs, buat cron Hostinger setiap 5 menit yang melakukan POST ke `https://gaeks.com/api/newsletter_jobs.php` dengan header `X-GAEKS-Cron-Token`. Simpan nilai `GAEKS_NEWSLETTER_CRON_TOKEN` sebagai rahasia server; jangan masukkan token ke Git. Endpoint juga menerima sesi operator dengan izin `newsletter.read` dan token CSRF untuk tombol **Proses antrean**.

Kata sandi SMTP tidak boleh disimpan di repository, `public_html`, localStorage, atau pesan dokumentasi.
