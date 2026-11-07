import React, { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { UserPlus, Pause, Play, Trash2, RefreshCw, KeyRound, Eye } from 'lucide-react';
import AddKeeper from '@/components/climate/AddKeeper';
import AccessSecondKey from '@/components/climate/AccessSecondKey';

// ── THE GUEST LIST OF THE RECORD ──────────────────────────────────────────────
// Deliberately not the same as admin: a checker reads what is waiting and says what they
// find, and that is all. Making somebody an admin to let them do that would hand them every
// submitter's address and the delete button as well.
//
// And nobody moves this list alone. Every change below — putting a pair of eyes on, handing
// over the keys, pausing, restoring, taking somebody off — is asked by one keeper and has to
// be agreed by a different one before it happens. The rule lives on the server, not on this
// page, so it holds whatever the page does. The one honest exception: while there is only
// one keeper on the record there is no second key to ask, so their word stands and the audit
// line says so plainly.
export default function AdminClimateCheckers() {
  const [keepers, setKeepers] = useState([]);
  const [checkers, setCheckers] = useState([]);
  const [waiting, setWaiting] = useState([]);
  const [solo, setSolo] = useState(false);
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

  const section = 'flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-record-muted mb-1.5';
  const field = 'w-full min-h-[44px] px-3 mb-2 text-[13px] font-mono bg-record-paper border border-record-ink/30 text-record-ink';

  const Row = ({ row }) => (
    <div className="border-b border-record-ink/12 py-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-record-ink truncate" style={{ fontFamily: 'var(--font-reading)' }}>
            {row.name || row.email}
          </p>
          <p className="text-[11px] font-mono text-record-muted truncate">{row.email}</p>
          {row.note && <p className="text-[12px] text-record-muted truncate" style={{ fontFamily: 'var(--font-reading)' }}>{row.note}</p>}
        </div>
        <span
          className="text-[9px] font-mono font-black uppercase px-2 py-1 border flex-shrink-0"
          style={{
            color: row.active ? '#1e3a2b' : '#b3261e',
            borderColor: row.active ? 'rgba(30,58,43,0.4)' : 'rgba(179,38,30,0.4)',
          }}
        >
          {row.is_keeper ? (row.active ? 'keeper' : 'keys paused') : (row.active ? 'checking' : 'paused')}
        </span>
      </div>
      <div className="flex flex-wrap gap-4 mt-2">
        <button
          onClick={() => ask({ change: row.active ? 'pause' : 'restore', row_id: row.id })}
          disabled={busy}
          className="min-h-[36px] inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.1em] text-record-ink/80 active:text-record-ink disabled:opacity-40"
        >
          {row.active ? <><Pause className="w-3.5 h-3.5" /> pause</> : <><Play className="w-3.5 h-3.5" /> restore</>}
        </button>
        <button
          onClick={() => ask({ change: 'remove', row_id: row.id })}
          disabled={busy}
          className="min-h-[36px] inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.1em] text-record-red/85 active:text-record-red disabled:opacity-40"
        >
          <Trash2 className="w-3.5 h-3.5" /> remove
        </button>
      </div>
    </div>
  );

  return (
    <div className="pb-16">
      <div className="max-w-2xl mx-auto px-4 pt-8">
        <p className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-record-red mb-3">keepers only</p>
        <h1 className="font-black text-record-ink text-2xl leading-tight mb-2">Who may come into the record</h1>
        <p className="text-[14px] text-record-ink/80 leading-[1.7] mb-4" style={{ fontFamily: 'var(--font-reading)' }}>
          A checker can open entries that are waiting and write a note saying whether each source holds up.
          They cannot publish, edit or delete anything, and they never see a submitter's address. A keeper holds
          the keys themselves. Nobody on this page can be added, paused, restored or removed by one person alone.
        </p>

        {/* The rule, said before it is met rather than after. */}
        <p className="text-[12.5px] text-record-ink/70 leading-[1.6] border-l-2 border-record-red/50 pl-3 mb-6" style={{ fontFamily: 'var(--font-reading)' }}>
          <span className="font-semibold">Two keys, always.</span>{' '}
          {solo
            ? 'You are the only keeper holding the keys today, so for now your word is enough — and the audit trail says so. The moment a second keeper exists, nothing moves without both.'
            : 'One keeper asks, a different keeper agrees, and only then does anything change. The keeper who asked can never agree to their own request, and the last keeper can never be removed.'}
        </p>

        <AccessSecondKey items={waiting} onConfirm={confirm} onCancel={cancel} busy={busy} />

        {message && (
          <p className="text-[12.5px] text-record-ink/80 leading-[1.6] mb-5" style={{ fontFamily: 'var(--font-reading)' }}>
            {message}
          </p>
        )}

        <div className="border-t border-record-ink/20 pt-3 mb-5">
          <p className={section}><KeyRound className="w-3 h-3" /> who holds the keys · {keepers.length}</p>
          {!loading && !keepers.length && (
            <p className="text-[13px] text-record-ink/75 py-2" style={{ fontFamily: 'var(--font-reading)' }}>
              No keeper line on the record yet. Whoever built the app still opens this page.
            </p>
          )}
          {keepers.map((row) => <Row key={row.id} row={row} />)}
        </div>

        <div className="border-t border-record-ink/20 pt-3 mb-5">
          <p className={section}><UserPlus className="w-3 h-3" /> add a checker</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="their email address" inputMode="email" className={field} />
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="their name, as their notes will be signed" className={field} />
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="why (optional), e.g. Trebuchet volunteer" className={`${field} mb-3`} />
          <button
            onClick={addChecker}
            disabled={busy}
            className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 bg-record-ink text-record-paper text-[10px] font-black font-mono uppercase tracking-[0.2em] disabled:opacity-40"
          >
            <UserPlus className="w-4 h-4" /> {busy ? 'asking' : 'ask for a pair of eyes'}
          </button>
        </div>

        <AddKeeper onAdded={load} />

        <div className="flex items-center justify-between gap-3 border-t border-record-ink/20 pt-3 mb-2">
          <p className={`${section} mb-0`}>
            <Eye className="w-3 h-3" /> checking · {checkers.length}
            {!loading && checkers.length > 0 && (
              <span className="text-record-ink/70 normal-case tracking-normal">
                · {checkers.filter((r) => r.active).length} checking
                {checkers.filter((r) => !r.active).length > 0 && ` · ${checkers.filter((r) => !r.active).length} paused`}
              </span>
            )}
          </p>
          <button onClick={load} className="text-[10px] font-mono uppercase text-record-muted inline-flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> refresh
          </button>
        </div>

        {loading && <p className="text-[11px] font-mono text-record-muted">loading</p>}

        {!loading && !checkers.length && (
          <p className="text-[13px] text-record-ink/75 leading-[1.6] border-t border-record-ink/15 py-3" style={{ fontFamily: 'var(--font-reading)' }}>
            Nobody checking yet. Ask above and they will get a letter with a link to set their password.
          </p>
        )}

        {checkers.map((row) => <Row key={row.id} row={row} />)}

        <p className="text-[12px] text-record-muted leading-[1.6] mt-8 border-t border-record-ink/15 pt-4" style={{ fontFamily: 'var(--font-reading)' }}>
          Pausing or removing ends access immediately, and the person is told. Notes they already wrote stay on
          the record and stay in their name, because the checking they did was real whether or not they can check
          tomorrow. Every one of these changes is written into the audit trail with the names of the keeper who
          asked and the keeper who agreed.
        </p>
      </div>
    </div>
  );
}