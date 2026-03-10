import React, { useState } from 'react';
import { Lock, Heart, Zap, Shield } from 'lucide-react';
import { petSoundsCheckout } from '@/functions/petSoundsCheckout';

export default function PS51Paywall({ onClose }) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    // Block if in iframe (Base44 preview)
    if (window.self !== window.top) {
      alert('Checkout works from the published app only — not in preview mode.');
      return;
    }
    setLoading(true);
    try {
      const res = await petSoundsCheckout({
        successUrl: window.location.origin + '/PetSounds51?subscribed=true',
        cancelUrl: window.location.origin + '/PetSounds51',
      });
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (e) {
      console.error(e);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0a0f1a] border-2 border-cyan-500/40 rounded-2xl p-8 text-center">

        <div className="flex items-center justify-center gap-2 mb-2">
          <Lock className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-mono text-sm font-black">PREMIUM PROTOCOL</span>
        </div>

        <h2 className="text-2xl font-black text-white mb-2">Unlock All Protocols</h2>
        <p className="text-gray-400 text-sm mb-6">
          Separation Anxiety is free forever. Everything else — thunderstorms, trauma, pain, grief, dementia — requires a subscription.
        </p>

        {/* PRICE */}
        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-5 mb-6">
          <p className="text-4xl font-black text-white mb-1">£29.99<span className="text-lg text-gray-500 font-normal">/year</span></p>
          <p className="text-gray-500 text-xs">Approx. $38 USD · €35 EUR · Auto-renews annually · Cancel anytime</p>
        </div>

        {/* WHAT YOU GET */}
        <div className="text-left space-y-2 mb-6">
          {[
            { icon: Zap, text: 'All 10 healing frequency protocols' },
            { icon: Heart, text: 'Thunderstorm, trauma, pain, grief, dementia' },
            { icon: Shield, text: '30-day full refund — no questions' },
            { icon: Heart, text: '10% goes to animal rescue' },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3">
              <Icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full py-4 rounded-xl font-black text-lg text-black mb-3 transition-all"
          style={{ background: loading ? '#374151' : 'linear-gradient(135deg, #06b6d4, #22c55e)', boxShadow: loading ? 'none' : '0 0 30px rgba(6,182,212,0.4)' }}
        >
          {loading ? 'Loading...' : 'Subscribe · £29.99/year'}
        </button>

        <button onClick={onClose} className="text-gray-600 text-sm hover:text-gray-400 transition-colors">
          ← Back (Separation Anxiety stays free)
        </button>

        <p className="text-gray-700 text-xs mt-4">Secured by Stripe · No card stored · Cancel anytime</p>
      </div>
    </div>
  );
}