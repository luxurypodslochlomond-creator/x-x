import React from 'react';
import { Link } from 'react-router-dom';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildDrawingShareCard, drawingShareLine } from '@/components/climate/cartoons/drawingCard';
import { recordOrigin } from '@/components/climate/recordAddress';
import { goalByNumber } from '@/components/climate/cartoons/cartoonGoals';

export default function CartoonCaption({ cartoon, instant = false }) {
  const { title, artist_name, origin, for_line, who_line, credit, source_url, crisis_id, crisis_title, goal } = cartoon;
  // A drawing offered from a goal's own panel says so where it hangs, in the goal's own name,
  // and points at the goal's own page — the same shape as the line above it for a crisis.
  const goalEntry = goal ? goalByNumber(goal) : null;
  return (
    <figcaption className="cartoon-caption">
      <p className="cartoon-byline record-meta">{artist_name}{origin && <span> · {origin}</span>}</p>
      {title && <h3>{title}</h3>}
      {/* Who the hand is, in the sender's own words, where the sender gave one. A line under
          one picture, never a profile page: most hands send nothing here, and the wall then
          says nothing rather than writing a biography nobody gave it. */}
      {who_line && <p className="cartoon-who-line record-meta" dir="auto">{who_line}</p>}
      {for_line && <p className="cartoon-own-words record-meta" dir="auto">{for_line}</p>}
      {crisis_id && <Link className="cartoon-source" to={`/ClimateDetail/climate_crisis/${crisis_id}`}>Drawn about: {crisis_title || 'an entry on the record'} ↗</Link>}
      {goalEntry && (
        <a className="cartoon-source" href={goalEntry.url} target="_blank" rel="noopener noreferrer">
          Offered for Goal {goalEntry.n} · {goalEntry.name} ↗
        </a>
      )}
      <div className="cartoon-provenance">
        {credit && <p className="record-meta">{credit}</p>}
        {source_url && <a className="cartoon-source" href={source_url} target="_blank" rel="noopener noreferrer">At its source ↗</a>}
        {/* The drawing as itself, ready to send — the picture whole, the artist's name,
            their own line. Read full size, this is where somebody decides to pass it on. */}
        <ShareCardButton
          inline
          instant={instant}
          entry={cartoon}
          build={buildDrawingShareCard}
          label="Share this drawing"
          description={drawingShareLine(cartoon)}
          link={`${recordOrigin()}/ClimateCartoons?drawing=${cartoon.id}`}
        />
      </div>
    </figcaption>
  );
}