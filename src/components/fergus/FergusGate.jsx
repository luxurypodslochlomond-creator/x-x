import React from 'react';
import { LockKeyhole, ArrowRight, LoaderCircle } from 'lucide-react';
export default function FergusGate({ pin, setPin, error, busy, restoring, unlock }) {
  return <main className="fergus-gate">
    <div className="fergus-gate-card">
      <span className="fergus-monogram" aria-hidden="true">FH<span /></span>
      <div className="fergus-eyebrow"><LockKeyhole size={14} /> A room of your own</div>
      <h1>Fergus’s room.</h1>
      <p>The ideas. The application. The football. All in one place.</p>
      <form onSubmit={unlock}>
        <label htmlFor="fergus-code">The code Dad gave you</label>
        <input id="fergus-code" type="password" autoComplete="off" value={pin} onChange={event => setPin(event.target.value)} placeholder="Enter your code" disabled={restoring} required />
        <button className="fergus-primary" disabled={busy || restoring || !pin.trim()}>{busy || restoring ? <><LoaderCircle size={18} className="animate-spin" /> Opening…</> : <>Open my room <ArrowRight size={18} /></>}</button>
        {error && <p className="fergus-error" role="alert">{error}</p>}
      </form>
      <small>A shared code, not a vault. Keep sensitive information elsewhere.</small>
    </div>
  </main>;
}