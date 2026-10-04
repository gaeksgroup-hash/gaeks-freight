import React, { useEffect, useState } from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Language } from '../types/freight';
import { getStoredBranding, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';

export const ContactPage: React.FC<{ currentLang?: Language }> = () => {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', commodity: '',
    service: 'PPJK / Customs Clearance', origin: '', destination: '',
    mode: 'Laut (FCL / LCL)', volume: '', consent: false, message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [branding, setBranding] = useState(getStoredBranding());

  useEffect(() => {
    const reload = () => setBranding(getStoredBranding());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const whatsappNumber = (() => { const digits = branding.whatsappNumber.replace(/\D/g, ''); return digits.startsWith('0') ? `62${digits.slice(1)}` : digits; })();

  const set = (key: keyof typeof formData, value: string | boolean) => setFormData((current) => ({ ...current, [key]: value }));
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = `Halo GAEKS, saya ${formData.name} dari ${formData.company || 'perusahaan/pribadi'}.
Layanan: ${formData.service}
Moda: ${formData.mode}
Rute: ${formData.origin} ke ${formData.destination}
Volume: ${formData.volume}
Komoditas: ${formData.commodity}
Pesan: ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=` + encodeURIComponent(text), '_blank');
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#f4f5f1] pt-16 text-[#12363a]">
      <section className="page-shell py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
          <header>
            <p className="section-label">Kontak</p>
            <h1 className="section-title">Ceritakan rute dan kebutuhan kargo Anda.</h1>
            <p className="section-copy">Kami akan membuka ringkasan terisi di WhatsApp agar Anda dapat memeriksanya sebelum mengirim.</p>
            <div className="mt-8 border-y border-slate-300 py-4 text-sm">
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 hover:text-cyan-700"><Phone className="h-4 w-4" />{branding.whatsappDisplay}</a>
              <a href={`mailto:${branding.salesEmail}`} className="flex min-h-11 items-center gap-3 hover:text-cyan-700"><Mail className="h-4 w-4" />{branding.salesEmail}</a>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="border border-slate-200 bg-white p-5 sm:p-8">
            <fieldset>
              <legend className="text-sm font-bold">Kontak</legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">Nama *<input required className="field mt-2" value={formData.name} onChange={(e) => set('name', e.target.value)} /></label>
                <label className="text-sm font-semibold text-slate-700">Perusahaan<input className="field mt-2" value={formData.company} onChange={(e) => set('company', e.target.value)} /></label>
                <label className="text-sm font-semibold text-slate-700">Email *<input required type="email" className="field mt-2" value={formData.email} onChange={(e) => set('email', e.target.value)} /></label>
                <label className="text-sm font-semibold text-slate-700">Telepon *<input required type="tel" className="field mt-2" value={formData.phone} onChange={(e) => set('phone', e.target.value)} /></label>
              </div>
            </fieldset>

            <fieldset className="mt-8 border-t border-slate-200 pt-7">
              <legend className="text-sm font-bold">Pengiriman</legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">Layanan<select className="field mt-2" value={formData.service} onChange={(e) => set('service', e.target.value)}><option>PPJK / Customs Clearance</option><option>Ocean Freight - LCL / FCL</option><option>Air Freight</option><option>Trucking & Warehousing</option><option>Project Cargo & Heavy Lift</option></select></label>
                <label className="text-sm font-semibold text-slate-700">Moda<select className="field mt-2" value={formData.mode} onChange={(e) => set('mode', e.target.value)}><option>Laut (FCL / LCL)</option><option>Udara</option><option>Trucking darat</option><option>Multimoda</option></select></label>
                <label className="text-sm font-semibold text-slate-700">Asal *<input required className="field mt-2" placeholder="Kota atau negara" value={formData.origin} onChange={(e) => set('origin', e.target.value)} /></label>
                <label className="text-sm font-semibold text-slate-700">Tujuan *<input required className="field mt-2" placeholder="Pelabuhan atau kota" value={formData.destination} onChange={(e) => set('destination', e.target.value)} /></label>
                <label className="text-sm font-semibold text-slate-700">Komoditas<input className="field mt-2" value={formData.commodity} onChange={(e) => set('commodity', e.target.value)} /></label>
                <label className="text-sm font-semibold text-slate-700">Estimasi volume<input className="field mt-2" placeholder="CBM, kg, atau koli" value={formData.volume} onChange={(e) => set('volume', e.target.value)} /></label>
              </div>
              <label className="mt-4 block text-sm font-semibold text-slate-700">Catatan<textarea rows={3} className="field mt-2" value={formData.message} onChange={(e) => set('message', e.target.value)} /></label>
            </fieldset>

            <label className="mt-6 flex items-start gap-3 text-sm text-slate-600"><input type="checkbox" required checked={formData.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 h-4 w-4 accent-cyan-700" /><span>Saya setuju detail ini digunakan untuk menindaklanjuti konsultasi.</span></label>
            <button type="submit" className="button-primary mt-6 w-full sm:w-auto"><MessageCircle className="h-4 w-4" />{submitted ? 'Buka lagi di WhatsApp' : 'Tinjau di WhatsApp'}</button>
          </form>
        </div>
      </section>
    </main>
  );
};
