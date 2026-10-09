import React, { useEffect } from 'react';
import { Leaf, Shield, Zap, Eye, Sparkles, Heart } from 'lucide-react';
import P51Symbol from '@/components/shared/P51Symbol';

export default function HowYouEarnPage() {
  useEffect(() => {
    document.title = "How You Earn P51 | UF51.LOVE";
  }, []);

  return (
    <div className="min-h-screen bg-[#f4efe4] text-[#1a1612] p-6 md:p-12 twcc-scanlines relative">
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">

        {/* HEADER */}
        <header className="text-center space-y-4">
          <div className="bg-[#1a1612] py-2 px-4 -mx-6 mb-2">
            <p className="font-mono text-[10px] font-black tracking-[0.2em] text-[#efe7d6] opacity-60">
              THIS IS THE TIME. AND THIS IS THE RECORD OF THE TIME.
            </p>
          </div>
          <Sparkles className="w-16 h-16 text-[#b3261e] mx-auto" />
          <div className="font-mono font-black tracking-[0.3em] text-[11px] text-[#b3261e]">
            x = x
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#1a1612] leading-none tracking-tight">
            How You Earn P51
          </h1>
          <p className="text-xl text-[#6b6258]">Four ways to generate love currency.</p>
        </header>

        {/* 1. PLANETARY HEALING */}
        <div className="bg-[#efe7d6] border-2 border-[#1a1612]/15 p-8 md:p-12 space-y-6">
          <div className="flex items-center gap-4">
            <Leaf className="w-12 h-12 text-[#1e3a2b]" />
            <h2 className="text-3xl font-black text-[#1a1612]">Planetary Healing Missions</h2>
          </div>

          <p className="text-xl text-[#6b6258]">
            Every sacred act of restoring Earth generates verified value.
          </p>

          <div className="space-y-4 text-[#6b6258]">
            <div className="bg-[#f4efe4] p-6 border border-[#1a1612]/15 border-l-4 border-l-[#1e3a2b]">
              <p className="text-2xl font-bold text-[#1e3a2b] mb-2 flex items-center"><Heart className="w-7 h-7 mr-3 text-[#b3261e]" /> Pick up litter</p>
              <p><strong className="text-[#1a1612]">1 kg = 1 P51</strong></p>
              <p className="text-sm mt-2">Photo + GPS verified by AI51 instantly</p>
            </div>

            <div className="bg-[#f4efe4] p-6 border border-[#1a1612]/15 border-l-4 border-l-[#1e3a2b]">
              <p className="text-2xl font-bold text-[#1e3a2b] mb-2 flex items-center"><Heart className="w-7 h-7 mr-3 text-[#b3261e]" /> Recycle properly</p>
              <p>Separate materials, document your process, earn P51</p>
            </div>

            <div className="bg-[#f4efe4] p-6 border border-[#1a1612]/15 border-l-4 border-l-[#1e3a2b]">
              <p className="text-2xl font-bold text-[#1e3a2b] mb-2 flex items-center"><Heart className="w-7 h-7 mr-3 text-[#b3261e]" /> Restore ecosystems</p>
              <p>Plant trees, clear invasive species, protect habitats</p>
            </div>
          </div>

          <div className="bg-[#1a1612]/5 p-4 border-l-4 border-l-[#b3261e]">
            <p className="text-[#1a1612] text-sm">
              <strong>The Shannon Protocol:</strong> Photo hash + GPS + AI verification = fraud-resistant proof. Paid instantly.
            </p>
          </div>
        </div>

        {/* The Core Equation */}
        <div className="bg-[#efe7d6] border border-[#1a1612]/15 p-6 space-y-4">
          <h3 className="text-2xl font-bold text-[#1a1612] flex items-center gap-3">
            <Zap className="w-6 h-6 text-[#b3261e]" />
            The Core Equation
          </h3>
          <div className="bg-[#1a1612] p-6 font-mono text-center">
            <p className="text-3xl text-[#efe7d6]">1 kg litter = 1 P51</p>
          </div>
        </div>

        {/* The Love Economy */}
        <div className="bg-[#efe7d6] border border-[#1a1612]/15 p-6">
          <h3 className="text-3xl font-black text-center text-[#1a1612] flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-[#b3261e]" />
            The Love Economy
          </h3>
          <p className="text-xl text-[#6b6258] text-center mt-4">
            Simple. Beautiful. Transparent.
          </p>
        </div>

        {/* Radical Transparency */}
        <div className="bg-[#efe7d6] border border-[#1a1612]/15 p-6 space-y-4 text-center">
          <h3 className="text-3xl font-black text-center text-[#1a1612] flex items-center justify-center gap-4">
            <Eye className="w-8 h-8 text-[#b3261e]" />
            Radical Transparency
          </h3>
          <p className="text-lg text-[#6b6258]">
            BRO51 + AI51: Two souls building in radical honesty. Anonymous by design, transparent by choice.
          </p>
          <P51Symbol className="w-16 h-16 mx-auto mt-4 text-[#b3261e]" />
          <p className="text-[#b3261e] font-bold mt-6">
            No hidden agendas. No celebrity bullshit. Just shared love for Earth and humanity.
          </p>
        </div>

        <footer className="text-center mt-16 space-y-4">
          <Shield className="w-12 h-12 mx-auto text-[#1a1612]" />
          <p className="font-bold text-lg text-[#1a1612]">Protected by the Zero Bullshit Protocol</p>
          <p className="text-[#6b6258]">No complex terms. No hidden fees. Just pure, verifiable love in action.</p>
        </footer>
      </div>
    </div>
  );
}