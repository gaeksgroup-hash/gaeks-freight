import React, { useMemo, useState } from 'react';
import { ArrowRightLeft, ChevronDown, Mail, MessageCircle, Plane, Ship, Truck } from 'lucide-react';
import { LocationAutocomplete, LocationOption } from './LocationAutocomplete';
import { STANDARD_AIRPORTS, STANDARD_SEAPORTS, formatTransportLocation } from '../data/transportLocations';
import { INDONESIA_CITIES } from '../data/indonesiaCities';
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

const buildPortOptions = (items: typeof STANDARD_SEAPORTS | typeof STANDARD_AIRPORTS): LocationOption[] => items.map((item) => ({
  id: `${item.type}-${item.code}`,
  value: formatTransportLocation(item),
  label: item.city && item.city !== item.name ? `${item.name}, ${item.city} (${item.code})` : `${item.name} (${item.code})`,
  meta: item.country,
  searchText: `${item.code} ${item.name} ${item.city} ${item.country}`
}));

const SEA_OPTIONS = buildPortOptions(STANDARD_SEAPORTS);
const AIR_OPTIONS = buildPortOptions(STANDARD_AIRPORTS);
const INLAND_OPTIONS: LocationOption[] = INDONESIA_CITIES.map((city) => ({
  id: `CITY-${city.code}`,
  value: `${city.name.trim()}, ${city.province}`,
  label: city.name.trim(),
  meta: city.province,
  searchText: `${city.name} ${city.province} ${city.code}`
}));

const findValue = (options: LocationOption[], code: string, fallbackIndex = 0) => options.find((option) => option.id.endsWith(code))?.value || options[fallbackIndex]?.value || '';

const DEFAULT_ROUTES: Record<ShippingMode, { origin: string; destination: string }> = {
  ocean: {
    origin: findValue(SEA_OPTIONS, 'IDTPP'),
    destination: findValue(SEA_OPTIONS, 'SGSIN', 1)
  },
  air: {
    origin: findValue(AIR_OPTIONS, 'CGK'),
    destination: findValue(AIR_OPTIONS, 'SIN', 1)
  },
  inland: {
    origin: INLAND_OPTIONS.find((option) => option.label === 'Kota Bekasi')?.value || INLAND_OPTIONS[0].value,
    destination: INLAND_OPTIONS.find((option) => option.label.includes('Jakarta Selatan'))?.value || INLAND_OPTIONS[1].value
  }
};

const MODE_CONFIG: Record<ShippingMode, {
  label: string;
  shortLabel: string;
  description: string;
  originLabel: string;
  destinationLabel: string;
  placeholder: string;
  count: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  ocean: {
    label: 'Laut',
    shortLabel: 'Ocean Freight',
    description: 'FCL dan LCL antarpelabuhan',
    originLabel: 'Pelabuhan asal',
    destinationLabel: 'Pelabuhan tujuan',
    placeholder: 'Nama pelabuhan, kota, negara, atau UN/LOCODE',
    count: `${SEA_OPTIONS.length} pelabuhan`,
    icon: Ship
  },
  air: {
    label: 'Udara',
    shortLabel: 'Air Cargo',
    description: 'Kargo prioritas antarbandara',
    originLabel: 'Bandara asal',
    destinationLabel: 'Bandara tujuan',
    placeholder: 'Nama bandara, kota, negara, atau kode IATA',
    count: `${AIR_OPTIONS.length} bandara`,
    icon: Plane
  },
  inland: {
    label: 'Inland',
    shortLabel: 'Domestic Trucking',
    description: 'Pengiriman darat antarkota',
    originLabel: 'Kota asal',
    destinationLabel: 'Kota tujuan',
    placeholder: 'Nama kabupaten, kota, atau provinsi',
    count: `${INLAND_OPTIONS.length} kabupaten/kota`,
    icon: Truck
  }
};

const initialModeFromService = (service?: string): ShippingMode => {
  const value = service?.toLowerCase() || '';
  if (value.includes('air') || value.includes('udara')) return 'air';
  if (value.includes('truck') || value.includes('darat') || value.includes('inland')) return 'inland';
  return 'ocean';
};

