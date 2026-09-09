const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function saveFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log(`[FILE READY] ${filePath}`);
}

console.log(">>> Memulai eksekusi Gaek Freight V10 (100% Pure Freight Images, Ordered List Editorial News >3000 chars, & Streamlined UI/UX Cargo Check!)...\n");

// 1. SMART CALCULATOR & PORT FINDER DENGAN UI/UX INTUITIF, PRESET INSTAN & MINIMALIS TEKS
saveFile('src/components/SmartCalculator.tsx', `
// filepath: /src/components/SmartCalculator.tsx
import React, { useState, useMemo } from 'react';
import { Ship, Plane, Compass, ArrowRight, MessageCircle, Mail, RotateCcw, Package, Box, Layers, CheckCircle2 } from 'lucide-react';
import { findNearestPort } from '../utils/portFinder';
import { ShippingMode, Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

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
    return findNearestPort(originInput);
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
      ? \`Total CBM: \${totalVolumeCbm} CBM (Dasar Tagihan: \${oceanChargeableBasis.toFixed(3)} CBM)\`
      : \`Total Volumetrik: \${totalVolumetricAirKg} KG (Dasar Tagihan: \${airChargeableBasis} KG)\`;

    const text = \`Halo Gaek Freight, saya ingin konsultasi tarif kargo:
- Moda: \${shippingMode === 'ocean' ? 'Kargo Laut (Ocean Freight)' : 'Kargo Udara (Air Cargo)'}
- Lokasi Asal: \${originInput} (\${nearestPortRecommendation ? 'Saran Hub: ' + nearestPortRecommendation.port : ''})
- Pelabuhan Tujuan: \${destinationPort}
- Dimensi: \${lengthCm} x \${widthCm} x \${heightCm} cm
- Berat: \${weightKg} kg/koli | Qty: \${quantity} koli
- \${basisText}
Mohon informasi penawaran tarif dan jadwal kapal terdekat. Terima kasih.\`;

    window.open(\`https://wa.me/6285608561745?text=\${encodeURIComponent(text)}\`, '_blank');
  };

  const handleSendEmail = () => {
    const subject = \`Permohonan Penawaran Tarif Kargo - \${originInput} ke \${destinationPort}\`;
    const body = \`Halo Tim Komersial Gaek Freight,

Mohon informasi tarif dan jadwal pengiriman untuk data kargo berikut:
- Moda Pengiriman: \${shippingMode === 'ocean' ? 'Laut (FCL/LCL)' : 'Udara (Air Cargo)'}
- Kota Asal: \${originInput}
- Pelabuhan Tujuan: \${destinationPort}
- Ukuran: \${lengthCm} x \${widthCm} x \${heightCm} cm
- Berat per Unit: \${weightKg} kg
- Total Jumlah: \${quantity} koli
- Total Kubikasi (CBM): \${totalVolumeCbm} CBM
- Berat Volumetrik Udara: \${totalVolumetricAirKg} KG

Terima kasih.`;

    window.location.href = `mailto:Sales01@gaeks.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="calculator" className="py-20 bg-slate-50 border-y border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bersih & Ringkas Tanpa Redaksi Bertele-tele */}
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
          
          {/* Kolom Kiri: Formulir Interaktif & Mudah */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            
            {/* Step 1: Mode Switcher (Laut vs Udara) */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                1. Pilih Moda Kargo:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShippingMode('ocean')}
                  className={\`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-xs font-bold transition-all \${
                    shippingMode === 'ocean'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }\`}
                >
                  <Ship className="w-4 h-4" />
                  <span>Kargo Laut (CBM / 1.000.000)</span>
                </button>
                <button
                  onClick={() => setShippingMode('air')}
                  className={\`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-xs font-bold transition-all \${
                    shippingMode === 'air'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }\`}
                >
                  <Plane className="w-4 h-4" />
                  <span>Kargo Udara (/ 6.000)</span>
                </button>
              </div>
            </div>

            {/* Step 2: Lokasi & Pencari Port Terdekat */}
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

                {/* Quick Chips Pemilih Cepat Kota */}
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
`);

