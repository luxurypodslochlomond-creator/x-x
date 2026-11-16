import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';
import ClimateRecordShell from '@/components/climate/ClimateRecordShell';

// Coolasfuck Terms — honest, short, Beadie Signal style.
// Not legal jargon. A letter from the record.

export default function ClimateTerms() {
  return (
    <ClimateRecordShell
      eyebrow="Terms"
      marker="The ground we stand on"
      title="The Ground We Stand On"
      statement="Not legal jargon. Just honest ground rules for the record. Read it in a minute."
      returnTo={createPageUrl('TogetherChangeClimate')}
      returnLabel="Back to the record"
      footer="Read it. Question it. Tell us when we get it wrong."
    >
      <div className="relative">

        {/* 1. WHAT THIS IS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            01 · What This Is
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              Together we can change the course of climate change — this is a public record of climate solutions and crises, after Janine Selendy. Anyone can read it. Anyone can submit to it. A machine screens every submission for spam and dangerous advice, and signs nothing: a clean entry goes up at once, and anything it is unsure about waits for a person.
            </p>
          </div>
        </section>

        {/* 2. WHAT YOU CAN SUBMIT */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            02 · What You Can Submit
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4 space-y-2">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              Solutions (a positive action to replicate), crises (an emergency to alert the world to), actions (cleanups, plantings, meetings), entries for the wire (what changed, where, who says so), gatherings of people working on the same thing, and comments on entries.
            </p>
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              Music is given, never bought. If you made a track you may hand it to the record: your master is stored exactly as you gave it, your name stays on the work, your rights stay yours, and you decide once whether anyone may take the copy or only hear it here. Nothing on this record is sold, licensed or counted for money. A listener may leave a line under a track in their own words; a listener is never asked for an email, and their line is never edited.
            </p>
            <p className="text-[12px] font-mono leading-relaxed text-[#5a5246]">
              Your email is required to submit an entry, an action or a group, so we can reach you about it. A track is different: the work speaks for itself, and an address is asked for but never demanded. We do not publish your email, sell it, or spam you.
            </p>
          </div>
        </section>

        {/* 3. HUMAN REVIEW */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            03 · Human Check
          </h2>
          <div className="bg-[#f7f1e5] border-l-4 border-l-[#1e3a2b] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              An AI advisory note screens every submission for spam, harmful content and relevance. It never judges the science, never decides, and we do not train anything on what you send. Clear entries go on at once; anything it flags waits for a real person. The note is kept on the entry itself, where anyone can read it.
            </p>
            <p className="mt-3 text-[12px] font-mono leading-relaxed text-[#141210]">
              An entry a person puts on the record carries their printed name. A machine can never fill that name — it has none to sign with — so an entry that went up on the screen's word alone says plainly that it is unsigned rather than showing nothing. When an entry turns out to be wrong, it is corrected in the open with the date it was corrected, never quietly edited or deleted, and every correction is gathered at{' '}
              <Link to={createPageUrl('ClimateCorrections')} className="underline underline-offset-4 decoration-[#e2602a] font-black">corrections, in daylight</Link>.
            </p>
          </div>
        </section>

        {/* 4. BE HONEST */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            04 · Be Honest
          </h2>
          <div className="bg-[#f7f1e5] border-l-4 border-l-[#e2602a] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              Don't submit fake solutions, stolen content, or spam. If you do, we reject it. If you keep doing it, we block you. The record is only as strong as the honesty of the people who feed it.
            </p>
          </div>
        </section>

        {/* 5. YOUR WORDS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            05 · Your Words
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              You keep the copyright to what you write. By submitting, you let us publish it on this record and translate it so nobody is left behind. You can ask us to take it down at any time, by the process in "Taking Something Down" below.
            </p>
          </div>
        </section>

        {/* 6. NO WARRANTY */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            06 · No Warranty
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              Every entry is asked to name the thing it came from, and where a copy of that source has been kept, the entry says so and dates it. But this is a community record, not a peer-reviewed journal. We do not test whether a claim is true. Use your own judgment. Check the sources. Think for yourself.
            </p>
          </div>
        </section>

        {/* 7. HOW LONG WE KEEP IT */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            07 · How Long We Keep It
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4 space-y-2">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              Your submission stays on the record for as long as the record exists, unless you ask us to take it down. Your contact email is kept so we can reach you about your submission; it is removed when you ask. The country a reader reads from is kept as an aggregate number, with no link back to any person.
            </p>
          </div>
        </section>

        {/* 9. IF YOU'RE UNDER 13 */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            08 · If You're Under 13
          </h2>
          <div className="bg-[#f7f1e5] border-l-4 border-l-[#1e3a2b] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              If you are under 13, ask a grown-up to submit for you. We do not knowingly collect submissions from children under 13 without a parent or guardian. If you believe a child has submitted without consent, write to us and we will remove it.
            </p>
          </div>
        </section>

        {/* 10. TAKING SOMETHING DOWN */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            09 · Taking Something Down
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              If you see content that is yours, false, stolen, or harmful, tell us with the entry title and the reason at <a href="mailto:family@uf51.love" className="underline underline-offset-4 decoration-[#e2602a]">family@uf51.love</a>. A human aims to review every takedown request within seven days. If the claim is valid, the entry is removed or corrected. This is our takedown process.
            </p>
          </div>
        </section>

        {/* 11. WHEN THINGS GO WRONG */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            10 · When Things Go Wrong
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              This is a free, community-run public record. We do our best, but we are not liable for indirect or consequential losses arising from the use of the record. Our total liability for any claim is limited to the amount you paid us, which for a free record is zero. Nothing here limits liability for death or personal injury caused by our negligence, or for fraud.
            </p>
          </div>
        </section>

        {/* 12. THE LAW THAT APPLIES */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            11 · The Law That Applies
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              These terms are governed by the laws of the country in which the organisation that permanently runs this record is based. That organisation will be named here before the record moves to its own home. Until then, if something goes wrong, talk to us first — this clause exists only for the rare case a dispute needs a court.
            </p>
          </div>
        </section>

        {/* 13. WHEN THESE CHANGE */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#141210] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            12 · When These Change
          </h2>
          <div className="bg-[#f7f1e5] border border-[#141210] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#141210]">
              These terms took effect on 19 October 2026. If we change them, the date changes with them and the change is named here rather than slipped in. If a change affects what we do with your submission, we tell you before it takes effect.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mt-8 pt-6 border-t-2 border-[#141210]">
          <p className="text-[11px] font-mono text-[#5a5246] leading-relaxed mb-3">
            Questions about these terms, or about anything on this page? Write to{' '}
            <a href="mailto:family@uf51.love" className="text-[#141210] underline underline-offset-4 decoration-[#e2602a]">family@uf51.love</a>{' '}
            — a person reads it and answers. The organisation that will hold the record permanently is still being arranged, and will be named here when it is. Until then, this page is the promise: read it, question it, and tell us when we get it wrong.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to={createPageUrl('ClimatePrivacy')} className="inline-flex items-center gap-2 px-3 py-2 bg-[#141210] text-[#efe7d6] text-[10px] font-black font-mono uppercase border border-[#141210] hover:bg-[#e2602a] transition-colors">
              Privacy <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to={createPageUrl('TogetherChangeClimate')} className="inline-flex items-center gap-2 px-3 py-2 bg-[#f7f1e5] text-[#141210] text-[10px] font-black font-mono uppercase border border-[#141210] hover:bg-[#141210] hover:text-[#efe7d6] transition-colors">
              Back to the Record <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

      </div>
    </ClimateRecordShell>
  );
}