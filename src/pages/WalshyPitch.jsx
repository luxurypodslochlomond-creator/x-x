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

const Dot = () => (
  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mx-1 mb-0.5 align-middle" />
);

export default function WalshyPitch() {
  const [shown, setShown] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="max-w-xl mx-auto px-6 py-16 space-y-14">

        {/* Header */}
        <div>
          <p className="text-xs tracking-[0.3em] text-gray-600 uppercase mb-8">May 2026 · Private</p>
          <h1 className="text-5xl font-black leading-[1.1] mb-6">
            We're building<br />
            things that<br />
            <span className="text-amber-400">actually work.</span>
          </h1>
          <p className="text-gray-400 leading-relaxed text-lg">
            Not a startup with a vision board. Not an app looking for a problem. 
            Three real products, real people using them, and a gap where the right person could make a genuine difference.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <PawIcon size={14} color="#374151" />
          <div className="flex-1 h-px bg-white/10" />
          <PawIcon size={14} color="#374151" />
        </div>

        {/* PetSounds51 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <PawIcon size={18} />
            <p className="text-xs tracking-widest text-amber-400 uppercase font-bold">PetSounds51</p>
          </div>
          <p className="text-white font-black text-2xl mb-4 leading-tight">
            You know that moment when a dog walks into a room and just... stops?
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            That happened in a bar. Someone walked past a screen playing our frequencies 
            and their dog froze — ears up, completely tuned in. 
            Nobody told them to look. Nobody trained them to stop.
          </p>
          <p className="text-gray-400 leading-relaxed mb-6">
            It's not magic. It's psychoacoustics — the specific frequencies that speak 
            directly to the animal nervous system. Peer-reviewed. Properly researched. 
            Built into an app that anyone can use in about 30 seconds.
            Separation anxiety. Fireworks. Travel stress. Already helping.
          </p>
          <div className="bg-amber-950/40 border border-amber-500/20 rounded-2xl p-5">
            <p className="text-amber-300 font-black mb-2">The audience doesn't need convincing.</p>
            <p className="text-amber-200/70 text-sm leading-relaxed">
              12 million dogs in the UK. Every owner has left the house wondering 
              if their dog is okay. This answers that — and they'll tell everyone they know when it works. 
              It just needs to get in front of people.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <WaveIcon size={14} color="#374151" />
          <div className="flex-1 h-px bg-white/10" />
          <WaveIcon size={14} color="#374151" />
        </div>

        {/* SORTED */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <WaveIcon size={18} />
            <p className="text-xs tracking-widest text-green-400 uppercase font-bold">SORTED</p>
          </div>
          <p className="text-white font-black text-2xl mb-4 leading-tight">
            There's a letter on most people's kitchen table right now that they haven't opened.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            HMRC. The council. A landlord. A debt they'd forgotten about. 
            Brown envelope. Sits there for three days because nobody knows 
            what it actually means or what they're supposed to do about it.
          </p>
          <p className="text-gray-400 leading-relaxed">
            SORTED reads it. Tells you exactly what it is in plain English. 
            Tells you what to do. Any language. Takes about ten seconds. 
            Nothing stored, nothing sold, no account, no login. 
            Just — sorted. Already live. Already helping people who were genuinely scared.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <LeafIcon size={14} color="#374151" />
          <div className="flex-1 h-px bg-white/10" />
          <LeafIcon size={14} color="#374151" />
        </div>

        {/* Litter */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <LeafIcon size={18} />
            <p className="text-xs tracking-widest text-green-400 uppercase font-bold">The Litter App</p>
          </div>
          <p className="text-white font-black text-2xl mb-4 leading-tight">
            People are already picking up litter. Millions of them. Every weekend.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            They just get nothing back for it. No record. No thanks. 
            No data that anyone can actually use.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Take a photo of what you find, get rewarded. 
            Councils get verified, real-world data about where the problems actually are. 
            Brands get ESG evidence that wasn't generated by a consultant with a spreadsheet. 
            Nearly ready to launch — this one just needs a final push.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* The ask — honest, not corporate */}
        <div>
          <p className="text-white font-black text-2xl mb-5 leading-tight">
            So why are you reading this?
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Because we think you might be the kind of person who can help — 
            and we'd rather have an honest conversation than send a 40-slide deck 
            to someone who'll never open it.
          </p>

          <div className="space-y-4">
            <div className="border border-white/10 rounded-2xl p-5 hover:border-amber-500/30 transition-colors">
              <p className="font-black text-white mb-2">Connections matter more than cash right now.</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                If you know how to get things in front of people — the right creative, 
                the right channel, the right introduction — that's worth more to us than 
                pretty much anything. PetSounds51 and SORTED are both ready.
              </p>
            </div>

            <div className="border border-white/10 rounded-2xl p-5 hover:border-green-500/20 transition-colors">
              <p className="font-black text-white mb-2">And if putting a bit behind it makes sense to you, we can talk about that too.</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                For the litter app specifically, there's a clear, defined amount of work 
                between here and launch. If backing that appeals, we'll keep it simple — 
                fair, straightforward, nothing that makes either of us feel weird about it.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pb-8">
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            No pressure. No follow-up sequence. If it resonates — or even if you just want to push back on something — get in touch.
          </p>

          <button
            onClick={() => setShown(!shown)}
            className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm tracking-widest uppercase rounded-2xl transition-all"
          >
            {shown ? "Close" : "Let's Talk"}
          </button>

          {shown && (
            <div className="mt-6 text-center space-y-1">
              <p className="font-black text-white text-lg">Brian Hughes</p>
              <p className="text-amber-400 font-bold">brian@universalfrequency51.com</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <PawIcon size={12} color="#374151" />
                <p className="text-gray-600 text-xs">Glasgow · UF51</p>
                <LeafIcon size={12} color="#374151" />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}