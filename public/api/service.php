<?php
declare(strict_types=1);
require_once __DIR__ . '/_bootstrap.php';
$content=gaeks_public_content(gaeks_read_json_file(gaeks_content_file(),[]));
$slug=(string)($_GET['slug']??'');$service=null;
foreach($content['services'] as $item)if(gaeks_service_slug($item['id'])===$slug){$service=$item;break;}
if(!$service){http_response_code(404);header('X-Robots-Tag: noindex');echo 'Layanan tidak ditemukan atau belum diterbitkan.';exit;}
$s=$service;$e=fn($v)=>htmlspecialchars((string)$v,ENT_QUOTES|ENT_SUBSTITUTE,'UTF-8');
$copy=array_replace(gaeks_read_json_file(__DIR__.'/ui_copy_seed.json',[]),$content['siteSettings']['uiCopy']??[]);
$url=$s['canonical']??('https://gaeks.com/layanan/'.$slug.'/');if(!$url)$url='https://gaeks.com/layanan/'.$slug.'/';
$title=($s['seoTitle']??'')?:($s['title'].' | GAEKS Freight');$description=($s['metaDescription']??'')?:($s['summary']??$s['description']);
$rawDir=strtolower((string)($_GET['direction']??''));$direction=($rawDir==='impor'||$rawDir==='ekspor')?$rawDir:'';
$rawCity=strtolower((string)($_GET['city']??''));$city=$rawCity==='jakarta'?'Jakarta':($rawCity==='semarang'?'Semarang':($rawCity==='surabaya'?'Surabaya':''));
$contact=gaeks_build_service_contact($content,$s,$copy,$direction,$city);
$heroSummary=trim((string)($s['heroSummary']??''))?:(trim((string)($s['landingDescription']??''))?:($s['tagline']??$s['description']));
$body='<main class="service-detail"><header class="service-overview"><div class="page-shell"><a class="service-back" href="/layanan/">'.$e($copy['serviceBack']).'</a><div class="service-overview-grid"><div class="service-intro"><p class="service-category">'.$e($s['category']??'').'</p><h1>'.$e(($s['landingTitle']??'')?:$s['title']).'</h1><p class="service-summary">'.$e($heroSummary).'</p><div class="service-actions-row"><a class="service-primary" href="'.$e($contact['whatsappUrl']).'">'.$e($contact['whatsappLabel']).'</a><a class="service-email-cta" href="'.$e($contact['emailUrl']).'">'.$e($contact['emailLabel']).'</a></div><p class="service-email-copy-row">'.$e($contact['email']).'</p><p class="service-reassurance">'.$e($copy['serviceReassurance']??'').'</p></div><figure class="service-photo"><img width="960" height="800" fetchpriority="high" src="'.$e($s['imageUrl']).'" alt="'.$e($s['imageAlt']??'').'"><figcaption>'.$e($s['title']).'</figcaption></figure></div></div></header><div class="page-shell service-content">';
foreach($s['sections']??[] as $section)$body.='<section class="my-8"><h2 class="text-2xl font-bold">'.$e($section['title']).'</h2><p class="mt-4 whitespace-pre-line leading-7">'.$e($section['body']).'</p></section>';
$body.='<section class="my-8"><h2>'.$e($copy['scopeHeading']).'</h2><ul>';foreach($s['features']??[] as $feature)$body.='<li>'.$e($feature).'</li>';$body.='</ul><p>'.$e($s['equipment']??'').'</p><p>'.$e($s['commodities']??'').'</p></section>';
if(!empty($s['compare'])){$body.='<section class="my-8 overflow-x-auto"><h2>Perbandingan pilihan</h2><table><thead><tr><th>Pilihan</th><th>Sesuai untuk</th><th>Data awal</th></tr></thead><tbody>';foreach($s['compare'] as $row){$body.='<tr>';foreach($row as $cell)$body.='<td class="p-3">'.$e($cell).'</td>';$body.='</tr>';}$body.='</tbody></table></section>';}
foreach($s['evidence']??[] as $p)$body.='<section class="my-6 bg-white p-6"><h2>'.$e($p['title']).'</h2><p>'.$e($p['detail']).'</p><p>'.$e($p['source']).' · '.$e($p['date']).'</p></section>';
if(!empty($s['faq'])){$body.='<section><h2>'.$e($copy['faqHeading']).'</h2>';foreach($s['faq'] as [$q,$a])$body.='<details class="border-b py-4"><summary>'.$e($q).'</summary><p>'.$e($a).'</p></details>';$body.='</section>';}
$body.='<p class="my-8"><a href="'.$e($contact['whatsappUrl']).'">'.$e($contact['whatsappLabel']).'</a> · <a href="'.$e($contact['emailUrl']).'">'.$e($contact['email']).'</a></p></div></main>';
$graph=[['@type'=>'Organization','@id'=>'https://gaeks.com/#organization','name'=>'GAEKS Freight','url'=>'https://gaeks.com','email'=>$contact['email'],'telephone'=>$contact['whatsappDisplay']],['@type'=>'Service','name'=>$s['title'],'description'=>$s['summary']??$s['description'],'url'=>$url,'provider'=>['@id'=>'https://gaeks.com/#organization']],['@type'=>'BreadcrumbList','itemListElement'=>[['@type'=>'ListItem','position'=>1,'name'=>'Beranda','item'=>'https://gaeks.com/'],['@type'=>'ListItem','position'=>2,'name'=>'Layanan','item'=>'https://gaeks.com/layanan/'],['@type'=>'ListItem','position'=>3,'name'=>$s['title'],'item'=>$url]]]];
if(!empty($s['faq']))$graph[]=['@type'=>'FAQPage','mainEntity'=>array_map(fn($row)=>['@type'=>'Question','name'=>$row[0],'acceptedAnswer'=>['@type'=>'Answer','text'=>$row[1]]],$s['faq'])];
require __DIR__ . '/_page_template.php';
