import React from 'react';

export default function WalshyPitch() {
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
          @page { margin: 1.5cm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
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
          Save PDF
        </button>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3.5rem 2rem 4rem' }}>

        {/* META */}
        <p className="label" style={{ marginBottom: '2rem' }}>Private · June 2026</p>

        {/* HEADLINE */}
        <h1 className="p-display" style={{ fontSize: 'clamp(2rem, 7vw, 2.8rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '0.75rem', color: '#1a1a1a' }}>
          Three products.<br/>All built. Real opportunity.
        </h1>
        <p className="p-display" style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#6b7280', lineHeight: 1.6, marginBottom: '2rem' }}>
          Looking for a commercial partner to scale what's already working.
        </p>

        {/* CONTEXT */}
        <p className="p-body" style={{ fontSize: '0.95rem', lineHeight: 1.85, color: '#374151', marginBottom: '0' }}>
          Three products. All live. All solving real problems. Now looking for the right commercial partner who already has the doors open.
        </p>

        <div className="rule-dark" style={{ margin: '2rem 0' }} />

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
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#4b5563' }}>
              Fourteen million UK households own a pet. Separation anxiety affects roughly a third of dogs. PetSounds51 uses acoustic protocols built on peer-reviewed research. Subscription model, live now.
            </p>
            <p className="p-sans" style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem', lineHeight: 1.6 }}>
              <strong style={{ color: '#374151' }}>Commercial:</strong> Pet insurers (More Than, Petplan) pay anxiety claims. One partnership = funded user acquisition. White-label for Pets at Home, vet practices.
            </p>
          </div>
        </div>

        {/* EARTH51 */}
        <div className="product-row">
          <div>
            <p className="product-name" style={{ color: '#16a34a' }}>Earth51</p>
            <p className="product-sub">Verified ESG · live</p>
          </div>
          <div>
            <p className="hook">"We need to demonstrate real environmental impact."</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#4b5563' }}>
              Community litter picks, AI-verified photos, tamper-proof public ledger. ESG reporting is now a legal requirement for large UK companies.
            </p>
            <p className="p-sans" style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem', lineHeight: 1.6 }}>
              <strong style={{ color: '#374151' }}>Commercial:</strong> FTSE 100 ESG budgets. Unilever, P&G, Tesco need auditable ground truth. £50k-£250k per brand partnership.
            </p>
          </div>
        </div>

        {/* SORTED */}
        <div className="product-row" style={{ borderBottom: '1px solid #f0ede8' }}>
          <div>
            <p className="product-name" style={{ color: '#2563eb' }}>SORTED</p>
            <p className="product-sub">Legal clarity · live</p>
          </div>
          <div>
            <p className="hook">"I got a letter from HMRC and I don't understand it."</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#4b5563' }}>
              SORTED reads any letter — HMRC, bailiffs, courts, councils — and explains it in plain English. Any language. Nothing stored. Legal aid is decimated. Citizens Advice is overwhelmed.
            </p>
            <p className="p-sans" style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem', lineHeight: 1.6 }}>
              <strong style={{ color: '#374151' }}>Commercial:</strong> FCA Consumer Duty. HSBC, Lloyds, NatWest must support vulnerable customers. Procurement deal, not CSR. £100k-£500k per bank.
            </p>
          </div>
        </div>

        <div className="rule-dark" style={{ margin: '2rem 0' }} />

        {/* TECHNICAL INNOVATION */}
        <p className="label" style={{ marginBottom: '1rem' }}>Technical innovation</p>
        <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.85, color: '#374151', marginBottom: '1rem' }}>
          Not wrappers. Proprietary tech with genuine moats:
        </p>

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ border: '1px solid #e5e7eb', padding: '0.875rem', borderRadius: '6px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>PET SOUNDS51 — FREQUENCY ENGINE</p>
            <p className="p-body" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              Custom audio synthesis generating species-specific therapeutic protocols. Real-time frequency generation. No other pet anxiety tool uses this approach.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '0.875rem', borderRadius: '6px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>SORTED — LEGAL DOCUMENT AI</p>
            <p className="p-body" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              Multi-language document parsing with contextual legal reasoning. Zero-storage architecture. Geo-aware pricing/legal context. Built for multi-country scale.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '0.875rem', borderRadius: '6px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>EARTH51 — VERIFICATION LEDGER</p>
            <p className="p-body" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              AI-powered photo verification with perceptual hashing. Cryptographically signed, timestamped, tamper-proof ledger. Auditable ESG verification.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '0.875rem', borderRadius: '6px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>PLATFORM ARCHITECTURE</p>
            <p className="p-body" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              Single codebase, multi-brand deployment. PWA-first (offline, installable), real-time sync, push notifications. Built to spin up new products in days.
            </p>
          </div>
        </div>

        <div className="callout">
          <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#374151', margin: 0 }}>
            All live. All working. Technical foundation is solid. What's needed is the commercial engine.
          </p>
        </div>

        <div className="rule" style={{ marginTop: '2rem' }} />

        {/* THE OPPORTUNITY */}
        <p className="label" style={{ marginBottom: '1rem' }}>What opens up together</p>
        <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.85, color: '#374151', marginBottom: '1rem' }}>
          The tech is built. The products work. The right partner changes everything:
        </p>

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#fef3c7', border: '1px solid #d97706', padding: '0.875rem 1rem', borderRadius: '6px' }}>
            <p className="p-sans" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#92400e', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>PET INSURANCE PARTNERSHIP</p>
            <p className="p-body" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#78350f', margin: 0 }}>
              One meeting with Pets at Home, Animal Friends, Tesco Bank Pet Insurance. They pay anxiety claims daily. PetSounds51 reduces those claims. Revenue share or white-label. £500k-£2m.
            </p>
          </div>

          <div style={{ background: '#dbeafe', border: '1px solid #2563eb', padding: '0.875rem 1rem', borderRadius: '6px' }}>
            <p className="p-sans" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>FCA COMPLIANCE</p>
            <p className="p-body" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#1e3a8a', margin: 0 }}>
              FCA Consumer Duty requires banks to support vulnerable customers. HSBC, Lloyds, NatWest compliance teams. SORTED becomes mandated tool. £100k-£500k annual contracts.
            </p>
          </div>

          <div style={{ background: '#dcfce7', border: '1px solid #16a34a', padding: '0.875rem 1rem', borderRadius: '6px' }}>
            <p className="p-sans" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#166534', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>ESG VERIFICATION</p>
            <p className="p-body" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#14532d', margin: 0 }}>
              FTSE 100 companies need auditable ESG data. Earth51 provides ground-truth verification. Patagonia, Lush, Co-op, corporate CSR teams. £50k-£250k per partnership.
            </p>
          </div>

          <div style={{ background: '#f3e8ff', border: '1px solid #9333ea', padding: '0.875rem 1rem', borderRadius: '6px' }}>
            <p className="p-sans" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b21a8', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>WHITE-LABEL / GRANTS</p>
            <p className="p-body" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#581c87', margin: 0 }}>
              PetSounds51 US licensing. SORTED for legal aid globally. Innovate UK, Creative Scotland, National Lottery grants. £50k-£250k non-dilutive. One licensing deal = £1m+.
            </p>
          </div>
        </div>

        <div className="callout" style={{ background: '#f0fdf4', border: '2px solid #16a34a' }}>
          <p className="p-sans" style={{ fontSize: '0.7rem', fontWeight: 700, color: '#166534', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>THE REAL OPPORTUNITY</p>
          <p className="p-body" style={{ fontSize: '0.88rem', lineHeight: 1.8, color: '#14532d', margin: 0 }}>
            This isn't about building more tech. It's about opening doors. The products work. The markets are proven. What's needed is someone who knows which conversations to have, which meetings to book, and how to structure deals. That's the gap. That's where you come in.
          </p>
        </div>

        <div className="rule" style={{ marginTop: '2rem' }} />

        {/* THE OFFER */}
        <p className="label" style={{ marginBottom: '0.75rem' }}>The offer</p>
        <div className="number-big" style={{ marginBottom: '0.75rem' }}>17% for £20,000.</div>

        <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#374151', marginBottom: '0.5rem' }}>
          One stake across all three products. Transparent cap table: Graeme holds 3% for the introduction, founder equity alongside, UF51 CIC retains 10% of commercial revenue — keeping core tools free for those who need them.
        </p>

        <div className="seis-box">
          <p className="p-sans" style={{ fontSize: '0.75rem', lineHeight: 1.7, color: '#15803d' }}>
            <strong>SEIS:</strong> If SEIS-qualifying — likely — up to 50% income tax relief. Effective outlay closer to £10k. Talk to your accountant.
          </p>
        </div>

        <div className="rule" />

        {/* WHY NOW */}
        <div className="callout">
          <p className="label" style={{ marginBottom: '0.5rem' }}>Why this makes sense</p>
          <p className="p-body" style={{ fontSize: '0.88rem', lineHeight: 1.8, color: '#374151' }}>
            Early enough that the right involvement shapes what it becomes. Not consultancy. Not advisory. A real stake in something that has legs. The build is done. Now it's about scaling with the right partner.
          </p>
        </div>

        <div className="rule" />

        {/* CLOSE */}
        <p className="p-body" style={{ fontSize: '1rem', lineHeight: 1.85, color: '#374151', marginBottom: '1.5rem' }}>
          Looking for someone who'll keep it honest and who already has the relationships to move fast. Keen to explore if there's a fit.
        </p>

        <div className="p-sans" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#9ca3af', letterSpacing: '0.06em', borderTop: '1px solid #f0ede8', paddingTop: '1.25rem' }}>
          <span>universalfrequency51.com</span>
          <span>Private & Confidential · June 2026</span>
        </div>

      </div>
    </div>
  );
}