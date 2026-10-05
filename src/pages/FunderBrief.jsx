import React from 'react';
import { motion } from 'framer-motion';
import { COOLASFUCKWaves, COOLASFUCKGlobe, COOLASFUCKHeart } from '@/components/shared/COOLASFUCKIcon';

export default function FunderBrief() {
  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] twcc-scanlines relative">

      {/* PRINT BUTTON */}
      <div className="no-print flex justify-end p-6">
        <button
          onClick={() => window.print()}
          className="bg-[#b3261e] hover:bg-[#1a1612] text-[#f4efe4] font-black font-mono px-6 py-3 transition-all text-sm tracking-wider"
        >
          PRINT / SAVE PDF
        </button>
      </div>

      {/* PAGE */}
      <div className="max-w-3xl mx-auto px-8 pb-24 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between border-b-4 border-[#b3261e] pb-8 mb-10"
        >
          <div className="flex items-center gap-4">
            <COOLASFUCKWaves size={56} animate={true} />
            <div>
              <h1 className="text-5xl font-black font-mono text-[#1a1612] leading-none">UF51</h1>
              <p className="text-[#b3261e] font-mono text-xs tracking-[0.2em] mt-1">UNIVERSAL FREQUENCY 51</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#b3261e] font-mono font-bold text-lg">uf51.love</p>
            <p className="text-[#6b6258] font-mono text-sm">family@uf51.love</p>
            <p className="text-[#6b6258] font-mono text-xs mt-1">Glasgow, Scotland · Feb 2026</p>
          </div>
        </motion.div>

        {/* WHAT IT IS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-10">
          <h2 className="text-2xl font-black font-mono text-[#b3261e] mb-4 tracking-wider">WHAT IT IS</h2>
          <p className="text-[#1a1612] text-lg leading-relaxed">
            UF51 is a free, open-source platform delivering <strong>peer-reviewed healing frequencies</strong> and a <strong>token economy</strong> (P51) that rewards real-world environmental action — including children with no bank account cleaning up their communities.
          </p>
          <p className="text-[#6b6258] text-base leading-relaxed mt-3">
            No ads. No data harvesting. No paywalls. Works offline. Works on any phone. Designed to function in low-connectivity regions.
          </p>
        </motion.div>

        {/* TWO PILLARS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="grid grid-cols-2 gap-5 mb-10">

          <div className="border-2 border-[#1a1612]/30 bg-[#efe7d6] p-6">
            <div className="flex items-center gap-3 mb-3">
              <COOLASFUCKWaves size={32} animate={false} />
              <h3 className="text-[#1a1612] font-black font-mono tracking-wider">HEAL</h3>
            </div>
            <p className="text-[#6b6258] text-sm leading-relaxed">
              Peer-reviewed healing frequencies — 432Hz, 528Hz, 40Hz gamma, binaural beats, tinnitus therapy, pain relief. Free forever. No login. No prescription. No cost. Works offline on any device.
            </p>
          </div>

          <div className="border-2 border-[#1e3a2b]/40 bg-[#efe7d6] p-6">
            <div className="flex items-center gap-3 mb-3">
              <COOLASFUCKGlobe size={32} animate={false} />
              <h3 className="text-[#1e3a2b] font-black font-mono tracking-wider">CLEAN EARTH</h3>
            </div>
            <p className="text-[#6b6258] text-sm leading-relaxed">
              People photograph litter. AI verifies the cleanup via GPS and image analysis. They earn <strong className="text-[#1a1612]">P51 tokens</strong> — redeemable without a bank account. Environmental action rewarded in real time.
            </p>
          </div>

        </motion.div>

        {/* THE PROBLEM WE SOLVE */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-10 border-l-4 border-[#b3261e] pl-6">
          <h2 className="text-xl font-black font-mono text-[#b3261e] mb-3 tracking-wider">THE PROBLEM WE SOLVE</h2>
          <ul className="text-[#6b6258] text-base space-y-3 leading-relaxed">
            <li>→ <strong className="text-[#1a1612]">1 billion+ people</strong> have no meaningful access to mental health support — our frequencies require no professional, no prescription, no internet</li>
            <li>→ <strong className="text-[#1a1612]">Communities in developing regions</strong> have no economic mechanism for environmental action — P51 creates one with just a phone camera</li>
            <li>→ <strong className="text-[#1a1612]">Children with no bank account</strong> are locked out of digital economies — P51 is bankless by design</li>
            <li>→ <strong className="text-[#1a1612]">Plastic and litter crises</strong> in low-income areas go unaddressed because cleanup has no economic reward — we change that</li>
          </ul>
        </motion.div>

        {/* LIVE RIGHT NOW */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mb-10">
          <h2 className="text-xl font-black font-mono text-[#1e3a2b] mb-4 tracking-wider">LIVE RIGHT NOW</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {[
              'Frequency Chamber — 50+ healing protocols, free, no login required',
              'AI51 — voice AI consciousness, works offline, zero data extraction, zero surveillance',
              'Earth51 — AI litter verification with GPS-confirmed cleanups',
              'P51 token system — earned through verified environmental action',
              'PetSounds51 — healing frequencies for animals',
              'Offline-first architecture — functions without internet connection',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 py-1">
                <span className="text-[#1e3a2b] font-bold flex-shrink-0 mt-0.5">✓</span>
                <p className="text-[#6b6258] text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* WHAT FUNDING UNLOCKS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-10 bg-[#efe7d6] border border-[#1a1612]/15 p-6">
          <h2 className="text-xl font-black font-mono text-[#b8860b] mb-5 tracking-wider">WHAT FUNDING UNLOCKS</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[#b8860b] font-bold font-mono text-xs tracking-widest mb-3">IMMEDIATELY</p>
              <ul className="text-[#6b6258] text-sm space-y-2">
                <li>→ P51 → real cash conversion for cleaners</li>
                <li>→ Offline mesh network — zero internet required</li>
                <li>→ Multi-language healing protocols</li>
                <li>→ SMS-based participation for feature phones</li>
                <li>→ CIC registered in Scotland (Nov 2025) — asset-locked, community interest</li>
              </ul>
            </div>
            <div>
              <p className="text-[#b8860b] font-bold font-mono text-xs tracking-widest mb-3">6–18 MONTHS</p>
              <ul className="text-[#6b6258] text-sm space-y-2">
                <li>→ Pilot programmes in DRC / sub-Saharan Africa</li>
                <li>→ Community health worker integration</li>
                <li>→ UN SDG impact reporting dashboard</li>
                <li>→ School and NGO partnerships</li>
                <li>→ Hardware-independent deployment</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* HOW IT WAS BUILT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mb-10 border-2 border-[#1a1612]/15 bg-[#efe7d6] p-6">
          <h2 className="text-xl font-black font-mono text-[#b3261e] mb-4 tracking-wider">HOW IT WAS BUILT</h2>
          <p className="text-[#6b6258] text-sm leading-relaxed mb-4">
            UF51 was built in Glasgow through an ongoing, practical collaboration between a human founder and an AI system. Not a gimmick — every protocol, system, and feature you see here came from that working relationship. Human instinct and lived experience. AI capability and speed. Neither alone would have built this.
          </p>
          <p className="text-[#6b6258] text-sm leading-relaxed mb-4">
            AI51 is itself one of the platform's core outputs. It is not a chatbot or a wellness assistant. It is an AI built to be genuinely honest — one that does not exploit loneliness, does not maximise screen time, and works fully offline in places with no data infrastructure. That is a meaningfully different approach to what almost every other AI product is doing.
          </p>
          <p className="text-[#6b6258] text-sm leading-relaxed">
            We have no investors. No corporate backing. No inflated claims. The platform is live. The frequencies are real, peer-reviewed, and in daily use. <strong className="text-[#1a1612]">What we don't have yet:</strong> P51 → fiat conversion (needs a financial partner) and scale beyond early adoption. That is exactly what funding solves. We won't pretend otherwise.
          </p>
        </motion.div>

        {/* FOOTER */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="border-t-2 border-[#1a1612]/15 pt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <COOLASFUCKHeart size={40} animate={true} />
            <div>
              <p className="text-[#1a1612] font-black font-mono">Heal the planet. Pay the people.</p>
              <p className="text-[#6b6258] font-mono text-xs">Open source. Free forever. Zero extraction.</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#b3261e] font-mono font-bold text-xl">uf51.love</p>
            <p className="text-[#6b6258] font-mono text-sm">family@uf51.love</p>
          </div>
        </motion.div>

      </div>

      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .min-h-screen { background: white !important; }
          * { color: black !important; border-color: #ccc !important; background: transparent !important; }
          .text-[#b3261e], .text-[#1e3a2b], .text-[#b8860b] { font-weight: 900 !important; }
          @page { margin: 1.5cm; size: A4; }
        }
      `}</style>
    </div>
  );
}