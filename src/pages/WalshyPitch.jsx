import React from 'react';

export default function ForChris() {
  return (
    <div className="min-h-screen" style={{ background: '#0f0f0f', fontFamily: 'Georgia, "Times New Roman", serif', color: '#f5f0e8' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');

        .p-display { font-family: "Playfair Display", Georgia, serif; }
        .p-sans    { font-family: "Inter", -apple-system, sans-serif; }
        .p-body    { font-family: Georgia, "Times New Roman", serif; }

        .hero-number {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(4rem, 12vw, 7rem);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: -0.02em;
          color: #f5f0e8;
        }

        .product-block {
          border-top: 1px solid rgba(245,240,232,0.12);
          padding: 2rem 0;
        }

        .tag {
          font-family: "Inter", sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
        }

        .amber-accent { color: #f59e0b; }
        .blue-accent  { color: #60a5fa; }
        .green-accent { color: #4ade80; }
        .muted        { color: rgba(245,240,232,0.45); }
        .mid          { color: rgba(245,240,232,0.75); }

        .rule {
          height: 1px;
          background: rgba(245,240,232,0.12);
          margin: 2.5rem 0;
        }

        .offer-box {
          border: 1px solid rgba(245,240,232,0.15);
          padding: 2rem;
          margin: 2rem 0;
          position: relative;
          background: rgba(245,240,232,0.03);
        }

        .offer-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3rem; height: 2px;
          background: #f59e0b;
        }

        .why-box {
          border-left: 2px solid #60a5fa;
          padding: 1.25rem 1.5rem;
          background: rgba(96,165,250,0.05);
          margin: 1.5rem 0;
        }

        @media print {
          .no-print { display: none !important; }
          body, div { background: #fff !important; color: #111 !important; }
          .hero-number { color: #111 !important; font-size: 5rem !important; }
          .amber-accent { color: #b45309 !important; }
          .blue-accent  { color: #1d4ed8 !important; }
          .green-accent { color: #15803d !important; }
          .muted { color: #6b7280 !important; }
          .mid   { color: #374151 !important; }
          .offer-box { border-color: #d1d5db !important; background: #f9fafb !important; }
          .why-box   { border-color: #1d4ed8 !important; background: #eff6ff !important; }
          .product-block { border-color: #e5e7eb !important; }
          .rule { background: #e5e7eb !important; }
          @page { margin: 1.8cm; size: A4; }
        }
      `}</style>

      {/* SAVE PDF BUTTON */}
      <div className="no-print" style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 50 }}>
        <button
          onClick={() => window.print()}
          className="p-sans"
          style={{
            fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '0.5rem 1rem', border: '1px solid rgba(245,240,232,0.2)',
            color: 'rgba(245,240,232,0.4)', background: 'transparent', cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.target.style.borderColor = 'rgba(245,240,232,0.5)'; e.target.style.color = 'rgba(245,240,232,0.8)'; }}
          onMouseLeave={e => { e.target.style.borderColor = 'rgba(245,240,232,0.2)'; e.target.style.color = 'rgba(245,240,232,0.4)'; }}
        >
          Save as PDF
        </button>
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '5rem 2.5rem 6rem' }}>

        {/* META LINE */}
        <div className="p-sans muted" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '3.5rem' }}>
          Private · For Chris Walsh · June 2026
        </div>

        {/* HERO */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="hero-number" style={{ marginBottom: '1.5rem' }}>
            UF51.
          </div>
          <p className="p-display mid" style={{ fontSize: '1.25rem', fontStyle: 'italic', lineHeight: 1.6, maxWidth: '480px' }}>
            Three AI products. All live. One stake.
          </p>
        </div>

        <div className="rule" />

        {/* INTRO */}
        <p className="p-body mid" style={{ fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '3rem' }}>
          A year of building. Language models, acoustic AI, computer vision, a verified public ledger. The platform is done. The products are live. What's needed now is the right partner — someone who knows which rooms to walk into and how.
        </p>

        {/* PRODUCTS */}
        <div style={{ marginBottom: '0.5rem' }}>
          <p className="tag muted" style={{ marginBottom: '0.5rem' }}>What we built</p>
        </div>

        {/* PETSOUNDS51 */}
        <div className="product-block">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem' }}>
            <span className="p-sans amber-accent" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em' }}>PetSounds51</span>
            <span className="p-sans muted" style={{ fontSize: '0.75rem' }}>sound therapy · live · subscription</span>
          </div>
          <p className="p-body mid" style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
            Sound therapy for anxious dogs, cats and horses. Works from a phone. Built on peer-reviewed research. The UK pet care market is £7.9bn — pet anxiety is one of its fastest-growing segments. One vet endorsement or pet insurer partnership transforms the B2B story. The product is done.
          </p>
        </div>

        {/* SORTED */}
        <div className="product-block">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem' }}>
            <span className="p-sans blue-accent" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em' }}>SORTED</span>
            <span className="p-sans muted" style={{ fontSize: '0.75rem' }}>legal clarity · live · subscription</span>
          </div>
          <p className="p-body mid" style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
            Plain English for scary letters — HMRC, bailiffs, councils. Any language, in seconds. Nothing stored. FCA Consumer Duty creates a direct commercial case for banks, utilities and housing associations. Legal aid has been cut to the bone. Nobody has built for the person on the other end of the letter — until now.
          </p>
        </div>

        {/* EARTH51 */}
        <div className="product-block" style={{ borderBottom: '1px solid rgba(245,240,232,0.12)', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '0.75rem' }}>
            <span className="p-sans green-accent" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em' }}>Earth51</span>
            <span className="p-sans muted" style={{ fontSize: '0.75rem' }}>verified ESG · live</span>
          </div>
          <p className="p-body mid" style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
            Community litter picks, AI-verified, on a public tamper-proof ledger. ESG reporting is now a legal requirement. Earth51 produces the verified ground truth that makes corporate environmental claims credible to a board — not just to a PR team.
          </p>
        </div>

        {/* THE OFFER */}
        <div className="offer-box">
          <p className="tag muted" style={{ marginBottom: '1.25rem' }}>The offer</p>
          <div className="p-display" style={{ fontSize: '2.8rem', fontWeight: 700, lineHeight: 1, marginBottom: '1.25rem', color: '#f5f0e8' }}>
            17% for £20,000.
          </div>
          <p className="p-body mid" style={{ fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
            One stake across all three products. UF51 CIC retains 10% of commercial revenue — keeps the core tools free for the people who need them most. Locked in by structure, not goodwill.
          </p>
          <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(245,240,232,0.45)' }}>
            If SEIS-qualifying — which is likely — up to 50% income tax relief applies. Effective outlay closer to £10k. Worth a conversation with your accountant.
          </p>
        </div>

        {/* WHY CHRIS */}
        <div className="why-box">
          <p className="tag" style={{ color: '#60a5fa', marginBottom: '0.75rem', fontSize: '0.65rem', letterSpacing: '0.18em' }}>Why this makes sense for you</p>
          <p className="p-body mid" style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
            PHD background. Financial services relationships. An instinct for how purposeful brands get built and sold in. The products are ready — what they need is someone who knows which doors to open. That's the gap. That's what makes this more than a financial stake.
          </p>
        </div>

        <div className="rule" />

        {/* CLOSE */}
        <p className="p-body mid" style={{ fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '2.5rem' }}>
          Three working products. Real markets. Early enough to shape what this becomes.
          A coffee beats a Zoom.
        </p>

        <p className="p-display" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(245,240,232,0.4)' }}>— Brian</p>

        <div className="rule" style={{ marginTop: '3rem' }} />

        <div className="p-sans" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(245,240,232,0.25)', letterSpacing: '0.06em' }}>
          <span>universalfrequency51.com</span>
          <span>Private — please don't share</span>
        </div>

      </div>
    </div>
  );
}