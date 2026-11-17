import React from 'react';
import { MarkAgreed, MarkStrike } from './keeper/TrailMarks';
import { MarkStamp } from './keeper/KeeperMarks';

// ── WAITING FOR A SECOND KEY ───────────────────────────────────────────────────
// The half of an access change that has been asked and not yet agreed. It sits above the
// list it is about, so nobody has to go looking for what is in flight, and it says out
// loud that nothing has changed yet — because a keeper who taps "remove" and sees the row
// still there needs to know why, not to wonder whether the tap worked.
//
// The hand that asked cannot be the hand that agrees: their own line says so instead of
// offering a button, and the server refuses it even if a button were somehow offered.
export default function AccessSecondKey({ items, onConfirm, onCancel, busy }) {
  if (!items?.length) return null;

  return (
    <div className="border border-record-ink/25 bg-record-bone p-3 mb-6">
      <p className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.18em] text-record-red mb-1.5">
        <MarkAgreed size={12} /> waiting for a second key · {items.length}
      </p>
      <p className="text-[12.5px] text-record-muted leading-[1.6] mb-1" style={{ fontFamily: 'var(--font-reading)' }}>
        Nothing has changed yet. One custodian asks, a different custodian agrees.
      </p>

      {items.map((w) => (
        <div key={w.id} className="border-t border-record-ink/12 pt-2.5 pb-1 mt-2">
          <p className="text-[14px] text-record-ink" style={{ fontFamily: 'var(--font-reading)', fontWeight: 600 }}>
            {w.verb} {w.target_name}
            {w.target_is_keeper ? <span className="text-record-muted font-normal"> · custodian</span> : null}
          </p>
          <p className="text-[11px] font-mono text-record-muted mt-0.5">asked by {w.requested_by_name}</p>

          {w.mine ? (
            <div className="flex items-center gap-4 mt-1.5">
              <span className="text-[12px] text-record-muted flex-1 leading-[1.5]" style={{ fontFamily: 'var(--font-reading)' }}>
                Yours. Someone else has to agree.
              </span>
              <button
                onClick={() => onCancel(w.id)}
                disabled={busy}
                className="min-h-[36px] inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.1em] text-record-muted disabled:opacity-40"
              >
                <MarkStrike size={14} /> withdraw
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 mt-1.5">
              <button
                onClick={() => onConfirm(w.id)}
                disabled={busy}
                className="min-h-[36px] inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.1em] font-black text-[#1e3a2b] disabled:opacity-40"
              >
                <MarkStamp size={14} /> agree
              </button>
              <button
                onClick={() => onCancel(w.id)}
                disabled={busy}
                className="min-h-[36px] inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.1em] text-record-muted disabled:opacity-40"
              >
                <MarkStrike size={14} /> cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}