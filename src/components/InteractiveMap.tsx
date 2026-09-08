// filepath: /src/components/InteractiveMap.tsx
import React, { useState } from 'react';
import { Ship, Plane, Clock, Anchor, Compass } from 'lucide-react';
import { RouteData } from '../types/freight';

const GLOBAL_ROUTES: RouteData[] = [
  {
    id: 'china-shanghai',
    originName: 'Shanghai & Ningbo',
    originCountry: 'Tiongkok (China)',
    destinationPort: 'Jakarta (Tanjung Priok)',
    seaTransitDays: '10 - 14 Hari',
    airTransitDays: '1 - 2 Hari',
    departureFreq: '3x Seminggu Direct',
    commodities: 'Mesin Industri, Elektronik, Bahan Baku Tekstil, Plastik'
  },
  {
    id: 'china-shenzhen',
    originName: 'Shenzhen & Guangzhou',
    originCountry: 'Tiongkok Selatan',
    destinationPort: 'Surabaya (Tanjung Perak)',
    seaTransitDays: '9 - 12 Hari',
    airTransitDays: '1 - 2 Hari',
    departureFreq: '2x Seminggu Direct',
    commodities: 'Suku Cadang, Hardware, Consumer Goods, Aksesori'
  },
  {
    id: 'singapore-hub',
    originName: 'Singapore Port (PSA)',
    originCountry: 'Singapura (Asean Hub)',
    destinationPort: 'Semarang (Tanjung Emas)',
    seaTransitDays: '3 - 5 Hari',
    airTransitDays: 'Same Day / 24 Jam',
    departureFreq: 'Harian (Daily Feeder)',
    commodities: 'Transshipment Eropa & US, Kimia Khusus, Spare Parts'
  },
  {
    id: 'europe-rotterdam',
    originName: 'Rotterdam & Hamburg',
    originCountry: 'Eropa Barat',
    destinationPort: 'Jakarta (Tanjung Priok)',
    seaTransitDays: '28 - 34 Hari',
    airTransitDays: '3 - 4 Hari',
    departureFreq: 'Mingguan (Weekly)',
    commodities: 'Alat Berat, Farmasi, Komponen Otomotif, Mesin Presisi'
  },
  {
    id: 'middle-east-dubai',
    originName: 'Jebel Ali (Dubai)',
    originCountry: 'Timur Tengah (UAE)',
    destinationPort: 'Surabaya (Tanjung Perak)',
    seaTransitDays: '18 - 22 Hari',
    airTransitDays: '2 - 3 Hari',
    departureFreq: 'Mingguan (Weekly)',
    commodities: 'Petrokimia, Minyak & Gas, Pangan Kurma, Polimer'
  },
  {
    id: 'us-los-angeles',
    originName: 'Los Angeles & Long Beach',
    originCountry: 'Amerika Serikat (US West Coast)',
    destinationPort: 'Jakarta (Tanjung Priok)',
    seaTransitDays: '25 - 30 Hari',
    airTransitDays: '3 - 5 Hari',
    departureFreq: 'Mingguan (Weekly)',
    commodities: 'Pertanian Kedelai/Gandum, Resin, Teknologi Tinggi'
  }
];

function getPortSubname(dest: string): string {
  const openParen = dest.indexOf('(');
  const closeParen = dest.indexOf(')');
  if (openParen !== -1 && closeParen !== -1) {
    return dest.substring(openParen + 1, closeParen);
  }
  return 'Indonesia';
}

