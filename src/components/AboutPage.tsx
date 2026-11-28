import React, { useEffect, useId, useState } from 'react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BellRing,
  Calculator,
  Compass,
  FileDown,
  Layers,
  type LucideIcon,
  Workflow,
} from 'lucide-react';
import { GAEKS_UPDATE_EVENT, getStoredCorporate } from '../utils/adminStorage';
import { pagePaths, servicePath } from '../utils/routes';
import { Language } from '../types/freight';

const DIGITAL_ICONS: Record<string, LucideIcon> = {
  visibilitas: Activity,
  optimalisasi: Compass,
  integrasi: Layers,
  otomasi: Workflow,
  pelaporan: BellRing,
  data: Calculator,
};

export const AboutPage: React.FC<{ onNavigate?: (page: string) => void; currentLang?: Language }> = ({
  onNavigate,
  currentLang = 'id',
}) => {
  const [corporate, setCorporate] = useState(getStoredCorporate);
  const { about, brand } = corporate;
  const [activeNodeId, setActiveNodeId] = useState<string>(about.principlesNodes[0]?.id || 'karyawan');
  const [activeDisciplineId, setActiveDisciplineId] = useState<string>(about.operationsDisciplines[0]?.id || 'ocean');
  const [activeDigitalId, setActiveDigitalId] = useState<string>(about.digitalCapabilities[0]?.id || 'visibilitas');
  const headingPrefix = useId();

  useEffect(() => {
    const reload = () => setCorporate(getStoredCorporate());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  const selectedNode = about.principlesNodes.find((n) => n.id === activeNodeId) || about.principlesNodes[0];
  const selectedDiscipline =
    about.operationsDisciplines.find((d) => d.id === activeDisciplineId) || about.operationsDisciplines[0];
  const selectedDigital =
    about.digitalCapabilities.find((c) => c.id === activeDigitalId) || about.digitalCapabilities[0];
  const SelectedDigitalIcon = (selectedDigital && DIGITAL_ICONS[selectedDigital.id]) || Activity;

  const navTo = (page: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <div className="bg-[#F8FAFC] pt-16 text-[#12363a]">
      {/* 01 — Pembuka */}
      <header className="relative isolate overflow-hidden bg-[#012E34] text-white">
        <img
          src={about.heroImageUrl}
          alt={about.heroImageAlt}
          width={1376}
          height={768}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-45"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,rgba(1,46,52,0.95)_0%,rgba(1,46,52,0.82)_52%,rgba(1,46,52,0.45)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(1,46,52,0.92)_0%,rgba(1,46,52,0.82)_65%,rgba(1,46,52,0.92)_100%)]"
          aria-hidden="true"
        />
        <div className="page-shell py-16 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a3edf2]">{about.heroLabel}</p>
            <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.5rem]">
              {about.heroHeadline.map((line, index) => (
                <React.Fragment key={line}>
                  {index > 0 && <br className="hidden sm:inline" />}
                  {index > 0 ? ` ${line}` : line}
                </React.Fragment>
              ))}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#dbeaea] sm:text-lg sm:leading-8">{about.heroLead}</p>
          </div>
        </div>
      </header>

      {/* 02 — Mengenal GAEKS */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20" aria-labelledby={`${headingPrefix}-intro`}>
        <div className="page-shell grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="section-label">{about.introLabel}</p>
            <h2 id={`${headingPrefix}-intro`} className="section-title text-balance">
              {about.introHeadline}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-700">
              {about.introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 border-t border-slate-200 pt-5">
              <p className="text-base font-bold text-[#012E34] notranslate" translate="no">
                {about.entityName}
              </p>
              <p className="mt-1 text-sm text-slate-600">{about.entitySubtitle}</p>
            </div>
          </div>

          <figure className="overflow-hidden rounded-xl border border-slate-200 bg-[#012E34]">
            <img
              src={about.introImageUrl}
              alt={about.introImageAlt}
              width={1200}
              height={896}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      {/* 03 — Visi dan Misi */}
      <section className="border-b border-slate-200 bg-[#F8FAFC] py-16 sm:py-20" aria-labelledby={`${headingPrefix}-vision`}>
        <div className="page-shell">
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-10 border-b border-slate-300 pb-12 lg:grid-cols-[minmax(0,.34fr)_minmax(0,.66fr)] lg:gap-12">
            <div>
              <p className="section-label">{about.visionLabel}</p>
              <h2 id={`${headingPrefix}-vision`} className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] text-[#012E34] sm:text-3xl">
                Visi Kami
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">{about.philosophyText}</p>
              <div className="mt-6">
                <a
                  href={about.identityPdfUrl}
                  download="GAEKS-Freight-Vision-Mission-and-Brand-Identity-Final.pdf"
                  className="button-primary"
                >
                  <FileDown className="h-4 w-4" aria-hidden="true" />
                  <span>{about.identityPdfLabel}</span>
                </a>
              </div>
            </div>

            <blockquote className="m-0 border-l-4 border-[#012E34] pl-6 font-display text-xl font-semibold leading-relaxed tracking-[-0.02em] text-[#012E34] sm:pl-8 sm:text-2xl lg:text-[1.7rem] lg:leading-[1.45]">
              {about.visionText}
            </blockquote>
          </div>

          <div className="mt-12 grid min-w-0 grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,.34fr)_minmax(0,.66fr)] lg:gap-12">
            <div>
              <p className="section-label">{about.missionLabel}</p>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] text-[#012E34]">Misi Kami</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{about.missionIntro}</p>
            </div>

            <ol className="divide-y divide-slate-200 border-y border-slate-200 bg-white px-5 sm:px-7">
              {about.missions.map((mission) => (
                <li
                  key={mission.number}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[3.5rem_minmax(0,.42fr)_minmax(0,.58fr)] sm:items-baseline"
                >
                  <span className="font-mono text-sm font-bold text-[#0a5861] tabular-nums notranslate" translate="no">
                    {mission.number}
                  </span>
                  <h4 className="font-display text-base font-bold text-[#012E34] sm:text-lg">{mission.title}</h4>
                  <p className="col-start-2 text-sm leading-6 text-slate-600 sm:col-start-3">{mission.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 04 — Prinsip GAEKS (Customer-Centric Interactive Hub Diagram) */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20" aria-labelledby={`${headingPrefix}-principles`}>
        <div className="page-shell grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)]">
          <div>
            <p className="section-label">{about.principlesLabel}</p>
            <h2 id={`${headingPrefix}-principles`} className="section-title text-balance">
              {about.principlesHeadline}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{about.principlesIntro}</p>

            {selectedNode && (
              <div className="mt-7 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5" aria-live="polite">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0a5861]">
                  {selectedNode.label} · {selectedNode.role}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#12363a]">{selectedNode.detail}</p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:p-6 xl:p-8">
            {/* Desktop / Tablet: True Radial Hub-and-Spoke Diagram */}
            <div className="relative mx-auto hidden h-[360px] w-full max-w-[600px] sm:block lg:h-[380px]">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {about.principlesNodes.slice(0, 5).map((node, index) => {
                  const coords = [
                    { x: 50, y: 13 },
                    { x: 86, y: 36 },
                    { x: 78, y: 84 },
                    { x: 22, y: 84 },
                    { x: 14, y: 36 },
                  ][index];
                  const active = node.id === selectedNode?.id;
                  return (
                    <line
                      key={node.id}
                      x1="50"
                      y1="52"
                      x2={coords.x}
                      y2={coords.y}
                      stroke={active ? '#0a5861' : '#9eb9bc'}
                      strokeWidth={active ? 2.2 : 1.5}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              <div className="absolute left-1/2 top-[52%] z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#012E34] px-3 text-center text-white shadow-sm xl:h-40 xl:w-40">
                <span className="font-display text-base font-bold leading-tight xl:text-lg">{about.principlesCenterLabel}</span>
                <span className="mt-1 text-[11px] font-semibold text-[#a3edf2] xl:text-xs">{about.principlesCenterRole}</span>
              </div>

              {about.principlesNodes.slice(0, 5).map((node, index) => {
                const coords = [
                  { left: '50%', top: '13%' },
                  { left: '86%', top: '36%' },
                  { left: '78%', top: '84%' },
                  { left: '22%', top: '84%' },
                  { left: '14%', top: '36%' },
                ][index];
                const active = node.id === selectedNode?.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveNodeId(node.id)}
                    onFocus={() => setActiveNodeId(node.id)}
                    aria-pressed={active}
                    style={{ left: coords.left, top: coords.top }}
                    className={`absolute z-20 min-h-11 min-w-[114px] -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 text-center transition-colors xl:min-w-[144px] xl:px-4 xl:py-2.5 ${
                      active
                        ? 'border-[#012E34] bg-[#012E34] text-white shadow-sm'
                        : 'border-[#d4e3e0] bg-[#e9f2f0] text-[#012E34] hover:border-[#0a5861] hover:bg-[#dcebe8]'
                    }`}
                  >
                    <span className="block text-sm font-bold">{node.label}</span>
                    <span className={`mt-0.5 block text-xs ${active ? 'text-[#a3edf2]' : 'text-[#285358]'}`}>
                      {node.role}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile: Accessible Compact Hierarchy */}
            <div className="sm:hidden">
              <div className="mb-4 rounded-xl bg-[#012E34] px-5 py-4 text-center text-white">
                <p className="text-base font-bold">{about.principlesCenterLabel}</p>
                <p className="text-xs font-semibold text-[#a3edf2]">{about.principlesCenterRole}</p>
              </div>

              <div className="grid gap-2.5">
                {about.principlesNodes.map((node) => {
                  const active = node.id === selectedNode?.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNodeId(node.id)}
                      onFocus={() => setActiveNodeId(node.id)}
                      aria-pressed={active}
                      className={`min-h-11 rounded-lg border px-3.5 py-2.5 text-left transition-colors ${
                        active
                          ? 'border-[#012E34] bg-[#012E34] text-white'
                          : 'border-[#d4e3e0] bg-[#e9f2f0] text-[#012E34] hover:border-[#0a5861] hover:bg-[#dcebe8]'
                      }`}
                    >
                      <span className="block text-sm font-bold">{node.label}</span>
                      <span className={`mt-0.5 block text-xs ${active ? 'text-[#a3edf2]' : 'text-[#285358]'}`}>
                        {node.role}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Karyawan dan Budaya Kerja */}
      <section className="border-b border-slate-200 bg-[#F8FAFC] py-16 sm:py-20" aria-labelledby={`${headingPrefix}-culture`}>
        <div className="page-shell grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white lg:order-first">
            <img
              src={about.cultureImageUrl}
              alt={about.cultureImageAlt}
              width={1200}
              height={896}
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>

          <div>
            <p className="section-label">{about.cultureLabel}</p>
            <h2 id={`${headingPrefix}-culture`} className="section-title text-balance">
              {about.cultureHeadline}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-700">{about.cultureBody}</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-y border-slate-200 py-4 text-sm font-semibold text-[#012E34]">
              {about.culturePillars.map((pillar) => (
                <li key={pillar}>{pillar}</li>
              ))}
            </ul>
            <div className="mt-7">
              <a
                href={pagePaths.careers}
                onClick={(event) => navTo('careers', event)}
                className="button-secondary"
              >
                <span>{about.cultureCtaLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — Keunggulan Operasional */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20" aria-labelledby={`${headingPrefix}-ops`}>
        <div className="page-shell grid min-w-0 grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <p className="section-label">{about.operationsLabel}</p>
            <h2 id={`${headingPrefix}-ops`} className="section-title text-balance">
              {about.operationsHeadline}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{about.operationsBody}</p>

            {selectedDiscipline && (
              <div className="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-[#012E34] text-white">
                <img
                  src={selectedDiscipline.imageUrl}
                  alt={selectedDiscipline.imageAlt}
                  width={1200}
                  height={800}
                  decoding="async"
                  className="aspect-[3/2] w-full object-cover"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                  <p className="text-sm font-bold text-white">{selectedDiscipline.title}</p>
                  <a
                    href={servicePath(selectedDiscipline.serviceId)}
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-[#a3edf2] hover:text-white hover:underline"
                  >
                    <span>Selengkapnya</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {about.operationsDisciplines.map((item) => {
              const active = item.id === selectedDiscipline?.id;
              return (
                <div key={item.id} className="py-4">
                  <button
                    type="button"
                    onClick={() => setActiveDisciplineId(item.id)}
                    aria-pressed={active}
                    className={`flex min-h-11 w-full items-start justify-between gap-4 rounded-lg px-3 py-2 text-left transition-colors ${
                      active ? 'bg-[#eef6f6]' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="block font-display text-base font-bold text-[#012E34]">{item.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">{item.summary}</span>
                    </div>
                    <ArrowRight
                      className={`mt-1 h-4 w-4 shrink-0 ${active ? 'text-[#012E34]' : 'text-slate-400'}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 07 — Keunggulan Digital */}
      <section className="border-b border-slate-200 bg-[#F8FAFC] py-16 sm:py-20" aria-labelledby={`${headingPrefix}-digital`}>
        <div className="page-shell">
          <div className="max-w-3xl">
            <p className="section-label">{about.digitalLabel}</p>
            <h2 id={`${headingPrefix}-digital`} className="section-title text-balance">
              {about.digitalHeadline}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{about.digitalBody}</p>
          </div>

          <div className="mt-10 grid min-w-0 grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] lg:gap-12">
            {/* Left: Clean Interactive Capability List (minimal symbols, zero numbering/badge clutter) */}
            <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
              {about.digitalCapabilities.map((cap) => {
                const active = cap.id === selectedDigital?.id;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => setActiveDigitalId(cap.id)}
                    onFocus={() => setActiveDigitalId(cap.id)}
                    aria-pressed={active}
                    className={`flex min-h-11 w-full items-center justify-between gap-4 border-l-4 px-4 py-4 text-left transition-colors sm:px-5 ${
                      active
                        ? 'border-l-[#012E34] bg-[#eef6f6]'
                        : 'border-l-transparent bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <span className="block font-display text-base font-bold text-[#012E34]">{cap.title}</span>
                      <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">{cap.detail}</p>
                    </div>
                    <ArrowRight
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        active ? 'translate-x-0.5 text-[#012E34]' : 'text-slate-300'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>

            {/* Right: Calm Visual Depiction Console */}
            <div className="overflow-hidden rounded-2xl border border-[#0f454c] bg-[#012E34] text-white shadow-sm lg:sticky lg:top-24">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 bg-[#011d21] px-5 py-3.5 sm:px-6">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#a3edf2]">
                  Arsitektur Kerja Digital
                </span>
                <span className="text-xs font-medium text-[#cbe1e2]">Manusia · Sistem · Pelaporan</span>
              </div>

              {/* Connected Three-Pillar Visual Pipeline */}
              <div className="border-b border-white/10 bg-[#02252a] px-5 py-4 sm:px-6">
                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9ec4c7]">
                  Alur Terintegrasi
                </p>
                <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 text-center sm:gap-2">
                  <div className="rounded-lg border border-white/15 bg-white/5 px-2 py-2.5">
                    <span className="block text-xs font-semibold text-white">Tim Operasional</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#a3edf2]" aria-hidden="true" />
                  <div className="rounded-lg border border-[#a3edf2]/45 bg-[#08444c] px-2 py-2.5">
                    <span className="block text-xs font-semibold text-white">Sistem Terpadu</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#a3edf2]" aria-hidden="true" />
                  <div className="rounded-lg border border-white/15 bg-white/5 px-2 py-2.5">
                    <span className="block text-xs font-semibold text-white">Visibilitas Pelanggan</span>
                  </div>
                </div>
              </div>

              {/* Selected Capability Visual Blueprint */}
              {selectedDigital && (
                <div className="p-5 sm:p-7" aria-live="polite">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#a3edf2]/30 bg-[#08444c] text-[#a3edf2]">
                      <SelectedDigitalIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9ec4c7]">
                        Gambaran Mekanisme
                      </p>
                      <h3 className="font-display text-xl font-bold text-white">{selectedDigital.title}</h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[#d6e9ea]">{selectedDigital.detail}</p>

                  {/* 3-Step Visual Flow Illustration */}
                  {selectedDigital.flowStages && selectedDigital.flowStages.length > 0 && (
                    <div className="mt-6 rounded-xl border border-white/15 bg-[#011d21] p-4 sm:p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#a3edf2]">
                        Skema Alur Kerja
                      </p>
                      <ol className="mt-3.5 grid gap-2.5 sm:grid-cols-3">
                        {selectedDigital.flowStages.map((stage) => (
                          <li
                            key={stage}
                            className="flex items-center rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-3"
                          >
                            <p className="text-xs font-semibold leading-5 text-white">{stage}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Contextual Action: Only rendered for capabilities mapped to a customer-facing tool */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5">
                    {selectedDigital.route && pagePaths[selectedDigital.route] ? (
                      <>
                        <p className="text-xs text-[#b7d6d8]">
                          Tersedia untuk digunakan langsung oleh pelanggan GAEKS.
                        </p>
                        <a
                          href={pagePaths[selectedDigital.route]}
                          onClick={(event) => navTo(selectedDigital.route!, event)}
                          className="btn-press inline-flex min-h-11 items-center gap-2 rounded-md bg-[#a3edf2] px-4 py-2.5 text-sm font-bold text-[#012E34] transition-colors hover:bg-white"
                        >
                          <span>{selectedDigital.ctaLabel || 'Buka Alat Bantu'}</span>
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </>
                    ) : (
                      <p className="text-xs leading-5 text-[#b7d6d8]">
                        Berjalan secara internal pada koordinasi operasional GAEKS tanpa perlu akses terpisah.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 08 — Nilai Inti Perusahaan */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20" aria-labelledby={`${headingPrefix}-values`}>
        <div className="page-shell">
          <div className="max-w-2xl">
            <p className="section-label">{about.valuesLabel}</p>
            <h2 id={`${headingPrefix}-values`} className="section-title">
              {about.valuesHeadline}
            </h2>
          </div>

          <ol className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {about.values.map((val) => (
              <li
                key={val.number}
                className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 py-5 sm:grid-cols-[3.5rem_minmax(0,.42fr)_minmax(0,.58fr)] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-sm font-bold text-[#0a5861] tabular-nums notranslate" translate="no">
                  {val.number}
                </span>
                <div>
                  <span className="block font-display text-base font-bold text-[#012E34] sm:text-lg">{val.title}</span>
                  <span className="mt-0.5 block text-xs font-medium text-slate-500 notranslate" translate="no">
                    {val.englishTitle}
                  </span>
                </div>
                <p className="col-start-2 text-sm leading-6 text-slate-700 sm:col-start-3 sm:text-base">{val.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 09 — Komitmen Kami */}
      <section className="bg-[#012E34] py-16 text-white sm:py-20" aria-labelledby={`${headingPrefix}-commitment`}>
        <div className="page-shell grid min-w-0 grid-cols-[minmax(0,1fr)] items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a3edf2]">{about.commitmentLabel}</p>
            <h2 id={`${headingPrefix}-commitment`} className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-5xl">
              {about.commitmentLines.map((line, index) => (
                <React.Fragment key={line}>
                  {index > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#cfe3e4]">{about.commitmentBody}</p>
            <p className="mt-6 text-sm font-semibold text-[#a3edf2] notranslate" translate="no">
              {(currentLang === 'en' ? brand.officialTaglineEn : brand.officialTaglineId).join(' ')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={`${pagePaths.contact}#quote-form`}
              onClick={(event) => navTo('contact', event)}
              className="btn-press inline-flex min-h-12 items-center gap-2 rounded-md bg-[#a3edf2] px-6 py-3 text-sm font-bold text-[#012E34] transition-colors hover:bg-white"
            >
              <span>{about.commitmentCtaLabel}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
