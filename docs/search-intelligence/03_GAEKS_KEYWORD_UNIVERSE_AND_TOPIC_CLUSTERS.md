# 03. GAEKS Keyword Universe & Topic Clusters

## Prinsip Pemetaan Kata Kunci & Intent
- Satu layanan memiliki satu **primary intent** dan target halaman kanonik yang berbeda untuk mencegah keyword cannibalization.
- Istilah komersial (*terbaik*, *terpercaya*, *profesional*, *efisien*, *berpengalaman*) digunakan secara natural sebagai konteks evaluasi kualitas B2B, bukan keyword stuffing.
- Kata kunci hanya dijadikan rujukan editorial dan perencanaan (bukan `<meta name="keywords">` di HTML publik).

## Klaster Topik Utama (Fokus Keunggulan)

| Layanan / Klaster | Primary Target (ID) | Primary Target (EN) | Intent Dominan | Rute Kanonik |
|---|---|---|---|---|
| **FCL Ocean Freight** | jasa pengiriman fcl ekspor impor indonesia | fcl ocean freight export import indonesia | Transaksional / Komersial | `/layanan/freight-laut-fcl/` & `/en/layanan/freight-laut-fcl/` |
| **Air Freight** | jasa pengiriman kargo udara ekspor impor | air freight export import indonesia | Transaksional / Komersial | `/layanan/freight-udara/` & `/en/layanan/freight-udara/` |

## Klaster Kompetensi & Ekspansi Komersial

| Layanan / Klaster | Primary Target (ID) | Primary Target (EN) | Intent Dominan | Diferensiasi Anti-Kanibalisasi | Rute Kanonik |
|---|---|---|---|---|---|
| **LCL Ocean Freight** | jasa pengiriman lcl konsolidasi laut | lcl consolidation ocean freight indonesia | Komersial | Fokus muatan di bawah kapasitas kontainer penuh (hitungan CBM) | `/layanan/freight-laut-lcl/` |
| **PPJK & Customs Clearance** | jasa ppjk dan customs clearance resmi | ppjk customs clearance brokerage indonesia | Transaksional / Regulasi | Fokus kepabeanan PIB, PEB, CEISA 4.0, HS Code, jalur merah/hijau | `/layanan/ppjk-customs-clearance/` |
| **Undername Impor & PI** | jasa undername impor resmi dan pi besi baja | undername import service and pi indonesia | Komersial / Kepatuhan | Fokus fasilitas importir terdaftar & Persetujuan Impor (PI Kemendag/Lartas) | `/layanan/undername-impor-pi/` |
| **Penyediaan Kapal RORO & Breakbulk** | penyediaan dan sewa kapal roro breakbulk | roro and breakbulk vessel charter indonesia | Transaksional / Spesifik Moda | Fokus pengapalan armada RORO beroda & kargo breakbulk tanpa kontainer | `/layanan/roro-breakbulk/` |
| **Project Cargo & Heavy Lift** | jasa project cargo dan heavy lift indonesia | project cargo and heavy lift logistics indonesia | Komersial / Engineering | Fokus rekayasa pengiriman alat berat, over-dimension, route survey, crane | `/layanan/project-cargo-heavy-lift/` |
| **Domestic Trucking** | jasa trucking kontainer dan kargo indonesia | domestic container and cargo trucking indonesia | Transaksional | Fokus angkutan darat port-to-door / door-to-port domestik | `/layanan/trucking/` |
| **Pergudangan & Bongkar Muat** | jasa pergudangan dan bongkar muat pelabuhan | warehousing and stevedoring indonesia | Komersial | Fokus penyimpanan, stuffing/stripping, stevedoring | `/layanan/pergudangan-stevedoring/` |

## Klaster Alat Bantu & Edukasi (Top-of-Funnel -> Konversi)
- **Kalkulator CBM & Chargeable Weight (`/kalkulator/`)**: Menangkap kueri *cara hitung cbm kontainer*, *rumus berat volumetrik air freight*, *chargeable weight udara*.
- **Tracking (`/tracking/`)**: Menangkap kueri brand + dokumen *cek resi hawb gaeks*, *lacak bill of lading gaeks*.
- **Rute & Jadwal (`/rute-pengiriman/`)**: Menangkap pencarian koridor pelabuhan & bandara (Asia, Eropa, Amerika -> Jakarta Tanjung Priok, Semarang Tanjung Emas, Surabaya Tanjung Perak).
- **Wawasan & Berita (`/berita/` + `/berita/<slug>/`)**: 22 artikel teknis terarah untuk menjawab pertanyaan regulasi CEISA 4.0, PI besi baja, LCL vs FCL, reefer, DG IATA, demmurage/detention, dan efisiensi rantai pasok tanpa duplikasi.
