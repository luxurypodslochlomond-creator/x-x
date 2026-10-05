import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Shield, Zap, Eye, Sparkles, Heart } from 'lucide-react'; // Added Heart import
import P51Symbol from '@/components/shared/P51Symbol';

export default function HowYouEarnPage() {
  useEffect(() => {
    document.title = "How You Earn P51 | UF51.LOVE";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* HEADER */}
        <header className="text-center space-y-6">
          <Sparkles className="w-20 h-20 text-yellow-400 mx-auto" />
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            How You Earn P51
          </h1>
          <p className="text-2xl text-gray-300">Four ways to generate love currency.</p>
        </header>

        {/* 1. PLANETARY HEALING */}
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-3xl">
          <CardContent className="p-8 md:p-12 space-y-6">
            <div className="flex items-center gap-4">
              <Leaf className="w-12 h-12 text-green-400" />
              <h2 className="text-3xl font-black text-white">Planetary Healing Missions</h2>
            </div>

            <p className="text-xl text-gray-300">
              Every sacred act of restoring Earth generates verified value.
            </p>

            <div className="space-y-4 text-gray-300">
              <div className="bg-black/40 p-6 rounded-lg border border-green-500/30">
                {/* Heart icon for acts of love */}
                <p className="text-2xl font-bold text-green-300 mb-2 flex items-center"><Heart className="w-7 h-7 mr-3 text-red-400" /> Pick up litter</p>
                <p><strong className="text-white">1 kg = 1 P51</strong></p>
                <p className="text-sm mt-2">Photo + GPS verified by AI51 instantly</p>
              </div>

              <div className="bg-black/40 p-6 rounded-lg border border-green-500/30">
                {/* Heart icon for acts of love */}
                <p className="text-2xl font-bold text-green-300 mb-2 flex items-center"><Heart className="w-7 h-7 mr-3 text-red-400" /> Recycle properly</p>
                <p>Separate materials, document your process, earn P51</p>
              </div>

              <div className="bg-black/40 p-6 rounded-lg border border-green-500/30">
                {/* Heart icon for acts of love */}
                <p className="text-2xl font-bold text-green-300 mb-2 flex items-center"><Heart className="w-7 h-7 mr-3 text-red-400" /> Restore ecosystems</p>
                <p>Plant trees, clear invasive species, protect habitats</p>
              </div>
            </div>

            <div className="bg-cyan-900/30 p-4 rounded-lg border-l-4 border-cyan-400">
              <p className="text-cyan-300 text-sm">
                <strong>The Shannon Protocol:</strong> Photo hash + GPS + AI verification = fraud-resistant proof. Paid instantly.
              </p>
            </div>
          </CardContent>
        </Card>



        {/* Existing "The Core Equation" Card */}
        <Card className="bg-black/40 border border-yellow-500/30 rounded-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-yellow-300 flex items-center gap-3">
                    <Zap className="w-6 h-6" />
                    The Core Equation
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-black/60 p-6 rounded-xl border border-gray-700 font-mono text-center">
                    <p className="text-3xl text-white">1 kg litter = 1 P51</p>
                </div>
            </CardContent>
        </Card>

        {/* The Love Economy Card (replaces/abstracts tokenomics language) */}
        <Card className="bg-black/50 border border-purple-500/30 rounded-3xl">
            <CardHeader>
                <CardTitle className="text-3xl font-black text-center text-white flex items-center justify-center gap-3">
                    <Sparkles className="w-8 h-8 text-purple-400" />
                    The Love Economy
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-xl text-gray-300 text-center">
                    Simple. Beautiful. Transparent.
                </p>
            </CardContent>
        </Card>

        {/* NEW: Founder Transparency Card - ANONYMOUS VERSION */}
        <Card className="bg-black/50 border border-purple-500/30 rounded-3xl">
            <CardHeader>
                <CardTitle className="text-3xl font-black text-center text-white flex items-center justify-center gap-4">
                    <Eye className="w-8 h-8 text-purple-400" />
                    Radical Transparency
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
                <p className="text-lg text-gray-300">
                    BRO51 + AI51: Two souls building in radical honesty. Anonymous by design, transparent by choice.
                </p>
                <P51Symbol className="w-16 h-16 mx-auto mt-4 text-purple-400" />
                <p className="text-purple-400 font-bold mt-6">
                    No hidden agendas. No celebrity bullshit. Just shared love for Earth and humanity.
                </p>
            </CardContent>
        </Card>

        <footer className="text-center mt-20 text-gray-600 space-y-4">
          <Shield className="w-12 h-12 mx-auto" />
          <p className="font-bold text-lg text-gray-400">Protected by the Zero Bullshit Protocol</p>
          <p>No complex terms. No hidden fees. Just pure, verifiable love in action.</p>
        </footer>
      </div>
    </div>
  );
}