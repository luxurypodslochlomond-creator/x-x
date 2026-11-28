import React from 'react';
import '@/components/climate/cartoons/wall-poster-title.css';

// ── THE SENTENCE, SET THE WAY FRANCIS AND JANINE SET IT ────────────────────────
// Brian, 28 November: "change the colour of climate change and the power sentence to
// match the colours in the poster cover artwork… see it that Janine and Francis did."
//
// The cover does not set this sentence as one line of one colour. It sets it in four
// moves: CLIMATE CHANGE in deep green, "and the power of" small in black, COLLECTIVE
// ACTIONS as white knocked out of a bright red block, and "and creative interventions"
// back in black. That stack is the poster's own hierarchy — the crisis named, the
// claim made, the answer shouted — so the wall borrows the setting rather than
// approximating it with a single tint.
//
// The colours are the cover's own, read from the artwork: green #1a521a, red #e60000,
// cream #fffacd. They live here and nowhere else on the record; the record's own red
// and ink still do all its other work.
//
// The words are unchanged, and they are still one sentence in the page for a screen
// reader and for search: four spans inside one paragraph, read straight through.
export default function WallPosterTitle() {
  return <p className="wall-event-name wall-poster-title">
    <span className="wall-poster-line wall-poster-line--green">Climate change</span>
    <span className="wall-poster-line wall-poster-line--quiet">and the power of</span>
    <span className="wall-poster-line wall-poster-line--red">Collective actions</span>
    <span className="wall-poster-line wall-poster-line--quiet">and creative interventions</span>
  </p>;
}