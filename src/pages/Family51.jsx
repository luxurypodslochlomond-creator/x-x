import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Family51LetterDecoder from '@/components/family51/Family51LetterDecoder';
import Family51ReplyWriter from '@/components/family51/Family51ReplyWriter';
import Family51ConflictHelper from '@/components/family51/Family51ConflictHelper';
import Family51Icon from '@/components/family51/Family51Icon';

const TOOLS = [
  {
    id: 'letter',
    name: 'DECODE A LETTER',
    tagline: 'Scary letter? Paste it. Understand it in seconds.',
    detail: 'Council tax. Energy bills. NHS letters. Landlord notices. Parking fines. School exclusions. We translate bureaucratic fear into plain English — and tell you exactly what to do next.',
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.4)',
    border: 'border-orange-500',
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    free: true,
    freeLabel: 'ALWAYS FREE',
  },
  {
    id: 'reply',
    name: 'WRITE MY REPLY',
    tagline: 'Don\'t know what to say? We write it for you.',
    detail: 'You tell us the situation. We write a clear, firm, legally-aware response ready to copy and send. Debt collectors. Landlords. Employers. Councils. No more staring at a blank page.',
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.4)',
    border: 'border-cyan-500',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    free: true,
    freeLabel: 'ALWAYS FREE',
  },
  {
    id: 'conflict',
    name: 'CONFLICT HELPER',
    tagline: 'Neighbour dispute? Workplace issue? We help you respond calmly.',
    detail: 'When emotions are high, words go wrong. Tell us what happened — we help you respond in a way that protects you legally, de-escalates the situation, and keeps your dignity intact.',
    color: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.4)',
    border: 'border-purple-500',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    free: true,
    freeLabel: 'ALWAYS FREE',
  },
];

export default function Family51Page() {
  const [activeTool, setActiveTool] = useState(null);

  const tool = TOOLS.find(t => t.id === activeTool);

  return (
    <div className="min-h-screen bg-[#06080f] text-white">

      {/* HEADER */}
      <div className="border-b border-white/10 px-6 py-5 flex items-center gap-4">
        <Link to={createPageUrl('Welcome')} className="text-gray-500 hover:text-white font-mono text-xs tracking-widest transition-colors">← UF51</Link>
        <div className="flex items-center gap-3 flex-1 justify-center">
          <Family51Icon size={36} />
          <span className="text-2xl font-black font-mono text-white tracking-tight">FAMILY51</span>
        </div>
        <div className="w-16" />
      </div>

      <AnimatePresence mode="wait">
        {!activeTool ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-3xl mx-auto px-6 py-16 space-y-16"
          >
            {/* HERO */}
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <Family51Icon size={80} animate />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-black font-mono leading-none"
              >
                <span className="text-white">YOUR FAMILY.</span><br />
                <span className="text-orange-400">ON YOUR SIDE.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed"
              >
                Scary letter at midnight? Neighbour from hell? 
                Bill you can't understand? <span className="text-white font-bold">We decode it, explain it, and help you respond.</span>
              </motion.p>

              {/* DATA PROMISE */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-3 bg-black border border-green-500/40 px-5 py-3"
              >
                <PrivacyShieldIcon />
                <div className="text-left">
                  <p className="text-green-400 font-black font-mono text-xs tracking-widest">YOUR DATA. YOUR DEVICE. FULL STOP.</p>
                  <p className="text-gray-500 text-xs font-mono">Nothing stored. Nothing sold. Nothing shared. Ever.</p>
                </div>
              </motion.div>
            </div>

            {/* TOOLS */}
            <div className="space-y-4">
              <p className="text-gray-600 font-mono text-xs tracking-widest text-center">CHOOSE YOUR TOOL — ALL FREE</p>
              {TOOLS.map((t, i) => (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTool(t.id)}
                  className={`w-full text-left bg-black border-2 ${t.border} p-6 transition-all group`}
                  style={{ boxShadow: `0 0 30px ${t.glow}` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`font-black font-mono text-lg ${t.text}`}>{t.name}</span>
                        <span className={`text-[9px] font-mono border px-2 py-0.5 ${t.border} ${t.text}`}>{t.freeLabel}</span>
                      </div>
                      <p className="text-white font-bold text-sm">{t.tagline}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{t.detail}</p>
                    </div>
                    <motion.div
                      className={`${t.text} font-mono text-xl font-black mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity`}
                    >→</motion.div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* WHO THIS IS FOR */}
            <div className="border border-white/10 p-6 space-y-4">
              <p className="text-gray-500 font-mono text-xs tracking-widest">WHO THIS IS FOR</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Single mum with a council eviction notice at midnight',
                  'Elderly person scared by a pension letter',
                  'Family with a nightmare neighbour and no money for a solicitor',
                  'Teenager with a college disciplinary letter',
                  'Anyone with a debt collector threatening action',
                  'Anyone too anxious to write that important email',
                ].map((who, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-orange-400 font-mono text-xs mt-0.5">→</span>
                    <p className="text-gray-300 text-sm">{who}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CITIZENS ADVICE COMPARISON */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-red-500/30 p-5 space-y-3">
                <p className="text-red-400 font-mono text-xs font-bold tracking-widest">OLD WAY</p>
                {['Wait weeks for Citizens Advice', 'Find a solicitor you can\'t afford', 'Google for hours, get more confused', 'Ask a friend who doesn\'t know either', 'Just ignore it and hope it goes away'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-red-500 text-xs mt-0.5">✕</span>
                    <p className="text-gray-500 text-xs">{item}</p>
                  </div>
                ))}
              </div>
              <div className="border border-green-500/30 p-5 space-y-3">
                <p className="text-green-400 font-mono text-xs font-bold tracking-widest">FAMILY51</p>
                {['Instant — works at 3am', 'Free — always', 'Plain English — no jargon', 'Response written for you', 'Data never leaves your device'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-green-400 text-xs mt-0.5">✓</span>
                    <p className="text-gray-300 text-xs">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <div className="text-center space-y-2 pt-4 border-t border-white/5">
              <p className="text-gray-600 font-mono text-xs">Part of the UniversalFamily51 ecosystem</p>
              <p className="text-gray-700 font-mono text-xs">No accounts. No tracking. No bullshit. ♾️❤️</p>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="max-w-3xl mx-auto px-6 py-8"
          >
            {/* BACK */}
            <button
              onClick={() => setActiveTool(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-white font-mono text-xs tracking-widest transition-colors mb-8"
            >
              ← BACK TO FAMILY51
            </button>

            {/* TOOL HEADER */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className={`font-black font-mono text-2xl ${tool.text}`}>{tool.name}</span>
                <span className={`text-[9px] font-mono border px-2 py-0.5 ${tool.border} ${tool.text}`}>{tool.freeLabel}</span>
              </div>
              <p className="text-gray-400 text-sm">{tool.tagline}</p>
            </div>

            {/* TOOL CONTENT */}
            {activeTool === 'letter' && <Family51LetterDecoder />}
            {activeTool === 'reply' && <Family51ReplyWriter />}
            {activeTool === 'conflict' && <Family51ConflictHelper />}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Custom privacy shield icon
function PrivacyShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z"
        stroke="#22c55e"
        strokeWidth="1.5"
        fill="none"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <path d="M9 12L11 14L15 10" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}