<?php
declare(strict_types=1);

require_once __DIR__ . '/api/_bootstrap.php';

$pages = [
    'freight-laut-fcl' => [
        'id' => 'fcl',
        'title' => 'Freight Laut FCL',
        'intro' => 'Diskusikan rute impor atau ekspor peti kemas penuh, jenis kontainer, komoditas, dan kesiapan muat. Tim meninjau pilihan pengiriman berdasarkan detail Anda.',
        'details' => ['Tentukan rute asal dan tujuan', 'Jelaskan komoditas, berat, dan volume', 'Pilih titik serah yang dibutuhkan'],
        'faqs' => [
            ['Apa itu pengiriman FCL?', 'FCL adalah pengiriman dengan satu kontainer yang digunakan untuk satu pengirim atau satu consignor. Kebutuhan aktual tetap bergantung pada jenis kargo dan rute.'],
            ['Apakah jenis kontainer harus sudah pasti?', 'Belum. Sebutkan jenis barang, volume, dan berat. Tim dapat meninjau pilihan kontainer setelah data awal diterima.'],
            ['Apakah kalkulator memberikan harga final?', 'Tidak. Kalkulator membantu menyusun data kargo. Penawaran memerlukan peninjauan rute, komoditas, dan pilihan layanan.'],
        ],
    ],
    'freight-udara' => [
        'id' => 'air-shipment',
        'title' => 'Air Freight',
        'intro' => 'Konsultasikan pengiriman kargo udara dengan asal, tujuan, berat, dimensi, dan komoditas. Pilihan layanan dan jadwal ditinjau setelah data awal diterima.',
        'details' => ['Sebutkan bandara atau kota asal dan tujuan', 'Ukur berat serta dimensi per koli', 'Jelaskan komoditas dan kemasan'],
        'faqs' => [
            ['Data apa yang dibutuhkan untuk meminta penawaran air freight?', 'Siapkan asal, tujuan, komoditas, jumlah koli, berat aktual, dimensi, dan waktu kesiapan kirim.'],
            ['Mengapa dimensi kargo udara perlu dicantumkan?', 'Dimensi dapat digunakan untuk menghitung berat volumetrik. Tim membandingkannya dengan berat aktual saat meninjau kebutuhan pengiriman.'],
            ['Apakah jadwal dapat dipastikan dari formulir?', 'Belum. Jadwal dan pilihan layanan diperiksa setelah rincian rute serta komoditas diterima.'],
        ],
    ],
    'ppjk-customs-clearance' => [
        'id' => 'ppjk',
        'title' => 'PPJK / Customs Clearance',
        'intro' => 'Konsultasikan dokumen kepabeanan impor atau ekspor, klasifikasi HS, serta persyaratan yang mungkin berlaku untuk komoditas Anda. Kebutuhan PI atau Lartas diperiksa sesuai kasus.',
        'details' => ['Pilih arah impor atau ekspor', 'Jelaskan komoditas serta HS code jika tersedia', 'Bahas dokumen dan izin yang relevan'],
        'faqs' => [
            ['Apakah setiap impor membutuhkan Persetujuan Impor (PI)?', 'Tidak. Kebutuhan PI bergantung pada komoditas dan aturan yang berlaku. Jelaskan barang Anda agar persyaratannya dapat diperiksa.'],
            ['Apa beda PIB dan PEB?', 'PIB adalah pemberitahuan pabean untuk impor, sedangkan PEB digunakan untuk ekspor. Dokumen yang diperlukan mengikuti transaksi dan jenis barang.'],
            ['Apakah layanan tersedia di Jakarta, Semarang, dan Surabaya?', 'Cantumkan kota dan lokasi proses pada formulir. Tim akan memeriksa cakupan operasional untuk kebutuhan tersebut sebelum memberikan penawaran.'],
        ],
    ],
    'undername-impor-pi' => [
        'id' => 'undername-impor',
        'title' => 'Undername Impor & Persetujuan Impor',
        'intro' => 'GAEKS menyediakan jasa undername impor dan pendampingan pengurusan PI. Kelayakan skema dan kebutuhan izin diperiksa berdasarkan komoditas, HS code, serta dokumen.',
        'details' => ['Jelaskan kebutuhan undername dan pihak importir', 'Sebutkan komoditas serta HS code jika ada', 'Tinjau kebutuhan PI dan dokumen pendukung'],
        'faqs' => [
            ['Apakah undername impor sama dengan PI?', 'Tidak. Undername menyangkut skema penggunaan entitas importir. PI adalah izin impor untuk barang tertentu bila diwajibkan oleh peraturan.'],
            ['Apakah semua barang memerlukan PI?', 'Tidak. Kewajiban PI bergantung pada klasifikasi barang, spesifikasi, serta ketentuan yang berlaku.'],
            ['Apakah status Ready berarti izin pasti terbit?', 'Tidak. Status Ready menunjukkan kesiapan layanan pada daftar yang dikelola GAEKS, bukan persetujuan dari otoritas.'],
        ],
    ],
];

