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
        <span className="record-meta text-record-muted">Times opened · approximate place</span>
        <button type="button" onClick={onClose} aria-label="Close times opened" className="grid h-11 w-11 shrink-0 place-items-center"><X size={18} /></button>
      </div>
      <h2 className="text-xl text-record-ink">{place.name}</h2>
      <p className="mt-3 font-bold text-record-ink">{place.reads}</p>
      <p className="record-meta mt-3 text-record-muted">Entry openings, not people. This place was stated by readers’ devices or by readers themselves. It does not identify which entry was read here.</p>
      <Link to={`/ClimateReachPlace/${place.kind}/${encodeURIComponent(place.place)}`} state={{ recordReturn: 'map' }} className="record-map-open">Read this place’s count →</Link>
    </div>
  );
}