import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// One drawing on the wall, and the three things that travel with it: who drew it, where
// it came from, and the drawer's own line on what it is for. The credit, where there is
// one, is set apart in the machine's small face because it is a fact about the drawing
// rather than part of what the drawing says.
//
// ── THE CAPTION WAS OUTWEIGHING THE DRAWING ────────────────────────────────────
// Five stacked blocks of text sat under every frame: title, drawn-by, the drawer's line,
// the full credit, and a link. Thirteen of those down a phone is a page of prose with
// pictures in the gaps, which is exactly what made the room read as old — a caption does
// not have to be that loud to be complete. The credit and the link are now one quiet line
// under a rule, so the drawing and the two things that identify it are what you see first.
const reading = { fontFamily: 'var(--font-reading)' };

export default function CartoonPlate({ cartoon, lead = false }) {
  const { image_url, title, artist_name, origin, for_line, credit, source_url } = cartoon || {};

  return (
    <figure className={`record-cartoon-plate record-media-mount bg-record-paper ${lead ? 'comic-plate-lead' : ''}`}>
      {/* One frame for every drawing on the wall, so a wall of pictures reads as a wall and
          not as a pile of different-shaped things. The drawing itself is never cropped: it
          sits whole inside the frame, with the paper showing round it. Four-by-three, because
          editorial cartoons are drawn wide and a portrait box made each one a stamp. */}
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-record-paper/70">
        <img
          src={image_url}
          alt={title || `A drawing by ${artist_name}`}
          loading={lead ? 'eager' : 'lazy'}
          className="block h-full w-full object-contain"
        />
      </div>
      <figcaption className="border-t-4 border-record-signal bg-record-bone px-3 py-2.5 lg:px-4 lg:py-3.5">
        {title && (
          <p className={`font-black leading-[1.18] tracking-[-.015em] text-record-ink ${lead ? 'text-[19px]' : 'text-[15.5px]'}`} style={reading}>
            {title}
          </p>
        )}
        <p className={`text-[12px] leading-[1.4] text-record-muted ${title ? 'mt-1' : ''}`} style={reading}>
          Drawn by <span className="font-bold text-record-ink">{artist_name}</span>
          {origin ? ` · ${origin}` : ''}
        </p>
        {for_line && (
          <p className={`mt-2 text-record-ink ${lead ? 'text-[14.5px] leading-[1.55]' : 'text-[13.5px] leading-[1.5]'}`} style={reading}>
            {for_line}
          </p>
        )}
        {(credit || source_url) && (
          <div className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-record-ink/15 pt-2">
            {credit && (
              <p className="font-mono text-[9.5px] uppercase leading-[1.5] tracking-[0.07em] text-record-muted">
                {credit}
              </p>
            )}
            {source_url && (
              <a
                href={source_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.07em] text-record-ink underline decoration-dotted underline-offset-2 hover:text-record-red"
              >
                Where it came from <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
              </a>
            )}
          </div>
        )}
      </figcaption>
    </figure>
  );
}