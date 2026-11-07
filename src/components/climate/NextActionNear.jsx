import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight, MapPin } from 'lucide-react';
import useRecordViewState from './useRecordViewState';

// ── THE NEXT REAL THING NEAR YOU ────────────────────────────────────────────────
// The plate can say where the record stands, and a stipple cannot say "come along on
// Saturday". So this sits under the engraving and answers the only question that turns
// reading into doing: what is happening near me, and when.
//
// It asks where you are by name and never by permission: no location prompt, no
// coordinates, nothing held after the tab closes. The record's rule is region-only, and
// a person typing "Cardigan" is giving less away than a browser asking for their street.
//
// Nothing here is invented. If there is no dated action near a place, the page says so
// plainly rather than reaching for the nearest thing on another continent — an empty
// answer that is true is worth more than a full one that is not.
const LABEL = { cleanup: 'Cleanup', planting: 'Planting', meeting: 'Meeting', policy_submission: 'Policy', workshop: 'Workshop', monitoring: 'Monitoring', other: 'Action' };

const day = (iso) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' });
  } catch { return ''; }
};

const norm = (s) => String(s || '').toLowerCase().trim();

export default function NextActionNear() {
  const [rows, setRows] = useState(null);
  const [place, setPlace] = useRecordViewState('nearPlace', '');
  const [typed, setTyped] = useState(place);

  useEffect(() => {
    let live = true;
    base44.entities.ClimateAction.filter({ status: 'published' }, { sort: 'date', limit: 100 })
      .then((page) => { if (live) setRows(page?.items || page || []); })
      .catch(() => { if (live) setRows([]); });
    return () => { live = false; };
  }, []);

  // The places the record's own actions stand in — so a thumb can tap one instead of
  // typing, and no place is offered that has nothing behind it.
  const places = useMemo(() => {
    const set = new Set();
    (rows || []).forEach((a) => {
      [a.region_rough, a.country].forEach((p) => { if (p && String(p).trim()) set.add(String(p).trim()); });
    });
    return [...set].sort((a, b) => a.localeCompare(b)).slice(0, 14);
  }, [rows]);

  const near = useMemo(() => {
    const q = norm(place);
    if (q.length < 2) return [];
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const hit = (rows || []).filter((a) => {
      const where = norm(`${a.region_rough || ''} ${a.country || ''}`);
      return where.includes(q) || (where.length > 2 && q.includes(norm(a.country)));
    });
    const dated = hit
      .filter((a) => a.date && new Date(a.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const undated = hit.filter((a) => !a.date);
    return [...dated, ...undated].slice(0, 6);
  }, [rows, place]);

  const choose = (p) => { setPlace(p); setTyped(p); };

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
          Say the place you call yours. No location prompt, nothing kept once you close the page — a region is enough.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); choose(typed.trim()); }}
          className="flex items-stretch gap-2 mb-3"
        >
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="Town, coast or country"
            aria-label="Your place"
            className="flex-1 min-w-0 min-h-[46px] px-3 bg-[#efe7d6] border border-[#141210]/30 text-[14px] text-[#141210] placeholder:text-[#5a5246]/70 focus:outline-none focus:border-[#141210]"
            style={{ fontFamily: 'var(--font-reading)' }}
          />
          <button
            type="submit"
            className="min-h-[46px] px-4 bg-[#141210] text-[#efe7d6] text-[12px] font-black font-mono uppercase tracking-[0.12em] active:bg-[#b3261e] transition-colors"
          >
            Look
          </button>
        </form>

        {places.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {places.map((p) => {
              const on = norm(p) === norm(place);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => choose(p)}
                  aria-pressed={on}
                  className={`text-[10.5px] px-1.5 py-1 border transition-colors ${
                    on ? 'bg-[#141210] text-[#efe7d6] border-[#141210]' : 'bg-transparent text-[#141210] border-[#141210]/25 active:bg-[#efe7d6]'
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

        {rows !== null && norm(place).length < 2 && (
          <p className="text-[12.5px] text-[#5a5246]" style={{ fontFamily: 'var(--font-reading)' }}>
            Press a place above, or type one.
          </p>
        )}

        {rows !== null && norm(place).length >= 2 && near.length === 0 && (
          <p className="text-[13.5px] leading-[1.65] text-[#3a342c]" style={{ fontFamily: 'var(--font-reading)' }}>
            Nothing is on the record near <span className="font-semibold">{place}</span> yet. It says so rather than
            sending you somewhere else — and it fills the moment somebody there puts one on.{' '}
            <Link to="/TogetherChangeClimate" className="text-[#b3261e] underline decoration-dotted underline-offset-2">
              Put one on the record
            </Link>
            .
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
                    <span className="block text-[9px] font-mono uppercase tracking-[0.15em] text-[#5a5246] mb-1">
                      {LABEL[a.action_type] || 'Action'}
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
      </div>
    </section>
  );
}