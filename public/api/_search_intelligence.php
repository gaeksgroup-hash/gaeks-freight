<?php

function gaeks_load_search_intelligence(): array {
    static $cached = null;
    if ($cached !== null) {
        return $cached;
    }
    $path = __DIR__ . '/search_intelligence.json';
    $data = is_file($path) ? json_decode((string)file_get_contents($path), true) : [];
    $cached = is_array($data) ? $data : [];
    return $cached;
}

function gaeks_base_url(): string {
    $si = gaeks_load_search_intelligence();
    return rtrim((string)($si['baseUrl'] ?? 'https://gaeks.com'), '/');
}

function gaeks_si_routes(): array {
    $si = gaeks_load_search_intelligence();
    return is_array($si['routes'] ?? null) ? $si['routes'] : [];
}

function gaeks_si_service_relations(): array {
    $si = gaeks_load_search_intelligence();
    return is_array($si['serviceRelations'] ?? null) ? $si['serviceRelations'] : [];
}

function gaeks_si_organization_schema(): array {
    $si = gaeks_load_search_intelligence();
    $org = is_array($si['organization'] ?? null) ? $si['organization'] : [];
    $base = gaeks_base_url();
    $addr = is_array($org['address'] ?? null) ? $org['address'] : [];
    $areaServed = [];
    foreach (($org['areaServed'] ?? []) as $area) {
        if (!is_array($area) || empty($area['name'])) {
            continue;
        }
        $areaServed[] = [
            '@type' => (string)($area['type'] ?? 'Place'),
            'name' => (string)$area['name'],
        ];
    }

    return [
        '@type' => 'Organization',
        '@id' => $base . '/#organization',
        'name' => (string)($org['name'] ?? 'GAEKS Freight'),
        'legalName' => (string)($org['legalName'] ?? 'PT Global Andalan Ekspress'),
        'alternateName' => (string)($org['alternateName'] ?? 'GAEKS'),
        'slogan' => (string)($org['slogan'] ?? 'Powered by People. Driven by Technology. Focused on You.'),
        'url' => $base . '/',
        'logo' => (string)($org['logo'] ?? ($base . '/logos/gaek-symbol.png')),
        'description' => (string)($org['descriptionId'] ?? ''),
        'address' => [
            '@type' => 'PostalAddress',
            'addressLocality' => (string)($addr['addressLocality'] ?? 'Tanjung Priok'),
            'addressRegion' => (string)($addr['addressRegion'] ?? 'DKI Jakarta'),
            'addressCountry' => (string)($addr['addressCountry'] ?? 'ID'),
        ],
        'areaServed' => $areaServed ?: [
            ['@type' => 'Country', 'name' => 'Indonesia'],
        ],
        'knowsAbout' => array_values(array_filter(array_map('strval', $org['knowsAbout'] ?? []))),
    ];
}

function gaeks_si_local_business_schema(): array {
    $si = gaeks_load_search_intelligence();
    $org = is_array($si['organization'] ?? null) ? $si['organization'] : [];
    $base = gaeks_base_url();
    $addr = is_array($org['address'] ?? null) ? $org['address'] : [];
    return [
        '@type' => 'LocalBusiness',
        '@id' => $base . '/#localbusiness',
        'name' => (string)($org['name'] ?? 'GAEKS Freight') . ' - ' . (string)($org['legalName'] ?? 'PT Global Andalan Ekspress'),
        'url' => $base . '/',
        'image' => (string)($org['logo'] ?? ($base . '/logos/gaek-symbol.png')),
        'parentOrganization' => ['@id' => $base . '/#organization'],
        'address' => [
            '@type' => 'PostalAddress',
            'addressLocality' => (string)($addr['addressLocality'] ?? 'Tanjung Priok'),
            'addressRegion' => (string)($addr['addressRegion'] ?? 'DKI Jakarta'),
            'addressCountry' => (string)($addr['addressCountry'] ?? 'ID'),
        ],
        'areaServed' => [
            ['@type' => 'Country', 'name' => 'Indonesia'],
            ['@type' => 'City', 'name' => 'Jakarta'],
            ['@type' => 'City', 'name' => 'Semarang'],
            ['@type' => 'City', 'name' => 'Surabaya'],
        ],
    ];
}

