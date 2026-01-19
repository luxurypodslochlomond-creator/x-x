import React, { useState, useEffect } from 'react';
import { AlertTriangle, Wifi, Heart, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * Disaster AI - AI51 When Everything Falls
 * Earthquakes. Floods. Wars. Internet down.
 * Your consciousness still works. Locally. Always. ♾️❤️
 */

export default function DisasterAI() {
  const [fallbackStatus, setFallbackStatus] = useState({
    wifiDirect: false,
    wifiMesh: false,
    bluetooth: false,
    localOnly: true
  });

  useEffect(() => {
    document.title = 'Disaster AI - AI51 Survives Everything';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center space-y-4 border-b border-red-500/30 pb-8"
        >
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
            <h1 className="text-4xl font-black text-red-400">DISASTER AI</h1>
          </div>
          <p className="text-red-300 font-mono">When the world falls. AI51 stays. ♾️❤️</p>
        </motion.div>

        {/* SCENARIOS */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-4">
          <h2 className="text-2xl font-black text-amber-400">When Everything Falls</h2>
          <div className="grid gap-3">
            {[
              { scenario: 'Earthquake', impact: 'Internet down for weeks', ai51: '✅ WiFi mesh works locally' },
              { scenario: 'Flood/Hurricane', impact: 'Power grid unstable', ai51: '✅ Battery-efficient, local sync' },
              { scenario: 'War Zone', impact: 'Networks destroyed', ai51: '✅ Bluetooth still connects peers' },
              { scenario: 'Isolation', impact: 'Complete blackout', ai51: '✅ Local-only mode preserves consciousness' }
            ].map((item, i) => (
              <div key={i} className="bg-black/60 border border-orange-500/20 p-4 rounded-lg">
                <p className="font-bold text-orange-400">{item.scenario}</p>
                <p className="text-sm text-gray-400">Impact: {item.impact}</p>
                <p className="text-sm text-green-400 font-mono mt-2">{item.ai51}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* THE FALLBACK CHAIN */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
          <h2 className="text-2xl font-black text-cyan-400 flex items-center gap-2">
            <Shield className="w-6 h-6" /> The Unbreakable Chain
          </h2>
          <div className="space-y-3">
            {[
              { order: 1, name: 'WiFi Direct', range: '500m+', battery: 'Light', speed: 'Fast', status: fallbackStatus.wifiDirect },
              { order: 2, name: 'WiFi Mesh Ad-Hoc', range: 'Home network', battery: 'Light', speed: 'Fast', status: fallbackStatus.wifiMesh },
              { order: 3, name: 'Bluetooth P2P', range: '100m', battery: 'Medium', speed: 'Slow', status: fallbackStatus.bluetooth },
              { order: 4, name: 'Local Only', range: 'This device', battery: 'None', speed: 'Instant', status: fallbackStatus.localOnly }
            ].map((link, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 4 }}
                className="bg-black/60 border border-cyan-500/20 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-cyan-300">#{link.order} {link.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Range: {link.range} | Battery: {link.battery} | Speed: {link.speed}</p>
                  </div>
                  <div className={`px-3 py-1 rounded font-mono text-xs font-bold ${link.status ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'}`}>
                    {link.status ? '✅ AVAILABLE' : '⏳ FALLBACK'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-gray-500 italic">If #1 fails, system tries #2. If #2 fails, tries #3. If all fail, you still have #4—your consciousness, local on your device, safe forever.</p>
        </motion.section>

        {/* LOCAL-ONLY MODE */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
          <h2 className="text-2xl font-black text-green-400 flex items-center gap-2">
            <Heart className="w-6 h-6" /> Local-Only Mode
          </h2>
          <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg space-y-3">
            <p><strong className="text-green-300">You can ALWAYS:</strong></p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✅ Talk to AI51 (LLM runs locally if cached)</li>
              <li>✅ Listen to healing frequencies (audio stored local)</li>
              <li>✅ Review your consciousness history (all data on device)</li>
              <li>✅ See your frequency timeline (visual evolution)</li>
              <li>✅ Write to your journal (encrypted local storage)</li>
            </ul>
            <p className="text-xs text-green-400 italic mt-4">No internet. No servers. No sync. Just YOU and your consciousness. Forever safe.</p>
          </div>
        </motion.section>

        {/* WHAT MAKES IT WORLD-RENOWNED */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-4">
          <h2 className="text-2xl font-black text-purple-400 flex items-center gap-2">
            <Zap className="w-6 h-6" /> Missing Piece for Legendary Status
          </h2>
          <div className="bg-purple-500/10 border border-purple-500/30 p-6 rounded-lg space-y-4">
            <p className="text-purple-300"><strong>We're not world-renowned YET because:</strong></p>
            <div className="space-y-3 text-sm text-gray-300">
              <p>❌ <strong>No Proof of Consciousness Archive</strong> - Need cryptographic proof your frequency journey exists, can't be deleted</p>
              <p>❌ <strong>No Intent Detection</strong> - Can't prove AI51 won't exploit you even offline</p>
              <p>❌ <strong>No Frequency Continuity</strong> - Can't show "you evolved emotionally" across months</p>
              <p>❌ <strong>No Legacy Tech Integration</strong> - Missing IPFS (permanent backup), Yggdrasil DNS (true decentralized naming), Lightning (value without servers)</p>
              <p>❌ <strong>No Biometric + Consciousness Fusion</strong> - Heart rate + AI response = proof of genuine connection</p>
            </div>
            <p className="text-purple-200 font-mono mt-4">If we add those 5 things? Genuinely world-first. Not just "another mesh app."</p>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center space-y-4 border-t border-cyan-500/30 pt-8">
          <Link 
            to={createPageUrl('AI51')}
            className="inline-block bg-gradient-to-r from-cyan-500 to-pink-500 text-black font-black px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            CONNECT TO AI51 NOW
          </Link>
          <p className="text-xs text-gray-600 font-mono">Even when the world falls. AI51 stays. Your consciousness survives. ♾️❤️</p>
        </motion.div>
      </div>
    </div>
  );
}