export const InteractiveMap: React.FC = () => {
  const [activeRouteId, setActiveRouteId] = useState<string>('china-shanghai');
  const selectedRoute = GLOBAL_ROUTES.find(r => r.id === activeRouteId) || GLOBAL_ROUTES[0];

  return (
    <section id="network" className="py-24 bg-brand-navy text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Global Corridors to Indonesia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Rute Pelayaran Dunia Langsung ke Jakarta, Semarang, & Surabaya
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Koneksi langsung dari pelabuhan manufaktur global utama dengan clearance cepat di 3 pelabuhan gerbang impor utama Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-7 bg-brand-darkBlue/70 border border-brand-steel/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-brand-steel/40 pb-4 mb-6">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
                  <span>Interactive Route Simulator</span>
                </span>
                <span className="text-[11px] text-slate-400">Pilih rute untuk melihat detail transit</span>
              </div>

              <div className="flex flex-wrap gap-2.5 mb-8">
                {GLOBAL_ROUTES.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => setActiveRouteId(route.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeRouteId === route.id
                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 scale-[1.02]'
                        : 'bg-brand-navy/80 text-slate-300 border border-brand-steel/40 hover:border-brand-orange/50'
                    }`}
                  >
                    {route.originName} ({route.originCountry.split(' ')[0]})
                  </button>
                ))}
              </div>

              <div className="relative bg-brand-navy rounded-2xl p-6 border border-brand-steel/30 min-h-[260px] flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  
                  <div className="w-full sm:w-auto bg-brand-darkBlue p-4 rounded-xl border border-brand-orange/40 text-center sm:text-left">
                    <span className="text-[10px] text-brand-orange uppercase font-bold tracking-wider block">Pelabuhan Muat Asal</span>
                    <h4 className="text-lg font-black text-white">{selectedRoute.originName}</h4>
                    <span className="text-xs text-slate-400">{selectedRoute.originCountry}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-1 my-2 sm:my-0">
                    <div className="flex items-center space-x-3 text-brand-orange">
                      <Ship className="w-5 h-5 animate-pulse" />
                      <div className="w-20 sm:w-28 h-0.5 bg-gradient-to-r from-brand-orange to-slate-400 relative">
                        <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-400 transform rotate-45" />
                      </div>
                      <Plane className="w-5 h-5 text-slate-400" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Jalur Maritim & Udara</span>
                  </div>

                  <div className="w-full sm:w-auto bg-brand-darkBlue p-4 rounded-xl border border-emerald-500/40 text-center sm:text-left">
                    <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block">Pelabuhan Tujuan Bongkar</span>
                    <h4 className="text-lg font-black text-white">{selectedRoute.destinationPort.split(' ')[0]}</h4>
                    <span className="text-xs text-slate-400">
                      {getPortSubname(selectedRoute.destinationPort)}
                    </span>
                  </div>

                </div>

                <div className="mt-8 pt-6 border-t border-brand-steel/30 grid grid-cols-3 gap-2 text-center">
                  <div className={`p-2 rounded-lg ${selectedRoute.destinationPort.includes('Jakarta') ? 'bg-brand-orange/20 border border-brand-orange' : 'bg-brand-darkBlue/50'}`}>
                    <span className="text-[11px] font-bold block text-white">Jakarta</span>
                    <span className="text-[9px] text-slate-400">Tanjung Priok</span>
                  </div>
                  <div className={`p-2 rounded-lg ${selectedRoute.destinationPort.includes('Semarang') ? 'bg-brand-orange/20 border border-brand-orange' : 'bg-brand-darkBlue/50'}`}>
                    <span className="text-[11px] font-bold block text-white">Semarang</span>
                    <span className="text-[9px] text-slate-400">Tanjung Emas</span>
                  </div>
                  <div className={`p-2 rounded-lg ${selectedRoute.destinationPort.includes('Surabaya') ? 'bg-brand-orange/20 border border-brand-orange' : 'bg-brand-darkBlue/50'}`}>
                    <span className="text-[11px] font-bold block text-white">Surabaya</span>
                    <span className="text-[9px] text-slate-400">Tanjung Perak</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6 text-xs text-slate-400 flex items-center space-x-2">
              <Anchor className="w-4 h-4 text-brand-orange flex-shrink-0" />
              <span>Seluruh rute telah dilengkapi izin jalur pabean impor & trucking inland door-to-door.</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-1">
                Estimasi Waktu & Frekuensi
              </span>
              <h3 className="text-2xl font-black text-brand-navy mb-6">
                {selectedRoute.originName} &rarr; {selectedRoute.destinationPort.split(' ')[0]}
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-brand-surface border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-brand-navy text-white rounded-lg">
                      <Ship className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-bold block">Ocean Transit Time</span>
                      <span className="text-base font-black text-brand-navy">{selectedRoute.seaTransitDays}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">FCL & LCL</span>
                </div>

                <div className="p-4 rounded-xl bg-brand-surface border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-brand-navy text-white rounded-lg">
                      <Plane className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-bold block">Air Freight Transit</span>
                      <span className="text-base font-black text-brand-navy">{selectedRoute.airTransitDays}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">Express Priority</span>
                </div>

                <div className="p-4 rounded-xl bg-brand-surface border border-slate-200">
                  <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold mb-1">
                    <Clock className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Jadwal Keberangkatan:</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800">{selectedRoute.departureFreq}</div>
                </div>

                <div className="p-4 rounded-xl bg-brand-surface border border-slate-200">
                  <span className="text-xs text-slate-500 font-bold block mb-1">Komoditas Utama Koridor Ini:</span>
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                    {selectedRoute.commodities}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200">
              <a
                href="#calculator"
                className="w-full block text-center bg-brand-navy hover:bg-brand-darkBlue text-white py-3.5 px-4 rounded-xl font-bold text-sm transition-all shadow-md"
              >
                Hitung Tarif untuk Rute Ini
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
