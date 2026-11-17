import React from 'react';
import { Loader2 } from 'lucide-react';
import { MarkAgain, MarkHold, MarkStep, MarkStrike } from '@/components/climate/keeper/TrailMarks';
import GuestInvitationStatus from '@/components/climate/keeper/GuestInvitationStatus';
import CopyJoiningLink from '@/components/climate/keeper/CopyJoiningLink';

export default function GuestPerson({ row, busy, pending, onInvite, onChange, message, failed }) {
  const retry = !row.joined_at && Boolean(row.sign_in_error || !row.sign_in_sent_at);
  return (
    <article className="room-person mb-3 border border-record-ink/15 border-l-4 border-l-record-red bg-record-paper p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="room-person-name min-w-0 break-words text-lg font-bold text-record-ink">{row.name || row.email}</h3>
        <span className={`rounded px-2 py-1 text-xs font-semibold ${row.active ? 'bg-record-red/10 text-record-red' : 'bg-record-ink/10 text-record-muted'}`}>{!row.active ? 'Paused' : row.is_keeper ? 'Keeper' : row.joined_at ? 'Checker · joined' : 'Checker'}</span>
      </div>
      <div className="mt-1 break-all text-sm text-record-muted">{row.email}</div>
      {row.note && <div className="mt-1 text-sm text-record-muted">{row.note}</div>}
      <GuestInvitationStatus row={row} />
      {row.notes > 0 && <div className="mt-1 text-xs text-record-muted">{row.notes} signed {row.notes === 1 ? 'note' : 'notes'}</div>}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-record-ink/10 pt-2">
        {row.active && <button type="button" disabled={busy} onClick={() => onInvite(row)} className="inline-flex min-h-11 items-center gap-1.5 rounded bg-record-red px-3 py-2 text-sm font-semibold text-record-paper disabled:opacity-50">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MarkAgain size={16} />}{pending ? 'Requesting email…' : row.joined_at ? 'Email reminder' : retry ? 'Send invite' : 'Resend invite'}
        </button>}
        <button type="button" disabled={busy} onClick={() => onChange({ change: row.active ? 'pause' : 'restore', row_id: row.id })} className="inline-flex min-h-11 items-center gap-1.5 text-sm text-record-ink disabled:opacity-50">
          {row.active ? <MarkHold size={16} /> : <MarkStep size={16} />}{row.active ? 'Pause access' : 'Restore access'}
        </button>
        <button type="button" disabled={busy} onClick={() => { if (window.confirm(`Remove ${row.name || row.email} from the record's guest list? Their signed work stays.`)) onChange({ change: 'remove', row_id: row.id }); }} className="inline-flex min-h-11 items-center gap-1 text-sm text-record-red disabled:opacity-50">
          <MarkStrike size={16} />Remove
        </button>
      </div>
      {row.active && <CopyJoiningLink keeper={row.is_keeper} />}
      {message && <div role={failed ? 'alert' : 'status'} className={`mt-2 text-sm ${failed ? 'text-record-red' : 'text-record-ink'}`}>{message}</div>}
    </article>
  );
}