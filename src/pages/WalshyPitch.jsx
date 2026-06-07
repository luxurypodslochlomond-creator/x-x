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
        <p className="label" style={{ marginBottom: '2.5rem' }}>Private · June 2026</p>

        {/* HEADLINE */}
        <h1 className="p-display" style={{ fontSize: 'clamp(2.2rem, 7vw, 3rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1rem', color: '#1a1a1a' }}>
          Three products solving<br />real problems.
        </h1>
        <p className="p-display" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#6b7280', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          All built. All ready. One commercial opportunity.
        </p>

        {/* CONTEXT */}
        <p className="p-body" style={{ fontSize: '1rem', lineHeight: 1.85, color: '#374151', marginBottom: '0' }}>
          Three products. All built. All working. Now looking for the right commercial partner who already has the doors open — someone who knows how brands spend, what they need, and how to scale something real together.
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

        {/* EARTH51 */}
        <div className="product-row">
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
              <strong style={{ color: '#374151' }}>Commercial angle:</strong> Purpose-led brand campaigns are now expected to be measurable at board level, not just by a comms team. Earth51 provides the auditable ground truth that makes those campaigns credible. Any brand being asked to evidence ESG impact needs exactly this.
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
            <p className="p-body" style={{ fontSize: '0.92rem', lineHeight: 1.8, color: '#4b5563' }}>
              SORTED reads any letter — HMRC, bailiffs, courts, councils — and explains it in plain English. Any language. In seconds. Nothing stored. Legal aid has been decimated. Citizens Advice is overwhelmed. Nobody has built for the person on the other end of the letter.
            </p>
            <p className="p-sans" style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.6rem', lineHeight: 1.6 }}>
              <strong style={{ color: '#374151' }}>Commercial angle:</strong> FCA Consumer Duty requires banks to demonstrably support vulnerable customers. SORTED is a compliance solution, not just a CSR story. HSBC, Lloyds, utilities, housing associations — organisations with millions of customers who get scary letters and can't afford a solicitor. That's a procurement conversation, not a charity pitch.
            </p>
          </div>
        </div>

        <div className="rule-dark" style={{ margin: '3rem 0' }} />

        {/* TECHNICAL INNOVATION */}
        <p className="label" style={{ marginBottom: '1.25rem' }}>Technical innovation</p>
        <p className="p-body" style={{ fontSize: '1rem', lineHeight: 1.85, color: '#374151', marginBottom: '1.5rem' }}>
          This isn't a wrapper around ChatGPT. Every product is built on proprietary technology with genuine technical moats:
        </p>

        <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '8px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>PET SOUNDS51 — FREQUENCY ENGINE</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              Custom audio synthesis engine generating species-specific therapeutic protocols. Not playlists — real-time frequency generation based on peer-reviewed research. Each protocol is a unique acoustic signature. Built-in session tracking, smart protocol recommendations, and offline playback. No other pet anxiety tool uses this approach.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '8px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>SORTED — LEGAL DOCUMENT AI</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              Multi-language document parsing with contextual legal reasoning. Handles HMRC letters, court documents, council notices, bailiff letters — each with different structures and jurisdictions. Zero-storage architecture (nothing persisted), real-time streaming responses, and geo-aware pricing/legal context. Built for scale across multiple countries simultaneously.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '8px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>EARTH51 — VERIFICATION LEDGER</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              AI-powered photo verification with perceptual hashing to prevent fraud. Every cleanup is cryptographically signed, timestamped, and stored on a public tamper-proof ledger. GPS validation, duplicate detection, and automated token rewards. This is ESG verification you can actually audit — not self-reported spreadsheets.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '8px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>PLATFORM ARCHITECTURE</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              Single codebase, multi-brand deployment. PetSounds51, SORTED, Earth51, CB51, CTRL51, TRACKT — all running on shared infrastructure with isolated data, custom branding, and independent Stripe integrations. PWA-first (works offline, installable on iOS/Android), real-time sync, push notifications, and zero server architecture for cost efficiency. Built to spin up new products in days, not months.
            </p>
          </div>
        </div>

        <div className="callout">
          <p className="p-body" style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#374151', margin: 0 }}>
            None of this is theoretical. It's all live, working, and deployed. The technical foundation is solid. What's needed is the commercial engine to monetize it properly.
          </p>
        </div>

        <div className="rule" style={{ marginTop: '2.5rem' }} />

        {/* THE OPPORTUNITY */}
        <p className="label" style={{ marginBottom: '1.25rem' }}>What we build together</p>
        <p className="p-body" style={{ fontSize: '1rem', lineHeight: 1.85, color: '#374151', marginBottom: '1.5rem' }}>
          The tech is built. The products work. What's missing is the commercial engine — and that's where the right partner changes everything. Here's what opens up with the right relationships:
        </p>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#fef3c7', border: '1px solid #d97706', padding: '1rem 1.25rem', borderRadius: '6px' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400e', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>PET INSURANCE PARTNERSHIP</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#78350f', margin: 0 }}>
              One meeting with Pets at Home, Animal Friends, or Tesco Bank Pet Insurance. They're paying out on anxiety claims daily. PetSounds51 reduces those claims. That's a revenue share deal or white-label license. £500k-£2m partnership range.
            </p>
          </div>

          <div style={{ background: '#dbeafe', border: '1px solid #2563eb', padding: '1rem 1.25rem', borderRadius: '6px' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>FINANCIAL SERVICES COMPLIANCE</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#1e3a8a', margin: 0 }}>
              FCA Consumer Duty requires banks to support vulnerable customers. One conversation with HSBC, Lloyds, or NatWest's compliance team. SORTED becomes their mandated tool for customer communications. £100k-£500k annual contracts per bank.
            </p>
          </div>

          <div style={{ background: '#dcfce7', border: '1px solid #16a34a', padding: '1rem 1.25rem', borderRadius: '6px' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>ESG VERIFICATION PLATFORM</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#14532d', margin: 0 }}>
              Every FTSE 100 company needs auditable ESG data. Earth51 provides ground-truth verification. One intro to a purpose-led brand (Patagonia, Lush, Co-op) or a corporate CSR team. £50k-£250k per brand partnership.
            </p>
          </div>

          <div style={{ background: '#f3e8ff', border: '1px solid #9333ea', padding: '1rem 1.25rem', borderRadius: '6px' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b21a8', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>WHITE-LABEL EXPANSION</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#581c87', margin: 0 }}>
              All three products can be licensed to other markets. PetSounds51 in the US (huge pet spend). SORTED for legal aid orgs globally. Earth51 for UN SDG reporting. One licensing deal = £1m+ revenue.
            </p>
          </div>
        </div>

        <div className="callout" style={{ background: '#f0fdf4', border: '2px solid #16a34a' }}>
          <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>THE REAL OPPORTUNITY</p>
          <p className="p-body" style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#14532d', margin: 0 }}>
            This isn't about building more tech. It's about opening doors that are already there. The products work. The markets are proven. What's needed is someone who knows which conversations to have, which meetings to book, and how to structure deals that make everyone money. That's the gap. That's where you come in.
          </p>
        </div>

        <div className="rule" style={{ marginTop: '2.5rem' }} />

        {/* THE OFFER */}
        <p className="label" style={{ marginBottom: '1.25rem' }}>The offer</p>
        <div className="number-big" style={{ marginBottom: '1.25rem' }}>17% for £20,000.</div>

        <p className="p-body" style={{ fontSize: '1rem', lineHeight: 1.8, color: '#374151', marginBottom: '0.75rem' }}>
          One stake across all three products. To be transparent on the cap table: Graeme holds 3% for making the introduction, founder equity sits alongside that, and UF51 CIC retains 10% of commercial revenue by legal structure — keeping the core tools free for the people who need them most.
        </p>

        <div className="seis-box">
          <p className="p-sans" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#15803d' }}>
            <strong>On SEIS:</strong> If SEIS-qualifying — which is likely — up to 50% income tax relief applies. Effective outlay closer to £10k. Worth a conversation with your accountant before anything else.
          </p>
        </div>

        <div className="rule" />

        {/* THE OPPORTUNITY */}
        <p className="label" style={{ marginBottom: '1.25rem' }}>What we build together</p>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '8px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>PET INSURANCE PARTNERSHIP</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              One deal with a major pet insurer (More Than, Petplan, Bought By Many) to offer PetSounds51 as a covered treatment. Instant access to millions of customers. They reduce anxiety-related claims. We get funded user acquisition. Everyone wins.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '8px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>FINANCIAL SERVICES / FCA COMPLIANCE</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              HSBC, Lloyds, NatWest, Monzo — any bank struggling with FCA Consumer Duty requirements. SORTED becomes their vulnerable customer support tool. Procurement deal, not marketing spend. Millions of customers get help. Bank meets regulatory obligations. We get paid per-user or licensed annually.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '8px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>ESG / CORPORATE PARTNERSHIPS</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              Unilever, P&G, Tesco, Sainsbury's — brands with ESG targets and budget to hit them. Earth51 provides verified, auditable environmental impact. They fund litter picks as part of their sustainability strategy. We become the infrastructure for measurable environmental action.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '8px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>WHITE LABEL / LICENSING</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              Pets at Home white-labeling PetSounds51. Vet practices offering it as a prescribed treatment. Housing associations licensing SORTED for tenants. Local councils using Earth51 for community engagement. Each one is a B2B licensing deal, not a B2C grind.
            </p>
          </div>

          <div style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderRadius: '8px', background: '#fafafa' }}>
            <p className="p-sans" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>GRANT FUNDING</p>
            <p className="p-body" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563', margin: 0 }}>
              Innovate UK, Creative Scotland, National Lottery — all have grants aligned with what we're building. Mental health, environmental impact, financial inclusion, tech innovation. £50k-£250k grants available. Non-dilutive funding to accelerate development without giving up more equity.
            </p>
          </div>
        </div>

        <div className="callout">
          <p className="p-body" style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#374151', margin: 0 }}>
            These aren't cold pitches. These are doors that open with the right introduction. Someone who already has the relationships, knows how to structure these deals, and understands how big organisations buy. The tech is ready. The products work. Now it's about execution at scale.
          </p>
        </div>

        <div className="rule" style={{ marginTop: '2.5rem' }} />

        {/* WHY NOW */}
        <div className="callout">
          <p className="label" style={{ marginBottom: '0.75rem' }}>Why now makes sense</p>
          <p className="p-body" style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#374151' }}>
            This is early enough that the right involvement genuinely shapes what it becomes. Not a consultancy arrangement. Not an advisory credit on a deck. A real stake in something that has legs.
          </p>
        </div>

        <div className="rule" />

        {/* CLOSE */}
        <p className="p-body" style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#374151', marginBottom: '1.5rem' }}>
          The products are live but they're not yet where they could be. The investment isn't to paper over cracks — it's to stop splitting attention across building, supporting, selling and everything else at once, and actually finish the job properly.
        </p>
        <p className="p-body" style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#374151', marginBottom: '1.5rem' }}>
          Looking for someone who'll keep it honest when something needs work, and who already has the relationships to move fast. The build is done. Now it's about scaling with the right partner.
        </p>
        <p className="p-body" style={{ fontSize: '1.05rem', lineHeight: 1.85, color: '#374151', marginBottom: '2rem' }}>
          Keen to explore if there's a fit.
        </p>

        <p className="p-display" style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#9ca3af' }}>— Brian</p>

        <p className="p-sans" style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '2.5rem', fontStyle: 'italic' }}>
          P.S. Still owe my fencing babe a proper lesson. ♾️
        </p>

        <div className="rule" style={{ marginTop: '3rem' }} />

        <div className="p-sans" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#9ca3af', letterSpacing: '0.06em' }}>
          <span>universalfrequency51.com</span>
          <span>Private — please don't share</span>
        </div>

      </div>
    </div>
  );
}