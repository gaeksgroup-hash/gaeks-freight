import React from 'react';
import { ShieldCheck, Globe2, Clock, MessageCircleQuestion, Activity, Radio, ArrowRight } from 'lucide-react';
import { Language } from '../types/freight';
import { UI_TEXT, getTranslation } from '../utils/translations';

export const Hero: React.FC<{ onNavigate: (page: string) => void; currentLang: Language }> = ({ onNavigate, currentLang }) => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-brand-obsidian overflow-hidden text-white">
      
      {/* Live Animated Telemetry Ticker */}
      <div className="bg-brand-surface/90 border-b border-brand-border text-[11px] py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-brand-cyan font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Radio className="w-3.5 h-3.5 text-brand-cyan" />
            <span>{getTranslation(currentLang, UI_TEXT.hero.radarLive)}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-slate-400 font-medium">
            <span>Inbound Sea Traffic: <strong className="text-white">142 Vessels Active</strong></span>
            <span>Bunker Fuel (IFO380): <strong className="text-emerald-400">$524/MT</strong></span>
            <span>Port Priok: <strong className="text-emerald-400">Normal Flow</strong></span>
            <span>Port Perak: <strong className="text-emerald-400">Berth Smooth</strong></span>
            <span>Ceisa 4.0: <strong className="text-emerald-400">Online 100%</strong></span>
          </div>
        </div>
      </div>

      {/* Living Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none scale-105 animate-pulse-slow"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-obsidian via-brand-obsidian/95 to-brand-obsidian/85" />

      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-emerald/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-brand-surface border border-brand-cyan/30 text-brand-cyan text-xs font-extrabold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-brand-emerald animate-spin" />
              <span>{getTranslation(currentLang, UI_TEXT.hero.badge)}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08]">
              {getTranslation(currentLang, UI_TEXT.hero.titlePrefix)}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-emerald-400 to-teal-200">
                {getTranslation(currentLang, UI_TEXT.hero.titleHighlight)}
              </span>{' '}
              {getTranslation(currentLang, UI_TEXT.hero.titleSuffix)}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {getTranslation(currentLang, UI_TEXT.hero.subtitle)}
            </p>

            {/* Living Commodity Banner */}
            <div className="p-5 bg-brand-surface/90 backdrop-blur-md border border-brand-border rounded-2xl flex items-start space-x-4 shadow-xl">
              <div className="p-2 bg-brand-cyan/10 rounded-xl text-brand-cyan flex-shrink-0">
                <MessageCircleQuestion className="w-6 h-6" />
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
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
                className="flex items-center space-x-2 bg-gradient-to-r from-brand-cyan to-brand-emerald hover:from-cyan-400 hover:to-emerald-400 text-slate-950 px-8 py-4 rounded-xl font-black text-sm shadow-xl shadow-cyan-500/20 transition-all hover:scale-105"
              >
                <span>{getTranslation(currentLang, UI_TEXT.hero.calcBtn)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-brand-surface hover:bg-slate-800 border border-brand-border text-white px-8 py-4 rounded-xl font-bold text-sm transition-all"
              >
                {getTranslation(currentLang, UI_TEXT.hero.servicesBtn)}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-brand-border text-slate-400 text-xs font-semibold">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-emerald flex-shrink-0" />
                <span>PPJK Ceisa 4.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <span>Global Ocean Liners</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                <span>SLA Support 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Floating Status Card */}
          <div className="lg:col-span-4 space-y-4 hidden lg:block">
            <div className="bg-brand-surface/90 backdrop-blur-xl p-6 rounded-3xl border border-brand-border shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-brand-border pb-3">
                <span>Top Maritime Corridors</span>
                <span className="text-brand-emerald">Direct Call</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-brand-card rounded-xl border border-brand-border flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Shanghai (CNSHA) &rarr; Jakarta</span>
                    <span className="text-slate-400 text-[10px]">10-14 Days • Direct 3x/wk</span>
                  </div>
                  <span className="text-brand-cyan font-bold">FCL/LCL</span>
                </div>
                <div className="p-3 bg-brand-card rounded-xl border border-brand-border flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Ningbo (CNNGB) &rarr; Semarang</span>
                    <span className="text-slate-400 text-[10px]">9-12 Days • Direct 2x/wk</span>
                  </div>
                  <span className="text-brand-cyan font-bold">FCL/LCL</span>
                </div>
                <div className="p-3 bg-brand-card rounded-xl border border-brand-border flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">Singapore (SGSIN) &rarr; Surabaya</span>
                    <span className="text-slate-400 text-[10px]">3-5 Days • Daily Feeder</span>
                  </div>
                  <span className="text-brand-emerald font-bold">Daily</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('network')}
                className="w-full py-2.5 text-center text-xs font-extrabold text-brand-cyan hover:text-white transition-colors block"
              >
                View Route & Schedule &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
