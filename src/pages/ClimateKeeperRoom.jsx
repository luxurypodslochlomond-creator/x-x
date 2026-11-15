import React, { useCallback, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import DecideQueue from '@/components/climate/DecideQueue';
import ClimateChecking from '@/pages/ClimateChecking';
import GuestList from '@/components/climate/keeper/GuestList';
import WorkDock from '@/components/climate/keeper/WorkDock';
import RoomOverview from '@/components/climate/keeper/RoomOverview';
import RecordLife from '@/components/climate/keeper/RecordLife';
import AdminClimateDesk from '@/pages/AdminClimateDesk';
import DueDiligencePanel from '@/components/climate/DueDiligencePanel';
// One set of measures for everything standing inside the room, so tapping between Decide,
// Check, People and Record no longer swaps the type scale, the width or the padding
// underneath the same header. See the file for why that was the real fault.
import '@/components/climate/keeper/keeper-room.css';

// Identity, current work, then its index. Navigation belongs above the job on mobile;
// decisions and access still go through the record's server and its own guest list.
const reading = { fontFamily: 'var(--font-reading)' };

// The old addresses still work. Each one lands on the door it always meant.
const FROM_TAB = {
  decide: 'decide',
  check: 'check',
  sources: 'check',
  people: 'people',
  access: 'people',
  counts: 'record',
  sourcing: 'record',
};

export default function ClimateKeeperRoom() {
  const [state, setState] = useState('checking'); // checking | ready | signed_out | paused | not_on_list | error
  const [who, setWho] = useState({ isKeeper: false, isChecker: false, name: '' });
  const [counts, setCounts] = useState(null);
  const [params] = useSearchParams();
  const [view, setView] = useState(FROM_TAB[params.get('tab')] || null);
  const [failed, setFailed] = useState(false);
  // Who actually holds the record's keys, kept from the same roster call that produces the
  // counts — so the room can name them without a second request.
  const [keys, setKeys] = useState({ keepers: [], checkers: [] });

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
    // a page that had not managed to ask the question.
    setFailed(
      (who.isKeeper && (q.status === 'rejected' || r.status === 'rejected')) || c.status === 'rejected'
    );
    setCounts({
      decide: q.status === 'fulfilled' ? (q.value?.data?.waiting || []).length : 0,
      check: c.status === 'fulfilled' ? (c.value?.data?.entries || []).length : 0,
      people: roster?.waiting?.length || 0,
    });
    setKeys({ keepers: roster?.keepers || [], checkers: roster?.checkers || [] });
  }, [who]);

  useEffect(() => {
    if (state === 'ready') count();
  }, [state, count]);

  const n = counts || {};
  // The names, in the order the record holds them. A keeper should be able to see who she is
  // keeping the record with before she decides anything.
  const keeperNames = keys.keepers
    .filter((k) => k.active)
    .map((k) => k.name || k.email)
    .join(' · ');
  const checkingNow = keys.checkers.filter((c) => c.active).length;
  const yes = n.decide || 0;
  const read = n.check || 0;
  const asks = n.people || 0;
  // Counted once. An entry waiting for a decision sits in the checking queue as well, so
  // adding the two figures together told a keeper she had twice the work she had. Reading a
  // source is a second look at an entry already counted, so it keeps its own door rather
  // than its own place in the total.
  const total = who.isKeeper ? yes + asks : read;

  const headline = failed
    ? 'The record could not be counted.'
    : !counts
    ? 'Looking at the record…'
    : total === 0
    ? 'Nothing waiting.'
    : total === 1
    ? 'One thing waiting.'
    : `${total} things waiting.`;

  // Where the room opens: the work actually in front of her, never a guess. A checker's room
  // has the one door, so she is never shown a mark she cannot open.
  const activeView = !who.isKeeper
    ? 'check'
    : view || (yes > 0 ? 'decide' : asks > 0 ? 'people' : 'check');

  return (
    <ClimateRecordShell
      compact
      className={state === 'ready' ? 'keeper-workspace-shell keeper-workspace-ready' : 'keeper-workspace-shell'}
      eyebrow={state === 'ready' && !who.isKeeper ? 'Checking the record' : "Keeper's room"}
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
        <div className="keeper-room">
          <RoomOverview
            who={who}
            headline={headline}
            total={total}
            counted={Boolean(counts)}
            failed={failed}
            keeperNames={keeperNames}
            checkingNow={checkingNow}
            onRefresh={count}
          />

          {/* The work's own index, directly above the work on every screen. */}
          <WorkDock
            counts={{ decide: yes, check: read, people: asks }}
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
          <div className="room-work-panel mt-3">
            {activeView === 'decide' && who.isKeeper && <DecideQueue plain onChange={count} />}
            {activeView === 'check' && <ClimateChecking plain onChange={count} />}
            {activeView === 'people' && who.isKeeper && <GuestList />}

            {/* What the record holds, and where a claim comes from — two questions a panel
                asks, kept on one door rather than under a long page of footnotes. */}
            {activeView === 'record' && who.isKeeper && (
              <div className="space-y-7">
                <AdminClimateDesk plain />
                <DueDiligencePanel />
              </div>
            )}
          </div>

          {/* The other half of the room: not what is left to do, but what the record has
              actually done lately. A keeper should be able to close this page knowing the
              thing is alive, whatever the queue says. */}
          <RecordLife />
        </div>
      )}
    </ClimateRecordShell>
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