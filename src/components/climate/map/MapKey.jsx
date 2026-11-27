import React from 'react';
import MapSignalMark from '@/components/climate/MapSignalMark';

const KINDS = [
  ['crisis', 'Crises'],
  ['solution', 'Solutions'],
  ['action', 'Actions'],
  ['wire', 'Wire'],
  ['cartoon', 'Cartoons'],
];

/* A lit place is not a sixth kind of entry, so it does not take a sixth categorical
   colour: it takes the lamp — a warm core inside the record's amber halo — the same
   light the plate already draws on every place the record has been read. */
function LampMark() {
  return (
    <svg aria-hidden="true" data-kind="reader" viewBox="0 0 20 20" className="record-map-symbol record-map-symbol--lamp" focusable="false">
      <circle cx="10" cy="10" r="8.6" fill="none" stroke="rgb(var(--record-signal) / .6)" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="4.6" fill="var(--map-signal, rgb(var(--record-map-reader)))" />
      <circle cx="10" cy="10" r="9.4" fill="none" stroke="rgb(var(--record-ink) / .4)" strokeWidth="0.8" />
    </svg>
  );
}

/* ── THE KEY IS A LEGEND, NOT A TOOLBAR ─────────────────────────────────────────
   Each mark used to carry a tally beside its name — Crises 3, Solutions 4 — which turned
   one line of legend into a row of counters, and made the plate underneath look like a
   dashboard with a map in it. The counts are still here: the sentence says how much of
   the record has a place, and pressing a mark opens that place's own line. A legend only
   has to say what the marks mean. */
export default function MapKey({ mode, onMode, only, onOnly, counts, placed, total, lights, loading, isError, newestArrival }) {
  const showing = counts.crisis + counts.solution + counts.action + counts.wire + counts.cartoon;
  const sentence = isError
    ? 'Entries could not be loaded'
    : loading
      ? 'Setting the entries…'
      : mode === 'readership'
        ? `${lights.length} ${lights.length === 1 ? 'place' : 'places'} where an entry was opened`
        : only
          ? `${placed} of ${showing} placed · ${only === 'cartoon' ? 'drawings' : only}`
          : showing < total
            ? `${placed} of ${total} entries placed`
            : `${placed} ${placed === 1 ? 'entry' : 'entries'} placed`;

  return (
    <div className="record-map-key">
      <p className="record-map-key-count">
        {sentence}
        {!loading && !isError && newestArrival && mode !== 'readership' && (
          <span className="record-map-key-newest">Newest standing here arrived {newestArrival}.</span>
        )}
      </p>

      <div className="record-map-key-keys" role="group" aria-label="Choose what the plate shows">
        <button
          type="button"
          aria-pressed={mode === 'entries' && !only}
          onClick={() => { onMode('entries'); onOnly(null); }}
          className="record-map-key-mode"
        >
          Entries
        </button>
        {KINDS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            data-kind={key}
            aria-pressed={mode === 'entries' && only === key}
            onClick={() => { onMode('entries'); onOnly(only === key ? null : key); }}
            className="record-map-key-kind"
          >
            <MapSignalMark kind={key} className="record-map-key-symbol" />
            {label}
          </button>
        ))}
        <button
          type="button"
          data-kind="reader"
          aria-pressed={mode === 'readership'}
          onClick={() => { onMode(mode === 'readership' ? 'entries' : 'readership'); onOnly(null); }}
          className="record-map-key-kind record-map-key-reader"
        >
          <LampMark />
          {/* ── "READINGS" WAS THE LAST TAROT WORD ON THE RECORD ────────────────────
              Brian, 27 November: "in map etc 'readings' does that sound a bit tarot card to
              you bro?" It does. A reading is what a fortune-teller gives you; this is a count
              of times an entry was opened, and the plate says so plainly underneath. The
              stored value and the mode's own name are untouched — only the word a reader
              sees has changed. */}
          Times opened
        </button>
      </div>
    </div>
  );
}