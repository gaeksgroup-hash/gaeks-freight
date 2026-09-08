// filepath: /src/utils/newsStorage.ts
import { ArticleItem, NewsletterSubscriber } from '../types/freight';

const STORAGE_KEY_ARTICLES = 'gaeks_articles';
const STORAGE_KEY_SUBSCRIBERS = 'gaeks_subscribers';

export const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Dampak Badai Topan di Pelabuhan Shanghai & Ningbo: Strategi Mitigasi Keterlambatan Kapal Kontainer ke Indonesia',
    slug: 'dampak-badai-topan-shanghai-ningbo-mitigasi-kapal',
    category: 'Rute Maritim',
    excerpt: 'Penutupan sementara terminal peti kemas Yangshan dan Ningbo-Zhoushan memicu penumpukan kargo ekspor dan pergeseran jadwal kapal ke Tanjung Priok.',
    content: `Siklus badai tropis di kawasan Laut Tiongkok Timur secara periodik melumpuhkan aktivitas pelabuhan kontainer tersibuk di dunia, yaitu Port of Shanghai (Yangshan) dan Ningbo-Zhoushan. Otoritas maritim marak menerapkan status darurat evakuasi kapal ke laut lepas ketika kecepatan angin melampaui 35 knot, yang mengakibatkan operasional crane dermaga dan gerbang penumpukan truk kontainer dihentikan total selama 48 hingga 72 jam.

Bagi para pelaku impor di Indonesia, penghentian sementara ini memicu efek domino yang signifikan terhadap rantai pasok manufaktur. Ketika pelabuhan dibuka kembali, antrean kapal (vessel bunching) menimbulkan kongesti parah di dermaga muat. Waktu tunggu kapal bertambah 3 hingga 5 hari, yang sering kali direspons oleh maskapai pelayaran global dengan kebijakan 'port omit' (melewati pelabuhan tertentu) atau 'blank sailing' (pembatalan jadwal pelayaran). Akibatnya, barang baku industri tekstil, bahan kimia, dan suku cadang mesin yang dijadwalkan tiba di Pelabuhan Tanjung Priok Jakarta, Tanjung Emas Semarang, maupun Tanjung Perak Surabaya mengalami deviasi jadwal hingga 10-14 hari kerja.

Untuk memitigasi risiko pembengkakan biaya pabrik dan denda penalti akibat terhentinya lini produksi, Gaek Freight menyarankan importir mengambil langkah taktis berikut:
1. Membagi alokasi kargo (cargo splitting) ke pelabuhan muat alternatif di Tiongkok Selatan seperti Shenzhen (Yantian/Shekou) atau Nansha Guangzhou yang berada di luar lintasan badai utara.
2. Memanfaatkan layanan pengiriman kargo udara prioritas (Air Shipment) untuk komponen time-sensitive atau suku cadang mesin kritis agar lini perakitan pabrik tetap beroperasi.
3. Memilih shipping line yang memiliki kontrak alokasi ruang langsung (direct call) tanpa transshipment berlapis guna menghindari kargo tertahan di hub transit perantara seperti Singapura atau Busan.

Tim operasional Gaek Freight terus memantau posisi satelit kapal secara real-time dan memberikan laporan pelacakan harian kepada pemilik kargo guna menyesuaikan jadwal pengurusan dokumen pabean PIB sebelum kontainer tiba di dermaga Indonesia.`,
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    author: 'Trade Lane Specialist Gaek',
    publishedDate: '2026-09-06',
    readTime: '6 min read'
  },
  {
    id: 'art-2',
    title: 'Penerapan Penuh Wajib CEISA 4.0 Tahap Terbaru 2026 (KEP-163/BC/2026): SOP Penanganan Kendala Sistem Pabean',
    slug: 'penerapan-wajib-ceisa-4-kep-163-bc-2026',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Keputusan Dirjen Bea dan Cukai mewajibkan otomasi penuh deklarasi pabean impor dan ekspor secara nasional serta rekonsiliasi manifes BC 1.1.',
    content: `Melalui Keputusan Direktur Jenderal Bea dan Cukai Nomor KEP-163/BC/2026, implementasi sistem CEISA 4.0 secara penuh (mandatory) telah diperluas ke seluruh kantor pabean di Indonesia, termasuk KPU Bea dan Cukai Tanjung Priok, KPPBC Tanjung Perak, KPPBC Tanjung Emas, serta KPPBC Belawan. Sistem ini mengintegrasikan modul Electronic Customs Declaration (ECD), integrasi perizinan kementerian melalui INSW, serta rekonsiliasi data manifest kedatangan kapal (BC 1.1) secara otomatis dengan kecerdasan buatan.

Perubahan mendasar dalam regulasi ini menuntut akurasi data yang tanpa toleransi dari pihak importir dan PPJK. Kesalahan penulisan satu digit pada nomor Bill of Lading, nomor kontainer, ukuran kemasan (packing code), atau perbedaan satuan kuantitas barang antara dokumen pelengkap pabean dengan PIB (Pemberitahuan Impor Barang) akan langsung memicu tolakan sistem (reject otomatis). Jika manifest BC 1.1 belum selesai divalidasi saat kapal bersandar, importir terancam tidak dapat mencetak Surat Persetujuan Pengeluaran Barang (SPPB), yang berujung pada penumpukan kontainer dan denda demurrage di dermaga lini 1.

Dalam hal terjadi kendala teknis jaringan atau maintenance server pusat pabean, KEP-163/BC/2026 mengatur Prosedur Operasional Standar (SOP) kontingensi:
1. Pelayanan dokumen manual darurat dapat diaktifkan jika gangguan sistem terkonfirmasi melampaui batas waktu 4 jam kerja.
2. Pengajuan permohonan perbaikan data PIB (Notul) kini diproses melalui portal digital terpadu tanpa memerlukan kehadiran fisik, memangkas birokrasi penyelesaian sengketa tarif.
3. Importir wajib memiliki akses Single Sign-On (SSO) pabean yang valid dengan NIB (Nomor Induk Berusaha) yang berstatus aktif dalam sistem OSS RBA.

Sebagai mitra PPJK resmi berlisensi, Gaek Freight melakukan proses pra-audit dokumen (pre-clearance verification) sebelum data dikirimkan ke CEISA 4.0, memastikan seluruh dokumen legalitas impor aman dari potensi denda administratif dan pemeriksaan mendalam.`,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'Tim Regulasi Pabean Gaek',
    publishedDate: '2026-09-02',
    readTime: '7 min read'
  },
  {
    id: 'art-3',
    title: 'Kebijakan Relaksasi Lartas Impor Bahan Baku Industri Permendag 2025/2026: Syarat Persetujuan Impor (PI) & Laporan Surveyor',
    slug: 'kebijakan-relaksasi-lartas-impor-permendag-2025-2026',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Dinamika regulasi impor komoditas industri tekstil, bahan kimia, elektronik, dan plastik dalam kerangka Permendag No. 16/2025 dan Permendag No. 22/2025.',
    content: `Pemerintah melalui Kementerian Perdagangan menerbitkan regulasi strategis Permendag Nomor 16 Tahun 2025 yang disempurnakan dengan Permendag Nomor 22 Tahun 2025 tentang Kebijakan dan Pengaturan Impor Barang Industri Tertentu. Aturan ini merevisi ketentuan Larangan dan Pembatasan (Lartas) yang sebelumnya sempat menimbulkan penumpukan ribuan kontainer di pelabuhan Tanjung Priok dan Tanjung Perak. Relaksasi difokuskan pada percepatan penerbitan Persetujuan Impor (PI) untuk bahan baku penolong manufaktur serta penghapusan kewajiban pertimbangan teknis (pertek) pada beberapa pos tarif tertentu.

Namun demikian, relaksasi ini tidak berarti penghapusan pengawasan. Pemerintah menggeser fokus kepatuhan pada audit pasca-pengeluaran (post-clearance audit) dan kepatuhan Laporan Surveyor (LS) di pelabuhan muat negara asal. Bagi importir pemilik NIB produsen (API-P), kuota impor diberikan berdasarkan kapasitas riil terpasang mesin pabrik, sedangkan importir umum (API-U) diwajibkan menyertakan surat perjanjian distribusi resmi kepada pengguna akhir.

Poin penting yang wajib diperhatikan oleh pelaku usaha:
- Verifikasi batas berlaku Laporan Surveyor (LS) sebelum tanggal pengapalan (on-board date). Barang yang tiba di pelabuhan Indonesia tanpa LS yang sah akan dikenakan sanksi re-ekspor atau penahanan barang oleh Bea Cukai.
- Kesesuaian uraian barang pada dokumen invoice dengan klasifikasi Buku Tarif Kepabeanan Indonesia (BTKI). Perbedaan penafsiran pos tarif HS code 8 digit dapat menyebabkan sanksi kekurangan pembayaran bea masuk dan denda hingga 1.000%.
- Kepatuhan pelaporan realisasi impor bulanan melalui sistem INSW. Keterlambatan pelaporan dapat berakibat pada pembekuan izin Persetujuan Impor untuk kuartal berikutnya.

Gaek Freight menyediakan layanan konsultasi klasifikasi HS Code dan verifikasi perizinan impor menyeluruh untuk memastikan rantai pasok perusahaan manufaktur tetap berjalan lancar dan terhindar dari sanksi hukum perdagangan.`,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'Trade Policy Analyst',
    publishedDate: '2026-08-25',
    readTime: '8 min read'
  },
  {
    id: 'art-4',
    title: 'Aliansi Pelayaran Maritim 2025/2026: Debut Gemini Cooperation dan Reorganisasi Jaringan Kapal Kontainer ke Indonesia',
    slug: 'aliansi-pelayaran-maritim-gemini-cooperation-ocean-alliance',
    category: 'Rute Maritim',
    excerpt: 'Langkah Maersk dan Hapag-Lloyd dalam Gemini Cooperation merombak hub pelayaran global, mempengaruhi rute feeder Singapura ke Tanjung Perak dan Tanjung Emas.',
    content: `Lanskap industri pelayaran kontainer dunia mengalami transformasi bersejarah dengan beroperasinya aliansi maritim baru: Gemini Cooperation (kolaborasi Maersk Line dan Hapag-Lloyd), bersamaan dengan pembaruan kontrak jangka panjang Ocean Alliance (CMA CGM, COSCO Shipping, Evergreen Line, OOCL) serta restrukturisasi Premier Alliance (ONE, HMM, Yang Ming). 

Model operasional Gemini Cooperation berfokus pada konsep 'hub-and-spoke' dengan target ketepatan jadwal (schedule reliability) melampaui 90%. Konsep ini mengurangi jumlah pelabuhan singgah kapal induk raksasa (mother vessel) dan memusatkan muatan pada hub transshipment utama dunia seperti Pelabuhan Tanjung Pelepas (PTP) di Malaysia dan Port of Singapore (PSA). Kargo tujuan pelabuhan sekunder di Indonesia seperti Tanjung Emas Semarang, Tanjung Perak Surabaya, dan Belawan Medan dialirkan melalui armada kapal pengumpan berdedikasi (dedicated feeder vessels).

Implikasi penting bagi para eksportir dan importir Indonesia:
1. Peningkatan Kepastian Jadwal Kedatangan: Frekuensi kapal feeder harian dari Singapura dan Tanjung Pelepas ke pelabuhan utama Jawa menjamin kepastian waktu transit yang lebih stabil, mempermudah manajemen inventory 'Just-in-Time'.
2. Fluktuasi Ketersediaan Peti Kemas Kosong: Kebutuhan reposisi kontainer kosong (empty positioning) di pelabuhan manufaktur Tiongkok dan Asia Tenggara dapat memicu kelangkaan kontainer tipe 40ft High Cube saat musim puncak pengapalan (peak season).
3. Transparansi Biaya Feeder dan THC: Importir perlu mewaspadai biaya transshipment surcharge dan Terminal Handling Charges (THC) yang dibebankan dalam Master Bill of Lading oleh masing-masing konsorsium pelayaran.

Gaek Freight mengamankan kontrak alokasi ruang kargo lintas aliansi maritim, memberikan kebebasan fleksibilitas rute bagi klien untuk memilih opsi transit tercepat atau tarif paling ekonomis sesuai kebutuhan operasional usaha.`,
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    author: 'Commercial Maritime Strategist',
    publishedDate: '2026-08-16',
    readTime: '6 min read'
  },
  {
    id: 'art-5',
    title: 'Krisis Geopolitik Rute Laut Merah & Rerouting Tanjung Harapan (Cape of Good Hope): Lonjakan Biaya BAF dan Waktu Transit',
    slug: 'krisis-laut-merah-rerouting-cape-of-good-hope-baf',
    category: 'Rute Maritim',
    excerpt: 'Pengalihan rute kapal melewati ujung selatan Afrika menambah 12-16 hari pelayaran rute Eropa-Asia, memicu lonjakan biaya bahan bakar kapal.',
    content: `Situasi keamanan maritim di kawasan Laut Merah dan Selat Bab el-Mandeb terus memaksa kapal-kapal kontainer global mengalihkan jalur pelayaran dari Terusan Suez menuju rute Tanjung Harapan (Cape of Good Hope) di selatan benua Afrika. Pengalihan rute memutar ini memperpanjang jarak tempuh pelayaran sekitar 3.500 mil laut, menambahkan waktu transit rata-rata 12 hingga 16 hari untuk koridor pengiriman antara Eropa Barat (Rotterdam, Hamburg, Antwerp) ke pelabuhan-pelabuhan utama di Asia Tenggara dan Indonesia.

Dampak langsung terhadap struktur biaya freight forwarding internasional:
- Lonjakan Bunker Adjustment Factor (BAF): Konsumsi bahan bakar kapal yang meningkat tajam menyebabkan maskapai pelayaran memberlakukan Emergency Operations Surcharge (EOS) dan penyesuaian BAF bulanan hingga $400 - $800 per TEU.
- Absorpsi Kapasitas Armada Dunia: Diperlukan sekitar 6% hingga 8% kapasitas kapal tambahan secara global hanya untuk mempertahankan frekuensi mingguan yang sama di rute Asia-Eropa, yang mengakibatkan pengetatan suplai kapal di rute intra-Asia.
- Dampak terhadap Ekspor Komoditas Indonesia: Eksportir furnitur, tekstil, dan hasil laut Indonesia ke pasar Eropa harus memperhitungkan waktu pemesanan kapal 3 hingga 4 minggu lebih awal guna mengantisipasi keterlambatan kontainer tiba di pelabuhan tujuan.

Gaek Freight membantu para eksportir dan importir merancang skenario rantai pasok alternatif, termasuk pemanfaatan multimodal Sea-Air via hub Timur Tengah untuk kargo darurat yang memerlukan waktu transit cepat dengan efisiensi biaya yang terukur.`,
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    author: 'Global Trade Risk Specialist',
    publishedDate: '2026-08-04',
    readTime: '7 min read'
  },
  {
    id: 'art-6',
    title: 'Pemanfaatan Elektronik SKA Form E (e-Form E) ACFTA: Panduan Bebas Bea Masuk 0% Tanpa Risiko Reject Pabean',
    slug: 'pemanfaatan-elektronik-ska-form-e-acfta-bea-masuk-nol-persen',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Tata cara validasi Certificate of Origin elektronik melalui sistem pertukaran data pabean Indonesia-Tiongkok untuk efisiensi margin impor.',
    content: `Skema perdagangan bebas ASEAN-China Free Trade Area (ACFTA) memberikan fasilitas pembebasan bea masuk hingga 0% untuk lebih dari 90% pos tarif barang industri dan konsumsi yang diimpor dari Tiongkok ke Indonesia. Kunci utama untuk menikmati fasilitas preferensi tarif ini adalah kepemilikan Surat Keterangan Asal (SKA) Form E yang sah. Seiring dengan modernisasi kepabeanan, penerbitan Form E kini didominasi oleh sistem elektronik (e-Form E) yang terhubung langsung antara General Administration of Customs of China (GACC) dan portal INSW / CEISA Bea Cukai Indonesia.

Meskipun sistem telah terdigitalisasi, penolakan klaim preferensi tarif oleh pejabat pemeriksa dokumen pabean masih sering terjadi akibat faktor-faktor berikut:
1. Ketidakcocokan Uraian Barang (Description of Goods): Uraian barang pada Form E harus mencerminkan deskripsi fisik pada Invoice dan Bill of Lading, serta memenuhi aturan 'Origin Conferring Criteria' (seperti RVC atau PSR).
2. Kesalahan Pengisian Klausul Third Party Invoicing: Jika transaksi perdagangan melibatkan pihak ketiga (misalnya trader di Hong Kong atau Singapura), kolom 'Third Party Invoicing' pada kotak 13 Form E wajib dicentang dan nama perusahaan penerbit invoice harus dicantumkan secara gamblang.
3. Batas Waktu Direct Consignment: Kargo yang mengalami transshipment di negara non-anggota FTA wajib dilengkapi dokumen 'Through Bill of Lading' atau sertifikat pengawasan pabean (Non-Manipulation Certificate) dari otoritas pelabuhan transit.

Gaek Freight melakukan verifikasi pra-submit terhadap draft Form E dari supplier Tiongkok klien sebelum kapal diberangkatkan, memastikan seluruh dokumen memenuhi standar pabean Indonesia sehingga hak pembebasan bea masuk 0% dapat diklaim secara sah tanpa kendala Notul.`,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'Customs Tariff Specialist',
    publishedDate: '2026-07-22',
    readTime: '6 min read'
  },
  {
    id: 'art-7',
    title: 'Prosedur Pemeriksaan Fisik Jalur Merah & Uji Laboratorium Bea Cukai (BPIB): Panduan Praktis Menghindari Denda Notul',
    slug: 'prosedur-jalur-merah-uji-lab-bpib-bea-cukai',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Langkah preventif menghadapi pemeriksaan fisik peti kemas di Tempat Pemeriksaan Fisik Terpadu (TPFT) dan pengujian spesifikasi laboratorium.',
    content: `Penetapan Jalur Merah dalam proses pengeluaran barang impor mengharuskan dilakukannya pemeriksaan fisik terhadap muatan kontainer oleh petugas pemeriksa Bea Cukai bersama petugas PBM di Tempat Pemeriksaan Fisik Terpadu (TPFT) Pelabuhan. Prosedur ini bertujuan memastikan kesesuaian jenis barang, jumlah, merek, dan spesifikasi teknis antara dokumen pabean PIB dengan kargo riil di dalam kontainer. Untuk komoditas kimia, tekstil poliester, baja paduan, dan bahan pangan olahan, pemeriksa pabean berwenang mengambil sampel uji untuk dianalisis di Balai Pengujian dan Identifikasi Barang (BPIB).

Keterlambatan proses jalur merah sering kali memicu pembengkakan biaya sewa lapangan penumpukan dan lift-on/lift-off kontainer. Langkah strategis importir untuk mempercepat proses jalur merah:
- Kesiapan Tenaga Kerja Bongkar Muat: Mengajukan Surat Pemberitahuan Kesiapan Barang (SPKB) segera setelah respon SPJM (Surat Pemberitahuan Jalur Merah) terbit di portal Ceisa.
- Penataan Kargo di Kontainer (Stowage Plan): Menyusun barang secara rapi dan menyediakan marking koli yang jelas. Penataan yang teratur mempermudah petugas pemeriksa melakukan penghitungan sampling fisik tanpa harus membongkar seluruh isi peti kemas (full unstuffing).
- Kelengkapan Dokumen Teknis: Menyiapkan Material Safety Data Sheet (MSDS), Certificate of Analysis (CoA), dan brosur spesifikasi pabrik untuk mempercepat proses identifikasi oleh analis laboratorium BPIB.

Tim lapangan Gaek Freight mendampingi proses pemeriksaan fisik langsung di dermaga Tanjung Priok, Tanjung Emas, dan Tanjung Perak, memastikan segel pabean dibuka dan dipasang kembali sesuai prosedur hukum resmi serta meminimalisir dwell time kargo.`,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'Field Clearance Supervisor',
    publishedDate: '2026-07-10',
    readTime: '7 min read'
  },
  {
    id: 'art-8',
    title: 'Tata Kelola Pengembalian Empty Container & Optimalisasi Free Time di Terminal JICT, Koja, dan NPCT1 Tanjung Priok',
    slug: 'tata-kelola-empty-container-free-time-tanjung-priok',
    category: 'Operational Freight',
    excerpt: 'Menghindari biaya detention kontainer melalui koordinasi cepat depo peti kemas kosong di kawasan Marunda, Cakung, dan Cilincing.',
    content: `Biaya sewa peti kemas (detention) mulai dihitung sejak kontainer ditarik keluar dari pintu gerbang pelabuhan (gate-out) hingga kontainer kosong dikembalikan ke depo yang ditunjuk oleh pelayaran dalam keadaan bersih dan laik pakai. Di area hinterland Pelabuhan Tanjung Priok, kemacetan lalu lintas truk di koridor Cilincing, Cakung, dan Marunda kerap menjadi penghambat utama pengembalian kontainer tepat waktu sebelum batas akhir Free Time terlampaui.

Strategi pengelolaan depo peti kemas kosong:
1. Konfirmasi Lokasi Depo Sejak Awal: Maskapai pelayaran sering kali mengubah lokasi pengembalian kontainer (return depot) pada sistem delivery order elektronik saat kapasitas depo tertentu mengalami kelebihan muatan. Pengecekan lokasi depo sebelum truk berangkat dari gudang pabrik menghindari biaya putar balik armada truk.
2. Survei Kondisi Peti Kemas Saat Penerimaan: Mencatat dan memotret kerusakan minor (dents, scratches) pada kontainer sebelum keluar pelabuhan. Dokumentasi ini melindungi importir dari klaim biaya perbaikan (equipment repair charges) sepihak dari pihak depo saat kontainer kosong dikembalikan.
3. Pemanfaatan Armada Trucking Terjadwal: Memastikan proses bongkar muat kargo (unloading) di pabrik selesai dalam kurun waktu kurang dari 6 jam sehingga armada trailer dapat langsung mengembalikan kontainer kosong pada hari yang sama.

Gaek Freight mengoperasikan armada truk trailer sendiri dengan integrasi sistem dispatching terkomputerisasi, menjamin pengembalian empty container selalu dalam jendela batas Free Time yang telah dinegosiasikan.`,
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    author: 'Inland Fleet Dispatcher',
    publishedDate: '2026-06-28',
    readTime: '6 min read'
  },
  {
    id: 'art-9',
    title: 'Formula Matematika Kubikasi Kargo: Perhitungan Detail CBM Laut vs Volumetrik Kargo Udara dengan Studi Kasus Manufaktur',
    slug: 'formula-matematika-kubikasi-cbm-laut-vs-volumetrik-udara',
    category: 'Operational Freight',
    excerpt: 'Membedah rumus pembagi 1.000.000 untuk laut dan pembagi 6.000 untuk udara guna menghitung chargeable weight secara transparan.',
    content: `Salah satu sumber kebingungan terbesar bagi staf logistik perusahaan pemula adalah perbedaan antara berat aktual timbangan fisik (actual gross weight) dengan berat yang ditagihkan oleh forwarder (chargeable weight). Di industri pengiriman internasional, kapasitas kapal laut dan pesawat terbang dibatasi oleh dua faktor mutlak: daya angkut beban maksimum (deadweight capacity) dan volume ruang muat (volumetric capacity).

Aturan Baku Perhitungan Internasional:
A. Pengiriman Laut (Ocean Freight - LCL):
Rumus Volume: (Panjang cm x Lebar cm x Tinggi cm) / 1.000.000 = Total CBM (Cubic Meter).
Rasio Standar: 1 CBM setara dengan 1.000 Kilogram (1 Metrik Ton).
Dasar Tagihan: Dipilih nilai tertinggi antara Total CBM fisik kargo versus Berat Aktual dalam satuan Tonase.
Contoh Kasus: Pengiriman 2 peti mesin dengan dimensi masing-masing 150 x 100 x 120 cm (total volume = 3.6 CBM) dan berat total 4.200 KG (4.2 Ton). Dasar tagihan yang dikenakan adalah 4.2 CBM (karena berat tonase lebih dominan daripada volume).

B. Pengiriman Udara (Air Cargo):
Rumus Volumetrik: (Panjang cm x Lebar cm x Tinggi cm) / 6.000 = Berat Volumetrik dalam Kilogram (KG).
Rasio Standar: 1 CBM di udara setara dengan 167 Kilogram.
Dasar Tagihan: Dipilih nilai tertinggi antara Berat Aktual Timbangan (Actual KG) versus Berat Volumetrik (Volumetric KG).
Contoh Kasus: Kargo suku cadang elektronik ringan dikemas dalam kardus berukuran 80 x 60 x 50 cm dengan berat fisik 20 KG. Berat volumetrik = (80 x 60 x 50) / 6.000 = 40 KG. Maskapai udara akan menagihkan biaya berdasarkan 40 KG.

Alat kalkulator 'Cargo Check!' di portal Gaek Freight mengotomasi perhitungan matematis ini secara instan, memberikan estimasi akurat sebelum penawaran tarif resmi diterbitkan.`,
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    author: 'Logistics Engineering Lead',
    publishedDate: '2026-06-15',
    readTime: '7 min read'
  },
  {
    id: 'art-10',
    title: 'Standar Keselamatan Pengiriman Kargo Baterai Lithium IATA DGR: Kepatuhan Section II & Regulasi Packing UN 3480',
    slug: 'standar-keselamatan-baterai-lithium-iata-dgr-un-3480',
    category: 'Kargo Khusus',
    excerpt: 'Persyaratan wajib pengujian UN 38.3, label identifikasi Class 9, dan batasan State of Charge (SoC) pada pengangkutan udara ekspres.',
    content: `Baterai lithium telah diklasifikasikan sebagai Bahan Berbahaya (Dangerous Goods) Kelas 9 oleh International Air Transport Association (IATA) dan International Civil Aviation Organization (ICAO) karena potensi bahaya pelarian termal (thermal runaway) yang dapat memicu kebakaran intens di ketinggian jelajah pesawat.

Kategori Pengangkutan Udara:
- UN 3480: Baterai Lithium Ion (berdiri sendiri / standalone). Wajib diangkut khusus menggunakan pesawat kargo (Cargo Aircraft Only - CAO) dengan tingkat pengisian daya maksimum (State of Charge / SoC) tidak boleh melebihi 30% dari kapasitas desain.
- UN 3481: Baterai Lithium Ion yang dikemas bersama peralatan (packed with equipment) atau terpasang langsung di dalam peralatan (contained in equipment).

Persyaratan Dokumen dan Pengemasan Mutlak:
1. Ringkasan Uji Baterai UN 38.3 (UN 38.3 Test Summary): Dokumen resmi dari laboratorium terakreditasi yang menyatakan baterai telah lolos pengujian simulasi ketinggian, termal, getaran, benturan, dan korsleting eksternal.
2. Lembar Data Keselamatan Bahan (MSDS / SDS): Wajib memuat nomor registrasi CAS yang sah dan diterbitkan dalam kurun waktu maksimal 2 tahun terakhir.
3. Tanda dan Label Khusus: Paket kargo wajib ditempeli tanda penanganan baterai lithium IATA dengan nomor telepon darurat 24 jam yang dapat dihubungi secara global.

Gaek Freight memiliki personel bersertifikasi IATA DGR untuk menginspeksi kemasan kargo baterai lithium sebelum diterbangkan, menjamin kelancaran kargo sampel elektronik dan perangkat energi terbarukan tanpa risiko penolakan di terminal bandara.`,
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    author: 'Aviation Dangerous Goods Inspector',
    publishedDate: '2026-06-01',
    readTime: '6 min read'
  },
  {
    id: 'art-11',
    title: 'Pengoperasian Cold Chain Reefer Container: Menjaga Stabilitas Mutu Komoditas Farmasi dan Pangan Impor',
    slug: 'pengoperasian-cold-chain-reefer-container-farmasi-pangan',
    category: 'Kargo Khusus',
    excerpt: 'Standar pemantauan suhu mikroprosesor, pengoperasian genset darat (clip-on), dan tata cara sertifikasi sanitasi karantina hewan/tumbuhan.',
    content: `Pengiriman komoditas perishable bersuhu terkendali seperti vaksin farmasi, daging beku, buah-buahan impor, dan produk olahan susu memerlukan rantai dingin (cold chain) yang tidak boleh terputus sedetik pun dari pelabuhan muat hingga gudang pendingin (cold storage) tujuan. Fluktuasi suhu sebesar 2 derajat Celsius saja berpotensi merusak struktur biokimia produk farmasi atau mempercepat pembusukan pangan segar.

Peti kemas berpendingin (Reefer Container) 20ft dan 40ft HC modern dilengkapi dengan kompresor canggih dan alat perekam data suhu digital (data logger). Selama pelayaran di atas kapal kontainer, unit reefer dihubungkan ke soket daya listrik kapal (reefer plugs) dengan inspeksi harian oleh kru teknisi kapal. 

Saat kontainer dibongkar di pelabuhan Tanjung Priok atau Tanjung Perak dan ditarik menuju pabrik menggunakan armada trailer darat, Gaek Freight memasang unit generator diesel portabel (Genset Clip-on/Undermount). Genset ini memastikan kompresor pendingin kontainer tetap memperoleh aliran listrik stabil selama perjalanan darat melewati jalan tol Trans Jawa. Selain keandalan peralatan, tim kepabeanan kami mempercepat penyelesaian dokumen sertifikasi karantina tumbuhan (KT-9) dan karantina hewan (KH-7) guna meminimalkan dwell time kontainer di lapangan pabean.`,
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    author: 'Cold Chain Engineering Lead',
    publishedDate: '2026-05-19',
    readTime: '7 min read'
  },
  {
    id: 'art-12',
    title: 'Manajemen Bongkar Muat Stevedoring & Pergudangan PBM di Dermaga Jamrud & Berlian Tanjung Perak Surabaya',
    slug: 'manajemen-stevedoring-pergudangan-pbm-tanjung-perak',
    category: 'Operational Freight',
    excerpt: 'Proses cargodoring muatan curah kering, kargo palet industri semen, dan manajemen cross-docking fasilitas lini 1 pelabuhan Jawa Timur.',
    content: `Dermaga Jamrud, Berlian, dan Nilam di Pelabuhan Tanjung Perak Surabaya merupakan urat nadi distribusi kargo konvensional, curah kering, dan general cargo untuk wilayah Indonesia Timur. Efisiensi operasi Perusahaan Bongkar Muat (PBM) di dermaga ini sangat bergantung pada rasio ketersediaan alat berat stevedoring (crane kapal, gantry crane dermaga, hopper, grab curah, serta forklift kapasitas 5 hingga 35 ton).

Sebagai penyedia jasa PBM terpercaya di Jawa Timur, Gaek Freight mengoordinasikan tiga tahapan bongkar muat secara sinkron:
1. Stevedoring: Pekerjaan membongkar muatan dari palka kapal dan menurunkannya ke atas dermaga pelabuhan dengan standar keselamatan kerja (K3) maritim internasional.
2. Cargodoring: Pemindahan muatan dari bibir dermaga menuju gudang penumpukan lini 1 atau lapangan terbuka menggunakan armada terminal tractor dan trailer pengangkut.
3. Receiving / Delivery: Penyerahan kargo dari gudang pelabuhan ke atas truk distributor pemilik barang dengan validasi surat jalan dan Surat Pengeluaran Barang (SPPB) pabean.

Integrasi fasilitas gudang transit berstandar tinggi memungkinkan penanganan komoditas sensitif cuaca seperti kargo semen kemasan, klinker, pupuk, biji-bijian pakan ternak, dan produk baja gulungan (steel coil) terbebas dari kerusakan akibat kelembaban air laut.`,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'Port Stevedoring Superintendent',
    publishedDate: '2026-05-04',
    readTime: '6 min read'
  },
  {
    id: 'art-13',
    title: 'Rekayasa Transportasi Project Cargo & Alat Berat Muatan ODOW: Analisis Kekuatan Jembatan dan Perizinan Dispensasi Jalan',
    slug: 'rekayasa-project-cargo-alat-berat-odow-survei-jembatan',
    category: 'Project Cargo & Alat Berat',
    excerpt: 'Metodologi logistik pemindahan transformator pembangkit listrik, turbin gas, dan struktur baja industri berbobot di atas 100 ton.',
    content: `Pengangkutan muatan Over Dimension Over Weight (ODOW) atau kargo proyek infrastruktur menuntut studi kelayakan teknik sipil yang komprehensif sebelum roda armada trailer mulai berputar. Berbeda dengan angkutan kontainer standar, kargo proyek raksasa memiliki dimensi yang melampaui lebar lajur jalan raya standar serta beban gandar yang dapat merusak struktur jembatan jika tidak didistribusikan secara merata.

Tahapan Rekayasa Logistik Gaek Freight untuk Project Cargo:
- Route Survey Detail: Tim surveyor menyusuri rute darat dari dermaga sandar kapal hingga ke tapak proyek (project site). Setiap rintangan seperti kabel listrik PLN tegangan tinggi, jembatan penyeberangan orang (JPO), gerbang tol, radius putar tikungan jalan, dan kemiringan lereng dicatat secara akurat menggunakan pemindaian laser 3D.
- Perhitungan Beban Gandar (Axle Load Calculation): Menggunakan armada Multi-Axle Hydraulic Modular Trailer (Goldhofer / Scheuerle), beban kargo ratusan ton didistribusikan ke puluhan titik gandar hidrolik sehingga tekanan beban terhadap permukaan jalan aspal tetap berada di bawah batas toleransi Bina Marga (maksimal 10 ton per gandar).
- Koordinasi Izin Dispensasi Jalan & Pengawalan: Mengurus surat izin dispensasi pemanfaatan jalan dari Kementerian Perhubungan dan Korlantas Polri, serta menyediakan tim pengawalan patroli pembuka jalan dan mobil pemantau ketinggian (pilot car).

Pengalaman puluhan tahun dalam menangani proyek pembangkit listrik, pabrik peleburan nikel, dan kilang minyak menjadikan Gaek Freight mitra andalan bagi kontraktor EPC multinasional di Indonesia.`,
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    author: 'Heavy Lift Engineering Director',
    publishedDate: '2026-04-20',
    readTime: '8 min read'
  },
  {
    id: 'art-14',
    title: 'Jalur Pelayaran Direct Call Tiongkok - Pelabuhan Tanjung Emas Semarang: Akselerasi Ekspor Mebel & Tekstil Jawa Tengah',
    slug: 'pelayaran-direct-call-tiongkok-semarang-tanjung-emas',
    category: 'Rute Maritim',
    excerpt: 'Layanan kapal kontainer langsung tanpa transshipment memangkas waktu transit ekspor impor kawasan industri Kendal dan Solo Raya.',
    content: `Perkembangan pesat Kawasan Industri Kendal (KIK), Batang Integrated Industrial Estate (KITB), serta sentra manufaktur garmen di Solo Raya dan furnitur kayu di Jepara mendorong peningkatan volume kargo internasional di Pelabuhan Tanjung Emas Semarang. Selama bertahun-tahun, eksportir Jawa Tengah terpaksa mengirimkan kargo melalui feeder lokal menuju Tanjung Priok atau Singapura, yang menambah waktu transit 5 hingga 7 hari dan meningkatkan risiko kerusakan barang akibat handling berulang.

Hadirnya layanan pelayaran langsung (direct call service) dari pelabuhan internasional utama Tiongkok (Shanghai, Ningbo, Qingdao) langsung ke Tanjung Emas Semarang menghadirkan efisiensi logistik signifikan:
- Waktu Transit Dipangkas Menjadi 8-10 Hari: Produk ekspor furniture dan tekstil dapat tiba di pasar Asia Timur lebih cepat, meningkatkan daya saing eksportir lokal dalam memenuhi tenggat waktu pesanan buyer global.
- Pengurangan Biaya Transshipment: Penghapusan biaya penanganan peti kemas di pelabuhan transit menghemat biaya logistik total sebesar $150 hingga $250 per kontainer.
- Ketersediaan Kontainer Khusus: Mempermudah pasokan kontainer 40ft High Cube yang sangat dibutuhkan oleh industri furnitur ringan namun bervolume besar.

Gaek Freight mengintegrasikan layanan PPJK pabean di KPPBC Semarang dengan armada trucking inland yang menghubungkan pabrik di Kendal, Bawen, Solo, dan Kudus langsung ke sisi dermaga Tanjung Emas.`,
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    author: 'Central Java Regional Manager',
    publishedDate: '2026-04-08',
    readTime: '5 min read'
  },
  {
    id: 'art-15',
    title: 'Analisis Polis Marine Cargo Insurance: Menakar Perlindungan Klausul Institute Cargo Clauses (A), (B), dan (C)',
    slug: 'analisis-polis-marine-cargo-insurance-icc-a-b-c',
    category: 'Operational Freight',
    excerpt: 'Membedah batas ganti rugi maskapai pelayaran dan pentingnya asuransi kargo menyeluruh terhadap risiko kontainer jatuh ke laut (jettison).',
    content: `Banyak pemilik kargo keliru berasumsi bahwa jika muatan kontainer mereka rusak atau hilang selama pelayaran laut, perusahaan pelayaran (carrier) akan mengganti kerugian secara penuh sesuai nilai barang. Faktanya, berdasarkan konvensi maritim internasional (Hague-Visby Rules), tanggung jawab pengangkut dibatasi hanya sebesar 2 SDR (Special Drawing Rights) per kilogram atau sekitar $2.60 per kilogram kargo, terlepas dari apakah barang yang rusak tersebut adalah mesin presisi bernilai miliaran rupiah.

Oleh sebab itu, penutupan polis Marine Cargo Insurance merupakan keharusan mutlak bagi importir dan eksportir:
- Institute Cargo Clauses (C) / ICC C: Menutup risiko paling mendasar akibat bencana besar kapal, seperti kapal kandas, tenggelam, tabrakan, kebakaran, atau pembuangan muatan ke laut dalam kondisi darurat kapal (General Average / Jettison).
- Institute Cargo Clauses (B) / ICC B: Memberikan perlindungan tambahan terhadap masuknya air laut atau air sungai ke dalam palka kapal serta kerusakan kargo akibat gempa bumi atau letusan gunung berapi.
- Institute Cargo Clauses (A) / ICC A (All Risk): Memberikan perlindungan terluas terhadap seluruh risiko kehilangan atau kerusakan fisik kargo dari segala penyebab eksternal, termasuk pencurian, pembongkaran kasar, kontainer basah akibat kebocoran atap kontainer, serta kerusakan saat proses transit darat (warehouse to warehouse).

Gaek Freight bermitra dengan konsorsium perusahaan asuransi maritim terkemuka dunia, menyediakan penerbitan sertifikat asuransi kargo instan dengan premi kompetitif guna menjamin ketenangan finansial para pemilik kargo.`,
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    author: 'Marine Insurance Underwriter',
    publishedDate: '2026-03-26',
    readTime: '7 min read'
  },
  {
    id: 'art-16',
    title: 'Aspek Legalitas Master Bill of Lading (MBL) vs House B/L (HBL) dalam Pembayaran Letter of Credit (L/C)',
    slug: 'aspek-legalitas-master-bill-of-lading-vs-house-bl',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Ketentuan UCP 600 dalam penerbitan konosemen kargo freight forwarder dan validasi penyerahan dokumen kepemilikan barang di bank devisa.',
    content: `Bill of Lading (B/L) memiliki tiga fungsi hukum fundamental dalam perdagangan internasional: sebagai tanda terima resmi penyerahan barang di pelabuhan (receipt of goods), bukti adanya perjanjian kontrak pengangkutan (evidence of contract of carriage), serta dokumen kepemilikan sah atas barang (document of title) yang dapat diperjualbelikan melalui endosemen.

Perbedaan Utama Antara MBL dan HBL:
- Master Bill of Lading (MBL): Diterbitkan langsung oleh maskapai pelayaran pemilik armada kapal (ocean carrier) kepada freight forwarder pengirim barang. Pihak shipper yang tertera adalah agen forwarder asal, dan consignee adalah agen forwarder di negara tujuan.
- House Bill of Lading (HBL): Diterbitkan oleh freight forwarder (NVOCC) kepada pemilik kargo yang sebenarnya (actual shipper) dengan mencantumkan nama importir sebenarnya (actual consignee).

Poin Kritis dalam Transaksi Pembayaran Letter of Credit (L/C):
Berdasarkan aturan perbankan internasional UCP 600 Pasal 20, bank devisa berhak menolak dokumen HBL jika syarat L/C mencantumkan klausul 'House Bill of Lading not acceptable'. Namun, jika HBL diterbitkan secara sah oleh forwarder bertindak sebagai carrier (as carrier) atau mencantumkan klausul penandatanganan yang memenuhi standar FIATA, dokumen HBL memiliki kekuatan hukum yang setara penuh dan diterima oleh seluruh bank internasional.

Gaek Freight menerbitkan House Bill of Lading berstandar internasional yang terakreditasi resmi, memastikan kesesuaian klausul dokumen ekspor Anda lolos audit verifikasi bank devisa tanpa risiko penolakan diskrepansi L/C.`,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    author: 'Trade Finance Legal Advisor',
    publishedDate: '2026-03-14',
    readTime: '6 min read'
  },
  {
    id: 'art-17',
    title: 'Ekosistem Indonesia National Single Window (INSW): Integrasi Karantina Pertanian, Izin BPOM, dan Kepabeanan Satu Atap',
    slug: 'ekosistem-insw-karantina-bpom-kepabeanan-satu-atap',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Percepatan dwell time pelabuhan nasional melalui interoperabilitas data perizinan antar kementerian teknis (Tradenet).',
    content: `Lembaga National Single Window (LNSW) di bawah Kementerian Keuangan Republik Indonesia mengintegrasikan sistem perizinan dari 18 kementerian dan lembaga teknis pembina sektor perdagangan luar negeri. Platform INSW bertindak sebagai gerbang tunggal (single gate) yang memvalidasi keabsahan dokumen izin impor sebelum data PIB dapat diproses oleh sistem CEISA Bea Cukai.

Integrasi Kunci dalam Portal INSW:
- Badan Karantina Indonesia (Barantin): Integrasi sertifikasi karantina hewan, tumbuhan, dan ikan (PPK Online). Nomor respon persetujuan pelepasan karantina (KT-9 / KH-7) secara otomatis mengalir ke portal pabean tanpa perlu penyerahan berkas kertas fisik.
- Badan Pengawas Obat dan Makanan (BPOM): Validasi otomatis Surat Keterangan Impor (SKI) untuk bahan baku obat, suplemen kesehatan, kosmetik, dan bahan tambahan pangan olahan.
- Kementerian Lingkungan Hidup dan Kehutanan (KLHK): Pemantauan izin impor limbah non-B3 dan rekomendasi pengelolaan bahan perusak ozon.

Keuntungan strategis integrasi ini adalah transparansi status dokumen secara real-time. Pelaku usaha dapat melacak di instansi mana proses perizinan impor sedang ditinjau, mengeliminasi duplikasi pengisian formulir, dan memangkas waktu dwell time pelabuhan rata-rata nasional menjadi di bawah 2.5 hari kerja. Gaek Freight memanfaatkan integrasi API INSW untuk memonitor pemenuhan regulasi klien secara instan.`,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    author: 'INSW Integration Lead',
    publishedDate: '2026-02-27',
    readTime: '6 min read'
  },
  {
    id: 'art-18',
    title: 'Analisis Tren Fluktuasi Indeks Freight Rate SCFI & Drewry WCI: Strategi Mengunci Kontrak Kontainer Jangka Panjang',
    slug: 'analisis-fluktuasi-freight-rate-scfi-drewry-kontrak-panjang',
    category: 'Operational Freight',
    excerpt: 'Metodologi pembacaan indeks angkutan peti kemas dunia untuk mengamankan anggaran pengadaan logistik tahunan perusahaan manufaktur.',
    content: `Pasar angkutan peti kemas internasional (container shipping spot market) bergerak dinamis mengikuti hukum permintaan dan penawaran ruang kapal global. Dua barometer utama yang dijadikan acuan oleh manajer pengadaan (procurement) di seluruh dunia adalah Shanghai Containerized Freight Index (SCFI) yang mengukur tarif ekspor kontainer dari Tiongkok, serta Drewry World Container Index (WCI) yang mencakup 8 rute pelayaran transkontinental utama.

Kapan Saat Tepat Mengunci Kontrak Tarif Tetap (Named Account Contract)?
- Periode Low Season (Pasca-Tahun Baru Imlek hingga April): Maskapai pelayaran cenderung bersedia memberikan komitmen tarif tetap (fixed rate) jangka panjang 6 hingga 12 bulan dengan alokasi ruang terjamin karena permintaan ekspor pabrik baru mulai pulih.
- Volatilitas Musim Puncak (Juli hingga Oktober): Permintaan pengiriman barang retail dan stok akhir tahun memicu pengenaan Peak Season Surcharge (PSS). Pelaku usaha yang mengandalkan tarif spot harian sering kali menghadapi lonjakan biaya angkut hingga 100% dan risiko kargo di-roll (ditunda keberangkatannya) oleh pihak pelayaran.

Gaek Freight menyediakan program konsultasi freight procurement berkala, membantu klien menyusun bauran strategi cerdas: mengombinasikan kontrak volume tetap untuk kargo inti dengan tarif spot fleksibel untuk muatan musiman guna mencapai efisiensi biaya logistik yang optimal.`,
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    author: 'Freight Market Analyst',
    publishedDate: '2026-02-14',
    readTime: '7 min read'
  },
  {
    id: 'art-19',
    title: 'Tata Kelola Ekspor Produk Agrikultur & Rempah Indonesia: Standar Fumigasi ISPM 15 dan Sertifikasi Fitosanitari Internasional',
    slug: 'tata-kelola-ekspor-agrikultur-rempah-ispm-15-fitosanitari',
    category: 'Operational Freight',
    excerpt: 'Prosedur pembebasan hama karantina pada palet kayu kemasan dan regulasi batas maksimum residu komoditas pangan ekspor.',
    content: `Komoditas unggulan agrikultur Indonesia seperti kopi arabika/robusta, cengkih, lada hitam, kakao, dan arang briket batok kelapa memiliki permintaan yang sangat tinggi di pasar Uni Eropa, Amerika Serikat, Jepang, dan Timur Tengah. Namun, ekspor produk hasil pertanian tunduk pada persyaratan karantina tumbuhan yang sangat ketat di pelabuhan tujuan.

Standar Perlakuan Wajib untuk Kargo Ekspor:
1. Sertifikasi Standar ISPM 15 (International Standards for Phytosanitary Measures): Setiap kemasan kayu penopang (palet, peti kayu, dunnage) wajib mendapatkan perlakuan pemanasan panas (Heat Treatment / HT) atau fumigasi Methyl Bromide (MB) oleh perusahaan perlakuan berlisensi Badan Karantina. Palet kayu yang lolos uji akan dicap dengan logo gandum IPPC resmi. Kegagalan mematuhi standar ISPM 15 akan berakibat kontainer ditolak masuk dan diperintahkan re-ekspor atau dimusnahkan di pelabuhan tujuan dengan biaya ditanggung oleh eksportir.
2. Sertifikat Fitosanitari (Phytosanitary Certificate): Diterbitkan oleh pejabat karantina tumbuhan pelabuhan ekspor Indonesia setelah melalui inspeksi visual dan uji bebas serangga hama hidup.
3. Penanganan Kelembaban di Dalam Peti Kemas: Biji kopi dan kakao sangat rentan mengalami pengembunan (container rain) saat kapal berlayar melintasi zona tropis ke zona subtropis. Penggunaan kantong pengering desiccant berkadar tinggi dan container liner kraft paper wajib dipasang untuk mencegah timbulnya jamur pada komoditas.

Gaek Freight menyediakan fasilitas fumigasi bersertifikasi dan persiapan kontainer ekspor khusus komoditas pangan, memastikan hasil bumi Nusantara tiba di pasar global dalam kondisi mutu sempurna.`,
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
    author: 'Export Commodity Specialist',
    publishedDate: '2026-01-30',
    readTime: '7 min read'
  },
  {
    id: 'art-20',
    title: 'Optimalisasi Efisiensi Domestic Trucking Lintas Jawa-Bali: Mengintegrasikan Armada Wingbox dan Trailer Multimoda',
    slug: 'optimalisasi-domestic-trucking-lintas-jawa-bali-wingbox',
    category: 'Operational Freight',
    excerpt: 'Pemanfaatan jaringan jalan tol Trans Jawa dan sistem penyeberangan feri cepat untuk mempercepat siklus logistik distribusi pabrik.',
    content: `Rantai pasok distribusi darat (inland trucking) di pulau Jawa telah mengalami lompatan efisiensi berkat tersambungnya jalan tol Trans Jawa dari Anyer Banten hingga Probolinggo Jawa Timur. Waktu tempuh perjalanan truk dari kawasan industri Cikarang/Karawang menuju Surabaya yang dahulu memakan waktu 36 hingga 48 jam kini dapat ditempuh dalam kurun waktu 14 hingga 18 jam perjalanan langsung.

Pemilihan Tipe Armada Sesuai Karakteristik Muatan:
- Armada Tronton Wingbox: Menjadi primadona bagi industri makanan-minuman, elektronik, dan barang konsumsi harian (FMCG). Desain dinding samping truk yang dapat terbuka ke atas secara hidrolik memungkinkan proses muat dan bongkar palet menggunakan forklift dilakukan secara simultan dari dua sisi, memangkas waktu handling di gudang distributor dari 4 jam menjadi hanya 45 menit.
- Armada Trailer Kontainer 20ft & 40ft: Dikhususkan untuk menarik peti kemas impor dari dermaga pelabuhan langsung ke kawasan industri tanpa perlu membongkar isi kontainer di pelabuhan (menghindari biaya double handling).
- Sistem Pelacakan GPS & Manajemen Driver: Seluruh armada darat Gaek Freight dilengkapi sensor pelacakan satelit GPS yang memantau lokasi geografis, kecepatan kendaraan, dan konsumsi bahan bakar secara akurat, disertai sistem rotasi dua pengemudi (dual driver) untuk rute jarak jauh guna memastikan keselamatan muatan dan ketepatan waktu pengiriman tiba di pabrik klien.`,
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
    author: 'Inland Transport Director',
    publishedDate: '2026-01-14',
    readTime: '6 min read'
  }
];

export function getStoredArticles(): ArticleItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ARTICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ARTICLES;
  } catch {
    return DEFAULT_ARTICLES;
  }
}

export function saveStoredArticles(articles: ArticleItem[]): void {
  localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
}

export function getSubscribers(): NewsletterSubscriber[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUBSCRIBERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addSubscriber(email: string): boolean {
  const list = getSubscribers();
  if (list.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return false;
  }
  list.unshift({ email, subscribedAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY_SUBSCRIBERS, JSON.stringify(list));
  return true;
}
