$ErrorActionPreference = 'Stop'

$version = '8.3.37'
$directory = Join-Path $env:LOCALAPPDATA "GaeksFreight\php-$version"
$php = Join-Path $directory 'php.exe'
if (Test-Path $php) {
    & $php -v *> $null
    if ($LASTEXITCODE -eq 0) {
        Write-Output "PHP siap: $php"
        exit 0
    }
}

New-Item -ItemType Directory -Force -Path $directory | Out-Null
$archive = Join-Path $env:TEMP "php-$version-nts-Win32-vs16-x64.zip"
$source = "https://downloads.php.net/~windows/releases/php-$version-nts-Win32-vs16-x64.zip"
Write-Output "Mengunduh PHP $version dari $source"
Invoke-WebRequest -Uri $source -OutFile $archive
Expand-Archive -LiteralPath $archive -DestinationPath $directory -Force

& $php -v *> $null
if ($LASTEXITCODE -ne 0) {
    $installer = Join-Path $env:TEMP 'gaeks-vc_redist.x64.exe'
    Write-Output 'Memasang Microsoft Visual C++ Redistributable x64...'
    Invoke-WebRequest -Uri 'https://aka.ms/vc14/vc_redist.x64.exe' -OutFile $installer
    & $installer /install /quiet /norestart
    & $php -v *> $null
    if ($LASTEXITCODE -ne 0) {
        throw 'PHP belum dapat dijalankan. Periksa pemasangan Microsoft Visual C++ Redistributable x64.'
    }
}

Write-Output "PHP siap: $php"
