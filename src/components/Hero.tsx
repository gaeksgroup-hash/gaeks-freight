// filepath: /src/components/Hero.tsx
import React from 'react';
import { ShieldCheck, Globe2, Clock, MessageCircleQuestion } from 'lucide-react';

export const Hero: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 bg-brand-navy overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/85" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-darkBlue border border-brand-steel/40 text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span>International Freight Forwarder & Customs Broker</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Arsitektur Logistik Global untuk Skala <span className="text-brand-orange">Ekspor & Impor</span> Indonesia.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Menghubungkan rantai pasok Anda langsung dari seluruh dunia ke <strong>Jakarta (Tanjung Priok)</strong>, <strong>Semarang (Tanjung Emas)</strong>, dan <strong>Surabaya (Tanjung Perak)</strong> dengan kepastian jadwal kapal, legalitas kepabeanan PPJK, dan armada trucking terintegrasi.
          </p>

          <div className="mt-6 p-4 bg-brand-darkBlue/80 border border-brand-orange/40 rounded-2xl flex items-start space-x-3 text-slate-200">
            <MessageCircleQuestion className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <strong className="text-white">Komoditas Sangat Beragam:</strong> Kami melayani bahan baku manufaktur, mesin industri, semen, tekstil, komoditas curah, hingga kargo bersuhu dingin (reefer). <span className="text-brand-orange font-semibold">Jenis komoditas khusus dapat dikonsultasikan terlebih dahulu sebelum pemesanan jadwal kapal.</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('calculator')}
              className="bg-brand-orange hover:bg-brand-orangeHover text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base shadow-xl shadow-brand-orange/25 transition-all hover:-translate-y-0.5"
            >
              Hitung CBM & Port Terdekat
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="bg-brand-darkBlue hover:bg-brand-steel border border-brand-steel/50 text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base transition-all"
            >
              Jelajahi 7 Layanan Kargo
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-brand-darkBlue grid grid-cols-3 gap-4 text-slate-300">
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-orange flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Legalitas PPJK Resmi</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Globe2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Global Ocean Liner</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Clock className="w-5 h-5 text-brand-orange flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">SLA Pelabuhan 24/7</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
