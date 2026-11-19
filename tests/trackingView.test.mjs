import test from 'node:test';
import assert from 'node:assert/strict';
import { getTrackingView, readTrackingText, trackingDateText } from '../src/utils/trackingView.ts';

// Isolated adapter fixtures only. These are not production shipment records.
test('empty and structural-only responses never produce a shipment', () => {
  for (const result of [null, {}, { data: null }, { data: {} }, { data: { shipment: {}, milestones: [] } }, { data: { timeline: [null, {}, []] } }]) {
    assert.equal(getTrackingView(result).hasResult, false);
  }
});

test('preserves every existing shipment envelope', () => {
  const shipment = { trackingNumber: 'TEST-REFERENCE', statusLabel: 'TEST-STATUS' };
  for (const result of [{ data: { shipment } }, { data: { tracking: shipment } }, { shipment }, { tracking: shipment }, { data: shipment }]) {
    const view = getTrackingView(result);
    assert.equal(view.reference, shipment.trackingNumber);
    assert.equal(view.status, shipment.statusLabel);
    assert.equal(view.hasResult, true);
  }
});

test('preserves every existing reference and status alias', () => {
  for (const key of ['trackingNumber', 'referenceNumber', 'jobOrderNumber', 'jobOrderNo', 'number']) {
    assert.equal(getTrackingView({ shipment: { [key]: 'TEST' } }).reference, 'TEST');
  }
  for (const key of ['statusLabel', 'status', 'currentStatus']) {
    assert.equal(getTrackingView({ shipment: { [key]: 'TEST' } }).status, 'TEST');
  }
});

test('milestones take precedence and source ordering is never sorted by date', () => {
  const view = getTrackingView({ data: {
    milestones: [{ label: 'Second chronologically', date: '2026-11-20' }, { label: 'First chronologically', date: '2026-11-19' }],
    timeline: [{ label: 'Timeline fallback' }]
  } });
  assert.deepEqual(view.events.map(item => item.label), ['Second chronologically', 'First chronologically']);
});

test('empty nested arrays allow populated shipment/root arrays and timeline fallback', () => {
  assert.equal(getTrackingView({ data: { milestones: [], shipment: { milestones: [{ title: 'Nested' }] } } }).events[0].label, 'Nested');
  assert.equal(getTrackingView({ data: { milestones: [] }, milestones: [{ name: 'Root' }] }).events[0].label, 'Root');
  assert.equal(getTrackingView({ data: { milestones: [], timeline: [{ event: 'Timeline' }] } }).events[0].label, 'Timeline');
});

test('all existing flag aliases map explicitly; current wins conflicting flags', () => {
  for (const flag of ['isCompleted', 'completed']) {
    assert.equal(getTrackingView({ milestones: [{ label: 'Test', [flag]: true }] }).events[0].state, 'completed');
  }
  for (const flag of ['isCurrent', 'current']) {
    assert.equal(getTrackingView({ milestones: [{ label: 'Test', [flag]: true }] }).events[0].state, 'current');
  }
  for (const status of ['COMPLETED', 'CURRENT']) {
    assert.equal(getTrackingView({ milestones: [{ status }] }).events[0].state, status.toLowerCase());
  }
  assert.equal(getTrackingView({ milestones: [{ label: 'Test', completed: true, current: true }] }).events[0].state, 'current');
});

test('unmarked events, false flags, and dates never imply progress', () => {
  for (const flags of [{}, { completed: false }, { current: 'false' }, { isCompleted: 'false' }, { date: '2020-01-01' }, { status: 'UNKNOWN' }]) {
    assert.equal(getTrackingView({ timeline: [{ label: 'Test', ...flags }] }).events[0].state, 'neutral');
  }
});

test('serialized true flags preserve progress without treating false strings as true', () => {
  for (const flag of [1, '1', 'true']) {
    assert.equal(getTrackingView({ milestones: [{ label: 'Test', completed: flag }] }).events[0].state, 'completed');
    assert.equal(getTrackingView({ milestones: [{ label: 'Test', current: flag }] }).events[0].state, 'current');
  }
  for (const flag of [0, '0', 'false', false]) {
    assert.equal(getTrackingView({ milestones: [{ label: 'Test', completed: flag, current: flag }] }).events[0].state, 'neutral');
  }
});

test('retains supplied descriptions/dates and does not fabricate missing ones', () => {
  const view = getTrackingView({ timeline: [{ title: 'Test', timestamp: '2026-11-19', remarks: 'Supplied text' }, { name: 'No date' }] });
  assert.equal(view.events[0].date, '2026-11-19');
  assert.equal(view.events[0].description, 'Supplied text');
  assert.equal(view.events[1].date, '');
  assert.equal(view.events[1].description, '');
});

test('skips malformed event entries without losing valid event order', () => {
  const view = getTrackingView({ milestones: [null, 'bad', { label: 'A' }, [], { note: 'Description only' }, { label: 'B' }] });
  assert.deepEqual(view.events.map(item => item.label), ['A', '', 'B']);
});

test('blank aliases fall through, numbers remain supported, duplicate ids stay unique', () => {
  assert.equal(readTrackingText({ label: '  ', title: 0 }, ['label', 'title']), '0');
  const view = getTrackingView({ milestones: [{ id: 1, label: 'A' }, { id: 1, label: 'B' }] });
  assert.notEqual(view.events[0].key, view.events[1].key);
});

test('date-only values keep their calendar day across timezones', () => {
  const original = process.env.TZ;
  try {
    for (const tz of ['America/Los_Angeles', 'Asia/Jakarta', 'UTC']) {
      process.env.TZ = tz;
      assert.equal(trackingDateText('2026-11-19'), '19 Nov 2026');
    }
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
  assert.equal(trackingDateText('ERP date text'), 'ERP date text');
  assert.equal(trackingDateText(''), '');
});
