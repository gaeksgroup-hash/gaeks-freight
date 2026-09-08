// filepath: /src/components/Hero.tsx
import React from 'react';
import { ShieldCheck, Globe2, Clock, MessageCircleQuestion, Activity, Radio, ArrowRight, Navigation, Anchor } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const Hero: React.FC<{ onNavigate: (page: string) => void; currentLang: Language }> = ({ onNavigate, currentLang }) => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-slate-900 overflow-hidden text-white">
      
      {/* Live Active Telemetry Ticker */}
      <div className="bg-slate-950 border-b border-slate-800 text-[11px] py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sky-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            <span>{getTranslation(currentLang, UI_TEXT.hero.radarLive)}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-slate-300 font-medium">
            <span>Inbound Sea Traffic: <strong className="text-white">142 Vessels Active</strong></span>
            <span>Bunker Fuel (IFO380): <strong className="text-amber-400">$524/MT</strong></span>
            <span>Port Priok: <strong className="text-emerald-400">Normal Flow</strong></span>
            <span>Port Perak: <strong className="text-emerald-400">Berth Smooth</strong></span>
            <span>Ceisa 4.0: <strong className="text-emerald-400">Online 100%</strong></span>
          </div>
        </div>
      </div>

      {/* Living Dynamic Background with Live Animated Radar Sweep Simulation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full border border-sky-500/30 flex items-center justify-center">
          <div className="w-[350px] h-[350px] rounded-full border border-sky-500/20 flex items-center justify-center">
            <div className="w-[200px] h-[200px] rounded-full border border-sky-500/20" />
          </div>
          {/* Continuous Rotating Radar Beam */}
          <div className="absolute inset-0 rounded-full border-t-2 border-emerald-400 animate-spin duration-[5000ms] pointer-events-none opacity-70" />
          {/* Pulsing Ship Target Blips */}
          <span className="absolute top-20 right-32 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
          <span className="absolute bottom-28 left-20 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
          <span className="absolute top-44 left-36 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-blue-950/80 border border-sky-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Activity className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>{getTranslation(currentLang, UI_TEXT.hero.badge)}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {getTranslation(currentLang, UI_TEXT.hero.titlePrefix)}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-200 to-amber-300">
                {getTranslation(currentLang, UI_TEXT.hero.titleHighlight)}
              </span>{' '}
              {getTranslation(currentLang, UI_TEXT.hero.titleSuffix)}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
              {getTranslation(currentLang, UI_TEXT.hero.subtitle)}
            </p>

            {/* Living Commodity Consultation Banner */}
            <div className="p-5 bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-2xl flex items-start space-x-4 shadow-xl">
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
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span>{getTranslation(currentLang, UI_TEXT.hero.calcBtn)}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all"
              >
                {getTranslation(currentLang, UI_TEXT.hero.servicesBtn)}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800 text-slate-300 text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>PPJK Ceisa 4.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Global Liner Partners</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>SLA Support 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Floating Live Telemetry Card */}
          <div className="lg:col-span-4 space-y-4 hidden lg:block">
            <div className="bg-slate-800/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold uppercase tracking-wider border-b border-slate-700 pb-3">
                <span className="flex items-center space-x-1.5"><Anchor className="w-3.5 h-3.5 text-sky-400" /><span>Maritime Radar Live</span></span>
                <span className="text-emerald-400 font-extrabold">Active</span>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Shanghai (CNSHA) &rarr; Jakarta</span>
                    <span className="text-slate-400 text-[10px]">10-14 Days • Direct 3x/wk</span>
                  </div>
                  <span className="text-sky-400 font-bold">FCL/LCL</span>
                </div>
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Ningbo (CNNGB) &rarr; Semarang</span>
                    <span className="text-slate-400 text-[10px]">9-12 Days • Direct 2x/wk</span>
                  </div>
                  <span className="text-sky-400 font-bold">FCL/LCL</span>
                </div>
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
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
