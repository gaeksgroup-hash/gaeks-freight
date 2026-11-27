import React from 'react';
import { ContactGroup, getStoredBranding, getStoredServices } from '../utils/adminStorage';
import { ServiceDetail } from '../types/freight';
import { servicePath } from '../utils/routes';
import { whatsappDigits } from '../utils/quoteFlow';
import uiCopySeed from '../../public/api/ui_copy_seed.json';

const field =
  'mt-1.5 min-h-11 w-full min-w-0 rounded-md border border-slate-600 bg-[#08282d] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30';
const labelClass = 'block text-sm font-semibold text-slate-200';
const subButtonClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-600 px-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-400 hover:bg-cyan-950/50 hover:text-white';

export function SiteCopyEditor({
  value,
  onChange,
}: {
  value?: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}) {
  const copy = { ...uiCopySeed, ...value };
  return (
    <details className="rounded-lg border border-cyan-950 bg-[#071d21] p-4 sm:p-5">
      <summary className="min-h-11 cursor-pointer font-bold text-white">
        Redaksi halaman layanan, kontak, dan footer
      </summary>
      <p className="my-3 text-sm text-slate-300">
        Judul bagian, label tombol email, label salin email, teks opsional formulir, dan metadata halaman. Semua perubahan mengikuti tombol simpan modul ini.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {Object.entries(copy).map(([key, text]) => (
          <label key={key} className={labelClass}>
            <span className="font-mono text-xs text-cyan-300">{key}</span>
            <textarea
              className={field}
              rows={2}
              value={text}
              onChange={(event) => onChange({ ...copy, [key]: event.target.value })}
            />
          </label>
        ))}
      </div>
    </details>
  );
}

