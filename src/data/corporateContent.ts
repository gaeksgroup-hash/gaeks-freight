export interface CorporateDiagramNode {
  id: string;
  label: string;
  role: string;
  detail: string;
}

export interface CorporateDigitalCapability {
  id: string;
  title: string;
  detail: string;
  availability: 'available' | 'expanding';
  route?: string;
  ctaLabel?: string;
  flowStages?: string[];
}

export interface RateCardEntry {
  id: string;
  status: 'draft' | 'published';
  mode: 'ocean' | 'air';
  serviceType: string;
  origin: string;
  destination: string;
  originPortOrAirport: string;
  destinationPortOrAirport: string;
  containerOrCargoType: string;
  rate: string;
  currency: string;
  validUntil: string;
  costScope: string;
  terms: string;
}

export interface CarrierDirectoryEntry {
  id: string;
  status: 'draft' | 'published';
  name: string;
  category: 'airline' | 'shipping_line';
  logoUrl?: string;
  approvedLogo?: boolean;
  serviceScope: string;
  corridors: string;
  scheduleSummary: string;
  officialUrl?: string;
}

export interface CareerOpening {
  id: string;
  status: 'draft' | 'published';
  title: string;
  department: string;
  location: string;
  employmentType: string;
  summary: string;
  requirements: string[];
  postedDate?: string;
}

export interface CorporateContent {
  brand: {
    officialTaglineId: string[];
    officialTaglineEn: string[];
    promise: string;
    heroEyebrow: string;
    heroDescription: string;
  };
  homeSignature: {
    label: string;
    headline: string;
    principles: Array<{ number: string; title: string }>;
    ctaLabel: string;
  };
  about: {
    seoTitle: string;
    metaDescription: string;
    heroLabel: string;
    heroHeadline: string[];
    heroLead: string;
    heroImageUrl: string;
    heroImageAlt: string;
    introLabel: string;
    introHeadline: string;
    introParagraphs: string[];
    entityName: string;
    entitySubtitle: string;
    introImageUrl: string;
    introImageAlt: string;
    visionLabel: string;
    visionText: string;
    philosophyLabel: string;
    philosophyText: string;
    missionLabel: string;
    missionIntro: string;
    missions: Array<{ number: string; title: string; body: string }>;
    identityPdfUrl: string;
    identityPdfLabel: string;
    principlesLabel: string;
    principlesHeadline: string;
    principlesIntro: string;
    principlesCenterLabel: string;
    principlesCenterRole: string;
    principlesNodes: CorporateDiagramNode[];
    cultureLabel: string;
    cultureHeadline: string;
    cultureBody: string;
    culturePillars: string[];
    cultureImageUrl: string;
    cultureImageAlt: string;
    cultureCtaLabel: string;
    operationsLabel: string;
    operationsHeadline: string;
    operationsBody: string;
    operationsDisciplines: Array<{
      id: string;
      serviceId: string;
      title: string;
      summary: string;
      imageUrl: string;
      imageAlt: string;
    }>;
    digitalLabel: string;
    digitalHeadline: string;
    digitalBody: string;
    digitalCapabilities: CorporateDigitalCapability[];
    valuesLabel: string;
    valuesHeadline: string;
    values: Array<{ number: string; title: string; englishTitle: string; description: string }>;
    commitmentLabel: string;
    commitmentLines: string[];
    commitmentBody: string;
    commitmentCtaLabel: string;
  };
  rateCard: {
    seoTitle: string;
    metaDescription: string;
    label: string;
    headline: string;
    description: string;
    emptyTitle: string;
    emptyBody: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    preparationHeading: string;
    preparationItems: string[];
    items: RateCardEntry[];
  };
  carriers: {
    seoTitle: string;
    metaDescription: string;
    label: string;
    headline: string;
    description: string;
    emptyTitle: string;
    emptyBody: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    airlinesTitle: string;
    airlinesNote: string;
    shippingLinesTitle: string;
    shippingLinesNote: string;
    items: CarrierDirectoryEntry[];
  };
  careers: {
    seoTitle: string;
    metaDescription: string;
    label: string;
    headline: string;
    description: string;
    heroImageUrl: string;
    heroImageAlt: string;
    cultureHeading: string;
    commitments: Array<{ title: string; detail: string }>;
    openingsHeading: string;
    emptyTitle: string;
    emptyBody: string;
    emptyCtaLabel: string;
    positions: CareerOpening[];
  };
}

