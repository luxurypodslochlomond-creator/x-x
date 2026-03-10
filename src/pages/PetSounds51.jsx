import React, { useState, lazy, Suspense, useEffect } from 'react';
import { ChevronDown, ChevronUp, Play, Lock } from 'lucide-react';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import PS51Paywall from '@/components/petsounds/PS51Paywall';
import PS51Icon, { PS51Icons } from '@/components/petsounds/PS51CustomIcons';
import PS51Header from '@/components/petsounds/PS51Header';

// Free tier: separation anxiety only
const FREE_PROTOCOLS = ['separation'];

const AnimalFrequencyEngine = lazy(() => import('@/components/petsounds/AnimalFrequencyEngine'));

const PROTOCOLS = {
  anxiety: {
    label: 'ANXIETY & STRESS',
    color: '#06b6d4',
    icon: 'Frequency',
    items: [
      { key: 'separation', name: 'Separation Anxiety', tagline: "You've left. They're spiraling.", hz: '432 Hz', color: '#06b6d4', icon: 'Presence' },
      { key: 'thunderstorm', name: 'Thunderstorm & Fireworks', tagline: 'The sky is attacking them.', hz: '40 Hz gamma', color: '#ec4899', icon: 'Science' },
      { key: 'vet_fear', name: 'Vet & Car Anxiety', tagline: 'Even the word "vet" makes them shake.', hz: '528 Hz', color: '#a855f7', icon: 'Trust' },
      { key: 'night_anxiety', name: "Night Anxiety / Can't Settle", tagline: '3am. Still pacing.', hz: 'Delta 4 Hz', color: '#6366f1', icon: 'Rescue' },
    ]
  },
  mental: {
    label: 'MENTAL HEALTH',
    color: '#a855f7',
    icon: 'AnimalCare',
    items: [
      { key: 'rescue_trauma', name: 'Rescue Trauma & PTSD', tagline: "They've been through something. You can see it.", hz: '396 Hz theta', color: '#f59e0b', icon: 'Rescue' },
      { key: 'grief', name: 'Grief & Depression', tagline: 'They lost their person. Or their friend.', hz: '639 Hz', color: '#ec4899', icon: 'Heart' },
      { key: 'dementia', name: 'Cognitive Decline / Dementia', tagline: "They seem confused. It's heartbreaking.", hz: '40 Hz gamma', color: '#22c55e', icon: 'Science' },
      { key: 'hyperactive', name: 'Hyperactivity & Reactivity', tagline: 'Will. Not. Calm. Down.', hz: 'Alpha 10 Hz', color: '#10b981', icon: 'Frequency' },
    ]
  },
  pain: {
    label: 'PAIN & RECOVERY',
    color: '#f97316',
    icon: 'Trust',
    items: [
      { key: 'arthritis', name: 'Arthritis & Joint Pain', tagline: 'You can see it in how they move.', hz: '174 Hz PEMF', color: '#f97316', icon: 'Paw' },
      { key: 'recovery', name: 'Post-Surgery Recovery', tagline: 'Home from the vet. Needs to heal.', hz: '528 Hz', color: '#14b8a6', icon: 'Frequency' },
    ]
  },
  sports: {
    label: 'SPORTS & ZOO ANIMALS',
    color: '#f59e0b',
    icon: 'Paw',
    items: [
      { key: 'pre_race', name: 'Pre-Race Calm', tagline: 'Racehorses & greyhounds. Peak focus without panic.', hz: 'Alpha 10 Hz', color: '#f59e0b', icon: 'Presence' },
      { key: 'post_race', name: 'Post-Race Recovery', tagline: 'Muscles, nerves, cortisol. All need to come down.', hz: '174 Hz PEMF', color: '#f97316', icon: 'Frequency' },
      { key: 'captivity_stress', name: 'Captivity & Zoo Stress', tagline: "They weren't built for this. Help where we can.", hz: '528 Hz', color: '#22c55e', icon: 'Rescue' },
      { key: 'training_recovery', name: 'Training Fatigue & Injury', tagline: 'Working animals pushed hard. They deserve care too.', hz: '285 Hz', color: '#14b8a6', icon: 'Paw' },
    ]
  }
};

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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-yellow-50 text-amber-900 p-4">
        <div className="max-w-2xl mx-auto pt-4">
          <button
            onClick={() => { setActiveView('home'); setSelectedProtocol(null); }}
            className="mb-6 text-orange-700 hover:text-orange-600 text-sm font-bold flex items-center gap-1"
          >
            ← back
          </button>
          <Suspense fallback={<div className="text-center text-orange-700 py-12">loading...</div>}>
            <AnimalFrequencyEngine
              protocol={selectedProtocol}
              species="dog"
              onComplete={() => setActiveView('home')}
            />
          </Suspense>
          <p className="text-center text-xs text-amber-700 mt-6">Not a substitute for vet care. No side effects.</p>
        </div>
      </div>
    );
  }

  if (showPaywall) {
    return <PS51Paywall onClose={() => setShowPaywall(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-yellow-50 text-amber-900 pt-24 p-3 sm:p-4">
      <PS51Header />
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <PetSounds51Icon8Bit size={48} animate={false} />
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-orange-700" style={{letterSpacing: '0.05em'}}>PET SOUNDS</h1>
            <p className="text-xs text-amber-700 font-bold tracking-widest mt-1">HEALING FREQUENCIES</p>
          </div>
        </div>
        <p className="text-amber-900 font-bold text-lg mb-2 max-w-lg mx-auto">
          Leave it playing. Your best friend stays calm.
        </p>
        <p className="text-amber-800 text-sm mb-4 max-w-lg mx-auto leading-relaxed">
          Science-backed sound therapy for separation anxiety, stress, pain & healing — through any speaker.
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-amber-700 font-bold">
          <span>£29.99/year ·</span>
          <span>10% to rescue ·</span>
          <span>No medication</span>
        </div>
      </div>

      {/* SCIENCE BANNER */}
      <div className="max-w-4xl mx-auto mb-6 bg-white/60 border-4 border-orange-300 rounded-2xl p-4 shadow-lg">
        <button
          onClick={() => setShowScience(!showScience)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
          <PS51Icons.Science size={18} className="text-orange-700" />
          <p className="text-orange-700 font-black text-sm">THE SCIENCE (MIT · iCalmDog · Glasgow · Edinburgh)</p>
        </div>
          {showScience ? <ChevronUp className="w-4 h-4 text-orange-700" /> : <ChevronDown className="w-4 h-4 text-orange-700" />}
        </button>
        {showScience && (
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs text-amber-900">
            <div className="bg-yellow-100/70 border-2 border-orange-300 rounded-lg p-3">
              <p className="text-orange-800 font-bold mb-1">🧪 MIT — Nature 2019</p>
              <p>40Hz gamma therapy proven to clear amyloid plaques in mice. Now in active Alzheimer's human trials.</p>
            </div>
            <div className="bg-yellow-100/70 border-2 border-orange-300 rounded-lg p-3">
              <p className="text-orange-800 font-bold mb-1">🐾 iCalmDog RCT 2024</p>
              <p>68% reduction in reactive behaviour using 10Hz alpha tones. Recommended by 200+ vets worldwide.</p>
            </div>
            <div className="bg-yellow-100/70 border-2 border-orange-300 rounded-lg p-3">
              <p className="text-orange-800 font-bold mb-1">University of Glasgow</p>
              <p>Music therapy reduced shelter dog cortisol by 42%. Most-cited animal audio welfare study in Europe.</p>
            </div>
            <div className="bg-yellow-100/70 border-2 border-orange-300 rounded-lg p-3">
              <p className="text-orange-800 font-bold mb-1">University of Edinburgh</p>
              <p>40Hz gamma slowed canine cognitive decline in 6-week trial. 1 in 3 UK dogs has noise phobia.</p>
            </div>
          </div>
        )}
      </div>

      {/* WATCH TOGETHER TIP */}
      <div className="max-w-4xl mx-auto mb-6 bg-gradient-to-r from-orange-200 to-yellow-100 border-4 border-orange-400 rounded-2xl p-4 flex items-start gap-3 shadow-md">
        <PS51Icons.WatchTogether size={28} className="flex-shrink-0" style={{ color: '#b45309' }} />
        <div>
          <p className="text-orange-900 font-black text-sm mb-1">WATCH IT TOGETHER</p>
          <p className="text-amber-900 text-xs leading-relaxed">When you press play, a live frequency visualizer appears. Put your phone or cast to your TV near your pet — animals love the moving patterns. <span className="font-bold">Works through any speaker. No headphones needed.</span> You're both healing together.</p>
        </div>
      </div>

      {/* PROTOCOL CATEGORIES */}
      <div className="max-w-4xl mx-auto space-y-8">
        {Object.entries(PROTOCOLS).map(([catKey, cat]) => {
           const Icon = PS51Icons[cat.icon];
           return (
             <div key={catKey}>
               <div className="flex items-center gap-2 mb-4">
                 <Icon size={20} className="flex-shrink-0" style={{ color: cat.color }} />
                <h2 className="text-sm font-black" style={{ color: cat.color }}>{cat.label}</h2>
                {catKey === 'sports' && <span className="text-xs text-amber-700 font-normal">— these animals deserve care</span>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.items.map((item) => {
                  const isFree = FREE_PROTOCOLS.includes(item.key);
                  const isPremium = !isFree && !isSubscribed;
                  const ItemIcon = item.icon ? PS51Icons[item.icon] : null;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleSelect(item.key)}
                      className="p-4 border-3 bg-white/40 hover:bg-white/60 transition-all text-left rounded-2xl group relative shadow-md"
                      style={{ borderColor: item.color + '80' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {ItemIcon && <ItemIcon size={18} style={{ color: item.color, flexShrink: 0 }} />}
                          <p className="text-xs font-bold text-amber-700">{item.hz}</p>
                          {isFree && <span className="text-xs font-black text-green-700">FREE</span>}
                        </div>
                        {isPremium
                          ? <Lock className="w-4 h-4 text-amber-600" />
                          : <Play className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: item.color }} />
                        }
                      </div>
                      <p className="font-black text-amber-900 mb-1 text-sm">{item.name}</p>
                      <p className="text-xs text-amber-800">"{item.tagline}"</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="max-w-4xl mx-auto mt-10 pt-6 border-t-2 border-orange-300 text-center space-y-2">
        <p className="text-xs text-amber-800">
          Not a substitute for vet care. Works alongside treatment. No side effects.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="/PetSounds51Terms" className="text-xs text-amber-700 hover:text-orange-700 font-bold">Terms</a>
          <span className="text-amber-700">•</span>
          <a href="/PrivacyPolicy" className="text-xs text-amber-700 hover:text-orange-700 font-bold">Privacy</a>
          <span className="text-amber-700">•</span>
          <span className="text-xs text-amber-800 font-bold">10% to animal rescue 🐾</span>
        </div>
      </div>
    </div>
  );
}