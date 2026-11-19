# Halaman tujuan Google Ads

URL: `/layanan/freight-laut-fcl/`, `/layanan/freight-udara/`, `/layanan/ppjk-customs-clearance/`, dan `/layanan/undername-impor-pi/`. Parameter yang diterima adalah `service=fcl|air|ppjk|undername`, `direction=impor|ekspor`, dan `city=Jakarta|Semarang|Surabaya` (kota tidak peka huruf besar). Undername tetap menggunakan arah impor. Pilihan tetap dapat diubah pengunjung. Parameter UTM tetap pada URL kedatangan dan disimpan di `sessionStorage` dengan kunci `gaeks_quote_utm`; data formulir tidak ditambahkan ke URL situs atau event analitik.

Judul dan konten iklan utama memakai `landingTitle` dan `landingDescription` pada item layanan Operator CMS bila terisi, dengan teks netral bawaan bila kosong. Kontak memakai pengaturan Brand & Kontak Operator CMS. Pembaruan tersimpan di server melalui `/api/sync.php` dan disebarkan ke klien oleh `adminStorage`.

Event `gaeks_contact_click` hanya mencatat kanal (`whatsapp` atau `email`) dan layanan. Event ini berarti komposer atau tautan dibuka, **bukan** pesan terkirim atau prospek qualified. Jangan jadikan event klik sebagai konversi inquiry. Konfirmasi pesan terkirim dan kualitas prospek memerlukan pencatatan dari WhatsApp/CRM dan pengukuran server/offline yang terpisah, dengan persetujuan serta identitas konversi yang sesuai.

Belum ada ID GA4, Google Ads, atau GTM di repository. Sebelum pengukuran iklan diaktifkan, tetapkan ID/tag resmi, definisi conversion action, sumber konfirmasi inquiry dan qualified, serta aturan atribusi UTM. Jangan mengarang ID atau menandai klik sebagai lead.

Situs memakai Vite SPA dan rewrite Apache (`public/.htaccess`). Empat URL iklan melewati `public/api/service.php` ke `public/landing.php`, yang membaca data Operator CMS dan mengirim judul, deskripsi, canonical, skema layanan, serta konten semantik awal dalam HTML sebelum JavaScript berjalan. React kemudian menampilkan halaman interaktif dan memperbarui skema dengan breadcrumb serta FAQ yang sama dengan konten terlihat.

GAEKS telah mengonfirmasi jasa undername impor dan PI. Halaman undername menjelaskan bahwa skema undername dan kewajiban PI perlu ditinjau terpisah. Ketersediaan per HS serta cakupan operasional PPJK di Jakarta, Semarang, dan Surabaya tetap memerlukan verifikasi; tabel PI awal tidak menyatakan izin pasti dibutuhkan atau terbit.