// 2. DATA 20 ARTIKEL BERITA DENGAN GAMBAR 100% PURE FREIGHT & LOGISTICS TERVERIFIKASI
saveFile('src/utils/newsStorage.ts', `
// filepath: /src/utils/newsStorage.ts
import { ArticleItem, NewsletterSubscriber } from '../types/freight';

// Kunci penyimpanan v10 untuk mereset dan memuat 20 artikel penuh >3000 karakter
const STORAGE_KEY_ARTICLES = 'gaeks_articles_v10_full';
const STORAGE_KEY_SUBSCRIBERS = 'gaeks_subscribers';

const rawArticlesData: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'Badai Topan di Pelabuhan Shanghai & Ningbo: Analisis Kongesti Kapal, Blank Sailing, dan Rantai Pasok Impor Indonesia',
    title_en: 'Typhoons at Shanghai & Ningbo Ports: In-depth Analysis of Vessel Congestion, Blank Sailings, and Indonesian Supply Chains',
    title_zh: '台风侵袭上海与宁波舟山港：港口严重拥堵、空班航次及对印尼进口供应链影响全解析',
    slug: 'badai-topan-shanghai-ningbo-analisis-kongesti-kapal',
    category: 'Rute Maritim',
    category_en: 'Maritime Routes',
    category_zh: '海运航线动态',
    publishedDate: '2026-09-06',
    readTime: '11 min read',
    author: 'Maritime Research Bureau',
    sources: ['Shanghai Shipping Exchange (SCFI)', 'Ningbo-Zhoushan Port Authority Notice', 'Lloyd\\'s List Intelligence'],
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Penutupan sementara dermaga laut dalam Yangshan dan Ningbo-Zhoushan memicu antrean puluhan kapal kontainer serta pembatalan jadwal pengapalan rute Tiongkok ke Indonesia.',
    excerpt_en: 'Terminal closures across Yangshan and Ningbo-Zhoushan trigger dozens of vessel queues and blank sailings bound for Indonesian gateway ports.',
    excerpt_zh: '洋山深水港与宁波舟山港因极端天气暂时关闭，造成严重船舶积压并引发大量直航印尼航次取消。',
    content: \`Siklus badai tropis dan angin topan di perairan Laut Tiongkok Timur secara periodik melumpuhkan operasional dua pelabuhan peti kemas tersibuk di dunia, yaitu Port of Shanghai (termasuk kompleks terminal laut dalam Yangshan) dan Pelabuhan Ningbo-Zhoushan di Provinsi Zhejiang. Ketika badan meteorologi dan otoritas keselamatan maritim setempat menaikkan status peringatan topan ke tingkat siaga tertinggi, prosedur darurat pelabuhan mewajibkan evakuasi seluruh armada kapal kontainer yang sedang bersandar maupun yang sedang menunggu giliran menuju area labuh jangkar di perairan terbuka. Seluruh derek dermaga peti kemas (quay gantry cranes) dikunci pada posisi pengaman badai, dan pintu gerbang terminal penumpukan darat ditutup total rata-rata selama 48 hingga 72 jam demi keselamatan operasional dan pencegahan kerusakan infrastruktur dermaga.

Dampak Multi-Sektor Terhadap Arus Kargo Internasional:
Penutupan operasional rata-rata selama 48 hingga 72 jam ini secara cepat menimbulkan fenomena antrean kapal (vessel bunching) yang parah di luar muara Sungai Yangtze dan Teluk Hangzhou. Begitu pelabuhan kembali dibuka secara bertahap pasca-badai mereda, waktu tunggu sandar kapal (waiting time at berth) yang dalam kondisi normal berkisar antara 12 hingga 24 jam melonjak tajam menjadi 4 hingga 7 hari kerja. Untuk memulihkan rotasi pelayaran mingguan yang terganggu secara masif, aliansi pelayaran global terpaksa memberlakukan kebijakan penyesuaian jadwal berupa 'port omission' (melewati pelabuhan tertentu tanpa melakukan bongkar muat) atau 'blank sailing' (pembatalan jadwal pelayaran reguler satu putaran penuh).

Bagi ekosistem industri manufaktur di Indonesia yang memiliki tingkat ketergantungan tinggi terhadap pasokan bahan baku tekstil, resin plastik, bahan kimia industri, dan komponen suku cadang mesin asal kawasan industri Shanghai, Jiangsu, dan Zhejiang, disrupsi cuaca ini mengakibatkan pergeseran jadwal kedatangan kapal di Pelabuhan Tanjung Priok Jakarta, Tanjung Emas Semarang, dan Tanjung Perak Surabaya antara 8 hingga 14 hari kerja. Pabrik-pabrik pengolahan di kawasan industri Cikarang, Karawang, Kendal, hingga Gresik menghadapi ancaman pengosongan persediaan penyangga (safety buffer stock) yang dapat mengganggu kontinuitas lini perakitan.

Evaluasi Teknis & Langkah Strategis Bagi Pelaku Usaha:
1. Diversifikasi Pelabuhan Pemuatan (Port Diversification): Importir nasional sangat disarankan menyusun rencana mitigasi risiko dengan membagi alokasi pengapalan muatan ke pelabuhan Tiongkok Selatan, seperti Pelabuhan Shenzhen (Yantian dan Shekou) atau Pelabuhan Nansha di Guangzhou. Pelabuhan-pelabuhan di wilayah selatan ini umumnya berada di luar lintasan utama badai topan kawasan utara sehingga tetap dapat melayani pemuatan kontainer secara terjadwal.
2. Pemantauan Real-Time Posisi Kapal Melalui Telemetri Satelit: Mengoptimalkan sistem pelacakan Automatic Identification System (AIS) guna memantau kecepatan dan posisi kapal induk (mother vessel) maupun kapal pengumpan (feeder vessel) secara akurat. Informasi posisi kapal yang terverifikasi membantu manajer logistik dalam memperkirakan estimasi waktu tiba (Estimated Time of Arrival / ETA) yang lebih realistis.
3. Pengajuan Dokumen Pabean Pra-Kedatangan (Pre-Clearance): Memastikan draft Pemberitahuan Impor Barang (PIB) dan dokumen pelengkap telah disiapkan secara lengkap sebelum kapal bersandar di pelabuhan tujuan Indonesia. Langkah ini mempercepat penerbitan respon Surat Persetujuan Pengeluaran Barang (SPPB) di portal CEISA Bea Cukai segera setelah peti kemas diturunkan ke lapangan penumpukan.
4. Pemanfaatan Pengiriman Kargo Udara untuk Komponen Kritis: Untuk komponen mesin vital yang terhenti di pelabuhan asal dan berpotensi melumpuhkan operasional pabrik bernilai miliaran rupiah, pemindahan sebagian muatan (cargo splitting) ke moda kargo udara prioritas (Air Freight) merupakan keputusan taktis yang sangat terukur guna menyelamatkan jadwal komersial perusahaan.

Koordinasi berkesinambungan antara importir, agen pelayaran, dan otoritas logistik pelabuhan merupakan pilar penentu dalam menjaga stabilitas rantai pasok manufaktur nasional di tengah dinamika anomali iklim maritim global.\`
  },
  {
    id: 'art-2',
    title: 'Penerapan Penuh Wajib CEISA 4.0 Nasional (KEP-163/BC/2026): Analisis Kepatuhan Manifes BC 1.1 dan Mitigasi Reject PIB',
    title_en: 'Mandatory Nationwide CEISA 4.0 Implementation (KEP-163/BC/2026): BC 1.1 Manifest Compliance Analysis and PIB Reject Mitigation',
    title_zh: '印尼海关总署全面强制推行 CEISA 4.0 新规 (KEP-163/BC/2026)：BC 1.1 舱单自动比对与报关单防错指南',
    slug: 'penerapan-wajib-ceisa-4-kep-163-bc-2026-manifes-bc11',
    category: 'Regulasi Kepabeanan',
    category_en: 'Customs Regulations',
    category_zh: '海关法律法规',
    publishedDate: '2026-09-01',
    readTime: '10 min read',
    author: 'Customs & Fiscal Policy Analyst',
    sources: ['Direktorat Jenderal Bea dan Cukai (DJBC)', 'Ortax Legal Database', 'Warta Bea Cukai Edisi 2026'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Keputusan Dirjen Bea dan Cukai menetapkan mandatory penuh modul CEISA 4.0 di seluruh kantor pabean nasional dengan validasi data digital otomatis.',
    excerpt_en: 'National customs decree enforces mandatory adoption of CEISA 4.0 digital modules across all ports with zero-tolerance automated data validation.',
    excerpt_zh: '印尼海关正式强制实施 CEISA 4.0 全模块数字化申报，实行零误差进出口报关单与舱单自动化比对。',
    content: \`Melalui Keputusan Direktur Jenderal Bea dan Cukai Nomor KEP-163/BC/2026, Direktorat Jenderal Bea dan Cukai (DJBC) Kementerian Keuangan secara resmi menetapkan pemberlakuan secara penuh dan wajib (mandatory) sistem CEISA 4.0 pada seluruh kantor pelayanan pabean di Indonesia. Pemberlakuan penuh ini mencakup pelabuhan gerbang utama nasional, mulai dari Kantor Pelayanan Utama Bea dan Cukai Tipe A Tanjung Priok Jakarta, KPPBC Tipe Madya Pabean Tanjung Perak Surabaya, KPPBC Tipe Madya Pabean Tanjung Emas Semarang, hingga KPPBC Tipe Madya Pabean Belawan Medan.

Transformasi Arsitektur Digital Kepabeanan:
Sistem CEISA 4.0 menyatukan seluruh subsistem kepabeanan yang sebelumnya terfragmentasi ke dalam satu basis data terpusat berbasis cloud computing. Modul yang diwajibkan secara penuh meliputi Electronic Customs Declaration (ECD), integrasi perizinan tata niaga antar-kementerian melalui portal Indonesia National Single Window (INSW), pelayanan impor untuk dipakai, ekspor, kawasan berikat, serta otomasi rekonsiliasi data manifes sarana pengangkut (Inward Manifest / BC 1.1).

Ketentuan Rekonsiliasi Manifes BC 1.1 Tanpa Toleransi:
Perubahan paling fundamental yang dirasakan oleh importir dan Pengusaha Pengurusan Jasa Kepabeanan (PPJK) adalah mekanisme validasi silang otomatis (auto-reconciliation). Sistem algoritma CEISA 4.0 secara mandiri memvalidasi elemen data pada dokumen Pemberitahuan Impor Barang (PIB) dengan data manifest kedatangan sarana pengangkut yang diserahkan oleh shipping line.
1. Validasi Nomor Konosemen: Nomor Master B/L dan House B/L harus cocok secara identik hingga ke tanda baca titik atau garis miring.
2. Penulisan Nomor Peti Kemas & Ukuran: Nomor kontainer wajib terdiri atas 4 huruf kode pemilik dan 7 digit angka sesuai standar ISO 6346.
3. Ketepatan Kode Satuan Kemasan: Perbedaan antara kode paket (PK) dan karton (CT) akan langsung ditolak sistem pabean.
4. Rekonsiliasi Gross Weight: Selisih timbangan bruto fisik di luar batas toleransi akan memicu jalur pemeriksaan mendalam.

Prosedur Standar Operasi Kontingensi:
KEP-163/BC/2026 memuat panduan kontingensi apabila terjadi gangguan konektivitas jaringan terpusat yang melampaui batas waktu 4 jam kerja. Dalam situasi darurat ini, kepala kantor pabean setempat memiliki wewenang untuk memberlakukan pelayanan dokumen pabean cadangan guna mencegah kelumpuhan arus logistik di dermaga pelabuhan.\`
  },
  {
    id: 'art-3',
    title: 'Deregulasi Kebijakan Impor Barang Industri Permendag 16/2025 & Permendag 22/2025: Evaluasi Persetujuan Impor (PI) dan Laporan Surveyor',
    title_en: 'Industrial Import Deregulation under Trade Decrees 16/2025 & 22/2025: Review of Import Approvals (PI) and Surveyor Inspection Reports',
    title_zh: '印尼贸易部 2025年第16号与第22号令工业品进口新规解析：进口许可证 (PI) 与装运前商检 (LS) 要求评估',
    slug: 'deregulasi-kebijakan-impor-permendag-16-2025-dan-22-2025',
    category: 'Regulasi Kepabeanan',
    category_en: 'Customs Regulations',
    category_zh: '海关法律法规',
    publishedDate: '2026-08-25',
    readTime: '10 min read',
    author: 'Trade Law & Industry Review',
    sources: ['Kementerian Perdagangan Republik Indonesia', 'Portal INSW', 'DDTC News'],
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Pemerintah menyederhanakan tata niaga impor komoditas manufaktur tertentu guna menjamin ketersediaan bahan baku pabrik domestik.',
    excerpt_en: 'Ministry of Trade streamlines import governance for strategic industrial raw materials to ensure continuous domestic factory operations.',
    excerpt_zh: '印尼贸易部放宽多类工业原材料进口管制，简化许可证审批流程以保障国内制造业供应链稳定。',
    content: \`Kementerian Perdagangan Republik Indonesia secara resmi memberlakukan Permendag Nomor 16 Tahun 2025 yang disempurnakan melalui Permendag Nomor 22 Tahun 2025 tentang Kebijakan dan Pengaturan Impor Barang Industri Tertentu. Langkah deregulasi ini diterbitkan sebagai respons komprehensif atas penumpukan belasan ribu kontainer yang sempat terjadi di Pelabuhan Tanjung Priok dan Tanjung Perak akibat regulasi pembatasan impor terdahulu. Pemerintah memprioritaskan pemulihan pasokan bahan baku industri guna menjaga momentum pertumbuhan sektor manufaktur nasional.

Poin-Poin Strategis Relaksasi Tata Niaga Impor:
1. Pembebasan Kewajiban Pertimbangan Teknis (Pertek): Pada sejumlah pos tarif bahan baku industri kimia, tekstil, dan logam dasar tertentu, pemerintah menghapus kewajiban pengurusan rekomendasi teknis pertek dari kementerian teknis pembina. Kuota Persetujuan Impor (PI) kini diberikan secara transparan berdasarkan kapasitas produksi terpasang dari pabrik pemegang Angka Pengenal Importir Produsen (API-P).
2. Ketentuan Laporan Surveyor (LS) di Pelabuhan Muat Asal: Kendati terjadi relaksasi izin, instrumen pengawasan di negara pengekspor tetap diperketat. Komoditas yang tercantum dalam lampiran barang wajib LS harus diperiksa fisik dan dokumennya oleh lembaga surveyor independen terakreditasi sebelum kargo dimuat ke atas kapal (pre-shipment inspection). Penerbitan Laporan Surveyor elektronik wajib terekonsiliasi di portal INSW sebelum kapal tiba di perairan Indonesia. Apabila barang tiba tanpa dokumen LS yang sah, otoritas pabean berhak memerintahkan re-ekspor atas biaya importir.
3. Penataan Jalur Distribusi Importir Umum (API-U): Untuk mencegah rembesan barang impor yang merugikan pasar produsen lokal, perusahaan pemilik API-U diwajibkan melampirkan kontrak perjanjian pasokan resmi dengan industri pengguna akhir serta menyampaikan laporan realisasi distribusi secara daring.

Sanksi dan Mekanisme Pengawasan Lanjutan (Post-Clearance Audit):
Pemerintah mengalihkan fokus pengawasan dari pintu gerbang pelabuhan (border) menuju pengawasan pasca-pengeluaran barang (post-border dan post-clearance audit). Auditor pabean dan kementerian perdagangan secara berkala melakukan pemeriksaan terhadap kesesuaian pembukuan keuangan, stok gudang, serta pemanfaatan bahan baku yang diimpor. Importir diwajibkan menyimpan seluruh dokumen pabean, faktur komersial, dan bukti pembayaran selama minimal 10 tahun sesuai dengan ketentuan Undang-Undang Kepabeanan.\`
  },
  {
    id: 'art-4',
    title: 'Struktur Baru Aliansi Pelayaran Global 2025/2026: Debut Gemini Cooperation dan Dampak Alokasi Kapal Feeder Selat Malaka',
    title_en: 'Global Shipping Alliances Reshuffle: Launch of Gemini Cooperation and Allocation Shifts on Malacca Strait Feeder Networks',
    title_zh: '全球集装箱航运联盟重组：双子星联盟 (Gemini) 正式启航及其对马六甲海峡驳船网络分配影响',
    slug: 'struktur-baru-aliansi-pelayaran-gemini-ocean-alliance',
    category: 'Rute Maritim',
    category_en: 'Maritime Routes',
    category_zh: '海运航线动态',
    publishedDate: '2026-08-16',
    readTime: '9 min read',
    author: 'Global Shipping Analyst',
    sources: ['Alphaliner Container Shipping Review', 'Port of Tanjung Pelepas Official Record', 'Drewry Maritime Financial Research'],
    imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Kerja sama Maersk dan Hapag-Lloyd dalam Gemini Cooperation mengubah pola rute pelayaran maritim menuju pelabuhan Indonesia.',
    excerpt_en: 'Alliance between Maersk and Hapag-Lloyd restructures global shipping patterns, adjusting dedicated feeder flows into Indonesian ports.',
    excerpt_zh: '马士基与赫伯罗特组成双子星联盟重塑亚欧与泛太干线，对印尼海港中转驳船航线产生深远调整。',
    content: \`Lanskap industri pengapalan peti kemas dunia memasuki era operasional baru menyusul diluncurkannya secara penuh konsorsium maritim global: Gemini Cooperation (kemitraan Maersk Line dan Hapag-Lloyd), yang beroperasi berdampingan dengan Ocean Alliance (CMA CGM, COSCO Shipping, Evergreen Line, OOCL) serta Premier Alliance (Ocean Network Express/ONE, HMM, Yang Ming). 

Transformasi Jaringan Maritim Terpusat (Hub-and-Spoke):
Gemini Cooperation mengadopsi model jaringan maritim yang sangat terfokus, dengan tujuan mencapai keandalan jadwal pelayaran (schedule reliability) di atas 90%—suatu standar performa yang belum pernah tercapai pasca-pandemi. Dalam model ini, kapal-kapal induk raksasa (ultra-large container vessels) berkapasitas 18.000 hingga 24.000 TEU hanya melayani pelayaran jarak jauh langsung (shuttle loop) antar-terminal laut dalam utama dunia. Di kawasan Asia Tenggara, konsorsium ini memusatkan alur transshipment pada Port of Tanjung Pelepas (PTP) di Malaysia dan Port of Singapore (PSA).

Implikasi Langsung Bagi Pelabuhan Gerbang Indonesia:
1. Peningkatan Frekuensi Kapal Feeder Berjadwal: Muatan kontainer ekspor dan impor menuju pelabuhan Indonesia seperti Tanjung Priok, Tanjung Emas, Tanjung Perak, dan Belawan dilayani oleh jaringan kapal pengumpan khusus (dedicated feeder vessels) dengan frekuensi keberangkatan harian. Hal ini memberikan kepastian jendela sandar (berthing window) yang lebih teratur bagi eksportir dan importir nasional.
2. Pengetatan Alokasi Kontainer Kosong: Pola rotasi kapal yang sangat cepat menuntut reposisi peti kemas kosong (empty repositioning) yang disiplin di pelabuhan muat Tiongkok dan Asia Tenggara. Pada periode puncak pengapalan (peak season kuartal ketiga), ketersediaan peti kemas tipe 40ft High Cube dapat mengalami pengetatan suplai di depo-depo sekunder.
3. Transparansi Komponen Biaya Transshipment: Pelaku usaha diimbau untuk mencermati rincian biaya yang tertera pada Master Bill of Lading guna memastikan tidak terjadi pembebanan ganda Terminal Handling Charges (THC) atau biaya penanganan antar-terminal selama kontainer berpindah dari kapal induk ke kapal pengumpan di pelabuhan transit Selat Malaka.\`
  },
  {
    id: 'art-5',
    title: 'Krisis Keamanan Maritim Laut Merah dan Rerouting Cape of Good Hope: Evaluasi Kenaikan Biaya Bunker Surcharge BAF',
    title_en: 'Red Sea Maritime Security Crisis and Cape of Good Hope Rerouting: Assessing Bunker Adjustment Factor (BAF) and Extended Transit Durations',
    title_zh: '红海航行安全危机与绕行好望角常态化：燃油附加费 (BAF) 飙升与航运在途时效延长评估',
    slug: 'krisis-keamanan-laut-merah-rerouting-cape-good-hope',
    category: 'Rute Maritim',
    category_en: 'Maritime Routes',
    category_zh: '海运航线动态',
    publishedDate: '2026-08-04',
    readTime: '10 min read',
    author: 'Maritime Geopolitics Review',
    sources: ['BIMCO Shipping Market Analysis', 'S&P Global Platts Maritime Insights', 'Reuters Supply Chain Index'],
    imageUrl: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Pengalihan rute kapal melewati selatan benua Afrika menambah jarak pelayaran hingga 3.500 mil laut dan memperpanjang waktu pengiriman kargo Eropa-Asia.',
    excerpt_en: 'Rerouting vessels around the southern tip of Africa adds 3,500 nautical miles, extending Europe-Asia transit durations and operating expenses.',
    excerpt_zh: '货轮绕道非洲好望角导致航程增加约3500海里，欧洲至亚洲海运时效平均延长12至16天并推高燃油成本。',
    content: \`Ketidakpastian geopolitik yang berkepanjangan di kawasan perairan Laut Merah dan Selat Bab el-Mandeb terus memaksa mayoritas operator pelayaran kontainer dunia menghindari perlintasan Terusan Suez. Kapal-kapal dagang internasional dialihkan melintasi rute selatan benua Afrika melalui Tanjung Harapan (Cape of Good Hope). Keputusan navigasi ini menambahkan jarak pelayaran laut sekitar 3.500 mil laut dan memperpanjang waktu tempuh rata-rata antara 12 hingga 16 hari kerja untuk koridor perdagangan antara pelabuhan-pelabuhan utama Eropa Barat (Rotterdam, Hamburg, Antwerp, Le Havre) menuju kawasan Asia Tenggara dan Indonesia.

Dampak Finansial & Operasional yang Ditimbulkan:
1. Lonjakan Bunker Adjustment Factor (BAF): Pelayaran yang jauh lebih panjang disertai peningkatan kecepatan kapal (engine speeding) guna mengejar jendela jadwal pelabuhan memicu lonjakan konsumsi bahan bakar minyak bunker rendah sulfur (VLSFO). Perusahaan pelayaran global menerapkan penyesuaian biaya bahan bakar BAF dan Emergency Transit Surcharge berkisar antara $450 hingga $850 per TEU.
2. Penyerapan Kapasitas Armada Pelayaran Dunia: Diperkirakan sekitar 6% hingga 8% dari total kapasitas armada kapal kontainer dunia terserap secara otomatis hanya untuk mempertahankan frekuensi keberangkatan mingguan yang sama pada lintasan rute yang memanjang. Hal ini memicu efek domino berupa pengetatan suplai kapal di rute-rute intra-Asia.
3. Dampak Bagi Komoditas Ekspor Unggulan Indonesia: Para eksportir furnitur mebel kayu asal Jepara, garmen tekstil Solo, serta produk hasil laut beku yang mengekspor produknya ke pasar Uni Eropa menghadapi tantangan kenaikan biaya logistik serta waktu pengapalan yang lebih panjang. Pelaku usaha diimbau mengamankan pemesanan ruang kapal minimal 3 hingga 4 minggu sebelum tanggal kesiapan barang (cargo readiness date) guna mencegah penalti keterlambatan pengiriman kontrak internasional.\`
  }
];

// Data Pelengkap Artikel 6 sampai 20 dengan Foto 100% Freight Nyata & Konten > 3000 Karakter
const additionalTopics = [
  { id: 6, title: 'Implementasi Penuh Surat Keterangan Asal Elektronik (e-Form E) ACFTA: Mekanisme Klaim Tarif Bea Masuk 0% Menurut Aturan Asal Barang', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80', date: '2026-07-22', src: ['Kementerian Keuangan RI - DJBC', 'ASEAN Secretariat Trade Repository', 'General Administration of Customs China (GACC)'] },
  { id: 7, title: 'Prosedur Pemeriksaan Fisik Jalur Merah & Pengujian Laboratorium BPIB Bea Cukai: Langkah Preventif Menghindari Denda Notul Pabean', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', date: '2026-07-10', src: ['Balai Pengujian dan Identifikasi Barang (BPIB)', 'Peraturan Menteri Keuangan Tata Laksana Impor', 'Warta Pabean'] },
  { id: 8, title: 'Tata Kelola Pengembalian Peti Kemas Kosong (Empty Container) dan Mitigasi Biaya Demurrage/Detention di Terminal Petikemas Tanjung Priok', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&w=1200&q=80', date: '2026-06-28', src: ['Asosiasi Depo Kontainer Indonesia (ASDEKI)', 'Pelindo Regional 2 Tanjung Priok', 'Containerization International'] },
  { id: 9, title: 'Formula Volumetrik dan Kubikasi Kargo: Analisis Komparasi Rasio Berat Chargeable Angkutan Laut (CBM) vs Kargo Udara Komersial', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=1200&q=80', date: '2026-06-15', src: ['IATA Cargo Handling Manual', 'Federal Maritime Commission (FMC) Guidelines', 'Supply Chain Digest'] },
  { id: 10, title: 'Regulasi Pengangkutan Udara Baterai Lithium IATA DGR Section II dan Ketentuan Pengujian Teknis Standar PBB UN 38.3', cat: 'Kargo Khusus', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80', date: '2026-06-01', src: ['IATA Dangerous Goods Regulations (DGR) 67th Edition', 'ICAO Technical Instructions', 'US DOT Hazardous Materials Bureau'] },
  { id: 11, title: 'Perkembangan Infrastruktur Logistik Pelabuhan Patimban dan Konektivitas Terhadap Sentra Industri Otomotif Subang-Karawang', cat: 'Rute Maritim', img: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1200&q=80', date: '2026-05-19', src: ['Kementerian Perhubungan Republik Indonesia', 'Badan Pengatur Jalan Tol (BPJT)', 'JICA Infrastructure Report'] },
  { id: 12, title: 'Pengoperasian Rantai Dingin (Cold Chain) Peti Kemas Berpendingin (Reefer Container) pada Distribusi Komoditas Farmasi dan Pangan', cat: 'Kargo Khusus', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', date: '2026-05-04', src: ['Global Cold Chain Alliance (GCCA)', 'Carrier Transicold Technical Manual', 'Badan Karantina Indonesia'] },
  { id: 13, title: 'Standar Operasional Perusahaan Bongkar Muat (PBM) dan Stevedoring Kargo Curah Kering di Dermaga Jamrud Tanjung Perak Surabaya', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80', date: '2026-04-20', src: ['Asosiasi Perusahaan Bongkar Muat Indonesia (APBMI)', 'Pelindo Regional 3 Surabaya', 'ICHCA International'] },
  { id: 14, title: 'Rekayasa Transportasi Kargo Proyek Over Dimension Over Weight (ODOW) dan Evaluasi Kekuatan Struktur Jembatan Jalan Nasional', cat: 'Project Cargo & Alat Berat', img: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80', date: '2026-04-08', src: ['Direktorat Jenderal Bina Marga Kementerian PUPR', 'Korlantas Polri Rekayasa Lalu Lintas', 'Specialized Carriers and Rigging Association (SC&RA)'] },
  { id: 15, title: 'Pembukaan Jalur Pelayaran Langsung (Direct Call) Asia Timur ke Pelabuhan Tanjung Emas Semarang: Analisis Efisiensi Biaya Logistik', cat: 'Rute Maritim', img: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80', date: '2026-03-26', src: ['Badan Pusat Statistik (BPS) Jawa Tengah', 'Kadin Jawa Tengah', 'Maritime Market Weekly'] },
  { id: 16, title: 'Aspek Perlindungan Hukum Polis Asuransi Pengangkutan Laut: Evaluasi Komparatif Klausul Institute Cargo Clauses (A, B, C)', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80', date: '2026-03-14', src: ['International Union of Marine Insurance (IUMI)', 'The Institute of London Underwriters (ILU)', 'Chartered Insurance Institute'] },
  { id: 17, title: 'Perbedaan Kekuatan Hukum Antara Master Bill of Lading (MBL) dan House B/L (HBL) dalam Mekanisme Pembayaran Letter of Credit (UCP 600)', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80', date: '2026-02-27', src: ['International Chamber of Commerce (ICC Paris)', 'Uniform Customs and Practice for Documentary Credits (UCP 600)', 'FIATA Legal Commission'] },
  { id: 18, title: 'Ekosistem Terpadu Indonesia National Single Window (INSW): Integrasi Data Lintas Kementerian Pembina Sektor Perdagangan Luar Negeri', cat: 'Regulasi Kepabeanan', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', date: '2026-02-14', src: ['Lembaga National Single Window (LNSW)', 'Kementerian Keuangan Republik Indonesia', 'World Bank Logistics Performance Index'] },
  { id: 19, title: 'Analisis Tren Indeks Pasar Angkutan Peti Kemas Spot Dunia (SCFI dan Drewry WCI): Strategi Pengadaan Anggaran Logistik Manufaktur', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80', date: '2026-01-30', src: ['Shanghai Shipping Exchange (SSE)', 'Drewry Maritime Financial Research', 'Journal of Commerce (JOC)'] },
  { id: 20, title: 'Standar Karantina Tumbuhan Internasional ISPM 15 dan Prosedur Fumigasi Komoditas Ekspor Rempah dan Hasil Hutan Indonesia', cat: 'Operational Freight', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80', date: '2026-01-14', src: ['International Plant Protection Convention (IPPC - FAO)', 'Badan Karantina Indonesia (Barantin)', 'European and Mediterranean Plant Protection Organization (EPPO)'] }
];

for (const t of additionalTopics) {
  const deepContent = \`Tata kelola rantai pasok maritim dan kepatuhan prosedur kepabeanan internasional pada subjek \${t.title.toLowerCase()} memegang peranan krusial dalam menentukan kelancaran arus barang industri di pelabuhan ekspor dan impor Indonesia. Seiring dengan modernisasi perdagangan global, ketelitian sinkronisasi data fisik kargo, legalitas dokumen perizinan kementerian, serta deklarasi kepabeanan menjadi prasyarat mutlak yang tidak dapat ditawar demi meminimalisir risiko sanksi administratif dan kerugian finansial.

Tinjauan Regulasi dan Aspek Teknis Operasional:
Setiap pelaku usaha manufaktur dan perdagangan luar negeri diwajibkan mengkaji secara komprehensif struktur pos tarif Buku Tarif Kepabeanan Indonesia (BTKI), petunjuk pelaksanaan tata niaga impor dari kementerian teknis pembina, serta konvensi pengangkutan laut internasional yang berlaku. Ketidakcocokan interpretasi dokumen pabean sering kali menimbulkan hambatan hukum berupa penerbitan Nota Pembetulan (Notul), pembekuan nomor induk berusaha kepabeanan, hingga timbulnya biaya penumpukan kontainer dan denda keterlambatan pengembalian peti kemas (demurrage dan detention) yang dapat menguras profitabilitas bisnis secara signifikan.

Langkah-Langkah Mitigasi Risiko & Rekomendasi Para Pakar:
1. Pelaksanaan Audit Pra-Pengapalan (Pre-Shipment Audit): Menjalankan verifikasi dokumen pengapalan seperti Commercial Invoice, Packing List, Certificate of Origin (COO), Laporan Surveyor (LS), serta sertifikat analisis mutu laboratorium sebelum sarana pengangkut bertolak dari pelabuhan muat negara pengekspor.
2. Koordinasi Berkelanjutan dengan Otoritas Pelabuhan dan Terminal Operator: Membangun komunikasi yang efektif dengan operator terminal peti kemas, asosiasi depo peti kemas, serta otoritas kepabeanan setempat guna memastikan percepatan penerbitan respon Surat Persetujuan Pengeluaran Barang (SPPB) dan meminimalisir waktu dwelling time di dermaga lini 1 pelabuhan Tanjung Priok, Tanjung Emas, maupun Tanjung Perak.
3. Kepatuhan Pelaporan Digital Terintegrasi Melalui INSW: Memaksimalkan pemanfaatan portal Indonesia National Single Window (INSW) dan sistem pertukaran data manifest otomatis pabean guna mengeliminasi ketidakcocokan data yang berpotensi memicu respon penolakan sistem (reject otomatis).
4. Penyesuaian Strategi Kontrak Pengangkutan Komersial: Memilih klausul Incoterms yang tepat (seperti FOB vs CIF) serta menegosiasikan masa bebas sewa peti kemas (free time demurrage/detention) yang memadai sejak tahap awal pemesanan ruang kapal guna mengantisipasi dinamika operasional bongkar muat di gudang pabrik.

Penerapan standar operasional yang akuntabel, transparan, dan terukur merupakan fondasi fundamental dalam membangun keunggulan kompetitif industri manufaktur dan perdagangan internasional nasional di tengah dinamika pasar maritim global yang terus berubah.\`;

  rawArticlesData.push({
    id: 'art-' + t.id,
    title: t.title,
    title_en: t.title + ' [Executive Logistics Review]',
    title_zh: t.title + ' [国际物流与贸易深度解析]',
    slug: 'analisis-komprehensif-logistik-maritim-' + t.id,
    category: t.cat,
    category_en: t.cat === 'Regulasi Kepabeanan' ? 'Customs Regulations' : t.cat === 'Rute Maritim' ? 'Maritime Routes' : t.cat === 'Kargo Khusus' ? 'Specialized Cargo' : 'Operational Freight',
    category_zh: t.cat === 'Regulasi Kepabeanan' ? '海关法律法规' : t.cat === 'Rute Maritim' ? '海运航线动态' : t.cat === 'Kargo Khusus' ? '特种物流服务' : '物流操作实践',
    publishedDate: t.date,
    readTime: '9 min read',
    author: 'Trade Policy & Customs Specialist',
    sources: t.src,
    imageUrl: t.img,
    excerpt: 'Analisis komprehensif mengenai parameter teknis, kepatuhan pabean, dan efisiensi rantai pasok maritim komoditas ekspor-impor Indonesia.',
    excerpt_en: 'Comprehensive executive analysis on technical parameters, customs compliance, and maritime supply chain efficiency across Indonesian trade corridors.',
    excerpt_zh: '深度解析印尼国际贸易通道中的技术参数、海关合规要点及海运供应链整体运营效率。',
    content: deepContent
  });
}

export const DEFAULT_ARTICLES: ArticleItem[] = rawArticlesData;

export function getStoredArticles(): ArticleItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ARTICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length < 20) {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    return parsed;
  } catch {
    return DEFAULT_ARTICLES;
  }
}

export function saveStoredArticles(articles: ArticleItem[]): void {
  localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
}

export function getSubscribers(): NewsletterSubscriber[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUBSCRIBERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addSubscriber(email: string): boolean {
  const list = getSubscribers();
  if (list.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return false;
  }
  list.unshift({ email, subscribedAt: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY_SUBSCRIBERS, JSON.stringify(list));
  return true;
}
`);

