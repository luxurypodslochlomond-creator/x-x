import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Music, Zap, Heart, Shield, Radio, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * LINN ZERO LOSS TECH - Glasgow Excellence
 * Why Linn is respected + how we use same principles (open source)
 */

export default function LinnZeroLoss() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Music className="w-10 h-10 text-pink-400" />
          <h1 className="text-4xl md:text-5xl font-black">
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              LINN ZERO LOSS
            </span>
          </h1>
        </div>
        <p className="text-xl text-gray-300 font-mono">
          Glasgow's finest • 50+ years of lossless audio perfection
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">

        {/* WHY LINN IS RESPECTED */}
        <div className="bg-gray-900/60 border-2 border-pink-500/30 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-pink-400 mb-6">Why Linn = World Class</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Pioneer (1972)</h3>
                <p className="text-gray-300">Founded by Ivor Tiefenbrun in Glasgow - revolutionized turntables with LP12, still made today after 50+ years</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Exakt Technology (Patented)</h3>
                <p className="text-gray-300">Direct digital connection from studio to speaker - bypasses traditional DAC/amplifier degradation. <span className="text-pink-400 font-bold">Zero loss from source to air</span></p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Music className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Bit-Perfect Streaming</h3>
                <p className="text-gray-300">Every bit from the recording reaches your ear unchanged - no compression, no loss, no compromise</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Heart className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Scottish Engineering</h3>
                <p className="text-gray-300">Handcrafted in Glasgow - same dedication to quality that built the shipyards. Linn doesn't chase trends, they set standards</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-black/40 border border-cyan-500/30 rounded-xl p-6">
            <p className="text-cyan-300 font-mono text-sm">
              <span className="font-black text-cyan-400">PHYSICS TRUTH:</span> Linn proved that the source matters most. A perfect digital signal stays perfect through their entire chain. No analog conversion = no degradation. This is <span className="text-pink-400 font-bold">E=hν</span> (transformation) not E=mc² (loss).
            </p>
          </div>
        </div>

        {/* HOW UF51 USES SAME PRINCIPLES */}
        <div className="bg-gray-900/60 border-2 border-cyan-500/30 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-cyan-400 mb-6">How UF51 Does It (Open Source)</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">FLAC Codec (Free, Open Source)</h3>
                <p className="text-gray-300">Xiph.Org Foundation - mathematically lossless compression. A FLAC file decompresses to <span className="text-green-400 font-bold">bit-identical</span> WAV. Zero generation loss, forever.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Web Audio API (Native Browser)</h3>
                <p className="text-gray-300">Browser-native digital signal processing - bypasses OS audio mixers that can degrade quality. Direct path to hardware.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">432Hz Master Tuning</h3>
                <p className="text-gray-300">All healing frequencies tuned to natural resonance - no pitch shifting during playback (which adds distortion). Source stays pure.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">PWA Offline Caching</h3>
                <p className="text-gray-300">Once downloaded, tracks play from IndexedDB - zero network jitter, zero buffering artifacts. Lossless stays lossless even offline.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">No Transcoding, Ever</h3>
                <p className="text-gray-300">Artists upload FLAC/WAV/AIFF → We store bit-perfect → You receive identical. No MP3 conversion, no "optimization", no loss.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-black/40 border border-pink-500/30 rounded-xl p-6">
            <p className="text-pink-300 font-mono text-sm">
              <span className="font-black text-pink-400">OPEN SOURCE ADVANTAGE:</span> Linn's Exakt is patented (£££). FLAC is free forever. Web Audio API is free forever. UF51's entire stack is open source - anyone can verify zero loss. That's how you build trust ♾️❤️♾️
            </p>
          </div>
        </div>

        {/* ZERO LOSS PROOF */}
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-pink-500 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-white mb-6">Zero Loss = Physics</h2>
          
          <div className="space-y-6 text-gray-200">
            <p className="text-lg">
              <span className="text-pink-400 font-black">Linn proved it:</span> If you preserve every bit from studio to speaker, the listener hears exactly what the artist heard. No coloration, no "warmth", no BS - just truth.
            </p>
            
            <p className="text-lg">
              <span className="text-cyan-400 font-black">UF51 extends it:</span> We use the same physics for healing frequencies. 528Hz recorded at 24-bit/96kHz stays 528Hz. No lossy compression destroying the waveform. <span className="text-green-400 font-bold">The healing works because the frequency is intact.</span>
            </p>

            <div className="bg-black/40 border border-cyan-500/30 rounded-xl p-6 mt-6">
              <p className="text-cyan-300 font-mono text-sm mb-4">
                <span className="font-black">COMPARE:</span>
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-red-400 font-bold mb-2">❌ Spotify (Lossy)</p>
                  <p className="text-gray-400">320kbps MP3 (compressed)<br/>Throws away 70% of data<br/>Frequencies above 16kHz gone<br/>528Hz healing distorted</p>
                </div>
                <div>
                  <p className="text-green-400 font-bold mb-2">✅ UF51 (Lossless)</p>
                  <p className="text-gray-300">FLAC 24-bit/96kHz<br/>100% of original data preserved<br/>Full frequency spectrum intact<br/>528Hz mathematically perfect</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="bg-gray-900/60 border-2 border-green-500/30 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-green-400 mb-6">Why This Matters</h2>
          
          <div className="space-y-4 text-gray-300 text-lg">
            <p>
              <span className="text-white font-bold">Healing frequencies are physics.</span> If you compress them with MP3, you're literally destroying the waveform that creates the healing effect. It's like diluting medicine.
            </p>
            
            <p>
              <span className="text-white font-bold">Linn charges £20k+ for Exakt systems.</span> UF51 gives you the same zero-loss principle for free, using open source tech. That's the difference between extractive capitalism and love-based physics.
            </p>

            <p>
              <span className="text-white font-bold">Glasgow → World.</span> Linn proved Scottish engineering can beat anyone. UF51 proves Scottish consciousness engineering can heal the planet. Same standards, bigger mission ♾️❤️♾️
            </p>
          </div>
        </div>

        {/* LINKS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to={createPageUrl('Radio')} className="flex-1">
            <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3">
              <Radio className="w-6 h-6" />
              HEAR ZERO LOSS NOW
            </button>
          </Link>
          
          <Link to={createPageUrl('Whitepaper')} className="flex-1">
            <button className="w-full bg-gray-900 hover:bg-gray-800 border-2 border-cyan-500 text-cyan-400 font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3">
              THE PHYSICS
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* FOOTER */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-gray-600 text-sm font-mono mb-2">
            Linn Products Ltd, Glasgow, Scotland (1972-present)
          </p>
          <p className="text-gray-600 text-sm font-mono mb-2">
            FLAC codec by Xiph.Org Foundation (open source, lossless forever)
          </p>
          <p className="text-pink-500 text-sm font-mono font-bold">
            UF51 • Zero loss for planetary healing ♾️❤️♾️
          </p>
        </div>

      </div>
    </div>
  );
}