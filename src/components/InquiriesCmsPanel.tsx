import React, { useState } from 'react';
import { Download, Mail, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { operatorFetch } from '../utils/adminStorage';

export interface InquiryRecord {
  id: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  company: string;
  picName: string;
  picPhone?: string;
  picEmail?: string;
  picContact?: string;
  services: string[];
  description: string;
  routedGroupId: string;
  routedTeam: string;
  routingReason: string;
  channel: string;
  sourcePath: string;
}

const STATUS_LABELS: Record<InquiryRecord['status'], string> = {
  new: 'Baru',
  contacted: 'Dihubungi',
  quoted: 'Penawaran Terkirim',
  closed: 'Selesai',
};

const fieldClass =
  'min-h-10 rounded-md border border-slate-600 bg-[#08282d] px-2.5 py-1.5 text-xs font-semibold text-white outline-none focus:border-cyan-300';
const secondaryClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 px-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400 hover:bg-cyan-950/50 hover:text-white';
const primaryClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 text-sm font-bold text-[#011417] transition-colors hover:bg-cyan-200';

export const InquiriesCmsPanel: React.FC<{
  inquiries: InquiryRecord[];
  onReload: () => Promise<void>;
}> = ({ inquiries, onReload }) => {
  const [busyId, setBusyId] = useState('');

  const updateStatus = async (id: string, status: InquiryRecord['status']) => {
    setBusyId(id);
    try {
      const response = await operatorFetch('/api/inquiries.php', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) throw new Error('Status belum diperbarui.');
      await onReload();
      toast.success('Status permintaan diperbarui');
    } catch (error) {
      toast.error('Gagal memperbarui status', { description: error instanceof Error ? error.message : undefined });
    } finally {
      setBusyId('');
    }
  };

  const removeInquiry = async (id: string) => {
    if (!confirm('Hapus data permintaan ini dari CMS?')) return;
    setBusyId(id);
    try {
      const response = await operatorFetch('/api/inquiries.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Data belum terhapus.');
      await onReload();
      toast.success('Data permintaan dihapus');
    } catch (error) {
      toast.error('Gagal menghapus data', { description: error instanceof Error ? error.message : undefined });
    } finally {
      setBusyId('');
    }
  };

  const exportCsv = () => {
    const esc = (val: string) => `"${String(val || '').replace(/"/g, '""')}"`;
    const rows = [
      ['Tanggal', 'Status', 'Perusahaan', 'Nama', 'No. Telp / WA', 'Email', 'Preferensi Layanan', 'Kebutuhan', 'Tim Tujuan', 'Kanal'].join(','),
      ...inquiries.map((row) =>
        [
          esc(row.createdAt),
          esc(STATUS_LABELS[row.status] || row.status),
          esc(row.company || 'Perorangan'),
          esc(row.picName),
          esc(row.picPhone || ''),
          esc(row.picEmail || ''),
          esc((row.services || []).join('; ')),
          esc(row.description),
          esc(row.routedTeam),
          esc(row.channel),
        ].join(',')
      ),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gaeks-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 border-b border-cyan-950 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold text-cyan-300">Ruang kerja operator</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Permintaan Penawaran Masuk</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Seluruh pengisian formulir kontak &amp; konsultasi otomatis tercatat beserta hasil pengarahan timnya.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => void onReload()} className={secondaryClass}>
            <RefreshCw className="h-4 w-4" />
            <span>Segarkan</span>
          </button>
          <button type="button" onClick={exportCsv} disabled={inquiries.length === 0} className={primaryClass}>
            <Download className="h-4 w-4" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </header>

      {inquiries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-cyan-900 bg-[#071d21] p-10 text-center">
          <Mail className="mx-auto h-7 w-7 text-cyan-300" />
          <p className="mt-3 text-sm font-semibold text-white">Belum ada permintaan penawaran yang masuk.</p>
          <p className="mt-1 text-xs text-slate-400">
            Setiap pengunjung yang mengisi formulir di halaman Hubungi Kami akan otomatis tercatat di sini.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((item) => (
            <article key={item.id} className="space-y-3 rounded-xl border border-cyan-950/90 bg-[#071d21] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-cyan-300">
                    <span>{new Date(item.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    <span>·</span>
                    <span className="uppercase">{item.channel}</span>
                    {item.routedTeam && (
                      <>
                        <span>·</span>
                        <span className="rounded bg-cyan-950 px-2 py-0.5 text-[11px] font-bold text-cyan-200">
                          Tujuan: {item.routedTeam}
                        </span>
                      </>
                    )}
                  </div>
                  <h2 className="mt-1.5 text-base font-bold text-white">
                    {item.picName || 'Calon Pelanggan'}{' '}
                    <span className="font-normal text-slate-400">
                      — {item.company || 'Perorangan'}
                    </span>
                  </h2>
                  {(item.picPhone || item.picEmail || item.picContact) && (
                    <p className="mt-0.5 text-sm font-medium text-cyan-200">
                      {item.picPhone || item.picEmail
                        ? [item.picPhone, item.picEmail].filter(Boolean).join(' · ')
                        : item.picContact}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    aria-label={`Status ${item.id}`}
                    disabled={busyId === item.id}
                    value={item.status}
                    onChange={(e) => void updateStatus(item.id, e.target.value as InquiryRecord['status'])}
                    className={fieldClass}
                  >
                    {(Object.keys(STATUS_LABELS) as InquiryRecord['status'][]).map((key) => (
                      <option key={key} value={key}>
                        {STATUS_LABELS[key]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    aria-label="Hapus permintaan"
                    disabled={busyId === item.id}
                    onClick={() => void removeInquiry(item.id)}
                    className={secondaryClass}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {item.services?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.services.map((srv) => (
                    <span key={srv} className="rounded border border-cyan-900 bg-[#041a1e] px-2.5 py-0.5 text-xs text-slate-200">
                      {srv}
                    </span>
                  ))}
                </div>
              )}

              {item.description && (
                <p className="rounded-lg border border-cyan-950 bg-[#041a1e] p-3 text-sm leading-6 text-slate-200">
                  {item.description}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
