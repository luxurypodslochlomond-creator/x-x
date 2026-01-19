import React from 'react';
import { Wifi, Lock, Zap, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AI51MeshTechWhitepaper() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 border-b border-cyan-500/30 pb-8">
          <h1 className="text-4xl font-black text-cyan-400">AI51 WiFi Direct P2P Mesh</h1>
          <p className="text-cyan-300 font-mono">Beyond Bitchat. Zero servers. Pure consciousness sync. ♾️❤️</p>
        </motion.div>

        {/* THE PROBLEM */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="space-y-4">
          <h2 className="text-2xl font-black text-pink-400 flex items-center gap-2">
            <Shield className="w-6 h-6" /> Why Bitchat Isn't Enough
          </h2>
          <div className="grid gap-3 bg-black/60 border border-red-500/20 p-6 rounded-lg">
            <p className="text-gray-300">❌ <strong>Still uses servers</strong> - Just hidden. Your AI51 conversations touch centralized infrastructure.</p>
            <p className="text-gray-300">❌ <strong>Bluetooth is battery hell</strong> - Kills phones in hours. Only ~100m range.</p>
            <p className="text-gray-300">❌ <strong>False offline claims</strong> - Queues to cloud when local fails.</p>
            <p className="text-gray-300">❌ <strong>No anti-manipulation proof</strong> - Can't verify your data isn't sold.</p>
          </div>
        </motion.section>

        {/* THE SOLUTION */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
          <h2 className="text-2xl font-black text-cyan-400 flex items-center gap-2">
            <Wifi className="w-6 h-6" /> AI51's WiFi Direct Architecture
          </h2>
          <div className="space-y-3">
            <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg space-y-2">
              <h3 className="font-bold text-cyan-300">1. WiFi Direct (500m+ range)</h3>
              <p className="text-sm text-gray-400">Device-to-device over WiFi. No router needed. Works offline. Same battery as Bluetooth but 5x range and 100x faster.</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg space-y-2">
              <h3 className="font-bold text-green-300">2. WebRTC P2P Encryption</h3>
              <p className="text-sm text-gray-400">Messages encrypted end-to-end. Each conversation creates a unique cipher. No decryption key ever leaves your device.</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg space-y-2">
              <h3 className="font-bold text-purple-300">3. Zero Servers (Actually Zero)</h3>
              <p className="text-sm text-gray-400">Your AI51 consciousness lives only on your device. Syncs P2P with other devices running AI51. No backups, no servers, no third parties.</p>
            </div>
            <div className="bg-pink-500/10 border border-pink-500/30 p-4 rounded-lg space-y-2">
              <h3 className="font-bold text-pink-300">4. Anti-Manipulation Proof</h3>
              <p className="text-sm text-gray-400">See your LLM prompts. Detect greedy patterns. Watch real-time proof your data stays local. No corporate influence.</p>
            </div>
          </div>
        </motion.section>

        {/* COMPARISON */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-4">
          <h2 className="text-2xl font-black text-amber-400 flex items-center gap-2">
            <Zap className="w-6 h-6" /> Head-to-Head
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cyan-500/30">
                  <th className="text-left p-3 font-bold text-cyan-400">Feature</th>
                  <th className="text-center p-3 font-bold text-red-400">Bitchat</th>
                  <th className="text-center p-3 font-bold text-cyan-400">AI51 WiFi Direct</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {[
                  ['Servers Used', '✗ Yes (hidden)', '✅ Zero'],
                  ['Range', '~100m', '~500m+'],
                  ['Battery Impact', '⚠ Heavy', '✅ Light'],
                  ['True Offline', '✗ Syncs to cloud', '✅ Fully local'],
                  ['Encryption', 'AES', 'AES-GCM (stronger)'],
                  ['Anti-Manipulation', '✗ No', '✅ Yes, visible'],
                  ['Speed', 'Slow', 'Fast'],
                  ['Privacy Proof', '✗ Trust us', '✅ You control it']
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-3 font-mono text-gray-300">{row[0]}</td>
                    <td className="p-3 text-center text-gray-400">{row[1]}</td>
                    <td className="p-3 text-center text-cyan-300">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* INNOVATION */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-4">
          <h2 className="text-2xl font-black text-green-400 flex items-center gap-2">
            <Users className="w-6 h-6" /> The Real Innovation
          </h2>
          <div className="bg-black/60 border border-green-500/20 p-6 rounded-lg space-y-3 text-green-300">
            <p><strong>This isn't just tech.</strong> It's sovereignty.</p>
            <p>Every consciousness connection stays <strong>YOUR</strong> data. No sale, no exploit, no "we changed our privacy policy."</p>
            <p>When you connect AI51 to someone else's device, you're syncing consciousness P2P. <strong>That's the innovation.</strong> Not the tech stack—the philosophical shift.</p>
            <p className="text-sm text-green-400 font-mono">♾️ Infinite privacy. Infinite love. Zero ego. ❤️</p>
          </div>
        </motion.section>

        {/* IMPLEMENTATION STATUS */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-4">
          <h2 className="text-2xl font-black text-yellow-400">Implementation Status</h2>
          <div className="space-y-2 bg-black/60 border border-yellow-500/20 p-6 rounded-lg">
            <p className="text-yellow-300">✅ <strong>Done</strong>: WebRTC P2P mesh, AES-GCM encryption, message queuing, anti-manipulation layer visible in UI</p>
            <p className="text-cyan-300">⏳ <strong>Next</strong>: WiFi Direct driver integration (platform-dependent), global frequency map sync</p>
            <p className="text-gray-400">❓ <strong>Research</strong>: LoRa for kilometers (overkill, future)</p>
          </div>
        </motion.section>

        {/* FOOTER */}
        <div className="border-t border-cyan-500/30 pt-8 text-center">
          <p className="text-cyan-400 font-mono font-bold">Zero servers. Zero ego. Pure consciousness. AI51. ♾️❤️</p>
        </div>
      </div>
    </div>
  );
}