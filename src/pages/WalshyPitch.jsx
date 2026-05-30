import React, { useState } from 'react';

// Custom PetSounds paw icon
const PawIcon = ({ size = 24, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="17" rx="5" ry="4" fill={color} opacity="0.9"/>
    <ellipse cx="7" cy="12" rx="2.2" ry="3" fill={color} opacity="0.8"/>
    <ellipse cx="17" cy="12" rx="2.2" ry="3" fill={color} opacity="0.8"/>
    <ellipse cx="9.5" cy="8" rx="1.8" ry="2.5" fill={color} opacity="0.7"/>
    <ellipse cx="14.5" cy="8" rx="1.8" ry="2.5" fill={color} opacity="0.7"/>
  </svg>
);

// Simple waveform icon for sound/frequency
const WaveIcon = ({ size = 24, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M2 12 L5 12 L6 7 L7 17 L8 10 L9 14 L10 6 L11 18 L12 9 L13 15 L14 11 L15 13 L16 12 L19 12 L22 12"
      stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

export default function WalshyPitch() {
  const [shown, setShown] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="max-w-xl mx-auto px-6 py-16 space-y-12">

        {/* Header */}
        <div>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-6">May 2026</p>
          <h1 className="text-4xl font-black leading-tight mb-5 text-gray-900">
            You saw the dogs<br />
            stop and stare. <span className="inline-block"><PawIcon size={36} /></span><br />
            <span className="text-amber-500">That wasn't a coincidence.</span>
          </h1>
          <p className="text-gray-500 leading-relaxed text-lg">
            Dogs respond to specific psychoacoustic frequencies — peer-reviewed, tested, real. 
            What you saw was it working. We built an app around it.
          </p>
        </div>

        <div className="h-px bg-gray-100" />

        {/* PetSounds51 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PawIcon size={18} />
            <p className="text-xs tracking-widest text-gray-400 uppercase">PetSounds51</p>
          </div>
          <p className="text-gray-800 font-bold text-xl mb-3">
            Sound therapy for anxious dogs, cats and horses.
          </p>
          <p className="text-gray-500 leading-relaxed mb-5">
            Separation anxiety. Fireworks. Travel stress. The frequencies are real, 
            the science is real, and it's already working. 
            Free to start. Subscription for more protocols. No login needed.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <PawIcon size={16} />
              <p className="text-amber-800 font-bold">The audience is enormous.</p>
            </div>
            <p className="text-amber-700 text-sm leading-relaxed">
              12 million pet dogs in the UK alone. Every single owner 
              has felt guilty leaving the house. A warm, funny ad — 
              the kind that gets shared — puts this in front of all of them instantly.
            </p>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* SORTED */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <WaveIcon size={18} />
            <p className="text-xs tracking-widest text-gray-400 uppercase">SORTED</p>
          </div>
          <p className="text-gray-800 font-bold text-xl mb-3">
            Paste in a scary letter. Get plain English back.
          </p>
          <p className="text-gray-500 leading-relaxed">
            HMRC. Landlords. Debt collectors. Any language. Nothing stored. 
            No login. Already live. Martin Lewis built an empire on exactly this anxiety — 
            SORTED does it in seconds, privately, with AI.
          </p>
        </div>

        <div className="h-px bg-gray-100" />

        {/* The ask */}
        <div>
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">How You Could Be Involved</p>
          <p className="text-gray-600 leading-relaxed mb-6">
            We're not looking for a boardroom. We're looking for the right people 
            who get what this is and want to be part of it.
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <WaveIcon size={16} color="#6b7280" />
                <p className="font-black text-gray-900">Expertise and introductions</p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                If you know how to get products in front of audiences — 
                the right creative, the right channels, the right moment — 
                that's worth more to us than cash. PetSounds51 and SORTED are both ready to grow.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <PawIcon size={16} color="#6b7280" />
                <p className="font-black text-gray-900">Smart capital</p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                The litter app — people photograph litter, earn rewards, councils get verified data — 
                needs a sprint to market. If a small investment makes sense for you, 
                it's on the table and the terms are simple. We can talk through that if it feels right.
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* CTA */}
        <div className="pb-8">
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            No pressure at all. If none of this lands, I'd still love to know what you think — 
            you spotted something real before anyone told you what it was. 
            That kind of instinct doesn't come from a pitch deck.
          </p>

          <button
            onClick={() => setShown(!shown)}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-white font-black text-sm tracking-widest uppercase rounded-2xl transition-all"
          >
            {shown ? "Close" : "Get in Touch"}
          </button>

          {shown && (
            <div className="mt-5 text-center space-y-1">
              <p className="font-black text-gray-900 text-lg">Brian Hughes</p>
              <p className="text-amber-500 font-bold">brian@universalfrequency51.com</p>
              <div className="flex items-center justify-center gap-1 mt-3">
                <PawIcon size={14} color="#d1d5db" />
                <p className="text-gray-400 text-xs">Glasgow · UF51</p>
                <PawIcon size={14} color="#d1d5db" />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}