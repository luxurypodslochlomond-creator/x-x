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
// and the line under the plate says what it means.
//
// ── AND NO "OPEN" BUTTON ─────────────────────────────────────────────────────
// Brian, 19 November: "open is wrong and button too weird — what should go?" He was right,
// and the fault was that a bordered button with the word OPEN on it is a piece of interface
// standing where a caption belongs. A plate of drawings does not need a control bolted to
// it; it needs the door named.
//
// So the door is its own name, in the record's red, with the record's go-mark beside it: a
// small solid triangle, the one shape that means "this way" without a word and without a
// box. The name is the link, the mark is the arrow, and there is nothing on the plate that
// looks like software.
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

// The record's go-mark: a solid triangle, drawn rather than typed, so it is the same shape
// here as it would be cut into a plate. Nothing else on this sheet is a glyph.
function GoMark() {
  return (
    <svg width="7" height="8" viewBox="0 0 7 8" aria-hidden="true" className="shrink-0"><path d="M0 0l7 4-7 4Z" fill="currentColor" /></svg>
  );
}

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
        <p className="text-[11px] uppercase tracking-[0.16em] text-record-mark">Every mark, struck once</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Back to the list of doors"
          className="min-h-9 shrink-0 px-1 text-[10px] uppercase tracking-[0.14em] text-record-ink hover:text-record-mark focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
        >
          The list <span aria-hidden="true">↩</span>
        </button>
      </div>

      <p className="mt-1.5 text-[11px] leading-snug text-record-muted">Press any mark to read what it is, and to go through it.</p>

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

      <figcaption className="mt-2 min-h-[5.25rem]" aria-live="polite">
        {chosen ? (
          <div className="flex items-start gap-3 border-t-2 border-record-mark pt-2">
            {/* The drawing, at the size it is actually legible: a mark answered in a
                twenty-pixel thumbnail would be answered by the sentence alone, which is the
                one thing this plate exists to avoid. */}
            <span aria-hidden="true" className="mt-0.5 block h-14 w-14 shrink-0 text-record-ink [&>svg]:h-full [&>svg]:w-full"><chosen.Mark size={40} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[0.14em] text-record-mark">{chosen.name}</p>
              <p className="mt-0.5 text-[12.5px] leading-snug text-record-ink">{chosen.means}</p>
              {chosen.to && (
                <Link
                  to={chosen.to}
                  onClick={onNavigate}
                  className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.13em] text-record-mark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-record-mark"
                >
                  {chosen.door}
                  <GoMark />
                </Link>
              )}
            </div>
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