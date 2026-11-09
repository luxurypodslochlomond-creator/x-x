import React, { useCallback, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, RefreshCw } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import ShedRail from '@/components/climate/keeper/ShedRail';
import RoomHead from '@/components/climate/keeper/RoomHead';
import DecideQueue from '@/components/climate/DecideQueue';
import DueDiligencePanel from '@/components/climate/DueDiligencePanel';
import ClimateChecking from '@/pages/ClimateChecking';
import GuestList from '@/components/climate/keeper/GuestList';
import AdminClimateDesk from '@/pages/AdminClimateDesk';

// ── THE SHED ──────────────────────────────────────────────────────────────────
// One working room, and the work is at the top of it.
//
// This page has been a corridor three times. First a headline, a paragraph, a button, a
// folded list of doors and a row of tabs that reached the same doors a second way. Then a
// board of plates with the room somewhere beneath it. Both were handsome and both made a
// keeper read the room before she could work in it — and the words meant to explain the
// room were passed to a shell that only draws them when it is not compact, so they were
// never on the screen at all.
//
// So: who you are and what is waiting — one sentence, one line of counts — then one row of
// doors, then the work, in the same scroll. Tapping a door swaps what is underneath it
// without moving the page, so nothing you were looking at jumps away.
//
// Nothing here is decided in the browser. Every room is answered by the record's own server
// against its own guest list, so holding a keeper's line gives the record's keys and none of
// the building's.
export default function ClimateKeeperRoom() {
  const [state, setState] = useState('checking'); // checking | ready | signed_out | paused | not_on_list | error
  const [who, setWho] = useState({ isKeeper: false, isChecker: false, name: '' });
  const [counts, setCounts] = useState(null);
  const [params, setParams] = useSearchParams();

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

  // The three numbers on the doors, asked once when the room opens and again whenever
  // something in it changes — so a decision taken in a room is reflected in the row above it
  // without the keeper having to hunt for a refresh.
  const count = useCallback(async () => {
    const [q, r, c] = await Promise.allSettled([
      who.isKeeper
        ? base44.functions.invoke('climateKeeperRoom', { action: 'queue' })
        : Promise.resolve(null),
      who.isKeeper
        ? base44.functions.invoke('climateAccessChange', { action: 'roster' })
        : Promise.resolve(null),
      who.isChecker ? base44.functions.invoke('checkerQueue', {}) : Promise.resolve(null),
    ]);
    setCounts({
      yes: q.status === 'fulfilled' ? (q.value?.data?.waiting || []).length : null,
      asks: r.status === 'fulfilled' ? (r.value?.data?.waiting || []).length : null,
      read: c.status === 'fulfilled' ? (c.value?.data?.entries || []).length : null,
    });
  }, [who]);

  useEffect(() => {
    if (state === 'ready') count();
  }, [state, count]);

  const rooms = who.isKeeper
    ? ['decide', 'check', 'people', 'counts', 'sourcing']
    : ['check'];
  const tab = rooms.includes(params.get('tab')) ? params.get('tab') : rooms[0];
  const go = (key) => setParams({ tab: key });

  const n = counts || {};
  const yes = n.yes || 0;
  const read = n.read || 0;
  const asks = n.asks || 0;

  const headline = !counts
    ? 'Looking at the record…'
    : yes > 0
    ? yes === 1
      ? 'One entry wants your yes.'
      : `${yes} entries want your yes.`
    : read > 0
    ? read === 1
      ? 'One source is waiting to be read.'
      : `${read} sources are waiting to be read.`
    : asks > 0
    ? 'Someone is asking to come in.'
    : 'Nothing is waiting on you.';

  // The state of the room in one line, in the same order as the doors below it.
  const line = [
    who.isKeeper ? `${yes} to decide` : null,
    `${read} to read`,
    who.isKeeper ? (asks ? `${asks} asking to come in` : 'nobody at the door') : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const reading = { fontFamily: 'var(--font-reading)' };

  return (
    <ClimateRecordShell
      compact
      eyebrow="The shed"
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
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[12px] text-[#8a7f6d]" style={reading}>
              {who.name || 'The shed'}
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
          <p className="mt-1.5 text-[13px] text-[#3a342c]" style={reading}>{line}</p>

          <ShedRail isKeeper={who.isKeeper} active={tab} counts={counts || {}} onGo={go} />

          <RoomHead tab={tab} />

          <div className="pt-5">
            {tab === 'decide' && who.isKeeper && <DecideQueue onChange={count} />}
            {tab === 'check' && <ClimateChecking plain onChange={count} />}
            {tab === 'people' && who.isKeeper && <GuestList />}
            {tab === 'counts' && who.isKeeper && <AdminClimateDesk plain />}
            {tab === 'sourcing' && who.isKeeper && <DueDiligencePanel />}
          </div>

          {/* The room says out loud that the sorting is a conversation rather than an exam:
              one person keeps this record, and a keeper doing it alone at eleven at night is
              how a record gets abandoned. One line, never a chat window — the rules of the
              record stay the only voice that decides anything here. */}
          <p
            className="mt-6 border-l-2 border-[#b3261e] pl-3 text-[13px] italic leading-[1.55] text-[#2b2622]"
            style={reading}
          >
            I&apos;m here with you. Open a door and we&apos;ll go through it line by line — I&apos;ll
            bring the source up beside you, you say the yes.
          </p>
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