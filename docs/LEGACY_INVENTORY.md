# GAEKS Legacy Application Inventory

Baseline: `legacy-baseline-2026-09-17`

## Runtime

- Vite 5 and React 18 single-page application.
- Tailwind CSS 3 and TypeScript 5.
- Hash-based client navigation.
- Current package scripts: `dev`, `build`, and `preview`.

## Features to migrate

- Public homepage and hero content.
- Services, calculator, logistics map, news, contact, and multilingual UI.
- Operator interface, branding/content editing, media handling, and subscriber data.

## Legacy persistence and endpoints

- Browser storage is used for client/operator state.
- JSON content exists under `public/api` and `public/data`.
- PHP endpoints exist at `public/api/sync.php` and `public/api/upload.php`.
- The upload and sync endpoints require security review before any production use.

## Migration risks

- Server-side authentication and authorization are not yet implemented.
- PostgreSQL is not yet configured.
- Public writable media and flat-file persistence must not be carried into the new architecture.
- Existing rebuild/update scripts are historical tooling and should remain untouched until their migration value is assessed.

## Phase 1 decisions

- Keep the legacy Vite app runnable while the replacement is built.
- Treat PostgreSQL as the future source of truth.
- Migrate content and behavior deliberately; do not bulk-copy insecure persistence or public mutation endpoints.