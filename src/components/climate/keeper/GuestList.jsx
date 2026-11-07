import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { UserPlus, Pause, Play, Trash2, RefreshCw, KeyRound, Eye, History } from 'lucide-react';

const VERBS = {
  access_granted: 'was added',
  access_paused: 'was paused',
  access_restored: 'was let back in',
  access_removed: 'was taken off',
};

const whenLine = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};
import AddKeeper from '@/components/climate/AddKeeper';
import AccessSecondKey from '@/components/climate/AccessSecondKey';

// ── WHO MAY COME INTO THE RECORD ──────────────────────────────────────────────
// This lived on its own address, which meant a keeper had to know the address existed
// before she could add a person to the record she keeps. It is a door of the shed now, and
// it reads like one: a person, their address, and two plain words beside them.
//
// Deliberately not the same as admin: a checker reads what is waiting and says what they
// find, and that is all. Making somebody an admin to let them do that would hand them every
// submitter's address and the delete button as well.
//
// And nobody moves this list alone. Every change — putting a pair of eyes on, handing over
// the keys, pausing, restoring, taking somebody off — is asked by one keeper and agreed by a
// different one before it happens. The rule lives on the server, not on this page, so it
// holds whatever the page does. The one honest exception: while there is only one keeper on
// the record there is no second key to ask, so their word stands and the record says so.
export default function GuestList() {
  const [keepers, setKeepers] = useState([]);
  const [checkers, setCheckers] = useState([]);
  const [waiting, setWaiting] = useState([]);
  const [solo, setSolo] = useState(false);
  const [owner, setOwner] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const call = (payload) => base44.functions.invoke('climateAccessChange', payload);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await call({ action: 'roster' }).catch(() => null);
    const d = res?.data || {};
    setKeepers(d.keepers || []);
    setCheckers(d.checkers || []);
    setWaiting(d.waiting || []);
    setSolo(Boolean(d.solo));
    setOwner(Boolean(d.owner));
    const past = await call({ action: 'history' }).catch(() => null);
    setHistory(past?.data?.history || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // Everything that changes access goes through the same door, so there is one rule rather
  // than a careful rule and a quick one.
  const ask = async (payload) => {
    setBusy(true);
    setMessage('');
    try {
      const res = await call({ action: 'request', ...payload });
      const d = res?.data || {};
      if (d.error) throw new Error(d.error);
      setMessage(d.message || '');
      if (d.applied) { setEmail(''); setName(''); setNote(''); }
    } catch (e) {
      setMessage(e?.response?.data?.error || e?.message || 'That did not go through. Nothing was changed.');
    } finally {
      setBusy(false);
      load();
    }
  };

  const confirm = async (changeId) => {
    setBusy(true);
    setMessage('');
    try {
      const res = await call({ action: 'confirm', change_id: changeId });
      setMessage(res?.data?.message || 'Agreed and done.');
    } catch (e) {
      setMessage(e?.response?.data?.error || e?.message || 'That did not go through. Nothing was changed.');
    } finally {
      setBusy(false);
      load();
    }
  };

  const cancel = async (changeId) => {
    setBusy(true);
    setMessage('');
    try {
      const res = await call({ action: 'cancel', change_id: changeId });
      setMessage(res?.data?.message || 'Withdrawn.');
    } catch (e) {
      setMessage(e?.response?.data?.error || e?.message || 'That did not go through.');
    } finally {
      setBusy(false);
      load();
    }
  };

  const addChecker = () => {
    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes('@')) { setMessage('That address does not look right.'); return; }
    ask({ change: 'add', email: clean, name: name.trim(), note: note.trim(), is_keeper: false });
  };

  const label = 'text-[12.5px] text-[#6b5f4f] mb-2';
  const field = 'w-full min-h-[46px] px-3 mb-2 text-[14px] bg-[#faf6ec] border border-[#141210]/25 text-[#141210] placeholder:text-[#8a7f70]';
  const reading = { fontFamily: 'var(--font-reading)' };

  const Row = ({ row }) => (
    <div className="border-b border-[#141210]/12 py-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-[#141210] leading-snug" style={reading}>
            {row.name || row.email}
          </p>
          <p className="text-[12px] text-[#6b5f4f] break-all" style={reading}>{row.email}</p>
          {row.note && <p className="text-[12.5px] text-[#6b5f4f] leading-snug" style={reading}>{row.note}</p>}
        </div>
        <span
          className="text-[11px] px-2 py-1 border flex-shrink-0 whitespace-nowrap"
          style={{
            ...reading,
            color: row.active ? '#1e3a2b' : '#b3261e',
            borderColor: row.active ? 'rgba(30,58,43,0.35)' : 'rgba(179,38,30,0.35)',
            background: row.active ? 'rgba(30,58,43,0.05)' : 'rgba(179,38,30,0.05)',
          }}
        >
          {row.is_keeper ? (row.active ? 'has the keys' : 'keys paused') : (row.active ? 'checking' : 'paused')}
        </span>
      </div>
      <div className="flex flex-wrap gap-5 mt-1.5">
        <button
          onClick={() => ask({ change: row.active ? 'pause' : 'restore', row_id: row.id })}
          disabled={busy}
          className="min-h-[40px] inline-flex items-center gap-1.5 text-[13px] text-[#141210] border-b border-[#141210]/40 active:text-[#b3261e] disabled:opacity-40"
          style={reading}
        >
          {row.active ? <><Pause className="w-3.5 h-3.5" /> pause</> : <><Play className="w-3.5 h-3.5" /> let them back in</>}
        </button>
        <button
          onClick={() => ask({ change: 'remove', row_id: row.id })}
          disabled={busy}
          className="min-h-[40px] inline-flex items-center gap-1.5 text-[13px] text-[#b3261e] border-b border-[#b3261e]/40 disabled:opacity-40"
          style={reading}
        >
          <Trash2 className="w-3.5 h-3.5" /> take off the list
        </button>
      </div>
    </div>
  );

  return (
    <div className="pb-10">
      <p className="text-[15px] leading-[1.7] text-[#2b2622] mb-2" style={reading}>
        A checker opens what is waiting and writes a note saying whether each source holds up. They cannot publish,
        edit or delete anything, and they never see who submitted it. A keeper holds the keys and does the deciding.
      </p>
      <p className="text-[14px] leading-[1.7] text-[#3a342c] mb-5" style={reading}>
        <span className="font-semibold">Two keys.</span>{' '}
        {solo
          ? 'You are the only keeper holding the keys today, so for now your word is enough — and the record says so. The moment a second keeper exists, nothing moves without both.'
          : owner
          ? 'You hold the building\'s keys, so your own ask lands straight away — and the audit line says plainly that it stood alone. Every other keeper still needs a second name before anything moves.'
          : 'One keeper asks, a different keeper agrees, and only then does anything change. The keeper who asked can never agree to their own request, and the last keeper can never be taken off.'}
      </p>

      <AccessSecondKey items={waiting} onConfirm={confirm} onCancel={cancel} busy={busy} />

      {message && (
        <p className="text-[14px] leading-[1.6] text-[#141210] mb-5 border-l-2 border-[#b3261e]/50 pl-3" style={reading}>
          {message}
        </p>
      )}

      <div className="border-t border-[#141210]/20 pt-4 mb-6">
        <p className={label} style={reading}><KeyRound className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />People who hold the keys</p>
        {!loading && !keepers.length && (
          <p className="text-[14px] text-[#3a342c] py-1" style={reading}>
            No keeper line on the record yet. Whoever built the app still opens this page.
          </p>
        )}
        {keepers.map((row) => <Row key={row.id} row={row} />)}
      </div>

      <div className="border-t border-[#141210]/20 pt-4 mb-6">
        <p className={label} style={reading}><UserPlus className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />Ask somebody to check</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="their email address" inputMode="email" className={field} />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="their name, as their notes will be signed" className={field} />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="why (optional), e.g. Trebuchet volunteer" className={`${field} mb-3`} />
        <button
          onClick={addChecker}
          disabled={busy}
          className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1a1612] text-[#f4efe4] text-[14px] font-semibold disabled:opacity-40"
          style={reading}
        >
          <UserPlus className="w-4 h-4" /> {busy ? 'asking' : 'Add them to the checking list'}
        </button>
      </div>

      <div className="mb-6">
        <AddKeeper onAdded={load} />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#141210]/20 pt-4 mb-1">
        <p className={`${label} mb-0`} style={reading}>
          <Eye className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
          People checking
          {checkers.length > 0 && <span className="text-[#8a7f70]"> · {checkers.filter((r) => r.active).length} now, {checkers.filter((r) => !r.active).length} paused</span>}
        </p>
        <button onClick={load} className="text-[12.5px] text-[#6b5f4f] inline-flex items-center gap-1 min-h-[36px]" style={reading}>
          <RefreshCw className="w-3 h-3" /> again
        </button>
      </div>

      {loading && <p className="text-[13px] text-[#6b5f4f]" style={reading}>Looking at the list…</p>}

      {!loading && !checkers.length && (
        <p className="text-[14px] text-[#3a342c] leading-[1.6] py-2" style={reading}>
          Nobody checking yet. Ask above and they get a letter with a link to set a password.
        </p>
      )}

      {checkers.map((row) => <Row key={row.id} row={row} />)}

      <p className="text-[13px] text-[#6b5f4f] leading-[1.7] mt-8 border-t border-[#141210]/15 pt-4" style={reading}>
        Pausing or taking somebody off ends their access straight away, and they are told. Notes they already wrote
        stay on the record in their name, because the checking they did was real whether or not they can check
        tomorrow. Every change here is written into the audit trail with both keepers' names.
      </p>

      {/* The proof, one line per change: who, what, and the exact minute. It is folded away by
          default because the shed is for the next job, not for reading yesterday — but it is one
          tap from the same page where the change is made, which is where a fair question gets
          asked. */}
      <div className="mt-6 border-t border-[#141210]/15 pt-3">
        <button
          onClick={() => setShowHistory((v) => !v)}
          className="w-full flex items-center justify-between gap-2 min-h-[44px] text-left"
        >
          <span className="text-[12.5px] text-[#6b5f4f]" style={reading}>
            <History className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
            What has changed here
            {history.length > 0 && <span> · {history.length}</span>}
          </span>
          <span className="text-[12.5px] text-[#b3261e]" style={reading}>{showHistory ? 'hide' : 'show'}</span>
        </button>

        {showHistory && (
          <div className="pt-1">
            {!history.length && (
              <p className="text-[14px] text-[#3a342c] leading-[1.6]" style={reading}>
                Nothing has changed yet. The first line here will be the first person added.
              </p>
            )}
            {history.map((h) => (
              <div key={h.id} className="py-2.5 border-b border-[#141210]/10 last:border-0">
                <p className="text-[14px] text-[#141210] leading-[1.5]" style={reading}>
                  <span className="font-semibold">{h.title || h.by || 'someone'}</span>{' '}
                  <span className="text-[#3a342c]">{VERBS[h.action] || h.action}</span>
                </p>
                <p className="text-[12px] text-[#6b5f4f]" style={reading}>
                  {whenLine(h.when)}
                  {h.by ? ` · ${h.by}` : ''}
                </p>
                {h.note && (
                  <p className="text-[12.5px] text-[#3a342c] leading-[1.55] mt-0.5" style={reading}>{h.note}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}