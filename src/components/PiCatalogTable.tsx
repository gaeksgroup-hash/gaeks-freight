import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { fetchPiCatalog } from '../services/piCatalogApi';
import { PiCatalog, PiCatalogItem } from '../types/piCatalog';

const Status: React.FC<{ value: PiCatalogItem['status'] }> = ({ value }) => <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${value === 'ready' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'}`}>{value === 'ready' ? 'Ready' : 'To be confirmed'}</span>;

export const PiCatalogTable: React.FC = () => {
  const [catalog, setCatalog] = useState<PiCatalog>({ updatedAt: null, items: [] });
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | PiCatalogItem['status']>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    const reload = async () => {
      try { const data = await fetchPiCatalog(); if (active) { setCatalog(data); setError(false); } }
      catch { if (active) setError(true); }
      finally { if (active) setLoading(false); }
    };
    void reload();
    const interval = window.setInterval(() => void reload(), 30000);
    const onFocus = () => void reload();
    window.addEventListener('focus', onFocus);
    window.addEventListener(GAEKS_UPDATE_EVENT, onFocus);
    return () => { active = false; window.clearInterval(interval); window.removeEventListener('focus', onFocus); window.removeEventListener(GAEKS_UPDATE_EVENT, onFocus); };
  }, []);
  const visible = useMemo(() => catalog.items.filter((item) => {
    const matchesText = `${item.hsCode} ${item.commodity}`.toLowerCase().includes(query.toLowerCase().trim());
    return matchesText && (status === 'all' || item.status === status);
  }), [catalog.items, query, status]);

  return <section className="bg-white py-14 sm:py-20" aria-labelledby="pi-list-title"><div className="page-shell">
    <div className="grid gap-6 lg:grid-cols-[.7fr_1fr] lg:gap-16"><div><p className="section-label">Daftar PI</p><h2 id="pi-list-title" className="mt-3 text-3xl font-bold leading-tight tracking-[-.04em] sm:text-4xl">Periksa HS code. Lalu verifikasi kebutuhan izinnya.</h2></div><div className="border-l-2 border-cyan-700 pl-5 text-sm leading-7 text-slate-600"><p>Daftar awal ini berisi kode dari rujukan resmi 2025 yang menunjukkan indikasi PI. Status <strong>To be confirmed</strong> berarti ketentuan terbaru dan kesiapan layanan belum dikonfirmasi. <strong>Ready</strong> menandai kesiapan layanan yang sudah diverifikasi, bukan jaminan izin terbit.</p><p className="mt-3">HS code dan uraian barang saja tidak cukup untuk menetapkan kewajiban PI. Periksa spesifikasi, penggunaan, dan aturan yang berlaku sebelum pengajuan.</p></div></div>
    <div className="mt-8 flex flex-col gap-3 border-y border-slate-200 py-4 sm:flex-row sm:items-center sm:justify-between"><label className="relative block w-full sm:max-w-md"><span className="sr-only">Cari HS code atau komoditas</span><Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari HS code atau komoditas" className="field pl-10" /></label><label className="text-sm font-semibold">Status<select value={status} onChange={(event) => setStatus(event.target.value as typeof status)} className="field mt-2 sm:ml-3 sm:mt-0 sm:w-auto"><option value="all">Semua status</option><option value="ready">Ready</option><option value="to_be_confirmed">To be confirmed</option></select></label></div>
    {loading && <p className="py-8 text-sm text-slate-500">Memuat daftar PI…</p>}
    {error && <p role="alert" className="py-8 text-sm text-amber-800">Daftar PI belum dapat dimuat. Coba muat ulang halaman.</p>}
    {!loading && !error && <>
      <div className="hidden overflow-x-auto sm:block"><table className="w-full border-collapse text-left text-sm"><thead><tr className="border-b border-slate-300 text-xs uppercase tracking-[.13em] text-slate-500"><th className="py-4 pr-5">HS code</th><th className="py-4 pr-5">Uraian awal</th><th className="py-4 pr-5">Status</th><th className="py-4">Rujukan</th></tr></thead><tbody>{visible.map((item) => <tr key={item.id} className="border-b border-slate-200 align-top"><td className="py-5 pr-5 font-mono font-bold text-[#0a5861]">{item.hsCode}</td><td className="py-5 pr-5"><span className="font-semibold">{item.commodity}</span>{item.note && <span className="mt-1 block max-w-xl text-xs leading-5 text-slate-500">{item.note}</span>}</td><td className="py-5 pr-5"><Status value={item.status} /></td><td className="py-5">{item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-cyan-800 underline-offset-4 hover:underline">{item.sourceLabel || 'Lihat sumber'}<ArrowUpRight className="h-4 w-4" /></a> : <span className="text-slate-500">Menunggu sumber</span>}{item.verifiedAt && <span className="mt-1 block text-xs text-slate-500">Diverifikasi {item.verifiedAt}</span>}</td></tr>)}</tbody></table></div>
      <div className="grid gap-3 sm:hidden">{visible.map((item) => <article key={item.id} className="border border-slate-200 bg-[#f7f8f5] p-5"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-mono text-lg font-bold text-[#0a5861]">{item.hsCode}</h3><Status value={item.status} /></div><p className="mt-3 font-semibold">{item.commodity}</p><p className="mt-2 text-xs leading-5 text-slate-500">{item.note}</p>{item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-cyan-800">{item.sourceLabel || 'Lihat sumber'}<ArrowUpRight className="h-4 w-4" /></a>}</article>)}</div>
      {visible.length === 0 && <p className="py-8 text-sm text-slate-500">Tidak ada baris yang cocok. Anda tetap dapat mengirim HS code untuk ditinjau.</p>}
      <p className="mt-5 text-xs text-slate-500">{catalog.items.length} baris · {catalog.updatedAt ? `Diperbarui ${new Date(catalog.updatedAt).toLocaleDateString('id-ID')}` : 'Daftar awal menunggu verifikasi terbaru'}</p>
    </>}
  </div></section>;
};
