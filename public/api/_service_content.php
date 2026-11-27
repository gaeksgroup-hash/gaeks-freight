<?php
declare(strict_types=1);

function gaeks_migrate_service_content(string $path): void {
    $lock = fopen($path . '.migration.lock', 'c');
    if (!$lock || !flock($lock, LOCK_EX)) return;
    try {
        $data = gaeks_read_json_file($path, gaeks_read_json_file(__DIR__ . '/site_content.json', []));
        if (($data['serviceCmsVersion'] ?? 0) >= 2) return;
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
        $data['updatedAt'] = (int) round(microtime(true)*1000);
        if (!gaeks_write_json_file($path, $data)) gaeks_json(['message'=>'Migrasi konten belum tersimpan.'],503);
    } finally { flock($lock, LOCK_UN); fclose($lock); }
}

function gaeks_service_slug(string $id): string {
    return ['fcl'=>'freight-laut-fcl','air-shipment'=>'freight-udara','ppjk'=>'ppjk-customs-clearance','undername-impor'=>'undername-impor-pi','domestic-truck'=>'trucking','gudang-pbm'=>'pergudangan-stevedoring','project-cargo'=>'project-cargo-heavy-lift','lcl'=>'freight-laut-lcl'][$id] ?? $id;
}
function gaeks_service_contact(array $content, string $id): array {
    $groups=$content['branding']['contactGroups'] ?? [];
    foreach($groups as $group) if(in_array($id,$group['serviceIds']??[],true)) return $group;
    foreach($groups as $group) if($group['id']==='general') return $group;
    return $groups[0] ?? [];
}
function gaeks_public_content(array $data): array {
    $data['services']=array_values(array_filter($data['services']??[], fn($s)=>($s['status']??'published')==='published'));
    foreach($data['services'] as &$s){
        unset($s['evidenceNotes']);
        $s['evidence']=array_values(array_filter($s['evidence']??[],fn($p)=>!empty($p['approved'])&&!empty($p['source'])&&!empty($p['date'])&&!empty($p['detail'])));
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
