import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { LockIcon, GoIcon } from '@/components/fergus/FergusIcons';

export default function FergusGate({ pin, setPin, error, busy, restoring, unlock }) {
  return <main className="fergus-gate">
    <div className="fergus-gate-card">
      <span className="fergus-gate-mark" aria-hidden="true">FH</span>
      <p className="fergus-gate-lock"><LockIcon size={18} /> Private</p>
      <h1>Fergus’s<br />room.</h1>
      <form onSubmit={unlock}>
        <label htmlFor="fergus-code">Your code</label>
        <input id="fergus-code" type="password" autoComplete="off" value={pin} onChange={event => setPin(event.target.value)} placeholder="••••" disabled={restoring} required />
        <button className="fergus-gate-open" disabled={busy || restoring || !pin.trim()}>
          {busy || restoring ? <><LoaderCircle size={20} className="animate-spin" /> Opening</> : <>Open <GoIcon size={20} /></>}
        </button>
        {error && <p className="fergus-error" role="alert">{error}</p>}
      </form>
    </div>
  </main>;
}