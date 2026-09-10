// filepath: /src/components/InteractiveMap.tsx
import React, { useState, useMemo } from 'react';
import { Ship, Plane, Clock, Compass, Search, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { toast } from 'sonner';

interface OceanRouteSchedule {
  region: 'EAST ASIA' | 'SEA & INDIA' | 'EUROPE' | 'USA';
  origin: string;
  preferredCarrier: string;
  leadTime: string;
  minDays: number;
  maxDays: number;
  nonPreferredCarrier: string;
  justification: string;
}

interface AirRouteSchedule {
  region: 'EAST ASIA' | 'SEA & INDIA' | 'EUROPE' | 'USA';
  origin: string;
  airportCode: string;
  recommendedAirline: string;
  availableAirlines: string;
  leadTime: string;
  flightType: string;
  justification: string;
}

// Basis Data Resmi Rute & Carrier Laut dari Lembar Kebijakan Operasional
const OCEAN_ROUTES: OceanRouteSchedule[] = [
  {
    region: 'EAST ASIA',
    origin: 'Shanghai',
    preferredCarrier: 'HMM, CK LINE, MSK, COSCO, OOCL',
    leadTime: '7 - 9 Hari',
    minDays: 7,
    maxDays: 9,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (7-9 Hari).'
  },
  {
    region: 'EAST ASIA',
    origin: 'Ningbo',
    preferredCarrier: 'MSK, COSCO, OOCL',
    leadTime: '10 - 14 Hari',
    minDays: 10,
    maxDays: 14,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (10-14 Hari).'
  },
  {
    region: 'EAST ASIA',
    origin: 'Qingdao / Tianjin',
    preferredCarrier: 'MSK, OOCL, COSCO, HMM',
    leadTime: '10 - 12 Hari',
    minDays: 10,
    maxDays: 12,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (10-12 Hari).'
  },
  {
    region: 'EAST ASIA',
    origin: 'Shenzhen / Shekou',
    preferredCarrier: 'OOCL, Maersk, COSCO',
    leadTime: '5 - 7 Hari',
    minDays: 5,
    maxDays: 7,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (5-7 Hari).'
  },
  {
    region: 'EAST ASIA',
    origin: 'Nansha / Xiamen',
    preferredCarrier: 'MSK, OOCL, ONE, COSCO',
    leadTime: '6 - 10 Hari',
    minDays: 6,
    maxDays: 10,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (6-10 Hari).'
  },
  {
    region: 'EAST ASIA',
    origin: 'Hong Kong',
    preferredCarrier: 'HAL, KMTC, SAMUDRA',
    leadTime: '5 - 6 Hari',
    minDays: 5,
    maxDays: 6,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (5-6 Hari).'
  },
  {
    region: 'EAST ASIA',
    origin: 'Busan',
    preferredCarrier: 'KMTC, HAL, SINOKOR, NAMSUNG',
    leadTime: '9 - 11 Hari',
    minDays: 9,
    maxDays: 11,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (9-11 Hari).'
  },
  {
    region: 'EAST ASIA',
    origin: 'Kaohsiung / Keelung',
    preferredCarrier: 'Yang Ming, KMTC, EVERGREEN',
    leadTime: '6 - 8 Hari',
    minDays: 6,
    maxDays: 8,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (6-8 Hari).'
  },
  {
    region: 'EAST ASIA',
    origin: 'Osaka',
    preferredCarrier: 'ONE, SPILL, OOCL',
    leadTime: '12 - 14 Hari',
    minDays: 12,
    maxDays: 14,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (12-14 Hari).'
  },
  {
    region: 'SEA & INDIA',
    origin: 'Singapore',
    preferredCarrier: 'ONE, PIL, SAMUDERA',
    leadTime: '2 - 3 Hari',
    minDays: 2,
    maxDays: 3,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (2-3 Hari).'
  },
  {
    region: 'SEA & INDIA',
    origin: 'Port Klang',
    preferredCarrier: 'COSCO, CTP, KMTC, WAN HAI',
    leadTime: '3 - 4 Hari',
    minDays: 3,
    maxDays: 4,
    nonPreferredCarrier: 'ZIM, EVERGREEN, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (3-4 Hari).'
  },
  {
    region: 'SEA & INDIA',
    origin: 'Ho Chi Minh',
    preferredCarrier: 'HAL, COSCO, KMTC',
    leadTime: '4 - 5 Hari',
    minDays: 4,
    maxDays: 5,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (4-5 Hari).'
  },
  {
    region: 'SEA & INDIA',
    origin: 'Manila',
    preferredCarrier: 'MSK, WANHAI, CMA CGM',
    leadTime: '7 - 9 Hari',
    minDays: 7,
    maxDays: 9,
    nonPreferredCarrier: 'ZIM, EVERGREEN, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (7-9 Hari).'
  },
  {
    region: 'SEA & INDIA',
    origin: 'Mundra / Nhava Sheva',
    preferredCarrier: 'OOCL, KMTC, WANHAI',
    leadTime: '12 - 15 Hari',
    minDays: 12,
    maxDays: 15,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (12-15 Hari).'
  },
  {
    region: 'EUROPE',
    origin: 'Rotterdam / Antwerp',
    preferredCarrier: 'MSC, Maersk, CMA CGM',
    leadTime: '28 - 32 Hari',
    minDays: 28,
    maxDays: 32,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (28-32 Hari).'
  },
  {
    region: 'EUROPE',
    origin: 'Hamburg / Bremerhaven',
    preferredCarrier: 'Hapag-Lloyd, ONE, MSC',
    leadTime: '30 - 33 Hari',
    minDays: 30,
    maxDays: 33,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (30-33 Hari).'
  },
  {
    region: 'EUROPE',
    origin: 'Felixstowe / Immingham',
    preferredCarrier: 'Maersk, COSCO, MSC',
    leadTime: '32 - 35 Hari',
    minDays: 32,
    maxDays: 35,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (32-35 Hari).'
  },
  {
    region: 'EUROPE',
    origin: 'HAROPA (Le Havre)',
    preferredCarrier: 'CMA CGM, MSC, HAPAG LLOYD',
    leadTime: '29 - 33 Hari',
    minDays: 29,
    maxDays: 33,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (29-33 Hari).'
  },
  {
    region: 'EUROPE',
    origin: 'Marseille Fos',
    preferredCarrier: 'CMA CGM, MSC, HAPAG LLOYD',
    leadTime: '25 - 28 Hari',
    minDays: 25,
    maxDays: 28,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (25-28 Hari).'
  },
  {
    region: 'USA',
    origin: 'Long Beach / Los Angeles',
    preferredCarrier: 'COSCO, ONE, Maersk',
    leadTime: '28 - 35 Hari',
    minDays: 28,
    maxDays: 35,
    nonPreferredCarrier: 'ZIM, EVERGREEN, WHL, CNC',
    justification: 'Carrier terpilih direkomendasikan karena memiliki port call minimal, menjamin efisiensi lead time (28-35 Hari).'
  }
];

// Basis Data Resmi Rute & Maskapai Kargo Udara (Air Freight Schedule & Airlines)
const AIR_ROUTES: AirRouteSchedule[] = [
  {
    region: 'EAST ASIA',
    origin: 'Shanghai',
    airportCode: 'PVG',
    recommendedAirline: 'China Cargo Airlines (CK), Garuda Indonesia (GA), Singapore Airlines (SQ)',
    availableAirlines: 'Cathay Cargo (CX), China Eastern (MU), Korean Air (KE)',
    leadTime: '1 - 2 Hari',
    flightType: 'Direct & 1-Stop Daily Priority',
    justification: 'Penerbangan kargo terjadwal harian dengan kapasitas main-deck freighter untuk suku cadang & mesin industri mendesak.'
  },
  {
    region: 'EAST ASIA',
    origin: 'Ningbo / Hangzhou',
    airportCode: 'NGB / HGH',
    recommendedAirline: 'Air China Cargo (CA), Cathay Cargo (CX)',
    availableAirlines: 'China Southern Cargo (CZ), Silk Way West, EVA Air (BR)',
    leadTime: '1 - 2 Hari',
    flightType: 'Dedicated Air Freighter',
    justification: 'Koneksi hub regional Zhejiang tercepat dengan penanganan prioritas dokumen Air Waybill (AWB).'
  },
  {
    region: 'EAST ASIA',
    origin: 'Shenzhen / Guangzhou',
    airportCode: 'SZX / CAN',
    recommendedAirline: 'China Southern Cargo (CZ), SF Airlines, Garuda Indonesia (GA)',
    availableAirlines: 'Asiana Cargo (OZ), EVA Air Cargo (BR)',
    leadTime: '1 - 2 Hari',
    flightType: 'Direct Flight ke CGK',
    justification: 'Penerbangan langsung dari sentra manufaktur Tiongkok Selatan ke Bandara Soekarno-Hatta.'
  },
  {
    region: 'EAST ASIA',
    origin: 'Hong Kong',
    airportCode: 'HKG',
    recommendedAirline: 'Cathay Cargo (CX), Hong Kong Air Cargo (RH), Garuda Indonesia (GA)',
    availableAirlines: 'UPS Air, FedEx Cargo, AirAsia Teleport',
    leadTime: 'Same Day - 1 Hari',
    flightType: 'High-Frequency Daily Shuttle',
    justification: 'Pusat kargo udara global tersibuk dengan frekuensi 4x penerbangan kargo harian ke Jakarta.'
  },
  {
    region: 'EAST ASIA',
    origin: 'Seoul Incheon',
    airportCode: 'ICN',
    recommendedAirline: 'Korean Air Cargo (KE), Asiana Cargo (OZ)',
    availableAirlines: 'Garuda Indonesia (GA), Polar Air Cargo',
    leadTime: '1 - 2 Hari',
    flightType: 'Direct Freighter & Passenger Belly',
    justification: 'Layanan kargo terpercaya untuk komoditas elektronik presisi, semikonduktor, dan bahan kimia berizin BPOM.'
  },
  {
    region: 'EAST ASIA',
    origin: 'Taipei Taoyuan',
    airportCode: 'TPE',
    recommendedAirline: 'EVA Air Cargo (BR), China Airlines Cargo (CI)',
    availableAirlines: 'Cathay Cargo (CX), STARLUX Airlines',
    leadTime: '1 - 2 Hari',
    flightType: 'Direct Daily Flight',
    justification: 'Jalur langsung Taiwan-Jakarta dengan kapasitas angkut palet industri dan suhu terkontrol.'
  },
  {
    region: 'EAST ASIA',
    origin: 'Tokyo Narita / Haneda',
    airportCode: 'NRT / HND',
    recommendedAirline: 'ANA Cargo (NH), Japan Airlines Cargo (JL)',
    availableAirlines: 'Garuda Indonesia (GA), Singapore Airlines (SQ)',
    leadTime: '1 - 2 Hari',
    flightType: 'Direct Widebody Flight',
    justification: 'Standar akurasi tinggi untuk pengiriman suku cadang mesin otomotif dan komponen presisi Jepang.'
  },
  {
    region: 'SEA & INDIA',
    origin: 'Singapore Changi',
    airportCode: 'SIN',
    recommendedAirline: 'Singapore Airlines Cargo (SQ), Garuda Indonesia (GA)',
    availableAirlines: 'Scoot, AirAsia Teleport, Raya Airways',
    leadTime: 'Same Day (4 - 8 Jam)',
    flightType: 'Frequent Daily Air Shuttle (8x/hari)',
    justification: 'Konektivitas transit kilat Asean hub dengan proses unstuffing cepat di lini 1 kargo Bandara CGK.'
  },
  {
    region: 'SEA & INDIA',
    origin: 'Kuala Lumpur',
    airportCode: 'KUL',
    recommendedAirline: 'Malaysia Airlines Kargo (MH), Raya Airways',
    availableAirlines: 'AirAsia Cargo (Teleport), Batik Air Malaysia',
    leadTime: 'Same Day - 1 Hari',
    flightType: 'Direct Daily Service',
    justification: 'Jalur angkutan kilat dari hub logistik Malaysia Barat ke Jakarta dan Surabaya.'
  },
  {
    region: 'SEA & INDIA',
    origin: 'Bangkok Suvarnabhumi',
    airportCode: 'BKK',
    recommendedAirline: 'Thai Airways Cargo (TG), K-Mile Air',
    availableAirlines: 'Garuda Indonesia (GA), AirAsia',
    leadTime: '1 - 2 Hari',
    flightType: 'Direct Daily Flight',
    justification: 'Solusi ekspres kargo suku cadang otomotif dan komoditas industri Thailand.'
  },
  {
    region: 'SEA & INDIA',
    origin: 'Mumbai / Delhi',
    airportCode: 'BOM / DEL',
    recommendedAirline: 'Singapore Airlines (SQ via SIN), Malaysia Airlines (MH via KUL)',
    availableAirlines: 'Qatar Airways Cargo (QR), Emirates SkyCargo (EK), IndiGo Cargo',
    leadTime: '2 - 3 Hari',
    flightType: '1-Stop Transshipment Priority',
    justification: 'Layanan tercepat koridor India-Indonesia dengan jaminan koneksi transit di bawah 6 jam.'
  },
  {
    region: 'EUROPE',
    origin: 'Frankfurt / Amsterdam',
    airportCode: 'FRA / AMS',
    recommendedAirline: 'Lufthansa Cargo (LH), KLM Cargo (KL), Emirates SkyCargo (EK)',
    availableAirlines: 'Qatar Airways Cargo (QR), Turkish Cargo (TK), Singapore Airlines (SQ)',
    leadTime: '2 - 3 Hari',
    flightType: 'Scheduled Widebody & Freighter',
    justification: 'Kapasitas angkut muatan berat dari jantung manufaktur Jerman dan Belanda dengan perlindungan kargo farmasi dingin (GDP).'
  },
  {
    region: 'EUROPE',
    origin: 'London Heathrow / Paris',
    airportCode: 'LHR / CDG',
    recommendedAirline: 'Emirates SkyCargo (EK), Qatar Airways Cargo (QR)',
    availableAirlines: 'Turkish Cargo (TK), Saudia Cargo (SV), Singapore Airlines (SQ)',
    leadTime: '2 - 3 Hari',
    flightType: 'Daily Middle-East Hub Connection',
    justification: 'Jaringan kargo udara Eropa Barat dengan penanganan prioritas komoditas bernilai tinggi.'
  },
  {
    region: 'USA',
    origin: 'Los Angeles / Chicago',
    airportCode: 'LAX / ORD',
    recommendedAirline: 'Korean Air Cargo (KE via ICN), Cathay Cargo (CX via HKG), EVA Air (BR via TPE)',
    availableAirlines: 'Singapore Airlines Cargo (SQ), Qatar Airways Cargo, Atlas Air',
    leadTime: '3 - 4 Hari',
    flightType: 'Trans-Pacific Priority Cargo',
    justification: 'Jalur udara trans-Pasifik tercepat untuk suku cadang perakitan vital dan barang elektronik presisi.'
  }
];

export const InteractiveMap: React.FC = () => {
  const [activeTransportMode, setActiveTransportMode] = useState<'sea' | 'air'>('sea');
  const [selectedRegion, setSelectedRegion] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = ['Semua', 'EAST ASIA', 'SEA & INDIA', 'EUROPE', 'USA'];

  const filteredOceanRoutes = useMemo(() => {
    return OCEAN_ROUTES.filter(r => {
      const matchRegion = selectedRegion === 'Semua' || r.region === selectedRegion;
      const matchSearch = r.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.preferredCarrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.nonPreferredCarrier.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchSearch;
    });
  }, [selectedRegion, searchQuery]);

  const filteredAirRoutes = useMemo(() => {
    return AIR_ROUTES.filter(r => {
      const matchRegion = selectedRegion === 'Semua' || r.region === selectedRegion;
      const matchSearch = r.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.recommendedAirline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.availableAirlines.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.airportCode.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchSearch;
    });
  }, [selectedRegion, searchQuery]);

  const handleInquiryRoute = (origin: string, carrier: string, mode: string, leadTime: string) => {
    const text = `Halo Gaek Freight, saya ingin konsultasi jadwal & penawaran rute ${mode}:
- Asal: ${origin}
- Rekomendasi Carrier: ${carrier}
- Estimasi Lead Time: ${leadTime}
- Pelabuhan Tujuan: Jakarta (Tanjung Priok) / Surabaya / Semarang
Mohon info jadwal keberangkatan terdekat dan penawaran tarifnya. Terima kasih.`;

    window.open(`https://wa.me/6285608561745?text=${encodeURIComponent(text)}`, '_blank');
    toast.success(`Membuka WhatsApp untuk Rute ${origin}`, {
      description: `Rekomendasi Carrier: ${carrier}`
    });
  };

  return (
    <section id="network" className="py-24 bg-[#011C20] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Bersih & Modern */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#012E34]/80 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-500/30">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Global Route & Schedule Directory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Panduan Rute & Rekomendasi Carrier Resmi
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Daftar pelayaran kapal laut FCL dan maskapai kargo udara prioritas dunia langsung menuju Jakarta (Tanjung Priok), Semarang (Tanjung Emas), dan Surabaya (Tanjung Perak).
          </p>
        </div>

        {/* Tab Switcher: Laut vs Udara */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-8 border-b border-cyan-900/40 mb-8">
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-900 border border-cyan-900/40 max-w-md w-full">
            <button
              onClick={() => { setActiveTransportMode('sea'); setSelectedRegion('Semua'); }}
              className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-black transition-all ${
                activeTransportMode === 'sea'
                  ? 'bg-[#012E34] text-white shadow-lg shadow-cyan-900/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Ship className="w-4 h-4" />
              <span>Jalur Laut (Preferred Carriers)</span>
            </button>
            <button
              onClick={() => { setActiveTransportMode('air'); setSelectedRegion('Semua'); }}
              className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs font-black transition-all ${
                activeTransportMode === 'air'
                  ? 'bg-cyan-700 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Jalur Udara (Available Airlines)</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTransportMode === 'sea' ? 'Cari pelabuhan, negara, atau carrier...' : 'Cari bandara asal atau maskapai kargo...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cyan-900/40 bg-slate-900 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Region Filter Pills */}
        <div className="flex overflow-x-auto pb-4 gap-2 mb-8 no-scrollbar">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedRegion === reg
                  ? 'bg-white text-slate-950 font-black shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-cyan-900/40 hover:border-cyan-900/40'
              }`}
            >
              {reg === 'Semua' ? 'Seluruh Region Global' : reg}
            </button>
          ))}
        </div>

        {/* --- TABEL 1: JALUR LAUT (OCEAN FREIGHT CARRIER MATRIX) --- */}
        {activeTransportMode === 'sea' && (
          <div className="space-y-6">
            <div className="bg-[#011C20]/90 border border-cyan-900/40 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#011C20]/80 border-b border-cyan-900/40 text-slate-400 uppercase tracking-wider font-extrabold text-[11px]">
                      <th className="py-4 px-6">Region</th>
                      <th className="py-4 px-6">Pelabuhan Asal</th>
                      <th className="py-4 px-6 text-emerald-400">Preferred Carrier (FCL)</th>
                      <th className="py-4 px-6 text-center">Lead Time Jakarta (ELT)</th>
                      <th className="py-4 px-6 text-rose-400">Non-Preferred Carrier</th>
                      <th className="py-4 px-6">Justifikasi & Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredOceanRoutes.map((route, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-400">
                          <span className="px-2.5 py-1 rounded bg-[#011C20] border border-cyan-900/40 text-[10px]">
                            {route.region}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <strong className="text-white text-sm block">{route.origin}</strong>
                          <span className="text-[11px] text-slate-400">Direct Call / Fast Feeder</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-extrabold text-xs">
                            {route.preferredCarrier}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#012E34] border border-cyan-500/30 text-cyan-300 font-black text-xs">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{route.leadTime}</span>
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20 text-rose-300 font-semibold text-xs">
                            {route.nonPreferredCarrier}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            <p className="text-[11px] text-slate-300 leading-relaxed">
                              {route.justification}
                            </p>
                            <button
                              onClick={() => handleInquiryRoute(route.origin, route.preferredCarrier, 'Laut (FCL)', route.leadTime)}
                              className="inline-flex items-center space-x-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                              <span>Konsultasi Slot Kapal</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            
          </div>
        )}

        {/* --- TABEL 2: JALUR UDARA (AIR FREIGHT CARRIER & AIRLINES MATRIX) --- */}
        {activeTransportMode === 'air' && (
          <div className="space-y-6">
            <div className="bg-[#011C20]/90 border border-cyan-900/40 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#011C20]/80 border-b border-cyan-900/40 text-slate-400 uppercase tracking-wider font-extrabold text-[11px]">
                      <th className="py-4 px-6">Region</th>
                      <th className="py-4 px-6">Bandara Asal</th>
                      <th className="py-4 px-6 text-cyan-400">Rekomendasi Maskapai Utama</th>
                      <th className="py-4 px-6 text-center">Lead Time (Air Cargo)</th>
                      <th className="py-4 px-6 text-slate-300">Available Airlines Cadangan</th>
                      <th className="py-4 px-6">Tipe Penerbangan & Justifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredAirRoutes.map((route, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-400">
                          <span className="px-2.5 py-1 rounded bg-[#011C20] border border-cyan-900/40 text-[10px]">
                            {route.region}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <strong className="text-white text-sm block">{route.origin}</strong>
                          <span className="text-[11px] text-cyan-400 font-mono font-bold">({route.airportCode})</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="p-2.5 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-200 font-extrabold text-xs">
                            {route.recommendedAirline}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-black text-xs">
                            <Clock className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{route.leadTime}</span>
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="p-2.5 rounded-xl bg-[#011C20] border border-cyan-900/40 text-slate-300 font-medium text-xs">
                            {route.availableAirlines}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold text-[10px] block w-fit border border-blue-800/60">
                              {route.flightType}
                            </span>
                            <p className="text-[11px] text-slate-300 leading-relaxed">
                              {route.justification}
                            </p>
                            <button
                              onClick={() => handleInquiryRoute(route.origin + ` (${route.airportCode})`, route.recommendedAirline, 'Udara (Air Cargo)', route.leadTime)}
                              className="inline-flex items-center space-x-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                              <span>Booking Air Space / AWB</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Kotak Informasi Layanan Kargo Udara Prioritas */}
            <div className="p-5 bg-[#012E34]/40 border border-cyan-500/40 rounded-2xl flex items-start space-x-3.5 text-xs text-sky-200">
              <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-cyan-300 font-extrabold block text-sm mb-1">
                  Konektivitas Kargo Udara Ekspres Gaek Freight:
                </strong>
                Seluruh maskapai yang tercantum memiliki perjanjian kontrak ruang langsung (direct space contract) dan terhubung dengan sistem clearance cepat bandara internasional Soekarno-Hatta (CGK), Juanda (SUB), dan Ahmad Yani (SRG) untuk kargo berprioritas kritis (*time-sensitive cargo*).
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
