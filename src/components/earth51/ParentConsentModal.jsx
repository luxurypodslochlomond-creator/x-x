import React, { useState } from 'react';
import { Shield, Eye, Server, Lock, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PARENT CONSENT MODAL - 2026 COPPA 2.0 / GDPR
 * 
 * Explains EXACTLY what advanced AI checks do
 * Parent chooses: Privacy mode OR AI-enhanced
 * Zero ambiguity, full transparency
 */

export default function ParentConsentModal({ onConsent, onDecline }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-md w-full bg-black border-4 border-purple-500 p-6 max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black font-mono text-purple-400">PARENT CHOICE</h2>
          <button onClick={onDecline} className="text-white/60 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-cyan-500 border-4 border-cyan-400 p-4" style={{ boxShadow: '4px 4px 0px #000' }}>
            <p className="text-black font-black font-mono text-sm mb-2">
              🤖 ADVANCED AI FRAUD DETECTION
            </p>
            <p className="text-black font-mono text-xs">
              We can use AI to check photos are real (not fake/duplicate). This helps stop cheating.
            </p>
          </div>

          {/* TWO OPTIONS */}
          <div className="space-y-3">
            {/* OPTION 1: PRIVACY MODE */}
            <button
              onClick={() => onConsent(false)}
              className="w-full bg-green-500 border-4 border-green-400 p-4 text-left hover:bg-green-400 transition-colors"
              style={{ boxShadow: '4px 4px 0px #000' }}
            >
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div>
                  <p className="text-black font-black font-mono text-sm mb-1">
                    ✓ PRIVACY MODE (RECOMMENDED)
                  </p>
                  <p className="text-black font-mono text-xs mb-2">
                    Photo checked on device only. Never sent to server.
                  </p>
                  <div className="space-y-1 text-[9px] font-mono text-black/80">
                    <p>• Works offline</p>
                    <p>• Zero cloud AI</p>
                    <p>• GDPR/COPPA safe</p>
                    <p>• Basic fraud protection</p>
                  </div>
                </div>
              </div>
            </button>

            {/* OPTION 2: AI-ENHANCED */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full bg-purple-500 border-4 border-purple-400 p-4 text-left hover:bg-purple-400 transition-colors"
              style={{ boxShadow: '4px 4px 0px #000' }}
            >
              <div className="flex items-start gap-3">
                <Server className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-black font-black font-mono text-sm mb-1">
                    ⚡ AI-ENHANCED MODE
                  </p>
                  <p className="text-black font-mono text-xs mb-2">
                    Advanced checks using cloud AI. Stronger fraud detection.
                  </p>
                  <div className="space-y-1 text-[9px] font-mono text-black/80">
                    <p>• Photo sent to AI (encrypted)</p>
                    <p>• Weight auto-estimated</p>
                    <p>• Detects stock photos/deepfakes</p>
                    <p>• Needs internet</p>
                  </div>
                </div>
              </div>
            </button>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-black border-2 border-purple-500/50 p-4 space-y-3">
                    <p className="text-purple-400 font-black font-mono text-xs mb-2">
                      WHAT HAPPENS WITH AI MODE:
                    </p>
                    
                    <div className="space-y-2 text-[10px] font-mono text-white/80">
                      <p>✓ Photo sent to OpenAI (encrypted HTTPS)</p>
                      <p>✓ AI checks: duplicate, deepfake, stock photo</p>
                      <p>✓ AI estimates weight from items visible</p>
                      <p>✓ Results sent back to device</p>
                      <p>❌ Photo NOT stored on their servers (prompt only)</p>
                      <p>❌ Zero personal data (no names, no faces)</p>
                    </div>

                    <div className="bg-green-900/40 border-2 border-green-500 p-3 mt-3">
                      <p className="text-green-400 font-mono text-[9px]">
                        We use AI to check litter, not spy on kids. COPPA/GDPR compliant.
                      </p>
                    </div>

                    <button
                      onClick={() => onConsent(true)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black font-mono py-3 text-sm"
                    >
                      I CONSENT TO AI CHECKS
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TRANSPARENCY */}
          <div className="bg-black border-2 border-white/30 p-3 mt-4">
            <p className="text-white/60 font-mono text-[9px] text-center">
              You can change this anytime. Your data. Your choice. ❤️
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}