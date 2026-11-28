import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Loader2, Package, PackageSearch, Search } from 'lucide-react';
import { ShipmentTrackingError, TrackingApiResponse, trackShipment } from '../services/trackingApi';
import { getTrackingView, trackingDateText } from '../utils/trackingView';
import './ShipmentTracking.css';

export const ShipmentTracking: React.FC = () => {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [result, setResult] = useState<TrackingApiResponse | null>(null);
  const [error, setError] = useState<ShipmentTrackingError | null>(null);
  const [loading, setLoading] = useState(false);
  const view = useMemo(() => getTrackingView(result), [result]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;
    setSubmittedQuery(query.trim());
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

  return (
    <div className="shipment-tracking">
      <header className="tracking-hero">
        <div className="tracking-hero__visual" aria-hidden="true">
          <img src="/tracking/approved-maritime-illustration.webp" alt="" width="398" height="233" decoding="async" />
        </div>
        <div className="page-shell tracking-hero__inner">
          <div className="tracking-hero__copy">
            <p className="tracking-eyebrow">Pelacakan Pengiriman Terintegrasi</p>
            <h1>Pelacakan Pengiriman</h1>
            <p className="tracking-hero__description">Masukkan nomor HAWB, B/L, atau kontainer untuk melihat milestone pengiriman Anda.</p>
          </div>
        </div>
      </header>

      <div className="page-shell tracking-content">
        <div className="tracking-search-wrap">
          <form onSubmit={submit} className="tracking-search" aria-label="Lacak pengiriman" aria-busy={loading}>
            <label htmlFor="shipment-reference" className="sr-only">Nomor pengiriman</label>
            <div className="tracking-search__controls">
              <div className="tracking-search__field">
                <Search size={20} aria-hidden="true" />
                <input
                  id="shipment-reference"
                  name="shipment-reference"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                  required
                  readOnly={loading}
                  aria-describedby="shipment-reference-help"
                  aria-invalid={error?.status === 400 || undefined}
                  placeholder="HAWB, B/L, atau nomor kontainer"
                />
              </div>
              <button type="submit" disabled={loading || !query.trim()}>
                <span>{loading ? 'Mencari' : 'Lacak Pengiriman'}</span>
                {loading ? <Loader2 size={18} className="tracking-spinner" aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
              </button>
            </div>
          </form>
          <p id="shipment-reference-help">Referensi AWB/HAWB, B/L/HBL, GJO, kontainer, atau dokumen.</p>
        </div>

        <div className="tracking-announcement sr-only" role="status" aria-live="polite" aria-atomic="true">
          {loading ? 'Sedang mencari shipment.' : result ? view.hasResult ? `Hasil shipment ditemukan. ${view.status}. ${view.events.length} milestone tersedia.` : 'Belum ada milestone untuk nomor ini.' : ''}
        </div>

        {loading && <p className="tracking-search-status" aria-hidden="true">Mengambil data shipment…</p>}

        {error && (
          <div role="alert" className="tracking-feedback">
            <p className="tracking-feedback__title">{error.code === 'SHIPMENT_NOT_FOUND' ? 'Shipment belum ditemukan' : 'Pencarian belum berhasil'}</p>
            <p>{error.message}</p>
            {error.requestId && <p className="tracking-request-id">ID permintaan: <span className="notranslate" translate="no">{error.requestId}</span></p>}
          </div>
        )}

        {result && view.hasResult && (
          <section className="tracking-result" data-reveal="custom" aria-labelledby="tracking-result-reference">
            <div className="tracking-result__summary">
              <div className="tracking-result__identity">
                <span className="tracking-result__icon" aria-hidden="true"><PackageSearch size={25} strokeWidth={1.7} /></span>
                <div className="tracking-result__reference">
                  <p className="tracking-label">Nomor shipment</p>
                  <h2 id="tracking-result-reference" className="notranslate" translate="no">{view.reference || (typeof result.query === 'string' && result.query.trim()) || submittedQuery}</h2>
                </div>
              </div>
              {view.status && <div className="tracking-result__status">
                <p className="tracking-label">Status terkini</p>
                <p className="tracking-status-label">{view.status}</p>
              </div>}
            </div>

            {view.events.length > 0 ? (
              <div className="tracking-milestones">
                <div className="tracking-milestones__heading">
                  <h3 id="tracking-milestones-title">Milestone pengiriman</h3>
                  <ul className="tracking-legend" aria-label="Keterangan milestone">
                    <li><span className="tracking-legend__dot is-completed" />Selesai</li>
                    <li><span className="tracking-legend__dot is-current" />Terkini</li>
                    <li><span className="tracking-legend__dot" />Lainnya</li>
                  </ul>
                </div>
                <ol className="tracking-timeline" aria-labelledby="tracking-milestones-title" tabIndex={0}>
                  {view.events.map((item) => (
                    <li key={item.key} className={`tracking-milestone is-${item.state}`} aria-current={item.state === 'current' ? 'step' : undefined}>
                      <div className="tracking-milestone__track" aria-hidden="true">
                        <span className="tracking-milestone__node">
                          {item.state === 'completed' ? <Check size={19} strokeWidth={2.5} /> : item.state === 'current' ? <Package size={19} strokeWidth={1.8} /> : <span className="tracking-milestone__dot" />}
                        </span>
                      </div>
                      <div className="tracking-milestone__body">
                        {item.state !== 'neutral' && <span className="tracking-milestone__state">{item.state === 'current' ? 'Terkini' : 'Selesai'}</span>}
                        {item.label && <h4>{item.label}</h4>}
                        {item.date && <p className="tracking-milestone__date">{trackingDateText(item.date)}</p>}
                        {item.description && <p className="tracking-milestone__description">{item.description}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : <p className="tracking-result__empty">Belum ada milestone untuk nomor ini.</p>}
          </section>
        )}

        {result && !view.hasResult && !error && <p role="status" className="tracking-feedback">Belum ada milestone untuk nomor ini.</p>}

        {!result && !error && !loading && (
          <div className="tracking-guidance">
            <PackageSearch size={28} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h2>Satu pencarian untuk beberapa nomor pengiriman.</h2>
              <p>Gunakan nomor referensi yang tercantum pada dokumen shipment Anda.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
