import React from 'react';

export default function WalshyPitch() {
  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at top, #fdf9f0 0%, #faf8f5 60%, #f5f1ea 100%)', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#2a2520' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @media print {
          .no-print { display: none !important; }
          @page { margin: 1.2cm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* SAVE PDF */}
      <div className="no-print" style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 50 }}>
        <button
          onClick={() => window.print()}
          style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
            padding: '10px 22px', border: '1px solid #d97706',
            color: '#d97706', background: 'white', borderRadius: 8, cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(217,119,6,0.12)',
          }}
        >
          Save PDF
        </button>
      </div>

      <div style={{ maxWidth: 620, margin: '0 auto', padding: '56px 24px 72px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '6px 16px', background: 'rgba(217,119,6,0.08)', borderRadius: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d97706' }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: '#d97706' }}>
              PARTNER BRIEF · JUNE 2026
            </span>
          </div>
        </div>

        {/* THE HOOK */}
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(28px, 5.5vw, 42px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.035em', margin: '0 0 20px', color: '#2a2520' }}>
            Three products. Built.<br />
            <span style={{ color: '#d97706' }}>Working.</span> Ready to scale.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#6b6055', margin: '0 auto', maxWidth: 520 }}>
            Three live products solving real problems in three converging markets. All built, all working. What's missing isn't more tech — it's the person who can open doors and close deals.
          </p>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* THE THREE PRODUCTS */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: '#d97706', marginBottom: 24, textAlign: 'center' }}>
            WHAT I BUILT
          </div>

          {/* PetSounds51 */}
          <div style={{ marginBottom: 24, padding: '20px 22px', background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#d97706', letterSpacing: '-0.02em' }}>PetSounds51</span>
              <span style={{ fontSize: 12, color: '#a09588', fontWeight: 500 }}>— sound therapy for anxious animals</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6b6055', margin: '0 0 10px' }}>
              Real-time audio built on published veterinary research. No app, no hardware — works in a browser. Dogs, cats, horses. Live and payment-ready.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12, paddingTop: 10, borderTop: '1px solid rgba(0,0,0,0.04)' }}>
              <span style={{ color: '#8a7d6f' }}>Market: <strong style={{ color: '#d97706' }}>$259B</strong></span>
              <span style={{ color: '#8a7d6f' }}>Price: <strong style={{ color: '#2a2520' }}>£29.99/yr</strong></span>
              <span style={{ color: '#8a7d6f' }}>Target: <strong style={{ color: '#2a2520' }}>100K subs = £3M/yr</strong></span>
            </div>
          </div>

          {/* SORTED */}
          <div style={{ marginBottom: 24, padding: '20px 22px', background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#c47200', letterSpacing: '-0.02em' }}>SORTED</span>
              <span style={{ fontSize: 12, color: '#a09588', fontWeight: 500 }}>— decodes scary legal letters</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6b6055', margin: '0 0 10px' }}>
              Paste any letter — HMRC, council, debt collector — get plain English in seconds. Any language. Nothing stored, ever. Live and payment-ready.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12, paddingTop: 10, borderTop: '1px solid rgba(0,0,0,0.04)' }}>
              <span style={{ color: '#8a7d6f' }}>Market: <strong style={{ color: '#c47200' }}>$849B legal</strong></span>
              <span style={{ color: '#8a7d6f' }}>Price: <strong style={{ color: '#2a2520' }}>£9.99/mo</strong></span>
              <span style={{ color: '#8a7d6f' }}>Target: <strong style={{ color: '#2a2520' }}>50K subs = £6M/yr</strong></span>
            </div>
          </div>

          {/* Earth51 */}
          <div style={{ padding: '20px 22px', background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#1e8a4e', letterSpacing: '-0.02em' }}>Earth51</span>
              <span style={{ fontSize: 12, color: '#a09588', fontWeight: 500 }}>— verified ESG impact</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6b6055', margin: '0 0 10px' }}>
              Kids photograph litter they collect. AI verifies it — fraud detection, weight estimation, tamper-proof. Every pickup becomes reportable ESG data. Built, needs refinement before launch.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 12, paddingTop: 10, borderTop: '1px solid rgba(0,0,0,0.04)' }}>
              <span style={{ color: '#8a7d6f' }}>Market: <strong style={{ color: '#1e8a4e' }}>$1.3T env + ESG</strong></span>
              <span style={{ color: '#8a7d6f' }}>Model: <strong style={{ color: '#2a2520' }}>B2B contracts</strong></span>
              <span style={{ color: '#8a7d6f' }}>Target: <strong style={{ color: '#2a2520' }}>50 councils = £1M+ yr 1</strong></span>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* MARKET POTENTIAL */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: '#d97706', marginBottom: 20, textAlign: 'center' }}>
            MARKET POTENTIAL — ACHIEVABLE WITH THE RIGHT PARTNER
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 24 }}>
            {[
              { market: '$259B', label: 'Pet care', color: '#d97706' },
              { market: '$849B', label: 'Legal services', color: '#c47200' },
              { market: '$1.3T', label: 'Env + ESG', color: '#1e8a4e' },
            ].map((m, i) => (
              <div key={i} style={{ padding: '20px 16px', background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: m.color, letterSpacing: '-0.02em', marginBottom: 4 }}>{m.market}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#8a7d6f', textTransform: 'uppercase' }}>{m.label}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#6b6055', margin: '0 0 12px' }}>
            Three converging markets. All growing. All mandated or recession-proof. Combined achievable revenue with the right distribution: <strong style={{ color: '#2a2520' }}>£10M+ within 24 months</strong> — 100K pet subscribers, 50K SORTED subscribers, and 50 council ESG contracts.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: '#6b6055', margin: 0 }}>
            The tech is built. The markets are real. What's missing is the person who can walk into a room and make the deal happen.
          </p>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* THE OPPORTUNITY — replaces the personal story */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: '#2a2520', marginBottom: 20, textAlign: 'center' }}>
            WHAT THIS NEEDS
          </div>
          <div style={{ padding: '24px 26px', background: 'white', border: '1px solid rgba(217,119,6,0.15)', borderRadius: 12, boxShadow: '0 2px 12px rgba(217,119,6,0.06)' }}>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6b6055', margin: '0 0 16px' }}>
              Everything technical is done. Products work. Payment infrastructure is live. What these products need is someone who knows how organizations buy — the relationships, the experience, the ability to structure deals that actually close.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6b6055', margin: '0 0 16px' }}>
              One pet insurer conversation changes PetSounds51. One bank compliance team changes SORTED. One ESG budget changes Earth51. That's not theory — those are the specific doors this needs opened.
            </p>
            <div style={{ padding: '14px 18px', background: 'rgba(217,119,6,0.06)', borderLeft: '3px solid #d97706', borderRadius: 8, margin: 0 }}>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: '#2a2520', margin: 0, fontStyle: 'italic' }}>
                This is an opportunity to get in early on three working products, shape how they reach market, and take a real stake across all of them.
              </p>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* THE OFFER */}
        <div style={{ marginBottom: 44, textAlign: 'center' }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: '#d97706', marginBottom: 16 }}>
            THE OFFER
          </div>
          <div style={{ fontSize: 'clamp(32px, 6vw, 40px)', fontWeight: 800, color: '#2a2520', letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1 }}>
            17% for £20k.
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: '#6b6055', margin: '0 auto 16px', maxWidth: 480 }}>
            One stake across all three products. Transparent cap table. 10% of all revenue goes to a registered Community Interest Company — keeping core tools free for the people who need them most.
          </p>
          <div style={{ display: 'inline-block', padding: '10px 18px', background: 'rgba(30,138,78,0.06)', border: '1px solid rgba(30,138,78,0.15)', borderRadius: 8 }}>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: '#15803d', margin: 0, fontWeight: 600 }}>
              SEIS eligible — 50% income tax relief. Effective cost: £10k.
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* THE CLOSE */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6b6055', margin: '0 auto 20px', maxWidth: 500 }}>
            Not consultancy. Not advisory. A real stake in something that works. Early enough that the right involvement actually shapes what this becomes.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#2a2520', margin: '0 auto', maxWidth: 500, fontWeight: 600 }}>
            Three products. Three markets. One partner who can make them fly. Let's talk.
          </p>
        </div>

        {/* SIGN OFF */}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#2a2520', marginBottom: 4 }}>Brian Hughes</div>
          <div style={{ fontSize: 13, color: '#a09588', marginBottom: 20 }}>UF51 · CIC registered</div>
          <a href="mailto:family@uf51.love?subject=UF51 Partnership"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', background: '#d97706', color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: '0.04em', borderRadius: 8, textDecoration: 'none', boxShadow: '0 4px 16px rgba(217,119,6,0.25)' }}>
            family@uf51.love
          </a>
          <div style={{ marginTop: 16, fontSize: 12, color: '#c9bca8' }}>
            Private & Confidential
          </div>
        </div>

      </div>
    </div>
  );
}