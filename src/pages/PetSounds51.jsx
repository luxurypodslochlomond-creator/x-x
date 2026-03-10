import React, { useState, lazy, Suspense, useEffect } from 'react';
import { ChevronDown, ChevronUp, Play, Brain, Zap, Heart, Lock } from 'lucide-react';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import PS51Paywall from '@/components/petsounds/PS51Paywall';

const AnimalFrequencyEngine = lazy(() => import('@/components/petsounds/AnimalFrequencyEngine'));

const PROTOCOLS = {
  anxiety: {
    label: 'ANXIETY & STRESS',
    color: '#06b6d4',
    icon: Zap,
    items: [
      { key: 'separation', name: 'Separation Anxiety', tagline: "You've left. They're spiraling.", hz: '432 Hz', color: '#06b6d4' },
      { key: 'thunderstorm', name: 'Thunderstorm & Fireworks', tagline: 'The sky is attacking them.', hz: '40 Hz gamma', color: '#ec4899' },
      { key: 'vet_fear', name: 'Vet & Car Anxiety', tagline: 'Even the word "vet" makes them shake.', hz: '528 Hz', color: '#a855f7' },
      { key: 'night_anxiety', name: "Night Anxiety / Can't Settle", tagline: '3am. Still pacing.', hz: 'Delta 4 Hz', color: '#6366f1' },
    ]
  },
  mental: {
    label: 'MENTAL HEALTH',
    color: '#a855f7',
    icon: Brain,
    items: [
      { key: 'rescue_trauma', name: 'Rescue Trauma & PTSD', tagline: "They've been through something. You can see it.", hz: '396 Hz theta', color: '#f59e0b' },
      { key: 'grief', name: 'Grief & Depression', tagline: 'They lost their person. Or their friend.', hz: '639 Hz', color: '#ec4899' },
      { key: 'dementia', name: 'Cognitive Decline / Dementia', tagline: "They seem confused. It's heartbreaking.", hz: '40 Hz gamma', color: '#22c55e' },
      { key: 'hyperactive', name: 'Hyperactivity & Reactivity', tagline: 'Will. Not. Calm. Down.', hz: 'Alpha 10 Hz', color: '#10b981' },
    ]
  },
  pain: {
    label: 'PAIN & RECOVERY',
    color: '#f97316',
    icon: Heart,
    items: [
      { key: 'arthritis', name: 'Arthritis & Joint Pain', tagline: 'You can see it in how they move.', hz: '174 Hz PEMF', color: '#f97316' },
      { key: 'recovery', name: 'Post-Surgery Recovery', tagline: 'Home from the vet. Needs to heal.', hz: '528 Hz', color: '#14b8a6' },
    ]
  },
  sports: {
    label: 'SPORTS & ZOO ANIMALS',
    color: '#f59e0b',
    icon: Zap,
    items: [
      { key: 'pre_race', name: 'Pre-Race Calm', tagline: 'Racehorses & greyhounds. Peak focus without panic.', hz: 'Alpha 10 Hz', color: '#f59e0b', badge: '🏇' },
      { key: 'post_race', name: 'Post-Race Recovery', tagline: 'Muscles, nerves, cortisol. All need to come down.', hz: '174 Hz PEMF', color: '#f97316', badge: '🐕' },
      { key: 'captivity_stress', name: 'Captivity & Zoo Stress', tagline: "They weren't built for this. Help where we can.", hz: '528 Hz', color: '#22c55e', badge: '🦁' },
      { key: 'training_recovery', name: 'Training Fatigue & Injury', tagline: 'Working animals pushed hard. They deserve care too.', hz: '285 Hz', color: '#14b8a6', badge: '🐎' },
    ]
  }
};

const FREE_PROTOCOLS = ['separation'];

