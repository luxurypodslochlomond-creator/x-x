import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { resolveCoords } from './countryCentroids';
import { nudge } from './worldPlate';
import WorldPlate from './WorldPlate';

// Converts an ISO 2-letter country code to a display name, then to coords.
function countryName(code) {
  if (!code) return '';
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

// Dot size from the reads counted there — a gentle log curve, so a big country does not
// swallow a small one. Reads, never people.
function dotSize(views) {
  if (!views || views < 1) return 7;
  return Math.min(17, Math.max(8, 6 + Math.log2(views + 1) * 2.2));
}

/* ── THE PLANET, LIGHTING UP ───────────────────────────────────────────────────────
   Every place the record has been read from, on the same plate the Map page uses, so the
   two pages cannot disagree about the shape of the world. A press opens that place. */
export default function ImpactWorldMap({ stats }) {
  const navigate = useNavigate();
  const countries = stats?.countries || [];
  const regions = stats?.regions || [];

  const marks = useMemo(() => {
    const seen = {};
    const build = (list, kind) =>
      list
        .map((row) => {
          const name = kind === 'country' ? countryName(row.country) : row.region;
          const coord = resolveCoords(name, kind === 'country' ? row.country : row.region);
          if (!coord) return null;
          const key = `${coord[0]},${coord[1]}`;
          const i = seen[key] = (seen[key] ?? -1) + 1;
          const [dx, dy] = nudge(i);
          const place = kind === 'country' ? row.country : encodeURIComponent(name);
          return {
            id: `${kind}-${name}`,
            lat: coord[0],
            lng: coord[1],
            dx,
            dy,
            tone: kind,
            size: dotSize(row.views),
            label: `${name} · ${row.views.toLocaleString()} ${row.views === 1 ? 'read' : 'reads'}`,
            aria: `${name}, ${row.views.toLocaleString()} ${row.views === 1 ? 'read' : 'reads'}, open the stories`,
            to: createPageUrl(`ClimateReachPlace/${kind}/${place}`),
          };
        })
        .filter(Boolean);

    return [...build(countries, 'country'), ...build(regions, 'nation')];
  }, [countries, regions]);

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
          <span className="text-[#5a5246] normal-case">bigger dot · more reads</span>
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