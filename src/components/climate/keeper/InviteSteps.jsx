import React, { useState } from 'react';
import { Copy, Check, KeyRound } from 'lucide-react';
import InviteCard from './InviteCard';

// ── WHAT TO SEND THEM ─────────────────────────────────────────────────────────
// Janine, 15 November: "Please walk me through the steps I should have her follow to sign
// in and find her way about to add initiatives." Fair question, and there was nowhere in
// the record that answered it, so a custodian had to be told it by hand or invent it.
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
// untrue, and it was the sentence a custodian copied into her own email. An entry that
// arrives with the link to its source, and that the screening reads as clean, goes on
// the record as it arrives; only one without a source, or one the screen is unsure of,
// waits for a person. So the steps now say that, and they put the link first — because
// the link is the one thing that decides. A promise the code does not keep is worse
// than a smaller promise it does.
// ── CORRECTED AGAIN, 16 NOVEMBER ─────────────────────────────────────────────
// These steps led with the open submit door and put signing in third, which reads as a
// walkthrough for a stranger dropping one entry in and leaving. The person a custodian
// actually sends this to is a checker — someone who comes in by name, reads what is
// waiting, and adds their own work as part of the same job. So the order is the order they
// will do it in: sign in, find the work, then add something of their own. And it says
// plainly that a checker has no publishing button, because it does not — the submit door
// is open to everybody, and that is the door an initiative goes through.
const STEPS = [
  {
    n: '1',
    title: 'Sign in',
    line: 'Use the email address on your invitation. Already have an account? Use your usual sign-in.',
  },
  {
    n: '2',
    title: 'Check a source',
    line: `Open ${RECORD}/ClimateKeeperRoom. Follow an entry to its source and leave a signed note: it holds up, it does not, or you cannot tell. All three help.`, 
  },
  {
    n: '3',
    title: 'Add an initiative',
    line: `On ${RECORD}/TogetherChangeClimate, tap "Submit a solution, crisis, or action" and paste the source link. Sourced entries cleared by screening can appear straight away; anything unclear waits for a custodian.`, 
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
    'Anything you are unsure of, reply to this and a custodian will answer.',
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
    <details className="room-details border-t border-[#141210]/20 pt-3 mb-6">
      <summary>Optional personal note & invitation cards</summary>
      <p className="text-[13px] leading-[1.6] text-[#6b5f4f] mt-2 mb-3" style={reading}>
        The invite button above requests one invitation email and records the outcome. This is only an optional personal note.
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
        {copied ? 'Copied — paste it into your email' : 'Copy the note'}
      </button>

      {/* ── IT SAID "SEND" AND IT ONLY COPIED ─────────────────────────────────────
          Brian, 17 November: "tried sending an email to a custodian, nothing saved." He was
          right that nothing saved: this button puts text on the clipboard and the record
          never sends it, because a letter from a person should come from that person's own
          mailbox. The label now says what it does, and the line under it says what it
          does not, so nobody waits for an email this page was never going to send. */}
      <p className="text-[11.5px] leading-[1.6] text-[#6b5f4f] mt-1.5" style={reading}>
        Copies to your clipboard — nothing is sent from here. Paste it into your own email to them.
      </p>

      <div className="mt-2">
        <InviteCard name={name} />
      </div>

      <p className="text-[11.5px] leading-[1.6] text-[#6b5f4f] mt-2" style={reading}>
        Their name, what the record is, and where to go: send it with the email or on its own
        into a group.
      </p>

      {/* ── AND THE OTHER CARD, FOR THE OTHER JOB ───────────────────────────────
          Two cards, one place to find them — because a custodian looking for "what do I send
          this person" should not have to know which of two doors the answer is behind. The
          name typed above fills both, so nothing is typed twice. */}
      <div className="border-t border-[#141210]/15 mt-4 pt-3">
        <p className="text-[12.5px] text-[#6b5f4f] mb-2" style={reading}>
          <KeyRound className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
          If they are going to hold the keys rather than check
        </p>
        <InviteCard name={name} variant="keeper" />
        <p className="text-[11.5px] leading-[1.6] text-[#6b5f4f] mt-2" style={reading}>
          The same card drawn for a custodian: her room, the people door, and the one thing that
          waits for a second custodian.
        </p>
      </div>
    </details>
  );
}