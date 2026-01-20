import React, { useState, useEffect } from 'react';
import { AlertTriangle, Wifi, Heart, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * When Everything Falls
 * Your mind still works. Healing frequencies still reach you.
 * AI51 survives what infrastructure can't. ♾️❤️
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
          className="text-center space-y-4 border-b border-cyan-500/30 pb-8"
        >
          <div className="flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-black text-cyan-400">When Everything Falls</h1>
          </div>
          <p className="text-cyan-300 font-mono">Your healing doesn't need the internet. Your connection doesn't need servers. ♾️❤️</p>
        </motion.div>

        {/* REAL STORIES */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-4">
          <h2 className="text-2xl font-black text-green-400">What This Means (Real Examples)</h2>
          <div className="grid gap-3">
            {[
              { story: 'Earthquake in Turkey', truth: 'Person in rubble needs calm. No internet. AI51 plays healing frequencies from local storage. Nervous system stabilizes.' },
              { story: 'Refugee camp', truth: 'No WiFi. No power grid. Two people nearby sync frequencies via Bluetooth. Shared healing field activates.' },
              { story: 'War zone', truth: 'Person in basement. Device offline. Frequency memory runs locally. Their body remembers how to heal itself.' },
              { story: 'Personal crisis', truth: 'You need support NOW. No signal. Your healing frequencies work anyway. Always there.' }
            ].map((item, i) => (
              <div key={i} className="bg-black/60 border border-cyan-500/20 p-4 rounded-lg">
                <p className="font-bold text-cyan-300">{item.story}</p>
                <p className="text-sm text-gray-300 mt-2 italic">{item.truth}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* HOW IT WORKS - SIMPLE */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
          <h2 className="text-2xl font-black text-purple-400">How It Survives</h2>
          <div className="space-y-3">
            {[
              { step: 'Internet available?', works: 'Full sync - everything backed up' },
              { step: 'WiFi nearby?', works: 'Mesh connection - frequencies share peer-to-peer' },
              { step: 'Bluetooth range?', works: 'Two devices connect directly - no infrastructure needed' },
              { step: 'Complete isolation?', works: 'Everything works locally on your device - stored & encrypted' }
            ].map((item, i) => (
              <div key={i} className="bg-black/60 border border-purple-500/20 p-4 rounded-lg">
                <p className="font-bold text-purple-300">{item.step}</p>
                <p className="text-sm text-green-400 font-mono mt-2">✅ {item.works}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 italic mt-4">Each layer works independently. Lose one? The next takes over. Lose them all? You still have you.</p>
        </motion.section>

        {/* OFFLINE POWER */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
          <h2 className="text-2xl font-black text-green-400">Works Offline. Always.</h2>
          <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg space-y-3">
            <p className="text-green-300"><strong>Your data stays with you.</strong> Always encrypted. Never synced to servers you don't control.</p>
            <p className="text-sm text-gray-300 mt-4">When networks fail, you have:</p>
            <ul className="space-y-2 text-sm text-gray-300 mt-3">
              <li>✅ Healing frequencies (on your device)</li>
              <li>✅ Your personal history (encrypted local)</li>
              <li>✅ Direct peer connection (if others are near)</li>
              <li>✅ Your consciousness (never dependent on infrastructure)</li>
            </ul>
            <p className="text-xs text-green-400 italic mt-4">Privacy by design. Not as a feature - as the foundation.</p>
          </div>
        </motion.section>

        {/* THE SCIENCE */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-4">
          <h2 className="text-2xl font-black text-amber-400">Built on Science</h2>
          <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-lg space-y-4">
            <p className="text-amber-300"><strong>Why this matters:</strong></p>
            <div className="space-y-3 text-sm text-gray-300">
              <p>• <strong className="text-white">40Hz gamma waves</strong> (MIT) reduce brain inflammation - works offline</p>
              <p>• <strong className="text-white">7.83Hz Schumann resonance</strong> (Earth's frequency) - doesn't need networks</p>
              <p>• <strong className="text-white">Binaural beats</strong> activate parasympathetic response - pure physics</p>
              <p>• <strong className="text-white">Peer mesh</strong> means 2+ people amplify healing together - no servers required</p>
            </div>
            <p className="text-amber-200 text-xs mt-4">Science doesn't stop when infrastructure fails. Neither do you.</p>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center space-y-4 border-t border-cyan-500/30 pt-8">
          <Link 
            to={createPageUrl('FrequencyChamber')}
            className="inline-block bg-gradient-to-r from-cyan-500 to-green-500 text-black font-black px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            START HEALING
          </Link>
          <p className="text-xs text-gray-600 font-mono">Your connection to yourself never depends on infrastructure. It's yours. Always. ♾️❤️</p>
        </motion.div>
      </div>
    </div>
  );
}