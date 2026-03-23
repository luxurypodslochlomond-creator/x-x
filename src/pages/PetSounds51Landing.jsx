import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Heart, Zap, ChevronRight, CheckCircle } from 'lucide-react';
import PetSounds51Icon8Bit from '@/components/shared/PetSounds51Icon8Bit';
import { PS51Icons } from '@/components/petsounds/PS51CustomIcons';

const PROBLEMS = [
  { emoji: '🌩️', title: 'Thunderstorms & Fireworks', desc: "They're terrified. You feel helpless." },
  { emoji: '😰', title: 'Separation Anxiety', desc: "You leave. They fall apart." },
  { emoji: '🏥', title: 'Vet & Car Trips', desc: "Even the lead coming out causes panic." },
  { emoji: '🌙', title: "Can't Settle at Night", desc: "3am. Still pacing. You're exhausted." },
  { emoji: '💔', title: 'Rescue Trauma', desc: "They've been through something. You can see it." },
  { emoji: '🦴', title: 'Arthritis & Pain', desc: "Stress makes pain worse. Sound reduces stress." },
];

const WHAT_YOU_GET = [
  '14 science-backed audio protocols',
  'Separation anxiety, trauma, pain recovery, grief',
  'Tuned to dog, cat & horse hearing biology',
  'Works on any speaker, TV or laptop',
  'Leave it playing — no effort required',
  '10% goes to animal rescue via UF51 CIC',
];

