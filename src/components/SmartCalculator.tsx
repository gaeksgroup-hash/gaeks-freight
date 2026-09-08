import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, Send, Mail, MapPin, Ship, Plane, Scale, Anchor } from 'lucide-react';
import { ShippingMode, PortEntry } from '../types/freight';
import { findSmartNearestPort } from '../utils/portFinder';

export const SmartCalculator: React.FC<{ prefillService?: string }> = ({ prefillService }) => {
  const [mode, setMode] = useState<ShippingMode>('ocean');
  const [originAddress, setOriginAddress] = useState('Cikarang, Bekasi');
  const [destinationCity, setDestinationCity] = useState('Semarang (Tanjung Emas)');
  const [suggestedPort, setSuggestedPort] = useState<PortEntry | null>(null);

  const [lengthCm, setLengthCm] = useState<number>(120);
  const [widthCm, setWidthCm] = useState<number>(80);
  const [heightCm, setHeightCm] = useState<number>(100);
  const [pieces, setPieces] = useState<number>(2);
  const [actualWeightKgPerPiece, setActualWeightKgPerPiece] = useState<number>(150);

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');

  useEffect(() => {
    const found = findSmartNearestPort(originAddress);
    setSuggestedPort(found);
  }, [originAddress]);

  const totalActualWeightKg = actualWeightKgPerPiece * pieces;
  const totalVolumeCbm = ((lengthCm * widthCm * heightCm) / 1000000) * pieces;
  const oceanWeightInTon = totalActualWeightKg / 1000;
  const oceanChargeableCbm = Math.max(totalVolumeCbm, oceanWeightInTon);
  const isOceanWeightDominant = oceanWeightInTon > totalVolumeCbm;

  const airVolumetricWeightKg = ((lengthCm * widthCm * heightCm) / 6000) * pieces;
  const airChargeableWeightKg = Math.max(totalActualWeightKg, airVolumetricWeightKg);
  const isAirVolumetricDominant = airVolumetricWeightKg > totalActualWeightKg;

  const buildSummaryText = () => {
    const portText = suggestedPort 
      ? `Pelabuhan Terdekat yang Disarankan: ${suggestedPort.port} (${suggestedPort.code}) - Gateway: ${suggestedPort.gateway}`
      : 'Pelabuhan Terdekat: Mengikuti koordinat penjemputan';

    return `*INQUIRY PENGIRIMAN KARGO - GAEKS GROUP*
Layanan: ${prefillService || (mode === 'ocean' ? 'Ocean Freight (FCL/LCL)' : 'Air Freight Cargo')}
Perusahaan: ${companyName || '-'} (Kontak: ${contactName || '-'})

*DETAIL RUTE & PELABUHAN:*
- Alamat Muat / Pick-up: ${originAddress}
- ${portText}
- Pelabuhan / Kota Tujuan: ${destinationCity}

*SPESIFIKASI KARGO:*
- Dimensi per Koli: ${lengthCm} x ${widthCm} x ${heightCm} cm
- Jumlah Koli: ${pieces} Koli
- Total Berat Fisik: ${totalActualWeightKg.toLocaleString()} KG
${mode === 'ocean' 
  ? `- Total Volume Kubikasi: ${totalVolumeCbm.toFixed(3)} CBM
- Dasar Chargeable Laut (/1.000.000): ${oceanChargeableCbm.toFixed(3)} CBM (${isOceanWeightDominant ? 'Dasar Bobot Tonase' : 'Dasar Kubikasi CBM'})`
  : `- Berat Volumetrik Udara (/6.000): ${airVolumetricWeightKg.toFixed(1)} KG
- Dasar Chargeable Udara: ${airChargeableWeightKg.toFixed(1)} KG (${isAirVolumetricDominant ? 'Dasar Volumetrik' : 'Dasar Berat Aktual'})`}

Mohon informasi jadwal sailing/flight terdekat, estimasi biaya kargo, dan penanganan PPJK. Terima kasih.`;
  };

  const handleSendWhatsApp = () => {
    const text = buildSummaryText();
    window.open(`https://wa.me/6285608561745?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`[INQUIRY KARGO] ${companyName || 'Klien Baru'} - Rute ${originAddress} ke ${destinationCity}`);
    const body = encodeURIComponent(buildSummaryText());
    window.location.href = `mailto:Sales01@gaeks.com,info@gaeks.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="calculator" className="py-20 bg-slate-900 border-y border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase mb-3">
            <CalcIcon className="w-4 h-4" />
            <span>Smart Port-Finder & Freight Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Pencari Port Terdekat & Kalkulator Kargo
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Ketikkan alamat asal barang untuk rekomendasi pelabuhan terdekat, serta hitung otomatis kubikasi laut (/1.000.000) dan berat volumetrik udara (/6.000).
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-brand-darkBlue rounded-3xl shadow-2xl border border-slate-800 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  1. Pilih Moda Pengiriman
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode('ocean')}
                    className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border flex items-center justify-center space-x-2 transition-all ${
                      mode === 'ocean' ? 'bg-brand-orange text-white border-brand-orange shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    <Ship className="w-4 h-4" />
                    <span>Laut (CBM / 1.000.000)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('air')}
                    className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm border flex items-center justify-center space-x-2 transition-all ${
                      mode === 'air' ? 'bg-brand-orange text-white border-brand-orange shadow-lg' : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    <Plane className="w-4 h-4" />
                    <span>Udara (Volumetrik / 6.000)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  2. Lokasi Asal Barang (Sistem Smart Port)
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={originAddress}
                      onChange={(e) => setOriginAddress(e.target.value)}
                      placeholder="Ketik kota/alamat, contoh: Cikarang, Solo, Surabaya, Shanghai, Ningbo, Rotterdam..."
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>

                  {suggestedPort && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-brand-orange/40 space-y-1.5 shadow-md">
                      <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider">
                        <Anchor className="w-4 h-4" />
                        <span>Saran Pelabuhan Terdekat:</span>
                      </div>
                      <div className="text-base font-black text-white">
                        {suggestedPort.port} ({suggestedPort.code})
                      </div>
                      <div className="text-xs text-slate-300 flex flex-wrap gap-x-4">
                        <span>Negara: <strong className="text-white">{suggestedPort.country} ({suggestedPort.region})</strong></span>
                        <span>Gateway: <strong className="text-brand-orange">{suggestedPort.gateway}</strong></span>
                      </div>
                      <p className="text-[11px] text-slate-400 italic pt-1">
                        Catatan: {suggestedPort.note}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Pelabuhan / Kota Tujuan</label>
                    <input
                      type="text"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  3. Dimensi Kargo per Koli (Centimeter)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold">Panjang (P) cm</span>
                    <input
                      type="number"
                      min="1"
                      value={lengthCm}
                      onChange={(e) => setLengthCm(Math.max(1, Number(e.target.value)))}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold">Lebar (L) cm</span>
                    <input
                      type="number"
                      min="1"
                      value={widthCm}
                      onChange={(e) => setWidthCm(Math.max(1, Number(e.target.value)))}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-semibold">Tinggi (T) cm</span>
                    <input
                      type="number"
                      min="1"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Math.max(1, Number(e.target.value)))}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-sm text-white font-bold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Jumlah Koli (Pcs)</label>
                  <input
                    type="number"
                    min="1"
                    value={pieces}
                    onChange={(e) => setPieces(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Berat Fisik Aktual (KG/Pcs)</label>
                  <input
                    type="number"
                    min="1"
                    value={actualWeightKgPerPiece}
                    onChange={(e) => setActualWeightKgPerPiece(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Nama Perusahaan (Opsional)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="PT / CV..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Nama PIC Kontak</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Nama Anda..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-lg border border-slate-800">
              <div>
                <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
                  <Scale className="w-4 h-4" />
                  <span>Kalkulasi Chargeable Basis</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-semibold block">Total Berat Fisik Aktual</span>
                    <div className="text-2xl font-black text-white mt-1">
                      {totalActualWeightKg.toLocaleString()} <span className="text-sm font-bold text-slate-400">KG</span>
                    </div>
                  </div>

                  {mode === 'ocean' ? (
                    <>
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 font-semibold block">Volume Kubikasi (P x L x T / 1.000.000)</span>
                        <div className="text-2xl font-black text-white mt-1">
                          {totalVolumeCbm.toFixed(3)} <span className="text-sm font-bold text-brand-orange">CBM</span>
                        </div>
                      </div>

                      <div className="bg-brand-orange/15 p-4 rounded-xl border border-brand-orange/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-orange uppercase">Dasar Tagihan Laut</span>
                          <span className="text-[10px] bg-brand-orange text-white px-2 py-0.5 rounded font-bold">Tertinggi</span>
                        </div>
                        <div className="text-3xl font-black text-white mt-1">
                          {oceanChargeableCbm.toFixed(3)} <span className="text-lg text-brand-orange">CBM</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-2">
                          {isOceanWeightDominant ? 'Dihitung berdasarkan berat tonase (1 Ton = 1 CBM).' : 'Dihitung berdasarkan total kubikasi murni kargo laut.'}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 font-semibold block">Berat Volumetrik Udara (P x L x T / 6.000)</span>
                        <div className="text-2xl font-black text-white mt-1">
                          {airVolumetricWeightKg.toFixed(1)} <span className="text-sm font-bold text-brand-orange">KG</span>
                        </div>
                      </div>

                      <div className="bg-brand-orange/15 p-4 rounded-xl border border-brand-orange/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-orange uppercase">Chargeable Weight Udara</span>
                          <span className="text-[10px] bg-brand-orange text-white px-2 py-0.5 rounded font-bold">Tertinggi</span>
                        </div>
                        <div className="text-3xl font-black text-white mt-1">
                          {airChargeableWeightKg.toFixed(1)} <span className="text-lg text-brand-orange">KG</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-2">
                          {isAirVolumetricDominant ? 'Dihitung dari berat volumetrik udara karena kargo berukuran besar.' : 'Dihitung dari berat fisik aktual kargo.'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-md shadow-emerald-900/40"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim via WhatsApp (0856-0856-1745)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all"
                >
                  <Mail className="w-4 h-4 text-brand-orange" />
                  <span>Kirim via Email (Sales01@gaeks.com)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
