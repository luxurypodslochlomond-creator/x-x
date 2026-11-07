import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight, MapPin, X } from 'lucide-react';
import useRecordViewState from './useRecordViewState';

// ── THE NEXT REAL THING NEAR YOU — AND THE PLACES YOU'RE BETWEEN ─────────────────
// The plate can say where the record stands; a stipple cannot say "come along on
// Saturday". So this answers the only question that turns reading into doing.
//
// The first version asked for one place, and one place is a lie the moment somebody
// travels. People do not live at a point: they are in Glasgow and will be in Lisbon on
// Thursday, or they left home in March and are still moving. So a reader can hold a few
// places at once — the one they are in, the one they are going to, the one they still
// belong to — and the page answers across all of them, each line saying which place it
// belongs to so nobody has to guess which life it came from.
//
// What it never does is ask a machine where you are. No location prompt, no coordinates,
// no profile, no cookie with your town in it: the places are words you pressed, they live
// in this tab's memory only, they vanish when the page is closed, and one press clears
// them. The record's own rule is region-only, and a person choosing "Lisbon" has told it
// something far smaller than a browser asking for their street.
//
// And it never reaches: if there is nothing near a place you named, it says exactly that
// rather than offering the nearest thing on another continent. An empty answer that is
// true is worth more than a full one that is not.
const LABEL = { cleanup: 'Cleanup', planting: 'Planting', meeting: 'Meeting', policy_submission: 'Policy', workshop: 'Workshop', monitoring: 'Monitoring', other: 'Action' };
const LIMIT = 4;

const day = (iso) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' });
  } catch { return ''; }
};

const norm = (s) => String(s || '').toLowerCase().trim();

