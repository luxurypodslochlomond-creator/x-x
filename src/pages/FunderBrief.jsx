import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { COOLASFUCKWaves, COOLASFUCKGlobe, COOLASFUCKHeart, COOLASFUCKMusicNote } from '@/components/shared/COOLASFUCKIcon';

export default function FunderBrief() {
  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0514] via-[#1a0f2a] to-[#0a0514] text-white">

      {/* PRINT BUTTON - screen only */}
      <div className="no-print flex justify-end p-6 gap-3">
        <button
          onClick={handlePrint}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-black font-mono px-6 py-3 rounded-lg transition-all"
        >
          PRINT / SAVE PDF
        </button>
      </div>

      {/* THE ONE-PAGER */}
      <div ref={printRef} className="max-w-3xl mx-auto px-8 pb-20 print:px-12 print:pb-8 print:text-black">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between border-b-4 border-cyan-500 pb-8 mb-10"
        >
          <div className="flex items-center gap-4">
            <COOLASFUCKWaves size={56} animate={true} />
            <div>
              <h1 className="text-5xl font-black font-mono text-white leading-none">UF51</h1>
              <p className="text-cyan-400 font-mono text-sm tracking-widest">UNIVERSAL FREQUENCY 51</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-cyan-400 font-mono font-bold text-lg">uf51.love</p>
            <p className="text-gray-400 font-mono text-sm">family@uf51.love</p>
            <p className="text-gray-500 font-mono text-xs mt-1">Glasgow, Scotland</p>
          </div>
        </motion.div>

        {/* WHAT IT IS - zero bullshit */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-10">
          <h2 className="text-2xl font-black font-mono text-cyan-400 mb-4 tracking-wider">WHAT IT IS</h2>
          <p className="text-white text-lg leading-relaxed font-light">
            UF51 is a free, open-source platform that combines <strong className="text-white font-bold">healing frequencies</strong>, <strong className="text-white font-bold">ethical music streaming</strong>, and a <strong className="text-white font-bold">token economy</strong> that pays people — including children with no bank account — for cleaning their environment.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mt-3">
            No ads. No data harvesting. No paywalls. Works offline. Works on any phone. Built to function in low-connectivity regions like sub-Saharan Africa.
          </p>
        </motion.div>

        {/* THREE PILLARS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-3 gap-4 mb-10">

          <div className="border-2 border-cyan-500/60 bg-cyan-500/5 p-5 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <COOLASFUCKWaves size={28} animate={false} />
              <h3 className="text-cyan-400 font-black font-mono text-sm tracking-wider">HEAL</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Peer-reviewed healing frequencies (432Hz, 528Hz, 40Hz). Free forever. Used for pain relief, tinnitus, anxiety, sleep — no prescription, no cost.
            </p>
          </div>

          <div className="border-2 border-green-500/60 bg-green-500/5 p-5 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <COOLASFUCKGlobe size={28} animate={false} />
              <h3 className="text-green-400 font-black font-mono text-sm tracking-wider">CLEAN</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Children photograph litter. AI verifies it. They earn <strong className="text-white">$P51 tokens</strong> — spendable without a bank account. Real environmental action rewarded in real time.
            </p>
          </div>

          <div className="border-2 border-purple-500/60 bg-purple-500/5 p-5 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <COOLASFUCKMusicNote size={28} animate={false} />
              <h3 className="text-purple-400 font-black font-mono text-sm tracking-wider">MUSIC</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Lossless music streaming. 90% of every play goes directly to the artist. No middlemen. Independent musicians keep what they earn.
            </p>
          </div>

        </motion.div>

        {/* THE GAP WE FILL */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-10 border-l-4 border-pink-500 pl-6">
          <h2 className="text-xl font-black font-mono text-pink-400 mb-3 tracking-wider">THE PROBLEM WE SOLVE</h2>
          <ul className="text-gray-300 text-base space-y-2 leading-relaxed">
            <li>→ <strong className="text-white">1.4 billion people</strong> have no access to mental health support — frequencies require no professional, no prescription, no internet connection</li>
            <li>→ <strong className="text-white">Children in developing regions</strong> have no economic participation mechanism — $P51 changes that with a phone camera and GPS</li>
            <li>→ <strong className="text-white">Independent artists</strong> receive 12–15% of streaming revenue under current models — UF51 pays 90%</li>
            <li>→ <strong className="text-white">Environmental incentives</strong> for communities in poverty are largely absent — we make cleanup economically rewarding from day one</li>
          </ul>
        </motion.div>

        {/* LIVE NOW */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mb-10">
          <h2 className="text-xl font-black font-mono text-green-400 mb-4 tracking-wider">LIVE RIGHT NOW</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Frequency Chamber — 50+ healing protocols, free, no login',
              'AI51 — voice AI companion, works offline, zero data extraction',
              'Earth51 — AI litter verification, GPS-confirmed cleanups',
              'Radio51 — lossless music, 90% to artists',
              'CB51 — AI co-manager for independent bands and artists',
              'PetSounds51 — healing frequencies for animals',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">✓</span>
                <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* WHAT FUNDING DOES */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-10 bg-white/5 border border-white/20 rounded-lg p-6">
          <h2 className="text-xl font-black font-mono text-amber-400 mb-4 tracking-wider">WHAT FUNDING UNLOCKS</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-amber-400 font-bold font-mono text-sm mb-2">IMMEDIATE</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>→ $P51 → real cash conversion</li>
                <li>→ Offline mesh network (no internet required)</li>
                <li>→ Multi-language healing protocols</li>
                <li>→ SMS-based participation (feature phones)</li>
              </ul>
            </div>
            <div>
              <p className="text-amber-400 font-bold font-mono text-sm mb-2">6–12 MONTHS</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>→ Congo / DRC pilot programme</li>
                <li>→ Community health worker integration</li>
                <li>→ UN SDG reporting dashboard</li>
                <li>→ CIC registered (underway)</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* THE HONEST BIT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mb-10 border-2 border-red-500/40 bg-red-500/5 rounded-lg p-6">
          <h2 className="text-xl font-black font-mono text-red-400 mb-3 tracking-wider">ZERO BULLSHIT SECTION</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            We are an early-stage platform built by one founder with an AI development partner. The technology works. The healing protocols are real and in use. The music platform is live. The cleanup economy is live.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            We have not yet converted $P51 to fiat currency — that requires funding and a financial partner. We are not overstating what we have. We are showing exactly what exists and what it becomes with support.
          </p>
        </motion.div>

        {/* FOOTER / CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="border-t-2 border-cyan-500/40 pt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <COOLASFUCKHeart size={36} animate={true} />
            <div>
              <p className="text-white font-black font-mono text-lg">Heal the planet. Pay the people.</p>
              <p className="text-gray-400 font-mono text-xs">Open source. Free forever. Built with love.</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-cyan-400 font-mono font-bold text-xl">uf51.love</p>
            <p className="text-gray-400 font-mono text-sm">family@uf51.love</p>
          </div>
        </motion.div>

      </div>

      {/* PRINT STYLES */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .min-h-screen { background: white !important; }
          h1, h2, h3 { color: black !important; }
          p, li { color: #333 !important; }
          .text-cyan-400, .text-green-400, .text-purple-400, .text-pink-400, .text-amber-400, .text-red-400 { color: #000 !important; font-weight: bold; }
          .text-gray-300, .text-gray-400, .text-gray-500 { color: #444 !important; }
          .border-cyan-500, .border-green-500, .border-purple-500 { border-color: #999 !important; }
          .bg-cyan-500\\/5, .bg-green-500\\/5, .bg-purple-500\\/5, .bg-white\\/5, .bg-red-500\\/5 { background: #f9f9f9 !important; }
          @page { margin: 1.5cm; size: A4; }
        }
      `}</style>
    </div>
  );
}