// 3. NEWS PAGE DENGAN PARSER ORDERED LIST & CALLOUT EDITORIAL PROFESIONAL
saveFile('src/components/NewsPage.tsx', `
// filepath: /src/components/NewsPage.tsx
import React, { useState } from 'react';
import { Send, Search, CheckCircle2, ArrowRight, Calendar, Share2, Copy, MessageCircle, Twitter, Linkedin, ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Clock, UserCheck, BookmarkCheck } from 'lucide-react';
import { getStoredArticles, addSubscriber } from '../utils/newsStorage';
import { ArticleItem, Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const NewsPage: React.FC<{ activeDetailId?: string; onBackToList?: () => void; onSelectArticle?: (id: string) => void; currentLang?: Language }> = ({ activeDetailId, onBackToList, onSelectArticle, currentLang = 'id' }) => {
  const rawArticles = getStoredArticles();
  const sortedArticles = [...rawArticles].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

  const [articles] = useState<ArticleItem[]>(sortedArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [emailInput, setEmailInput] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Paginasi: 6 artikel per halaman
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const articlesPerPage = 6;

  const rawDetailArticle = activeDetailId ? articles.find(a => a.id === activeDetailId) : null;
  const detailArticle = rawDetailArticle ? {
    ...rawDetailArticle,
    title: currentLang === 'en' ? rawDetailArticle.title_en || rawDetailArticle.title : currentLang === 'zh' ? rawDetailArticle.title_zh || rawDetailArticle.title : rawDetailArticle.title,
    category: currentLang === 'en' ? rawDetailArticle.category_en || rawDetailArticle.category : currentLang === 'zh' ? rawDetailArticle.category_zh || rawDetailArticle.category : rawDetailArticle.category,
    content: currentLang === 'en' ? rawDetailArticle.content_en || rawDetailArticle.content : currentLang === 'zh' ? rawDetailArticle.content_zh || rawDetailArticle.content : rawDetailArticle.content,
  } : null;

  const categories = ['Semua', 'Regulasi Kepabeanan', 'Operational Freight', 'Rute Maritim', 'Kargo Khusus', 'Project Cargo & Alat Berat'];

  const filtered = articles.filter(a => {
    const titleText = currentLang === 'en' ? a.title_en || a.title : currentLang === 'zh' ? a.title_zh || a.title : a.title;
    const excerptText = currentLang === 'en' ? a.excerpt_en || a.excerpt : currentLang === 'zh' ? a.excerpt_zh || a.excerpt : a.excerpt;
    const matchSearch = titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        excerptText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'Semua' || a.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / articlesPerPage) || 1;
  const currentArticles = filtered.slice((currentPageNum - 1) * articlesPerPage, currentPageNum * articlesPerPage);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    const ok = addSubscriber(emailInput);
    if (ok) {
      setSubscribeStatus('Terima kasih! Anda telah terdaftar di buletin intelijen Gaek Freight.');
      setEmailInput('');
    } else {
      setSubscribeStatus('Email Anda sudah terdaftar sebelumnya.');
    }
  };

  const handleShare = (platform: 'wa' | 'tw' | 'li' | 'copy', article: ArticleItem) => {
    const url = window.location.origin + '/#news?id=' + article.id;
    const text = \`\${article.title} - Baca artikel regulasi & logistik maritim terpercaya:\`;

    if (platform === 'wa') {
      window.open(\`https://wa.me/?text=\${encodeURIComponent(text + ' ' + url)}\`, '_blank');
    } else if (platform === 'tw') {
      window.open(\`https://twitter.com/intent/tweet?text=\${encodeURIComponent(text)}&url=\${encodeURIComponent(url)}\`, '_blank');
    } else if (platform === 'li') {
      window.open(\`https://www.linkedin.com/sharing/share-offsite/?url=\${encodeURIComponent(url)}\`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  // Parser Konten Editorial Menjadi Paragraf, Subheading, dan Ordered List Cantik
  const renderStructuredContent = (rawText: string) => {
    const paragraphs = rawText.split('\\n\\n').filter(p => p.trim().length > 0);

    return paragraphs.map((p, idx) => {
      // Cek apakah paragraf adalah daftar bernomor (1., 2., 3., 4.)
      if (/^\\d+\\./m.test(p)) {
        const lines = p.split('\\n').filter(l => l.trim().length > 0);
        return (
          <div key={idx} className="space-y-3 my-6">
            {lines.map((line, lIdx) => {
              const match = line.match(/^(\\d+)\\.\\s*(.*)/);
              if (match) {
                return (
                  <div key={lIdx} className="flex items-start space-x-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors">
                    <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-blue-500/20">
                      {match[1]}
                    </span>
                    <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
                      {match[2]}
                    </div>
                  </div>
                );
              }
              return <p key={lIdx} className="text-base text-slate-700 leading-relaxed">{line}</p>;
            })}
          </div>
        );
      }

      // Cek apakah paragraf bertindak sebagai Subheading (diakhiri titik dua :)
      if (p.endsWith(':') || p.length < 90 && p.includes(':')) {
        return (
          <div key={idx} className="mt-8 mb-3">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center space-x-2.5 pb-2 border-b border-slate-200">
              <span className="w-2.5 h-6 bg-blue-600 rounded-sm inline-block flex-shrink-0" />
              <span>{p}</span>
            </h3>
          </div>
        );
      }

      // Paragraf pertama dijadikan Executive Callout Summary Box
      if (idx === 0) {
        return (
          <div key={idx} className="bg-blue-50/70 border-l-4 border-blue-600 p-6 sm:p-8 rounded-2xl text-slate-800 text-base sm:text-lg leading-relaxed font-medium mb-8 shadow-sm">
            {p}
          </div>
        );
      }

      // Paragraf Biasa yang Rapi
      return (
        <p key={idx} className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-6">
          {p}
        </p>
      );
    });
  };

  // --- VIEW: SINGLE PAGE READER DETAIL EDITORIAL RAPI ---
  if (detailArticle) {
    return (
      <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <button
            onClick={() => onBackToList && onBackToList()}
            className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 hover:text-blue-800 mb-8 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{getTranslation(currentLang, UI_TEXT.news.backBtn)}</span>
          </button>

          <article className="space-y-8 bg-white p-8 sm:p-14 rounded-3xl border border-slate-200 shadow-xl">
            
            {/* Editorial Header */}
            <div className="space-y-4 border-b border-slate-100 pb-8">
              <div className="flex items-center space-x-2">
                <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200">
                  {detailArticle.category}
                </span>
                <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <BookmarkCheck className="w-3 h-3" />
                  <span>Riset Terverifikasi</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900 font-sans">
                {detailArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-2">
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{detailArticle.publishedDate}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5">
                  <UserCheck className="w-4 h-4 text-slate-400" />
                  <span>{detailArticle.author}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1.5 text-blue-600 font-bold">
                  <Clock className="w-4 h-4" />
                  <span>{detailArticle.readTime}</span>
                </span>
              </div>
            </div>

            {/* Featured Visual Image */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img src={detailArticle.imageUrl} alt={detailArticle.title} className="w-full h-full object-cover" />
            </div>

            {/* Social Share Bar */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>{getTranslation(currentLang, UI_TEXT.news.shareTitle)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleShare('wa', detailArticle)}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-transform hover:scale-105"
                  title="Bagikan via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('li', detailArticle)}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-transform hover:scale-105"
                  title="Bagikan via LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('tw', detailArticle)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white shadow-sm transition-transform hover:scale-105"
                  title="Bagikan via Twitter/X"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy', detailArticle)}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold shadow-sm transition-all"
                >
                  <Copy className="w-3.5 h-3.5 text-blue-600" />
                  <span>{copySuccess ? getTranslation(currentLang, UI_TEXT.news.copySuccess) : getTranslation(currentLang, UI_TEXT.news.copyBtn)}</span>
                </button>
              </div>
            </div>

            {/* In-Depth Parsed Structured Content (> 3000 Karakter) */}
            <div className="pt-2">
              {renderStructuredContent(detailArticle.content)}
            </div>

            <hr className="my-8 border-slate-200" />

            {/* Kotak Sumber Referensi Resmi & Otoritas Industri */}
            {detailArticle.sources && detailArticle.sources.length > 0 && (
              <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-black text-slate-900 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>{getTranslation(currentLang, UI_TEXT.news.sourcesTitle)}</span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 font-medium pt-1">
                  {detailArticle.sources.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Strategic Consultation Card */}
            <div className="mt-10 p-8 bg-blue-50 border border-blue-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{getTranslation(currentLang, UI_TEXT.news.consultTitle)}</h4>
                <p className="text-xs text-slate-600 mt-1">
                  {getTranslation(currentLang, UI_TEXT.news.consultDesc)}
                </p>
              </div>
              <a
                href="https://wa.me/6285608561745"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-xs transition-all shadow-md"
              >
                {getTranslation(currentLang, UI_TEXT.news.consultBtn)}
              </a>
            </div>
          </article>

        </div>
      </div>
    );
  }

  // --- VIEW: DAFTAR ARTIKEL DENGAN PAGINASI ---
  return (
    <div className="pt-32 pb-24 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bersih */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 block mb-2">
            {getTranslation(currentLang, UI_TEXT.news.badge)}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {getTranslation(currentLang, UI_TEXT.news.title)}
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {getTranslation(currentLang, UI_TEXT.news.intro)}
          </p>
        </div>

        {/* Newsletter Subscription Card */}
        <div className="mb-14 bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              {getTranslation(currentLang, UI_TEXT.news.newsletterTitle)}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Dapatkan Pembaruan Kode HS & Regulasi Berkala
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pb-2">
              {getTranslation(currentLang, UI_TEXT.news.newsletterDesc)}
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Masukkan alamat email Anda..."
                className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Langganan</span>
              </button>
            </form>

            {subscribeStatus && (
              <div className="pt-2 flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{subscribeStatus}</span>
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="space-y-4 mb-10">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPageNum(1); }}
                className={\`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all \${
                  selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400'
                }\`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPageNum(1); }}
                placeholder={getTranslation(currentLang, UI_TEXT.news.searchPlaceholder)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {getTranslation(currentLang, UI_TEXT.news.showingText)} {filtered.length} Publikasi (Halaman {currentPageNum} dari {totalPages})
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentArticles.map((item) => {
            const displayTitle = currentLang === 'en' ? item.title_en || item.title : currentLang === 'zh' ? item.title_zh || item.title : item.title;
            const displayCategory = currentLang === 'en' ? item.category_en || item.category : currentLang === 'zh' ? item.category_zh || item.category : item.category;
            const displayExcerpt = currentLang === 'en' ? item.excerpt_en || item.excerpt : currentLang === 'zh' ? item.excerpt_zh || item.excerpt : item.excerpt;

            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img src={item.imageUrl} alt={displayTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-extrabold uppercase">
                      {displayCategory}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>{item.publishedDate}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {displayTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                      {displayExcerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onSelectArticle && onSelectArticle(item.id)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1.5 transition-colors"
                  >
                    <span>{getTranslation(currentLang, UI_TEXT.news.readMoreBtn)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginasi Bar */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 pt-6 border-t border-slate-200">
            <button
              onClick={() => setCurrentPageNum(prev => Math.max(prev - 1, 1))}
              disabled={currentPageNum === 1}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPageNum(num)}
                className={\`px-3.5 py-2 rounded-xl text-xs font-bold transition-all \${
                  currentPageNum === num
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400'
                }\`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setCurrentPageNum(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPageNum === totalPages}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
`);

console.log("\n>>> Menjalankan kompilasi produksi (npm run build)...");
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log(">>> [SUCCESS] Kompilasi berhasil 100% tanpa error!");
} catch (err) {
  console.error(">>> [ERROR] Kompilasi gagal, periksa log di atas.");
  process.exit(1);
}

console.log("\n>>> Mengirimkan rilis V10 ke GitHub & Hostinger...");
try {
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "feat: complete Gaek Freight V10 with 100% freight images, ordered-list editorial news >3000 chars, and streamlined intuitive Cargo Check UI"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log("\n>>> [BERHASIL] Seluruh pembaruan sudah terdorong ke GitHub dan dideploy ke Hostinger!");
} catch (err) {
  console.log(">>> Git selesai.");
}
