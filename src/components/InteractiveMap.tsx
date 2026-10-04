import React, { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Plane, Search, Ship } from 'lucide-react';
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


  const rows = activeTransportMode === 'sea' ? filteredOceanRoutes : filteredAirRoutes;

  return (
    <section id="network" aria-labelledby="network-title" className="section-block bg-[#0b3438] text-white">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <header>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Rute dan jadwal</p>
            <h2 id="network-title" className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Cari koridor pengiriman tanpa membuka tabel yang padat.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">Saring berdasarkan moda, wilayah, atau titik asal. Buka satu rute untuk melihat carrier dan perkiraan waktu.</p>
          </header>

          <div>
            <div className="grid gap-3 border-b border-white/15 pb-6 sm:grid-cols-[auto_1fr_auto]">
              <div className="grid grid-cols-2">
                <button type="button" onClick={() => { setActiveTransportMode('sea'); setSelectedRegion('Semua'); }} className={activeTransportMode === 'sea' ? 'min-h-11 bg-cyan-300 px-5 text-sm font-bold text-[#082f34]' : 'min-h-11 border border-white/25 px-5 text-sm font-bold'}>Laut</button>
                <button type="button" onClick={() => { setActiveTransportMode('air'); setSelectedRegion('Semua'); }} className={activeTransportMode === 'air' ? 'min-h-11 bg-cyan-300 px-5 text-sm font-bold text-[#082f34]' : 'min-h-11 border border-white/25 px-5 text-sm font-bold'}>Udara</button>
              </div>
              <label className="relative">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                <span className="sr-only">Cari rute</span>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari kota, pelabuhan, kode, atau carrier" className="min-h-11 w-full border border-white/25 bg-white/5 pl-10 pr-3 text-base text-white placeholder:text-slate-400 focus:outline-none" />
              </label>
              <select aria-label="Wilayah" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="min-h-11 border border-white/25 bg-[#0b3438] px-3 text-sm text-white">
                {regions.map((region) => <option key={region}>{region}</option>)}
              </select>
            </div>

            <p className="py-4 text-sm text-slate-400">{rows.length} rute ditemukan</p>
            <div className="border-b border-white/15">
              {activeTransportMode === 'sea' ? filteredOceanRoutes.map((route) => (
                <details key={route.region + route.origin} className="group border-t border-white/15">
                  <summary className="flex min-h-[76px] items-center gap-4 py-4">
                    <Ship className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                    <span className="min-w-0 flex-1"><strong className="block text-sm font-bold">{route.origin}</strong><span className="mt-1 block text-xs text-slate-400">{route.region} · estimasi {route.leadTime}</span></span>
                    <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pb-6 pl-8">
                    <dl className="grid gap-3 text-sm sm:grid-cols-2">
                      <div><dt className="text-slate-400">Carrier rujukan</dt><dd className="mt-1 font-semibold">{route.preferredCarrier}</dd></div>
                      <div><dt className="text-slate-400">Alternatif</dt><dd className="mt-1">{route.nonPreferredCarrier}</dd></div>
                    </dl>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{route.justification}</p>
                    <button type="button" onClick={() => handleInquiryRoute(route.origin, route.preferredCarrier, 'Laut (FCL)', route.leadTime)} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-cyan-300 underline-offset-4 hover:underline">Tanyakan rute ini<ArrowRight className="h-4 w-4" /></button>
                  </div>
                </details>
              )) : filteredAirRoutes.map((route) => (
                <details key={route.region + route.airportCode} className="group border-t border-white/15">
                  <summary className="flex min-h-[76px] items-center gap-4 py-4">
                    <Plane className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                    <span className="min-w-0 flex-1"><strong className="block text-sm font-bold">{route.origin} ({route.airportCode})</strong><span className="mt-1 block text-xs text-slate-400">{route.region} · estimasi {route.leadTime}</span></span>
                    <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pb-6 pl-8">
                    <dl className="grid gap-3 text-sm sm:grid-cols-2">
                      <div><dt className="text-slate-400">Maskapai rujukan</dt><dd className="mt-1 font-semibold">{route.recommendedAirline}</dd></div>
                      <div><dt className="text-slate-400">Pilihan lain</dt><dd className="mt-1">{route.availableAirlines}</dd></div>
                    </dl>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">{route.justification}</p>
                    <button type="button" onClick={() => handleInquiryRoute(route.origin + ' (' + route.airportCode + ')', route.recommendedAirline, 'Udara', route.leadTime)} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-cyan-300 underline-offset-4 hover:underline">Tanyakan rute ini<ArrowRight className="h-4 w-4" /></button>
                  </div>
                </details>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-400">Carrier dan waktu tempuh bersifat rujukan. Jadwal serta ketersediaan ruang perlu dikonfirmasi saat pemesanan.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
