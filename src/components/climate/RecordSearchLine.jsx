import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Loader2, X } from 'lucide-react';
import RecordVoiceSearch from '@/components/climate/RecordVoiceSearch';

export default function RecordSearchLine({ value, onSearch, loading }) {
  const [draft, setDraft] = useState(value);
  const [voice, setVoice] = useState({ text: '', loud: false });
  const input = useRef(null);
  const composing = useRef(false);
  useEffect(() => { setDraft(value); }, [value]);
  const noteVoice = useCallback((text, loud) => setVoice({ text, loud }), []);
  const onVoice = useCallback((text, final) => {
    setDraft(text);
    if (final && text.trim().length >= 2) { input.current?.blur(); onSearch(text); }
  }, [onSearch]);
  const submit = (event) => {
    event.preventDefault();
    if (composing.current || loading || draft.trim().length < 2) return;
    input.current?.blur();
    onSearch(draft);
  };
  const clear = () => { setDraft(''); input.current?.focus(); };
  return (
    <form role="search" onSubmit={submit}>
      <div className="record-search-field flex items-center overflow-hidden rounded-[3px] border-2 border-record-ink bg-record-bone focus-within:border-record-red">
        <input ref={input} type="text" inputMode="search" name="q" role="searchbox" dir="auto"
          value={draft} onChange={(event) => setDraft(event.target.value)}
          onCompositionStart={() => { composing.current = true; }} onCompositionEnd={() => { composing.current = false; }}
          placeholder="A place, a name, a word…" aria-label="Search the record" enterKeyHint="search" autoComplete="off"
          className="block h-[52px] w-0 min-w-0 flex-1 appearance-none select-text rounded-none bg-transparent px-3 font-body text-base leading-normal text-record-ink caret-record-ink placeholder:text-record-muted focus:outline-none"
        />
        {draft && <button type="button" onClick={clear} aria-label="Clear search text" className="grid h-11 w-11 shrink-0 place-items-center text-record-muted"><X className="h-4 w-4" /></button>}
        <RecordVoiceSearch variant="mark" onTranscript={onVoice} onMessage={noteVoice} disabled={loading} />
        <button type="submit" aria-label="Search the record" disabled={loading || draft.trim().length < 2}
          className="record-search-submit grid h-[52px] w-[56px] shrink-0 place-items-center bg-record-red text-record-paper active:bg-record-ink disabled:opacity-60">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-6 w-6" />}
        </button>
      </div>
      {voice.text ? <p role="status" className={`mt-2 font-mono text-xs leading-relaxed ${voice.loud ? 'text-record-red' : 'text-record-muted'}`}>{voice.text}</p>
        : draft.trim().length === 1 && <p className="mt-2 font-mono text-xs text-record-muted">Use at least two letters.</p>}
    </form>
  );
}