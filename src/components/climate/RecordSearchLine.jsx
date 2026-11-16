import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import RecordVoiceSearch from '@/components/climate/RecordVoiceSearch';

// ── THE THING YOU WRITE ON ──────────────────────────────────────────────────────
// This used to be a boxed field with a fat black SEARCH button beside a fat white SAY IT
// button — three rectangles of equal weight stacked, which is a form to be filled in
// rather than a question to be asked. On a phone it became three bars of furniture, and
// the biggest, blackest thing on the page sat disabled and grey before anyone had typed a
// single letter, so the record's one job looked broken on arrival.
//
// It is one line of writing now. A hairline under the words, the record's reading face at
// reading size, a mic and an arrow at the end of it, and nothing drawn round it — because
// the record does not put a box around what somebody is trying to say. The line goes red
// while you are in it, and that flicker is the only colour: it means "I am listening".
export default function RecordSearchLine({ value, onChange, onSubmit, onVoice, loading, canSearch }) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="flex items-end gap-1 border-b-2 border-record-ink pb-2 transition-colors focus-within:border-record-red">
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="A place, a creature, a source…"
          aria-label="Search the record"
          enterKeyHint="search"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent px-0 py-1 text-[19px] leading-[1.35] text-record-ink placeholder:text-record-muted/80 focus:outline-none lg:text-[22px]"
          style={{ fontFamily: 'var(--font-reading)' }}
        />
        <RecordVoiceSearch variant="mark" onTranscript={onVoice} disabled={loading} />
        <button
          type="submit"
          aria-label="Search the record"
          disabled={loading}
          className={`grid h-11 w-11 flex-shrink-0 place-items-center transition-colors ${
            canSearch ? 'text-record-red active:text-record-ink' : 'text-record-ink/25'
          }`}
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-6 w-6" />}
        </button>
      </div>
      {!canSearch && !loading && (
        <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.14em] text-record-muted">
          Two letters, and the record answers
        </p>
      )}
    </form>
  );
}