import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

export function findRuntime(kind) {
  const candidates = kind === 'php'
    ? [process.env.GAEKS_PHP, 'php', process.platform === 'win32' && join(process.env.LOCALAPPDATA || '', 'GaeksFreight/php-8.3.37/php.exe')]
    : [process.env.GAEKS_PYTHON, 'python3', 'python', process.platform === 'win32' && join(process.env.LOCALAPPDATA || '', 'Programs/Python/Python313/python.exe')];
  for (const executable of candidates.filter(Boolean)) {
    const result = spawnSync(executable, [kind === 'php' ? '-v' : '--version'], { encoding: 'utf8', windowsHide: true });
    if (result.status === 0) return executable;
  }
  return null;
}

const task = process.argv[2];
if (task === 'doctor') {
  let failed = false;
  console.log(`Node ${process.version} (${process.platform}); use Node 22.12+`);
  if (Number(process.versions.node.split('.')[0]) < 22) failed = true;
  for (const kind of ['php', 'python']) {
    const runtime = findRuntime(kind);
    console.log(`${kind}: ${runtime || 'MISSING: see docs/PROJECT_STANDARDS.md'}`);
    if (!runtime) failed = true;
  }
  console.log(`Dependencies: ${existsSync('node_modules/vite') ? 'present' : 'run npm ci'}`);
  process.exitCode = failed ? 1 : 0;
} else if (task === 'design') {
  const python = findRuntime('python');
  if (!python) { console.error('Python 3 required. See docs/PROJECT_STANDARDS.md.'); process.exit(1); }
  const result = spawnSync(python, ['.agents/skills/ui-ux-pro-max/scripts/search.py', ...process.argv.slice(3)], { stdio: 'inherit', windowsHide: true, env: { ...process.env, PYTHONUTF8: '1', PYTHONDONTWRITEBYTECODE: '1' } });
  process.exitCode = result.status ?? 1;
} else if (task === 'php-setup') {
  if (process.platform === 'win32') {
    const result = spawnSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', 'scripts/install-local-php.ps1'], { stdio: 'inherit', windowsHide: true });
    process.exitCode = result.status ?? 1;
  } else if (findRuntime('php')) {
    console.log('PHP detected. Run npm run project:doctor and verify PHP 8.3.');
  } else {
    console.error('Install PHP 8.3 CLI and GD in the environment setup; see docs/PROJECT_STANDARDS.md.'); process.exitCode = 1;
  }
} else if (task === 'guidance') {
  const result = spawnSync(process.execPath, ['node_modules/modern-web-guidance/skills/modern-web-guidance/modern-web.mjs', ...process.argv.slice(3)], { stdio: 'inherit', windowsHide: true, env: { ...process.env, DISABLE_TELEMETRY: '1' } });
  process.exitCode = result.status ?? 1;
}
