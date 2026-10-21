import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Shield, ChevronDown } from 'lucide-react';

// ── x = x ──
// The mark on the record, and why we say it.
// House rules: paper, ink, signal red. Mono labels. Zero rounded corners.
// Plain sentences. No theatre, no hedging, every claim checkable.

const STEPS = [
  {
    n: '01',
    h: 'Attention is the scarce thing',
    b: 'Big platforms earn from attention. When something is scarce, it gets sold. Herbert Simon said it in 1971: a wealth of information creates a poverty of attention.',
  },
  {
    n: '02',
    h: 'To sell attention you must rank it',
    b: 'Ranking needs a number: likes, reach, dwell time, followers. The number becomes the market, and whoever owns the scale owns the value. Espeland and Stevens named the move in 1998: commensuration — putting unlike things on one scale.',
  },
  {
    n: '03',
    h: 'We removed the scale',
    b: 'Not moderated away. Absent. There is no number on this record that could be ranked, sold, or bid on — so nothing here can be traded against anyone else.',
  },
];

const REMOVED = [
  'No score field. No weight field.',
  'No popularity sort. No trending. No "most read".',
  'No follower counts. No karma. No badges.',
  'No advertising. Ever.',
  'No account needed to read any of it.',
];

const HONEST = [
  'We earn from tools people choose to buy. We do not earn from attention, and no ad has ever run on this record.',
  'AI screens submissions for spam as they arrive. Anything unclear waits for a human. The AI does not judge the science and does not publish on its own.',
  'Rough places only: country and region. No coordinates, no IP addresses stored, no login needed to read.',
  'This is a registry, not a journal. Read the source on an entry before you cite it.',
  'None of the critique is ours. We are standing on published work, and we are happy to be held to it.',
];

const STANDING_ON = [
  'Herbert A. Simon, 1971 — the scarcity of attention',
  'Espeland & Stevens, Annual Review of Sociology, 1998 — commensuration',
  'Shoshana Zuboff, The Age of Surveillance Capitalism, 2019 — behaviour as the commodity',
  'Michael Sandel, What Money Can\'t Buy, 2012 — goods corrupted, not just priced',
];

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-4">
    <div className="h-px bg-[#1a1612]/20 flex-1" />
    <p className="text-[11px] font-mono text-[#6b6258] tracking-widest text-center">{children}</p>
    <div className="h-px bg-[#1a1612]/20 flex-1" />
  </div>
);

