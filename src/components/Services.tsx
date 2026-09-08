// filepath: /src/components/Services.tsx
import React from 'react';
import { Ship, Plane, FileCheck2, Truck, Check, ChevronRight } from 'lucide-react';
import { ServiceDetail } from '../types/freight';

const services: ServiceDetail[] = [
  {
    id: 'ocean',
    title: 'Ocean Freight (FCL & LCL)',
    badge: 'International Sea',
    description: 'Penyediaan kontainer 20ft, 40ft, 40ft HC (FCL) serta konsolidasi kargo skala kecil (LCL) dengan kontrak langsung ke shipping lines internasional terkemuka.',
    highlights: ['Port-to-Port & Door-to-Door Service', 'Reefer, Open Top, & Flat Rack Specialized', 'Alokasi Space & Kontainer Dijamin']
  },
  {
    id: 'air',
    title: 'Air Freight Cargo',
    badge: 'Priority Speed',
    description: 'Pengiriman udara berkecepatan tinggi untuk kargo bernilai tinggi, suku cadang mesin, sampel komersial, dan barang darurat dengan jadwal penerbangan harian.',
    highlights: ['IATA Licensed Handling', 'Direct Flight & Consolidation Options', 'Real-time Milestone Monitoring']
  },
  {
    id: 'ppjk',
    title: 'Customs Clearance PPJK',
    badge: 'Compliance & Legal',
    description: 'Pengurusan legalitas dokumen kepabeanan ekspor/impor melalui sistem INSW dan Ceisa Bea Cukai. Melayani penanganan jalur hijau, kuning, hingga jalur merah.',
    highlights: ['Penetapan Klasifikasi HS Code Akurat', 'Perizinan Impor (PI), Lartas & Kuota', 'Penyelesaian PIB, PEB, & Dokumen COO']
  },
  {
    id: 'trucking',
    title: 'Inland Multi-Moda Trucking',
    badge: 'Domestic Network',
    description: 'Dukungan armada truk trailer pengangkut kontainer dan armada box tertutup dari pelabuhan utama Tanjung Priok, Tanjung Perak, Belawan ke lokasi gudang Anda.',
    highlights: ['Armada Trailer 20/40ft & Wingbox', 'GPS Tracking & Driver Standby 24/7', 'Asuransi Muatan Komprehensif']
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange block mb-2">
            Portofolio Layanan Terpadu
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
            Infrastruktur Logistik Tanpa Batas untuk Kelancaran Usaha Anda
          </h2>
          <p className="mt-4 text-slate-600 text-base">
            Setiap rute ditangani oleh tim operasional yang berpengalaman dalam mitigasi risiko demurrage, perizinan pelabuhan, dan optimasi biaya angkut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item) => (
            <div 
              key={item.id}
              className="p-8 sm:p-10 rounded-3xl border border-brand-border bg-brand-surface hover:bg-white hover:shadow-xl hover:border-brand-orange/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="inline-block px-3 py-1 rounded-md bg-brand-navy text-white text-[11px] font-bold uppercase tracking-wider mb-4">
                  {item.badge}
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{item.description}</p>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <ul className="space-y-2.5 mb-6">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-center space-x-2.5 text-xs font-semibold text-slate-700">
                      <Check className="w-4 h-4 text-brand-orange flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href="#calculator" 
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-orange hover:text-brand-orangeHover uppercase tracking-wider"
                >
                  <span>Minta Penawaran Layanan Ini</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};