import React, { useState } from 'react';

const slides = [
  {
    bg: '#0a0514',
    accent: '#ec4899',
    label: 'THE PROBLEM',
    big: 'The planet is drowning in litter.',
    sub: 'Nobody pays people to fix it. The incentive is backwards.',
    mono: null,
  },
  {
    bg: '#0a0514',
    accent: '#ec4899',
    label: 'THE SHIFT',
    big: '1kg litter removed = 1 P51',
    sub: 'A currency backed not by speculation — but by verified planetary healing.',
    mono: null,
  },
  {
    bg: '#0a0514',
    accent: '#06b6d4',
    label: 'THE PROOF',
    big: 'Math. Not trust.',
    sub: 'GPS locks your location. AI analyses your photo. Crypto signs every byte. IPFS stores it forever.',
    mono: 'SHA-256 + ECDSA P-256 + IPFS = unfakeable',
  },
  {
    bg: '#0a0514',
    accent: '#10b981',
    label: 'THE DIFFERENCE',
    big: 'Carbon credits are promises.\nP51 is a receipt.',
    sub: 'The first environmental asset that is mathematically impossible to fake.',
    mono: null,
  },
  {
    bg: '#0a0514',
    accent: '#f59e0b',
    label: 'THE BUYERS',
    big: 'Nike. Apple. Governments. ESG funds.',
    sub: '$30 trillion in ESG money needs verified impact. We built the receipt they\'ve been waiting for.',
    mono: null,
  },
  {
    bg: '#0a0514',
    accent: '#a855f7',
    label: 'THE STRUCTURE',
    big: 'Locked by law.\nNot shareholders.',
    sub: 'UF51 is a Community Interest Company. Every penny of value must return to Earth. Forever.',
    mono: 'CIC = legally impossible to exploit',
  },
  {
    bg: '#0a0514',
    accent: '#ec4899',
    label: 'THE INVITATION',
    big: 'Heal the planet.\nGet paid.\nChange everything.',
    sub: 'Proof of Love is why you do it. Proof of Impact is the receipt the world can fund.',
    mono: '♾️❤️',
  },
];

export default function ProofOfImpactVisual() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  return (
    <div style={{
      background: slide.bg,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif',
      transition: 'background 0.3s ease',
      userSelect: 'none',
    }}>

      {/* PROGRESS BAR */}
      <div style={{ display: 'flex', gap: 4, padding: '20px 24px 0' }}>
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i <= current ? slide.accent : 'rgba(255,255,255,0.15)',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* LABEL */}
      <div style={{ padding: '24px 32px 0' }}>
        <p style={{
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: '0.3em',
          color: slide.accent,
          textTransform: 'uppercase',
          margin: 0,
          opacity: 0.8,
        }}>
          {current + 1} / {slides.length} — {slide.label}
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '32px',
        maxWidth: 760,
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}>
        <h1 style={{
          fontSize: 'clamp(36px, 7vw, 72px)',
          fontWeight: 900,
          color: 'white',
          lineHeight: 1.05,
          margin: '0 0 28px',
          letterSpacing: '-1px',
          whiteSpace: 'pre-line',
        }}>
          {slide.big}
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.6,
          margin: '0 0 24px',
          fontWeight: 400,
        }}>
          {slide.sub}
        </p>

        {slide.mono && (
          <p style={{
            fontFamily: 'monospace',
            fontSize: 13,
            color: slide.accent,
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${slide.accent}33`,
            borderRadius: 8,
            padding: '10px 16px',
            display: 'inline-block',
            margin: 0,
          }}>
            {slide.mono}
          </p>
        )}
      </div>

      {/* NAV */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 32px 32px',
        maxWidth: 760,
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}>
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: current === 0 ? 'rgba(255,255,255,0.2)' : 'white',
            borderRadius: 10,
            padding: '12px 28px',
            fontSize: 15,
            fontWeight: 700,
            cursor: current === 0 ? 'default' : 'pointer',
          }}
        >
          ← Back
        </button>

        <div style={{ display: 'flex', gap: 8 }}>
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === current ? slide.accent : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>

        {current < slides.length - 1 ? (
          <button
            onClick={() => setCurrent(c => Math.min(slides.length - 1, c + 1))}
            style={{
              background: slide.accent,
              border: 'none',
              color: 'white',
              borderRadius: 10,
              padding: '12px 28px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={() => setCurrent(0)}
            style={{
              background: slide.accent,
              border: 'none',
              color: 'white',
              borderRadius: 10,
              padding: '12px 28px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Start over ↺
          </button>
        )}
      </div>

    </div>
  );
}