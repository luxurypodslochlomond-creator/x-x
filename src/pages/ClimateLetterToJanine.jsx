import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import KeeperKey from '@/components/climate/KeeperKey';
import CopyLine from '@/components/climate/CopyLine';
import { LETTER_TEXT } from '@/components/climate/letter/letterToJanine';

// ── HER LETTER, BEHIND HER OWN KEY ────────────────────────────────────────────
// The brief said everything except the one thing that is not a brief: what this is
// from one person to another. A letter printed on a public page stops being a letter
// and becomes a brochure with a signature. So it lives here, opens only to a keeper
// of the record, and is not linked from the record's foot, its nav or its brief.
export default function ClimateLetterToJanine() {
  return (
    <KeeperKey>
      <ClimateRecordShell
        eyebrow="Private · for Janine"
        marker="Not on the record · opened with a custodian's key"
        title="A letter, not a brief."
        statement="The one page that is not for a host, a panel or a stranger. It says what is unfinished, what is being asked, and what happens when the people who built this are gone."
        returnTo="/ClimateKeeperRoom"
        returnLabel="To the desk"
        footer="Written to be read once, kept, and answered when there is time."
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-3 border-b-2 border-[#141210]">
          <span className="text-[10px] font-black font-mono uppercase tracking-[0.18em] text-[#b3261e]">
            Private · do not forward the page
          </span>
          <div className="flex flex-wrap gap-2">
            <CopyLine text={LETTER_TEXT} label="Copy the letter" />
            <Link
              to={createPageUrl('ClimateHost')}
              className="px-2.5 py-1.5 border-2 border-[#141210]/30 text-[9px] font-black font-mono uppercase tracking-wide text-[#141210] active:border-[#b3261e] active:text-[#b3261e] transition-colors"
            >
              Her five questions
            </Link>
          </div>
        </div>

        <div className="bg-[#f7f1e5] border border-[#141210]/20 border-l-4 border-l-[#b3261e] px-4 lg:px-7 py-5 lg:py-8">
          <div className="space-y-3.5">
            {LETTER_TEXT.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="text-[14.5px] lg:text-[16px] leading-[1.75] text-[#1a1612] whitespace-pre-line"
                style={{ fontFamily: 'var(--font-reading)', textWrap: 'pretty' }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        <p className="text-[10.5px] font-mono leading-relaxed text-[#6b6258] mt-5 border-t border-[#141210]/15 pt-3">
          This page has no link on the record, and that is deliberate. It names what is not finished, which is hers to
          say in her own words and nobody else's. Send the method page and the record to an institute; keep this one for
          the person who is actually holding the keys.
        </p>
      </ClimateRecordShell>
    </KeeperKey>
  );
}