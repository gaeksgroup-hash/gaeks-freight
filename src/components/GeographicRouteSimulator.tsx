// filepath: /src/components/GeographicRouteSimulator.tsx
import React, { useState } from 'react';
import { Compass, Ship, Anchor, ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react';
import { DomesticPortRoute, Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

const INDONESIA_PORTS: DomesticPortRoute[] = [
  {
    id: 'priok',
    portName: 'Pelabuhan Tanjung Priok',
    city: 'Jakarta',
    code: 'IDJKT',
    region: 'DKI Jakarta',
    activeRoutes: [
      { destination: 'Port of Shanghai (CNSHA)', transit: '10 - 14 Hari', freq: '3x Seminggu Direct', liner: 'COSCO / Maersk' },
      { destination: 'Ningbo-Zhoushan (CNNGB)', transit: '11 - 15 Hari', freq: '2x Seminggu Direct', liner: 'Evergreen / ONE' },
      { destination: 'Port of Singapore (SGSIN)', transit: '2 - 3 Hari', freq: 'Harian (Daily)', liner: 'Feeder Hub Asia' },
      { destination: 'Port of Rotterdam (NLRTM)', transit: '28 - 34 Hari', freq: 'Mingguan (Weekly)', liner: 'Ocean Alliance' }
    ]
  },
  {
    id: 'emas',
    portName: 'Pelabuhan Tanjung Emas',
    city: 'Semarang',
    code: 'IDSRG',
    region: 'Jawa Tengah',
    activeRoutes: [
      { destination: 'Shanghai & Ningbo', transit: '9 - 12 Hari', freq: '2x Seminggu Direct', liner: 'Wan Hai / SITC' },
      { destination: 'Singapore Port (PSA)', transit: '3 - 5 Hari', freq: 'Harian (Daily)', liner: 'Feeder Hub Jateng' },
      { destination: 'Port Klang (MYPKG)', transit: '4 - 6 Hari', freq: '3x Seminggu', liner: 'Regional Feeder' }
    ]
  },
  {
    id: 'perak',
    portName: 'Pelabuhan Tanjung Perak',
    city: 'Surabaya',
    code: 'IDSUB',
    region: 'Jawa Timur',
    activeRoutes: [
      { destination: 'Shenzhen (Yantian / Shekou)', transit: '9 - 12 Hari', freq: '3x Seminggu Direct', liner: 'OOCL / CMA CGM' },
      { destination: 'Busan Port (KRPUS)', transit: '12 - 16 Hari', freq: 'Mingguan (Weekly)', liner: 'HMM / Sinokor' },
      { destination: 'Jebel Ali Dubai (AEJEA)', transit: '18 - 22 Hari', freq: 'Mingguan (Weekly)', liner: 'MSC / Hapag-Lloyd' }
    ]
  },
  {
    id: 'belawan',
    portName: 'Pelabuhan Belawan',
    city: 'Medan',
    code: 'IDBLW',
    region: 'Sumatra Utara',
    activeRoutes: [
      { destination: 'Penang Port (MYPEN)', transit: '1 - 2 Hari', freq: 'Harian', liner: 'Selat Malaka Shuttle' },
      { destination: 'Port Klang (MYPKG)', transit: '2 - 3 Hari', freq: '4x Seminggu', liner: 'Direct Feeder' }
    ]
  },
  {
    id: 'batam',
    portName: 'Pelabuhan Batu Ampar',
    city: 'Batam',
    code: 'IDBTH',
    region: 'Kepulauan Riau (FTZ)',
    activeRoutes: [
      { destination: 'Singapore Port (PSA)', transit: '4 Jam (Same Day)', freq: 'Barge Harian 5x', liner: 'Batam Direct Shuttle' }
    ]
  }
];

export const GeographicRouteSimulator: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const [selectedPortId, setSelectedPortId] = useState<string>('priok');
  const selectedPort = INDONESIA_PORTS.find(p => p.id === selectedPortId) || INDONESIA_PORTS[0];

  return (
    <section className="py-24 bg-white border-t border-slate-200 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" />
            <span>{getTranslation(currentLang, UI_TEXT.geo.tag)}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {getTranslation(currentLang, UI_TEXT.geo.title)}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {getTranslation(currentLang, UI_TEXT.geo.desc)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Visual Interactive SVG Map Canvas */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                  <span>Interactive Map Nodes (Klik Titik Pelabuhan)</span>
                </span>
                <span className="text-xs text-blue-700 font-extrabold">{selectedPort.portName}</span>
              </div>

              {/* Geographic Visual SVG of Indonesia Java Spine (Priok - Emas - Perak) */}
              <div className="relative bg-white rounded-2xl p-6 border border-slate-200 min-h-[280px] flex flex-col justify-center overflow-hidden shadow-inner">
                
                {/* SVG Silhouette Schematic */}
                <svg viewBox="0 0 700 240" className="w-full h-auto drop-shadow">
                  {/* Background Water Grid */}
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="700" height="240" fill="url(#grid)" />

                  {/* Sumatra Silhouette */}
                  <path d="M 50 40 L 140 110 L 190 180 L 150 190 L 100 130 L 30 70 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Java Island Silhouette */}
                  <path d="M 200 190 L 320 185 L 430 195 L 530 200 L 520 220 L 400 215 L 280 210 L 190 205 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
                  {/* Kalimantan Silhouette */}
                  <path d="M 240 40 L 360 45 L 390 120 L 340 140 L 250 130 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Sulawesi Silhouette */}
                  <path d="M 460 60 L 510 50 L 490 110 L 530 140 L 480 160 L 460 110 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />

                  {/* Maritime Shipping Route Feeder Line (Connecting Belawan -> Priok -> Emas -> Perak) */}
                  <path d="M 100 60 Q 150 140 240 190 T 360 195 T 470 202" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="5,5" className="animate-pulse" />
                  
                  {/* Outbound Global Ocean Lines */}
                  <path d="M 240 190 L 200 10" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="3,3" />
                  <path d="M 360 195 L 340 10" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="3,3" />
                  <path d="M 470 202 L 600 80" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="3,3" />

                  {/* Node: Jakarta (Tanjung Priok) */}
                  <g className="cursor-pointer" onClick={() => setSelectedPortId('priok')}>
                    <circle cx="240" cy="190" r="10" fill="#2563EB" className={selectedPortId === 'priok' ? 'animate-ping opacity-75' : ''} />
                    <circle cx="240" cy="190" r="6" fill={selectedPortId === 'priok' ? '#D97706' : '#2563EB'} stroke="#FFFFFF" strokeWidth="2" />
                    <text x="240" y="175" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F172A">Jakarta (Priok)</text>
                  </g>

                  {/* Node: Semarang (Tanjung Emas) */}
                  <g className="cursor-pointer" onClick={() => setSelectedPortId('emas')}>
                    <circle cx="360" cy="195" r="10" fill="#2563EB" className={selectedPortId === 'emas' ? 'animate-ping opacity-75' : ''} />
                    <circle cx="360" cy="195" r="6" fill={selectedPortId === 'emas' ? '#D97706' : '#2563EB'} stroke="#FFFFFF" strokeWidth="2" />
                    <text x="360" y="225" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F172A">Semarang (Emas)</text>
                  </g>

                  {/* Node: Surabaya (Tanjung Perak) */}
                  <g className="cursor-pointer" onClick={() => setSelectedPortId('perak')}>
                    <circle cx="470" cy="202" r="10" fill="#2563EB" className={selectedPortId === 'perak' ? 'animate-ping opacity-75' : ''} />
                    <circle cx="470" cy="202" r="6" fill={selectedPortId === 'perak' ? '#D97706' : '#2563EB'} stroke="#FFFFFF" strokeWidth="2" />
                    <text x="470" y="185" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F172A">Surabaya (Perak)</text>
                  </g>

                  {/* Node: Medan (Belawan) */}
                  <g className="cursor-pointer" onClick={() => setSelectedPortId('belawan')}>
                    <circle cx="100" cy="60" r="5" fill="#64748B" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x="100" y="50" textAnchor="middle" fontSize="10" fill="#475569">Belawan</text>
                  </g>
                </svg>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-slate-100 pt-3">
                  <span className="text-slate-500 font-medium">Klik pada titik kota untuk melihat jadwal terhubung:</span>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setSelectedPortId('priok')} className={`px-2.5 py-1 rounded-lg font-bold text-xs ${selectedPortId === 'priok' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Jakarta</button>
                    <button onClick={() => setSelectedPortId('emas')} className={`px-2.5 py-1 rounded-lg font-bold text-xs ${selectedPortId === 'emas' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Semarang</button>
                    <button onClick={() => setSelectedPortId('perak')} className={`px-2.5 py-1 rounded-lg font-bold text-xs ${selectedPortId === 'perak' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Surabaya</button>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic mt-4">
              * Gaek Freight melayani kepabeanan PPJK dan pengiriman terpadu di seluruh pelabuhan komersial di atas.
            </p>
          </div>

          {/* Active Global Connections Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center space-x-2 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-2">
                <Anchor className="w-4 h-4" />
                <span>Koneksi Rute Aktif Terpilih</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {selectedPort.portName}
              </h3>
              <span className="text-xs text-slate-500 block mb-6">{selectedPort.region} • Kode Pabean: {selectedPort.code}</span>

              <div className="space-y-3">
                {selectedPort.activeRoutes.map((route, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-900">{route.destination}</span>
                      <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{route.freq}</span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span>Transit: <strong className="text-emerald-600">{route.transit}</strong></span>
                      <span className="text-[11px] text-slate-600 font-medium">{route.liner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <a
                href="#calculator"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-500/20 hover:scale-105"
              >
                <span>Cek Tarif & Jadwal Kapal Rute Ini</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
