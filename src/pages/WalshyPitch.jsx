import React from 'react';

// WalshyPitch — a letter, not a deck.
// Warm, human, honest. The way Brian would actually talk to Chris.

export default function WalshyPitch() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #fdf9f0 0%, #faf8f5 100%)', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: '#2a2520' }}>

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
          }}
        >
          Save PDF
        </button>
      </div>

      <div style={{ maxWidth: 620, margin: '0 auto', padding: '60px 24px 80px' }}>

        {/* LETTERHEAD */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', color: '#a09588', marginBottom: 8 }}>
            A LETTER TO CHRIS
          </div>
          <div style={{ width: 40, height: 3, background: '#d97706', borderRadius: 2 }} />
        </div>

        {/* THE HOOK — honest, human */}
        <div style={{ marginBottom: 44 }}>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 24px', color: '#2a2520' }}>
            I built three things.<br />
            They work. I can't fly them alone.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#6b6055', margin: 0 }}>
            Chris — you know how to open doors. I know how to build things that matter. This isn't a pitch deck. It's a straightforward ask: help me get three working products into the world, and take a real stake in all of them.
          </p>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* THE THREE — simple, one per line */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: '#d97706', marginBottom: 24 }}>
            WHAT I BUILT
          </div>

          {/* PetSounds51 */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#d97706', letterSpacing: '-0.02em' }}>PetSounds51</span>
              <span style={{ fontSize: 12, color: '#a09588', fontWeight: 500 }}>— sound therapy for anxious animals</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6b6055', margin: '0 0 8px' }}>
              Real-time audio built on published veterinary research. No app, no hardware — works in a browser. Dogs, cats, horses. Live and payment-ready.
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#8a7d6f', margin: 0, fontStyle: 'italic' }}>
              One pet insurer partnership = scaled acquisition overnight.
            </p>
          </div>

          {/* SORTED */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#c47200', letterSpacing: '-0.02em' }}>SORTED</span>
              <span style={{ fontSize: 12, color: '#a09588', fontWeight: 500 }}>— decodes scary legal letters</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6b6055', margin: '0 0 8px' }}>
              Paste any letter — HMRC, council, debt collector — get plain English in seconds. Any language. Nothing stored, ever. Live and payment-ready.
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#8a7d6f', margin: 0, fontStyle: 'italic' }}>
              Banks need this for FCA Consumer Duty. Compliance = procurement.
            </p>
          </div>

          {/* Earth51 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#1e8a4e', letterSpacing: '-0.02em' }}>Earth51</span>
              <span style={{ fontSize: 12, color: '#a09588', fontWeight: 500 }}>— kids pick litter, AI verifies it</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6b6055', margin: '0 0 8px' }}>
              Children photograph litter they collect. AI verifies it — fraud detection, weight estimation, tamper-proof. Every pickup becomes reportable ESG data. Built, needs refinement before launch.
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#8a7d6f', margin: 0, fontStyle: 'italic' }}>
              ESG is now legally required. Councils and brands need ground truth.
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* THE HONEST MIDDLE */}
        <div style={{ marginBottom: 44 }}>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6b6055', margin: '0 0 20px' }}>
            The tech is done. Products work. What I don't have is the commercial reach — the relationships, the experience of how big organizations actually move. That's you.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6b6055', margin: '0 0 20px' }}>
            One pet insurer conversation changes PetSounds51. One bank compliance team changes SORTED. One ESG budget changes Earth51. I've built the products. Now I need someone who knows how to have those conversations.
          </p>
          <div style={{ padding: '18px 22px', background: 'rgba(217,119,6,0.06)', borderLeft: '3px solid #d97706', borderRadius: 8 }}>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: '#2a2520', margin: 0, fontStyle: 'italic' }}>
              That's clarity, not weakness. Build beautiful things. Find people who know how to scale them. Both matter.
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* THE OFFER — clear, warm, no jargon */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: '#d97706', marginBottom: 16 }}>
            THE OFFER
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#2a2520', letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.1 }}>
            17% for £20k.
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: '#6b6055', margin: '0 0 16px' }}>
            One stake across all three products. Transparent cap table. 10% of all revenue goes to our Community Interest Company — that's what keeps the core tools free for the people who need them most.
          </p>
          <div style={{ padding: '12px 16px', background: 'rgba(30,138,78,0.06)', borderLeft: '3px solid #1e8a4e', borderRadius: 8 }}>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#15803d', margin: 0, fontWeight: 500 }}>
              SEIS eligible — 50% income tax relief. Your effective cost: £10k.
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 0 40px' }} />

        {/* THE CLOSE — human */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6b6055', margin: '0 0 20px' }}>
            I'm a dad in Glasgow. This morning I was picking up litter with my daughter, then taking her to football. That's not a slogan — that's Earth51. That's the mission, lived, with my kids.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#6b6055', margin: '0 0 20px' }}>
            I've got three products built, live payment infrastructure, and a mission I won't compromise on. What I don't have is you — the person who can walk into a room and make the deal happen.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: '#2a2520', margin: 0, fontWeight: 500 }}>
            Not consultancy. Not advisory. A real stake in something that works. Early enough that your involvement actually shapes what this becomes.
          </p>
        </div>

        {/* SIGN OFF */}
        <div style={{ paddingTop: 8 }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#6b6055', margin: '0 0 28px' }}>
            Keen to explore if there's a fit.
          </p>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#2a2520', marginBottom: 4 }}>Brian Hughes</div>
          <div style={{ fontSize: 13, color: '#a09588', marginBottom: 16 }}>Glasgow, Scotland</div>
          <a href="mailto:family@uf51.love?subject=UF51 Partnership"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', background: '#d97706', color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: '0.04em', borderRadius: 8, textDecoration: 'none' }}>
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