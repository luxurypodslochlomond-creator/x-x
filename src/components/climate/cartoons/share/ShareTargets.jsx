import React from 'react';
import { ROOM_ADDRESS } from '@/components/climate/cartoons/share/shareLines';

const enc = encodeURIComponent;

// An app that shows its own link preview would print the address twice, so Telegram gets the
// words with the address taken out and the address as its link field.
const withoutAddress = (text) =>
  text.split(ROOM_ADDRESS).join('').replace(/\n{3,}/g, '\n\n').trim();

// ── ONE TAP, NO ACCOUNT, NOBODY'S FEED ─────────────────────────────────────────
// Copying and pasting is a barrier: it is two gestures and a lost selection on a phone. These
// open the app the words are already in, with the words already in it, so passing something
// on is a tap and a send. Nothing here posts on anybody's behalf and nothing is tracked.
//
// LinkedIn, Facebook and Instagram are deliberately absent: their share addresses accept a
// link and nothing else, so a button there would quietly throw the words away. The address is
// printed above for those three, to paste. That is their limit, not ours.
export default function ShareTargets({ text, subject }) {
  const targets = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${enc(text)}` },
    {
      label: 'Telegram',
      href: `https://t.me/share/url?url=${enc(ROOM_ADDRESS)}&text=${enc(withoutAddress(text))}`,
    },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${enc(text)}` },
    { label: 'Email', href: `mailto:?subject=${enc(subject || 'Climate cartoons, free to read')}&body=${enc(text)}` },
    { label: 'SMS', href: `sms:?&body=${enc(text)}` },
  ];

  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      {targets.map((t) => (
        <a
          key={t.label}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-record-ink/25 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-record-ink/80 no-underline transition-colors hover:border-record-red hover:text-record-red"
        >
          {t.label}
        </a>
      ))}
      {canShare && (
        <button
          type="button"
          onClick={() => navigator.share({ text }).catch(() => {})}
          className="border border-record-red px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-record-red"
        >
          Share…
        </button>
      )}
    </div>
  );
}