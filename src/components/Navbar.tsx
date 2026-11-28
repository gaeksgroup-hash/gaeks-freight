import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Language } from '../types/freight';
import { DEFAULT_BRANDING, getStoredBranding, GAEKS_UPDATE_EVENT } from '../utils/adminStorage';
import { pagePaths, servicePath } from '../utils/routes';

export interface NavbarProps {
  currentTab?: string;
  activeServiceSlug?: string;
  onNavigate?: (page: string) => void;
  currentLang: Language;
  onSelectLang?: (lang: Language) => void;
  onLanguageChange?: (lang: Language) => void;
}

interface NavSubLink {
  label: string;
  href: string;
  page: string;
  serviceId?: string;
  dividerAbove?: boolean;
}

interface NavGroupItem {
  id: 'services' | 'tools' | 'company';
  label: string;
  activeTabs: string[];
  links: NavSubLink[];
}

const languageOptions: Array<{ value: Language; label: string; flagSrc: string }> = [
  { value: 'id', label: 'Bahasa Indonesia', flagSrc: '/flags/id.svg' },
  { value: 'en', label: 'English', flagSrc: '/flags/gb.svg' },
  { value: 'zh', label: '中文', flagSrc: '/flags/cn.svg' },
];

const NAV_GROUPS: Record<'services' | 'tools' | 'company', NavGroupItem> = {
  services: {
    id: 'services',
    label: 'Layanan',
    activeTabs: ['services', 'service'],
    links: [
      { label: 'Pengiriman Laut (FCL)', href: servicePath('fcl'), page: 'service', serviceId: 'fcl' },
      { label: 'Pengiriman Laut (LCL)', href: servicePath('lcl'), page: 'service', serviceId: 'lcl' },
      { label: 'Pengiriman Udara', href: servicePath('air-shipment'), page: 'service', serviceId: 'air-shipment' },
      { label: 'Pengurusan Kepabeanan (PPJK)', href: servicePath('ppjk'), page: 'service', serviceId: 'ppjk' },
      { label: 'Transportasi Darat', href: servicePath('domestic-truck'), page: 'service', serviceId: 'domestic-truck' },
      { label: 'Perizinan Impor dan Undername', href: servicePath('undername-impor'), page: 'service', serviceId: 'undername-impor' },
      { label: 'Kapal RORO & Breakbulk', href: servicePath('roro-breakbulk'), page: 'service', serviceId: 'roro-breakbulk' },
      { label: 'Project Cargo & Heavy Lift', href: servicePath('project-cargo'), page: 'service', serviceId: 'project-cargo' },
      { label: 'Pergudangan', href: servicePath('gudang-pbm'), page: 'service', serviceId: 'gudang-pbm' },
      { label: 'Lihat Semua Layanan', href: pagePaths.services, page: 'services', dividerAbove: true },
    ],
  },
  tools: {
    id: 'tools',
    label: 'Alat Bantu Pengiriman',
    activeTabs: ['tracking', 'calculator', 'network', 'rates', 'carriers'],
    links: [
      { label: 'Pelacakan Pengiriman', href: pagePaths.tracking, page: 'tracking' },
      { label: 'Kalkulator Kargo', href: pagePaths.calculator, page: 'calculator' },
      { label: 'Rute dan Jadwal', href: pagePaths.network, page: 'network' },
      { label: 'Tarif Pengiriman', href: pagePaths.rates, page: 'rates' },
      { label: 'Maskapai dan Perusahaan Pelayaran', href: pagePaths.carriers, page: 'carriers' },
    ],
  },
  company: {
    id: 'company',
    label: 'Perusahaan',
    activeTabs: ['about', 'careers'],
    links: [
      { label: 'Tentang Kami', href: pagePaths.about, page: 'about' },
      { label: 'Karier', href: pagePaths.careers, page: 'careers' },
    ],
  },
};

