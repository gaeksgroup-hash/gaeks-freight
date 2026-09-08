// filepath: /src/components/ContactPage.tsx
import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('PPJK');
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo GAEKS FREIGHT (gaeks.com), saya ingin konsultasi kargo:
- Nama: ${name}
- Perusahaan: ${company || '-'}
- Kontak: ${phone} | ${email}
- Layanan: ${service}
- Pesan: ${message}`;

    window.open(`https://wa.me/6285608561745?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendMail = () => {
    const subject = encodeURIComponent(`[INQUIRY KONTAK] ${company || name} - Layanan ${service}`);
    const body = encodeURIComponent(`Nama: ${name}\nPerusahaan: ${company}\nTelepon: ${phone}\nEmail: ${email}\nLayanan: ${service}\n\nPesan:\n${message}`);
    window.location.href = `mailto:Sales01@gaeks.com,info@gaeks.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="pt-32 pb-24 bg-brand-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange block mb-2">
            Hubungi GAEKS FREIGHT
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-navy tracking-tight">
            Konsultasi Rute, Kepabeanan, & Tarif Kargo
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Tim freight specialist kami siap merespons kebutuhan ekspor, impor, custom clearance PPJK, pergudangan PBM, hingga distribusi inland trucking Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-navy text-white rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-black border-b border-brand-darkBlue pb-4">
                Kontak Resmi Operasional
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">WhatsApp Langsung</span>
                    <a href="https://wa.me/6285608561745" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-white hover:text-brand-orange transition-colors">
                      +62 856-0856-1745
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Email Sales & Inquiry</span>
                    <a href="mailto:Sales01@gaeks.com" className="font-bold text-white hover:text-brand-orange block transition-colors">
                      Sales01@gaeks.com
                    </a>
                    <span className="text-xs text-slate-400 block font-semibold mt-2">Email Informasi Umum</span>
                    <a href="mailto:info@gaeks.com" className="font-bold text-white hover:text-brand-orange block transition-colors">
                      info@gaeks.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Wilayah Pelabuhan Utama</span>
                    <span className="text-xs sm:text-sm text-slate-200 leading-relaxed block">
                      Tanjung Priok (Jakarta), Tanjung Emas (Semarang), Tanjung Perak (Surabaya).
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Jam Operasional</span>
                    <span className="text-xs text-slate-200 block">
                      Senin - Sabtu: 08.00 - 18.00 WIB (Monitoring 24/7)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-sm flex items-center space-x-3 text-slate-700">
              <ShieldCheck className="w-6 h-6 text-brand-orange flex-shrink-0" />
              <p className="text-xs leading-relaxed">
                Kerahasiaan dokumen invoice, packing list, dan perizinan kepabeanan Anda dilindungi oleh kode etik PPJK resmi.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-brand-border p-8 sm:p-10 shadow-xl">
            <h3 className="text-2xl font-black text-brand-navy mb-2">Formulir Pertanyaan & Permintaan Tarif</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Kirimkan detail kebutuhan kargo Anda, tim kami akan merespons dalam 1x24 jam kerja.
            </p>

            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Perusahaan</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="PT / CV..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="0812xxxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    placeholder="email@perusahaan.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Layanan yang Dibutuhkan</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-brand-orange focus:outline-none bg-white"
                >
                  <option value="PPJK (Customs Clearance)">PPJK (Customs Clearance)</option>
                  <option value="Gudang / PBM (Bongkar Muat)">Gudang / PBM (Bongkar Muat)</option>
                  <option value="Domestic Trucking">Domestic Trucking</option>
                  <option value="Project Cargo & Heavy Lift">Project Cargo & Heavy Lift</option>
                  <option value="Ocean Freight LCL">Ocean Freight LCL</option>
                  <option value="Ocean Freight FCL">Ocean Freight FCL</option>
                  <option value="Air Shipment Priority">Air Shipment Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rincian Kargo / Komoditas</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Sebutkan rute pengiriman, jenis komoditas, perkiraan tonase/CBM, dan target waktu pengiriman..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim via WhatsApp (0856-0856-1745)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendMail}
                  className="flex items-center justify-center space-x-2 bg-brand-navy hover:bg-brand-darkBlue text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all"
                >
                  <Mail className="w-4 h-4 text-brand-orange" />
                  <span>Kirim via Email Resmi</span>
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
