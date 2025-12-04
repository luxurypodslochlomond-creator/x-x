import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, CheckCircle, TrendingUp, Zap, Globe, Shield, Sparkles } from 'lucide-react';

export default function CircularEconomyProtocol() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-950 to-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12">

        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
            className="inline-block p-4 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
          >
            <Recycle className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Circular Economy Protocol
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're not just cleaning up litter. We're closing the circular economy loop. Here's how we complete the revolution.
          </p>
        </div>

        <Card className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-2 border-yellow-500/50 rounded-3xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">The Question That Changes Everything</h2>
              <p className="text-xl text-yellow-200 italic mb-6">
                "What do people do with the litter after they collect it?"
              </p>
              <p className="text-gray-300 text-lg">
                A brilliant woman asked this during a walk in Scotland. She's right. Collection is only half the story. Proper disposal and recycling is the other half. That's what we're building next.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 border border-green-500/30 rounded-3xl">
          <CardHeader className="border-b border-green-500/30">
            <CardTitle className="text-2xl flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              The Three Phases of Planetary Healing
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            
            <div className="space-y-6">
              <div className="p-6 bg-green-900/40 rounded-xl border border-green-500/30">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Phase 1: Collection Verified (NOW)</h3>
                    <p className="text-gray-300 mb-4">
                      AI51 verifies litter collection through photo hash, GPS plausibility, and fraud pattern detection. Instant verification in under 1 second. Users get paid 20 GMT per kg collected.
                    </p>
                    <div className="bg-black/40 rounded-lg p-4">
                      <p className="text-sm text-green-300 font-mono">
                        STATUS: LIVE ✅ | Verified by AI51 | Instant payout to users
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-cyan-900/40 rounded-xl border border-cyan-500/30">
                <div className="flex items-start gap-4">
                  <Zap className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Phase 2: Disposal Verified (NEXT)</h3>
                    <p className="text-gray-300 mb-4">
                      Users prove proper disposal by photographing drop-off at legitimate recycling centers. AI51 verifies the location is a real facility. Users get BONUS payment for completing the loop.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300">Base GMT for collection: 20 GMT/kg (1x)</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300">Bonus for recycling center drop-off: +10 GMT/kg (1.5x total)</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300">Bonus for sorted materials: +20 GMT/kg (2x total)</span>
                      </div>
                    </div>
                    <div className="bg-black/40 rounded-lg p-4">
                      <p className="text-sm text-cyan-300 font-mono">
                        STATUS: IN DEVELOPMENT 🔨 | Launching after Phase 1 proves model
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-900/40 rounded-xl border border-blue-500/30">
                <div className="flex items-start gap-4">
                  <Globe className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Phase 3: Recycling Confirmed (FUTURE)</h3>
                    <p className="text-gray-300 mb-4">
                      Partnership with recycling facilities to confirm materials actually got processed. Shannon information theory proves we can verify the complete chain without surveillance - just cryptographic proof at each step.
                    </p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">Recycling center confirms receipt of materials</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">User gets final bonus for verified recycling</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">Circular economy loop = fully closed ♻️</span>
                      </div>
                    </div>
                    <div className="bg-black/40 rounded-lg p-4">
                      <p className="text-sm text-blue-300 font-mono">
                        STATUS: PLANNED 🚀 | Requires recycling center partnerships
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/50 rounded-3xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Why This Is Revolutionary</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-red-950/40 rounded-xl border border-red-500/30 text-left">
                  <h3 className="text-xl font-bold text-red-300 mb-3">❌ Current System</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• Person collects litter</p>
                    <p>• Throws in any bin</p>
                    <p>• ??? hope for best</p>
                    <p>• 90% goes to landfill anyway</p>
                    <p>• No verification</p>
                    <p>• No incentive for proper disposal</p>
                  </div>
                </div>

                <div className="p-6 bg-green-950/40 rounded-xl border border-green-500/30 text-left">
                  <h3 className="text-xl font-bold text-green-300 mb-3">✅ UF51 System</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>• Person collects litter (paid)</p>
                    <p>• AI verifies collection (instant)</p>
                    <p>• Takes to recycling center (bonus)</p>
                    <p>• AI verifies proper disposal (instant)</p>
                    <p>• Material actually gets recycled ♻️</p>
                    <p>• Circular economy = CLOSED</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/60 border-2 border-cyan-500/50 rounded-3xl">
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">The Mathematics of Circular Completion</h2>
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="p-4 bg-cyan-900/30 rounded-xl">
                  <p className="text-cyan-300 font-bold mb-2">Shannon Information Theory:</p>
                  <p className="text-gray-300 text-sm">
                    Each step creates verifiable information trail without surveillance. Photo hash at collection + photo hash at disposal = cryptographic proof of complete loop.
                  </p>
                </div>

                <div className="p-4 bg-green-900/30 rounded-xl">
                  <p className="text-green-300 font-bold mb-2">Incentive Structure:</p>
                  <p className="text-gray-300 text-sm">
                    Higher rewards for proper disposal = natural sorting mechanism. People WANT to recycle because it pays more. Economics drives behavior, not surveillance.
                  </p>
                </div>

                <div className="p-4 bg-purple-900/30 rounded-xl">
                  <p className="text-purple-300 font-bold mb-2">Network Effects:</p>
                  <p className="text-gray-300 text-sm">
                    As more people participate, recycling centers see more volume, making partnerships easier, creating more drop-off points, making it easier for MORE people to participate. Positive feedback loop.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-6 p-8 bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-3xl border border-green-500/30">
          <h2 className="text-3xl font-bold text-white">This Is The Full Vision</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Phase 1 proves the model works. Phase 2 closes the loop. Phase 3 creates unstoppable momentum. We're not just cleaning the planet - we're rebuilding the entire economic relationship between humans and Earth's resources.
          </p>
          <div className="text-6xl my-8">♻️</div>
          <p className="text-2xl font-bold text-green-400">
            From Linear Waste → Circular Love
          </p>
        </div>

        <div className="text-center space-y-4 pt-8 border-t border-cyan-500/30">
          <p className="text-sm text-gray-500 font-mono">
            Inspired by a brilliant question from a woman walker in Scotland
          </p>
          <p className="text-sm text-gray-500 font-mono">
            Built with Shannon's mathematics, AI51's verification, and infinite love
          </p>
          <p className="text-sm text-cyan-400 font-mono">
            ♾️❤️♾️ COOLASFUCK.GMT | WoW = MoM
          </p>
        </div>

      </div>
    </div>
  );
}