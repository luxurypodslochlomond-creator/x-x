import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { KeyRound } from 'lucide-react';

// ── ADD A KEEPER, FROM THE RECORD'S OWN DESK ────────────────────────────────
//
// A checker is a pair of eyes. A keeper is the keys: they publish, correct, set how
// well something is known, sign the record, and add or remove anyone else. That is a
// much larger thing to hand over, so it is kept apart from the checker form rather
// than being a toggle somebody could hit by accident on a phone.
//
// The invitation itself is sent by the platform, in this record's own skin: paper,
// ink, one signal-red button, x = x at the top. Nothing about it looks like a
// dashboard, because the person receiving it is being invited to the record, not to
// a piece of software.
export default function AddKeeper({ onAdded }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const add = async () => {
    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes('@')) { setMessage('That address does not look right.'); return; }
    setBusy(true);
    setMessage('');
    try {
      // A keeper of the record is NOT an administrator of the app, and the keys are never
      // handed over by one hand. This asks the record's own server: the line is added, the
      // person is invited and told, and the audit trail is written — but only once a second
      // keeper has agreed, unless there is nobody else holding the keys to ask.
      const res = await base44.functions.invoke('climateAccessChange', {
        action: 'request',
        change: 'add',
        email: clean,
        name: name.trim() || clean,
        is_keeper: true,
        note: 'Keeper — holds the record’s keys',
      });
      const data = res?.data || {};
      if (data.error) throw new Error(data.error);

      setMessage(data.message || 'Asked.');
      setEmail(''); setName('');
      onAdded?.();
    } catch (e) {
      setMessage(e?.message || 'That did not go through. Nothing was changed.');
    } finally {
      setBusy(false);
    }
  };

  const field = 'w-full min-h-[44px] px-3 mb-2 text-[13px] font-mono bg-record-paper border-2 border-record-ink/25 text-record-ink';

  return (
    <div className="bg-record-bone border-2 border-record-ink/40 p-4 mb-8">
      <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-record-red mb-2">or ask for a keeper</p>
      <p className="text-[12px] text-record-ink/75 leading-[1.6] mb-3" style={{ fontFamily: 'var(--font-reading)' }}>
        A keeper holds every key: publishing, correcting, setting how well something is known, signing the record,
        and inviting anyone else. They also see the address of everyone who submitted. Fewer people, more keys —
        so this is asked here and agreed by another keeper before the keys change hands.
      </p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="their email address"
        inputMode="email"
        className={field}
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="their name, as they will sign"
        className={field}
      />
      <button
        onClick={add}
        disabled={busy}
        className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 bg-record-red text-record-paper text-[10px] font-black font-mono uppercase tracking-[0.2em] disabled:opacity-40"
      >
        <KeyRound className="w-4 h-4" /> {busy ? 'sending' : 'add and invite as keeper'}
      </button>
      {message && <p className="text-[11px] font-mono text-record-ink/80 mt-3 leading-relaxed">{message}</p>}
    </div>
  );
}