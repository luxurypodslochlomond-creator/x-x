import React, { useEffect, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';

const SUBJECTS = ['Paid support for an artist', 'Time, space or a skill', 'Evidence or a correction', 'Help keeping the record open'];
const field = 'mt-2 block w-full min-h-12 border border-record-ink/40 bg-record-paper p-3 text-base text-record-ink focus:outline-record-red';
export default function ContributionOffer({ selected }) {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(() => selected?.artist ? `Artist: ${selected.artist}\n${selected.work ? `Work: ${selected.work}\n` : ''}\n` : '');
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');
  const details = useRef(null);
  useEffect(() => { if (selected) { setSubject(selected.subject); if (details.current) details.current.open = true; } }, [selected]);
  const send = async event => {
    event.preventDefault(); setState('sending'); setError('');
    try {
      const res = await base44.functions.invoke('climateWriteToRecord', { kind: 'other', entry_title: `Offer of help: ${subject}`, from_email: email, message });
      if (res.data?.error) throw new Error(res.data.error);
      setState('sent');
    } catch (err) { setError(err.response?.data?.error || err.message || 'The message did not send. Please try again.'); setState('idle'); }
  };
  return <section className="my-12 border-t-2 border-record-ink pt-6" id="offer-help" aria-labelledby="offer-help-title">
    <p className="stand-kicker">A real offer, to a person</p><h2 className="stand-section-title mt-2" id="offer-help-title">Start a conversation.</h2>
    <p className="mt-3 max-w-prose text-base leading-relaxed">Say what you can offer, who it is for and any conditions. Your message is private. No money is taken here.</p>
    {state === 'sent' ? <p role="status" className="mt-5 border-l-4 border-record-red p-4 text-lg">Your offer has been sent to the record. Nothing has been published or agreed on your behalf.</p> : <details className="mt-5 border-y border-record-ink/30 py-3" ref={details}>
      <summary className="cursor-pointer min-h-11 content-center font-bold">Write to the custodians</summary>
      <form onSubmit={send} className="mt-4 space-y-5 max-w-2xl">
        <label className="block font-semibold">What you can offer<select className={field} value={subject} onChange={event => setSubject(event.target.value)}>{SUBJECTS.map(item => <option key={item}>{item}</option>)}</select></label>
        <label className="block font-semibold">Your email, for a reply<input className={field} type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} /></label>
        <label className="block font-semibold">Your offer<textarea className={field} rows={4} required maxLength={5000} value={message} onChange={event => setMessage(event.target.value)} placeholder="Name the artist or work, if there is one. A few clear sentences are enough." /></label>
        {error && <p role="alert" className="text-record-red">{error}</p>}
        <button type="submit" disabled={state === 'sending'} className="min-h-12 px-6 py-3 bg-record-ink text-record-paper font-bold disabled:opacity-60">{state === 'sending' ? 'Sending…' : 'Send a private offer'}</button>
      </form>
    </details>}
  </section>;
}