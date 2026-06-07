import React from 'react';

export default function ForChris() {
  return (
    <div className="min-h-screen" style={{ background: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1a1a1a' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        .p-display { font-family: "Playfair Display", Georgia, serif; }
        .p-sans    { font-family: "Inter", -apple-system, sans-serif; }
        .p-body    { font-family: Georgia, "Times New Roman", serif; }

        .label {
          font-family: "Inter", sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          color: #9ca3af;
        }

        .product-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 1.5rem;
          padding: 1.75rem 0;
          border-top: 1px solid #f0ede8;
          align-items: start;
        }

        .product-name {
          font-family: "Inter", sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .product-sub {
          font-family: "Inter", sans-serif;
          font-size: 0.72rem;
          color: #9ca3af;
          margin-top: 0.2rem;
          font-weight: 400;
        }

        .hook {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 1rem;
          font-style: italic;
          color: #374151;
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .rule { height: 1px; background: #f0ede8; margin: 2.25rem 0; }
        .rule-dark { height: 1px; background: #1a1a1a; margin: 2.25rem 0; }

        .number-big {
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(2.8rem, 8vw, 4rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #1a1a1a;
        }

        .callout {
          background: #f9f7f4;
          border-left: 3px solid #1a1a1a;
          padding: 1.25rem 1.5rem;
          margin: 1.5rem 0;
        }

        .seis-box {
          background: #f0fdf4;
          border-left: 3px solid #16a34a;
          padding: 1rem 1.25rem;
          margin-top: 1rem;
        }

        @media (max-width: 500px) {
          .product-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }

        @media print {
          .no-print { display: none !important; }
          @page { margin: 1.8cm; size: A4; }
        }
      `}</style>

      {/* SAVE PDF */}
      <div className="no-print" style={{ position: 'fixed', top: '1.25rem', right: '1.25rem', zIndex: 50 }}>
        <button
          onClick={() => window.print()}
          className="p-sans"
          style={{
            fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '0.5rem 1rem', border: '1px solid #d1d5db',
            color: '#9ca3af', background: 'white', cursor: 'pointer',
          }}
        >
          Save as PDF
        </button>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '4.5rem 2rem 6rem' }}>

        {/* META */}
        <p className="label" style={{ marginBottom: '2.5rem' }}>Private · For Chris Walsh · June 2026</p>

        {/* HEADLINE */}
        <h1 className="p-display" style={{ fontSize: 'clamp(2.2rem, 7vw, 3rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1rem', color: '#1a1a1a' }}>
          Three products solving<br />real problems.
        </h1>
        <p className="p-display" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#6b7280', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          All live. All working. One commercial opportunity.
        </p>

        {/* CONTEXT */}
        <p className="p-body" style={{ fontSize: '1rem', lineHeight: 1.85, color: '#374151', marginBottom: '0' }}>
          Eighteen years at the top of media investment teaches you something — most "tech opportunities" are ideas dressed up as products. This isn't that. The platform is built. The products are live and being used. What's missing is a commercial brain who's spent a career understanding how brands spend money, why they do it, and what actually moves the needle for them. That's the gap this is looking to fill.
        </p>

        <div className="rule-dark" style={{ margin: '2.5rem 0' }} />

        {/* PRODUCTS */}
        <p className="label" style={{ marginBottom: '0.5rem' }}>What we built</p>

        {/* PETSOUNDS51 */}
        <div className="product-row">
          <div>
            <p className="product-name" style={{ color: '#d97706' }}>PetSounds51</p>
            <p className="product-sub">Sound therapy · live</p>
          </div>
          <div>
            <p className="hook">"My dog is destroying the house every time I leave."</p>
            <p className="p-body" style={{ fontSize: '0.92rem', lineHeight: 1.8, color: '#4b5563' }}>
              Fourteen million UK households own a pet. Separation anxiety affects roughly a third of dogs. The existing solutions — trainers, vets, medication — are slow, expensive and often don't work. PetSounds51 uses acoustic protocols built on peer-reviewed research. Works from a phone. Live now, subscription model.
            </p>
            <p className="p-sans" style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.6rem', lineHeight: 1.6 }}>
              <strong style={{ color: '#374151' }}>Commercial angle:</strong> Pet insurers pay out on anxiety-related claims. One insurer partnership — reduce claims, fund the product. Brands with pet ranges (Pets at Home, Hills, Royal Canin) would pay to white-label this. One vet endorsement changes the B2C story completely.
            </p>
          </div>
        </div>

        {/* SORTED */}
        <div className="product-row">
          <div>
            <p className="product-name" style={{ color: '#2563eb' }}>SORTED</p>
            <p className="product-sub">Legal clarity · live</p>
          </div>
          <div>
            <p className="hook">"I got a letter from HMRC and I don't understand it."</p>
            <p className="p-body" style={{ fontSize: '0.92rem', lineHeight: 1.8, color: '#4b5563' }}>
              SORTED reads any letter — HMRC, bailiffs, courts, councils — and explains it in plain English. Any language. In seconds. Nothing stored. Legal aid has been decimated. Citizens Advice is overwhelmed. Nobody has built for the person on the other end of the letter.
            </p>
            <p className="p-sans" style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.6rem', lineHeight: 1.6 }}>
              <strong style={{ color: '#374151' }}>Commercial angle:</strong> FCA Consumer Duty requires banks to demonstrably support vulnerable customers. SORTED is a compliance solution, not just a CSR story. HSBC, Lloyds, utilities, housing associations — organisations with millions of customers who get scary letters and can't afford a solicitor. You've sat in those rooms. You know how that conversation goes.
            </p>
          </div>
        </div>

        {/* EARTH51 */}
        <div className="product-row" style={{ borderBottom: '1px solid #f0ede8' }}>
          <div>
            <p className="product-name" style={{ color: '#16a34a' }}>Earth51</p>
            <p className="product-sub">Verified ESG · live</p>
          </div>
          <div>
            <p className="hook">"We need to demonstrate real environmental impact."</p>
            <p className="p-body" style={{ fontSize: '0.92rem', lineHeight: 1.8, color: '#4b5563' }}>
              Community litter picks, AI-verified photos, tamper-proof public ledger. ESG reporting is now a legal requirement for large UK companies and they need verified ground truth — not spreadsheets of good intentions.
            </p>
            <p className="p-sans" style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.6rem', lineHeight: 1.6 }}>
              <strong style={{ color: '#374151' }}>Commercial angle:</strong> PHD's work with BHF is the model — purpose-led, measurable, brand-level. Earth51 provides the auditable data that makes those campaigns credible to a board. The brands you've worked with for two decades need exactly this.
            </p>
          </div>
        </div>

        <div className="rule" style={{ marginTop: '2.5rem' }} />

        {/* THE OFFER */}
        <p className="label" style={{ marginBottom: '1.25rem' }}>The offer</p>
        <div className="number-big" style={{ marginBottom: '1.25rem' }}>17% for £20,000.</div>

        <p className="p-body" style={{ fontSize: '1rem', lineHeight: 1.8, color: '#374151', marginBottom: '0.75rem' }}>
          One stake across all three products. UF51 CIC — the community interest company — retains 10% of commercial revenue. Keeps the core tools free for the people who need them most. That's locked in by structure.
        </p>

        <div className="seis-box">
          <p className="p-sans" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#15803d' }}>
            <strong>On SEIS:</strong> If SEIS-qualifying — which is likely — up to 50% income tax relief applies. Effective outlay closer to £10k. Worth a conversation with your accountant before anything else.
          </p>
        </div>

        <div className="rule" />

        {/* WHY NOW / EXIT */}
        <div className="callout">
          <p className="label" style={{ marginBottom: '0.75rem' }}>Why now makes sense</p>
          <p className="p-body" style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#374151' }}>
            Eighteen years at PHD builds something that's hard to replicate — a complete picture of how commercial media works, what brands actually need, and who makes the decisions. If you're thinking about what the next chapter looks like, this is early enough that your involvement genuinely shapes what it becomes. Not a consultancy arrangement. Not an advisory credit on a deck. A real stake in something that's already moving.
          </p>
        </div>

        <div className="rule" />

        {/* CLOSE */}
        <p className="p-body" style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#374151', marginBottom: '1.5rem' }}>
          I'll be straight with you. The products are live but they're not where they need to be yet. The investment isn't to paper over cracks — it's to let me stop splitting my focus and actually finish the job properly. Right now I'm building, selling, supporting and trying to grow all at once. That has to change.
        </p>
        <p className="p-body" style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#374151', marginBottom: '1.5rem' }}>
          What I need alongside the money is someone who's been in the room when big commercial decisions get made. Someone who can open doors I can't, and tell me honestly when something isn't good enough yet. You've spent 18 years doing exactly that. I think we'd work well together.
        </p>
        <p className="p-body" style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#374151', marginBottom: '2rem' }}>
          No pressure either way. Just wanted you to see the full picture honestly.
        </p>

        <p className="p-display" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#9ca3af' }}>— Brian</p>

        <div className="rule" style={{ marginTop: '3rem' }} />

        <div className="p-sans" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#d1d5db', letterSpacing: '0.06em' }}>
          <span>universalfrequency51.com</span>
          <span>Private — please don't share</span>
        </div>

      </div>
    </div>
  );
}