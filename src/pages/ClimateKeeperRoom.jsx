import React, { useCallback, useEffect, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, RefreshCw } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import WorkroomTabs from '@/components/climate/WorkroomTabs';
import KeeperRoomFront from '@/components/climate/keeper/KeeperRoomFront';
import DecideQueue from '@/components/climate/DecideQueue';
import DueDiligencePanel from '@/components/climate/DueDiligencePanel';
import ClimateChecking from '@/pages/ClimateChecking';
import GuestList from '@/components/climate/keeper/GuestList';
import AdminClimateDesk from '@/pages/AdminClimateDesk';

// ── THE WORKROOM ─────────────────────────────────────────────────────────────
// The record had three working pages — a keeper's room, a checking room and a desk — and a
// person holding both capacities had to remember which address did what. This is one room
// with four rooms in it: decide, check, the counts, and the score.
//
// It opens to whoever the record says yes to, and it shows them only the rooms their own
// line allows. A keeper may also check: the two are one person with two capacities, and
// checking your own decisions is not checking, but opening a link is the same work whoever
// does it.
//
// Nothing here is decided in the browser. Every room is answered by the record's own server
// against its own guest list, so holding a keeper's line gives the record's keys and none of
// the building's.
export default function ClimateKeeperRoom() {
  const [state, setState] = useState('checking'); // checking | ready | signed_out | paused | not_on_list | error
  const [who, setWho] = useState({ isKeeper: false, isChecker: false, name: '' });
  const [params, setParams] = useSearchParams();
  const roomRef = useRef(null);

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

  // Plain verbs, in the order the work actually happens: what is waiting for a yes, then what
  // is waiting for a pair of eyes, then the counts. A keeper's first tab is their next job.
  const tabs = who.isKeeper
    ? [
        { key: 'decide', label: 'Yes or not yet' },
        { key: 'check', label: 'Read & note' },
        { key: 'people', label: 'Who may come in' },
        { key: 'desk', label: 'Counts' },
        { key: 'score', label: 'Sourcing' },
      ]
    : [{ key: 'check', label: 'Read & note' }];
  const tab = tabs.some(t => t.key === params.get('tab')) ? params.get('tab') : tabs[0].key;
  // Choosing a door takes you into the room rather than leaving you at the top of a page to
  // scroll down: the front and the index are where a choice is made, and the choice opens
  // under the thumb that made it.
  const setTab = (key) => {
    setParams({ tab: key });
    requestAnimationFrame(() => roomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <ClimateRecordShell
      compact
      eyebrow="The shed"
      marker="Public record · invited room"
      title={state !== 'ready' ? 'The shed' : who.isKeeper ? 'One thing at a time.' : 'Open the source, say what you find.'}
      statement={
        state !== 'ready'
          ? 'The record is open to everyone. Working on it is by invitation: keepers decide what goes on it; checkers open sources and sign their notes.'
          : who.isKeeper
          ? 'Your next job is the first tab. Yes or not yet, one entry at a time — everything else here can wait until it is asked for.'
          : 'What is waiting to be opened, and where each entry is claimed from. Nothing you do here publishes, edits or deletes anything.'
      }
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
          <span className="text-[12.5px] text-[#6b5f4f]" style={{ fontFamily: 'var(--font-reading)' }}>Looking at the record</span>
        </div>
      )}

      {state === 'signed_out' && (
        <Door
          heading="The shed is by invitation"
          body="Sign in with the address a keeper added to the record. Reading the public record needs no account; working here needs an invitation."
          actionLabel="Sign in to the record"
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
          heading="The shed opens by invitation"
          body="This room is for the people the record answers to and the people who agreed to look. Ask for your address to be put on the record's list, and it opens on your next sign-in."
          actionLabel="What checking involves"
          onAction={() => { window.location.href = '/ClimateFellows'; }}
        />
      )}

      {state === 'error' && (
        <Door
          heading="The shed could not be opened"
          body="Nothing is lost — everything waiting is still waiting. Try once more."
          actionLabel="Try again"
          onAction={load}
        />
      )}

      {state === 'ready' && (
        <>
          {/* The room answers the keeper's first question before it offers anything else:
              what wants your yes. A checker has no such front — their whole job is the one
              page below, and it already opens with its own sentence. */}
          {who.isKeeper && (
            <KeeperRoomFront
              name={who.name}
              isKeeper={who.isKeeper}
              isChecker={who.isChecker}
              onGo={setTab}
            />
          )}
          {tabs.length > 1 && <WorkroomTabs tabs={tabs} active={tab} onChange={setTab} />}
          <div ref={roomRef} className="scroll-mt-3">
            {tab === 'decide' && who.isKeeper && <DecideQueue />}
            {tab === 'check' && <ClimateChecking />}
            {tab === 'people' && who.isKeeper && <GuestList />}
            {tab === 'desk' && who.isKeeper && <AdminClimateDesk />}
            {tab === 'score' && who.isKeeper && <DueDiligencePanel />}
          </div>
        </>
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
      <p className="text-[15px] leading-[1.7] text-[#2b2622]" style={{ fontFamily: 'var(--font-reading)' }}>{body}</p>
      <button
        onClick={onAction}
        className="mt-4 inline-flex items-center gap-2 min-h-[44px] text-[13.5px] font-semibold text-[#141210] border-b-2 border-[#b3261e] active:text-[#b3261e] transition-colors"
      >
        {actionLabel} <ArrowRight className="w-4 h-4" />
      </button>
      <div>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 flex items-center gap-1.5 text-[12px] text-[#6b5f4f] active:text-[#141210] transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> reload the page
        </button>
      </div>
    </div>
  );
}