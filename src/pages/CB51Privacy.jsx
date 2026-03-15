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

export default function CB51Privacy() {
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

        <h1 className="text-4xl font-black text-orange-400 mb-8 font-mono">Privacy Policy</h1>

        <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">What We Collect</h2>
            <p>Name, email, and Discord handle. Only to contact you about coaching.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">How We Use It</h2>
            <p>To schedule sessions, send updates, and respond to inquiries. That's it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Payment Data</h2>
            <p>Handled by Stripe. We never see your card details. Stripe's privacy policy applies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Sharing</h2>
            <p>We don't sell or share your data. Ever.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Cookies</h2>
            <p>None. No tracking. No analytics on you personally.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Your Rights</h2>
            <p>Want your data deleted? Email us. We'll remove it within 7 days.</p>
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