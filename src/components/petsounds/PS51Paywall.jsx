import React, { useState } from 'react';
import { Heart, Shield, Zap, ArrowLeft, Star } from 'lucide-react';
import { petSoundsCheckout } from '@/functions/petSoundsCheckout';
import PS51Icon, { PS51Icons } from '@/components/petsounds/PS51CustomIcons';

const PROTOCOLS = [
  { icon: 'Science', name: 'Thunderstorm & Fireworks', detail: '40Hz gamma · suppresses fear response' },
  { icon: 'Trust', name: 'Vet & Car Anxiety', detail: '528Hz · parasympathetic activation' },
  { icon: 'Frequency', name: "Night Anxiety / Can't Settle", detail: 'Delta 4Hz · sleep onset' },
  { icon: 'Rescue', name: 'Rescue Trauma & PTSD', detail: '396Hz theta · trauma processing' },
  { icon: 'Heart', name: 'Grief & Depression', detail: '639Hz · remembering bonds' },
  { icon: 'Science', name: 'Cognitive Decline / Dementia', detail: '40Hz gamma · MIT protocol' },
  { icon: 'Frequency', name: 'Hyperactivity & Reactivity', detail: 'Alpha 10Hz · calm bridging' },
  { icon: 'Paw', name: 'Arthritis & Joint Pain', detail: '174Hz PEMF · pain signalling' },
  { icon: 'Frequency', name: 'Post-Surgery Recovery', detail: '528Hz · cellular repair' },
  { icon: 'Paw', name: 'Sports & Zoo Animals', detail: 'Performance + recovery' },
];

export default function PS51Paywall({ onClose }) {
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (window.self !== window.top) {
      alert('Payment works from the published app — not inside the preview.');
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
      } else {
        alert('Could not connect to payment. Please try again.');
      }
    } catch (e) {
      console.error(e);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(160deg, #1a0a2e 0%, #0d1f1a 50%, #1a1000 100%)' }}>
      <div className="max-w-lg mx-auto px-5 py-8 pb-16">

        {/* BACK */}
        <button onClick={onClose} className="flex items-center gap-2 text-amber-400/70 hover:text-amber-300 text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Separation Anxiety stays free
        </button>

        {/* HERO */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white leading-tight mb-3">
            Heal your bestie.<br/>
            <span style={{ color: '#f59e0b' }}>Forever frequencies.</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            MIT-proven sound therapy. Separation anxiety, thunderstorms, pain, grief, dementia — one subscription covers all. Science that works.
          </p>
        </div>

        {/* PRICE CARD */}
        <div className="rounded-2xl p-6 mb-6 text-center" style={{ background: 'rgba(245,158,11,0.08)', border: '2px solid rgba(245,158,11,0.4)' }}>
          <p className="text-5xl font-black text-white mb-1">£29.99</p>
          <p className="text-amber-400 font-bold mb-1">per year</p>
          <p className="text-gray-500 text-xs">≈ 8p a day · Cancel any time · Full refund if it doesn't help</p>
        </div>

        {/* PROTOCOLS LIST */}
        <div className="space-y-2 mb-7">
          {PROTOCOLS.map((p, i) => {
            const IconComponent = PS51Icons[p.icon];
            return (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5">
              {IconComponent && <IconComponent size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />}
              <div>
                <p className="text-sm font-bold text-white leading-tight">{p.name}</p>
                <p className="text-xs text-gray-600">{p.detail}</p>
              </div>
            </div>
          );
          })}
        </div>

        {/* TRUST */}
        <div className="grid grid-cols-3 gap-3 mb-7">
          {[
            { icon: Shield, label: '30-day refund', sub: 'no questions' },
            { icon: Heart, label: '10% to rescue', sub: 'animal charities' },
            { icon: Star, label: 'MIT · Glasgow', sub: 'peer-reviewed' },
          ].map(({ icon: Icon, label, sub }, i) => (
            <div key={i} className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <Icon className="w-5 h-5 mx-auto mb-1 text-amber-400" />
              <p className="text-xs font-bold text-white leading-tight">{label}</p>
              <p className="text-xs text-gray-600">{sub}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full py-5 rounded-2xl font-black text-xl text-black transition-all active:scale-95 mb-3"
          style={{
            background: loading ? '#374151' : 'linear-gradient(135deg, #f59e0b, #f97316)',
            boxShadow: loading ? 'none' : '0 8px 40px rgba(245,158,11,0.35)',
            color: loading ? '#9ca3af' : '#000',
          }}
        >
          {loading ? 'Connecting...' : '♾️❤️ Start Now — £29.99/year'}
        </button>

        {/* Stripe Link = one tap if they've ever paid with Stripe before */}
        <div className="flex items-center justify-center gap-2 mt-3 mb-1">
          <span className="text-gray-500 text-xs">Pays in one tap if you've used Stripe before</span>
        </div>
        <div className="flex items-center justify-center gap-3 mb-2">
          {['Apple Pay', 'Google Pay', '🔗 Link', 'Card'].map(m => (
            <span key={m} className="text-xs font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-md">{m}</span>
          ))}
        </div>

        <p className="text-center text-xs text-gray-700">
          Not a substitute for vet care. Complements treatment.
        </p>
      </div>
    </div>
  );
}