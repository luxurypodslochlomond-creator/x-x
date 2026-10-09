import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import TransmissionVisualizer from './TransmissionVisualizer';

// ── THE TRANSMISSION ──
// Drop the artist's delivered track URL here when ready.
// Until then, the visualizer runs in generative deep house mode.
const TRANSMISSION_URL = ''; // ← swap with ASLOVE's delivered audio URL
const ARTIST_NAME = 'ASLOVE';
const TRACK_TITLE = 'Transmission';
const DEDICATION = 'For Janine · for the planet · for all of us';

export default function Transmission() {
  const [visualizerOpen, setVisualizerOpen] = useState(false);
  const awaiting = !TRANSMISSION_URL;

  return (
    <>
      <section className="relative bg-[#141210] text-[#efe7d6] overflow-hidden border-b-2 border-[#141210]">
        <style>{`
          @keyframes tx-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(226,96,42,0.5); } 50% { box-shadow: 0 0 0 14px rgba(226,96,42,0); } }
          @keyframes tx-flicker { 0%, 92%, 96%, 100% { opacity: 1; } 93%, 95% { opacity: .72; } }
          @keyframes tx-scan { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        `}</style>

        {/* Scanline sweep — raw signal feel */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #efe7d6 2px, #efe7d6 3px)' }} />

        <div className="relative px-5 py-8">
          {/* Label */}
          <div className="flex items-center gap-2 mb-5" style={{ animation: 'tx-flicker 7s linear infinite' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2602a] animate-pulse" />
            <span className="text-[10px] font-black font-mono uppercase tracking-[0.25em] text-[#e2602a]">Transmission</span>
            <div className="flex-1 h-px bg-[#efe7d6]/15" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#efe7d6]/40">{awaiting ? 'standby' : 'live'}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Play button — opens the quantum equaliser */}
            <motion.button
              onClick={() => setVisualizerOpen(true)}
              whileTap={{ scale: 0.94 }}
              aria-label="Open transmission visualizer"
              className="relative flex-shrink-0 w-16 h-16 rounded-full border-2 border-[#e2602a] flex items-center justify-center bg-[#141210]"
              style={{ animation: 'tx-pulse 2s ease-in-out infinite' }}
            >
              <Play className="w-6 h-6 text-[#e2602a] ml-1" fill="currentColor" />
            </motion.button>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-black font-mono uppercase leading-none text-[#efe7d6] truncate" style={{ letterSpacing: '-0.01em' }}>
                {TRACK_TITLE}
              </h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#efe7d6]/50 mt-1 truncate">
                {awaiting ? 'Tap to enter · quantum visualizer' : ARTIST_NAME}
              </p>

              {/* Signal bar */}
              <div className="mt-3 relative h-1 bg-[#efe7d6]/10 overflow-hidden">
                <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-[#efe7d6]/30 to-transparent" style={{ animation: 'tx-scan 2.4s linear infinite' }} />
              </div>

              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[9px] font-mono text-[#efe7d6]/40">{awaiting ? 'quantum' : 'live'}</span>
                <span className="text-[9px] font-mono text-[#efe7d6]/40">{awaiting ? 'equaliser' : 'transmission'}</span>
              </div>
            </div>

            {/* Visualizer hint */}
            <div className="flex-shrink-0 flex flex-col items-center gap-0.5">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ opacity: 0.5 }}>
                <rect x="2" y="10" width="3" height="8" fill="#e2602a" rx="0.5" />
                <rect x="7" y="6" width="3" height="16" fill="#e2602a" rx="0.5" />
                <rect x="12" y="2" width="3" height="24" fill="#efe7d6" rx="0.5" />
                <rect x="17" y="8" width="3" height="12" fill="#e2602a" rx="0.5" />
                <rect x="22" y="12" width="3" height="4" fill="#1e3a2b" rx="0.5" />
              </svg>
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#efe7d6]/30">EQ</span>
            </div>
          </div>

          {/* Dedication */}
          <p className="mt-5 text-[10px] font-mono text-[#efe7d6]/40 leading-relaxed italic">{DEDICATION}</p>
        </div>
      </section>

      <AnimatePresence>
        {visualizerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100]"
          >
            <TransmissionVisualizer
              audioUrl={TRANSMISSION_URL}
              artistName={ARTIST_NAME}
              trackTitle={TRACK_TITLE}
              dedication={DEDICATION}
              onClose={() => setVisualizerOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}