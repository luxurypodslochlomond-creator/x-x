import React, { useCallback, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import RecordVoiceSearch from '@/components/climate/RecordVoiceSearch';

// ── THE BOX, IN THE RECORD'S OWN COLOURS ────────────────────────────────────────
// The borderless line was the wrong answer for this record, and it was right to say so:
// a hairline on warm paper reads as a note in the margin, not as the one place a reader
// is asked to do something. So the field is a box again — but a box that belongs here
// rather than a grey web form.
//
// It is a bone plate (#efe7d6) laid on the paper (#f4efe4), both of which are already in
// the record's palette, with two pixels of the record's own ink around it and the corners
// barely turned. The writing inside is the record's reading face at reading size, not a
// form's 14px sans. The end of the box is a solid signal-red plate with the arrow on it:
// the record's action colour, always lit, so the thing to press is never a grey slab
// pretending to be broken. The border turns red while you are writing in it — the only
// movement in the whole element, and it means "I have you".
//
// Whatever the mic has to report is printed UNDER the box, in the flow, pushing the page
// down. Words never sit on top of other words on this record.
export default function RecordSearchLine({ value, onChange, onSubmit, onVoice, loading, canSearch }) {
  const [voice, setVoice] = useState({ text: '', loud: false });
  const noteVoice = useCallback((text, loud) => setVoice({ text, loud }), []);

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center overflow-hidden rounded-[3px] border-2 border-record-ink bg-record-bone transition-colors focus-within:border-record-red">
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="A place, a creature, a source…"
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
          className="grid h-[52px] w-[56px] flex-shrink-0 place-items-center bg-record-red text-record-paper transition-colors active:bg-record-ink"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-6 w-6" />}
        </button>
      </div>

      {voice.text ? (
        <p
          className={`mt-2 text-[10px] font-mono leading-relaxed ${
            voice.loud ? 'text-[#b3261e]' : 'text-[#5a5246]'
          }`}
        >
          {voice.text}
        </p>
      ) : (
        !canSearch &&
        !loading && (
          <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.14em] text-record-muted">
            Two letters, and the record answers
          </p>
        )
      )}
    </form>
  );
}