export const DEFAULT_CORPORATE_CONTENT: CorporateContent = {
  brand: {
    officialTaglineId: [
      'Diperkuat oleh Manusia.',
      'Digerakkan oleh Teknologi.',
      'Berfokus pada Anda.',
    ],
    officialTaglineEn: [
      'Powered by People.',
      'Driven by Technology.',
      'Focused on You.',
    ],
    promise: 'Solusi nyata. Tindakan nyata. Hasil transparan.',
    heroEyebrow: 'FREIGHT FORWARDING DAN LOGISTIK INTERNASIONAL',
    heroDescription:
      'Kami memadukan keahlian, teknologi, dan tindakan nyata untuk menghadirkan solusi logistik yang lebih cepat, efisien, dan transparan.',
  },
  homeSignature: {
    label: 'PRINSIP GAEKS',
    headline: 'Kami memahami tantangan. Kami merancang solusi. Kami mewujudkannya.',
    principles: [
      { number: '01', title: 'Karyawan yang membuat perbedaan.' },
      { number: '02', title: 'Mengantisipasi kebutuhan pelanggan.' },
      { number: '03', title: 'Teknologi sebagai nadi perusahaan.' },
      { number: '04', title: 'Keahlian pada setiap bidang.' },
      { number: '05', title: 'Solusi melalui tindakan nyata.' },
      { number: '06', title: 'Transparansi dalam setiap proses.' },
    ],
    ctaLabel: 'Pelajari Tentang Kami',
  },
  about: {
    seoTitle: 'Tentang Kami | GAEKS Freight · PT Global Andalan Ekspress',
    metaDescription:
      'Mengenal PT Global Andalan Ekspress (GAEKS Freight): visi, enam misi strategis, prinsip berbasis pelanggan, kapabilitas digital, dan nilai inti perusahaan.',
    heroLabel: 'TENTANG GAEKS FREIGHT',
    heroHeadline: [
      'Lebih dari sekadar pengiriman.',
      'Kami memahami nilai di baliknya.',
    ],
    heroLead:
      'Kami adalah perusahaan freight forwarding dan logistik internasional yang berorientasi pada pelanggan, didukung oleh keahlian, teknologi, dan komitmen untuk menyelesaikan tantangan logistik.',
    heroImageUrl: '/images/editorial/about-hero-port.webp',
    heroImageAlt: 'Ilustrasi terminal peti kemas internasional dengan derek pelabuhan pada pencahayaan pagi alami',
    introLabel: 'MENGENAL GAEKS',
    introHeadline: 'Setiap pengiriman memiliki tujuan. Kami memahami tujuan Anda.',
    introParagraphs: [
      'Di GAEKS Freight, kami memahami bahwa setiap pengiriman membawa lebih dari sekadar barang. Ada waktu yang berharga, komitmen bisnis, peluang pertumbuhan, dan kepercayaan yang harus dijaga.',
      'Melalui perencanaan proaktif, keahlian yang terarah, dan integrasi teknologi, kami berupaya mengubah tantangan logistik menjadi solusi yang dapat dijalankan dan hasil yang dapat dipertanggungjawabkan.',
    ],
    entityName: 'PT Global Andalan Ekspress',
    entitySubtitle: 'Freight forwarding dan logistik internasional',
    introImageUrl: '/images/editorial/about-team-coordination.webp',
    introImageAlt: 'Ilustrasi dua spesialis koordinasi logistik berdiskusi mengenai jadwal pengiriman dan rute perdagangan',
    visionLabel: 'VISI KAMI',
    visionText:
      'Membentuk standar baru dalam industri freight forwarding yang berlandaskan kesejahteraan karyawan, kepemimpinan teknologi, kekayaan intelektual, dan keunggulan operasional, dengan menempatkan pelanggan sebagai pusat setiap keputusan, mengubah kompleksitas menjadi efisiensi, serta mewujudkan solusi melalui tindakan nyata dan hasil yang transparan.',
    philosophyLabel: 'FILOSOFI KAMI',
    philosophyText:
      'Setiap pengiriman membawa nilai yang melampaui barang itu sendiri: waktu, komitmen bisnis, dan kepercayaan pelanggan. Kami menempatkan pelanggan sebagai pusat keputusan, karyawan sebagai fondasi, teknologi sebagai nadi, keahlian sebagai kekuatan, dan hasil nyata sebagai pembuktian.',
    missionLabel: 'MISI KAMI',
    missionIntro: 'Enam komitmen yang menjadi pedoman dalam setiap keputusan dan pelaksanaan layanan.',
    missions: [
      {
        number: '01',
        title: 'Kesejahteraan dan Pengembangan Karyawan',
        body: 'Membangun lingkungan kerja yang menjunjung kesejahteraan, penghargaan, pengembangan kompetensi, dan pertumbuhan karier karyawan sebagai fondasi keberhasilan perusahaan.',
      },
      {
        number: '02',
        title: 'Nilai Pelanggan dan Layanan Proaktif',
        body: 'Memahami nilai strategis setiap pengiriman, mempersiapkan kebutuhan pelanggan, mengantisipasi risiko, mengoptimalkan biaya, dan memangkas waktu pengiriman tanpa mengorbankan kualitas atau kepatuhan.',
      },
      {
        number: '03',
        title: 'Solusi Melalui Tindakan Nyata',
        body: 'Menjadikan permasalahan pelanggan sebagai tantangan yang harus dijawab, termasuk pekerjaan paling kompleks, melalui solusi terencana, pelaksanaan nyata, dan tanggung jawab terhadap hasil.',
      },
      {
        number: '04',
        title: 'Teknologi sebagai Nadi Perusahaan',
        body: 'Menjadikan teknologi sebagai fondasi kerja melalui integrasi sistem, otomasi proses, pengelolaan data, serta pelaporan yang cepat dan akurat untuk mendukung keputusan dan efisiensi.',
      },
      {
        number: '05',
        title: 'Keunggulan Operasional dan Spesialisasi',
        body: 'Mengembangkan aset intelektual, pengetahuan, pengalaman, dan organisasi yang terstruktur dengan pembagian tanggung jawab yang jelas, agar setiap lini layanan dan sektor ditangani oleh tenaga ahli yang tepat.',
      },
      {
        number: '06',
        title: 'Transparansi dan Akuntabilitas',
        body: 'Menjunjung integritas, keterbukaan informasi, komunikasi proaktif, dan akuntabilitas pada setiap tahap pengiriman, serta memberikan hasil yang terukur dan dapat dipertanggungjawabkan.',
      },
    ],
    identityPdfUrl: '/documents/GAEKS-Freight-Vision-Mission-and-Brand-Identity-Final.pdf',
    identityPdfLabel: 'Unduh Dokumen Visi dan Misi',
    principlesLabel: 'PRINSIP GAEKS',
    principlesHeadline: 'Segalanya berawal dari kebutuhan Anda.',
    principlesIntro:
      'Kami menempatkan pelanggan sebagai pusat keputusan, karyawan sebagai fondasi, teknologi sebagai nadi, keahlian sebagai kekuatan, dan hasil nyata sebagai pembuktian. Bagi kami, solusi harus diwujudkan melalui tindakan dan keterbukaan terhadap hasil.',
    principlesCenterLabel: 'Pelanggan',
    principlesCenterRole: 'Pusat keputusan',
    principlesNodes: [
      {
        id: 'karyawan',
        label: 'Karyawan',
        role: 'Fondasi',
        detail: 'Tim yang dihargai, kompeten, dan berdedikasi memastikan setiap rencana dijalankan dengan konsisten.',
      },
      {
        id: 'teknologi',
        label: 'Teknologi',
        role: 'Nadi',
        detail: 'Integrasi sistem dan alur data menghubungkan koordinasi operasional secara cepat dan akurat.',
      },
      {
        id: 'keahlian',
        label: 'Keahlian',
        role: 'Kekuatan',
        detail: 'Spesialisasi di tiap lini laut, udara, darat, perizinan, dan pabean mengurangi risiko keterlambatan.',
      },
      {
        id: 'tindakan',
        label: 'Tindakan',
        role: 'Komitmen',
        detail: 'Pekerjaan kompleks diselesaikan melalui perencanaan terukur dan eksekusi lapangan yang bertanggung jawab.',
      },
      {
        id: 'transparansi',
        label: 'Transparansi',
        role: 'Prinsip',
        detail: 'Keterbukaan status, komunikasi proaktif, dan hasil yang dapat dipertanggungjawabkan di setiap tahap.',
      },
    ],
    cultureLabel: 'KARYAWAN DAN BUDAYA KERJA',
    cultureHeadline: 'Logistik yang lebih baik berawal dari manusia yang dihargai.',
    cultureBody:
      'Kami percaya bahwa kesejahteraan, penghargaan, pengembangan kompetensi, dan kesempatan bertumbuh merupakan bagian penting dari keberhasilan perusahaan. Kami berkomitmen membangun lingkungan kerja yang saling mendukung, menghargai kontribusi, dan mendorong pembelajaran berkelanjutan.',
    culturePillars: [
      'Kesejahteraan karyawan',
      'Pengembangan profesional',
      'Berbagi pengetahuan',
      'Pertumbuhan karier',
      'Kolaborasi',
      'Penghargaan dan rasa hormat',
    ],
    cultureImageUrl: '/images/editorial/culture-collaboration.webp',
    cultureImageAlt: 'Ilustrasi diskusi kolaboratif tim operasional logistik di ruang kerja modern',
    cultureCtaLabel: 'Lihat Karier di GAEKS',
    operationsLabel: 'KEUNGGULAN OPERASIONAL',
    operationsHeadline: 'Setiap bidang membutuhkan ahlinya.',
    operationsBody:
      'Tantangan logistik yang berbeda membutuhkan keahlian yang berbeda pula. Kami mengembangkan organisasi dengan pembagian tanggung jawab yang jelas, memadukan pengetahuan, pengalaman, dan koordinasi antarbidang agar setiap kebutuhan ditangani oleh tenaga ahli yang tepat.',
    operationsDisciplines: [
      {
        id: 'ocean',
        serviceId: 'fcl',
        title: 'Pengiriman laut (FCL dan LCL)',
        summary: 'Perencanaan kapasitas, rute, dan kebutuhan pengiriman laut.',
        imageUrl: '/uploads/1789234509_387710.webp',
        imageAlt: 'Aktivitas bongkar muat kontainer pada terminal pelabuhan laut',
      },
      {
        id: 'air',
        serviceId: 'air-shipment',
        title: 'Pengiriman udara',
        summary: 'Penanganan kebutuhan pengiriman yang sensitif terhadap waktu.',
        imageUrl: '/uploads/1789234609_387712.webp',
        imageAlt: 'Penanganan palet kargo udara di apron bandara di samping pesawat berbadan lebar',
      },
      {
        id: 'customs',
        serviceId: 'ppjk',
        title: 'Pengurusan kepabeanan (PPJK)',
        summary: 'Pengurusan dokumen dan kepatuhan kepabeanan.',
        imageUrl: '/uploads/1789234361_387709.webp',
        imageAlt: 'Pemeriksaan dokumen kepabeanan dan koordinasi kontainer di area pelabuhan',
      },
      {
        id: 'inland',
        serviceId: 'domestic-truck',
        title: 'Transportasi darat',
        summary: 'Koordinasi pengangkutan dan distribusi darat.',
        imageUrl: '/uploads/1789232112_387700.webp',
        imageAlt: 'Deretan armada truk operasional GAEKS siap distribusi darat',
      },
      {
        id: 'permits',
        serviceId: 'undername-impor',
        title: 'Perizinan impor dan undername',
        summary: 'Dukungan kebutuhan perizinan dan administrasi sesuai ketentuan.',
        imageUrl: '/uploads/gaeks-hero-cargo-poster.webp',
        imageAlt: 'Koordinasi administrasi dan perencanaan impor perdagangan internasional',
      },
      {
        id: 'warehouse',
        serviceId: 'gudang-pbm',
        title: 'Pergudangan',
        summary: 'Penanganan kebutuhan penyimpanan dan arus barang.',
        imageUrl: '/uploads/1789234769_387713.webp',
        imageAlt: 'Proses forklift memuat palet kargo ke dalam peti kemas di area pergudangan',
      },
    ],
    digitalLabel: 'KEUNGGULAN DIGITAL',
    digitalHeadline: 'Teknologi adalah nadi cara kerja kami.',
    digitalBody:
      'Kami menjadikan teknologi sebagai fondasi untuk menghubungkan manusia, proses, dan informasi. Melalui pengembangan sistem yang terintegrasi, otomasi, dan pengelolaan data, kami berupaya mempercepat pengambilan keputusan, meningkatkan efisiensi operasional, dan memberikan visibilitas pengiriman yang lebih baik.',
    digitalCapabilities: [
      {
        id: 'visibilitas',
        title: 'Visibilitas pengiriman',
        detail: 'Pelacakan status pengiriman terintegrasi berbasis nomor referensi HAWB, B/L, atau kontainer.',
        availability: 'available',
        route: 'tracking',
        ctaLabel: 'Buka Pelacakan Pengiriman',
        flowStages: ['Input HAWB / B/L', 'Sync Gate & Bea Cukai', 'Status Milestone Aktif'],
      },
      {
        id: 'optimalisasi',
        title: 'Optimalisasi waktu pengiriman',
        detail: 'Perbandingan koridor pelabuhan, bandara, jadwal keberangkatan, dan estimasi waktu tempuh lintas rute pengiriman.',
        availability: 'available',
        route: 'network',
        ctaLabel: 'Buka Rute dan Jadwal',
        flowStages: ['Pilih Pelabuhan / Bandara', 'Bandingkan Koridor & Jadwal', 'Estimasi Lead Time'],
      },
      {
        id: 'integrasi',
        title: 'Integrasi sistem',
        detail:
          'Sinkronisasi data lintas ekosistem logistik, mencakup aktivitas terminal pelabuhan dan bandara, posisi kapal serta penerbangan, pemantauan GPS armada truk, hingga alur operasional terkait.',
        availability: 'available',
        flowStages: ['Aktivitas Pelabuhan & Bandara', 'Posisi Kapal, Pesawat & GPS', 'Sinkronisasi Sistem Terpusat'],
      },
      {
        id: 'otomasi',
        title: 'Otomasi alur kerja',
        detail:
          'Tersedia sistem ERP terintegrasi sebagai sumber data utama untuk mengotomasi alur kerja operasional, pengelolaan dokumen, dan pelaporan secara real-time.',
        availability: 'available',
        flowStages: ['Sumber Data ERP Terintegrasi', 'Otomasi Alur Pekerjaan', 'Pelaporan Real-Time'],
      },
      {
        id: 'pelaporan',
        title: 'Pelaporan cepat',
        detail: 'Pembaruan milestone pengiriman yang lebih cepat dan konsisten bagi pengirim dan penerima.',
        availability: 'available',
        flowStages: ['Catat Milestone Kargo', 'Verifikasi Dokumen', 'Ringkasan Terjadwal'],
      },
      {
        id: 'data',
        title: 'Keputusan berbasis data',
        detail: 'Simulasi volume CBM, berat volumetrik, serta kebutuhan kapasitas muatan untuk perencanaan pengiriman yang tepat.',
        availability: 'available',
        route: 'calculator',
        ctaLabel: 'Buka Kalkulator Kargo',
        flowStages: ['Dimensi & Berat Kargo', 'Hitung CBM & Volumetrik', 'Rekomendasi Kapasitas'],
      },
    ],
    valuesLabel: 'NILAI INTI PERUSAHAAN',
    valuesHeadline: 'Tujuh nilai yang menuntun setiap keputusan kami.',
    values: [
      {
        number: '01',
        title: 'Mengutamakan Manusia',
        englishTitle: 'People First',
        description: 'Kesejahteraan dan pengembangan karyawan.',
      },
      {
        number: '02',
        title: 'Berorientasi pada Pelanggan',
        englishTitle: 'Customer Centricity',
        description: 'Kebutuhan pelanggan sebagai prioritas.',
      },
      {
        number: '03',
        title: 'Tanggung Jawab',
        englishTitle: 'Ownership',
        description: 'Tanggung jawab hingga penyelesaian.',
      },
      {
        number: '04',
        title: 'Keunggulan Operasional',
        englishTitle: 'Operational Excellence',
        description: 'Keahlian dan standar operasional tinggi.',
      },
      {
        number: '05',
        title: 'Inovasi Digital',
        englishTitle: 'Digital Innovation',
        description: 'Teknologi sebagai nadi perusahaan.',
      },
      {
        number: '06',
        title: 'Integritas dan Transparansi',
        englishTitle: 'Integrity & Transparency',
        description: 'Keterbukaan dan integritas dalam hasil.',
      },
      {
        number: '07',
        title: 'Perbaikan Berkelanjutan',
        englishTitle: 'Continuous Improvement',
        description: 'Perbaikan berkelanjutan.',
      },
    ],
    commitmentLabel: 'KOMITMEN KAMI',
    commitmentLines: ['Solusi nyata.', 'Tindakan nyata.', 'Hasil transparan.'],
    commitmentBody:
      'Apa pun tantangan logistik Anda, kami berkomitmen menemukan solusi yang tepat dan mewujudkannya.',
    commitmentCtaLabel: 'Diskusikan Kebutuhan Anda',
  },
  rateCard: {
    seoTitle: 'Tarif Pengiriman | GAEKS Freight',
    metaDescription:
      'Dapatkan informasi tarif pengiriman laut dan udara GAEKS Freight sesuai rute, jenis kargo, kebutuhan layanan, dan jadwal pengiriman Anda.',
    label: 'INFORMASI TARIF PENGIRIMAN',
    headline: 'Rencanakan pengiriman Anda dengan informasi tarif yang tepat.',
    description:
      'Dapatkan informasi tarif yang disesuaikan dengan rute, jenis kargo, kebutuhan layanan, dan jadwal pengiriman Anda.',
    emptyTitle: 'Informasi tarif belum tersedia secara daring.',
    emptyBody:
      'Silakan kirimkan permintaan penawaran kepada tim kami untuk mendapatkan informasi tarif sesuai kebutuhan pengiriman Anda.',
    primaryCtaLabel: 'Minta Penawaran',
    secondaryCtaLabel: 'Hubungi Tim Kami',
    preparationHeading: 'Informasi yang membantu perhitungan tarif lebih cepat',
    preparationItems: [
      'Kota, pelabuhan, atau bandara asal dan tujuan.',
      'Moda pengiriman laut (FCL/LCL) atau pengiriman udara.',
      'Jenis barang, dimensi, berat kotor, dan jumlah kemasan.',
      'Target jadwal pengiriman serta kebutuhan kepabeanan atau perizinan.',
    ],
    items: [],
  },
  carriers: {
    seoTitle: 'Maskapai dan Perusahaan Pelayaran | GAEKS Freight',
    metaDescription:
      'Pilihan angkutan laut dan udara di GAEKS Freight berdasarkan rute, kapasitas, jadwal, dan karakteristik kargo Anda.',
    label: 'INFORMASI PENYEDIA ANGKUTAN',
    headline: 'Pilihan angkutan untuk kebutuhan pengiriman Anda.',
    description:
      'Pemilihan maskapai dan perusahaan pelayaran mempertimbangkan rute, kapasitas, jadwal, karakteristik kargo, serta kebutuhan pengiriman pelanggan.',
    emptyTitle: 'Direktori penyedia angkutan belum tersedia secara daring.',
    emptyBody:
      'Silakan hubungi tim kami untuk mendapatkan rekomendasi maskapai atau perusahaan pelayaran yang sesuai dengan kebutuhan pengiriman Anda.',
    primaryCtaLabel: 'Konsultasikan Pengiriman',
    secondaryCtaLabel: 'Lihat Rute dan Jadwal',
    airlinesTitle: 'Maskapai Penerbangan',
    airlinesNote: 'Pemilihan maskapai mempertimbangkan ruang kargo, frekuensi penerbangan, transit bandara, dan sifat barang.',
    shippingLinesTitle: 'Perusahaan Pelayaran',
    shippingLinesNote: 'Penyesuaian pelayaran laut mempertimbangkan jadwal kapal, port call, free time kontainer, serta stabilitas rute.',
    items: [],
  },
  careers: {
    seoTitle: 'Karier di GAEKS | GAEKS Freight',
    metaDescription:
      'Bertumbuh bersama PT Global Andalan Ekspress (GAEKS Freight): budaya kerja yang menghargai kesejahteraan, pengembangan kompetensi, dan kolaborasi.',
    label: 'KARIER DI GAEKS',
    headline: 'Bertumbuh bersama. Membangun masa depan logistik.',
    description:
      'Kami percaya bahwa perusahaan yang kuat dibangun oleh manusia yang dihargai, didukung, dan diberi kesempatan untuk terus berkembang.',
    heroImageUrl: '/uploads/1789234361_387709.webp',
    heroImageAlt: 'Tim operasional GAEKS Freight bekerja bersama di area pelabuhan dengan standar keselamatan kerja',
    cultureHeading: 'Lingkungan kerja yang bertumpu pada kesejahteraan dan kapabilitas',
    commitments: [
      {
        title: 'Kesejahteraan karyawan',
        detail: 'Menempatkan kesejahteraan manusia sebagai fondasi stabilitas kerja dan pelayanan kepada pelanggan.',
      },
      {
        title: 'Pengembangan kompetensi',
        detail: 'Mendorong penguasaan teknis logistik, kepabeanan, regulasi perdagangan, dan standar operasional.',
      },
      {
        title: 'Pertumbuhan profesional',
        detail: 'Membuka ruang bertumbuh seiring pendalaman spesialisasi dan tanggung jawab peran.',
      },
      {
        title: 'Kolaborasi',
        detail: 'Menghubungkan tim layanan, dokumen, teknologi, dan lapangan agar pekerjaan kompleks berjalan selaras.',
      },
      {
        title: 'Inovasi dan teknologi',
        detail: 'Membiasakan pemanfaatan sistem terintegrasi dan pengelolaan data dalam koordinasi sehari-hari.',
      },
      {
        title: 'Penghargaan terhadap kontribusi',
        detail: 'Menghargai ketelitian, tanggung jawab penyelesaian, serta peran nyata setiap anggota tim.',
      },
    ],
    openingsHeading: 'Peluang Karier',
    emptyTitle: 'Saat ini belum ada lowongan yang tersedia.',
    emptyBody:
      'Terima kasih atas ketertarikan Anda untuk bergabung bersama GAEKS Freight. Informasi mengenai kesempatan karier akan dipublikasikan melalui halaman ini ketika tersedia.',
    emptyCtaLabel: 'Kenali Perusahaan Kami',
    positions: [],
  },
};
