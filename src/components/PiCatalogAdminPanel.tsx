import React, { useEffect, useState } from 'react';
import { Plus, RefreshCw, Save, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { fetchPiCatalog, savePiCatalog } from '../services/piCatalogApi';
import { PiCatalogItem } from '../types/piCatalog';
import { notifyLocalUpdate } from '../utils/adminStorage';

const input = 'mt-1.5 min-h-11 w-full rounded-md border border-slate-600 bg-[#08282d] px-3 py-2.5 text-base text-white outline-none focus:border-cyan-300';
const emptyItem = (): PiCatalogItem => ({ id: `pi-${Date.now()}`, hsCode: '', commodity: '', status: 'to_be_confirmed', sourceLabel: '', sourceUrl: '', verifiedAt: null, note: '' });

export const PiCatalogAdminPanel: React.FC = () => {
  const [items, setItems] = useState<PiCatalogItem[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const load = async () => {
    setLoading(true);
    try { const data = await fetchPiCatalog(); setItems(data.items); setUpdatedAt(data.updatedAt); }
    catch (error) { toast.error('Daftar PI belum dapat dimuat', { description: error instanceof Error ? error.message : undefined }); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, []);
  const update = (id: string, patch: Partial<PiCatalogItem>) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try { await savePiCatalog(items); toast.success('Daftar PI tersimpan di server'); notifyLocalUpdate(); await load(); }
    catch (error) { toast.error('Daftar PI belum tersimpan', { description: error instanceof Error ? error.message : undefined }); }
    finally { setSaving(false); }
  };
  return <section className="space-y-6"><header className="flex flex-wrap items-end justify-between gap-4 border-b border-cyan-950 pb-6"><div><p className="text-xs font-bold text-cyan-300">Ruang kerja operator</p><h1 className="mt-2 text-2xl font-bold">Daftar PI</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Kelola kandidat HS dan kesiapan layanan yang tampil di halaman undername. Ready memerlukan sumber dan tanggal verifikasi. Status ini bukan jaminan izin terbit.</p>{updatedAt && <p className="mt-2 text-xs text-slate-500">Pembaruan terakhir: {new Date(updatedAt).toLocaleString('id-ID')}</p>}</div><button type="button" onClick={() => void load()} className="inline-flex min-h-11 items-center gap-2 border border-slate-600 px-4 text-sm font-semibold" disabled={loading}><RefreshCw className="h-4 w-4" />Muat ulang</button></header>
    {loading ? <p className="text-sm text-slate-400">Memuat daftar PI…</p> : <form onSubmit={submit} className="space-y-4">
      {items.map((item) => <fieldset key={item.id} className="border border-cyan-950 bg-[#071d21] p-5"><legend className="px-2 text-sm font-bold text-cyan-300">{item.hsCode || 'Baris baru'}</legend><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-sm font-semibold">HS code *<input required pattern="[0-9]{4}(\.[0-9]{2}){1,3}" title="Contoh 7208.39.90" className={input} value={item.hsCode} onChange={(event) => update(item.id, { hsCode: event.target.value })} /></label>
        <label className="text-sm font-semibold lg:col-span-2">Uraian awal *<input required maxLength={200} className={input} value={item.commodity} onChange={(event) => update(item.id, { commodity: event.target.value })} /></label>
        <label className="text-sm font-semibold">Status<select className={input} value={item.status} onChange={(event) => update(item.id, { status: event.target.value as PiCatalogItem['status'] })}><option value="to_be_confirmed">To be confirmed</option><option value="ready">Ready</option></select></label>
        <label className="text-sm font-semibold">Label sumber<input maxLength={160} className={input} value={item.sourceLabel} onChange={(event) => update(item.id, { sourceLabel: event.target.value })} /></label>
        <label className="text-sm font-semibold">URL sumber {item.status === 'ready' ? '*' : ''}<input type="url" required={item.status === 'ready'} className={input} value={item.sourceUrl} onChange={(event) => update(item.id, { sourceUrl: event.target.value })} placeholder="https://" /></label>
        <label className="text-sm font-semibold">Tanggal verifikasi {item.status === 'ready' ? '*' : ''}<input type="date" required={item.status === 'ready'} className={input} value={item.verifiedAt || ''} onChange={(event) => update(item.id, { verifiedAt: event.target.value || null })} /></label>
        <label className="text-sm font-semibold sm:col-span-2">Catatan publik<textarea maxLength={500} rows={2} className={input} value={item.note} onChange={(event) => update(item.id, { note: event.target.value })} /></label>
      </div><button type="button" onClick={() => setItems((current) => current.filter((row) => row.id !== item.id))} className="mt-4 inline-flex min-h-11 items-center gap-2 border border-red-800 px-3 text-sm text-red-300"><Trash2 className="h-4 w-4" />Hapus baris</button></fieldset>)}
      <div className="flex flex-wrap justify-between gap-3 border-t border-slate-800 pt-5"><button type="button" onClick={() => setItems((current) => [...current, emptyItem()])} className="inline-flex min-h-11 items-center gap-2 border border-slate-600 px-4 text-sm font-semibold"><Plus className="h-4 w-4" />Tambah HS code</button><button type="submit" disabled={saving} className="inline-flex min-h-11 items-center gap-2 bg-cyan-300 px-5 text-sm font-bold text-[#011417] disabled:opacity-50"><Save className="h-4 w-4" />{saving ? 'Menyimpan…' : 'Simpan daftar'}</button></div>
    </form>}
  </section>;
};
