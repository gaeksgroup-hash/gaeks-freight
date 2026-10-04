export interface TrackingApiError {
  code?: string;
  message?: string;
}

export interface TrackingApiResponse {
  success?: boolean;
  query?: string;
  data?: unknown;
  shipment?: unknown;
  tracking?: unknown;
  milestones?: unknown[];
  timeline?: unknown[];
  error?: TrackingApiError;
  meta?: { requestId?: string };
}

const TRACKING_ENDPOINT = 'https://erp.gaeks.com/api/v1/public/tracking';

export class ShipmentTrackingError extends Error {
  status: number;
  code?: string;
  requestId?: string;

  constructor(message: string, status: number, code?: string, requestId?: string) {
    super(message);
    this.name = 'ShipmentTrackingError';
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}

export async function trackShipment(reference: string): Promise<TrackingApiResponse> {
  const query = reference.trim();
  if (!query) throw new ShipmentTrackingError('Masukkan nomor shipment terlebih dahulu.', 400, 'EMPTY_QUERY');

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(TRACKING_ENDPOINT + '?q=' + encodeURIComponent(query), {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal
    });
    const body = await response.json().catch(() => ({})) as TrackingApiResponse;

    if (!response.ok || body.success === false) {
      throw new ShipmentTrackingError(
        body.error?.message || 'Shipment belum ditemukan.',
        response.status,
        body.error?.code,
        body.meta?.requestId
      );
    }
    return body;
  } catch (error) {
    if (error instanceof ShipmentTrackingError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ShipmentTrackingError('Server tracking belum merespons. Coba kembali.', 408, 'TIMEOUT');
    }
    throw new ShipmentTrackingError('Layanan tracking belum dapat dihubungi. Coba beberapa saat lagi.', 503, 'NETWORK_ERROR');
  } finally {
    window.clearTimeout(timeout);
  }
}
