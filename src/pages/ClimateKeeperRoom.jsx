import React, { useCallback, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, RefreshCw } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import DecideQueue from '@/components/climate/DecideQueue';
import ClimateChecking from '@/pages/ClimateChecking';
import GuestList from '@/components/climate/keeper/GuestList';
import RoomMasthead from '@/components/climate/keeper/RoomMasthead';
import AdminClimateDesk from '@/pages/AdminClimateDesk';
import DueDiligencePanel from '@/components/climate/DueDiligencePanel';

// ── ONE PAGE, ONE LIST, THEN OUT ───────────────────────────────────────────────
// This room used to be a shed with five doors — decide, read, people, counts, sources —
// and a mark inside each one. Every one of those words was ours, not hers: they named how
// the thing is built, not what she came here to do. To take one decision she had to learn a
// map first, and a person holding the keys at eleven at night does not want a map.
//
// So the shed is gone. There is one page. It says how many things are waiting in plain words,
// and then it puts every one of them in the same scroll, each with its own two buttons:
// an entry says yes or not yet, a source says what you found, a person says let them in. You
// work down the list and you leave. When the list is empty the page says so and stops, because
// a page that can never finish is a headache even when there is nothing on it.
//
// Reading is not work, so it is not on the page. What the record holds and where a claim comes
// from live behind two quiet lines at the foot for whoever wants them — they were never jobs.
//
// Nothing is decided in a browser. Every answer here is given by the record's own server
// against its own guest list, so holding a keeper's line gives the record's keys and none of
// the building's.
const reading = { fontFamily: 'var(--font-reading)' };

