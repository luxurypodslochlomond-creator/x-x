import React, { useState } from 'react';

export default function WalshyPitch() {
  const [shown, setShown] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="max-w-xl mx-auto px-6 py-16 space-y-12">

        {/* Header */}
        <div>
          <p className="text-xs tracking-[0.3em] text-gray-600 uppercase mb-6">Via Graeme · Private</p>
          <h1 className="text-4xl font-black leading-tight mb-5">
            Not looking for cash.<br />
            <span className="text-cyan-400">Looking for the right partner.</span>
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Graeme's idea was smarter than a straight investment — 
            what if Chris brought services instead? Marketing, production, distribution. 
            Things that cost money to buy but cost a partner almost nothing to provide.
          </p>
        </div>

        <div className="h-px bg-white/10" />

        {/* The litter app — the real entry point */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">The Entry Point</p>
          <p className="text-white font-black text-lg mb-3">The Litter App.</p>
          <p className="text-gray-400 leading-relaxed text-sm">
            There's a working environmental cleanup app — people photograph litter, earn tokens, build community. 
            It needs polish. A small advance — based on the hours of work left to get it to market — 
            is the most concrete ask here. It's not speculative. It's paying for defined work that's almost done.
          </p>
          <div className="mt-4 p-4 border border-cyan-500/20 rounded-lg bg-cyan-500/5 text-sm text-gray-300">
            The hours are knowable. The cost is real. The market — environmental action apps, 
            council partnerships, ESG funding — is genuinely massive. 
            And it's the kind of thing that makes good press.
          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* Services angle */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">Where Services Could Land</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            If Chris has access to any of these — even one — it changes everything:
          </p>
          <div className="space-y-4">
            {[
              {
                title: "PetSounds51 — a proper ad.",
                desc: "Sound therapy for anxious dogs, cats, horses. Peer-reviewed science. No competitor. It just needs the right creative to reach the audience. Think funny, warm, Scottish. Think the kind of ad people share. This could go global overnight with the right 30 seconds."
              },
              {
                title: "SORTED — media & distribution.",
                desc: "A tool that decodes scary legal letters in plain English. Any language. Nothing stored. The audience is enormous — every person who's ever been afraid to open a brown envelope. Martin Lewis's audience. Citizens Advice's audience. The right media partnership and this writes itself."
              },
              {
                title: "Litter app — council & brand partnerships.",
                desc: "Environmental action with verified proof. Brands pay for that. Councils need it. ESG funds love it. Introductions to the right people — procurement, marketing, sustainability leads — is worth more than any cash."
              },
            ].map(({ title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-black text-white text-sm mb-1">{title}</p>
                  <p className="text-gray-400 text-sm leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* Global markets — Graeme's framing */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">The Scale</p>
          <p className="text-gray-300 leading-relaxed text-sm">
            Graeme's instinct was right — the products here aren't local. 
            Pet anxiety is a global problem. Legal fear is a global problem. 
            Environmental action is a global problem. 
            None of this needs to start global — but it's built to be.
          </p>
          <p className="text-gray-500 text-sm mt-3">
            The right partner doesn't need to fund the world. 
            They just need to open one door in the right market.
          </p>
        </div>

        <div className="h-px bg-white/10" />

        {/* If it IS cash */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">If It Is Cash</p>
          <div className="mb-4">
            <p className="text-4xl font-black text-white">£15,000</p>
            <p className="text-cyan-400 font-bold mt-1 text-sm">5% equity · Walshy &nbsp;·&nbsp; 1% equity · Graeme</p>
          </div>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>— Ordinary shares only. No board seat. No control.</li>
            <li>— Revenue share until the £15k comes back — then stops.</li>
            <li>— Pro-rata rights on every future raise.</li>
            <li>— One clean agreement. Plain English.</li>
          </ul>
        </div>

        <div className="h-px bg-white/10" />

        {/* Graeme */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-3">Graeme's Part</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            1% equity, same deal, same terms. He didn't just make an introduction — 
            he's been thinking through the strategy. He's part of this properly.
          </p>
        </div>

        <div className="h-px bg-white/10" />

        {/* CTA */}
        <div className="pb-8">
          <button
            onClick={() => setShown(!shown)}
            className="w-full py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase rounded-lg hover:border-cyan-500/60 hover:text-cyan-400 transition-all"
          >
            {shown ? "Close" : "Get in Touch"}
          </button>

          {shown && (
            <div className="mt-5 text-center space-y-1">
              <p className="text-white font-black">Brian Hughes</p>
              <p className="text-cyan-400 text-sm">brian@universalfrequency51.com</p>
              <p className="text-gray-600 text-xs mt-3">Or just ask Graeme. He knows where I am. 🦆</p>
            </div>
          )}

          <p className="text-center text-gray-700 text-xs mt-8">UF51 · Glasgow 🏴󠁧󠁢󠁳󠁣󠁬󠁿</p>
        </div>

      </div>
    </div>
  );
}