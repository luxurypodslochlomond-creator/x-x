import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Simple clean investor brief — Chris Walsh & Graeme
// No fluff. No fake metrics. Just honest.

export default function WalshyPitch() {
  const [showStructure, setShowStructure] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
      
      {/* HEADER */}
      <div className="max-w-2xl mx-auto px-8 pt-16 pb-16">
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
            Brian Hughes built this. Not a startup founder. Not a VC-backed exec. A person who lost everything, rebuilt himself through tech and music, and decided to spend that energy helping people navigate a world that wasn't designed for them.
          </p>
          <p className="text-gray-700 leading-relaxed">
            What exists today is a live platform — real tools, real users, real code — covering three areas that matter: <strong>animal welfare, environmental action, and access to justice</strong>. Built on zero funding. With a lot of heart.
          </p>
        </div>

        {/* THE 3 PRODUCTS */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-6 text-gray-800">The Products</h2>
          
          {/* PetSounds51 */}
          <div className="border border-amber-200 rounded-lg p-6 mb-4 bg-amber-50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🐾</span>
              <div>
                <h3 className="font-bold text-gray-900">PetSounds51</h3>
                <p className="text-sm text-amber-700">Sound therapy for anxious animals</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Peer-reviewed acoustic protocols for separation anxiety, firework fear, and vet stress in dogs, cats and horses. Free to try. £9.99/month or £29.99/year for full access. No vet visit. Works from a phone.
            </p>
            <p className="text-sm text-gray-500">
              <strong>Why it works commercially:</strong> 13 million pet owners in the UK. Vet bills for anxiety-related behaviour average £400+. We're £10/month.
            </p>
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
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Upload any legal notice, debt letter, council demand, or HMRC correspondence. Get plain English back in seconds — what it means, what to do, what your rights are. Any language. Nothing stored.
            </p>
            <p className="text-sm text-gray-500">
              <strong>Why it works commercially:</strong> Legal aid has been gutted. 60% of UK adults receive a letter they don't fully understand each year. Citizens Advice queues are months long. We're instant.
            </p>
          </div>

          {/* Earth51 / Litter */}
          <div className="border border-green-200 rounded-lg p-6 mb-4 bg-green-50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🌍</span>
              <div>
                <h3 className="font-bold text-gray-900">Earth51 / Litter Picking</h3>
                <p className="text-sm text-green-700">Environmental action with AI verification</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              AI-verified litter picks logged on a public ledger. Real environmental data. Corporate ESG partnerships in development. Community-led. Built for councils, schools, and sustainability-focused businesses.
            </p>
            <p className="text-sm text-gray-500">
              <strong>Why it works commercially:</strong> ESG reporting is now mandatory for large UK companies. Verified environmental data has real B2B value.
            </p>
          </div>
        </div>

        {/* THE ASK */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">The Invitation</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              We're raising <strong>£20,000</strong> to fund 6 months of focused development and marketing across all three products.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In return, we're offering <strong>15% equity in UF51 Commercial Ltd</strong> — a new holding company that sits above PetSounds51, SORTED, and Earth51. One stake. Three products. One relationship.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>UF51 CIC</strong> (the community interest company) retains 10% of commercial revenue as a community dividend — keeping the mission honest and the healing tools free for those who need them.
            </p>
            <div className="bg-white border border-gray-100 rounded p-4 mt-4">
              <p className="text-sm text-gray-600"><strong>Potential SEIS relief:</strong> As a new UK Ltd, this investment may qualify for SEIS — meaning up to 50% tax relief on the £20k. Your real cost could be closer to £10k. Worth confirming with your accountant.</p>
            </div>
          </div>
        </div>

        {/* STRUCTURE - collapsible */}
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
                  <span className="font-bold">2–3% advisory shares</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-700">UF51 CIC (community dividend)</span>
                  <span className="font-bold">10% of revenue</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4">Numbers are a starting point for conversation — not set in stone.</p>
            </div>
          )}
        </div>

        {/* GRAEME */}
        <div className="mb-10">
          <div className="bg-gray-900 text-white rounded-lg p-6">
            <h3 className="font-bold mb-2">A note on Graeme</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Graeme made this conversation happen. That means something. We'd want to look after him properly — whether that's a small advisory stake, a finder's arrangement, or something else that feels right to everyone. That conversation is separate but it will happen.
            </p>
          </div>
        </div>

        {/* WHAT £20K DOES */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">What £20k does</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">→</span> 6 months of focused product development (PetSounds51 vet partnerships, SORTED B2B, Earth51 council deals)</li>
            <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">→</span> A proper go-to-market push — content, PR, the media angle Chris understands better than most</li>
            <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">→</span> Legal setup of UF51 Commercial Ltd (accountant, Companies House, SEIS application)</li>
            <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">→</span> Keeps Brian building rather than surviving</li>
          </ul>
        </div>

        {/* MEDIA ANGLE - for Chris specifically */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">The media angle</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            This is a story. A real one. Someone who lost everything, rebuilt himself, and built an AI platform that helps people decode the legal system, helps pets stay calm, and gets communities cleaning up the planet. From a laptop. In Scotland.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            That's not a press release. That's what happened. For someone who works in media — Chris knows that a genuine story has a value that no marketing budget can buy. And we haven't told it yet.
          </p>
        </div>

        {/* HONEST BIT */}
        <div className="mb-12">
          <div className="border-l-4 border-gray-300 pl-6">
            <p className="text-gray-600 italic leading-relaxed text-sm">
              "We're early. We don't have massive user numbers to show you. What we have is working software, a real mission, and a founder who has already survived worse than a startup failing. This isn't a pitch. It's an honest conversation about whether we want to build this together."
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