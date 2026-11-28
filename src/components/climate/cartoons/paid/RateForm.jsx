import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

// ── SAY WHAT WOULD MAKE IT RIGHT ───────────────────────────────────────────────
// This is not a rate card and it is not a shop. A cartoonist is not a vendor with a price
// list, and the thing that was taken from these hands was not only money — it was time,
// paper, ink and the assumption that the work would be worth something eventually.
//
// So the question is not "what do you charge". It is "what would make it right", and money
// is one honest answer among several: a fee for a new drawing, a paid workshop, materials,
// a name on an application for a grant, or simply the promise kept in writing. What is NOT
// on offer is reach, followers or being seen — a credit is a credit, and this record does
// not dress it up as payment.
//
// It sends a line to the record's own inbox. It creates no payment, promises none, and
// publishes nothing: the line goes to the people who can go and find money, so nobody has
// to argue their own worth from scratch in a message to a stranger.
const field = 'paid-field';

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
      `What would make it right, in their own words: ${rate.trim()}`,
      'Sent from the artists’ page.',
    ].join('\n\n');
    try {
      const res = await base44.functions.invoke('climateWriteToRecord', {
        kind: 'other',
        entry_title: `What would make it right: ${name.trim()}`,
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
      Your line is with the people who can go and look for money. Nothing has been published,
      nothing has been agreed on your behalf, and nothing is owed to anyone for saying it.
    </p>;
  }

  return <form className="paid-form" onSubmit={send}>
    <label className="paid-form-ask">
      <span>What would make it right? Your words, not a rate card.</span>
      <textarea
        className={field}
        rows={3}
        maxLength={900}
        required
        value={rate}
        onChange={event => setRate(event.target.value)}
        placeholder="A fee for a new drawing… · a paid workshop… · materials… · my name on an application… · or the promise, kept in writing."
      />
    </label>
    <div className="paid-form-who">
      <label>
        <span>Your name, as you sign your work</span>
        <input className={field} value={name} onChange={event => setName(event.target.value)} maxLength={80} required />
      </label>
      <label>
        <span>Where to answer you</span>
        <input className={field} type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} maxLength={254} required />
      </label>
    </div>
    {error && <p role="alert" className="paid-error">{error}</p>}
    <div className="paid-form-foot">
      <button type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send this line'}
      </button>
      <p className="paid-form-note">
        Private. Read by the record’s custodians, never published, never passed to anyone else.
        It moves no money — it puts your words where money can be found.
      </p>
    </div>
  </form>;
}