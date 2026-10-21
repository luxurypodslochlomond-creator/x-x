import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Coolasfuck Terms — honest, short, Beadie Signal style.
// Not legal jargon. A letter from the record.

export default function ClimateTerms() {
  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative">
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">

        {/* BACK */}
        <Link to={createPageUrl('TogetherChangeClimate')} className="inline-flex items-center gap-2 text-[11px] font-mono font-black uppercase text-[#6b6258] hover:text-[#b3261e] transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> The Record
        </Link>

        {/* HEADER */}
        <header className="mb-8 pb-6 border-b-2 border-[#1a1612]">
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-[#b3261e] mb-2">TWCC · TERMS</p>
          <h1 className="font-black uppercase text-[#1a1612] leading-[0.95]" style={{ fontFamily: 'var(--font-display)', fontSize: '44px', letterSpacing: '-0.03em' }}>
            The Ground<br />We Stand On
          </h1>
          <p className="text-[12px] font-mono text-[#6b6258] mt-3 leading-relaxed">
            Not legal jargon. Just honest ground rules for the record. Read it in a minute.
          </p>
        </header>

        {/* 1. WHAT THIS IS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            01 · What This Is
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              Together we can change the course of climate change — this is a public record of climate solutions and crises, after Janine Selendy. Anyone can read it. Anyone can submit to it. Nothing gets published without a human reading it first.
            </p>
          </div>
        </section>

        {/* 2. WHAT YOU CAN SUBMIT */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            02 · What You Can Submit
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4 space-y-2">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              Solutions (a positive action to replicate), crises (an emergency to alert the world to), actions (cleanups, plantings, meetings), and comments on entries.
            </p>
            <p className="text-[12px] font-mono leading-relaxed text-[#6b6258]">
              Your email is required. We use it to contact you about your submission. We do not publish it, sell it, or spam you.
            </p>
          </div>
        </section>

        {/* 3. HUMAN REVIEW */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            03 · Human Review
          </h2>
          <div className="bg-[#efe7d6] border-l-4 border-l-[#1e3a2b] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              Every submission is read by a real person before it goes live. An AI advisory note helps screen for spam and relevance, but the AI never judges the science. A human decides. That is the promise.
            </p>
          </div>
        </section>

        {/* 4. BE HONEST */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            04 · Be Honest
          </h2>
          <div className="bg-[#efe7d6] border-l-4 border-l-[#b3261e] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              Don't submit fake solutions, stolen content, or spam. If you do, we reject it. If you keep doing it, we block you. The record is only as strong as the honesty of the people who feed it.
            </p>
          </div>
        </section>

        {/* 5. YOUR WORDS */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            05 · Your Words
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              You keep the copyright to what you write. By submitting, you let us publish it on this record and translate it so nobody is left behind. You can ask us to take it down at any time, by the process in "Taking Something Down" below.
            </p>
          </div>
        </section>

        {/* 6. NO WARRANTY */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            06 · No Warranty
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              We do our best to verify what gets published, but this is a community record, not a peer-reviewed journal. Use your own judgment. Check the sources. Think for yourself.
            </p>
          </div>
        </section>

        {/* 7. THE AI ADVISORY NOTE */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            07 · The AI Advisory Note
          </h2>
          <div className="bg-[#efe7d6] border-l-4 border-l-[#e2602a] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              When you submit, an AI reads the text and writes an advisory note for the human reviewer. It checks for spam, harmful content, and relevance to climate. It does not judge the science. It does not publish anything. It does not train on your submission. The note and your text are kept only until a human reviews them, then the note is kept as part of the audit trail and your text stays on the record unless you ask us to remove it.
            </p>
          </div>
        </section>

        {/* 8. HOW LONG WE KEEP IT */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            08 · How Long We Keep It
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4 space-y-2">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              Your submission stays on the record for as long as the record exists, unless you ask us to take it down. Your contact email is kept so we can reach you about your submission; it is removed when you ask. The country a reader reads from is kept as an aggregate number, with no link back to any person.
            </p>
          </div>
        </section>

        {/* 9. IF YOU'RE UNDER 13 */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            09 · If You're Under 13
          </h2>
          <div className="bg-[#efe7d6] border-l-4 border-l-[#1e3a2b] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              If you are under 13, ask a grown-up to submit for you. We do not knowingly collect submissions from children under 13 without a parent or guardian. If you believe a child has submitted without consent, write to us and we will remove it.
            </p>
          </div>
        </section>

        {/* 10. TAKING SOMETHING DOWN */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            10 · Taking Something Down
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              If you see content that is yours, false, stolen, or harmful, tell us with the entry title and the reason, at the contact address published here once the record's permanent home is arranged. A human reviews every takedown request within seven days. If the claim is valid, the entry is removed or corrected. This is our takedown process.
            </p>
          </div>
        </section>

        {/* 11. WHEN THINGS GO WRONG */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            11 · When Things Go Wrong
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              This is a free, community-run public record. We do our best, but we are not liable for indirect or consequential losses arising from the use of the record. Our total liability for any claim is limited to the amount you paid us, which for a free record is zero. Nothing here limits liability for death or personal injury caused by our negligence, or for fraud.
            </p>
          </div>
        </section>

        {/* 12. THE LAW THAT APPLIES */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            12 · The Law That Applies
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              These terms are governed by the laws of the country in which the organisation that permanently runs this record is based. That organisation will be named here before the record moves to its own home. Until then, if something goes wrong, talk to us first — this clause exists only for the rare case a dispute needs a court.
            </p>
          </div>
        </section>

        {/* 13. WHEN THESE CHANGE */}
        <section className="mb-6">
          <h2 className="font-black uppercase text-[#1a1612] mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', letterSpacing: '-0.02em' }}>
            13 · When These Change
          </h2>
          <div className="bg-[#efe7d6] border border-[#1a1612] p-4">
            <p className="text-[12px] font-mono leading-relaxed text-[#1a1612]">
              These terms took effect on 19 October 2026. If we change them, we update the date at the top of this page and say what changed. If a change affects what we do with your submission, we tell you before it takes effect.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mt-8 pt-6 border-t-2 border-[#1a1612]">
          <p className="text-[11px] font-mono text-[#6b6258] leading-relaxed mb-3">
            Questions about these terms? A contact address will be published here as soon as the record's permanent home is arranged. Until then, this page is the promise — read it, question it, and tell us when we get it wrong.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link to={createPageUrl('ClimatePrivacy')} className="inline-flex items-center gap-2 px-3 py-2 bg-[#1a1612] text-[#efe7d6] text-[10px] font-black font-mono uppercase border border-[#1a1612] hover:bg-[#b3261e] transition-colors">
              Privacy <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to={createPageUrl('TogetherChangeClimate')} className="inline-flex items-center gap-2 px-3 py-2 bg-[#efe7d6] text-[#1a1612] text-[10px] font-black font-mono uppercase border border-[#1a1612] hover:bg-[#1a1612] hover:text-[#efe7d6] transition-colors">
              Back to the Record <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

        {/* FOOT */}
        <p className="text-center mt-10 text-[9px] font-mono font-black tracking-[0.3em] text-[#6b6258]/40">x = x</p>
      </div>
    </div>
  );
}