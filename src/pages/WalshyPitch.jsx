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

        {/* THE HONEST OPENING */}
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 20px', color: '#2a2520' }}>
            Three products. Built.<br />
            Working. <span style={{ color: '#d97706' }}>Early.</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: '#6b6055', margin: '0 auto', maxWidth: 520 }}>
            The tech works, payments are live, the products solve real problems. A handful of early users have proved the concept — what's needed now is the person who can take them to scale.
          </p>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* THE THREE PRODUCTS */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: '#d97706', marginBottom: 24, textAlign: 'center' }}>
            WHAT'S BUILT
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
              <span style={{ color: '#8a7d6f' }}>Price: <strong style={{ color: '#2a2520' }}>£29.99/yr</strong></span>
              <span style={{ color: '#8a7d6f' }}>Status: <strong style={{ color: '#1e8a4e' }}>Live</strong></span>
              <span style={{ color: '#8a7d6f' }}>Stage: <strong style={{ color: '#a09588' }}>Early users</strong></span>
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
              <span style={{ color: '#8a7d6f' }}>Price: <strong style={{ color: '#2a2520' }}>£9.99/mo</strong></span>
              <span style={{ color: '#8a7d6f' }}>Status: <strong style={{ color: '#1e8a4e' }}>Live</strong></span>
              <span style={{ color: '#8a7d6f' }}>Stage: <strong style={{ color: '#a09588' }}>Early users</strong></span>
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
              <span style={{ color: '#8a7d6f' }}>Model: <strong style={{ color: '#2a2520' }}>B2B contracts</strong></span>
              <span style={{ color: '#8a7d6f' }}>Status: <strong style={{ color: '#c47200' }}>Near launch</strong></span>
              <span style={{ color: '#8a7d6f' }}>Stage: <strong style={{ color: '#a09588' }}>Pre-pilot</strong></span>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* THE OPPORTUNITY — honest stats */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: '#d97706', marginBottom: 20, textAlign: 'center' }}>
            THE SIZE OF THE OPPORTUNITY
          </div>

          <div style={{ padding: '24px 26px', background: 'white', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#6b6055', margin: '0 0 20px' }}>
              Three markets. All real, all growing, all proven to pay for solutions like these.
            </p>

            {/* Pet care */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#2a2520' }}>Pet care & wellbeing</div>
                <div style={{ fontSize: 12, color: '#a09588', marginTop: 2 }}>70% of UK households own a pet</div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#d97706', letterSpacing: '-0.02em' }}>$259B</div>
            </div>

            {/* Legal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#2a2520' }}>Legal & debt services</div>
                <div style={{ fontSize: 12, color: '#a09588', marginTop: 2 }}>9M UK people in problem debt</div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#c47200', letterSpacing: '-0.02em' }}>$849B</div>
            </div>

            {/* ESG */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#2a2520' }}>Environmental & ESG</div>
                <div style={{ fontSize: 12, color: '#a09588', marginTop: 2 }}>£1.5T global ESG spend mandated by 2030</div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#1e8a4e', letterSpacing: '-0.02em' }}>$1.3T</div>
            </div>

            <div style={{ marginTop: 20, padding: '14px 18px', background: 'rgba(217,119,6,0.05)', borderLeft: '3px solid #d97706', borderRadius: 8 }}>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: '#6b6055', margin: 0 }}>
                Even capturing a fraction of one of these markets changes everything. The products are positioned in spaces where people are already paying for solutions — just not good ones.
              </p>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* WHAT THIS NEEDS */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: '#2a2520', marginBottom: 20, textAlign: 'center' }}>
            WHAT THIS NEEDS
          </div>
          <div style={{ padding: '24px 26px', background: 'white', border: '1px solid rgba(217,119,6,0.15)', borderRadius: 12, boxShadow: '0 2px 12px rgba(217,119,6,0.06)' }}>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6b6055', margin: '0 0 16px' }}>
              I can build. I can't sell. Not the way these products need someone to sell — not a quick pitch, but someone who genuinely lives in the products, understands them inside out, and can have the right conversations with the right people.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6b6055', margin: '0 0 16px' }}>
              One pet insurer conversation changes PetSounds51. One bank compliance team changes SORTED. One ESG budget changes Earth51. Those are the specific doors that need opened — and they need someone who'll put in the work to open them properly.
            </p>
            <div style={{ padding: '14px 18px', background: 'rgba(217,119,6,0.06)', borderLeft: '3px solid #d97706', borderRadius: 8, margin: 0 }}>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: '#2a2520', margin: 0, fontStyle: 'italic' }}>
                This isn't a consultancy or an advisory role. It's a real stake, early enough to shape everything, for someone willing to genuinely live in these products and give them their best chance of success.
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
            Three products that work. Three markets that pay. Early traction — but a long way to go. The only thing missing is the person who can change that.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#2a2520', margin: '0 auto', maxWidth: 500, fontWeight: 600 }}>
            If that's you, let's talk.
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