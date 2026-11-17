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
    <div className="border-y border-record-ink/20 py-4 text-record-ink">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] leading-relaxed">{line}</p>
        <span className="base-one-label font-mono uppercase shrink-0 pt-0.5 text-record-mark">
          Answer
        </span>
      </div>

      {data.loose && (
        <p className="mt-2 font-mono text-sm leading-relaxed text-record-muted">
          No entry matched all of your words — the entries below match part of the question.
        </p>
      )}
      {local && (
        <p className="mt-2 font-mono text-sm leading-relaxed text-record-muted">
          Your own device read the record for this one — the index could not be reached, so
          nothing was asked of anybody else.
        </p>
      )}
      {data.translatedFrom && (
        <p className="mt-2 font-mono text-sm leading-relaxed text-record-muted">
          Nothing in those exact words — searched in English for “{data.translatedFrom}” and
          found {data.total}.
        </p>
      )}
    </div>
  );
}