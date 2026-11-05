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
      // A keeper of the record is NOT an administrator of the app. They are invited as an
      // ordinary user and given a keeper line on the record itself, which is the only power
      // they need: publish, correct, sign, and add people to this list. Handing out the app's
      // admin role would also hand over the vault, the finance and every submitter's address,
      // and being admin is how the record's keys used to leak out of the record.
      const me = await base44.auth.me().catch(() => null);
      const created = await base44.entities.ClimateChecker.create({
        email: clean,
        name: name.trim() || clean,
        is_keeper: true,
        active: true,
        note: 'Keeper — holds the record’s keys',
        added_by: me?.email || '',
      });

      let invited = true;
      try {
        await base44.users.inviteUser(clean, 'user');
      } catch (e) {
        invited = false;
      }

      // Their line on the record, the letter if they need one, and a note to you that it
      // happened. Never fatal to the addition: the key is already in their hand.
      await base44.functions
        .invoke('climateCheckerNotice', {
          email: clean,
          name: name.trim(),
          state: 'invited',
          person_letter: !invited,
          row_id: created?.id || '',
        })
        .catch(() => {});

      setMessage(
        invited
          ? `${name.trim() || clean} holds the keys now and has been sent the invitation.`
          : `${name.trim() || clean} holds the keys now. They already had an account, so no new sign-in letter was sent — they can go straight in.`
      );
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
      <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-record-red mb-2">or add a keeper</p>
      <p className="text-[11px] font-mono text-record-ink/75 leading-relaxed mb-3">
        A keeper holds every key: publishing, correcting, setting how well something is known, signing the record,
        and inviting anyone else. They also see the address of everyone who submitted. Fewer people, more keys.
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