import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';
import CorrectionRow from '@/components/climate/CorrectionRow';
import RecordSaySomething from '@/components/climate/RecordSaySomething';
import WhoSigns from '@/components/climate/WhoSigns';
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
      className="record-sectioned-page"
      eyebrow="Corrections, in daylight"
      marker="Every correction · newest first · nothing removed"
      title="Corrections, in daylight"
      statement="Every change this record has had to make to itself — dated, and left where anyone can read it. Including the ones where the record was the thing that was wrong."
      returnTo="/TogetherChangeClimate"
      returnLabel="Back to the record"
      footer="Together we can change the course of climate change. Built in honour of Janine M. H. Selendy and Horizon International — and released to the world, the planet, all of us."
    >
      <div className="record-reading-plate record-prose">
      <p className="mb-5 font-mono text-[12px] leading-relaxed text-record-ink lg:text-[13px]">
        A correction is a change to something already on the record. The entry carries the note itself —
        what changed, and the date — and it appears here, printed exactly as the person who signed it
        wrote it. Never shortened, never softened.
      </p>
      <p className="mb-5 font-mono text-[12px] leading-relaxed text-record-ink lg:text-[13px]">
        Nothing is deleted to tidy this page up. An entry that turns out to be wrong keeps its place and
        gains a correction: a record with a mistake it owned is easier to check than one with a gap in it.
      </p>

      <p className="mb-9 border-l-4 border-record-red bg-record-signal/20 p-4 font-mono text-[12px] leading-relaxed text-record-ink lg:px-5 lg:text-[13px]">
        Only a signer can write a correction, and every one of them is written where you are
        reading it now. A correction that could be made quietly would not be a correction — it
        would be an edit.
      </p>

      </div>

      {/* ── THE DOOR THE OTHER PAGES WERE PROMISING ──────────────────────────────
          The privacy page told readers to write to six asterisks; the terms page sent
          takedown requests to the same place; and "How this record is made" sent anyone
          who wanted a copied source taken down to this page — which had no way to ask.
          Three promises, no door. This is the door, and it stands here because a
          correction is what most of those messages turn out to be. */}
      <div className="record-reading-plate mb-7">
        <RecordSaySomething />
      </div>

      {/* The count, before the list. It is the number this page is for, and it is stated in
          the same size whether it is nought or ninety. */}
      <section className="record-reading-plate">
      <div className="record-section-heading flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2">
        <h2 className="font-bold uppercase text-record-red" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(17px, 1.7vw, 24px)', letterSpacing: '-0.01em' }}>
          On the record
        </h2>
        {corrections && (
          <span className="record-section-count font-display text-xs font-bold uppercase">
            {corrections.length} {corrections.length === 1 ? 'correction' : 'corrections'}
          </span>
        )}
      </div>

      {!corrections && (
        <p className="text-[11.5px] font-mono text-[#5a5246] py-6">Reading the record…</p>
      )}

      {corrections && corrections.length === 0 && (
        <p className="text-[12px] lg:text-[13px] font-mono leading-relaxed text-[#141210] py-3">
          No corrections yet. That is not a boast — it is how early this is. The first one appears
          here, dated, with the entry it belongs to.
        </p>
      )}

      {corrections && corrections.length > 0 && (
        <ul className="space-y-5 lg:space-y-4">
          {corrections.map((correction) => (
            <CorrectionRow key={correction.key} correction={correction} />
          ))}
        </ul>
      )}

      </section>

      {/* The machine's part, said plainly. Anyone asking this record to be trustworthy has to
          be able to see where a machine helped and where a person decided — and this is the
          page where that is checked against the record's own mistakes. */}
      <section className="mt-9 lg:mt-12">
        <div className="mb-4 flex items-start gap-3 border-t-2 border-record-ink pt-5">
          <span className="shrink-0 bg-record-signal px-2 py-1 font-display text-xs font-bold text-record-ink">02</span>
          <h2 className="font-bold uppercase leading-tight text-record-red" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(19px, 1.9vw, 28px)', letterSpacing: '-0.01em' }}>
            Where the machine helps, and where it never does
          </h2>
        </div>
        <div className="space-y-4 font-mono text-[12px] leading-relaxed text-record-ink lg:text-[13px] lg:leading-[1.75]">
          <p>
            The screen that reads each entry is a machine. It produces an advisory note and nothing
            else: it cannot publish an entry, cannot hold one back on its own authority, and its
            opinion is never a finding. A person reads it and decides, and every decision goes into
            the audit trail — who looked, when, what the note said.
          </p>
          <p>
            It never writes a claim onto this record, never signs one, never corrects one. People do
            that, under their own names.
          </p>
          <p>
            And when those people get something wrong, it is published here, in the same size of
            letters as the entry. Show where the advice was taken, and show where the humans were
            wrong — that is the only honest way to ask anyone to trust a record with a machine in it.
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

      <WhoSigns />
    </ClimateRecordShell>
  );
}