import React, { useState, useEffect, useCallback, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { MarkKey, MarkEye, MarkLedger } from '@/components/climate/keeper/KeeperMarks';
import { MarkAgain } from '@/components/climate/keeper/TrailMarks';
import InvitePersonForm from '@/components/climate/keeper/InvitePersonForm';
import GuestPerson from '@/components/climate/keeper/GuestPerson';

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

import AccessSecondKey from '@/components/climate/AccessSecondKey';
import InviteSteps from '@/components/climate/keeper/InviteSteps';
import { CUSTODIAN, CUSTODIANS, CUSTODIANS_TITLE, SIGNATORY, SIGNATORIES, SIGNATORIES_TITLE } from '@/components/climate/recordWords';
import KeeperPhone from '@/components/climate/keeper/KeeperPhone';


// ── WHO MAY COME INTO THE RECORD ──────────────────────────────────────────────
// Deliberately not the same as admin: a checker reads what is waiting and says what they
// find, and that is all. Making somebody an admin to let them do that would hand them every
// submitter's address and the delete button as well.
//
// And the list moves by a rule, not a mood. A pair of eyes is one keeper's decision — added,
// paused or ended on her word, and the audit line carries her name so it was never quiet.
// The keys are the ones that take two: one keeper asks, a different keeper agrees. The rule
// lives on the server, not on this page, so it holds whatever the page does. The one honest
// exception: while there is only one keeper on the record there is no second key to ask.
//
// ── THIS DOOR WAS A CORRIDOR ───────────────────────────────────────────────────
// Brian, 15 November: "I'm a keeper too... it's kind of confusing and geeky boring to me."
// He was right, and the reason was structural rather than cosmetic. Opening People used to
// give you: the keys, a paragraph about keys, a card to draw, a form for checkers, three
// steps to send, a second form for keepers, then the checkers list, then another paragraph,
// then the history. Eight things in a column, and the two forms asked the same three
// questions — so the first job was working out which form you wanted, before you could put
// a person on the list.
//
// Now it is three. Who is on the record, in one place, keys then checking. One form that
// asks which of the two you are giving — one word, one line of consequence under it. Then
// the paperwork, folded: the words to send, how access works, what has changed. Nothing was
// taken away and no rule was loosened; the corridor just stopped being a corridor.
export default function GuestList({ onChange }) {
  const [keepers, setKeepers] = useState([]);
  const [checkers, setCheckers] = useState([]);
  const [waiting, setWaiting] = useState([]);
  const [solo, setSolo] = useState(false);
  const [owner, setOwner] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [kind, setKind] = useState('check');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const busyRef = useRef(false);
  const [loadError, setLoadError] = useState('');
  const [historyError, setHistoryError] = useState('');
  const [resultFailed, setResultFailed] = useState(false);
  const [feedbackRow, setFeedbackRow] = useState('');

  const call = (payload) => base44.functions.invoke('climateAccessChange', payload);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await base44.functions.invoke('climateAccessChange', { action: 'roster' });
      const d = res.data;
      if (!d || d.error) throw new Error(d?.error || 'The guest list could not be loaded.');
      setKeepers(d.keepers || []);
      setCheckers(d.checkers || []);
      setWaiting(d.waiting || []);
      setSolo(Boolean(d.solo));
      setOwner(Boolean(d.owner));
    } catch (e) {
      setLoadError(e?.response?.data?.error || e?.message || 'The guest list could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!showHistory) return;
    setHistoryError('');
    base44.functions.invoke('climateAccessChange', { action: 'history' })
      .then((res) => setHistory(res.data?.history || []))
      .catch((e) => setHistoryError(e?.response?.data?.error || e.message));
  }, [showHistory, message]);

  const run = async (payload, fromForm = false) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setFeedbackRow(fromForm || payload.change === 'remove' ? '' : payload.row_id || '');
    setMessage('');
    setResultFailed(false);
    try {
      const res = await call(payload);
      const d = res.data || {};
      if (d.error) throw new Error(d.error);
      setMessage(d.message || 'Saved.');
      setResultFailed(d.complete === false);
      if (payload.change === 'add' && d.applied) { setEmail(''); setName(''); setNote(''); }
      await load();
      onChange?.();
    } catch (e) {
      setResultFailed(true);
      setMessage(e?.response?.data?.error || e?.message || 'That did not go through. Try again.');
      await load();
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };
  const ask = (payload) => run({ action: 'request', ...payload });
  const confirm = (changeId) => run({ action: 'confirm', change_id: changeId });
  const cancel = (changeId) => run({ action: 'cancel', change_id: changeId });
  const resend = (row, fromForm = false) => run({ action: 'notice', row_id: row.id }, fromForm);
  const add = () => {
    const clean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setFeedbackRow(''); setResultFailed(true); setMessage('Enter a valid email address.'); return;
    }
    const existing = [...keepers, ...checkers].find((row) => row.email.toLowerCase() === clean);
    if (existing) {
      if (!existing.active || existing.is_keeper !== (kind === 'keys')) {
        setFeedbackRow(''); setResultFailed(true);
        setMessage(!existing.active ? 'They are already on the list with access paused. Use Restore access beside their name.' : `They are already on the list as a ${existing.is_keeper ? CUSTODIAN : SIGNATORY}. Use Send invite beside their name. Their role has not changed.`);
        return;
      }
      resend(existing, true);
      return;
    }
    ask({ change: 'add', email: clean, name: name.trim(), note: note.trim(), is_keeper: kind === 'keys' });
  };
  const reading = { fontFamily: 'var(--font-body)' };
  const person = (row) => <GuestPerson key={row.id} row={row} busy={busy} pending={busy && feedbackRow === row.id} onInvite={resend} onChange={ask} message={feedbackRow === row.id ? message : ''} failed={resultFailed} />;

  return (
    <div className="pb-10 font-body">
      <AccessSecondKey items={waiting} onConfirm={confirm} onCancel={cancel} busy={busy} />
      <InvitePersonForm kind={kind} setKind={setKind} email={email} setEmail={setEmail} name={name} setName={setName} note={note} setNote={setNote} busy={busy} ready={!loading && !loadError} solo={solo} owner={owner} onSubmit={add} message={feedbackRow ? '' : message} failed={resultFailed} />
      {loadError && <div role="alert" className="mb-4 border-l-2 border-record-red pl-3 text-sm text-record-red">The guest list could not be refreshed. {loadError} <button type="button" onClick={load} disabled={busy} className="min-h-11 underline underline-offset-4">Try again</button></div>}

      {/* ── WHO IS ON THE RECORD, IN ONE PLACE ──────────────────────────────────
          The keys stood at the top and the checkers at the bottom, with two forms and a card
          between them — so "who is on this record" was a question you answered by scrolling.
          Both lists are here now, and nothing sits between them. */}
      <div className="border-t border-[#141210]/20 pt-3 mb-5">
        <div className="mb-2 flex items-center gap-2 border-b border-[#b3261e]/40 pb-1">
          <MarkKey size={20} className="text-[#b3261e]" />
          <span className="text-base font-bold text-record-ink">{CUSTODIANS_TITLE}</span>
        </div>
        {!loading && !loadError && !keepers.length && (
          <p className="text-[14px] text-[#3a342c] py-1" style={reading}>
            No {CUSTODIAN} line on the record yet. Whoever built the app still opens this page.
          </p>
        )}
        {keepers.map(person)}

        <div className="mb-3 mt-6 flex items-center gap-2 border-b border-record-red/40 pb-2">
          <MarkEye size={20} className="text-record-red" />
          <span className="text-base font-bold text-record-ink">{SIGNATORIES_TITLE}</span>
        </div>
        {loading && <p className="text-[13px] text-[#6b5f4f]" style={reading}>Looking at the list…</p>}
        {!loading && !loadError && !checkers.length && (
          <p className="text-[14px] text-[#3a342c] leading-[1.6] py-1" style={reading}>
            Invite a {SIGNATORY} above. Their email status will appear here.
          </p>
        )}
        {checkers.map(person)}

        <button type="button" onClick={load} disabled={loading || busy} className="mt-2 text-sm text-record-muted inline-flex items-center gap-1 min-h-11 disabled:opacity-50" style={reading}>
          <MarkAgain size={15} /> Refresh people
        </button>
      </div>

      <InviteSteps />
      <KeeperPhone />

      {/* ── HOW THE RULE WORKS, ONCE ────────────────────────────────────────────
          There were two paragraphs about access in two places, and the audit sentence lived
          in the second one, six screens below the buttons it describes. One paragraph, and
          the audit line is part of it. */}
      <details className="room-details mb-6 border-t border-record-ink/15 pt-3">
        <summary className="cursor-pointer text-sm text-record-muted">Who can do what?</summary>
        <p className="mt-2 text-sm leading-relaxed text-record-muted" style={reading}>
          A {CUSTODIAN} can invite a {SIGNATORY} directly. {SIGNATORIES.charAt(0).toUpperCase() + SIGNATORIES.slice(1)} read sources and leave signed notes; they cannot publish or see private submission details. Custodian access normally needs two different custodians. {solo ? 'With only one custodian, that custodian can act alone.' : owner ? 'As an app admin, you can act directly; that exception is logged.' : 'The person requesting a custodian change cannot approve it.'} The last {CUSTODIAN} cannot be removed. Pausing access never erases signed work.
        </p>
      </details>

      {/* The proof, one line per change: who, what, and the exact minute. It is folded away by
          default because the shed is for the next job, not for reading yesterday — but it is one
          tap from the same page where the change is made, which is where a fair question gets
          asked. */}
      <div className="border-t border-[#141210]/15 pt-3">
        <button
          onClick={() => setShowHistory((v) => !v)}
          className="w-full flex items-center justify-between gap-2 min-h-[44px] text-left"
        >
          <span className="text-[12.5px] text-[#6b5f4f]" style={reading}>
            <MarkLedger size={14} className="inline mr-1.5 -mt-0.5" />
            What has changed here
            {history.length > 0 && <span> · {history.length}</span>}
          </span>
          <span className="text-[12.5px] text-[#b3261e]" style={reading}>{showHistory ? 'hide' : 'show'}</span>
        </button>

        {showHistory && (
          <div className="pt-1">
            {historyError && <p role="alert" className="text-sm text-record-red">History could not be loaded: {historyError}</p>}
            {!historyError && !history.length && (
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