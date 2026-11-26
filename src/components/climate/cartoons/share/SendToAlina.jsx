import React from 'react';
import CopyLine from '@/components/climate/CopyLine';

// ── THE INVITE, HANDED TO THE PERSON WHO ASKED FOR IT ─────────────────────────
// Alina Sen, 26 November: "Please share this invite with me on WhatsApp — my number is
// 99532 04658, I am happy to share this with more groups to ensure people know about the
// event and the workshop and come for it."
//
// She gave the number so the invite could reach her, not so it could be printed on a public
// page — and a mobile number on a public page is a number that gets scraped and called for
// years. So it lives here, behind the keeper's key with the rest of what is a person's rather
// than the record's, and the only thing it does is open a chat with the invite already in it.
//
// The country code is India, taken from the address at the foot of her own email. The chat
// opens first: nothing is sent until somebody presses send, and she sees who it came from.
const ALINA_NUMBER = '9953204658';
const ALINA_NUMBER_PRINTED = '+91 99532 04658';

export default function SendToAlina({ text }) {
  return (
    <section className="mt-6 border-t border-record-ink/15 pt-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-record-red">
        Send it to Alina · she asked for it on WhatsApp
      </p>
      <p className="mt-1.5 text-[11.5px] leading-snug text-record-muted">
        Her words: “Please share this invite with me on WhatsApp … I am happy to share this with
        more groups.” Her number sits behind the keeper’s key because she gave it to be messaged,
        not to be published. The chat opens with the invite already in it, and nothing is sent
        until you press send.
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <a
          href={`https://wa.me/91${ALINA_NUMBER}?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-record-red px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-record-red no-underline"
        >
          Open WhatsApp to Alina
        </a>
        <CopyLine text={ALINA_NUMBER_PRINTED} label="Copy her number" />
      </div>
    </section>
  );
}