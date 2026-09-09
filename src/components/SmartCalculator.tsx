// filepath: /src/components/SmartCalculator.tsx
import React, { useState, useMemo } from 'react';
import { Ship, Plane, ArrowRight, MessageCircle, Mail, Package, Box, Layers, CheckCircle2 } from 'lucide-react';
import { findSmartNearestPort } from '../utils/portFinder';
import { ShippingMode, Language } from '../types/freight';

interface SmartCalculatorProps {
  prefillService?: string;
  currentLang?: Language;
}

const PRESET_PACKAGES = [
  { name: 'Karton Standar', p: 50, l: 40, t: 40, w: 15, pcs: 5 },
  { name: 'Palet Kayu Industri', p: 120, l: 100, t: 160, w: 450, pcs: 2 },
  { name: 'Drum Baja Cairan', p: 60, l: 60, t: 90, w: 200, pcs: 4 }
];

const QUICK_CITIES = ['Jakarta', 'Cikarang', 'Karawang', 'Semarang', 'Surabaya', 'Bandung', 'Batam'];

export const SmartCalculator: React.FC<SmartCalculatorProps> = ({ prefillService, currentLang = 'id' }) => {
  const [shippingMode, setShippingMode] = useState<ShippingMode>('ocean');
  const [originInput, setOriginInput] = useState('Cikarang, Bekasi');
  const [destinationPort, setDestinationPort] = useState('Jakarta (Tanjung Priok / IDJKT)');
  
  // Parameter Dimensi & Kargo
  const [lengthCm, setLengthCm] = useState(120);
  const [widthCm, setWidthCm] = useState(100);
  const [heightCm, setHeightCm] = useState(150);
  const [weightKg, setWeightKg] = useState(400);
  const [quantity, setQuantity] = useState(2);

  // Rekomendasi Port Terdekat Otomatis
  const nearestPortRecommendation = useMemo(() => {
    return findSmartNearestPort(originInput);
  }, [originInput]);

  // Perhitungan Otomatis Real-time
  const totalVolumeCbm = useMemo(() => {
    if (!lengthCm || !widthCm || !heightCm || !quantity) return 0;
    const singleCbm = (lengthCm * widthCm * heightCm) / 1000000;
    return Number((singleCbm * quantity).toFixed(3));
  }, [lengthCm, widthCm, heightCm, quantity]);

  const totalVolumetricAirKg = useMemo(() => {
    if (!lengthCm || !widthCm || !heightCm || !quantity) return 0;
    const singleAir = (lengthCm * widthCm * heightCm) / 6000;
    return Number((singleAir * quantity).toFixed(1));
  }, [lengthCm, widthCm, heightCm, quantity]);

  const totalActualWeightKg = useMemo(() => {
    return Number(((weightKg || 0) * (quantity || 1)).toFixed(1));
  }, [weightKg, quantity]);

  // Evaluasi Dasar Tagihan (Chargeable Weight)
  const oceanChargeableTon = totalActualWeightKg / 1000;
  const oceanChargeableBasis = Math.max(totalVolumeCbm, oceanChargeableTon);
  const isOceanWeightDominant = oceanChargeableTon > totalVolumeCbm;

  const isAirVolumetricDominant = totalVolumetricAirKg > totalActualWeightKg;
  const airChargeableBasis = Math.max(totalVolumetricAirKg, totalActualWeightKg);

  const applyPreset = (preset: typeof PRESET_PACKAGES[0]) => {
    setLengthCm(preset.p);
    setWidthCm(preset.l);
    setHeightCm(preset.t);
    setWeightKg(preset.w);
    setQuantity(preset.pcs);
  };

  const handleSendWhatsApp = () => {
    const basisText = shippingMode === 'ocean'
      ? `Total CBM: ${totalVolumeCbm} CBM (Dasar Tagihan: ${oceanChargeableBasis.toFixed(3)} CBM)`
      : `Total Volumetrik: ${totalVolumetricAirKg} KG (Dasar Tagihan: ${airChargeableBasis} KG)`;

    const text = `Halo Gaek Freight, saya ingin konsultasi tarif kargo:
- Moda: ${shippingMode === 'ocean' ? 'Kargo Laut (Ocean Freight)' : 'Kargo Udara (Air Cargo)'}
- Lokasi Asal: ${originInput} (${nearestPortRecommendation ? 'Saran Hub: ' + nearestPortRecommendation.port : ''})
- Pelabuhan Tujuan: ${destinationPort}
- Dimensi: ${lengthCm} x ${widthCm} x ${heightCm} cm
- Berat: ${weightKg} kg/koli | Qty: ${quantity} koli
- ${basisText}
Mohon informasi penawaran tarif dan jadwal kapal terdekat. Terima kasih.`;

    window.open(`https://wa.me/6285608561745?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = `Permohonan Penawaran Tarif Kargo - ${originInput} ke ${destinationPort}`;
    const body = `Halo Tim Komersial Gaek Freight,

Mohon informasi tarif dan jadwal pengiriman untuk data kargo berikut:
- Moda Pengiriman: ${shippingMode === 'ocean' ? 'Laut (FCL/LCL)' : 'Udara (Air Cargo)'}
- Kota Asal: ${originInput}
- Pelabuhan Tujuan: ${destinationPort}
- Ukuran: ${lengthCm} x ${widthCm} x ${heightCm} cm
- Berat per Unit: ${weightKg} kg
- Total Jumlah: ${quantity} koli
- Total Kubikasi (CBM): ${totalVolumeCbm} CBM
- Berat Volumetrik Udara: ${totalVolumetricAirKg} KG

Terima kasih.`;

    window.location.href = `mailto:Sales01@gaeks.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="calculator" className="py-20 bg-slate-50 border-y border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bersih & Ringkas */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
            Smart Dispatch & Volumetric Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Cargo Check!
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Hitung kubikasi laut (CBM), berat volumetrik udara, dan deteksi otomatis pelabuhan terdekat dalam hitungan detik.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Kiri: Formulir Interaktif Cepat */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            
            {/* Step 1: Mode Switcher */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                1. Pilih Moda Kargo:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShippingMode('ocean')}
                  className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                    shippingMode === 'ocean'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Ship className="w-4 h-4" />
                  <span>Kargo Laut (CBM / 1.000.000)</span>
                </button>
                <button
                  onClick={() => setShippingMode('air')}
                  className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-xs font-bold transition-all ${
                    shippingMode === 'air'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  <span>Kargo Udara (/ 6.000)</span>
                </button>
              </div>
            </div>

            {/* Step 2: Lokasi & Rekomendasi Port */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                2. Lokasi Asal & Pelabuhan Tujuan:
              </label>
              
              <div className="space-y-2">
                <input
                  type="text"
                  value={originInput}
                  onChange={(e) => setOriginInput(e.target.value)}
                  placeholder="Ketik alamat pabrik, kota, atau kawasan industri..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />

                {/* Quick City Chips */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] text-slate-500 font-medium mr-1">Kota Populer:</span>
                  {QUICK_CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => setOriginInput(city)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold border border-slate-200 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rekomendasi Port Terdekat Badge Otomatis */}
              {nearestPortRecommendation && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 font-medium">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Rekomendasi Port: <strong>{nearestPortRecommendation.port}</strong> ({nearestPortRecommendation.code})</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">Rute Terdekat</span>
                </div>
              )}

              {/* Pelabuhan Tujuan */}
              <div>
                <select
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                >
                  <option value="Jakarta (Tanjung Priok / IDJKT)">Jakarta — Pelabuhan Tanjung Priok (IDJKT)</option>
                  <option value="Semarang (Tanjung Emas / IDSRG)">Semarang — Pelabuhan Tanjung Emas (IDSRG)</option>
                  <option value="Surabaya (Tanjung Perak / IDSUB)">Surabaya — Pelabuhan Tanjung Perak (IDSUB)</option>
                </select>
              </div>
            </div>

            {/* Step 3: Dimensi & Pilihan Preset Cepat */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  3. Ukuran Paket (P x L x T cm & Berat kg):
                </label>
                <div className="flex items-center space-x-1">
                  {PRESET_PACKAGES.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold border border-slate-200"
                      title="Klik untuk isi ukuran otomatis"
                    >
                      {preset.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block mb-1">Panjang (cm)</span>
                  <input
                    type="number"
                    min="1"
                    value={lengthCm}
                    onChange={(e) => setLengthCm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block mb-1">Lebar (cm)</span>
                  <input
                    type="number"
                    min="1"
                    value={widthCm}
                    onChange={(e) => setWidthCm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block mb-1">Tinggi (cm)</span>
                  <input
                    type="number"
                    min="1"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block mb-1">Berat (kg/koli)</span>
                  <input
                    type="number"
                    min="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block mb-1">Jumlah (pcs)</span>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: Dashboard Hasil Real-Time Interaktif */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-10 rounded-3xl border-2 border-blue-600 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700">
                Live Calculation Output
              </span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Real-Time
              </span>
            </div>

            {/* Metric Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Kubikasi Laut (CBM)</span>
                <span className="text-2xl font-black text-slate-900">{totalVolumeCbm}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Rumus: PxLxT / 1.000.000</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 block mb-1">Volumetrik Udara</span>
                <span className="text-2xl font-black text-slate-900">{totalVolumetricAirKg} <small className="text-xs font-normal">kg</small></span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Rumus: PxLxT / 6.000</span>
              </div>
            </div>

            {/* Evaluasi Dasar Tagihan (Chargeable Rule) */}
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-blue-900 block">
                Dasar Tagihan Resmi (Chargeable Weight):
              </span>
              
              {shippingMode === 'ocean' ? (
                <div>
                  <div className="text-xl font-black text-blue-700">
                    {oceanChargeableBasis.toFixed(3)} CBM
                  </div>
                  <p className="text-xs text-blue-800 mt-1">
                    {isOceanWeightDominant 
                      ? 'Beban tonase fisik (' + (totalActualWeightKg/1000).toFixed(2) + ' Ton) lebih tinggi dari volume, tagihan dihitung berdasarkan tonase.' 
                      : 'Volume kubikasi (' + totalVolumeCbm + ' CBM) lebih tinggi dari berat fisik, tagihan dihitung murni kubikasi.'}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-xl font-black text-blue-700">
                    {airChargeableBasis} KG
                  </div>
                  <p className="text-xs text-blue-800 mt-1">
                    {isAirVolumetricDominant 
                      ? 'Berat volumetrik (' + totalVolumetricAirKg + ' kg) lebih tinggi dari berat aktual (' + totalActualWeightKg + ' kg).' 
                      : 'Berat aktual fisik (' + totalActualWeightKg + ' kg) lebih tinggi dari berat volumetrik.'}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons: WhatsApp & Email Instan */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-xl font-bold text-sm transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Rincian ke WhatsApp (0856-0856-1745)</span>
              </button>

              <button
                onClick={handleSendEmail}
                className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white py-3 px-6 rounded-xl font-bold text-xs transition-all shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Kirim via Email Resmi (Sales01@gaeks.com)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
