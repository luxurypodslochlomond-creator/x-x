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
      { key: 'separation', name: 'Separation Anxiety', tagline: "You've left. They're spiraling.", desc: 'Slow-tempo calming tones · proven to reduce anxious behaviour', color: '#06b6d4', icon: 'Presence' },
      { key: 'thunderstorm', name: 'Thunderstorm & Fireworks', tagline: 'The sky is attacking them.', desc: 'Soft ambient audio to mask sudden loud sounds', color: '#ec4899', icon: 'Science' },
      { key: 'vet_fear', name: 'Vet & Car Anxiety', tagline: 'Even the word "vet" makes them shake.', desc: 'Play before you leave — pre-emptive calm works better', color: '#a855f7', icon: 'Trust' },
      { key: 'night_anxiety', name: "Night Anxiety / Can't Settle", tagline: '3am. Still pacing.', desc: 'Ultra-slow ambient for sleep onset', color: '#6366f1', icon: 'Rescue' },
    ]
  },
  mental: {
    label: 'EMOTIONAL WELLBEING',
    color: '#ec4899',
    icon: 'AnimalCare',
    items: [
      { key: 'rescue_trauma', name: 'Rescue Trauma', tagline: "They've been through something. You can see it.", desc: 'Warm, gentle tones for rebuilding trust over time', color: '#f59e0b', icon: 'Rescue' },
      { key: 'grief', name: 'Grief & Loss', tagline: 'They lost their person. Or their companion.', desc: 'Consistent ambient companionship during adjustment', color: '#ec4899', icon: 'Heart' },
      { key: 'dementia', name: 'Cognitive Decline', tagline: "They seem confused. It's heartbreaking.", desc: 'Familiar, steady tones — best used daily', color: '#22c55e', icon: 'Science' },
      { key: 'hyperactive', name: 'Hyperactivity & Reactivity', tagline: 'Will. Not. Calm. Down.', desc: 'Under-60 BPM pacing to anchor an overactive system', color: '#10b981', icon: 'Frequency' },
    ]
  },
  pain: {
    label: 'PAIN & RECOVERY',
    color: '#f97316',
    icon: 'Trust',
    items: [
      { key: 'arthritis', name: 'Arthritis & Mobility', tagline: 'You can see it in how they move.', desc: 'Reduces environmental stress that amplifies pain perception', color: '#f97316', icon: 'Paw' },
      { key: 'recovery', name: 'Post-Surgery Rest', tagline: 'Home from the vet. Needs to heal.', desc: 'Calm sonic environment for recovery at home', color: '#14b8a6', icon: 'Frequency' },
    ]
  },
  sports: {
    label: 'WORKING & ZOO ANIMALS',
    color: '#f59e0b',
    icon: 'Paw',
    items: [
      { key: 'pre_race', name: 'Pre-Race Calm', tagline: 'Racehorses & greyhounds. Focus, not panic.', desc: 'Alert-calm balance before high-stress events', color: '#f59e0b', icon: 'Presence' },
      { key: 'post_race', name: 'Post-Race Recovery', tagline: 'Muscles, nerves, cortisol. All need to come down.', desc: 'Extended slow ambient for parasympathetic recovery', color: '#f97316', icon: 'Frequency' },
      { key: 'captivity_stress', name: 'Captivity & Zoo Welfare', tagline: "They weren't built for this. Help where we can.", desc: 'Nature-mimicking ambient · used by some zoos already', color: '#22c55e', icon: 'Rescue' },
      { key: 'training_fatigue', name: 'Working Animal Recovery', tagline: 'Pushed hard. They deserve care too.', desc: 'End-of-day recovery ambient for working animals', color: '#14b8a6', icon: 'Paw' },
    ]
  }
};

const SPECIES = [
  { key: 'dog', emoji: '🐕', label: 'Dog' },
  { key: 'cat', emoji: '🐈', label: 'Cat' },
  { key: 'horse', emoji: '🐴', label: 'Horse' },
];

