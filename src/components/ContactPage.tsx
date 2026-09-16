// filepath: /src/components/ContactPage.tsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const ContactPage: React.FC<{ currentLang?: Language }> = ({ currentLang = 'id' }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    commodity: '',
    service: 'PPJK / Customs Clearance',
    origin: '',
    destination: '',
    mode: 'Laut (FCL / LCL)',
    volume: '',
    consent: false,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo GAEKS, saya ${formData.name} (${formData.company || 'Pribadi'}).\nLayanan: ${formData.service}\nModa: ${formData.mode}\nOrigin: ${formData.origin}\nDestination: ${formData.destination}\nVolume: ${formData.volume}\nKomoditas: ${formData.commodity}\nPesan: ${formData.message}`;
    window.open(`https://wa.me/6285608561745?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
            {getTranslation(currentLang, UI_TEXT.contact.tag)}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {getTranslation(currentLang, UI_TEXT.contact.title)}
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            {getTranslation(currentLang, UI_TEXT.contact.desc)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Card */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Kantor Operasional & Perwakilan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Melayani kepabeanan pelabuhan laut utama dan perwakilan bandara kargo internasional di Indonesia.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block">Hub Pelabuhan Utama</strong>
                  <span className="text-xs text-slate-600">
                    Tanjung Priok (Jakarta), Tanjung Emas (Semarang), Tanjung Perak (Surabaya).
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block">WhatsApp Resmi Dispatcher</strong>
                  <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 font-bold hover:underline">
                    0856-0856-1745 (Konsultasi Cepat)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block">Email Penawaran & Dokumen</strong>
                  <a href="mailto:Sales01@gaeks.com" className="text-xs text-blue-600 font-bold block hover:underline">
                    Sales01@gaeks.com
                  </a>
                  <a href="mailto:info@gaeks.com" className="text-xs text-slate-500 block hover:underline">
                    info@gaeks.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
            {submitted && (
              <div role="status" className="mb-6 border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                Permintaan Anda sudah disiapkan di WhatsApp. Tim operasional akan melanjutkan konsultasi dari detail yang dikirim.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {getTranslation(currentLang, UI_TEXT.contact.nameLabel)} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Nama Perusahaan / PT
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {getTranslation(currentLang, UI_TEXT.contact.emailLabel)} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {getTranslation(currentLang, UI_TEXT.contact.phoneLabel)} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {getTranslation(currentLang, UI_TEXT.contact.commodityLabel)}
                </label>
                <input
                  type="text"
                  placeholder="Misal: Mesin Industri, Tekstil, Bahan Kimia, Semen..."
                  value={formData.commodity}
                  onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-service" className="text-xs font-bold text-slate-700 block mb-1.5">Layanan yang dibutuhkan *</label>
                  <select id="contact-service" required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-cyan-600 focus:outline-none">
                    <option>PPJK / Customs Clearance</option><option>Ocean Freight - LCL / FCL</option><option>Air Freight</option><option>Trucking & Warehousing</option><option>Project Cargo & Heavy Lift</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-mode" className="text-xs font-bold text-slate-700 block mb-1.5">Moda pengiriman *</label>
                  <select id="contact-mode" required value={formData.mode} onChange={(e) => setFormData({ ...formData, mode: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-cyan-600 focus:outline-none">
                    <option>Laut (FCL / LCL)</option><option>Udara</option><option>Trucking darat</option><option>Multimoda</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div><label htmlFor="contact-origin" className="text-xs font-bold text-slate-700 block mb-1.5">Origin *</label><input id="contact-origin" required value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} placeholder="Kota / negara asal" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-cyan-600 focus:outline-none" /></div>
                <div><label htmlFor="contact-destination" className="text-xs font-bold text-slate-700 block mb-1.5">Destination *</label><input id="contact-destination" required value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} placeholder="Pelabuhan / kota tujuan" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-cyan-600 focus:outline-none" /></div>
                <div><label htmlFor="contact-volume" className="text-xs font-bold text-slate-700 block mb-1.5">Estimasi volume</label><input id="contact-volume" value={formData.volume} onChange={(e) => setFormData({ ...formData, volume: e.target.value })} placeholder="CBM / kg / koli" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-cyan-600 focus:outline-none" /></div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {getTranslation(currentLang, UI_TEXT.contact.messageLabel)} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <label className="flex items-start gap-3 text-xs text-slate-600"><input type="checkbox" required checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} className="mt-0.5 h-4 w-4 accent-cyan-700" /><span>Saya menyetujui GAEKS menggunakan detail ini untuk menindaklanjuti konsultasi pengiriman.</span></label>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-500/20 hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>{getTranslation(currentLang, UI_TEXT.contact.submitBtn)}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
