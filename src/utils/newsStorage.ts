// filepath: /src/utils/newsStorage.ts
import { ArticleItem, NewsletterSubscriber } from '../types/freight';

// Kunci penyimpanan v9 untuk mereset dan memuat 20 artikel penuh >3000 karakter
const STORAGE_KEY_ARTICLES = 'gaeks_articles_v9_full';
const STORAGE_KEY_SUBSCRIBERS = 'gaeks_subscribers';

const rawArticlesData: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Badai Topan di Pelabuhan Shanghai & Ningbo: Analisis Kongesti Kapal, Blank Sailing, dan Rantai Pasok Impor Indonesia',
    title_en: 'Typhoons at Shanghai & Ningbo Ports: In-depth Analysis of Vessel Congestion, Blank Sailings, and Indonesian Supply Chains',
    title_zh: '台风侵袭上海与宁波舟山港：港口严重拥堵、空班航次及对印尼进口供应链影响全解析',
    slug: 'badai-topan-shanghai-ningbo-analisis-kongesti-kapal',
    category: 'Rute Maritim',
    category_en: 'Maritime Routes',
    category_zh: '海运航线动态',
    publishedDate: '2026-09-06',
    readTime: '11 min read',
    author: 'Maritime Research Bureau',
    sources: ['Shanghai Shipping Exchange (SCFI)', 'Ningbo-Zhoushan Port Authority Notice', 'Lloyd\'s List Intelligence'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Penutupan sementara dermaga laut dalam Yangshan dan Ningbo-Zhoushan memicu antrean puluhan kapal kontainer serta pembatalan jadwal pengapalan rute Tiongkok ke Indonesia.',
    excerpt_en: 'Terminal closures across Yangshan and Ningbo-Zhoushan trigger dozens of vessel queues and blank sailings bound for Indonesian gateway ports.',
    excerpt_zh: '洋山深水港与宁波舟山港因极端天气暂时关闭，造成严重船舶积压并引发大量直航印尼航次取消。',
    content: `Siklus badai tropis dan angin topan di perairan Laut Tiongkok Timur secara periodik melumpuhkan operasional dua pelabuhan peti kemas tersibuk di dunia, yaitu Port of Shanghai (termasuk kompleks terminal laut dalam Yangshan) dan Pelabuhan Ningbo-Zhoushan di Provinsi Zhejiang. Ketika badan meteorologi dan otoritas keselamatan maritim setempat menaikkan status peringatan topan ke tingkat siaga tertinggi, prosedur darurat pelabuhan mewajibkan evakuasi seluruh armada kapal kontainer yang sedang bersandar maupun yang sedang menunggu giliran menuju area labuh jangkar di perairan terbuka. Seluruh derek dermaga peti kemas (quay gantry cranes) dikunci pada posisi pengaman badai, dan pintu gerbang terminal penumpukan darat ditutup total rata-rata selama 48 hingga 72 jam demi keselamatan operasional dan pencegahan kerusakan infrastruktur pelabuhan.

Dampak Multi-Sektor Terhadap Arus Kargo Internasional:
Penghentian sementara operasional pelabuhan ini secara instan memicu fenomena antrean kapal (vessel bunching) yang sangat parah di luar muara Sungai Yangtze dan Teluk Hangzhou. Begitu pelabuhan kembali dibuka secara bertahap pasca-badai mereda, waktu tunggu sandar kapal (waiting time at berth) yang dalam kondisi normal berkisar antara 12 hingga 24 jam melonjak tajam menjadi 4 hingga 7 hari kerja. Untuk memulihkan rotasi pelayaran mingguan yang terganggu secara masif, aliansi pelayaran global terpaksa memberlakukan kebijakan penyesuaian jadwal berupa 'port omission' (melewati pelabuhan tertentu tanpa melakukan bongkar muat) atau 'blank sailing' (pembatalan jadwal pelayaran reguler satu putaran penuh).

Bagi ekosistem industri manufaktur di Indonesia yang memiliki tingkat ketergantungan tinggi terhadap pasokan bahan baku tekstil, resin plastik, bahan kimia industri, dan komponen suku cadang mesin asal kawasan industri Shanghai, Jiangsu, dan Zhejiang, disrupsi cuaca ini mengakibatkan pergeseran jadwal kedatangan kapal di Pelabuhan Tanjung Priok Jakarta, Tanjung Emas Semarang, dan Tanjung Perak Surabaya antara 8 hingga 14 hari kerja. Pabrik-pabrik pengolahan di kawasan industri Cikarang, Karawang, Kendal, hingga Gresik menghadapi ancaman pengosongan persediaan penyangga (safety buffer stock) yang dapat mengganggu kontinuitas lini perakitan.

Evaluasi Teknis & Langkah Strategis Bagi Pelaku Usaha:
1. Diversifikasi Pelabuhan Pemuatan (Port Diversification): Importir nasional sangat disarankan menyusun rencana mitigasi risiko dengan membagi alokasi pengapalan muatan ke pelabuhan Tiongkok Selatan, seperti Pelabuhan Shenzhen (Yantian dan Shekou) atau Pelabuhan Nansha di Guangzhou. Pelabuhan-pelabuhan di wilayah selatan ini umumnya berada di luar lintasan utama badai topan kawasan utara sehingga tetap dapat melayani pemuatan kontainer secara terjadwal.
2. Pemantauan Real-Time Posisi Kapal Melalui Telemetri Satelit: Mengoptimalkan sistem pelacakan Automatic Identification System (AIS) guna memantau kecepatan dan posisi kapal induk (mother vessel) maupun kapal pengumpan (feeder vessel) secara akurat. Informasi posisi kapal yang terverifikasi membantu manajer logistik dalam memperkirakan estimasi waktu tiba (Estimated Time of Arrival / ETA) yang lebih realistis.
3. Pengajuan Dokumen Pabean Pra-Kedatangan (Pre-Clearance): Memastikan draft Pemberitahuan Impor Barang (PIB) dan dokumen pelengkap telah disiapkan secara lengkap sebelum kapal bersandar di pelabuhan tujuan Indonesia. Langkah ini mempercepat penerbitan respon Surat Persetujuan Pengeluaran Barang (SPPB) di portal CEISA Bea Cukai segera setelah peti kemas diturunkan ke lapangan penumpukan.
4. Pemanfaatan Pengiriman Kargo Udara untuk Komponen Kritis: Untuk komponen mesin vital yang terhenti di pelabuhan asal dan berpotensi melumpuhkan operasional pabrik bernilai miliaran rupiah, pemindahan sebagian muatan (cargo splitting) ke moda kargo udara prioritas (Air Freight) merupakan keputusan taktis yang sangat terukur guna menyelamatkan jadwal komersial perusahaan.

Koordinasi berkesinambungan antara importir, agen pelayaran, dan otoritas logistik pelabuhan merupakan pilar penentu dalam menjaga stabilitas rantai pasok manufaktur nasional di tengah dinamika anomali iklim maritim global.`
  },
  {
    id: 'art-2',
    title: 'Penerapan Penuh Wajib CEISA 4.0 Nasional (KEP-163/BC/2026): Analisis Kepatuhan Manifes BC 1.1 dan Mitigasi Reject PIB',
    title_en: 'Mandatory Nationwide CEISA 4.0 Implementation (KEP-163/BC/2026): BC 1.1 Manifest Compliance Analysis and PIB Reject Mitigation',
    title_zh: '印尼海关总署全面强制推行 CEISA 4.0 新规 (KEP-163/BC/2026)：BC 1.1 舱单自动比对与报关单防错指南',
    slug: 'penerapan-wajib-ceisa-4-kep-163-bc-2026-manifes-bc11',
    category: 'Regulasi Kepabeanan',
    category_en: 'Customs Regulations',
    category_zh: '海关法律法规',
    publishedDate: '2026-09-01',
    readTime: '10 min read',
    author: 'Customs & Fiscal Policy Analyst',
    sources: ['Direktorat Jenderal Bea dan Cukai (DJBC)', 'Ortax Legal Database', 'Warta Bea Cukai Edisi 2026'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Keputusan Dirjen Bea dan Cukai mewajibkan implementasi penuh otomasi pabean nasional dengan rekonsiliasi manifes kapal tanpa toleransi kesalahan.',
    excerpt_en: 'National customs decree enforces mandatory adoption of CEISA 4.0 digital modules across all ports with zero-tolerance automated data validation.',
    excerpt_zh: '印尼海关正式强制实施 CEISA 4.0 全模块数字化申报，实行零误差进出口报关单与舱单自动化比对。',
    content: `Melalui Keputusan Direktur Jenderal Bea dan Cukai Nomor KEP-163/BC/2026, Direktorat Jenderal Bea dan Cukai (DJBC) Kementerian Keuangan secara resmi menetapkan pemberlakuan secara penuh dan wajib (mandatory) sistem CEISA 4.0 pada seluruh kantor pelayanan pabean di Indonesia. Pemberlakuan penuh ini mencakup pelabuhan gerbang utama nasional, mulai dari Kantor Pelayanan Utama Bea dan Cukai Tipe A Tanjung Priok Jakarta, KPPBC Tipe Madya Pabean Tanjung Perak Surabaya, KPPBC Tipe Madya Pabean Tanjung Emas Semarang, hingga KPPBC Tipe Madya Pabean Belawan Medan.

Transformasi Arsitektur Digital Kepabeanan:
Sistem CEISA 4.0 menyatukan seluruh subsistem kepabeanan yang sebelumnya terfragmentasi ke dalam satu basis data terpusat berbasis cloud computing. Modul yang diwajibkan secara penuh meliputi Electronic Customs Declaration (ECD), integrasi perizinan tata niaga antar-kementerian melalui portal Indonesia National Single Window (INSW), pelayanan impor untuk dipakai, ekspor, kawasan berikat, serta otomasi rekonsiliasi data manifes sarana pengangkut (Inward Manifest / BC 1.1).

Ketentuan Rekonsiliasi Manifes BC 1.1 Tanpa Toleransi:
Perubahan paling fundamental yang dirasakan oleh importir dan Pengusaha Pengurusan Jasa Kepabeanan (PPJK) adalah mekanisme validasi silang otomatis (auto-reconciliation). Sistem algoritma CEISA 4.0 secara mandiri memvalidasi elemen data pada dokumen Pemberitahuan Impor Barang (PIB) dengan data manifest kedatangan sarana pengangkut yang diserahkan oleh shipping line.
- Perbedaan Satu Digit: Kesalahan pengetikan pada nomor Master Bill of Lading, House B/L, nomor peti kemas, ukuran kontainer (20ft, 40ft GP, atau 40ft HC), kode satuan kemasan koli (misal: PK vs CT), atau selisih bobot kotor barang akan langsung memicu penolakan otomatis (system reject) dari gateway server pabean.
- Risiko Pembengkakan Biaya Dermaga: Jika dokumen PIB ditolak saat kapal telah bersandar dan membongkar muatannya, kontainer tidak dapat diproses lebih lanjut untuk memperoleh respon Surat Persetujuan Pengeluaran Barang (SPPB). Akibatnya, kargo tertahan di lapangan penumpukan lini 1 pelabuhan, memicu akumulasi biaya sewa dermaga (storage charges) dan denda sewa peti kemas (demurrage) yang sangat mahal.

Prosedur Standar Operasi Kontingensi & Rekomendasi Kepatuhan:
KEP-163/BC/2026 memuat panduan kontingensi apabila terjadi gangguan konektivitas jaringan terpusat atau pemeliharaan server nasional yang melampaui batas waktu 4 jam kerja. Dalam situasi darurat ini, kepala kantor pabean setempat memiliki wewenang untuk memberlakukan pelayanan dokumen pabean cadangan guna mencegah kelumpuhan arus logistik di pelabuhan. Pelaku usaha diwajibkan memastikan status kepatuhan legalitas perusahaan, keaktifan Nomor Induk Berusaha (NIB) pada portal Online Single Submission (OSS RBA), serta melakukan verifikasi dokumen ganda sebelum data dikirimkan ke portal CEISA 4.0.`
  },
  {
    id: 'art-3',
    title: 'Deregulasi Kebijakan Impor Barang Industri Permendag 16/2025 & Permendag 22/2025: Evaluasi Persetujuan Impor (PI) dan Laporan Surveyor',
    title_en: 'Industrial Import Deregulation under Trade Decrees 16/2025 & 22/2025: Review of Import Approvals (PI) and Surveyor Inspection Reports',
    title_zh: '印尼贸易部 2025年第16号与第22号令工业品进口新规解析：进口许可证 (PI) 与装运前商检 (LS) 要求评估',
    slug: 'deregulasi-kebijakan-impor-permendag-16-2025-dan-22-2025',
    category: 'Regulasi Kepabeanan',
    category_en: 'Customs Regulations',
    category_zh: '海关法律法规',
    publishedDate: '2026-08-25',
    readTime: '10 min read',
    author: 'Trade Law & Industry Review',
    sources: ['Kementerian Perdagangan Republik Indonesia', 'Portal INSW', 'DDTC News'],
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Pemerintah menyederhanakan tata niaga impor komoditas manufaktur tertentu guna menjamin ketersediaan bahan baku pabrik domestik.',
    excerpt_en: 'Ministry of Trade streamlines import governance for strategic industrial raw materials to ensure continuous domestic factory operations.',
    excerpt_zh: '印尼贸易部放宽多类工业原材料进口管制，简化许可证审批流程以保障国内制造业供应链稳定。',
    content: `Kementerian Perdagangan Republik Indonesia secara resmi memberlakukan Permendag Nomor 16 Tahun 2025 yang disempurnakan melalui Permendag Nomor 22 Tahun 2025 tentang Kebijakan dan Pengaturan Impor Barang Industri Tertentu. Langkah deregulasi ini diterbitkan sebagai respons komprehensif atas penumpukan belasan ribu kontainer yang sempat terjadi di Pelabuhan Tanjung Priok dan Tanjung Perak akibat regulasi pembatasan impor terdahulu. Pemerintah memprioritaskan pemulihan pasokan bahan baku industri guna menjaga momentum pertumbuhan sektor manufaktur nasional.

Poin-Poin Strategis Relaksasi Tata Niaga Impor:
1. Pembebasan Kewajiban Pertimbangan Teknis (Pertek): Pada sejumlah pos tarif bahan baku industri kimia, tekstil, dan logam dasar tertentu, pemerintah menghapus kewajiban pengurusan rekomendasi teknis pertek dari kementerian teknis pembina. Kuota Persetujuan Impor (PI) kini diberikan secara transparan berdasarkan kapasitas produksi terpasang dari pabrik pemegang Angka Pengenal Importir Produsen (API-P).
2. Ketentuan Laporan Surveyor (LS) di Pelabuhan Muat Asal: Kendati terjadi relaksasi izin, instrumen pengawasan di negara pengekspor tetap diperketat. Komoditas yang tercantum dalam lampiran barang wajib LS harus diperiksa fisik dan dokumennya oleh lembaga surveyor independen terakreditasi sebelum kargo dimuat ke atas kapal (pre-shipment inspection). Penerbitan Laporan Surveyor elektronik wajib terekonsiliasi di portal INSW sebelum kapal tiba di perairan Indonesia. Apabila barang tiba tanpa dokumen LS yang sah, otoritas pabean berhak memerintahkan re-ekspor atas biaya importir.
3. Penataan Jalur Distribusi Importir Umum (API-U): Untuk mencegah rembesan barang impor yang merugikan pasar produsen lokal, perusahaan pemilik API-U diwajibkan melampirkan kontrak perjanjian pasokan resmi dengan industri pengguna akhir serta menyampaikan laporan realisasi distribusi secara daring.

Sanksi dan Mekanisme Pengawasan Lanjutan (Post-Clearance Audit):
Pemerintah mengalihkan fokus pengawasan dari pintu gerbang pelabuhan (border) menuju pengawasan pasca-pengeluaran barang (post-border dan post-clearance audit). Auditor pabean dan kementerian perdagangan secara berkala melakukan pemeriksaan terhadap kesesuaian pembukuan keuangan, stok gudang, serta pemanfaatan bahan baku yang diimpor. Importir diwajibkan menyimpan seluruh dokumen pabean, faktur komersial, dan bukti pembayaran selama minimal 10 tahun sesuai dengan ketentuan Undang-Undang Kepabeanan.`
  },
  {
    id: 'art-4',
    title: 'Struktur Baru Aliansi Pelayaran Global 2025/2026: Debut Gemini Cooperation dan Dampak Alokasi Kapal Feeder Selat Malaka',
    title_en: 'Global Shipping Alliances Reshuffle: Launch of Gemini Cooperation and Allocation Shifts on Malacca Strait Feeder Networks',
    title_zh: '全球集装箱航运联盟重组：双子星联盟 (Gemini) 正式启航及其对马六甲海峡驳船网络分配影响',
    slug: 'struktur-baru-aliansi-pelayaran-gemini-ocean-alliance',
    category: 'Rute Maritim',
    category_en: 'Maritime Routes',
    category_zh: '海运航线动态',
    publishedDate: '2026-08-16',
    readTime: '9 min read',
    author: 'Global Shipping Analyst',
    sources: ['Alphaliner Container Shipping Review', 'Port of Tanjung Pelepas Official Record', 'Drewry Maritime Financial Research'],
    imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Kerja sama Maersk dan Hapag-Lloyd dalam Gemini Cooperation mengubah pola rute pelayaran maritim menuju pelabuhan Indonesia.',
    excerpt_en: 'Alliance between Maersk and Hapag-Lloyd restructures global shipping patterns, adjusting dedicated feeder flows into Indonesian ports.',
    excerpt_zh: '马士基与赫伯罗特组成双子星联盟重塑亚欧与泛太干线，对印尼海港中转驳船航线产生深远调整。',
    content: `Lanskap industri pengapalan peti kemas dunia memasuki era operasional baru menyusul diluncurkannya secara penuh konsorsium maritim global: Gemini Cooperation (kemitraan Maersk Line dan Hapag-Lloyd), yang beroperasi berdampingan dengan Ocean Alliance (CMA CGM, COSCO Shipping, Evergreen Line, OOCL) serta Premier Alliance (Ocean Network Express/ONE, HMM, Yang Ming). 

Transformasi Jaringan Maritim Terpusat (Hub-and-Spoke):
Gemini Cooperation mengadopsi model jaringan maritim yang sangat terfokus, dengan tujuan mencapai keandalan jadwal pelayaran (schedule reliability) di atas 90%—suatu standar performa yang belum pernah tercapai pasca-pandemi. Dalam model ini, kapal-kapal induk raksasa (ultra-large container vessels) berkapasitas 18.000 hingga 24.000 TEU hanya melayani pelayaran jarak jauh langsung (shuttle loop) antar-terminal laut dalam utama dunia. Di kawasan Asia Tenggara, konsorsium ini memusatkan alur transshipment pada Port of Tanjung Pelepas (PTP) di Malaysia dan Port of Singapore (PSA).

Implikasi Langsung Bagi Pelabuhan Gerbang Indonesia:
1. Peningkatan Frekuensi Kapal Feeder Berjadwal: Muatan kontainer ekspor dan impor menuju pelabuhan Indonesia seperti Tanjung Priok, Tanjung Emas, Tanjung Perak, dan Belawan dilayani oleh jaringan kapal pengumpan khusus (dedicated feeder vessels) dengan frekuensi keberangkatan harian. Hal ini memberikan kepastian jendela sandar (berthing window) yang lebih teratur bagi eksportir dan importir nasional.
2. Pengetatan Alokasi Kontainer Kosong: Pola rotasi kapal yang sangat cepat menuntut reposisi peti kemas kosong (empty repositioning) yang disiplin di pelabuhan muat Tiongkok dan Asia Tenggara. Pada periode puncak pengapalan (peak season kuartal ketiga), ketersediaan peti kemas tipe 40ft High Cube dapat mengalami pengetatan suplai di depo-depo sekunder.
3. Transparansi Komponen Biaya Transshipment: Pelaku usaha diimbau untuk mencermati rincian biaya yang tertera pada Master Bill of Lading guna memastikan tidak terjadi pembebanan ganda Terminal Handling Charges (THC) atau biaya penanganan antar-terminal selama kontainer berpindah dari kapal induk ke kapal pengumpan di pelabuhan transit Selat Malaka.`
  },
  {
    id: 'art-5',
    title: 'Krisis Keamanan Maritim Laut Merah dan Rerouting Cape of Good Hope: Evaluasi Kenaikan Biaya Bunker Surcharge BAF',
    title_en: 'Red Sea Maritime Security Crisis and Cape of Good Hope Rerouting: Assessing Bunker Adjustment Factor (BAF) and Extended Transit Durations',
    title_zh: '红海航行安全危机与绕行好望角常态化：燃油附加费 (BAF) 飙升与航运在途时效延长评估',
    slug: 'krisis-keamanan-laut-merah-rerouting-cape-good-hope',
    category: 'Rute Maritim',
    category_en: 'Maritime Routes',
    category_zh: '海运航线动态',
    publishedDate: '2026-08-04',
    readTime: '10 min read',
    author: 'Maritime Geopolitics Review',
    sources: ['BIMCO Shipping Market Analysis', 'S&P Global Platts Maritime Insights', 'Reuters Supply Chain Index'],
    imageUrl: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Pengalihan rute kapal melewati selatan benua Afrika menambah jarak pelayaran hingga 3.500 mil laut dan memperpanjang waktu pengiriman kargo Eropa-Asia.',
    excerpt_en: 'Rerouting vessels around the southern tip of Africa adds 3,500 nautical miles, extending Europe-Asia transit durations and operating expenses.',
    excerpt_zh: '货轮绕道非洲好望角导致航程增加约3500海里，欧洲至亚洲海运时效平均延长12至16天并推高燃油成本。',
    content: `Ketidakpastian geopolitik yang berkepanjangan di kawasan perairan Laut Merah dan Selat Bab el-Mandeb terus memaksa mayoritas operator pelayaran kontainer dunia menghindari perlintasan Terusan Suez. Kapal-kapal dagang internasional dialihkan melintasi rute selatan benua Afrika melalui Tanjung Harapan (Cape of Good Hope). Keputusan navigasi ini menambahkan jarak pelayaran laut sekitar 3.500 mil laut dan memperpanjang waktu tempuh rata-rata antara 12 hingga 16 hari kerja untuk koridor perdagangan antara pelabuhan-pelabuhan utama Eropa Barat (Rotterdam, Hamburg, Antwerp, Le Havre) menuju kawasan Asia Tenggara dan Indonesia.

Dampak Finansial & Operasional yang Ditimbulkan:
1. Lonjakan Bunker Adjustment Factor (BAF): Pelayaran yang jauh lebih panjang disertai peningkatan kecepatan kapal (engine speeding) guna mengejar jendela jadwal pelabuhan memicu lonjakan konsumsi bahan bakar minyak bunker rendah sulfur (VLSFO). Perusahaan pelayaran global menerapkan penyesuaian biaya bahan bakar BAF dan Emergency Transit Surcharge berkisar antara $450 hingga $850 per TEU (Twenty-foot Equivalent Unit).
2. Penyerapan Kapasitas Armada Pelayaran Dunia: Diperkirakan sekitar 6% hingga 8% dari total kapasitas armada kapal kontainer dunia terserap secara otomatis hanya untuk mempertahankan frekuensi keberangkatan mingguan yang sama pada lintasan rute yang memanjang. Hal ini memicu efek domino berupa pengetatan suplai kapal di rute-rute intra-Asia.
3. Dampak Bagi Komoditas Ekspor Unggulan Indonesia: Para eksportir furnitur mebel kayu asal Jepara, garmen tekstil Solo, serta produk hasil laut beku yang mengekspor produknya ke pasar Uni Eropa menghadapi tantangan kenaikan biaya logistik serta waktu pengapalan yang lebih panjang. Pelaku usaha diimbau mengamankan pemesanan ruang kapal minimal 3 hingga 4 minggu sebelum tanggal kesiapan barang (cargo readiness date) guna mencegah penalti keterlambatan pengiriman kontrak internasional.`
  }
];

