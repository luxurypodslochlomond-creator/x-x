import React, { useState } from 'react';

export default function WalshyPitch() {
  const [shown, setShown] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="max-w-xl mx-auto px-6 py-16 space-y-12">

        {/* Header */}
        <div>
          <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-6">For Chris · May 2026</p>
          <h1 className="text-4xl font-black leading-tight mb-5 text-gray-900">
            You saw the dogs<br />
            stop and stare. 🐕<br />
            <span className="text-amber-500">That wasn't a coincidence.</span>
          </h1>
          <p className="text-gray-500 leading-relaxed text-lg">
            Dogs respond to specific psychoacoustic frequencies — peer-reviewed, tested, real. 
            What you saw in that bar was it working. We built an app around it.
          </p>
        </div>

        <div className="h-px bg-gray-100" />

        {/* PetSounds51 — the one he already believes in */}
        <div>
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">PetSounds51</p>
          <p className="text-gray-800 font-bold text-xl mb-3">
            Sound therapy for anxious dogs, cats and horses.
          </p>
          <p className="text-gray-500 leading-relaxed mb-5">
            Separation anxiety. Fireworks. Travel stress. The frequencies are real, 
            the science is real, and it's already working for people who've tried it. 
            Free to start. Subscription for more protocols. No login needed.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-amber-800 font-bold mb-2">The audience is enormous.</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              There are 12 million pet dogs in the UK alone. Every single owner 
              has felt guilty leaving the house. A warm, funny 30-second ad — 
              the kind that gets shared — puts this in front of all of them.
              That's your world, not mine. That's why this conversation matters.
            </p>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* SORTED — quick mention */}
        <div>
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">While we're here — SORTED</p>
          <p className="text-gray-800 font-bold text-xl mb-3">
            Paste in a scary letter. Get plain English back.
          </p>
          <p className="text-gray-500 leading-relaxed">
            HMRC. Landlords. Debt collectors. Any language. Nothing stored. 
            No login. Already live. Martin Lewis built an empire on exactly this anxiety — 
            SORTED just does it faster, privately, with AI. Same massive audience, zero barrier to entry.
          </p>
        </div>

        <div className="h-px bg-gray-100" />

        {/* The ask — light and confident */}
        <div>
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">What I'm Looking For</p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Honestly? Someone who gets it and wants to be part of it. 
            That could look like two things:
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-2xl p-5">
              <p className="font-black text-gray-900 mb-2">A media partnership 🎯</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                You know how to get products in front of audiences at scale. 
                PetSounds51 and SORTED are both ready. 
                The right creative + the right channels = something that grows fast. 
                No cash needed — just expertise and introductions.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-5">
              <p className="font-black text-gray-900 mb-2">Or a small investment 💷</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                The litter app (people photograph litter, earn rewards, councils get data) 
                needs a defined sprint to get to market. 
              </p>
              <div className="mt-4 bg-gray-50 rounded-xl p-4">
                <p className="text-2xl font-black text-gray-900">£15,000</p>
                <p className="text-amber-500 font-bold text-sm mt-1">5% equity · no strings · plain English agreement</p>
                <p className="text-gray-400 text-xs mt-2">Revenue share back until £15k is returned, then it stops. That's it.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* CTA — warm */}
        <div className="pb-8">
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            No pressure at all. If none of this is right for you, 
            I'd still love to know what you think — 
            you saw those dogs react before I even told you what it was. 
            That instinct is worth something. 🦆
          </p>

          <button
            onClick={() => setShown(!shown)}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-white font-black text-sm tracking-widest uppercase rounded-2xl transition-all"
          >
            {shown ? "Close ↑" : "Get in Touch"}
          </button>

          {shown && (
            <div className="mt-5 text-center space-y-1">
              <p className="font-black text-gray-900 text-lg">Brian Hughes</p>
              <p className="text-amber-500 font-bold">brian@universalfrequency51.com</p>
              <p className="text-gray-400 text-xs mt-3">Glasgow 🏴󠁧󠁢󠁳󠁣󠁬󠁿 · UF51</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}