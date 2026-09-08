import React from 'react';
import { ShieldCheck, Globe2, Clock, MessageCircleQuestion, Activity, Radio, ArrowRight } from 'lucide-react';

export const Hero: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-slate-950 overflow-hidden text-white">
      <div className="bg-brand-darkBlue/90 border-b border-slate-800/80 text-[11px] py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-brand-orange font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>GAEKS Vessel Radar Live</span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-slate-300 font-medium">
            <span>Inbound Sea Traffic: <strong className="text-white">142 Vessels Active</strong></span>
            <span>Bunker Fuel (IFO380): <strong className="text-emerald-400">$524/MT</strong></span>
            <span>Port Priok: <strong className="text-emerald-400">Normal Flow</strong></span>
            <span>Port Perak: <strong className="text-emerald-400">Berth Smooth</strong></span>
            <span>Ceisa 4.0: <strong className="text-emerald-400">Online 100%</strong></span>
          </div>
        </div>
      </div>

      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none scale-105 animate-pulse duration-[8000ms]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-brand-darkBlue/90 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-brand-orange animate-spin" />
              <span>International Freight Forwarder & Customs Broker</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Arsitektur Logistik Global untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-orange-500">Ekspor & Impor</span> Indonesia.
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal">
              Solusi kargo kontainer laut (FCL/LCL), kargo udara prioritas, dan legalitas kepabeanan terintegrasi langsung menuju <strong>Jakarta (Tanjung Priok)</strong>, <strong>Semarang (Tanjung Emas)</strong>, dan <strong>Surabaya (Tanjung Perak)</strong>.
            </p>

            <div className="p-5 bg-brand-darkBlue/80 backdrop-blur-md border border-brand-orange/50 rounded-2xl flex items-start space-x-4 shadow-xl">
              <div className="p-2 bg-brand-orange/20 rounded-xl text-brand-orange flex-shrink-0">
                <MessageCircleQuestion className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white font-bold block text-sm mb-0.5">Komoditas Ekspor-Impor Sangat Beragam:</strong>
                Kami menangani mesin industri, bahan baku kimia, tekstil, komoditas curah kering, semen, hingga kargo berpendingin (reefer). <span className="text-brand-orange font-semibold">Jenis komoditas khusus dapat dikonsultasikan terlebih dahulu sebelum pemesanan jadwal kapal.</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('calculator')}
                className="flex items-center space-x-2 bg-gradient-to-r from-brand-orange to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-brand-orange/20 transition-all hover:scale-105"
              >
                <span>Hitung CBM & Port Terdekat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-brand-darkBlue hover:bg-slate-800 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all"
              >
                Jelajahi 7 Layanan Kargo
              </button>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-slate-300">
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

          <div className="lg:col-span-4 space-y-4 hidden lg:block">
            <div className="bg-brand-darkBlue/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
                <span>Rute Maritim Populer</span>
                <span className="text-emerald-400">Direct Sailing</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Shanghai (CNSHA) &rarr; Jakarta</span>
                    <span className="text-slate-400 text-[10px]">Direct 10-14 Hari • 3x/Minggu</span>
                  </div>
                  <span className="text-brand-orange font-bold">FCL/LCL</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Ningbo (CNNGB) &rarr; Semarang</span>
                    <span className="text-slate-400 text-[10px]">Direct 9-12 Hari • 2x/Minggu</span>
                  </div>
                  <span className="text-brand-orange font-bold">FCL/LCL</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Singapore (SGSIN) &rarr; Surabaya</span>
                    <span className="text-slate-400 text-[10px]">Feeder 3-5 Hari • Harian</span>
                  </div>
                  <span className="text-brand-orange font-bold">Daily</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('network')}
                className="w-full py-2.5 text-center text-xs font-bold text-brand-orange hover:text-white transition-colors block"
              >
                Buka Peta Pelayaran Interaktif &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
