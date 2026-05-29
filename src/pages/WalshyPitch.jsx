import React, { useState } from 'react';

export default function WalshyPitch() {
  const [shown, setShown] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      
      {/* HERO */}
      <div className="max-w-2xl mx-auto px-6 pt-16 pb-8">
        <div className="mb-2">
          <span className="text-xs font-black tracking-[0.3em] text-cyan-400 uppercase">UF51 · Private Brief</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
          Built 5 products.<br />
          <span className="text-cyan-400">Need a mate.</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          This is a straight-up honest ask from a builder who's gone all-in. No deck. No jargon. Just the truth.
        </p>
      </div>

      {/* DIVIDER */}
      <div className="max-w-2xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-cyan-500/60 via-cyan-500/20 to-transparent" />
      </div>

      {/* WHO / WHAT */}
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">

        {/* The builder */}
        <div>
          <p className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-3">Who</p>
          <p className="text-white text-lg leading-relaxed">
            Brian Hughes. Glasgow. Built everything you're about to read on his own — no team, no funding, no salary — while in debt, keeping the lights on at Stoneymollan.
          </p>
        </div>

        {/* What's been built */}
        <div>
          <p className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-4">What's Been Built</p>
          <div className="space-y-3">
            {[
              { name: "PetSounds51", desc: "Sound therapy for anxious animals. Peer-reviewed science. Vet TV screen deal incoming. Global market.", color: "text-amber-400" },
              { name: "SORTED", desc: "Paste in a scary letter. Get plain English back in seconds. Any language. Nothing stored. Huge market — legal, financial services, NHS.", color: "text-green-400" },
              { name: "CTRL51", desc: "AI procurement fraud detection for councils. £5k/month per client. One client = £60k/year.", color: "text-purple-400" },
              { name: "CB51", desc: "AI co-manager for bands and artists. Gig offers, contracts, voting, band comms. Fully live.", color: "text-blue-400" },
              { name: "Learn51", desc: "Free AI tutoring for every child on Earth. No login. Works offline. Already live.", color: "text-pink-400" },
            ].map(p => (
              <div key={p.name} className="flex gap-4 p-4 border border-white/10 rounded-xl bg-white/[0.02]">
                <div className="flex-1">
                  <span className={`font-black text-base ${p.color}`}>{p.name}</span>
                  <p className="text-gray-400 text-sm mt-0.5 leading-snug">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Honest bit */}
        <div className="border border-amber-500/30 rounded-xl p-5 bg-amber-500/5">
          <p className="text-xs font-black tracking-widest text-amber-400 uppercase mb-3">The Honest Bit</p>
          <p className="text-white leading-relaxed">
            None of these are making money yet. They're built, live, and real — but Brian hasn't had the runway to market them properly. He's been building while surviving. That ends with this conversation.
          </p>
        </div>

        {/* The ask */}
        <div className="border border-cyan-500/40 rounded-xl p-6 bg-cyan-500/5">
          <p className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-3">The Ask</p>
          <div className="text-5xl font-black text-white mb-2">£15,000</div>
          <p className="text-cyan-300 font-bold mb-4">5% equity in UF51 Ltd</p>
          <p className="text-gray-300 leading-relaxed text-sm">
            That's 3 months of real runway. Enough to get PetSounds51 onto vet TV screens, close the first CTRL51 council deal, and finally push SORTED to the market it deserves. 
            <br /><br />
            If even one of these works — and honestly, all five can — 5% is worth a lot more than £15k.
          </p>
        </div>

        {/* What Walshy gets */}
        <div>
          <p className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-4">What You Get</p>
          <div className="space-y-2">
            {[
              "5% equity in UF51 Ltd — properly documented",
              "First look at every future raise",
              "Revenue share option on PetSounds51 vet deal",
              "A builder who doesn't stop — ever",
              "Graeme vouching for every word on this page",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <span className="text-gray-200 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Martin Lewis angle */}
        <div className="border border-green-500/30 rounded-xl p-5 bg-green-500/5">
          <p className="text-xs font-black tracking-widest text-green-400 uppercase mb-3">The Big Door</p>
          <p className="text-white text-sm leading-relaxed">
            Graeme mentioned Martin Lewis. SORTED is exactly what MoneySavingExpert users need — plain English help with scary financial letters. Martin Lewis isn't a competitor. He's the route to MoneySupermarket-level distribution. If Walshy can open that door, the £15k becomes irrelevant very quickly.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-4 pb-16">
          <div className="h-px bg-gradient-to-r from-cyan-500/60 via-cyan-500/20 to-transparent mb-8" />
          
          <button
            onClick={() => setShown(!shown)}
            className="w-full py-4 border-2 border-cyan-500 text-cyan-400 font-black text-sm tracking-widest uppercase rounded-xl hover:bg-cyan-500/10 transition-all mb-4"
          >
            {shown ? "Hide Contact" : "I'm Interested — Show Contact"}
          </button>

          {shown && (
            <div className="text-center space-y-2 p-5 border border-cyan-500/30 rounded-xl bg-cyan-500/5">
              <p className="text-white font-black">Brian Hughes</p>
              <p className="text-cyan-400 text-sm">brian@universalfrequency51.com</p>
              <p className="text-gray-500 text-xs mt-3">Or just message Graeme. He knows where I am. 🦆</p>
            </div>
          )}

          <p className="text-center text-gray-600 text-xs mt-6">
            UF51 · universalfrequency51.com · Built in Glasgow 🏴󠁧󠁢󠁳󠁣󠁬󠁿
          </p>
        </div>

      </div>
    </div>
  );
}