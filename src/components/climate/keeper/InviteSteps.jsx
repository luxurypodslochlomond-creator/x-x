import React, { useState } from 'react';
import { Copy, Check, KeyRound } from 'lucide-react';
import InviteCard from './InviteCard';

// ── WHAT TO SEND THEM ─────────────────────────────────────────────────────────
// Janine, 15 November: "Please walk me through the steps I should have her follow to sign
// in and find her way about to add initiatives." Fair question, and there was nowhere in
// the record that answered it, so a keeper had to be told it by hand or invent it.
//
// It began as five steps and that was one too many. A person meeting this record does
// three things, not five: they sign in, they add something, and they discover that a
// keeper reads it before it goes up. So it says exactly that, in that order, under one
// line — one address, one door, one yes. If a fourth step is ever needed here, the
// answer is to take something out first.
//
// This is for Janine, and for Brian, and for Gillian, and for whoever holds the keys in
// ten years: the words are here to be copied rather than read, because the place they are
// needed is an email to somebody who has never opened this record. Type a first name once
// and both things follow from it — the email, and the card that carries it home.

const RECORD = 'https://uf51.love';

// ── CORRECTED 15 NOVEMBER, 23:20 ─────────────────────────────────────────────
// These three steps said "Nothing they send is live until you say yes." That was
// untrue, and it was the sentence a keeper copied into her own email. An entry that
// arrives with the link to its source, and that the screening reads as clean, goes on
// the record as it arrives; only one without a source, or one the screen is unsure of,
// waits for a person. So the steps now say that, and they put the link first — because
// the link is the one thing that decides. A promise the code does not keep is worse
// than a smaller promise it does.
const STEPS = [
  {
    n: '1',
    title: 'Add it straight away, with no account at all',
    line: 'Open the record and tap "Submit a solution, crisis, or action". Paste the link to where it came from into the box at the top and the form fills itself in. Name and address go on the form so the record can reach them about it; the address is never shown to a reader, and nobody signs in to do this.',
  },
  {
    n: '2',
    title: 'The honest bit: the link is what decides',
    line: `An entry that carries its source link, and that the screening reads as clean, goes on the record as it arrives. One with no source — or one the screening is unsure of — waits for you, and you either find the link or leave it out. That is not a delay to apologise for: it is the reason a reader can trust the page. What is waiting sits at ${RECORD}/ClimateChecking.`,
  },
  {
    n: '3',
    title: 'Sign in only for the two things that need a name',
    line: 'Their own line on the roll, and checking what other people have sent. The invitation email sets the password, and the address you type here is the only key there is — nothing else to remember.',
  },
];

export default function InviteSteps() {
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  const message = [
    `Hello${name.trim() ? ` ${name.trim()}` : ''},`,
    '',
    'You have a place on the record. One address, one link, and it takes a minute:',
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
        The invitation email sets their password. These three steps go beside it, so they are
        not left to work the record out alone. Type their first name once and take either or both.
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
        placeholder="their first name, for the greeting and the card (optional)"
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

      <div className="mt-2">
        <InviteCard name={name} />
      </div>

      <p className="text-[11.5px] leading-[1.6] text-[#6b5f4f] mt-2" style={reading}>
        Their name, what the record is, and where to go: send it with the email or on its own
        into a group.
      </p>

      {/* ── AND THE OTHER CARD, FOR THE OTHER JOB ───────────────────────────────
          Two cards, one place to find them — because a keeper looking for "what do I send
          this person" should not have to know which of two doors the answer is behind. The
          name typed above fills both, so nothing is typed twice. */}
      <div className="border-t border-[#141210]/15 mt-4 pt-3">
        <p className="text-[12.5px] text-[#6b5f4f] mb-2" style={reading}>
          <KeyRound className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
          If they are going to hold the keys rather than check
        </p>
        <InviteCard name={name} variant="keeper" />
        <p className="text-[11.5px] leading-[1.6] text-[#6b5f4f] mt-2" style={reading}>
          The same card drawn for a keeper: her room, the people door, and the one thing that
          waits for a second keeper.
        </p>
      </div>
    </details>
  );
}