import React, { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { getSiteCopy, getStoredServices, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import {
  measureContactClick,
  quoteContext,
  QuoteDirection,
  QuoteService,
  resolveServiceContact,
  serviceLabel,
} from '../utils/quoteFlow';
import { CopyEmailButton, WhatsAppIcon } from './ContactActions';

export const QuoteForm: React.FC<{
  defaultService?: QuoteService;
  onServiceChange?: (service: string) => void;
  showEmailCopy?: boolean;
}> = ({
  defaultService = 'general',
  onServiceChange,
  showEmailCopy = false,
}) => {
  const [initial] = useState(() => quoteContext(defaultService));
  const [services, setServices] = useState(getStoredServices);
  const [copy, setCopy] = useState(getSiteCopy);
  const [service, setService] = useState(initial.service);
  const [direction, setDirection] = useState<QuoteDirection | ''>(
    initial.explicitDirection
  );
  const [city, setCity] = useState(initial.city);
  const [needs, setNeeds] = useState<string[]>([]);
  const [opened, setOpened] = useState<'whatsapp' | 'email' | null>(null);

  useEffect(() => {
    const reload = () => {
      setServices(getStoredServices());
      setCopy(getSiteCopy());
    };
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const toggleNeed = (need: string) =>
    setNeeds((current) => (current.includes(need) ? current.filter((item) => item !== need) : [...current, need]));

  const resolved = resolveServiceContact(service, { city, direction });

  const buildPayload = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) || '').trim();
    const detailLines = [
      direction ? `Arah: ${direction}` : '',
      city ? `Kota terkait: ${city}` : '',
      get('name') ? `Nama: ${get('name')}` : '',
      get('company') ? `Perusahaan: ${get('company')}` : '',
      get('phone') ? `Telepon: ${get('phone')}` : '',
      get('email') ? `Email: ${get('email')}` : '',
      get('origin') ? `Asal: ${get('origin')}` : '',
      get('destination') ? `Tujuan: ${get('destination')}` : '',
      get('commodity') ? `Komoditas: ${get('commodity')}` : '',
      (service === 'ppjk' || service === 'undername') && needs.length
        ? `Kebutuhan untuk dikonsultasikan: ${needs.join(', ')}`
        : '',
      get('hsCode') ? `HS code awal: ${get('hsCode')}` : '',
      get('detail') ? `Detail ${serviceLabel(service)}: ${get('detail')}` : '',
    ].filter(Boolean);

    return resolveServiceContact(service, {
      city,
      direction,
      extraBody: detailLines.length ? detailLines.join('\n') : undefined,
    });
  };

  const send = (form: HTMLFormElement, channel: 'whatsapp' | 'email') => {
    const target = buildPayload(form);
    if (channel === 'whatsapp') {
      if (!target.whatsappNumber) return;
      window.open(target.whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      if (!target.email) return;
      window.location.href = target.emailUrl;
    }
    measureContactClick(channel, service);
    setOpened(channel);
  };

  const field = 'field mt-2';
  return (
    <form
      id="quote-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        send(event.currentTarget, 'whatsapp');
      }}
      className="quote-surface min-w-0 bg-white p-5 sm:p-8"
    >
      <h2 className="text-2xl font-bold">{copy.quoteOptionalHeading || 'Tambahkan detail untuk penawaran'}</h2>
      <p className="mt-2 text-sm text-slate-600">
        {copy.quoteOptionalIntro ||
          'Semua kolom bersifat opsional. Jika belum lengkap, kedua tombol kontak tetap dapat langsung digunakan.'}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Layanan
          <select
            className={field}
            value={service}
            onChange={(e) => {
              const selected = e.target.value as QuoteService;
              setService(selected);
              onServiceChange?.(selected);
              if (selected === 'undername' && direction === 'ekspor') setDirection('');
              setNeeds([]);
            }}
          >
            <option value="general">General inquiry / CS</option>
            {services.map((item) => (
              <option
                key={item.id}
                value={item.id === 'air-shipment' ? 'air' : item.id === 'undername-impor' ? 'undername' : item.id}
              >
                {item.title}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold">
          Arah (opsional)
          <select
            className={field}
            value={direction}
            onChange={(e) => setDirection(e.target.value as QuoteDirection | '')}
          >
            <option value="">Belum ditentukan</option>
            <option value="impor">Impor</option>
            {service !== 'undername' && <option value="ekspor">Ekspor</option>}
          </select>
        </label>

        <label className="text-sm font-semibold">
          Kota terkait (opsional)
          <select className={field} value={city} onChange={(e) => setCity(e.target.value as typeof city)}>
            <option value="">Pilih jika relevan</option>
            <option>Jakarta</option>
            <option>Semarang</option>
            <option>Surabaya</option>
          </select>
        </label>

        <label className="text-sm font-semibold">
          Nama (opsional)
          <input name="name" autoComplete="name" className={field} />
        </label>

        <label className="text-sm font-semibold">
          Perusahaan (opsional)
          <input name="company" autoComplete="organization" className={field} />
        </label>

        <label className="text-sm font-semibold">
          Telepon (opsional)
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>

        <label className="text-sm font-semibold">
          Email (opsional)
          <input name="email" type="email" autoComplete="email" className={field} />
        </label>

        <label className="text-sm font-semibold">
          Asal (opsional)
          <input name="origin" placeholder="Kota, pelabuhan, atau negara" className={field} />
        </label>

        <label className="text-sm font-semibold">
          Tujuan (opsional)
          <input name="destination" placeholder="Kota, pelabuhan, atau negara" className={field} />
        </label>

        <label className="text-sm font-semibold">
          Komoditas (opsional)
          <input name="commodity" className={field} />
        </label>
      </div>

      {(service === 'ppjk' || service === 'undername') && (
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold">Kebutuhan yang ingin dibahas (opsional)</legend>
          <div className="mt-2 flex flex-wrap gap-3">
            {(service === 'undername' ? ['Undername impor', 'Persetujuan Impor (PI)'] : ['PIB', 'PEB', 'HS code', 'Lartas', 'PI']).map(
              (need) => (
                <label key={need} className="flex min-h-11 items-center gap-2 text-sm">
                  <input type="checkbox" checked={needs.includes(need)} onChange={() => toggleNeed(need)} />
                  {need}
                </label>
              )
            )}
          </div>
          <p className="mt-1 text-xs text-slate-500">Jenis dokumen dan izin bergantung pada komoditas serta ketentuan yang berlaku.</p>
        </fieldset>
      )}

      {service === 'undername' && (
        <label className="mt-5 block text-sm font-semibold">
          HS code jika sudah diketahui (opsional)
          <input name="hsCode" inputMode="numeric" placeholder="Contoh: 7208.39.90" className={field} />
        </label>
      )}

      <label className="mt-6 block text-sm font-semibold">
        {service === 'fcl'
          ? 'Detail kontainer, jumlah, dan kesiapan muat (opsional)'
          : service === 'air'
            ? 'Berat, dimensi, jumlah koli, dan kesiapan kirim (opsional)'
            : 'Status dokumen atau pertanyaan awal (opsional)'}
        <textarea name="detail" rows={3} className={field} />
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" className="button-primary w-full sm:w-auto">
          <WhatsAppIcon size={17} />
          <span>{resolved.whatsappLabel}</span>
        </button>
        <button
          type="button"
          onClick={(event) => {
            if (event.currentTarget.form) send(event.currentTarget.form, 'email');
          }}
          className="button-secondary w-full sm:w-auto"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span>{resolved.emailLabel}</span>
        </button>
      </div>

      {showEmailCopy && (
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span>
            Email tim: <strong className="select-all text-[#12363a]">{resolved.email}</strong>
          </span>
          <CopyEmailButton
            email={resolved.email}
            label={copy.serviceCopyEmailLabel}
            copiedLabel={copy.serviceCopiedEmailLabel}
            failedLabel={copy.serviceCopyFailedLabel}
            tone="light"
          />
        </div>
      )}

      <p role="status" className="mt-3 text-xs text-slate-600">
        {opened === 'whatsapp'
          ? 'WhatsApp dibuka dengan pesan siap ditinjau. Anda masih perlu menekan Send di WhatsApp.'
          : opened === 'email'
            ? 'Email dibuka dengan draf siap ditinjau. Anda masih perlu menekan Kirim di aplikasi email.'
            : 'Klik salah satu tombol di atas kapan saja, meskipun kolom di formulir masih kosong.'}
      </p>
    </form>
  );
};
