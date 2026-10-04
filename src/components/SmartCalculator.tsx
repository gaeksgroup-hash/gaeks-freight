import React, { useState, useMemo } from 'react';
import { ChevronDown, Mail, MessageCircle } from 'lucide-react';
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

const INCOTERMS_LIST = [
  { code: 'FOB', desc: 'Free on Board (Pemuatan Kapal Pelabuhan Asal)' },
  { code: 'CIF', desc: 'Cost, Insurance & Freight (Sampai Pelabuhan Tujuan)' },
  { code: 'DDP', desc: 'Delivered Duty Paid (Door to Door Pajak Bersih)' },
  { code: 'EXW', desc: 'Ex Works (Pengambilan di Pabrik/Gudang Supplier)' },
  { code: 'CFR', desc: 'Cost and Freight (Ongkos Angkut Sampai Tujuan)' },
  { code: 'DAP', desc: 'Delivered at Place (Kirim ke Alamat Pabrik Pembeli)' }
];

const QUICK_CITIES = ['Jakarta', 'Cikarang', 'Karawang', 'Semarang', 'Surabaya', 'Bandung', 'Batam'];

export const SmartCalculator: React.FC<SmartCalculatorProps> = ({ prefillService, currentLang = 'id' }) => {
  const [shippingMode, setShippingMode] = useState<ShippingMode>('ocean');
  const [selectedIncoterm, setSelectedIncoterm] = useState('FOB');
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

  // Persentase Penggunaan Kontainer 20ft (33 CBM)
  const container20ftCapacity = 33;
  const containerUsagePercent = Math.min(100, Math.round((totalVolumeCbm / container20ftCapacity) * 100));

  // Rekomendasi Cerdas: LCL vs FCL vs Air
  const recommendations = useMemo(() => {
    if (totalVolumeCbm < 15) {
      return {
        primary: {
          title: 'LCL (Less than Container Load)',
          badge: 'Rekomendasi Paling Ekonomis',
          desc: `Volume ${totalVolumeCbm} CBM sangat efisien menggunakan LCL konsolidasi mingguan karena di bawah ambang batas sewa kontainer penuh (15 CBM).`
        },
        alternative: {
          title: 'Priority Air Cargo',
          badge: 'Opsi Kargo Urgent / Darurat',
          desc: 'Waktu tempuh udara kilat 1-3 hari kerja untuk suku cadang mendesak atau komoditas time-sensitive.'
        }
      };
    } else {
      const containerType = totalVolumeCbm <= 33 ? 'Kontainer 20ft (33 CBM)' : 'Kontainer 40ft High Cube (68 CBM)';
      return {
        primary: {
          title: `FCL (${containerType})`,
          badge: 'Rekomendasi Utama (Hemat & Aman)',
          desc: `Volume ${totalVolumeCbm} CBM jauh lebih hemat menyewa 1 kontainer penuh (FCL), kargo eksklusif tanpa risiko tercampur di gudang CFS.`
        },
        alternative: {
          title: 'Priority Air Cargo (Split / Charter)',
          badge: 'Alternatif Kargo Kritis',
          desc: 'Pengiriman udara prioritas sebagian kargo untuk menjaga kelangsungan operasional perakitan pabrik.'
        }
      };
    }
  }, [totalVolumeCbm]);

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
- Klausul Incoterms: ${selectedIncoterm} (${INCOTERMS_LIST.find(i => i.code === selectedIncoterm)?.desc})
- Moda Pengiriman: ${shippingMode === 'ocean' ? 'Kargo Laut (Ocean Freight)' : 'Kargo Udara (Air Cargo)'}
- Lokasi Asal: ${originInput} (${nearestPortRecommendation ? 'Saran Hub: ' + nearestPortRecommendation.port : ''})
- Pelabuhan Tujuan: ${destinationPort}
- Dimensi: ${lengthCm} x ${widthCm} x ${heightCm} cm
- Berat: ${weightKg} kg/koli | Qty: ${quantity} koli
- ${basisText}
- Rekomendasi Sistem: ${recommendations.primary.title} (Opsi Urgent: ${recommendations.alternative.title})
Mohon informasi penawaran tarif dan jadwal kapal terdekat. Terima kasih.`;

    window.open(`https://wa.me/6285608561745?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = `Inquiry Tarif Kargo (${selectedIncoterm}) - ${originInput} ke ${destinationPort}`;
    const body = `Halo Tim Komersial Gaek Freight,

Mohon informasi tarif dan jadwal pengiriman untuk data kargo berikut:
- Klausul Incoterms: ${selectedIncoterm} (${INCOTERMS_LIST.find(i => i.code === selectedIncoterm)?.desc})
- Moda Pengiriman: ${shippingMode === 'ocean' ? 'Laut (FCL/LCL)' : 'Udara (Air Cargo)'}
- Kota Asal: ${originInput}
- Pelabuhan Tujuan: ${destinationPort}
- Ukuran: ${lengthCm} x ${widthCm} x ${heightCm} cm
- Berat per Unit: ${weightKg} kg
- Total Jumlah: ${quantity} koli
- Total Kubikasi (CBM): ${totalVolumeCbm} CBM
- Berat Volumetrik Udara: ${totalVolumetricAirKg} KG
- Rekomendasi Sistem: ${recommendations.primary.title} (Alternatif Urgent: ${recommendations.alternative.title})

Terima kasih.`;

    window.location.href = `mailto:Sales01@gaeks.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };


  return (
    <section id="calculator" aria-labelledby="calculator-title" className="section-block bg-[#f4f5f1]">
      <div className="page-shell">
        <header className="max-w-3xl">
          <p className="section-label">Perencanaan kargo</p>
          <h2 id="calculator-title" className="section-title">Hitung kebutuhan dasar sebelum meminta tarif.</h2>
          <p className="section-copy">Masukkan ukuran dan berat. Hasil ini membantu memilih moda dan menjadi ringkasan awal untuk tim kami.</p>
          {prefillService && <p className="mt-4 text-sm font-semibold text-cyan-800">Layanan dipilih: {prefillService}</p>}
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <form className="border border-slate-200 bg-white" onSubmit={(event) => event.preventDefault()}>
            <fieldset className="p-5 sm:p-7">
              <legend className="px-1 text-sm font-bold text-[#12363a]">Moda pengiriman</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(['ocean', 'air'] as ShippingMode[]).map((mode) => (
                  <button key={mode} type="button" aria-pressed={shippingMode === mode} onClick={() => setShippingMode(mode)} className={shippingMode === mode ? 'button-primary w-full' : 'button-secondary w-full'}>
                    {mode === 'ocean' ? 'Laut' : 'Udara'}
                  </button>
                ))}
              </div>
            </fieldset>

            <details open className="border-t border-slate-200">
              <summary className="flex min-h-14 items-center justify-between px-5 py-3 font-bold text-[#12363a] sm:px-7">Rute <ChevronDown className="h-4 w-4 text-slate-400" /></summary>
              <div className="grid gap-5 px-5 pb-7 sm:grid-cols-2 sm:px-7">
                <label className="text-sm font-semibold text-slate-700">Lokasi asal
                  <input className="field mt-2" value={originInput} onChange={(e) => setOriginInput(e.target.value)} />
                  {nearestPortRecommendation && <span className="mt-2 block text-xs font-normal text-slate-500">Hub terdekat: {nearestPortRecommendation.port}</span>}
                </label>
                <label className="text-sm font-semibold text-slate-700">Tujuan
                  <input className="field mt-2" value={destinationPort} onChange={(e) => setDestinationPort(e.target.value)} />
                </label>
              </div>
            </details>

            <details open className="border-t border-slate-200">
              <summary className="flex min-h-14 items-center justify-between px-5 py-3 font-bold text-[#12363a] sm:px-7">Kargo <ChevronDown className="h-4 w-4 text-slate-400" /></summary>
              <div className="px-5 pb-7 sm:px-7">
                <label className="block text-sm font-semibold text-slate-700">Preset
                  <select className="field mt-2" defaultValue="" onChange={(e) => { const p = PRESET_PACKAGES.find((item) => item.name === e.target.value); if (p) applyPreset(p); }}>
                    <option value="">Pilih jika sesuai</option>
                    {PRESET_PACKAGES.map((preset) => <option key={preset.name} value={preset.name}>{preset.name}</option>)}
                  </select>
                </label>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {[
                    ['Panjang (cm)', lengthCm, setLengthCm],
                    ['Lebar (cm)', widthCm, setWidthCm],
                    ['Tinggi (cm)', heightCm, setHeightCm],
                    ['Berat/koli (kg)', weightKg, setWeightKg],
                    ['Jumlah koli', quantity, setQuantity]
                  ].map(([label, value, setter]) => (
                    <label key={label as string} className="text-xs font-semibold text-slate-600">{label as string}
                      <input type="number" min="0" className="field mt-2" value={value as number} onChange={(e) => (setter as React.Dispatch<React.SetStateAction<number>>)(Number(e.target.value))} />
                    </label>
                  ))}
                </div>
              </div>
            </details>

            <details className="border-t border-slate-200">
              <summary className="flex min-h-14 items-center justify-between px-5 py-3 font-bold text-[#12363a] sm:px-7">Ketentuan perdagangan <ChevronDown className="h-4 w-4 text-slate-400" /></summary>
              <div className="px-5 pb-7 sm:px-7">
                <label className="text-sm font-semibold text-slate-700">Incoterm
                  <select className="field mt-2" value={selectedIncoterm} onChange={(e) => setSelectedIncoterm(e.target.value)}>
                    {INCOTERMS_LIST.map((item) => <option key={item.code} value={item.code}>{item.code} — {item.desc}</option>)}
                  </select>
                </label>
              </div>
            </details>
          </form>

          <aside className="border-t-4 border-cyan-700 bg-[#0b3438] p-6 text-white sm:p-8 lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Ringkasan hitung</p>
            <div className="mt-6 grid grid-cols-2 gap-6 border-y border-white/15 py-6">
              <div><span className="block text-sm text-slate-300">Volume</span><strong className="mt-1 block text-3xl">{totalVolumeCbm}</strong><span className="text-xs text-slate-400">CBM</span></div>
              <div><span className="block text-sm text-slate-300">{shippingMode === 'air' ? 'Berat tagihan' : 'Basis tagihan'}</span><strong className="mt-1 block text-3xl">{shippingMode === 'air' ? airChargeableBasis.toFixed(1) : oceanChargeableBasis.toFixed(3)}</strong><span className="text-xs text-slate-400">{shippingMode === 'air' ? 'kg' : 'W/M'}</span></div>
            </div>
            <div className="py-6">
              <span className="text-xs text-slate-400">Saran awal</span>
              <h3 className="mt-2 text-xl font-bold">{recommendations.primary.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{recommendations.primary.desc}</p>
            </div>
            <details className="border-y border-white/15">
              <summary className="flex min-h-12 items-center justify-between text-sm font-bold">Lihat dasar perhitungan <ChevronDown className="h-4 w-4" /></summary>
              <dl className="space-y-2 pb-5 text-sm text-slate-300">
                <div className="flex justify-between gap-4"><dt>Berat aktual</dt><dd>{totalActualWeightKg} kg</dd></div>
                <div className="flex justify-between gap-4"><dt>Berat volumetrik udara</dt><dd>{totalVolumetricAirKg} kg</dd></div>
                <div className="flex justify-between gap-4"><dt>Penggunaan kontainer 20ft</dt><dd>{containerUsagePercent}%</dd></div>
              </dl>
            </details>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <button type="button" onClick={handleSendWhatsApp} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 text-sm font-bold text-[#082f34] hover:bg-cyan-200"><MessageCircle className="h-4 w-4" />Kirim ke WhatsApp</button>
              <button type="button" onClick={handleSendEmail} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/30 px-4 text-sm font-bold hover:bg-white/10"><Mail className="h-4 w-4" />Kirim email</button>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-400">Hasil bersifat estimasi volume dan dasar tagihan, bukan harga final.</p>
          </aside>
        </div>
      </div>
    </section>
  );
};
