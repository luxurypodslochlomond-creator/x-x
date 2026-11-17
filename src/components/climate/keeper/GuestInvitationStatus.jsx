import React from 'react';
import { MarkLetter, MarkStep } from '@/components/climate/keeper/TrailMarks';

const date = (value) => new Date(value).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
export default function GuestInvitationStatus({ row }) {
  const needsEmail = (!row.joined_at && (!row.sign_in_sent_at || row.sign_in_error)) || !row.notice_sent_at || row.notice_error;
  return (
    <div className="mt-2 space-y-1 text-sm">
      <div className={`flex items-center gap-1.5 ${needsEmail ? 'text-record-red' : 'text-record-botanical'}`}>
        <MarkLetter size={16} />{!row.active ? 'Access paused' : needsEmail ? 'Invitation needs attention' : 'Emails accepted for sending'}
      </div>
      {row.joined_at && <div className="flex items-center gap-1.5 text-record-botanical"><MarkStep size={16} />Joined {date(row.joined_at)}</div>}
      {row.sign_in_error && <div className="break-words text-record-red">Sign-in email: {row.sign_in_error}</div>}
      {row.notice_error && <div className="break-words text-record-red">Record email: {row.notice_error}</div>}
      <details className="pt-1 text-record-muted">
        <summary className="cursor-pointer py-1 text-xs">Email details</summary>
        <div className="space-y-1 py-2 text-xs leading-relaxed">
          <div>Sign-in email: {row.sign_in_sent_at ? `accepted ${date(row.sign_in_sent_at)}` : row.joined_at ? 'they have already signed in' : 'no accepted send recorded'}</div>
          <div>Record email: {row.notice_sent_at ? `last accepted ${date(row.notice_sent_at)}` : 'no accepted send recorded'}</div>
          <div>Accepted means the service took the request, not that it reached their inbox.</div>
          {(row.agreed_by || row.added_by) && <div>Added by {row.agreed_by || row.added_by}</div>}
        </div>
      </details>
    </div>
  );
}