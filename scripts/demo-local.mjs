import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const preview = process.argv.includes('--preview');
const bundledPhp = process.platform === 'win32'
  ? join(process.env.LOCALAPPDATA || '', 'GaeksFreight', 'php-8.3.37', 'php.exe')
  : '';
const php = process.env.GAEKS_PHP || (bundledPhp && existsSync(bundledPhp) ? bundledPhp : 'php');
const check = spawnSync(php, ['-v'], { encoding: 'utf8', windowsHide: true });

if (check.status !== 0) {
  console.error('PHP 8.3 belum siap. Jalankan npm run demo:setup, lalu coba lagi.');
  console.error((check.stderr || check.error?.message || '').trim());
  process.exit(1);
}

if (preview && !existsSync(join(project, 'dist', 'index.html'))) {
  console.error('Build belum ada. Jalankan npm run build terlebih dahulu.');
  process.exit(1);
}

const phpDir = dirname(php);
const phpOptions = process.platform === 'win32' && php === bundledPhp
  ? ['-d', `extension_dir=${join(phpDir, 'ext')}`, '-d', 'extension=gd']
  : [];
const backendPort = preview ? Number(process.env.GAEKS_PREVIEW_PORT || 4173) : Number(process.env.GAEKS_API_PORT || 8001);
const docroot = join(project, preview ? 'dist' : 'public');
const phpArgs = [
  ...phpOptions,
  '-S', `127.0.0.1:${backendPort}`,
  '-t', docroot,
  ...(preview ? [join(project, 'scripts', 'local-router.php')] : []),
];
const children = [];
const backend = spawn(php, phpArgs, {
  cwd: project,
  env: { ...process.env, GAEKS_LOCAL_DEMO: '1' },
  stdio: 'inherit',
  windowsHide: true,
});
children.push(backend);

if (!preview) {
  const frontend = spawn(process.execPath, [
    join(project, 'node_modules', 'vite', 'bin', 'vite.js'),
    '--host', '127.0.0.1', '--port', '5173', '--strictPort',
  ], {
    cwd: project,
    env: { ...process.env, GAEKS_LOCAL_PHP_URL: 'http://127.0.0.1:8001' },
    stdio: 'inherit',
    windowsHide: true,
  });
  children.push(frontend);
}

console.log(`Demo lokal: http://127.0.0.1:${preview ? backendPort : 5173}/`);
let stopping = false;
function stop(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) if (child.exitCode === null) child.kill();
  process.exitCode = exitCode;
}
for (const child of children) {
  child.on('error', (error) => { console.error(error.message); stop(1); });
  child.on('exit', (code) => { if (!stopping) stop(code || 1); });
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
