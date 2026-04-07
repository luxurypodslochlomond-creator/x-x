import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';

export default function BuzzStopTerms() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 max-w-2xl mx-auto">
      <Link to="/BuzzStop" className="flex items-center gap-2 text-green-500 hover:text-green-400 font-mono text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to BuzzStop
      </Link>

      <h1 className="text-3xl font-black mb-2">
        <span className="text-white">BUZZ</span><span style={{ color: '#22c55e' }}>STOP</span>
        <span className="text-gray-400 text-xl ml-3 font-normal">Terms of Use</span>
      </h1>
      <p className="text-gray-600 text-xs font-mono mb-8">Last updated: April 2026</p>

      <div className="space-y-8 text-gray-300 text-sm leading-relaxed">

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">1. WHAT BUZZSTOP IS</h2>
          <p>BuzzStop is a free audio tool that uses sound frequencies to help people find and attempt to mask tinnitus (ringing in the ears). It's built on real acoustic physics — destructive interference is a real thing. No gimmicks, no false promises.</p>
        </section>

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">2. IMPORTANT: NOT MEDICAL ADVICE</h2>
          <p className="mb-3">BuzzStop is <strong className="text-white">not a medical device</strong> and is <strong className="text-white">not a substitute for medical advice</strong>. If your tinnitus is severe, sudden, or accompanied by hearing loss, dizziness, or pain — please see a doctor or audiologist.</p>
          <p>We genuinely care about your wellbeing. That's exactly why we're telling you this straight.</p>
        </section>

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">3. USE AT REASONABLE VOLUME</h2>
          <p>Keep playback at a comfortable volume. Listening to loud audio through headphones for extended periods can damage hearing. BuzzStop includes frequency limits (20Hz–16kHz) and is designed to be used gently. Use your common sense — if something hurts, stop.</p>
        </section>

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">4. NO WARRANTIES</h2>
          <p>BuzzStop is provided "as is." We can't guarantee it will work for every person's tinnitus — everyone's is different. Results vary. We're doing our best with the science available.</p>
        </section>

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">5. FREE TO USE</h2>
          <p>BuzzStop is completely free. No hidden costs. No data sold. No bullshit. It's part of Universal Frequency 51's mission to make healing accessible to everyone.</p>
        </section>

        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-2">6. CONTACT</h2>
          <p>Questions? Find us at <Link to={createPageUrl('Welcome')} className="text-green-500 underline">universalfrequency51.com</Link> or through the UF51 platform.</p>
        </section>

      </div>

      <div className="mt-12 pt-6 border-t border-white/10 flex gap-4 text-xs font-mono">
        <Link to="/BuzzStop" className="text-gray-600 hover:text-gray-400">← BuzzStop</Link>
        <Link to="/BuzzStopPrivacy" className="text-gray-600 hover:text-gray-400">Privacy →</Link>
      </div>
    </div>
  );
}