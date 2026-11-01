import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CorrectionRow from '@/components/climate/CorrectionRow';
import useCorrections from '@/components/climate/useCorrections';

// ── CORRECTIONS, IN DAYLIGHT ──────────────────────────────────────────────────
// Nearly every institution shows a wall of successes. Almost none will show you a dated
// line saying "we had this wrong, and here is what changed". That is the whole reason this
// page exists: a record that publishes its own mistakes is the only kind anybody should be
// asked to trust, and it is the one thing a fund, a panel or a journalist can check without
// having to believe a word anybody says about the record.
//
// Nothing here is a boast and nothing is dressed up. If the list is empty, it says so.

export default function ClimateCorrections() {
  const corrections = useCorrections();

  return (
    <ClimateRecordShell
      eyebrow="Corrections, in daylight"
      marker="Every correction · newest first · nothing removed"
      title="Corrections, in daylight"
      statement="Every change this record has had to make to itself — dated, and left where anyone can read it. Including the ones where the record was the thing that was wrong."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International — and released to the world, the planet, all of us."
    >
      <p className="text-[12px] lg:text-[13px] font-mono leading-relaxed text-[#141210] mb-3">
        A correction is a change to something already on the record. When one is made, the entry
        carries the note itself — what changed, and the date it was changed — and it appears here.
        The note is printed exactly as the keeper wrote it: never shortened, never softened, never
        folded into a summary.
      </p>
      <p className="text-[12px] lg:text-[13px] font-mono leading-relaxed text-[#141210] mb-3">
        Nothing is deleted to make this page look better. An entry that turns out to be wrong keeps
        its place and gains a correction, because a record with a gap in it is harder to check than
        a record with a mistake it owned.
      </p>

      <p className="border-l-4 border-l-[#1e3a2b] bg-[#1e3a2b]/5 px-3 lg:px-5 py-2.5 lg:py-3.5 text-[11.5px] lg:text-[12.5px] font-mono leading-relaxed text-[#141210] mb-7">
        Only a keeper can write a correction, and every one of them is written where you are
        reading it now. A correction that could be made quietly would not be a correction — it
        would be an edit.
      </p>

      {/* The count, before the list. It is the number this page is for, and it is stated in
          the same size whether it is nought or ninety. */}
      <div className="flex items-baseline gap-2 mb-3 border-b-2 border-[#141210] pb-2">
        <h2 className="font-black uppercase text-[#141210]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(17px, 1.7vw, 24px)', letterSpacing: '-0.01em' }}>
          On the record
        </h2>
        {corrections && (
          <span className="text-[10px] font-black font-mono uppercase tracking-wider text-[#5a5246]">
            {corrections.length} {corrections.length === 1 ? 'correction' : 'corrections'}
          </span>
        )}
      </div>

      {!corrections && (
        <p className="text-[11.5px] font-mono text-[#5a5246] py-6">Reading the record…</p>
      )}

      {corrections && corrections.length === 0 && (
        <p className="text-[12px] lg:text-[13px] font-mono leading-relaxed text-[#141210] py-3">
          No corrections have been made yet. That is not a boast — it is how early this is. The
          moment one is made it appears here, dated, with the entry it belongs to.
        </p>
      )}

      {corrections && corrections.length > 0 && (
        <ul className="space-y-3 lg:space-y-4">
          {corrections.map((correction) => (
            <CorrectionRow key={correction.key} correction={correction} />
          ))}
        </ul>
      )}

      {/* The machine's part, said plainly. Anyone asking this record to be trustworthy has to
          be able to see where a machine helped and where a person decided — and this is the
          page where that is checked against the record's own mistakes. */}
      <section className="mt-9 lg:mt-12">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-black font-mono text-[#e2602a]">02</span>
          <h2 className="font-black uppercase text-[#141210] leading-tight" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 1.9vw, 28px)', letterSpacing: '-0.01em' }}>
            Where the machine helps, and where it never does
          </h2>
        </div>
        <div className="space-y-2.5 text-[12px] lg:text-[13px] font-mono leading-relaxed lg:leading-[1.75] text-[#141210]">
          <p>
            The screen that reads each entry as it arrives is a machine. It produces an advisory
            note and nothing else. It cannot publish an entry, it cannot hold one back on its own
            authority, and its opinion is never treated as a finding. A person reads what it said
            and decides, and every decision is kept with who made it, when, and what the note said.
          </p>
          <p>
            What the machine is not allowed to do is the part that matters to anyone being asked to
            trust a system that uses machine help: it never writes a claim onto this record, never
            signs one, and never corrects one. People do that, under their own names.
          </p>
          <p>
            And when those people get something wrong, it is published here, in the same size of
            letters as the entry itself. That is the only honest way to ask anybody to trust a
            record with a machine in it — show where the advice was taken, and show where the humans
            were wrong.
          </p>
        </div>
        <p className="mt-3 text-[11px] font-mono leading-relaxed text-[#5a5246]">
          How an entry is made, and who decides:{' '}
          <Link to={createPageUrl('ClimateMethod')} className="border-b-2 border-[#141210] text-[#141210] hover:text-[#b3261e] hover:border-[#b3261e]">
            the method
          </Link>
          .
        </p>
      </section>
    </ClimateRecordShell>
  );
}