export default function NextActionNear() {
  const [rows, setRows] = useState(null);
  // Places the reader is holding. Session memory only — never a stored profile.
  const [watching, setWatching] = useRecordViewState('watchingPlaces', []);
  const [typed, setTyped] = useState('');
  const places = Array.isArray(watching) ? watching : [];

  useEffect(() => {
    let live = true;
    base44.entities.ClimateAction.filter({ status: 'published' }, { sort: 'date', limit: 100 })
      .then((page) => { if (live) setRows(page?.items || page || []); })
      .catch(() => { if (live) setRows([]); });
    return () => { live = false; };
  }, []);

  // The places the record's own actions stand in — a thumb can tap one instead of
  // typing, and no place is offered that has nothing behind it.
  const index = useMemo(() => {
    const set = new Set();
    (rows || []).forEach((a) => {
      [a.region_rough, a.country].forEach((p) => { if (p && String(p).trim()) set.add(String(p).trim()); });
    });
    return [...set].sort((a, b) => a.localeCompare(b)).slice(0, 16);
  }, [rows]);

  const toggle = (p) => {
    const name = String(p || '').trim();
    if (!name) return;
    const already = places.some((w) => norm(w) === norm(name));
    if (already) setWatching(places.filter((w) => norm(w) !== norm(name)));
    else if (places.length < LIMIT) setWatching([...places, name]);
    setTyped('');
  };

  // One line per forthcoming action, across every place being held, soonest first. The
  // line says which of your places it answers, because a traveller reading "Sat 14 March
  // · Lisbon" needs to know that is the trip and not home.
  const near = useMemo(() => {
    if (places.length === 0) return [];
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const out = [];
    (rows || []).forEach((a) => {
      const where = norm(`${a.region_rough || ''} ${a.country || ''}`);
      const hit = places.find((p) => {
        const q = norm(p);
        return q.length >= 2 && (where.includes(q) || (where.length > 2 && q.includes(norm(a.country))));
      });
      if (hit) out.push({ ...a, _place: hit });
    });
    const dated = out.filter((a) => a.date && new Date(a.date) >= today).sort((a, b) => new Date(a.date) - new Date(b.date));
    const undated = out.filter((a) => !a.date);
    return [...dated, ...undated].slice(0, 8);
  }, [rows, places]);

  // Honest silences: which of the places you named have nothing yet.
  const quiet = places.filter((p) => !near.some((a) => norm(a._place) === norm(p)));

  return (
    <section className="border-t-2 border-[#141210]/40 bg-[#f7f1e5]">
      <div className="max-w-[1100px] mx-auto px-4 lg:px-10 py-7 lg:py-9">
        <div className="flex items-center gap-2 mb-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#141210]" />
          <p className="text-[9px] font-black font-mono uppercase tracking-[0.18em] text-[#5a5246]">Near you</p>
        </div>
        <p className="text-[#141210] font-semibold mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(21px, 5vw, 26px)', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
          What is actually happening near you, and when.
        </p>
        <p className="text-[13.5px] leading-[1.65] text-[#3a342c] mb-3" style={{ fontFamily: 'var(--font-reading)' }}>
          Add up to {LIMIT} places — the one you are in, the one you are going to, the one you still belong to.
          No location prompt, nothing saved, nothing about you kept once you close the page. A region is enough.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); toggle(typed); }} className="flex items-stretch gap-2 mb-3">
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="Town, coast or country"
            aria-label="Add a place"
            className="flex-1 min-w-0 min-h-[46px] px-3 bg-[#efe7d6] border border-[#141210]/30 text-[14px] text-[#141210] placeholder:text-[#5a5246]/70 focus:outline-none focus:border-[#141210]"
            style={{ fontFamily: 'var(--font-reading)' }}
          />
          <button
            type="submit"
            disabled={!typed.trim() || places.length >= LIMIT}
            className="min-h-[46px] px-4 bg-[#141210] text-[#efe7d6] text-[12px] font-black font-mono uppercase tracking-[0.12em] active:bg-[#b3261e] transition-colors disabled:opacity-40"
          >
            Add
          </button>
        </form>

        {places.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {places.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => toggle(p)}
                className="inline-flex items-center gap-1.5 text-[11px] px-2 py-1.5 bg-[#141210] text-[#efe7d6] border border-[#141210] active:bg-[#b3261e] transition-colors"
                style={{ fontFamily: 'var(--font-reading)' }}
                aria-label={`Stop watching ${p}`}
              >
                {p}
                <X className="w-3 h-3 opacity-70" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setWatching([])}
              className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#5a5246] underline decoration-dotted underline-offset-2 px-1"
            >
              Clear all
            </button>
          </div>
        )}

        {index.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {index.map((p) => {
              const on = places.some((w) => norm(w) === norm(p));
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => toggle(p)}
                  aria-pressed={on}
                  className={`text-[10.5px] px-1.5 py-1 border transition-colors ${
                    on ? 'bg-[#efe7d6] text-[#5a5246] border-[#141210]/25' : 'bg-transparent text-[#141210] border-[#141210]/25 active:bg-[#efe7d6]'
                  }`}
                  style={{ fontFamily: 'var(--font-reading)' }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        )}

        {rows === null && (
          <p className="text-[12.5px] text-[#5a5246]" style={{ fontFamily: 'var(--font-reading)' }}>Reading the record…</p>
        )}

        {rows !== null && places.length === 0 && (
          <p className="text-[12.5px] text-[#5a5246]" style={{ fontFamily: 'var(--font-reading)' }}>
            Press a place above, or type one.
          </p>
        )}

        {near.length > 0 && (
          <div className="border-t border-[#141210]/20">
            {near.map((a) => {
              const where = [a.region_rough, a.country].filter(Boolean).join(', ');
              return (
                <Link
                  key={a.id}
                  to={`/ClimateDetail/action/${a.id}`}
                  className="flex items-start gap-3 py-3.5 border-b border-[#141210]/12 active:bg-[#efe7d6] transition-colors"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 mb-1">
                      <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#5a5246]">
                        {LABEL[a.action_type] || 'Action'}
                      </span>
                      <span className="text-[#141210]/25">·</span>
                      <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#1e3a2b] truncate">{a._place}</span>
                    </span>
                    <span className="block text-[14px] font-semibold text-[#141210] leading-snug" style={{ fontFamily: 'var(--font-reading)' }}>
                      {a.title}
                    </span>
                    <span className="block text-[12px] text-[#5a5246] mt-1" style={{ fontFamily: 'var(--font-reading)' }}>
                      {a.date ? <span className="font-semibold text-[#1e3a2b]">{day(a.date)}</span> : <span>Date not given yet</span>}
                      {where && <span className="mx-1.5 text-[#141210]/30">·</span>}
                      {where}
                    </span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#5a5246] flex-shrink-0 mt-1.5" />
                </Link>
              );
            })}
          </div>
        )}

        {near.length === 0 && quiet.length > 0 && (
          <p className="text-[13.5px] leading-[1.65] text-[#3a342c]" style={{ fontFamily: 'var(--font-reading)' }}>
            Nothing is on the record near {quiet.join(' or ')} yet. It says so rather than sending you somewhere
            else — and it fills the moment somebody there puts one on.{' '}
            <Link to="/TogetherChangeClimate" className="text-[#b3261e] underline decoration-dotted underline-offset-2">
              Put one on the record
            </Link>
            .
          </p>
        )}

        {near.length > 0 && quiet.length > 0 && (
          <p className="mt-3 text-[11.5px] text-[#5a5246]" style={{ fontFamily: 'var(--font-reading)' }}>
            Nothing yet near {quiet.join(' or ')}.
          </p>
        )}

        {places.length > 0 && (
          <p className="mt-4 text-[10.5px] font-mono uppercase tracking-[0.1em] text-[#5a5246]/80 leading-relaxed">
            Held in this page only · never asked of your device · cleared when you close it
          </p>
        )}
      </div>
    </section>
  );
}