import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Search as SearchIcon } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import RecordVoiceSearch from '@/components/climate/RecordVoiceSearch';
import RecordResultCard from '@/components/climate/RecordResultCard';

// ── SEARCH THE RECORD ────────────────────────────────────────────────────────────
// Type it or say it. One query reads everything the record holds — solutions, climate
// crises, actions, gatherings and the wire — instead of only what a phone happened to
// download. A search has its own address, so a panel or a reader can be sent one.

const SECTIONS = [
  { key: 'solutions', kind: 'solution', label: 'Solutions', tone: '#1e3a2b' },
  { key: 'crises', kind: 'crisis', label: 'Climate crises', tone: '#b3261e' },
  { key: 'actions', kind: 'action', label: 'Actions', tone: '#e2602a' },
  { key: 'gatherings', kind: 'gathering', label: 'Gatherings', tone: '#1e3a2b' },
  { key: 'wire', kind: 'wire', label: 'On the wire', tone: '#141210' },
];

export default function ClimateSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') || '');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (text) => {
    const q = String(text || '').trim();
    if (q.length < 2) return;
    setLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('climateSearch', {
        q,
        lang: (typeof navigator !== 'undefined' && navigator.language) || 'en',
      });
      setData(res.data);
    } catch (e) {
      setError('The record could not be searched just now. Please try again.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // A search that arrives in the address is answered on the way in.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('q');
    if (initial && initial.trim().length >= 2) run(initial);
  }, [run]);

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q.length < 2) return;
    navigate(`/ClimateSearch?q=${encodeURIComponent(q)}`, { replace: true });
    run(q);
  };

  const onVoice = useCallback(
    (text, isFinal) => {
      setQuery(text);
      if (isFinal && text.trim().length >= 2) {
        navigate(`/ClimateSearch?q=${encodeURIComponent(text.trim())}`, { replace: true });
        run(text);
      }
    },
    [navigate, run]
  );

  const results = data?.results;
  const sections = results ? SECTIONS.map((s) => ({ ...s, items: results[s.key] || [] })).filter((s) => s.items.length > 0) : [];

  return (
    <div className="bg-[#f4efe4]">
      <section className="px-4 lg:px-10 pt-6 pb-5 border-b-2 border-[#141210]">
        <h1
          className="font-black uppercase text-[#141210]"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 46px)', letterSpacing: '-0.025em' }}
        >
          Search the record
        </h1>
        <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mt-2 max-w-[640px]">
          Type it or say it. One question reads the whole record — every solution, climate crisis, action,
          gathering and wire entry on it, in any language they were written in.
        </p>

        <form onSubmit={submit} className="mt-4 flex flex-col sm:flex-row gap-2 max-w-[760px]">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="A place, a topic, a creature, a word…"
            aria-label="Search the record"
            className="flex-1 min-h-[48px] px-3.5 bg-[#f7f1e5] border-2 border-[#141210] text-[#141210] text-[13px] font-mono placeholder:text-[#5a5246] focus:outline-none focus:border-[#e2602a]"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading || query.trim().length < 2}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 min-h-[48px] px-5 bg-[#141210] text-[#efe7d6] border-2 border-[#141210] text-[11px] font-black font-mono uppercase tracking-wider disabled:opacity-50 active:bg-[#e2602a] active:text-[#141210] transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SearchIcon className="w-4 h-4" />}
              Search
            </button>
            <RecordVoiceSearch onTranscript={onVoice} disabled={loading} />
          </div>
        </form>
      </section>

      {loading && (
        <section className="px-4 lg:px-10 py-14 text-center">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#5a5246]">Reading the whole record…</p>
        </section>
      )}

      {!loading && error && (
        <section className="px-4 lg:px-10 py-14 text-center">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#b3261e]">{error}</p>
        </section>
      )}

      {!loading && !error && data && (
        <>
          <section className="px-4 lg:px-10 py-4 border-b-2 border-[#141210] bg-[#efe7d6]">
            <p className="text-[11px] font-mono text-[#141210]">
              {data.total > 0
                ? `${data.total} ${data.total === 1 ? 'entry' : 'entries'} on the record match “${data.query}”`
                : `Nothing on the record matches “${data.query}” yet`}
            </p>
            {data.translatedFrom && (
              <p className="text-[10px] font-mono text-[#5a5246] mt-1 leading-relaxed">
                Nothing in those exact words — searched in English for “{data.translatedFrom}” and found {data.total}.
              </p>
            )}
          </section>

          {sections.length === 0 ? (
            <section className="px-4 lg:px-10 py-14 text-center">
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#5a5246]">
                Nothing here for those words
              </p>
              <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mt-3 max-w-[560px] mx-auto">
                Every entry on the record carries its origin and is written by people, so a thin search is honest
                rather than broken. Try one word, or send something in and it will wait for a human check.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                <Link
                  to="/TogetherChangeClimate"
                  className="px-4 py-2.5 bg-[#141210] text-[#efe7d6] border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wider active:bg-[#e2602a] active:text-[#141210] transition-colors"
                >
                  Read the record
                </Link>
                <Link
                  to="/ClimateWire"
                  className="px-4 py-2.5 bg-[#efe7d6] text-[#141210] border-2 border-[#141210] text-[10px] font-black font-mono uppercase tracking-wider active:bg-[#e2602a] transition-colors"
                >
                  On the wire
                </Link>
              </div>
            </section>
          ) : (
            sections.map((s) => (
              <section key={s.key} className="px-4 lg:px-10 py-5 lg:py-7 border-b-2 border-[#141210]">
                <div className="flex items-center gap-2 mb-3">
                  <h2
                    className="font-black uppercase"
                    style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2vw, 30px)', letterSpacing: '-0.025em', color: s.tone }}
                  >
                    {s.label}
                  </h2>
                  <div className="flex-1 h-px bg-[#141210]/20" />
                  <span className="text-[10px] font-black font-mono" style={{ color: s.tone }}>
                    {s.items.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {s.items.map((item) => (
                    <RecordResultCard key={`${s.key}-${item.id}`} kind={s.kind} item={item} />
                  ))}
                </div>
              </section>
            ))
          )}
        </>
      )}

      {!loading && !error && !data && (
        <section className="px-4 lg:px-10 py-10">
          <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed max-w-[640px]">
            Search what the record actually holds. Nothing is guessed and nothing is ranked for you — the record
            shows what matches, and where it came from.
          </p>
        </section>
      )}
    </div>
  );
}