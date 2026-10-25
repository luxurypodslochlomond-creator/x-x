import React from 'react';
import { Search, X } from 'lucide-react';
import { LANGS } from '@/components/climate/useClimateLanguage';
import TonguePickerList from '@/components/climate/TonguePickerList';
import TonguePickerManual from '@/components/climate/TonguePickerManual';

export default function TonguePickerPanel({ theme, mobile, onClose, searchRef, query, setQuery, listProps, manualProps }) {
  const { panel, divide, dim, field, accent } = theme;
  return (
    <div className={`flex flex-col min-h-0 overflow-hidden border-2 ${mobile ? 'h-full' : 'absolute right-0 top-full mt-1 z-[60] w-[min(92vw,560px)] max-h-[min(72vh,540px)] shadow-2xl shadow-black/50'} ${panel}`}>
      <div className={`flex-shrink-0 flex items-center justify-between gap-2 px-3 py-2 border-b-2 ${divide}`}>
        <span className="text-[9px] font-black font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>Every tongue on Earth</span>
        <span className={`text-[9px] font-mono ${dim}`}><span>{LANGS.length + 1}</span>{' '}<span>on the list</span></span>
        {mobile && (
          <button type="button" autoFocus onClick={onClose} aria-label="Close language picker"
            className="flex-shrink-0 flex items-center justify-center min-h-[44px] min-w-[44px] border border-current/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-signal">
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className={`flex-shrink-0 p-2 border-b ${divide}`}>
        <div className="relative">
          <Search aria-hidden="true" className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${dim}`} />
          <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a language" aria-label="Search a language" autoComplete="off" autoCapitalize="none" spellCheck={false}
            className={`w-full border pl-8 pr-2 py-2 min-h-[38px] text-[16px] sm:text-[12px] font-mono outline-none ${field}`} />
        </div>
      </div>
      <TonguePickerList theme={theme} query={query} {...listProps} />
      <TonguePickerManual theme={theme} {...manualProps} />
    </div>
  );
}