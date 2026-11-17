import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Loader2, X } from 'lucide-react';
import RecordVoiceSearch from '@/components/climate/RecordVoiceSearch';
import RecordTongueDoor from '@/components/climate/RecordTongueDoor';

// ── THE LINE, AND THE KEYBOARD ──────────────────────────────────────────────
// The field owns the words while they are being written; the address only changes
// when a search is actually made. On a phone the keyboard covers half the glass,
// so the line is taken to the middle of what is left the moment it opens and
// kept there while the reader writes — it never ends up under a thumb or a key.
export default function RecordSearchLine({ value, onSearch, loading }) {
  const [draft, setDraft] = useState(value);
  const [voice, setVoice] = useState({ text: '', loud: false });
  const [writing, setWriting] = useState(false);
  const box = useRef(null);
  const input = useRef(null);
  const composing = useRef(false);

  useEffect(() => { setDraft(value); }, [value]);

  const noteVoice = useCallback((text, loud) => setVoice({ text, loud }), []);

  const onVoice = useCallback((text, final) => {
    setDraft(text);
    if (final && text.trim().length >= 2) { input.current?.blur(); onSearch(text); }
  }, [onSearch]);

  // What is left of the glass once the keyboard is up.
  useEffect(() => {
    if (!writing) return undefined;
    const reveal = () => {
      const el = box.current;
      if (!el) return;
      const view = window.visualViewport;
      const top = view?.offsetTop ?? 0;
      const bottom = top + (view?.height ?? window.innerHeight);
      const r = el.getBoundingClientRect();
      if (r.top < top + 12 || r.bottom > bottom - 12) {
        el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    };
    const timer = setTimeout(reveal, 300);
    window.visualViewport?.addEventListener('resize', reveal);
    window.visualViewport?.addEventListener('scroll', reveal);
    return () => {
      clearTimeout(timer);
      window.visualViewport?.removeEventListener('resize', reveal);
      window.visualViewport?.removeEventListener('scroll', reveal);
    };
  }, [writing]);

  const submit = (event) => {
    event.preventDefault();
    if (composing.current || loading || draft.trim().length < 2) return;
    input.current?.blur();
    onSearch(draft);
  };

  const clear = () => { setDraft(''); input.current?.focus(); };

  // ── THE SIGNAL BAND ───────────────────────────────────────────────────────────────
  // Brian, 17 November: "our search needs to be coolasfuck … in every tongue and properly
  // connected … maybe need the red and yellow." So the box is no longer a bone field lying
  // on the paper: it sits in the record's own yellow band, on white, with the mark's red on
  // the one control that does the work — the same three colours the masthead and the foot
  // are built from, used the way the record uses them.
  return (
    <form
      role="search"
      onSubmit={submit}
      className="border-y-2 border-record-ink bg-cartoon-sun px-2.5 pb-2 pt-2.5"
    >
      <div
        ref={box}
        className="flex items-center overflow-hidden rounded-[3px] border-2 border-record-ink bg-record-paper shadow-[0_2px_0_0_rgba(20,18,16,0.16)] focus-within:border-record-red"
        style={{ scrollMarginBlock: '96px' }}
      >
        <input
          ref={input}
          type="text"
          inputMode="search"
          name="q"
          role="searchbox"
          dir="auto"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onFocus={() => setWriting(true)}
          onBlur={() => setWriting(false)}
          onCompositionStart={() => { composing.current = true; }}
          onCompositionEnd={() => { composing.current = false; }}
          placeholder="A place, a name, a word…"
          aria-label="Search the record"
          enterKeyHint="search"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          className="block h-[52px] w-0 min-w-0 flex-1 appearance-none select-text rounded-none bg-transparent px-3 font-body text-base leading-normal text-record-ink caret-record-ink placeholder:text-record-muted focus:outline-none"
        />
        {draft && (
          <button type="button" onClick={clear} aria-label="Clear search text" className="grid h-11 w-11 shrink-0 place-items-center text-record-muted">
            <X className="h-4 w-4" />
          </button>
        )}
        <RecordVoiceSearch variant="mark" onTranscript={onVoice} onMessage={noteVoice} disabled={loading} />
        <button
          type="submit"
          aria-label="Search the record"
          disabled={loading || draft.trim().length < 2}
          className="grid h-[52px] w-[56px] shrink-0 place-items-center bg-record-red text-record-paper transition-colors active:bg-record-ink disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-6 w-6" />}
        </button>
      </div>

      {/* ── EVERY TONGUE, A HAND'S WIDTH FROM THE BOX ─────────────────────────────
          The tongue sits in the band itself, so the list that changes the record's voice is
          the same control a reader can reach without leaving the search — and the search
          sends that tongue with the question, not the phone's. */}
      <div className="mt-1.5 flex items-center justify-between gap-3 pl-0.5">
        <span className="font-mono text-[9px] uppercase leading-tight tracking-[0.14em] text-record-ink/75">
          Every tongue · type it or say it
        </span>
        <RecordTongueDoor size={15} inline />
      </div>

      {voice.text ? (
        <p role="status" className={`mt-2 font-mono text-xs leading-relaxed ${voice.loud ? 'text-record-red' : 'text-record-ink/80'}`}>
          {voice.text}
        </p>
      ) : (
        draft.trim().length === 1 && <p className="mt-2 font-mono text-xs text-record-ink/80">Use at least two letters.</p>
      )}
    </form>
  );
}