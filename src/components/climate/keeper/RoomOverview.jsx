import React from 'react';
import { KeyRound, RefreshCw } from 'lucide-react';

export default function RoomOverview({ who, headline, total, counted, failed, keeperNames, checkingNow, onRefresh, onInvite }) {
  const status = failed ? 'Count unavailable' : !counted ? 'Counting…' : total === 0 ? 'All clear' : `${total} waiting`;
  // What the number means, said in the markup so the colour can follow it: waiting carries the
  // record's signal red, a clear room stays quiet, and a count that failed is neither.
  const state = failed ? 'failed' : !counted ? 'counting' : total === 0 ? 'clear' : 'waiting';
  return (
    <div className="room-overview grid grid-cols-[1fr_auto] items-baseline gap-x-3 font-body">
      <p className="room-identity col-start-1 row-start-1 text-[13px] text-record-muted">
        <span className="hidden lg:inline"><span className="font-semibold text-record-ink">{who.name || 'Keeper'}</span>{who.isKeeper ? ' · keeper' : ' · checker'}</span>
        <span className="lg:hidden">{who.isKeeper ? "Keeper’s room" : 'Checking'}</span>
      </p>
      <button
        type="button"
        onClick={onRefresh}
        aria-label="Refresh waiting work"
        className="room-refresh col-start-2 row-start-1 flex min-h-[32px] items-center gap-1.5 text-[12px] text-record-muted transition-colors active:text-record-red"
      >
        <RefreshCw className="h-3 w-3" /><span className="hidden lg:inline">Refresh</span>
      </button>
      <h1 data-state={state} className="room-title col-span-2 col-start-1 row-start-2 mt-1 text-[22px] text-record-ink">
        <span className="hidden lg:inline">{headline}</span>
        <span className="lg:hidden">{status}</span>
      </h1>
      {who.isKeeper && (
        <p className="room-keepers col-span-2 col-start-1 row-start-3 mt-1 flex items-start gap-1.5 text-[12px] leading-snug text-record-muted" aria-label="Keepers holding the keys">
          <KeyRound className="mt-[3px] h-3.5 w-3.5 shrink-0 text-record-red" strokeWidth={2.2} />
          <span><span className="hidden lg:inline">Keys held by </span>{keeperNames || who.name || 'you'}{checkingNow > 0 && <span> · {checkingNow} checking</span>}</span>
        </p>
      )}
      {who.isKeeper && onInvite && <button type="button" onClick={onInvite} className="col-span-2 row-start-4 mt-3 inline-flex min-h-11 w-fit items-center rounded bg-record-red px-4 py-2 text-sm font-semibold text-record-paper hover:bg-record-red/90">Invite a checker</button>}
    </div>
  );
}