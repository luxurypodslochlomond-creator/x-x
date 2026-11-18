import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// One drawing on the wall, and the three things that travel with it: who drew it, where
// it came from, and the drawer's own line on what it is for. The credit, where there is
// one, is set apart in the machine's small face because it is a fact about the drawing
// rather than part of what the drawing says.
const reading = { fontFamily: 'var(--font-reading)' };

export default function CartoonPlate({ cartoon }) {
  const { image_url, title, artist_name, origin, for_line, credit, source_url } = cartoon || {};

  return (
    <figure className="record-cartoon-plate record-media-mount bg-record-paper">
      {/* One frame for every drawing on the wall, so a wall of pictures reads as a wall and
          not as a pile of different-shaped things. The drawing itself is never cropped: it
          sits whole inside the frame, with the paper showing round it. */}
      {/* The frame is four-by-three, not four-by-five. Editorial cartoons are drawn wide —
          thirteen of them arrived landscape and were being hung in a portrait box, so each
          one sat small in the middle of a tall empty mat and the wall read as a set of
          stamps. Four-by-three is the shape the work actually is; a square drawing still
          sits whole inside it, and nothing is ever cropped. */}
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-record-paper/70">
        <img
          src={image_url}
          alt={title || `A drawing by ${artist_name}`}
          loading="lazy"
          className="block h-full w-full object-contain"
        />
      </div>
      <figcaption className="border-t-4 border-record-signal bg-record-bone px-3 py-3 lg:px-4 lg:py-4">
        {title && (
          <p className="text-[15px] font-semibold leading-[1.3] text-record-ink" style={reading}>
            {title}
          </p>
        )}
        <p className={`text-[12.5px] leading-[1.5] text-record-muted ${title ? 'mt-1' : ''}`} style={reading}>
          Drawn by <span className="font-semibold text-record-ink">{artist_name}</span>
          {origin ? ` · ${origin}` : ''}
        </p>
        {for_line && (
          <p className="mt-2 text-[14px] leading-[1.6] text-record-ink" style={reading}>
            {for_line}
          </p>
        )}
        {credit && (
          <p className="mt-2 font-mono text-[10px] uppercase leading-[1.6] tracking-[0.08em] text-record-muted">
            {credit}
          </p>
        )}
        {source_url && (
          <a
            href={source_url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[12.5px] text-record-ink underline decoration-dotted underline-offset-2 hover:text-record-red"
            style={reading}
          >
            Where it came from <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
          </a>
        )}
      </figcaption>
    </figure>
  );
}