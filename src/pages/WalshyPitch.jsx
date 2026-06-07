import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { COOLASFUCKWaves, COOLASFUCKPaw, COOLASFUCKSorted } from '@/components/shared/COOLASFUCKIcon';

export default function WalshyPitch() {
  const [showStructure, setShowStructure] = useState(false);

  return (
    <div className="min-h-screen text-gray-900" style={{ background: 'linear-gradient(135deg, #fffbf0 0%, #fff8e8 50%, #f0f9ff 100%)', fontFamily: 'system-ui, sans-serif' }}>

      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-amber-300 bg-white/80 hover:bg-amber-50 transition-colors text-amber-700"
        >
          <Download className="w-4 h-4" />
          Save as PDF
        </button>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      <div className="max-w-2xl mx-auto px-8 pt-16 pb-24">

        {/* HEADER */}
        <div className="mb-4">
          <span className="text-xs font-mono text-amber-500/80 tracking-widest uppercase">Private & Confidential — June 2026</span>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <COOLASFUCKWaves size={44} animate={true} />
          <div>
            <h1 className="text-3xl font-black text-gray-900 leading-tight">Universal Frequency 51</h1>
            <p className="text-amber-600 text-sm font-mono mt-0.5">universalfrequency51.com</p>
          </div>
        </div>

        <p className="text-gray-500 text-base mb-10 leading-relaxed">
          An honest conversation. Not a pitch deck.
        </p>

        <div className="h-px mb-10" style={{ background: 'linear-gradient(90deg, #f59e0b40, transparent)' }} />

        {/* WHAT IT IS */}
        <div className="mb-12">
          <p className="text-gray-700 leading-relaxed mb-4">
            UF51 is three AI products built for markets that are genuinely underserved. All live. All working. Each one sits in a space where the incumbents are slow, expensive, or simply haven't shown up yet.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The stack underneath isn't a website with a chatbot bolted on. It runs on language models, acoustic AI, computer vision, and a verified public data ledger — infrastructure that would cost an enterprise team a year and serious budget to replicate.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Chris has spent his career sitting across the table from exactly the brands these products need to reach. That's the conversation.
          </p>
        </div>

        {/* THE 3 PRODUCTS */}
        <div className="mb-12">
          <h2 className="text-sm font-black text-gray-400 mb-6 tracking-widest uppercase font-mono">The Three Products</h2>

          {/* PetSounds51 */}
          <div className="rounded-2xl p-6 mb-5 border border-amber-200" style={{ background: 'linear-gradient(135deg, #fffbf0, #fff3d0)' }}>
            <div className="flex items-center gap-3 mb-4">
              <COOLASFUCKPaw size={32} />
              <div>
                <h3 className="font-black text-gray-900 text-lg">PetSounds51</h3>
                <p className="text-amber-600 text-xs font-mono">Sound therapy for anxious animals · live · subscription</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Acoustic protocols for dogs, cats and horses — separation anxiety, fireworks, vet visits. Peer-reviewed research. Works from a phone. No appointment, no prescription. The UK pet care market is <strong className="text-gray-900">£7.9 billion</strong> and pet anxiety is one of its fastest-growing and least-served segments.
            </p>
            <div className="border-t border-amber-200 pt-4 mt-2">
              <p className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-2">The unlock</p>
              <p className="text-gray-600 text-sm leading-relaxed">One vet endorsement changes the entire commercial story. Pet insurers would pay us — not users — to reduce anxiety-related claims. PHD clients with a pet or wellness category could white-label this tomorrow. The product is ready.</p>
            </div>
          </div>

          {/* SORTED */}
          <div className="rounded-2xl p-6 mb-5 border border-blue-200" style={{ background: 'linear-gradient(135deg, #f0f7ff, #e8f4ff)' }}>
            <div className="flex items-center gap-3 mb-4">
              <COOLASFUCKSorted size={32} />
              <div>
                <h3 className="font-black text-gray-900 text-lg">SORTED</h3>
                <p className="text-blue-600 text-xs font-mono">Plain English for scary letters · live · subscription</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Someone gets a letter from HMRC, a bailiff, a council. They don't understand it and don't know what to do. SORTED reads it and tells them — plain English, any language, in seconds. Nothing stored. Legal aid has been gutted. Citizens Advice is overwhelmed. The UK legal tech market is projected at <strong className="text-gray-900">£25 billion by 2030</strong>. Nobody has built the access-to-justice end properly.
            </p>
            <div className="border-t border-blue-200 pt-4 mt-2">
              <p className="text-xs font-mono text-blue-500 uppercase tracking-widest mb-2">The unlock</p>
              <p className="text-gray-600 text-sm leading-relaxed">HSBC has a legal obligation under FCA Consumer Duty to demonstrate real support for vulnerable customers. SORTED solves that problem directly. PHD manages their media. Chris knows the room. Banks, utilities, housing associations all have the same need and the same budget pressure.</p>
            </div>
          </div>

          {/* Earth51 */}
          <div className="rounded-2xl p-6 mb-5 border border-green-200" style={{ background: 'linear-gradient(135deg, #f0fdf4, #e8fdf0)' }}>
            <div className="flex items-center gap-3 mb-4">
              <COOLASFUCKWaves size={32} animate={false} />
              <div>
                <h3 className="font-black text-gray-900 text-lg">Earth51</h3>
                <p className="text-green-600 text-xs font-mono">Verified environmental data · live</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              People log litter picks. Computer vision verifies the photos. Everything lands on a public data ledger — auditable, community-scale environmental impact. ESG reporting is now a legal requirement for large UK companies. Verified ground truth is exactly what they need. Almost nobody has built it at community scale. Earth51 has.
            </p>
            <div className="border-t border-green-200 pt-4 mt-2">
              <p className="text-xs font-mono text-green-500 uppercase tracking-widest mb-2">The unlock</p>
              <p className="text-gray-600 text-sm leading-relaxed">One paid council pilot. PHD's work with British Heart Foundation is the model — purpose-led, community-scale, genuinely measurable. Earth51 produces the verified environmental data that makes those campaigns credible. Someone who understands how that story gets told to a board matters.</p>
            </div>
          </div>
        </div>

        {/* WHAT £20K DOES */}
        <div className="mb-12">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase font-mono">What £20k does</h2>
          <div className="rounded-2xl p-6 border border-gray-200 bg-white/70">
            <p className="text-gray-700 leading-relaxed mb-4">
              Runway. Three months of oxygen to stop reacting and start building the right conversations:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-3"><span className="text-amber-500 mt-0.5 font-bold">—</span> Platform infrastructure, AI compute, hosting — the engine running properly</li>
              <li className="flex items-start gap-3"><span className="text-amber-500 mt-0.5 font-bold">—</span> PetSounds51 vet partnership — one letter of endorsement changes the commercial story</li>
              <li className="flex items-start gap-3"><span className="text-amber-500 mt-0.5 font-bold">—</span> SORTED B2B approach — HSBC, financial services, utilities, housing</li>
              <li className="flex items-start gap-3"><span className="text-amber-500 mt-0.5 font-bold">—</span> Earth51 council pilot scoped and proposed</li>
              <li className="flex items-start gap-3"><span className="text-amber-500 mt-0.5 font-bold">—</span> UF51 Commercial Ltd properly set up — clean investment structure from day one</li>
            </ul>
          </div>
        </div>

        {/* THE OFFER */}
        <div className="mb-6">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase font-mono">The offer</h2>
          <div className="rounded-2xl p-6 border border-amber-200" style={{ background: 'linear-gradient(135deg, #fffbf0, #fff3d0)' }}>
            <p className="text-gray-800 leading-relaxed mb-4 text-lg">
              <span className="text-amber-600 font-black">17% equity in UF51 Commercial Ltd</span> for £20,000. One stake across all three products.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              UF51 CIC retains <strong className="text-gray-800">10% of commercial revenue</strong> as a community dividend — keeping the core tools free for the people who need them most. That's structural, not optional.
            </p>
            <div className="bg-white/60 rounded-xl p-4 border border-amber-100">
              <p className="text-sm text-gray-600">
                <span className="text-gray-800 font-bold">SEIS:</span> If UF51 Commercial Ltd qualifies, Chris could claim up to 50% income tax relief — reducing the effective outlay to around £10k. Worth checking with an accountant before we proceed.
              </p>
            </div>
          </div>
        </div>

        {/* EQUITY STRUCTURE */}
        <div className="mb-12">
          <button
            onClick={() => setShowStructure(!showStructure)}
            className="flex items-center gap-2 text-gray-400 text-sm hover:text-gray-600 transition-colors mt-3"
          >
            {showStructure ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Show proposed equity structure
          </button>
          {showStructure && (
            <div className="mt-4 rounded-2xl p-5 border border-gray-200 bg-white/60">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Founder</span>
                  <span className="font-black text-gray-900">80%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Chris Walsh (Investor)</span>
                  <span className="font-black text-amber-600">17%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Graeme (Advisor)</span>
                  <span className="font-black text-blue-500">3%</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-2">
                  <span className="text-gray-400">UF51 CIC (community dividend)</span>
                  <span className="font-black text-green-500">10% of revenue</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">Starting point — open to conversation.</p>
            </div>
          )}
        </div>

        {/* GRAEME */}
        <div className="mb-12">
          <div className="rounded-2xl p-6 border border-gray-100 bg-white/50">
            <h3 className="font-black text-gray-800 mb-2">A note on Graeme</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Graeme made this introduction. That matters and we don't forget it. 3% advisory equity plus a finder's arrangement — that's a separate conversation, but it will happen.
            </p>
          </div>
        </div>

        {/* WHAT CHRIS BRINGS */}
        <div className="mb-12">
          <h2 className="text-sm font-black text-gray-400 mb-4 tracking-widest uppercase font-mono">Beyond the capital</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            The right introduction at the right moment is worth more than the investment itself. Chris has spent his career at the intersection of exactly where these three products need to go.
          </p>
          <div className="space-y-5">
            <div className="border-l-4 border-amber-300 pl-5">
              <p className="text-sm font-black text-gray-800 mb-1">Pet retail and wellness brands</p>
              <p className="text-sm text-gray-500 leading-relaxed">Major retailers and FMCG brands have wellness programmes with nothing real to point customers to. PetSounds51 is science-backed and white-label ready. Someone who's had budget conversations at that level knows exactly how to position it.</p>
            </div>
            <div className="border-l-4 border-blue-300 pl-5">
              <p className="text-sm font-black text-gray-800 mb-1">Financial services and consumer brands</p>
              <p className="text-sm text-gray-500 leading-relaxed">SORTED belongs in the financial wellbeing strategy of every major UK bank. HSBC already has the FCA Consumer Duty obligation — they must demonstrate real support for vulnerable customers. SORTED is exactly that product. PHD manages their media. Chris knows the room.</p>
            </div>
            <div className="border-l-4 border-green-300 pl-5">
              <p className="text-sm font-black text-gray-800 mb-1">ESG and cause-led campaigns</p>
              <p className="text-sm text-gray-500 leading-relaxed">PHD's work with British Heart Foundation is the model — purpose-led, community-scale, genuinely measurable. Earth51 produces the kind of verified environmental data that makes those campaigns credible. Someone who understands how that story gets told to a board matters.</p>
            </div>
          </div>
        </div>

        {/* CLOSE */}
        <div className="mb-14">
          <div className="rounded-2xl p-6 border border-amber-100" style={{ background: 'linear-gradient(135deg, #fffbf0, #fff8e8)' }}>
            <p className="text-gray-600 italic leading-relaxed text-base">
              "Three working products. Real markets. Proper technology. Early enough to matter — late enough to de-risk. That's the conversation."
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-amber-100 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <COOLASFUCKWaves size={20} animate={false} />
            <span className="text-xs text-gray-400 font-mono">universalfrequency51.com</span>
          </div>
          <p className="text-xs text-gray-300">Private — please don't share without permission</p>
        </div>

      </div>
    </div>
  );
}