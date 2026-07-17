import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Heart, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import { PS51Icons } from '@/components/petsounds/PS51CustomIcons';
import PS51Paywall from '@/components/petsounds/PS51Paywall';

const PROBLEMS = [
  { Icon: PS51Icons.Science,   color: '#ec4899', title: 'Thunderstorms & Fireworks',  desc: "They're terrified. You feel helpless watching them." },
  { Icon: PS51Icons.Heart,     color: '#06b6d4', title: 'Separation Anxiety',          desc: "You leave for work. They fall apart. Every single day." },
  { Icon: PS51Icons.Trust,     color: '#a855f7', title: 'Vet & Car Trips',             desc: "Even picking up the lead causes a full panic response." },
  { Icon: PS51Icons.Frequency, color: '#6366f1', title: "Can't Settle at Night",       desc: "3am. Still pacing. You haven't slept properly in weeks." },
  { Icon: PS51Icons.Rescue,    color: '#f59e0b', title: 'Rescue Trauma',               desc: "They've been through something. You can see it in their eyes." },
  { Icon: PS51Icons.Paw,       color: '#f97316', title: 'Arthritis & Pain',            desc: "Stress makes pain worse. Calm sound reduces cortisol." },
];

const WHAT_YOU_GET = [
  { Icon: PS51Icons.Frequency, text: '14 science-backed audio protocols — not generic "relaxing music"' },
  { Icon: PS51Icons.Science,   text: 'Tuned to your pet\'s hearing biology (dogs, cats, horses hear differently)' },
  { Icon: PS51Icons.Speaker,   text: 'Works on any speaker, TV or laptop — no headphones, no effort' },
  { Icon: PS51Icons.Trust,     text: 'Leave it playing in the background. That\'s it. That\'s all you do.' },
  { Icon: PS51Icons.Heart,     text: '10% of every subscription goes to animal rescue via UF51 CIC' },
  { Icon: PS51Icons.Safe,      text: '30-day full refund if it doesn\'t help. No questions.' },
];

