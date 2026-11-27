import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { findRuntime } from './project-tools.mjs';
const php = findRuntime('php');
if (!php) { console.error('PHP missing: run npm run project:doctor'); process.exit(1); }
function scan(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? scan(join(dir, e.name)) : e.name.endsWith('.php') ? [join(dir, e.name)] : []); }
const files = [...scan('public'), ...scan('scripts')];
let failed = false;
for (const path of files) {
  const result = spawnSync(php, ['-l', path], { encoding: 'utf8', windowsHide: true });
  if (result.status !== 0) { console.error(path, result.stdout, result.stderr); failed = true; }
}
console.log(`${failed ? 'FAIL' : 'PASS'}: PHP syntax, ${files.length} files.`);
process.exitCode = failed ? 1 : 0;
