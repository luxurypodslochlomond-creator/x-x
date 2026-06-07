import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ForChris() {
  const [showStructure, setShowStructure] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: '#f9f6f0', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1a1a1a' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

        .pitch-body { font-family: Georgia, "Times New Roman", serif; }
        .pitch-sans { font-family: -apple-system, "Helvetica Neue", sans-serif; }
        .pitch-display { font-family: "Playfair Display", Georgia, serif; }

        .product-card {
          border-left: 3px solid;
          padding-left: 1.5rem;
          margin-bottom: 3rem;
        }
        .product-card.amber { border-color: #d97706; }
        .product-card.blue  { border-color: #2563eb; }
        .product-card.green { border-color: #16a34a; }

        .pull-quote {
          font-style: italic;
          color: #6b7280;
          font-size: 1.05rem;
          line-height: 1.7;
          border-left: 2px solid #d1d5db;
          padding-left: 1.25rem;
          margin: 1.25rem 0;
        }

        .stat-pill {
          display: inline-block;
          background: #1a1a1a;
          color: #f9f6f0;
          font-size: 0.78rem;
          font-family: -apple-system, "Helvetica Neue", sans-serif;
          letter-spacing: 0.04em;
          padding: 0.25rem 0.65rem;
          border-radius: 2px;
          margin: 0 0.2rem;
        }

        .section-label {
          font-family: -apple-system, "Helvetica Neue", sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9ca3af;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .big-number {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 2.8rem;
          font-weight: 700;
          line-height: 1.1;
          color: #1a1a1a;
        }

        .tag-line {
          font-family: -apple-system, "Helvetica Neue", sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 500;
        }

        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          @page { margin: 2.2cm; }
        }
      `}</style>

      <div className="no-print fixed top-5 right-5 z-50">
        <button
          onClick={() => window.print()}
          className="pitch-sans text-xs px-3 py-1.5 border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-500 transition-colors rounded-sm bg-white/80 backdrop-blur-sm"
        >
          Save as PDF
        </button>
      </div>

      <div className="max-w-[600px] mx-auto px-8 pt-20 pb-32">

        {/* MASTHEAD */}
        <div className="mb-16">
          <p className="section-label mb-3">Private · June 2026 · For Chris</p>
          <h1 className="pitch-display font-bold leading-tight mb-5" style={{ fontSize: '2.8rem', color: '#1a1a1a' }}>
            Following on from<br />our conversations.
          </h1>
          <p className="pitch-display text-xl" style={{ fontStyle: 'italic', color: '#78716c' }}>
            Here's the structure, properly written down.
          </p>
        </div>

        <div className="mb-14" style={{ height: '1px', background: 'linear-gradient(to right, #d6d3d1, transparent)' }} />

        {/* OPENING */}
        <div className="mb-16 space-y-5 pitch-body" style={{ fontSize: '1.1rem', lineHeight: '1.85', color: '#374151' }}>
          <p>
            Good conversations deserve a proper follow-up. So here it is — everything we've talked about, in one place, so there's no ambiguity about what's on offer and what happens next.
          </p>
          <p>
            UF51 is three AI products — all live, all working. The platform underneath them took a year to build: language models, acoustic AI, computer vision, a verified public ledger. What it doesn't have yet is the right people walking it through the right doors. That's the gap — and it's the reason this conversation matters.
          </p>
          <p>
            Your background at PHD, the relationships across financial services, the understanding of how purposeful brands get built — that's not a nice-to-have. That's the thing that unlocks this.
          </p>
        </div>

        {/* THE THREE PRODUCTS */}
        <div className="mb-8">
          <p className="section-label">What we've built</p>
        </div>

        {/* PETSOUNDS51 */}
        <div className="product-card amber">
          <div className="mb-3">
            <span className="tag-line" style={{ color: '#d97706' }}>PetSounds51</span>
          </div>
          <p className="pitch-sans mb-5" style={{ fontSize: '0.9rem', color: '#78716c', fontStyle: 'italic' }}>
            Sound therapy for anxious dogs, cats and horses. Live. Subscription.
          </p>
          <div className="space-y-4 pitch-body" style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151' }}>
            <p>
              A dog with separation anxiety. A cat terrified of fireworks. A horse that won't load. These affect millions of UK pet owners — and the existing options are expensive, slow, and often don't work.
            </p>
            <p>
              PetSounds51 uses acoustic protocols built on peer-reviewed research. Works from a phone. No vet appointment. No prescription. The UK pet care market is <span className="stat-pill">£7.9bn</span> — pet anxiety is one of its fastest-growing segments.
            </p>
            <p className="pull-quote">
              One vet endorsement changes the B2B story completely. Pet insurers would pay — not users — to reduce anxiety-related claims. Any brand with a pet or wellness category could white-label this. The product is done. The conversation is the thing that needs opening.
            </p>
          </div>
        </div>

        {/* SORTED */}
        <div className="product-card blue">
          <div className="mb-3">
            <span className="tag-line" style={{ color: '#2563eb' }}>SORTED</span>
          </div>
          <p className="pitch-sans mb-5" style={{ fontSize: '0.9rem', color: '#78716c', fontStyle: 'italic' }}>
            Plain English for scary letters. Live. Subscription.
          </p>
          <div className="space-y-4 pitch-body" style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151' }}>
            <p>
              Someone gets a letter from HMRC. Or a bailiff. Or the council. They don't understand it, can't afford a solicitor, and don't know what to do. SORTED reads the letter and explains it — plain English, any language, in seconds. Nothing stored. No data kept.
            </p>
            <p>
              Legal aid has been gutted. Citizens Advice is overwhelmed. The UK legal tech market is projected at <span className="stat-pill">£25bn by 2030</span>. Everyone is building for law firms. Nobody has properly built for the person on the other end of the letter.
            </p>
            <p className="pull-quote">
              HSBC has a legal obligation under FCA Consumer Duty to demonstrate genuine support for vulnerable customers. SORTED solves that directly — it's not a CSR story, it's a compliance story. You know that room. That's one conversation, and there are dozens like it across financial services, utilities and housing associations.
            </p>
          </div>
        </div>

        {/* EARTH51 */}
        <div className="product-card green" style={{ marginBottom: '0' }}>
          <div className="mb-3">
            <span className="tag-line" style={{ color: '#16a34a' }}>Earth51</span>
          </div>
          <p className="pitch-sans mb-5" style={{ fontSize: '0.9rem', color: '#78716c', fontStyle: 'italic' }}>
            Verified environmental action at community scale. Live.
          </p>
          <div className="space-y-4 pitch-body" style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151' }}>
            <p>
              People log litter picks. Computer vision verifies the photos. Everything goes on a public ledger — auditable, tamper-proof, community-scale impact. ESG reporting is a legal requirement for large UK companies and they need verified ground truth, not spreadsheets of good intentions.
            </p>
            <p className="pull-quote">
              PHD's work with British Heart Foundation is exactly the model — purpose-led, community-scale, genuinely measurable. Earth51 produces the verified data that makes those campaigns credible to a board. You already understand how that story gets told.
            </p>
          </div>
        </div>

        <div className="my-16" style={{ height: '1px', background: 'linear-gradient(to right, #d6d3d1, transparent)' }} />

        {/* THE OFFER */}
        <div className="mb-12">
          <p className="section-label">What's on the table</p>
          <div className="big-number mb-6">17% for £20,000.</div>
          <div className="space-y-4 pitch-body" style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151' }}>
            <p>
              One stake across all three products. UF51 CIC — the community interest company — retains 10% of commercial revenue as a structural dividend. That keeps the core tools free for the people who need them most. Locked in by design, not goodwill.
            </p>
            <p>
              This isn't passive capital. The value is the network, the judgment, the doors. The number reflects that.
            </p>
          </div>

          <div className="mt-6 p-5 rounded-sm border border-amber-200" style={{ background: '#fffbeb' }}>
            <p className="pitch-sans font-semibold text-sm text-gray-800 mb-1">On SEIS</p>
            <p className="pitch-sans text-sm text-gray-600 leading-relaxed">
              If UF51 Commercial Ltd qualifies — which is likely — up to 50% income tax relief is available, bringing the effective outlay closer to £10k. Worth a conversation with your accountant before we shake hands.
            </p>
          </div>
        </div>

        {/* WHAT £20K DOES */}
        <div className="mb-12">
          <p className="section-label">What £20k unlocks</p>
          <p className="pitch-body mb-6" style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151' }}>
            Three months of proper momentum — enough to walk through the right doors:
          </p>
          <div className="space-y-0 pitch-sans" style={{ fontSize: '0.95rem', color: '#4b5563' }}>
            {[
              'Platform infrastructure and AI compute running at scale',
              'PetSounds51 vet partnership — one endorsement transforms the B2B story',
              'SORTED outreach to financial services — HSBC, utilities, housing associations',
              'Earth51 council pilot scoped and proposed',
              'UF51 Commercial Ltd properly incorporated — clean cap table from day one',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-gray-100">
                <span style={{ color: '#d97706', fontWeight: 'bold', flexShrink: 0, marginTop: '2px' }}>—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* EQUITY STRUCTURE */}
        <div className="mb-12">
          <button
            onClick={() => setShowStructure(!showStructure)}
            className="pitch-sans flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showStructure ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showStructure ? 'Hide' : 'Show'} proposed equity split
          </button>

          {showStructure && (
            <div className="mt-5 border border-gray-200 rounded-sm bg-white p-5">
              <div className="pitch-sans text-sm">
                {[
                  { label: 'Founder (Brian)', value: '80%', color: '#1a1a1a' },
                  { label: 'Chris Walsh', value: '17%', color: '#d97706' },
                  { label: 'Graeme (Advisor)', value: '3%', color: '#2563eb' },
                  { label: 'UF51 CIC (community dividend)', value: '10% of revenue', color: '#16a34a' },
                ].map((row, i, arr) => (
                  <div key={i} className={`flex justify-between items-center py-3 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <span style={{ color: '#6b7280' }}>{row.label}</span>
                    <span style={{ fontWeight: '700', color: row.color }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="pitch-sans text-xs text-gray-400 mt-4">Starting point — open to conversation.</p>
            </div>
          )}
        </div>

        <div className="my-14" style={{ height: '1px', background: 'linear-gradient(to right, #d6d3d1, transparent)' }} />

        {/* GRAEME NOTE */}
        <div className="mb-12 pitch-body" style={{ fontSize: '1rem', lineHeight: '1.8', color: '#374151' }}>
          <p>
            <strong>On Graeme.</strong> He made this introduction and that matters. He'll be properly looked after — advisory equity and a finder's arrangement. That conversation happens regardless of how this one goes.
          </p>
        </div>

        {/* CLOSE */}
        <div className="mb-16 space-y-5 pitch-body" style={{ fontSize: '1.1rem', lineHeight: '1.85', color: '#374151' }}>
          <p>
            Three working products. Real markets. Real technology. Early enough that getting involved now shapes what this becomes.
          </p>
          <p>
            A coffee would be better than a Zoom.
          </p>
          <p style={{ color: '#9ca3af', marginTop: '2rem' }}>— Brian</p>
        </div>

        {/* FOOTER */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between pitch-sans text-xs text-gray-400">
            <span>universalfrequency51.com</span>
            <span>Private — please don't share</span>
          </div>
        </div>

      </div>
    </div>
  );
}