const LanguageMenu: React.FC<{ currentLang: Language; onSelect: (language: Language) => void; align?: 'left' | 'right'; light?: boolean }> = ({
  currentLang,
  onSelect,
  align = 'right',
  light = false,
}) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const current = languageOptions.find((option) => option.value === currentLang) || languageOptions[0];
  return (
    <details ref={detailsRef} className="group relative">
      <summary
        aria-label={`Bahasa aktif: ${current.label}`}
        title={current.label}
        className={`flex min-h-11 min-w-14 cursor-pointer list-none items-center justify-center gap-1 rounded-full border px-2 text-xl transition-colors [&::-webkit-details-marker]:hidden ${
          light ? 'border-slate-300 hover:border-cyan-700 hover:bg-slate-50' : 'border-white/20 hover:border-cyan-300 hover:bg-white/5'
        }`}
      >
        <img src={current.flagSrc} alt="" width="24" height="18" className="h-[18px] w-6 rounded-[2px] object-cover shadow-sm" />
        <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div
        className={`absolute top-[calc(100%+.5rem)] z-50 flex gap-1 rounded-xl border border-white/15 bg-[#082f34] p-1.5 shadow-xl ${
          align === 'right' ? 'right-0' : 'left-0'
        }`}
      >
        {languageOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-label={option.label}
            title={option.label}
            aria-current={currentLang === option.value ? 'true' : undefined}
            onClick={() => {
              onSelect(option.value);
              detailsRef.current?.removeAttribute('open');
            }}
            className={`flex h-11 w-12 items-center justify-center rounded-lg transition-colors ${
              currentLang === option.value ? 'bg-cyan-400/20 ring-1 ring-cyan-300/60' : 'hover:bg-white/10'
            }`}
          >
            <img src={option.flagSrc} alt="" width="28" height="21" className="h-[21px] w-7 rounded-[2px] object-cover shadow-sm" />
          </button>
        ))}
      </div>
    </details>
  );
};

