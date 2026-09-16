import React from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, FileCheck2, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language, ServiceDetail } from '../types/freight';
import { getStoredServices } from '../utils/adminStorage';
import { DETAILED_SERVICES } from './ServicesCarousel';

interface ServiceDetailPageProps {
  slug: string;
  currentLang?: Language;
  onBack: () => void;
  onQuote: (serviceName: string) => void;
}

const slugAliases: Record<string, string> = {
  ppjk: 'ppjk-customs-clearance',
  'gudang-pbm': 'pergudangan-stevedoring',
  'domestic-truck': 'trucking',
  'project-cargo': 'project-cargo-heavy-lift',
  lcl: 'freight-laut-lcl',
  fcl: 'freight-laut-fcl',
  'air-shipment': 'freight-udara'
};

const makeSlug = (service: ServiceDetail) => slugAliases[service.id] || service.id;

const getLocalized = (service: ServiceDetail, language: Language) => ({
  title: language === 'en' ? service.title_en || service.title : language === 'zh' ? service.title_zh || service.title : service.title,
  category: language === 'en' ? service.category_en || service.category : language === 'zh' ? service.category_zh || service.category : service.category,
  tagline: language === 'en' ? service.tagline_en || service.tagline : language === 'zh' ? service.tagline_zh || service.tagline : service.tagline,
  description: language === 'en' ? service.description_en || service.description : language === 'zh' ? service.description_zh || service.description : service.description
});

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, currentLang = 'id', onBack, onQuote }) => {
  const shouldReduceMotion = useReducedMotion();
  const services = getStoredServices();
  const service = services.find((item) => makeSlug(item) === slug) || DETAILED_SERVICES.find((item) => makeSlug(item) === slug) || DETAILED_SERVICES[0];
  const content = getLocalized(service, currentLang);
  const related = services.filter((item) => item.id !== service.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-24">
      <motion.section initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55 }} className="bg-[#011417] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-cyan-300 mb-10"><ArrowLeft className="w-4 h-4" />Kembali ke layanan</button>
          <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-10 lg:gap-16 items-end">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">{content.category}</span>
              <h1 className="font-display text-4xl sm:text-6xl font-extrabold leading-[1.05] mt-4">{content.title}</h1>
              <p className="text-base sm:text-lg font-semibold text-cyan-300 mt-5">{content.tagline}</p>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">{content.description}</p>
          </div>
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-8 lg:gap-12 items-start">
          <div className="bg-white border border-slate-200 p-6 sm:p-9">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><ShieldCheck className="w-5 h-5 text-cyan-700" /><h2 className="font-display text-2xl font-extrabold">Yang kami tangani</h2></div>
            <div className="grid sm:grid-cols-2 gap-5 mt-7">
              {service.features.map((feature) => <div key={feature} className="flex items-start gap-3 text-sm text-slate-700"><CheckCircle2 className="w-5 h-5 text-cyan-700 flex-shrink-0" /><span>{feature}</span></div>)}
            </div>
            <div className="mt-9 pt-6 border-t border-slate-200"><span className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">Komoditas dan kebutuhan</span><p className="text-sm text-slate-600 leading-relaxed mt-2">{service.commodities}</p></div>
          </div>

          <div className="bg-[#012E34] text-white p-6 sm:p-9">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">Operasional</span>
            <h2 className="font-display text-2xl font-extrabold mt-3">Alur kerja yang mudah dipantau</h2>
            <div className="space-y-5 mt-8">
              <div className="flex gap-3"><FileCheck2 className="w-5 h-5 text-cyan-300 flex-shrink-0" /><div><strong className="block text-sm">Dokumen dan klasifikasi</strong><span className="text-xs text-slate-300">Review kebutuhan, HS code, dan kelengkapan sebelum booking.</span></div></div>
              <div className="flex gap-3"><MapPin className="w-5 h-5 text-cyan-300 flex-shrink-0" /><div><strong className="block text-sm">Origin ke gateway</strong><span className="text-xs text-slate-300">Pilih rute, carrier, dan hub yang sesuai dengan cargo.</span></div></div>
              <div className="flex gap-3"><Truck className="w-5 h-5 text-cyan-300 flex-shrink-0" /><div><strong className="block text-sm">Handover dan delivery</strong><span className="text-xs text-slate-300">Milestone, dokumen, dan next action diteruskan ke tim Anda.</span></div></div>
            </div>
            <button type="button" onClick={() => onQuote(content.title)} className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#011417] px-5 py-3 font-bold text-sm mt-9">Minta penawaran <ArrowUpRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-200 pt-10">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Pertanyaan umum</span>
          <div className="grid md:grid-cols-3 gap-4 mt-5">
            {[
              ['Apa yang perlu disiapkan?', 'Invoice, packing list, detail komoditas, origin, tujuan, dan estimasi volume.'],
              ['Bagaimana memilih moda?', 'Kami bandingkan urgensi, volume, risiko, dan total landed cost sebelum merekomendasikan opsi.'],
              ['Bisa menangani kebutuhan khusus?', 'Komoditas khusus dan project cargo kami review lebih dulu bersama tim operasional.']
            ].map(([question, answer]) => <article key={question} className="border border-slate-200 bg-white p-5"><h3 className="font-display text-base font-extrabold">{question}</h3><p className="text-xs text-slate-600 leading-relaxed mt-3">{answer}</p></article>)}
          </div>
        </div>

        <div className="mt-16"><div className="flex items-end justify-between gap-4"><div><span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Layanan terkait</span><h2 className="font-display text-2xl font-extrabold mt-2">Lengkapi alur cargo Anda</h2></div><button type="button" onClick={onBack} className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-[#012E34]">Semua layanan <ArrowRightIcon /></button></div><div className="grid md:grid-cols-3 gap-4 mt-6">{related.map((item) => <button key={item.id} type="button" onClick={() => onQuote(item.title)} className="text-left bg-white border border-slate-200 p-5 hover:border-cyan-400 transition-colors"><span className="text-[10px] uppercase tracking-wider font-black text-cyan-700">{item.category}</span><strong className="block font-display text-lg mt-2">{item.title}</strong><span className="block text-xs text-slate-500 mt-2 line-clamp-2">{item.tagline}</span></button>)}</div></div>
      </section>
    </main>
  );
};

const ArrowRightIcon = () => <ArrowUpRight className="w-4 h-4" />;