export default function XEqualsX() {
  const [honestOpen, setHonestOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative">
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-14 relative z-10">

        {/* ── HERO ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-5">
          <div className="bg-[#1a1612] py-3 px-4 -mx-6">
            <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#efe7d6] opacity-80 leading-relaxed">
              "EVERY SINGLE DAY, WE HOLD THE POWER TO SHAPE THE WORLD AROUND US."
            </p>
            <p className="font-mono text-[9px] font-black tracking-[0.25em] text-[#efe7d6] opacity-50 mt-1">
              DR. JANE GOODALL · ON THE RECORD
            </p>
          </div>

          <div className="pt-2 font-mono font-black tracking-[0.3em] text-[13px] text-[#b3261e]">x = x</div>

          <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tight">
            Nobody above<br />anybody.
          </h1>

          <p className="text-[#6b6258] text-base leading-relaxed max-w-xl mx-auto">
            Every platform you use is built to rank you — your posts, your reach, your worth, in a number. This record is built not to. That is the whole idea, and it is why the mark sits under her words.
          </p>

          <p className="text-lg md:text-xl font-bold text-[#b3261e] leading-snug">
            No ranking. No advertising.<br />Nothing for sale.
          </p>
        </motion.div>

        {/* ── WHY WE SAY IT ── */}
        <div className="space-y-6">
          <SectionLabel>WHY WE SAY IT</SectionLabel>
          <div className="space-y-3 text-base leading-relaxed text-[#1a1612]/85">
            <p>The record holds two things: solutions worth copying, and crises worth shouting about. Here they are the same size. A crisis in a village of two hundred sits exactly as large as a crisis in a capital of twenty million.</p>
            <p>That is not moderation. It is absence. There is no field in this database that could rank an entry, because we never made one.</p>
            <p className="text-[#6b6258]">The mark is the oldest rule in logic — a thing is itself, and not another thing. On this platform it means something warmer: nobody above anybody.</p>
          </div>
        </div>

        {/* ── WHY OURS IS THE OPPOSITE ── */}
        <div className="space-y-6">
          <SectionLabel>WHY OURS IS THE OPPOSITE</SectionLabel>
          <div className="space-y-3">
            {STEPS.map((s) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#efe7d6] border border-[#1a1612]/15 p-5 rounded-none"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono font-black text-[11px] text-[#b3261e] tracking-widest">{s.n}</span>
                  <h3 className="font-black text-lg leading-tight">{s.h}</h3>
                </div>
                <p className="text-[#6b6258] text-sm leading-relaxed">{s.b}</p>
              </motion.div>
            ))}
          </div>
          <div className="space-y-3 text-base leading-relaxed text-[#1a1612]/85">
            <p>We are not claiming to be the opposite of the internet. We are the opposite of that model: attention turned into a score, and the score sold.</p>
            <p>A platform that ranks you and a record that refuses to are opposite objects — and the refusal is checkable. There is no number here to buy.</p>
          </div>
        </div>

        {/* ── WHAT WE REMOVED ── */}
        <div className="space-y-6">
          <SectionLabel>WHAT WE REMOVED</SectionLabel>
          <div className="grid grid-cols-1 gap-2">
            {REMOVED.map((r) => (
              <div key={r} className="bg-[#efe7d6] border border-[#1a1612]/15 px-4 py-3 flex items-center gap-3 rounded-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b3261e] flex-shrink-0" />
                <span className="font-mono text-[13px] text-[#1a1612]">{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── THE HONEST BIT ── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="bg-[#efe7d6] border border-[#1a1612]/15 p-6 rounded-none">
          <button onClick={() => setHonestOpen(!honestOpen)} className="w-full flex items-center justify-between text-left gap-4">
            <h2 className="text-sm font-black font-mono text-[#1a1612] tracking-wide">THE HONEST BIT</h2>
            <motion.div animate={{ rotate: honestOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <ChevronDown className="w-5 h-5 text-[#6b6258]" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{ height: honestOpen ? 'auto' : 0, opacity: honestOpen ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-5 space-y-4 text-sm text-[#6b6258] leading-relaxed">
              {HONEST.map((h) => (
                <p key={h}>{h}</p>
              ))}
              <div className="pt-2 border-t border-[#1a1612]/15">
                <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#1a1612] mb-2">STANDING ON</p>
                <ul className="space-y-1.5">
                  {STANDING_ON.map((s) => (
                    <li key={s} className="font-mono text-[11px] text-[#1a1612]/70">{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── THE LINE ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center space-y-4 pt-4">
          <h2 className="text-3xl md:text-5xl font-black leading-none tracking-tight">
            A registry,<br />not a feed.
          </h2>
          <p className="text-base text-[#1a1612]/80 max-w-lg mx-auto">
            Nothing here is for sale, so there is nothing here to extract. That is not a promise we police — it is a thing we never built.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
            <Link to="/ExtractionProofCovenant">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#b3261e] hover:bg-[#1a1612] text-[#f4efe4] font-bold px-6 py-3 text-sm transition-all">
                <Shield className="w-4 h-4" />
                The covenant behind the mark
              </motion.button>
            </Link>
            <Link to="/TogetherChangeClimate">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-[#1a1612] hover:bg-[#1a1612] hover:text-[#f4efe4] font-bold px-6 py-3 text-sm transition-all">
                <ArrowLeft className="w-4 h-4" />
                Back to the record
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* ── THE MARK, QUIET ── */}
        <div className="text-center pt-2">
          <p className="font-mono font-black tracking-[0.3em] text-[12px] text-[#b3261e]">x = x</p>
        </div>

      </div>
    </div>
  );
}