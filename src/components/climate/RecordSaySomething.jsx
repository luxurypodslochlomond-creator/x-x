import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

// ── SAY SOMETHING TO THE RECORD ───────────────────────────────────────────────
// "How this record is made" has been telling readers, for weeks: if you would rather a
// copy of your work were not kept, "say so" — and the link it gave them landed on this
// page, which only ever printed corrections and had no way to say anything. That is the
// quietest kind of broken there is: a real door, opening onto a room with no one in it.
//
// So the box is here. Four kinds of message, one form, no account, and an answer from a
// person at the address they give. It publishes nothing, changes nothing, and touches no
// entry: a message is a message, and a person still decides what happens next.
const KINDS = [
  { value: 'wrong', label: 'Something here is wrong', hint: 'A date, a name, a claim, a link that no longer opens.' },
  { value: 'mine', label: 'This is mine, and I want it taken down', hint: 'Your work, your words, your picture. Say which entry.' },
  { value: 'source', label: 'I have the source for an entry that has none', hint: 'An entry with no origin waits for a person. This is how you give it one.' },
  { value: 'other', label: 'Something else', hint: 'Anything the four other kinds do not cover.' },
];

export default function RecordSaySomething() {
  const [kind, setKind] = useState('wrong');
  const [entry, setEntry] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState('idle'); // idle · sending · sent
  const [error, setError] = useState('');

  const send = async (event) => {
    event.preventDefault();
    setError('');
    setState('sending');
    try {
      const res = await base44.functions.invoke('climateWriteToRecord', {
        kind,
        entry_title: entry,
        from_email: email,
        message,
      });
      if (res?.data?.error) throw new Error(res.data.error);
      setState('sent');
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'It did not send. Try once more.');
      setState('idle');
    }
  };

  if (state === 'sent') {
    return (
      <section id="say" className="border-2 border-[#1e3a2b] bg-[#1e3a2b]/5 p-4 lg:p-5">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#1e3a2b]">Sent · kept</p>
        <p className="mt-2 text-[12px] lg:text-[13px] font-mono leading-relaxed text-[#141210]">
          Your message is with the record's custodians, and an answer comes back to the address you gave. Nothing
          was published, and nothing on the record changed by sending this — a person reads it first, which
          is the whole point of writing.
        </p>
      </section>
    );
  }

  const hint = KINDS.find((k) => k.value === kind)?.hint;

  return (
    <section id="say" className="border-2 border-[#141210] p-4 lg:p-5">
      <h2
        className="font-black uppercase text-[#141210] mb-1"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 1.9vw, 26px)', letterSpacing: '-0.01em' }}
      >
        Say something to the record
      </h2>
      <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#5a5246] mb-3">
        No account, no charge. A person reads every message and answers it at the address you give.
      </p>

      <form onSubmit={send} className="space-y-3">
        <div>
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#5a5246] mb-1.5">What is it about</span>
          <div className="grid gap-1.5">
            {KINDS.map((option) => (
              <label
                key={option.value}
                className={`flex items-start gap-2 border px-2.5 py-2 cursor-pointer transition-colors ${
                  kind === option.value ? 'border-[#141210] bg-[#efe7d6]' : 'border-[#141210]/25 hover:border-[#141210]/60'
                }`}
              >
                <input
                  type="radio"
                  name="record-say-kind"
                  value={option.value}
                  checked={kind === option.value}
                  onChange={() => setKind(option.value)}
                  className="mt-[3px] accent-[#b3261e]"
                />
                <span className="text-[12px] font-mono text-[#141210] leading-snug">{option.label}</span>
              </label>
            ))}
          </div>
          {hint && <p className="mt-1.5 text-[10.5px] font-mono text-[#5a5246]">{hint}</p>}
        </div>

        <label className="block">
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#5a5246] mb-1">Which entry</span>
          <input
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="The headline as it appears on the record"
            className="w-full border border-[#141210]/30 bg-transparent px-2.5 py-2 text-[12px] font-mono text-[#141210] outline-none focus:border-[#141210]"
          />
        </label>

        <label className="block">
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#5a5246] mb-1">Your address, for the answer</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.org"
            className="w-full border border-[#141210]/30 bg-transparent px-2.5 py-2 text-[12px] font-mono text-[#141210] outline-none focus:border-[#141210]"
          />
        </label>

        <label className="block">
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#5a5246] mb-1">What happened</span>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="A sentence or two is plenty."
            className="w-full border border-[#141210]/30 bg-transparent px-2.5 py-2 text-[12px] font-mono leading-relaxed text-[#141210] outline-none focus:border-[#141210]"
          />
        </label>

        {error && <p className="text-[11px] font-mono text-[#b3261e]">{error}</p>}

        <button
          type="submit"
          disabled={state === 'sending'}
          className="w-full bg-[#b3261e] px-4 py-2.5 font-mono text-[10.5px] font-black uppercase tracking-[0.2em] text-[#f4efe4] disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending…' : 'Send it'}
        </button>

        <p className="text-[10px] font-mono leading-relaxed text-[#5a5246]">
          Your address is used to answer you and nothing else. It is never printed on the record, never shown
          to a reader, and never sold.
        </p>
      </form>
    </section>
  );
}