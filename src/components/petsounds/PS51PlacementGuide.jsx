import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Smartphone, Volume2, Tv, Waves } from 'lucide-react';

// Where to put your phone so the sound actually reaches your pet.
// Honest, no-hardware delivery guidance — the "coupling > frequency" insight
// made visible. Matches PetSounds51 gold/green palette.

const PLACEMENTS = [
  {
    icon: Smartphone,
    title: 'Face-down near their bed',
    method: 'Substrate vibration',
    color: '#8aab3a',
    body: 'Phone face-down on the floor, near where they settle. Low frequencies travel through the surface — they feel it as much as hear it. Best for separation, night anxiety, and any deep-calm protocol.',
    tip: 'Don\'t silence the phone with a switch — some phones pause audio. Use the in-app volume instead.',
  },
  {
    icon: Volume2,
    title: 'On a shelf, speaker up',
    method: 'Airborne',
    color: '#d4a017',
    body: 'Phone or tablet on a shelf or side table, speaker pointing into the room. Classic airborne delivery. Fine for most protocols — works like a gentle radio left on.',
    tip: 'Keep it at pet height, not ceiling height. Sound falls off fast.',
  },
  {
    icon: Tv,
    title: 'Cast to TV or smart speaker',
    method: 'Big speaker',
    color: '#06b6d4',
    body: 'AirPlay, Chromecast, or Bluetooth to the Echo / Sonos / TV you already own. Bigger speaker = better low-end reach, which helps larger animals and masking protocols like thunderstorm.',
    tip: 'Cast from this phone, then leave the room. The audio keeps playing on the TV.',
  },
];

export default function PS51PlacementGuide() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mb-6 rounded-2xl p-5" style={{ background: 'rgba(30,26,14,0.8)', border: '1px solid rgba(212,160,23,0.25)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <Waves size={20} style={{ color: '#8aab3a' }} />
          <div className="text-left">
            <p className="font-black text-sm tracking-wide" style={{ color: '#8aab3a' }}>WHERE YOU PUT YOUR PHONE MATTERS</p>
            <p className="text-xs mt-0.5" style={{ color: '#a89870' }}>Same sound · three ways to deliver it · no new gear</p>
          </div>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4" style={{ color: '#8aab3a' }} />
          : <ChevronDown className="w-4 h-4" style={{ color: '#8aab3a' }} />}
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {PLACEMENTS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-xl p-4"
                style={{ background: 'rgba(42,48,24,0.8)', border: `1px solid ${p.color}40` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${p.color}1a` }}>
                    <Icon size={20} style={{ color: p.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-sm" style={{ color: '#e8d5a3' }}>{p.title}</p>
                    <p className="text-xs font-mono" style={{ color: p.color }}>{p.method}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mb-2" style={{ color: '#a89870' }}>{p.body}</p>
                <p className="text-xs leading-relaxed flex items-start gap-1.5" style={{ color: '#6b5e3a' }}>
                  <span style={{ color: p.color }}>→</span> {p.tip}
                </p>
              </div>
            );
          })}

          <div className="rounded-xl p-4" style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.3)' }}>
            <p className="text-xs leading-relaxed" style={{ color: '#c8b87a' }}>
              <strong style={{ color: '#d4a017' }}>Why this matters:</strong> animals don't just hear with their ears.
              Low frequencies travel through floors and bedding (mechanotransduction) — so a phone face-down near a
              bed can feel like a purring companion. It's the same sound. Where it lands is the difference.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}