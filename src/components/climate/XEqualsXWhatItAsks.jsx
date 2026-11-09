import React from 'react';
import RecordBand from './RecordBand';
import { MarkSeal, MarkCovenant, MarkHandover } from './RecordFootMarks';

// ── THE TERMS, NOT THE ARGUMENT FOR THE TERMS ──────────────────────────────────
// Three bindings, each one sentence, each with its own limit underneath in the record's
// borrowed red. The limit is the part that costs something, and a section with no limits
// in it is selling rather than stating. Nothing here is about the person who typed it; the
// obligations outlive him, and are addressed to somebody opening this in fifty years who
// has never heard of any of us.
const TERMS = [
  {
    Mark: MarkSeal,
    who: 'The record',
    term: 'Every entry names what said it. One origin is printed as one origin. A correction carries its date.',
    limit: 'It cannot make a claim true. It can stop the version that was checked from disappearing.',
  },
  {
    Mark: MarkCovenant,
    who: 'The platform',
    term: 'No funder’s name on the door. No entry for sale, no placement that can be bought.',
    limit: 'If that ever stops being true, the mark comes off this page the same day.',
  },
  {
    Mark: MarkHandover,
    who: 'Whoever comes next',
    term: 'Check the seals without us. Read in any tongue. Read without an account, a fee or our permission.',
    limit: 'Carry it because it is checkable, not because it was ours.',
  },
];

export default function XEqualsXWhatItAsks() {
  return (
    <RecordBand id="terms" label="The terms" title="What this binds, and where it runs out">
      <dl>
        {TERMS.map(({ Mark, who, term, limit }) => (
          <div key={who} className="grid grid-cols-[24px_1fr] gap-x-3 border-t border-record-ink/15 py-4 first:border-t-0 first:pt-0">
            <Mark size={24} className="mt-[1px] text-record-ink" />
            <div>
              <dt className="text-[16px] leading-[1.2] text-record-ink" style={{ fontFamily: 'var(--font-display)' }}>
                {who}
              </dt>
              <dd className="mt-1 max-w-[50ch] text-[15.5px] leading-[1.55] text-record-ink">{term}</dd>
              <dd className="mt-1.5 max-w-[50ch] border-l border-record-mark/55 pl-2.5 text-[13.5px] leading-[1.45] text-record-muted">
                {limit}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </RecordBand>
  );
}