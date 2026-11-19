# Daftar PI dan integrasi ERP procurement

Halaman `/layanan/undername-impor-pi/` membaca daftar publik dari `GET /api/pi-catalog.php`. Data disimpan pada `gaeks-private/pi_catalog.json`, terpisah dari data tracking shipment dan konten umum. File awal disalin dari `public/api/pi_catalog_seed.json` saat pertama kali diakses. Operator CMS menyediakan modul **Daftar PI** untuk menambah, memperbarui, dan menghapus baris. Halaman publik memeriksa pembaruan setiap 30 detik dan saat tab kembali aktif.

Seed memuat empat kandidat HS dari [Lampiran I Permendag 22/2025](https://jdih.kemendag.go.id/pdf/Regulasi/0/Permendag%20Nomor%2022%20Tahun%202025%20tentang%20Kebijakan%20dan%20Pengaturan%20Impor%20Barang%20Industri%20Tertentu.pdf). Seluruhnya berstatus `to_be_confirmed` karena klasifikasi barang, ketentuan terbaru, dan kesiapan layanan belum diverifikasi. Status `ready` berarti kesiapan layanan yang sudah diverifikasi GAEKS; tidak berarti PI pasti disetujui. Baris `ready` wajib mencantumkan `sourceUrl` HTTPS dan `verifiedAt`.

ERP procurement nantinya dapat mengirim snapshot penuh melalui `POST /api/pi-catalog.php` dengan `Authorization: Bearer <token>` dan `Content-Type: application/json`. Endpoint menerima token hanya dari variabel lingkungan server `GAEKS_ERP_PI_CATALOG_TOKEN`; bila belum disetel, akses ERP tidak aktif. Jangan menaruh token di frontend, repository, atau pesan WhatsApp. POST Operator CMS memakai sesi operator dengan izin `site.services` dan token CSRF. Payload maksimum 1,5 MB dan 1.000 baris; update disimpan secara atomik.

```json
{
  "items": [
    {
      "id": "erp-72083990",
      "hsCode": "7208.39.90",
      "commodity": "Uraian barang yang diverifikasi",
      "status": "to_be_confirmed",
      "sourceLabel": "Rujukan resmi",
      "sourceUrl": "https://example.org/rujukan",
      "verifiedAt": null,
      "note": "Keterangan publik singkat"
    }
  ]
}
```

POST mengganti seluruh daftar. ERP sebaiknya mengirim `id` stabil per baris, menyimpan riwayat/snapshot di sisinya sebelum mengganti, dan tidak mengirim identitas prospek atau nomor shipment. Balasan berhasil berisi `status`, `updatedAt`, dan `count`. Sebelum integrasi diaktifkan, atur token server dan uji kirim dari ERP pada lingkungan staging.
