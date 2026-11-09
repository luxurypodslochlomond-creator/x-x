import React from 'react';
import { MarkSeal, MarkCovenant, MarkHandover } from './RecordFootMarks';

// ── WHAT IT ASKS OF THIS RECORD, THIS PLATFORM, AND WHOEVER COMES NEXT ─────────
// The covenant was floating: a page of principle that never said what it demanded of
// the thing it is printed on. A principle that asks nothing of anything is a poster.
// So each of the three is given one hard demand and one limit — the limit is the part
// that costs something, and a section with no limits in it is selling rather than stating.
//
// Nothing here is about the person who typed it. The obligations outlive him, and they
// are written to be read by somebody opening this in fifty years who has never heard of
// any of us, on a device that does not exist yet, in a tongue nobody here speaks.
const ASKS = [
  {
    Mark: MarkSeal,
    who: 'Of the record',
    demand:
      'Every entry names the body, journal or person that said it. Where only one origin exists, the entry says so on its face and stays at single source until a second, independent origin is named. A correction is printed with its date.',
    limit:
      'A record cannot make a claim true. It can only make it checkable, and keep the version that was checked from disappearing.',
  },
  {
    Mark: MarkCovenant,
    who: 'Of the platform',
    demand:
      'No funder’s name on the door, no entry for sale, no paid placement, no ranking that can be bought. The code, the covenant and the seals are open, so the whole record can be taken up and run by somebody else.',
    limit:
      'If the platform ever cannot meet that, it should say so on this page rather than quietly keep the mark.',
  },
  {
    Mark: MarkHandover,
    who: 'Of whoever comes next',
    demand:
      'Keep the fingerprints checkable without asking us: an entry’s seal is recomputed in the reader’s own browser, not on our server. Keep every page readable in any tongue a reader names. Keep reading free of an account, a subscription or our permission.',
    limit:
      'Nothing here asks to be carried on out of loyalty. Carry it because it is checkable, and drop it the moment it is not.',
  },
];

export default function XEqualsXWhatItAsks() {
  return (
    <section aria-labelledby="what-it-asks" className="my-10 border-t border-record-ink/25 pt-7">
      <h2
        id="what-it-asks"
        className="text-[22px] leading-[1.15] text-record-ink"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        What x = x asks of this record, this platform, and whoever comes next
      </h2>

      <dl className="mt-6 space-y-6">
        {ASKS.map(({ Mark, who, demand, limit }) => (
          <div key={who} className="border-t border-record-ink/15 pt-5 first:border-t-0 first:pt-0">
            <dt className="flex items-baseline gap-3">
              <Mark size={24} className="shrink-0 translate-y-[3px] text-record-ink" />
              <span
                className="text-[17px] leading-[1.2] text-record-ink"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {who}
              </span>
            </dt>
            <dd className="mt-2 max-w-[52ch] font-body text-[15.5px] leading-[1.62] text-record-ink sm:pl-9">
              {demand}
            </dd>
            <dd className="mt-2 max-w-[52ch] border-l border-record-mark/50 pl-3 font-body text-[15px] leading-[1.55] text-record-muted sm:ml-9">
              {limit}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}