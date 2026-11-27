<?php
$template=file_get_contents(dirname(__DIR__).'/index.html');
$template=preg_replace('~<title>.*?</title>~s','<title>'.$e($title).'</title>',$template);
$template=preg_replace('~<meta name="(?:description|robots)"[^>]*>|<link rel="canonical"[^>]*>|<meta property="og:[^"]*"[^>]*>|<script type="application/ld\+json">.*?</script>~s','',$template);
$head='<meta name="description" content="'.$e($description).'"><meta name="robots" content="'.(gaeks_staging_site()||empty($content['seo']['robotsIndex'])?'noindex, nofollow':'index, follow').'"><link rel="canonical" href="'.$e($url).'"><meta property="og:title" content="'.$e($title).'"><meta property="og:description" content="'.$e($description).'"><meta property="og:url" content="'.$e($url).'"><script type="application/ld+json">'.json_encode(['@context'=>'https://schema.org','@graph'=>$graph],JSON_HEX_TAG|JSON_HEX_AMP|JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES).'</script>';
$template=str_replace('</head>',$head.'</head>',$template);
$template=preg_replace_callback('~<div id="root">.*</div>(\s*</body>)~s',fn($match)=>'<div id="root">'.$body.'</div>'.$match[1],$template);
header('Content-Type: text/html; charset=UTF-8');header('Cache-Control: no-store');echo $template;
