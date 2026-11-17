import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Check, X, HelpCircle, ExternalLink, RefreshCw } from 'lucide-react';
import useKeeperMobile from '@/components/climate/keeper/useKeeperMobile';
import KeeperEntryText from '@/components/climate/keeper/KeeperEntryText';
import AskTheRecord from '@/components/climate/AskTheRecord';

// The checking room. One page, three buttons, no training: open the source, then say whether
// it says what the entry claims. A volunteer here is not junior staff being kept away from the
// real machine — they are the pair of eyes the record promises, and this is the whole of their
// job. Nothing on this page can publish, edit or delete anything.
const ANSWERS = [
  { id: 'holds', label: 'The source says it', short: 'Says it', tone: '#1e3a2b', Icon: Check },
  { id: 'does_not_hold', label: 'It does not', short: 'Does not', tone: '#b3261e', Icon: X },
  { id: 'cannot_tell', label: 'Could not tell', short: "Can't tell", tone: '#b8860b', Icon: HelpCircle },
];

const WORD = { holds: 'source says it', does_not_hold: 'it does not', cannot_tell: 'could not tell' };

// The queue is oldest first, so the date is the whole of the explanation for the order.
const when = (d) => {
  if (!d) return '';
  const t = new Date(d);
  if (Number.isNaN(t.getTime())) return '';
  return t.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function ClimateChecking({ plain = false, onChange }) {
  const compact = useKeeperMobile() && plain;
  const Entry = compact ? 'details' : 'div';
  const RecordNote = compact ? 'details' : React.Fragment;
  const [me, setMe] = useState(null);
  const [entries, setEntries] = useState([]);
  const [checks, setChecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [drafts, setDrafts] = useState({});
  const [saving, setSaving] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await base44.functions.invoke('checkerQueue', {});
      setMe(res.data.checker);
      setEntries(res.data.entries || []);
      setChecks(res.data.checks || []);
    } catch (e) {
      // A paused place and a stranger's place are not the same answer. The record says which.
      setError(
        e?.response?.status === 403
          ? e?.response?.data?.paused ? 'paused' : 'not_a_checker'
          : e?.response?.status === 401
            ? 'signed_out'
            : 'That did not load. Try again in a moment.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const setDraft = (id, patch) =>
    setDrafts((p) => ({ ...p, [id]: { ...(p[id] || {}), ...patch } }));

  const save = async (entry) => {
    const d = drafts[entry.id] || {};
    if (!d.verdict) return;
    setSaving(entry.id);
    setError('');
    try {
      const res = await base44.functions.invoke('checkerNote', {
        entry_type: entry.type,
        entry_id: entry.id,
        entry_title: entry.title || '',
        verdict: d.verdict,
        note: d.note || '',
      });
      const saved = res.data.saved;
      setChecks((c) => [{ ...saved, entry_id: entry.id, checker_name: saved.checker_name, note: d.note || '' }, ...c]);
      setEntries((list) => list.filter((x) => x.id !== entry.id));
      setDrafts((p) => { const n = { ...p }; delete n[entry.id]; return n; });
      onChange?.();
    } catch (e) {
      setError(e?.response?.data?.error || 'That note did not save. Try again.');
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className={plain ? 'py-8' : 'min-h-[60vh] flex items-center justify-center bg-record-paper'}>
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-record-muted">opening the queue</span>
      </div>
    );
  }

  // An invited checker who is not carrying a session lands here. They are not told they are
  // not on the list — they are told the truth: the room is by invitation, and the way in is
  // their own address. No Google account is needed: the record uses the app's own sign-in,
  // which sends a code to the address a keeper added.
  if (error === 'signed_out') {
    return (
      <div className="min-h-[60vh] bg-record-paper px-5 py-16">
        <div className="max-w-xl mx-auto border-2 border-record-ink/20 bg-record-bone p-6">
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-record-red mb-3">this room is by invitation</p>
          <h1 className="font-black text-record-ink text-xl mb-3">Sign in with the address you were added under.</h1>
          <p className="text-sm text-record-ink/80 leading-relaxed mb-4">
            Any address works, and no Google account is needed. A code comes to your own inbox.
          </p>
          <button
            type="button"
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="border-2 border-record-ink bg-record-ink text-record-bone font-black uppercase tracking-wide text-xs px-4 py-2"
          >
            Sign in to check
          </button>
        </div>
      </div>
    );
  }

  // Paused is not the same as never invited. Their notes are still on the record, signed with
  // their name, and the door in front of them should say so rather than pretending they were
  // never here.
  if (error === 'paused') {
    return (
      <div className="min-h-[60vh] bg-record-paper px-5 py-16">
        <div className="max-w-xl mx-auto border-2 border-record-ink/20 bg-record-bone p-6">
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-record-red mb-3">your place is paused</p>
          <h1 className="font-black text-record-ink text-xl mb-3">You are on the record. Your key is closed for now.</h1>
          <p className="text-sm text-record-ink/80 leading-relaxed">
            Checking has been paused on this address. It is not a judgement on the work you did: the notes you wrote
            are still on the record, still in your name, and nothing has been taken off.
          </p>
          <p className="text-sm text-record-ink/80 leading-relaxed mt-3">
            If this is a surprise, ask a keeper to open it again — it is one line, and it reopens at your next sign-in.
          </p>
        </div>
      </div>
    );
  }

  if (error === 'not_a_checker') {
    return (
      <div className="min-h-[60vh] bg-record-paper px-5 py-16">
        <div className="max-w-xl mx-auto border-2 border-record-ink/20 bg-record-bone p-6">
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-record-red mb-3">not on the list</p>
          <h1 className="font-black text-record-ink text-xl mb-3">Checking is by invitation.</h1>
          <p className="text-sm text-record-ink/80 leading-relaxed">
            This room opens for people a keeper has added by name. Ask for your email address to be put on the list,
            and it will open on your next sign-in.
          </p>
          <p className="text-sm text-record-ink/80 leading-relaxed mt-3">
            <Link to={createPageUrl('ClimateFellows')} className="font-black text-record-red underline">
              What checking involves, and how to ask
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={plain ? '' : 'min-h-screen bg-record-paper pb-24'}>
      <div className={plain ? '' : 'max-w-2xl mx-auto px-4 pt-8'}>
        {!plain && (
          <p className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-record-red mb-3">checking the record</p>
        )}
        {/* Inside the keeper's room this is part of a page, not a page of its own: the
            headline steps down so the work is the loudest thing on the screen. */}
        {/* Inside the room the sentence above has already told her what she is doing. A
            second heading saying it again was the "two headers stacked" the page wore. */}
        {!plain && (
          <h1 className="font-black text-record-ink text-2xl leading-tight mb-2" style={{ fontFamily: 'var(--font-reading)' }}>
            {me?.name ? `${me.name}, open the source and say what you find.` : 'Open the source and say what you find.'}
          </h1>
        )}
        <p className={plain ? 'text-[13.5px] text-record-ink/75 leading-relaxed mb-1' : 'text-sm text-record-ink/75 leading-relaxed mb-1'} style={{ fontFamily: 'var(--font-reading)' }}>
          {compact ? 'Does the source support this entry?' : plain
            ? 'Open the link, then say what you find. Nothing here publishes or edits anything.'
            : 'Nothing here publishes, edits or deletes an entry. You say whether the link opens and whether it says what the entry claims, and a keeper decides with your words in front of them.'}
        </p>
        {/* Whose word this is. The row has carried the keeper's address since the place was
            given and it was never shown to the person it is about, so a volunteer arrived on
            a list she could not see the edge of. One line, a name, on the first morning. */}
        {me?.invited_by && (
          <p className="text-[12px] text-record-muted mb-2" style={{ fontFamily: 'var(--font-reading)' }}>
            {me.invited_by} put your name on this list.
          </p>
        )}
        {!plain && (
          <p className="text-[12px] text-record-muted mb-5" style={{ fontFamily: 'var(--font-reading)' }}>
            {entries.length} {entries.length === 1 ? 'entry is' : 'entries are'} waiting · signed as {me?.name}
          </p>
        )}

        {/* A checker with a question should not have to leave the queue to ask it — nor wait
            for anybody's inbox. It sits above the work, answered from the record's own manual
            in whatever tongue they are reading in, typed or spoken. */}
        <div className="mt-4">
          <AskTheRecord suggestions={['What does a checker actually do?', 'Who decides after my note?', 'Can I publish anything myself?']} />
        </div>

        {error && error !== 'not_a_checker' && (
          <p className="text-[12.5px] text-record-red border-l-4 border-l-record-red pl-3 mb-5 leading-snug" style={{ fontFamily: 'var(--font-reading)' }}>{error}</p>
        )}

        {!error && !entries.length && (
          <div className="border-2 border-record-ink/15 bg-record-bone p-6">
            <p className="text-sm text-record-ink/80 leading-relaxed">
              Nothing is waiting. Everything that has come in has been looked at. The next entry to arrive will appear here.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {entries.map((entry, index) => {
            const d = drafts[entry.id] || {};
            const already = checks.filter((c) => c.entry_id === entry.id);
            return (
              <Entry key={entry.id} className="room-check-entry bg-record-bone border-2 border-record-ink/20 p-3" {...(compact ? { open: index === 0, name: 'keeper-sources' } : {})}>
                {compact ? (
                  <summary className="room-check-summary">
                    <span><span className="room-check-kind">{[entry.source_name || entry.type, when(entry.created_date)].filter(Boolean).join(' · ')}</span><span className="room-check-title">{entry.title}</span></span>
                    <span className="room-check-toggle" aria-hidden="true" />
                  </summary>
                ) : <>
                  <p className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-record-muted mb-1.5">
                    {entry.type === 'group' ? 'group' : entry.type}{entry.source_name ? ` · ${entry.source_name}` : ''}
                  </p>
                  {/* The date, and which job this is. The queue runs oldest first, so the date
                      is the explanation for the order — and "waiting to go on" and "on the
                      record" are two different promises being asked of a volunteer. */}
                  <p className="text-[11px] text-record-muted mb-1.5" style={{ fontFamily: 'var(--font-reading)' }}>
                    {entry.state === 'on_record'
                      ? `On the record since ${when(entry.created_date)} · nobody has looked yet`
                      : `Waiting to go on · sent in ${when(entry.created_date)}`}
                  </p>
                  <h2 className="text-record-ink text-[17px] leading-snug mb-2" style={{ fontFamily: 'var(--font-reading)', fontWeight: 600 }}>{entry.title}</h2>
                </>}
                <div className={compact ? 'room-check-body' : ''}>
                {entry.body && entry.body !== entry.title && (compact ? <KeeperEntryText text={entry.body} /> :
                  <p className="text-[14.5px] text-record-ink/85 leading-[1.65] mb-3 line-clamp-4" style={{ fontFamily: 'var(--font-reading)' }}>{entry.body}</p>
                )}

                {entry.source_url ? (
                  <a
                    href={entry.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="room-source-link inline-flex items-center gap-2 min-h-[44px] px-3.5 mb-3 border-2 border-record-ink text-[13px] font-semibold text-record-ink active:bg-record-ink active:text-record-paper"
                    style={{ fontFamily: 'var(--font-reading)' }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open the source
                  </a>
                ) : (
                  // A comment has nothing to open, so it is not a fault and it must not be
                  // printed in the record's warning red. It asks for the same thing in the
                  // same words, quietly: read it, then say what you make of it.
                  <p className="text-[12.5px] text-record-muted leading-snug mb-2.5" style={{ fontFamily: 'var(--font-reading)' }}>
                    No link on this one — read the words, then say what you make of them.
                  </p>
                )}

                {already.length > 0 && (
                  <div className="border-l-4 border-l-record-ink/30 bg-record-paper/60 pl-2 py-1 mb-3">
                    {already.map((c) => (
                      <p key={c.id} className="text-[12.5px] text-record-ink/75 leading-[1.6]" style={{ fontFamily: 'var(--font-reading)' }}>
                        <span className="font-semibold">{WORD[c.verdict] || c.verdict} · {c.checker_name}</span>
                        {c.note ? ` — ${c.note}` : ''}
                      </p>
                    ))}
                  </div>
                )}

                {/* ── THREE ANSWERS, ONE ROW ─────────────────────────────────────────
                    Four full-width buttons stacked under every entry made one comment taller
                    than the phone, and the last of them sat there greyed out looking broken
                    because nothing had been chosen yet. The three answers fit across a hand;
                    the note and the save only appear once there is something to save, so the
                    card is never more form than it is entry. */}
                <div className="room-check-answers grid grid-cols-3 gap-1.5">
                  {ANSWERS.map(({ id, short, tone, Icon }) => {
                    const on = d.verdict === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setDraft(entry.id, { verdict: id })}
                        aria-pressed={on}
                        className="flex min-h-[44px] flex-col items-center justify-center gap-0.5 border px-1 py-1.5 text-[11.5px] leading-none transition-colors active:opacity-70"
                        style={{
                          fontFamily: 'var(--font-reading)',
                          borderColor: on ? tone : 'rgba(26,22,18,0.28)',
                          color: on ? '#f4efe4' : tone,
                          background: on ? tone : 'transparent',
                        }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {short}
                      </button>
                    );
                  })}
                </div>

                {d.verdict ? (
                  <div className="mt-2">
                    <textarea
                      value={d.note || ''}
                      onChange={(e) => setDraft(entry.id, { note: e.target.value })}
                      rows={2}
                      aria-label="Your checking note"
                      placeholder={
                        d.verdict === 'holds'
                          ? 'Anything worth adding (optional).'
                          : 'What did you find? A few words is enough.'
                      }
                      className="w-full min-h-[44px] p-2.5 text-[15px] bg-record-paper border border-record-ink/25 text-record-ink mb-1.5"
                      style={{ fontFamily: 'var(--font-reading)' }}
                    />
                    <button
                      type="button"
                      onClick={() => save(entry)}
                      disabled={saving === entry.id}
                      className="room-check-save w-full min-h-[44px] bg-record-ink text-record-paper text-[14px] font-semibold active:opacity-80 disabled:opacity-50"
                      style={{ fontFamily: 'var(--font-reading)' }}
                    >
                      {saving === entry.id ? 'Saving…' : 'Save my note'}
                    </button>
                  </div>
                ) : !compact ? (
                  <p className="mt-1.5 text-[12px] text-record-muted" style={{ fontFamily: 'var(--font-reading)' }}>
                    Pick one of the three and a box appears for your words.
                  </p>
                ) : null}
                </div>
              </Entry>
            );
          })}
        </div>

        <button
          onClick={load}
          className="mt-8 inline-flex min-h-[40px] items-center gap-2 text-[13px] text-record-muted"
          style={{ fontFamily: 'var(--font-reading)' }}
        >
          <RefreshCw className="w-3.5 h-3.5" /> Look again
        </button>

        {/* A checker's other job is her own work — an initiative of her own to put in. There
            is no publishing button here by design, so this is the way to the open door, one
            line, said once, rather than leaving her to hunt the record for it. */}
        <p className="mt-3 text-[12.5px] text-record-ink/75 leading-[1.7]" style={{ fontFamily: 'var(--font-reading)' }}>
          Adding something of your own? Checking gives you no publishing button — an initiative
          goes in through the open door, with no key needed:{' '}
          <Link to="/TogetherChangeClimate?submit=1" className="text-record-red underline">
            add a solution, crisis or action
          </Link>.
        </p>

        <RecordNote {...(compact ? { className: 'room-details' } : {})}>
          {compact && <summary>About checking</summary>}
          <p className="text-[12.5px] text-record-muted leading-[1.7] mt-8 border-t border-record-ink/15 pt-4" style={{ fontFamily: 'var(--font-reading)' }}>
            Your notes are kept in your name and are never edited afterwards. If your access is ended, what you found stays
            on the record: ending access is not the same as erasing work.
          </p>
          {/* A volunteer arrives here and would never learn the roll exists, because it is
              deliberately not on the rail. One quiet line, so their own words are findable
              on the first morning rather than only if somebody remembers to mention it. */}
          <p className="text-[12.5px] text-record-muted leading-[1.7] mt-2" style={{ fontFamily: 'var(--font-reading)' }}>
            Your own words, if you want them, sit beside your name on{' '}
            <Link to="/ClimateRoll" className="text-record-red underline">the roll of people who check this record</Link>.
            Write them or clear them whenever you like — nobody else can touch them.
          </p>
        </RecordNote>
      </div>
    </div>
  );
}