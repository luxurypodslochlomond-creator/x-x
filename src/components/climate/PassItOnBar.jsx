import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { RECORD_COVER_MOBILE } from './categoryImages';

// ── PASS IT ON ────────────────────────────────────────────────────────────────
// The share was a glyph in the corner of the strip: a box with an arrow, which is the
// universal sign for "somewhere else" and says nothing about why anybody would send
// this. Passing the record on is the whole reason it is public, so the ask is printed
// as a band instead — the painting in a frame, the words in the same tracked capitals
// as "A public service · for the world" above it, and one line saying what leaves with
// the card. Yellow ground, ink letters, the record's red kept for the sentence that
// explains: the same three inks as every band on the record, nothing borrowed.
//
// It is a bar and not a poster on purpose. It has to be found by a thumb without being
// looked for, so it is one row, one picture, two lines of type and an arrow.
const LINE = 'One card, ready to send — the record’s own words, and where to find it.';

export default function PassItOnBar({ onPress, state = 'idle', line = LINE }) {
  const busy = state === 'building';
  const done = state === 'shared';
  const title = busy ? 'Drawing the card' : done ? 'Passed on' : 'Pass it on';

  return (
    <button
      type="button"
      onClick={onPress}
      disabled={busy}
      aria-label={`${title} — ${line}`}
      className="record-passon"
    >
      <img src={RECORD_COVER_MOBILE} alt="" aria-hidden="true" loading="lazy" className="record-passon-thumb" />
      <span className="record-passon-words">
        <span className="record-passon-title">{title}</span>
        <span className="record-passon-line">{done ? 'The card is on its way.' : line}</span>
      </span>
      <span className="record-passon-go" aria-hidden="true">
        {done ? <Check size={18} strokeWidth={2.4} /> : <ArrowRight size={18} strokeWidth={2.4} />}
      </span>
    </button>
  );
}