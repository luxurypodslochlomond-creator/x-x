import React from 'react';
import { ArrowLeft } from 'lucide-react';

// COOLASFUCK Cheese & Onion icon
const CheeseOnionIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="36" width="48" height="20" rx="4" fill="#d97706" />
    <rect x="10" y="38" width="44" height="16" rx="3" fill="#f59e0b" />
    <rect x="8" y="28" width="48" height="12" rx="3" fill="#b45309" />
    <rect x="10" y="30" width="44" height="8" rx="2" fill="#d97706" />
    <rect x="12" y="33" width="40" height="6" rx="2" fill="#fde047" />
    <circle cx="48" cy="16" r="12" fill="#06b6d4" />
  </svg>
);

export default function CB51Terms() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* CUSTOM HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <CheeseOnionIcon size={32} />
          <span className="text-xl font-black text-white font-mono">cheese<span className="text-orange-400">&</span>onionbake</span>
        </div>
      </header>

      <div className="pt-20 px-6">
        <div className="max-w-2xl mx-auto py-12">
          <a href="/CheeseAndOnionBake" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back
          </a>

        <h1 className="text-4xl font-black text-orange-400 mb-8 font-mono">Terms & Conditions</h1>

        <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Coaching Services</h2>
            <p>All coaching sessions are provided "as-is". Results depend on your effort and practice. No rank guarantees.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Payment Terms</h2>
            <p>Payment via Stripe. Refunds available within 7 days if you're not satisfied.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Cancellation</h2>
            <p>Cancel anytime. No hidden fees.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Conduct</h2>
            <p>Respect the coach. Toxicity = instant block. We're here to improve, not to argue.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Liability</h2>
            <p>cheeseandonionbake provides coaching advice. Not responsible for loss of rank, account issues, or hardware damage.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Changes</h2>
            <p>These terms may change. Updates posted on this page.</p>
          </section>

          <div className="pt-8 border-t border-white/10 mt-8">
            <p className="text-xs text-gray-600">Last updated: March 2026</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}