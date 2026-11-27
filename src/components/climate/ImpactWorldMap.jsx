import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { reachPlaces } from './reachPlaces';
import WorldPlate from './WorldPlate';

/* ── THE PLANET, LIGHTING UP ───────────────────────────────────────────────────────
   Every place the record has been read from, on the same plate the Map page uses and on
   the same curve the band at the foot of every page uses — the places are worked out once,
   in reachPlaces, so no two of the three can ever draw the same count at a different size.
   A press opens that place.

   A read is one entry opened, by nobody the record knows: no account, no cookie, no
   address. Bigger dot means more reads, never more people. */
export default function ImpactWorldMap({ stats }) {
  const navigate = useNavigate();

  const marks = useMemo(
    () =>
      reachPlaces(stats).map((p) => ({
        id: p.id,
        lat: p.lat,
        lng: p.lng,
        dx: p.dx,
        dy: p.dy,
        tone: p.kind,
        size: p.size,
        label: `${p.name} · ${p.reads}`,
        aria: `${p.name}, ${p.reads}, open the stories`,
        to: createPageUrl(
          `ClimateReachPlace/${p.kind}/${p.kind === 'country' ? p.place : encodeURIComponent(p.name)}`
        ),
      })),
    [stats]
  );

  if (marks.length === 0) {
    return (
      <div className="border-2 border-[#141210] bg-[#f7f1e5]">
        <WorldPlate label="A map of the world, waiting for its first reads" />
        <p className="border-t border-[#141210]/20 px-3 py-3 text-[11px] font-mono leading-relaxed text-[#5a5246]">
          The planet is here. As the record is read around the world, this is where it will light up — every
          country, every nation, every read counted, and not one person named.
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-[#141210] bg-[#f7f1e5]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 py-2.5 border-b border-[#141210]/20">
        <p className="text-[10px] font-black font-mono uppercase tracking-[0.14em] text-[#141210]">
          {marks.length} {marks.length === 1 ? 'place' : 'places'} reading
        </p>
        <div className="flex items-center gap-3 text-[9px] font-mono font-bold uppercase tracking-[0.1em] text-[#141210]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: '#b3261e' }} />Country</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: '#0f5f7a' }} />Nation</span>
          <span className="text-[#5a5246] normal-case">bigger dot · more openings</span>
        </div>
      </div>

      <WorldPlate
        marks={marks}
        onSelect={(m) => navigate(m.to)}
        label={`The world, with ${marks.length} places reading the record`}
      />
    </div>
  );
}