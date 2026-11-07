import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { resolveCoords } from './countryCentroids';
import { nudge } from './worldPlate';
import WorldPlate from './WorldPlate';
import { useClimateCategories } from '@/hooks/useClimateCategories';

/* ── THE RECORD, SET WHERE IT HAPPENED ─────────────────────────────────────────────
   Every published solution, crisis and action that names a place, standing on the plate.
   Nothing is animated, nothing slides in, nothing pulses: a mark is information, so it
   is simply there, and stays still.

   A mark you press opens its line underneath the planet rather than a bubble floating
   over it. A bubble covers the thing it is talking about and, on a phone, is a box you
   have to fight to close; the line under the plate keeps the world in view while you
   read what is on it. */
export default function RecordWorldMap() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishedTotal, setPublishedTotal] = useState(0);
  const [picked, setPicked] = useState(null);
  const { categories } = useClimateCategories();
  const catLabel = (id) => categories.find((c) => c.id === id)?.label || (id || '').replaceAll('_', ' ');

  useEffect(() => {
    const load = async () => {
      try {
        // The wire is on the plate too. Its own country field was put there "for the wire's
        // place line and for mapping" — a report about Benin is about Benin, wherever it was
        // written — so the map would have been telling half the record and calling it all of it.
        const [solutions, actions, news, solutionTotal, actionTotal, newsTotal] = await Promise.all([
          base44.entities.ClimateSolution.filter(
            { status: 'published' },
            { limit: 200, fields: ['title', 'summary', 'category', 'entry_type', 'country', 'region_rough'] }
          ),
          base44.entities.ClimateAction.filter(
            { status: 'published' },
            { limit: 200, fields: ['title', 'description', 'category', 'action_type', 'country', 'region_rough'] }
          ),
          base44.entities.ClimateNews.filter(
            { status: 'published' },
            { limit: 200, fields: ['headline', 'what_changed', 'category', 'country', 'where_label'] }
          ).catch(() => ({ items: [] })),
          // The totals are counted separately so the plate can never claim to hold
          // everything: an entry with no place it can honestly be put is not dropped
          // from the count, it is admitted.
          base44.entities.ClimateSolution.count({ status: 'published' }),
          base44.entities.ClimateAction.count({ status: 'published' }),
          base44.entities.ClimateNews.count({ status: 'published' }).catch(() => 0),
        ]);
        setPublishedTotal((solutionTotal || 0) + (actionTotal || 0) + (newsTotal || 0));
        setEntries([
          ...(solutions.items || []).map((s) => ({
            id: `solution-${s.id}`, entryId: s.id, type: s.entry_type === 'climate_crisis' ? 'crisis' : 'solution',
            title: s.title, summary: s.summary || '', category: s.category, country: s.country, region: s.region_rough,
          })),
          ...(actions.items || []).map((a) => ({
            id: `action-${a.id}`, entryId: a.id, type: 'action',
            title: a.title, summary: a.description || '', category: a.category, country: a.country, region: a.region_rough,
          })),
          ...((news.items || [])).map((n) => ({
            id: `wire-${n.id}`, entryId: n.id, type: 'wire',
            title: n.headline, summary: n.what_changed || '', category: n.category, country: n.country, region: n.where_label,
          })),
        ]);
      } catch {
        // The plate still renders — the world does not depend on the record loading.
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const marks = useMemo(() => {
    const placed = entries
      .map((e) => {
        const base = resolveCoords(e.country, e.region);
        return base ? { ...e, lat: base[0], lng: base[1] } : null;
      })
      .filter(Boolean);

    // Two entries in one country would sit exactly on top of each other, so each takes a
    // small fixed step around its own place. A nudge, never a scatter.
    const seen = {};
    return placed.map((e) => {
      const key = `${e.lat},${e.lng}`;
      const i = seen[key] = (seen[key] ?? -1) + 1;
      const [dx, dy] = nudge(i);
      return {
        ...e,
        dx,
        dy,
        tone: e.type,
        aria: `${e.type === 'crisis' ? 'Crisis' : e.type === 'action' ? 'Action' : 'Solution'}: ${e.title}${e.country ? `, ${e.country}` : ''}`,
      };
    });
  }, [entries]);

  const counts = useMemo(() => ({
    crisis: marks.filter((m) => m.type === 'crisis').length,
    solution: marks.filter((m) => m.type === 'solution').length,
    action: marks.filter((m) => m.type === 'action').length,
    wire: marks.filter((m) => m.type === 'wire').length,
  }), [marks]);

  return (
    <div className="border-2 border-[#141210] bg-[#f7f1e5]">
      {/* The count and the key, on the same paper as the plate — a plate is captioned
          above its engraving, not over it. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 py-2.5 border-b border-[#141210]/20">
        <p className="text-[10px] font-black font-mono uppercase tracking-[0.14em] text-[#141210]">
          {loading
            ? 'Setting the entries…'
            : marks.length < publishedTotal
              ? `${marks.length} of ${publishedTotal} entries placed`
              : `${marks.length} ${marks.length === 1 ? 'entry' : 'entries'} placed`}
        </p>
        <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-[#141210]">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: '#b3261e' }} />{counts.crisis}</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: '#141210' }} />{counts.solution}</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rotate-45" style={{ background: '#1e3a2b' }} />{counts.action}</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: '#0f5f7a' }} />{counts.wire}</span>
        </div>
      </div>

      <WorldPlate
        marks={marks}
        selectedId={picked?.id}
        onSelect={(m) => setPicked((prev) => (prev?.id === m.id ? null : m))}
        label={`The world, with ${marks.length} entries of the record set where they happened`}
      />

      {/* What you pressed, said underneath the planet in the record's own words. */}
      <div className="border-t border-[#141210]/20 px-3 py-3 min-h-[86px]">
        {picked ? (
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-[8px] font-black font-mono uppercase tracking-[0.14em] px-1.5 py-0.5"
                style={{
                  background:
                    picked.type === 'crisis' ? '#b3261e'
                    : picked.type === 'action' ? '#1e3a2b'
                    : picked.type === 'wire' ? '#0f5f7a'
                    : '#141210',
                  color: '#efe7d6',
                }}
              >
                {picked.type === 'crisis' ? 'Crisis' : picked.type === 'action' ? 'Action' : picked.type === 'wire' ? 'Wire' : 'Solution'}
              </span>
              {picked.country && (
                <span className="text-[8px] font-black font-mono uppercase tracking-[0.12em] text-[#5a5246]">{picked.country}</span>
              )}
            </div>
            <p className="text-[14px] font-black leading-snug text-[#141210]">{picked.title}</p>
            {picked.summary && (
              <p
                className="text-[12px] leading-relaxed text-[#3a342c] mt-1"
                style={{
                  fontFamily: 'var(--font-reading)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {picked.summary}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2">
              <Link
                to={
                  picked.type === 'wire'
                    ? `/ClimateWireEntry/${picked.entryId}`
                    : `/ClimateDetail/${picked.type === 'action' ? 'action' : 'solution'}/${picked.entryId}`
                }
                className="inline-flex items-center gap-1.5 text-[10px] font-black font-mono uppercase text-[#efe7d6] bg-[#141210] px-2.5 py-1.5"
              >
                Open the entry →
              </Link>
              {picked.category && (
                <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-[#5a5246]">{catLabel(picked.category)}</span>
              )}
            </div>
          </div>
        ) : (
          <p className="text-[11px] font-mono leading-relaxed text-[#5a5246]">
            {loading
              ? 'Setting every entry where it says it is.'
              : marks.length === 0
              ? 'No entry has a place it can honestly be put yet. Nothing is guessed at to fill the map.'
              : 'Press a mark to read what stands there. Red is a crisis, black a solution, green an action, blue a line on the wire.'}
          </p>
        )}
      </div>
    </div>
  );
}