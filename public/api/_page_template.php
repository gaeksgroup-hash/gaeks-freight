<?php
$template=file_get_contents(dirname(__DIR__).'/index.html');
$seo=$content['seo']??[];
$isHome=($path??'')==='/';
$ogTitle=$isHome&&(trim((string)($seo['ogTitle']??''))!=='')?(string)$seo['ogTitle']:$title;
$ogDescription=$isHome&&(trim((string)($seo['ogDescription']??''))!=='')?(string)$seo['ogDescription']:$description;
$ogImage=gaeks_resolve_public_url((string)(($seo['ogImageUrl']??'')?:'/logos/gaek-symbol.png'));
$keywords=trim((string)($seo['keywords']??''));
$heroPoster=trim((string)($content['hero']['imageUrl']??''))?:'/uploads/gaeks-hero-cargo-poster.webp';
$template=preg_replace('~<title>.*?</title>~s','<title>'.$e($title).'</title>',$template);
$template=preg_replace('~<meta name="(?:description|keywords|robots)"[^>]*>|<link rel="(?:canonical|icon|shortcut icon|apple-touch-icon)"[^>]*>|<meta property="og:[^"]*"[^>]*>|<script type="application/ld\+json">.*?</script>~s','',$template);
if($isHome||($path??'')==='/layanan/')$template=preg_replace('~<link rel="preload" as="image"[^>]*>~s','',$template);
$head=gaeks_head_favicon_tags($content,$e).'<meta name="description" content="'.$e($description).'">'.($keywords!==''?'<meta name="keywords" content="'.$e($keywords).'">':'').'<meta name="robots" content="'.(gaeks_staging_site()||empty($seo['robotsIndex'])?'noindex, nofollow':'index, follow').'"><link rel="canonical" href="'.$e($url).'"><link rel="alternate" hreflang="id-ID" href="'.$e($url).'"><link rel="alternate" hreflang="x-default" href="'.$e($url).'"><meta property="og:type" content="website"><meta property="og:locale" content="id_ID"><meta property="og:site_name" content="GAEKS Freight"><meta property="og:title" content="'.$e($ogTitle).'"><meta property="og:description" content="'.$e($ogDescription).'"><meta property="og:url" content="'.$e($url).'"><meta property="og:image" content="'.$e($ogImage).'"><script type="application/ld+json">'.json_encode(['@context'=>'https://schema.org','@graph'=>$graph],JSON_HEX_TAG|JSON_HEX_AMP|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES).'</script>';
if($isHome)$head.='<link rel="preload" as="image" href="'.$e($heroPoster).'" fetchpriority="high">';
elseif(($path??'')==='/layanan/')$head.='<link rel="preload" as="image" href="/uploads/gaeks-hero-cargo-poster.webp" fetchpriority="high">';
$template=str_replace('</head>',$head.'</head>',$template);
$template=preg_replace_callback('~<div id="root">.*</div>(\s*</body>)~s',fn($match)=>'<div id="root">'.$body.'</div>'.$match[1],$template);
header('Content-Type: text/html; charset=UTF-8');header('Cache-Control: no-store');echo $template;
