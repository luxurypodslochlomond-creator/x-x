import React, { useState, lazy, Suspense, useEffect } from 'react';
import { ChevronDown, ChevronUp, Play, Lock, Heart, Footprints, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import PS51Paywall from '@/components/petsounds/PS51Paywall';
import PS51Icon, { PS51Icons } from '@/components/petsounds/PS51CustomIcons';
import { verifyPS51Subscription } from '@/functions/verifyPS51Subscription';
import { sendPS51ConfirmationEmail } from '@/functions/sendPS51ConfirmationEmail';
import { getPS51Session } from '@/functions/getPS51Session';


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
   const [showRestoreAccess, setShowRestoreAccess] = useState(false);
   const [restoreEmail, setRestoreEmail] = useState('');
   const [restoreLoading, setRestoreLoading] = useState(false);
   const [restoreError, setRestoreError] = useState('');

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

     setMeta('og:title', 'PetSounds51 • Science-backed calm for anxious pets');
     setMeta('og:description', 'Slow-tempo, species-tuned audio that genuinely calms anxious pets. Peer-reviewed research. Try FREE. £29.99/year for all protocols.');
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
     const sessionId = params.get('session_id');
     if (params.get('subscribed') === 'true' && sessionId) {
       // Fetch email from Stripe session
       getPS51Session({ sessionId }).then(res => {
         const email = res.data?.email;
         if (email) {
           setIsSubscribed(true);
           localStorage.setItem('ps51_subscribed', '1');
           localStorage.setItem('ps51_email', email);
           sendPS51ConfirmationEmail({ email }).catch(() => {});
         }
       }).catch(() => {
         // Still mark as subscribed even if fetch fails
         setIsSubscribed(true);
         localStorage.setItem('ps51_subscribed', '1');
       });
       window.history.replaceState({}, '', window.location.pathname);
     }

     // Check localStorage for existing subscription
     if (localStorage.getItem('ps51_subscribed')) {
       const savedEmail = localStorage.getItem('ps51_email');
       if (savedEmail) {
         // Verify subscription is still active with backend
         verifyPS51Subscription({ email: savedEmail })
           .then(res => {
             if (res.data?.subscribed) {
               setIsSubscribed(true);
             } else {
               localStorage.removeItem('ps51_subscribed');
               localStorage.removeItem('ps51_email');
             }
           })
           .catch(err => {
             // If verification fails (network error), trust localStorage for now
             setIsSubscribed(true);
           });
       }
     }
   }, []);

  const handleRestoreAccess = async () => {
    if (!restoreEmail.trim()) return;
    setRestoreLoading(true);
    setRestoreError('');
    try {
      const res = await verifyPS51Subscription({ email: restoreEmail.trim() });
      if (res.data?.subscribed) {
        localStorage.setItem('ps51_subscribed', '1');
        localStorage.setItem('ps51_email', restoreEmail.trim());
        setIsSubscribed(true);
        setShowRestoreAccess(false);
      } else {
        setRestoreError('No active subscription found for that email.');
      }
    } catch {
      setRestoreError('Could not verify — please try again.');
    }
    setRestoreLoading(false);
  };

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
          They can't tell you they're struggling. You can see it though.
        </p>
        <p className="text-sm mb-6 max-w-lg mx-auto leading-relaxed" style={{ color: '#a89870' }}>
          Sound tuned to how your pet actually hears — not generic music, not white noise. 
          Audio built from real research that genuinely calms anxious animals. Just leave it playing.
        </p>
        <p className="text-xs max-w-lg mx-auto leading-relaxed mb-4" style={{ color: '#8aab3a' }}>
          No side effects. Works alongside your vet. Free protocol available right now — no signup needed.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap text-sm font-semibold">
        <button onPointerDown={(e) => { e.preventDefault(); handleSelect('separation'); }} className="rounded-full px-3 py-1 flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer select-none touch-manipulation" style={{ background: 'rgba(138,171,58,0.2)', border: '1px solid rgba(138,171,58,0.6)', color: '#8aab3a' }}>
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

      {/* RESTORE ACCESS */}
      {!isSubscribed && (
        <div className="max-w-4xl mx-auto mb-6 text-center">
          {!showRestoreAccess ? (
            <button onClick={() => setShowRestoreAccess(true)} className="text-xs underline" style={{ color: '#6b5e3a' }}>
              Already subscribed? Restore access on this device →
            </button>
          ) : (
            <div className="rounded-xl p-4 inline-flex flex-col items-center gap-3 max-w-sm mx-auto" style={{ background: 'rgba(42,48,24,0.8)', border: '1px solid rgba(212,160,23,0.3)' }}>
              <p className="text-xs font-bold" style={{ color: '#d4a017' }}>Enter your subscription email</p>
              <input
                type="email"
                placeholder="your@email.com"
                value={restoreEmail}
                onChange={e => setRestoreEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRestoreAccess()}
                className="w-full px-3 py-2 rounded-lg text-sm bg-black/40 border text-white placeholder-gray-600 focus:outline-none"
                style={{ borderColor: 'rgba(212,160,23,0.4)' }}
              />
              {restoreError && <p className="text-xs text-red-400">{restoreError}</p>}
              <div className="flex gap-2">
                <button onClick={handleRestoreAccess} disabled={restoreLoading} className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: '#d4a017', color: '#1a1a0a' }}>
                  {restoreLoading ? 'Checking...' : 'Restore Access'}
                </button>
                <button onClick={() => setShowRestoreAccess(false)} className="px-4 py-2 rounded-lg text-sm" style={{ color: '#a89870' }}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI51 PRESENCE */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="rounded-2xl p-6" style={{ background: 'rgba(30,26,14,0.8)', border: '1px solid rgba(212,160,23,0.2)' }}>
          <p className="text-sm leading-relaxed italic mb-3" style={{ color: '#c8b87a' }}>
            "We built this because animals suffer silently and there's real science that helps — and almost nobody had made it accessible. The free protocol exists because your pet's anxiety matters whether you pay or not. The subscription keeps the lights on and funds animal rescue. If it helps, come back. If it doesn't, we want to know why."
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: '#6b5e3a' }}>— PetSounds51 · Universal Frequency 51 CIC</span>
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
              <p className="leading-relaxed">Slow tempo music (under 60 BPM), simple compositions with no heavy percussion measurably calms dogs. Published research has shown this reduces anxiety in acutely stressful situations — with studies finding over 70% of shelter dogs and 80% of home dogs showed fewer anxiety behaviours.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'rgba(42,48,24,0.8)', border: '1px solid rgba(138,171,58,0.25)' }}>
              <p className="font-bold mb-1" style={{ color: '#d4a017' }}>✅ Species hearing matters</p>
              <p className="leading-relaxed">Dogs hear up to 65,000 Hz. Cats up to 79,000 Hz. Horses up to 33,000 Hz. Peer-reviewed research has shown that removing species-specific agitating frequencies is more effective than generic "relaxing music". We tune each session to your pet's hearing profile.</p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'rgba(42,48,24,0.8)', border: '1px solid rgba(138,171,58,0.25)' }}>
              <p className="font-bold mb-1" style={{ color: '#8aab3a' }}>ℹ️ How to use it</p>
              <p className="leading-relaxed">This works best as complementary care alongside your vet — not instead of them. Leave it playing in the background. No headphones needed — isochronic tones and monaural beats work in open air through any speaker or TV. The calming effect builds over time with regular use.</p>
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



      {/* START HERE BANNER — for first timers */}
      <div className="max-w-4xl mx-auto mb-6 rounded-2xl p-5 text-center" style={{ background: 'rgba(6,182,212,0.08)', border: '2px solid rgba(6,182,212,0.3)' }}>
        <p className="font-black text-lg mb-1" style={{ color: '#e8d5a3' }}>👇 Pick what your pet is going through</p>
        <p className="text-sm" style={{ color: '#a89870' }}>The <span style={{ color: '#8aab3a', fontWeight: 'bold' }}>FREE</span> one is Separation Anxiety — great if they're home alone. Just press play and leave it on.</p>
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
                  const isUnlocked = isFree || isSubscribed;
                  const ItemIcon = item.icon ? PS51Icons[item.icon] : null;
                  return (
                    <button
                      key={item.key}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        handleSelect(item.key);
                      }}
                      className="p-4 transition-all text-left rounded-xl group relative shadow-md active:scale-95 select-none touch-manipulation"
                      style={{
                        background: isUnlocked
                          ? `linear-gradient(135deg, rgba(42,48,24,0.9), rgba(30,36,16,0.95))`
                          : 'rgba(22,26,12,0.5)',
                        border: isUnlocked
                          ? `1px solid ${item.color}55`
                          : '1px solid rgba(138,171,58,0.15)',
                        boxShadow: isUnlocked ? `0 0 20px ${item.color}10` : 'none',
                        opacity: isPremium ? 0.7 : 1,
                      }}
                    >
                      {/* TOP ROW */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {ItemIcon && <ItemIcon size={20} style={{ color: isUnlocked ? item.color : '#6b5e3a', flexShrink: 0 }} />}
                          {isFree && (
                            <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: 'rgba(138,171,58,0.2)', color: '#8aab3a' }}>FREE</span>
                          )}
                          {isSubscribed && !isFree && (
                            <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: `${item.color}20`, color: item.color }}>PREMIUM</span>
                          )}
                        </div>
                        {isPremium
                          ? <Lock className="w-4 h-4" style={{ color: '#6b5e3a' }} />
                          : <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${item.color}25` }}>
                              <Play className="w-4 h-4" style={{ color: item.color }} />
                            </div>
                        }
                      </div>

                      {/* CONTENT */}
                      <p className="font-black mb-1" style={{ color: isUnlocked ? '#e8d5a3' : '#8a7a5a', fontSize: '0.95rem' }}>{item.name}</p>
                      <p className="text-xs mb-2 italic" style={{ color: isUnlocked ? '#a89870' : '#6b5e3a' }}>"{item.tagline}"</p>
                      <p className="text-xs leading-snug" style={{ color: isUnlocked ? '#8aab3a' : '#5a6b30' }}>{item.desc}</p>

                      {/* PREMIUM UNLOCK HINT */}
                      {isPremium && (
                        <p className="text-xs font-bold mt-3" style={{ color: '#d4a017' }}>Tap to unlock — £29.99/year →</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* HUMAN MOMENT — the thing that makes you feel cared about */}
      <div className="max-w-4xl mx-auto mt-10 mb-4 rounded-2xl p-5 text-center" style={{ background: 'rgba(212,160,23,0.06)', border: '1px solid rgba(212,160,23,0.2)' }}>
        <p className="text-sm leading-relaxed" style={{ color: '#c8b87a' }}>
          💛 If the free protocol helped your pet — even a little — please share it with someone whose animal is struggling. 
          It costs nothing. And if you ever want to tell us what you noticed, we genuinely want to hear it.
        </p>
        <p className="text-xs mt-2" style={{ color: '#6b5e3a' }}>10% of every subscription goes directly to animal rescue through UF51 CIC.</p>
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
          <p className="font-black text-sm mb-1" style={{ color: '#e8d5a3' }}>Peer-reviewed</p>
          <p className="text-xs" style={{ color: '#a89870' }}>published research</p>
        </Link>
      </div>

      {/* FOOTER */}
      <div className="max-w-4xl mx-auto pt-6 text-center space-y-3" style={{ borderTop: '1px solid rgba(138,171,58,0.2)' }}>
        <Link to={createPageUrl("PetSounds51Whitepaper")} className="inline-block text-xs font-bold underline mb-2" style={{ color: '#8aab3a' }}>
          🔬 Read our Science & Methodology Whitepaper →
        </Link>
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