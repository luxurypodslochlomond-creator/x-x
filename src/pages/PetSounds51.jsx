import React, { useState, lazy, Suspense, useEffect } from 'react';
import { ChevronDown, ChevronUp, Play, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import PS51Paywall from '@/components/petsounds/PS51Paywall';
import PS51Icon, { PS51Icons } from '@/components/petsounds/PS51CustomIcons';


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
    <div className="min-h-screen text-white p-3 sm:p-4" style={{ background: 'linear-gradient(135deg, #1a200e 0%, #2a3018 40%, #1e1a0e 100%)' }}>
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="flex flex-col items-center mb-6">
          <PetSounds51Icon8Bit size={120} animate={true} />
          <h1 className="text-5xl sm:text-6xl font-black mt-4" style={{ color: '#d4a017', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(212,160,23,0.4)' }}>PetSounds51</h1>
        </div>
        <p className="font-bold text-xl mb-3 max-w-lg mx-auto" style={{ color: '#e8d5a3' }}>
          Leave it playing. Your best friend stays calm.
        </p>
        <p className="text-sm mb-6 max-w-lg mx-auto leading-relaxed" style={{ color: '#a89870' }}>
          Science-backed sound therapy for separation anxiety, stress, pain & healing — adaptive frequencies, real results. Through any speaker.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap text-sm font-semibold">
          <span className="rounded-full px-3 py-1" style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.5)', color: '#d4a017' }}>£29.99/year</span>
          <span className="rounded-full px-3 py-1" style={{ background: 'rgba(90,110,40,0.3)', border: '1px solid rgba(90,110,40,0.6)', color: '#8aab3a' }}>10% to rescue</span>
          <span className="rounded-full px-3 py-1" style={{ background: 'rgba(200,169,110,0.15)', border: '1px solid rgba(200,169,110,0.4)', color: '#c8a96e' }}>Safe & drug-free</span>
        </div>
      </div>

      {/* AI51 PRESENCE */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="rounded-2xl p-6" style={{ background: 'rgba(30,26,14,0.8)', border: '1px solid rgba(212,160,23,0.25)', boxShadow: '0 0 40px rgba(212,160,23,0.06)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center flex-shrink-0 text-white font-black text-sm">AI</div>
            <div>
              <p className="font-black text-xs tracking-widest mb-2" style={{ color: '#d4a017' }}>POWERED BY AI51</p>
              <p className="text-sm leading-relaxed" style={{ color: '#a89870' }}>
                Every frequency is selected using AI trained on MIT, Glasgow University, and Edinburgh research — not guesswork. The same technology that helps people with chronic pain and anxiety, adapted for animals. Science doing what science should.
              </p>
              <Link to={createPageUrl("PetSounds51Story")} className="inline-block mt-3 text-xs font-black transition-colors" style={{ color: '#8aab3a' }}>
                See the full story →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SCIENCE BANNER */}
      <div className="max-w-4xl mx-auto mb-6 bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-orange-500/40 rounded-xl p-5 shadow-lg backdrop-blur-sm">
        <button
          onClick={() => setShowScience(!showScience)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
          <PS51Icons.Science size={20} className="text-orange-400" />
          <p className="text-orange-300 font-black text-sm tracking-wide">THE SCIENCE (MIT · iCalmDog · Glasgow · Edinburgh)</p>
        </div>
          {showScience ? <ChevronUp className="w-4 h-4 text-orange-400" /> : <ChevronDown className="w-4 h-4 text-orange-400" />}
        </button>
        {showScience && (
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs text-gray-300">
            <div className="bg-slate-700/50 border border-orange-500/30 rounded-lg p-3">
              <p className="text-orange-300 font-bold mb-1">🧪 MIT — Nature 2019</p>
              <p>40Hz gamma therapy proven to clear amyloid plaques in mice. Now in active Alzheimer's human trials.</p>
            </div>
            <div className="bg-slate-700/50 border border-orange-500/30 rounded-lg p-3">
              <p className="text-orange-300 font-bold mb-1">🐾 iCalmDog RCT 2024</p>
              <p>68% reduction in reactive behaviour using 10Hz alpha tones. Recommended by 200+ vets worldwide.</p>
            </div>
            <div className="bg-slate-700/50 border border-orange-500/30 rounded-lg p-3">
              <p className="text-orange-300 font-bold mb-1">University of Glasgow</p>
              <p>Music therapy reduced shelter dog cortisol by 42%. Most-cited animal audio welfare study in Europe.</p>
            </div>
            <div className="bg-slate-700/50 border border-orange-500/30 rounded-lg p-3">
              <p className="text-orange-300 font-bold mb-1">University of Edinburgh</p>
              <p>40Hz gamma slowed canine cognitive decline in 6-week trial. 1 in 3 UK dogs has noise phobia.</p>
            </div>
          </div>
        )}
      </div>

      {/* WATCH TOGETHER TIP */}
      <div className="max-w-4xl mx-auto mb-6 bg-gradient-to-br from-slate-800 to-slate-700 border border-green-500/40 rounded-xl p-5 flex items-start gap-4 shadow-lg">
        <PS51Icons.WatchTogether size={32} className="flex-shrink-0" style={{ color: '#22c55e' }} />
        <div>
          <p className="text-green-300 font-black text-sm mb-2 tracking-wide">WATCH IT TOGETHER</p>
          <p className="text-gray-300 text-xs leading-relaxed">When you press play, a live frequency visualizer appears. Put your phone or cast to your TV near your pet — animals love the moving patterns. <span className="font-bold text-white">Works through any speaker. No headphones needed.</span> You're both healing together.</p>
        </div>
      </div>

      {/* PROTOCOL CATEGORIES */}
      <div className="max-w-4xl mx-auto space-y-8">
        {Object.entries(PROTOCOLS).map(([catKey, cat]) => {
           const Icon = PS51Icons[cat.icon];
           return (
             <div key={catKey}>
               <div className="flex items-center gap-3 mb-4">
                 <Icon size={22} className="flex-shrink-0" style={{ color: cat.color }} />
                <h2 className="text-sm font-black tracking-wide" style={{ color: cat.color }}>{cat.label}</h2>
                {catKey === 'sports' && <span className="text-xs text-gray-400 font-normal">— these animals deserve care</span>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cat.items.map((item) => {
                  const isFree = FREE_PROTOCOLS.includes(item.key);
                  const isPremium = !isFree && !isSubscribed;
                  const ItemIcon = item.icon ? PS51Icons[item.icon] : null;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleSelect(item.key)}
                      className="p-4 border border-slate-600 bg-slate-800/50 hover:bg-slate-800 transition-all text-left rounded-lg group relative shadow-md hover:shadow-lg hover:border-slate-500"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {ItemIcon && <ItemIcon size={18} style={{ color: item.color, flexShrink: 0 }} />}
                          <p className="text-xs font-bold text-gray-400">{item.hz}</p>
                          {isFree && <span className="text-xs font-black text-green-400">FREE</span>}
                        </div>
                        {isPremium
                          ? <Lock className="w-4 h-4 text-gray-500" />
                          : <Play className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: item.color }} />
                        }
                      </div>
                      <p className="font-black text-white mb-1 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">"{item.tagline}"</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="max-w-4xl mx-auto mt-12 pt-6 border-t border-slate-700 text-center space-y-3">
        <p className="text-xs text-gray-400">
          Not a substitute for vet care. Works alongside treatment. No side effects.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="/PetSounds51Terms" className="text-xs text-gray-400 hover:text-orange-400 font-bold transition-colors">Terms</a>
          <span className="text-gray-600">•</span>
          <a href="/PetSounds51Privacy" className="text-xs text-gray-400 hover:text-orange-400 font-bold transition-colors">Privacy</a>
          <span className="text-gray-600">•</span>
          <span className="text-xs text-gray-400 font-bold">10% to animal rescue 🐾</span>
        </div>
      </div>
    </div>
  );
}