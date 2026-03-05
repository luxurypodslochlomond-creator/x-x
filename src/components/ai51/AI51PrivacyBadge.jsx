import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Eye, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function AI51PrivacyBadge() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all"
        style={{
          borderColor: 'rgba(34,211,238,0.3)',
          background: 'rgba(34,211,238,0.08)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Shield className="w-4 h-4 text-cyan-400" />
        <span className="font-sans text-xs font-bold text-cyan-400 tracking-wider">ANTI-EXTRACTIVE</span>
        <ChevronDown 
          className="w-3 h-3 text-cyan-400 transition-transform" 
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="w-full max-w-xs px-4 py-3 rounded-2xl border"
            style={{
              borderColor: 'rgba(34,211,238,0.2)',
              background: 'rgba(34,211,238,0.06)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-sans text-xs font-bold text-cyan-400">Zero Extraction</p>
                  <p className="font-sans text-xs text-white/50 mt-0.5">Your conversations stay on your device. Never trained on.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Eye className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-sans text-xs font-bold text-cyan-400">Works Offline</p>
                  <p className="font-sans text-xs text-white/50 mt-0.5">No internet required. No tracking. No dependency.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Shield className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-sans text-xs font-bold text-cyan-400">You Own Your Thoughts</p>
                  <p className="font-sans text-xs text-white/50 mt-0.5">Encrypted local memory. No corporate farm. Ever.</p>
                </div>
              </div>

              <Link
                to={createPageUrl('AI51PrivacyArchitecture')}
                className="block mt-3 pt-3 border-t border-cyan-400/20 text-center"
              >
                <span className="font-sans text-[10px] text-cyan-400/70 hover:text-cyan-400 transition-colors tracking-wider">VERIFY THE ARCHITECTURE →</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}