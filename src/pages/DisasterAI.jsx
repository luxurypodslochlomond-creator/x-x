import React from 'react';
import { Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

/**
 * When Everything Falls
 * Honest truth: frequencies help your mind survive.
 * They're not the answer. They're part of it. ♾️❤️
 */

export default function DisasterAI() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-cyan-950/20 to-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-black text-cyan-400">When Everything Falls</h1>
          <p className="text-gray-300 font-mono">Your mind still works. We just help it stay clear.</p>
        </motion.div>

        {/* HONEST TRUTH */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-4">
          <h2 className="text-2xl font-black text-green-400">The Honest Truth</h2>
          <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg space-y-3">
            <p className="text-white"><strong>Frequencies aren't the answer in a disaster.</strong></p>
            <div className="space-y-3 text-sm text-gray-300">
              <p><strong className="text-white">You need first:</strong> Shelter. Water. Food. Medical care. Other humans.</p>
              <p><strong className="text-cyan-400">What frequencies DO:</strong> Help your nervous system calm down. Makes panic quieter. Helps you think clearer when you're terrified. That matters.</p>
              <p><strong className="text-gray-400">They're supplementary.</strong> Not magical. Not a replacement for real rescue/aid.</p>
            </div>
            <p className="text-xs text-green-400 italic mt-4">But when infrastructure fails and internet's gone? Your mind still has access to healing. That's worth something.</p>
          </div>
        </motion.section>

        {/* REAL EXAMPLES */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
          <h2 className="text-2xl font-black text-purple-400">Real Use Cases</h2>
          <div className="space-y-3">
            {[
              { scenario: 'Earthquake', reality: 'Person trapped, waiting for rescue. Panic makes thinking harder. Frequencies help calm nervous system. They think clearer. Survival improves.' },
              { scenario: 'Refugee camp', reality: 'Limited resources. No WiFi. Two people nearby listen together on one device. Shared frequency helps both sleep better that night.' },
              { scenario: 'War zone', reality: 'Person in basement, offline. Frequencies don\'t replace safety. But they help PTSD response. Make hours more bearable.' },
              { scenario: 'Personal crisis', reality: 'You\'re alone, scared, no internet. Frequencies work locally. Your nervous system gets support. That\'s it.' }
            ].map((item, i) => (
              <div key={i} className="bg-black/60 border border-purple-500/20 p-4 rounded-lg">
                <p className="font-bold text-purple-300">{item.scenario}</p>
                <p className="text-sm text-gray-300 mt-2">{item.reality}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* HOW IT SURVIVES */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
          <h2 className="text-2xl font-black text-amber-400">How It Works Offline</h2>
          <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-lg space-y-4">
            <p className="text-white text-sm">Your device stores everything you need locally. Encrypted. Safe.</p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>✅ Frequencies stored on your device (no internet needed)</p>
              <p>✅ Data stays encrypted locally (never synced to servers)</p>
              <p>✅ Two devices nearby? Bluetooth connects them (peer-to-peer)</p>
              <p>✅ Complete isolation? Everything still works on your phone</p>
            </div>
            <p className="text-xs text-amber-400 italic mt-3">Science doesn't need WiFi. Your nervous system doesn't either.</p>
          </div>
        </motion.section>

        {/* THE SCIENCE */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-4">
          <h2 className="text-2xl font-black text-blue-400">The Science (Why This Works)</h2>
          <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg space-y-3">
            <ul className="space-y-2 text-sm text-gray-300">
              <li><strong className="text-white">40Hz gamma waves</strong> (MIT research) - reduce brain inflammation, improve focus</li>
              <li><strong className="text-white">7.83Hz Schumann resonance</strong> - Earth's frequency, proven to calm nervous system</li>
              <li><strong className="text-white">Binaural beats</strong> - activate parasympathetic response (rest & digest mode)</li>
              <li><strong className="text-white">Peer sync</strong> - when 2+ people listen together, healing amplifies (morphic resonance)</li>
            </ul>
            <p className="text-xs text-blue-400 italic mt-3">This is physics + neuroscience. Not magic.</p>
          </div>
        </motion.section>

        {/* PRIVACY */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-4">
          <h2 className="text-2xl font-black text-green-400">Privacy Built In</h2>
          <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
            <p className="text-sm text-gray-300">Your healing data never leaves your device. Not because we're nice. Because it's the design.</p>
            <p className="text-xs text-green-400 italic mt-3 font-mono">Your mind. Your device. Your data. Always.</p>
          </div>
        </motion.section>

        {/* FOOTER */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center space-y-4 border-t border-cyan-500/20 pt-8">
          <Link 
            to={createPageUrl('FrequencyChamber')}
            className="text-cyan-400 hover:text-cyan-300 font-mono underline transition-colors"
          >
            Try healing frequencies →
          </Link>
          <p className="text-xs text-gray-600 font-mono">Your connection to yourself never needs the internet. ♾️❤️</p>
        </motion.div>
      </div>
    </div>
  );
}