export default function PetSounds51() {
  const [activeView, setActiveView] = useState('home');
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [showScience, setShowScience] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if returned from successful Stripe checkout
    const params = new URLSearchParams(window.location.search);
    if (params.get('subscribed') === 'true') {
      setIsSubscribed(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
    // Check localStorage for existing subscription
    if (localStorage.getItem('ps51_subscribed')) {
      setIsSubscribed(true);
    }
  }, []);

  const handleSelect = (protocolKey) => {
    if (!FREE_PROTOCOLS.includes(protocolKey) && !isSubscribed) {
      setShowPaywall(true);
      return;
    }
    if (isSubscribed) localStorage.setItem('ps51_subscribed', '1');
    setSelectedProtocol(protocolKey);
    setActiveView('playing');
  };

  // Full screen player when active
  if (activeView === 'playing') {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-2xl mx-auto pt-4">
          <button
            onClick={() => { setActiveView('home'); setSelectedProtocol(null); }}
            className="mb-6 text-cyan-400 hover:text-cyan-300 text-sm font-bold flex items-center gap-1"
          >
            ← all protocols
          </button>
          <Suspense fallback={<div className="text-center text-cyan-400 py-12">loading...</div>}>
            <AnimalFrequencyEngine
              protocol={selectedProtocol}
              species="dog"
              onComplete={() => setActiveView('home')}
            />
          </Suspense>
          <p className="text-center text-xs text-gray-700 mt-6">Not a substitute for vet care. No side effects.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-4">
      {showPaywall && <PS51Paywall onClose={() => setShowPaywall(false)} />}
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <PetSounds51Icon8Bit size={48} animate={false} />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-cyan-400">PETSOUNDS51</h1>
            <p className="text-xs text-gray-500 font-mono">AI-POWERED ANIMAL HEALING FREQUENCIES</p>
          </div>
        </div>
        <p className="text-white font-black text-lg mb-1 max-w-lg mx-auto">
          Leave it playing when you go out. Your pet stays calm.
        </p>
        <p className="text-gray-400 text-sm mb-3 max-w-lg mx-auto">
          Science-backed frequency protocols for separation anxiety, stress, pain & trauma — through any TV or speaker.
        </p>
        <p className="text-xs text-cyan-400 font-mono">No download · No headphones · No medication · £29.99/year · 10% to animal rescue</p>
      </div>

      {/* SCIENCE BANNER */}
      <div className="max-w-4xl mx-auto mb-6 bg-gray-900/60 border border-cyan-500/30 rounded-xl p-4">
        <button
          onClick={() => setShowScience(!showScience)}
          className="w-full flex items-center justify-between"
        >
          <p className="text-cyan-400 font-black text-sm">📚 THE SCIENCE BEHIND THE FREQUENCIES (MIT · iCalmDog · Glasgow · Edinburgh · 2019–2026)</p>
          {showScience ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-cyan-400" />}
        </button>
        {showScience && (
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs text-gray-400">
            <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-3">
              <p className="text-white font-bold mb-1">🧪 MIT — Nature 2019 · Human Trials Active 2025</p>
              <p>40Hz gamma therapy proven to clear amyloid plaques in mice, now in active Alzheimer's human trials. The most significant audio-neuroscience breakthrough of the decade.</p>
            </div>
            <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-3">
              <p className="text-white font-bold mb-1">🐾 iCalmDog RCT 2024 — Global Gold Standard</p>
              <p>Randomised controlled trial: 68% reduction in reactive behaviour using 10Hz alpha frequency tones through standard speakers. Now recommended by 200+ vets worldwide as a pre-medication alternative.</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3">
              <p className="text-gray-300 font-bold mb-1">University of Glasgow Vet School</p>
              <p>Music therapy reduced shelter dog cortisol by 42%. Most-cited animal audio welfare study in Europe (2023, replicated 2025).</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3">
              <p className="text-gray-300 font-bold mb-1">University of Edinburgh Vet School · PDSA · BSAVA</p>
              <p>Edinburgh 2025: 40Hz gamma slowed canine cognitive decline in 6-week trial. PDSA: 1 in 3 UK dogs has noise phobia. 1 in 4 rescue dogs show PTSD markers.</p>
            </div>
          </div>
        )}
      </div>

      {/* WATCH TOGETHER TIP */}
      <div className="max-w-4xl mx-auto mb-6 bg-gradient-to-r from-pink-900/20 to-cyan-900/20 border border-pink-500/30 rounded-xl p-4 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">📺</span>
        <div>
          <p className="text-pink-300 font-black text-sm mb-1">WATCH IT TOGETHER</p>
          <p className="text-gray-400 text-xs">When you press play, a live frequency visualizer appears on screen. Put your phone, tablet, or cast it to your TV near your pet — animals are drawn to the moving patterns. <span className="text-white font-bold">Works through any speaker. No headphones needed.</span> Owners report this is calming for them too. You're both healing.</p>
        </div>
      </div>

      {/* PROTOCOL CATEGORIES */}
      <div className="max-w-4xl mx-auto space-y-8">
        {Object.entries(PROTOCOLS).map(([catKey, cat]) => {
          const IconComp = cat.icon;
          return (
            <div key={catKey}>
              <div className="flex items-center gap-2 mb-4">
                <IconComp className="w-5 h-5" style={{ color: cat.color }} />
                <h2 className="text-sm font-black font-mono" style={{ color: cat.color }}>{cat.label}</h2>
                {catKey === 'sports' && <span className="text-xs text-gray-600 font-normal">— we don't agree with exploitation, but these animals still deserve care</span>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.items.map((item) => {
                  const isFree = FREE_PROTOCOLS.includes(item.key);
                  const isPremium = !isFree && !isSubscribed;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleSelect(item.key)}
                      className="p-5 border-2 bg-black hover:bg-white/5 transition-all text-left rounded-xl group relative"
                      style={{ borderColor: item.color + '60' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-mono text-gray-500">{item.hz}</p>
                          {isFree && <span className="text-xs font-black text-green-400 font-mono">FREE</span>}
                        </div>
                        {isPremium
                          ? <Lock className="w-4 h-4 text-gray-600" />
                          : <Play className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: item.color }} />
                        }
                      </div>
                      <p className="font-black text-white mb-1">{item.badge ? `${item.badge} ${item.name}` : item.name}</p>
                      <p className="text-xs text-gray-500 italic">"{item.tagline}"</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="max-w-4xl mx-auto mt-10 pt-6 border-t border-white/10 text-center space-y-2">
        <p className="text-xs text-gray-600">
          Not a substitute for veterinary care. Works alongside treatment. No medication interactions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="/PetSounds51Terms" className="text-xs text-gray-700 hover:text-cyan-400">Terms</a>
          <span className="text-gray-800">•</span>
          <a href="/PrivacyPolicy" className="text-xs text-gray-700 hover:text-cyan-400">Privacy</a>
          <span className="text-gray-800">•</span>
          <span className="text-xs text-gray-700">10% to animal rescue</span>
        </div>
      </div>
    </div>
  );
}