import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function MapReadingDetail({ place, onClose }) {
  return (
    <div className="record-map-picked">
      <div className="flex items-center justify-between gap-2">
        {/* ── "READERSHIP" WAS THE ONE WORD ON THIS PLATE THAT OVERCLAIMED ────────
            The sentence three lines below already says it plainly: "Entry openings, not
            people." Readership is the word newspapers use for how many people read
            something, so the heading was promising a fact the count cannot give — on the
            one page whose whole argument is that a guessed fact is worse than no fact.
            Readings is what it is: times an entry was opened. The stored value and the
            mode's own name are untouched; only the words a reader sees have changed.
            Brian, 27 November, on "Readings": "does that sound a bit tarot card to you bro?"
            It does — a reading is what a fortune-teller gives you. So the plate now says
            Times opened, which is the whole of what the number can honestly mean. */}
        <span className="record-meta text-record-muted">Opened here · approximate place</span>
        <button type="button" onClick={onClose} aria-label="Close where it was opened" className="grid h-11 w-11 shrink-0 place-items-center"><X size={18} /></button>
      </div>
      <h2 className="text-xl text-record-ink">{place.name}</h2>
      <p className="mt-3 font-bold text-record-ink">{place.reads}</p>
      {/* Opened, not watched: the one thing that makes a count on this record different
          from a count anywhere else is that nothing about the reader is kept. It says so
          on the plate rather than in a policy page nobody opens. */}
      <p className="record-meta mt-3 text-record-muted">Openings, not people. Nothing about the reader is kept: no address, no cookie, no name. The place was stated by the reader’s own device, or by the reader themselves, and the count does not say which entry was opened.</p>
      <Link to={`/ClimateReachPlace/${place.kind}/${encodeURIComponent(place.place)}`} state={{ recordReturn: 'map' }} className="record-map-open">See what was opened here →</Link>
    </div>
  );
}