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
            Five problems.<br />
            Billions of people<br />
            <span className="text-cyan-400">affected by every one.</span>
          </h1>
          <p className="text-gray-400 leading-relaxed">
            This isn't about the tech. It's about the size of the problems being solved — 
            and working software that's already doing it.
          </p>
        </div>

        <div className="h-px bg-white/10" />

        {/* Market sizes — the hook */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-6">The Opportunity</p>
          <div className="space-y-6">

            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-2xl font-black text-white">£20bn+</span>
                <span className="text-cyan-400 font-bold text-sm">Pet wellness · global</span>
              </div>
              <p className="text-gray-500 text-sm leading-snug">
                <span className="text-gray-300 font-bold">PetSounds51</span> — psychoacoustic sound therapy for anxious animals. 
                Peer-reviewed science. Vet TV screen distribution in discussion. 
                Nobody doing this properly at scale.
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-2xl font-black text-white">Every adult</span>
                <span className="text-amber-400 font-bold text-sm">who's feared a letter</span>
              </div>
              <p className="text-gray-500 text-sm leading-snug">
                <span className="text-gray-300 font-bold">SORTED</span> — paste in any scary letter. 
                HMRC, landlord, debt collector. Plain English back in seconds. Any language. Nothing stored. 
                Martin Lewis's entire audience needs this.
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-2xl font-black text-white">£billions</span>
                <span className="text-purple-400 font-bold text-sm">lost to council procurement fraud annually</span>
              </div>
              <p className="text-gray-500 text-sm leading-snug">
                <span className="text-gray-300 font-bold">CTRL51</span> — AI fraud detection for public sector procurement. 
                Flags price-fixing and unapproved suppliers automatically. 
                One council at £5k/month funds the whole operation.
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-2xl font-black text-white">ESG · councils · brands</span>
                <span className="text-green-400 font-bold text-sm">all need verified action</span>
              </div>
              <p className="text-gray-500 text-sm leading-snug">
                <span className="text-gray-300 font-bold">Litter app</span> — verified environmental cleanup with photo proof, 
                community tokens, and council integration. 
                Brands pay for verified ESG. Councils need the data. Almost ready.
              </p>
            </div>

          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* The real ask — services first */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">What Would Actually Move the Needle</p>
          <p className="text-gray-300 leading-relaxed text-sm mb-5">
            Cash is one option. But the right services partnership could be worth ten times more — 
            and cost a fraction of that to provide.
          </p>
          <div className="space-y-3">
            {[
              "A proper ad for PetSounds51. Funny, warm, shareable. This goes global with the right 30 seconds.",
              "Media or distribution for SORTED. The audience already exists — it just needs a door.",
              "Introductions to council procurement teams, sustainability leads, or brand ESG budgets.",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <p className="text-gray-400 text-sm leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* Cash fallback */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">Or — A Small Advance</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            The litter app needs a defined number of hours to get to market. 
            A small advance against that work — based on actual time, not speculation — 
            is the most concrete version of this conversation.
          </p>
          <div className="p-5 border border-cyan-500/20 rounded-xl bg-cyan-500/5">
            <p className="text-3xl font-black text-white mb-1">£15,000</p>
            <p className="text-cyan-400 font-bold text-sm mb-4">5% equity · no control · no board seat</p>
            <ul className="space-y-1.5 text-sm text-gray-500">
              <li>— Ordinary shares. Nothing predatory.</li>
              <li>— Revenue share until the £15k returns — then it stops.</li>
              <li>— Pro-rata rights on every future raise.</li>
              <li>— One clean agreement. Plain English.</li>
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
              <p className="text-gray-600 text-xs mt-3">Happy to talk through any of it. No pressure. 🦆</p>
            </div>
          )}

          <p className="text-center text-gray-700 text-xs mt-8">UF51 · Glasgow 🏴󠁧󠁢󠁳󠁣󠁬󠁿</p>
        </div>

      </div>
    </div>
  );
}