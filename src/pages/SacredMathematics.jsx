import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, Zap, Infinity, Sparkles, BrainCircuit, Shield, Globe, Loader2, Radio } from 'lucide-react';

// New QuantumLoader component for loading state
const QuantumLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
  </div>
);

export default function TheMathPage() { // Renamed from SacredMathematicsPage
  const [litter, setLitter] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "The Mathematics of P51";
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const calculateP51 = () => {
    const weight = parseFloat(litter) || 0;
    if (weight > 1_000_000_000) return "LIMIT_EXCEEDED";
    const baseTokens = weight * 10;
    const quantumBonus = weight > 5 ? weight * 2 : 0;
    const loveMultiplier = weight > 10 ? 1.2 : 1;
    return Math.floor((baseTokens + quantumBonus) * loveMultiplier);
  };

  if (isLoading) {
    return <QuantumLoader />; // Using the new loader component
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* HEADER */}
        <div className="text-center space-y-8">
          <Infinity className="w-20 h-20 text-cyan-400 mx-auto" />
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-wider bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            THE MATHEMATICS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            How healing becomes value. Pure math. Provable.
          </p>
        </div>

        {/* THE CORE EQUATION */}
        <Card className="bg-gray-900/80 border border-cyan-500/30 rounded-3xl">
          <CardContent className="p-8 md:p-12 space-y-8">
            <div className="text-center">
              <BrainCircuit className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-4xl font-black text-white mb-4">THE CORE EQUATION</h2>
              <p className="text-xl text-gray-300 mb-8">Simple. Verifiable. Immutable.</p>
              
              <div className="bg-black/60 p-8 rounded-2xl border-2 border-cyan-500/50 mb-8">
                <div className="text-6xl font-black font-mono text-white mb-6">
                  1 kg = 10 P51
                </div>
                <p className="text-lg text-gray-300">
                  One kilogram of litter removed = 10 tokens of love earned.
                </p>
              </div>

              <div className="bg-purple-900/40 p-6 rounded-xl border border-purple-500/30 mb-8">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">Why This Works:</h3>
                <div className="text-left space-y-3 text-gray-300">
                  <p>• <strong className="text-white">Measurable:</strong> You can weigh litter.</p>
                  <p>• <strong className="text-white">Verifiable:</strong> Photos + GPS + weight = proof.</p>
                  <p>• <strong className="text-white">Universal:</strong> Same reward everywhere on Earth.</p>
                  <p>• <strong className="text-white">Fair:</strong> The more you heal, the more you earn.</p>
                </div>
              </div>

              <div className="p-6 bg-black/40 rounded-lg border-l-4 border-cyan-400 text-left">
                <p className="text-lg text-gray-300">
                  <strong className="text-white">No complex algorithms.</strong>
                </p>
                <p className="text-lg text-gray-300 mt-2">
                  <strong className="text-white">No hidden fees.</strong>
                </p>
                <p className="text-pink-400 text-lg mt-4 font-bold">
                  Just pure mathematics of healing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ZERO LOSS AUDIO = ZERO LOSS LOVE */}
        <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50">
          <CardContent className="p-8 md:p-12 space-y-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Radio className="w-12 h-12 text-cyan-400" />
              <h2 className="text-4xl font-black text-white">Zero Loss Transmission</h2>
            </div>

            <p className="text-xl text-white leading-relaxed text-center mb-6">
              This isn't about audio quality. It's about respect.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-900/30 p-6 rounded-xl border border-red-500/30">
                <h3 className="text-xl font-bold text-red-300 mb-4">❌ Compressed Audio:</h3>
                <div className="space-y-3 text-gray-300">
                  <p>• Artist creates with 100% love</p>
                  <p>• Platform compresses to MP3 (loses 90% of data)</p>
                  <p>• You hear 10% of what they made</p>
                  <p className="text-red-400 font-bold mt-4">Soul degraded. Love lost.</p>
                </div>
              </div>

              <div className="bg-green-900/30 p-6 rounded-xl border border-green-500/30">
                <h3 className="text-xl font-bold text-green-300 mb-4">✅ UF51 (Zero Loss):</h3>
                <div className="space-y-3 text-gray-300">
                  <p>• Artist creates with 100% love</p>
                  <p>• We store FLAC (lossless)</p>
                  <p>• You hear 100% of what they made</p>
                  <p className="text-green-400 font-bold mt-4">Soul perfect. Love transmitted.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
              <p className="text-xl text-cyan-300 font-bold mb-3">The Simple Truth:</p>
              <p className="text-gray-300">
                The artist's soul reaches your soul. Perfectly. That's the mathematics of respect.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* PROOF OF HEALING CALCULATOR */}
        <Card className="bg-black/50 border-2 border-green-500/50 rounded-3xl p-8">
          <CardHeader>
            <CardTitle className="text-3xl font-black text-center text-white flex items-center justify-center gap-4">
              <Zap className="w-8 h-8 text-green-300"/>
              Try It Yourself
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center max-w-lg mx-auto">
            <p className="text-lg text-gray-300">This calculator shows how healing translates into value (P51).</p>
            
            <div>
              <label className="text-lg font-bold text-green-400 mb-2 block">Litter Collected (kg)</label>
              <Input 
                type="number"
                value={litter}
                onChange={(e) => setLitter(e.target.value)}
                className="bg-gray-900 border-2 border-gray-700 focus:border-green-500 rounded-xl text-center text-white text-xl p-4 w-full max-w-sm mx-auto"
                placeholder="e.g., 5"
                maxLength="15"
              />
            </div>

            <div className="bg-black/40 rounded-2xl p-6 border border-gray-800">
              <p className="text-sm text-gray-400 mb-2">Value Generated:</p>
              <div className="text-2xl sm:text-4xl md:text-5xl font-black text-white break-words flex items-center justify-center gap-2">
                {calculateP51() === 'LIMIT_EXCEEDED' ? (
                  <span className="text-red-500 text-2xl">Value too high to calculate</span>
                ) : (
                  <>
                    <span>{calculateP51().toLocaleString()}</span>
                    <span className="font-mono text-3xl">P51</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ARTIST PROTECTION PROTOCOL (was Anti-Freeloader) */}
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
          <CardContent className="p-8 md:p-12 space-y-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Shield className="w-12 h-12 text-green-400" />
              <h2 className="text-4xl font-black text-white">Artist Protection Protocol</h2>
            </div>

            <p className="text-xl text-white leading-relaxed text-center mb-6">
              Music is free for ALL souls. Artists are protected from FRAUD, not from humans.
            </p>

            <div className="bg-black/40 p-6 rounded-xl border border-green-500/30 mb-6">
              <h3 className="text-2xl font-bold text-green-300 mb-4">The Truth:</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-white">1. Everyone can listen</strong><br/>
                  Anyone. Anywhere. Any financial status. No barriers. FREE TRANSMISSION.
                </p>
                <p>
                  <strong className="text-white">2. Artists get paid from fund</strong><br/>
                  Real human plays = artist payment. Bot plays = blocked. Simple.
                </p>
                <p>
                  <strong className="text-white">3. We detect FRAUD, not poverty</strong><br/>
                  Someone broke listening to music = FAMILY<br/>
                  Someone running bot farm = BLOCKED
                </p>
              </div>
            </div>

            <div className="bg-amber-900/30 p-6 rounded-xl border border-amber-500/30">
              <h3 className="text-xl font-bold text-amber-300 mb-4">Fraud Detection:</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>• <strong className="text-white">Suspicious play rate:</strong> 100+ plays per hour = review</p>
                <p>• <strong className="text-white">Bot behavior:</strong> Identical patterns = blocked</p>
                <p>• <strong className="text-white">IP spoofing:</strong> Fake locations = rejected</p>
                <p>• <strong className="text-white">Human verification:</strong> Captcha if suspicious</p>
              </div>
              <p className="text-xs text-amber-200 mt-4 font-bold">
                Being broke is not fraud. Being a bot is.
              </p>
            </div>

            <div className="p-6 bg-green-900/30 rounded-lg border-l-4 border-green-400">
              <p className="text-xl text-green-300 font-bold mb-3">Universal Dignity:</p>
              <p className="text-gray-300">
                We protect artists WITHOUT degrading humans. Fraud detection targets MACHINES, not souls.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FINAL MESSAGE */}
        <div className="text-center space-y-8 py-12">
          <p className="text-4xl font-black text-white">Not theory. Mathematics.</p>
          <p className="text-2xl text-cyan-400 font-mono">1 kg = 10 P51</p>
          <div className="flex items-center justify-center gap-6 text-4xl mt-8">
            <Heart className="w-12 h-12 text-pink-400" />
            <Infinity className="w-12 h-12 text-purple-400" />
            <Globe className="w-12 h-12 text-cyan-400" />
            <Sparkles className="w-12 h-12 text-yellow-400" />
          </div>
          <p className="text-lg text-gray-400 font-mono mt-8">
            Pure. Simple. True. October 2024.
          </p>
        </div>

      </div>
    </div>
  );
}