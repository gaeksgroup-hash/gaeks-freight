<?php
declare(strict_types=1);

function gaeks_migrate_service_content(string $path): void {
    $lock = fopen($path . '.migration.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX)) return;
    try {
        $data = gaeks_read_json_file($path, gaeks_read_json_file(__DIR__ . '/site_content.json', []));
        if (($data['serviceCmsVersion'] ?? 0) >= 7) return;
        if (($data['serviceCmsVersion'] ?? 0) < 2) {
            if (is_file($path) && !is_file($path . '.before-service-cms-v1')) copy($path, $path . '.before-service-cms-v1');
            $data['siteSettings']['uiCopy'] = array_replace(gaeks_read_json_file(__DIR__ . '/ui_copy_seed.json', []), $data['siteSettings']['uiCopy'] ?? []);
            $data['branding']['contactGroups'] ??= gaeks_read_json_file(__DIR__ . '/contact_groups_seed.json', []);
            $services = $data['services'] ?? [];
            foreach (gaeks_read_json_file(__DIR__ . '/service_editorial_seed.json', []) as $seed) {
                $found = false;
                foreach ($services as &$service) {
                    if ($service['id'] === $seed['id']) { $service = array_replace($seed, $service); $found = true; break; }
                }
                unset($service);
                if (!$found) $services[] = $seed;
            }
            $data['services'] = $services;
            $data['serviceCmsVersion'] = 2;
        }
        if (($data['serviceCmsVersion'] ?? 0) < 3) {
            if (!is_file($path . '.before-hero-media-v1') && is_file($path)) copy($path, $path . '.before-hero-media-v1');
            if (($data['hero']['imageUrl'] ?? '') === '/uploads/1791915131-e31c7018-lv_0_20261004214354-poster-optimized.webp') $data['hero']['imageUrl'] = '/uploads/gaeks-hero-cargo-poster.webp';
            if (($data['hero']['videoUrl'] ?? '') === '/uploads/1791915131-8afd4eca-lv_0_20261004214354-optimized.webm') $data['hero']['videoUrl'] = '/uploads/gaeks-hero-cargo-optimized.webm';
            $data['serviceCmsVersion'] = 3;
        }
        if (($data['serviceCmsVersion'] ?? 0) < 4) {
            if (!is_file($path . '.before-contact-routing-v2') && is_file($path)) copy($path, $path . '.before-contact-routing-v2');
            $moveIds = ['project-cargo', 'roro-breakbulk'];
            $data['branding']['contactGroups'] ??= gaeks_read_json_file(__DIR__ . '/contact_groups_seed.json', []);
            foreach ($data['branding']['contactGroups'] as &$group) {
                $group['serviceIds'] = array_values(array_diff($group['serviceIds'] ?? [], $moveIds));
                if (($group['id'] ?? '') === 'fcl') $group['serviceIds'] = array_values(array_unique(array_merge($group['serviceIds'], $moveIds)));
            }
            unset($group);
            $data['serviceCmsVersion'] = 4;
        }
        if (($data['serviceCmsVersion'] ?? 0) < 5) {
            if (!is_file($path . '.before-contact-routing-v3') && is_file($path)) copy($path, $path . '.before-contact-routing-v3');
            $groupSeeds = [];
            foreach (gaeks_read_json_file(__DIR__ . '/contact_groups_seed.json', []) as $seedGroup) {
                $groupSeeds[$seedGroup['id']] = $seedGroup;
            }
            $data['branding']['contactGroups'] ??= array_values($groupSeeds);
            $legacyCtaMap = [
                'ppjk' => ['Konsultasikan Customs Clearance / PPJK'],
                'fcl' => ['Konsultasikan Ekspor / impor laut FCL'],
                'undername' => ['Konsultasikan Undername / Persetujuan Impor'],
                'air' => ['Konsultasikan Air Freight'],
                'general' => ['Hubungi layanan pelanggan untuk general inquiry', 'Konsultasikan Project Cargo, Domestic, Gudang & general inquiry'],
            ];
            $legacyNameMap = [
                'general' => ['Layanan pelanggan & general inquiry', 'Project Cargo, Domestic, Gudang & general inquiry'],
            ];
            $hasGeneral = false;
            foreach ($data['branding']['contactGroups'] as &$group) {
                $gid = (string) ($group['id'] ?? '');
                $group['serviceIds'] = array_values(array_diff($group['serviceIds'] ?? [], ['project-cargo']));
                if ($gid === 'general') {
                    $hasGeneral = true;
                    $group['serviceIds'] = array_values(array_unique(array_merge(['project-cargo'], $group['serviceIds'])));
                }
                if (isset($groupSeeds[$gid])) {
                    $seed = $groupSeeds[$gid];
                    if (empty($group['ctaText']) || in_array($group['ctaText'], $legacyCtaMap[$gid] ?? [], true)) {
                        $group['ctaText'] = $seed['ctaText'];
                    }
                    if (empty($group['name']) || in_array($group['name'], $legacyNameMap[$gid] ?? [], true)) {
                        $group['name'] = $seed['name'];
                    }
                    $group['emailCtaText'] = ($group['emailCtaText'] ?? '') !== '' ? $group['emailCtaText'] : $seed['emailCtaText'];
                    $group['whatsappTemplate'] = ($group['whatsappTemplate'] ?? '') !== '' ? $group['whatsappTemplate'] : $seed['whatsappTemplate'];
                    $group['emailSubjectTemplate'] = ($group['emailSubjectTemplate'] ?? '') !== '' ? $group['emailSubjectTemplate'] : $seed['emailSubjectTemplate'];
                }
            }
            unset($group);
            if (!$hasGeneral && isset($groupSeeds['general'])) {
                $data['branding']['contactGroups'][] = $groupSeeds['general'];
            }

            $serviceSeeds = [];
            foreach (gaeks_read_json_file(__DIR__ . '/service_editorial_seed.json', []) as $seedService) {
                $serviceSeeds[$seedService['id']] = $seedService;
            }
            foreach ($data['services'] as &$service) {
                $sid = (string) ($service['id'] ?? '');
                if (!isset($serviceSeeds[$sid])) continue;
                $seed = $serviceSeeds[$sid];
                if (empty($service['ctaServiceName'])) $service['ctaServiceName'] = $seed['ctaServiceName'] ?? $service['title'];
                if (empty($service['heroSummary'])) $service['heroSummary'] = $seed['heroSummary'] ?? '';
                if ($sid === 'undername-impor' && !empty($seed['sections'])) {
                    $hasQuotaDistinction = false;
                    foreach ($service['sections'] ?? [] as $sec) {
                        if (stripos((string) ($sec['title'] ?? ''), 'kuota') !== false) { $hasQuotaDistinction = true; break; }
                    }
                    if (!$hasQuotaDistinction) {
                        $service['sections'] = $seed['sections'];
                    }
                }
            }
            unset($service);

            $uiCopySeed = gaeks_read_json_file(__DIR__ . '/ui_copy_seed.json', []);
            $currentCopy = $data['siteSettings']['uiCopy'] ?? [];
            if (($currentCopy['phoneGeneralTeam'] ?? '') === 'CS & general inquiry' || ($currentCopy['phoneGeneralTeam'] ?? '') === 'Project cargo & logistik') {
                $currentCopy['phoneGeneralTeam'] = $uiCopySeed['phoneGeneralTeam'];
            }
            if (($currentCopy['phoneTradeTeam'] ?? '') === 'Freight laut, proyek & kepabeanan' || ($currentCopy['phoneTradeTeam'] ?? '') === 'Freight laut & kepabeanan') {
                $currentCopy['phoneTradeTeam'] = $uiCopySeed['phoneTradeTeam'];
            }
            if (($currentCopy['phoneGeneralNote'] ?? '') === 'Pertanyaan awal dan kebutuhan yang belum masuk kelompok khusus.') {
                $currentCopy['phoneGeneralNote'] = $uiCopySeed['phoneGeneralNote'];
            }
            if (($currentCopy['contactDirectory'] ?? '') === 'Kontak untuk layanan lainnya') {
                $currentCopy['contactDirectory'] = $uiCopySeed['contactDirectory'];
            }
            $data['siteSettings']['uiCopy'] = array_replace($uiCopySeed, $currentCopy);
            $data['serviceCmsVersion'] = 5;
            $data['updatedAt'] = (int) round(microtime(true) * 1000);
            if (!gaeks_write_json_file($path, $data)) gaeks_json(['message' => 'Migrasi konten belum tersimpan.'], 503);
        }
        gaeks_migrate_cta_labels($path);
        gaeks_migrate_search_intelligence_v7($path);
    } finally { flock($lock, LOCK_UN); fclose($lock); }
}

function gaeks_migrate_search_intelligence_v7(string $path): void {
    $data = gaeks_read_json_file($path, []);
    if (!isset($data['branding']['contactGroups']) || !is_array($data['branding']['contactGroups'])) {
        $data['branding']['contactGroups'] = gaeks_read_json_file(__DIR__ . '/contact_groups_seed.json', []);
    }
    $data['siteSettings']['uiCopy'] = array_replace(
        gaeks_read_json_file(__DIR__ . '/ui_copy_seed.json', []),
        is_array($data['siteSettings']['uiCopy'] ?? null) ? $data['siteSettings']['uiCopy'] : []
    );
    if ((int)($data['serviceCmsVersion'] ?? 0) >= 7) {
        if (!is_file($path)) gaeks_write_json_file($path, $data);
        return;
    }
    if (is_file($path) && !is_file($path . '.before-search-intelligence-v7')) {
        copy($path, $path . '.before-search-intelligence-v7');
    }
    $serviceSeeds = gaeks_read_json_file(__DIR__ . '/service_editorial_seed.json', []);
    $seedById = [];
    foreach ($serviceSeeds as $seed) {
        if (is_array($seed) && !empty($seed['id'])) {
            $seedById[(string)$seed['id']] = $seed;
        }
    }
    $services = is_array($data['services'] ?? null) ? $data['services'] : [];
    $seenIds = [];
    foreach ($services as &$service) {
        if (!is_array($service) || empty($service['id'])) continue;
        $id = (string)$service['id'];
        $seenIds[$id] = true;
        if (!isset($seedById[$id])) continue;
        $seed = $seedById[$id];
        // Backfill English & Search Intelligence editorial fields without overriding owner copy
        foreach (['seoTitle_en', 'metaDescription_en', 'landingTitle_en', 'landingDescription_en', 'heroSummary_en', 'summary_en', 'primaryKeyword', 'secondaryKeywords', 'searchIntent', 'relatedServiceIds'] as $field) {
            if (empty($service[$field]) && !empty($seed[$field])) {
                $service[$field] = $seed[$field];
            }
        }
        // Upgrade unedited uniform process sections or thin RORO seed
        $firstSectionText = '';
        if (!empty($service['sections'][0]['body']) && is_string($service['sections'][0]['body'])) {
            $firstSectionText = $service['sections'][0]['body'];
        } elseif (!empty($service['sections'][0]['paragraphs'][0]) && is_string($service['sections'][0]['paragraphs'][0])) {
            $firstSectionText = $service['sections'][0]['paragraphs'][0];
        }
        if (str_contains($firstSectionText, 'Kirim brief dan dokumen awal') || ($id === 'roro-breakbulk' && count($service['faq'] ?? []) < 4)) {
            $service['sections'] = $seed['sections'] ?? ($service['sections'] ?? []);
            $service['faq'] = $seed['faq'] ?? ($service['faq'] ?? []);
            $service['compare'] = $seed['compare'] ?? ($service['compare'] ?? []);
            $service['features'] = $seed['features'] ?? ($service['features'] ?? []);
        }
        if ($id === 'roro-breakbulk' && (($service['imageUrl'] ?? '') === '' || str_contains((string)$service['imageUrl'], '1789234769_387713'))) {
            $service['imageUrl'] = $seed['imageUrl'] ?? $service['imageUrl'];
        }
        if ($id === 'project-cargo' && str_contains((string)($service['tagline'] ?? ''), 'RORO')) {
            $service['tagline'] = $seed['tagline'] ?? $service['tagline'];
            $service['seoTitle'] = $seed['seoTitle'] ?? $service['seoTitle'];
            $service['metaDescription'] = $seed['metaDescription'] ?? $service['metaDescription'];
        }
    }
    unset($service);
    foreach ($seedById as $id => $seed) {
        if (!isset($seenIds[$id])) {
            $services[] = $seed;
        }
    }
    $data['services'] = $services;

    $articleSeeds = gaeks_read_json_file(__DIR__ . '/articles_seed.json', []);
    $articleSeedById = [];
    foreach ($articleSeeds as $artSeed) {
        if (is_array($artSeed) && !empty($artSeed['id'])) {
            $articleSeedById[(string)$artSeed['id']] = $artSeed;
        }
    }
    $articles = is_array($data['articles'] ?? null) ? $data['articles'] : [];
    foreach ($articles as &$art) {
        if (!is_array($art) || empty($art['id'])) continue;
        $aid = (string)$art['id'];
        if (!isset($articleSeedById[$aid])) continue;
        $contentBlob = (string)($art['content'] ?? '') . ' ' . (string)($art['excerpt'] ?? '');
        $isLegacyBoilerplate = str_contains($contentBlob, 'Tata kelola rantai pasok maritim dan kepatuhan prosedur kepabeanan internasional pada subjek')
            || str_contains((string)($art['slug'] ?? ''), 'analisis-komprehensif-logistik-maritim-');
        if ($isLegacyBoilerplate) {
            $art = array_replace($art, $articleSeedById[$aid]);
        }
    }
    unset($art);
    $data['articles'] = $articles;

    if (isset($data['seo']) && is_array($data['seo'])) {
        $si = gaeks_read_json_file(__DIR__ . '/search_intelligence.json', []);
        $homeId = $si['routes']['/']['id'] ?? [];
        if (($data['seo']['siteTitle'] ?? '') === '' || str_contains((string)($data['seo']['siteTitle'] ?? ''), 'Jasa Freight Forwarding Resmi')) {
            if (!empty($homeId['title'])) $data['seo']['siteTitle'] = $homeId['title'];
            if (!empty($homeId['description'])) $data['seo']['metaDescription'] = $homeId['description'];
        }
    }

    $data['serviceCmsVersion'] = 7;
    $data['updatedAt'] = (int) round(microtime(true) * 1000);
    gaeks_write_json_file($path, $data);
}

function gaeks_migrate_cta_labels(string $path): void {
    $data = gaeks_read_json_file($path, []);
    if (($data['serviceCmsVersion'] ?? 0) !== 5) return;
    $legacy = ['Chat Tim Kepabeanan','Chat Tim {service}','Chat Tim Undername & PI','Chat Tim Kargo Udara'];
    $data['branding']['contactGroups'] ??= [];
    foreach ($data['branding']['contactGroups'] as &$group) {
        if (in_array($group['ctaText'] ?? '', $legacy, true)) $group['ctaText'] = 'Chat WhatsApp';
    }
    unset($group);
    $data['serviceCmsVersion'] = 6;
    $data['updatedAt'] = (int) round(microtime(true) * 1000);
    gaeks_write_json_file($path, $data);
}

function gaeks_service_slug(string $id): string {
    return ['fcl'=>'freight-laut-fcl','air-shipment'=>'freight-udara','ppjk'=>'ppjk-customs-clearance','undername-impor'=>'undername-impor-pi','domestic-truck'=>'trucking','gudang-pbm'=>'pergudangan-stevedoring','project-cargo'=>'project-cargo-heavy-lift','lcl'=>'freight-laut-lcl','roro-breakbulk'=>'roro-breakbulk'][$id] ?? $id;
}
function gaeks_service_contact(array $content, string $id): array {
    $groups=$content['branding']['contactGroups'] ?? [];
    foreach($groups as $group) if(in_array($id,$group['serviceIds']??[],true)) return $group;
    foreach($groups as $group) if($group['id']==='general') return $group;
    return $groups[0] ?? [];
}
function gaeks_apply_contact_template(string $template, string $service, string $direction = '', string $city = '', bool $capitalizeContext = false): string {
    $dirText = $direction !== '' ? ($capitalizeContext ? ucfirst(strtolower($direction)) : strtolower($direction)) : '';
    $cityText = trim($city);
    $result = str_ireplace(['{service}', '{arah}', '{direction}', '{kota}', '{city}'], [$service, $dirText, $dirText, $cityText, $cityText], $template);
    if ($cityText === '') {
        $result = preg_replace('/\s+di(?=\s*(?:[.,!?]|$))/i', '', $result) ?? $result;
    }
    $result = preg_replace('/\s+([.,!?])/', '$1', $result) ?? $result;
    $result = preg_replace('/\s{2,}/', ' ', $result) ?? $result;
    return trim($result);
}
function gaeks_build_service_contact(array $content, array $service, array $copy, string $direction = '', string $city = ''): array {
    $sid = (string) ($service['id'] ?? 'general');
    $group = gaeks_service_contact($content, $sid);
    $serviceName = trim((string) ($service['ctaServiceName'] ?? '')) ?: (string) ($service['title'] ?? 'Pengiriman GAEKS');
    $rawCta = trim((string) ($service['whatsappCtaLabel'] ?? '')) ?: (string) ($group['ctaText'] ?? 'Chat Tim {service}');
    $waLabel = gaeks_apply_contact_template($rawCta, $serviceName, $direction, $city, true);
    $emailLabel = trim((string) ($service['emailCtaLabel'] ?? '')) ?: (trim((string) ($group['emailCtaText'] ?? '')) ?: (string) ($copy['serviceEmailCta'] ?? 'Kirim Email'));
    $rawWaTpl = trim((string) ($service['whatsappTemplate'] ?? '')) ?: (trim((string) ($group['whatsappTemplate'] ?? '')) ?: 'Halo tim GAEKS, saya ingin konsultasi {service} {arah} di {kota}.');
    $waText = gaeks_apply_contact_template($rawWaTpl, $serviceName, $direction, $city, false);
    $rawSubTpl = trim((string) ($service['emailSubject'] ?? '')) ?: (trim((string) ($group['emailSubjectTemplate'] ?? '')) ?: 'Konsultasi {service} {arah} {kota}');
    $subject = gaeks_apply_contact_template($rawSubTpl, $serviceName, $direction, $city, true);
    $digits = preg_replace('/\D/', '', (string) ($group['whatsappNumber'] ?? ''));
    if (str_starts_with($digits, '0')) $digits = '62' . substr($digits, 1);
    $email = (string) ($group['email'] ?? '');
    return [
        'group' => $group,
        'serviceName' => $serviceName,
        'whatsappLabel' => $waLabel,
        'emailLabel' => $emailLabel,
        'whatsappNumber' => $digits,
        'whatsappDisplay' => (string) ($group['whatsappDisplay'] ?? ('+' . $digits)),
        'email' => $email,
        'whatsappMessage' => $waText,
        'emailSubject' => $subject,
        'whatsappUrl' => $digits !== '' ? 'https://wa.me/' . $digits . '?text=' . rawurlencode($waText) : '#',
        'emailUrl' => $email !== '' ? 'mailto:' . $email . '?subject=' . rawurlencode($subject) . '&body=' . rawurlencode($waText) : '#',
    ];
}
function gaeks_public_content(array $data): array {
    $data['services']=array_values(array_filter($data['services']??[], fn($s)=>($s['status']??'published')==='published'));
    foreach($data['services'] as &$s){
        unset($s['evidenceNotes']);
        $s['evidence']=array_values(array_filter($s['evidence']??[],fn($p)=>!empty($p['approved'])&&!empty($p['source'])&&!empty($p['date'])&&!empty($p['detail'])));
    }
    if (isset($data['corporate']) && is_array($data['corporate'])) {
        if (isset($data['corporate']['rateCard']['items']) && is_array($data['corporate']['rateCard']['items'])) {
            $data['corporate']['rateCard']['items'] = array_values(array_filter(
                $data['corporate']['rateCard']['items'],
                fn($item) => is_array($item) && ($item['status'] ?? 'draft') === 'published'
            ));
        }
        if (isset($data['corporate']['carriers']['items']) && is_array($data['corporate']['carriers']['items'])) {
            $data['corporate']['carriers']['items'] = array_values(array_filter(
                $data['corporate']['carriers']['items'],
                fn($item) => is_array($item) && ($item['status'] ?? 'draft') === 'published'
            ));
        }
        if (isset($data['corporate']['careers']['positions']) && is_array($data['corporate']['careers']['positions'])) {
            $data['corporate']['careers']['positions'] = array_values(array_filter(
                $data['corporate']['careers']['positions'],
                fn($item) => is_array($item) && ($item['status'] ?? 'draft') === 'published'
            ));
        }
    }
    return $data;
}
function gaeks_validate_service_content(string $section, array $payload): void {
    if($section==='siteSettings' && isset($payload['uiCopy'])) {
        if(!is_array($payload['uiCopy'])) gaeks_json(['message'=>'Redaksi halaman tidak valid.'],422);
        foreach($payload['uiCopy'] as $text) if(!is_string($text)||strlen($text)>5000)gaeks_json(['message'=>'Redaksi harus berupa teks, maksimal 5000 karakter.'],422);
    }
    if($section==='branding') {
        $groups=$payload['contactGroups']??null;
        if($groups===null) return;
        $ids=[];$mapped=[];$general=false;
        foreach($groups as $g){
            $digits=preg_replace('/\D/','',(string)($g['whatsappNumber']??''));
            if(empty($g['id'])||in_array($g['id'],$ids,true)||empty($g['name'])||empty($g['ctaText'])||!preg_match('/^(?:0|62)[0-9]{8,13}$/',$digits)||!filter_var($g['email']??'',FILTER_VALIDATE_EMAIL)) gaeks_json(['message'=>'Periksa nama, CTA, email, dan nomor kontak kelompok.'],422);
            $ids[]=$g['id'];$general=$general||$g['id']==='general';
            foreach($g['serviceIds']??[] as $id){if(in_array($id,$mapped,true))gaeks_json(['message'=>'Satu layanan hanya boleh dipetakan ke satu kelompok.'],422);$mapped[]=$id;}
        }
        if(!$general) gaeks_json(['message'=>'Kelompok general wajib tersedia.'],422);
    }
    if($section==='services') foreach($payload as $s){
        if(!preg_match('/^[a-z0-9-]+$/',(string)($s['id']??''))||empty($s['title'])||!in_array($s['status']??'published',['draft','published'],true))gaeks_json(['message'=>'Identitas atau status layanan tidak valid.'],422);
        if(!empty($s['canonical'])&&!preg_match('~^https://gaeks\.com/layanan/[a-z0-9-]+/$~',$s['canonical']))gaeks_json(['message'=>'Canonical harus URL layanan HTTPS gaeks.com dan diakhiri garis miring.'],422);
        foreach($s['evidence']??[] as $p) if(!empty($p['approved'])&&(empty($p['source'])||empty($p['date'])||empty($p['detail'])))gaeks_json(['message'=>'Bukti terbit membutuhkan sumber, tanggal, dan detail.'],422);
    }
}
