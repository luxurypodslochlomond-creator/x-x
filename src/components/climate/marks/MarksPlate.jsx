import React from 'react';
import { MARKS_IN_ORDER } from '@/components/climate/marks/marksOrder';
import { useClimateImpactStats } from '@/hooks/useClimateImpactStats';

// ── THE MARKS, JOINED ─────────────────────────────────────────────────────────
// Brian, 19 November: "icons could create a piece of coolasfuck art when joined together?
// Means could show it by pressing coolasfuck button brings them all together … in explore …
// could go one further with context about health of planet but can't be cheesy."
//
// He is right that they join, and the reason is the drawings themselves: every mark is cut
// in the same forty-unit square with the same weight of mass and exactly one element in the
// record's red. Six across, four down, no gaps, in the order a reader meets them — the reds
// then fall across the sheet like registration marks, and what is in front of the reader is
// the record's whole vocabulary at once. That is the one thing an index of words cannot say:
// that all of this is one hand.
//
// ── AND THE PLANET, WITHOUT THE SENTENCE NOBODY BELIEVES ──────────────────────
// The cheesy version is easy and it is a lie: "together we can heal the planet" printed
// under a sheet of drawings, by a record that has measured nothing of the sort. So the
// figure under the plate is the record's own count — entries on it, places it has been read
// in — because that is what this sheet can honestly say about the world. It counts readings
// and never readers, it says so in the line itself, and where the count cannot be reached it
// prints nothing at all rather than a zero: a failed count is a fact about us, not about the
// planet.
const CELL = 'flex aspect-square items-center justify-center border-b border-r border-record-ink/20 p-[6%]';

export default function MarksPlate({ onClose }) {
  const { data } = useClimateImpactStats();
  const counted = data && !data.counts_unavailable ? data : null;
  const figure = counted
    ? `${counted.published_entries ?? 0} entries on the record · read in ${counted.unique_countries ?? 0} places · a reading is counted, a reader never is`
    : '';

  return (
    <figure className="pb-3 font-body text-record-ink">
      <div className="flex items-baseline justify-between gap-3 border-b-2 border-record-mark pb-1">
        <p className="record-header-type text-[11px] uppercase tracking-[0.16em] text-record-mark">Every mark, struck once</p>
        <button
          type="button"
          onClick={onClose}
          className="record-header-type min-h-9 shrink-0 px-1 text-[10px] uppercase tracking-[0.14em] text-record-ink hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
        >
          The index <span aria-hidden="true">↩</span>
        </button>
      </div>

      <div role="img" aria-label={`Every mark of the record, laid tight in one plate: ${MARKS_IN_ORDER.length} drawings by one hand`} className="mt-2 grid grid-cols-6 border-l border-t border-record-ink/20">
        {MARKS_IN_ORDER.map(({ name, Mark }) => (
          <div key={name} title={name} aria-hidden="true" className={CELL}>
            <span className="block h-full w-full [&>svg]:h-full [&>svg]:w-full"><Mark size={40} /></span>
          </div>
        ))}
      </div>

      <figcaption className="mt-2">
        <p className="text-[12px] leading-relaxed text-record-ink">
          The whole of the record's hand in one plate — {MARKS_IN_ORDER.length} marks, one square, one weight, and a single part of each in the record's red. Laid in the order a reader meets them.
        </p>
        {figure && <p className="mt-1.5 border-t border-record-ink/15 pt-1.5 font-mono text-[10px] leading-relaxed tracking-[0.04em] text-record-muted">{figure}</p>}
      </figcaption>
    </figure>
  );
}