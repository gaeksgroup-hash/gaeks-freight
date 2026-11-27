export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | {
      type: 'contact';
      company: string;
      division: string;
      email: string;
      emailSubject?: string;
      website: string;
    };

export interface LegalSubsection {
  id: string;
  number: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalArticle {
  id: string;
  number: string;
  title: string;
  blocks?: LegalBlock[];
  subsections?: LegalSubsection[];
}

export interface LegalDocumentData {
  key: 'terms' | 'privacy';
  route: string;
  pageTitle: string;
  seoTitle: string;
  metaDescription: string;
  subtitle: string;
  entityName: string;
  effectiveDate: string;
  version: string;
  pdfUrl: string;
  pdfFileName: string;
  siblingPage: 'terms' | 'privacy';
  siblingLabel: string;
  siblingRoute: string;
  articles: LegalArticle[];
}

export const TERMS_OF_USE_DOCUMENT: LegalDocumentData = {
  key: 'terms',
  route: '/terms-of-use/',
  pageTitle: 'Terms of Use Website',
  seoTitle: 'Terms of Use Website | GAEKS',
  metaDescription:
    'Read the official website terms of use of PT Global Andalan Ekspress (GAEKS), an international freight forwarding and logistics company.',
  subtitle: 'Ketentuan Penggunaan Situs Web',
  entityName: 'PT Global Andalan Ekspress',
  effectiveDate: '1 February 2025',
  version: '1.0',
  pdfUrl: '/documents/GAEKS-Terms-of-Use-Website-Bilingual.pdf',
  pdfFileName: 'GAEKS-Terms-of-Use-Website-Bilingual.pdf',
  siblingPage: 'privacy',
  siblingLabel: 'Privacy Terms',
  siblingRoute: '/privacy-terms/',
  articles: [
    {
      id: 'pasal-1',
      number: '1',
      title: 'General Provisions',
      blocks: [
        {
          type: 'paragraph',
          text: 'Situs web www.gaeks.com (“Website”) dimiliki dan dioperasikan oleh PT Global Andalan Ekspress, selanjutnya disebut “GAEKS”, “Perusahaan”, atau “Kami”.',
        },
        {
          type: 'paragraph',
          text: 'Ketentuan Penggunaan Website ini (“Ketentuan”) mengatur akses dan penggunaan Website, termasuk seluruh informasi, konten, fitur, fasilitas digital, dan layanan elektronik yang tersedia di dalamnya.',
        },
        {
          type: 'paragraph',
          text: 'Dengan mengakses atau menggunakan Website, pengguna tunduk pada Ketentuan ini sepanjang berlaku secara sah berdasarkan peraturan perundang-undangan.',
        },
      ],
    },
    {
      id: 'pasal-2',
      number: '2',
      title: 'Purpose and Scope of the Website',
      blocks: [
        {
          type: 'paragraph',
          text: 'Website disediakan sebagai sarana informasi, komunikasi, dan pendukung kegiatan bisnis GAEKS dalam bidang pengurusan transportasi, freight forwarding, kepabeanan, dan logistik domestik maupun internasional.',
        },
        { type: 'paragraph', text: 'Fasilitas Website dapat mencakup:' },
        {
          type: 'list',
          items: [
            'Informasi produk dan layanan logistik.',
            'Permintaan penawaran harga.',
            'Pelacakan pengiriman dan status kargo.',
            'Informasi rute, jadwal, dan estimasi pengiriman.',
            'Informasi perdagangan internasional dan kepabeanan.',
            'Komunikasi antara pengguna dan GAEKS.',
            'Akses terhadap dokumen dan fasilitas digital terkait layanan.',
          ],
        },
        {
          type: 'paragraph',
          text: 'GAEKS dapat mengembangkan, memperbarui, membatasi, atau menghentikan fitur Website sesuai kebutuhan operasional dan ketentuan hukum yang berlaku.',
        },
      ],
    },
    {
      id: 'pasal-3',
      number: '3',
      title: 'Permitted Use and User Responsibilities',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pengguna hanya diperkenankan menggunakan Website untuk tujuan yang sah dan sesuai dengan fungsi yang disediakan.',
        },
        {
          type: 'paragraph',
          text: 'Pengguna bertanggung jawab untuk memastikan bahwa informasi, data, dan dokumen yang disampaikan kepada GAEKS adalah benar, akurat, lengkap, serta diperoleh secara sah.',
        },
        {
          type: 'paragraph',
          text: 'Pengguna yang bertindak atas nama perusahaan atau badan usaha wajib memiliki kewenangan yang diperlukan untuk mewakili pihak tersebut.',
        },
        { type: 'paragraph', text: 'Pengguna dilarang:' },
        {
          type: 'list',
          items: [
            'Menggunakan Website untuk kegiatan yang melanggar hukum, penipuan, atau penyalahgunaan identitas.',
            'Mengakses informasi, sistem, akun, atau data pengiriman tanpa otorisasi.',
            'Mengganggu keamanan, integritas, atau ketersediaan sistem elektronik GAEKS.',
            'Mengirimkan perangkat lunak berbahaya, spam, atau konten yang dapat merugikan pihak lain.',
            'Melakukan pengambilan data secara otomatis, scraping, crawling, atau penggunaan bot tanpa izin tertulis, kecuali pengindeksan yang secara wajar diizinkan oleh GAEKS.',
            'Memanfaatkan informasi Website untuk memperoleh keuntungan secara tidak sah atau merugikan GAEKS, pelanggan, maupun mitra bisnisnya.',
            'Menggunakan identitas, merek, atau dokumen GAEKS untuk kegiatan yang tidak memperoleh persetujuan.',
          ],
        },
        {
          type: 'paragraph',
          text: 'GAEKS berhak membatasi atau menghentikan akses pengguna apabila terdapat dugaan yang beralasan mengenai pelanggaran terhadap Ketentuan ini.',
        },
      ],
    },
    {
      id: 'pasal-4',
      number: '4',
      title: 'Quotations and Commercial Agreements',
      blocks: [
        {
          type: 'paragraph',
          text: 'Informasi tarif, estimasi biaya, simulasi harga, jadwal, maupun penawaran awal yang tersedia melalui Website bersifat informatif, kecuali secara tegas dinyatakan sebagai penawaran yang mengikat.',
        },
        {
          type: 'paragraph',
          text: 'Penyampaian permintaan penawaran melalui Website tidak dengan sendirinya membentuk kontrak pengiriman atau kewajiban GAEKS untuk menyediakan layanan.',
        },
        {
          type: 'paragraph',
          text: 'Tarif dan ketersediaan layanan dapat dipengaruhi oleh berbagai faktor, termasuk:',
        },
        {
          type: 'list',
          items: [
            'Ketersediaan ruang muatan dan kapasitas pengangkutan.',
            'Perubahan tarif perusahaan pelayaran, maskapai, dan penyedia jasa lainnya.',
            'Fluktuasi nilai tukar mata uang.',
            'Biaya bahan bakar, terminal, pergudangan, dan penanganan kargo.',
            'Bea masuk, pajak, serta pungutan pemerintah.',
            'Kondisi operasional dan perubahan regulasi.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Hubungan kontraktual atas layanan logistik mengikuti penawaran yang telah disepakati, konfirmasi pemesanan, perjanjian jasa, dokumen pengangkutan, serta syarat dan ketentuan layanan yang berlaku untuk transaksi tersebut.',
        },
        {
          type: 'paragraph',
          text: 'Ketentuan Penggunaan Website ini tidak menggantikan perjanjian komersial maupun ketentuan pengangkutan yang secara khusus disepakati antara GAEKS dan pelanggan.',
        },
      ],
    },
    {
      id: 'pasal-5',
      number: '5',
      title: 'Shipment Tracking and Operational Information',
      blocks: [
        {
          type: 'paragraph',
          text: 'Fasilitas pelacakan pengiriman disediakan untuk membantu pelanggan memperoleh informasi mengenai perkembangan pengiriman dan posisi operasional kargo.',
        },
        {
          type: 'paragraph',
          text: 'Informasi pelacakan dapat bersumber dari sistem internal GAEKS, perusahaan pelayaran, maskapai penerbangan, agen, terminal, penyedia transportasi, serta mitra operasional lainnya.',
        },
        {
          type: 'paragraph',
          text: 'Waktu pembaruan informasi dapat berbeda dengan kondisi aktual di lapangan.',
        },
        {
          type: 'paragraph',
          text: 'Estimasi keberangkatan (ETD), estimasi kedatangan (ETA), waktu transit, lokasi kargo, dan tahapan pengiriman bersifat indikatif serta dapat mengalami perubahan.',
        },
        {
          type: 'paragraph',
          text: 'Informasi pelacakan tidak dengan sendirinya merupakan bukti penyerahan barang, konfirmasi penyelesaian kewajiban kepabeanan, jaminan kedatangan, atau dokumen resmi pengangkutan.',
        },
        {
          type: 'paragraph',
          text: 'Untuk keperluan yang memerlukan kepastian operasional atau hukum, pengguna disarankan memperoleh konfirmasi resmi dari GAEKS.',
        },
        {
          type: 'paragraph',
          text: 'Pengguna hanya diperkenankan mengakses informasi pengiriman yang secara sah berada dalam kewenangannya.',
        },
      ],
    },
    {
      id: 'pasal-6',
      number: '6',
      title: 'Freight Forwarding and Customs Information',
      blocks: [
        {
          type: 'paragraph',
          text: 'GAEKS menyediakan layanan pengurusan dan koordinasi logistik sesuai dengan ruang lingkup layanan yang disepakati bersama pelanggan.',
        },
        {
          type: 'paragraph',
          text: 'Dalam pelaksanaannya, GAEKS dapat bekerja sama dengan perusahaan pelayaran, maskapai, agen internasional, penyedia transportasi darat, operator pergudangan, dan penyedia jasa lainnya.',
        },
        {
          type: 'paragraph',
          text: 'Kedudukan dan tanggung jawab GAEKS sebagai freight forwarder, agen, penyedia jasa, atau pihak lainnya ditentukan berdasarkan karakteristik transaksi, perjanjian, dokumen terkait, dan peraturan yang berlaku.',
        },
        {
          type: 'paragraph',
          text: 'Informasi mengenai klasifikasi HS Code, perizinan impor dan ekspor, persetujuan impor, larangan dan pembatasan, perpajakan, serta prosedur kepabeanan yang tersedia di Website bersifat informasi umum.',
        },
        {
          type: 'paragraph',
          text: 'Informasi tersebut tidak menggantikan keputusan resmi otoritas yang berwenang maupun pemeriksaan atas karakteristik dan dokumen barang yang sebenarnya.',
        },
        {
          type: 'paragraph',
          text: 'GAEKS tidak menjamin persetujuan perizinan, keputusan kepabeanan, atau tindakan administratif yang berada dalam kewenangan instansi pemerintah.',
        },
      ],
    },
    {
      id: 'pasal-7',
      number: '7',
      title: 'Intellectual Property Rights',
      blocks: [
        {
          type: 'paragraph',
          text: 'Seluruh hak kekayaan intelektual atas Website, termasuk merek, logo, identitas visual, desain, teks, ilustrasi, fotografi, perangkat lunak, dan materi digital, dimiliki oleh GAEKS atau pihak lain yang memberikan hak penggunaan secara sah.',
        },
        {
          type: 'paragraph',
          text: 'Pengguna diperkenankan mengakses dan menggunakan materi Website untuk kebutuhan informasi pribadi atau kegiatan bisnis yang sah.',
        },
        {
          type: 'paragraph',
          text: 'Penggandaan, modifikasi, distribusi, publikasi ulang, penggunaan komersial, atau pemanfaatan identitas visual GAEKS di luar penggunaan yang diizinkan memerlukan persetujuan tertulis sebelumnya, kecuali diperbolehkan berdasarkan hukum.',
        },
        {
          type: 'paragraph',
          text: 'Penggunaan Website tidak memberikan pengalihan kepemilikan maupun hak kekayaan intelektual kepada pengguna.',
        },
      ],
    },
    {
      id: 'pasal-8',
      number: '8',
      title: 'Confidentiality and Information Security',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pengguna wajib menjaga kerahasiaan informasi yang tidak ditujukan untuk konsumsi publik, termasuk dokumen pengiriman, penawaran komersial, tarif khusus, kredensial akun, dan informasi pelanggan.',
        },
        {
          type: 'paragraph',
          text: 'Pengguna bertanggung jawab menjaga keamanan perangkat, kredensial, nomor referensi, serta tautan akses yang berada dalam penguasaannya.',
        },
        {
          type: 'paragraph',
          text: 'Apabila pengguna mengetahui adanya akses tidak sah, penyalahgunaan data, atau insiden keamanan terkait Website, pengguna diharapkan segera menghubungi GAEKS melalui saluran komunikasi resmi.',
        },
        {
          type: 'paragraph',
          text: 'Pemrosesan data pribadi dilaksanakan sesuai dengan Privacy Terms GAEKS dan peraturan pelindungan data pribadi yang berlaku.',
        },
      ],
    },
    {
      id: 'pasal-9',
      number: '9',
      title: 'Third-Party Websites and Services',
      blocks: [
        {
          type: 'paragraph',
          text: 'Website dapat menyediakan tautan, integrasi, atau akses menuju situs dan layanan pihak ketiga.',
        },
        {
          type: 'paragraph',
          text: 'Penyediaan tautan tersebut tidak dengan sendirinya menunjukkan bahwa GAEKS memiliki, mengendalikan, atau memberikan jaminan atas seluruh informasi dan layanan pihak ketiga.',
        },
        {
          type: 'paragraph',
          text: 'Penggunaan layanan pihak ketiga dapat tunduk pada ketentuan penggunaan dan kebijakan privasi masing-masing penyedia.',
        },
        {
          type: 'paragraph',
          text: 'Ketentuan ini tidak mengurangi tanggung jawab GAEKS atas pihak ketiga yang bertindak untuk dan atas nama GAEKS sejauh diwajibkan oleh hukum atau perjanjian.',
        },
      ],
    },
    {
      id: 'pasal-10',
      number: '10',
      title: 'Website Availability and Disclaimer',
      blocks: [
        {
          type: 'paragraph',
          text: 'GAEKS berupaya secara wajar untuk memastikan informasi Website tetap relevan, akurat, dan dapat diakses.',
        },
        {
          type: 'paragraph',
          text: 'Namun, Website dapat mengalami gangguan, keterlambatan pembaruan, kesalahan teknis, pemeliharaan sistem, maupun kondisi lain yang memengaruhi ketersediaan layanan digital.',
        },
        {
          type: 'paragraph',
          text: 'Sepanjang diperbolehkan oleh hukum, GAEKS tidak memberikan jaminan bahwa Website akan selalu tersedia tanpa gangguan atau bahwa seluruh informasi di dalamnya bebas dari kesalahan.',
        },
        {
          type: 'paragraph',
          text: 'Pengguna diharapkan melakukan verifikasi sebelum mengambil keputusan komersial atau operasional yang memiliki konsekuensi material berdasarkan informasi umum Website.',
        },
      ],
    },
    {
      id: 'pasal-11',
      number: '11',
      title: 'Limitation of Liability',
      blocks: [
        {
          type: 'paragraph',
          text: 'Sepanjang diperbolehkan oleh peraturan perundang-undangan, GAEKS tidak bertanggung jawab atas kerugian tidak langsung atau konsekuensial yang semata-mata timbul akibat penyalahgunaan Website, akses tanpa otorisasi oleh pengguna, atau ketergantungan terhadap informasi umum tanpa verifikasi yang diperlukan.',
        },
        {
          type: 'paragraph',
          text: 'Ketentuan pembatasan tanggung jawab dalam dokumen ini berlaku terhadap penggunaan Website dan tidak dimaksudkan untuk menghapus tanggung jawab GAEKS berdasarkan perjanjian layanan logistik yang berlaku.',
        },
        {
          type: 'paragraph',
          text: 'Tidak ada ketentuan dalam dokumen ini yang mengecualikan tanggung jawab atas penipuan, kesengajaan, atau tanggung jawab lain yang menurut hukum tidak dapat dikecualikan atau dibatasi.',
        },
      ],
    },
    {
      id: 'pasal-12',
      number: '12',
      title: 'Force Majeure',
      blocks: [
        {
          type: 'paragraph',
          text: 'Sepanjang memenuhi ketentuan hukum yang berlaku, GAEKS tidak bertanggung jawab atas gangguan akses Website yang secara langsung disebabkan oleh keadaan di luar kendali wajarnya, termasuk bencana alam, gangguan infrastruktur telekomunikasi, pemadaman listrik, tindakan pemerintah, konflik, dan gangguan eksternal lainnya.',
        },
        {
          type: 'paragraph',
          text: 'Ketentuan keadaan kahar terkait pelaksanaan layanan logistik mengikuti perjanjian komersial yang berlaku.',
        },
      ],
    },
    {
      id: 'pasal-13',
      number: '13',
      title: 'Amendments to These Terms',
      blocks: [
        {
          type: 'paragraph',
          text: 'GAEKS dapat memperbarui Ketentuan ini untuk menyesuaikan perkembangan layanan, teknologi, kebutuhan operasional, maupun perubahan peraturan perundang-undangan.',
        },
        {
          type: 'paragraph',
          text: 'Versi terbaru akan dipublikasikan melalui Website beserta tanggal berlakunya.',
        },
        {
          type: 'paragraph',
          text: 'Perubahan material akan diberitahukan melalui mekanisme yang sesuai apabila diwajibkan oleh hukum.',
        },
        {
          type: 'paragraph',
          text: 'Perubahan Ketentuan Website tidak secara otomatis mengubah perjanjian komersial yang telah berlaku sebelumnya.',
        },
      ],
    },
    {
      id: 'pasal-14',
      number: '14',
      title: 'Governing Law and Dispute Resolution',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ketentuan ini diatur dan ditafsirkan berdasarkan hukum Republik Indonesia.',
        },
        {
          type: 'paragraph',
          text: 'Perselisihan yang berkaitan dengan penggunaan Website akan terlebih dahulu diupayakan penyelesaiannya melalui musyawarah dengan itikad baik.',
        },
        {
          type: 'paragraph',
          text: 'Apabila penyelesaian secara musyawarah tidak tercapai, perselisihan dapat diselesaikan melalui pengadilan atau mekanisme penyelesaian sengketa lain yang berwenang berdasarkan hukum yang berlaku.',
        },
        {
          type: 'paragraph',
          text: 'Ketentuan ini tidak mengurangi hak pengguna untuk menempuh mekanisme penyelesaian sengketa yang diberikan oleh peraturan perundang-undangan.',
        },
        {
          type: 'paragraph',
          text: 'Apabila suatu ketentuan dinyatakan tidak sah atau tidak dapat diberlakukan, ketentuan lainnya tetap berlaku sepanjang diperbolehkan oleh hukum.',
        },
      ],
    },
    {
      id: 'pasal-15',
      number: '15',
      title: 'Language',
      blocks: [
        {
          type: 'paragraph',
          text: 'Ketentuan ini disusun dalam Bahasa Indonesia dan dapat tersedia dalam terjemahan bahasa Inggris untuk memudahkan komunikasi internasional.',
        },
        {
          type: 'paragraph',
          text: 'Apabila terdapat perbedaan penafsiran, versi Bahasa Indonesia menjadi acuan sepanjang diperbolehkan oleh hukum.',
        },
      ],
    },
    {
      id: 'pasal-16',
      number: '16',
      title: 'Contact Information',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pertanyaan, pemberitahuan, atau korespondensi mengenai Ketentuan Penggunaan Website dapat disampaikan kepada:',
        },
        {
          type: 'contact',
          company: 'PT Global Andalan Ekspress',
          division: 'International Freight Forwarding & Logistics',
          email: 'info@gaeks.com',
          website: 'https://www.gaeks.com',
        },
      ],
    },
  ],
};

