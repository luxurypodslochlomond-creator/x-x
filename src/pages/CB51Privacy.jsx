import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function CB51Privacy() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 px-6">
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
  );
}