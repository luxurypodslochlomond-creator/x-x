import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

export default function WalshyPitch() {
  const [showStructure, setShowStructure] = useState(false);

  const handleSave = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>

      {/* SAVE BUTTON — admin only, hidden on print */}
      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={handleSave}
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
        <p className="text-lg text-gray-500 mb-8">An invitation to be part of something early.</p>
        <div className="h-px bg-gray-200 mb-8" />

        {/* THE HUMAN BIT */}
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed mb-4">
            Brian Hughes built this. Not a startup founder. Not a VC-backed exec. Someone who went through the worst of it — lost everything, rebuilt himself through music and tech — and decided to use what he'd learned to help people who were going through the same.
          </p>
          <p className="text-gray-700 leading-relaxed">
            What exists today is working software covering three areas that matter: <strong>animal welfare, environmental action, and access to justice</strong>. Built on nothing. No investment. No team. Just someone who wouldn't stop.
          </p>
        </div>

        {/* THE 3 PRODUCTS */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-6 text-gray-800">The Three Products</h2>

          {/* PetSounds51 */}
          <div className="border border-amber-200 rounded-lg p-6 mb-4 bg-amber-50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🐾</span>
              <div>
                <h3 className="font-bold text-gray-900">PetSounds51</h3>
                <p className="text-sm text-amber-700">Sound therapy for anxious animals</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Acoustic protocols for dogs, cats and horses — separation anxiety, fireworks, vet visits. Based on peer-reviewed research. Works from a phone. No prescription. No vet appointment.
            </p>
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">What it needs next</p>
              <p className="text-sm text-gray-600">→ A proper vet partnership to legitimise it — one letter of endorsement changes everything</p>
              <p className="text-sm text-gray-600">→ A pet insurance tie-in — they'd pay us, not users, to reduce anxiety-related claims</p>
              <p className="text-sm text-gray-600">→ £9.99/month or £29.99/year — 1,000 subscribers = £120k/year. We're not there yet but the product works</p>
            </div>
          </div>

          {/* SORTED */}
          <div className="border border-blue-200 rounded-lg p-6 mb-4 bg-blue-50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">⚖️</span>
              <div>
                <h3 className="font-bold text-gray-900">SORTED</h3>
                <p className="text-sm text-blue-700">Plain English for scary letters</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              You get a letter from HMRC, a bailiff, a council, a landlord. You don't know what it means or what to do. SORTED reads it and tells you — in plain English, in your language, in seconds. Nothing stored. Completely private.
            </p>
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">What it needs next</p>
              <p className="text-sm text-gray-600">→ A B2B version — housing associations, charities, law firms pay us to white-label it for their clients</p>
              <p className="text-sm text-gray-600">→ A proper media push — this is a story that writes itself, and Chris is in the right world to help tell it</p>
              <p className="text-sm text-gray-600">→ Legal aid has been gutted. Citizens Advice can't cope. We're instant and free at the basic level</p>
            </div>
          </div>

          {/* Earth51 */}
          <div className="border border-green-200 rounded-lg p-6 mb-4 bg-green-50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🌍</span>
              <div>
                <h3 className="font-bold text-gray-900">Earth51 / Litter Picking</h3>
                <p className="text-sm text-green-700">Verified environmental action</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              People log litter picks. AI verifies the photos. It all goes on a public ledger — real, verified environmental data that councils and corporates can actually use for ESG reporting.
            </p>
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">What it needs next</p>
              <p className="text-sm text-gray-600">→ One council pilot — paid, verified, reportable data they can put in their annual report</p>
              <p className="text-sm text-gray-600">→ Corporate ESG tie-in — companies need verified environmental data and are paying for it</p>
              <p className="text-sm text-gray-600">→ Schools angle is massive — kids, litter picks, certificates, real-world impact</p>
            </div>
          </div>
        </div>

        {/* WHAT £20K ACTUALLY DOES */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">What £20k actually does</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Honestly? It buys roughly <strong>3 months of oxygen</strong>. Not forever. Not a full buildout. But enough time to stop surviving and start growing — to get the right conversations done, the right partnerships started, the right people seeing the products.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">→</span> Platform costs, AI credits, hosting — the engine kept running</li>
              <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">→</span> One focused vet partnership approach for PetSounds51</li>
              <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">→</span> SORTED B2B conversations started — housing associations, charities</li>
              <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">→</span> Earth51 council pilot scoped and proposed</li>
              <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">→</span> Legal setup of UF51 Commercial Ltd so the investment is clean</li>
              <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">→</span> Brian not choosing between the build and the electricity bill</li>
            </ul>
            <p className="text-gray-500 text-sm mt-4 italic">
              That last one isn't a throwaway line. It's the honest reality of where we are.
            </p>
          </div>
        </div>

        {/* THE INVITATION */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">The Invitation</h2>
          <div className="border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              We're offering <strong>15% equity in UF51 Commercial Ltd</strong> for £20,000. That's one stake across all three products. One relationship. One conversation.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>UF51 CIC</strong> keeps 10% of commercial revenue as a community dividend — so the healing tools stay free for people who can't pay. That's non-negotiable and we're proud of it.
            </p>
            <div className="bg-gray-50 rounded p-4 mt-2">
              <p className="text-sm text-gray-600">
                <strong>SEIS note:</strong> If UF51 Commercial Ltd qualifies (worth checking with an accountant), Chris could claim up to 50% income tax relief — reducing the net investment to around £10k. No promises on eligibility, but it's worth a conversation with your accountant.
              </p>
            </div>
          </div>
        </div>

        {/* STRUCTURE */}
        <div className="mb-10">
          <button
            onClick={() => setShowStructure(!showStructure)}
            className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            {showStructure ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Show proposed equity structure
          </button>
          {showStructure && (
            <div className="mt-4 border border-gray-100 rounded-lg p-5 bg-gray-50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Brian Hughes (Founder)</span>
                  <span className="font-bold">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Chris Walsh (Investor)</span>
                  <span className="font-bold">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Graeme (Connector / Advisor)</span>
                  <span className="font-bold">2–3% advisory</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-700">UF51 CIC (community dividend)</span>
                  <span className="font-bold">10% of revenue</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">A starting point for conversation — not set in stone.</p>
            </div>
          )}
        </div>

        {/* GRAEME */}
        <div className="mb-10">
          <div className="bg-gray-900 text-white rounded-lg p-6">
            <h3 className="font-bold mb-2">A note on Graeme</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Graeme made this happen. That's the whole reason we're talking. We'd look after him properly — small advisory stake, finder's arrangement, or whatever feels right. That conversation is separate but it absolutely will happen. We look after people who show up for us.
            </p>
          </div>
        </div>

        {/* WHY NOW */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Why now</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            AI capability has moved faster in the last two years than the previous decade. The tools available to a solo builder today are the same ones that cost enterprise teams millions eighteen months ago. That's not hype — it's why UF51 exists at all.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            The window to get into markets like AI-assisted legal access, animal wellness tech, and verified ESG data is right now — before the big players notice, before the category gets crowded, and while a small team can still move faster than anyone else.
          </p>
          <div className="space-y-3 mt-4">
            <div className="flex items-start gap-3">
              <span className="text-amber-600 font-bold text-sm mt-0.5">🐾</span>
              <p className="text-sm text-gray-600">The UK pet care market is worth <strong>£7.9 billion</strong> and growing. Pet anxiety products alone are a fast-expanding segment — driven by post-pandemic separation issues and a generation of owners who treat pets as family.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-sm mt-0.5">⚖️</span>
              <p className="text-sm text-gray-600">The UK legal tech market is projected to reach <strong>£25 billion by 2030</strong>. The access-to-justice gap — real people who can't afford a solicitor — is enormous and largely unserved by technology. SORTED sits directly in that gap.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-sm mt-0.5">🌍</span>
              <p className="text-sm text-gray-600">ESG data and reporting is now a legal requirement for large UK companies. The market for verified environmental impact data is emerging fast — and almost nobody has community-scale, AI-verified ground truth. Earth51 does.</p>
            </div>
          </div>
        </div>

        {/* WHAT CHRIS BRINGS */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">What Chris brings beyond the money</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            This isn't just a financial ask. The honest truth is that the right introduction — to the right brand, at the right moment — is worth more than the investment itself.
          </p>
          <div className="space-y-4">
            <div className="border-l-2 border-amber-400 pl-4">
              <p className="text-sm font-bold text-gray-800 mb-1">Pet retail & insurance</p>
              <p className="text-sm text-gray-600">The UK's biggest pet retailers have entire ESG and customer wellbeing programmes with no real product to point people to. PetSounds51 is that product — white-label ready, science-backed, instant. One conversation with the right brand partnership team changes everything. Chris knows how those conversations start.</p>
            </div>
            <div className="border-l-2 border-blue-400 pl-4">
              <p className="text-sm font-bold text-gray-800 mb-1">Financial services & retail brands</p>
              <p className="text-sm text-gray-600">SORTED's natural B2B home is any large consumer-facing brand that deals with vulnerable customers — banks, utilities, supermarkets, housing. They all have financial hardship teams and legal access obligations. They all need exactly what SORTED does. Chris has spent years talking to those brands at budget level.</p>
            </div>
            <div className="border-l-2 border-green-400 pl-4">
              <p className="text-sm font-bold text-gray-800 mb-1">Media & storytelling instinct</p>
              <p className="text-sm text-gray-600">Someone who has spent a career in media knows what makes a story land — and what makes it die. That instinct, applied to how we tell the UF51 story publicly, is genuinely rare. You can't hire that in. You find the right person and bring them in early.</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-5 italic">
            None of this is about using existing professional relationships. It's about the judgment, instinct, and network that someone builds over a career — and choosing to put that behind something that matters.
          </p>
        </div>

        {/* MEDIA ANGLE */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">The story</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Someone who nearly didn't make it, who rebuilt everything from scratch, and built AI tools from a laptop in Scotland that help people fight the system, calm their anxious pets, and clean up their communities.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            That story hasn't been told yet. You can't manufacture that origin. We haven't even started telling it.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            And for someone thinking about what comes next after a long career — this is the kind of thing you look back on and feel good about. Not just financially. Actually good.
          </p>
        </div>

        {/* HONEST QUOTE */}
        <div className="mb-12">
          <div className="border-l-4 border-gray-300 pl-6">
            <p className="text-gray-600 italic leading-relaxed text-sm">
              "We're early. No big user numbers. No polished deck. What we have is working software, a genuine mission, and a founder who's already been through worse than a startup failing. This isn't a pitch. It's an honest conversation about whether you want to build something real with us."
            </p>
            <p className="text-gray-500 text-xs mt-3">— Brian Hughes, Founder, UF51</p>
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