import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { VERIFICATION } from '@/components/climate/verification';

// ── THE KEEPER'S PANEL — admins only, and it renders nothing at all for anyone else ──
//
// How well an entry is known is set by a person, in the open, on the entry itself: it
// cannot be bought by the entry's own wording, and it is not decided by the machine that
// screens submissions. The panel sits exactly where the reader meets the badge, so
// whoever sets the standing is looking at the same words the world reads.
//
// Three things are set here, and only three:
//   · how well it is known — one of the record's three levels
//   · a second, independent origin — named, never guessed, and only if one truly exists
//   · a correction — written in daylight, stamped with the date it was first made

const RECORDS = {
  ClimateSolution: base44.entities.ClimateSolution,
  ClimateAction: base44.entities.ClimateAction,
  ClimateNews: base44.entities.ClimateNews,
};

const LEVELS = ['single_source', 'corroborated', 'official_record'];

export default function VerificationControl({ entry, entityName, onSaved }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [level, setLevel] = useState('single_source');
  const [second, setSecond] = useState('');
  const [correction, setCorrection] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedLabel, setSavedLabel] = useState('');
  const [error, setError] = useState('');
  // Closed until an admin taps it: the entry page belongs to the reader, and a block of
  // admin chrome sitting open in the middle of it reads as if the record had changed shape.
  const [open, setOpen] = useState(false);

  // The record's rules already keep an ordinary visitor out of any write, but the panel
  // should not even appear for one: an empty box a reader cannot use reads as broken.
  useEffect(() => {
    let cancelled = false;
    base44.auth.me()
      .then((user) => { if (!cancelled) setIsAdmin(user?.role === 'admin'); })
      .catch(() => { if (!cancelled) setIsAdmin(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    setLevel(entry.verification || 'single_source');
    setSecond(entry.corroborating_source || '');
    setCorrection(entry.correction_note || '');
    setSavedLabel('');
    setError('');
  }, [entry.id, entry.verification, entry.corroborating_source, entry.correction_note]);

  if (!isAdmin) return null;

  const save = async () => {
    setSaving(true);
    setError('');
    setSavedLabel('');
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const typed = correction.trim();
    const was = (entry.correction_note || '').trim();
    // A correction keeps the date it was first written: editing the wording later does
    // not move it. So the stamp goes on only where there was nothing before.
    const correctionNote = typed === was ? was : typed ? (was ? typed : `${today} — ${typed}`) : '';
    const payload = {
      verification: level,
      corroborating_source: second.trim(),
      correction_note: correctionNote,
    };
    try {
      await RECORDS[entityName].update(entry.id, payload);
      onSaved({ ...entry, ...payload });
      setSavedLabel(VERIFICATION[level].label);
    } catch (e) {
      setError(e?.message || 'That did not save. Try once more.');
    } finally {
      setSaving(false);
    }
  };

  const labelClass = 'block text-[9px] font-black font-mono uppercase tracking-widest text-[#5a5246]';
  const fieldClass = 'mt-1.5 w-full px-3 py-2.5 min-h-[46px] bg-[#efe7d6] border-2 border-[#141210]/30 text-[12px] font-mono text-[#141210] outline-none focus:border-[#141210] placeholder:text-[#5a5246]/60';

  return (
    <div className="mt-6 border-2 border-dashed border-[#141210]/40 bg-[#f7f1e5]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3.5 py-3 min-h-[48px] text-left"
      >
        <span className="text-[9px] font-black font-mono uppercase tracking-widest text-[#b3261e]">
          Keeper's panel · admins only
        </span>
        <span className="text-[9px] font-black font-mono uppercase tracking-wide text-[#5a5246] flex-shrink-0">
          {open ? 'Close' : `${VERIFICATION[level].label} · open`}
        </span>
      </button>

      {open && (
      <div className="px-3.5 pb-3.5">

      <span className={labelClass}>How well is this known?</span>
      <div className="flex flex-wrap gap-1.5 mt-1.5">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`px-2.5 py-2 min-h-[40px] text-[9px] font-black font-mono uppercase tracking-wide border-2 transition-colors ${
              l === level ? 'bg-[#141210] text-[#efe7d6] border-[#141210]' : 'border-[#141210]/40 text-[#141210]'
            }`}
          >
            {VERIFICATION[l].label}
          </button>
        ))}
      </div>

      <label className={`${labelClass} mt-4`} htmlFor="second-origin">
        Second, independent origin — only if one truly exists
      </label>
      <input
        id="second-origin"
        value={second}
        onChange={(e) => setSecond(e.target.value)}
        placeholder="e.g. The Guardian, 3 June 2026"
        className={fieldClass}
      />

      <label className={`${labelClass} mt-4`} htmlFor="correction">
        Correction, in the open
      </label>
      <textarea
        id="correction"
        value={correction}
        onChange={(e) => setCorrection(e.target.value)}
        rows={3}
        placeholder="What was wrong, and what the record now says"
        className={`${fieldClass} leading-relaxed`}
      />
      <p className="mt-2 text-[10px] font-mono text-[#5a5246] leading-relaxed">
        A correction is stamped with today's date the first time it is written. Nothing here is silent: the reader sees the standing, the second origin and any correction on this same page.
      </p>

      {error && <p className="mt-2.5 text-[11px] font-mono text-[#b3261e] leading-relaxed">{error}</p>}
      {savedLabel && <p className="mt-2.5 text-[11px] font-mono text-[#1e3a2b]">Saved · this entry now reads {savedLabel}.</p>}

      <button
        onClick={save}
        disabled={saving}
        className="mt-3.5 w-full lg:w-auto px-5 py-3 min-h-[48px] bg-[#b3261e] text-[#f4efe4] text-[11px] font-black font-mono uppercase border-2 border-[#b3261e] active:bg-[#141210] active:border-[#141210] transition-colors disabled:opacity-60"
      >
        {saving ? 'Saving…' : 'Save to the record'}
      </button>
      </div>
      )}
    </div>
  );
}