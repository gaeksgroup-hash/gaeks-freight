# Shipment Tracking Integration

## Public route

- Frontend hash route: `/#tracking`
- Direct SPA route: `/tracking`
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
- `timeline` is preferred for the step view. `milestones` is used when a timeline is unavailable.
- A `404 SHIPMENT_NOT_FOUND` response is shown as a normal empty result.
- Network and timeout failures have separate user messages.
- No result is saved to cookies or browser storage.
- The request ID is shown on failures to support ERP troubleshooting.

## Performance

- The tracking page is loaded as a separate JavaScript chunk.
- No ERP request is made until the visitor submits a reference.
- The request timeout is 12 seconds.
- Static hashed assets use long lived browser cache headers; `index.html` revalidates.
