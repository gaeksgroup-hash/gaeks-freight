// filepath: /src/components/Hero.tsx
import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Globe2, Clock, MessageCircleQuestion, Activity, Radio, ArrowRight, Anchor } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const Hero: React.FC<{ onNavigate: (page: string) => void; currentLang: Language }> = ({ onNavigate, currentLang }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-slate-950 overflow-hidden text-white">
      
      {/* Live Active Telemetry Ticker */}
      <div className="bg-slate-950/90 border-b border-slate-800 text-[11px] py-2 overflow-hidden relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sky-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            <span>{getTranslation(currentLang, UI_TEXT.hero.radarLive)}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-slate-300 font-medium">
            <span>{getTranslation(currentLang, UI_TEXT.hero.tickerVessels)}</span>
            <span>{getTranslation(currentLang, UI_TEXT.hero.tickerBunker)}</span>
            <span>{getTranslation(currentLang, UI_TEXT.hero.tickerPriok)}</span>
            <span>{getTranslation(currentLang, UI_TEXT.hero.tickerPerak)}</span>
            <span>{getTranslation(currentLang, UI_TEXT.hero.tickerCeisa)}</span>
          </div>
        </div>
      </div>

      {/* --- REAL CARGO MARITIME BACKGROUND VIDEO --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-125 opacity-70"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-cargo-ship-in-the-ocean-43896-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-900/60" />
      </div>

      {/* Rotating Radar Overlay */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full border border-sky-500/20 pointer-events-none opacity-40 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full border border-sky-500/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-emerald-400 animate-spin duration-[6000ms]" />
        <span className="absolute top-16 right-20 w-2.5 h-2.5 bg-sky-400 rounded-full animate-ping" />
        <span className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-blue-950/80 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-sm">
              <Activity className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>{getTranslation(currentLang, UI_TEXT.hero.badge)}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-lg">
              {getTranslation(currentLang, UI_TEXT.hero.titlePrefix)}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-amber-300">
                {getTranslation(currentLang, UI_TEXT.hero.titleHighlight)}
              </span>{' '}
              {getTranslation(currentLang, UI_TEXT.hero.titleSuffix)}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow">
              {getTranslation(currentLang, UI_TEXT.hero.subtitle)}
            </p>

            {/* Living Commodity Consultation Banner */}
            <div className="p-5 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-2xl flex items-start space-x-4 shadow-xl">
              <div className="p-2 bg-blue-500/20 rounded-xl text-sky-400 flex-shrink-0">
                <MessageCircleQuestion className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-white font-bold block text-sm mb-0.5">
                  {getTranslation(currentLang, UI_TEXT.hero.commodityTitle)}
                </strong>
                {getTranslation(currentLang, UI_TEXT.hero.commodityDesc)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('calculator')}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-blue-600/40 active:scale-[0.98] transition-all"
              >
                <span>{getTranslation(currentLang, UI_TEXT.hero.calcBtn)}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-sm active:scale-[0.98] transition-all"
              >
                {getTranslation(currentLang, UI_TEXT.hero.servicesBtn)}
              </button>
            </div>

            {/* --- SINGLE RINGKAS & BERSIH TRUST BAR DENGAN LOGO ASLI WCA & JCTRANS --- */}
            <div className="pt-8 border-t border-slate-800/80">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-slate-300 text-xs font-semibold items-center">
                
                {/* 1. PPJK Ceisa 4.0 */}
                <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/5 border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>PPJK Ceisa 4.0</span>
                </div>

                {/* 2. Global Liners */}
                <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/5 border border-slate-800">
                  <Globe2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>Global Liners</span>
                </div>

                {/* 3. 24/7 SLA Support */}
                <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/5 border border-slate-800">
                  <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>24/7 SLA Support</span>
                </div>

                {/* 4. Logo Asli WCA World */}
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/5 border border-slate-800 hover:border-amber-400/60 transition-colors">
                  <img 
                    src="https://conferences.wcaworld.com/WCAworld2026/img/info/logo.png" 
                    alt="WCA World Member" 
                    className="h-5 sm:h-6 object-contain"
                  />
                  <span className="text-[11px] text-amber-300 font-bold">WCA Member</span>
                </div>

                {/* 5. Logo Asli JCtrans Network */}
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/5 border border-slate-800 hover:border-sky-400/60 transition-colors">
                  <img 
                    src="https://resources.jctrans.com/res/era-h5/h5/img/logo.png" 
                    alt="JCtrans Logistics Network" 
                    className="h-5 sm:h-6 object-contain"
                  />
                  <span className="text-[11px] text-sky-300 font-bold">JCtrans GCP</span>
                </div>

              </div>
            </div>

          </div>

          {/* Right Floating Live Telemetry Card */}
          <div className="lg:col-span-4 space-y-4 hidden lg:block">
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700 pb-3">
                <span className="flex items-center space-x-1.5"><Anchor className="w-3.5 h-3.5 text-sky-400" /><span>Maritime Radar Live</span></span>
                <span className="text-emerald-400 font-extrabold">Active</span>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Shanghai (CNSHA) &rarr; Jakarta</span>
                    <span className="text-slate-400 text-[10px]">10-14 Days • Direct 3x/wk</span>
                  </div>
                  <span className="text-sky-400 font-bold">FCL/LCL</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Ningbo (CNNGB) &rarr; Semarang</span>
                    <span className="text-slate-400 text-[10px]">9-12 Days • Direct 2x/wk</span>
                  </div>
                  <span className="text-sky-400 font-bold">FCL/LCL</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Singapore (SGSIN) &rarr; Surabaya</span>
                    <span className="text-slate-400 text-[10px]">3-5 Days • Daily Feeder</span>
                  </div>
                  <span className="text-emerald-400 font-bold">Daily</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('network')}
                className="w-full py-2.5 text-center text-xs font-bold text-sky-400 hover:text-white transition-colors block"
              >
                Buka Route & Schedule &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
