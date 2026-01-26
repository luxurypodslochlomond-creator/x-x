import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Heart, AlertTriangle, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import Type1AI51Protocol from '@/components/healing/Type1AI51Protocol';

/**
 * TYPE1 AI51 - Healing Protocol for Type 1 Diabetes
 * 
 * Privacy: All data stays in user's account. No public profiles.
 * Applies to: Everyone (Dillon, artists, anyone managing T1D)
 * Root cause focus: Help identify what triggers glucose chaos
 */

export default function Type1AI51() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
          <p className="text-cyan-400 font-black font-mono text-xl">TYPE1 AI51</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 pb-6 border-b-2 border-red-500"
      >
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-10 h-10 text-red-400" />
          <h1 className="text-4xl font-black text-red-400 font-mono">TYPE1 AI51</h1>
        </div>
        <p className="text-gray-600 text-sm font-mono mb-2">Healing protocol for Type 1 Diabetes • All research • All frequencies • All hope ♾️❤️</p>
        
        {user && (
          <p className="text-cyan-300 text-xs font-mono">Your data stays private. Only you see your patterns.</p>
        )}
      </motion.div>

      {/* PROTOCOL COMPONENT */}
      <Type1AI51Protocol />
    </div>
  );
}