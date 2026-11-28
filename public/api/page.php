<?php
declare(strict_types=1);
require_once __DIR__.'/_bootstrap.php';
$content=gaeks_public_content(gaeks_read_json_file(gaeks_content_file(),[]));
$e=fn($v)=>htmlspecialchars((string)$v,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8');
$path=rtrim(parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH),'/').'/';$url='https://gaeks.com'.$path;
$title=$content['seo']['siteTitle']??'GAEKS Freight';$description=$content['seo']['metaDescription']??'';
$copy=array_replace(gaeks_read_json_file(__DIR__.'/ui_copy_seed.json',[]),$content['siteSettings']['uiCopy']??[]);
if($path==='/layanan/'){$title=$copy['servicesMetaTitle'];$description=$copy['servicesMetaDescription'];}
if($path==='/kontak/'){$title=$copy['contactMetaTitle'];$description=$copy['contactMetaDescription'];}
if($path==='/kontak/telepon/'){
    $title=$copy['phoneMetaTitle'];$description=$copy['phoneMetaDescription'];
    require __DIR__.'/_phone_directory.php';
    require __DIR__.'/_page_template.php';
    return;
}
$srStyle='position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
if($path==='/layanan/'){
    $body='<main style="min-height:100vh;background:#f4f5f1;color:#12363a"><section style="background:#082f34;color:#fff;padding:7.5rem 1.5rem 4rem"><div style="max-width:72rem;margin:0 auto"><p style="font-size:.75rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#a3edf2;margin:0 0 1rem">'.$e($copy['servicesEyebrow']).'</p><h1 style="font-size:clamp(2rem,4vw,3.5rem);line-height:1.06;margin:0 0 1rem;max-width:18ch">'.$e($copy['servicesHeading']).'</h1><p style="max-width:52ch;line-height:1.65;color:#dbeaea;margin:0">'.$e($copy['servicesIntro']).'</p></div></section><nav style="'.$srStyle.'" aria-label="'.$e($copy['servicesListLabel']).'"><ol>';
    $items=[];$position=0;
    foreach($content['services'] as $s){
        $serviceUrl='https://gaeks.com/layanan/'.gaeks_service_slug($s['id']).'/';
        $summary=$s['summary']??$s['description'];
        $body.='<li><article><h2><a href="'.$e($serviceUrl).'">'.$e($s['title']).'</a></h2><p>'.$e($summary).'</p></article></li>';
        $items[]=['@type'=>'ListItem','position'=>++$position,'url'=>$serviceUrl,'name'=>$s['title']];
    }
    $body.='</ol></nav>';
    if(!$items)$body.='<p style="max-width:72rem;margin:2rem auto;padding:0 1.5rem">'.$e($copy['servicesEmpty']).' <a href="/kontak/">'.$e($copy['servicesEmptyCta']).'</a></p>';
    $body.='</main>';
    $graph=[['@type'=>'Organization','name'=>'GAEKS Freight','url'=>'https://gaeks.com'],['@type'=>'CollectionPage','name'=>$title,'description'=>$description,'url'=>$url],['@type'=>'ItemList','name'=>$copy['servicesListLabel'],'itemListElement'=>$items]];
    require __DIR__.'/_page_template.php';
    return;
}
$groups=$content['branding']['contactGroups']??[];
$priority=['ppjk','fcl','undername','air','general'];
$rank=static function(string $id)use($priority):int{$n=array_search($id,$priority,true);return $n===false?count($priority):$n;};
usort($groups,static fn($a,$b)=>$rank($a['id'])<=>$rank($b['id']));
$teams=[];
foreach($groups as $g){$n=preg_replace('/\D/','',$g['whatsappNumber']);if(str_starts_with($n,'0'))$n='62'.substr($n,1);if($n!=='')$teams[$n][]=$g;}
$heroBg=($path==='/kontak/')?'#f4f5f1':'#062d32';
$heroColor=($path==='/kontak/')?'#12363a':'#fff';
$subColor=($path==='/kontak/')?'#4b6265':'#dbeaea';
$rawVisibleTitle=$content['hero']['titlePrefix'].$content['hero']['titleHighlight'].$content['hero']['titleSuffix'];
$rawVisibleCopy=$content['hero']['caption']??$description;
$visibleTitle=($path==='/')?(trim($rawVisibleTitle)===''||trim($rawVisibleTitle)==='Kargo bergerak dengan rencana yang jelas.'?'Diperkuat oleh Manusia. Digerakkan oleh Teknologi. Berfokus pada Anda.':$rawVisibleTitle):$title;
$visibleCopy=($path==='/')?(trim($rawVisibleCopy)===''||trim($rawVisibleCopy)==='GAEKS mengatur freight laut dan udara, kepabeanan, serta pengiriman darat melalui satu tim operasional.'?'Kami memadukan keahlian, teknologi, dan tindakan nyata untuk menghadirkan solusi logistik yang lebih cepat, efisien, dan transparan.':$rawVisibleCopy):$description;
$body='<main style="min-height:100vh;background:'.$heroBg.';color:'.$heroColor.'"><section style="position:relative;min-height:664px;display:flex;align-items:center;padding:6.5rem 1.5rem 4rem"><div style="max-width:72rem;width:100%;margin:0 auto"><h1 style="font-size:clamp(2rem,4.5vw,3.75rem);line-height:1.04;letter-spacing:-.04em;margin:0 0 1.25rem;max-width:18ch">'.$e($visibleTitle).'</h1><p style="max-width:52ch;font-size:1.05rem;line-height:1.65;color:'.$subColor.';margin:0">'.$e($visibleCopy).'</p></div></section><div style="'.$srStyle.'"><nav>';
foreach($content['services'] as $s)$body.='<article><h2><a href="/layanan/'.$e(gaeks_service_slug($s['id'])).'/">'.$e($s['title']).'</a></h2><p>'.$e($s['summary']??$s['description']).'</p></article>';
$body.='</nav><section>';
foreach($teams as $number=>$members){
    $first=$members[0];$memberIds=array_column($members,'id');
    $teamTitle=implode(' · ',array_column($members,'name'));
    if(count($members)===1&&$first['id']==='general')$teamTitle=$copy['phoneGeneralTeam'];
    elseif(count($members)>1&&!array_diff($memberIds,['fcl','ppjk','undername']))$teamTitle=$copy['phoneTradeTeam'];
    $waText=$copy['phoneMessage'].' '.$teamTitle.'.';
    $body.='<article><h2>'.$e($teamTitle).'</h2><a href="https://wa.me/'.$e($number).'?text='.rawurlencode($waText).'">'.$e($first['whatsappDisplay']).'</a><p><a href="mailto:'.$e($first['email']).'?subject='.rawurlencode('Konsultasi '.$teamTitle).'&body='.rawurlencode($waText).'">'.$e($first['email']).'</a></p></article>';
}
$body.='</section></div></main>';
$orgId='https://gaeks.com/#organization';
$logoUrl=gaeks_resolve_public_url((string)($content['branding']['symbolLogoUrl']??'/logos/gaek-symbol.png'));
$socialLinks=array_values(array_filter(array_map(static fn($s)=>(string)($s['url']??''),$content['siteSettings']['socialLinks']??[])));
$areaServed=[['@type'=>'Country','name'=>'Indonesia'],['@type'=>'City','name'=>'Jakarta'],['@type'=>'City','name'=>'Semarang'],['@type'=>'City','name'=>'Surabaya']];
$contactPoints=[];
foreach([['id'=>'ppjk','label'=>'Customs Clearance, FCL & Undername'],['id'=>'air','label'=>'Air Freight Desk'],['id'=>'general','label'=>'Project Cargo, Domestic & General CS']] as $cpSpec){
    foreach($groups as $grp){
        if(($grp['id']??'')===$cpSpec['id']){
            $contactPoints[]=['@type'=>'ContactPoint','contactType'=>$cpSpec['label'],'telephone'=>(string)($grp['whatsappDisplay']??''),'email'=>(string)($grp['email']??''),'areaServed'=>'ID','availableLanguage'=>['Indonesian','English']];
            break;
        }
    }
}
$organization=['@type'=>'Organization','@id'=>$orgId,'name'=>'GAEKS Freight','legalName'=>'PT Global Andalan Ekspress','url'=>'https://gaeks.com','logo'=>$logoUrl,'sameAs'=>$socialLinks?:['https://www.instagram.com/gaeksfreight/'],'knowsAbout'=>['Freight Forwarding Internasional','Pengiriman Laut FCL (Full Container Load)','Pengiriman Laut LCL (Less than Container Load)','Jasa PPJK dan Customs Clearance Indonesia','Jasa Pengiriman Udara (Air Freight)','Undername Impor dan Persetujuan Impor (PI)','Project Cargo dan Heavy Lift','Trucking Domestik dan Pergudangan']];
if($contactPoints)$organization['contactPoint']=$contactPoints;
$localBusiness=['@type'=>['LocalBusiness','ProfessionalService'],'@id'=>'https://gaeks.com/#local-business','name'=>'GAEKS Freight — PT Global Andalan Ekspress','url'=>'https://gaeks.com','parentOrganization'=>['@id'=>$orgId],'address'=>['@type'=>'PostalAddress','addressLocality'=>'Tanjung Priok','addressRegion'=>'DKI Jakarta','addressCountry'=>'ID'],'areaServed'=>$areaServed,'serviceType'=>['Freight Forwarding','PPJK Customs Clearance','FCL Ocean Freight','LCL Consolidation','Air Freight','Undername Impor & PI']];
$graph=[$organization,$localBusiness,['@type'=>'WebPage','@id'=>$url,'url'=>$url,'name'=>$title,'description'=>$description,'inLanguage'=>'id-ID']];
if($path==='/'){
    $graph[]=['@type'=>'WebSite','@id'=>'https://gaeks.com/#website','url'=>'https://gaeks.com','name'=>'GAEKS Freight','inLanguage'=>'id-ID'];
    $offers=[];$pos=0;
    foreach($content['services'] as $srv){
        $offers[]=['@type'=>'Offer','position'=>++$pos,'itemOffered'=>['@type'=>'Service','name'=>$srv['title'],'serviceType'=>$srv['category']??'Logistics','url'=>'https://gaeks.com/layanan/'.gaeks_service_slug($srv['id']).'/']];
    }
    $graph[]=['@type'=>'OfferCatalog','name'=>'Katalog Layanan Freight Forwarding & Kepabeanan GAEKS Freight','itemListElement'=>$offers];
    $homeFaq=[
        ['Layanan apa saja yang ditangani GAEKS Freight?','PT Global Andalan Ekspress (GAEKS Freight) melayani pengiriman laut FCL dan LCL, jasa kepabeanan PPJK dan customs clearance (PIB/PEB), pengiriman udara prioritas, perizinan impor dan undername/PI, transportasi darat, pergudangan, serta project cargo.'],
        ['Apa perbedaan pengiriman FCL dan LCL di GAEKS?','FCL (Full Container Load) menggunakan satu kontainer penuh secara eksklusif untuk satu pengiriman, cocok untuk volume besar atau muatan khusus. LCL (Less than Container Load) menggabungkan muatan dengan volume lebih kecil secara konsolidasi bersama pengirim lain.'],
        ['Dokumen apa saja yang diperlukan untuk jasa PPJK dan customs clearance?','Dokumen awal meliputi Commercial Invoice, Packing List, dokumen pengangkutan (Bill of Lading atau Air Waybill), uraian barang/HS Code, serta izin khusus komoditas seperti Persetujuan Impor (PI) atau Lartas bila dipersyaratkan.'],
        ['Bagaimana cara menghitung biaya dan kapasitas kargo udara atau laut?','Anda dapat menggunakan Kalkulator Kargo GAEKS di gaeks.com/kalkulator/ untuk menghitung CBM dan berat volumetrik terlebih dahulu, lalu mengirimkan spesifikasi asal, tujuan, dan komoditas ke tim kami untuk penawaran sesuai jadwal aktual.'],
    ];
    $graph[]=['@type'=>'FAQPage','mainEntity'=>array_map(static fn($row)=>['@type'=>'Question','name'=>$row[0],'acceptedAnswer'=>['@type'=>'Answer','text'=>$row[1]]],$homeFaq)];
}
require __DIR__.'/_page_template.php';
