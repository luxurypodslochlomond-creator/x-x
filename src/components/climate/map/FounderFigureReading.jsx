import React from 'react';
import { Link } from 'react-router-dom';

/* ── ONE PLACE ON THE ONE PLATE ─────────────────────────────────────────────────────
   This panel used to sit under a second world, drawn below the record's own map because
   the founder's figures had nowhere to stand. Two worlds on one page is two things to
   look at and one thing to believe: the reader has to work out which plate is the map.
   The figures are a reading of the same world now — chosen in the plate's own key — so
   this is the line a press opens in the same aside every other mark opens in. Nothing
   about the figures has changed: the number, what it measures, and who published it. */
export default function FounderFigureReading({ place, onClose }) {
  if (!place) return null;

  return (
    <div className="record-map-picked">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#b3261e]">{place.place}</p>
      <dl className="mt-2 grid gap-3">
        {place.figures.map((f) => (
          <div key={f.id} className="border-l-2 border-[#b3261e] pl-3">
            <dt className="text-[20px] font-black leading-none text-[#141210]">
              {f.value} <span className="text-[12px] font-bold uppercase tracking-wide text-[#5a5246]">{f.unit}</span>
            </dt>
            <dd className="mt-1">
              <p className="text-[14px] font-bold text-[#141210]">{f.title}</p>
              <a
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.1em] text-[#5a5246] underline underline-offset-4 hover:text-[#141210]"
              >
                {f.source} ↗
              </a>
            </dd>
          </div>
        ))}
      </dl>
      <Link
        to="/ClimateFounder"
        className="mt-3 inline-flex min-h-11 items-center border-b border-[#b3261e]/60 font-mono text-[10px] uppercase tracking-[0.16em] text-[#b3261e] hover:text-[#141210]"
      >
        The whole argument, with every figure in full →
      </Link>
      <button
        type="button"
        onClick={onClose}
        className="mt-2 block min-h-11 font-mono text-[10px] uppercase tracking-[0.16em] text-[#5a5246] underline underline-offset-4 hover:text-[#141210]"
      >
        Put it down
      </button>
    </div>
  );
}