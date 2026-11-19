import type { TrackingApiResponse } from '../services/trackingApi';

type DataRecord = Record<string, unknown>;
export type MilestoneState = 'completed' | 'current' | 'neutral';

const record = (value: unknown): DataRecord => value && typeof value === 'object' && !Array.isArray(value) ? value as DataRecord : {};

export const readTrackingText = (source: DataRecord, keys: string[], fallback = '') => {
  for (const key of keys) {
    const value = source[key];
    if ((typeof value === 'string' || typeof value === 'number') && String(value).trim()) return String(value).trim();
  }
  return fallback;
};

const firstRecord = (values: unknown[]) => values.map(record).find((value) => Object.keys(value).length > 0) || {};
const firstList = (values: unknown[]): unknown[] => values.find((value) => Array.isArray(value) && value.length > 0) as unknown[] || [];
const isTrueFlag = (value: unknown) => value === true || value === 1 || value === 'true' || value === '1';

const milestoneState = (item: DataRecord): MilestoneState => {
  // Explicit ERP flags only; dates and array positions do not imply progress.
  if (isTrueFlag(item.isCurrent) || isTrueFlag(item.current) || item.status === 'CURRENT') return 'current';
  if (isTrueFlag(item.isCompleted) || isTrueFlag(item.completed) || item.status === 'COMPLETED') return 'completed';
  return 'neutral';
};

export const getTrackingView = (result: TrackingApiResponse | null) => {
  const root = record(result);
  const data = record(root.data);
  const shipment = firstRecord([data.shipment, data.tracking, root.shipment, root.tracking, data]);
  const milestones = firstList([data.milestones, shipment.milestones, root.milestones]);
  const timeline = firstList([data.timeline, shipment.timeline, root.timeline]);
  // Keep the existing milestone-first precedence and the ERP's original order.
  const events = (milestones.length ? milestones : timeline).map((value, index) => {
    const item = record(value);
    return {
      key: `${readTrackingText(item, ['id'], 'event')}-${index}`,
      label: readTrackingText(item, ['label', 'title', 'name', 'event', 'status']),
      date: readTrackingText(item, ['date', 'timestamp', 'occurredAt', 'completedAt']),
      description: readTrackingText(item, ['note', 'description', 'remarks']),
      state: milestoneState(item)
    };
  }).filter((item) => item.label || item.date || item.description);

  const reference = readTrackingText(shipment, ['trackingNumber', 'referenceNumber', 'jobOrderNumber', 'jobOrderNo', 'number']);
  const status = readTrackingText(shipment, ['statusLabel', 'status', 'currentStatus']);
  return { reference, status, events, hasResult: Boolean(reference || status || events.length) };
};

export const trackingDateText = (value: string) => {
  if (!value) return '';
  // Date-only values must not move to a different day through timezone conversion.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('id-ID', { dateStyle: 'medium' });
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
};
