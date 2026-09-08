import { ArticleItem, NewsletterSubscriber } from '../types/freight';

const STORAGE_KEY_ARTICLES = 'gaeks_articles';
const STORAGE_KEY_SUBSCRIBERS = 'gaeks_subscribers';

export const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Panduan Praktis Integrasi Ceisa 4.0 Bea Cukai & Verifikasi Dokumen Pabean',
    slug: 'panduan-integrasi-ceisa-4-bea-cukai',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Pahami alur submit dokumen PIB/PEB secara elektronik, validasi dokumen perizinan, dan mitigasi risiko respon SPPB pabean.',
    content: 'Penerapan sistem CEISA 4.0 oleh Direktorat Jenderal Bea dan Cukai menuntut importir memiliki kepatuhan data tingkat tinggi. Setiap elemen data pada invoice, packing list, hingga Bill of Lading (B/L) harus sinkron dengan database INSW. Melalui layanan PPJK resmi GAEKS FREIGHT, proses verifikasi data pabean diaudit sebelum pengiriman elektronik guna meminimalisir Notul (Nota Pembetulan) dan biaya penumpukan di dermaga lini 1.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    author: 'Tim Regulasi Pabean GAEKS',
    publishedDate: '2026-09-05'
  },
  {
    id: 'art-2',
    title: 'Deregulasi Kebijakan Impor & Relaksasi Lartas: Strategi Importir 2026',
    slug: 'deregulasi-kebijakan-impor-relaksasi-lartas',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Analisis mendalam mengenai perubahan pembatasan impor komoditas industri tertentu dan kemudahan pengajuan Persetujuan Impor (PI).',
    content: 'Perubahan regulasi perdagangan luar negeri menuntut pelaku industri manufaktur memantau aturan Larangan dan Pembatasan (Lartas). Komoditas seperti bahan baku plastik, tekstil, dan suku cadang mesin membutuhkan koordinasi antara Laporan Surveyor (LS) dan Persetujuan Impor (PI). GAEKS GROUP mendampingi klien dari tahap pra-pengapalan untuk memastikan dokumen perizinan telah terbit sebelum kontainer dimuat.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    author: 'Trade Compliance GAEKS',
    publishedDate: '2026-08-28'
  },
  {
    id: 'art-3',
    title: 'Aliansi Pelayaran Global 2025/2026: Gemini Cooperation vs Ocean Alliance',
    slug: 'aliansi-pelayaran-global-gemini-ocean-alliance',
    category: 'Rute Maritim',
    excerpt: 'Dampak konfigurasi ulang aliansi pelayaran kapal kontainer dunia terhadap ketersediaan slot kapal dan jadwal direct call ke Indonesia.',
    content: 'Pembentukan Gemini Cooperation (Maersk dan Hapag-Lloyd) serta restrukturisasi Ocean Alliance mengubah peta jaringan kargo laut internasional. Bagi pelaku usaha di Indonesia, perubahan jadwal ini memengaruhi waktu singgah di hub transshipment seperti Singapura dan Tanjung Pelepas sebelum kargo diteruskan ke Tanjung Priok, Tanjung Emas, atau Tanjung Perak. GAEKS FREIGHT menjaga alokasi ruang langsung untuk stabilitas jadwal sailing.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
    author: 'Commercial Trade Specialist',
    publishedDate: '2026-08-15'
  },
  {
    id: 'art-4',
    title: 'Strategi Jitu Menghindari Biaya Demurrage & Detention di Pelabuhan Tanjung Priok',
    slug: 'strategi-menghindari-demurrage-detention-priok',
    category: 'Operational Freight',
    excerpt: 'Langkah praktis memperpanjang Free Time, penyelesaian DO elektronik kilat, dan koordinasi trucking pengembalian empty container.',
    content: 'Demurrage dan detention merupakan beban biaya tersembunyi yang sering membengkak jika dokumen impor terlambat diserahkan. Kunci pencegahannya adalah memastikan Delivery Order (DO) rilis sebelum kapal sandar, memilih forwarder yang memiliki negosiasi Free Time 14-21 hari, serta kesiapan armada trailer penarik kontainer untuk langsung membawa muatan ke gudang pabrik.',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    author: 'Port Operations Manager GAEKS',
    publishedDate: '2026-08-01'
  },
  {
    id: 'art-5',
    title: 'Fasilitas Surat Keterangan Asal (SKA) Form E: Nikmati Bea Masuk 0% Impor Tiongkok',
    slug: 'fasilitas-ska-form-e-bea-masuk-nol-persen',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Cara memanfaatkan skema ASEAN-China FTA (ACFTA) dengan validasi Certificate of Origin Form E elektronik guna memangkas tarif pabean.',
    content: 'Banyak importir membayar bea masuk standar karena kekeliruan pada format Form E atau ketidaksesuaian deskripsi barang dengan Bill of Lading. Dengan validasi e-Form E secara digital melalui portal pabean, perusahaan importir di Indonesia berhak memperoleh preferensi tarif bea masuk hingga 0% untuk ribuan pos tarif HS code komoditas industri.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    author: 'Tim Tarif & Klasifikasi GAEKS',
    publishedDate: '2026-07-20'
  },
  {
    id: 'art-6',
    title: 'Perbandingan FCL vs LCL: Mengoptimalkan Anggaran Pengiriman Kargo Laut',
    slug: 'perbandingan-fcl-vs-lcl-efisiensi-anggaran',
    category: 'Operational Freight',
    excerpt: 'Analisis titik impas volume (break-even point CBM) untuk menentukan kapan kargo harus dikonsolidasi atau menyewa kontainer mandiri.',
    content: 'Saat kargo berada di bawah volume 15 CBM, pengiriman Less than Container Load (LCL) memberikan efisiensi luar biasa karena tagihan dihitung strictly berdasarkan kubikasi. Namun, ketika muatan mencapai 16-18 CBM, menyewa satu unit FCL 20ft sering kali lebih hemat biaya per unit serta mengurangi risiko kerusakan akibat proses konsolidasi barang campuran di gudang CFS.',
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
    author: 'Commercial Logistics Lead',
    publishedDate: '2026-07-08'
  },
  {
    id: 'art-7',
    title: 'Incoterms 2020: Panduan Memilih Klausul FOB, CIF, atau DDP untuk Bisnis',
    slug: 'incoterms-2020-fob-cif-ddp',
    category: 'Operational Freight',
    excerpt: 'Ketahui batas tanggung jawab biaya, risiko kerusakan, dan asuransi kargo antara pihak penjual dan pembeli internasional.',
    content: 'Memilih Incoterms yang tepat dapat menyelamatkan arus kas perusahaan. Membeli dengan klausul FOB (Free on Board) memberikan kendali penuh kepada importir dalam memilih freight forwarder sendiri dan menegosiasikan tarif angkut yang lebih kompetitif dibandingkan menyerahkan biaya pengiriman kepada supplier asing (CIF).',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    author: 'Senior Supply Chain Advisor',
    publishedDate: '2026-06-25'
  },
  {
    id: 'art-8',
    title: 'Mekanisme Penetapan Jalur Hijau, Kuning, dan Merah oleh Sistem Profil Risiko Pabean',
    slug: 'mekanisme-jalur-hijau-kuning-merah-pabean',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Bagaimana Ditjen Bea dan Cukai menilai profil kepatuhan importir, jenis komoditas, dan negara asal dalam penentuan jalur pengeluaran barang.',
    content: 'Jalur Merah (pemeriksaan fisik kargo dan dokumen) memerlukan waktu 2-4 hari kerja tambahan di pelabuhan. Untuk mempertahankan reputasi Jalur Hijau, perusahaan wajib menjaga track record pabean yang bersih, kesesuaian nilai pabean dengan harga pasar, serta kepatuhan pelaporan SPT tahunan secara konsisten.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    author: 'Customs Broker Specialist',
    publishedDate: '2026-06-12'
  },
  {
    id: 'art-9',
    title: 'Metode Perhitungan Kubikasi CBM Laut vs Volumetrik Kargo Udara',
    slug: 'perhitungan-cbm-laut-vs-volumetrik-udara',
    category: 'Operational Freight',
    excerpt: 'Pahami rumus matematika logistik: pembagian 1.000.000 untuk laut dan pembagian 6.000 untuk udara guna menentukan bobot chargeable.',
    content: 'Banyak pemilik barang terkejut saat invoice kargo berbeda dari berat timbangan fisik. Dalam pengiriman laut, 1 CBM memiliki ekuivalensi berat 1.000 KG (1 Ton). Sedangkan dalam kargo udara, 1 CBM setara dengan 167 KG (pembagi 6.000). Maskapai dan liner selalu menggunakan angka tertinggi antara bobot fisik vs volume sebagai basis tagihan resmi.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
    author: 'Logistics Engineering Team',
    publishedDate: '2026-05-30'
  },
  {
    id: 'art-10',
    title: 'Standardisasi IATA DGR untuk Pengiriman Kargo Baterai Lithium Udara',
    slug: 'standardisasi-iata-dgr-baterai-lithium-udara',
    category: 'Kargo Khusus',
    excerpt: 'Prosedur keselamatan pengangkutan baterai lithium (UN 3480 / UN 3481), kelayakan packing Dangerous Goods, dan dokumen MSDS.',
    content: 'Pengiriman perangkat elektronik bertenaga baterai lithium melalui pesawat udara tunduk pada regulasi ketat IATA Dangerous Goods Regulations. Kemasan kargo wajib lolos uji drop test, dilengkapi label Hazard Class 9, dan disertai sertifikasi uji UN 38.3 untuk memastikan penerbangan aman dari risiko kebakaran spontan.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
    author: 'Aviation Cargo Specialist',
    publishedDate: '2026-05-18'
  },
  {
    id: 'art-11',
    title: 'Konektivitas Pelabuhan Patimban Terhadap Koridor Industri Subang-Karawang',
    slug: 'konektivitas-pelabuhan-patimban-subang-karawang',
    category: 'Rute Maritim',
    excerpt: 'Peluang percepatan distribusi ekspor otomotif dan kontainer manufaktur tanpa melewati kemacetan jalur Jakarta.',
    content: 'Pelabuhan Patimban di Subang terus meningkatkan kapasitas dermaga kontainernya. Bagi pabrik di kawasan industri Cikarang, Karawang, dan Subang, pemanfaatan Patimban memangkas waktu tempuh truk hingga 40% dibandingkan menuju Tanjung Priok, sekaligus mengurangi risiko keterlambatan jadwal penutupan closing gate pelabuhan.',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80',
    author: 'Port Hinterland Analyst',
    publishedDate: '2026-05-02'
  },
  {
    id: 'art-12',
    title: 'Tata Laksana Pengoperasian Reefer Container pada Komoditas Bersuhu Dingin',
    slug: 'tata-laksana-reefer-container-komoditas-dingin',
    category: 'Kargo Khusus',
    excerpt: 'Menjaga rantai dingin (cold chain) kargo daging, buah segar, seafood, dan farmasi dari pelabuhan asal hingga gudang konsumen.',
    content: 'Kontainer berpendingin (Reefer Container) membutuhkan suplai daya listrik berkesinambungan dan kalibrasi sensor suhu otomatis. GAEKS FREIGHT menyediakan layanan genset mobile saat kontainer ditarik di jalan tol darat (trucking reefer) guna memastikan integritas mutu komoditas tidak mengalami kenaikan temperatur.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
    author: 'Cold Chain Specialist',
    publishedDate: '2026-04-19'
  },
  {
    id: 'art-13',
    title: 'Optimalisasi Stevedoring & Pergudangan PBM di Tanjung Perak Surabaya',
    slug: 'optimalisasi-stevedoring-pbm-tanjung-perak',
    category: 'Operational Freight',
    excerpt: 'Manajemen bongkar muat kapal curah kering dan kargo umum dengan standar operasional cepat tanpa antrean lama.',
    content: 'Keberhasilan operasional Perusahaan Bongkar Muat (PBM) ditentukan oleh ketersediaan alat berat seperti grab, hopper, forklift kapasitas tinggi, dan reach stacker. Penanganan yang efisien di dermaga Jamrud dan Berlian Tanjung Perak mempercepat turnaround time kapal dan menurunkan biaya sewa sandar.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    author: 'PBM Operations Surabaya',
    publishedDate: '2026-04-05'
  },
  {
    id: 'art-14',
    title: 'Manajemen Risiko Angkutan Project Cargo & Alat Berat Muatan ODOW',
    slug: 'manajemen-risiko-project-cargo-odow',
    category: 'Project Cargo & Alat Berat',
    excerpt: 'Tahapan survei rute, rekayasa kekuatan jembatan, dan perizinan dispensasi jalan untuk pengangkutan struktur industri raksasa.',
    content: 'Pengangkutan kargo Over Dimension Over Weight (ODOW) seperti turbin pembangkit listrik dan tangki kimia membutuhkan perencanaan matang. Tim GAEKS memetakan rute jalan raya, titik belok tajam, kabel tegangan tinggi, serta kekuatan jembatan yang dilintasi menggunakan armada multi-axle modular hydraulic trailer.',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    author: 'Heavy Lift Project Director',
    publishedDate: '2026-03-22'
  },
  {
    id: 'art-15',
    title: 'Jalur Pelayaran Direct Call Tiongkok ke Semarang Tanjung Emas',
    slug: 'direct-call-tiongkok-semarang-tanjung-emas',
    category: 'Rute Maritim',
    excerpt: 'Mendorong ekspor furniture Jepara dan garmen Solo melalui rute langsung kapal kontainer internasional tanpa singgah di Singapura.',
    content: 'Pelabuhan Tanjung Emas Semarang kini melayani pelayaran langsung dari pelabuhan utama Tiongkok (Shanghai dan Ningbo). Direct service ini memangkas waktu pengiriman menjadi 8-11 hari, memberikan keunggulan kompetitif besar bagi industri tekstil dan mebel Jawa Tengah yang berorientasi ekspor.',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    author: 'Central Java Route Planner',
    publishedDate: '2026-03-10'
  },
  {
    id: 'art-16',
    title: 'Pentingnya Perlindungan Asuransi Pengangkutan Laut (Marine Cargo Insurance)',
    slug: 'perlindungan-asuransi-marine-cargo-insurance',
    category: 'Operational Freight',
    excerpt: 'Memahami klausul Institute Cargo Clauses (A, B, C) untuk memproteksi nilai investasi barang dari risiko badai dan kecelakaan kapal.',
    content: 'Banyak pelaku usaha mengira tanggung jawab maskapai pelayaran mencakup ganti rugi penuh saat kontainer jatuh ke laut. Pada kenyataannya, ganti rugi pengangkut (carrier liability) sangat terbatas per kilogram kargo. Mengasuransikan kargo dengan klausul All-Risk (ICC A) merupakan benteng proteksi finansial mutlak.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80',
    author: 'Risk & Insurance Advisor',
    publishedDate: '2026-02-25'
  },
  {
    id: 'art-17',
    title: 'Memahami Fungsi Hukum Master Bill of Lading vs House B/L',
    slug: 'fungsi-master-bill-of-lading-vs-house-bl',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Peran B/L sebagai dokumen kepemilikan kargo, bukti kontrak angkutan, dan tanda terima barang resmi antara forwarder dan liner.',
    content: 'House B/L diterbitkan oleh freight forwarder kepada pihak shipper riil, sedangkan Master B/L diterbitkan oleh shipping line utama kepada agen forwarder. Ketepatan penulisan nama consignee (To Order of Bank) pada B/L menjadi prasyarat krusial dalam pencairan fasilitas pembayaran Letter of Credit (L/C).',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    author: 'Legal & Shipping Documentation',
    publishedDate: '2026-02-12'
  },
  {
    id: 'art-18',
    title: 'Integrasi Ekosistem Indonesia National Single Window (INSW) Terpadu',
    slug: 'integrasi-ekosistem-insw-terpadu',
    category: 'Regulasi Kepabeanan',
    excerpt: 'Sinkronisasi data perizinan ekspor-impor antar kementerian dalam satu pintu guna percepatan waktu dwell time nasional.',
    content: 'Portal INSW menjembatani sistem perizinan dari Kementerian Perdagangan, Kementerian Pertanian (Karantina), BPOM, dan Bea Cukai. Verifikasi nomor NIB dan sertifikat standar yang terhubung secara otomatis di INSW mempercepat validasi sebelum dokumen pabean diproses oleh petugas verifikator.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    author: 'Regulatory Affairs Manager',
    publishedDate: '2026-01-29'
  },
  {
    id: 'art-19',
    title: 'Dampak Biaya Bunker Adjustment Factor (BAF) pada Fluktuasi Tarif Kargo Laut',
    slug: 'dampak-bunker-adjustment-factor-tarif-laut',
    category: 'Operational Freight',
    excerpt: 'Bagaimana harga minyak bahan bakar kapal dunia VLSFO memengaruhi fluktuasi biaya angkut laut bulanan.',
    content: 'Bunker Adjustment Factor (BAF) adalah komponen biaya variabel yang disesuaikan secara periodik oleh pelayaran kontainer dunia. Memahami tren pergerakan bahan bakar minyak bunker membantu manajer pengadaan (procurement) mengunci kontrak tarif jangka menengah yang lebih stabil.',
    imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
    author: 'Freight Market Analyst',
    publishedDate: '2026-01-15'
  },
  {
    id: 'art-20',
    title: 'Panduan Sukses Ekspor Produk Agrikultur & Hasil Hutan Indonesia',
    slug: 'panduan-sukses-ekspor-agrikultur-hasil-hutan',
    category: 'Operational Freight',
    excerpt: 'Persyaratan sertifikat fitosanitari, fumigasi ISPM 15 pada palet kayu, dan kepatuhan standar karantina negara tujuan ekspor.',
    content: 'Eksportir komoditas kopi, rempah-rempah, dan arang briket wajib memastikan kemasan kayu memenuhi standar fumigasi bertaraf ISPM 15. Kegagalan memenuhi standar fumigasi dapat berakibat kargo ditolak masuk dan diperintahkan re-ekspor oleh otoritas karantina negara mitra seperti Amerika Serikat dan Uni Eropa.',
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
    author: 'Agricultural Export Team',
    publishedDate: '2026-01-02'
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
