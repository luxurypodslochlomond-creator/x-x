import React, { useState } from 'react';

export default function WalshyPitch() {
  const [shown, setShown] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="max-w-xl mx-auto px-6 py-16 space-y-12">

        {/* Header */}
        <div>
          <p className="text-xs tracking-[0.3em] text-gray-600 uppercase mb-6">Private · May 2026</p>
          <h1 className="text-4xl font-black leading-tight mb-5">
            Three products.<br />
            Huge audiences.<br />
            <span className="text-cyan-400">No media partner yet.</span>
          </h1>
          <p className="text-gray-400 leading-relaxed">
            This is a conversation for someone who understands media, audiences, and what it takes 
            to get the right product in front of the right people at the right moment.
          </p>
        </div>

        <div className="h-px bg-white/10" />

        {/* The products — framed for a media person */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-6">What's Ready to Go</p>

          <div className="space-y-7">

            <div>
              <p className="text-white font-black text-lg mb-1">PetSounds51</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                Sound therapy for anxious pets — separation anxiety, fireworks, travel stress. 
                Built on peer-reviewed veterinary science. Already working. Vet practice distribution in discussion.
              </p>
              <div className="p-3 border border-amber-500/20 rounded-lg bg-amber-500/5 text-amber-300 text-sm">
                The audience is every dog owner who's ever felt guilty leaving the house. 
                That's tens of millions of people. It just needs the right ad — 
                funny, warm, 30 seconds. The kind that gets shared without trying.
              </div>
            </div>

            <div>
              <p className="text-white font-black text-lg mb-1">SORTED</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                Paste in any scary letter — HMRC, landlord, debt collector, council. 
                Get plain English back in seconds. Any language. Nothing stored. No login.
              </p>
              <div className="p-3 border border-green-500/20 rounded-lg bg-green-500/5 text-green-300 text-sm">
                Martin Lewis built an empire on financial anxiety. This is the same audience — 
                millions of people who open brown envelopes with dread. 
                One media partnership puts this in front of all of them.
              </div>
            </div>

            <div>
              <p className="text-white font-black text-lg mb-1">Litter App</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                People photograph litter, earn rewards, councils get verified data. 
                Brands get real ESG evidence. Almost ready to launch.
              </p>
              <div className="p-3 border border-cyan-500/20 rounded-lg bg-cyan-500/5 text-cyan-300 text-sm">
                Environmental action with proof. Brands are spending millions trying to demonstrate ESG credentials. 
                This is the real thing — verified, community-driven, scalable globally.
              </div>
            </div>

          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* The partnership angle — what Chris can actually bring */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">What a Partnership Looks Like</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Cash is one option. But someone with your background could bring something worth ten times that —
            and it wouldn't cost you cash to provide it.
          </p>
          <div className="space-y-3">
            {[
              "Media placement for PetSounds51 — the right creative, the right channels, the right moment.",
              "Distribution for SORTED — it's built for a mass audience that already trusts certain voices.",
              "Brand or council introductions for the litter app — ESG budgets are real and they're looking.",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <p className="text-gray-400 text-sm leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* If cash — simple and clean */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">Or a Small Investment</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            The litter app needs a defined amount of work to get to market. 
            A small advance against that — based on actual hours, not speculation — 
            is the most straightforward version of this.
          </p>
          <div className="p-5 border border-white/10 rounded-xl">
            <p className="text-3xl font-black text-white mb-1">£15,000</p>
            <p className="text-cyan-400 font-bold text-sm mb-4">5% equity · ordinary shares · no strings</p>
            <ul className="space-y-1.5 text-sm text-gray-500">
              <li>— No board seat. No control. No preference shares.</li>
              <li>— Revenue share on net until the £15k is returned — then it stops.</li>
              <li>— Pro-rata rights on any future raise.</li>
              <li>— One clean agreement. Plain English. Nothing hidden.</li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* CTA */}
        <div className="pb-8">
          <button
            onClick={() => setShown(!shown)}
            className="w-full py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase rounded-lg hover:border-cyan-500/60 hover:text-cyan-400 transition-all"
          >
            {shown ? "Close" : "Let's Talk"}
          </button>

          {shown && (
            <div className="mt-5 text-center space-y-1">
              <p className="text-white font-black">Brian Hughes</p>
              <p className="text-cyan-400 text-sm">brian@universalfrequency51.com</p>
              <p className="text-gray-600 text-xs mt-3">No pressure. Happy to talk through any of it. 🦆</p>
            </div>
          )}

          <p className="text-center text-gray-700 text-xs mt-8">UF51 · Glasgow 🏴󠁧󠁢󠁳󠁣󠁬󠁿</p>
        </div>

      </div>
    </div>
  );
}