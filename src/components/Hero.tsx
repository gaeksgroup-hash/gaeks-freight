// filepath: /src/components/Hero.tsx
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, FileCheck2, Globe2, Clock4, AlertCircle, ArrowDownRight, ShieldCheck } from 'lucide-react';
import { Language } from '../types/freight';
import { getStoredHero, GAEKS_UPDATE_EVENT, HeroSettings } from '../utils/adminStorage';

export interface HeroProps {
  onNavigate?: (page: string) => void;
  currentLang?: Language;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [heroData, setHeroData] = useState<HeroSettings>(getStoredHero());

  useEffect(() => {
    const reload = () => {
      setHeroData(getStoredHero());
    };
    reload();
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    window.addEventListener('storage', reload);
    return () => {
      window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
      window.removeEventListener('storage', reload);
    };
  }, []);

  const handleNav = (page: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (onNavigate) onNavigate(page);
  };

  return (
    <section id="home" aria-labelledby="hero-title" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#011417] text-white">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {heroData.bgType === 'video' ? (
          <video 
            key={heroData.videoUrl}
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto"
            className="w-full h-full object-cover scale-105 filter brightness-[0.7] transform-gpu will-change-transform"
            src={heroData.videoUrl}
            poster={heroData.imageUrl}
          />
        ) : (
          <img 
            key={heroData.imageUrl}
            src={heroData.imageUrl} 
            alt="GAEKS Background" 
            className="w-full h-full object-cover scale-105 filter brightness-[0.7]"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,20,23,.98)_0%,rgba(1,46,52,.88)_48%,rgba(1,20,23,.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_42%,rgba(34,211,238,.18),transparent_28%)]" />
      </div>

      <div className="absolute top-16 left-0 right-0 z-20 bg-[#011417]/80 backdrop-blur-md border-b border-white/10 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-bold text-slate-300 overflow-x-auto no-scrollbar space-x-6">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-300 uppercase tracking-[0.18em] font-black">Operational desk / Indonesia</span>
          </div>
          <div className="flex items-center space-x-6 flex-shrink-0 text-slate-300 font-mono">
            <span>Priok: <strong className="text-emerald-400 font-bold">OPEN</strong></span>
            <span>Semarang: <strong className="text-emerald-400 font-bold">OPEN</strong></span>
            <span>Surabaya: <strong className="text-emerald-400 font-bold">OPEN</strong></span>
            <span>Response desk: <strong className="text-cyan-300 font-bold">24/7</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,.9fr)] gap-10 lg:gap-20 items-center">
          <div className="space-y-7 text-center lg:text-left">
            <h1 id="hero-title" className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.02] max-w-4xl">
              {heroData.titlePrefix}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-100 to-white">
                {heroData.titleHighlight}
              </span>
              {heroData.titleSuffix}
            </h1>

            <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl leading-relaxed font-normal mx-auto lg:mx-0">
              {heroData.caption}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href="#calculator"
                onClick={(e) => handleNav('calculator', e)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm bg-cyan-400 hover:bg-cyan-300 text-[#011417] shadow-xl shadow-cyan-950/30 transition-all active:scale-95"
              >
                <span>Hitung Tarif Kargo (CBM / Volumetrik)</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>

              <button
                type="button"
                onClick={() => handleNav('services')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/15 border border-white/25 text-white backdrop-blur-md transition-all active:scale-95"
              >
                <span>Lihat layanan utama</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-5 border-t border-white/15 grid grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0 text-left">
              <div>
                <strong className="block text-2xl font-display font-extrabold text-white">3</strong>
                <span className="text-[11px] leading-tight text-slate-300">gateway pelabuhan utama</span>
              </div>
              <div>
                <strong className="block text-2xl font-display font-extrabold text-white">24/7</strong>
                <span className="text-[11px] leading-tight text-slate-300">support operasional</span>
              </div>
              <div>
                <strong className="block text-2xl font-display font-extrabold text-white">1 desk</strong>
                <span className="text-[11px] leading-tight text-slate-300">dari dokumen ke delivery</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] border border-cyan-300/20 rotate-3" />
            <div className="relative rounded-[1.5rem] border border-white/15 bg-[#011c20]/85 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">Cargo brief</span>
                  <h2 className="font-display text-xl font-extrabold text-white mt-1">Mulai dari kebutuhan Anda</h2>
                </div>
                <ShieldCheck className="w-6 h-6 text-cyan-300" />
              </div>

              <div className="space-y-3 text-left">
                <div className="rounded-xl border border-white/10 bg-white/[.04] p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-300"><FileCheck2 className="w-5 h-5" /></div>
                    <div><strong className="block text-sm text-white">Kepabeanan & dokumen</strong><span className="text-xs text-slate-400">PIB, PEB, HS code, Lartas</span></div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[.04] p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-300"><Globe2 className="w-5 h-5" /></div>
                    <div><strong className="block text-sm text-white">Freight laut & udara</strong><span className="text-xs text-slate-400">LCL, FCL, air cargo, charter</span></div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[.04] p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-300"><Clock4 className="w-5 h-5" /></div>
                    <div><strong className="block text-sm text-white">Project & inland cargo</strong><span className="text-xs text-slate-400">Trucking, warehouse, heavy lift</span></div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-300"><span className="w-2 h-2 rounded-full bg-emerald-400" />Tim respons aktif</div>
                <button type="button" onClick={() => handleNav('calculator')} className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-white">Buat estimasi <ArrowUpRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-3 text-xs text-slate-300">
          <span className="inline-flex items-center gap-2"><FileCheck2 className="w-4 h-4 text-cyan-400" />PPJK & customs support</span>
          <span className="inline-flex items-center gap-2"><Globe2 className="w-4 h-4 text-cyan-400" />Global trade lanes</span>
          <span className="inline-flex items-center gap-2"><Clock4 className="w-4 h-4 text-cyan-400" />Response desk 24/7</span>
          <span className="inline-flex items-center gap-2"><AlertCircle className="w-4 h-4 text-cyan-400" />{heroData.commodityTitle}</span>
        </div>

        {/* Trust marks remain visible without competing with the primary CTA. */}
        <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-[11px] text-slate-400">
          <span>Didukung partner jaringan:</span>
          <span className="font-bold text-slate-300">WCA World</span>
          <span className="text-slate-600">/</span>
          <span className="font-bold text-slate-300">JCtrans GCP</span>
        </div>
      </div>
    </section>
  );
};
