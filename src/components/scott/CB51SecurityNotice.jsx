import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CB51SecurityNotice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-amber-950/60 to-orange-950/60 border-2 border-amber-500/50 rounded-lg p-4 mb-6"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-300 font-black text-sm font-mono">SECURITY REMINDER</p>
          <p className="text-amber-200/80 text-xs font-mono mt-1 leading-relaxed">
            Keep all artist, band, and gig information confidential. Never share sensitive data, contracts, or financial details outside CB51.
          </p>
        </div>
      </div>
    </motion.div>
  );
}