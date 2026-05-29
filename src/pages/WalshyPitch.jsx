import React, { useState } from 'react';

export default function WalshyPitch() {
  const [shown, setShown] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="max-w-xl mx-auto px-6 py-16 space-y-14">

        {/* Header */}
        <div>
          <p className="text-xs tracking-[0.3em] text-gray-600 uppercase mb-6">Private · Via Graeme</p>
          <h1 className="text-4xl font-black leading-tight mb-5">
            Five AI products.<br />
            All live.<br />
            <span className="text-cyan-400">One person built them.</span>
          </h1>
          <p className="text-gray-400 leading-relaxed">
            This isn't a pitch deck. There's no company yet, no office, no team. 
            Just working software solving real problems — and a straightforward ask from someone Graeme vouches for.
          </p>
        </div>

        <div className="h-px bg-white/10" />

        {/* The products — minimal */}
        <div className="space-y-5">
          <p className="text-xs tracking-widest text-gray-500 uppercase">What's Built</p>
          {[
            ["PetSounds51", "Sound therapy for anxious animals. Science-backed. Vet partnerships in progress."],
            ["SORTED", "Paste in any scary letter — HMRC, landlord, debt collector. Get plain English back. No data stored."],
            ["CTRL51", "AI fraud detection for council procurement. One client at £5k/month pays for everything."],
            ["CB51", "AI co-manager for bands. Gig offers, voting, contracts — automated."],
            ["Learn51", "Free AI tutoring. No login. Every child on Earth. Already live."],
          ].map(([name, desc]) => (
            <div key={name} className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
              <div>
                <span className="font-black text-white">{name} — </span>
                <span className="text-gray-400 text-sm">{desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/10" />

        {/* Market */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">The Timing</p>
          <p className="text-gray-300 leading-relaxed">
            Most AI right now is noise. What's rare is working software that solves specific problems with real users. 
            The gap between where this is and where it could be with three months of proper runway is genuinely small.
          </p>
        </div>

        <div className="h-px bg-white/10" />

        {/* Graeme */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">Graeme's Part</p>
          <p className="text-gray-300 leading-relaxed">
            He's not just the intro. He's been thinking through the strategy — 
            vet TV screen distribution, the right media partners for SORTED, who to talk to next. 
            He's part of this. 1% equity, same terms. First look forever.
          </p>
        </div>

        <div className="h-px bg-white/10" />

        {/* The ask */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">The Ask</p>
          <div className="mb-6">
            <p className="text-5xl font-black text-white">£15,000</p>
            <p className="text-cyan-400 font-bold mt-1">5% equity · Walshy &nbsp;·&nbsp; 1% equity · Graeme</p>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            Three months of runway. Enough to close the first commercial deal and push the products to the audiences they're built for. 
            Revenue share on net revenue until the £15k comes back — then it stops. The equity stays.
          </p>
        </div>

        <div className="h-px bg-white/10" />

        {/* Terms — plain */}
        <div>
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">The Deal</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>— Ordinary shares only. No preference, no board seat, no control.</li>
            <li>— Revenue share stops the moment £15k is returned.</li>
            <li>— Pro-rata rights on future raises. First look always.</li>
            <li>— One clean agreement. Plain English. Nothing hidden.</li>
          </ul>
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

          <p className="text-center text-gray-700 text-xs mt-8">
            UF51 · Glasgow 🏴󠁧󠁢󠁳󠁣󠁬󠁿
          </p>
        </div>

      </div>
    </div>
  );
}