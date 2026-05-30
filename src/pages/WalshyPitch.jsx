import React, { useState } from 'react';

const PawIcon = ({ size = 24, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="17" rx="5" ry="4" fill={color} opacity="0.9"/>
    <ellipse cx="7" cy="12" rx="2.2" ry="3" fill={color} opacity="0.8"/>
    <ellipse cx="17" cy="12" rx="2.2" ry="3" fill={color} opacity="0.8"/>
    <ellipse cx="9.5" cy="8" rx="1.8" ry="2.5" fill={color} opacity="0.7"/>
    <ellipse cx="14.5" cy="8" rx="1.8" ry="2.5" fill={color} opacity="0.7"/>
  </svg>
);

const WaveIcon = ({ size = 24, color = "#f59e0b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M2 12 L5 12 L6 7 L7 17 L8 10 L9 14 L10 6 L11 18 L12 9 L13 15 L14 11 L15 13 L16 12 L19 12 L22 12"
      stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

const LeafIcon = ({ size = 24, color = "#22c55e" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6 2 3 8 3 14c0 4 2.5 7 6 8 0-4 1-7 3-9-1 3-1 6 0 9 3.5-1 6-4.5 6-8 0-6-3-12-6-12z" fill={color} opacity="0.85"/>
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
            stop and stare.<br />
            <span className="text-amber-500">That wasn't a coincidence.</span>
          </h1>
          <p className="text-gray-500 leading-relaxed text-lg">
            Dogs respond to specific psychoacoustic frequencies. Peer-reviewed. Tested. Real.
            What you saw in that bar was it working. We built a platform around it — 
            and that's just one of three things we want to tell you about.
          </p>
        </div>

        <div className="h-px bg-gray-100" />

        {/* PetSounds51 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <PawIcon size={18} />
            <p className="text-xs tracking-widest text-gray-400 uppercase">PetSounds51</p>
          </div>
          <p className="text-gray-800 font-bold text-xl mb-3">
            Sound therapy for anxious pets. Already working.
          </p>
          <p className="text-gray-500 leading-relaxed mb-5">
            Separation anxiety. Fireworks. Travel stress. Dogs, cats, horses. 
            The frequencies are real and the science is solid — 
            we've built it into a simple app that anyone can use. 
            Free to try, subscription for the full library. No login. No faff.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-amber-800 font-bold mb-2">The audience is already there.</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              12 million pet dogs in the UK alone. Every single owner has felt guilty leaving the house — 
              or spent a fortune on a behaviourist. A warm, shareable piece of creative 
              puts this in front of all of them. The product works. It just needs the right people to see it.
            </p>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* SORTED */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <WaveIcon size={18} />
            <p className="text-xs tracking-widest text-gray-400 uppercase">SORTED</p>
          </div>
          <p className="text-gray-800 font-bold text-xl mb-3">
            Most people dread opening certain letters.
          </p>
          <p className="text-gray-500 leading-relaxed mb-4">
            HMRC. Landlords. Debt collectors. Bailiffs. The kind of envelope that sits on the 
            kitchen table for three days because nobody knows what it actually means or what to do about it.
          </p>
          <p className="text-gray-500 leading-relaxed">
            SORTED reads it for you. Plain English. In seconds. Any language. 
            Nothing stored, nothing sold, no login. 
            Already live. Already helping people. 
            Martin Lewis built an empire on this exact anxiety — 
            SORTED just does it faster and more privately.
          </p>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Litter Picks */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <LeafIcon size={18} />
            <p className="text-xs tracking-widest text-gray-400 uppercase">The Litter App</p>
          </div>
          <p className="text-gray-800 font-bold text-xl mb-3">
            People are already picking up litter. We just gave them a reason.
          </p>
          <p className="text-gray-500 leading-relaxed mb-4">
            Photograph what you find. Get rewarded. The data goes to councils 
            who actually need it to prove where the problems are and justify spending.
            Brands get verified ESG evidence that isn't made up on a spreadsheet.
          </p>
          <p className="text-gray-500 leading-relaxed">
            It's nearly ready. This one just needs a defined push to get it across the line.
          </p>
        </div>

        <div className="h-px bg-gray-100" />

        {/* The ask — human, no jargon */}
        <div>
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">What We're Looking For</p>

          <p className="text-gray-600 leading-relaxed mb-6">
            We're not pitching to a room. We're having a conversation with people 
            who get what this is and might want to be involved. That could mean different things.
          </p>

          <div className="space-y-4">

            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <WaveIcon size={16} color="#6b7280" />
                <p className="font-black text-gray-900">Connections and expertise</p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                If you know how to get the right product in front of the right audience — 
                creative, distribution, brand introductions — that's genuinely worth more to us right now 
                than anything else. PetSounds51, SORTED and the litter app are all ready to grow.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <LeafIcon size={16} color="#6b7280" />
                <p className="font-black text-gray-900">A bit of cash, if it makes sense</p>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                For the litter app specifically, there's a defined amount of work 
                between here and launch. If putting a bit behind that appeals to you, 
                we're happy to have that conversation — fair terms, nothing complicated, 
                nothing that makes either of us feel weird about it.
              </p>
            </div>

          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* CTA */}
        <div className="pb-8">
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            No pressure. No deck to sit through. 
            If any of this resonates — or if you just want to tell us what you think — 
            that's genuinely a good enough reason to get in touch.
          </p>

          <button
            onClick={() => setShown(!shown)}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-white font-black text-sm tracking-widest uppercase rounded-2xl transition-all"
          >
            {shown ? "Close" : "Get in Touch"}
          </button>

          {shown && (
            <div className="mt-6 text-center space-y-1">
              <p className="font-black text-gray-900 text-lg">Brian Hughes</p>
              <p className="text-amber-500 font-bold">brian@universalfrequency51.com</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <PawIcon size={13} color="#d1d5db" />
                <p className="text-gray-400 text-xs">Glasgow · UF51</p>
                <LeafIcon size={13} color="#d1d5db" />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}