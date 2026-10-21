import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';

// ── x = x ──
// The mark we put under Dr. Jane Goodall's words on the record.
// This page is why we say it. Nothing here is decoration — every claim is the
// thing the database actually does.

const BLOCKS = [
  {
    n: '01',
    h: 'A thing is itself',
    b: 'This is the law of identity, the oldest law of thought there is: a thing is itself and not another thing. Logicians have spent two and a half thousand years trying to break it and failed. It is the one statement in the world that cannot be wrong. Everything else we say here could be wrong. This cannot.',
  },
  {
    n: '02',
    h: 'Everything else out there is arithmetic',
    b: 'A like is a weight. A view is a score. A vote is a rank. The moment two things can be compared, you have a leaderboard, and a leaderboard is a machine for making some people matter less than others. That machine runs on your attention and it never stops. We did not want to build another one.',
  },
  {
    n: '03',
    h: 'So we removed the arithmetic',
    b: 'There is no score field in this record. No weight field. No ranking algorithm, no trending, no engagement metric, no "most read". That is a decision, not an oversight. You cannot be sorted here, because there is nothing to sort you by. The absence is the feature.',
  },
  {
    n: '04',
    h: 'The village and the capital',
    b: 'A crisis in a village of two hundred weighs exactly what a crisis in a capital of twenty million weighs. A six-year-old with a mangrove seedling counts exactly as much as a ministry with a budget. Not equal after moderation. Not equal in intent. Equal, full stop.',
  },
];

export default function XEqualsX() {
  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative overflow-x-hidden">

      {/* ── THE MARK ── */}
      <div className="relative z-[2] bg-[#141210] px-6 py-14 text-center" style={{ animation: 'twcc-epigraph 1s ease-out both' }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#efe7d6]/50">Universal Frequency 51</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse" />
        </div>
        <h1 className="font-black text-[#efe7d6] leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 18vw, 120px)', letterSpacing: '0.06em' }}>
          x = x
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-[#efe7d6]/80 max-w-md mx-auto">
          The only equation that cannot be wrong.
        </p>
        <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[#e2602a]">
          Why we say it
        </p>
      </div>

      {/* ── THE WHY ── */}
      <div className="relative z-[2] max-w-2xl mx-auto px-5 py-12">
        <p className="text-[16px] leading-relaxed text-[#1a1612] mb-10">
          You will see the mark under the words of Dr. Jane Goodall on the record: <span className="italic">"Every single day, we hold the power to shape the world around us."</span> Then <span className="font-black font-mono">x = x</span>. That order is the whole point. The hope first. Then the promise that nobody on this record stands above anybody else. Here is what the mark means, in full.
        </p>

        <div className="space-y-8">
          {BLOCKS.map((b) => (
            <div key={b.n} className="border-l-2 border-[#1a1612]/20 pl-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[10px] font-mono font-black text-[#b3261e] tracking-widest">{b.n}</span>
                <h2 className="text-[19px] font-black leading-tight" style={{ fontFamily: 'var(--font-display)' }}>{b.h}</h2>
              </div>
              <p className="text-[15px] leading-relaxed text-[#1a1612]/85">{b.b}</p>
            </div>
          ))}
        </div>

        {/* ── WHAT IT DOES NOT MEAN ── */}
        <div className="mt-10 bg-[#efe7d6] border-l-4 border-[#b3261e] px-4 py-5">
          <h2 className="text-[13px] font-black font-mono uppercase tracking-[0.2em] text-[#b3261e] mb-2">
            What the mark does not mean
          </h2>
          <p className="text-[15px] leading-relaxed text-[#1a1612]/85">
            It does not mean every claim here is true. <span className="font-black font-mono">x = x</span> says a thing is itself; it says nothing about whether that thing is right. That is a different job, done a different way: every entry carries its source, spam is screened as it arrives, anything unclear waits for a human, and when we are wrong we say so. Honesty and equality are two separate promises. We made both, and we keep them apart on purpose.
          </p>
        </div>

        {/* ── SAID PLAINLY ── */}
        <div className="mt-12 text-center">
          <p className="text-[26px] leading-tight font-black text-[#1a1612]" style={{ fontFamily: 'var(--font-display)' }}>
            We are not ranking you.
          </p>
          <p className="text-[26px] leading-tight font-black text-[#e2602a]" style={{ fontFamily: 'var(--font-display)' }}>
            We are recording you.
          </p>
          <p className="mt-4 text-[13px] font-mono uppercase tracking-[0.18em] text-[#6b6258]">
            x = x · nobody above anybody
          </p>
        </div>

        {/* ── THE TWO DOORS ── */}
        <div className="mt-10 flex flex-col gap-3">
          <Link
            to="/ExtractionProofCovenant"
            className="flex items-center justify-between gap-3 px-4 py-4 bg-[#1a1612] text-[#efe7d6] active:bg-[#e2602a]"
          >
            <span className="flex items-center gap-3">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span className="text-[11px] font-black font-mono uppercase tracking-widest">The covenant behind the mark</span>
            </span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>
          <Link
            to="/TogetherChangeClimate"
            className="flex items-center justify-between gap-3 px-4 py-4 border-2 border-[#1a1612] active:bg-[#1a1612] active:text-[#efe7d6]"
          >
            <span className="flex items-center gap-3">
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="text-[11px] font-black font-mono uppercase tracking-widest">Back to the record</span>
            </span>
          </Link>
        </div>
      </div>

      {/* ── THE MARK, AGAIN, QUIET ── */}
      <div className="relative z-[2] pb-10 text-center">
        <span className="font-mono font-black tracking-[0.3em] text-[11px] text-[#1a1612]/20">x = x</span>
      </div>
    </div>
  );
}