export const PRIVACY_TERMS_DOCUMENT: LegalDocumentData = {
  key: 'privacy',
  route: '/privacy-terms/',
  pageTitle: 'Privacy Terms',
  seoTitle: 'Privacy Terms | GAEKS',
  metaDescription:
    'Learn how PT Global Andalan Ekspress (GAEKS) collects, processes, protects, and manages personal data in its freight forwarding and logistics activities.',
  subtitle: 'Kebijakan Pelindungan Data Pribadi',
  entityName: 'PT Global Andalan Ekspress',
  effectiveDate: '1 February 2025',
  version: '1.0',
  pdfUrl: '/documents/GAEKS-Privacy-Terms-Bilingual.pdf',
  pdfFileName: 'GAEKS-Privacy-Terms-Bilingual.pdf',
  siblingPage: 'terms',
  siblingLabel: 'Terms of Use Website',
  siblingRoute: '/terms-of-use/',
  articles: [
    {
      id: 'pasal-1',
      number: '1',
      title: 'Our Commitment to Privacy',
      blocks: [
        {
          type: 'paragraph',
          text: 'PT Global Andalan Ekspress (“GAEKS”, “Perusahaan”, atau “Kami”) menghormati hak atas privasi dan berkomitmen untuk melindungi data pribadi yang dipercayakan kepada Kami.',
        },
        {
          type: 'paragraph',
          text: 'Sebagai perusahaan yang bergerak dalam bidang freight forwarding dan logistik, GAEKS memahami pentingnya kerahasiaan informasi pelanggan, mitra bisnis, dokumen perdagangan, serta data yang dipertukarkan dalam kegiatan rantai pasok domestik dan internasional.',
        },
        {
          type: 'paragraph',
          text: 'Privacy Terms ini menjelaskan bagaimana GAEKS memperoleh, mengumpulkan, menggunakan, menyimpan, mengungkapkan, mentransfer, dan melindungi data pribadi dalam menjalankan kegiatan bisnisnya.',
        },
        {
          type: 'paragraph',
          text: 'Pemrosesan data pribadi dilaksanakan dengan memperhatikan Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi dan peraturan perundang-undangan lain yang berlaku.',
        },
      ],
    },
    {
      id: 'pasal-2',
      number: '2',
      title: 'Data Controller and Scope',
      blocks: [
        {
          type: 'paragraph',
          text: 'PT Global Andalan Ekspress bertindak sebagai Pengendali Data Pribadi sepanjang menentukan tujuan dan melakukan kendali atas pemrosesan data pribadi yang berada dalam ruang lingkup kebijakan ini.',
        },
        {
          type: 'paragraph',
          text: 'Dalam kegiatan tertentu, GAEKS dapat bertindak sebagai Prosesor Data Pribadi sesuai dengan instruksi pengendali data dan perjanjian yang berlaku.',
        },
        {
          type: 'paragraph',
          text: 'Privacy Terms ini mencakup pemrosesan data pribadi yang berkaitan dengan:',
        },
        {
          type: 'list',
          items: [
            'Pengunjung Website dan fasilitas digital GAEKS.',
            'Pelanggan dan calon pelanggan.',
            'Perwakilan, karyawan, dan narahubung perusahaan pelanggan.',
            'Shipper, consignee, notify party, serta pihak terkait pengiriman.',
            'Vendor, agen, dan mitra bisnis.',
            'Individu yang berkomunikasi dengan GAEKS melalui saluran resmi.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Layanan digital lain yang memiliki kebijakan privasi tersendiri dapat tunduk pada ketentuan tambahan sesuai dengan karakteristik layanan tersebut.',
        },
      ],
    },
    {
      id: 'pasal-3',
      number: '3',
      title: 'Categories of Personal Data',
      blocks: [
        {
          type: 'paragraph',
          text: 'Bergantung pada sifat hubungan dan layanan yang digunakan, GAEKS dapat memproses kategori data berikut.',
        },
      ],
      subsections: [
        {
          id: 'pasal-3-1',
          number: '3.1',
          title: 'Identity and Contact Information',
          blocks: [
            {
              type: 'list',
              items: [
                'Nama lengkap.',
                'Alamat email.',
                'Nomor telepon.',
                'Alamat korespondensi.',
                'Jabatan dan informasi tempat bekerja.',
                'Identitas resmi apabila diperlukan secara sah.',
              ],
            },
          ],
        },
        {
          id: 'pasal-3-2',
          number: '3.2',
          title: 'Business and Commercial Information',
          blocks: [
            {
              type: 'list',
              items: [
                'Nama dan alamat perusahaan.',
                'Informasi perwakilan perusahaan.',
                'Informasi perpajakan dan legalitas usaha.',
                'Permintaan penawaran dan korespondensi bisnis.',
                'Informasi transaksi, kontrak, serta riwayat penggunaan layanan.',
              ],
            },
          ],
        },
        {
          id: 'pasal-3-3',
          number: '3.3',
          title: 'Shipment and Logistics Information',
          blocks: [
            {
              type: 'list',
              items: [
                'Informasi pengirim dan penerima barang.',
                'Alamat pengambilan dan penyerahan kargo.',
                'Nomor referensi pengiriman.',
                'Bill of Lading, Air Waybill, dan dokumen pengangkutan lainnya.',
                'Informasi kepabeanan, perizinan, serta dokumen perdagangan.',
                'Informasi operasional yang diperlukan untuk pelaksanaan layanan.',
              ],
            },
          ],
        },
        {
          id: 'pasal-3-4',
          number: '3.4',
          title: 'Financial and Transaction Information',
          blocks: [
            {
              type: 'list',
              items: [
                'Informasi rekening pembayaran apabila diperlukan.',
                'Informasi penagihan dan pembayaran.',
                'Bukti transaksi.',
                'Informasi perpajakan dan dokumen pendukung yang relevan.',
              ],
            },
          ],
        },
        {
          id: 'pasal-3-5',
          number: '3.5',
          title: 'Technical and Digital Information',
          blocks: [
            {
              type: 'list',
              items: [
                'Alamat IP.',
                'Jenis perangkat dan browser.',
                'Sistem operasi.',
                'Waktu dan aktivitas akses Website.',
                'Informasi cookies dan preferensi pengguna.',
                'Log keamanan dan aktivitas sistem elektronik.',
              ],
            },
          ],
        },
        {
          id: 'pasal-3-6',
          number: '3.6',
          title: 'Communications and Correspondence',
          blocks: [
            {
              type: 'paragraph',
              text: 'Informasi yang diberikan melalui email, formulir Website, telepon, WhatsApp, atau saluran komunikasi resmi lainnya, termasuk dokumen pendukung yang disampaikan kepada GAEKS.',
            },
            {
              type: 'paragraph',
              text: 'GAEKS membatasi pengumpulan data pribadi pada informasi yang relevan dan diperlukan untuk tujuan pemrosesan yang sah.',
            },
            {
              type: 'paragraph',
              text: 'Apabila data pribadi yang bersifat spesifik diperlukan, pemrosesannya dilakukan dengan memperhatikan perlindungan tambahan yang diwajibkan oleh hukum.',
            },
          ],
        },
      ],
    },
    {
      id: 'pasal-4',
      number: '4',
      title: 'Sources of Personal Data',
      blocks: [
        { type: 'paragraph', text: 'Data pribadi dapat diperoleh melalui:' },
        {
          type: 'list',
          items: [
            'Informasi yang diberikan secara langsung oleh individu.',
            'Formulir kontak dan permintaan penawaran.',
            'Komunikasi bisnis dan pelaksanaan kontrak.',
            'Dokumen transaksi dan pengiriman.',
            'Pelanggan atau perusahaan yang diwakili oleh individu terkait.',
            'Agen, perusahaan pengangkutan, vendor, dan mitra logistik.',
            'Sumber publik atau instansi berwenang yang dapat diakses secara sah.',
            'Teknologi Website dan sistem elektronik yang digunakan.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Apabila pelanggan memberikan data pribadi milik individu lain, pelanggan wajib memastikan bahwa penyampaian data tersebut memiliki dasar hukum yang sah serta telah memenuhi kewajiban pemberitahuan atau persetujuan yang diperlukan.',
        },
        {
          type: 'paragraph',
          text: 'Ketentuan ini tidak mengurangi kewajiban GAEKS sebagai Pengendali atau Prosesor Data Pribadi.',
        },
      ],
    },
    {
      id: 'pasal-5',
      number: '5',
      title: 'Purposes of Personal Data Processing',
      blocks: [
        {
          type: 'paragraph',
          text: 'GAEKS memproses data pribadi untuk tujuan yang sah, termasuk:',
        },
      ],
      subsections: [
        {
          id: 'pasal-5-1',
          number: '5.1',
          title: 'Provision of Logistics Services',
          blocks: [
            {
              type: 'paragraph',
              text: 'Untuk merencanakan, mengoordinasikan, dan melaksanakan layanan pengangkutan, kepabeanan, pergudangan, trucking, serta layanan logistik terkait.',
            },
          ],
        },
        {
          id: 'pasal-5-2',
          number: '5.2',
          title: 'Commercial and Customer Management',
          blocks: [
            {
              type: 'paragraph',
              text: 'Untuk memproses permintaan penawaran, menjalin hubungan bisnis, mengelola kontrak, memberikan dukungan pelanggan, dan menangani pertanyaan maupun keluhan.',
            },
          ],
        },
        {
          id: 'pasal-5-3',
          number: '5.3',
          title: 'Shipment Management',
          blocks: [
            {
              type: 'paragraph',
              text: 'Untuk mengelola pemesanan, dokumen pengangkutan, pelacakan kargo, koordinasi operasional, serta komunikasi dengan pihak yang terlibat dalam pengiriman.',
            },
          ],
        },
        {
          id: 'pasal-5-4',
          number: '5.4',
          title: 'Financial Administration',
          blocks: [
            {
              type: 'paragraph',
              text: 'Untuk melakukan penagihan, verifikasi pembayaran, administrasi transaksi, pencatatan keuangan, audit, dan pemenuhan kewajiban perpajakan.',
            },
          ],
        },
        {
          id: 'pasal-5-5',
          number: '5.5',
          title: 'Legal and Regulatory Compliance',
          blocks: [
            {
              type: 'paragraph',
              text: 'Untuk memenuhi kewajiban kepabeanan, perizinan, perpajakan, pemeriksaan kepatuhan perdagangan, permintaan otoritas, dan ketentuan hukum lainnya.',
            },
          ],
        },
        {
          id: 'pasal-5-6',
          number: '5.6',
          title: 'Information Security',
          blocks: [
            {
              type: 'paragraph',
              text: 'Untuk menjaga keamanan sistem, mencegah akses tidak sah, mendeteksi penipuan, menginvestigasi insiden, serta melindungi kepentingan hukum GAEKS dan pihak terkait.',
            },
          ],
        },
        {
          id: 'pasal-5-7',
          number: '5.7',
          title: 'Service Improvement and Analytics',
          blocks: [
            {
              type: 'paragraph',
              text: 'Untuk mengevaluasi kualitas layanan, memahami penggunaan Website, meningkatkan pengalaman pengguna, serta mengembangkan sistem dan proses bisnis secara bertanggung jawab.',
            },
          ],
        },
        {
          id: 'pasal-5-8',
          number: '5.8',
          title: 'Marketing and Business Communications',
          blocks: [
            {
              type: 'paragraph',
              text: 'Untuk menyampaikan informasi mengenai layanan, publikasi, perkembangan industri, dan penawaran komersial berdasarkan dasar pemrosesan yang sah.',
            },
            {
              type: 'paragraph',
              text: 'Penerima komunikasi pemasaran dapat mengajukan penghentian komunikasi tersebut melalui mekanisme yang tersedia atau dengan menghubungi GAEKS.',
            },
          ],
        },
      ],
    },
    {
      id: 'pasal-6',
      number: '6',
      title: 'Legal Basis for Processing',
      blocks: [
        {
          type: 'paragraph',
          text: 'GAEKS memproses data pribadi berdasarkan satu atau lebih dasar pemrosesan yang sah, sesuai dengan tujuan dan keadaan masing-masing kegiatan.',
        },
        { type: 'paragraph', text: 'Dasar pemrosesan tersebut dapat meliputi:' },
        {
          type: 'list',
          items: [
            'Persetujuan yang sah dan eksplisit dari Subjek Data Pribadi.',
            'Pemenuhan perjanjian atau permintaan sebelum pembentukan perjanjian.',
            'Pemenuhan kewajiban hukum.',
            'Pelindungan kepentingan vital Subjek Data Pribadi.',
            'Kepentingan sah GAEKS atau pihak terkait, dengan memperhatikan keseimbangan antara tujuan pemrosesan dan hak Subjek Data Pribadi.',
            'Dasar pemrosesan lainnya yang secara sah diperbolehkan berdasarkan peraturan perundang-undangan.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Apabila pemrosesan didasarkan pada persetujuan, Subjek Data Pribadi berhak menarik persetujuannya sesuai dengan ketentuan hukum yang berlaku.',
        },
        {
          type: 'paragraph',
          text: 'Akses terhadap Website tidak dengan sendirinya dianggap sebagai persetujuan atas seluruh kegiatan pemrosesan data pribadi.',
        },
      ],
    },
    {
      id: 'pasal-7',
      number: '7',
      title: 'Disclosure and Sharing of Personal Data',
      blocks: [
        {
          type: 'paragraph',
          text: 'Dalam menjalankan kegiatan bisnisnya, GAEKS dapat mengungkapkan data pribadi kepada pihak yang relevan sepanjang diperlukan dan memiliki dasar hukum yang sah.',
        },
        { type: 'paragraph', text: 'Penerima data tersebut dapat meliputi:' },
        {
          type: 'list',
          items: [
            'Perusahaan pelayaran dan maskapai penerbangan.',
            'Agen freight forwarding domestik dan internasional.',
            'Penyedia transportasi darat.',
            'Operator terminal, pelabuhan, dan pergudangan.',
            'Penyedia jasa kepabeanan dan penanganan kargo.',
            'Bank dan penyedia layanan pembayaran.',
            'Perusahaan asuransi dan penyedia jasa terkait.',
            'Penyedia teknologi, hosting, komunikasi, dan penyimpanan data.',
            'Auditor, konsultan, serta penasihat profesional.',
            'Otoritas kepabeanan, perpajakan, dan instansi pemerintah yang berwenang.',
            'Pihak lain yang secara sah diperlukan untuk pelaksanaan layanan.',
          ],
        },
        {
          type: 'paragraph',
          text: 'GAEKS menerapkan pembatasan pengungkapan data berdasarkan tujuan, kebutuhan operasional, serta kewajiban hukum yang relevan.',
        },
        {
          type: 'paragraph',
          text: 'GAEKS tidak memperjualbelikan data pribadi pelanggan sebagai komoditas komersial.',
        },
        {
          type: 'paragraph',
          text: 'Pihak ketiga yang memproses data atas nama GAEKS diwajibkan memenuhi ketentuan pelindungan data, kerahasiaan, serta keamanan yang relevan sesuai dengan perjanjian dan hukum yang berlaku.',
        },
      ],
    },
    {
      id: 'pasal-8',
      number: '8',
      title: 'International Data Transfers',
      blocks: [
        {
          type: 'paragraph',
          text: 'Sebagai bagian dari kegiatan freight forwarding internasional, GAEKS dapat melakukan transfer data pribadi kepada penerima yang berada di luar wilayah hukum Republik Indonesia.',
        },
        {
          type: 'paragraph',
          text: 'Transfer tersebut dapat diperlukan untuk pelaksanaan pengiriman, koordinasi agen internasional, pemenuhan ketentuan kepabeanan, pengelolaan dokumen, maupun penggunaan infrastruktur teknologi.',
        },
        {
          type: 'paragraph',
          text: 'Dalam melakukan transfer data pribadi lintas negara, GAEKS memperhatikan persyaratan pelindungan data berdasarkan hukum Indonesia, termasuk:',
        },
        {
          type: 'list',
          items: [
            'Tingkat pelindungan data pribadi yang setara atau lebih tinggi di negara penerima.',
            'Pelindungan data pribadi yang memadai dan bersifat mengikat apabila persyaratan pertama tidak terpenuhi.',
            'Persetujuan Subjek Data Pribadi apabila persyaratan sebelumnya tidak dapat dipenuhi, sesuai dengan ketentuan hukum.',
          ],
        },
        {
          type: 'paragraph',
          text: 'GAEKS mengambil langkah yang diperlukan untuk menjaga keamanan dan kerahasiaan data selama proses transfer.',
        },
      ],
    },
    {
      id: 'pasal-9',
      number: '9',
      title: 'Cookies and Digital Technologies',
      blocks: [
        {
          type: 'paragraph',
          text: 'Website GAEKS dapat menggunakan cookies dan teknologi serupa untuk mendukung fungsi Website, keamanan sistem, serta peningkatan pengalaman pengguna.',
        },
        {
          type: 'paragraph',
          text: 'Teknologi tersebut dapat dikelompokkan berdasarkan fungsi berikut.',
        },
      ],
      subsections: [
        {
          id: 'pasal-9-1',
          number: '9.1',
          title: 'Strictly Necessary Cookies',
          blocks: [
            {
              type: 'paragraph',
              text: 'Digunakan untuk menjalankan fungsi dasar Website, menjaga keamanan, dan mendukung aktivitas sistem yang diperlukan.',
            },
          ],
        },
        {
          id: 'pasal-9-2',
          number: '9.2',
          title: 'Functional Cookies',
          blocks: [
            {
              type: 'paragraph',
              text: 'Digunakan untuk menyimpan preferensi pengguna dan meningkatkan kenyamanan penggunaan Website.',
            },
          ],
        },
        {
          id: 'pasal-9-3',
          number: '9.3',
          title: 'Analytics and Performance Cookies',
          blocks: [
            {
              type: 'paragraph',
              text: 'Digunakan untuk memahami pola kunjungan, mengevaluasi kinerja Website, dan mengidentifikasi kebutuhan pengembangan layanan digital.',
            },
          ],
        },
        {
          id: 'pasal-9-4',
          number: '9.4',
          title: 'Marketing Cookies',
          blocks: [
            {
              type: 'paragraph',
              text: 'Apabila digunakan, cookies pemasaran dapat membantu mengukur efektivitas kampanye serta menyajikan komunikasi pemasaran yang relevan.',
            },
            {
              type: 'paragraph',
              text: 'Penggunaan cookies yang memerlukan persetujuan berdasarkan hukum akan dilakukan setelah persetujuan yang diperlukan diperoleh.',
            },
            {
              type: 'paragraph',
              text: 'Pengguna dapat mengelola preferensi cookies melalui pengaturan browser atau fasilitas pengaturan cookies yang tersedia di Website.',
            },
            {
              type: 'paragraph',
              text: 'Penonaktifan cookies tertentu dapat memengaruhi fungsi dan pengalaman penggunaan Website.',
            },
          ],
        },
      ],
    },
    {
      id: 'pasal-10',
      number: '10',
      title: 'Data Retention',
      blocks: [
        {
          type: 'paragraph',
          text: 'GAEKS menyimpan data pribadi selama diperlukan untuk memenuhi tujuan pemrosesan yang telah ditetapkan.',
        },
        { type: 'paragraph', text: 'Jangka waktu penyimpanan mempertimbangkan:' },
        {
          type: 'list',
          items: [
            'Durasi hubungan bisnis dan pelaksanaan kontrak.',
            'Kewajiban penyimpanan dokumen berdasarkan hukum.',
            'Ketentuan administrasi perpajakan dan kepabeanan.',
            'Kebutuhan audit, penyelesaian sengketa, dan pembuktian.',
            'Kebutuhan keamanan dan pencegahan penipuan.',
            'Jangka waktu pemrosesan yang telah diinformasikan kepada Subjek Data Pribadi.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Apabila tujuan pemrosesan telah terpenuhi dan tidak terdapat dasar hukum untuk penyimpanan lebih lanjut, data pribadi akan dihapus, dimusnahkan, atau dianonimkan sesuai dengan ketentuan yang berlaku.',
        },
      ],
    },
    {
      id: 'pasal-11',
      number: '11',
      title: 'Data Security and Confidentiality',
      blocks: [
        {
          type: 'paragraph',
          text: 'GAEKS menerapkan langkah teknis dan organisasional yang sesuai dengan sifat data, tingkat risiko, serta kebutuhan operasional untuk melindungi data pribadi.',
        },
        { type: 'paragraph', text: 'Langkah perlindungan dapat mencakup:' },
        {
          type: 'list',
          items: [
            'Pembatasan akses berdasarkan kebutuhan dan kewenangan.',
            'Pengamanan sistem dan mekanisme autentikasi.',
            'Pengendalian akses terhadap dokumen dan informasi pelanggan.',
            'Pengamanan komunikasi dan penyimpanan data.',
            'Pemantauan aktivitas sistem serta penanganan insiden.',
            'Penerapan kewajiban kerahasiaan kepada personel dan pihak terkait.',
            'Evaluasi dan pengembangan pengendalian keamanan.',
          ],
        },
        {
          type: 'paragraph',
          text: 'GAEKS berupaya mengurangi risiko akses tidak sah, kehilangan, perubahan, pengungkapan, atau penyalahgunaan data pribadi.',
        },
        {
          type: 'paragraph',
          text: 'Dalam hal terjadi kegagalan pelindungan data pribadi, GAEKS akan melakukan penanganan serta menyampaikan pemberitahuan tertulis kepada Subjek Data Pribadi dan lembaga yang berwenang paling lambat 3 × 24 jam sebagaimana diwajibkan oleh peraturan perundang-undangan.',
        },
      ],
    },
    {
      id: 'pasal-12',
      number: '12',
      title: 'Commercial and Non-Personal Logistics Data',
      blocks: [
        {
          type: 'paragraph',
          text: 'Kegiatan logistik melibatkan informasi operasional dan komersial yang tidak selalu merupakan data pribadi, seperti:',
        },
        {
          type: 'list',
          items: [
            'Nomor kontainer dan referensi pengiriman.',
            'Deskripsi komoditas dan HS Code.',
            'Jadwal kapal dan penerbangan.',
            'Rute dan volume pengiriman.',
            'Tarif dan kesepakatan komersial.',
            'Informasi perizinan dan dokumen perdagangan.',
          ],
        },
        {
          type: 'paragraph',
          text: 'GAEKS memahami bahwa informasi tersebut dapat bersifat rahasia dan memiliki nilai komersial bagi pelanggan.',
        },
        {
          type: 'paragraph',
          text: 'Informasi tersebut dikelola sesuai dengan kewajiban kerahasiaan, kebutuhan operasional, perjanjian yang berlaku, serta ketentuan hukum.',
        },
        {
          type: 'paragraph',
          text: 'Apabila informasi operasional tersebut dapat digunakan untuk mengidentifikasi individu, baik secara langsung maupun tidak langsung, informasi tersebut diperlakukan sebagai data pribadi sesuai dengan hukum yang berlaku.',
        },
      ],
    },
    {
      id: 'pasal-13',
      number: '13',
      title: 'Rights of Data Subjects',
      blocks: [
        {
          type: 'paragraph',
          text: 'Sesuai dengan peraturan perundang-undangan, Subjek Data Pribadi memiliki hak untuk:',
        },
        {
          type: 'list',
          items: [
            'Memperoleh informasi mengenai identitas pengendali, dasar hukum, tujuan, dan penggunaan data pribadinya.',
            'Mengakses dan memperoleh salinan data pribadi.',
            'Melengkapi, memperbarui, dan memperbaiki data pribadi yang tidak akurat.',
            'Mengakhiri pemrosesan serta meminta penghapusan atau pemusnahan data pribadi.',
            'Menarik kembali persetujuan pemrosesan.',
            'Menunda atau membatasi pemrosesan data pribadi.',
            'Mengajukan keberatan terhadap keputusan yang hanya didasarkan pada pemrosesan otomatis, termasuk profiling, yang menimbulkan akibat hukum atau dampak signifikan.',
            'Memperoleh dan memindahkan data pribadi sesuai persyaratan yang berlaku.',
            'Mengajukan gugatan dan memperoleh ganti rugi atas pelanggaran pemrosesan data pribadi sesuai hukum.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Permintaan pelaksanaan hak dapat disampaikan melalui saluran komunikasi resmi GAEKS.',
        },
        {
          type: 'paragraph',
          text: 'Untuk melindungi keamanan data, GAEKS dapat melakukan verifikasi identitas dan kewenangan pihak yang mengajukan permintaan.',
        },
        {
          type: 'paragraph',
          text: 'GAEKS akan menangani permintaan dalam jangka waktu dan sesuai persyaratan yang ditetapkan oleh hukum, termasuk pengecualian yang secara sah berlaku.',
        },
      ],
    },
    {
      id: 'pasal-14',
      number: '14',
      title: "Children's Personal Data",
      blocks: [
        {
          type: 'paragraph',
          text: 'Website dan layanan GAEKS pada dasarnya ditujukan untuk kebutuhan bisnis dan kegiatan logistik.',
        },
        {
          type: 'paragraph',
          text: 'GAEKS tidak secara khusus menargetkan pengumpulan data pribadi anak melalui Website.',
        },
        {
          type: 'paragraph',
          text: 'Apabila pemrosesan data pribadi anak diperlukan secara sah, pemrosesan tersebut dilaksanakan dengan memperoleh persetujuan orang tua atau wali serta memenuhi persyaratan perlindungan yang berlaku.',
        },
      ],
    },
    {
      id: 'pasal-15',
      number: '15',
      title: 'Third-Party Platforms and External Links',
      blocks: [
        {
          type: 'paragraph',
          text: 'Website dapat menyediakan tautan atau fasilitas komunikasi melalui platform pihak ketiga.',
        },
        {
          type: 'paragraph',
          text: 'Platform tersebut dapat memiliki kebijakan privasi dan ketentuan pemrosesan data tersendiri.',
        },
        {
          type: 'paragraph',
          text: 'Pengguna disarankan memahami kebijakan privasi pihak ketiga sebelum memberikan informasi melalui platform tersebut.',
        },
        {
          type: 'paragraph',
          text: 'GAEKS tetap memenuhi kewajibannya terhadap pemrosesan data oleh penyedia layanan yang bertindak untuk dan atas nama GAEKS.',
        },
      ],
    },
    {
      id: 'pasal-16',
      number: '16',
      title: 'Changes to These Privacy Terms',
      blocks: [
        {
          type: 'paragraph',
          text: 'GAEKS dapat memperbarui Privacy Terms ini untuk mencerminkan perubahan kegiatan bisnis, perkembangan teknologi, praktik pemrosesan data, atau ketentuan hukum.',
        },
        {
          type: 'paragraph',
          text: 'Versi terbaru akan tersedia melalui Website beserta tanggal berlakunya.',
        },
        {
          type: 'paragraph',
          text: 'Perubahan material yang memengaruhi pemrosesan data pribadi akan diinformasikan sesuai dengan ketentuan hukum, termasuk memperoleh persetujuan baru apabila diperlukan.',
        },
      ],
    },
    {
      id: 'pasal-17',
      number: '17',
      title: 'Privacy Inquiries and Contact Information',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pertanyaan mengenai Privacy Terms, pelaksanaan hak Subjek Data Pribadi, pengaduan privasi, maupun laporan dugaan penyalahgunaan data dapat disampaikan kepada:',
        },
        {
          type: 'contact',
          company: 'PT Global Andalan Ekspress',
          division: 'International Freight Forwarding & Logistics',
          email: 'info@gaeks.com',
          emailSubject: 'Privacy & Data Protection Inquiry',
          website: 'https://www.gaeks.com',
        },
      ],
    },
    {
      id: 'pasal-18',
      number: '18',
      title: 'Governing Law and Language',
      blocks: [
        {
          type: 'paragraph',
          text: 'Privacy Terms ini diatur berdasarkan hukum Republik Indonesia.',
        },
        {
          type: 'paragraph',
          text: 'Dokumen ini disusun dalam Bahasa Indonesia dan dapat tersedia dalam terjemahan bahasa Inggris untuk mendukung komunikasi internasional.',
        },
        {
          type: 'paragraph',
          text: 'Apabila terdapat perbedaan penafsiran, versi Bahasa Indonesia menjadi acuan sepanjang diperbolehkan oleh hukum.',
        },
      ],
    },
  ],
};
