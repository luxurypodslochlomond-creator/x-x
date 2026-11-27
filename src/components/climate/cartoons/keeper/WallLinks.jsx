import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';

// ── THE WALL AND THE DOORS, JOINED ─────────────────────────────────────────────
// Brian, 27 November, at ten past six in the evening: "crisis action solutions not working
// for me… something's missing." He was right and it was measurable: thirty-two drawings on
// the wall, and not one of them pointing at the entry it was about. The wall and the three
// doors stood in separate rooms.
//
// A machine cannot know what a drawing is looking at, so this is not something the record
// can fill in for anybody. It is one person, saying which entry a drawing answers, one
// drawing at a time — and the server resolves that entry against the record itself, so a
// wrong id can never put a wrong headline under somebody's work.
//
// The list puts the drawings that still stand alone at the top, because the work is the
// ones not yet joined. Tying one drops it down the page: that is the progress bar.

const reading = { fontFamily: 'var(--font-reading)' };

export default function WallLinks() {
  const [drawings, setDrawings] = useState(null);
  const [groups, setGroups] = useState([]);
  const [busy, setBusy] = useState('');
  const [said, setSaid] = useState('');

  const load = useCallback(async () => {
    const [c, s, a] = await Promise.all([
      base44.entities.ClimateCartoon.filter({ status: 'published' }, { sort: '-created_date', limit: 200 }),
      base44.entities.ClimateSolution.list('-created_date', 200),
      base44.entities.ClimateAction.list('-created_date', 200),
    ]);
    // A page and a plain list are both possible answers here, and reading the wrong one
    // would leave the picker empty on the one evening it is needed.
    const rows = (list) => (Array.isArray(list) ? list : (list?.items || []));
    const solutions = rows(s);
    setDrawings(rows(c));
    setGroups([
      { label: 'Climate crises', items: solutions.filter((e) => e.entry_type === 'climate_crisis') },
      { label: 'Solutions', items: solutions.filter((e) => e.entry_type !== 'climate_crisis') },
      { label: 'Actions', items: rows(a) },
    ]);
  }, []);

  useEffect(() => { load(); }, [load]);

  const tie = async (drawing, entryId) => {
    setBusy(drawing.id);
    setSaid('');
    try {
      const res = await base44.functions.invoke('climateCartoon', { action: 'link', id: drawing.id, entry_id: entryId });
      if (res?.data?.error) { setSaid(res.data.error); return; }
      setDrawings((prev) => (prev || []).map((d) => (d.id === drawing.id
        ? { ...d, crisis_id: res.data.crisis_id || '', crisis_title: res.data.crisis_title || '', crisis_type: res.data.crisis_type || '' }
        : d)));
    } finally {
      setBusy('');
    }
  };

  const ordered = useMemo(() => {
    const rows = drawings || [];
    return [...rows.filter((d) => !d.crisis_id), ...rows.filter((d) => d.crisis_id)];
  }, [drawings]);

  if (!drawings) {
    return <p className="py-10 text-[13px] text-record-muted" style={reading}>Reading the wall…</p>;
  }

  const tied = drawings.filter((d) => d.crisis_id).length;

  return (
    <div>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-red">The wall and the doors</p>
      <h1 className="mt-2 text-[26px] font-bold leading-[1.15] text-record-ink" style={reading}>
        Which entry does each drawing answer?
      </h1>
      <p className="mt-2 max-w-[52ch] text-[14px] leading-[1.65] text-record-muted" style={reading}>
        A drawing that answers a crisis, a solution or an action opens that entry when a reader taps it — and the entry
        shows the drawing underneath it. The record will not guess this for you, so it is said here, by hand, one at a
        time. Nothing goes public until you choose it.
      </p>
      <p className="mt-2 max-w-[52ch] text-[13px] leading-[1.6] text-record-muted" style={reading}>
        None of this is needed for the hour itself. Her agenda has the drawings presented as the artists speak, not
        filed against entries — so this is a quiet-morning job, and the wall stands perfectly well without a line of it.
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-record-ink">
        {tied} of {drawings.length} joined · {drawings.length - tied} still standing alone
      </p>
      {said && <p className="mt-2 text-[13px] text-record-red" role="alert">{said}</p>}

      <div className="mt-5 space-y-3">
        {ordered.map((drawing) => (
          <div key={drawing.id} className="flex gap-3 border border-record-ink/20 bg-record-bone/40 p-2.5">
            {/* ── THE DRAWING, OPENED WHEN IT IS TAPPED ────────────────────────────
                You cannot say which entry a drawing answers without looking at the
                drawing, and a thumbnail on a phone is not enough to look at. Tapping it
                opens the sheet in a new tab, so the desk stays where it was. */}
            <a
              href={`/ClimateCartoons/Sheet/${drawing.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
              aria-label={`Open ${drawing.title || drawing.artist_name} full size`}
            >
              <img
                src={drawing.image_url}
                alt={drawing.title || drawing.artist_name}
                loading="lazy"
                className="h-[84px] w-[84px] border border-record-ink/15 bg-record-paper object-contain"
              />
            </a>
            <div className="min-w-0 flex-1">
              {/* A drawing with no name of its own is known by the hand that made it —
                  the wall's own rule. "Untitled" is a printer's word, not a person's. */}
              <p className="text-[13.5px] font-semibold leading-tight text-record-ink" style={reading}>
                {drawing.title || drawing.artist_name}
              </p>
              {(drawing.title || drawing.credit) && (
                <p className="text-[11.5px] leading-snug text-record-muted" style={reading}>
                  {drawing.title ? drawing.artist_name : drawing.credit}
                </p>
              )}
              <select
                value={drawing.crisis_id || ''}
                disabled={busy === drawing.id}
                onChange={(e) => tie(drawing, e.target.value)}
                aria-label={`The entry ${drawing.title || drawing.artist_name} answers`}
                className="mt-1.5 w-full min-h-[42px] border border-record-ink/30 bg-record-paper px-2 text-[12.5px] text-record-ink disabled:opacity-50"
                style={reading}
              >
                <option value="">Not tied to an entry</option>
                {/* The count goes in the header, because a list you cannot see the end of
                    reads as a list that is missing something. */}
                {groups.map((group) => (
                  <optgroup key={group.label} label={`${group.label} · ${group.items.length}`}>
                    {group.items.map((entry) => (
                      <option key={entry.id} value={entry.id}>{entry.title}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {drawing.crisis_id && (
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-record-red">
                  Answers · {drawing.crisis_title || 'an entry on the record'}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}