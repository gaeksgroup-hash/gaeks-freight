# Shipment Tracking Integration

## Public route

- Frontend hash route: `/#tracking`
- Canonical SPA route: `/tracking/` (also accepts `/tracking`)
- Component: `src/components/ShipmentTracking.tsx`
- API client: `src/services/trackingApi.ts`

Hostinger rewrites `/tracking` to `index.html` through `public/.htaccess`.

## ERP API

The client calls:

```text
GET https://erp.gaeks.com/api/v1/public/tracking?q={reference}
Accept: application/json
```

The ERP normalizes AWB/HAWB, B/L/HBL, GJO, container, and document references. The frontend does not duplicate this matching logic.

## Response handling

- A successful response is adapted defensively because shipment fields may be nested below `data`, `shipment`, or `tracking`.
- `milestones` is preferred for the step view, preserving the existing renderer's precedence. `timeline` is used when milestones are unavailable or empty. Events retain their source array order.
- A `404 SHIPMENT_NOT_FOUND` response is shown as a normal empty result.
- Network and timeout failures have separate user messages.
- No result is saved to cookies or browser storage.
- The request ID is shown on failures to support ERP troubleshooting.

## Tracking UI

- The search, summary, and results are implemented in the existing lazy-loaded component; scoped styles live in `src/components/ShipmentTracking.css`.
- `src/utils/trackingView.ts` adapts only the reference, status, event labels, dates, and descriptions already handled by the original page. Empty containers and malformed event entries do not create a shipment result.
- Completed and current indicators use explicit true flags (including serialized `1` / `true`) or the existing `COMPLETED` / `CURRENT` values. False flags, including serialized `0` / `false`, remain neutral. Current takes precedence if both are present. Dates and array positions do not determine status.
- At 1024px and wider the timeline is horizontal. Long workflows scroll inside the keyboard-focusable list. Smaller screens use a vertical timeline, and long text wraps within the available width.
- The default tracking navbar uses an optimized crop of the supplied official GAEKS logo on white; a custom operator-configured navbar logo still takes precedence. Other pages retain the existing navbar logo and styling; the navigation, language selector, WhatsApp destination, and footer are reused.
- The hero on desktop and mobile uses the approved ship illustration extracted directly from `Tracking_Desktop_Mobile_Approved_Reference.png` in the supplied ZIP (crop bounds: x=485..883, y=77..310). A 22 KB WebP at the native crop resolution retains the approved composition without upscaling the asset. CSS edge masks blend the illustration into a pale maritime background; it is not presented as a separate photo panel. No repository poster, generated illustration, video, or animation dependency is used.
- No ETA, route, map, container details, sample shipment, or invented workflow is included. All result fields require a successful lookup. Missing fields stay absent.
- No result persistence, API contract, authentication, database, or backend changes are introduced.

## Local validation

```bash
npm run build
node --experimental-strip-types --test tests/trackingView.test.mjs
git diff --check
```

Browser validation may intercept the ERP endpoint with isolated fixtures to exercise states and layouts. Such fixtures are test data, not production shipment evidence, and must not be added to application responses. A successful live lookup still requires ERP network access and a valid production reference.

## Performance

- The tracking page is loaded as a separate JavaScript chunk.
- No ERP request is made until the visitor submits a reference.
- The request timeout is 12 seconds.
- Static hashed assets use long lived browser cache headers; `index.html` revalidates.
- The illustration is 22,328 bytes and the official logo is 57,946 bytes. No video, extra font request, animation library, or dependency is added by the redesign.
- Tracking reserves the same minimum height while its lazy chunk loads, avoiding footer movement. The result uses its own bounded appearance transition and opts out of the app's second scroll reveal. Reduced motion disables the transition and loading spinner animation.

## Implementation audit and validation — 20 November 2026

The existing React/TypeScript page is lazy-loaded within the shared app navigation, language controls, operator-managed branding, and footer. The public ERP client performs the lookup; the frontend has no tracking database or workflow engine. The redesign preserves that architecture, the endpoint, query encoding, 12-second timeout, supported field aliases, source event order, and milestone-first precedence. Latest changes from production branch `main` were retained before release, including canonical navigation and contact-click measurement.

The approved ZIP supplies both the official logo and the ship illustration. The opaque official logo was selected for clean edges on white after comparison with the transparent version. The hero uses CSS masks and matching sky colors to blend the approved ship into the page. The result is implemented as accessible HTML/CSS with the existing Lucide icons; the asset board is not displayed as a UI image. Unsupported reference content (fixed five-step workflow, ETA, route map, mode/container details, promotional claims) is omitted.

| Changed file | Purpose |
| --- | --- |
| `src/components/ShipmentTracking.tsx` | Search states, conditional shipment summary, responsive ERP milestone rendering and announcements |
| `src/components/ShipmentTracking.css` | Tracking-only hero blending, search, horizontal/vertical timeline, focus and reduced-motion styles |
| `src/utils/trackingView.ts` | Defensive existing-field adapter, explicit progress states and date-only formatting |
| `src/components/Navbar.tsx` | White tracking header and authentic default logo; retain custom branding, current navigation and contact behavior |
| `src/App.tsx` | Reserve tracking height during lazy loading to prevent footer movement |
| `public/logos/gaeks-tracking-official.webp` | Optimized official logo from the supplied ZIP |
| `public/tracking/approved-maritime-illustration.webp` | Optimized crop of the supplied approved ship artwork |
| `tests/trackingView.test.mjs` | 12 focused data-adapter regression tests using Node's built-in test runner |
| `docs/TRACKING_INTEGRATION.md` | Correct source precedence and document integration, asset provenance and validation |

Validation completed locally on the production build:

- `npm run build`: passed, including TypeScript, Vite and the existing SEO generation step.
- `node --experimental-strip-types --test tests/trackingView.test.mjs`: 12 tests passed.
- `git diff HEAD --check`: passed.
- Playwright/Chromium: 94 checks passed, covering initial/blank, whitespace, loading, success, missing fields, empty, not-found, invalid, server, network and timeout states; query encoding; event order; reduced motion; focus; menu/Escape; image loading and shared-page navigation smoke checks.
- Responsive checks: 320, 375, 390, 430, 768, 1024, 1280 and 1440px. Long reference/status strings and 12-event workflows fit without page overflow. Long desktop workflows scroll inside the focusable timeline.
- Separate final visual checks confirmed full connector segments, a single result appearance transition, custom operator logo precedence and canonical navigation. Desktop/mobile search and result screenshots were captured; result screenshots are explicitly marked as test fixtures.
- Local initial-load CLS was 0 at 320, 390, 768 and 1440px. No video or pre-search ERP request was present. The tracking chunk remains lazy-loaded (about 3.1 KB JS + 2.7 KB CSS, gzip); artwork and logo total about 80 KB.
- No uncaught JavaScript exceptions or broken tracking-page images were found. Console resource errors were present for deliberately simulated API failures and environment-blocked external Google Translate / unrelated Unsplash requests.

Limits: production ERP and website HTTP requests were blocked by the execution environment's CONNECT proxy (403). Browser-based live verification was also unavailable. Successful production shipment data, real-network performance and the hosting deployment must therefore be verified separately; fixture screenshots do not establish live shipment accuracy. Local navigation checks do not constitute full PHP/operator or translation-service testing.
