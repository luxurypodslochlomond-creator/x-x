import React, { useCallback, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import RecordVoiceSearch from '@/components/climate/RecordVoiceSearch';

// One search control. Mobile composition lives in the page-scoped stylesheet;
// speech feedback stays in the document flow, never over the suggestions.
export default function RecordSearchLine({ value, onChange, onSubmit, onVoice, loading, canSearch }) {
  const [voice, setVoice] = useState({ text: '', loud: false });
  const noteVoice = useCallback((text, loud) => setVoice({ text, loud }), []);

  return (
    <form onSubmit={onSubmit}>
      <div className="record-search-field flex items-center overflow-hidden rounded-[3px] border-2 border-record-ink bg-record-bone transition-colors focus-within:border-record-red">
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="A place, a name, a word…"
          aria-label="Search the record"
          enterKeyHint="search"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-3.5 pl-4 pr-1 text-[17px] leading-[1.35] text-record-ink placeholder:text-record-muted/90 focus:outline-none lg:text-[18px]"
          style={{ fontFamily: 'var(--font-reading)' }}
        />
        <RecordVoiceSearch variant="mark" onTranscript={onVoice} onMessage={noteVoice} disabled={loading} />
        <button
          type="submit"
          aria-label="Search the record"
          disabled={loading}
          className="record-search-submit grid h-[52px] w-[56px] flex-shrink-0 place-items-center bg-record-red text-record-paper transition-colors active:bg-record-ink"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-6 w-6" />}
        </button>
      </div>

      {voice.text ? (
        <p
          className={`record-search-feedback mt-2 text-[10px] font-mono leading-relaxed ${
            voice.loud ? 'text-[#b3261e]' : 'text-[#5a5246]'
          }`}
        >
          {voice.text}
        </p>
      ) : (
        !canSearch &&
        !loading && (
          <p className={`record-search-feedback mt-2 text-[10px] font-mono uppercase tracking-[0.14em] text-record-muted ${value.trim() ? '' : 'hidden lg:block'}`}>
            <span className="lg:hidden">Use at least two letters.</span>
            <span className="hidden lg:inline">Two letters, and the record answers</span>
          </p>
        )
      )}
    </form>
  );
}