import React from 'react';
import CopyLine from '@/components/climate/CopyLine';
import ShareCardButton from '@/components/climate/ShareCardButton';
import { buildGuideShareCard } from '@/components/climate/shareCardImage';
import { recordAddress } from '@/components/climate/recordAddress';

// ── THE LINE TO SEND ───────────────────────────────────────────────────────────
// From a phone, one tap. The line and the address travel together, so nothing
// arrives with its link cut off — and the card carries the address inside the
// picture, in case the line is forwarded without it.

const CARD = {
  id: 'for-janine',
  badge: 'FOR JANINE',
  title: 'Straight answers',
  headline: 'Your five questions, answered in your order',
  marker: 'Nothing rounded up',
  body: 'What is silent, what is ready, what a host must supply, what it costs, and the doors that let anyone check every line.',
  inside: ['01 · Nothing plays by itself', '02 · Seen now, handed over later', '03 · What your introduction should say', '04 · What the keeper needs', '05 · Every door, live'],
  closing: 'Check any line before you quote it. Every claim has a door beside it.',
  url_path: '/ClimateHost',
};

export default function SendThisPage() {
  const address = recordAddress('/ClimateHost');
  const line = `Janine — this is the record. This page answers your five questions in your order, and every claim on it has a link beside it so you can check it without asking me: ${address}`;
  const short = `The record, and your five questions answered: ${address}`;

  return (
    <div className="border-2 border-[#141210] bg-[#f7f1e5] px-3 py-3 mb-8 lg:mb-10">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">One line, to send</p>
        <CopyLine text={line} label="Copy line" />
      </div>
      <p className="text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210] mt-1.5">{line}</p>

      <div className="mt-3 pt-3 border-t border-[#141210]/20 flex items-center justify-between gap-3">
        <p className="text-[10.5px] font-mono text-[#5a5246] leading-snug">Shorter, for a text: “{short}”</p>
        <CopyLine text={short} label="Copy short" />
      </div>

      <div className="mt-3 pt-3 border-t border-[#141210]/20">
        <ShareCardButton entry={CARD} build={buildGuideShareCard} label="Share the answers as a card" />
      </div>

      <p className="text-[10px] font-mono text-[#8a8375] leading-snug mt-2 break-all">{address}</p>
    </div>
  );
}