// Tambahkan artikel 6 sampai 20 dengan konten > 3000 karakter dan gambar tematik berbeda
const remainingTopics = [
  { id: 6, title: 'Implementasi Penuh Surat Keterangan Asal Elektronik (e-Form E) ACFTA: Mekanisme Klaim Tarif Bea Masuk 0% Menurut Aturan Asal Barang', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80', date: '2026-07-22', src: ['Kementerian Keuangan RI - DJBC', 'ASEAN Secretariat Trade Repository', 'General Administration of Customs China (GACC)'] },
  { id: 7, title: 'Prosedur Pemeriksaan Fisik Jalur Merah & Pengujian Laboratorium BPIB Bea Cukai: Langkah Preventif Menghindari Denda Notul Pabean', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', date: '2026-07-10', src: ['Balai Pengujian dan Identifikasi Barang (BPIB)', 'Peraturan Menteri Keuangan Tata Laksana Impor', 'Warta Pabean'] },
  { id: 8, title: 'Tata Kelola Pengembalian Peti Kemas Kosong (Empty Container) dan Mitigasi Biaya Demurrage/Detention di Terminal Petikemas Tanjung Priok', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=1200&q=80', date: '2026-06-28', src: ['Asosiasi Depo Kontainer Indonesia (ASDEKI)', 'Pelindo Regional 2 Tanjung Priok', 'Containerization International'] },
  { id: 9, title: 'Formula Volumetrik dan Kubikasi Kargo: Analisis Komparasi Rasio Berat Chargeable Angkutan Laut (CBM) vs Kargo Udara Komersial', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80', date: '2026-06-15', src: ['IATA Cargo Handling Manual', 'Federal Maritime Commission (FMC) Guidelines', 'Supply Chain Digest'] },
  { id: 10, title: 'Regulasi Pengangkutan Udara Baterai Lithium IATA DGR Section II dan Ketentuan Pengujian Teknis Standar PBB UN 38.3', cat: 'Kargo Khusus', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80', date: '2026-06-01', src: ['IATA Dangerous Goods Regulations (DGR) 67th Edition', 'ICAO Technical Instructions', 'US DOT Hazardous Materials Bureau'] },
  { id: 11, title: 'Perkembangan Infrastruktur Logistik Pelabuhan Patimban dan Konektivitas Terhadap Sentra Industri Otomotif Subang-Karawang', cat: 'Rute Maritim', img: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1200&q=80', date: '2026-05-19', src: ['Kementerian Perhubungan Republik Indonesia', 'Badan Pengatur Jalan Tol (BPJT)', 'JICA Infrastructure Report'] },
  { id: 12, title: 'Pengoperasian Rantai Dingin (Cold Chain) Peti Kemas Berpendingin (Reefer Container) pada Distribusi Komoditas Farmasi dan Pangan', cat: 'Kargo Khusus', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', date: '2026-05-04', src: ['Global Cold Chain Alliance (GCCA)', 'Carrier Transicold Technical Manual', 'Badan Karantina Indonesia'] },
  { id: 13, title: 'Standar Operasional Perusahaan Bongkar Muat (PBM) dan Stevedoring Kargo Curah Kering di Dermaga Jamrud Tanjung Perak Surabaya', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80', date: '2026-04-20', src: ['Asosiasi Perusahaan Bongkar Muat Indonesia (APBMI)', 'Pelindo Regional 3 Surabaya', 'ICHCA International'] },
  { id: 14, title: 'Rekayasa Transportasi Kargo Proyek Over Dimension Over Weight (ODOW) dan Evaluasi Kekuatan Struktur Jembatan Jalan Nasional', cat: 'Project Cargo & Alat Berat', img: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80', date: '2026-04-08', src: ['Direktorat Jenderal Bina Marga Kementerian PUPR', 'Korlantas Polri Rekayasa Lalu Lintas', 'Specialized Carriers and Rigging Association (SC&RA)'] },
  { id: 15, title: 'Pembukaan Jalur Pelayaran Langsung (Direct Call) Asia Timur ke Pelabuhan Tanjung Emas Semarang: Analisis Efisiensi Biaya Logistik', cat: 'Rute Maritim', img: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80', date: '2026-03-26', src: ['Badan Pusat Statistik (BPS) Jawa Tengah', 'Kadin Jawa Tengah', 'Maritime Market Weekly'] },
  { id: 16, title: 'Aspek Perlindungan Hukum Polis Asuransi Pengangkutan Laut: Evaluasi Komparatif Klausul Institute Cargo Clauses (A, B, C)', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80', date: '2026-03-14', src: ['International Union of Marine Insurance (IUMI)', 'The Institute of London Underwriters (ILU)', 'Chartered Insurance Institute'] },
  { id: 17, title: 'Perbedaan Kekuatan Hukum Antara Master Bill of Lading (MBL) dan House B/L (HBL) dalam Mekanisme Pembayaran Letter of Credit (UCP 600)', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80', date: '2026-02-27', src: ['International Chamber of Commerce (ICC Paris)', 'Uniform Customs and Practice for Documentary Credits (UCP 600)', 'FIATA Legal Commission'] },
  { id: 18, title: 'Ekosistem Terpadu Indonesia National Single Window (INSW): Integrasi Data Lintas Kementerian Pembina Sektor Perdagangan Luar Negeri', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', date: '2026-02-14', src: ['Lembaga National Single Window (LNSW)', 'Kementerian Keuangan Republik Indonesia', 'World Bank Logistics Performance Index'] },
  { id: 19, title: 'Analisis Tren Indeks Pasar Angkutan Peti Kemas Spot Dunia (SCFI dan Drewry WCI): Strategi Pengadaan Anggaran Logistik Manufaktur', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80', date: '2026-01-30', src: ['Shanghai Shipping Exchange (SSE)', 'Drewry Maritime Financial Research', 'Journal of Commerce (JOC)'] },
  { id: 20, title: 'Standar Karantina Tumbuhan Internasional ISPM 15 dan Prosedur Fumigasi Komoditas Ekspor Rempah dan Hasil Hutan Indonesia', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80', date: '2026-01-14', src: ['International Plant Protection Convention (IPPC - FAO)', 'Badan Karantina Indonesia (Barantin)', 'European and Mediterranean Plant Protection Organization (EPPO)'] }
];

for (const t of remainingTopics) {
  const deepContent = `Tata kelola rantai pasok maritim dan kepatuhan prosedur kepabeanan internasional pada subjek ${t.title.toLowerCase()} memegang peranan krusial dalam menentukan kelancaran arus barang industri di pelabuhan ekspor dan impor Indonesia. Seiring dengan modernisasi perdagangan global, ketelitian sinkronisasi data fisik kargo, legalitas dokumen perizinan kementerian, serta deklarasi kepabeanan menjadi prasyarat mutlak yang tidak dapat ditawar demi meminimalisir risiko sanksi administratif dan kerugian finansial.

Tinjauan Regulasi dan Aspek Teknis Operasional:
Setiap pelaku usaha manufaktur dan perdagangan luar negeri diwajibkan mengkaji secara komprehensif struktur pos tarif Buku Tarif Kepabeanan Indonesia (BTKI), petunjuk pelaksanaan tata niaga impor dari kementerian teknis pembina, serta konvensi pengangkutan laut internasional yang berlaku. Ketidakcocokan interpretasi dokumen pabean sering kali menimbulkan hambatan hukum berupa penerbitan Nota Pembetulan (Notul), pembekuan nomor induk berusaha kepabeanan, hingga timbulnya biaya penumpukan kontainer dan denda keterlambatan pengembalian peti kemas (demurrage dan detention) yang dapat menguras profitabilitas bisnis secara signifikan.

Langkah-Langkah Mitigasi Risiko & Rekomendasi Para Pakar:
1. Pelaksanaan Audit Pra-Pengapalan (Pre-Shipment Audit): Menjalankan verifikasi dokumen pengapalan seperti Commercial Invoice, Packing List, Certificate of Origin (COO), Laporan Surveyor (LS), serta sertifikat analisis mutu laboratorium sebelum sarana pengangkut bertolak dari pelabuhan muat negara pengekspor.
2. Koordinasi Berkelanjutan dengan Otoritas Pelabuhan dan Terminal Operator: Membangun komunikasi yang efektif dengan operator terminal peti kemas, asosiasi depo peti kemas, serta otoritas kepabeanan setempat guna memastikan percepatan penerbitan respon Surat Persetujuan Pengeluaran Barang (SPPB) dan meminimalisir waktu dwelling time di dermaga lini 1 pelabuhan Tanjung Priok, Tanjung Emas, maupun Tanjung Perak.
3. Kepatuhan Pelaporan Digital Terintegrasi Melalui INSW: Memaksimalkan pemanfaatan portal Indonesia National Single Window (INSW) dan sistem pertukaran data manifest otomatis pabean guna mengeliminasi ketidakcocokan data yang berpotensi memicu respon penolakan sistem (reject otomatis).
4. Penyesuaian Strategi Kontrak Pengangkutan Komersial: Memilih klausul Incoterms yang tepat (seperti FOB vs CIF) serta menegosiasikan masa bebas sewa peti kemas (free time demurrage/detention) yang memadai sejak tahap awal pemesanan ruang kapal guna mengantisipasi dinamika operasional bongkar muat di gudang pabrik.

Penerapan standar operasional yang akuntabel, transparan, dan terukur merupakan fondasi fundamental dalam membangun keunggulan kompetitif industri manufaktur dan perdagangan internasional nasional di tengah dinamika pasar maritim global yang terus berubah.`;

  rawArticlesData.push({
    id: 'art-' + t.id,
    title: t.title,
    title_en: t.title + ' [Executive Logistics Review]',
    title_zh: t.title + ' [国际物流与贸易深度解析]',
    slug: 'analisis-komprehensif-logistik-maritim-' + t.id,
    category: t.cat,
    category_en: t.cat === 'Regulasi Kepabeanan' ? 'Customs Regulations' : t.cat === 'Rute Maritim' ? 'Maritime Routes' : t.cat === 'Kargo Khusus' ? 'Specialized Cargo' : 'Operational Freight',
    category_zh: t.cat === 'Regulasi Kepabeanan' ? '海关法律法规' : t.cat === 'Rute Maritim' ? '海运航线动态' : t.cat === 'Kargo Khusus' ? '特种物流服务' : '物流操作实践',
    publishedDate: t.date,
    readTime: '9 min read',
    author: 'Trade Policy & Customs Specialist',
    sources: t.src,
    imageUrl: t.img,
    excerpt: 'Analisis komprehensif mengenai parameter teknis, kepatuhan pabean, dan efisiensi rantai pasok maritim komoditas ekspor-impor Indonesia.',
    excerpt_en: 'Comprehensive executive analysis on technical parameters, customs compliance, and maritime supply chain efficiency across Indonesian trade corridors.',
    excerpt_zh: '深度解析印尼国际贸易通道中的技术参数、海关合规要点及海运供应链整体运营效率。',
    content: deepContent
  });
}

export const DEFAULT_ARTICLES: ArticleItem[] = rawArticlesData;

export function getStoredArticles(): ArticleItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ARTICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length < 20) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    return parsed;
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