export default function PetSounds51Landing() {
  const [showPaywall, setShowPaywall] = useState(false);

  if (showPaywall) {
    return <PS51Paywall onClose={() => setShowPaywall(false)} />;
  }

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #1a200e 0%, #2a3018 40%, #1e1a0e 100%)' }}>

      {/* HERO */}
      <div className="max-w-2xl mx-auto px-4 pt-12 pb-8 text-center">
        <div className="flex flex-col items-center mb-5">
          <PetSounds51Icon8Bit size={90} animate={true} />
          <h1 className="text-5xl sm:text-6xl font-black mt-4" style={{ color: '#d4a017', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(212,160,23,0.4)' }}>
            PetSounds51
          </h1>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black mb-3 leading-tight" style={{ color: '#e8d5a3' }}>
          It's 11pm. There's a storm.<br />Your dog is shaking and you feel helpless.
        </h2>
        <p className="text-base mb-2 leading-relaxed" style={{ color: '#a89870' }}>
          Press play. That's it. Purpose-built sound tuned specifically to how your pet hears — 
          not a generic playlist, not white noise. Built by a pet owner, powered by real research.
        </p>
        <p className="text-xs mb-6" style={{ color: '#8aab3a' }}>
          Dogs showed fewer anxiety behaviours in peer-reviewed studies (Wells, Queen's Belfast) · No side effects · Works alongside your vet
        </p>

        {/* PRICE ANCHOR — show value immediately */}
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mb-6" style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)' }}>
          <span className="text-2xl font-black" style={{ color: '#d4a017' }}>£29.99/year</span>
          <span style={{ color: '#6b5e3a' }}>·</span>
          <span className="text-sm font-bold" style={{ color: '#a89870' }}>8p a day</span>
          <span style={{ color: '#6b5e3a' }}>·</span>
          <span className="text-sm font-bold" style={{ color: '#a89870' }}>less than one treat bag</span>
        </div>

        {/* TWO CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => setShowPaywall(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg shadow-xl transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #d4a017, #f0c040)', color: '#1a1a0a', boxShadow: '0 0 30px rgba(212,160,23,0.4)' }}
          >
            <Heart size={20} />
            Start Now — £29.99/year
          </button>
          <Link
            to={createPageUrl("PetSounds51")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black text-base transition-transform hover:scale-105"
            style={{ background: 'rgba(138,171,58,0.15)', border: '2px solid #8aab3a', color: '#8aab3a' }}
          >
            <Zap size={18} />
            Try FREE first
          </Link>
        </div>
        <p className="text-xs mt-2" style={{ color: '#6b5e3a' }}>30-day refund · No questions · Apple Pay &amp; Google Pay accepted</p>
      </div>

      {/* THE PROBLEM — with PS51 icons */}
      <div className="max-w-2xl mx-auto px-4 mb-10">
        <h3 className="text-center font-black text-xs tracking-widest mb-5" style={{ color: '#8aab3a' }}>
          DOES ANY OF THIS SOUND FAMILIAR?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROBLEMS.map(({ Icon, color, title, desc }, i) => (
            <div key={i} className="p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(42,48,24,0.7)', border: '1px solid rgba(138,171,58,0.2)' }}>
              <Icon size={22} style={{ color, flexShrink: 0, marginTop: 2 }} />
              <div>
                <p className="font-black text-sm mb-1" style={{ color: '#e8d5a3' }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#a89870' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY IT WORKS */}
      <div className="max-w-2xl mx-auto px-4 mb-10 rounded-2xl p-6" style={{ background: 'rgba(30,26,14,0.9)', border: '1px solid rgba(212,160,23,0.25)' }}>
        <h3 className="font-black text-xs tracking-widest mb-4 text-center" style={{ color: '#d4a017' }}>WHY IT ACTUALLY WORKS</h3>
        <p className="text-sm leading-relaxed mb-3" style={{ color: '#c8b87a' }}>
          Real published research — not marketing — shows slow-tempo music under 60 BPM measurably calms anxious animals.
          In <strong style={{ color: '#d4a017' }}>Wells' peer-reviewed studies (Queen's Belfast, 2002–2012)</strong>, shelter and home dogs spent significantly more time resting and less time vocalising when exposed to calm music.
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: '#a89870' }}>
          But here's what most products miss: your dog hears up to 65,000 Hz. Your cat up to 79,000 Hz. 
          Most streaming music was made for human ears. This was built for theirs.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#8aab3a' }}>
          Every protocol is built differently — the thunderstorm one physically masks sudden bangs. 
          The night one uses slow entrainment toward sleep. The pain one uses 40Hz gamma tones (MIT research, 2016 — emerging evidence in pets, used alongside vet care). 
          They're not all the same thing with different names.
        </p>
      </div>

      {/* WHAT YOU GET */}
      <div className="max-w-2xl mx-auto px-4 mb-10">
        <h3 className="text-center font-black text-xs tracking-widest mb-5" style={{ color: '#8aab3a' }}>
          EVERYTHING IN ONE SUBSCRIPTION
        </h3>
        <div className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(42,48,24,0.7)', border: '1px solid rgba(212,160,23,0.3)' }}>
          {WHAT_YOU_GET.map(({ Icon, text }, i) => (
            <div key={i} className="flex items-start gap-3">
              <Icon size={18} style={{ color: '#8aab3a', flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm leading-relaxed" style={{ color: '#e8d5a3' }}>{text}</p>
            </div>
          ))}
          <div className="pt-4 mt-2" style={{ borderTop: '1px solid rgba(138,171,58,0.2)' }}>
            <p className="text-center font-black" style={{ color: '#d4a017' }}>
              £29.99/year = 8p a day = less than one treat bag a month.
            </p>
            <p className="text-center text-xs mt-1" style={{ color: '#6b5e3a' }}>
              And if it doesn't help — full refund, 30 days, no questions.
            </p>
          </div>
        </div>
      </div>

      {/* FREE TIER — no risk */}
      <div className="max-w-2xl mx-auto px-4 mb-10 rounded-2xl p-6 text-center" style={{ background: 'rgba(26,32,14,0.9)', border: '2px solid rgba(138,171,58,0.4)' }}>
        <PS51Icons.Paw size={30} className="mx-auto mb-3" style={{ color: '#8aab3a' }} />
        <h3 className="font-black text-lg mb-2" style={{ color: '#e8d5a3' }}>Not sure yet? Try it free.</h3>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: '#a89870' }}>
          The Separation Anxiety protocol is completely free. No card. No signup.<br />
          Just press play and see if your pet calms down. Then decide.
        </p>
        <Link
          to={createPageUrl("PetSounds51")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-transform hover:scale-105"
          style={{ background: 'rgba(138,171,58,0.2)', border: '2px solid #8aab3a', color: '#8aab3a' }}
        >
          <Zap size={16} />
          Try FREE — Separation Anxiety
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* FINAL CTA */}
      <div className="max-w-2xl mx-auto px-4 pb-16 text-center">
        <p className="text-xs mb-5 italic" style={{ color: '#6b5e3a' }}>
          Built by two people who've sat on the floor with a shaking dog at midnight wondering what to do.
        </p>
        <p className="text-sm mb-2" style={{ color: '#a89870' }}>
          Your pet can't tell you they're suffering. But you already know.
        </p>
        <p className="text-sm mb-6 font-bold" style={{ color: '#e8d5a3' }}>
          This is something real you can do about it — tonight, right now, for 8p a day.
        </p>
        <button
          onClick={() => setShowPaywall(true)}
          className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xl shadow-xl transition-transform hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #d4a017, #f0c040)', color: '#1a1a0a', boxShadow: '0 0 40px rgba(212,160,23,0.4)' }}
        >
          <Heart size={24} />
          Help Your Pet Today
        </button>
        <p className="text-xs mt-3" style={{ color: '#6b5e3a' }}>£29.99/year · 14 protocols · 30-day refund · Apple Pay accepted</p>

        {/* TRUST ROW */}
        <div className="flex justify-center gap-6 mt-8 mb-6">
          <div className="text-center">
            <PS51Icons.Safe size={24} className="mx-auto mb-1" style={{ color: '#d4a017' }} />
            <p className="text-xs font-bold" style={{ color: '#e8d5a3' }}>30-day refund</p>
          </div>
          <div className="text-center">
            <PS51Icons.Rescue size={24} className="mx-auto mb-1" style={{ color: '#d4a017' }} />
            <p className="text-xs font-bold" style={{ color: '#e8d5a3' }}>10% to rescue</p>
          </div>
          <div className="text-center">
            <PS51Icons.Science size={24} className="mx-auto mb-1" style={{ color: '#d4a017' }} />
            <p className="text-xs font-bold" style={{ color: '#e8d5a3' }}>Peer-reviewed</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to={createPageUrl("PetSounds51Terms")} className="text-xs font-bold" style={{ color: '#6b5e3a' }}>Terms</Link>
          <span style={{ color: '#4a4030' }}>•</span>
          <Link to={createPageUrl("PetSounds51Privacy")} className="text-xs font-bold" style={{ color: '#6b5e3a' }}>Privacy</Link>
          <span style={{ color: '#4a4030' }}>•</span>
          <Link to={createPageUrl("PetSounds51Story")} className="text-xs font-bold" style={{ color: '#6b5e3a' }}>Our Story</Link>
        </div>
      </div>
    </div>
  );
}