import React from 'react';

export default function ProofOfImpactVisual() {

  const steps = [
    { step: "01", emoji: "🙌", title: "You Pick Up Litter", subtitle: "1kg = 1 $P51", color: "#ec4899", borderColor: "rgba(236,72,153,0.4)", bgColor: "rgba(236,72,153,0.08)", detail: "Your choice. Your effort. Proof of Love." },
    { step: "02", emoji: "📍", title: "GPS + Photo Locked", subtitle: "SHA-256 hash signed", color: "#06b6d4", borderColor: "rgba(6,182,212,0.4)", bgColor: "rgba(6,182,212,0.08)", detail: "Cryptographic signature. Unfakeable." },
    { step: "03", emoji: "🤖", title: "AI Analyses It", subtitle: "98%+ accuracy", color: "#10b981", borderColor: "rgba(16,185,129,0.4)", bgColor: "rgba(16,185,129,0.08)", detail: "Weight. Liveness. Brand detection." },
    { step: "04", emoji: "🌐", title: "Stored on IPFS", subtitle: "Permanent. Forever.", color: "#f59e0b", borderColor: "rgba(245,158,11,0.4)", bgColor: "rgba(245,158,11,0.08)", detail: "Decentralised. No company can delete it." },
    { step: "05", emoji: "🔐", title: "Anyone Can Verify", subtitle: "No gatekeepers", color: "#a855f7", borderColor: "rgba(168,85,247,0.4)", bgColor: "rgba(168,85,247,0.08)", detail: "Public key cryptography. Open to audit." },
    { step: "06", emoji: "💰", title: "You Get Paid", subtitle: "Instantly. Guaranteed.", color: "#22c55e", borderColor: "rgba(34,197,94,0.4)", bgColor: "rgba(34,197,94,0.08)", detail: "Tradeable globally. Backed by real proof." }
  ];

  const vs = [
    { them: "Bitcoin burns energy", us: "$P51 heals Earth" },
    { them: "Carbon credits = promises", us: "$P51 = math proof" },
    { them: "Banks control your money", us: "You control your $P51" },
    { them: "CEOs decide what's real", us: "Cryptography decides" },
  ];

  return (
    <div style={{ background: '#0a0514', minHeight: '100vh', color: 'white', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', padding: '24px 0 32px' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.3em', color: '#ec4899', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12 }}>Universal Frequency 51</p>
          <h1 style={{ fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 900, margin: '0 0 12px', lineHeight: 1, letterSpacing: '-2px' }}>PROOF OF IMPACT</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, margin: 0 }}>How healing the planet creates money backed by mathematics</p>
        </div>

        {/* THE EQUATION - HERO */}
        <div style={{ background: 'rgba(236,72,153,0.06)', border: '2px solid rgba(236,72,153,0.3)', borderRadius: 20, padding: '32px 24px', marginBottom: 20, textAlign: 'center' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 24 }}>The Equation</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 'clamp(48px, 10vw, 80px)', fontWeight: 900, lineHeight: 1 }}>1kg</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'monospace' }}>litter removed</div>
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#ec4899' }}>=</div>
            <div>
              <div style={{ fontSize: 'clamp(48px, 10vw, 80px)', fontWeight: 900, lineHeight: 1, color: '#ec4899', textShadow: '0 0 40px rgba(236,72,153,0.6)' }}>1 $P51</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'monospace' }}>verified token</div>
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#ec4899' }}>=</div>
            <div>
              <div style={{ fontSize: 'clamp(48px, 10vw, 80px)', fontWeight: 900, lineHeight: 1, color: '#22c55e', textShadow: '0 0 40px rgba(34,197,94,0.5)' }}>£$€</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'monospace' }}>real money</div>
            </div>
          </div>
          <div style={{ marginTop: 20, background: 'rgba(0,0,0,0.4)', borderRadius: 8, padding: '10px 16px', fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>
            GPS + SHA-256 + AI Vision + IPFS + ECDSA P-256 = mathematically impossible to fake
          </div>
        </div>

        {/* THE FLOW */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '24px', marginBottom: 20 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 20, textAlign: 'center' }}>The Flow</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background: s.bgColor, border: `1px solid ${s.borderColor}`, borderRadius: 14, padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: s.color, opacity: 0.6, fontWeight: 700 }}>{s.step}</span>
                  <span style={{ fontSize: 24 }}>{s.emoji}</span>
                </div>
                <div style={{ fontWeight: 900, fontSize: 15, color: s.color, marginBottom: 4, lineHeight: 1.2 }}>{s.title}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'white', marginBottom: 6 }}>{s.subtitle}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* VS + WHY */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 20 }}>

          {/* VS */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '24px' }}>
            <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 16 }}>Old World vs $P51</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {vs.map((v, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '8px 10px', fontSize: 12, color: 'rgba(239,68,68,0.6)', textDecoration: 'line-through' }}>{v.them}</div>
                  <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 8, padding: '8px 10px', fontSize: 12, color: '#22c55e', fontWeight: 700 }}>{v.us}</div>
                </div>
              ))}
            </div>
          </div>

          {/* WHY */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '24px' }}>
            <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 16 }}>Why This Hits Different</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { emoji: "🪐", text: "Not a promise. Mathematical proof Earth was healed." },
                { emoji: "🔐", text: "Anyone with SHA-256 can verify. No company needed." },
                { emoji: "💰", text: "Corporations pay real money for verified impact." },
                { emoji: "♾️", text: "IPFS means your proof lives forever. Can't be deleted." },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{item.emoji}</span>
                  <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: 'center', padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 900, margin: '0 0 8px', lineHeight: 1.2 }}>This is how you prove love to the Earth.</p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: 12, margin: '0 0 16px' }}>Not with talk. With action. And math that can't be faked.</p>
          <p style={{ fontSize: 28, margin: 0 }}>♾️❤️</p>
        </div>

      </div>
    </div>
  );
}