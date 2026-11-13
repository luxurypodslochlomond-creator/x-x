import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { KeyRound } from 'lucide-react';
import useKeeperMobile from '@/components/climate/keeper/useKeeperMobile';

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
//
// ── AND IT WEARS THE DESK'S CLOTHES NOW ───────────────────────────────────────
// This block was built before the room had a language, and it never learned it: a bone
// card with a hard border, a shouting mono label in red capitals and a filled red slab
// at the bottom, sitting directly under the checker form — so the People door showed two
// forms that looked like two different products, and the loudest thing on the page was a
// big red button inviting a keeper. Nothing about the job changed here. It is the same
// three fields and the same server call; it simply stands in the same type, the same
// quiet fields and the same one action as the form above it, because a keeper reading
// this door should see one desk and not two.
export default function AddKeeper({ onAdded }) {
  const mobile = useKeeperMobile();
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

  const field = 'w-full min-h-[46px] px-3 mb-2 text-[14px] bg-[#faf6ec] border border-[#141210]/25 text-[#141210] placeholder:text-[#8a7f70]';
  const reading = { fontFamily: 'var(--font-reading)' };

  return (
    <div>
      {!mobile && (
        <p className="text-[12.5px] text-[#6b5f4f] mb-2" style={reading}>
          <KeyRound className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
          Ask for a keeper
        </p>
      )}
      <p className="text-[13px] leading-[1.6] text-[#6b5f4f] mb-2" style={reading}>
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
        className={`${field} mb-3`}
      />
      <button
        onClick={add}
        disabled={busy}
        className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1a1612] text-[#f4efe4] text-[14px] font-semibold disabled:opacity-40"
        style={reading}
      >
        <KeyRound className="w-4 h-4" /> {busy ? 'asking' : mobile ? 'Ask for a keeper' : 'Add them and ask for the keys'}
      </button>
      {message && (
        <p className="text-[14px] leading-[1.6] text-[#141210] mt-3 border-l-2 border-[#b3261e]/50 pl-3" style={reading}>
          {message}
        </p>
      )}
    </div>
  );
}