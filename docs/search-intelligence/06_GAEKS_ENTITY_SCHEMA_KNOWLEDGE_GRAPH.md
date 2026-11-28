# 06. Entity Architecture, Schema & Knowledge Graph (`@graph`)

## Entitas Kanonik Utama
Semua template SSR PHP (`public/api/_search_intelligence.php`, `page.php`, `service.php`, `article.php`, `_phone_directory.php`), pre-rendered HTML (`scripts/generate-seo.mjs`), dan client metadata (`src/App.tsx`) memancarkan `@id` entitas yang seragam:

- **Organization (`https://gaeks.com/#organization`)**:
  - `name`: `GAEKS Freight`
  - `legalName`: `PT Global Andalan Ekspress`
  - `alternateName`: `GAEKS`
  - `slogan`: `Powered by People. Driven by Technology. Focused on You.`
  - `url`: `https://gaeks.com/`
  - `logo`: `https://gaeks.com/logos/gaek-symbol.png`
  - `address`: `Tanjung Priok, DKI Jakarta, ID`
  - `areaServed`: Indonesia, Jakarta, Semarang, Surabaya
  - `knowsAbout`: 10 topik layanan inti termasuk FCL, Air Freight, LCL, PPJK, Undername & PI, Kapal RORO & Breakbulk, Project Cargo, Trucking, dan Pergudangan.
  - `contactPoint`: 3 tim resmi dari `branding.contactGroups` (PPJK/FCL/Undername, Air Freight, dan General CS/Project Cargo).

- **LocalBusiness (`https://gaeks.com/#localbusiness` / `#local-business`)**:
  - Tipe ganda `['LocalBusiness', 'ProfessionalService']` terhubung melalui `parentOrganization: { '@id': 'https://gaeks.com/#organization' }`.

- **WebSite (`https://gaeks.com/#website`)**:
  - Menghubungkan situs dan `inLanguage: ['id-ID', 'en']` ke `publisher`.

## Tipe Halaman & Graf Relasi per Rute
- **Beranda (`/` & `/en/`)**: `WebPage` + `OfferCatalog` (daftar seluruh layanan terbit beserta `Service` `itemOffered`) + `FAQPage`.
- **Hub Layanan (`/layanan/` & `/en/layanan/`)**: `CollectionPage` + `ItemList` + `BreadcrumbList`.
- **Detail Layanan (`/layanan/<slug>/` & `/en/layanan/<slug>/`)**: `WebPage` (`about` -> `#service`) + `Service` (`provider` -> `#organization`, `areaServed`, `inLanguage`) + `BreadcrumbList` + `FAQPage` (bila FAQ tersedia).
- **Tentang Kami (`/tentang-kami/` & `/en/tentang-kami/`)**: `AboutPage` + `BreadcrumbList`.
- **Kontak & Direktori Telepon (`/kontak/`, `/kontak/telepon/`, `/en/kontak/`)**: `ContactPage` + `BreadcrumbList`.
- **Artikel (`/berita/<slug>/`)**: `WebPage` + `NewsArticle` (`publisher` -> `#organization`, `mainEntityOfPage`) + `BreadcrumbList`.
