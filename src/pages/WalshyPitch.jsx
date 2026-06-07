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
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          color: #9ca3af;
        }

        .rule { height: 1px; background: #f0ede8; }

        .tight-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .product-box {
          border-top: 1px solid #f0ede8;
          padding: 1rem 0;
        }

        .product-name {
          font-family: "Inter", sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          margin-bottom: 0.2rem;
        }

        .product-sub {
          font-family: "Inter", sans-serif;
          font-size: 0.6rem;
          color: #9ca3af;
          font-weight: 400;
        }

        .hook {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 0.75rem;
          font-style: italic;
          color: #374151;
          margin: 0.35rem 0;
          line-height: 1.3;
        }

        .tiny-text {
          font-size: 0.65rem;
          line-height: 1.5;
          color: #4b5563;
          margin: 0.25rem 0;
        }

        .number-big {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 2.2rem;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          margin: 0.5rem 0;
        }

        .callout {
          background: #f9f7f4;
          border-left: 3px solid #1a1a1a;
          padding: 0.75rem 1rem;
          margin: 0.75rem 0;
        }

        .seis-box {
          background: #f0fdf4;
          border-left: 3px solid #16a34a;
          padding: 0.5rem 0.75rem;
          margin-top: 0.5rem;
        }

        @media print {
          .no-print { display: none !important; }
          @page { margin: 0.8cm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }

        @media (max-width: 640px) {
          .tight-grid {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
          }
          .product-box {
            border-bottom: 1px solid #f0ede8 !important;
          }
          body {
            font-size: 15px !important;
            line-height: 1.7 !important;
          }
          h1 { font-size: 28px !important; }
          h2 { font-size: 18px !important; }
          h3 { font-size: 16px !important; }
        }
      `}</style>

      {/* SAVE PDF */}
      <div className="no-print" style={{ position: 'fixed', top: '0.75rem', right: '0.75rem', zIndex: 50 }}>
        <button
          onClick={() => window.print()}
          className="p-sans"
          style={{
            fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '0.35rem 0.75rem', border: '1px solid #d1d5db',
            color: '#9ca3af', background: 'white', cursor: 'pointer',
          }}
        >
          Save PDF
        </button>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1.5rem 2.5rem', fontSize: '14px', lineHeight: '1.6' }}>

        {/* HEADER */}
        <div>
          <p className="label" style={{ marginBottom: '1rem' }}>Private · June 2026</p>

          <h1 className="p-display" style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.15, marginBottom: '0.4rem', color: '#1a1a1a' }}>
            Three products.<br/>All built. Real.
          </h1>
          <p className="p-display" style={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#6b7280', lineHeight: 1.4, marginBottom: '0.8rem' }}>
            Looking for a partner who gets it.
          </p>

          <p className="p-body" style={{ fontSize: '0.8rem', lineHeight: 1.7, color: '#1f2937', marginBottom: '0.8rem' }}>
            Three live products. All solving real problems. All working. Now looking for someone who already has the doors open and can move fast.
          </p>

          <div className="rule" style={{ marginBottom: '0.8rem' }} />

          {/* PRODUCTS */}
          <p className="label" style={{ marginBottom: '0.5rem' }}>What we built</p>

          <div className="tight-grid" style={{ marginBottom: '0.8rem' }}>
            <div className="product-box">
              <p className="product-name" style={{ color: '#d97706' }}>PetSounds51</p>
              <p className="product-sub">Sound therapy · live</p>
              <p className="hook">"My dog is destroying the house."</p>
              <p className="tiny-text">14m UK pet households. Separation anxiety. Acoustic protocols built on research. Works. Now.</p>
              <p className="p-sans" style={{ fontSize: '0.6rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                <strong style={{ color: '#374151' }}>Move:</strong> Pet insurers. One partnership = scaled acquisition.
              </p>
            </div>

            <div className="product-box">
              <p className="product-name" style={{ color: '#16a34a' }}>Earth51</p>
              <p className="product-sub">Verified ESG · live</p>
              <p className="hook">"We need real impact proof."</p>
              <p className="tiny-text">Community litter picks. AI-verified. Tamper-proof ledger. ESG is now legally required.</p>
              <p className="p-sans" style={{ fontSize: '0.6rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                <strong style={{ color: '#374151' }}>Move:</strong> FTSE 100 ESG budgets. Auditable ground truth.
              </p>
            </div>

            <div className="product-box" style={{ borderBottom: '1px solid #f0ede8', gridColumn: '1 / -1' }}>
              <p className="product-name" style={{ color: '#2563eb' }}>SORTED</p>
              <p className="product-sub">Legal clarity · live</p>
              <p className="hook">"HMRC letter. Can't understand it."</p>
              <p className="tiny-text">Reads any letter. Plain English. Any language. Nothing stored. Legal aid is gone. Citizens Advice drowning.</p>
              <p className="p-sans" style={{ fontSize: '0.6rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                <strong style={{ color: '#374151' }}>Move:</strong> FCA Consumer Duty. Banks need this. Compliance = procurement.
              </p>
            </div>
          </div>

          <div className="rule" style={{ marginBottom: '0.8rem' }} />

          {/* THE REAL BIT */}
          <p className="label" style={{ marginBottom: '0.4rem' }}>What's really happening</p>
          <p className="p-body" style={{ fontSize: '0.8rem', lineHeight: 1.75, color: '#1f2937', marginBottom: '0.6rem' }}>
            Tech is done. Products work. We're past the building phase. What we need is someone who knows how big organizations move — relationships, experience, the right doors. Someone who can structure deals that work.
          </p>

          <p className="p-body" style={{ fontSize: '0.8rem', lineHeight: 1.75, color: '#1f2937', marginBottom: '0.6rem' }}>
            One pet insurer conversation changes PetSounds51. One bank compliance team changes SORTED. One ESG budget changes Earth51. We've built the products. Now we need someone who knows how to have those conversations.
          </p>

          <div className="callout">
            <p className="p-body" style={{ fontSize: '0.8rem', lineHeight: 1.7, color: '#1f2937', margin: 0 }}>
              That's clarity, not weakness. Build beautiful things. Find people who know how to scale them. Both matter.
            </p>
          </div>

          <div className="rule" style={{ marginBottom: '0.6rem' }} />

          {/* THE OFFER */}
          <p className="label" style={{ marginBottom: '0.3rem' }}>The offer</p>
          <div className="number-big">17% for £20k.</div>
          <p className="p-body" style={{ fontSize: '0.75rem', lineHeight: 1.6, color: '#1f2937', marginBottom: '0.3rem' }}>
            One stake. All three products. Transparent cap table: Graeme 3%, founder alongside, UF51 CIC holds 10% revenue — keeping core tools free.
          </p>
          <div className="seis-box">
            <p className="p-sans" style={{ fontSize: '0.65rem', lineHeight: 1.6, color: '#15803d', margin: 0 }}>
              <strong>SEIS eligible:</strong> 50% income tax relief. Effective cost £10k.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="rule" style={{ margin: '1rem 0 0.75rem' }} />
        <div>
          <p className="p-body" style={{ fontSize: '0.8rem', lineHeight: 1.75, color: '#1f2937', marginBottom: '0.5rem' }}>
            Early enough that the right involvement actually shapes what this becomes. Not consultancy. Not advisory. A real stake in something that works.
          </p>
          <p className="p-body" style={{ fontSize: '0.8rem', lineHeight: 1.75, color: '#1f2937', marginBottom: '0.75rem' }}>
            Keen to explore if there's a fit.
          </p>
          <div className="p-sans" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.55rem', color: '#9ca3af', letterSpacing: '0.06em' }}>
            <span>universalfrequency51.com</span>
            <span>Private & Confidential</span>
          </div>
        </div>

      </div>
    </div>
  );
}