import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BuzzStopPrivacy() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 max-w-2xl mx-auto">
      <Link to="/BuzzStop" className="flex items-center gap-2 text-green-500 hover:text-green-400 font-mono text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to BuzzStop
      </Link>

      <h1 className="text-3xl font-black mb-2">
        <span className="text-white">BUZZ</span><span style={{ color: '#22c55e' }}>STOP</span>
        <span className="text-gray-400 text-xl ml-3 font-normal">Privacy Policy</span>
      </h1>
      <p className="text-gray-600 text-xs font-mono mb-8">Last updated: April 2026</p>

      <div className="space-y-8 text-gray-300 text-sm leading-relaxed">

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">THE SHORT VERSION</h2>
          <p className="text-white font-bold">BuzzStop collects nothing. Zero. We don't know who you are, and we don't want to.</p>
        </section>

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">WHAT WE COLLECT</h2>
          <p>Nothing personally identifiable. BuzzStop runs entirely in your browser. Your tinnitus frequency, your session, your audio — all stays on your device. We never transmit it anywhere.</p>
        </section>

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">AUDIO & MICROPHONE</h2>
          <p>BuzzStop does not access your microphone. All audio is generated locally using the Web Audio API built into your browser. Nothing is recorded. Nothing is uploaded.</p>
        </section>

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">HEALTH DATA</h2>
          <p>The frequency you select and any notes you make about your tinnitus never leave your device. We treat this as deeply personal information — because it is. We have zero access to it.</p>
        </section>

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">COOKIES & TRACKING</h2>
          <p>No tracking cookies. No third-party analytics on the BuzzStop tool itself. We're part of Universal Frequency 51 which uses standard anonymous analytics for platform health — but BuzzStop's audio sessions are never tracked.</p>
        </section>

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">YOUR RIGHTS</h2>
          <p>Since we hold no data about you, there's nothing to delete, export, or correct. You're invisible to us — by design. If you have questions, find us through the UF51 platform.</p>
        </section>

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">GOVERNING LAW</h2>
          <p>These policies are governed by the laws of Scotland, United Kingdom.</p>
        </section>

      </div>

      <div className="mt-12 pt-6 border-t border-white/10 flex gap-4 text-xs font-mono">
        <Link to="/BuzzStop" className="text-gray-600 hover:text-gray-400">← BuzzStop</Link>
        <Link to="/BuzzStopTerms" className="text-gray-600 hover:text-gray-400">Terms →</Link>
      </div>
    </div>
  );
}