import React from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown } from 'lucide-react';
import { Language, ServiceDetail } from '../types/freight';
import { getStoredServices } from '../utils/adminStorage';
import { DETAILED_SERVICES } from './ServicesCarousel';
import { ServiceTitle } from './ServiceTitle';

interface ServiceDetailPageProps {
  slug: string;
  currentLang?: Language;
  onBack: () => void;
  onQuote: (serviceName: string) => void;
}

const aliases: Record<string, string> = {
  ppjk: 'ppjk-customs-clearance', 'gudang-pbm': 'pergudangan-stevedoring',
  'domestic-truck': 'trucking', 'project-cargo': 'project-cargo-heavy-lift',
  lcl: 'freight-laut-lcl', fcl: 'freight-laut-fcl', 'air-shipment': 'freight-udara'
};
const slugFor = (service: ServiceDetail) => aliases[service.id] || service.id;
const localize = (service: ServiceDetail, language: Language) => ({
  title: language === 'en' ? service.title_en || service.title : language === 'zh' ? service.title_zh || service.title : service.title,
  category: language === 'en' ? service.category_en || service.category : language === 'zh' ? service.category_zh || service.category : service.category,
  tagline: language === 'en' ? service.tagline_en || service.tagline : language === 'zh' ? service.tagline_zh || service.tagline : service.tagline,
  description: language === 'en' ? service.description_en || service.description : language === 'zh' ? service.description_zh || service.description : service.description
});

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, currentLang = 'id', onBack, onQuote }) => {
  const services = getStoredServices();
  const service = services.find((item) => slugFor(item) === slug) || DETAILED_SERVICES.find((item) => slugFor(item) === slug) || DETAILED_SERVICES[0];
  const content = localize(service, currentLang);

  return (
    <main className="min-h-screen bg-[#f4f5f1] pt-16 text-[#12363a]">
      <section className="page-shell py-10 sm:py-14">
        <button type="button" onClick={onBack} className="button-link"><ArrowLeft className="h-4 w-4" />Semua layanan</button>
        <div className="mt-7 grid overflow-hidden border border-slate-200 bg-white lg:grid-cols-2">
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="section-label">{content.category}</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl"><ServiceTitle title={content.title} /></h1>
            <p className="mt-5 text-lg font-semibold text-cyan-800">{content.tagline}</p>
            <p className="mt-5 text-base leading-7 text-slate-600">{content.description}</p>
            <button type="button" onClick={() => onQuote(content.title)} className="button-primary mt-8">Minta estimasi<ArrowRight className="h-4 w-4" /></button>
          </div>
          <img src={service.imageUrl} alt="" className="min-h-[280px] h-full w-full object-cover" />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div className="border-b border-slate-300">
            <details open className="group border-t border-slate-300">
              <summary className="flex min-h-16 items-center justify-between font-bold">Ruang lingkup<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></summary>
              <ul className="grid gap-3 pb-7 sm:grid-cols-2">
                {service.features.map((feature) => <li key={feature} className="flex gap-2 text-sm leading-6 text-slate-600"><Check className="mt-1 h-4 w-4 shrink-0 text-cyan-700" />{feature}</li>)}
              </ul>
            </details>
            <details className="group border-t border-slate-300">
              <summary className="flex min-h-16 items-center justify-between font-bold">Peralatan atau sistem<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></summary>
              <p className="pb-7 text-sm leading-6 text-slate-600">{service.equipment}</p>
            </details>
            <details className="group border-t border-slate-300">
              <summary className="flex min-h-16 items-center justify-between font-bold">Komoditas yang sesuai<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></summary>
              <p className="pb-7 text-sm leading-6 text-slate-600">{service.commodities}</p>
            </details>
          </div>
          <aside className="bg-[#0b3438] p-6 text-white sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Data awal</p>
            <h2 className="mt-3 text-xl font-bold">Siapkan informasi ini.</h2>
            <ol className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
              <li>01 · Invoice dan packing list</li>
              <li>02 · Jenis komoditas serta HS code jika tersedia</li>
              <li>03 · Origin, tujuan, volume, dan target waktu</li>
            </ol>
          </aside>
        </div>
      </section>
    </main>
  );
};
