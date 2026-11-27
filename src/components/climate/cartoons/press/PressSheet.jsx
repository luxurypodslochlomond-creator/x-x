import React from 'react';
import { Link } from 'react-router-dom';
import CartoonArtwork from '@/components/climate/cartoons/CartoonArtwork';
import cartoonSubject from '@/components/climate/cartoons/cartoonSubjects';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildDrawingShareCard, drawingShareLine } from '@/components/climate/cartoons/drawingCard';
import { cartoonSlug } from '@/components/climate/cartoons/cartoonSlug';
import { recordOrigin } from '@/components/climate/recordAddress';

// ── ONE DRAWING, GIVEN THE PAGE ────────────────────────────────────────────────
// A wall of equal cards makes every drawing the same size and every artist equally
// anonymous. This is a sheet instead: the picture runs at the width it deserves, and the
// words sit in a margin beside it — the hand that made it, where it came from, the title of
// the work, the drawer's own line set as a quotation, and the credit. Nothing is boxed,
// tinted, tilted or captioned with a black bar. The picture is the argument; the margin is
// the citation.
//
// Brian, 25 November: the room felt corporate. One reason was here, in the margin: the
// artist's name was set at .8rem and the record's own number at 2.6rem, so the machine's
// count shouted and the person's name whispered. The name now leads the margin and the
// number is the small red mark it always should have been — a count on this record belongs
// in the margin, never above the hand.
export default function PressSheet({ cartoon, index, lead = false, marked = false, onOpen }) {
  const { title, artist_name, origin, for_line, credit, source_url, crisis_id, crisis_title } = cartoon;
  return (
    <article className={`press-sheet${lead ? ' press-sheet--lead' : ''}${marked ? ' press-sheet--marked' : ''}`} id={`drawing-${cartoon.id}`}>
      <button
        type="button"
        className="press-sheet-art"
        onClick={onOpen}
        aria-label={`Look closer at ${title || 'this drawing'} by ${artist_name}`}
      >
        <CartoonArtwork cartoon={cartoon} lead={lead} linkSource={false} />
        <span className="press-sheet-look">Look closer ↗</span>
      </button>

      <div className="press-sheet-rail">
        <p className="press-sheet-number" aria-hidden="true">{String(index).padStart(2, '0')}</p>
        <p className="press-sheet-subject">{cartoonSubject(cartoon)}</p>
        {/* The hand comes before the title, and before every label this room prints. */}
        <p className="press-sheet-by">{artist_name}</p>
        {origin && <p className="press-sheet-origin">{origin}</p>}
        {title && <h3 className="press-sheet-title">{title}</h3>}
        {for_line && <blockquote className="press-sheet-words" dir="auto">{for_line}</blockquote>}
        {/* ── PASS THE DRAWING ON ──
            The wall had no way off it: a drawing could be looked at and printed, but never
            sent to anybody as itself. This is the card — the picture whole, the artist's
            name, where it came from, the drawer's own line quoted exactly — drawn on the
            reader's own device, in the tongue they have picked. */}
        <div className="press-sheet-share">
          <ShareCardButton
            inline
            instant
            entry={cartoon}
            build={buildDrawingShareCard}
            label="Share this drawing"
            description={drawingShareLine(cartoon)}
            includeMessage
            windowTitle="Share this drawing"
            alt={cartoon.title ? `${cartoon.title}, drawn by ${cartoon.artist_name}` : `A drawing by ${cartoon.artist_name}`}
            link={`${recordOrigin()}/w/${cartoonSlug(cartoon)}`}
          />
        </div>
        {crisis_id && (
          <Link className="press-sheet-link" to={`/ClimateDetail/climate_crisis/${crisis_id}`}>
            Drawn about: {crisis_title || 'an entry on the record'} ↗
          </Link>
        )}
        <div className="press-sheet-provenance">
          {credit && <p>{credit}</p>}
          {source_url && <a href={source_url} target="_blank" rel="noopener noreferrer">At its source ↗</a>}
          {/* Two addresses a cartoonist can carry away: the drawing as a sheet to print and
              hang, and every drawing they have given the record, on one page of their own. */}
          <Link to={`/ClimateCartoons/Sheet/${cartoon.id}`}>Print this drawing ↗</Link>
          <Link to={`/ClimateCartoons/Artist/${encodeURIComponent(artist_name)}`}>Every drawing by {artist_name} ↗</Link>
        </div>
      </div>
    </article>
  );
}