import React from 'react';
import { createPortal } from 'react-dom';
import { ArrowDown, ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { ServiceDetail } from '../types/freight';
import { adLanding } from '../data/adLanding';
import { QuoteForm } from './QuoteForm';
import { QuoteService, quoteContext } from '../utils/quoteFlow';
import { PiCatalogTable } from './PiCatalogTable';

const cities = [
  { name: 'Jakarta', note: 'Jika proses terkait area Jakarta, sebutkan pelabuhan atau bandara serta status dokumen.' },
  { name: 'Semarang', note: 'Jika proses terkait area Semarang, jelaskan lokasi kedatangan atau keberangkatan dan komoditas.' },
  { name: 'Surabaya', note: 'Jika proses terkait area Surabaya, sertakan lokasi proses dan kebutuhan PIB atau PEB jika sudah diketahui.' },
] as const;

export const AdLandingPage: React.FC<{
  service: ServiceDetail;
  type: QuoteService;
  onBack: () => void;
  onCalculator: () => void;
}> = ({ service, type, onBack, onCalculator }) => {
  const config = adLanding[type];
  const title = service.landingTitle || config.title;
  const intro = service.landingDescription || config.intro;
  const city = type === 'ppjk' ? quoteContext('ppjk').city : '';
  const scrollToForm = () => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });



  return <>
    <main className="min-h-screen bg-[#f3f4ef] pt-16 text-[#12363a]">
      <section className="relative isolate overflow-hidden bg-[#062b30] text-white" aria-labelledby="ad-title">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img src={service.imageUrl} alt="" onError={(event) => { const image = event.currentTarget; image.onerror = null; image.src = '/uploads/gaeks-hero-cargo-poster.webp'; }} className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#062b30] via-[#062b30]/90 to-[#062b30]/55" />
        </div>
        <div className="page-shell relative py-9 pb-16 sm:py-14 lg:py-20">
          <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-white"><ArrowLeft className="h-4 w-4" />Semua layanan</button>
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,.55fr)] lg:gap-16">
            <div>
              <p className="inline-flex border-l-2 border-cyan-300 pl-3 text-xs font-bold uppercase tracking-[.24em] text-cyan-200">{config.eyebrow}</p>
              <h1 id="ad-title" className="mt-5 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-[-.055em] sm:text-6xl lg:text-7xl">{title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">{intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="button" onClick={scrollToForm} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-6 text-sm font-bold text-[#062b30] transition-colors hover:bg-cyan-200"><MessageCircle className="h-4 w-4" />Minta penawaran via WhatsApp<ArrowRight className="h-4 w-4" /></button>
                <button type="button" onClick={onCalculator} className="inline-flex min-h-12 items-center justify-center gap-2 px-4 text-sm font-semibold text-cyan-100 underline-offset-4 hover:underline">Gunakan kalkulator kargo</button>
              </div>
            </div>
            <aside className="border-t border-white/40 bg-[#0a383d]/80 p-6 backdrop-blur-sm sm:p-7 lg:border-l lg:border-t-0">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-200">Sebelum meminta penawaran</p>
              <p className="mt-4 text-xl font-semibold leading-7">{config.brief}</p>
              <button type="button" onClick={scrollToForm} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-cyan-200 hover:text-white">Siapkan brief <ArrowDown className="h-4 w-4" /></button>
            </aside>
          </div>
        </div>
      </section>

      <section className="page-shell py-14 sm:py-20" aria-labelledby="ad-process-title">
        <div className="grid gap-8 lg:grid-cols-[.45fr_1fr] lg:gap-16">
          <div><p className="section-label">Ruang lingkup pembicaraan</p><h2 id="ad-process-title" className="mt-3 max-w-md text-3xl font-bold leading-tight tracking-[-.04em] sm:text-4xl">Mulai dari hal yang menentukan pilihan layanan.</h2></div>
          <div className="border-t border-slate-300">{config.details.map((item) => <article key={item.number} className="grid gap-2 border-b border-slate-300 py-6 sm:grid-cols-[3rem_1fr] sm:gap-5"><span className="font-mono text-sm font-bold text-cyan-700">{item.number}</span><div><h3 className="text-xl font-bold">{item.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{item.copy}</p></div></article>)}</div>
        </div>
      </section>

      {type === 'undername' && <section className="border-y border-slate-200 bg-[#e7eeeb] py-14 sm:py-20" aria-labelledby="undername-relationship-title"><div className="page-shell"><p className="section-label">Dua keputusan dalam satu impor</p><h2 id="undername-relationship-title" className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-[-.04em] sm:text-4xl">Undername menjawab siapa importirnya. PI menjawab apakah barangnya memerlukan izin.</h2><div className="mt-8 grid gap-4 lg:grid-cols-2"><article className="border-t-2 border-cyan-700 bg-white p-7 sm:p-9"><span className="font-mono text-sm font-bold text-cyan-800">01 / SKEMA IMPORTIR</span><h3 className="mt-4 text-2xl font-bold">Undername impor</h3><p className="mt-3 text-sm leading-7 text-slate-600">Digunakan ketika transaksi memerlukan skema importasi melalui entitas importir yang sesuai. Peran para pihak, dokumen transaksi, dan kelayakan barang perlu ditinjau sebelum pelaksanaan.</p></article><article className="border-t-2 border-cyan-700 bg-white p-7 sm:p-9"><span className="font-mono text-sm font-bold text-cyan-800">02 / KEBUTUHAN IZIN</span><h3 className="mt-4 text-2xl font-bold">Persetujuan Impor (PI)</h3><p className="mt-3 text-sm leading-7 text-slate-600">PI diperlukan untuk barang tertentu bila aturan impor mensyaratkannya. HS code, spesifikasi, penggunaan, dan ketentuan terbaru perlu diperiksa. Undername tidak otomatis menggantikan PI.</p></article></div></div></section>}

      {type === 'ppjk' && <section className="bg-white py-14 sm:py-16" aria-labelledby="city-title"><div className="page-shell"><p className="section-label">Lokasi proses</p><h2 id="city-title" className="mt-3 max-w-2xl text-3xl font-bold tracking-[-.04em]">Jakarta, Semarang, atau Surabaya?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Sebutkan kota terkait. Cakupan operasional dan dokumen yang diperlukan akan diperiksa untuk kasus Anda.</p><div className="mt-7 grid gap-3 md:grid-cols-3">{cities.map((item) => <article key={item.name} className="border-l-2 border-cyan-700 bg-[#f3f4ef] p-6"><h3 className="text-xl font-bold">{item.name}</h3>{city === item.name && <span className="mt-2 inline-block text-xs font-bold text-cyan-800">Dipilih dari URL iklan</span>}<p className="mt-3 text-sm leading-6 text-slate-600">{item.note}</p></article>)}</div></div></section>}

      {type === 'undername' && <PiCatalogTable />}

      <section className="bg-[#e7eeeb] py-14 sm:py-20" aria-labelledby="quote-section-title"><div className="page-shell grid gap-8 lg:grid-cols-[.55fr_1fr] lg:items-start lg:gap-16"><div className="lg:sticky lg:top-24"><p className="section-label">Langkah berikutnya</p><h2 id="quote-section-title" className="mt-3 text-3xl font-bold leading-tight tracking-[-.04em] sm:text-4xl">Bawa detail yang sudah ada. Sisanya bisa dibahas.</h2><ul className="mt-7 space-y-4">{config.checklist.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><Check className="mt-1 h-4 w-4 shrink-0 text-cyan-800" />{item}</li>)}</ul><p className="mt-7 border-t border-slate-300 pt-5 text-sm leading-6 text-slate-600">Formulir menyiapkan pesan WhatsApp. Anda meninjau dan menekan Send sendiri sebelum pesan terkirim.</p></div><QuoteForm defaultService={type} /></div></section>

      <section className="page-shell py-14 pb-28 sm:py-20" aria-labelledby="faq-title"><div className="grid gap-8 lg:grid-cols-[.55fr_1fr] lg:gap-16"><div><p className="section-label">Pertanyaan umum</p><h2 id="faq-title" className="mt-3 text-3xl font-bold tracking-[-.04em]">Jawaban sebelum Anda menghubungi kami.</h2></div><div className="border-t border-slate-300">{config.faqs.map((item) => <details key={item.question} className="group border-b border-slate-300"><summary className="flex min-h-16 items-center justify-between gap-4 py-4 text-left font-bold">{item.question}<span className="text-cyan-800 transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-6 text-sm leading-6 text-slate-600">{item.answer}</p></details>)}</div></div></section>
    </main>
    {createPortal(<div className="fixed inset-x-0 bottom-0 z-40 border-t border-cyan-900 bg-[#062b30] p-3 shadow-lg sm:hidden"><button type="button" onClick={scrollToForm} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 text-sm font-bold text-[#062b30]"><MessageCircle className="h-4 w-4" />Minta penawaran via WhatsApp</button></div>, document.body)}
  </>;
};
