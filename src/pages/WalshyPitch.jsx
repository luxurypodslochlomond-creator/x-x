import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { COOLASFUCKWaves, COOLASFUCKPaw, COOLASFUCKSorted } from '@/components/shared/COOLASFUCKIcon';

export default function WalshyPitch() {
  const [showStructure, setShowStructure] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>

      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          <Download className="w-4 h-4" />
          Save as PDF
        </button>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      <div className="max-w-2xl mx-auto px-8 pt-16 pb-20">

        {/* HEADER */}
        <div className="mb-3">
          <span className="text-xs font-mono text-cyan-500/60 tracking-widest uppercase">Private & Confidential — June 2026</span>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <COOLASFUCKWaves size={44} animate={true} />
          <div>
            <h1 className="text-3xl font-black text-white leading-tight">Universal Frequency 51</h1>
            <p className="text-cyan-400 text-sm font-mono mt-0.5">universalfrequency51.com</p>
          </div>
        </div>

        <p className="text-gray-400 text-base mb-8 leading-relaxed">
          An honest conversation. Not a pitch deck.
        </p>

        <div className="h-px bg-cyan-500/20 mb-10" />

        {/* WHAT IT IS */}
        <div className="mb-12">
          <p className="text-gray-300 leading-relaxed mb-4">
            UF51 is three AI products built for markets that are genuinely underserved. All live. All working. Each one sits in a space where the incumbents are slow, expensive, or simply haven't shown up yet.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            The stack underneath isn't a website with a chatbot bolted on. It runs on language models, acoustic AI, computer vision, and a verified public data ledger — infrastructure that would cost an enterprise team a year and serious budget to replicate.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Chris has spent his career sitting across the table from exactly the brands these products need to reach. That's the conversation.
          </p>
        </div>

        {/* THE 3 PRODUCTS */}
        <div className="mb-12">
          <h2 className="text-lg font-black text-white mb-6 tracking-wide uppercase font-mono">The Three Products</h2>

          {/* PetSounds51 */}
          <div className="border border-amber-500/30 rounded-xl p-6 mb-4 bg-amber-500/5">
            <div className="flex items-center gap-3 mb-4">
              <COOLASFUCKPaw size={28} />
              <div>
                <h3 className="font-black text-white">PetSounds51</h3>
                <p className="text-amber-400 text-xs font-mono">Sound therapy for anxious animals · live · subscription</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Acoustic protocols for dogs, cats and horses — separation anxiety, fireworks, vet visits. Peer-reviewed research. Works from a phone. No appointment, no prescription. The UK pet care market is <strong className="text-white">£7.9 billion</strong> and pet anxiety is one of its fastest-growing and least-served segments.
            </p>
            <div className="border-t border-amber-500/20 pt-4">
              <p className="text-xs font-mono text-amber-500/70 uppercase tracking-widest mb-2">The unlock</p>
              <p className="text-gray-400 text-sm">One vet endorsement changes the entire commercial story. Pet insurers would pay us — not users — to reduce anxiety-related claims. PHD clients like Andrex, VW or any major retailer with a pet category could white-label this tomorrow. The product is ready.</p>
            </div>
          </div>

          {/* SORTED */}
          <div className="border border-blue-500/30 rounded-xl p-6 mb-4 bg-blue-500/5">
            <div className="flex items-center gap-3 mb-4">
              <COOLASFUCKSorted size={28} />
              <div>
                <h3 className="font-black text-white">SORTED</h3>
                <p className="text-blue-400 text-xs font-mono">Plain English for scary letters · live · subscription</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Someone gets a letter from HMRC, a bailiff, a council. They don't understand it and don't know what to do. SORTED reads it and tells them — plain English, any language, in seconds. Nothing stored. Legal aid has been gutted. Citizens Advice is overwhelmed. The UK legal tech market is projected at <strong className="text-white">£25 billion by 2030</strong>. Nobody has built the access-to-justice end properly.
            </p>
            <div className="border-t border-blue-500/20 pt-4">
              <p className="text-xs font-mono text-blue-500/70 uppercase tracking-widest mb-2">The unlock</p>
              <p className="text-gray-400 text-sm">B2B white-label. HSBC has a legal obligation under FCA Consumer Duty to support vulnerable customers — SORTED solves that problem directly. PHD runs their media. That is one conversation away. Banks, utilities, housing associations all have the same need and the same budget pressure.</p>
            </div>
          </div>

          {/* Earth51 */}
          <div className="border border-green-500/30 rounded-xl p-6 mb-4 bg-green-500/5">
            <div className="flex items-center gap-3 mb-4">
              <COOLASFUCKWaves size={28} animate={false} />
              <div>
                <h3 className="font-black text-white">Earth51</h3>
                <p className="text-green-400 text-xs font-mono">Verified environmental data · live</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              People log litter picks. Computer vision verifies the photos. Everything lands on a public data ledger — auditable, community-scale environmental impact. ESG reporting is now a legal requirement for large UK companies. Verified ground truth is exactly what they need. Almost nobody has built it at community scale. Earth51 has.
            </p>
            <div className="border-t border-green-500/20 pt-4">
              <p className="text-xs font-mono text-green-500/70 uppercase tracking-widest mb-2">The unlock</p>
              <p className="text-gray-400 text-sm">One paid council pilot. Corporate ESG data contracts — the British Heart Foundation approach PHD used at community scale is exactly the model. Schools programme generates organic reach with zero ad spend.</p>
            </div>
          </div>
        </div>

        {/* WHAT £20K DOES */}
        <div className="mb-12">
          <h2 className="text-lg font-black text-white mb-4 tracking-wide uppercase font-mono">What £20k does</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Runway. Three months of oxygen to stop reacting and start building the right conversations:
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-3"><span className="text-cyan-500 mt-0.5">—</span> Platform infrastructure, AI compute, hosting — the engine running properly</li>
              <li className="flex items-start gap-3"><span className="text-cyan-500 mt-0.5">—</span> PetSounds51 vet partnership — one letter of endorsement changes the commercial story</li>
              <li className="flex items-start gap-3"><span className="text-cyan-500 mt-0.5">—</span> SORTED B2B approach — financial services, housing, utilities</li>
              <li className="flex items-start gap-3"><span className="text-cyan-500 mt-0.5">—</span> Earth51 council pilot scoped and proposed</li>
              <li className="flex items-start gap-3"><span className="text-cyan-500 mt-0.5">—</span> UF51 Commercial Ltd properly set up — clean investment structure from day one</li>
            </ul>
          </div>
        </div>

        {/* THE OFFER */}
        <div className="mb-8">
          <h2 className="text-lg font-black text-white mb-4 tracking-wide uppercase font-mono">The offer</h2>
          <div className="border border-cyan-500/30 rounded-xl p-6 bg-cyan-500/5">
            <p className="text-gray-200 leading-relaxed mb-4">
              <span className="text-cyan-400 font-black">17% equity in UF51 Commercial Ltd</span> for £20,000. One stake across all three products.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              UF51 CIC retains <strong className="text-white">10% of commercial revenue</strong> as a community dividend — keeping the core tools free for the people who need them most. That's structural, not optional.
            </p>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400">
                <span className="text-white font-bold">SEIS:</span> If UF51 Commercial Ltd qualifies, Chris could claim up to 50% income tax relief — reducing the effective outlay to around £10k. Worth checking with an accountant before we proceed.
              </p>
            </div>
          </div>
        </div>

        {/* EQUITY STRUCTURE */}
        <div className="mb-12">
          <button
            onClick={() => setShowStructure(!showStructure)}
            className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-300 transition-colors"
          >
            {showStructure ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Show proposed equity structure
          </button>
          {showStructure && (
            <div className="mt-4 border border-white/10 rounded-xl p-5 bg-white/5">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Founder</span>
                  <span className="font-black text-white">80%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Chris Walsh (Investor)</span>
                  <span className="font-black text-cyan-400">17%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Graeme (Advisor)</span>
                  <span className="font-black text-amber-400">3%</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-2">
                  <span className="text-gray-400">UF51 CIC (community dividend)</span>
                  <span className="font-black text-green-400">10% of revenue</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">Starting point — open to conversation.</p>
            </div>
          )}
        </div>

        {/* GRAEME */}
        <div className="mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-black text-white mb-2">A note on Graeme</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Graeme made this introduction. That matters and we don't forget it. 3% advisory equity plus a finder's arrangement — that's a separate conversation, but it will happen.
            </p>
          </div>
        </div>

        {/* WHAT CHRIS BRINGS */}
        <div className="mb-12">
          <h2 className="text-lg font-black text-white mb-4 tracking-wide uppercase font-mono">Beyond the capital</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            The right introduction at the right moment is worth more than the investment itself. Chris has spent his career at the intersection of exactly where these three products need to go.
          </p>
          <div className="space-y-4">
            <div className="border-l-2 border-amber-500 pl-5">
              <p className="text-sm font-black text-white mb-1">Pet retail and wellness brands</p>
              <p className="text-sm text-gray-400 leading-relaxed">Major retailers and FMCG brands have wellness programmes with nothing real to point customers to. PetSounds51 is science-backed and white-label ready. Someone who's had budget conversations at that level knows exactly how to position it.</p>
            </div>
            <div className="border-l-2 border-blue-500 pl-5">
              <p className="text-sm font-black text-white mb-1">Financial services and consumer brands</p>
              <p className="text-sm text-gray-400 leading-relaxed">SORTED belongs in the financial wellbeing strategy of every major UK bank. HSBC already has the FCA Consumer Duty obligation — they must demonstrate real support for vulnerable customers. SORTED is exactly that product. PHD manages their media. Chris knows the room.</p>
            </div>
            <div className="border-l-2 border-green-500 pl-5">
              <p className="text-sm font-black text-white mb-1">ESG and cause-led campaigns</p>
              <p className="text-sm text-gray-400 leading-relaxed">PHD's work with British Heart Foundation is the model — purpose-led, community-scale, genuinely measurable. Earth51 produces the kind of verified environmental data that makes those campaigns credible. Someone who understands how that story gets told to a board matters.</p>
            </div>
          </div>
        </div>

        {/* CLOSE */}
        <div className="mb-12">
          <div className="border-l-4 border-cyan-500/50 pl-6">
            <p className="text-gray-400 italic leading-relaxed">
              "Three working products. Real markets. Proper technology. Early enough to matter — late enough to de-risk. That's the conversation."
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-white/10 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <COOLASFUCKWaves size={20} animate={false} />
            <span className="text-xs text-gray-600 font-mono">universalfrequency51.com</span>
          </div>
          <p className="text-xs text-gray-700">Private — please don't share without permission</p>
        </div>

      </div>
    </div>
  );
}