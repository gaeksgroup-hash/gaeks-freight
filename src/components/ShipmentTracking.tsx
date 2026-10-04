import React, { useMemo, useState } from 'react';
import { Check, Circle, Loader2, PackageSearch } from 'lucide-react';
import { ShipmentTrackingError, TrackingApiResponse, trackShipment } from '../services/trackingApi';

type DataRecord = Record<string, unknown>;

const record = (value: unknown): DataRecord => value && typeof value === 'object' && !Array.isArray(value) ? value as DataRecord : {};
const list = (value: unknown): unknown[] => Array.isArray(value) ? value : [];
const read = (source: DataRecord, keys: string[], fallback = '—') => {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' || typeof value === 'number') return String(value);
  }
  return fallback;
};
const dateText = (value: unknown) => {
  if (typeof value !== 'string' || !value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
};

export const ShipmentTracking: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<TrackingApiResponse | null>(null);
  const [error, setError] = useState<ShipmentTrackingError | null>(null);
  const [loading, setLoading] = useState(false);

  const view = useMemo(() => {
    const root = record(result);
    const data = record(root.data);
    const shipment = record(data.shipment || data.tracking || root.shipment || root.tracking || data);
    const milestones = list(data.milestones || shipment.milestones || root.milestones).map(record);
    const timeline = list(data.timeline || shipment.timeline || root.timeline).map(record);
    return { shipment, milestones, timeline };
  }, [result]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await trackShipment(query));
    } catch (caught) {
      setError(caught instanceof ShipmentTrackingError ? caught : new ShipmentTrackingError('Layanan tracking belum dapat dihubungi.', 500));
    } finally {
      setLoading(false);
    }
  };

  const shipment = view.shipment;
  const events = view.milestones.length ? view.milestones : view.timeline;
  const hasResult = result && (Object.keys(shipment).length > 0 || events.length > 0);

  return (
    <main className="min-h-screen bg-[#f4f5f1] pt-16 text-[#12363a]">
      <section className="page-shell py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <header>
            <p className="section-label">Shipment tracking</p>
            <h1 className="section-title">Satu pencarian untuk beberapa nomor pengiriman.</h1>
            <p className="section-copy">Masukkan nomor HAWB, B/L, atau kontainer untuk melihat milestone pengiriman.</p>
          </header>

          <div>
            <form onSubmit={submit} className="border border-slate-200 bg-white p-5 sm:p-7">
              <label htmlFor="shipment-reference" className="text-sm font-bold text-[#12363a]">Nomor shipment</label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input id="shipment-reference" value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off" spellCheck={false} placeholder="HAWB, B/L, atau nomor kontainer" className="field flex-1 font-mono uppercase" />
                <button type="submit" disabled={loading || !query.trim()} className="button-primary min-w-36 disabled:cursor-not-allowed disabled:opacity-50">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PackageSearch className="h-4 w-4" />}
                  {loading ? 'Mencari' : 'Lacak'}
                </button>
              </div>
            </form>

            {error && (
              <div role="alert" className="mt-5 border-l-4 border-amber-500 bg-white p-5">
                <p className="font-bold text-[#12363a]">{error.code === 'SHIPMENT_NOT_FOUND' ? 'Shipment belum ditemukan' : 'Pencarian belum berhasil'}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{error.message}</p>
              </div>
            )}

            {hasResult && (
              <section aria-live="polite" className="mt-5 border border-slate-200 bg-white">
                <div className="border-b border-slate-200 bg-[#0b3438] p-5 text-white sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Status terkini</p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <h2 className="text-2xl font-bold">{read(shipment, ['statusLabel', 'status', 'currentStatus'], 'Perjalanan shipment')}</h2>
                    <span className="font-mono text-sm text-slate-300">{read(shipment, ['trackingNumber', 'referenceNumber', 'jobOrderNumber', 'jobOrderNo', 'number'], result?.query || query)}</span>
                  </div>
                </div>

                {events.length > 0 && (
                  <div className="p-5 sm:p-7">
                    <h3 className="font-bold">Milestone</h3>
                    <ol className="mt-5 border-l border-slate-300 pl-5">
                      {events.map((item, index) => {
                        const completed = Boolean(item.isCompleted || item.completed || item.status === 'COMPLETED');
                        const current = Boolean(item.isCurrent || item.current || item.status === 'CURRENT');
                        return (
                          <li key={read(item, ['id'], String(index))} className="relative pb-6 last:pb-0">
                            <span className="absolute -left-[29px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                              {completed ? <Check className="h-4 w-4 text-cyan-700" /> : <Circle className={current ? 'h-3 w-3 fill-cyan-600 text-cyan-600' : 'h-3 w-3 text-slate-300'} />}
                            </span>
                            <p className="text-sm font-bold">{read(item, ['label', 'title', 'name', 'event', 'status'])}</p>
                            <p className="mt-1 text-xs text-slate-500">{dateText(item.date || item.timestamp || item.occurredAt || item.completedAt)}</p>
                            {read(item, ['note', 'description', 'remarks'], '') && <p className="mt-2 text-sm leading-6 text-slate-600">{read(item, ['note', 'description', 'remarks'], '')}</p>}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                )}
              </section>
            )}

            {result && !hasResult && !error && <p className="mt-5 border-t border-slate-300 py-5 text-sm text-slate-600">Belum ada milestone untuk nomor ini.</p>}
          </div>
        </div>
      </section>
    </main>
  );
};
