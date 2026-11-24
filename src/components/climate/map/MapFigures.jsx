import React from 'react';

/* ── THE PLATE'S CAPTION, NOT A DASHBOARD ────────────────────────────────────────
   Four cells of tabular figures said four true things and read as a business-intelligence
   panel: numbers used as chrome, standing under a world. Brian, 24 November: "why has map
   numbers on it… feels like old technology."

   He was looking at the shape of it, not the facts. The facts are the honesty of this
   plate — what it is holding, in how many countries, how much of it is drawn, and how
   much a second origin also says — so none of them has been taken away. They are simply
   said once, in a sentence, in the record's reading voice, the way an engraved plate is
   captioned underneath rather than scored above. */
export default function MapFigures({ figures, loading, isError }) {
  const { placed, countries, drawings, second } = figures;

  if (isError) {
    return <p className="record-map-figures">The plate's own count could not be made. That is not the same as nothing being here.</p>;
  }
  if (loading) {
    return <p className="record-map-figures">Counting what the plate is holding…</p>;
  }
  if (!placed) {
    return <p className="record-map-figures">Nothing standing here has a stated place yet. Nothing is guessed onto the plate.</p>;
  }

  return (
    <p className="record-map-figures">
      {placed} {placed === 1 ? 'entry stands' : 'entries stand'} where their sources place {placed === 1 ? 'it' : 'them'},
      {' '}in {countries} {countries === 1 ? 'country' : 'countries'}.
      {drawings > 0 && ` ${drawings} ${drawings === 1 ? 'of them is a cartoon' : 'of them are cartoons'}.`}
      {second > 0 && ` ${second} ${second === 1 ? 'is known' : 'are known'} twice over, a second origin named.`}
    </p>
  );
}