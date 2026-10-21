import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';

// ── x = x ──
// The mark on the record, and the argument behind it.
// Rule for this page: short sentences, no theatre, every claim checkable.
// The only citations are things a research panel already knows.

const REMOVED = [
  'No score field. No weight field.',
  'No popularity sort. No trending. No "most read".',
  'No follower counts. No karma. No badges.',
  'No advertising. Ever.',
  'No account needed to read any of it.',
];

const KEPT = [
  { h: 'The source stays on every entry', b: 'One link per entry to where it came from. Nothing is published as fact without one.' },
  { h: 'AI screens, humans decide', b: 'Spam is screened by AI as it arrives. Anything unclear is held for a human. The AI does not judge the science and does not publish on its own.' },
  { h: 'Rough places only', b: 'Country and region. No coordinates, no IP addresses stored, no private messages held on the platform.' },
];

const ANCHORS = [
  { who: 'Herbert A. Simon, 1971', what: 'A wealth of information creates a poverty of attention. Attention is the scarce resource, and whatever holds it can sell it.' },
  { who: 'Wendy Espeland & Mitchell Stevens, Annual Review of Sociology, 1998', what: 'Commensuration: putting unlike things on one scale. It always serves whoever owns the scale.' },
  { who: 'Shoshana Zuboff, The Age of Surveillance Capitalism, 2019', what: 'Behaviour measured and predicted at scale becomes the commodity itself.' },
  { who: 'Michael Sandel, What Money Can\'t Buy, 2012', what: 'Some goods are corrupted, not merely priced, when they are put up for sale.' },
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
        <p className="mt-5 text-[16px] leading-relaxed text-[#efe7d6] max-w-md mx-auto">
          The only statement that cannot be wrong.
        </p>
        <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[#e2602a]">
          A record with no ranking and nothing for sale
        </p>
      </div>

      <div className="relative z-[2] max-w-2xl mx-auto px-5 py-12">

        {/* ── 01 ── */}
        <section className="mb-12">
          <span className="text-[10px] font-mono font-black text-[#b3261e] tracking-[0.2em]">01 · THE MARK</span>
          <h2 className="mt-1 mb-3 text-[22px] font-black leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            A thing is itself
          </h2>
          <div className="space-y-3 text-[16px] leading-relaxed text-[#1a1612]/90">
            <p><span className="font-black font-mono">x = x</span> is the law of identity: a thing is itself, and not another thing. It is the oldest rule in logic.</p>
            <p>Said plainly: nothing on this record is defined by how it compares with anything else.</p>
            <p>So the mark is not decoration. It is the design brief.</p>
          </div>
        </section>

        {/* ── 02 ── */}
        <section className="mb-12">
          <span className="text-[10px] font-mono font-black text-[#b3261e] tracking-[0.2em]">02 · WHY COMPARISON IS THE BUSINESS MODEL</span>
          <h2 className="mt-1 mb-3 text-[22px] font-black leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            To sell attention, you first have to rank it
          </h2>
          <div className="space-y-3 text-[16px] leading-relaxed text-[#1a1612]/90">
            <p>A platform that earns from attention needs a number to trade on. So a person becomes a position: likes, shares, dwell time, reach.</p>
            <p>The ranking is not a side effect. The ranking is the product, and being seen is the thing being sold.</p>
            <p>None of this is our idea. It is fifty years of published work, and we are not claiming a discovery. We built one thing that does not do it.</p>
          </div>
        </section>

        {/* ── 03 ── */}
        <section className="mb-12">
          <span className="text-[10px] font-mono font-black text-[#b3261e] tracking-[0.2em]">03 · WHAT WE REMOVED</span>
          <h2 className="mt-1 mb-4 text-[22px] font-black leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Not moderated away. Absent
          </h2>
          <ul className="space-y-2">
            {REMOVED.map((r) => (
              <li key={r} className="flex gap-3 text-[16px] leading-relaxed text-[#1a1612]/90">
                <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[#b3261e] flex-shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-relaxed text-[#1a1612]/90">
            That is a decision, not an oversight. There is no number to bid on and no position to buy.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#6b6258]">
            Check it rather than believe it: the code is public. If a ranking field is ever added, this page's own promise is broken, and you can see it for yourself.
          </p>
        </section>

        {/* ── 04 ── */}
        <section className="mb-12">
          <span className="text-[10px] font-mono font-black text-[#b3261e] tracking-[0.2em]">04 · WHAT WE KEPT</span>
          <div className="mt-3 space-y-5">
            {KEPT.map((k) => (
              <div key={k.h} className="border-l-2 border-[#1a1612]/20 pl-4">
                <h3 className="text-[17px] font-black leading-tight mb-1" style={{ fontFamily: 'var(--font-display)' }}>{k.h}</h3>
                <p className="text-[15px] leading-relaxed text-[#1a1612]/85">{k.b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 05 — the part a panel checks first ── */}
        <section className="mb-12 bg-[#efe7d6] border-l-4 border-[#b3261e] px-4 py-5">
          <span className="text-[10px] font-mono font-black text-[#b3261e] tracking-[0.2em]">05 · WHAT WE DO NOT CLAIM</span>
          <div className="mt-3 space-y-3 text-[16px] leading-relaxed text-[#1a1612]/90">
            <p>This is not peer-reviewed research. It is a public registry. Read the source on an entry before you cite it.</p>
            <p>We are not the opposite of the web, and we do not claim to be. We use servers, databases and AI screening like anyone else.</p>
            <p>The claim is narrower, and that is why it holds: extraction needs a metric and a market. We removed the metric, so there is nothing here to extract.</p>
          </div>
        </section>

        {/* ── 06 ── */}
        <section className="mb-12">
          <span className="text-[10px] font-mono font-black text-[#b3261e] tracking-[0.2em]">06 · WHAT WE ARE STANDING ON</span>
          <h2 className="mt-1 mb-4 text-[22px] font-black leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            The literature, not our instincts
          </h2>
          <div className="space-y-4">
            {ANCHORS.map((a) => (
              <div key={a.who}>
                <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#1a1612]">{a.who}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-[#1a1612]/80 italic">{a.what}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-[#1a1612]/85">
            The record itself continues Janine Selendy's Solutions Site, made with UNEP, UNDP and colleagues at Yale and Harvard. We claim no endorsement from any of them. We claim the standard.
          </p>
        </section>

        {/* ── THE LINE ── */}
        <section className="mb-12 text-center">
          <p className="text-[28px] leading-tight font-black text-[#1a1612]" style={{ fontFamily: 'var(--font-display)' }}>
            A registry, not a feed.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#1a1612]/80">
            We are not ranking you. We are recording you.
          </p>
          <p className="mt-4 text-[11px] font-mono uppercase tracking-[0.18em] text-[#6b6258]">
            x = x · nobody above anybody
          </p>
        </section>

        {/* ── TWO DOORS ── */}
        <div className="flex flex-col gap-3">
          <Link to="/ExtractionProofCovenant" className="flex items-center justify-between gap-3 px-4 py-4 bg-[#1a1612] text-[#efe7d6] active:bg-[#e2602a]">
            <span className="flex items-center gap-3">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span className="text-[11px] font-black font-mono uppercase tracking-widest">The covenant behind the mark</span>
            </span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>
          <Link to="/TogetherChangeClimate" className="flex items-center justify-between gap-3 px-4 py-4 border-2 border-[#1a1612] active:bg-[#1a1612] active:text-[#efe7d6]">
            <span className="flex items-center gap-3">
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="text-[11px] font-black font-mono uppercase tracking-widest">Back to the record</span>
            </span>
          </Link>
        </div>
      </div>

      {/* ── THE MARK, QUIET ── */}
      <div className="relative z-[2] pb-10 text-center">
        <span className="font-mono font-black tracking-[0.3em] text-[11px] text-[#1a1612]/20">x = x</span>
      </div>
    </div>
  );
}