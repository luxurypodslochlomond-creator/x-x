import React from 'react';
import { Link } from 'react-router-dom';

export default function CartoonCaption({ cartoon }) {
  const { title, artist_name, origin, for_line, credit, source_url, crisis_id, crisis_title } = cartoon;
  return (
    <figcaption className="cartoon-caption">
      <p className="cartoon-byline record-meta">{artist_name}{origin && <span> · {origin}</span>}</p>
      {title && <h3>{title}</h3>}
      {for_line && <p className="cartoon-own-words record-meta" dir="auto">{for_line}</p>}
      {crisis_id && <Link className="cartoon-source" to={`/ClimateDetail/climate_crisis/${crisis_id}`}>Drawn about: {crisis_title || 'an entry on the record'} ↗</Link>}
      <div className="cartoon-provenance">
        {credit && <p className="record-meta">{credit}</p>}
        {source_url && <a className="cartoon-source" href={source_url} target="_blank" rel="noopener noreferrer">At its source ↗</a>}
      </div>
    </figcaption>
  );
}