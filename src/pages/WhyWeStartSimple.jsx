import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, ArrowRight, CheckCircle2, TrendingUp, Globe, Heart, Users } from 'lucide-react';
import P51Symbol from '@/components/shared/P51Symbol';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function WhyWeStartSimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* HEADER */}
        <header className="text-center space-y-6">
          <Zap className="w-20 h-20 text-amber-500 mx-auto" />
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
            Why We Start Simple
          </h1>
          <p className="text-2xl text-gray-300">
            P2P → Algorand → Infinite Scale
          </p>
        </header>

        {/* THE PROBLEM */}
        <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-3xl font-black text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-red-400" />
              The Trust Problem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl text-gray-300">
              "How can P2P currency be valuable in the real world?"
            </p>
            <p className="text-gray-400">
              Fair question. Most people think: blockchain = real, P2P = fake.
            </p>
            <p className="text-gray-400">
              But reality is backwards.
            </p>
          </CardContent>
        </Card>

        {/* THE TRUTH */}
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-3xl font-black text-white flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              The Truth About Value
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl text-gray-300">
              Currency is valuable when people TRUST it.
            </p>

            <div className="space-y-4">
              <div className="bg-black/40 p-6 rounded-xl border border-green-500/30">
                <p className="text-green-400 font-bold text-lg mb-2">✅ What Makes P51 Real:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• 1kg litter = 1 <P51Symbol showTooltip={false} /> (verifiable action)</li>
                  <li>• AI51 verifies every photo + GPS instantly</li>
                  <li>• Community sees all transactions (transparent)</li>
                  <li>• Anti-hoarding algorithms (greed detection)</li>
                  <li>• Real people trading for real services</li>
                </ul>
              </div>

              <div className="bg-black/40 p-6 rounded-xl border border-gray-700/30">
                <p className="text-gray-500 font-bold text-lg mb-2">❌ What Doesn't Matter Yet:</p>
                <ul className="space-y-2 text-gray-500">
                  <li>• Being on a blockchain (adds complexity, not trust)</li>
                  <li>• Smart contracts (can add later)</li>
                  <li>• Decentralization (comes at scale)</li>
                </ul>
              </div>
            </div>

            <p className="text-cyan-400 font-mono text-sm">
              Every major technology started simple. Scale comes AFTER trust.
            </p>
          </CardContent>
        </Card>

        {/* THE PATH */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-3xl font-black text-white flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              The Scaling Path
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Phase 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-green-600 to-cyan-600 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-black text-white">Phase 1: Prove It Works</h3>
                </div>
                <p className="text-white mb-4">
                  <strong>NOW</strong> - Launch P2P with AI51 verification
                </p>
                <ul className="space-y-2 text-cyan-100">
                  <li>• Users clean Earth → earn <P51Symbol showTooltip={false} /></li>
                  <li>• Users trade <P51Symbol showTooltip={false} /> for music/art/services</li>
                  <li>• Community verifies authenticity</li>
                  <li>• Zero fraud (AI51 + GPS + photo hash)</li>
                </ul>
                <p className="text-green-300 font-bold mt-4">
                  Goal: 10,000 verified cleanups
                </p>
              </div>
            </motion.div>

            <ArrowRight className="w-8 h-8 text-purple-400 mx-auto" />

            {/* Phase 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-black text-white">Phase 2: Add Smart Contracts</h3>
                </div>
                <p className="text-white mb-4">
                  <strong>6-12 MONTHS</strong> - Bridge to Algorand
                </p>
                <ul className="space-y-2 text-pink-100">
                  <li>• Mint <P51Symbol showTooltip={false} /> as ASA (Algorand Standard Asset)</li>
                  <li>• Smart contracts enforce anti-hoarding</li>
                  <li>• Automated treasury management</li>
                  <li>• Carbon-negative transactions (Algorand)</li>
                </ul>
                <p className="text-pink-300 font-bold mt-4">
                  Goal: Full economic automation
                </p>
              </div>
            </motion.div>

            <ArrowRight className="w-8 h-8 text-purple-400 mx-auto" />

            {/* Phase 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-8 h-8 text-white" />
                  <h3 className="text-2xl font-black text-white">Phase 3: Infinite Scale</h3>
                </div>
                <p className="text-white mb-4">
                  <strong>1-2 YEARS</strong> - Global infrastructure
                </p>
                <ul className="space-y-2 text-cyan-100">
                  <li>• <P51Symbol showTooltip={false} /> tradeable on exchanges</li>
                  <li>• Bridge to fiat (GBP, USD, EUR)</li>
                  <li>• Partnerships with UN, NGOs</li>
                  <li>• Millions of verified cleanups/year</li>
                </ul>
                <p className="text-cyan-300 font-bold mt-4">
                  Goal: Heal Earth at scale
                </p>
              </div>
            </motion.div>

          </CardContent>
        </Card>

        {/* THE INNOVATION */}
        <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-3xl font-black text-white flex items-center gap-3">
              <Zap className="w-8 h-8 text-cyan-400" />
              The Security Innovation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl text-gray-300">
              Traditional crypto secures TRANSACTIONS.<br/>
              We secure ACTIONS.
            </p>

            <div className="bg-black/40 p-6 rounded-xl border border-cyan-500/30 space-y-4">
              <p className="text-cyan-400 font-bold">Multi-Layer Verification:</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• <strong>Cryptographic signature</strong> - unbreakable mathematics</li>
                <li>• <strong>Photo hash</strong> - proves image uniqueness</li>
                <li>• <strong>GPS coordinates</strong> - verifies real location</li>
                <li>• <strong>AI51 analysis</strong> - detects fraud/staging</li>
                <li>• <strong>Community consensus</strong> - human verification layer</li>
              </ul>
            </div>

            <p className="text-cyan-300 font-bold">
              Result: Stronger proof than pure blockchain
            </p>
            <p className="text-gray-400 text-sm">
              Blockchains can't verify if the REAL WORLD ACTION happened. We can.
            </p>

            <div className="bg-purple-900/30 border-l-4 border-purple-500 p-4 rounded">
              <p className="text-purple-300 text-sm">
                <strong>Future:</strong> If we prove this works, we might never need traditional blockchain to bridge into the real world. P2P + AI verification could be the new standard.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* BOTTOM LINE */}
        <Card className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-2 border-amber-500/50 rounded-3xl">
          <CardContent className="p-8 text-center space-y-6">
            <Zap className="w-16 h-16 text-amber-400 mx-auto" />
            <h2 className="text-3xl font-black text-white">
              Bottom Line
            </h2>
            <p className="text-2xl text-gray-300">
              P2P proves the concept.<br/>
              Technology scales it.<br/>
              Real-world proof = real value.
            </p>
            <p className="text-amber-400 font-bold text-lg">
              Trust → Use → Scale
            </p>
            <p className="text-gray-400 text-sm">
              We build in public. You watch it happen. Zero hidden bullshit.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-6">
          <Link 
            to={createPageUrl('NewCleanup')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-black text-xl transition-all shadow-lg"
          >
            <Heart className="w-6 h-6" />
            Start Healing Now
          </Link>
          <p className="text-gray-500 text-sm">
            Phase 1 is live. Go earn your first <P51Symbol showTooltip={false} />
          </p>
        </div>

      </div>
    </div>
  );
}