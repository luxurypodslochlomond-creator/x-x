import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { COOLASFUCKWaves, COOLASFUCKPaw, COOLASFUCKSorted } from '@/components/shared/COOLASFUCKIcon';

export default function WalshyPitch() {
  const [showStructure, setShowStructure] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: '#fafaf7', fontFamily: 'Georgia, "Times New Roman", serif', color: '#2d2d2d' }}>

      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          <Download className="w-4 h-4" />
          Save as PDF
        </button>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          @page { margin: 2cm; }
        }
      `}</style>

      <div className="max-w-[640px] mx-auto px-8 pt-16 pb-28">

        {/* HEADER */}
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-10" style={{ fontFamily: 'system-ui, sans-serif' }}>
          Private · June 2026 · For Chris
        </p>

        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-3">
          Here's what I've built.
        </h1>
        <p className="text-xl text-gray-500 mb-14 leading-relaxed" style={{ fontStyle: 'italic' }}>
          And why I think you're the right person to be part of it.
        </p>

        <div className="h-px bg-gray-200 mb-14" />

        {/* OPENING */}
        <div className="mb-14 space-y-5 text-lg text-gray-700 leading-relaxed">
          <p>
            Graeme suggested I talk to you and I'm glad he did. This isn't a formal pitch — it's more of a conversation I'd like to have. You'll see what I mean when you read it.
          </p>
          <p>
            I've been building a platform called UF51. It's three AI products, all live, all working. Not prototypes. Not decks. Real tools that real people are using right now.
          </p>
          <p>
            The technology underneath them — language models, acoustic AI, computer vision, a verified public ledger — would cost an enterprise team a year and serious budget to put together. I built it leaner than that, which is either impressive or slightly concerning depending on how you look at it.
          </p>
          <p>
            I'm not looking for someone to hand me money and disappear. I'm looking for someone who's sat in the rooms I need to get into — and who sees what I see when they look at these three products.
          </p>
        </div>

        {/* THE 3 PRODUCTS */}
        <div className="mb-14">
          <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-8" style={{ fontFamily: 'system-ui, sans-serif' }}>
            The three products
          </h2>

          {/* PetSounds51 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <COOLASFUCKPaw size={28} />
              <h3 className="text-2xl font-bold text-gray-900">PetSounds51</h3>
            </div>
            <p className="text-base text-gray-500 mb-5 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif', fontStyle: 'italic' }}>
              Sound therapy for anxious dogs, cats and horses. Live. Subscription.
            </p>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                A dog with separation anxiety. A cat terrified of fireworks. A horse that won't load into a trailer. These aren't niche problems — they affect millions of UK pet owners and the existing options are expensive, slow, and often don't work.
              </p>
              <p>
                PetSounds51 uses acoustic protocols built on peer-reviewed research. Works from a phone. No vet appointment. No prescription. The UK pet care market is <strong>£7.9 billion</strong> — pet anxiety is one of the fastest-growing segments and almost nobody has addressed it properly with technology.
              </p>
              <p className="text-gray-500 border-l-2 border-amber-300 pl-4">
                One vet endorsement changes everything. Pet insurers would pay us — not users — to reduce anxiety-related claims. Any PHD client with a pet or wellness category could white-label this. The product is ready. It's the conversation that needs opening.
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100 mb-12" />

          {/* SORTED */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <COOLASFUCKSorted size={28} />
              <h3 className="text-2xl font-bold text-gray-900">SORTED</h3>
            </div>
            <p className="text-base text-gray-500 mb-5 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif', fontStyle: 'italic' }}>
              Plain English for scary letters. Live. Subscription.
            </p>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Someone gets a letter from HMRC. Or a bailiff. Or a council. They don't understand it, they don't know what to do, and they can't afford a solicitor to explain it to them. SORTED reads the letter and tells them — plain English, any language, in seconds. Nothing stored. No data kept.
              </p>
              <p>
                Legal aid has been gutted. Citizens Advice is overwhelmed. The UK legal tech market is projected at <strong>£25 billion by 2030</strong>. Everyone is building for law firms. Nobody has properly built for the person on the other end of the letter.
              </p>
              <p className="text-gray-500 border-l-2 border-blue-300 pl-4">
                HSBC has a legal obligation under FCA Consumer Duty to demonstrate genuine support for vulnerable customers. SORTED solves that directly. PHD manages their media. You know the room. That's one conversation — and there are dozens like it across financial services, utilities and housing associations.
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100 mb-12" />

          {/* Earth51 */}
          <div className="mb-2">
            <div className="flex items-center gap-3 mb-4">
              <COOLASFUCKWaves size={28} animate={false} />
              <h3 className="text-2xl font-bold text-gray-900">Earth51</h3>
            </div>
            <p className="text-base text-gray-500 mb-5 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif', fontStyle: 'italic' }}>
              Verified environmental action at community scale. Live.
            </p>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                People log litter picks. Computer vision verifies the photos. Everything goes on a public ledger — auditable, tamper-proof, community-scale environmental impact. ESG reporting is now a legal requirement for large UK companies and they need verified ground truth, not spreadsheets of good intentions.
              </p>
              <p>
                Almost nobody has built this at community scale. Earth51 has.
              </p>
              <p className="text-gray-500 border-l-2 border-green-300 pl-4">
                PHD's work with British Heart Foundation is exactly the model — purpose-led, community-scale, genuinely measurable impact. Earth51 produces the verified data that makes those campaigns credible to a board. Someone who understands how that story gets told matters enormously here.
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 mb-14" />

        {/* THE OFFER */}
        <div className="mb-12">
          <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
            What I'm proposing
          </h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p className="text-2xl font-bold text-gray-900">
              17% of UF51 Commercial Ltd for £20,000.
            </p>
            <p>
              One stake across all three products. UF51 CIC — the community interest company — retains 10% of commercial revenue as a structural dividend, keeping the core tools free for the people who need them most. That's locked in by design, not goodwill.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-base">
              <p className="font-bold text-gray-800 mb-1">On SEIS</p>
              <p className="text-gray-600">
                If UF51 Commercial Ltd qualifies — which is likely — you could claim up to 50% income tax relief, bringing the effective outlay closer to £10k. Worth a conversation with your accountant before we shake hands.
              </p>
            </div>
          </div>
        </div>

        {/* WHAT £20K DOES */}
        <div className="mb-12">
          <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
            What £20k actually does
          </h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            Three months of proper runway. Not survival — momentum. Enough to stop reacting and start building the right partnerships:
          </p>
          <ul className="space-y-3 text-gray-600 leading-relaxed">
            <li className="flex items-start gap-4">
              <span className="text-amber-400 font-bold mt-0.5 flex-shrink-0">—</span>
              Platform infrastructure and AI compute running at the level it needs to be
            </li>
            <li className="flex items-start gap-4">
              <span className="text-amber-400 font-bold mt-0.5 flex-shrink-0">—</span>
              PetSounds51 vet partnership — one credible endorsement transforms the B2B story
            </li>
            <li className="flex items-start gap-4">
              <span className="text-amber-400 font-bold mt-0.5 flex-shrink-0">—</span>
              SORTED outreach to financial services — HSBC, utilities, housing associations
            </li>
            <li className="flex items-start gap-4">
              <span className="text-amber-400 font-bold mt-0.5 flex-shrink-0">—</span>
              Earth51 council pilot scoped and proposed
            </li>
            <li className="flex items-start gap-4">
              <span className="text-amber-400 font-bold mt-0.5 flex-shrink-0">—</span>
              UF51 Commercial Ltd properly incorporated — clean structure from day one
            </li>
          </ul>
        </div>

        {/* EQUITY STRUCTURE */}
        <div className="mb-12">
          <button
            onClick={() => setShowStructure(!showStructure)}
            className="flex items-center gap-2 text-gray-400 text-sm hover:text-gray-600 transition-colors"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {showStructure ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Show proposed equity split
          </button>
          {showStructure && (
            <div className="mt-5 rounded-xl p-5 border border-gray-200 bg-white">
              <div className="space-y-3 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Founder</span>
                  <span className="font-bold text-gray-900">80%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">You (Chris)</span>
                  <span className="font-bold text-amber-600">17%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Graeme (Advisor)</span>
                  <span className="font-bold text-blue-500">3%</span>
                </div>
                <div className="flex justify-between items-center py-2 text-gray-400">
                  <span>UF51 CIC (community dividend)</span>
                  <span className="font-bold text-green-500">10% of revenue</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4" style={{ fontFamily: 'system-ui, sans-serif' }}>Starting point — open to conversation.</p>
            </div>
          )}
        </div>

        <div className="h-px bg-gray-200 mb-14" />

        {/* GRAEME */}
        <div className="mb-12">
          <p className="text-gray-700 leading-relaxed">
            <strong>A word on Graeme.</strong> He made this introduction and that matters. He'll be properly looked after — advisory equity and a finder's arrangement. That conversation will happen regardless of how this one goes.
          </p>
        </div>

        {/* CLOSE */}
        <div className="mb-14">
          <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
            <p>
              Three working products. Real markets. Proper technology. Early enough to matter — not so early it's a leap of faith.
            </p>
            <p>
              I'd rather have a coffee than a Zoom. But whatever works for you.
            </p>
            <p className="text-gray-500">
              — Brian
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <COOLASFUCKWaves size={18} animate={false} />
            <span className="text-xs text-gray-400" style={{ fontFamily: 'system-ui, sans-serif' }}>universalfrequency51.com</span>
          </div>
          <p className="text-xs text-gray-300" style={{ fontFamily: 'system-ui, sans-serif' }}>Private — please don't share</p>
        </div>

      </div>
    </div>
  );
}