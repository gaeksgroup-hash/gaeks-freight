import React, { useId, useMemo, useState } from 'react';
import { Check, MapPin, Search } from 'lucide-react';

export interface LocationOption {
  id: string;
  value: string;
  label: string;
  meta: string;
  searchText: string;
}

interface LocationAutocompleteProps {
  label: string;
  hint: string;
  placeholder: string;
  options: readonly LocationOption[];
  value: string;
  onChange: (value: string) => void;
}

const normalize = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  label,
  hint,
  placeholder,
  options,
  value,
  onChange
}) => {
  const inputId = useId();
  const listboxId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const query = normalize(value);

  const suggestions = useMemo(() => {
    if (!query) return [];
    return options
      .map((option) => {
        const haystack = normalize(option.searchText);
        const label = normalize(option.label);
        const codeOrNameStarts = haystack.split(' ').some((part) => part.startsWith(query));
        const rank = label.startsWith(query) ? 0 : codeOrNameStarts ? 1 : haystack.includes(query) ? 2 : 3;
        return { option, rank };
      })
      .filter(({ rank }) => rank < 3)
      .sort((a, b) => a.rank - b.rank || a.option.label.localeCompare(b.option.label, 'id'))
      .slice(0, 9)
      .map(({ option }) => option);
  }, [options, query]);

  const hasExactSelection = options.some((option) => option.value === value);
  const showPanel = open && query.length > 0;

  const selectOption = (option: LocationOption) => {
    onChange(option.value);
    setOpen(false);
    setActiveIndex(0);
  };

  return (
    <div className="relative block text-sm font-semibold text-slate-700">
      <label htmlFor={inputId} className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <span className="text-[11px] font-medium text-slate-400">{hint}</span>
      </label>
      <span className="relative mt-2 block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          id={inputId}
          className={`field w-full pl-10 pr-10 ${query && !hasExactSelection && suggestions.length === 0 ? 'border-rose-400 focus:border-rose-500' : ''}`}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showPanel}
          aria-controls={listboxId}
          aria-activedescendant={showPanel && suggestions[activeIndex] ? `${listboxId}-${suggestions[activeIndex].id}` : undefined}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' && suggestions.length) {
              event.preventDefault();
              setOpen(true);
              setActiveIndex((index) => (index + 1) % suggestions.length);
            } else if (event.key === 'ArrowUp' && suggestions.length) {
              event.preventDefault();
              setOpen(true);
              setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length);
            } else if (event.key === 'Enter' && showPanel && suggestions[activeIndex]) {
              event.preventDefault();
              selectOption(suggestions[activeIndex]);
            } else if (event.key === 'Escape') {
              setOpen(false);
            }
          }}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        />
        {hasExactSelection
          ? <Check className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" aria-hidden="true" />
          : <MapPin className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" aria-hidden="true" />}
      </span>

      {showPanel && (
        <span id={listboxId} role="listbox" className="absolute inset-x-0 top-[calc(100%+.5rem)] z-40 block max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_18px_45px_rgba(8,47,52,0.16)]">
          {suggestions.length > 0 ? suggestions.map((option, index) => (
            <button
              id={`${listboxId}-${option.id}`}
              key={option.id}
              type="button"
              role="option"
              aria-selected={value === option.value}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`flex min-h-14 w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${index === activeIndex ? 'bg-cyan-50' : 'hover:bg-slate-50'}`}
            >
              <MapPin className={`h-4 w-4 shrink-0 ${index === activeIndex ? 'text-cyan-700' : 'text-slate-400'}`} aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <strong className="block truncate text-sm text-[#12363a]">{option.label}</strong>
                <span className="mt-0.5 block truncate text-xs font-normal text-slate-500">{option.meta}</span>
              </span>
              {value === option.value && <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />}
            </button>
          )) : (
            <span className="flex min-h-16 items-center gap-3 rounded-lg bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
              Lokasi tidak ditemukan
            </span>
          )}
        </span>
      )}
    </div>
  );
};
