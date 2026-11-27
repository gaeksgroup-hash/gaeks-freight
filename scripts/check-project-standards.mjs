import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(readFileSync('docs/SKILL_SOURCES.json', 'utf8'));
const required = ['AGENTS.md', 'CLAUDE.md', 'DESIGN.md', 'docs/PROJECT_STANDARDS.md'];
const errors = required.filter(path => !existsSync(path)).map(path => `Missing ${path}`);
let count = 0;
for (const source of manifest.sources) {
  for (const [path, expected] of Object.entries(source.files)) {
    if (!existsSync(path)) { errors.push(`Missing ${path}`); continue; }
    const actual = createHash('sha256').update(readFileSync(path)).digest('hex');
    if (actual !== expected) errors.push(`Changed snapshot ${path}`);
    count++;
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS: project instructions and ${count} pinned skill files verified.`);
