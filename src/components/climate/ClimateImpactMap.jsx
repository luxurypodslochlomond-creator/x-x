import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import FitWorld, { WORLD_BOUNDS } from './FitWorld';
import { createPageUrl } from '@/utils';
import { resolveCoords } from './countryCentroids';

// Converts an ISO 2-letter country code to a display name, then to coords.
function countryName(code) {
  if (!code) return '';
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

// Dot radius scaled by view count — gentle log curve so big countries don't swallow small ones
function dotRadius(views) {
  if (!views || views < 1) return 4;
  return Math.min(18, Math.max(5, 4 + Math.log2(views + 1) * 2.5));
}

export default function ClimateImpactMap({ stats }) {
  const navigate = useNavigate();
  const countries = stats?.countries || [];
  const regions = stats?.regions || [];

  // Resolve every country and self-identified nation to a coordinate
  const points = useMemo(() => {
    const cPoints = countries
      .map((c) => {
        const name = countryName(c.country);
        const coord = resolveCoords(name, c.country);
        return coord ? { coord, label: name, views: c.views, kind: 'country', code: c.country } : null;
      })
      .filter(Boolean);

    const rPoints = regions
      .map((r) => {
        const coord = resolveCoords(r.region, r.region);
        return coord ? { coord, label: r.region, views: r.views, kind: 'nation' } : null;
      })
      .filter(Boolean);

    return [...cPoints, ...rPoints];
  }, [countries, regions]);

  if (points.length === 0) {
    return (
      <div className="px-5 py-12 text-center bg-[#f7f1e5] border-y border-[#141210]/10">
        <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed max-w-[280px] mx-auto">
          The map will light up as the record is read around the world. Every dot is a place reads came from. No IP. No tracker. Just the signal.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[340px] sm:h-[560px]">
      <style>{`
        @keyframes impact-breathe {
          0%, 100% { filter: sepia(0.28) contrast(0.88) brightness(1.06) hue-rotate(-8deg) saturate(0.7); }
          50% { filter: sepia(0.32) contrast(0.9) brightness(1.12) hue-rotate(-6deg) saturate(0.75); }
        }
        @keyframes impact-ping {
          0% { transform: scale(0.8); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        /* Same fault as the record's map, and the same fix: a CSS filter animated over a
           tile pane forces a full repaint of every tile, every frame. The colour is kept,
           the perpetual repaint is not. */
        .impact-map .leaflet-tile-pane {
          filter: sepia(0.28) contrast(0.88) brightness(1.06) hue-rotate(-8deg) saturate(0.7);
        }
        .impact-map .leaflet-container {
          background: #efe7d6;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        .impact-map .leaflet-control-zoom a {
          background: #efe7d6 !important;
          border-color: #1a1612 !important;
          color: #1a1612 !important;
          font-family: monospace !important;
        }
        .impact-map .leaflet-control-attribution {
          background: rgba(233,238,236,0.85) !important;
          font-size: 8px !important;
          font-family: monospace !important;
        }
        .impact-map .leaflet-tooltip {
          background: #141210;
          color: #efe7d6;
          border: none;
          border-radius: 0;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 8px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.4);
        }
        .impact-map .leaflet-tooltip-top:before { border-top-color: #141210; }
        .impact-map .leaflet-tooltip-bottom:before { border-bottom-color: #141210; }
      `}</style>

      <MapContainer
        center={[20, 0]}
        zoom={1}
        zoomSnap={0}
        minZoom={0}
        maxZoom={6}
        scrollWheelZoom={true}
        zoomControl={true}
        className="impact-map"
        style={{ height: '100%', width: '100%', background: '#efe7d6' }}
        maxBounds={WORLD_BOUNDS}
        maxBoundsViscosity={1}
      >
        <FitWorld />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri, US National Park Service'
          maxZoom={8}
          noWrap={true}
        />

        {points.map((p, i) => {
          const r = dotRadius(p.views);
          const isNation = p.kind === 'nation';
          const fill = isNation ? '#0f5f7a' : '#b3261e';
          return (
            <CircleMarker
              key={`${p.kind}-${i}`}
              center={p.coord}
              radius={r}
              pathOptions={{
                color: isNation ? '#0f5f7a' : '#b3261e',
                weight: isNation ? 2 : 1.5,
                fillColor: fill,
                fillOpacity: 0.55,
              }}
              eventHandlers={{
                click: () => {
                  const place = isNation ? encodeURIComponent(p.label) : p.code;
                  navigate(createPageUrl(`ClimateReachPlace/${isNation ? 'nation' : 'country'}/${place}`));
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -r]} opacity={1}>
                <span style={{ display: 'block', fontWeight: 900 }}>
                  {isNation ? '🏳️ ' : ''}{p.label}
                </span>
                <span style={{ display: 'block', opacity: 0.7, fontSize: '9px', marginTop: '2px' }}>
                  {p.views.toLocaleString()} {p.views === 1 ? 'read' : 'reads'}
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#efe7d6]/95 border-2 border-[#1a1612] p-2.5 pointer-events-none">
        <div className="text-[7px] font-black font-mono uppercase tracking-widest text-[#1a1612] mb-1.5">READS BY PLACE</div>
        {/* The swatches carry the dots' own colours as they are actually drawn. The record's
            palette remaps warm classes inside .climate-record, so a class here would show a
            different colour from the dot on the map — and a legend that disagrees with the
            thing it explains is worse than no legend. */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#b3261e' }} />
          <span className="text-[8px] font-mono font-bold text-[#1a1612]">COUNTRY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#0f5f7a' }} />
          <span className="text-[8px] font-mono font-bold text-[#1a1612]">NATION 🏳️</span>
        </div>
        <div className="text-[7px] font-mono text-[#5a5246] mt-1.5 leading-tight max-w-[132px] uppercase">Bigger dot · more reads counted</div>
      </div>

      {/* Scanline overlay — cold transmission signal */}
      <div
        className="absolute inset-0 pointer-events-none z-[400]"
        style={{
          opacity: 0.05,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #1a1612 2px, #1a1612 3px)',
        }}
      />
    </div>
  );
}