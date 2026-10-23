import React, { useState } from 'react';
import { recordAddress } from './recordAddress';

// ── ON THE RECORD ── who gave it, on what terms, and how to cite it.
// A research panel, a journalist or a reader in fifty years can take this one line
// and land on the exact work. Nothing is invented here: the work, the artist and the
// source file are the real ones, and the address is the reader's own page, so the
// reference can never point at somewhere that does not exist.
const WORK = 'X-Ray Girl';
const ARTIST = 'Dillon Squire';
const SOURCE_FILE = 'DS_XRAYGIRL_MSTGB2_44_16.wav';
const RECORD_PAGE = '/TogetherChangeClimate';

const FACTS = [
  ['Work', WORK],
  ['Artist', ARTIST],
  ['Source file', SOURCE_FILE],
  ['Given', 'To the record, free — not sold, not licensed'],
  ['Rights', 'The recording stays his work. The record never charges for it.'],
];

export default function TransmissionRecord() {
  const [copied, setCopied] = useState(false);

  const address =
    typeof window !== 'undefined' ? recordAddress(RECORD_PAGE) : RECORD_PAGE;
  const reference = `${ARTIST}, '${WORK}' (2026). Lossless master, given free to the record. Together We Can Change Climate · Universal Frequency 51. ${address}`;

  const copyReference = () => {
    navigator.clipboard
      ?.writeText(reference)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      })
      .catch(() => {});
  };

  return (
    <div className="bg-[#efe7d6] px-5 lg:px-10 py-4 lg:py-6 border-t-2 border-[#141210]">
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#b3261e] mb-2.5">
        On the record
      </p>

      <dl className="space-y-1.5">
        {FACTS.map(([key, value]) => (
          <div key={key} className="flex gap-2 text-[11px] font-mono leading-relaxed">
            <dt className="text-[#6b6258] w-[76px] flex-shrink-0">{key}</dt>
            <dd className="text-[#1a1612] min-w-0 break-words">{value}</dd>
          </div>
        ))}
      </dl>

      <button
        onClick={copyReference}
        className="mt-3 w-full px-3 py-2.5 bg-[#1a1612] text-[#efe7d6] text-[10px] font-black font-mono uppercase tracking-wide active:bg-[#b3261e] transition-colors"
      >
        {copied ? 'Reference copied' : 'Copy the reference'}
      </button>

      <p className="text-[10px] font-mono text-[#6b6258] mt-2 leading-relaxed">
        One tap gives anyone the full citation — the work, the artist, the terms, and this page.
      </p>
    </div>
  );
}