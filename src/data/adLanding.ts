import { QuoteService } from '../utils/quoteFlow';

export const adLanding: Record<QuoteService, {
  title: string;
  eyebrow: string;
  intro: string;
  brief: string;
  details: Array<{ number: string; title: string; copy: string }>;
  checklist: string[];
  faqs: Array<{ question: string; answer: string }>;
}> = {
  fcl: {
    title: 'Freight Laut FCL', eyebrow: 'PENGIRIMAN PETI KEMAS PENUH',
    intro: 'Diskusikan rute impor atau ekspor peti kemas penuh, jenis kontainer, komoditas, dan kesiapan muat. Tim meninjau pilihan pengiriman berdasarkan detail Anda.',
    brief: 'Satu brief untuk membahas kebutuhan kontainer, rute, dan titik serah.',
    details: [
      { number: '01', title: 'Tentukan rute', copy: 'Sebutkan lokasi muat dan tujuan akhir. Pelabuhan asal serta tujuan membantu tim memeriksa opsi pengiriman.' },
      { number: '02', title: 'Jelaskan kargo', copy: 'Jenis barang, perkiraan berat, volume, dan jumlah kontainer membentuk kebutuhan penanganan.' },
      { number: '03', title: 'Pilih titik serah', copy: 'Jelaskan apakah kebutuhan Anda antarpelabuhan atau melibatkan penjemputan dan pengantaran.' },
    ],
    checklist: ['Asal dan tujuan', 'Jenis serta jumlah kontainer jika sudah diketahui', 'Komoditas, berat, dan perkiraan volume', 'Kesiapan muat atau tanggal yang diinginkan'],
    faqs: [
      { question: 'Apa itu pengiriman FCL?', answer: 'FCL adalah pengiriman dengan satu kontainer yang digunakan untuk satu pengirim atau satu consignor. Kebutuhan aktual tetap bergantung pada jenis kargo dan rute.' },
      { question: 'Apakah jenis kontainer harus sudah pasti?', answer: 'Belum. Sebutkan jenis barang, volume, dan berat. Tim dapat meninjau pilihan kontainer setelah data awal diterima.' },
      { question: 'Apakah kalkulator memberikan harga final?', answer: 'Tidak. Kalkulator membantu menyusun data kargo. Penawaran memerlukan peninjauan rute, komoditas, dan pilihan layanan.' },
    ],
  },
  air: {
    title: 'Air Freight', eyebrow: 'PENGIRIMAN KARGO UDARA',
    intro: 'Konsultasikan pengiriman kargo udara dengan asal, tujuan, berat, dimensi, dan komoditas. Pilihan layanan dan jadwal ditinjau setelah data awal diterima.',
    brief: 'Data berat dan dimensi yang jelas membantu peninjauan kargo udara.',
    details: [
      { number: '01', title: 'Sebutkan bandara', copy: 'Asal dan tujuan membantu memeriksa jalur pengiriman yang relevan untuk kebutuhan Anda.' },
      { number: '02', title: 'Ukur per koli', copy: 'Cantumkan jumlah koli, berat aktual, dan dimensi. Berat volumetrik dapat memengaruhi dasar perhitungan.' },
      { number: '03', title: 'Jelaskan komoditas', copy: 'Karakter barang dan dokumen terkait perlu ditinjau sebelum pilihan penanganan ditetapkan.' },
    ],
    checklist: ['Bandara atau kota asal dan tujuan', 'Jumlah koli, dimensi, dan berat', 'Jenis komoditas dan kemasan', 'Kesiapan kirim atau tanggal yang diinginkan'],
    faqs: [
      { question: 'Data apa yang dibutuhkan untuk meminta penawaran air freight?', answer: 'Siapkan asal, tujuan, komoditas, jumlah koli, berat aktual, dimensi, dan waktu kesiapan kirim.' },
      { question: 'Mengapa dimensi kargo udara perlu dicantumkan?', answer: 'Dimensi dapat digunakan untuk menghitung berat volumetrik. Tim membandingkannya dengan berat aktual saat meninjau kebutuhan pengiriman.' },
      { question: 'Apakah jadwal dapat dipastikan dari formulir?', answer: 'Belum. Jadwal dan pilihan layanan diperiksa setelah rincian rute serta komoditas diterima.' },
    ],
  },
  ppjk: {
    title: 'PPJK / Customs Clearance', eyebrow: 'PENGURUSAN KEPABEANAN',
    intro: 'Konsultasikan dokumen kepabeanan impor atau ekspor, klasifikasi HS, serta persyaratan yang mungkin berlaku untuk komoditas Anda. Kebutuhan PI atau Lartas diperiksa sesuai kasus.',
    brief: 'Mulai dari komoditas dan dokumen, lalu tentukan proses pabean yang relevan.',
    details: [
      { number: '01', title: 'Arah barang', copy: 'Impor dan ekspor memiliki alur serta dokumen berbeda. Pilih arah yang sesuai dengan shipment Anda.' },
      { number: '02', title: 'Periksa komoditas', copy: 'Uraian barang dan HS code, jika sudah ada, menjadi dasar untuk meninjau ketentuan yang berlaku.' },
      { number: '03', title: 'Bahas dokumen', copy: 'PIB, PEB, Lartas, atau PI dipilih sesuai kebutuhan. Tidak semua komoditas memerlukan izin yang sama.' },
    ],
    checklist: ['Impor atau ekspor', 'Kota dan lokasi proses', 'Uraian barang serta HS code jika tersedia', 'Invoice, packing list, dan dokumen yang sudah ada'],
    faqs: [
      { question: 'Apakah setiap impor membutuhkan Persetujuan Impor (PI)?', answer: 'Tidak. Kebutuhan PI bergantung pada komoditas dan aturan yang berlaku. Jelaskan barang Anda agar persyaratannya dapat diperiksa.' },
      { question: 'Apa beda PIB dan PEB?', answer: 'PIB adalah pemberitahuan pabean untuk impor, sedangkan PEB digunakan untuk ekspor. Dokumen yang diperlukan mengikuti transaksi dan jenis barang.' },
      { question: 'Apakah layanan tersedia di Jakarta, Semarang, dan Surabaya?', answer: 'Cantumkan kota dan lokasi proses pada formulir. Tim akan memeriksa cakupan operasional untuk kebutuhan tersebut sebelum memberikan penawaran.' },
    ],
  },
  undername: {
    title: 'Undername Impor & Persetujuan Impor', eyebrow: 'IMPORTASI DAN PERIZINAN',
    intro: 'GAEKS menyediakan jasa undername impor dan pendampingan pengurusan PI. Kelayakan skema dan kebutuhan izin diperiksa berdasarkan komoditas, HS code, serta dokumen.',
    brief: 'Jelaskan barang dan pihak importir sebelum menentukan langkah perizinan.',
    details: [
      { number: '01', title: 'Pahami skema impor', copy: 'Kebutuhan undername dibahas bersama peran importir dan dokumen transaksi.' },
      { number: '02', title: 'Periksa HS code', copy: 'Klasifikasi barang dan aturan terkini menentukan apakah PI perlu diajukan.' },
      { number: '03', title: 'Tinjau kesiapan', copy: 'Status layanan dan dokumen dikonfirmasi sebelum rencana kerja disepakati.' },
    ],
    checklist: ['HS code atau uraian barang', 'Invoice dan packing list jika ada', 'Negara asal dan tujuan impor', 'Kebutuhan undername, PI, atau keduanya'],
    faqs: [
      { question: 'Apakah undername impor sama dengan PI?', answer: 'Tidak. Undername menyangkut skema penggunaan entitas importir. PI adalah izin impor untuk barang tertentu bila diwajibkan oleh peraturan.' },
      { question: 'Apakah semua barang memerlukan PI?', answer: 'Tidak. Kewajiban PI bergantung pada klasifikasi barang, spesifikasi, serta ketentuan yang berlaku.' },
      { question: 'Apakah status Ready berarti izin pasti terbit?', answer: 'Tidak. Status Ready menunjukkan kesiapan layanan pada daftar yang dikelola GAEKS, bukan persetujuan dari otoritas.' },
    ],
  },
};
