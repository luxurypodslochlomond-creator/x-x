import React from 'react';

// What the plate is holding, counted from the plate itself — never a figure about being
// looked at, and never a zero pretending where a count could not be made.
export default function MapFigures({ figures, loading, isError }) {
  const cells = [
    ['Entries standing', figures.placed, 'set where they happened'],
    ['Countries', figures.countries, 'region only, never a person'],
    ['Drawings', figures.drawings, 'hung on the same plate'],
    ['Known twice over', figures.second, 'a second origin named'],
  ];
  return (
    <dl className="record-map-figures">
      {cells.map(([label, value, note]) => (
        <div key={label} className="record-map-figure">
          <dd>{loading || isError ? '—' : value}</dd>
          <dt>{label}</dt>
          <p>{note}</p>
        </div>
      ))}
    </dl>
  );
}