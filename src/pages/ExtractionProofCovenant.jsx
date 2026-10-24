import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Scale, Users, Globe, Heart, FileText, Check } from 'lucide-react';

const PILLARS = [
  {
    icon: Lock,
    title: 'Minimum Data, Maximum Review',
    status: 'BUILT & LIVE',
    body: "We hold the smallest set of data a public record needs: your submission, a contact email so we can reach you, and the country a reader reads from. No IP addresses. No tracking cookies. No ad profiles. No accounts. An extractor who copies this code inherits a reviewed, minimal database, not a surveillance engine. There is nothing here worth harvesting.",
  },
  {
    icon: Scale,
    title: 'AGPL-3.0 Licensing',
    status: 'COMMITTED',
    body: 'When our code is published, it ships under the GNU AGPL-3.0 — fully open source, with one condition: anyone who runs a modified version as a service must publish their changes too. Good actors are unaffected. The classic extraction play — take free code, close it, add tracking, sell it — becomes legally impossible.',
  },
  {
    icon: FileText,
    title: 'Protected Names',
    status: 'PLANNED',
    body: "SORTED, UF51, PetSounds51, CB51 — the code can be forked, but the names and the trust they carry cannot. Trademark protection means a copycat can't inherit our reputation, our track record, or the confidence of the people we serve. They start from zero, in the open, under their own name.",
  },
  {
    icon: Users,
    title: 'The Part Nobody Can Copy: Evidence',
    status: 'GROWING DAILY',
    body: 'Our live counters of people helped, our organisational partnerships, our anonymised outcome data — that history exists only here. A fork starts with zero trust and zero track record. In tools built for people in crisis, trust is the product. It cannot be copied, only earned.',
  },
];

const PRINCIPLES = [
  'The good use is the default path — extraction is not in the codebase to exploit.',
  'AI does the understanding; the human always keeps the deciding.',
  'Free for individuals, funded by organisations whose interests align with users.',
  'Every privacy claim is verifiable in the architecture, not just the marketing.',
  'Anyone may copy this to help people. No one may quietly close it to harvest them.',
];

const headStyle = { fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' };

export default function ExtractionProofCovenant() {
  return (
    <div className="min-h-screen bg-[#efe7d6] text-[#141210]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
      <style>{`
        @keyframes epc-enter { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes epc-stamp { from { opacity: 0; transform: rotate(-15deg) scale(1.03); } to { opacity: .9; transform: rotate(-15deg) scale(1); } }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
      `}</style>

      {/* ── HERO — three-band signal stack: bone / ink / signal ── */}
      <div className="relative bg-[#141210] overflow-hidden">
        {/* Bone band */}
        <div className="relative z-10 bg-[#efe7d6] px-5 py-4 flex items-center gap-2" style={{ animation: 'epc-enter .25s ease-out both' }}>
          <Globe className="w-3.5 h-3.5 text-[#141210]" />
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#141210]">Public Covenant</span>
        </div>

        {/* Ink band */}
        <div className="relative z-10 px-5 pt-10 pb-9" style={{ animation: 'epc-enter .25s ease-out .04s both' }}>
          {/* Same construction the record's own name now uses, so this page opens with
              the record instead of shouting over it. It was the last page still built
              the old way: 11vw gave 43px on a 393px phone — larger than the record's
              own name. Opens at 36px on a phone; desktop unchanged at 60px. */}
          <h1 className="font-black uppercase leading-[0.94] max-w-[300px] relative z-10 text-[#efe7d6]" style={{ ...headStyle, fontSize: 'clamp(32px, 9.2vw, 60px)' }}>
            Open<br />Source.<br />
            <span className="text-[#e2602a]">Extraction-<br />Proof.</span>
          </h1>
          {/* Freedom stamp — unlabelled */}
          <div className="absolute right-5 top-10 w-[92px] h-[92px] rounded-full border-8 border-[#e2602a] pointer-events-none"
            style={{ transform: 'rotate(-15deg)', opacity: 0.9, boxShadow: 'inset 0 0 0 3px #141210, 0 0 0 2px #efe7d6', animation: 'epc-stamp .25s ease-out .1s both' }} />
        </div>

        {/* Signal band */}
        <div className="relative z-10 bg-[#e2602a] px-5 py-5" style={{ animation: 'epc-enter .25s ease-out .08s both' }}>
          <p className="text-[11px] font-bold uppercase leading-relaxed max-w-[330px] text-[#141210] tracking-wide">
            Anyone can copy our code — we invite it. What no one can copy is a reason to betray the people using it. Helping is the easy path; extraction is the pointless one.
          </p>
        </div>
      </div>

      {/* ── PILLARS ── */}
      <div className="px-4 py-6 space-y-3">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.05 }}
              className="bg-[#f7f1e5] border border-[#141210] border-t-4 border-t-[#1e3a2b] p-4"
            >
              <div className="flex items-start gap-3 mb-2.5">
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 bg-[#1e3a2b] border border-[#141210]">
                  <Icon className="w-[18px] h-[18px] text-[#efe7d6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-[14px] font-black font-mono uppercase leading-tight text-[#141210]">{p.title}</h2>
                  <span className="inline-block mt-1 text-[9px] font-black font-mono uppercase tracking-widest px-2 py-0.5 border border-[#141210] bg-[#e2602a] text-[#141210]">{p.status}</span>
                </div>
              </div>
              <p className="text-[12px] font-mono text-[#141210] leading-relaxed">{p.body}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ── PRINCIPLES ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-4 mb-6 bg-[#f7f1e5] border-2 border-[#141210] p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-[#1e3a2b]" />
          <h2 className="font-black uppercase text-[#141210]" style={{ ...headStyle, fontSize: 'clamp(25px, 2.2vw, 32px)' }}>The Five Commitments</h2>
        </div>
        <ul className="space-y-3">
          {PRINCIPLES.map((principle, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#1e3a2b] border border-[#141210]">
                <Check className="w-3 h-3 text-[#efe7d6]" strokeWidth={3.5} />
              </div>
              <span className="text-[12px] font-mono text-[#141210] leading-relaxed">{principle}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* ── CLOSING ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="px-5 py-8 bg-[#1e3a2b] text-[#efe7d6] border-t-4 border-[#e2602a]"
      >
        <Heart className="w-5 h-5 text-[#e2602a] mb-3" />
        <p className="text-[12px] font-mono leading-relaxed mb-3">
          You cannot stop bad actors from using AI. You can make good AI win on merit — by building tools where the honest version is the easiest one to build, use, and fund.
        </p>
        <p className="text-[10px] font-mono font-black uppercase tracking-widest text-[#efe7d6]/70">UF51 · Built for humans, not harvests</p>
      </motion.div>
    </div>
  );
}