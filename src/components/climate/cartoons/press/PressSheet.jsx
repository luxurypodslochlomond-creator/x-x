import React from 'react';
import { Link } from 'react-router-dom';
import { Maximize2 } from 'lucide-react';
import CartoonArtwork from '@/components/climate/cartoons/CartoonArtwork';
import cartoonSubject from '@/components/climate/cartoons/cartoonSubjects';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildDrawingShareCard, drawingShareLine } from '@/components/climate/cartoons/drawingCard';
import { cartoonSlug } from '@/components/climate/cartoons/cartoonSlug';
import entryHref from '@/components/climate/cartoons/entryHref';
import { recordOrigin } from '@/components/climate/recordAddress';
import DrawingConnections from '@/components/climate/cartoons/DrawingConnections';
import CartoonCredit from '@/components/climate/cartoons/CartoonCredit';

export default function PressSheet({ cartoon, index, lead = false, marked = false, onOpen }) {
  const { title, artist_name, origin, for_line, credit, source_url, crisis_id, crisis_title } = cartoon;
  return <article className={`press-sheet${lead ? ' press-sheet--lead' : ''}${marked ? ' press-sheet--marked' : ''}`} id={`drawing-${cartoon.id}`}>
    <button type="button" className="press-sheet-art" onClick={onOpen} title="Open drawing full size" aria-label={`Open ${title || 'this drawing'} by ${artist_name}, full size`}>
      <CartoonArtwork cartoon={cartoon} lead={lead} linkSource={false} />
      <span className="press-sheet-look wall-art-mark" aria-hidden="true"><Maximize2 size={19} /></span>
    </button>
    <div className="press-sheet-rail">
      <div className="press-sheet-meta">
        <p className="press-sheet-number" aria-hidden="true">{String(index).padStart(2, '0')}</p>
        <p className="press-sheet-subject">{cartoonSubject(cartoon)}</p>
        <ShareCardButton inline iconOnly instant entry={cartoon} build={buildDrawingShareCard}
          label={`Share ${title || 'this drawing'} by ${artist_name}`} description={drawingShareLine(cartoon)}
          includeMessage windowTitle="Share this drawing"
          alt={title ? `${title}, drawn by ${artist_name}` : `A drawing by ${artist_name}`}
          link={`${recordOrigin()}/w/${cartoonSlug(cartoon)}`} />
      </div>
      <p className="press-sheet-by">{artist_name}</p>
      {origin && <p className="press-sheet-origin">{origin}</p>}
      {title && <h3 className="press-sheet-title">{title}</h3>}
      {for_line && <blockquote className="press-sheet-words" dir="auto">{for_line}</blockquote>}
      {crisis_id && <Link className="press-sheet-link" to={entryHref(cartoon)}>Drawn about: {crisis_title || 'an entry on the record'}</Link>}
      <DrawingConnections cartoon={cartoon} />
      <div className="press-sheet-provenance">
        <CartoonCredit credit={credit} />
        <div className="press-sheet-links">
          {source_url && <a href={source_url} target="_blank" rel="noopener noreferrer">Source ↗</a>}
          <Link to={`/ClimateCartoons/Sheet/${cartoon.id}`}>Print</Link>
          <Link to={`/ClimateCartoons/Artist/${encodeURIComponent(artist_name)}`} aria-label={`Every drawing by ${artist_name}`}>Artist’s wall</Link>
        </div>
      </div>
    </div>
  </article>;
}