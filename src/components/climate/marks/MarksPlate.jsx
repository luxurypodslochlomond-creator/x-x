import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MARKS_IN_ORDER } from '@/components/climate/marks/marksOrder';
import { useClimateImpactStats } from '@/hooks/useClimateImpactStats';

// ── THE MARKS, JOINED, AND EACH ONE ANSWERABLE ────────────────────────────────
// Brian, 19 November: "icons could create a piece of coolasfuck art when joined together? …
// pressing coolasfuck button brings them all together … could go one further with context
// about health of planet but can't be cheesy." Then, once he saw the plate: "tell anyone
// what mark means and where it goes."
//
// He is right that they join, and the reason is the drawings themselves: every mark is cut
// in the same forty-unit square with the same weight of mass and exactly one element in the
// record's red. Six across, four down, no gaps, in the order a reader meets them — the reds
// then fall across the sheet like registration marks, and what is in front of the reader is
// the record's whole vocabulary at once. That is the one thing an index of words cannot say:
// that all of this is one hand.
//
// ── THE PRESS IS THE ANSWER, NOT A TOOLTIP ───────────────────────────────────
// A mark you cannot read is a shape, so every square on this plate is a button. Press one
// and it is struck in reverse — ink behind it, the drawing in paper, its red still red —
// and the line under the plate says what it means and offers the door it opens. No overlay,
// no hover-only state, nothing that a thumb cannot do: the plate stays whole and visible
// while one mark answers, which is the whole point of laying them together.
//
// ── AND THE PLANET, WITHOUT THE SENTENCE NOBODY BELIEVES ──────────────────────
// The cheesy version is easy and it is a lie: "together we can heal the planet" printed
// under a sheet of drawings, by a record that has measured nothing of the sort. So the
// figure under the plate is the record's own count — entries on it, places it has been read
// in — because that is what this sheet can honestly say about the world. It counts readings
// and never readers, it says so in the line itself, and where the count cannot be reached it
// prints nothing at all rather than a zero: a failed count is a fact about us, not about the
// planet.
const CELL =
  'flex aspect-square items-center justify-center border-b border-r border-record-ink/20 p-[6%] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-record-mark';

export default function MarksPlate({ onClose, onNavigate }) {
  const [openIndex, setOpenIndex] = useState(null);
  const { data } = useClimateImpactStats();
  const counted = data && !data.counts_unavailable ? data : null;
  const chosen = openIndex === null ? null : MARKS_IN_ORDER[openIndex];
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

      <p className="mt-1.5 text-[11px] leading-snug text-record-muted">Tap any mark to hear what it means and where it opens.</p>

      <div role="group" aria-label="Every mark of the record" className="mt-1.5 grid grid-cols-6 border-l border-t border-record-ink/20">
        {MARKS_IN_ORDER.map(({ name, Mark, means }, i) => {
          const on = openIndex === i;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setOpenIndex(on ? null : i)}
              aria-pressed={on}
              aria-label={`${name}. ${means}`}
              className={`${CELL} ${on ? 'bg-record-ink text-record-paper' : 'text-record-ink'}`}
            >
              <span aria-hidden="true" className="block h-full w-full [&>svg]:h-full [&>svg]:w-full"><Mark size={40} /></span>
            </button>
          );
        })}
      </div>

      <figcaption className="mt-2 min-h-[4.5rem]" aria-live="polite">
        {chosen ? (
          <div className="flex items-start gap-2 border-t-2 border-record-mark pt-1.5">
            <span aria-hidden="true" className="mt-0.5 block h-8 w-8 shrink-0 text-record-ink [&>svg]:h-full [&>svg]:w-full"><chosen.Mark size={40} /></span>
            <div className="min-w-0 flex-1">
              <p className="record-header-type text-[11px] uppercase tracking-[0.14em] text-record-mark">{chosen.name}</p>
              <p className="text-[12px] leading-relaxed text-record-ink">{chosen.means}</p>
            </div>
            {chosen.to && (
              <Link
                to={chosen.to}
                onClick={onNavigate}
                className="record-header-type mt-0.5 shrink-0 border border-record-ink/30 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-record-ink hover:border-record-mark hover:text-record-mark"
              >
                Open <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        ) : (
          <>
            <p className="text-[12px] leading-relaxed text-record-ink">
              The whole of the record's hand in one plate — {MARKS_IN_ORDER.length} marks, one square, one weight, and a single part of each in the record's red. Laid in the order a reader meets them.
            </p>
            {figure && <p className="mt-1.5 border-t border-record-ink/15 pt-1.5 font-mono text-[10px] leading-relaxed tracking-[0.04em] text-record-muted">{figure}</p>}
          </>
        )}
      </figcaption>
    </figure>
  );
}