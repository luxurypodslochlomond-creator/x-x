import React from 'react';

// The sentence the index answers with, printed as a plate rather than as a note: how many
// things matched, and — when it matters — that the answer came from the reader's own
// device, or that only part of the question could be met. The record says which.
export default function SearchAnswerLine({ data, local, aboutCount }) {
  const line =
    data.total > 0
      ? `${data.total} ${data.total === 1 ? 'result' : 'results'} on the record match “${data.query}”`
      : aboutCount > 0
        ? `No entries match “${data.query}” — but the record’s own pages do.`
        : `Nothing on the record matches “${data.query}” yet`;

  return (
    <div className="border-2 border-record-ink bg-record-ink px-3 py-2.5 text-record-paper">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] leading-relaxed">{line}</p>
        <span className="shrink-0 pt-0.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-cartoon-sun">
          Answer
        </span>
      </div>

      {data.loose && (
        <p className="mt-1.5 border-t border-record-paper/20 pt-1.5 font-mono text-[10px] leading-relaxed text-record-paper/70">
          No entry matched all of your words — the entries below match part of the question.
        </p>
      )}
      {local && (
        <p className="mt-1.5 border-t border-record-paper/20 pt-1.5 font-mono text-[10px] leading-relaxed text-record-paper/70">
          Your own device read the record for this one — the index could not be reached, so
          nothing was asked of anybody else.
        </p>
      )}
      {data.translatedFrom && (
        <p className="mt-1.5 border-t border-record-paper/20 pt-1.5 font-mono text-[10px] leading-relaxed text-record-paper/70">
          Nothing in those exact words — searched in English for “{data.translatedFrom}” and
          found {data.total}.
        </p>
      )}
    </div>
  );
}