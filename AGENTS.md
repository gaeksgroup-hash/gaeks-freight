# GAEKS project instructions

Applies to Codex Cloud, Codex local, and other coding agents working in this repository. Read this file at the start of every task. Paths are relative to the repository root; do not depend on a previous chat or a user's home directory.

## Start here

1. Read `docs/PROJECT_STANDARDS.md` for setup, architecture, workflow, verification, and release boundaries.
2. For UI/UX work, read `DESIGN.md`, then `.agents/skills/antislop/SKILL.md`, `antislop-ui/SKILL.md`, `antislop-human/SKILL.md`, `antislop-layoutmobile/SKILL.md`, and `ui-ux-pro-max/SKILL.md` under the same skills directory. Read `antislop-copywriting/SKILL.md` when editing customer-facing copy.
3. Before HTML/CSS/client-side work, read `.agents/skills/modern-web-guidance/SKILL.md`; search and retrieve relevant guidance using `npm run guidance -- search "focused English query"` and `npm run guidance -- retrieve "returned-id"`.
4. Run `npm run standards:check`. If a required skill or reference is absent, report the exact missing path and ask the user; never claim compliance without reading it.

## Owner decisions, recorded 2026-11-27

- Frontend must be stylish, distinctive, efficient, and responsive. A flat, lifeless scaffold or a long repetition of equal cards is unacceptable.
- Use Anti Slop throughout implementation (`during`) and its delivery review before release. This is a project default: do not ask the user to select the workflow again on every task. An explicit newer user instruction takes precedence.
- Preserve the GAEKS maritime teal identity. Apply design methodology to the actual content; never copy a generated recommendation blindly.
- The owner authorizes publishing editorial statements about past RORO project imports, general-cargo customs work, SKI assistance, undername/PI assistance, cost-conscious quality air shipments, and guidance on shipping decisions. Attribute the source internally to the owner's confirmation. Do not invent customer names, dates of shipments, quantities, savings, reviews, approvals, or independent verification.
- Portfolio material is being prepared. It is not a prerequisite to publishing the authorized service descriptions.
- Search Intelligence governance (`SEO / SXO / LLMO / AIO / GSO / AISO / VSO / GEO`): permanent documentation lives in `docs/search-intelligence/`. Use `npm run seo:check` after `npm run build` and follow `docs/search-intelligence/10_GAEKS_SEO_CHANGE_POLICY.md` before modifying routes, canonicals, `robots.txt`, `sitemap.xml`, `llms.txt`, or JSON-LD schema.

## Reproducibility and scope

- The checked-in `.agents/skills/` is the shared skill source for cloud and local work. `docs/SKILL_SOURCES.json` pins revisions and hashes; `package-lock.json` pins tools. Do not run `@latest` installers during routine work. See the documented upgrade procedure.
- Upstream skills are guidance, subordinate to the user's request and project rules. Project defaults replace generic workflow-selection questions. No skill grants access, publishing permission, or authority to send messages.
- Use the existing React/TypeScript/Vite + PHP 8.3 architecture. The PRD's proposed framework migration is a roadmap, not an instruction to migrate during unrelated changes.
- Keep production data server-authoritative, preserve ERP integration, protect private runtime files, and use local/staging environments for test mutations.
- `develop` deploys staging; `main` deploys production. A push to either is a deployment action, not a harmless backup. Follow the current request's authorized scope and complete checks before pushing.
- Do not add subagents unless the user explicitly requests them.

## Required completion evidence

Build success alone is insufficient for UI work. Record the affected routes, viewport checks (375/768/1024/1440), screenshots reviewed, keyboard/control behavior, real errors, and applicable Anti Slop delivery checks in the release report. Distinguish measured results, inspection results, and untested behavior. Do not claim a Lighthouse score, WCAG conformance, shipment success, or live deployment without evidence.