export default function PetSounds51Landing() {
  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(135deg, #1a200e 0%, #2a3018 40%, #1e1a0e 100%)' }}>

      {/* HERO */}
      <div className="max-w-2xl mx-auto px-4 pt-12 pb-10 text-center">
        <div className="flex flex-col items-center mb-6">
          <PetSounds51Icon8Bit size={100} animate={true} />
          <h1 className="text-5xl sm:text-6xl font-black mt-5" style={{ color: '#d4a017', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(212,160,23,0.4)' }}>
            PetSounds51
          </h1>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black mb-4 leading-tight" style={{ color: '#e8d5a3' }}>
          Is your pet suffering from anxiety?
        </h2>
        <p className="text-lg mb-3" style={{ color: '#a89870' }}>
          Science says slow, species-tuned audio genuinely calms animals.<br />
          We built that. Leave it playing. It works.
        </p>
        <p className="text-sm mb-8" style={{ color: '#8aab3a' }}>
          Peer-reviewed research · No side effects · Not a substitute for vet care
        </p>

        {/* TWO CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to={createPageUrl("PetSounds51") + "?autoplay=separation"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-black text-lg transition-transform hover:scale-105"
            style={{ background: 'rgba(138,171,58,0.2)', border: '2px solid #8aab3a', color: '#8aab3a' }}
          >
            <Zap size={20} />
            Try FREE — Separation Anxiety
          </Link>
          <Link
            to={createPageUrl("PetSounds51")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-black text-lg shadow-xl transition-transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #d4a017, #f0c040)', color: '#1a1a0a', boxShadow: '0 0 30px rgba(212,160,23,0.4)' }}
          >
            <Heart size={20} />
            £29.99/year — All 14 Protocols
          </Link>
        </div>
        <p className="text-xs mt-3" style={{ color: '#6b5e3a' }}>30-day refund · No questions · Cancel anytime</p>
      </div>

      {/* THE PROBLEM */}
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <h3 className="text-center font-black text-xs tracking-widest mb-6" style={{ color: '#8aab3a' }}>
          DOES ANY OF THIS SOUND FAMILIAR?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROBLEMS.map((p, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(42,48,24,0.7)', border: '1px solid rgba(138,171,58,0.2)' }}>
              <div className="text-2xl mb-2">{p.emoji}</div>
              <p className="font-black text-sm mb-1" style={{ color: '#e8d5a3' }}>{p.title}</p>
              <p className="text-xs" style={{ color: '#a89870' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-2xl mx-auto px-4 mb-12 rounded-2xl p-6" style={{ background: 'rgba(30,26,14,0.9)', border: '1px solid rgba(212,160,23,0.25)' }}>
        <h3 className="font-black text-xs tracking-widest mb-4 text-center" style={{ color: '#d4a017' }}>WHY DOES IT ACTUALLY WORK?</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#c8b87a' }}>
          Peer-reviewed research shows that slow-tempo music (under 60 BPM), with simple compositions and no heavy percussion, measurably reduces anxiety in animals. Studies found over <strong style={{ color: '#d4a017' }}>70% of shelter dogs</strong> and <strong style={{ color: '#d4a017' }}>80% of home dogs</strong> showed fewer anxiety behaviours.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#a89870' }}>
          We go further — each protocol is tuned to your pet's specific hearing biology. Dogs hear up to 65,000 Hz. Cats up to 79,000 Hz. Removing agitating frequencies for that species works better than generic "relaxing music."
        </p>
      </div>

      {/* WHAT YOU GET */}
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <h3 className="text-center font-black text-xs tracking-widest mb-6" style={{ color: '#8aab3a' }}>
          WHAT YOU GET FOR £29.99/YEAR
        </h3>
        <div className="rounded-2xl p-6 space-y-3" style={{ background: 'rgba(42,48,24,0.7)', border: '1px solid rgba(212,160,23,0.3)' }}>
          {WHAT_YOU_GET.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle size={18} style={{ color: '#8aab3a', flexShrink: 0 }} />
              <p className="text-sm" style={{ color: '#e8d5a3' }}>{item}</p>
            </div>
          ))}
          <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(138,171,58,0.2)' }}>
            <p className="text-center text-xs font-black" style={{ color: '#d4a017' }}>
              That's £2.50/month. Less than one dog treat bag.
            </p>
          </div>
        </div>
      </div>

      {/* FREE TIER CALLOUT */}
      <div className="max-w-2xl mx-auto px-4 mb-12 rounded-2xl p-6 text-center" style={{ background: 'rgba(26,32,14,0.9)', border: '2px solid rgba(138,171,58,0.4)' }}>
        <Zap size={28} className="mx-auto mb-3" style={{ color: '#8aab3a' }} />
        <h3 className="font-black text-lg mb-2" style={{ color: '#e8d5a3' }}>Try it FREE first</h3>
        <p className="text-sm mb-5" style={{ color: '#a89870' }}>
          Separation Anxiety protocol is completely free. No card. No signup. Just press play and see if your dog calms down.
        </p>
        <Link
          to={createPageUrl("PetSounds51")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-transform hover:scale-105"
          style={{ background: 'rgba(138,171,58,0.2)', border: '2px solid #8aab3a', color: '#8aab3a' }}
        >
          <Zap size={16} />
          Try FREE Now
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* TRUST */}
      <div className="max-w-2xl mx-auto px-4 mb-12 grid grid-cols-3 gap-3">
        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(42,48,24,0.6)', border: '1px solid rgba(138,171,58,0.2)' }}>
          <PS51Icons.Safe size={28} className="mx-auto mb-2" style={{ color: '#d4a017' }} />
          <p className="font-black text-xs mb-1" style={{ color: '#e8d5a3' }}>30-day refund</p>
          <p className="text-xs" style={{ color: '#a89870' }}>no questions</p>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(42,48,24,0.6)', border: '1px solid rgba(138,171,58,0.2)' }}>
          <PS51Icons.Rescue size={28} className="mx-auto mb-2" style={{ color: '#d4a017' }} />
          <p className="font-black text-xs mb-1" style={{ color: '#e8d5a3' }}>10% to rescue</p>
          <p className="text-xs" style={{ color: '#a89870' }}>animal welfare CIC</p>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(42,48,24,0.6)', border: '1px solid rgba(138,171,58,0.2)' }}>
          <PS51Icons.Science size={28} className="mx-auto mb-2" style={{ color: '#d4a017' }} />
          <p className="font-black text-xs mb-1" style={{ color: '#e8d5a3' }}>Peer-reviewed</p>
          <p className="text-xs" style={{ color: '#a89870' }}>real research</p>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="max-w-2xl mx-auto px-4 pb-16 text-center">
        <p className="text-sm mb-6" style={{ color: '#a89870' }}>
          Your pet can't tell you they're suffering.<br />This is one honest thing you can do.
        </p>
        <Link
          to={createPageUrl("PetSounds51")}
          className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xl shadow-xl transition-transform hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #d4a017, #f0c040)', color: '#1a1a0a', boxShadow: '0 0 40px rgba(212,160,23,0.4)' }}
        >
          <Heart size={24} />
          Help Your Pet Today
        </Link>
        <p className="text-xs mt-3" style={{ color: '#6b5e3a' }}>£29.99/year · All 14 protocols · 30-day refund</p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
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