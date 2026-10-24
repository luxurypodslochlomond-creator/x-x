import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Check, AlertTriangle } from 'lucide-react';

// ── ONE LINE, IN YOUR OWN HAND ──────────────────────────────────────────────────
// Why a piece lands cannot be read out of a file, and the record does not ask a machine
// to guess at it. So the only thing kept is what a person actually said, as they said it:
// no name unless they want one, no email asked for, nothing counted, nothing replied to,
// nothing corrected. A clean line goes up the moment it is left; a flagged one waits for
// a keeper, and the person is told which of the two happened.

const FIELD = 'w-full px-3 py-3 min-h-[44px] bg-[#f7f1e5] border-2 border-[#141210]/25 focus:border-[#141210] text-[13px] font-mono text-[#141210] outline-none transition-colors';
const LABEL = 'block text-[9px] font-black font-mono uppercase tracking-[0.18em] text-[#5a5246] mb-1.5';

export default function WordForm({ trackId, onLeft }) {
  const [word, setWord] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [left, setLeft] = useState('');

  const send = async () => {
    if (word.trim().length < 2) {
      setError('Write your line first, even a short one.');
      return;
    }
    setError('');
    setBusy(true);
    try {
      const res = await base44.functions.invoke('climateWordSubmit', {
        data: { track_id: trackId, word: word.trim(), listener_name: name.trim() },
      });
      const result = res?.data || {};
      if (result.error) throw new Error(result.error);
      setLeft(result.status === 'published' ? 'published' : 'held');
      setWord('');
      setName('');
      onLeft?.();
    } catch (e) {
      setError(e?.message || 'That did not go through, try once more.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-4 border-t border-[#141210]/15 pt-4">
      {left === 'published' && (
        <p className="flex items-start gap-2 text-[11px] font-mono text-[#1e3a2b] leading-relaxed mb-3">
          <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          It is on the record now, exactly as you wrote it.
        </p>
      )}
      {left === 'held' && (
        <p className="flex items-start gap-2 text-[11px] font-mono text-[#b8860b] leading-relaxed mb-3">
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          Held for a keeper to read. Nothing is lost, and nothing is changed.
        </p>
      )}

      <label className={LABEL} htmlFor="listener-word">Your line about it</label>
      <textarea
        id="listener-word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        rows={3}
        maxLength={600}
        className={FIELD}
        placeholder="What it did, in your own words."
      />

      <div className="mt-3">
        <label className={LABEL} htmlFor="listener-name">A name, only if you want one</label>
        <input
          id="listener-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          className={FIELD}
          placeholder="Optional. Nothing else is asked of you."
        />
      </div>

      {/* The honeypot: a person never sees it, a bot fills it in. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" onChange={() => {}} />

      {error && (
        <p className="mt-3 text-[11px] font-mono text-[#b3261e] border-l-4 border-l-[#b3261e] bg-[#b3261e]/5 px-3 py-2 leading-relaxed">{error}</p>
      )}

      <button
        onClick={send}
        disabled={busy}
        className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] bg-[#e2602a] text-[#141210] text-[11px] font-black font-mono uppercase border-2 border-[#141210] active:bg-[#1e3a2b] active:text-[#efe7d6] transition-colors disabled:opacity-50"
      >
        {busy ? 'Leaving it…' : 'Leave it here'}
      </button>

      <p className="mt-2 text-[9px] font-mono text-[#5a5246] leading-relaxed">
        Kept as you write it. Nobody edits it: not the artist, not the record. No email is asked for,
        nothing is counted, and there is nothing to reply to. Only a keeper can take down a line that
        breaks the law.
      </p>
    </div>
  );
}