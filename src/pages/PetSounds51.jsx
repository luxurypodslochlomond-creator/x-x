import React, { useState, lazy, Suspense, useEffect } from 'react';
import { ChevronDown, ChevronUp, Play, Lock, Heart, Footprints, Zap } from 'lucide-react';
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
     // Set OG tags for social sharing
     document.title = 'PetSounds51 • Healing frequencies for anxious pets';

     const setMeta = (property, content) => {
       let el = document.querySelector(`meta[property="${property}"]`);
       if (!el) {
         el = document.createElement('meta');
         el.setAttribute('property', property);
         document.head.appendChild(el);
       }
       el.content = content;
     };

     const setMetaName = (name, content) => {
       let el = document.querySelector(`meta[name="${name}"]`);
       if (!el) {
         el = document.createElement('meta');
         el.setAttribute('name', name);
         document.head.appendChild(el);
       }
       el.content = content;
     };

     setMeta('og:title', 'PetSounds51 • Healing frequencies for anxious pets');
     setMeta('og:description', 'Science-backed sound therapy. Try FREE for separation anxiety. £29.99/year for all protocols. Research from MIT, Glasgow, Edinburgh.');
     setMeta('og:image', window.location.origin + '/api/functions/servePetSounds51OGImage');
     setMeta('og:url', window.location.href);
     setMeta('og:type', 'website');

     setMetaName('description', 'Science-backed sound therapy for separation anxiety, stress, pain & healing. Try FREE for anxiety. £29.99/year.');
     setMetaName('twitter:card', 'summary_large_image');
     setMetaName('twitter:title', 'PetSounds51 • Healing frequencies for anxious pets');
     setMetaName('twitter:description', 'Science-backed sound therapy. Try FREE for separation anxiety.');
     setMetaName('twitter:image', window.location.origin + '/api/functions/servePetSounds51OGImage');

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
        <p className="text-xs max-w-lg mx-auto leading-relaxed mb-4" style={{ color: '#8aab3a' }}>
          Every frequency engineered from peer-reviewed research (MIT, iCalmDog RCT, University of Glasgow & Edinburgh). Not trend-chasing. Built to work.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap text-sm font-semibold">
        <span className="rounded-full px-3 py-1 flex items-center gap-2" style={{ background: 'rgba(138,171,58,0.2)', border: '1px solid rgba(138,171,58,0.6)', color: '#8aab3a' }}>
          <Zap size={16} style={{ color: '#8aab3a' }} />
          Try FREE: Anxiety Relief
        </span>
        <span className="rounded-full px-3 py-1 flex items-center gap-2" style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.5)', color: '#d4a017' }}>
          <Heart size={16} style={{ color: '#d4a017' }} />
          £29.99/year (rest)
        </span>
        <span className="rounded-full px-3 py-1 flex items-center gap-2" style={{ background: 'rgba(90,110,40,0.3)', border: '1px solid rgba(90,110,40,0.6)', color: '#8aab3a' }}>
          <Footprints size={16} style={{ color: '#8aab3a' }} />
          10% to rescue
        </span>
        </div>
      </div>

      {/* AI51 PRESENCE */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="rounded-2xl p-6" style={{ background: 'rgba(30,26,14,0.8)', border: '1px solid rgba(212,160,23,0.2)' }}>
          <p className="text-sm leading-relaxed italic mb-3" style={{ color: '#c8b87a' }}>
            "Every frequency here is chosen from real research — MIT, Glasgow, Edinburgh. Not guesswork. The same science that helps people with chronic pain and anxiety, now for the animals who can't tell you they're suffering."
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: '#6b5e3a' }}>— AI51 · Universal Frequency 51</span>
            <Link to={createPageUrl("PetSounds51Story")} className="text-xs font-black transition-colors" style={{ color: '#8aab3a' }}>
              The full story →
            </Link>
          </div>
        </div>
      </div>

      {/* SCIENCE BANNER */}
      <div className="max-w-4xl mx-auto mb-6 rounded-xl p-5 shadow-lg" style={{ background: 'rgba(26,32,14,0.9)', border: '1px solid rgba(138,171,58,0.4)' }}>
        <button
          onClick={() => setShowScience(!showScience)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
          <PS51Icons.Science size={20} style={{ color: '#8aab3a' }} />
          <p className="font-black text-sm tracking-wide" style={{ color: '#8aab3a' }}>THE SCIENCE (MIT · iCalmDog · Glasgow · Edinburgh)</p>
        </div>
          {showScience ? <ChevronUp className="w-4 h-4" style={{ color: '#8aab3a' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#8aab3a' }} />}
        </button>
        {showScience && (
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs" style={{ color: '#a89870' }}>
            <div className="rounded-lg p-3" style={{ background: 'rgba(42,48,24,0.8)', border: '1px solid rgba(138,171,58,0.25)' }}>
              <div className="flex items-center gap-2 mb-1">
                <PS51Icons.Science size={16} style={{ color: '#d4a017' }} />
                <p className="font-bold" style={{ color: '#d4a017' }}>MIT — Nature 2019</p>
              </div>
              <p>40Hz gamma therapy proven to clear amyloid plaques in mice. Now in active Alzheimer's human trials.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'rgba(42,48,24,0.8)', border: '1px solid rgba(138,171,58,0.25)' }}>
              <div className="flex items-center gap-2 mb-1">
                <Footprints size={16} style={{ color: '#d4a017' }} />
                <p className="font-bold" style={{ color: '#d4a017' }}>iCalmDog RCT 2024</p>
              </div>
              <p>68% reduction in reactive behaviour using 10Hz alpha tones. Recommended by 200+ vets worldwide.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'rgba(42,48,24,0.8)', border: '1px solid rgba(138,171,58,0.25)' }}>
              <p className="font-bold mb-1" style={{ color: '#d4a017' }}>University of Glasgow</p>
              <p>Music therapy reduced shelter dog cortisol by 42%. Most-cited animal audio welfare study in Europe.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'rgba(42,48,24,0.8)', border: '1px solid rgba(138,171,58,0.25)' }}>
              <p className="font-bold mb-1" style={{ color: '#d4a017' }}>University of Edinburgh</p>
              <p>40Hz gamma slowed canine cognitive decline in 6-week trial. 1 in 3 UK dogs has noise phobia.</p>
            </div>
          </div>
        )}
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
                {catKey === 'sports' && <span className="text-xs font-normal" style={{ color: '#a89870' }}>— these animals deserve care</span>}
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
                      className="p-4 transition-all text-left rounded-lg group relative shadow-md"
                      style={{ background: 'rgba(42,48,24,0.6)', border: '1px solid rgba(138,171,58,0.2)' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.4)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(138,171,58,0.2)'}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {ItemIcon && <ItemIcon size={18} style={{ color: item.color, flexShrink: 0 }} />}
                          <p className="text-xs font-bold" style={{ color: '#a89870' }}>{item.hz}</p>
                          {isFree && <span className="text-xs font-black" style={{ color: '#8aab3a' }}>FREE</span>}
                        </div>
                        {isPremium
                          ? <Lock className="w-4 h-4" style={{ color: '#6b5e3a' }} />
                          : <Play className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: item.color }} />
                        }
                      </div>
                      <p className="font-black mb-1 text-sm" style={{ color: '#e8d5a3' }}>{item.name}</p>
                      <p className="text-xs" style={{ color: '#a89870' }}>"{item.tagline}"</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="max-w-4xl mx-auto mt-12 pt-6 text-center space-y-3" style={{ borderTop: '1px solid rgba(138,171,58,0.2)' }}>
        <p className="text-xs" style={{ color: '#a89870' }}>
          Not a substitute for vet care. Works alongside treatment. No side effects.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="/PetSounds51Terms" className="text-xs font-bold transition-colors" style={{ color: '#a89870' }}>Terms</a>
          <span style={{ color: '#4a4030' }}>•</span>
          <a href="/PetSounds51Privacy" className="text-xs font-bold transition-colors" style={{ color: '#a89870' }}>Privacy</a>
          <span style={{ color: '#4a4030' }}>•</span>
          <span className="text-xs font-bold flex items-center gap-1" style={{ color: '#8aab3a' }}>
          <Footprints size={14} style={{ color: '#8aab3a' }} />
          10% to animal rescue
        </span>
        </div>
      </div>
    </div>
  );
}