import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import FitWorld, { WORLD_BOUNDS } from './FitWorld';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { resolveCoords } from './countryCentroids';
import { useClimateCategories } from '@/hooks/useClimateCategories';

const makeIcon = (type, longitude = 0) => {
  const isCrisis = type === 'climate_crisis';
  const isAction = type === 'action';
  const delay = ((longitude + 180) / 360) * 8;
  const fadeIn = `animation:climate-marker-in 0.9s cubic-bezier(0.2,0.8,0.2,1) ${delay}s both;`;

  if (isCrisis) {
    return L.divIcon({
      className: 'climate-marker-crisis',
      html: `<div style="${fadeIn}"><div style="position:relative;width:14px;height:14px;"><div style="position:absolute;inset:-6px;border:2px solid #b3261e;border-radius:50%;animation:climate-ping 2s ease-out infinite ${delay}s;"></div><div style="position:absolute;inset:0;width:14px;height:14px;background:#b3261e;border:2px solid #e9eeec;border-radius:50%;box-shadow:0 0 10px rgba(179,38,30,0.7);"></div></div></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      popupAnchor: [0, -8],
    });
  }
  if (isAction) {
    return L.divIcon({
      className: 'climate-marker-action',
      html: `<div style="${fadeIn}"><div style="position:relative;width:11px;height:11px;"><div style="position:absolute;inset:-4px;border:1px solid #1e3a2b;border-radius:50%;animation:climate-reveal 0.8s ease-out ${delay + 0.9}s both;"></div><div style="width:11px;height:11px;background:#1e3a2b;border:2px solid #e9eeec;transform:rotate(45deg);box-shadow:0 0 8px rgba(30,58,43,0.5);"></div></div></div>`,
      iconSize: [11, 11],
      iconAnchor: [5, 5],
      popupAnchor: [0, -6],
    });
  }
  // solution
  return L.divIcon({
    className: 'climate-marker-solution',
    html: `<div style="${fadeIn}"><div style="position:relative;width:11px;height:11px;"><div style="position:absolute;inset:-4px;border:1px solid #1a1612;border-radius:50%;animation:climate-reveal 0.8s ease-out ${delay + 0.9}s both;"></div><div style="width:11px;height:11px;background:#1a1612;border:2px solid #e9eeec;box-shadow:0 0 6px rgba(26,22,18,0.5);"></div></div></div>`,
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
  const { categories } = useClimateCategories();
  const catLabel = (catId) => categories.find(c => c.id === catId)?.label || (catId || '').replaceAll('_', ' ');

  useEffect(() => {
    const load = async () => {
      try {
        const [solutions, actions] = await Promise.all([
          base44.entities.ClimateSolution.filter(
            { status: 'published' },
            { limit: 200, fields: ['title', 'summary', 'category', 'entry_type', 'country', 'region_rough'] }
          ),
          base44.entities.ClimateAction.filter(
            { status: 'published' },
            { limit: 200, fields: ['title', 'description', 'category', 'action_type', 'country', 'region_rough', 'date'] }
          ),
        ]);

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
        @keyframes climate-ping {
          0% { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes climate-marker-in {
          from { opacity: 0; transform: scale(0.15); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes climate-sweep {
          0% { left: -5%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: 105%; opacity: 0; }
        }
        @keyframes climate-reveal {
          0% { transform: scale(0.5); opacity: 0.9; }
          100% { transform: scale(3.5); opacity: 0; }
        }
        @keyframes climate-breathe {
          0%, 100% { filter: sepia(0.28) contrast(0.88) brightness(1.06) hue-rotate(-8deg) saturate(0.7); }
          50% { filter: sepia(0.32) contrast(0.9) brightness(1.12) hue-rotate(-6deg) saturate(0.75); }
        }
        .climate-map .leaflet-tile-pane {
          filter: sepia(0.28) contrast(0.88) brightness(1.06) hue-rotate(-8deg) saturate(0.7);
          animation: climate-breathe 7s ease-in-out infinite;
        }
        .climate-map .leaflet-container {
          background: #e9eeec;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        .climate-map .leaflet-popup-content-wrapper {
          background: #e9eeec;
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
          background: #e9eeec;
          border: 2px solid #1a1612;
          box-shadow: none;
        }
        .climate-map .leaflet-popup-close-button {
          color: #e9eeec !important;
          font-size: 20px !important;
          top: 4px !important;
          right: 6px !important;
          width: 20px !important;
          height: 20px !important;
          z-index: 10;
        }
        .climate-map .leaflet-control-zoom a {
          background: #e9eeec !important;
          border-color: #1a1612 !important;
          color: #1a1612 !important;
          font-family: monospace !important;
        }
        .climate-map .leaflet-control-attribution {
          background: rgba(233,238,236,0.85) !important;
          font-size: 8px !important;
          font-family: monospace !important;
        }
      `}</style>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        zoomSnap={0}
        minZoom={0}
        maxZoom={10}
        maxBounds={WORLD_BOUNDS}
        maxBoundsViscosity={1}
        scrollWheelZoom={true}
        className="climate-map"
        style={{ height: '100%', width: '100%', background: '#e9eeec' }}
      >
        <FitWorld />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri, US National Park Service'
          maxZoom={8}
          noWrap={true}
        />

        {markers.map((m) => (
          <Marker key={m.id} position={m.coord} icon={makeIcon(m.type, m.coord[1])}>
            <Popup>
              <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
                <div style={{
                  background: m.type === 'climate_crisis' ? '#b3261e' : m.type === 'action' ? '#1e3a2b' : '#1a1612',
                  color: '#e9eeec',
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
                    background: '#e9eeec', display: 'inline-block',
                  }} />
                  {m.type === 'climate_crisis' ? 'CRISIS SIGNAL' : m.type === 'action' ? 'ACTION SIGNAL' : 'SOLUTION SIGNAL'}
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
                      fontSize: '10px', color: '#5e706e', lineHeight: 1.4,
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
                        letterSpacing: '0.08em', color: '#5e706e',
                        border: '1px solid #5e706e', padding: '2px 5px',
                      }}>
                        {m.country || m.region}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/ClimateDetail/${m.type === 'action' ? 'action' : 'solution'}/${m.id}`}
                    style={{
                      display: 'block', textAlign: 'center',
                      background: '#1a1612', color: '#e9eeec',
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

      {/* Scanline overlay — cold transmission signal */}
      <div
        className="absolute inset-0 pointer-events-none z-[400]"
        style={{
          opacity: 0.05,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #1a1612 2px, #1a1612 3px)',
          animation: 'twcc-scan 3s linear infinite',
        }}
      />

      {/* The sweep — signals received west to east, one shore at a time */}
      <div className="absolute inset-0 pointer-events-none z-[500]" style={{ overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0, width: '2px',
          background: '#0f5f7a',
          opacity: 0.55,
          animation: 'climate-sweep 20s cubic-bezier(0.4,0,0.6,1) forwards',
          boxShadow: '0 0 6px #0f5f7a, 0 0 16px rgba(15,95,122,0.35), -30px 0 26px rgba(15,95,122,0.08)',
        }} />
      </div>

      {/* Warm glow — deepest house, the warmth at the bottom of the room */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-[400]" style={{
        height: '45%',
        background: 'linear-gradient(to top, rgba(15,95,122,0.05), transparent)',
      }} />

      {/* Vignette — the edges fade into paper */}
      <div
        className="absolute inset-0 pointer-events-none z-[400]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(237,242,240,0.35) 100%)',
        }}
      />

      {/* Signal counter — top right */}
      <div className="absolute top-3 right-3 z-[1000] bg-[#141210]/95 border border-[#e2602a]/40 px-3 py-2 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse flex-shrink-0" />
          <span className="text-[9px] font-black font-mono uppercase tracking-widest text-[#e9eeec]">
            {loading ? 'RECEIVING…' : `${markers.length} SIGNALS`}
          </span>
        </div>
        {!loading && markers.length > 0 && (
          <div className="flex gap-2 mt-1 text-[7px] font-mono font-bold text-[#e9eeec]/60">
            <span><span style={{ color: '#b3261e' }}>●</span> {crisisCount}</span>
            <span><span style={{ color: '#1a1612' }}>■</span> {solutionCount}</span>
            <span><span style={{ color: '#1e3a2b' }}>◆</span> {actionCount}</span>
          </div>
        )}
      </div>

      {/* Legend — bottom left */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#e9eeec]/95 border-2 border-[#1a1612] p-2.5 pointer-events-none">
        <div className="text-[7px] font-black font-mono uppercase tracking-widest text-[#1a1612] mb-1.5">LEGEND</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#b3261e] border border-[#e9eeec]" />
          <span className="text-[8px] font-mono font-bold text-[#1a1612]">CRISIS</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 bg-[#1a1612] border border-[#e9eeec]" />
          <span className="text-[8px] font-mono font-bold text-[#1a1612]">SOLUTION</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#1e3a2b] border border-[#e9eeec] rotate-45" />
          <span className="text-[8px] font-mono font-bold text-[#1a1612]">ACTION</span>
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-[1100] bg-[#e9eeec] flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#b3261e] animate-pulse" />
              <span className="text-[10px] font-black font-mono uppercase tracking-[0.2em] text-[#1a1612]">RECEIVING SIGNALS</span>
              <span className="w-2 h-2 rounded-full bg-[#b3261e] animate-pulse" />
            </div>
            <div className="text-[8px] font-mono text-[#5e706e] tracking-widest">from a warming world…</div>
          </div>
        </div>
      )}
    </div>
  );
}