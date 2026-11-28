<?php
$template=file_get_contents(dirname(__DIR__).'/index.html');
$seo=$content['seo']??[];
$isHome=($path??'')==='/' || ($path??'')==='/en/';
$langCode = ($langCode ?? 'id') === 'en' ? 'en' : 'id';
$htmlLang = $langCode === 'en' ? 'en' : 'id';
$ogLocale = $langCode === 'en' ? 'en_US' : 'id_ID';
$ogTitle=$isHome&&$langCode==='id'&&(trim((string)($seo['ogTitle']??''))!=='')?(string)$seo['ogTitle']:$title;
$ogDescription=$isHome&&$langCode==='id'&&(trim((string)($seo['ogDescription']??''))!=='')?(string)$seo['ogDescription']:$description;
$ogImage=gaeks_resolve_public_url((string)(($seo['ogImageUrl']??'')?:'/logos/gaek-symbol.png'));
$heroPoster=trim((string)($content['hero']['imageUrl']??''))?:'/uploads/gaeks-hero-cargo-poster.webp';
$template=preg_replace('~<html\s+lang="[^"]*"~','<html lang="'.$e($htmlLang).'"',$template);
$template=preg_replace('~<title>.*?</title>~s','<title>'.$e($title).'</title>',$template);
$template=preg_replace('~<meta name="(?:description|keywords|robots)"[^>]*>|<link rel="(?:canonical|alternate|icon|shortcut icon|apple-touch-icon)"[^>]*>|<meta property="og:[^"]*"[^>]*>|<script type="application/ld\+json">.*?</script>~s','',$template);
if($isHome||($path??'')==='/layanan/'||($path??'')==='/en/layanan/')$template=preg_replace('~<link rel="preload" as="image"[^>]*>~s','',$template);
$robotsDirective = $robotsDirective ?? (gaeks_staging_site()||empty($seo['robotsIndex'])?'noindex, nofollow':'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
$alternateLinks = is_array($alternateLinks ?? null) ? $alternateLinks : [['hreflang'=>'id-ID','href'=>$url],['hreflang'=>'x-default','href'=>$url]];
$altHtml = '';
foreach ($alternateLinks as $alt) {
    if (!empty($alt['hreflang']) && !empty($alt['href'])) {
        $altHtml .= '<link rel="alternate" hreflang="'.$e((string)$alt['hreflang']).'" href="'.$e((string)$alt['href']).'">';
    }
}
$head=gaeks_head_favicon_tags($content,$e).'<meta name="description" content="'.$e($description).'"><meta name="robots" content="'.$e($robotsDirective).'"><link rel="canonical" href="'.$e($url).'">'.$altHtml.'<meta property="og:type" content="website"><meta property="og:locale" content="'.$e($ogLocale).'"><meta property="og:site_name" content="GAEKS Freight"><meta property="og:title" content="'.$e($ogTitle).'"><meta property="og:description" content="'.$e($ogDescription).'"><meta property="og:url" content="'.$e($url).'"><meta property="og:image" content="'.$e($ogImage).'"><script type="application/ld+json">'.json_encode(['@context'=>'https://schema.org','@graph'=>$graph],JSON_HEX_TAG|JSON_HEX_AMP|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES).'</script>';
if($isHome)$head.='<link rel="preload" as="image" href="'.$e($heroPoster).'" fetchpriority="high">';
elseif(($path??'')==='/layanan/'||($path??'')==='/en/layanan/')$head.='<link rel="preload" as="image" href="/uploads/gaeks-hero-cargo-poster.webp" fetchpriority="high">';
$template=str_replace('</head>',$head.'</head>',$template);
$template=preg_replace_callback('~<div id="root">.*</div>(\s*</body>)~s',fn($match)=>'<div id="root">'.$body.'</div>'.$match[1],$template);
header('Content-Type: text/html; charset=UTF-8');header('Cache-Control: no-cache, must-revalidate');echo $template;
