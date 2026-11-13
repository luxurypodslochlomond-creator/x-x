import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

// ── YOUR OWN LINE, AND NOBODY ELSE'S ────────────────────────────────────────
// Shown only to somebody who is on the list and signed in as themselves. The record asks
// them for their own few words and will not fill them in for them: a line written by a
// keeper or a machine about a volunteer is a description, and this page is a roll of
// people who spoke for themselves.
//
// Emptying it takes them off the roll and does nothing else. Their place on the list, the
// notes they signed and their access all stay exactly as they were — the roll is a page,
// not a membership.
export default function RollOwnLine({ me, onSaved }) {
  const [line, setLine] = useState(me?.line || '');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const save = async (value) => {
    setBusy(true);
    setMessage('');
    try {
      const res = await base44.functions.invoke('climateRoll', { action: 'save', line: value });
      if (res?.data?.error) throw new Error(res.data.error);
      setLine(res.data.line || '');
      setMessage(res.data.line ? 'On the roll, in your words.' : 'Taken off the roll. Your place on the list is untouched.');
      onSaved?.();
    } catch (e) {
      setMessage(e?.response?.data?.error || e?.message || 'That did not save. Nothing was changed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mb-8 border border-record-ink/20 bg-record-bone/60 p-4 lg:p-5">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-record-red">your own line</p>
      <p className="mt-2 text-[13px] leading-[1.6] text-record-ink" style={{ fontFamily: 'var(--font-reading)' }}>
        You are on this list. If you want to stand on the roll, a few words about yourself in your own hand — nobody
        else can write them for you, and leaving them empty keeps you off the roll without touching your place on the
        list.
      </p>

      <textarea
        value={line}
        onChange={(e) => setLine(e.target.value)}
        rows={3}
        maxLength={280}
        placeholder="Two lines about who you are and what you read for."
        className="mt-3 w-full px-3 py-2.5 text-[14px] leading-[1.55] bg-[#faf6ec] border border-[#141210]/25 text-[#141210] placeholder:text-[#8a7f70]"
        style={{ fontFamily: 'var(--font-reading)' }}
      />

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
        <button
          onClick={() => save(line)}
          disabled={busy}
          className="inline-flex min-h-[44px] items-center border-b-2 border-record-red text-[13px] font-semibold text-record-red disabled:opacity-40"
        >
          {busy ? 'saving' : me?.line ? 'save my line' : 'put this on the roll'}
        </button>
        {me?.line && (
          <button
            onClick={() => save('')}
            disabled={busy}
            className="inline-flex min-h-[44px] items-center text-[12.5px] text-record-muted underline decoration-dotted underline-offset-4 disabled:opacity-40"
          >
            take it off
          </button>
        )}
        <span className="ml-auto font-mono text-[10px] text-record-muted">{line.trim().length}/280</span>
      </div>

      {message && (
        <p className="mt-2 text-[13px] leading-[1.6] text-record-ink" style={{ fontFamily: 'var(--font-reading)' }}>
          {message}
        </p>
      )}
    </section>
  );
}