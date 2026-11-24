import React, { useEffect, useMemo, useRef } from 'react';
import { resolveCoords } from './countryCentroids';
import useRecordViewState from '@/components/climate/useRecordViewState';
import useMapEntries from '@/components/climate/map/useMapEntries';
import MapEntryDetail from '@/components/climate/map/MapEntryDetail';
import MapReadingDetail from '@/components/climate/map/MapReadingDetail';
import MapKey from '@/components/climate/map/MapKey';
import MapFigures from '@/components/climate/map/MapFigures';
import WorldPlate from './WorldPlate';
import PlatePlaceIndex from './PlatePlaceIndex';

import { useClimateCategories } from '@/hooks/useClimateCategories';

const EMPTY_ENTRIES = [];

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
export default function RecordWorldMap({ lights = [], alive = false, tone = 'paper' }) {
  const { data, isPending: loading, isError, refetch } = useMapEntries();
  const entries = data?.entries || EMPTY_ENTRIES;
  const publishedTotal = data?.publishedTotal || 0;
  const [picked, setPicked] = useRecordViewState('map-picked', null);
  const [only, setOnly] = useRecordViewState('map-kind', null);
  const [readingMode, setReadingMode] = useRecordViewState('map-readership', false);
  const [readingPlace, setReadingPlace] = useRecordViewState('map-reading-place', null);
  const { categories } = useClimateCategories();
  const catLabel = (id) => categories.find((c) => c.id === id)?.label || (id || '').replaceAll('_', ' ');



  const marks = useMemo(() => {
    const placed = entries
      .filter((e) => !only || e.type === only)
      .map((e) => {
        const base = resolveCoords(e.country, e.region);
        return base ? { ...e, lat: base[0], lng: base[1] } : null;
      })
      .filter(Boolean);

    return placed.map((entry) => ({
      ...entry, tone: entry.type,
      aria: `${entry.country || entry.region}: ${entry.title}`,
    }));
  }, [entries, only]);

  // One target per approximate coordinate; every entry is named in its place's list.
  const clusters = useMemo(() => {
    const groups = new Map();
    marks.forEach((mark) => {
      const key = `${mark.lat},${mark.lng}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(mark);
    });
    return [...groups.values()].map((group) => {
      const mark = group.find((entry) => entry.id === picked?.id) || group[0];
      return { ...mark, count: group.length, aria: `${mark.country || mark.region}: ${group.length} ${group.length === 1 ? 'entry' : 'entries'}`, title: group.length > 1 ? `${mark.country || mark.region} · ${group.length} entries` : mark.title };
    });
  }, [marks, picked?.id]);

  const counts = useMemo(() => {
    const c = { crisis: 0, solution: 0, action: 0, wire: 0, cartoon: 0 };
    entries.forEach((e) => { if (resolveCoords(e.country, e.region)) c[e.type] += 1; });
    return c;
  }, [entries]);

  // ── THE RIGHT NUMBERS ───────────────────────────────────────────────────────────
  // Not reads, not reach, not people. The plate's own arithmetic: what it is holding, in
  // how many countries, how many of those are drawings, and how much of it a second,
  // independent origin also says. Every one of these can be checked by pressing a mark.
  const figures = useMemo(() => {
    const placedRows = entries.filter((e) => resolveCoords(e.country, e.region));
    const countries = new Set(placedRows.map((e) => (e.country || '').trim()).filter(Boolean));
    return {
      placed: placedRows.length,
      countries: countries.size,
      drawings: placedRows.filter((e) => e.type === 'cartoon').length,
      second: placedRows.filter((e) => e.verification === 'corroborated' || e.verification === 'official_record').length,
    };
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
  const pick = (mark) => { setPicked(marks.find((entry) => entry.id === mark.id) || mark); setReadingPlace(null); };
  const closeDetail = () => { setPicked(null); setReadingPlace(null); };

  // Pressing a mark opens its line under the planet — but on a wide screen the planet is
  // taller than the window, so the line could open entirely out of sight and the press
  // would look like nothing happened. If it is out of view, it is brought into view; if
  // it is already there, nothing moves.
  const detailRef = useRef(null);
  const selectionReady = useRef(false);
  useEffect(() => {
    if (!selectionReady.current) { selectionReady.current = true; return; }
    const el = detailRef.current;
    if ((!picked && !readingPlace) || !el) return;
    el.scrollTop = 0;
    if (window.matchMedia('(min-width: 1024px)').matches) return;
    const box = el.getBoundingClientRect();
    const headerBottom = el.closest('.climate-record')?.querySelector('.record-book > header')?.getBoundingClientRect().bottom || 0;
    if (box.top > window.innerHeight - 100 || box.top < headerBottom) {
      window.scrollBy({ top: box.top - headerBottom - 8, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  }, [picked, readingPlace]);

  // Everything standing in the same place as what was pressed. A place with three entries
  // would otherwise show only the first and hide the other two behind a dot nobody
  // happens to hit twice, which is the map keeping something back.
  const here = picked ? marks.filter((m) => (m.country || '') === (picked.country || '')) : [];


  return (
    <div className={`record-map-instrument ${tone === 'ink' ? 'border border-[#b3261e]/60 bg-transparent' : 'border-2 border-[#141210] bg-[#f7f1e5]'}`}>
      {/* The count and the key, on the same paper as the plate — a plate is captioned
          above its engraving, not over it. */}
      <MapKey
        mode={readingMode ? 'readership' : 'entries'}
        onMode={(next) => { setReadingMode(next === 'readership'); closeDetail(); }}
        only={only}
        onOnly={setOnly}
        counts={counts}
        placed={marks.length}
        total={publishedTotal}
        lights={lights}
        loading={loading}
        isError={isError}
        newestArrival={newestArrival}
      />

      <div className="record-map-stage">
      <WorldPlate
        marks={readingMode ? [] : clusters}
        lights={lights}
        alive={alive}
        selectedId={picked?.id}
        onSelect={pick}
        onLight={(place) => { setReadingPlace(place); setPicked(null); }}
        selectedLightId={readingPlace?.id}
        label={readingMode ? `Readership in ${lights.length} approximate places` : `${marks.length} entries, grouped by approximate place`}
        tone={tone}
      />
      <aside ref={detailRef} className="record-map-reading" aria-label="Selected place" data-record-layout="compact">
        <div className="record-map-detail" aria-live="polite">
          {isError && !readingMode ? <div className="record-map-picked" role="alert"><p>The entries could not be loaded. The map is not empty.</p><button type="button" onClick={() => refetch()} className="record-map-open">Try again</button></div>
            : readingPlace ? <MapReadingDetail place={readingPlace} onClose={closeDetail} />
              : picked ? <MapEntryDetail entry={picked} here={here} onPick={pick} onClose={closeDetail} category={catLabel} />
                : <p className="record-map-help text-sm leading-relaxed text-record-muted">{loading ? 'Setting the entries in their places…' : readingMode ? 'Select a lit place to read its count. A light is entry openings, never people.' : marks.length ? 'Choose a mark or a place below. Its entry opens here, beside the map. Numbers on marks mean several entries share an approximate place. A cartoon is a page hung on the plate. A lamp with an amber halo is a place reading the record.' : 'No entries in this selection have a stated place. Nothing is guessed onto the map.'}</p>}
        </div>
      </aside>
      </div>

      <MapFigures figures={figures} loading={loading} isError={isError} />

      {/* The plate read out: the places it actually holds, so a reader never has to hunt
          for a mark to find out where the record is standing. It comes after the line a
          press opens, never before it. */}
      {!readingMode && <PlatePlaceIndex marks={marks} selectedId={picked?.id} onPick={pick} />}

      {tone === 'ink' && alive && (
        <p className="record-map-geography-credit bg-record-bone px-3 py-2 font-mono text-xs text-record-muted">
          Geography: <a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Natural Earth · public domain</a>.
          {' '}Equal spacing of latitude and longitude; polar areas appear enlarged.
        </p>
      )}
    </div>
  );
}