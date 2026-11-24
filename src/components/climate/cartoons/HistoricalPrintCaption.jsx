import React from 'react';

export default function HistoricalPrintCaption({ work, viewer = false }) {
  return <div className="historical-print-caption">
    <p className="historical-print-move">{work.move}</p>
    {!viewer && <h3>{work.work}</h3>}
    <p className="historical-print-maker">{work.name}</p>
    <p className="historical-print-date">{work.dates}<br />{work.medium}</p>
    <p className="historical-print-context">{work.line}</p>
    <p className="historical-print-credit">{work.credit}<br />{work.licenceUrl ? <a href={work.licenceUrl} target="_blank" rel="noopener noreferrer">{work.licence}</a> : work.licence}</p>
    <div className="historical-print-links">
      <a href={work.source} target="_blank" rel="noopener noreferrer">Source &amp; credit ↗</a>
      {work.context && <a href={work.context} target="_blank" rel="noopener noreferrer">Read the context ↗</a>}
      {viewer && <a href={work.original || work.full} target="_blank" rel="noopener noreferrer">Open image ↗</a>}
    </div>
    {work.note && <p className="historical-print-note">{work.note}</p>}
  </div>;
}