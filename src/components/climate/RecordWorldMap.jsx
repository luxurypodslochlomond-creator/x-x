import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { resolveCoords } from './countryCentroids';
import { nudge } from './worldPlate';
import WorldPlate from './WorldPlate';
import PlatePlaceIndex from './PlatePlaceIndex';
import VerificationBadge from './VerificationBadge';
import { useClimateCategories } from '@/hooks/useClimateCategories';

// How long ago the newest thing on the plate arrived, in words rather than a timestamp.
// The plate has no clock on it; this is the one place it admits that time passes.
function whenItArrived(iso) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (!Number.isFinite(days) || days < 0) return null;
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? 'a month ago' : `${months} months ago`;
}

/* ── THE RECORD, SET WHERE IT HAPPENED ─────────────────────────────────────────────
   Every published solution, crisis and action that names a place, standing on the plate.
   Nothing is animated, nothing slides in, nothing pulses: a mark is information, so it
   is simply there, and stays still.

   A mark you press opens its line underneath the planet rather than a bubble floating
   over it. A bubble covers the thing it is talking about and, on a phone, is a box you
   have to fight to close; the line under the plate keeps the world in view while you
   read what is on it. */
// lights are the places the record is being read from — the reach, on the same plate as
// the entries. One world, two facts about it: where the record stands, and where it is read.
export default function RecordWorldMap({ lights = [], alive = false }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishedTotal, setPublishedTotal] = useState(0);
  const [picked, setPicked] = useState(null);
  const [only, setOnly] = useState(null);
  const { categories } = useClimateCategories();
  const catLabel = (id) => categories.find((c) => c.id === id)?.label || (id || '').replaceAll('_', ' ');

  useEffect(() => {
    const load = async () => {
      try {
        // The wire is on the plate too. Its own country field was put there "for the wire's
        // place line and for mapping" — a report about Benin is about Benin, wherever it was
        // written — so the map would have been telling half the record and calling it all of it.
        const [solutions, actions, news, cartoons, solutionTotal, actionTotal, newsTotal, cartoonTotal] = await Promise.all([
          base44.entities.ClimateSolution.filter(
            { status: 'published' },
            {
              limit: 200,
              fields: ['title', 'summary', 'category', 'entry_type', 'country', 'region_rough',
                'verification', 'corroborating_source', 'source_name', 'source_url', 'created_date'],
            }
          ),
          base44.entities.ClimateAction.filter(
            { status: 'published' },
            {
              limit: 200,
              fields: ['title', 'description', 'category', 'action_type', 'country', 'region_rough',
                'verification', 'corroborating_source', 'source_url', 'created_date'],
            }
          ),
          base44.entities.ClimateNews.filter(
            { status: 'published' },
            {
              limit: 200,
              fields: ['headline', 'what_changed', 'category', 'country', 'where_label',
                'verification', 'corroborating_source', 'source_name', 'source_url', 'created_date'],
            }
          ).catch(() => ({ items: [] })),
          // The room of cartoons, on the same plate. A drawing is where it was drawn, not
          // where it was sent from — and a drawing whose maker gave no country is left off
          // rather than dropped onto a guess.
          base44.entities.ClimateCartoon.filter(
            { status: 'published' },
            {
              limit: 200,
              fields: ['title', 'artist_name', 'for_line', 'country', 'origin', 'credit', 'source_url', 'created_date'],
            }
          ).catch(() => ({ items: [] })),
          // The totals are counted separately so the plate can never claim to hold
          // everything: an entry with no place it can honestly be put is not dropped
          // from the count, it is admitted.
          base44.entities.ClimateSolution.count({ status: 'published' }),
          base44.entities.ClimateAction.count({ status: 'published' }),
          base44.entities.ClimateNews.count({ status: 'published' }).catch(() => 0),
          base44.entities.ClimateCartoon.count({ status: 'published' }).catch(() => 0),
        ]);
        setPublishedTotal((solutionTotal || 0) + (actionTotal || 0) + (newsTotal || 0) + (cartoonTotal || 0));
        setEntries([
          ...(solutions.items || []).map((s) => ({
            id: `solution-${s.id}`, entryId: s.id, type: s.entry_type === 'climate_crisis' ? 'crisis' : 'solution',
            title: s.title, summary: s.summary || '', category: s.category, country: s.country, region: s.region_rough,
            verification: s.verification, corroborating_source: s.corroborating_source,
            source_name: s.source_name, source_url: s.source_url, arrived: s.created_date,
          })),
          ...(actions.items || []).map((a) => ({
            id: `action-${a.id}`, entryId: a.id, type: 'action',
            title: a.title, summary: a.description || '', category: a.category, country: a.country, region: a.region_rough,
            verification: a.verification, corroborating_source: a.corroborating_source,
            source_name: a.source_name, source_url: a.source_url, arrived: a.created_date,
          })),
          ...((news.items || [])).map((n) => ({
            id: `wire-${n.id}`, entryId: n.id, type: 'wire',
            title: n.headline, summary: n.what_changed || '', category: n.category, country: n.country, region: n.where_label,
            verification: n.verification, corroborating_source: n.corroborating_source,
            source_name: n.source_name, source_url: n.source_url, arrived: n.created_date,
          })),
          ...((cartoons.items || [])).map((c) => ({
            id: `cartoon-${c.id}`, entryId: c.id, type: 'cartoon',
            title: c.title || c.artist_name, summary: c.for_line || '',
            country: c.country, region: c.origin,
            source_name: c.artist_name ? `Drawn by ${c.artist_name}` : '', source_url: c.source_url,
            credit: c.credit, arrived: c.created_date,
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
      .filter((e) => !only || e.type === only)
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
        aria: `${e.type === 'crisis' ? 'Crisis' : e.type === 'action' ? 'Action' : e.type === 'cartoon' ? 'Drawing' : 'Solution'}: ${e.title}${e.country ? `, ${e.country}` : ''}`,
      };
    });
  }, [entries, only]);

  const counts = useMemo(() => {
    const c = { crisis: 0, solution: 0, action: 0, wire: 0, cartoon: 0 };
    entries.forEach((e) => { if (resolveCoords(e.country, e.region)) c[e.type] += 1; });
    return c;
  }, [entries]);

  // A plate with no dates on it says the record has finished. One line under the count,
  // saying when the newest entry standing here arrived — so a reader can tell a living
  // record from one that stopped last March, without scrolling to anything.
  const newestArrival = useMemo(() => {
    const stamps = entries.map((e) => e.arrived).filter(Boolean).sort();
    return stamps.length ? whenItArrived(stamps[stamps.length - 1]) : null;
  }, [entries]);

  // One press opens, a second press on the same thing puts it down — the same act whether
  // it came from a mark on the plate or a name in the index under it.
  const pick = (m) => setPicked((prev) => (prev?.id === m.id ? null : m));

  // Everything standing in the same place as what was pressed. A place with three entries
  // would otherwise show only the first and hide the other two behind a dot nobody
  // happens to hit twice, which is the map keeping something back.
  const here = picked ? marks.filter((m) => (m.country || '') === (picked.country || '')) : [];
  const placeAt = here.findIndex((m) => m.id === picked?.id);

  return (
    <div className="border-2 border-[#141210] bg-[#f7f1e5]">
      {/* The count and the key, on the same paper as the plate — a plate is captioned
          above its engraving, not over it. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 py-2.5 border-b border-[#141210]/20">
        <p className="text-[10px] font-black font-mono uppercase tracking-[0.14em] text-[#141210]">
          {loading
            ? 'Setting the entries…'
            : only
              ? `Showing ${marks.length} of ${counts.crisis + counts.solution + counts.action + counts.wire + counts.cartoon} placed`
              : (counts.crisis + counts.solution + counts.action + counts.wire + counts.cartoon) < publishedTotal
                ? `${marks.length} of ${publishedTotal} entries placed`
                : `${marks.length} ${marks.length === 1 ? 'entry' : 'entries'} placed`}
          {!loading && newestArrival && (
            <span className="mt-1 block font-normal normal-case tracking-[0.02em] text-[#5a5246]">
              Newest standing here arrived {newestArrival}.
            </span>
          )}
        </p>
        <div className="flex flex-wrap items-center gap-x-1 text-[10px] font-mono font-bold text-[#141210]" role="group" aria-label="Show only one kind of entry">
          {[
            ['crisis', 'Crises', '#b3261e', 'rounded-full'],
            ['solution', 'Solutions', '#141210', 'rounded-full'],
            ['action', 'Actions', '#1e3a2b', 'rotate-45'],
            ['wire', 'Wire', '#0f5f7a', 'rounded-full'],
            ['cartoon', 'Drawings', '#9b6f28', 'rounded-sm'],
          ].map(([key, label, colour, shape]) => (
            <button
              key={key}
              type="button"
              aria-pressed={only === key}
              onClick={() => { setOnly(only === key ? null : key); setPicked(null); }}
              className={`flex min-h-11 items-center gap-1.5 px-1.5 uppercase tracking-[0.06em] ${only && only !== key ? 'opacity-40' : ''} ${only === key ? 'underline underline-offset-4' : ''}`}
            >
              <span className={`w-2 h-2 ${shape}`} style={{ background: colour }} />{label} {counts[key]}
            </button>
          ))}
        </div>
      </div>

      <WorldPlate
        marks={marks}
        lights={lights}
        alive={alive}
        selectedId={picked?.id}
        onSelect={pick}
        label={`The world, with ${marks.length} entries of the record set where they happened and ${lights.length} places reading it`}
      />

      {/* The plate read out: the places it actually holds, so a reader never has to hunt
          for a dot to find out where the record is standing. */}
      <PlatePlaceIndex marks={marks} selectedId={picked?.id} onPick={pick} />

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
                    : picked.type === 'cartoon' ? '#9b6f28'
                    : '#141210',
                  color: '#efe7d6',
                }}
              >
                {picked.type === 'crisis' ? 'Crisis' : picked.type === 'action' ? 'Action' : picked.type === 'wire' ? 'Wire' : picked.type === 'cartoon' ? 'Drawing' : 'Solution'}
              </span>
              {picked.country && (
                <span className="text-[8px] font-black font-mono uppercase tracking-[0.12em] text-[#5a5246]">{picked.country}</span>
              )}
              {here.length > 1 && (
                <button
                  type="button"
                  onClick={() => pick(here[(placeAt + 1) % here.length])}
                  className="ml-auto text-[9px] font-black font-mono uppercase tracking-[0.1em] text-[#5a5246] underline decoration-dotted underline-offset-2"
                >
                  {placeAt + 1}/{here.length} here · next →
                </button>
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
            {/* A dot that cannot say who says so is a rumour with a coordinate. How well
                the entry is known, and the origin behind it, are read here before the
                entry is opened — the same words the entry's own page uses. */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <VerificationBadge entry={picked} />
              {picked.source_name && (
                picked.source_url ? (
                  <a
                    href={picked.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] font-mono uppercase tracking-[0.08em] text-[#3a342c] underline decoration-dotted underline-offset-2"
                  >
                    {picked.source_name} ↗
                  </a>
                ) : (
                  <span className="text-[9px] font-mono uppercase tracking-[0.08em] text-[#5a5246]">{picked.source_name}</span>
                )
              )}
            </div>
            {picked.credit && (
              <p className="text-[9px] font-mono uppercase tracking-[0.08em] text-[#5a5246] mt-2">{picked.credit}</p>
            )}
            <div className="flex items-center gap-3 mt-2">
              <Link
                to={
                  picked.type === 'wire'
                    ? `/ClimateWireEntry/${picked.entryId}`
                    : picked.type === 'cartoon'
                      ? '/ClimateCartoons'
                      : `/ClimateDetail/${picked.type === 'action' ? 'action' : 'solution'}/${picked.entryId}`
                }
                className="inline-flex items-center gap-1.5 text-[10px] font-black font-mono uppercase text-[#efe7d6] bg-[#141210] px-2.5 py-1.5"
              >
                {picked.type === 'cartoon' ? 'The room of cartoons →' : 'Open the entry →'}
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
              : 'Press a mark, or a place named above it, to read what stands there. Red is a crisis, black a solution, green an action, blue a line on the wire, ochre a drawing — a line stands where the thing is, never where it was written from, and a drawing stands where it was drawn. An amber glow is a place reading the record: one entry opened there, and nobody named.'}
          </p>
        )}
      </div>
    </div>
  );
}