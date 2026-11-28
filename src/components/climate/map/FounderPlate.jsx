import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import WorldPlate from '@/components/climate/WorldPlate';
import { founderPlaces } from './founderPlaces';

/* ── THE FIGURES, SET WHERE THEY HAPPEN ─────────────────────────────────────────────
   The founder page carried the largest numbers on the record and the map knew nothing
   about them: a reader could learn that 33.7 million people need help in Sudan and then
   arrive at a plate that only holds the record's own entries. So the harm is drawn too,
   in the record's red, on the same plate and the same projection — and each mark opens
   the figure, its source and the country's own line rather than a tooltip.

   These are not entries. They are the reason the entries exist, and the plate says so in
   words underneath instead of leaving a reader to assume the red dots are crises we wrote. */
export default function FounderPlate() {
  const places = useMemo(() => founderPlaces(), []);
  const [picked, setPicked] = useState(null);

  const marks = useMemo(
    () =>
      places.map((p) => {
        const one = p.figures[0];
        return {
          id: p.place,
          lat: p.lat,
          lng: p.lng,
          tone: 'crisis',
          count: p.figures.length,
          aria:
            p.figures.length === 1
              ? `${p.place}: ${one.value} ${one.unit}`
              : `${p.place}: ${p.figures.length} figures`,
          label: p.figures.length === 1 ? `${p.place} · ${one.value} ${one.unit}` : `${p.place} · ${p.figures.length} figures`,
        };
      }),
    [places]
  );

  const chosen = picked ? places.find((p) => p.place === picked.id) : null;

  return (
    <section
      id="founder-figures"
      aria-labelledby="founder-figures-title"
      className="record-map-band mt-4 w-full scroll-mt-36 border-2 border-[#141210] bg-[#f7f1e5]"
    >
      <header className="border-b border-[#141210]/20 px-4 py-4 lg:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#b3261e]">
          The harm, set where it happens
        </p>
        <h2 id="founder-figures-title" className="mt-2 text-[22px] font-bold leading-tight text-[#141210] lg:text-[28px]">
          The figures Janine’s page counts, on the ground.
        </h2>
        <p className="mt-2 max-w-[70ch] text-[14px] leading-relaxed text-[#3a342c]">
          Every figure below is one the founder page prints, placed on the country its own source
          names. Press a country to read the number, what it measures and who published it. These are
          not entries the record wrote: they are the reason it is written.
        </p>
      </header>

      <div className="p-1 lg:p-2">
        <WorldPlate
          marks={marks}
          selectedId={picked?.id}
          onSelect={(m) => setPicked(picked?.id === m.id ? null : m)}
          label={`The founder's figures in ${marks.length} countries`}
        />
      </div>

      <div className="border-t border-[#141210]/20 px-4 py-4 lg:px-6" aria-live="polite">
        {chosen ? (
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-[#b3261e]">{chosen.place}</p>
            <dl className="mt-2 grid gap-3 sm:grid-cols-2">
              {chosen.figures.map((f) => (
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
          </div>
        ) : (
          <p className="text-[13px] leading-relaxed text-[#5a5246]">
            {marks.length} countries, {places.reduce((n, p) => n + p.figures.length, 0)} figures. Choose a
            country to read what is counted there. A country carrying more than one figure wears an
            extra ring. A figure whose source states no single country is not guessed onto the plate.
          </p>
        )}
      </div>
    </section>
  );
}