function gaeks_si_website_schema(): array {
    $base = gaeks_base_url();
    return [
        '@type' => 'WebSite',
        '@id' => $base . '/#website',
        'name' => 'GAEKS Freight',
        'url' => $base . '/',
        'inLanguage' => ['id-ID', 'en'],
        'publisher' => ['@id' => $base . '/#organization'],
    ];
}

function gaeks_si_breadcrumb_schema(array $items): array {
    $list = [];
    foreach (array_values($items) as $index => $item) {
        if (!is_array($item) || empty($item['name']) || empty($item['item'])) {
            continue;
        }
        $list[] = [
            '@type' => 'ListItem',
            'position' => $index + 1,
            'name' => (string)$item['name'],
            'item' => (string)$item['item'],
        ];
    }
    return [
        '@type' => 'BreadcrumbList',
        'itemListElement' => $list,
    ];
}

function gaeks_si_alternate_links(string $idUrl, ?string $enUrl = null): array {
    $links = [
        ['hreflang' => 'id-ID', 'href' => $idUrl],
    ];
    if ($enUrl) {
        $links[] = ['hreflang' => 'en', 'href' => $enUrl];
    }
    $links[] = ['hreflang' => 'x-default', 'href' => $idUrl];
    return $links;
}

function gaeks_si_service_schema(array $service, string $canonicalUrl, string $lang = 'id'): array {
    $base = gaeks_base_url();
    $isEn = $lang === 'en';
    $name = $isEn
        ? (string)($service['landingTitle_en'] ?? $service['seoTitle_en'] ?? $service['title'] ?? '')
        : (string)($service['title'] ?? $service['landingTitle'] ?? '');
    $desc = $isEn
        ? (string)($service['metaDescription_en'] ?? $service['landingDescription_en'] ?? $service['summary_en'] ?? '')
        : (string)($service['metaDescription'] ?? $service['landingDescription'] ?? $service['heroSummary'] ?? $service['summary'] ?? '');

    return [
        '@type' => 'Service',
        '@id' => $canonicalUrl . '#service',
        'name' => $name,
        'description' => $desc,
        'serviceType' => (string)($service['title'] ?? $name),
        'url' => $canonicalUrl,
        'provider' => ['@id' => $base . '/#organization'],
        'areaServed' => [
            ['@type' => 'Country', 'name' => 'Indonesia'],
            ['@type' => 'City', 'name' => 'Jakarta'],
            ['@type' => 'City', 'name' => 'Semarang'],
            ['@type' => 'City', 'name' => 'Surabaya'],
        ],
        'inLanguage' => $isEn ? 'en' : 'id-ID',
    ];
}

function gaeks_si_contact_points(array $content): array {
    $groups = $content['contactGroups'] ?? [];
    if (!is_array($groups)) {
        return [];
    }
    $points = [];
    foreach ($groups as $group) {
        if (!is_array($group)) {
            continue;
        }
        $phone = trim((string)($group['phoneDisplay'] ?? ''));
        $email = trim((string)($group['email'] ?? ''));
        if ($phone === '' && $email === '') {
            continue;
        }
        $point = [
            '@type' => 'ContactPoint',
            'contactType' => (string)($group['title'] ?? 'Customer Support'),
            'areaServed' => 'ID',
            'availableLanguage' => ['Indonesian', 'English'],
        ];
        if ($phone !== '') {
            $point['telephone'] = $phone;
        }
        if ($email !== '') {
            $point['email'] = $email;
        }
        $points[] = $point;
    }
    return $points;
}