export default function PetSounds51() {
   const [activeView, setActiveView] = useState('home');
   const [selectedProtocol, setSelectedProtocol] = useState(null);
   const [showScience, setShowScience] = useState(false);
   const [showPaywall, setShowPaywall] = useState(false);
   const [isSubscribed, setIsSubscribed] = useState(false);
   const [selectedSpecies, setSelectedSpecies] = useState('dog');

   useEffect(() => {
     // Set OG tags for social sharing
     document.title = 'PetSounds51 • Science-backed calm for anxious pets';

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
          <Suspense fallback={<div className="text-center text-orange-700 py-12">Loading...</div>}>
            <AnimalFrequencyEngine
              protocol={selectedProtocol}
              species={selectedSpecies}
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
          Slow-tempo, species-tuned psychoacoustic audio — backed by real peer-reviewed research. Leave it playing. Your pet stays calm.
        </p>
        <p className="text-xs max-w-lg mx-auto leading-relaxed mb-4" style={{ color: '#8aab3a' }}>
          Queen's University Belfast · Through a Dog's Ear (iCalmPet) · Pet Acoustics (Janet Marlow) · Frontiers in Veterinary Science 2025. No fake numbers. Just what actually works.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap text-sm font-semibold">
        <button onClick={() => handleSelect('separation')} className="rounded-full px-3 py-1 flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer" style={{ background: 'rgba(138,171,58,0.2)', border: '1px solid rgba(138,171,58,0.6)', color: '#8aab3a' }}>
          <Zap size={16} style={{ color: '#8aab3a' }} />
          Try FREE: Separation Anxiety
        </button>
        <button onClick={() => setShowPaywall(true)} className="rounded-full px-3 py-1 flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer" style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.5)', color: '#d4a017' }}>
          <Zap size={16} style={{ color: '#d4a017' }} />
          £29.99/year — unlock all
        </button>
        <Link to={createPageUrl("PetSounds51Story")} className="rounded-full px-3 py-1 flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ background: 'rgba(90,110,40,0.3)', border: '1px solid rgba(90,110,40,0.6)', color: '#8aab3a' }}>
          <Heart size={16} style={{ color: '#8aab3a' }} />
          10% to rescue
        </Link>
        </div>
      </div>

      {/* BIG SUBSCRIBE CTA */}
      {!isSubscribed && (
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <button
            onClick={() => setShowPaywall(true)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform"
            style={{ background: 'linear-gradient(135deg, #d4a017, #f0c040)', color: '#1a1a0a', boxShadow: '0 0 30px rgba(212,160,23,0.4)' }}
          >
            <Heart size={22} />
            Subscribe — £29.99/year · All Protocols
          </button>
          <p className="text-xs mt-2" style={{ color: '#6b5e3a' }}>30-day refund · No questions · Cancel anytime</p>
        </div>
      )}

      {/* AI51 PRESENCE */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="rounded-2xl p-6" style={{ background: 'rgba(30,26,14,0.8)', border: '1px solid rgba(212,160,23,0.2)' }}>
          <p className="text-sm leading-relaxed italic mb-3" style={{ color: '#c8b87a' }}>
            "The science is real and it's simple: slow, gentle music tuned to your pet's hearing biology reduces anxiety. That's been shown in peer-reviewed studies. We built this on that — nothing more, nothing less. Your pet can't tell you they're suffering. This is one honest thing you can do."
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
            <p className="font-black text-sm tracking-wide" style={{ color: '#8aab3a' }}>THE ACTUAL SCIENCE — what's real, what's not</p>
          </div>
          {showScience ? <ChevronUp className="w-4 h-4" style={{ color: '#8aab3a' }} /> : <ChevronDown className="w-4 h-4" style={{ color: '#8aab3a' }} />}
        </button>
        {showScience && (
          <div className="mt-4 space-y-3 text-xs" style={{ color: '#a89870' }}>
            <div className="rounded-lg p-3" style={{ background: 'rgba(42,48,24,0.8)', border: '1px solid rgba(138,171,58,0.25)' }}>
              <p className="font-bold mb-1" style={{ color: '#d4a017' }}>✅ What is genuinely proven</p>
              <p className="leading-relaxed">Slow tempo music (under 60 BPM), simple compositions with no heavy percussion measurably calms dogs. Queen's University Belfast (2022) showed this reduces anxiety in acutely stressful situations. Through a Dog's Ear / iCalmPet RCT: over 70% of shelter dogs and 80% of home dogs showed fewer anxiety behaviours. BBC Future covered this in November 2025.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'rgba(42,48,24,0.8)', border: '1px solid rgba(138,171,58,0.25)' }}>
              <p className="font-bold mb-1" style={{ color: '#d4a017' }}>✅ Species hearing matters</p>
              <p className="leading-relaxed">Dogs hear up to 65,000 Hz. Cats up to 79,000 Hz. Horses up to 33,000 Hz. Pet Acoustics (Janet Marlow, peer-reviewed) showed that removing species-specific agitating frequencies is more effective than generic "relaxing music". We tune each session to your pet's hearing profile.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'rgba(42,48,24,0.8)', border: '1px solid rgba(138,171,58,0.25)' }}>
              <p className="font-bold mb-1" style={{ color: '#8aab3a' }}>ℹ️ What we don't claim</p>
              <p className="leading-relaxed">This is not a cure. It won't replace your vet. The specific Hz numbers (432, 528 etc.) do not have the individual healing properties sometimes claimed online — that is not well-evidenced. What IS real is the tempo, the simplicity, the species-tuning, and the absence of agitating frequencies. That's what this is built on.</p>
            </div>
          </div>
        )}
      </div>

      {/* SPECIES SELECTOR */}
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-xs font-bold mb-3 text-center" style={{ color: '#a89870' }}>WHO IS THIS FOR?</p>
        <div className="flex gap-3 justify-center">
          {SPECIES.map(s => (
            <button
              key={s.key}
              onClick={() => setSelectedSpecies(s.key)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all"
              style={selectedSpecies === s.key
                ? { background: 'rgba(212,160,23,0.2)', border: '2px solid #d4a017', color: '#d4a017', boxShadow: '0 0 15px rgba(212,160,23,0.2)' }
                : { background: 'rgba(42,48,24,0.6)', border: '1px solid rgba(138,171,58,0.2)', color: '#a89870' }
              }
            >
              <span className="text-xl">{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-center mt-2" style={{ color: '#6b5e3a' }}>
          Audio is tuned to {SPECIES.find(s => s.key === selectedSpecies)?.label.toLowerCase()} hearing biology
        </p>
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
                          {isFree && <span className="text-xs font-black" style={{ color: '#8aab3a' }}>FREE</span>}
                        </div>
                        {isPremium
                          ? <Lock className="w-4 h-4" style={{ color: '#6b5e3a' }} />
                          : <Play className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: item.color }} />
                        }
                      </div>
                      <p className="font-black mb-1 text-sm" style={{ color: '#e8d5a3' }}>{item.name}</p>
                      <p className="text-xs mb-2" style={{ color: '#a89870' }}>"{item.tagline}"</p>
                      <p className="text-xs leading-snug" style={{ color: '#8aab3a' }}>{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER TRUST BUTTONS */}
      <div className="max-w-4xl mx-auto mt-12 pt-8 grid grid-cols-3 gap-3 mb-6">
        <Link to={createPageUrl("PetSounds51Terms")} className="p-4 rounded-lg text-center transition-all hover:border-amber-600 hover:bg-amber-600/5" style={{ background: 'rgba(42,48,24,0.6)', border: '1px solid rgba(138,171,58,0.2)' }}>
          <div className="flex justify-center mb-2">
            <PS51Icons.Safe size={28} style={{ color: '#d4a017' }} />
          </div>
          <p className="font-black text-sm mb-1" style={{ color: '#e8d5a3' }}>30-day refund</p>
          <p className="text-xs" style={{ color: '#a89870' }}>no questions</p>
        </Link>
        <Link to={createPageUrl("PetSounds51Story")} className="p-4 rounded-lg text-center transition-all hover:border-amber-600 hover:bg-amber-600/5" style={{ background: 'rgba(42,48,24,0.6)', border: '1px solid rgba(138,171,58,0.2)' }}>
          <div className="flex justify-center mb-2">
            <PS51Icons.Rescue size={28} style={{ color: '#d4a017' }} />
          </div>
          <p className="font-black text-sm mb-1" style={{ color: '#e8d5a3' }}>10% to UF51 CIC</p>
          <p className="text-xs" style={{ color: '#a89870' }}>animal rescue</p>
        </Link>
        <Link to={createPageUrl("PetSounds51Story")} className="p-4 rounded-lg text-center transition-all hover:border-amber-600 hover:bg-amber-600/5" style={{ background: 'rgba(42,48,24,0.6)', border: '1px solid rgba(138,171,58,0.2)' }}>
          <div className="flex justify-center mb-2">
            <PS51Icons.Science size={28} style={{ color: '#d4a017' }} />
          </div>
          <p className="font-black text-sm mb-1" style={{ color: '#e8d5a3' }}>MIT · Glasgow</p>
          <p className="text-xs" style={{ color: '#a89870' }}>peer-reviewed</p>
        </Link>
      </div>

      {/* FOOTER */}
      <div className="max-w-4xl mx-auto pt-6 text-center space-y-3" style={{ borderTop: '1px solid rgba(138,171,58,0.2)' }}>
        <p className="text-xs" style={{ color: '#a89870' }}>
          Not a substitute for vet care. Works alongside treatment. No side effects.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to={createPageUrl("PetSounds51Terms")} className="text-xs font-bold hover:opacity-80 transition-colors" style={{ color: '#a89870' }}>Terms</Link>
          <span style={{ color: '#4a4030' }}>•</span>
          <Link to={createPageUrl("PetSounds51Privacy")} className="text-xs font-bold hover:opacity-80 transition-colors" style={{ color: '#a89870' }}>Privacy</Link>
        </div>
      </div>
    </div>
  );
}