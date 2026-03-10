import React, { useState, lazy, Suspense } from 'react';
import { ChevronDown, ChevronUp, Play, Brain, Zap, Heart } from 'lucide-react';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';

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
  }
};

export default function PetSounds51() {
  const [activeView, setActiveView] = useState('home');
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [showScience, setShowScience] = useState(false);

  const handleSelect = (protocolKey) => {
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
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <PetSounds51Icon8Bit size={48} animate={false} />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-cyan-400">PETSOUNDS51</h1>
            <p className="text-xs text-gray-500 font-mono">AI-POWERED ANIMAL HEALING FREQUENCIES</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-2 max-w-lg mx-auto">
          Evidence-based binaural frequencies for the things that actually keep pet owners up at night.
        </p>
        <p className="text-xs text-cyan-400 font-mono">Works offline • No side effects • 10% to animal rescue</p>
      </div>

      {/* SCIENCE BANNER */}
      <div className="max-w-4xl mx-auto mb-6 bg-gray-900/60 border border-cyan-500/30 rounded-xl p-4">
        <button
          onClick={() => setShowScience(!showScience)}
          className="w-full flex items-center justify-between"
        >
          <p className="text-cyan-400 font-black text-sm">📚 THE SCIENCE (MIT · Glasgow · Edinburgh · PDSA · 2019–2026)</p>
          {showScience ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-cyan-400" />}
        </button>
        {showScience && (
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs text-gray-400">
            <div className="bg-black/40 rounded-lg p-3">
              <p className="text-white font-bold mb-1">MIT → 2025 Human Trials Active</p>
              <p>40Hz gamma therapy (Nature 2019) now in active Alzheimer's human trials. University of Edinburgh Vet School 2025: slowed cognitive decline in dogs in 6-week trial.</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3">
              <p className="text-white font-bold mb-1">University of Glasgow Vet School</p>
              <p>Music therapy reduced shelter dog cortisol by 42%. Most-cited animal audio study in Europe. This is what "evidence-based" actually means.</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3">
              <p className="text-white font-bold mb-1">iCalmDog RCT 2024</p>
              <p>Alpha binaural (10Hz) randomised controlled trial: 68% reduction in reactive behaviour. Now recommended by 200+ UK vets as pre-medication alternative.</p>
            </div>
            <div className="bg-black/40 rounded-lg p-3">
              <p className="text-white font-bold mb-1">PDSA & BSAVA 2025–2026</p>
              <p>1 in 3 UK dogs has noise phobia. 1 in 4 rescue dogs show PTSD markers. 80% of dogs over 8 have arthritis. The need is enormous. The treatments are expensive. We're not.</p>
            </div>
          </div>
        )}
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
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleSelect(item.key)}
                    className="p-5 border-2 bg-black hover:bg-white/5 transition-all text-left rounded-xl group"
                    style={{ borderColor: item.color + '60' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-xs font-mono text-gray-500">{item.hz}</p>
                      <Play className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: item.color }} />
                    </div>
                    <p className="font-black text-white mb-1">{item.name}</p>
                    <p className="text-xs text-gray-500 italic">"{item.tagline}"</p>
                  </button>
                ))}
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