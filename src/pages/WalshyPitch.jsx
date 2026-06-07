import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

export default function WalshyPitch() {
  const [showStructure, setShowStructure] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>

      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          <Download className="w-4 h-4" />
          Save / Print PDF
        </button>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      <div className="max-w-2xl mx-auto px-8 pt-16 pb-16">

        {/* HEADER */}
        <div className="mb-2">
          <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">Private & Confidential — June 2026</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-tight">
          Universal Frequency 51
        </h1>
        <p className="text-lg text-gray-500 mb-8">An early conversation about something real.</p>
        <div className="h-px bg-gray-200 mb-8" />

        {/* WHAT IT IS */}
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed mb-4">
            UF51 is an ecosystem of AI tools built for markets that are genuinely underserved — animal wellness, access to justice, and verified environmental data. Three products. All live. All working.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            The platform runs on a modern AI stack — language models, acoustic AI, computer vision, and a real-time verified data ledger. The kind of infrastructure that would take an enterprise team a year and a serious budget to build. It exists. It's running.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The window to get into these markets — before they're obvious, before they're crowded — is now. That's why this conversation is happening.
          </p>
        </div>

        {/* THE 3 PRODUCTS */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-6 text-gray-800">The Three Products</h2>

          <div className="border border-amber-200 rounded-lg p-6 mb-4 bg-amber-50">
            <div className="flex items-center gap-3 mb-3">
              <div>
                <h3 className="font-bold text-gray-900">PetSounds51</h3>
                <p className="text-sm text-amber-700">Sound therapy for anxious animals · live · subscription</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Acoustic protocols for dogs, cats and horses — separation anxiety, fireworks, vet visits. Peer-reviewed research. Works from any phone. No appointment. No prescription. The UK pet care market is worth <strong>£7.9 billion</strong> and growing fast — pet anxiety is one of its most under-served segments.
            </p>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">The unlock</p>
              <p className="text-sm text-gray-600">One vet partnership for endorsement. Pet insurers paying us to reduce anxiety-related claims. White-label for major retailers. The product is ready — it needs the right doors opened.</p>
            </div>
          </div>

          <div className="border border-blue-200 rounded-lg p-6 mb-4 bg-blue-50">
            <div className="flex items-center gap-3 mb-3">
              <div>
                <h3 className="font-bold text-gray-900">SORTED</h3>
                <p className="text-sm text-blue-700">Plain English for scary letters · live · subscription</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Someone gets a letter from HMRC, a bailiff, a council. They don't know what it means or what to do. SORTED reads it and explains it — plain English, any language, in seconds. Nothing stored. Legal aid has been gutted. Citizens Advice is overwhelmed. The UK legal tech market is projected at <strong>£25 billion by 2030</strong>. SORTED sits at the access-to-justice end that nobody has built well.
            </p>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">The unlock</p>
              <p className="text-sm text-gray-600">B2B white-label for housing associations, banks, utilities, local authorities. Any large consumer-facing brand with a financial wellbeing or vulnerability team needs exactly this — and has budget for it.</p>
            </div>
          </div>

          <div className="border border-green-200 rounded-lg p-6 mb-4 bg-green-50">
            <div className="flex items-center gap-3 mb-3">
              <div>
                <h3 className="font-bold text-gray-900">Earth51</h3>
                <p className="text-sm text-green-700">Verified environmental data · live</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              People log litter picks. Computer vision verifies the photos. Everything lands on a public data ledger — auditable, real environmental impact. ESG reporting is now a legal requirement for large UK companies. Verified community-scale ground truth is exactly what they need and almost nobody has built it properly. Earth51 has.
            </p>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">The unlock</p>
              <p className="text-sm text-gray-600">One paid council pilot. Corporate ESG data contracts. Schools programme — massive organic reach with zero ad spend.</p>
            </div>
          </div>
        </div>

        {/* WHAT £20K DOES */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">What £20k does</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Runway. Enough to stop reacting and start building the right partnerships:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">—</span> Platform infrastructure, AI compute, hosting — the engine running properly</li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">—</span> PetSounds51 vet partnership — one endorsement letter changes the commercial story</li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">—</span> SORTED B2B conversations — financial services, housing, charities</li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">—</span> Earth51 council pilot scoped and proposed</li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">—</span> UF51 Commercial Ltd set up clean — proper investment structure from day one</li>
            </ul>
          </div>
        </div>

        {/* THE OFFER */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">The offer</h2>
          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>17% equity in UF51 Commercial Ltd</strong> for £20,000. One stake across all three products.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              UF51 CIC retains <strong>10% of commercial revenue</strong> as a community dividend — keeping the core tools free for people who need them. That's structural, not optional.
            </p>
            <div className="bg-gray-50 rounded p-4">
              <p className="text-sm text-gray-600">
                <strong>SEIS:</strong> If UF51 Commercial Ltd qualifies, Chris could claim up to 50% income tax relief — reducing the effective outlay to around £10k. Worth a conversation with an accountant before we proceed.
              </p>
            </div>
          </div>
        </div>

        {/* EQUITY STRUCTURE */}
        <div className="mb-10">
          <button
            onClick={() => setShowStructure(!showStructure)}
            className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {showStructure ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Show proposed equity structure
          </button>
          {showStructure && (
            <div className="mt-4 border border-gray-100 rounded-lg p-5 bg-gray-50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Founder</span>
                  <span className="font-bold">80%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Chris Walsh (Investor)</span>
                  <span className="font-bold">17%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Graeme (Advisor)</span>
                  <span className="font-bold">3%</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-700">UF51 CIC (community dividend)</span>
                  <span className="font-bold">10% of revenue</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">Starting point — open to conversation.</p>
            </div>
          )}
        </div>

        {/* GRAEME */}
        <div className="mb-10">
          <div className="bg-gray-900 text-white rounded-lg p-6">
            <h3 className="font-bold mb-2">A note on Graeme</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Graeme made this introduction. That matters and we don't forget it. 3% advisory equity plus a finder's arrangement — that conversation is separate but it will happen.
            </p>
          </div>
        </div>

        {/* WHAT CHRIS BRINGS */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Beyond the capital</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-5">
            The right introduction at the right moment is worth more than the investment itself. Chris understands three worlds that map directly onto these products:
          </p>
          <div className="space-y-4">
            <div className="border-l-2 border-amber-400 pl-4">
              <p className="text-sm font-bold text-gray-800 mb-1">Pet retail and insurance</p>
              <p className="text-sm text-gray-600">Major pet retailers have wellness programmes with nothing real to point customers to. PetSounds51 is white-label ready and science-backed. One conversation at brand partnership level changes everything.</p>
            </div>
            <div className="border-l-2 border-blue-400 pl-4">
              <p className="text-sm font-bold text-gray-800 mb-1">Financial wellbeing and consumer brands</p>
              <p className="text-sm text-gray-600">SORTED's natural B2B home is any large brand with a financial wellbeing or vulnerable customer obligation — banks, utilities, housing associations. They have the budget and the regulatory pressure. The product is ready for that conversation.</p>
            </div>
            <div className="border-l-2 border-green-400 pl-4">
              <p className="text-sm font-bold text-gray-800 mb-1">ESG and impact storytelling</p>
              <p className="text-sm text-gray-600">Earth51 produces the kind of verified, community-scale data that ESG teams actually need — and knowing how to position that to the right corporate audience is its own skill. Chris has it.</p>
            </div>
          </div>
        </div>

        {/* CLOSE */}
        <div className="mb-12">
          <div className="border-l-4 border-gray-300 pl-6">
            <p className="text-gray-600 italic leading-relaxed text-sm">
              "Three working products. Real markets. Proper technology. Early enough to matter — late enough to de-risk. That's the conversation."
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">universalfrequency51.com · Private document — please don't share without permission</p>
        </div>

      </div>
    </div>
  );
}