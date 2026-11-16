import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import RecordSearchLine from '@/components/climate/RecordSearchLine';
import RecordSearchPrompts from '@/components/climate/RecordSearchPrompts';
import RecordResultCard from '@/components/climate/RecordResultCard';
import RecordSearchGuide from '@/components/climate/RecordSearchGuide';

// ── SEARCH THE RECORD ────────────────────────────────────────────────────────────
// Type it or say it. One query reads everything the record holds — solutions, climate
// crises, actions, gatherings, the wire, the music given to it, the drawings on its wall
// and the people on its roll — instead of only what a phone happened to download. A
// search has its own address, so a panel or a reader can be sent one.
//
// A name finds a person only if that person wrote a line for the roll themselves. The
// guest list stays closed; the record will not hand out who works here.
// It wears the record's own bands, because it is part of the record, not a utility
// bolted onto it, and every result it returns carries the origin it came from.

const SECTIONS = [
  { key: 'solutions', kind: 'solution', label: 'Solutions', tone: '#1e3a2b' },
  { key: 'crises', kind: 'crisis', label: 'Climate crises', tone: '#b3261e' },
  { key: 'actions', kind: 'action', label: 'Actions', tone: '#e2602a' },
  { key: 'gatherings', kind: 'gathering', label: 'Gatherings', tone: '#1e3a2b' },
  { key: 'wire', kind: 'wire', label: 'On the wire', tone: '#141210' },
  { key: 'photos', kind: 'photo', label: 'Credited pictures', tone: '#1e3a2b' },
  { key: 'comments', kind: 'comment', label: 'What readers said', tone: '#b3261e' },
  { key: 'people', kind: 'person', label: 'On the roll', tone: '#b3261e' },
  { key: 'tracks', kind: 'track', label: 'Music given to the record', tone: '#1e3a2b' },
  { key: 'cartoons', kind: 'cartoon', label: 'Drawings', tone: '#e2602a' },
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

  // A subject tapped from the record's own list runs exactly the same search as typing it:
  // one question, one address, and no second way of doing things.
  const pick = useCallback(
    (name) => {
      setQuery(name);
      navigate(`/ClimateSearch?q=${encodeURIComponent(name)}`, { replace: true });
      run(name);
    },
    [navigate, run]
  );

  const results = data?.results;
  const sections = results ? SECTIONS.map((s) => ({ ...s, items: results[s.key] || [] })).filter((s) => s.items.length > 0) : [];
  // The record's own pages — the founder, who built it, how it is made, how to cite it.
  const about = data?.about || [];

  return (
    <ClimateRecordShell
      eyebrow="Search the record"
      marker="Every entry carries its origin"
      title="Ask the record"
      statement="Type it or say it. One question reads the whole record — every solution, crisis, action, gathering, wire entry, piece of music, drawing, credited picture and reader's comment, and every person on its roll, in whatever language it was written in."
      returnTo="/TogetherChangeClimate"
      returnLabel="Read the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International — and released to the world, the planet, all of us."
    >
      <RecordSearchLine
        value={query}
        onChange={setQuery}
        onSubmit={submit}
        onVoice={onVoice}
        loading={loading}
        canSearch={query.trim().length >= 2}
      />

      <RecordSearchPrompts onPick={pick} disabled={loading} />

      {loading && (
        <p className="mt-8 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#5a5246]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#b3261e]" />
          Reading the whole record…
        </p>
      )}

      {!loading && error && (
        <p className="mt-10 text-center text-[11px] font-mono uppercase tracking-widest text-[#b3261e]">{error}</p>
      )}

      {!loading && !error && data && (
        <div className="mt-5">
          <div className="bg-[#efe7d6] border-2 border-[#141210] p-3">
            <p className="text-[11px] font-mono text-[#141210]">
              {data.total > 0
                ? `${data.total} ${data.total === 1 ? 'result' : 'results'} on the record match “${data.query}”`
                : about.length > 0
                  ? `No entries match “${data.query}” — but the record's own pages do.`
                  : `Nothing on the record matches “${data.query}” yet`}
            </p>
            {data.loose && (
              <p className="text-[10px] font-mono text-[#5a5246] mt-1 leading-relaxed">
                No entry matched all of your words — the entries below match part of the question.
              </p>
            )}
            {data.translatedFrom && (
              <p className="text-[10px] font-mono text-[#5a5246] mt-1 leading-relaxed">
                Nothing in those exact words — searched in English for “{data.translatedFrom}” and found {data.total}.
              </p>
            )}
          </div>

          {sections.length === 0 && about.length === 0 ? (
            <div className="mt-6">
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#5a5246] mb-2">
                Nothing here for those words
              </p>
              <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-5">
                Every entry on the record carries its origin and is written by people, so a thin search is honest
                rather than broken. Try one word — or send something in, and it will wait for a human check.
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
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
              <RecordSearchGuide />
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {/* The record answering about itself, before the sourced entries. Marked in
                  the signal colour so it is never mistaken for an entry with an origin. */}
              {about.length > 0 && (
                <section>
                  <div className="flex items-center gap-2 mb-3">
                    <h2
                      className="font-black uppercase"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 1.8vw, 27px)', letterSpacing: '-0.022em', color: '#e2602a' }}
                    >
                      About the record
                    </h2>
                    <div className="flex-1 h-px bg-[#141210]/20" />
                    <span className="text-[10px] font-black font-mono text-[#e2602a]">{about.length}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {about.map((a) => (
                      <Link
                        key={`${a.path}-${a.label}`}
                        to={a.path}
                        className="block bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#e2602a] p-3.5 active:bg-[#efe7d6] transition-colors"
                      >
                        <span className="inline-block text-[9px] font-black font-mono uppercase tracking-widest px-1.5 py-0.5 border border-[#e2602a] text-[#e2602a]">
                          {a.label}
                        </span>
                        <h3 className="text-[13px] font-black font-mono uppercase text-[#141210] leading-tight mt-2">{a.title}</h3>
                        <p className="text-[12px] font-mono text-[#141210] leading-relaxed mt-1.5">{a.line}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {sections.map((s) => (
                <section key={s.key}>
                  <div className="flex items-center gap-2 mb-3">
                    <h2
                      className="font-black uppercase"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 1.8vw, 27px)', letterSpacing: '-0.022em', color: s.tone }}
                    >
                      {s.label}
                    </h2>
                    <div className="flex-1 h-px bg-[#141210]/20" />
                    <span className="text-[10px] font-black font-mono" style={{ color: s.tone }}>
                      {s.items.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {s.items.map((item) => (
                      <RecordResultCard key={`${s.key}-${item.id}`} kind={s.kind} item={item} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      )}

      {!loading && !error && !data && (
        <div className="mt-8">
          <p className="text-[11px] lg:text-[12px] font-mono text-[#5a5246] leading-relaxed mb-6">
            Search what the record actually holds. Nothing is guessed and nothing is ranked for you — the record
            shows what matches, and where it came from.
          </p>
          <RecordSearchGuide />
        </div>
      )}
    </ClimateRecordShell>
  );
}