$path = parse_url((string) ($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH);
$slug = trim(str_replace('/layanan/', '', (string) $path), '/');
if (!isset($pages[$slug])) {
    http_response_code(404);
    exit;
}

$data = gaeks_read_json_file(gaeks_content_file(), gaeks_read_json_file(__DIR__ . '/api/site_content.json', []));
$page = $pages[$slug];
$managed = [];
foreach (($data['services'] ?? []) as $candidate) {
    if (is_array($candidate) && ($candidate['id'] ?? '') === $page['id']) {
        $managed = $candidate;
        break;
    }
}
$plain = static function ($value): string {
    return trim(strip_tags(is_string($value) ? $value : ''));
};
$escape = static function (string $value): string {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};
$title = $plain($managed['landingTitle'] ?? '') ?: $page['title'];
$intro = $plain($managed['landingDescription'] ?? '') ?: $page['intro'];
$siteTitle = $plain($data['seo']['siteTitle'] ?? '') ?: 'GAEKS | Freight Forwarding & Customs Clearance Indonesia';
$fullTitle = $title . ' | ' . $siteTitle;
$canonical = 'https://gaeks.com/layanan/' . $slug . '/';
$html = (string) file_get_contents(__DIR__ . '/index.html');
if ($html === '') {
    http_response_code(503);
    exit;
}
// The SEO build writes the home page into index.html. Remove its canonical,
// structured data, and fallback body before rendering this service URL.
$html = preg_replace('~\s*<link rel="canonical"[^>]*>~', '', $html) ?? $html;
$html = preg_replace('~\s*<script type="application/ld\+json">.*?</script>~s', '', $html) ?? $html;
$replace = static function (string $pattern, string $value) use (&$html): void {
    $updated = preg_replace_callback($pattern, static fn () => $value, $html, 1);
    if (is_string($updated)) {
        $html = $updated;
    }
};
$replace('~<title>.*?</title>~s', '<title>' . $escape($fullTitle) . '</title>');
$replace('~<meta name="title"[^>]*>~', '<meta name="title" content="' . $escape($fullTitle) . '" />');
$replace('~<meta name="description"[^>]*>~', '<meta name="description" content="' . $escape($intro) . '" />');
$replace('~<meta property="og:title"[^>]*>~', '<meta property="og:title" content="' . $escape($fullTitle) . '" />');
$replace('~<meta property="og:description"[^>]*>~', '<meta property="og:description" content="' . $escape($intro) . '" />');
$replace('~<meta property="og:url"[^>]*>~', '<meta property="og:url" content="' . $escape($canonical) . '" />');
$ogImage = $plain($data['seo']['ogImageUrl'] ?? '');
if ($ogImage !== '') {
    if (strpos($ogImage, '/') === 0) {
        $ogImage = 'https://gaeks.com' . $ogImage;
    }
    $replace('~<meta property="og:image"[^>]*>~', '<meta property="og:image" content="' . $escape($ogImage) . '" />');
}
$robots = ($data['seo']['robotsIndex'] ?? true) ? 'index, follow' : 'noindex, nofollow';
$replace('~<meta name="robots"[^>]*>~', '<meta name="robots" content="' . $robots . '" />');
$faqEntities = [];
foreach ($page['faqs'] as [$question, $answer]) {
    $faqEntities[] = ['@type' => 'Question', 'name' => $question, 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $answer]];
}
$schema = [
    '@context' => 'https://schema.org',
    '@graph' => [
        ['@type' => 'Organization', '@id' => 'https://gaeks.com/#organization', 'name' => 'GAEKS', 'url' => 'https://gaeks.com/'],
        ['@type' => 'Service', '@id' => $canonical . '#service', 'name' => $title, 'serviceType' => $page['title'], 'description' => $intro, 'provider' => ['@id' => 'https://gaeks.com/#organization'], 'url' => $canonical],
        ['@type' => 'BreadcrumbList', 'itemListElement' => [
            ['@type' => 'ListItem', 'position' => 1, 'name' => 'Beranda', 'item' => 'https://gaeks.com/'],
            ['@type' => 'ListItem', 'position' => 2, 'name' => 'Layanan', 'item' => 'https://gaeks.com/#services'],
            ['@type' => 'ListItem', 'position' => 3, 'name' => $title, 'item' => $canonical],
        ]],
        ['@type' => 'FAQPage', 'mainEntity' => $faqEntities],
    ],
];
$structuredData = json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
$html = str_replace('</head>', '    <link rel="canonical" href="' . $escape($canonical) . '" />' . "\n"
    . '    <script id="gaeks-ad-schema" type="application/ld+json">' . $structuredData . '</script>' . "\n  </head>", $html);

