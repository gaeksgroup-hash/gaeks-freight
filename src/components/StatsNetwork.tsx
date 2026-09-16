import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Anchor, Compass, Award, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { sectionReveal, viewportOnce } from '../utils/motionVariants';

export const StatsNetwork: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.section id="coverage" data-motion-section aria-labelledby="coverage-title" variants={sectionReveal} initial={shouldReduceMotion ? 'visible' : 'hidden'} animate={shouldReduceMotion ? 'visible' : undefined} whileInView={shouldReduceMotion ? undefined : 'visible'} transition={shouldReduceMotion ? { duration: 0 } : undefined} viewport={viewportOnce} className="py-24 bg-white border-y border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-12 lg:gap-20 items-end mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Coverage &amp; capability</span>
            <h2 id="coverage-title" className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mt-3">Rantai logistik yang bisa dilihat, bukan sekadar dijanjikan.</h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">Kami menghubungkan dokumen, carrier, pelabuhan, dan delivery dalam satu alur kerja yang lebih mudah dipantau oleh tim procurement maupun operasional.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-slate-200 divide-x divide-slate-200">
          <div className="p-5 sm:p-7">
            <Anchor className="w-5 h-5 text-cyan-700 mb-5" />
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#012E34]">150+</div>
            <div className="text-xs font-semibold text-slate-500 mt-2">Koneksi pelabuhan dunia</div>
          </div>
          <div className="p-5 sm:p-7">
            <Compass className="w-5 h-5 text-cyan-700 mb-5" />
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#012E34]">99.2%</div>
            <div className="text-xs font-semibold text-slate-500 mt-2">Ketepatan jadwal target</div>
          </div>
          <div className="p-5 sm:p-7">
            <Award className="w-5 h-5 text-cyan-700 mb-5" />
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#012E34]">24/7</div>
            <div className="text-xs font-semibold text-slate-500 mt-2">Tracking &amp; support desk</div>
          </div>
          <div className="p-5 sm:p-7">
            <ShieldCheck className="w-5 h-5 text-cyan-700 mb-5" />
            <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#012E34]">100%</div>
            <div className="text-xs font-semibold text-slate-500 mt-2">Fokus compliance &amp; dokumen</div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl bg-[#012E34] p-6 sm:p-8 text-white">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold">Punya komoditas atau lane yang spesifik?</h3>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">Diskusikan kebutuhan general cargo, reefer, mesin berat, bahan baku industri, atau project cargo dengan tim kami.</p>
          </div>
          <a href="https://wa.me/6285608561745?text=Halo%20GAEKS%20GROUP,%20saya%20ingin%20berdiskusi%20tentang%20proyek%20pengiriman%20kargo." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 shrink-0 bg-cyan-400 hover:bg-cyan-300 text-[#011417] px-5 py-3.5 rounded-xl font-bold text-sm transition-colors">
            Hubungi spesialis <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.section>
  );
};
