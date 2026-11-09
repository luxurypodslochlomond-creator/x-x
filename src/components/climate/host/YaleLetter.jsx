import React, { useState } from 'react';
import { Download } from 'lucide-react';
import CopyLine from '@/components/climate/CopyLine';
import { buildLetterPdf } from './letterPdf';
import { LETTER_PARAGRAPHS, LETTER_SUBJECT, LETTER_FULL, letterDate } from './letterText';

// ── THE LETTER, IN THREE PARAGRAPHS ───────────────────────────────────────────
// The long version was a form with a letter trapped inside it. This is the thing
// itself: where the record stands, what is genuinely missing, and what it needs —
// said once each, in the order a reader checks them. Dated the day it is printed,
// with three blanks that are hers: the name, the department, the institution.
//
// Nothing here claims it is launched, verified, funded or partnered. Every gap is
// named before anybody else can find it, which is the only reason the rest of it
// can be believed. The words live in letterText so the PDF prints the same letter.
export default function YaleLetter() {
  const [making, setMaking] = useState(false);

  const download = async () => {
    setMaking(true);
    try {
      buildLetterPdf();
    } finally {
      setMaking(false);
    }
  };

  return (
    <div className="border-2 border-[#141210] bg-[#f7f1e5] mt-3">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 lg:px-5 py-2.5 border-b border-[#141210]/20">
        <span className="text-[9px] font-black font-mono uppercase tracking-[0.16em] text-[#5a5246]">
          Dated today · three paragraphs · hers to sign
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={download}
            disabled={making}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border-2 border-[#141210] bg-[#141210] text-[#efe7d6] text-[9px] font-black font-mono uppercase tracking-wide active:bg-[#e2602a] active:text-[#141210] transition-colors disabled:opacity-60"
          >
            <Download className="w-3 h-3" /> {making ? 'Making…' : 'PDF'}
          </button>
          <CopyLine text={LETTER_FULL} label="Copy letter" />
        </div>
      </div>

      <div className="px-4 lg:px-7 py-5 lg:py-7">
        <p className="text-[9.5px] font-mono uppercase tracking-[0.14em] leading-relaxed text-[#5a5246] whitespace-pre-line">
          {`UNIVERSAL FREQUENCY 51 CIC
Together We Can Change the Course of Climate Change
Community Interest Company, registered in Scotland, SC870603`}
        </p>

        <p className="text-[10px] font-mono text-[#8a8375] mt-3">{letterDate()}</p>

        <div className="mt-3 text-[11px] font-mono text-[#5a5246] leading-relaxed whitespace-pre-line border-l-2 border-[#141210]/20 pl-2.5">
          {`[Name]
[Role or department]
[Institution]`}
        </div>

        <p className="text-[10px] font-black font-mono uppercase tracking-[0.1em] text-[#141210] leading-snug mt-5 mb-4 pb-3 border-b border-[#141210]/20">
          {LETTER_SUBJECT}
        </p>

        <p className="text-[13px] leading-[1.75] text-[#141210] mb-3" style={{ fontFamily: 'var(--font-reading)', textWrap: 'pretty' }}>
          Dear [Name],
        </p>

        {LETTER_PARAGRAPHS.map((para, i) => (
          <p
            key={i}
            className="text-[13px] lg:text-[14px] leading-[1.8] text-[#141210] mb-3.5"
            style={{ fontFamily: 'var(--font-reading)', textWrap: 'pretty' }}
          >
            {para}
          </p>
        ))}

        <div className="mt-5 pt-4 border-t border-[#141210]/15">
          <p className="text-[13px] leading-[1.7] text-[#141210]" style={{ fontFamily: 'var(--font-reading)' }}>
            With every good wish,
          </p>
          {/* It is her letter to send, so it is her hand that signs it. This printed her
              name and her title under words she had not written, on a page anyone can
              open and a PDF anyone can download — and she has asked, plainly, not to be
              named on things she did not write. The line is a blank now. */}
          <p aria-hidden="true" className="mt-6 mb-1.5 h-4 w-[230px] max-w-full border-b border-[#141210]/40" />
          <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#5a5246]">Signature — hers to add</p>
        </div>
      </div>

      <div className="px-4 lg:px-6 py-3 border-t border-[#141210]/20">
        <p className="text-[10.5px] font-mono leading-relaxed text-[#5a5246]">
          Four blanks, and all four are hers: the name, the department, the institution and the signature. Nothing
          biographical has been invented and nothing is signed for her — a letter that guessed at her life's work, or
          put her name under words she had not read, would be the first thing anyone checked.
        </p>
      </div>
    </div>
  );
}