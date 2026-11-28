<?php
declare(strict_types=1);
require_once __DIR__ . '/_bootstrap.php';
require_once __DIR__ . '/_search_intelligence.php';

$content = gaeks_public_content(gaeks_read_json_file(gaeks_content_file(), []));
$e = fn($v) => htmlspecialchars((string) $v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$rawPath = rtrim((string) parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/') . '/';
if ($rawPath === '//') $rawPath = '/';
$isEn = $rawPath === '/en/' || str_starts_with($rawPath, '/en/');
$langCode = $isEn ? 'en' : 'id';
$logicalPath = $isEn ? ($rawPath === '/en/' ? '/' : substr($rawPath, 3)) : $rawPath;
$path = $rawPath;
$base = gaeks_base_url();
$url = $base . $path;

$siRoutes = gaeks_si_routes();
$siRoute = $siRoutes[$logicalPath] ?? null;
$enAvailable = !empty($siRoute['enAvailable']);
$idCanonical = $base . $logicalPath;
$enCanonical = $enAvailable ? ($base . ($logicalPath === '/' ? '/en/' : '/en' . $logicalPath)) : null;
$alternateLinks = gaeks_si_alternate_links($idCanonical, $enCanonical);

$copy = array_replace(gaeks_read_json_file(__DIR__ . '/ui_copy_seed.json', []), $content['siteSettings']['uiCopy'] ?? []);
$siLang = ($isEn && !empty($siRoute['en'])) ? $siRoute['en'] : ($siRoute['id'] ?? []);

$title = (string) ($siLang['title'] ?? ($content['seo']['siteTitle'] ?? 'GAEKS Freight'));
$description = (string) ($siLang['description'] ?? ($content['seo']['metaDescription'] ?? ''));
if (!$isEn) {
    if ($logicalPath === '/' && !empty($content['seo']['siteTitle'])) $title = (string) $content['seo']['siteTitle'];
    if ($logicalPath === '/' && !empty($content['seo']['metaDescription'])) $description = (string) $content['seo']['metaDescription'];
    if ($logicalPath === '/layanan/' && !empty($copy['servicesMetaTitle'])) {
        $title = (string) $copy['servicesMetaTitle'];
        $description = (string) ($copy['servicesMetaDescription'] ?? $description);
    }
    if ($logicalPath === '/kontak/' && !empty($copy['contactMetaTitle'])) {
        $title = (string) $copy['contactMetaTitle'];
        $description = (string) ($copy['contactMetaDescription'] ?? $description);
    }
}

if ($logicalPath === '/kontak/telepon/') {
    $title = (string) ($copy['phoneMetaTitle'] ?? $title);
    $description = (string) ($copy['phoneMetaDescription'] ?? $description);
    require __DIR__ . '/_phone_directory.php';
    require __DIR__ . '/_page_template.php';
    return;
}

$orgSchema = gaeks_si_organization_schema();
$groups = $content['branding']['contactGroups'] ?? [];
$priority = ['ppjk', 'fcl', 'undername', 'air', 'general'];
$rank = static function (string $id) use ($priority): int {
    $n = array_search($id, $priority, true);
    return $n === false ? count($priority) : $n;
};
usort($groups, static fn($a, $b) => $rank((string) ($a['id'] ?? '')) <=> $rank((string) ($b['id'] ?? '')));
$teams = [];
foreach ($groups as $g) {
    $n = preg_replace('/\D/', '', (string) ($g['whatsappNumber'] ?? ''));
    if (str_starts_with($n, '0')) $n = '62' . substr($n, 1);
    if ($n !== '') $teams[$n][] = $g;
}
$socialLinks = array_values(array_filter(array_map(static fn($s) => (string) ($s['url'] ?? ''), $content['siteSettings']['socialLinks'] ?? [])));
if ($socialLinks) $orgSchema['sameAs'] = $socialLinks;
$logoUrl = gaeks_resolve_public_url((string) ($content['branding']['symbolLogoUrl'] ?? '/logos/gaek-symbol.png'));
if ($logoUrl !== '') $orgSchema['logo'] = $logoUrl;
$contactPoints = gaeks_si_contact_points($content);
if ($contactPoints) $orgSchema['contactPoint'] = $contactPoints;
$localBusiness = gaeks_si_local_business_schema();
$websiteSchema = gaeks_si_website_schema();

$srStyle = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';

if ($logicalPath === '/layanan/') {
    $eyebrow = $isEn ? 'GAEKS Freight Services' : ($copy['servicesEyebrow'] ?? 'Layanan GAEKS Freight');
    $headingText = $isEn ? (string) ($siLang['heading'] ?? 'Choose the right cargo handling for your shipment.') : (string) ($copy['servicesHeading'] ?? ($siLang['heading'] ?? ''));
    $introText = $isEn ? (string) ($siLang['body'] ?? '') : (string) ($copy['servicesIntro'] ?? ($siLang['body'] ?? ''));
    $listLabel = $isEn ? 'GAEKS Freight Services Index' : ($copy['servicesListLabel'] ?? 'Daftar layanan GAEKS');
    $body = '<main style="min-height:100vh;background:#f4f5f1;color:#12363a"><section style="background:#082f34;color:#fff;padding:7.5rem 1.5rem 4rem"><div style="max-width:72rem;margin:0 auto"><p style="font-size:.75rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#a3edf2;margin:0 0 1rem">' . $e($eyebrow) . '</p><h1 style="font-size:clamp(2rem,4vw,3.5rem);line-height:1.06;margin:0 0 1rem;max-width:18ch">' . $e($headingText) . '</h1><p style="max-width:52ch;line-height:1.65;color:#dbeaea;margin:0">' . $e($introText) . '</p></div></section><nav style="' . $srStyle . '" aria-label="' . $e($listLabel) . '"><ol>';
    $items = [];
    $position = 0;
    foreach ($content['services'] as $s) {
        $svcPath = ($isEn ? '/en' : '') . '/layanan/' . gaeks_service_slug((string) $s['id']) . '/';
        $serviceUrl = $base . $svcPath;
        $summary = $isEn ? ((string) ($s['summary_en'] ?? '') ?: (string) ($s['summary'] ?? $s['description'] ?? '')) : (string) ($s['summary'] ?? $s['description'] ?? '');
        $body .= '<li><article><h2><a href="' . $e($serviceUrl) . '">' . $e($s['title']) . '</a></h2><p>' . $e($summary) . '</p></article></li>';
        $items[] = ['@type' => 'ListItem', 'position' => ++$position, 'url' => $serviceUrl, 'name' => $s['title']];
    }
    $body .= '</ol></nav>';
    if (!$items) {
        $body .= '<p style="max-width:72rem;margin:2rem auto;padding:0 1.5rem">' . $e($copy['servicesEmpty'] ?? '') . ' <a href="' . ($isEn ? '/en/kontak/' : '/kontak/') . '">' . $e($copy['servicesEmptyCta'] ?? 'Hubungi kami') . '</a></p>';
    }
    $body .= '</main>';
    $graph = [
        $orgSchema,
        $localBusiness,
        $websiteSchema,
        ['@type' => 'CollectionPage', '@id' => $url . '#webpage', 'name' => $title, 'description' => $description, 'url' => $url, 'inLanguage' => $isEn ? 'en' : 'id-ID', 'isPartOf' => ['@id' => $base . '/#website']],
        ['@type' => 'ItemList', 'name' => $listLabel, 'itemListElement' => $items],
        gaeks_si_breadcrumb_schema([
            ['name' => $isEn ? 'Home' : 'Beranda', 'item' => $base . ($isEn ? '/en/' : '/')],
            ['name' => $isEn ? 'Services' : 'Layanan', 'item' => $url],
        ]),
    ];
    require __DIR__ . '/_page_template.php';
    return;
}

$isContactPage = $logicalPath === '/kontak/';
$heroBg = $isContactPage ? '#f4f5f1' : '#062d32';
$heroColor = $isContactPage ? '#12363a' : '#fff';
$subColor = $isContactPage ? '#4b6265' : '#dbeaea';

if ($logicalPath === '/') {
    $rawVisibleTitle = ($content['hero']['titlePrefix'] ?? '') . ($content['hero']['titleHighlight'] ?? '') . ($content['hero']['titleSuffix'] ?? '');
    $rawVisibleCopy = $content['hero']['caption'] ?? $description;
    $visibleTitle = $isEn
        ? (string) ($siLang['heading'] ?? 'Powered by People. Driven by Technology. Focused on You.')
        : ((trim($rawVisibleTitle) === '' || trim($rawVisibleTitle) === 'Kargo bergerak dengan rencana yang jelas.') ? 'Diperkuat oleh Manusia. Digerakkan oleh Teknologi. Berfokus pada Anda.' : $rawVisibleTitle);
    $visibleCopy = $isEn
        ? (string) ($siLang['body'] ?? $description)
        : ((trim((string) $rawVisibleCopy) === '' || trim((string) $rawVisibleCopy) === 'GAEKS mengatur freight laut dan udara, kepabeanan, serta pengiriman darat melalui satu tim operasional.') ? 'Kami memadukan keahlian, teknologi, dan tindakan nyata untuk menghadirkan solusi logistik yang lebih cepat, efisien, dan transparan.' : $rawVisibleCopy);
} elseif ($isContactPage) {
    $visibleTitle = $isEn
        ? (string) ($siLang['heading'] ?? 'Connect with the right freight team.')
        : ((string) ($siLang['heading'] ?? ($copy['contactHeading'] ?? 'Pilih tim sesuai kebutuhan pengiriman Anda.')));
    $visibleCopy = (string) ($siLang['body'] ?? $description);
} else {
    $visibleTitle = (string) ($siLang['heading'] ?? $title);
    $visibleCopy = (string) ($siLang['body'] ?? $description);
}

$body = '<main style="min-height:100vh;background:' . $heroBg . ';color:' . $heroColor . '"><section style="position:relative;min-height:664px;display:flex;align-items:center;padding:6.5rem 1.5rem 4rem"><div style="max-width:72rem;width:100%;margin:0 auto"><h1 style="font-size:clamp(2rem,4.5vw,3.75rem);line-height:1.04;letter-spacing:-.04em;margin:0 0 1.25rem;max-width:18ch">' . $e($visibleTitle) . '</h1><p style="max-width:52ch;font-size:1.05rem;line-height:1.65;color:' . $subColor . ';margin:0">' . $e($visibleCopy) . '</p></div></section><div style="' . $srStyle . '"><nav>';
foreach ($content['services'] as $s) {
    $svcPath = ($isEn ? '/en' : '') . '/layanan/' . gaeks_service_slug((string) $s['id']) . '/';
    $sum = $isEn ? ((string) ($s['summary_en'] ?? '') ?: (string) ($s['summary'] ?? $s['description'] ?? '')) : (string) ($s['summary'] ?? $s['description'] ?? '');
    $body .= '<article><h2><a href="' . $e($svcPath) . '">' . $e($s['title']) . '</a></h2><p>' . $e($sum) . '</p></article>';
}
$body .= '</nav><section>';
foreach ($teams as $number => $members) {
    $first = $members[0];
    $memberIds = array_column($members, 'id');
    $teamTitle = implode(' · ', array_column($members, 'name'));
    if (count($members) === 1 && $first['id'] === 'general') $teamTitle = $copy['phoneGeneralTeam'] ?? $teamTitle;
    elseif (count($members) > 1 && !array_diff($memberIds, ['fcl', 'ppjk', 'undername'])) $teamTitle = $copy['phoneTradeTeam'] ?? $teamTitle;
    $waText = ($copy['phoneMessage'] ?? 'Halo tim GAEKS') . ' ' . $teamTitle . '.';
    $body .= '<article><h2>' . $e($teamTitle) . '</h2><a href="https://wa.me/' . $e($number) . '?text=' . rawurlencode($waText) . '">' . $e($first['whatsappDisplay']) . '</a><p><a href="mailto:' . $e($first['email']) . '?subject=' . rawurlencode('Konsultasi ' . $teamTitle) . '&body=' . rawurlencode($waText) . '">' . $e($first['email']) . '</a></p></article>';
}
$body .= '</section></div></main>';

$pageSchemaType = (string) ($siRoute['schemaType'] ?? 'WebPage');
$graph = [
    $orgSchema,
    $localBusiness,
    $websiteSchema,
    ['@type' => $pageSchemaType, '@id' => $url . '#webpage', 'url' => $url, 'name' => $title, 'description' => $description, 'inLanguage' => $isEn ? 'en' : 'id-ID', 'isPartOf' => ['@id' => $base . '/#website']],
];
if ($logicalPath !== '/') {
    $graph[] = gaeks_si_breadcrumb_schema([
        ['name' => $isEn ? 'Home' : 'Beranda', 'item' => $base . ($isEn ? '/en/' : '/')],
        ['name' => $visibleTitle, 'item' => $url],
    ]);
} else {
    $offers = [];
    $pos = 0;
    foreach ($content['services'] as $srv) {
        $offers[] = [
            '@type' => 'Offer',
            'position' => ++$pos,
            'itemOffered' => [
                '@type' => 'Service',
                'name' => $srv['title'],
                'serviceType' => $srv['category'] ?? 'Logistics',
                'url' => $base . ($isEn ? '/en' : '') . '/layanan/' . gaeks_service_slug((string) $srv['id']) . '/',
            ],
        ];
    }
    $graph[] = ['@type' => 'OfferCatalog', 'name' => $isEn ? 'GAEKS Freight Services Catalog' : 'Katalog Layanan Freight Forwarding & Kepabeanan GAEKS Freight', 'itemListElement' => $offers];
    $homeFaq = $isEn ? [
        ['What services does GAEKS Freight handle?', 'PT Global Andalan Ekspress (GAEKS Freight) focuses on FCL ocean freight export/import and air freight, supported by PPJK customs clearance (PIB/PEB), LCL consolidation, undername import and Import Approval (PI), RORO & breakbulk vessel sourcing, project cargo, domestic trucking, and warehousing.'],
        ['What is the difference between FCL and LCL ocean freight at GAEKS?', 'FCL (Full Container Load) assigns a dedicated 20ft, 40ft, or 40ft HC container to one shipper, while LCL (Less than Container Load) consolidates smaller shipments charged per CBM or weight ton.'],
        ['What initial documents are required for Indonesia customs clearance (PPJK)?', 'Typical baseline documents include Commercial Invoice, Packing List, Bill of Lading or Air Waybill, accurate commodity description/HS Code, and commodity permits such as Persetujuan Impor (PI) or Lartas approvals where applicable.'],
        ['Can GAEKS Freight assist with RORO, breakbulk vessels, and project cargo?', 'Yes. GAEKS assists with RORO vessel sourcing for rolling vehicles/heavy machinery, breakbulk shipping for out-of-gauge steel or industrial cargo, and heavy-lift project logistics coordination.'],
    ] : [
        ['Layanan apa saja yang ditangani GAEKS Freight?', 'PT Global Andalan Ekspress (GAEKS Freight) berfokus pada pengiriman laut FCL ekspor/impor dan kargo udara (Air Freight), didukung jasa kepabeanan PPJK & customs clearance (PIB/PEB), konsolidasi LCL, undername impor dan Persetujuan Impor (PI), penyediaan kapal RORO dan breakbulk, project cargo, trucking domestik, serta pergudangan.'],
        ['Apa perbedaan pengiriman FCL dan LCL di GAEKS?', 'FCL (Full Container Load) menggunakan satu kontainer penuh 20ft/40ft/40ft HC secara eksklusif untuk satu pengirim, sedangkan LCL (Less than Container Load) menggabungkan muatan bervolume lebih kecil dalam satu kontainer konsolidasi dengan perhitungan CBM.'],
        ['Dokumen apa saja yang diperlukan untuk jasa PPJK dan customs clearance?', 'Dokumen awal meliputi Commercial Invoice, Packing List, dokumen pengangkutan (Bill of Lading atau Air Waybill), uraian barang/HS Code, serta izin komoditas seperti Persetujuan Impor (PI) atau Lartas bila dipersyaratkan.'],
        ['Bagaimana cara menghitung CBM kontainer atau berat volumetrik air freight?', 'Gunakan Kalkulator Kargo GAEKS di gaeks.com/kalkulator/ untuk menghitung CBM laut dan berat volumetrik udara (P x L x T / 6.000) secara gratis sebelum mengirim brief ke tim kami.'],
    ];
    $graph[] = ['@type' => 'FAQPage', '@id' => $url . '#faq', 'mainEntity' => array_map(static fn($row) => ['@type' => 'Question', 'name' => $row[0], 'acceptedAnswer' => ['@type' => 'Answer', 'text' => $row[1]]], $homeFaq)];
}

require __DIR__ . '/_page_template.php';
