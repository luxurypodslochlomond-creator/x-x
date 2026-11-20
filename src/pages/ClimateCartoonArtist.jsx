import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import cartoonImageSource from '@/components/climate/cartoons/cartoonImageSources';
import ArtistSequence from '@/components/climate/cartoons/artist/ArtistSequence';
import HandAddress from '@/components/climate/cartoons/artist/HandAddress';
import { recordOrigin } from '@/components/climate/recordAddress';
import '@/components/climate/cartoons/artist/hand-page.css';

// ── ONE HAND'S PAGE IN THE ROOM ────────────────────────────────────────────────
// Every cartoonist on this wall gets one address of their own, holding everything they have
// given the record, in their name. It is the thing a cartoonist has never had: not a profile
// on somebody's gallery, but a page on a record — sendable to a paper, a festival, a ministry
// or a school, and still the same page in ten years.
//
// It wears the same page Francis has, because they are the same page: a drawing first, at the
// width of the glass, and the hand's name under it like a signature in a print's margin. What
// it used to open with was "One hand · on the wall", the artist's name as a headline, and then
// a line of counts — one drawing, from here, drawn about two entries. That is a profile
// summarising a person before showing the person's work, which is the shape Brian called
// hollow. The counts are facts and they are still on the page; they are just not the greeting.
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

  const address = `${recordOrigin()}/ClimateCartoons/Artist/${encodeURIComponent(artist)}`;
  const lead = drawings && drawings.length ? drawings[0] : null;
  const rest = drawings && drawings.length > 1 ? drawings.slice(1) : [];
  const places = [...new Set((drawings || []).map((drawing) => drawing.origin).filter(Boolean))];
  const country = (drawings || []).find((drawing) => drawing.country)?.country || '';

  return (
    <ClimateRecordShell
      compact
      wide
      eyebrow="The record · the cartoon room"
      returnTo="/ClimateCartoons"
      returnLabel="Back to the room of cartoons"
      footer="Every drawing keeps the name of the hand that made it, where it came from, and the drawer’s own line."
    >
      <div className="hand-page">
        {drawings !== null && drawings.length === 0 && (
          <section className="hand-section">
            <h2 className="hand-head">Nothing on the wall under this name yet</h2>
            <p className="hand-open-what" style={{ textTransform: 'none', letterSpacing: 0, fontSize: '.9rem' }}>
              <Link to="/ClimateCartoons#cartoon-drawing-desk" style={{ color: 'rgb(var(--record-red))', textDecoration: 'underline' }}>
                Draw one
              </Link>{' '}
              and it goes up on this wall, under this name.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <HandAddress address={address} />
            </div>
          </section>
        )}

        {/* ── THE FIRST DRAWING, AND THE HAND UNDER IT ────────────────────────
            The newest thing they gave the record, whole and uncropped, with nothing of ours
            printed on it. The name is set under it as a signature, not above it as a title. */}
        {lead && (
          <figure className="hand-open">
            <Link to={`/ClimateCartoons/Sheet/${lead.id}`} aria-label={lead.title ? `${lead.title}, its own sheet` : 'This drawing, its own sheet'}>
              <img
                src={lead.display_image_url}
                alt={lead.title ? `${lead.title}, by ${lead.artist_name}` : `A drawing by ${lead.artist_name}`}
                loading="eager"
                decoding="async"
              />
            </Link>
            <figcaption className="hand-signed">
              <span className="hand-rule" aria-hidden="true" />
              <span className="hand-signed-name">{lead.artist_name || artist}</span>
            </figcaption>
            {(lead.title || lead.for_line) && (
              <p className="hand-open-what" style={{ textTransform: 'none', letterSpacing: 0, fontSize: '.92rem', fontFamily: 'var(--font-reading)', color: 'rgb(var(--record-ink) / .85)' }}>
                {lead.title || lead.for_line}
              </p>
            )}
          </figure>
        )}

        {/* ── THE REST, IN THE ORDER THEY CAME ────────────────────────────────
            A cartoonist thinks in sequence, so the rest of the work runs as a strip on a
            phone and a sheet on a desk — their order, not ours. */}
        {rest.length > 0 && (
          <section className="hand-section">
            <h2 className="hand-head">
              {rest.length === 1 ? 'One more drawing' : `${rest.length} more drawings`}
            </h2>
            <ArtistSequence drawings={rest} />
            <p className="hand-where">
              In the order they arrived. Push the strip sideways, or open any sheet to print it.
            </p>
          </section>
        )}

        {/* ── THE ADDRESS ──────────────────────────────────────────────────── */}
        {drawings !== null && drawings.length > 0 && (
          <section className="hand-section">
            <h2 className="hand-head">Send this address</h2>
            <HandAddress address={address} />
            <p className="hand-where">
              {[country, places.join(' · ')].filter(Boolean).join(' · ') || 'On the wall'}
              {' — send it to a paper, a festival, a ministry or a school. The address does not move.'}
            </p>
          </section>
        )}
      </div>
    </ClimateRecordShell>
  );
}