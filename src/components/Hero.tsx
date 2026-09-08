// filepath: /src/components/Hero.tsx
import React from 'react';
import { ShieldCheck, Globe2, Clock } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-brand-navy overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF5722_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-darkBlue border border-brand-steel/40 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span>International Logistics & Brokerage</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Solusi Freight Forwarding Andal untuk Skala <span className="text-brand-orange">Ekspor & Impor</span> Global.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
            Menghubungkan rantai pasok bisnis Anda dengan kepastian jadwal kargo laut (FCL/LCL), kargo udara prioritas, serta pengurusan perizinan kepabeanan (PPJK) resmi tanpa hambatan.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a 
              href="#calculator"
              className="bg-brand-orange hover:bg-brand-orangeHover text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-brand-orange/25 transition-all hover:-translate-y-0.5"
            >
              Hitung Estimasi Kargo
            </a>
            <a 
              href="https://wa.me/6281234567890?text=Halo%20GAEKS%20Freight,%20saya%20membutuhkan%20informasi%20jadwal%20dan%20rate%20pengiriman." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-darkBlue hover:bg-brand-steel border border-brand-steel/50 text-white px-8 py-4 rounded-xl font-bold text-base transition-all"
            >
              Konsultasi WhatsApp
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-brand-darkBlue grid grid-cols-3 gap-4 text-slate-300">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-orange flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Resmi & PPJK Certified</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Globe2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Global Liner Partner</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Clock className="w-5 h-5 text-brand-orange flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Door-to-Door SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