export default function ClimateKeeperRoom() {
  const [state, setState] = useState('checking'); // checking | ready | signed_out | paused | not_on_list | error
  const [who, setWho] = useState({ isKeeper: false, isChecker: false, name: '' });
  const [counts, setCounts] = useState(null);
  const [params] = useSearchParams();
  const [view, setView] = useState(null);
  const [failed, setFailed] = useState(false);
  const [extra, setExtra] = useState(
    ['counts', 'sourcing'].includes(params.get('tab')) ? params.get('tab') : null
  );

  const load = useCallback(async () => {
    setState('checking');
    try {
      const res = await base44.functions.invoke('climateKeeperRoom', { action: 'whoami' });
      const d = res.data || {};
      if (d.isKeeper || d.isChecker) {
        setWho(d);
        setState('ready');
        return;
      }
      if (d.paused) setState('paused');
      else if (/unauthor|sign/i.test(String(d.reason || ''))) setState('signed_out');
      else setState('not_on_list');
    } catch (e) {
      setState(e?.status === 401 ? 'signed_out' : 'error');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // What is waiting, asked once when the page opens and again after anything is answered —
  // so the line at the top is a fact about now, never a number carried over from before.
  const count = useCallback(async () => {
    const [q, r, c] = await Promise.allSettled([
      who.isKeeper
        ? base44.functions.invoke('climateKeeperRoom', { action: 'queue' })
        : Promise.resolve(null),
      who.isKeeper
        ? base44.functions.invoke('climateAccessChange', { action: 'roster' })
        : Promise.resolve(null),
      base44.functions.invoke('checkerQueue', {}),
    ]);
    const roster = r.status === 'fulfilled' ? r.value?.data : null;
    // A count that failed and a count that came back empty are not the same answer. Before
    // this, a dropped request was stored as a zero — so a keeper was told she was finished by
    // a page that had not managed to ask the question. The room now says which it is.
    setFailed(
      (who.isKeeper && (q.status === 'rejected' || r.status === 'rejected')) || c.status === 'rejected'
    );
    setCounts({
      yes: q.status === 'fulfilled' ? (q.value?.data?.waiting || []).length : 0,
      read: c.status === 'fulfilled' ? (c.value?.data?.entries || []).length : 0,
      asks: roster?.waiting?.length || 0,
      people: roster?.keepers?.length || 0,
    });
  }, [who]);

  useEffect(() => {
    if (state === 'ready') count();
  }, [state, count]);

  const n = counts || {};
  const yes = n.yes || 0;
  const read = n.read || 0;
  const asks = n.asks || 0;
  // Counted once. An entry waiting for a decision sits in the checking queue as well, so
  // adding the two figures together told a keeper she had twice the work she had. The room
  // counts entries and people; reading a source is a second look at an entry already counted,
  // and the masthead gives it its own cell rather than its own place in the total.
  const total = who.isKeeper ? yes + asks : read;

  const headline = failed
    ? 'The record could not be counted just now.'
    : !counts
    ? 'Looking at the record…'
    : total === 0
    ? "Nothing is waiting. You're done."
    : total === 1
    ? 'One thing is waiting for you.'
    : `${total} things are waiting for you.`;

  // Where the room opens: the work actually in front of her, never a guess. A checker's room
  // has the one door, so she is never shown a mark she cannot open.
  const activeView = !who.isKeeper
    ? 'sources'
    : view || (yes > 0 ? 'decide' : asks > 0 ? 'access' : 'sources');

  return (
    <ClimateRecordShell
      compact
      eyebrow="Keeper's room"
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change."
    >
      {state === 'checking' && (
        <div className="flex items-center gap-2 py-10">
          <div
            className="w-5 h-5 rounded-full animate-spin"
            style={{ border: '2px solid rgba(20,18,16,0.15)', borderTopColor: '#b3261e' }}
          />
          <span className="text-[12.5px] text-[#6b5f4f]" style={reading}>Looking at the record</span>
        </div>
      )}

      {state === 'signed_out' && (
        <Door
          heading="This room is by invitation"
          body="Sign in with the address a keeper added to the record. Reading the public record needs no account; working here needs an invitation."
          actionLabel="Sign in"
          onAction={() => base44.auth.redirectToLogin(window.location.href)}
        />
      )}

      {state === 'paused' && (
        <Door
          heading="Your place is paused"
          body="Your key is closed for now, and this is not a judgement on the work you did: the notes you wrote are still on the record, still in your name, and nothing has been taken off. A keeper can open it again — it is one line."
          actionLabel="Look again"
          onAction={load}
        />
      )}

      {state === 'not_on_list' && (
        <Door
          heading="This room is by invitation"
          body="It is for the people the record answers to and the people who agreed to look. Ask for your address to be put on the list, and it opens on your next sign-in."
          actionLabel="What checking involves"
          onAction={() => { window.location.href = '/ClimateFellows'; }}
        />
      )}

      {state === 'error' && (
        <Door
          heading="The room could not be opened"
          body="Nothing is lost — everything waiting is still waiting. Try once more."
          actionLabel="Try again"
          onAction={load}
        />
      )}

      {state === 'ready' && (
        <>
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[12px] text-[#8a7f6d]" style={reading}>
              {who.name || 'Keeper'}
              {who.isKeeper ? ' · keeper' : ' · checker'}
            </p>
            <button
              onClick={count}
              className="flex items-center gap-1.5 min-h-[32px] text-[12px] text-[#6b5f4f] active:text-[#b3261e] transition-colors"
              style={reading}
            >
              <RefreshCw className="w-3 h-3" /> count again
            </button>
          </div>

          <h1
            className="mt-1 text-[#141210] text-[23px] sm:text-[27px]"
            style={{ ...reading, fontWeight: 600, lineHeight: 1.16, letterSpacing: '-0.015em', textWrap: 'pretty' }}
          >
            {headline}
          </h1>
          {/* The masthead: three marks, three numbers, one glance. This is the whole answer to
              "what is going on and what needs attention" — and it is the same three jobs the
              record already had, said in a word each instead of a paragraph. */}
          <RoomMasthead
            counts={{ sources: read, decide: yes, access: asks }}
            keeper={who.isKeeper}
            view={activeView}
            onView={setView}
            failed={failed}
          />

          {failed && (
            <p className="mt-3 text-[13px] leading-[1.6] text-[#b3261e]" style={reading}>
              Nothing is lost. This is the page failing to ask, not the record being empty.{' '}
              <button onClick={count} className="underline decoration-2 underline-offset-2">
                Ask again
              </button>
            </p>
          )}

          {/* One job at a time. Each room owns its own empty state, so nothing is ever shown
              as finished by the page that chose not to draw it. */}
          {activeView === 'decide' && who.isKeeper && (
            <div className="mt-5">
              <DecideQueue plain onChange={count} />
            </div>
          )}

          {activeView === 'sources' && (
            <div className="mt-5">
              <ClimateChecking plain onChange={count} />
            </div>
          )}

          {activeView === 'access' && who.isKeeper && (
            <div className="mt-5">
              <GuestList />
            </div>
          )}

          {who.isKeeper && (
            <div className="mt-8 border-t border-[#141210]/12 pt-3">
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <Quiet
                  on={extra === 'counts'}
                  onClick={() => setExtra(extra === 'counts' ? null : 'counts')}
                >
                  What the record holds
                </Quiet>
                <Quiet
                  on={extra === 'sourcing'}
                  onClick={() => setExtra(extra === 'sourcing' ? null : 'sourcing')}
                >
                  Where a claim comes from
                </Quiet>
              </div>

              {extra === 'counts' && <div className="pt-4"><AdminClimateDesk plain /></div>}
              {extra === 'sourcing' && <div className="pt-4"><DueDiligencePanel /></div>}
            </div>
          )}
        </>
      )}
    </ClimateRecordShell>
  );
}

function Quiet({ on, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`min-h-[34px] text-[12px] transition-colors ${
        on ? 'text-[#b3261e]' : 'text-[#8a7f6d] active:text-[#141210]'
      }`}
      style={reading}
    >
      {children}
    </button>
  );
}

function Door({ heading, body, actionLabel, onAction }) {
  return (
    <div className="border-t border-[#141210]/20 pt-4">
      <p className="font-semibold text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-reading)', fontSize: '21px', lineHeight: 1.35 }}>
        {heading}
      </p>
      <p className="text-[15px] leading-[1.7] text-[#2b2622]" style={reading}>{body}</p>
      <button
        onClick={onAction}
        className="mt-4 inline-flex items-center gap-2 min-h-[44px] text-[13.5px] font-semibold text-[#141210] border-b-2 border-[#b3261e] active:text-[#b3261e] transition-colors"
      >
        {actionLabel} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}