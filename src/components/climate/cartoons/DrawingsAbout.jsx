import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

// ── THE OTHER END OF THE LINK ─────────────────────────────────────────────────
// Brian, 18 November: "can be linked to climate crises entries and platform bro". This is
// the crisis's end of it. Where a drawing was offered about this entry, the entry shows it:
// the crisis gets a face, and a reader who has just read what is happening can see what
// somebody drew about it. Nothing is shown unless a keeper has put the drawing on the wall,
// so this can never become a back door onto unpublished work.
//
// The block prints nothing at all when there are no drawings — no heading, no empty state,
// no invitation. A crisis that nobody has drawn yet should read as a crisis, not as a page
// with a gap in it.
export default function DrawingsAbout({ entryId }) {
  const [drawings, setDrawings] = useState(null);

  useEffect(() => {
    let cancelled = false;
    base44.entities.ClimateCartoon
      .filter({ crisis_id: entryId, status: 'published' }, { sort: '-created_date', limit: 12 })
      .then((page) => { if (!cancelled) setDrawings(page?.items || []); })
      .catch(() => { if (!cancelled) setDrawings([]); });
    return () => { cancelled = true; };
  }, [entryId]);

  if (!drawings || drawings.length === 0) return null;

  return (
    <section className="mt-6 border-t-2 border-[#141210] pt-4">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-[#6b6258]">
        Drawn about this · {drawings.length}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {drawings.map((drawing) => (
          <Link
            key={drawing.id}
            to="/ClimateCartoons"
            className="block border-2 border-[#141210] bg-[#f7f1e5]"
          >
            <img
              src={drawing.image_url}
              alt={drawing.title || `A drawing by ${drawing.artist_name}`}
              loading="lazy"
              className="block aspect-[4/3] w-full bg-[#efe7d6] object-contain"
            />
            <p className="border-t border-[#141210]/20 px-2 py-1.5 text-[11px] leading-tight">
              <span className="font-bold">{drawing.artist_name}</span>
            </p>
          </Link>
        ))}
      </div>
      <Link
        to="/ClimateCartoons"
        className="mt-3 inline-block text-[12px] font-semibold underline decoration-2 underline-offset-2"
      >
        The room of cartoons
      </Link>
    </section>
  );
}