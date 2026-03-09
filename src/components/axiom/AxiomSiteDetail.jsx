import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Globe, Users, Lock, ChevronRight } from 'lucide-react';

export default function AxiomSiteDetail({ site, globalResonance, onClose }) {
  if (!site) return null;

  const resonancePercent = (globalResonance / site.unlockThreshold) * 100;
  const isUnlocked = resonancePercent >= 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-black via-[#0a0f1a] to-black border border-cyan-500/30 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 p-6 border-b border-cyan-500/20 bg-black/80 backdrop-blur-lg flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-black text-white mb-1">{site.name}</h2>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {site.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Frequency Signature */}
            <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4">
              <p className="text-cyan-400 font-black text-sm mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> Frequency Signature
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-black text-2xl">{site.frequency}Hz</span>
                  <span className="text-gray-500 text-xs font-mono">{site.frequencyName}</span>
                </div>
                <p className="text-gray-400 text-sm">{site.frequencyScience}</p>
              </div>
            </div>

            {/* Resonance Progress */}
            <div className="rounded-xl bg-purple-500/5 border border-purple-500/20 p-4">
              <p className="text-purple-400 font-black text-sm mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" /> Global Resonance Level
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">{globalResonance.toLocaleString()} / {site.unlockThreshold.toLocaleString()} participants</span>
                  <span className="text-purple-300 font-black">{Math.min(resonancePercent, 100).toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 bg-black rounded-full overflow-hidden border border-purple-500/20">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(resonancePercent, 100)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                    style={{
                      boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
                    }}
                  />
                </div>
                <p className="text-gray-500 text-xs">
                  {isUnlocked ? (
                    <span className="text-green-400 font-black">✓ KNOWLEDGE UNLOCKED</span>
                  ) : (
                    <span>{Math.ceil(site.unlockThreshold - globalResonance).toLocaleString()} more participants needed to unlock</span>
                  )}
                </p>
              </div>
            </div>

            {/* Historical Intel */}
            <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4">
              <p className="text-amber-400 font-black text-sm mb-3">Historical Significance</p>
              <p className="text-gray-300 text-sm leading-relaxed">{site.history}</p>
              {site.historicalSource && (
                <p className="text-gray-600 text-xs mt-2 font-mono">📚 {site.historicalSource}</p>
              )}
            </div>

            {/* Locked Knowledge */}
            {!isUnlocked && (
              <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4">
                <p className="text-red-400 font-black text-sm mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Locked Knowledge
                </p>
                <p className="text-gray-400 text-sm">
                  {Math.ceil((1 - resonancePercent / 100) * 100)}% of this site's research remains locked until global resonance threshold is reached.
                </p>
              </div>
            )}

            {/* Unlocked Knowledge */}
            {isUnlocked && site.unlockedKnowledge && (
              <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4">
                <p className="text-green-400 font-black text-sm mb-3">✓ Unlocked Research</p>
                <div className="space-y-3">
                  {site.unlockedKnowledge.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <ChevronRight className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-bold text-sm">{item.title}</p>
                        <p className="text-gray-400 text-xs leading-relaxed">{item.content}</p>
                        {item.source && (
                          <p className="text-gray-600 text-[10px] font-mono mt-1">📄 {item.source}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Harmonic Connections */}
            {site.harmonicConnections && site.harmonicConnections.length > 0 && (
              <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4">
                <p className="text-cyan-400 font-black text-sm mb-3">Harmonic Connections</p>
                <p className="text-gray-400 text-xs mb-3">{site.name} resonates with:</p>
                <div className="flex flex-wrap gap-2">
                  {site.harmonicConnections.map((connection, i) => (
                    <div key={i} className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                      {connection}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}