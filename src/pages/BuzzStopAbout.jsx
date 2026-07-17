import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Zap, Brain, Waves, Shield, CheckCircle, XCircle, HelpCircle, AlertTriangle } from 'lucide-react';

export default function BuzzStopAbout() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 max-w-2xl mx-auto">
      <Link to="/BuzzStop" className="flex items-center gap-2 text-green-500 hover:text-green-400 font-mono text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to BuzzStop
      </Link>

      <h1 className="text-3xl font-black mb-2">
        <span className="text-white">BUZZ</span><span style={{ color: '#22c55e' }}>STOP</span>
        <span className="text-gray-400 text-xl ml-3 font-normal">About</span>
      </h1>
      <p className="text-gray-600 text-xs font-mono mb-8">How it works · Relief vs cure · Privacy first</p>

      <div className="space-y-8 text-gray-300 text-sm leading-relaxed">

        {/* === THE CORE PROBLEM === */}
        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-3">THE PROBLEM</h2>
          <p>Tinnitus (ringing, buzzing, hissing in your ears) affects 1 in 7 people. Most existing treatments are medication, surgery, or therapy. BuzzStop offers something different: <strong className="text-white">acoustic physics</strong>.</p>
        </section>

        {/* === THE FOUR LAYERS === */}
        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-4">HOW IT WORKS: 4-LAYER APPROACH</h2>
          
          <div className="space-y-4">
            {/* Phase */}
            <div className="pl-4 border-l-2" style={{ borderColor: '#22c55e' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
                <h3 className="font-bold text-white">Phase Layer (Destructive Interference)</h3>
              </div>
              <p>We generate an inverted copy of your tinnitus frequency and play it alongside. Two identical waves 180° out of phase = cancellation. This is real physics — the same principle used in professional noise-cancelling headphones.</p>
            </div>

            {/* Cortex */}
            <div className="pl-4 border-l-2" style={{ borderColor: '#8b5cf6' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ background: '#8b5cf6' }} />
                <h3 className="font-bold text-white">Cortex Layer (Binaural Beats)</h3>
              </div>
              <p>200 Hz in your left ear, 210 Hz in your right — your brain perceives a 10 Hz binaural beat, matching alpha brainwaves (8–12 Hz) associated with calm, relaxation, and reduced pain perception. Peer-reviewed research supports this. Requires headphones.</p>
            </div>

            {/* Pattern */}
            <div className="pl-4 border-l-2" style={{ borderColor: '#f97316' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ background: '#f97316' }} />
                <h3 className="font-bold text-white">Pattern Layer (Neuroplasticity)</h3>
              </div>
              <p>Tinnitus is partly a neurological pattern — your brain amplifies the signal. A slow 0.08 Hz amplitude modulation gently shifts the signal's intensity, which may help interrupt the habit loop. This is a practical technique, not a proven clinical treatment.</p>
            </div>

            {/* Shimmer */}
            <div className="pl-4 border-l-2" style={{ borderColor: '#06b6d4' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ background: '#06b6d4' }} />
                <h3 className="font-bold text-white">Shimmer Layer (Masking)</h3>
              </div>
              <p>Even after destructive interference, your brain sometimes "hears" phantom tones nearby. Shimmer plays harmonics around your frequency to mask these residual shadows.</p>
            </div>
          </div>
        </section>

        {/* === RELIEF VS CURE === */}
        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-3">RELIEF VS CURE: BE HONEST</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-white mb-1 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> What BuzzStop Can Do</h3>
              <p>Provide immediate relief during a session (5–15 minutes). Help you relax. Give you a tool you control. No side effects. No prescription needed.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-1 flex items-center gap-2"><XCircle className="w-4 h-4 text-red-400" /> What BuzzStop Cannot Do (Yet)</h3>
              <p>Permanently cure tinnitus. Fix the underlying cause (hearing damage, nerve issues, etc.). Work equally well for everyone — tinnitus is complex and individual.</p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-1 flex items-center gap-2"><HelpCircle className="w-4 h-4 text-blue-400" /> The Research</h3>
              <p>Destructive interference works in physics. Binaural beats are peer-reviewed. Pattern interruption is neuropsychology. But human tinnitus is complicated — multiple causes, multiple mechanisms. We're applying proven tools intelligently.</p>
            </div>
          </div>
        </section>

        {/* === O(LOG N) PRIVACY === */}
        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-3">O(LOG N) PRIVACY — DATA SOVEREIGNTY</h2>
          <p className="mb-3">BuzzStop uses <strong className="text-white">binary search</strong> to find your frequency. Here's why that matters:</p>
          <ul className="space-y-2 ml-4">
            <li>• <strong>14 operations max</strong> to search 15,980 Hz range (log₂ 15,980 ≈ 14)</li>
            <li>• <strong>Minimal computation</strong> = runs entirely on your device</li>
            <li>• <strong>No data transmission</strong> = zero server dependency</li>
            <li>• <strong>True privacy</strong> by architecture, not by promise</li>
          </ul>
          <p className="mt-3">Most tinnitus apps track you. BuzzStop doesn't need to — your device solves the problem in ~14 taps.</p>
        </section>

        {/* === NO LOGIN === */}
        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-3">NO LOGIN. NO ACCOUNT. NO TRACKING.</h2>
          <p>You don't need to create an account. We don't store your data. We don't know who you are, and we don't want to. Open, use, benefit. That's it.</p>
        </section>

        {/* === OFFLINE FIRST === */}
        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-3">WORKS OFFLINE</h2>
          <p>BuzzStop is cached on your device. If you lose internet connection mid-session, you can keep using it. No interruptions. No "please reconnect" nonsense.</p>
        </section>

        {/* === WHEN TO SEE A DOCTOR === */}
        <section className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> WHEN TO SEE A DOCTOR</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Your tinnitus appeared suddenly</li>
            <li>• It's accompanied by hearing loss, dizziness, or ear pain</li>
            <li>• It's getting worse</li>
            <li>• It's affecting your mental health or sleep severely</li>
          </ul>
          <p className="mt-3 text-gray-400 text-xs">BuzzStop is a tool for relief, not a replacement for professional medical care.</p>
        </section>

        {/* === WHY WE EXIST === */}
        <section>
          <h2 className="text-green-500 font-black font-mono text-xs tracking-widest mb-3">WHY WE BUILT THIS</h2>
          <p>BuzzStop is part of Universal Frequency 51 — a mission to make healing accessible to everyone. Tinnitus is painful. Expensive treatments don't work for everyone. We built something free, honest, and grounded in real science.</p>
          <p className="mt-3">We're not promising a cure. We're offering relief. And we're building it the right way — with your privacy, your control, and your dignity in mind.</p>
        </section>

        {/* === THE HONEST MARKET REALITY === */}
        <section className="border-2 border-green-500/40 rounded-xl p-5" style={{ background: 'rgba(34,197,94,0.05)' }}>
          <h2 className="text-green-400 font-black font-mono text-xs tracking-widest mb-4 flex items-center gap-2"><Zap className="w-4 h-4" /> THE HONEST MARKET REALITY</h2>
          
          <p className="text-gray-300 mb-4">Most tinnitus tools available right now fall into one of these categories:</p>

          <div className="space-y-3 mb-5">
            {[
              { model: 'Monthly subscription', note: 'Access locked behind recurring payment.' },
              { model: 'Freemium — core features paywalled', note: 'Free tier exists but real tools cost.' },
              { model: 'One-time purchase ($40–$60)', note: 'Upfront cost just to try it.' },
              { model: 'Free with ads + data collection', note: 'You pay with your information instead.' },
            ].map(({ model, note }) => (
              <div key={model} className="flex items-start gap-3 pl-3 border-l border-red-500/30">
                <div className="flex-1">
                  <span className="text-red-400 text-xs font-mono font-bold">{model}</span>
                  <p className="text-gray-600 text-xs mt-0.5">{note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-green-500/30 pt-4">
            <div className="flex items-start gap-3 pl-3 border-l-2 border-green-500">
              <div className="flex-1">
                <span className="text-green-400 font-black text-sm">BuzzStop</span>
                <span className="text-green-300 text-xs ml-2 font-mono font-black">FREE. FOREVER.</span>
                <p className="text-gray-400 text-xs mt-1">No account. No subscription. No data collected. No ads. Works offline. Built on physics. Part of a mission — not a business model.</p>
              </div>
            </div>
          </div>

          <p className="text-gray-500 text-xs mt-4 leading-relaxed">
            We believe relief from pain should not require a monthly payment or your personal data. So we built it free. And we're keeping it that way.
          </p>
        </section>

      </div>

      {/* Footer nav */}
      <div className="mt-12 pt-6 border-t border-white/10 flex gap-4 text-xs font-mono">
        <Link to="/BuzzStop" className="text-gray-600 hover:text-gray-400">← BuzzStop</Link>
        <Link to="/BuzzStopTerms" className="text-gray-600 hover:text-gray-400">Terms →</Link>
        <Link to="/BuzzStopPrivacy" className="text-gray-600 hover:text-gray-400">Privacy →</Link>
      </div>
    </div>
  );
}