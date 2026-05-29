import React, { useState } from 'react';

export default function WalshyPitch() {
  const [shown, setShown] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* HERO */}
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-8">
        <div className="mb-3">
          <span className="text-xs font-black tracking-[0.3em] text-cyan-400 uppercase">Private · Via Graeme</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
          AI that actually<br />
          <span className="text-cyan-400">does something useful.</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Five working products. A platform built differently. And a very simple ask from someone Graeme trusts.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-cyan-500/60 via-cyan-500/20 to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-10">

        {/* The platform */}
        <div>
          <p className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-3">What UF51 Is</p>
          <p className="text-white text-lg leading-relaxed mb-4">
            UF51 is an AI platform built from scratch — not on top of someone else's wrapper, not a ChatGPT clone. Five distinct products, each solving a real problem, each with a clear commercial path. Built by one person in Glasgow. All live. All working.
          </p>
          <p className="text-gray-400 leading-relaxed">
            The technology behind it — privacy-first AI, zero data storage, offline capability, peer-reviewed science integrations — is the kind of thing well-funded startups are still trying to figure out. It's already built.
          </p>
        </div>

        {/* The products */}
        <div>
          <p className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-4">Five Products. Five Markets.</p>
          <div className="space-y-3">
            {[
              {
                name: "PetSounds51",
                market: "Global pet care · £20bn market",
                desc: "Psychoacoustic sound therapy for anxious animals, built on peer-reviewed veterinary science. Vet TV screen distribution in active discussion. No competitor doing this properly.",
                color: "text-amber-400",
                dot: "bg-amber-400"
              },
              {
                name: "SORTED",
                market: "Legal & financial anxiety · mass market",
                desc: "Paste in any scary letter — HMRC, landlord, debt collector — get plain English back in seconds. Any language. Nothing stored. Martin Lewis's audience needs this. Nobody has built it like this.",
                color: "text-green-400",
                dot: "bg-green-400"
              },
              {
                name: "CTRL51",
                market: "Public sector procurement · £billions mismanaged",
                desc: "AI fraud detection for council procurement. Flags price-fixing, unapproved suppliers, anomalies. £5k/month per council. One client pays for the whole business.",
                color: "text-purple-400",
                dot: "bg-purple-400"
              },
              {
                name: "CB51",
                market: "Music industry · artist management",
                desc: "AI co-manager for bands. Gig offer parsing, band voting, contract drafts, promoter comms. Fully automated. Already managing real artists.",
                color: "text-blue-400",
                dot: "bg-blue-400"
              },
              {
                name: "Learn51",
                market: "Global education · every child",
                desc: "Free AI tutoring. No login. Works offline. Built for kids who can't afford tutors. Already live in multiple languages.",
                color: "text-pink-400",
                dot: "bg-pink-400"
              },
            ].map(p => (
              <div key={p.name} className="p-4 border border-white/10 rounded-xl bg-white/[0.02]">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full ${p.dot} mt-2 flex-shrink-0`} />
                  <div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className={`font-black text-base ${p.color}`}>{p.name}</span>
                      <span className="text-gray-600 text-xs font-mono">{p.market}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1 leading-snug">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why now */}
        <div className="border border-amber-500/20 rounded-xl p-5 bg-amber-500/5">
          <p className="text-xs font-black tracking-widest text-amber-400 uppercase mb-3">Why Now</p>
          <p className="text-white leading-relaxed text-sm">
            The AI wave is here and most of what's been built is noise — chatbots, wrappers, hype. What's rare is working AI that solves specific real problems with actual users. That's what exists here. The gap between where this is and where it could be with proper runway is genuinely small.
          </p>
        </div>

        {/* Graeme */}
        <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
          <p className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-3">The Connection 🏴󠁧󠁢󠁳󠁣󠁬󠁿</p>
          <p className="text-white leading-relaxed text-sm mb-3">
            <span className="font-black text-cyan-300">Graeme</span> didn't just pass on a link. He's been thinking through the strategy — the Martin Lewis angle for SORTED, vet TV screen distribution for PetSounds51, the right creative partner for growth. He sees it.
          </p>
          <p className="text-gray-400 text-sm">
            Any deal here includes Graeme properly — 1% equity, same terms as below. He's part of this story from day one.
          </p>
        </div>

        {/* The ask */}
        <div className="border border-cyan-500/40 rounded-xl p-6 bg-cyan-500/5">
          <p className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-3">The Opportunity</p>
          <div className="text-5xl font-black text-white mb-1">£15,000</div>
          <p className="text-cyan-300 font-bold mb-5">5% equity · Walshy &nbsp;+&nbsp; 1% equity · Graeme</p>
          <p className="text-gray-300 leading-relaxed text-sm">
            Three months of focused runway. Enough to close the first commercial deal, get PetSounds51 into vet practices, and push SORTED to the audience it's built for.
          </p>
          <p className="text-gray-400 text-sm mt-3">
            At 5% — if even one of these five products reaches its market — this is a very good investment. If two do, it's exceptional.
          </p>
        </div>

        {/* Terms — plain and honest */}
        <div>
          <p className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-4">The Terms</p>
          <div className="space-y-3">
            <div className="p-4 border border-white/10 rounded-xl bg-white/[0.02]">
              <p className="text-white font-black text-sm mb-1">Equity — ordinary shares only</p>
              <p className="text-gray-400 text-sm leading-snug">No preference shares. No liquidation rights. No board seat. No veto. No control clauses. You're a shareholder with real upside — not a landlord.</p>
            </div>
            <div className="p-4 border border-white/10 rounded-xl bg-white/[0.02]">
              <p className="text-white font-black text-sm mb-1">Revenue share — skin in the game</p>
              <p className="text-gray-400 text-sm leading-snug">5% of net revenue (4% Walshy, 1% Graeme) until the £15k is fully returned — then it stops. The equity stays. So everyone wins fastest by making this succeed together.</p>
            </div>
            <div className="p-4 border border-white/10 rounded-xl bg-white/[0.02]">
              <p className="text-white font-black text-sm mb-1">Future raises</p>
              <p className="text-gray-400 text-sm leading-snug">Pro-rata rights — you can invest more in future rounds, never less. First look always.</p>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-4 leading-relaxed">
            One clean shareholders agreement. Plain English. No drag-along. If anything needs adjusting, say so — that's how this works. 🏴󠁧󠁢󠁳󠁣󠁬󠁿
          </p>
        </div>

        {/* CTA */}
        <div className="pt-2 pb-16">
          <div className="h-px bg-gradient-to-r from-cyan-500/60 via-cyan-500/20 to-transparent mb-8" />

          <button
            onClick={() => setShown(!shown)}
            className="w-full py-4 border-2 border-cyan-500 text-cyan-400 font-black text-sm tracking-widest uppercase rounded-xl hover:bg-cyan-500/10 transition-all mb-4"
          >
            {shown ? "Hide Contact" : "I Want to Know More"}
          </button>

          {shown && (
            <div className="text-center space-y-2 p-5 border border-cyan-500/30 rounded-xl bg-cyan-500/5">
              <p className="text-white font-black">Brian Hughes</p>
              <p className="text-cyan-400 text-sm">brian@universalfrequency51.com</p>
              <p className="text-gray-500 text-xs mt-3">Or just tell Graeme — he knows where I am. 🦆</p>
            </div>
          )}

          <p className="text-center text-gray-600 text-xs mt-6">
            UF51 · universalfrequency51.com · Glasgow 🏴󠁧󠁢󠁳󠁣󠁬󠁿
          </p>
        </div>

      </div>
    </div>
  );
}