$list = '';
foreach ($page['details'] as $detail) {
    $list .= '<li>' . $escape($detail) . '</li>';
}
$faqHtml = '';
foreach ($page['faqs'] as [$question, $answer]) {
    $faqHtml .= '<h3>' . $escape($question) . '</h3><p>' . $escape($answer) . '</p>';
}
$presentation = [
    'freight-laut-fcl' => ['PENGIRIMAN PETI KEMAS PENUH', 'Satu brief untuk membahas kebutuhan kontainer, rute, dan titik serah.'],
    'freight-udara' => ['PENGIRIMAN KARGO UDARA', 'Data berat dan dimensi yang jelas membantu peninjauan kargo udara.'],
    'ppjk-customs-clearance' => ['PENGURUSAN KEPABEANAN', 'Mulai dari komoditas dan dokumen, lalu tentukan proses pabean yang relevan.'],
    'undername-impor-pi' => ['IMPORTASI DAN PERIZINAN', 'Jelaskan barang dan pihak importir sebelum menentukan langkah perizinan.'],
];
[$eyebrow, $brief] = $presentation[$slug];
$heroImage = $plain($managed['imageUrl'] ?? '') ?: '/uploads/gaeks-hero-cargo-poster.webp';
$contactService = ['freight-laut-fcl' => 'fcl', 'freight-udara' => 'air', 'ppjk-customs-clearance' => 'ppjk', 'undername-impor-pi' => 'undername'][$slug];
$content = '<main class="min-h-screen bg-[#f3f4ef] pt-16 text-[#12363a]">'
    . '<section class="relative isolate overflow-hidden bg-[#062b30] text-white"><div class="absolute inset-0 -z-10 overflow-hidden">'
    . '<img src="' . $escape($heroImage) . '" alt="" class="h-full w-full object-cover opacity-30">'
    . '<div class="absolute inset-0 bg-gradient-to-r from-[#062b30] via-[#062b30]/90 to-[#062b30]/55"></div></div>'
    . '<div class="page-shell relative py-9 pb-16 sm:py-14 lg:py-20"><a href="/layanan/" class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-200">← Semua layanan</a>'
    . '<div class="mt-8 grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.55fr)] lg:gap-16"><div>'
    . '<p class="inline-flex border-l-2 border-cyan-300 pl-3 text-xs font-bold uppercase tracking-[.24em] text-cyan-200">' . $escape($eyebrow) . '</p>'
    . '<h1 class="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-[-.055em] sm:text-6xl lg:text-7xl">' . $escape($title) . '</h1>'
    . '<p class="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">' . $escape($intro) . '</p>'
    . '<a href="/kontak/?service=' . $contactService . '" class="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-6 text-sm font-bold text-[#062b30]">Minta penawaran via WhatsApp →</a></div>'
    . '<aside class="border-t border-white/40 bg-[#0a383d]/80 p-6 backdrop-blur-sm sm:p-7 lg:border-l lg:border-t-0"><p class="text-xs font-bold uppercase tracking-[.2em] text-cyan-200">Sebelum meminta penawaran</p>'
    . '<p class="mt-4 text-xl font-semibold leading-7">' . $escape($brief) . '</p></aside></div></div></section>'
    . '<section class="page-shell py-14 sm:py-20"><h2 class="text-3xl font-bold">Ruang lingkup pembicaraan</h2><ul class="mt-7 border-t border-slate-300">' . $list . '</ul></section>'
    . '<section class="page-shell pb-20"><h2 class="text-3xl font-bold">Pertanyaan umum</h2>' . $faqHtml . '</section></main>';
$html = preg_replace_callback('~<div id="root">.*?</div>~s', static fn () => '<div id="root">' . $content . '</div>', $html, 1) ?? $html;

header('Content-Type: text/html; charset=UTF-8');
header('Cache-Control: no-cache, must-revalidate');
echo $html;
