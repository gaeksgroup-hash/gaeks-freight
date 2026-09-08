// filepath: /src/components/Calculator.tsx
import React, { useState } from 'react';
import { Calculator as CalcIcon, Send, Box } from 'lucide-react';
import { CargoCalcState } from '../types/freight';

export const Calculator: React.FC = () => {
  const [calc, setCalc] = useState<CargoCalcState>({
    lengthCm: 120,
    widthCm: 80,
    heightCm: 100,
    pieces: 1,
    actualWeightKg: 150,
    mode: 'ocean'
  });

  const [origin, setOrigin] = useState('Jakarta (IDJKT)');
  const [destination, setDestination] = useState('Singapore (SGSIN)');

  const totalCbm = ((calc.lengthCm * calc.widthCm * calc.heightCm) / 1000000) * calc.pieces;
  const volumetricWeightAir = ((calc.lengthCm * calc.widthCm * calc.heightCm) / 6000) * calc.pieces;
  const chargeableWeightAir = Math.max(calc.actualWeightKg * calc.pieces, volumetricWeightAir);

  const generateWhatsAppInquiry = () => {
    const text = `Halo GAEKS FREIGHT, saya ingin mengajukan inquiry pengiriman:
- Mode: ${calc.mode === 'ocean' ? 'Ocean Freight (Laut)' : 'Air Freight (Udara)'}
- Rute: ${origin} -> ${destination}
- Dimensi: ${calc.lengthCm} x ${calc.widthCm} x ${calc.heightCm} cm (${calc.pieces} Koli)
- Total Volume: ${totalCbm.toFixed(3)} CBM
- Berat Aktual: ${calc.actualWeightKg * calc.pieces} KG
${calc.mode === 'air' ? `- Chargeable Weight (Air): ${chargeableWeightAir.toFixed(1)} KG\n` : ''}Mohon konfirmasi rate & jadwal terdekat. Terima kasih.`;
    
    return `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="calculator" className="py-20 bg-brand-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase mb-3">
            <CalcIcon className="w-3.5 h-3.5" />
            <span>Instant Rate Inquiry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
            Kalkulator Volume CBM & Berat Kargo
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Hitung kubikasi dan bobot chargeable kargo Anda sebelum meminta penawaran tarif resmi.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-brand-border p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Moda Kargo
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCalc({ ...calc, mode: 'ocean' })}
                    className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${
                      calc.mode === 'ocean' 
                        ? 'bg-brand-navy text-white border-brand-navy shadow-md' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Ocean Freight (Laut)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalc({ ...calc, mode: 'air' })}
                    className={`py-3 px-4 rounded-xl font-bold text-sm border transition-all ${
                      calc.mode === 'air' 
                        ? 'bg-brand-navy text-white border-brand-navy shadow-md' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Air Freight (Udara)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Origin Port / City</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Dimensi per Koli (Centimeter)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold">Panjang (P)</span>
                    <input
                      type="number"
                      value={calc.lengthCm}
                      onChange={(e) => setCalc({ ...calc, lengthCm: Number(e.target.value) })}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold">Lebar (L)</span>
                    <input
                      type="number"
                      value={calc.widthCm}
                      onChange={(e) => setCalc({ ...calc, widthCm: Number(e.target.value) })}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-semibold">Tinggi (T)</span>
                    <input
                      type="number"
                      value={calc.heightCm}
                      onChange={(e) => setCalc({ ...calc, heightCm: Number(e.target.value) })}
                      className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Koli (Pcs)</label>
                  <input
                    type="number"
                    min="1"
                    value={calc.pieces}
                    onChange={(e) => setCalc({ ...calc, pieces: Math.max(1, Number(e.target.value)) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Berat Aktual (KG/Pcs)</label>
                  <input
                    type="number"
                    value={calc.actualWeightKg}
                    onChange={(e) => setCalc({ ...calc, actualWeightKg: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-brand-orange focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-brand-navy rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
                  <Box className="w-4 h-4" />
                  <span>Kalkulasi Otomatis</span>
                </div>

                <div className="space-y-4">
                  <div className="border-b border-brand-darkBlue pb-4">
                    <span className="text-xs text-slate-400 font-medium block">Total Volume Kubikasi</span>
                    <div className="text-3xl font-black text-white mt-1">
                      {totalCbm.toFixed(3)} <span className="text-lg text-brand-orange font-bold">CBM</span>
                    </div>
                  </div>

                  <div className="border-b border-brand-darkBlue pb-4">
                    <span className="text-xs text-slate-400 font-medium block">Total Berat Aktual</span>
                    <div className="text-xl font-bold text-slate-200 mt-1">
                      {(calc.actualWeightKg * calc.pieces).toLocaleString()} KG
                    </div>
                  </div>

                  {calc.mode === 'air' && (
                    <div className="border-b border-brand-darkBlue pb-4">
                      <span className="text-xs text-slate-400 font-medium block">Chargeable Weight (Air Freight)</span>
                      <div className="text-2xl font-black text-brand-orange mt-1">
                        {chargeableWeightAir.toFixed(1)} KG
                      </div>
                      <span className="text-[10px] text-slate-400 italic">Dihitung dari nilai tertinggi antara berat fisik vs volumetrik.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={generateWhatsAppInquiry()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-brand-orange hover:bg-brand-orangeHover text-white py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-lg shadow-brand-orange/30 hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Data ke WhatsApp GAEKS</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
