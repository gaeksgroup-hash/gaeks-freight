// filepath: /src/components/GeographicRouteSimulator.tsx
import React, { useState } from 'react';
import { Compass, Ship, Anchor, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { DomesticPortRoute, Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

const INDONESIA_PORTS: DomesticPortRoute[] = [
  {
    id: 'priok',
    portName: 'Pelabuhan Tanjung Priok',
    city: 'Jakarta (DKI Jakarta)',
    code: 'IDJKT',
    coordinates: { x: 28, y: 65 },
    activeRoutes: [
      { destination: 'Port of Shanghai (CNSHA)', transit: '10 - 14 Hari', freq: '3x Seminggu Direct', liner: 'COSCO / Maersk' },
      { destination: 'Ningbo-Zhoushan (CNNGB)', transit: '11 - 15 Hari', freq: '2x Seminggu Direct', liner: 'Evergreen / ONE' },
      { destination: 'Port of Singapore (SGSIN)', transit: '2 - 3 Hari', freq: 'Harian (Daily)', liner: 'PSA Dedicated Feeder' },
      { destination: 'Port of Rotterdam (NLRTM)', transit: '28 - 34 Hari', freq: 'Mingguan (Weekly)', liner: 'Ocean Alliance' }
    ]
  },
  {
    id: 'emas',
    portName: 'Pelabuhan Tanjung Emas',
    city: 'Semarang (Jawa Tengah)',
    code: 'IDSRG',
    coordinates: { x: 42, y: 70 },
    activeRoutes: [
      { destination: 'Shanghai & Ningbo', transit: '9 - 12 Hari', freq: '2x Seminggu Direct', liner: 'Wan Hai / SITC' },
      { destination: 'Singapore Port (PSA)', transit: '3 - 5 Hari', freq: 'Harian (Daily)', liner: 'Feeder Hub Jawa Tengah' },
      { destination: 'Port Klang (MYPKG)', transit: '4 - 6 Hari', freq: '3x Seminggu', liner: 'Regional Feeder' }
    ]
  },
  {
    id: 'perak',
    portName: 'Pelabuhan Tanjung Perak',
    city: 'Surabaya (Jawa Timur)',
    code: 'IDSUB',
    coordinates: { x: 55, y: 72 },
    activeRoutes: [
      { destination: 'Shenzhen (Yantian / Shekou)', transit: '9 - 12 Hari', freq: '3x Seminggu Direct', liner: 'OOCL / CMA CGM' },
      { destination: 'Busan Port (KRPUS)', transit: '12 - 16 Hari', freq: 'Mingguan (Weekly)', liner: 'HMM / Sinokor' },
      { destination: 'Jebel Ali Dubai (AEJEA)', transit: '18 - 22 Hari', freq: 'Mingguan (Weekly)', liner: 'MSC / Hapag-Lloyd' }
    ]
  },
  {
    id: 'belawan',
    portName: 'Pelabuhan Belawan',
    city: 'Medan (Sumatra Utara)',
    code: 'IDBLW',
    coordinates: { x: 12, y: 25 },
    activeRoutes: [
      { destination: 'Penang Port (MYPEN)', transit: '1 - 2 Hari', freq: 'Harian', liner: 'Selat Malaka Shuttle' },
      { destination: 'Port Klang (MYPKG)', transit: '2 - 3 Hari', freq: '4x Seminggu', liner: 'Direct Feeder' },
      { destination: 'Colombo Port (LKCMB)', transit: '5 - 7 Hari', freq: 'Mingguan', liner: 'South Asia Corridor' }
    ]
  },
  {
    id: 'batam',
    portName: 'Pelabuhan Batu Ampar',
    city: 'Batam (Kepulauan Riau - FTZ)',
    code: 'IDBTH',
    coordinates: { x: 22, y: 38 },
    activeRoutes: [
      { destination: 'Singapore Port (PSA)', transit: 'Same Day (4 Jam)', freq: 'Barge Harian 5x', liner: 'Batam Fast Logistics' },
      { destination: 'Johor Pasir Gudang (MYPGU)', transit: '6 Jam', freq: 'Harian', liner: 'Industrial Cross-Border' }
    ]
  },
  {
    id: 'patimban',
    portName: 'Pelabuhan Patimban',
    city: 'Subang (Jawa Barat)',
    code: 'IDPTB',
    coordinates: { x: 33, y: 66 },
    activeRoutes: [
      { destination: 'Tokyo & Nagoya (Jepang)', transit: '11 - 14 Hari', freq: 'Mingguan (Automotive Car Carrier)', liner: 'NYK / K-Line' },
      { destination: 'Laem Chabang (Thailand)', transit: '5 - 7 Hari', freq: '2x Seminggu', liner: 'Asean Automotive Corridor' }
    ]
  },
  {
    id: 'makassar',
    portName: 'Pelabuhan Makassar',
    city: 'Makassar (Sulawesi Selatan)',
    code: 'IDMAK',
    coordinates: { x: 70, y: 55 },
    activeRoutes: [
      { destination: 'Direct Call Tiongkok Timur', transit: '10 - 13 Hari', freq: 'Mingguan (Weekly)', liner: 'SITC Direct Gateway' },
      { destination: 'Hub Tanjung Perak Surabaya', transit: '2 Hari', freq: 'Harian', liner: 'Inter-Island Domestic' }
    ]
  }
];

export const GeographicRouteSimulator: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const [selectedPortId, setSelectedPortId] = useState<string>('priok');
  const selectedPort = INDONESIA_PORTS.find(p => p.id === selectedPortId) || INDONESIA_PORTS[0];

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" />
            <span>{getTranslation(currentLang, UI_TEXT.geo.tag)}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {getTranslation(currentLang, UI_TEXT.geo.title)}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            {getTranslation(currentLang, UI_TEXT.geo.desc)}
          </p>
        </div>

        {/* Interactive Map Canvas + Route Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Visual Schematic Archipelago Map */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>Interactive Hub Selector (Klik Simpul Pelabuhan)</span>
                </span>
                <span className="text-[11px] text-cyan-400 font-bold">{selectedPort.portName}</span>
              </div>

              {/* Port Selector Buttons */}
              <div className="flex flex-wrap gap-2 mb-8">
                {INDONESIA_PORTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPortId(p.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      selectedPortId === p.id
                        ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-black shadow-lg shadow-cyan-500/20 scale-105'
                        : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-400'
                    }`}
                  >
                    <Anchor className="w-3 h-3" />
                    <span>{p.city.split(' ')[0]} ({p.code})</span>
                  </button>
                ))}
              </div>

              {/* Geographic Visual Container */}
              <div className="relative bg-slate-950 rounded-2xl p-6 border border-slate-800 min-h-[260px] flex flex-col justify-center">
                <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-cyan-500/30">
                  <div>
                    <span className="text-[10px] text-cyan-400 uppercase font-black tracking-wider block">Pelabuhan Muat / Gerbang Terpilih</span>
                    <h3 className="text-xl font-black text-white">{selectedPort.portName}</h3>
                    <span className="text-xs text-slate-400">{selectedPort.city} • Kode Pabean: {selectedPort.code}</span>
                  </div>
                  <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                    <Ship className="w-6 h-6" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-bold">Koneksi Rute</span>
                    <span className="text-lg font-black text-cyan-400">{selectedPort.activeRoutes.length} Koridor</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-bold">Clearance PPJK</span>
                    <span className="text-lg font-black text-emerald-400">Ceisa 4.0</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-bold">Layanan</span>
                    <span className="text-lg font-black text-white">FCL / LCL</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-bold">Inland Trucking</span>
                    <span className="text-lg font-black text-cyan-400">Dedicated</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic mt-4">
              * Gaek Freight melayani kepabeanan PPJK dan pengiriman terpadu di seluruh pelabuhan komersial di atas.
            </p>
          </div>

          {/* Active Global Connections for Selected Port */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Jadwal & Koridor Maritim Aktif
              </span>
              <h3 className="text-xl font-black text-white mb-6">
                Rute Global dari {selectedPort.portName}
              </h3>

              <div className="space-y-3.5">
                {selectedPort.activeRoutes.map((route, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-black text-white">{route.destination}</span>
                      <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">{route.freq}</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
                      <span>Estimasi Transit: <strong className="text-emerald-400">{route.transit}</strong></span>
                      <span className="text-[11px] text-slate-400">{route.liner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6">
              <a
                href="#calculator"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 hover:scale-105"
              >
                <span>Cek Tarif & Jadwal Kapal Rute Ini</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
