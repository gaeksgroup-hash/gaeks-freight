<?php
declare(strict_types=1);
require_once __DIR__ . '/_search_intelligence.php';
// Included by page.php; all displayed content comes from the same CMS as React.
$groups=$content['branding']['contactGroups']??[];
$priority=['ppjk','fcl','undername','air','general'];
$rank=static function(string $id)use($priority):int{$n=array_search($id,$priority,true);return $n===false?count($priority):$n;};
usort($groups,static fn($a,$b)=>$rank($a['id'])<=>$rank($b['id']));
$teams=[];
foreach($groups as $g){$n=preg_replace('/\D/','',$g['whatsappNumber']);if(str_starts_with($n,'0'))$n='62'.substr($n,1);if($n!=='')$teams[$n][]=$g;}
$body='<main class="phone-page"><header class="phone-intro"><div class="phone-intro-visual" aria-hidden="true"><img src="/tracking/approved-maritime-illustration.webp" width="398" height="233" alt=""></div><div class="page-shell"><nav class="phone-breadcrumb" aria-label="'.$e($copy['phoneBreadcrumbLabel']).'"><ol><li><a href="/">'.$e($copy['phoneHomeLabel']).'</a></li><li><span aria-hidden="true">›</span><a href="/kontak/">'.$e($copy['phoneContactLabel']).'</a></li><li><span aria-hidden="true">›</span><a href="/kontak/telepon/" aria-current="page">'.$e($copy['phonePageLabel']).'</a></li></ol></nav><div class="phone-intro-grid"><div><p class="phone-eyebrow">'.$e($copy['phoneEyebrow']).'</p><h1>'.$e($copy['phoneHeading']).'</h1></div><p class="phone-intro-copy">'.$e($copy['phoneIntro']).'</p></div></div></header><div class="page-shell phone-layout"><section class="phone-directory-sheet" aria-label="'.$e($copy['phoneDirectoryLabel']).'">';
foreach($teams as $number=>$members){
    $first=$members[0];$ids=array_unique(array_merge(...array_column($members,'serviceIds')));$memberIds=array_column($members,'id');
    $teamTitle=implode(' · ',array_column($members,'name'));
    if(count($members)===1&&$first['id']==='general')$teamTitle=$copy['phoneGeneralTeam'];
    elseif(count($members)>1&&!array_diff($memberIds,['fcl','ppjk','undername']))$teamTitle=$copy['phoneTradeTeam'];
    $waText=$copy['phoneMessage'].' '.$teamTitle.'.';
    $body.='<article class="phone-team"><div class="phone-team-scope"><h2>'.$e($teamTitle).'</h2>'.(in_array('general',$memberIds,true)?'<p class="phone-team-note">'.$e($copy['phoneGeneralNote']).'</p>':'').'<ul>';
    foreach($content['services'] as $s)if(in_array($s['id'],$ids,true))$body.='<li>'.$e($s['title']).'</li>';
    $body.='</ul></div><div class="phone-team-actions"><a class="phone-number" href="tel:+'.$e($number).'">'.$e($first['whatsappDisplay']).'</a><div class="phone-action-pair"><a class="phone-whatsapp" href="https://wa.me/'.$e($number).'?text='.rawurlencode($waText).'" aria-label="'.$e($copy['phoneWhatsapp'].': '.$teamTitle).'">'.$e($copy['phoneWhatsapp']).'</a><a class="phone-call" href="tel:+'.$e($number).'" aria-label="'.$e($copy['phoneCall'].': '.$teamTitle).'">'.$e($copy['phoneCall']).'</a></div>';
    foreach(array_unique(array_column($members,'email')) as $email)$body.='<a class="phone-team-email" href="mailto:'.$e($email).'?subject='.rawurlencode('Konsultasi '.$teamTitle).'&body='.rawurlencode($waText).'">'.$e($email).'</a>';
    $body.='</div></article>';
}
if(!$teams)$body.='<p class="phone-empty">'.$e($copy['phoneEmpty']).'</p>';
$body.='</section><aside class="phone-preparation"><p class="phone-eyebrow">'.$e($copy['phonePreparationLabel']).'</p><h2>'.$e($copy['phonePreparationHeading']).'</h2><ul>';
foreach(['phonePrepareRoute','phonePrepareCargo','phonePrepareTiming'] as $key)$body.='<li>'.$e($copy[$key]).'</li>';
$body.='</ul><p>'.$e($copy['phoneFormIntro']).'</p><a href="/kontak/">'.$e($copy['phoneFormCta']).'</a></aside></div></main>';
$orgSchema = gaeks_si_organization_schema();
$points = gaeks_si_contact_points($content);
if ($points) $orgSchema['contactPoint'] = $points;
$graph=[
    $orgSchema,
    gaeks_si_local_business_schema(),
    gaeks_si_website_schema(),
    ['@type'=>'ContactPage','@id'=>$url.'#webpage','name'=>$title,'description'=>$description,'url'=>$url,'inLanguage'=>'id-ID','isPartOf'=>['@id'=>gaeks_base_url().'/#website']],
    gaeks_si_breadcrumb_schema([
        ['name'=>$copy['phoneHomeLabel'],'item'=>'https://gaeks.com/'],
        ['name'=>$copy['phoneContactLabel'],'item'=>'https://gaeks.com/kontak/'],
        ['name'=>$copy['phonePageLabel'],'item'=>$url]
    ]),
];
