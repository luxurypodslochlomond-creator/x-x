import React from 'react';
import { Link } from 'react-router-dom';
import useRecordSearch from '@/components/climate/useRecordSearch';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import RecordSearchLine from '@/components/climate/RecordSearchLine';
import RecordSearchPrompts from '@/components/climate/RecordSearchPrompts';
import RecordResultCard from '@/components/climate/RecordResultCard';
import RecordSearchHelp from '@/components/climate/RecordSearchHelp';
import RecordSearchDoors from '@/components/climate/search/RecordSearchDoors';import BaseOnePlate from '@/components/climate/search/BaseOnePlate';
import BaseOneAnswer from '@/components/climate/search/BaseOneAnswer';
import useBaseOneAnswer from '@/components/climate/search/useBaseOneAnswer';
import SearchAnswerLine from '@/components/climate/search/SearchAnswerLine';
import SearchSectionHead from '@/components/climate/search/SearchSectionHead';

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
  { key: 'solutions', kind: 'solution', label: 'Solutions' },
  { key: 'crises', kind: 'crisis', label: 'Climate crises' },
  { key: 'actions', kind: 'action', label: 'Actions' },
  { key: 'gatherings', kind: 'gathering', label: 'Groups' },
  { key: 'wire', kind: 'wire', label: 'The Wire' },
  { key: 'photos', kind: 'photo', label: 'Credited pictures' },
  { key: 'comments', kind: 'comment', label: 'What readers said' },
  { key: 'people', kind: 'person', label: 'On the roll' },
  { key: 'tracks', kind: 'track', label: 'Music given to the record' },
  { key: 'cartoons', kind: 'cartoon', label: 'Drawings' },
];

export default function ClimateSearch() {
  const { query, start, back, data, loading, error, local } = useRecordSearch();
  // The record answers in words first, then shows what it answered from.
  const { answer, loading: answerLoading, failed: answerFailed } = useBaseOneAnswer(query);

  const results = data?.results;
  const sections = results ? SECTIONS.map((s) => ({ ...s, items: results[s.key] || [] })).filter((s) => s.items.length > 0) : [];
  // The record's own pages — the founder, who built it, how it is made, how to cite it.
  const about = data?.about || [];

  return (
    <ClimateRecordShell
      compact
      onBack={back}
      backLabel="Back"
      eyebrow="BASE 1 · the record’s own index"
      returnTo="/TogetherChangeClimate"
      showReturn={false}
      className="record-search-page"
    >
      <BaseOnePlate statement="Type it or say it. Search everything the record holds, with the origin beside every answer." />

      <div className="relative z-10">
        <RecordSearchLine
          value={query}
          onSearch={start}
          loading={loading}
        />

        <div className={data || loading ? 'hidden lg:block' : ''}>
          <RecordSearchPrompts onPick={start} disabled={loading} />
        </div>
      </div>

      {loading && (
        <p role="status" className="mt-8 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-record-muted">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-record-mark" />
          Reading the whole record…
        </p>
      )}

      {!loading && error && (
        <p role="alert" className="mt-10 text-center text-[11px] font-mono uppercase tracking-widest text-record-red">{error}</p>
      )}

      {!loading && !error && data && (
        <div className="record-search-results mt-5">
          {/* The answer comes first: one thing said, its origin cited, and what it does not
              cover named in the open. The entries below are the evidence, not the answer. */}
          {/* The answer takes a moment, and a moment of nothing looks like an empty record.
              Both states are said in the record's own voice, in the place the answer goes. */}
          {answerLoading && (
            <p role="status" className="mb-4 flex items-center gap-2 border-l-2 border-record-mark pl-3 font-mono text-[11px] uppercase tracking-widest text-record-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-record-mark" />
              The record is putting its answer into words…
            </p>
          )}
          {answerFailed && (
            <p role="alert" className="mb-4 border-l-2 border-record-red pl-3 font-mono text-[11px] leading-relaxed text-record-red">
              The record could not put its answer into words just now. What it holds is below, every entry with its origin beside it.
            </p>
          )}
          {answer && <div className="mb-4"><BaseOneAnswer answer={answer} /></div>}
          <SearchAnswerLine data={data} local={local} aboutCount={about.length} />

          {sections.length === 0 && about.length === 0 ? (
            <div className="mt-6">
              <p className="text-[11px] font-mono uppercase tracking-widest text-record-muted mb-2">
                Nothing here for those words
              </p>
              <p className="text-[11px] font-mono text-record-muted leading-relaxed mb-5">
                Every entry on the record carries its origin and is written by people, so a thin search is honest
                rather than broken. Try one word — or send something in, and it will wait for a human check.
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                <Link
                  to="/TogetherChangeClimate"
                  className="base-one-label font-mono uppercase inline-flex min-h-11 items-center bg-cartoon-sun px-4 py-2.5 text-record-ink transition-colors hover:text-record-mark"
                >
                  Read the record
                </Link>
                <Link
                  to="/ClimateWire"
                  className="base-one-label font-mono uppercase inline-flex min-h-11 items-center px-4 py-2.5 text-record-ink underline underline-offset-4 transition-colors hover:text-record-mark"
                >
                  On the wire
                </Link>
              </div>
              <RecordSearchHelp />
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {/* The record answering about itself, before the sourced entries. Marked in
                  the signal colour so it is never mistaken for an entry with an origin. */}
              {about.length > 0 && (
                <section>
                  <SearchSectionHead index={0} label="About the record" count={about.length} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {about.map((a, i) => (
                      <div key={`${a.path}-${a.label}`} className="bo-rise" style={{ animationDelay: `${Math.min(i, 6) * 45}ms` }}>
                      <Link
                        to={a.path}
                        className="record-search-result block border-b border-record-ink/20 py-5 text-record-ink transition-colors hover:border-record-mark"
                      >
                        <span className="base-one-label font-mono uppercase inline-block bg-cartoon-sun px-2 py-1 text-record-ink">
                          {a.label}
                        </span>
                        <h3 className="mt-3 font-heading text-base font-bold leading-snug text-record-ink">{a.title}</h3>
                        <p className="mt-2 font-mono text-sm leading-relaxed text-record-ink">{a.line}</p>
                      </Link>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {sections.map((s, i) => (
                <section key={s.key}>
                  <SearchSectionHead
                    index={about.length > 0 ? i + 1 : i}
                    label={s.label}
                    count={s.items.length}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {s.items.map((item, idx) => (
                      <div key={`${s.key}-${item.id}`} className="bo-rise" style={{ animationDelay: `${Math.min(idx, 6) * 45}ms` }}>
                        <RecordResultCard kind={s.kind} item={item} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      )}

      {!loading && !error && !data && (
        <div className="mt-8 grid gap-7 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="hidden lg:block text-[11px] lg:text-[12px] font-mono text-record-muted leading-relaxed mb-6">
              Search what the record actually holds. Nothing is guessed and nothing is ranked for you — the record
              shows what matches, and where it came from.
            </p>
            <RecordSearchHelp />
          </div>
          {/* Half the glass stood empty under the search line. The other doors in belong
              here rather than nowhere: a reader who has not typed yet is shown the record
              itself, not a blank sheet. */}
          <RecordSearchDoors />
        </div>
      )}
    </ClimateRecordShell>
  );
}