export const Navbar: React.FC<NavbarProps> = ({
  currentTab = 'home',
  onNavigate,
  currentLang = 'id',
  onSelectLang,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopGroup, setOpenDesktopGroup] = useState<string | null>(null);
  const [openMobileGroups, setOpenMobileGroups] = useState<Record<string, boolean>>({});
  const [brandData, setBrandData] = useState(getStoredBranding);
  const hoverPreviewRef = useRef<string | null>(null);
  const idPrefix = useId();

  useEffect(() => {
    const reload = () => setBrandData(getStoredBranding());
    window.addEventListener(GAEKS_UPDATE_EVENT, reload);
    return () => window.removeEventListener(GAEKS_UPDATE_EVENT, reload);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileMenuOpen]);

  const handleTriggerLanguage = (lang: Language) => {
    onSelectLang?.(lang);
    onLanguageChange?.(lang);
    setMobileMenuOpen(false);
  };

  const closeAllDesktopPopovers = () => {
    (Object.keys(NAV_GROUPS) as Array<keyof typeof NAV_GROUPS>).forEach((key) => {
      const panel = document.getElementById(`${idPrefix}-panel-${key}`) as (HTMLElement & { hidePopover?: () => void }) | null;
      if (panel?.matches?.(':popover-open') && typeof panel.hidePopover === 'function') {
        try {
          panel.hidePopover();
        } catch {}
      }
    });
    setOpenDesktopGroup(null);
    hoverPreviewRef.current = null;
  };

  const navigateTarget = (page: string, href: string, event: React.MouseEvent<HTMLAnchorElement>, scrollTarget?: string) => {
    closeAllDesktopPopovers();
    setMobileMenuOpen(false);
    if (onNavigate && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      window.history.pushState({}, '', href);
      onNavigate(page);
      if (scrollTarget) {
        window.setTimeout(() => {
          document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    }
  };

  const trackingPage = currentTab === 'tracking';
  const configuredLogo = brandData.navbarLogoUrl || brandData.symbolLogoUrl;
  const useTrackingLogo = trackingPage && configuredLogo === DEFAULT_BRANDING.navbarLogoUrl;

  const linkClass = (active: boolean) =>
    trackingPage
      ? active
        ? 'border-cyan-600 text-[#012e34]'
        : 'border-transparent text-slate-600 hover:text-[#012e34]'
      : active
        ? 'border-cyan-300 text-white'
        : 'border-transparent text-slate-200 hover:text-white';

  const positionFallbackPopover = (panel: HTMLElement, trigger: HTMLElement | null) => {
    if (!trigger) return;
    const supportsAnchor = typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('position-area', 'block-end');
    if (supportsAnchor) return;
    const tRect = trigger.getBoundingClientRect();
    const pRect = panel.getBoundingClientRect();
    const maxLeft = Math.max(12, window.innerWidth - pRect.width - 12);
    const left = Math.max(12, Math.min(tRect.left, maxLeft));
    const top = tRect.bottom + pRect.height + 12 > window.innerHeight ? Math.max(12, tRect.top - pRect.height - 8) : tRect.bottom + 8;
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  };

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    (Object.keys(NAV_GROUPS) as Array<keyof typeof NAV_GROUPS>).forEach((groupId) => {
      const panelId = `${idPrefix}-panel-${groupId}`;
      const btnId = `${idPrefix}-btn-${groupId}`;
      const panel = document.getElementById(panelId);
      if (!panel) return;
      const handleToggle = (event: Event) => {
        const toggleEvent = event as Event & { newState?: string };
        const opened = toggleEvent.newState === 'open';
        setOpenDesktopGroup(opened ? groupId : hoverPreviewRef.current === groupId ? null : (cur) => (cur === groupId ? null : cur));
        if (opened) {
          positionFallbackPopover(panel, document.getElementById(btnId));
        } else {
          hoverPreviewRef.current = null;
        }
      };
      panel.addEventListener('toggle', handleToggle);
      cleanups.push(() => panel.removeEventListener('toggle', handleToggle));
    });
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [idPrefix]);

  const renderDesktopGroup = (group: NavGroupItem) => {
    const panelId = `${idPrefix}-panel-${group.id}`;
    const btnId = `${idPrefix}-btn-${group.id}`;
    const isActive = group.activeTabs.includes(currentTab);
    const isOpen = openDesktopGroup === group.id;

    return (
      <li
        key={group.id}
        className="nav-dd-item relative list-none"
        onPointerEnter={(event) => {
          if (event.pointerType === 'touch' || !window.matchMedia('(hover: hover)').matches) return;
          const panel = document.getElementById(panelId) as (HTMLElement & { showPopover?: (opts?: { source?: HTMLElement }) => void }) | null;
          const trigger = document.getElementById(btnId);
          if (panel && trigger && typeof panel.showPopover === 'function' && !panel.matches(':popover-open')) {
            hoverPreviewRef.current = group.id;
            try {
              panel.showPopover({ source: trigger });
            } catch {}
          }
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'touch' || hoverPreviewRef.current !== group.id) return;
          const panel = document.getElementById(panelId) as (HTMLElement & { hidePopover?: () => void }) | null;
          if (panel?.matches?.(':popover-open') && typeof panel.hidePopover === 'function') {
            try {
              panel.hidePopover();
            } catch {}
          }
          hoverPreviewRef.current = null;
        }}
        onBlur={(event: React.FocusEvent<HTMLLIElement>) => {
          const next = event.relatedTarget as Node | null;
          if (next && event.currentTarget.contains(next)) return;
          const panel = document.getElementById(panelId) as (HTMLElement & { hidePopover?: () => void }) | null;
          if (panel?.matches?.(':popover-open') && typeof panel.hidePopover === 'function') {
            try {
              panel.hidePopover();
            } catch {}
          }
        }}
      >
        <button
          id={btnId}
          type="button"
          {...({ popoverTarget: panelId } as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          aria-controls={panelId}
          aria-expanded={isOpen}
          onClick={(event) => {
            if (hoverPreviewRef.current === group.id) {
              hoverPreviewRef.current = null;
              event.preventDefault();
            }
          }}
          className={`inline-flex min-h-11 items-center gap-1 whitespace-nowrap border-b-2 px-2.5 text-[13px] font-semibold transition-colors ${linkClass(
            isActive || isOpen
          )}`}
        >
          <span>{group.label}</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>

        <ul
          id={panelId}
          ref={(el) => {
            if (el) el.setAttribute('popover', 'auto');
          }}
          className="nav-dd-panel"
        >
          {group.links.map((item) => (
            <li key={`${item.href}-${item.label}`} className={item.dividerAbove ? 'nav-dd-divider' : undefined}>
              <a
                href={item.href}
                onClick={(event) => navigateTarget(item.page, item.href, event)}
                aria-current={item.page === currentTab && !item.serviceId ? 'page' : undefined}
                className="nav-dd-link"
              >
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  const renderMobileGroup = (group: NavGroupItem) => {
    const isExpanded = Boolean(openMobileGroups[group.id]);
    const panelId = `${idPrefix}-mobile-${group.id}`;
    return (
      <div key={group.id} className="border-b border-white/10">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={panelId}
          onClick={() => setOpenMobileGroups((prev) => ({ ...prev, [group.id]: !prev[group.id] }))}
          className="flex min-h-12 w-full items-center justify-between px-4 text-left text-base font-semibold text-white hover:bg-white/5"
        >
          <span>{group.label}</span>
          <ChevronDown className={`h-4 w-4 text-cyan-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        <div id={panelId} hidden={!isExpanded} className="bg-[#02252a] pb-2">
          {group.links.map((item) => (
            <a
              key={`${item.href}-${item.label}`}
              href={item.href}
              onClick={(event) => navigateTarget(item.page, item.href, event)}
              className={`flex min-h-11 items-center pl-8 pr-4 text-sm text-slate-200 hover:bg-white/5 hover:text-white ${
                item.dividerAbove ? 'mt-1 border-t border-white/10 pt-1 font-semibold text-cyan-200' : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 block h-16 border-b ${
        trackingPage ? 'border-slate-200 bg-white text-[#012e34]' : 'border-white/10 bg-[#011c20] text-white'
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-2 px-3 min-[360px]:gap-4 min-[360px]:px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          onClick={(event) => navigateTarget('home', '/', event)}
          className="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="GAEKS Freight, ke beranda"
        >
          <img
            src={useTrackingLogo ? '/logos/gaeks-tracking-official.webp' : configuredLogo}
            onError={(event) => {
              const target = event.currentTarget;
              target.onerror = null;
              target.src = '/logos/gaek-symbol.svg';
            }}
            alt="GAEKS"
            width={useTrackingLogo ? 640 : undefined}
            height={useTrackingLogo ? 180 : undefined}
            className={`h-9 w-auto object-contain ${
              trackingPage ? 'max-w-[128px] sm:max-w-[148px]' : 'max-w-[112px] brightness-0 invert sm:max-w-[148px]'
            }`}
          />
        </a>

        <nav aria-label="Navigasi utama" className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex">
          <ul className="flex items-center gap-0.5">
            <li className="list-none">
              <a
                href={pagePaths.home}
                onClick={(event) => navigateTarget('home', pagePaths.home, event)}
                aria-current={currentTab === 'home' ? 'page' : undefined}
                className={`inline-flex min-h-11 items-center whitespace-nowrap border-b-2 px-2.5 text-[13px] font-semibold transition-colors ${linkClass(
                  currentTab === 'home'
                )}`}
              >
                Beranda
              </a>
            </li>
            {renderDesktopGroup(NAV_GROUPS.services)}
            {renderDesktopGroup(NAV_GROUPS.tools)}
            <li className="list-none">
              <a
                href={pagePaths.news}
                onClick={(event) => navigateTarget('news', pagePaths.news, event)}
                aria-current={currentTab === 'news' ? 'page' : undefined}
                className={`inline-flex min-h-11 items-center whitespace-nowrap border-b-2 px-2.5 text-[13px] font-semibold transition-colors ${linkClass(
                  currentTab === 'news'
                )}`}
              >
                Wawasan dan Berita
              </a>
            </li>
            {renderDesktopGroup(NAV_GROUPS.company)}
            <li className="list-none">
              <a
                href={pagePaths.contact}
                onClick={(event) => navigateTarget('contact', pagePaths.contact, event)}
                aria-current={currentTab === 'contact' ? 'page' : undefined}
                className={`inline-flex min-h-11 items-center whitespace-nowrap border-b-2 px-2.5 text-[13px] font-semibold transition-colors ${linkClass(
                  currentTab === 'contact'
                )}`}
              >
                Hubungi Kami
              </a>
            </li>
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <LanguageMenu currentLang={currentLang} onSelect={handleTriggerLanguage} light={trackingPage} />
          <a
            href={`${pagePaths.contact}#quote-form`}
            onClick={(event) => navigateTarget('contact', `${pagePaths.contact}#quote-form`, event, 'quote-form')}
            className="btn-press inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-cyan-400 px-4 text-sm font-bold text-[#011417] transition-colors hover:bg-cyan-300"
          >
            <span>Minta Penawaran</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          className={`inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full border px-3 text-sm font-semibold xl:hidden ${
            trackingPage ? 'border-slate-300' : 'border-white/20'
          }`}
        >
          <span>Menu</span>
          {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#011c20] pb-6 text-white shadow-lg xl:hidden"
        >
          <nav aria-label="Navigasi seluler" className="mx-auto max-w-7xl">
            <div className="py-2">
              <a
                href={pagePaths.home}
                onClick={(event) => navigateTarget('home', pagePaths.home, event)}
                aria-current={currentTab === 'home' ? 'page' : undefined}
                className={`flex min-h-12 items-center border-b border-white/10 px-4 text-base font-semibold ${
                  currentTab === 'home' ? 'bg-white/10 text-cyan-200' : 'text-white hover:bg-white/5'
                }`}
              >
                Beranda
              </a>
              {renderMobileGroup(NAV_GROUPS.services)}
              {renderMobileGroup(NAV_GROUPS.tools)}
              <a
                href={pagePaths.news}
                onClick={(event) => navigateTarget('news', pagePaths.news, event)}
                aria-current={currentTab === 'news' ? 'page' : undefined}
                className={`flex min-h-12 items-center border-b border-white/10 px-4 text-base font-semibold ${
                  currentTab === 'news' ? 'bg-white/10 text-cyan-200' : 'text-white hover:bg-white/5'
                }`}
              >
                Wawasan dan Berita
              </a>
              {renderMobileGroup(NAV_GROUPS.company)}
              <a
                href={pagePaths.contact}
                onClick={(event) => navigateTarget('contact', pagePaths.contact, event)}
                aria-current={currentTab === 'contact' ? 'page' : undefined}
                className={`flex min-h-12 items-center border-b border-white/10 px-4 text-base font-semibold ${
                  currentTab === 'contact' ? 'bg-white/10 text-cyan-200' : 'text-white hover:bg-white/5'
                }`}
              >
                Hubungi Kami
              </a>
            </div>
            <div className="flex flex-col gap-3 px-4 pt-4 sm:flex-row sm:items-center">
              <span className="sr-only">Pilih bahasa</span>
              <LanguageMenu currentLang={currentLang} onSelect={handleTriggerLanguage} align="left" />
              <a
                href={`${pagePaths.contact}#quote-form`}
                onClick={(event) => navigateTarget('contact', `${pagePaths.contact}#quote-form`, event, 'quote-form')}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-cyan-400 px-4 text-sm font-bold text-[#011417] sm:ml-auto sm:w-auto"
              >
                <span>Minta Penawaran</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