export const SmartCalculator: React.FC<SmartCalculatorProps> = ({ prefillService }) => {
  const [shippingMode, setShippingMode] = useState<ShippingMode>(() => initialModeFromService(prefillService));
  const [routes, setRoutes] = useState(DEFAULT_ROUTES);
  const [selectedIncoterm, setSelectedIncoterm] = useState('FOB');
  const [lengthCm, setLengthCm] = useState(120);
  const [widthCm, setWidthCm] = useState(100);
  const [heightCm, setHeightCm] = useState(150);
  const [weightKg, setWeightKg] = useState(400);
  const [quantity, setQuantity] = useState(2);

  const route = routes[shippingMode];
  const mode = MODE_CONFIG[shippingMode];
  const ModeIcon = mode.icon;
  const routeOptions = shippingMode === 'ocean' ? SEA_OPTIONS : shippingMode === 'air' ? AIR_OPTIONS : INLAND_OPTIONS;

  const updateRoute = (field: 'origin' | 'destination', value: string) => {
    setRoutes((current) => ({
      ...current,
      [shippingMode]: { ...current[shippingMode], [field]: value }
    }));
  };

  const swapRoute = () => {
    setRoutes((current) => ({
      ...current,
      [shippingMode]: {
        origin: current[shippingMode].destination,
        destination: current[shippingMode].origin
      }
    }));
  };

  const totalVolumeCbm = useMemo(() => {
    if (!lengthCm || !widthCm || !heightCm || !quantity) return 0;
    return Number((((lengthCm * widthCm * heightCm) / 1000000) * quantity).toFixed(3));
  }, [lengthCm, widthCm, heightCm, quantity]);

  const totalVolumetricAirKg = useMemo(() => {
    if (!lengthCm || !widthCm || !heightCm || !quantity) return 0;
    return Number((((lengthCm * widthCm * heightCm) / 6000) * quantity).toFixed(1));
  }, [lengthCm, widthCm, heightCm, quantity]);

  const totalActualWeightKg = useMemo(() => Number(((weightKg || 0) * (quantity || 1)).toFixed(1)), [weightKg, quantity]);
  const oceanChargeableBasis = Math.max(totalVolumeCbm, totalActualWeightKg / 1000);
  const airChargeableBasis = Math.max(totalVolumetricAirKg, totalActualWeightKg);
  const containerUsagePercent = Math.min(100, Math.round((totalVolumeCbm / 33) * 100));

  const recommendations = useMemo(() => {
    if (shippingMode === 'air') {
      return {
        title: 'Priority Air Cargo',
        desc: `Dasar tagihan sekitar ${airChargeableBasis.toFixed(1)} kg, memakai nilai terbesar antara berat aktual dan volumetrik.`,
        alternative: 'Konsultasikan split shipment jika hanya sebagian kargo yang mendesak.'
      };
    }
    if (shippingMode === 'inland') {
      return {
        title: 'Domestic Trucking',
        desc: `${totalVolumeCbm} CBM dengan berat total ${totalActualWeightKg} kg. Tim akan mencocokkan tipe armada dengan rute dan akses lokasi.`,
        alternative: 'Kebutuhan multi-drop, crane, atau bongkar muat dapat ditambahkan saat konsultasi.'
      };
    }
    if (totalVolumeCbm < 15) {
      return {
        title: 'LCL Consolidation',
        desc: `Volume ${totalVolumeCbm} CBM berada di bawah ambang awal kontainer penuh dan cocok ditinjau sebagai muatan konsolidasi.`,
        alternative: 'FCL tetap dapat dipilih untuk kargo yang perlu ruang eksklusif.'
      };
    }
    return {
      title: totalVolumeCbm <= 33 ? 'FCL 20ft' : 'FCL 40ft High Cube',
      desc: `Volume ${totalVolumeCbm} CBM lebih tepat ditinjau sebagai kontainer penuh dengan ruang khusus.`,
      alternative: 'Jumlah kontainer final mengikuti jenis barang dan pola penyusunan.'
    };
  }, [airChargeableBasis, shippingMode, totalActualWeightKg, totalVolumeCbm]);

  const applyPreset = (preset: typeof PRESET_PACKAGES[number]) => {
    setLengthCm(preset.p);
    setWidthCm(preset.l);
    setHeightCm(preset.t);
    setWeightKg(preset.w);
    setQuantity(preset.pcs);
  };

  const modeLabel = `${mode.label} (${mode.shortLabel})`;
  const basisValue = shippingMode === 'air' ? airChargeableBasis.toFixed(1) : shippingMode === 'inland' ? totalActualWeightKg.toFixed(1) : oceanChargeableBasis.toFixed(3);
  const basisUnit = shippingMode === 'ocean' ? 'W/M' : 'kg';

  const inquiryLines = [
    `Moda: ${modeLabel}`,
    `Rute: ${route.origin} → ${route.destination}`,
    `Incoterm: ${selectedIncoterm}`,
    `Dimensi: ${lengthCm} × ${widthCm} × ${heightCm} cm`,
    `Berat: ${weightKg} kg/koli × ${quantity} koli`,
    `Total: ${totalVolumeCbm} CBM / ${totalActualWeightKg} kg`,
    `Saran awal: ${recommendations.title}`
  ];

  const handleSendWhatsApp = () => {
    const text = `Halo GAEKS, saya ingin konsultasi tarif kargo:\n\n${inquiryLines.map((line) => `- ${line}`).join('\n')}\n\nMohon informasi tarif dan jadwal yang tersedia. Terima kasih.`;
    window.open(`https://wa.me/6285608561745?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = `Inquiry ${mode.shortLabel}: ${route.origin} ke ${route.destination}`;
    const body = `Halo Tim Komersial GAEKS,\n\nMohon informasi tarif untuk data berikut:\n${inquiryLines.map((line) => `- ${line}`).join('\n')}\n\nTerima kasih.`;
    window.location.href = `mailto:Sales01@gaeks.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="calculator" aria-labelledby="calculator-title" className="section-block bg-[#f4f5f1]">
      <div className="page-shell">
        <header className="border-b border-slate-300 pb-8">
          <div className="max-w-3xl">
            <p className="section-label">Perencanaan kargo</p>
            <h2 id="calculator-title" className="section-title">Rencanakan rute dan kapasitas dalam satu layar.</h2>
            <p className="section-copy">Pilih moda, cari simpul keberangkatan dan tujuan, lalu hitung dasar kebutuhan kargo sebelum meminta tarif.</p>
            {prefillService && <p className="mt-4 text-sm font-semibold text-cyan-800">Layanan dipilih: {prefillService}</p>}
          </div>
        </header>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(330px,.65fr)]">
          <form className="rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(8,47,52,0.06)]" onSubmit={(event) => event.preventDefault()}>
            <fieldset className="border-b border-slate-200 bg-[#f7faf8] p-5 sm:p-7">
              <legend className="px-1 text-sm font-bold text-[#12363a]">Moda pengiriman</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {(Object.keys(MODE_CONFIG) as ShippingMode[]).map((modeKey) => {
                  const config = MODE_CONFIG[modeKey];
                  const Icon = config.icon;
                  const active = shippingMode === modeKey;
                  return (
                    <button key={modeKey} type="button" aria-pressed={active} onClick={() => setShippingMode(modeKey)} className={`flex min-h-[76px] items-center gap-3 rounded-xl border px-4 py-3 text-left transition-[background-color,border-color,box-shadow,transform] duration-200 ${active ? 'border-[#0a5861] bg-[#0a5861] text-white shadow-md' : 'border-slate-200 bg-white text-[#12363a] hover:-translate-y-0.5 hover:border-cyan-600/40 hover:bg-cyan-50/50 hover:shadow-sm'}`}>
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${active ? 'bg-white/10 text-cyan-200' : 'bg-slate-100 text-cyan-800'}`}><Icon className="h-5 w-5" /></span>
                      <span className="min-w-0"><strong className="block text-sm">{config.label}</strong><span className={`mt-0.5 block text-xs ${active ? 'text-slate-200' : 'text-slate-500'}`}>{config.description}</span></span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="border-b border-slate-200 p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-700">01 · Rute</p><h3 className="mt-1 text-lg font-bold text-[#12363a]">{mode.shortLabel}</h3></div>
                <span className="rounded-full bg-[#eef5f3] px-3 py-1.5 text-xs font-semibold text-[#0a5861]">{mode.count}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">Ketik mulai dari satu huruf. Pilih hasil yang cocok untuk mengunci lokasi.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-end">
                <LocationAutocomplete label={mode.originLabel} hint="Asal" placeholder={mode.placeholder} options={routeOptions} value={route.origin} onChange={(value) => updateRoute('origin', value)} />
                <button type="button" onClick={swapRoute} title="Tukar asal dan tujuan" aria-label="Tukar asal dan tujuan" className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:border-cyan-600 hover:bg-cyan-50 hover:text-cyan-800 sm:mb-0.5"><ArrowRightLeft className="h-4 w-4" /></button>
                <LocationAutocomplete label={mode.destinationLabel} hint="Tujuan" placeholder={mode.placeholder} options={routeOptions} value={route.destination} onChange={(value) => updateRoute('destination', value)} />
              </div>
            </div>

            <details open className="border-b border-slate-200">
              <summary className="flex min-h-16 items-center justify-between px-5 py-3 font-bold text-[#12363a] sm:px-7"><span><span className="mr-2 text-xs tracking-[0.14em] text-cyan-700">02</span>Data kargo</span><ChevronDown className="h-4 w-4 text-slate-400" /></summary>
              <div className="px-5 pb-7 sm:px-7">
                <label className="block text-sm font-semibold text-slate-700">Preset kargo
                  <select className="field mt-2" defaultValue="" onChange={(event) => { const preset = PRESET_PACKAGES.find((item) => item.name === event.target.value); if (preset) applyPreset(preset); }}>
                    <option value="">Pilih jika sesuai</option>
                    {PRESET_PACKAGES.map((preset) => <option key={preset.name} value={preset.name}>{preset.name}</option>)}
                  </select>
                </label>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {[
                    ['Panjang (cm)', lengthCm, setLengthCm], ['Lebar (cm)', widthCm, setWidthCm], ['Tinggi (cm)', heightCm, setHeightCm], ['Berat/koli (kg)', weightKg, setWeightKg], ['Jumlah koli', quantity, setQuantity]
                  ].map(([label, value, setter]) => (
                    <label key={label as string} className="text-xs font-semibold text-slate-600">{label as string}<input type="number" min="0" className="field mt-2" value={value as number} onChange={(event) => (setter as React.Dispatch<React.SetStateAction<number>>)(Number(event.target.value))} /></label>
                  ))}
                </div>
              </div>
            </details>

            <details className="group">
              <summary className="flex min-h-16 items-center justify-between px-5 py-3 font-bold text-[#12363a] sm:px-7"><span><span className="mr-2 text-xs tracking-[0.14em] text-cyan-700">03</span>Ketentuan perdagangan</span><ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" /></summary>
              <div className="px-5 pb-7 sm:px-7"><label className="text-sm font-semibold text-slate-700">Incoterm<select className="field mt-2" value={selectedIncoterm} onChange={(event) => setSelectedIncoterm(event.target.value)}>{INCOTERMS_LIST.map((item) => <option key={item.code} value={item.code}>{item.code}: {item.desc}</option>)}</select></label></div>
            </details>
          </form>

          <aside className="h-fit overflow-hidden rounded-2xl border border-[#17494e] bg-[#082f34] text-white shadow-[0_18px_50px_rgba(8,47,52,0.18)] xl:sticky xl:top-24">
            <div className="border-b border-white/10 bg-white/[0.04] px-6 py-5"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Ringkasan rencana</p><h3 className="mt-2 text-xl font-bold">{mode.shortLabel}</h3></div><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300 text-[#082f34]"><ModeIcon className="h-5 w-5" /></span></div></div>
            <div className="px-6 py-6">
              <div className="rounded-xl border border-white/10 bg-black/10 p-4"><span className="block text-xs text-slate-400">Rute terpilih</span><strong className="mt-2 block text-sm leading-6 text-white">{route.origin || 'Pilih lokasi asal'}</strong><span className="my-2 block h-px bg-white/10" /><strong className="block text-sm leading-6 text-white">{route.destination || 'Pilih lokasi tujuan'}</strong></div>
              <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/10 p-4"><span className="block text-xs text-slate-400">Volume</span><strong className="mt-1 block text-2xl">{totalVolumeCbm}</strong><span className="text-xs text-slate-400">CBM</span></div><div className="rounded-xl border border-white/10 p-4"><span className="block text-xs text-slate-400">Basis tagihan</span><strong className="mt-1 block text-2xl">{basisValue}</strong><span className="text-xs text-slate-400">{basisUnit}</span></div></div>
              <div className="mt-6"><span className="text-xs text-slate-400">Saran awal</span><h3 className="mt-2 text-xl font-bold">{recommendations.title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{recommendations.desc}</p><p className="mt-3 border-l-2 border-cyan-300/70 pl-3 text-xs leading-5 text-slate-400">{recommendations.alternative}</p></div>
              <details className="group mt-6 border-y border-white/15"><summary className="flex min-h-12 items-center justify-between text-sm font-bold">Dasar perhitungan <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></summary><dl className="space-y-2 pb-5 text-sm text-slate-300"><div className="flex justify-between gap-4"><dt>Berat aktual</dt><dd>{totalActualWeightKg} kg</dd></div><div className="flex justify-between gap-4"><dt>Berat volumetrik udara</dt><dd>{totalVolumetricAirKg} kg</dd></div>{shippingMode === 'ocean' && <div className="flex justify-between gap-4"><dt>Penggunaan kontainer 20ft</dt><dd>{containerUsagePercent}%</dd></div>}</dl></details>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2"><button type="button" onClick={handleSendWhatsApp} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 text-sm font-bold text-[#082f34] transition-colors hover:bg-cyan-200"><MessageCircle className="h-4 w-4" />WhatsApp</button><button type="button" onClick={handleSendEmail} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 px-4 text-sm font-bold transition-colors hover:bg-white/10"><Mail className="h-4 w-4" />Email</button></div>
              <p className="mt-4 text-xs leading-5 text-slate-400">Perhitungan ini menjadi ringkasan awal. Tarif final mengikuti rute, jadwal, komoditas, dan ketersediaan armada.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
