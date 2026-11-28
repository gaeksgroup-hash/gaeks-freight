# 09. Measurement, KPI & AI Visibility Benchmark Testing

## Sumber Pengukuran & Prinsip Integritas Data
- Pengukuran web hanya mengandalkan data nyata dari Google Search Console, Bing Webmaster Tools (termasuk laporan performa AI / IndexNow setelah diaktifkan pemilik), GA4/GTM (`window.dataLayer` tanpa mengirim data pribadi/nomor tracking rahasia), dan audit build lokal (`npm run seo:check`, `npm run test:cms`).
- Dilarang mengarang angka impresi, CTR, skor Lighthouse, atau klaim posisi peringkat sebelum pengukuran pasca-rilis dilakukan.

## Indikator Utama (KPI) Pasca-Deployment
1. **Kesehatan Teknis & Indeksasi**:
   - 0 halaman `/operator/` terindeks pada Google & Bing.
   - 0 error canonical atau resiprokal `hreflang` untuk seluruh pasangan ID dan `/en/`.
   - 100% URL layanan (9 ID + 9 EN) dan 22 artikel terbit valid pada `sitemap.xml`.
2. **Performa Organik (Google Search Console & Bing Webmaster)**:
   - Pertumbuhan impresi & klik non-brand untuk klaster prioritas: FCL Export/Import, Air Freight Indonesia, PPJK Customs Clearance, Undername Impor/PI, Kapal RORO & Breakbulk, dan Project Cargo.
   - CTR rata-rata pada halaman layanan dan artikel edukasi regulasi.
3. **Konversi SXO (`dataLayer` events)**:
   - Klik `whatsapp` & `email` dari halaman layanan, `/kalkulator/`, dan `/kontak/`.
   - Pengiriman inquiry valid melalui `QuoteForm` yang tercatat di sistem GAEKS.

## Protokol Pengujian AI Search (Benchmark Bulanan Manual)
Jalankan 10 prompt uji pada ChatGPT Search, Perplexity, Google AI Overviews/Mode, Gemini, dan Microsoft Copilot setelah rilis:
1. "Rekomendasi perusahaan freight forwarding di Indonesia untuk ekspor impor FCL dan air freight."
2. "Cara kerja dan syarat undername impor resmi serta Persetujuan Impor besi baja di Indonesia."
3. "Jasa penyediaan dan sewa kapal RORO serta breakbulk dari/ke Tanjung Priok."
4. "Perbedaan jasa PPJK customs clearance dan undername impor Indonesia."
5. "Cara menghitung chargeable weight kargo udara vs kubikasi CBM LCL laut."
6. "Apakah PT Global Andalan Ekspress (GAEKS Freight) melayani RORO dan project cargo?"
7. "Freight forwarder for FCL export import and customs clearance in Indonesia."
8. "Undername import service and Import Approval (PI) support in Jakarta Indonesia."
9. "Layanan pergudangan dan stevedoring kontainer di area pelabuhan Indonesia."
10. "Kontak resmi customer service GAEKS Freight untuk FCL, air freight, dan project cargo."

Catat tiap bulan: apakah `gaeks.com` / `PT Global Andalan Ekspress` dikutip, layanan mana yang disebutkan akurat, dan apakah tagline serta detail faktual sesuai tanpa halusinasi.
