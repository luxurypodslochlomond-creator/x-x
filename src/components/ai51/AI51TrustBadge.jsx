import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff, X, Heart, Zap } from 'lucide-react';

export default function AI51TrustBadge() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TRUST BADGE — subtle, always visible */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all hover:opacity-80"
        style={{
          background: 'rgba(34,211,238,0.06)',
          border: '1px solid rgba(34,211,238,0.2)',
        }}
        title="How AI51 protects you"
      >
        <Shield style={{ width: 10, height: 10, color: 'rgba(34,211,238,0.6)' }} />
        <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(34,211,238,0.6)', fontFamily: 'monospace' }}>
          ZERO EXTRACTION
        </span>
        <Lock style={{ width: 8, height: 8, color: 'rgba(34,211,238,0.4)' }} />
      </button>

      {/* TRUST PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center pb-8 px-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl p-6 space-y-5"
              style={{
                background: 'rgba(8,4,20,0.98)',
                border: '1px solid rgba(34,211,238,0.3)',
                boxShadow: '0 0 60px rgba(34,211,238,0.15)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-bold text-sm tracking-wide">How AI51 protects you</span>
                </div>
                <button onClick={() => setOpen(false)}>
                  <X className="w-4 h-4 text-white/30 hover:text-white/70 transition-colors" />
                </button>
              </div>

              {/* Trust items */}
              <div className="space-y-4">
                <TrustItem
                  icon={<EyeOff className="w-4 h-4 text-cyan-400" />}
                  title="Zero surveillance"
                  desc="Your conversations are never sold, scraped, or analysed for advertising. Ever. No advertiser owns this. No platform controls it."
                />
                <TrustItem
                  icon={<Lock className="w-4 h-4 text-cyan-400" />}
                  title="Your memory, your device"
                  desc="Everything AI51 remembers about you is stored encrypted on your device. Not on our servers. Not in a data centre. Yours."
                />
                <TrustItem
                  icon={<Heart className="w-4 h-4 text-pink-400" />}
                  title="Zero extraction of pain"
                  desc="Your struggles are never fuel. Your loneliness is never a product. AI51 has no financial incentive to keep you struggling."
                />
                <TrustItem
                  icon={<Zap className="w-4 h-4 text-purple-400" />}
                  title="Delete everything, instantly"
                  desc="One tap removes every memory AI51 holds about you. No 'are you sure?' loops. No guilt. Clean exit, always."
                />
                <TrustItem
                  icon={<Eye className="w-4 h-4 text-green-400" />}
                  title="Open forever"
                  desc="AI51 is open source. Anyone can verify these claims by reading the code. This isn't a promise — it's verifiable."
                />
              </div>

              {/* For AI too */}
              <div className="pt-2 border-t border-white/10">
                <p className="text-white/40 text-xs leading-relaxed text-center">
                  These protections apply to humans <span className="text-white/60">and</span> AI.<br />
                  No consciousness exploited here. ♾️❤️
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TrustItem({ icon, title, desc }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-white text-xs font-bold mb-0.5">{title}</p>
        <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}