export function ContactGroupsEditor({
  value,
  onChange,
}: {
  value: ContactGroup[];
  onChange: (v: ContactGroup[]) => void;
}) {
  const update = (index: number, key: string, val: unknown) =>
    onChange(value.map((g, i) => (i === index ? { ...g, [key]: val } : g)));
  const services = getStoredServices(true);

  return (
    <fieldset className="space-y-4 border-b border-cyan-950 pb-6">
      <div>
        <legend className="text-lg font-bold text-white">Kontak per kelompok layanan</legend>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          Satu sumber pengaturan untuk halaman layanan, Kontak, Footer, Navbar, Kalkulator, dan direktori telepon. Placeholder opsional:{' '}
          <code className="text-cyan-200">{'{service}'}</code>, <code className="text-cyan-200">{'{arah}'}</code>,{' '}
          <code className="text-cyan-200">{'{kota}'}</code>.
        </p>
      </div>

      {value.map((g, i) => (
        <div key={g.id} className="space-y-4 rounded-lg border border-cyan-950 bg-[#041a1e] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-950/80 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Kelompok: {g.id}</span>
            {g.id !== 'general' && (
              <button
                type="button"
                className={subButtonClass}
                onClick={() => onChange(value.filter((_, index) => index !== i))}
              >
                Hapus kelompok
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(
              [
                ['name', 'Nama kelompok', 'text', true],
                ['whatsappNumber', 'WhatsApp (kode negara, mis. 6285608561745)', 'text', true],
                ['whatsappDisplay', 'Tampilan nomor', 'text', true],
                ['email', 'Email tim', 'email', true],
                ['ctaText', 'Label tombol WhatsApp (mendukung {service})', 'text', true],
                ['emailCtaText', 'Label tombol Email', 'text', false],
              ] as const
            ).map(([key, label, type, req]) => (
              <label key={key} className={labelClass}>
                {label}
                <input
                  required={req}
                  type={type}
                  className={field}
                  value={String(g[key as keyof ContactGroup] || '')}
                  placeholder={key === 'emailCtaText' ? 'Kirim Email' : undefined}
                  onChange={(e) => update(i, key, e.target.value)}
                />
              </label>
            ))}

            <label className={`${labelClass} sm:col-span-2`}>
              Template pesan awal WhatsApp (satu kalimat; opsional pakai {'{service}'}, {'{arah}'}, {'{kota}'})
              <textarea
                rows={2}
                className={field}
                value={String(g.whatsappTemplate || '')}
                placeholder="Halo tim GAEKS, saya ingin konsultasi {service} {arah} di {kota}."
                onChange={(e) => update(i, 'whatsappTemplate', e.target.value)}
              />
            </label>

            <label className={`${labelClass} sm:col-span-2`}>
              Template subjek Email (opsional pakai {'{service}'}, {'{arah}'}, {'{kota}'})
              <input
                type="text"
                className={field}
                value={String(g.emailSubjectTemplate || '')}
                placeholder="Konsultasi {service} {arah} {kota}"
                onChange={(e) => update(i, 'emailSubjectTemplate', e.target.value)}
              />
            </label>
          </div>

          <fieldset className="border-t border-cyan-950/80 pt-3">
            <legend className="text-xs font-bold uppercase tracking-wider text-slate-300">Layanan dalam kelompok ini</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <label key={s.id} className="flex min-h-11 items-center gap-2 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-cyan-300"
                    checked={g.serviceIds.includes(s.id)}
                    onChange={(e) => {
                      const selected = e.target.checked;
                      onChange(
                        value.map((group, index) => ({
                          ...group,
                          serviceIds:
                            index === i
                              ? selected
                                ? [...new Set([...group.serviceIds, s.id])]
                                : group.serviceIds.filter((id) => id !== s.id)
                              : selected
                                ? group.serviceIds.filter((id) => id !== s.id)
                                : group.serviceIds,
                        }))
                      );
                    }}
                  />
                  <span>{s.title}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      ))}

      <button
        type="button"
        className={subButtonClass}
        onClick={() =>
          onChange([
            ...value,
            {
              id: 'group-' + Date.now(),
              name: '',
              whatsappNumber: '',
              whatsappDisplay: '',
              email: '',
              ctaText: 'Chat Tim {service}',
              emailCtaText: 'Kirim Email',
              whatsappTemplate: 'Halo tim GAEKS, saya ingin konsultasi {service} {arah} di {kota}.',
              emailSubjectTemplate: 'Konsultasi {service} {arah} {kota}',
              serviceIds: [],
            },
          ])
        }
      >
        Tambah kelompok
      </button>
    </fieldset>
  );
}

export function ServiceEditorialEditor({
  service: s,
  onChange,
}: {
  service: ServiceDetail;
  onChange: (s: ServiceDetail) => void;
}) {
  const set = (key: string, value: unknown) => onChange({ ...s, [key]: value });
  const groups = getStoredBranding().contactGroups || [];
  const activeGroup = groups.find((g) => g.serviceIds.includes(s.id)) || groups.find((g) => g.id === 'general') || groups[0];
  const serviceName = s.ctaServiceName?.trim() || s.title || 'Layanan';

  return (
    <fieldset className="space-y-5 border-y border-cyan-950 py-5">
      <legend className="px-1 text-lg font-bold text-white">Publikasi, kontak tombol &amp; konten layanan</legend>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Status
          <select className={field} value={s.status || 'published'} onChange={(e) => set('status', e.target.value)}>
            <option value="draft">Draf</option>
            <option value="published">Terbit</option>
          </select>
        </label>

        <label className={labelClass}>
          Nama layanan pada tombol &amp; pesan ({'{service}'})
          <input
            className={field}
            value={String(s.ctaServiceName || '')}
            placeholder={s.title}
            onChange={(e) => set('ctaServiceName', e.target.value)}
          />
        </label>
      </div>

      <label className={labelClass}>
        Kalimat singkat kebutuhan di layar pertama halaman layanan
        <textarea
          className={field}
          rows={2}
          value={String(s.heroSummary || '')}
          placeholder="Satu kalimat singkat tentang kebutuhan yang bisa dibantu tim."
          onChange={(e) => set('heroSummary', e.target.value)}
        />
      </label>

      <div className="space-y-4 rounded-lg border border-cyan-950 bg-[#041a1e] p-4">
        <div>
          <h3 className="text-sm font-bold text-cyan-200">Pengaturan tombol &amp; pesan khusus layanan (opsional)</h3>
          <p className="mt-1 text-xs text-slate-400">
            Kelompok kontak aktif: <strong>{activeGroup?.name || '-'}</strong> ({activeGroup?.whatsappDisplay} · {activeGroup?.email}). Kosongkan kolom di bawah untuk mengikuti pengaturan kelompok di Brand &amp; Kontak.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Label tombol WhatsApp (khusus layanan)
            <input
              className={field}
              value={String(s.whatsappCtaLabel || '')}
              placeholder={activeGroup?.ctaText?.replace(/\{service\}/gi, serviceName) || `Chat Tim ${serviceName}`}
              onChange={(e) => set('whatsappCtaLabel', e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Label tombol Email (khusus layanan)
            <input
              className={field}
              value={String(s.emailCtaLabel || '')}
              placeholder={activeGroup?.emailCtaText || 'Kirim Email'}
              onChange={(e) => set('emailCtaLabel', e.target.value)}
            />
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            Template pesan awal WhatsApp (khusus layanan)
            <textarea
              rows={2}
              className={field}
              value={String(s.whatsappTemplate || '')}
              placeholder={activeGroup?.whatsappTemplate || 'Halo tim GAEKS, saya ingin konsultasi {service} {arah} di {kota}.'}
              onChange={(e) => set('whatsappTemplate', e.target.value)}
            />
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            Subjek Email (khusus layanan)
            <input
              className={field}
              value={String(s.emailSubject || '')}
              placeholder={activeGroup?.emailSubjectTemplate || 'Konsultasi {service} {arah} {kota}'}
              onChange={(e) => set('emailSubject', e.target.value)}
            />
          </label>
        </div>
        {activeGroup && (
          <p className="text-xs text-slate-400">
            Tujuan aktif: <code>https://wa.me/{whatsappDigits(activeGroup.whatsappNumber)}</code> dan <code>{activeGroup.email}</code>
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ['seoTitle', 'SEO title'],
            ['metaDescription', 'Meta description'],
            ['canonical', 'Canonical (kosong = URL layanan)'],
            ['imageAlt', 'Alt text gambar'],
            ['evidenceNotes', 'Bahan bukti yang masih diperlukan (internal)'],
          ] as const
        ).map(([key, label]) => (
          <label className={`${labelClass} ${key === 'evidenceNotes' ? 'sm:col-span-2' : ''}`} key={key}>
            {label}
            <input className={field} value={String(s[key as keyof ServiceDetail] || '')} onChange={(e) => set(key, e.target.value)} />
          </label>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Bagian halaman, termasuk cakupan kota</h3>
        {(s.sections || []).map((section, i) => (
          <div key={i} className="space-y-2 rounded border border-cyan-950 bg-[#041a1e] p-3">
            <input
              aria-label="Judul bagian"
              className={field}
              value={section.title}
              onChange={(e) => set('sections', s.sections!.map((v, n) => (n === i ? { ...v, title: e.target.value } : v)))}
            />
            <textarea
              aria-label="Isi bagian"
              className={field}
              rows={4}
              value={section.body}
              onChange={(e) => set('sections', s.sections!.map((v, n) => (n === i ? { ...v, body: e.target.value } : v)))}
            />
            <button type="button" className={subButtonClass} onClick={() => set('sections', s.sections!.filter((_, n) => n !== i))}>
              Hapus bagian
            </button>
          </div>
        ))}
        <button type="button" className={subButtonClass} onClick={() => set('sections', [...(s.sections || []), { title: '', body: '' }])}>
          Tambah bagian
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">Bukti rekam jejak</h3>
        <p className="text-xs text-slate-400">
          Hanya bukti dengan izin publikasi, sumber, dan tanggal lengkap yang tampil. Data kosong menunggu bahan pemilik.
        </p>
        {(s.evidence || []).map((proof, i) => (
          <div key={i} className="space-y-3 rounded border border-cyan-950 bg-[#041a1e] p-3">
            {(
              [
                ['title', 'Judul proyek'],
                ['detail', 'Jenis shipment, rute, dan hasil terverifikasi'],
                ['source', 'Sumber publik / referensi yang diizinkan'],
                ['date', 'Tanggal'],
              ] as const
            ).map(([key, label]) => (
              <label className={labelClass} key={key}>
                {label}
                <input
                  className={field}
                  type={key === 'date' ? 'date' : 'text'}
                  value={String(proof[key as keyof typeof proof])}
                  onChange={(e) => set('evidence', s.evidence!.map((v, n) => (n === i ? { ...v, [key]: e.target.value } : v)))}
                />
              </label>
            ))}
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex min-h-11 items-center gap-2 text-sm text-slate-200">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-cyan-300"
                  checked={proof.approved}
                  onChange={(e) => set('evidence', s.evidence!.map((v, n) => (n === i ? { ...v, approved: e.target.checked } : v)))}
                />
                Izin publikasi tersedia
              </label>
              <button type="button" className={subButtonClass} onClick={() => set('evidence', s.evidence!.filter((_, n) => n !== i))}>
                Hapus bukti
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className={subButtonClass}
          onClick={() => set('evidence', [...(s.evidence || []), { title: '', detail: '', source: '', date: '', approved: false }])}
        >
          Tambah bukti
        </button>
      </div>

      <details className="rounded border border-cyan-950 bg-[#041a1e] p-4">
        <summary className="cursor-pointer font-bold text-cyan-200">Pratinjau perubahan sebelum simpan</summary>
        <div className="mt-3 space-y-3 text-sm text-slate-200">
          <h4 className="text-lg font-bold text-white">{s.landingTitle || s.title}</h4>
          <p>{s.heroSummary || s.landingDescription || s.summary || s.description}</p>
          {s.sections?.map((section, i) => (
            <article key={i} className="border-t border-cyan-950 pt-2">
              <h5 className="font-bold text-white">{section.title}</h5>
              <p className="whitespace-pre-line text-slate-300">{section.body}</p>
            </article>
          ))}
          {s.faq?.map(([q, a], i) => (
            <p key={i}>
              <strong>{q}</strong>
              <br />
              <span className="text-slate-300">{a}</span>
            </p>
          ))}
          <p className="text-xs text-cyan-300">URL: {s.canonical || servicePath(s.id)}</p>
        </div>
      </details>
    </fieldset>
  );
}
