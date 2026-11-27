import React from 'react';
import { MarkKey, MarkGate } from '@/components/climate/keeper/KeeperMarks';
import { MarkAgain } from '@/components/climate/keeper/TrailMarks';

export default function RoomOverview({ who, headline, total, counted, failed, summary, keeperNames, checkingNow, onRefresh, onInvite }) {
  const status = !who.isKeeper ? 'Checking desk' : failed ? 'Count unavailable' : !counted ? 'Counting…' : total === 0 ? 'Decisions clear' : `${total} need attention`;
  // What the number means, said in the markup so the colour can follow it: waiting carries the
  // record's signal red, a clear room stays quiet, and a count that failed is neither.
  const state = failed ? 'failed' : !counted ? 'counting' : total === 0 ? 'clear' : 'waiting';
  return (
    <div className="room-overview grid grid-cols-[1fr_auto] items-baseline gap-x-3 font-body">
      <p className="room-identity col-start-1 row-start-1 text-[13px] text-record-muted">
        <span className="hidden lg:inline"><span className="font-semibold text-record-ink">{who.name || (who.isKeeper ? 'Custodian' : 'Witness')}</span>{who.isKeeper ? ' · custodian' : ' · witness'}</span>
        <span className="lg:hidden">{who.isKeeper ? 'Custodians’ room' : 'Checking'}</span>
      </p>
      <button
        type="button"
        onClick={onRefresh}
        aria-label="Refresh waiting work"
        className="room-refresh col-start-2 row-start-1 flex min-h-[32px] items-center gap-1.5 text-[12px] text-record-muted transition-colors active:text-record-red"
      >
        <MarkAgain size={18} /><span className="hidden lg:inline">Refresh</span>
      </button>
      <h1 data-state={state} className="room-title col-span-2 col-start-1 row-start-2 mt-1 text-[22px] text-record-ink">
        <span className="hidden lg:inline">{headline}</span>
        <span className="lg:hidden">{status}</span>
      </h1>
      {who.isKeeper && (
        <p className="room-keepers col-span-2 col-start-1 row-start-3 mt-1 flex items-start gap-1.5 text-[12px] leading-snug text-record-muted" aria-label="Custodians holding the keys">
          <MarkKey size={18} className="shrink-0 text-record-red" />
          <span><span className="hidden lg:inline">Keys held by </span>{keeperNames || who.name || 'you'}{checkingNow > 0 && <span> · {checkingNow} active witnesses</span>}</span>
        </p>
      )}
      {/* ── THE COUNT IS SAID ONCE, ON THE DOOR IT BELONGS TO ──────────────────────
          This line printed the whole count a third time — in the headline above it, here, and
          again under each door in the dock — and then spent a sentence explaining that one
          figure was not a second count of another. A custodian opening her own room at midnight
          should not have to read a footnote defending the arithmetic. The dock says the numbers,
          each on the door it opens; the room says the state in one line and nothing else. */}
      {who.isKeeper && onInvite && <button type="button" onClick={onInvite} className="col-span-full mt-3 inline-flex min-h-11 w-fit items-center gap-2 rounded bg-record-red px-4 py-2 text-sm font-semibold text-record-paper hover:bg-record-red/90"><MarkGate size={21} />Invite a witness</button>}
    </div>
  );
}