import React, { useState, useEffect, useCallback, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { UserPlus } from 'lucide-react';
import { MarkKey, MarkEye, MarkLedger } from '@/components/climate/keeper/KeeperMarks';
import {
  MarkLetter, MarkStep, MarkAgreed, MarkHold, MarkStrike, MarkAgain, MarkNote,
} from '@/components/climate/keeper/TrailMarks';

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
import KeeperPhone from '@/components/climate/keeper/KeeperPhone';
import useKeeperMobile from '@/components/climate/keeper/useKeeperMobile';

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
export default function GuestList() {
  const mobile = useKeeperMobile();
  const AccessGuide = mobile ? 'details' : React.Fragment;
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
  const noteRef = useRef(null);

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

  // ── THE ANSWER WAS BEING SHOWN TWO SCREENS FROM THE TAP ──────────────────────
  // Brian, 17 November: "tried sending an email to a keeper, nothing saved." Nothing
  // appeared to happen, because the only line that says what happened was printed at the
  // very top of this door while the button he pressed is at the bottom of it — and an ask
  // for the keys does not change the list, it only opens a slip above. So the note now
  // sits beside the work and comes to the eye when it changes. No rule was relaxed: it is
  // the same server, the same two keys, and the same refusal to let one hand move access.
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => noteRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 60);
    return () => clearTimeout(t);
  }, [message]);

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

  // ── SEND THE LETTER AGAIN ────────────────────────────────────────────────────
  // Only ever for a line whose letter did not go. It changes nothing about the person, so
  // nobody has to be taken off and put back on to make up for a failed letter.
  const resend = async (row) => {
    setBusy(true);
    setMessage('');
    try {
      const res = await call({ action: 'notice', row_id: row.id });
      setMessage(res?.data?.message || 'The record could not send its letter.');
    } catch (e) {
      setMessage(e?.response?.data?.error || e?.message || 'The record could not send its letter.');
    } finally {
      setBusy(false);
      load();
    }
  };

  // One form, two hands. The payload is exactly what the two separate forms sent before —
  // nothing about the rule changed when the corridor became one door.
  const add = () => {
    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes('@')) { setMessage('That address does not look right.'); return; }
    if (kind === 'keys') {
      ask({
        change: 'add',
        email: clean,
        name: name.trim() || clean,
        is_keeper: true,
        note: 'Keeper — holds the record’s keys',
      });
      return;
    }
    ask({ change: 'add', email: clean, name: name.trim(), note: note.trim(), is_keeper: false });
  };

  const label = 'text-[12.5px] text-[#6b5f4f] mb-2';
  const field = 'w-full min-h-[46px] px-3 mb-2 text-[14px] bg-[#faf6ec] border border-[#141210]/25 text-[#141210] placeholder:text-[#8a7f70]';
  const reading = { fontFamily: 'var(--font-reading)' };

  // ── ONE PERSON, ONE LINE AND A HALF ─────────────────────────────────────────
  // Every row used to be a name, an address, a note, a badge and two full-width action
  // words, so three keepers filled a phone screen with three people. The same facts are
  // here: the name and their standing on one line, the address and the reason under it,
  // and the two things you can do to them at the end of the same row — one tap, no scroll.
  //
  // And it says what is actually on the record rather than what it hopes: the day they were
  // asked, the notes they have signed, and whether they wrote their own line. The record
  // cannot see an email being opened and will not pretend to.
  const shortDay = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  // The day as it is printed on the line: 5 Nov, never a timestamp.
  const dayOr = (iso, fallback) => (iso ? shortDay(iso) : fallback);

  // One person as a line in a printed register: the name set properly, the standing of their
  // line stamped beside it, the facts in the machine's small hand underneath, the two things
  // you can do to them at the end of the same line. Nothing centred, nothing carded, nothing
  // rounded — a register, not a dashboard.
  const Row = ({ row }) => {
    const stamp = row.is_keeper
      ? row.active ? 'keys' : 'paused'
      : !row.active ? 'paused' : row.notes > 0 ? 'checking' : 'asked';
    const stampColour = !row.active ? '#b3261e' : row.is_keeper ? '#b3261e' : '#1e3a2b';
    // ── A PERSON PRINTED, NOT A DATABASE ROW ───────────────────────────────────
    // This went grey and it went dead. The warm line that said how long someone had been
    // holding the keys was replaced by a row of dashes, because a letter's outcome was never
    // recorded and a dash is an ugly way of admitting it. So: a card with a coloured spine —
    // signal red for the keys, botanical for a pair of eyes — the name set properly, a stamp
    // that looks pressed rather than typed, and only the facts that actually exist.
    const facts = [];
    if (row.invited_at || row.asked) facts.push(`asked ${shortDay(row.invited_at || row.asked)}`);
    if (row.added_by) facts.push(`by ${row.added_by}`);
    if (row.notes > 0) {
      facts.push(`${row.notes} ${row.notes === 1 ? 'note' : 'notes'}${row.last_note ? ` · last ${shortDay(row.last_note)}` : ''}`);
    } else if (row.is_keeper && row.active) {
      facts.push('holding the keys');
    } else if (row.line_written) {
      facts.push('wrote their line');
    }
    return (
      <div
        className="mb-2 grid grid-cols-[1fr_auto] items-start gap-1 bg-[#efe7d6]/60 py-2.5 pl-3 pr-1"
        style={{ borderLeft: `3px solid ${stampColour}` }}
      >
        <div className="min-w-0">
          <p className="flex items-baseline gap-2 leading-tight" style={reading}>
            <span className="truncate text-[17px] font-semibold text-[#141210]">{row.name || row.email}</span>
            <span
              className="flex-shrink-0 px-1.5 py-[2px] font-mono text-[8.5px] uppercase tracking-[0.16em]"
              style={
                row.active
                  ? { background: stampColour, color: '#f4efe4' }
                  : { border: `1px solid ${stampColour}`, color: stampColour }
              }
            >
              {stamp}
            </span>
          </p>
          <p className="truncate font-mono text-[10.5px] text-[#8a7f70]">
            {row.email}
            {row.note ? ` · ${row.note}` : ''}
          </p>
          {facts.length > 0 && (
            <p className="mt-0.5 text-[12.5px] leading-snug text-[#3a342c]" style={reading}>
              {facts.join(' · ')}
            </p>
          )}
          {/* ── THE TRAIL, AND ONLY WHAT THE RECORD ACTUALLY KNOWS ──────────────
              Every line printed five slots whether or not anything had happened, so three
              people who had done nothing wrong showed a row of dashes and the page looked
              dead. A fact appears now only when it exists: the letter that went, the letter
              that failed (with one tap to send it again), the day their own sign-in was
              recognised, and whose word put them here. */}
          {(row.notice_sent_at || row.notice_error || row.joined_at || row.agreed_by || row.added_by) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[9.5px] uppercase tracking-[0.06em] text-[#6b5f4f]">
            <span
              className="inline-flex items-center gap-1"
              title={row.notice_error || (row.notice_sent_at ? 'the record’s letter went out' : 'no letter sent yet')}
            >
              <MarkLetter
                size={13}
                state={row.notice_sent_at ? 'sent' : row.notice_error ? 'failed' : 'none'}
                className={row.notice_error ? 'text-[#b3261e]' : 'text-[#1e3a2b]'}
              />
              {row.notice_sent_at ? shortDay(row.notice_sent_at) : 'no letter'}
            </span>
            {row.joined_at && (
              <span className="inline-flex items-center gap-1 text-[#1e3a2b]" title="their own sign-in was recognised">
                <MarkStep size={13} />
                in {shortDay(row.joined_at)}
              </span>
            )}
            <span className="inline-flex min-w-0 items-center gap-1">
              <MarkAgreed size={13} className="text-[#8a7f70]" />
              <span className="truncate text-[10px] normal-case tracking-normal">
                {row.agreed_by || row.added_by}
              </span>
            </span>
            {row.notice_error && (
              <button
                onClick={() => resend(row)}
                disabled={busy}
                className="inline-flex min-h-[28px] items-center gap-1 text-[#b3261e] underline decoration-1 underline-offset-2 disabled:opacity-40"
              >
                <MarkAgain size={12} /> send it again
              </button>
            )}
          </div>
          )}
        </div>
        <div className="flex flex-shrink-0 items-center">
          <button
            onClick={() => ask({ change: row.active ? 'pause' : 'restore', row_id: row.id })}
            disabled={busy}
            aria-label={row.active ? `Pause ${row.name || row.email}` : `Let ${row.name || row.email} back in`}
            className="inline-flex min-h-[40px] items-center gap-1 px-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#141210] active:text-[#b3261e] disabled:opacity-40"
          >
            {row.active ? <MarkHold size={15} /> : <MarkStep size={15} />}
            {row.active ? 'pause' : 'back'}
          </button>
          <button
            onClick={() => ask({ change: 'remove', row_id: row.id })}
            disabled={busy}
            aria-label={`Take ${row.name || row.email} off the list`}
            className="inline-flex min-h-[40px] items-center px-1.5 text-[#b3261e] active:opacity-60 disabled:opacity-40"
          >
            <MarkStrike size={15} />
          </button>
        </div>
      </div>
    );
  };

  const Choice = ({ value, word, line }) => (
    <button
      onClick={() => setKind(value)}
      aria-pressed={kind === value}
      className={`min-h-[52px] px-2 text-left border ${
        kind === value
          ? 'border-[#141210] bg-[#141210] text-[#f4efe4]'
          : 'border-[#141210]/25 text-[#141210]'
      }`}
      style={reading}
    >
      <span className="block text-[14px] font-semibold leading-tight">{word}</span>
      <span className={`block text-[11px] leading-tight mt-0.5 ${kind === value ? 'text-[#f4efe4]/70' : 'text-[#6b5f4f]'}`}>
        {line}
      </span>
    </button>
  );

  return (
    <div className="pb-10">
      <AccessSecondKey items={waiting} onConfirm={confirm} onCancel={cancel} busy={busy} />

      {/* Being told is part of access: this is the door you are on when you add somebody, so
          it is where you make sure you will hear that they arrived. */}
      <KeeperPhone />

      {/* ── WHO IS ON THE RECORD, IN ONE PLACE ──────────────────────────────────
          The keys stood at the top and the checkers at the bottom, with two forms and a card
          between them — so "who is on this record" was a question you answered by scrolling.
          Both lists are here now, and nothing sits between them. */}
      <div className="border-t border-[#141210]/20 pt-3 mb-5">
        <div className="mb-2 flex items-center gap-2 border-b border-[#b3261e]/40 pb-1">
          <MarkKey size={20} className="text-[#b3261e]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#141210]">The keys</span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.08em] text-[#8a7f70]">
            {keepers.filter((r) => r.active).length} holding
          </span>
        </div>
        {!loading && !keepers.length && (
          <p className="text-[14px] text-[#3a342c] py-1" style={reading}>
            No keeper line on the record yet. Whoever built the app still opens this page.
          </p>
        )}
        {keepers.map((row) => <Row key={row.id} row={row} />)}

        <div className="mb-2 mt-5 flex items-center gap-2 border-b border-[#1e3a2b]/40 pb-1">
          <MarkEye size={20} className="text-[#1e3a2b]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#141210]">Checking</span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.08em] text-[#8a7f70]">
            {checkers.filter((r) => r.active).length} now · {checkers.filter((r) => !r.active).length} paused
          </span>
        </div>
        {loading && <p className="text-[13px] text-[#6b5f4f]" style={reading}>Looking at the list…</p>}
        {!loading && !checkers.length && (
          <p className="text-[14px] text-[#3a342c] leading-[1.6] py-1" style={reading}>
            Nobody checking yet.
          </p>
        )}
        {checkers.map((row) => <Row key={row.id} row={row} />)}

        <button onClick={load} className="mt-2 text-[12.5px] text-[#6b5f4f] inline-flex items-center gap-1 min-h-[36px]" style={reading}>
          <MarkAgain size={13} /> again
        </button>
      </div>

      {/* What just happened, printed where the hand that did it can see it. An ask for the
          keys changes nothing on the list above — it opens a slip at the top — so the line
          has to say that out loud rather than leave a keeper thinking the tap failed. */}
      {message && (
        <div ref={noteRef} className="mb-5 border-l-2 border-[#b3261e] bg-[#efe7d6] px-3 py-2.5">
          <p className="text-[13.5px] leading-[1.55] text-[#141210]" style={reading}>{message}</p>
        </div>
      )}

      {/* ── ONE FORM, TWO HANDS ───────────────────────────────────────────────── */}
      <div className="border-t border-[#141210]/20 pt-3 mb-6">
        <p className={label} style={reading}><UserPlus className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />Put somebody on the list</p>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <Choice value="check" word="to check" line="your word alone" />
          <Choice value="keys" word="to hold the keys" line="two keepers" />
        </div>

        <p className="text-[13px] leading-[1.55] text-[#6b5f4f] mb-2" style={reading}>
          {kind === 'check'
            ? 'Reads what is waiting and says whether the source holds up. Cannot publish, edit or delete — and never sees who sent it in.'
            : 'Publishes, signs, invites, and sees every submitter’s address. Your ask, and one other keeper’s word.'}
        </p>

        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="their email address" inputMode="email" className={field} />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={kind === 'check' ? 'their name, as their notes will be signed' : 'their name, as they will sign'} className={field} />
        {kind === 'check' && (
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="why (optional), e.g. Trebuchet volunteer" className={field} />
        )}

        <button
          onClick={add}
          disabled={busy}
          className="w-full min-h-[50px] inline-flex items-center justify-center gap-2 bg-[#b3261e] text-[#f4efe4] text-[14px] font-semibold active:bg-[#8f1e18] disabled:opacity-40"
          style={reading}
        >
          {kind === 'check' ? <MarkEye size={17} /> : <MarkKey size={17} />}
          {busy ? 'asking' : kind === 'check' ? 'Add them to the checking list' : 'Ask for the keys'}
        </button>
      </div>

      <InviteSteps />

      {/* ── HOW THE RULE WORKS, ONCE ────────────────────────────────────────────
          There were two paragraphs about access in two places, and the audit sentence lived
          in the second one, six screens below the buttons it describes. One paragraph, and
          the audit line is part of it. */}
      <AccessGuide {...(mobile ? { className: 'room-details mb-6' } : {})}>
        {mobile && <summary>How access works</summary>}
        <p className="text-[13px] leading-[1.6] text-[#6b5f4f] mt-2 mb-6" style={reading}>
          <span className="font-semibold">Two keys.</span>{' '}
          {solo
            ? 'You hold the only key today, so your word stands — and the line says so.'
            : owner
            ? 'You hold the building’s keys, so your asks land at once and the line says they stood alone.'
            : 'A checker moves on one keeper’s word. The keys take two: one asks, another agrees. The last keeper can never be taken off.'}{' '}
          Pausing ends access at once and tells them. What they wrote stays in their name.
        </p>
      </AccessGuide>

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