import React from 'react';
import { Loader2 } from 'lucide-react';
import { MarkEye, MarkKey } from '@/components/climate/keeper/KeeperMarks';

export default function InvitePersonForm({ kind, setKind, email, setEmail, name, setName, note, setNote, busy, ready, solo, owner, onSubmit, message, failed }) {
  const keeper = kind === 'keys';
  const needsApproval = keeper && !solo && !owner;
  const field = 'mt-1.5 w-full rounded border border-record-ink/25 bg-record-paper px-3 py-3 text-base text-record-ink placeholder:text-record-muted focus:border-record-red focus:outline-none focus:ring-2 focus:ring-record-red/20';
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="room-invite-form mb-6 border-t-4 border-record-red bg-record-bone p-4 sm:p-5" aria-labelledby="invite-person-title" aria-busy={busy}>
      <h2 id="invite-person-title" className="room-invite-heading text-xl font-bold text-record-ink">Invite someone</h2>
      <p className="mt-1 text-sm text-record-muted">Save their place and request one invitation email, including sign-in. Its outcome stays beside their name.</p>
      <fieldset disabled={busy || !ready} className="mt-4 space-y-4 disabled:opacity-60">
        <legend className="sr-only">Invitation details</legend>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Their role on the record">
          {[['check', 'Witness', MarkEye], ['keys', 'Custodian', MarkKey]].map(([value, label, Mark]) => (
            <button key={value} type="button" onClick={() => setKind(value)} aria-pressed={kind === value} className={`flex min-h-12 items-center justify-center gap-2 rounded border px-3 py-2 font-semibold ${kind === value ? 'border-record-red bg-record-red text-record-paper' : 'border-record-ink/25 text-record-ink'}`}>
              <Mark size={19} />{label}
            </button>
          ))}
        </div>
        <p className="text-sm text-record-muted">{keeper ? 'Can publish entries and manage access.' : 'Checks sources and signs notes. Cannot publish or see private submission details.'}{needsApproval ? ' Another custodian must approve before the invitation is sent.' : ''}</p>
        <label className="block text-sm font-semibold text-record-ink" htmlFor="invite-email">Email address
          <input id="invite-email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} inputMode="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.org" className={field} />
        </label>
        <label className="block text-sm font-semibold text-record-ink" htmlFor="invite-name">Name <span className="font-normal text-record-muted">(optional)</span>
          <input id="invite-name" autoComplete="name" maxLength={150} value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </label>
        {!keeper && <label className="block text-sm font-semibold text-record-ink" htmlFor="invite-note">A note for the custodians <span className="font-normal text-record-muted">(optional)</span>
          <input id="invite-note" maxLength={300} value={note} onChange={(e) => setNote(e.target.value)} className={field} />
        </label>}
        <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded bg-record-red px-4 py-3 font-bold text-record-paper hover:bg-record-red/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-record-red">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}{busy ? 'Saving access and requesting email…' : needsApproval ? 'Ask another custodian to approve' : keeper ? 'Send custodian invite' : 'Send witness invite'}
        </button>
      </fieldset>
      {message && <div role={failed ? 'alert' : 'status'} aria-live="polite" className={`mt-4 border-l-2 pl-3 text-sm leading-relaxed ${failed ? 'border-record-red text-record-red' : 'border-record-botanical text-record-ink'}`}>{message}</div>}
    </form>
  );
}