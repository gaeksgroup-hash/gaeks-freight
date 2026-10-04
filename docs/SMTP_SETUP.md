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

Kata sandi SMTP tidak boleh disimpan di repository, `public_html`, localStorage, atau pesan dokumentasi.
