import React from 'react';
import { MarkLetter, MarkStep } from '@/components/climate/keeper/TrailMarks';

const date = (value) => new Date(value).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
export default function GuestInvitationStatus({ row }) {
  const joined = Boolean(row.joined_at);
  const error = joined ? row.notice_error : row.sign_in_error;
  const accepted = joined ? row.notice_sent_at : row.sign_in_sent_at;
  const line = !row.active ? 'Access paused' : error ? 'Email needs attention' : joined ? 'Signed in · access recognised' : accepted ? 'Invitation accepted for sending' : 'Access saved · no accepted invitation recorded';
  const tone = !row.active ? 'text-record-muted' : error ? 'text-record-red' : joined || accepted ? 'text-record-botanical' : 'text-record-red';
  return (
    <div className="mt-2 space-y-1 text-sm">
      <div className={`flex items-start gap-2 ${tone}`}>
        <MarkLetter size={21} state={error ? 'failed' : accepted ? 'sent' : 'none'} />{line}
      </div>
      {joined && <div className="flex items-center gap-2 text-record-botanical"><MarkStep size={21} />First recognised {date(row.joined_at)}</div>}
      {error && <div role="alert" className="break-words text-record-red">{error}</div>}
      {!joined && accepted && <div className="text-xs text-record-muted">Accepted {date(accepted)}. Inbox delivery is not confirmed.</div>}
      <details className="pt-1 text-record-muted">
        <summary className="cursor-pointer py-1 text-xs">Email history</summary>
        <div className="space-y-1 py-2 text-xs leading-relaxed">
          <div>Sign-in invitation: {row.sign_in_sent_at ? `accepted ${date(row.sign_in_sent_at)}` : 'no accepted send recorded'}</div>
          {row.notice_sent_at && <div>Record email: last accepted {date(row.notice_sent_at)}</div>}
          {row.notice_error && !joined && <div>Earlier optional record email failed: {row.notice_error}. It does not determine their access or sign-in invitation.</div>}
          <div>New arrivals receive one invitation, not two separate emails. The joining link never grants access by itself.</div>
          {(row.agreed_by || row.added_by) && <div>Added by {row.agreed_by || row.added_by}</div>}
        </div>
      </details>
    </div>
  );
}