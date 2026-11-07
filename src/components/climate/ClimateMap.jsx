import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import FitWorld, { WORLD_BOUNDS } from './FitWorld';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { resolveCoords } from './countryCentroids';
import { useClimateCategories } from '@/hooks/useClimateCategories';

/* ── THE MARKS DO NOT MAKE AN ENTRANCE ─────────────────────────────────────────────
   Every mark used to light one longitude at a time over eight seconds, so the world
   filled in from west to east — a signal arriving, an album's idea of a transmission.
   The cost of that piece of theatre was that a reader who reached the map was shown
   half a world and had to wait for the other half, on every visit, for a fact.

   A mark is information. It appears in four hundred milliseconds and then it stays
   absolutely still, which is the only thing a map of what is happening should do. */
const makeIcon = (type) => {
  const isCrisis = type === 'climate_crisis';
  const isAction = type === 'action';
  const fadeIn = 'animation:climate-marker-in 0.4s ease-out both;';

  if (isCrisis) {
    return L.divIcon({
      className: 'climate-marker-crisis',
      /* A crisis used to wear a pulse that rang outward forever. On a map holding two
         hundred crises that is two hundred animations that never stop, and on a phone they
         are what makes the map feel sticky under a finger. The marker keeps its warning
         colour, its halo and its glow — it simply stops pulsing when nothing is happening. */
      html: `<div style="${fadeIn}"><div style="position:relative;width:14px;height:14px;"><div style="position:absolute;inset:-6px;border:2px solid #b3261e;border-radius:50%;opacity:.55;"></div><div style="position:absolute;inset:0;width:14px;height:14px;background:#b3261e;border:2px solid #efe7d6;border-radius:50%;box-shadow:0 0 10px rgba(179,38,30,0.7);"></div></div></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      popupAnchor: [0, -8],
    });
  }
  if (isAction) {
    return L.divIcon({
      className: 'climate-marker-action',
      html: `<div style="${fadeIn}"><div style="position:relative;width:11px;height:11px;"><div style="position:absolute;inset:-4px;border:1px solid #1e3a2b;border-radius:50%;animation:climate-reveal 0.6s ease-out 0.2s both;"></div><div style="width:11px;height:11px;background:#1e3a2b;border:2px solid #efe7d6;transform:rotate(45deg);box-shadow:0 0 8px rgba(30,58,43,0.5);"></div></div></div>`,
      iconSize: [11, 11],
      iconAnchor: [5, 5],
      popupAnchor: [0, -6],
    });
  }
  // solution
  return L.divIcon({
    className: 'climate-marker-solution',
    html: `<div style="${fadeIn}"><div style="position:relative;width:11px;height:11px;"><div style="position:absolute;inset:-4px;border:1px solid #1a1612;border-radius:50%;animation:climate-reveal 0.6s ease-out 0.2s both;"></div><div style="width:11px;height:11px;background:#1a1612;border:2px solid #efe7d6;box-shadow:0 0 6px rgba(26,22,18,0.5);"></div></div></div>`,
    iconSize: [11, 11],
    iconAnchor: [5, 5],
    popupAnchor: [0, -6],
  });
};

// Spiral offset so markers in the same country don't overlap
const spiralOffset = (index) => {
  if (index === 0) return [0, 0];
  const angle = (index * 137.5) * Math.PI / 180;
  const radius = 0.6 + index * 0.25;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
};

export default function ClimateMap() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishedTotal, setPublishedTotal] = useState(0);
  const { categories } = useClimateCategories();
  const catLabel = (catId) => categories.find(c => c.id === catId)?.label || (catId || '').replaceAll('_', ' ');

  useEffect(() => {
    const load = async () => {
      try {
        const [solutions, actions, solutionTotal, actionTotal] = await Promise.all([
          base44.entities.ClimateSolution.filter(
            { status: 'published' },
            { limit: 200, fields: ['title', 'summary', 'category', 'entry_type', 'country', 'region_rough'] }
          ),
          base44.entities.ClimateAction.filter(
            { status: 'published' },
            { limit: 200, fields: ['title', 'description', 'category', 'action_type', 'country', 'region_rough', 'date'] }
          ),
          // How many entries are published in total, so the counter can never claim the
          // map holds everything when it does not: a row with no place we can put it
          // never silently disappears from the count.
          base44.entities.ClimateSolution.count({ status: 'published' }),
          base44.entities.ClimateAction.count({ status: 'published' }),
        ]);
        setPublishedTotal((solutionTotal || 0) + (actionTotal || 0));

        const mapped = [
          ...(solutions.items || []).map(s => ({
            id: s.id, type: s.entry_type || 'solution',
            title: s.title, summary: s.summary || s.details || '',
            category: s.category, country: s.country, region: s.region_rough,
          })),
          ...(actions.items || []).map(a => ({
            id: a.id, type: 'action',
            title: a.title, summary: a.description || '',
            category: a.category, country: a.country, region: a.region_rough,
          })),
        ];

        setEntries(mapped);
      } catch (e) {
        // silent — map still renders empty
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Group by country key, then assign spiral offsets
  const markers = useMemo(() => {
    const withCoords = entries
      .map(e => {
        const base = resolveCoords(e.country, e.region);
        return base ? { ...e, base } : null;
      })
      .filter(Boolean);

    // Group by base coordinate key to spiral same-country markers
    const groups = {};
    withCoords.forEach(e => {
      const key = `${e.base[0]},${e.base[1]}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(e);
    });

    const result = [];
    Object.values(groups).forEach(group => {
      group.forEach((e, i) => {
        const [dx, dy] = spiralOffset(i);
        result.push({ ...e, coord: [e.base[0] + dx, e.base[1] + dy] });
      });
    });
    return result;
  }, [entries]);

  const crisisCount = markers.filter(m => m.type === 'climate_crisis').length;
  const solutionCount = markers.filter(m => m.type === 'solution').length;
  const actionCount = markers.filter(m => m.type === 'action').length;

  return (
    <div className="relative w-full h-full">
      <style>{`
        @keyframes climate-marker-in {
          from { opacity: 0; transform: scale(0.15); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes climate-reveal {
          0% { transform: scale(0.5); opacity: 0.9; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        /* ── THE MAP HOLDS STILL ─────────────────────────────────────────────────────
           This was a seven-second breathing animation on the tile pane: a CSS filter
           changing every frame over a hundred map tiles. A filter on a tile pane cannot be
           done by the compositor — the browser has to repaint every tile, sixty times a
           second, for as long as the page is open. That is the whole of the lag on this
           page, and the same fault was on the impact map. The warm colour stays exactly as
           it was; only the perpetual repaint is gone. */
        .climate-map .leaflet-tile-pane {
          filter: sepia(0.28) contrast(0.88) brightness(1.06) hue-rotate(-8deg) saturate(0.7);
        }
        .climate-map .leaflet-container {
          background: #efe7d6;
          font-family: var(--font-body);
        }
        .climate-map .leaflet-popup-content-wrapper {
          background: #efe7d6;
          border: 2px solid #1a1612;
          border-radius: 0;
          box-shadow: 0 6px 24px rgba(0,0,0,0.35);
          padding: 0;
        }
        .climate-map .leaflet-popup-content {
          margin: 0;
          width: 230px !important;
          max-height: 280px;
          overflow-y: auto;
        }
        .climate-map .leaflet-popup-tip {
          background: #efe7d6;
          border: 2px solid #1a1612;
          box-shadow: none;
        }
        .climate-map .leaflet-popup-close-button {
          color: #efe7d6 !important;
          font-size: 20px !important;
          top: 4px !important;
          right: 6px !important;
          width: 20px !important;
          height: 20px !important;
          z-index: 10;
        }
        .climate-map .leaflet-control-zoom a {
          background: #efe7d6 !important;
          border-color: #1a1612 !important;
          color: #1a1612 !important;
          font-family: monospace !important;
        }
        .climate-map .leaflet-control-attribution {
          background: rgba(233,238,236,0.85) !important;
          font-size: 8px !important;
          font-family: monospace !important;
        }
        /* On a phone the ground holds still. The map keeps exactly its warm colour, but the
           full-screen breathing filter and the grain stop repainting sixty times a second —
           that is what made the map feel heavy in the hand on a small screen. */
        @media (max-width: 1023px) {
          .climate-map .leaflet-tile-pane { animation: none; }
        }
      `}</style>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        zoomSnap={0}
        /* The floor is set from the frame's own size by FitWorld, so the world always covers
           it. A fixed floor of 0 let a desktop zoom out past the world and sit in grey. */
        maxZoom={8}
        maxBounds={WORLD_BOUNDS}
        maxBoundsViscosity={1}
        scrollWheelZoom={true}
        className="climate-map"
        style={{ height: '100%', width: '100%', background: '#efe7d6' }}
      >
        <FitWorld />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri, US National Park Service'
          maxZoom={8}
          noWrap={true}
        />

        {markers.map((m) => (
          <Marker key={m.id} position={m.coord} icon={makeIcon(m.type)}>
            <Popup>
              <div style={{ fontFamily: 'var(--font-body)' }}>
                <div style={{
                  background: m.type === 'climate_crisis' ? '#b3261e' : m.type === 'action' ? '#1e3a2b' : '#1a1612',
                  color: '#efe7d6',
                  padding: '6px 10px',
                  fontSize: '8px',
                  fontWeight: 900,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: '#efe7d6', display: 'inline-block',
                  }} />
                  {m.type === 'climate_crisis' ? 'CRISIS' : m.type === 'action' ? 'ACTION' : 'SOLUTION'}
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{
                    fontSize: '13px', fontWeight: 900, color: '#1a1612',
                    lineHeight: 1.25, marginBottom: '6px',
                  }}>
                    {m.title}
                  </div>
                  {m.summary && (
                    <div style={{
                      fontSize: '10px', color: '#6b6258', lineHeight: 1.4,
                      marginBottom: '8px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {m.summary}
                    </div>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    {m.category && (
                      <span style={{
                        fontSize: '7px', fontWeight: 900, textTransform: 'uppercase',
                        letterSpacing: '0.08em', color: '#b3261e',
                        border: '1px solid #b3261e', padding: '2px 5px',
                      }}>
                        {catLabel(m.category)}
                      </span>
                    )}
                    {(m.country || m.region) && (
                      <span style={{
                        fontSize: '7px', fontWeight: 900, textTransform: 'uppercase',
                        letterSpacing: '0.08em', color: '#6b6258',
                        border: '1px solid #6b6258', padding: '2px 5px',
                      }}>
                        {m.country || m.region}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/ClimateDetail/${m.type === 'action' ? 'action' : 'solution'}/${m.id}`}
                    style={{
                      display: 'block', textAlign: 'center',
                      background: '#1a1612', color: '#efe7d6',
                      padding: '6px 10px', fontSize: '9px',
                      fontWeight: 900, textTransform: 'uppercase',
                      letterSpacing: '0.1em', textDecoration: 'none',
                    }}
                  >
                    Open record →
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* ── NOTHING MOVES ACROSS THE MAP ─────────────────────────────────────────────
          A scanline sat over the whole map, a signal line crossed the world in eight
          seconds on every visit, and a cool glow rose from the bottom edge. All three
          went the same way as the album they came from: this map is a page of the record
          now, and the record does not overlay a drawing on top of its own facts. What is
          left is the paper's own vignette at the edges, which does not move. */}

      {/* Vignette — the edges fade into paper */}
      <div
        className="absolute inset-0 pointer-events-none z-[400]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(239,231,214,0.4) 100%)',
        }}
      />

      {/* ── SAID IN THE RECORD'S WORDS, ON THE RECORD'S PAPER ────────────────────────
          This was a near-black panel with a pulsing dot reading N SIGNALS, and a dark
          legend box in the corner — a dashboard bolted onto the drawing. The record does
          not have signals; it has entries, and it counts them out loud, including the ones
          it cannot place. So the count is a line of paper type that admits the gap, and the
          legend is three words on the same paper as the page beneath it. */}
      <div className="absolute top-3 right-3 z-[1000] bg-[#efe7d6]/95 border border-[#141210]/40 px-2.5 py-2 pointer-events-none">
        <span className="text-[9px] font-bold font-mono text-[#141210]">
          {loading
            ? 'Placing the entries…'
            : markers.length < publishedTotal
              ? `${markers.length} of ${publishedTotal} entries placed`
              : `${markers.length} entries placed`}
        </span>
        {!loading && markers.length < publishedTotal && (
          <span className="block text-[8px] font-mono text-[#5a5246] mt-0.5">
            the rest have no place they can honestly be put
          </span>
        )}
      </div>

      {/* Legend — bottom left, on the page's own paper */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#efe7d6]/95 border border-[#141210]/40 px-2.5 py-2 pointer-events-none">
        <div className="flex items-center gap-3 text-[9px] font-mono text-[#141210]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#b3261e]" />{crisisCount}</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#1a1612]" />{solutionCount}</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#1e3a2b] rotate-45" />{actionCount}</span>
        </div>
      </div>

      {/* While the entries are being placed, the page says so quietly. */}
      {loading && (
        <div className="absolute inset-0 z-[1100] bg-[#efe7d6] flex items-center justify-center pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#5a5246]">Placing the entries…</span>
        </div>
      )}
    </div>
  );
}