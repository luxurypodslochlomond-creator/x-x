import React from 'react';

export default function ForChris() {
  return (
    <div className="min-h-screen" style={{ background: '#f9f6f0', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1a1a1a' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

        .pitch-body { font-family: Georgia, "Times New Roman", serif; }
        .pitch-sans { font-family: -apple-system, "Helvetica Neue", sans-serif; }
        .pitch-display { font-family: "Playfair Display", Georgia, serif; }

        .product-line {
          border-left: 3px solid;
          padding-left: 1.25rem;
          margin-bottom: 1.75rem;
        }
        .product-line.amber { border-color: #d97706; }
        .product-line.blue  { border-color: #2563eb; }
        .product-line.green { border-color: #16a34a; }

        .section-label {
          font-family: -apple-system, "Helvetica Neue", sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9ca3af;
          font-weight: 600;
          margin-bottom: 1.25rem;
        }

        .divider {
          height: 1px;
          background: linear-gradient(to right, #d6d3d1, transparent);
          margin: 2.5rem 0;
        }

        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          @page { margin: 2cm; size: A4; }
          .page-wrap { padding: 0 !important; padding-top: 2rem !important; }
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

      <div className="page-wrap max-w-[580px] mx-auto px-8 pt-16 pb-24">

        {/* MASTHEAD */}
        <div className="mb-10">
          <p className="pitch-sans text-xs text-gray-400 mb-4" style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Private · For Chris · June 2026
          </p>
          <h1 className="pitch-display font-bold" style={{ fontSize: '2.6rem', lineHeight: 1.15, color: '#1a1a1a', marginBottom: '1rem' }}>
            UF51 — three AI products,<br />one investment opportunity.
          </h1>
          <p className="pitch-display" style={{ fontSize: '1.15rem', fontStyle: 'italic', color: '#78716c', lineHeight: 1.6 }}>
            All live. All working. Looking for the right partner.
          </p>
        </div>

        <div className="divider" />

        {/* THE PRODUCTS */}
        <div className="mb-2">
          <p className="section-label">What we've built</p>
        </div>

        <div className="product-line amber">
          <p className="pitch-sans font-semibold text-sm mb-1" style={{ color: '#d97706' }}>PetSounds51</p>
          <p className="pitch-body" style={{ fontSize: '0.95rem', lineHeight: 1.75, color: '#374151' }}>
            Sound therapy for anxious dogs, cats and horses. Works from a phone. Built on peer-reviewed research. The UK pet care market is £7.9bn — pet anxiety is one of its fastest-growing segments. One vet endorsement or pet insurer deal changes everything. The product is done and live.
          </p>
        </div>

        <div className="product-line blue">
          <p className="pitch-sans font-semibold text-sm mb-1" style={{ color: '#2563eb' }}>SORTED</p>
          <p className="pitch-body" style={{ fontSize: '0.95rem', lineHeight: 1.75, color: '#374151' }}>
            Plain English for scary letters — HMRC, bailiffs, councils. Any letter, any language, in seconds. Nothing stored. FCA Consumer Duty creates a direct commercial case for financial services and utilities to partner with this. Legal aid has been gutted. Nobody has built for the person on the other end of the letter — until now.
          </p>
        </div>

        <div className="product-line green" style={{ marginBottom: 0 }}>
          <p className="pitch-sans font-semibold text-sm mb-1" style={{ color: '#16a34a' }}>Earth51</p>
          <p className="pitch-body" style={{ fontSize: '0.95rem', lineHeight: 1.75, color: '#374151' }}>
            Verified environmental action at community scale. People log litter picks, computer vision verifies the photos, everything goes on a public tamper-proof ledger. ESG reporting is a legal requirement — Earth51 produces the verified ground truth that makes corporate environmental claims credible.
          </p>
        </div>

        <div className="divider" />

        {/* THE OFFER */}
        <div className="mb-8">
          <p className="section-label">The offer</p>
          <p className="pitch-display font-bold mb-4" style={{ fontSize: '2.4rem', color: '#1a1a1a' }}>17% for £20,000.</p>
          <p className="pitch-body" style={{ fontSize: '1rem', lineHeight: 1.8, color: '#374151' }}>
            One stake across all three products. UF51 CIC retains 10% of commercial revenue — keeps the core tools free for people who need them. Locked in by structure, not goodwill.
          </p>
          <p className="pitch-body mt-3" style={{ fontSize: '1rem', lineHeight: 1.8, color: '#374151' }}>
            If SEIS-qualifying — which is likely — up to 50% income tax relief applies, making the effective outlay closer to £10k.
          </p>
        </div>

        {/* WHY CHRIS */}
        <div className="mb-8 p-5 rounded-sm" style={{ background: '#fff', border: '1px solid #e5e7eb' }}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>Why this makes sense for you</p>
          <p className="pitch-body" style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#374151' }}>
            PHD background. Financial services relationships. An understanding of how purposeful brands are built and sold in. The products are ready — what they need is someone who knows which doors to open and how to walk through them. That's the gap. That's what makes this more than a financial stake.
          </p>
        </div>

        <div className="divider" />

        {/* CLOSE */}
        <p className="pitch-body mb-10" style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#374151' }}>
          Three working products. Real markets. Early enough to shape what this becomes. A coffee beats a Zoom.
        </p>

        <p className="pitch-display" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#9ca3af' }}>— Brian</p>

        <div className="divider" style={{ marginTop: '2.5rem' }} />

        <div className="flex items-center justify-between pitch-sans text-xs text-gray-400">
          <span>universalfrequency51.com</span>
          <span>Private — please don't share</span>
        </div>

      </div>
    </div>
  );
}