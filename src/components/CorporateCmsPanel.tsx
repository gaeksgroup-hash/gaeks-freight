import React from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import {
  CareerOpening,
  CarrierDirectoryEntry,
  CorporateContent,
  RateCardEntry,
} from '../data/corporateContent';

const fieldClass =
  'mt-1.5 min-h-11 w-full rounded-md border border-slate-600 bg-[#08282d] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30';
const labelClass = 'block text-sm font-semibold text-slate-200';
const cardClass = 'space-y-4 rounded-lg border border-cyan-950/90 bg-[#071d21] p-5 sm:p-6';
const btnPrimary =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 text-sm font-bold text-[#011417] transition-colors hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50';
const btnSecondary =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 px-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400 hover:bg-cyan-950/50 hover:text-white';

export const CorporateCmsPanel: React.FC<{
  value: CorporateContent;
  saving: boolean;
  onChange: (next: CorporateContent) => void;
  onSave: (next: CorporateContent) => Promise<void>;
}> = ({ value, saving, onChange, onSave }) => {
  const addRate = () => {
    const entry: RateCardEntry = {
      id: `rate-${Date.now()}`,
      status: 'draft',
      mode: 'ocean',
      serviceType: 'FCL',
      origin: '',
      destination: '',
      originPortOrAirport: '',
      destinationPortOrAirport: '',
      containerOrCargoType: '20ft / 40ft',
      rate: '',
      currency: 'USD',
      validUntil: '',
      costScope: '',
      terms: '',
    };
    onChange({ ...value, rateCard: { ...value.rateCard, items: [entry, ...value.rateCard.items] } });
  };

  const addCarrier = () => {
    const entry: CarrierDirectoryEntry = {
      id: `carrier-${Date.now()}`,
      status: 'draft',
      name: '',
      category: 'shipping_line',
      logoUrl: '',
      approvedLogo: false,
      serviceScope: '',
      corridors: '',
      scheduleSummary: '',
      officialUrl: '',
    };
    onChange({ ...value, carriers: { ...value.carriers, items: [entry, ...value.carriers.items] } });
  };

  const addCareer = () => {
    const opening: CareerOpening = {
      id: `career-${Date.now()}`,
      status: 'draft',
      title: '',
      department: 'Operasional',
      location: 'Jakarta',
      employmentType: 'Penuh waktu',
      summary: '',
      requirements: [],
      postedDate: new Date().toISOString().slice(0, 10),
    };
    onChange({ ...value, careers: { ...value.careers, positions: [opening, ...value.careers.positions] } });
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        void onSave(value);
      }}
    >
      {/* Identitas & Prinsip Beranda */}
      <section className={cardClass}>
        <h2 className="text-base font-bold text-white">Identitas Resmi &amp; Section Prinsip GAEKS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Komitmen merek
            <input
              className={fieldClass}
              value={value.brand.promise}
              onChange={(e) => onChange({ ...value, brand: { ...value.brand, promise: e.target.value } })}
            />
          </label>
          <label className={labelClass}>
            Judul Signature Homepage
            <input
              className={fieldClass}
              value={value.homeSignature.headline}
              onChange={(e) =>
                onChange({ ...value, homeSignature: { ...value.homeSignature, headline: e.target.value } })
              }
            />
          </label>
        </div>
        <label className={labelClass}>
          Visi resmi perusahaan
          <textarea
            rows={3}
            className={fieldClass}
            value={value.about.visionText}
            onChange={(e) => onChange({ ...value, about: { ...value.about, visionText: e.target.value } })}
          />
        </label>
      </section>

      {/* Tentang Kami */}
      <section className={cardClass}>
        <h2 className="text-base font-bold text-white">Halaman Tentang Kami</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Judul SEO
            <input
              className={fieldClass}
              value={value.about.seoTitle}
              onChange={(e) => onChange({ ...value, about: { ...value.about, seoTitle: e.target.value } })}
            />
          </label>
          <label className={labelClass}>
            URL Dokumen Visi &amp; Misi (PDF)
            <input
              className={fieldClass}
              value={value.about.identityPdfUrl}
              onChange={(e) => onChange({ ...value, about: { ...value.about, identityPdfUrl: e.target.value } })}
            />
          </label>
        </div>
        <label className={labelClass}>
          Narasi pembuka halaman
          <textarea
            rows={2}
            className={fieldClass}
            value={value.about.heroLead}
            onChange={(e) => onChange({ ...value, about: { ...value.about, heroLead: e.target.value } })}
          />
        </label>
      </section>

      {/* Tarif Pengiriman */}
      <section className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">Tarif Pengiriman (Rate Card)</h2>
            <p className="mt-1 text-xs text-slate-400">Hanya entri berstatus &ldquo;Terbit&rdquo; yang ditampilkan ke publik.</p>
          </div>
          <button type="button" onClick={addRate} className={btnSecondary}>
            <Plus className="h-4 w-4" />
            <span>Tambah tarif</span>
          </button>
        </div>

        <label className={labelClass}>
          Pesan empty state tarif
          <textarea
            rows={2}
            className={fieldClass}
            value={value.rateCard.emptyBody}
            onChange={(e) => onChange({ ...value, rateCard: { ...value.rateCard, emptyBody: e.target.value } })}
          />
        </label>

        {value.rateCard.items.map((item, idx) => (
          <div key={item.id} className="space-y-3 rounded-md border border-cyan-950 bg-[#041a1e] p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <label className={labelClass}>
                Status
                <select
                  className={fieldClass}
                  value={item.status}
                  onChange={(e) => {
                    const next = [...value.rateCard.items];
                    next[idx] = { ...item, status: e.target.value as 'draft' | 'published' };
                    onChange({ ...value, rateCard: { ...value.rateCard, items: next } });
                  }}
                >
                  <option value="draft">Draf</option>
                  <option value="published">Terbit</option>
                </select>
              </label>
              <label className={labelClass}>
                Asal
                <input
                  className={fieldClass}
                  value={item.origin}
                  onChange={(e) => {
                    const next = [...value.rateCard.items];
                    next[idx] = { ...item, origin: e.target.value };
                    onChange({ ...value, rateCard: { ...value.rateCard, items: next } });
                  }}
                />
              </label>
              <label className={labelClass}>
                Tujuan
                <input
                  className={fieldClass}
                  value={item.destination}
                  onChange={(e) => {
                    const next = [...value.rateCard.items];
                    next[idx] = { ...item, destination: e.target.value };
                    onChange({ ...value, rateCard: { ...value.rateCard, items: next } });
                  }}
                />
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...value,
                    rateCard: { ...value.rateCard, items: value.rateCard.items.filter((entry) => entry.id !== item.id) },
                  })
                }
                className={btnSecondary}
              >
                <Trash2 className="h-4 w-4" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Maskapai & Pelayaran */}
      <section className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">Maskapai &amp; Perusahaan Pelayaran</h2>
            <p className="mt-1 text-xs text-slate-400">Hanya tampilkan penyedia angkutan dengan persetujuan logo/data.</p>
          </div>
          <button type="button" onClick={addCarrier} className={btnSecondary}>
            <Plus className="h-4 w-4" />
            <span>Tambah penyedia</span>
          </button>
        </div>

        <label className={labelClass}>
          Pesan empty state penyedia angkutan
          <textarea
            rows={2}
            className={fieldClass}
            value={value.carriers.emptyBody}
            onChange={(e) => onChange({ ...value, carriers: { ...value.carriers, emptyBody: e.target.value } })}
          />
        </label>

        {value.carriers.items.map((item, idx) => (
          <div key={item.id} className="space-y-3 rounded-md border border-cyan-950 bg-[#041a1e] p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <label className={labelClass}>
                Status
                <select
                  className={fieldClass}
                  value={item.status}
                  onChange={(e) => {
                    const next = [...value.carriers.items];
                    next[idx] = { ...item, status: e.target.value as 'draft' | 'published' };
                    onChange({ ...value, carriers: { ...value.carriers, items: next } });
                  }}
                >
                  <option value="draft">Draf</option>
                  <option value="published">Terbit</option>
                </select>
              </label>
              <label className={labelClass}>
                Kategori
                <select
                  className={fieldClass}
                  value={item.category}
                  onChange={(e) => {
                    const next = [...value.carriers.items];
                    next[idx] = { ...item, category: e.target.value as 'airline' | 'shipping_line' };
                    onChange({ ...value, carriers: { ...value.carriers, items: next } });
                  }}
                >
                  <option value="shipping_line">Perusahaan Pelayaran</option>
                  <option value="airline">Maskapai Penerbangan</option>
                </select>
              </label>
              <label className={labelClass}>
                Nama penyedia
                <input
                  className={fieldClass}
                  value={item.name}
                  onChange={(e) => {
                    const next = [...value.carriers.items];
                    next[idx] = { ...item, name: e.target.value };
                    onChange({ ...value, carriers: { ...value.carriers, items: next } });
                  }}
                />
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...value,
                    carriers: { ...value.carriers, items: value.carriers.items.filter((entry) => entry.id !== item.id) },
                  })
                }
                className={btnSecondary}
              >
                <Trash2 className="h-4 w-4" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Karier */}
      <section className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white">Karier &amp; Lowongan</h2>
            <p className="mt-1 text-xs text-slate-400">Hanya lowongan berstatus &ldquo;Terbit&rdquo; yang muncul di halaman Karier.</p>
          </div>
          <button type="button" onClick={addCareer} className={btnSecondary}>
            <Plus className="h-4 w-4" />
            <span>Tambah lowongan</span>
          </button>
        </div>

        <label className={labelClass}>
          Pesan saat belum ada lowongan
          <textarea
            rows={2}
            className={fieldClass}
            value={value.careers.emptyBody}
            onChange={(e) => onChange({ ...value, careers: { ...value.careers, emptyBody: e.target.value } })}
          />
        </label>

        {value.careers.positions.map((pos, idx) => (
          <div key={pos.id} className="space-y-3 rounded-md border border-cyan-950 bg-[#041a1e] p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <label className={labelClass}>
                Status
                <select
                  className={fieldClass}
                  value={pos.status}
                  onChange={(e) => {
                    const next = [...value.careers.positions];
                    next[idx] = { ...pos, status: e.target.value as 'draft' | 'published' };
                    onChange({ ...value, careers: { ...value.careers, positions: next } });
                  }}
                >
                  <option value="draft">Draf</option>
                  <option value="published">Terbit</option>
                </select>
              </label>
              <label className={labelClass}>
                Posisi
                <input
                  className={fieldClass}
                  value={pos.title}
                  onChange={(e) => {
                    const next = [...value.careers.positions];
                    next[idx] = { ...pos, title: e.target.value };
                    onChange({ ...value, careers: { ...value.careers, positions: next } });
                  }}
                />
              </label>
              <label className={labelClass}>
                Lokasi
                <input
                  className={fieldClass}
                  value={pos.location}
                  onChange={(e) => {
                    const next = [...value.careers.positions];
                    next[idx] = { ...pos, location: e.target.value };
                    onChange({ ...value, careers: { ...value.careers, positions: next } });
                  }}
                />
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...value,
                    careers: { ...value.careers, positions: value.careers.positions.filter((entry) => entry.id !== pos.id) },
                  })
                }
                className={btnSecondary}
              >
                <Trash2 className="h-4 w-4" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      <div className="flex justify-end">
        <button type="submit" disabled={saving} className={btnPrimary}>
          <Save className="h-4 w-4" />
          <span>{saving ? 'Menyimpan…' : 'Simpan ke server'}</span>
        </button>
      </div>
    </form>
  );
};
