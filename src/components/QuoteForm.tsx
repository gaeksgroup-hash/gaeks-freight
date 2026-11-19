import React, { useEffect, useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { getStoredBranding, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { measureContactClick, quoteContext, QuoteService, serviceLabels, whatsappDigits } from '../utils/quoteFlow';

export const QuoteForm: React.FC<{ defaultService?: QuoteService }> = ({ defaultService = 'ppjk' }) => {
  const [initial] = useState(() => quoteContext(defaultService));
  const [branding, setBranding] = useState(getStoredBranding);
  const [service, setService] = useState(initial.service);
  const [direction, setDirection] = useState(initial.service === 'undername' ? 'impor' : initial.direction);
  const [city, setCity] = useState(initial.city);
  const [needs, setNeeds] = useState<string[]>([]);
  const [opened, setOpened] = useState<'whatsapp' | 'email' | null>(null);
  useEffect(() => {
    const reload = () => setBranding(getStoredBranding());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const toggleNeed = (need: string) => setNeeds((current) => current.includes(need) ? current.filter((item) => item !== need) : [...current, need]);
  const send = (form: HTMLFormElement, channel: 'whatsapp' | 'email') => {
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) || '').trim();
    const lines = [
      'Halo GAEKS, saya ingin meminta penawaran.',
      `Layanan: ${serviceLabels[service]}`,
      `Arah: ${service === 'undername' ? 'impor' : direction}`,
      city ? `Kota terkait: ${city}` : '',
      `Nama: ${get('name')}`,
      `Perusahaan: ${get('company')}`,
      `Telepon: ${get('phone')}`,
      `Email: ${get('email')}`,
      `Asal: ${get('origin')}`,
      `Tujuan: ${get('destination')}`,
      `Komoditas: ${get('commodity')}`,
      (service === 'ppjk' || service === 'undername') && needs.length ? `Kebutuhan untuk dikonsultasikan: ${needs.join(', ')}` : '',
      get('hsCode') ? `HS code awal: ${get('hsCode')}` : '',
      get('detail') ? `Detail ${serviceLabels[service]}: ${get('detail')}` : '',
      'Mohon tindak lanjut sesuai kebutuhan dan dokumen yang berlaku. Terima kasih.',
    ].filter(Boolean).join('\n');
    if (channel === 'whatsapp') {
      const target = whatsappDigits(branding.whatsappNumber);
      if (!target) return;
      window.open(`https://wa.me/${target}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener,noreferrer');
    } else {
      if (!branding.salesEmail) return;
      window.location.href = `mailto:${branding.salesEmail}?subject=${encodeURIComponent(`Permintaan ${serviceLabels[service]}`)}&body=${encodeURIComponent(lines)}`;
    }
    measureContactClick(channel, service);
    setOpened(channel);
  };
  const field = 'field mt-2';
  return <form id="quote-form" onSubmit={(event) => { event.preventDefault(); send(event.currentTarget, 'whatsapp'); }} className="min-w-0 border border-slate-200 bg-white p-5 sm:p-8">
    <h2 className="text-2xl font-bold">Minta penawaran</h2>
    <p className="mt-2 text-sm text-slate-600">Isi kebutuhan awal. Tim akan meninjau rute, komoditas, dan dokumen yang relevan.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-semibold">Layanan<select className={field} value={service} onChange={(e) => { const selected = e.target.value as QuoteService; setService(selected); if (selected === 'undername') setDirection('impor'); setNeeds([]); }}><option value="fcl">Freight Laut FCL</option><option value="air">Air Freight</option><option value="ppjk">PPJK / Customs Clearance</option><option value="undername">Undername Impor & PI</option></select></label>
      <label className="text-sm font-semibold">Arah<select className={field} value={direction} onChange={(e) => setDirection(e.target.value as typeof direction)}><option value="impor">Impor</option>{service !== 'undername' && <option value="ekspor">Ekspor</option>}</select></label>
      <label className="text-sm font-semibold">Kota terkait<select className={field} value={city} onChange={(e) => setCity(e.target.value as typeof city)}><option value="">Pilih jika relevan</option><option>Jakarta</option><option>Semarang</option><option>Surabaya</option></select></label>
      <label className="text-sm font-semibold">Nama *<input name="name" required autoComplete="name" className={field} /></label>
      <label className="text-sm font-semibold">Perusahaan *<input name="company" required autoComplete="organization" className={field} /></label>
      <label className="text-sm font-semibold">Telepon *<input name="phone" type="tel" required autoComplete="tel" className={field} /></label>
      <label className="text-sm font-semibold">Email *<input name="email" type="email" required autoComplete="email" className={field} /></label>
      <label className="text-sm font-semibold">Asal *<input name="origin" required placeholder="Kota, pelabuhan, atau negara" className={field} /></label>
      <label className="text-sm font-semibold">Tujuan *<input name="destination" required placeholder="Kota, pelabuhan, atau negara" className={field} /></label>
      <label className="text-sm font-semibold">Komoditas *<input name="commodity" required className={field} /></label>
    </div>
    {(service === 'ppjk' || service === 'undername') && <fieldset className="mt-6"><legend className="text-sm font-semibold">Kebutuhan yang ingin dibahas (pilih jika relevan)</legend><div className="mt-2 flex flex-wrap gap-3">{(service === 'undername' ? ['Undername impor', 'Persetujuan Impor (PI)'] : ['PIB', 'PEB', 'HS code', 'Lartas', 'PI']).map((need) => <label key={need} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={needs.includes(need)} onChange={() => toggleNeed(need)} />{need}</label>)}</div><p className="mt-2 text-xs text-slate-500">Jenis dokumen dan izin bergantung pada komoditas serta ketentuan yang berlaku.</p></fieldset>}
    {service === 'undername' && <label className="mt-5 block text-sm font-semibold">HS code jika sudah diketahui<input name="hsCode" inputMode="numeric" placeholder="Contoh: 7208.39.90" className={field} /></label>}
    <label className="mt-6 block text-sm font-semibold">{service === 'fcl' ? 'Detail kontainer, jumlah, dan kesiapan muat' : service === 'air' ? 'Berat, dimensi, jumlah koli, dan kesiapan kirim' : 'Status dokumen dan pertanyaan kepabeanan'}<textarea name="detail" rows={3} className={field} /></label>
    <label className="mt-5 flex gap-2 text-sm text-slate-600"><input type="checkbox" required className="mt-1" />Saya setuju data ini digunakan untuk menindaklanjuti permintaan.</label>
    <button type="submit" className="button-primary mt-6 w-full sm:w-auto"><MessageCircle className="h-4 w-4" />Minta penawaran via WhatsApp</button>
    {service === 'undername' && <button type="button" onClick={(event) => { if (event.currentTarget.form) send(event.currentTarget.form, 'email'); }} className="button-secondary mt-3 w-full sm:ml-3 sm:w-auto"><Mail className="h-4 w-4" />Minta via email</button>}
    <p role="status" className="mt-3 text-xs text-slate-600">{opened === 'whatsapp' ? 'WhatsApp dibuka dengan pesan siap ditinjau. Anda masih perlu menekan Send di WhatsApp.' : opened === 'email' ? 'Email dibuka dengan draf siap ditinjau. Anda masih perlu menekan Kirim di aplikasi email.' : 'Setelah formulir valid, draf akan terbuka. Anda masih perlu mengirimnya di WhatsApp atau email.'}</p>
  </form>;
};
