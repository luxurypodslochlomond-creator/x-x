import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

// ── SAY WHAT YOU CHARGE, IN YOUR OWN WORDS ─────────────────────────────────────
// This does not create a payment and it does not promise one. It puts an artist's own price
// in front of the people who can go and find money, so that nobody has to guess, and so that
// the next time somebody asks "what would it cost?", there is an answer written by the hand
// that would do the work.
const field = 'mt-2 block w-full min-h-12 border border-record-ink/40 bg-record-paper p-3 text-base text-record-ink focus:outline focus:outline-2 focus:outline-record-red';

export default function RateForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rate, setRate] = useState('');
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  const send = async (event) => {
    event.preventDefault();
    setState('sending');
    setError('');
    const message = [
      `Artist: ${name.trim()}`,
      `Rate and terms, in their own words: ${rate.trim()}`,
      'Sent from the artists’ page.',
    ].join('\n\n');
    try {
      const res = await base44.functions.invoke('climateWriteToRecord', {
        kind: 'other',
        entry_title: `What I charge: ${name.trim()}`,
        from_email: email.trim(),
        message,
      });
      if (res.data?.error) throw new Error(res.data.error);
      setState('sent');
    } catch (err) {
      setError(err?.response?.data?.error || err.message || 'It did not send. Please try again.');
      setState('idle');
    }
  };

  if (state === 'sent') {
    return <p role="status" className="paid-sent">
      Thank you. Your price is with the people who can look for money. Nothing has been published, and nothing has been agreed on your behalf.
    </p>;
  }

  return <form className="paid-form" onSubmit={send}>
    <label>
      <span>Your name, as you sign your work</span>
      <input className={field} value={name} onChange={event => setName(event.target.value)} maxLength={80} required />
    </label>
    <label>
      <span>An address to answer you at</span>
      <input className={field} type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} maxLength={254} required />
    </label>
    <label>
      <span>What you charge, and for what</span>
      <textarea className={field} rows={4} maxLength={900} required value={rate} onChange={event => setRate(event.target.value)} placeholder="A new drawing: … · Reuse of a drawing you already made: … · A workshop or talk: …" />
    </label>
    {error && <p role="alert" className="paid-error">{error}</p>}
    <button type="submit" disabled={state === 'sending'}>
      {state === 'sending' ? 'Sending…' : 'Send my price'}
    </button>
    <p className="paid-form-note">
      Private. Read by the record’s custodians, not published, not passed to anyone else. It moves no money: it puts your price where money can be found.
    </p>
  </form>;
}