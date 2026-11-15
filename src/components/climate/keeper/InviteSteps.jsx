import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// ── WHAT TO SEND THEM ─────────────────────────────────────────────────────────
// Janine, 15 November: "Please walk me through the steps I should have her follow to sign
// in and find her way about to add initiatives." Fair question, and there was nowhere in
// the record that answered it, so a keeper had to be told it by hand or invent it.
//
// These are the real steps, in the order a person meets them: the letter, the address,
// the door an initiative goes through, and the honest thing about waiting for a keeper.
// The words are here to be copied rather than read, because the place they are needed is
// an email to somebody who has never opened this record.
//
// And it says "she", "he", "they" nowhere it does not need to: the copy is written for
// whoever the keeper is writing to, since the record does not know.

const RECORD = 'https://uf51.love';

const STEPS = [
  {
    n: '1',
    title: 'Open the invitation',
    line: 'It comes to the address you type here. The button inside sets a password. One tap, on a phone, and they are in.',
  },
  {
    n: '2',
    title: 'Always sign in with that same address',
    line: `At ${RECORD}. Nothing to install and no second account. Signed out, the record still reads — they simply cannot check anything or be credited for it.`,
  },
  {
    n: '3',
    title: 'To add an initiative',
    line: 'Open the record and tap "Submit a solution, crisis, or action". Paste the page it came from into the box at the top and the form fills itself in. Their name goes with it, and their email stays private.',
  },
  {
    n: '4',
    title: 'The honest bit: it waits for a keeper',
    line: 'Nothing they send is live until you say yes. That is not a delay to apologise for. It is the reason a reader can trust the page they are looking at.',
  },
  {
    n: '5',
    title: 'Checking is the other door',
    line: `What is waiting sits at ${RECORD}/ClimateChecking. A note in their own name is what moves an entry. They cannot publish, edit or delete anything.`,
  },
];

export default function InviteSteps() {
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  const message = [
    `Hello${name.trim() ? ` ${name.trim()}` : ''},`,
    '',
    'You have a place on the record. Here is the whole of it, and it takes a minute:',
    '',
    ...STEPS.map((s) => `${s.n}. ${s.title}. ${s.line}`),
    '',
    'Anything you are unsure of, reply to this and a keeper will answer.',
    '',
    `Together We Can Change Climate. ${RECORD}`,
  ].join('\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const box = document.createElement('textarea');
      box.value = message;
      document.body.appendChild(box);
      box.select();
      document.execCommand('copy');
      box.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const reading = { fontFamily: 'var(--font-reading)' };

  return (
    <details open className="room-details border-t border-[#141210]/20 pt-3 mb-6">
      <summary>What to send them afterwards</summary>
      <p className="text-[13px] leading-[1.6] text-[#6b5f4f] mt-2 mb-3" style={reading}>
        The invitation email sets their password. These are the steps to send beside it, so
        they are not left to work the record out alone.
      </p>

      <ol className="space-y-2 mb-3">
        {STEPS.map((s) => (
          <li key={s.n} className="flex gap-2.5">
            <span className="flex-shrink-0 font-mono text-[10px] font-black text-[#e2602a] pt-[3px]">{s.n}</span>
            <span className="text-[13px] leading-[1.55] text-[#3a342c]" style={reading}>
              <span className="font-semibold text-[#141210]">{s.title}.</span> {s.line}
            </span>
          </li>
        ))}
      </ol>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="their first name, for the greeting (optional)"
        className="w-full min-h-[46px] px-3 mb-2 text-[14px] bg-[#faf6ec] border border-[#141210]/25 text-[#141210] placeholder:text-[#8a7f70]"
      />

      <button
        onClick={copy}
        className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 border-2 border-[#141210] text-[#141210] text-[14px] font-semibold active:bg-[#141210] active:text-[#f4efe4]"
        style={reading}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied. Paste it into your email.' : 'Copy these steps as an email'}
      </button>

      <p className="text-[11.5px] leading-[1.6] text-[#6b5f4f] mt-2" style={reading}>
        Worth knowing before you write: a person who adds initiatives and a person who checks
        them walk through the same door. The record calls both a place on the list; only the
        keys are different.
      </p>
    </details>
  );
}