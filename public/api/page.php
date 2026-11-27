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
if($path==='/layanan/'){
    $body='<main class="page-shell py-24"><p>'.$e($copy['servicesEyebrow']).'</p><h1>'.$e($copy['servicesHeading']).'</h1><p>'.$e($copy['servicesIntro']).'</p><nav aria-label="'.$e($copy['servicesListLabel']).'"><ol>';
    $items=[];$position=0;
    foreach($content['services'] as $s){
        $serviceUrl='https://gaeks.com/layanan/'.gaeks_service_slug($s['id']).'/';
        $summary=$s['summary']??$s['description'];
        $body.='<li><article><h2><a href="'.$e($serviceUrl).'">'.$e($s['title']).'</a></h2><p>'.$e($summary).'</p></article></li>';
        $items[]=['@type'=>'ListItem','position'=>++$position,'url'=>$serviceUrl,'name'=>$s['title']];
    }
    $body.='</ol></nav>';
    if(!$items)$body.='<p>'.$e($copy['servicesEmpty']).'</p><p><a href="/kontak/">'.$e($copy['servicesEmptyCta']).'</a></p>';
    $body.='</main>';
    $graph=[['@type'=>'Organization','name'=>'GAEKS Freight','url'=>'https://gaeks.com'],['@type'=>'CollectionPage','name'=>$title,'description'=>$description,'url'=>$url],['@type'=>'ItemList','name'=>$copy['servicesListLabel'],'itemListElement'=>$items]];
    require __DIR__.'/_page_template.php';
    return;
}
$body='<main class="page-shell py-24"><h1>'.$e($title).'</h1><p>'.$e($description).'</p><nav>';
foreach($content['services'] as $s)$body.='<article class="my-5"><h2><a href="/layanan/'.$e(gaeks_service_slug($s['id'])).'/">'.$e($s['title']).'</a></h2><p>'.$e($s['summary']??$s['description']).'</p></article>';
$body.='</nav><section class="grid gap-4 sm:grid-cols-2">';
foreach($content['branding']['contactGroups'] as $g){$n=preg_replace('/\D/','',$g['whatsappNumber']);if(str_starts_with($n,'0'))$n='62'.substr($n,1);$body.='<article><h2>'.$e($g['name']).'</h2><a href="https://wa.me/'.$e($n).'?text='.rawurlencode('Konsultasi '.$g['name']).'">'.$e($g['whatsappDisplay']).'</a><p><a href="mailto:'.$e($g['email']).'?subject='.rawurlencode($g['name']).'">'.$e($g['email']).'</a></p></article>';}
$body.='</section></main>';$graph=[['@type'=>'Organization','name'=>'GAEKS Freight','url'=>'https://gaeks.com']];require __DIR__.'/_page_template.php';
