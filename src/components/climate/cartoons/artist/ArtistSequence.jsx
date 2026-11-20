import React from 'react';
import { Link } from 'react-router-dom';

// ── ONE HAND'S DRAWINGS, IN THE ORDER THEY CAME ────────────────────────────────
// A cartoonist thinks in sequence: this one, then this one, and here is what the second
// answers in the first. So the work is not a grid of equal cards and it is not a list of
// rows — on a phone it is a strip you push through with a thumb, his order kept, the next
// drawing always peeking so a reader knows there is more.
//
// Every plate keeps the wall's own rules, unchanged: the picture whole and never cropped,
// the drawer's own line quoted as they wrote it, and the hand that made it never separated
// from the work. Nothing here is ranked, counted or liked — the order is simply the order
// it arrived in.
export default function ArtistSequence({ drawings }) {
  if (!drawings || !drawings.length) return null;

  return (
    <div className="hand-strip">
      {drawings.map((drawing) => (
        <article key={drawing.id} className="hand-plate">
          <Link to={`/ClimateCartoons?drawing=${drawing.id}`} aria-label={drawing.title ? `${drawing.title}, on the wall` : 'This drawing, on the wall'}>
            <img
              src={drawing.display_image_url}
              alt={drawing.title ? `${drawing.title}, by ${drawing.artist_name}` : `A drawing by ${drawing.artist_name}`}
              loading="lazy"
            />
          </Link>

          {drawing.title && <h3 className="hand-plate-title">{drawing.title}</h3>}

          {drawing.for_line && (
            <blockquote className="hand-plate-words" dir="auto">
              {drawing.for_line}
            </blockquote>
          )}

          <p className="hand-plate-meta">
            {[drawing.origin, drawing.country, drawing.credit].filter(Boolean).join(' · ') || 'Given to the record'}
          </p>

          <div className="hand-plate-links">
            <Link to={`/ClimateCartoons/Sheet/${drawing.id}`}>Its own sheet ↗</Link>
            <Link to={`/ClimateCartoons?drawing=${drawing.id}`}>On the wall ↗</Link>
            {drawing.crisis_id && <Link to={`/ClimateDetail/climate_crisis/${drawing.crisis_id}`}>What it answers ↗</Link>}
          </div>
        </article>
      ))}
    </div>
  );
}