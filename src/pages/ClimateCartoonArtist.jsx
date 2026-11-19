import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';
import { recordOrigin } from '@/components/climate/recordAddress';
import '@/components/climate/cartoons/sheet/sheet.css';

// ── ONE HAND'S PAGE IN THE ROOM ────────────────────────────────────────────────
// Every cartoonist on this wall gets one address of their own, holding everything they have
// given the record, in their name. It is the thing a cartoonist has never had: not a profile
// on somebody's gallery, but a page on a record — sendable to a paper, a festival, a ministry
// or a school, and still the same page in ten years.
//
// It shows only what the wall already shows. Nothing unpublished can be reached from here,
// and the address is built from the artist's own name, never from an email or an account.
export default function ClimateCartoonArtist() {
  const { name } = useParams();
  const artist = name || '';
  const [drawings, setDrawings] = useState(null);

  useEffect(() => {
    let cancelled = false;
    base44.entities.ClimateCartoon
      .filter({ artist_name: artist, status: 'published' }, { sort: '-created_date', limit: 60 })
      .then((page) => {
        if (cancelled) return;
        setDrawings((page?.items || []).map((drawing) => ({ ...drawing, display_image_url: cartoonImageSource(drawing) })));
      })
      .catch(() => { if (!cancelled) setDrawings([]); });
    return () => { cancelled = true; };
  }, [artist]);

  const places = [...new Set((drawings || []).map((drawing) => drawing.origin).filter(Boolean))];
  const about = [...new Set((drawings || []).map((drawing) => drawing.crisis_title).filter(Boolean))];
  const address = `${recordOrigin()}/ClimateCartoons/Artist/${encodeURIComponent(artist)}`;

  return (
    <ClimateRecordShell
      compact
      eyebrow="The record · the cartoon room"
      returnTo="/ClimateCartoons"
      returnLabel="Back to the room of cartoons"
      footer="Every drawing keeps the name of the hand that made it, where it came from, and the drawer’s own line."
    >
      <div className="artist-page">
        <header className="artist-head">
          <p className="artist-kicker">One hand · on the wall</p>
          <h1 className="artist-name">{artist}</h1>
          <p className="artist-line">
            {drawings === null
              ? 'Opening their drawings…'
              : drawings.length === 1
                ? 'One drawing on the record.'
                : `${drawings.length} drawings on the record.`}
            {places.length ? ` From ${places.join(' · ')}.` : ''}
            {about.length ? ` Drawn about ${about.length === 1 ? 'one entry' : `${about.length} entries`} on the record.` : ''}
          </p>
          <p className="artist-line">This is their address: <span className="sheet-address">{address.replace(/^https?:\/\//, '')}</span></p>
        </header>

        {drawings !== null && drawings.length === 0 && (
          <p className="artist-line">
            Nothing is on the wall under this name yet. <Link to="/ClimateCartoons">The room of cartoons</Link> is where a drawing is given.
          </p>
        )}

        <div className="artist-list">
          {(drawings || []).map((drawing) => (
            <article key={drawing.id} className="artist-drawing">
              <div className="artist-art">
                <img
                  src={drawing.display_image_url}
                  alt={drawing.title ? `${drawing.title}, by ${drawing.artist_name}` : `A drawing by ${drawing.artist_name}`}
                  loading="lazy"
                />
              </div>
              <div className="artist-rail">
                {drawing.title && <h2 className="artist-title">{drawing.title}</h2>}
                {drawing.for_line && <blockquote className="artist-words" dir="auto">{drawing.for_line}</blockquote>}
                <p className="artist-meta">
                  {[drawing.origin, drawing.country, drawing.credit].filter(Boolean).join(' · ') || 'Given to the record'}
                </p>
                <div className="artist-links">
                  <Link to={`/ClimateCartoons/Sheet/${drawing.id}`}>Its own sheet ↗</Link>
                  <Link to={`/ClimateCartoons?drawing=${drawing.id}`}>On the wall ↗</Link>
                  {drawing.crisis_id && (
                    <Link to={`/ClimateDetail/climate_crisis/${drawing.crisis_id}`}>What it answers ↗</Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </ClimateRecordShell>
  );
}