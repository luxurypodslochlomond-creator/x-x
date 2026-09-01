import React, { useState } from 'react';
import { motion } from 'framer-motion';

// A note for Graeme — honest, grounded, mate-to-mate but professional.
// No hype. No inflated market numbers. Just where things are and what I need.

export default function GraemeOnePager() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = document.getElementById('graeme-body')?.innerText || '';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => window.print();

  const products = [
    {
      name: 'PetSounds51',
      tagline: 'Sound therapy for animals',
      color: '#b8860b',
      desc: 'Browser-based sound therapy for anxious pets — separation anxiety, fireworks, vet visits. Built on published veterinary neuroscience. No app, no hardware, works on any phone.',
      where: 'Live. Takes payments (£29.99/year). Science page and press kit done.',
      honest: 'No paying subscribers yet. A few hundred people have used the free separation-anxiety protocol.',
    },
    {
      name: 'SORTED',
      tagline: 'Decode scary letters',
      color: '#c47200',
      desc: 'You get a letter that scares you — from a debt collector, the council, a landlord, a scammer. Paste it in. SORTED reads it, tells you what it actually means in plain English, and helps you write back. Any language. Nothing stored.',
      where: 'Live. Takes payments (£9.99/month or one-off for life). Built for people who can\'t read or write — voice in, voice out.',
      honest: 'No paying subscribers yet. A few thousand people have used the free decoder. The need is real — I get messages every week.',
    },
    {
      name: 'Litter Picking',
      tagline: 'Community cleanup, verified',
      color: '#1e8a4e',
      desc: 'Kids and families photograph litter they pick up. AI verifies the photo (fraud detection, weight estimate). Every pickup becomes verified impact data councils and brands can actually report on.',
      where: 'Live and free. Not monetised yet — this is the mission piece. The data is the product.',
      honest: 'Real cleanups happening. No B2B contracts yet. This is where your network could open doors.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#faf7f2', color: '#2a2520', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          #graeme-body { padding: 24px 0 !important; }
          @page { margin: 1.5cm; size: A4; }
        }
      `}</style>

      {/* HEADER */}
      <header className="no-print" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(250,247,242,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <UF51Icon />
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: '-0.01em', color: '#2a2520' }}>UF51</div>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', color: '#a09588' }}>A NOTE FOR GRAEME</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handlePrint}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: '#fff', background: '#2a2520', border: '1px solid #2a2520', borderRadius: 6, padding: '9px 20px', cursor: 'pointer' }}>
            ↓ SAVE PDF
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopy}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: copied ? '#1e8a4e' : '#6b6055', background: copied ? 'rgba(30,138,78,0.08)' : 'rgba(0,0,0,0.03)', border: `1px solid ${copied ? 'rgba(30,138,78,0.2)' : 'rgba(0,0,0,0.08)'}`, borderRadius: 6, padding: '9px 20px', cursor: 'pointer' }}>
            {copied ? '✓ COPIED' : 'COPY'}
          </motion.button>
        </div>
      </header>

      <div id="graeme-body" style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>

          {/* OPENING — letter style, honest */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', color: '#a09588', marginBottom: 16 }}>
              SEPTEMBER 2026 · GLASGOW
            </div>
            <h1 style={{ fontSize: 'clamp(26px, 5.5vw, 38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 18px', color: '#2a2520' }}>
              Graeme —<br />
              here's where I'm at.
            </h1>
            <p style={{ fontSize: 15, color: '#4a4035', lineHeight: 1.65, margin: '0 0 14px' }}>
              I've built three products. They're live. Two of them take real payments through Stripe. I'm writing this honestly because you've been there — you built a company, you sold it, you know what real looks like. I'm not going to dress anything up.
            </p>
            <p style={{ fontSize: 15, color: '#4a4035', lineHeight: 1.65, margin: 0 }}>
              <strong style={{ color: '#2a2520' }}>I'm a builder, not a salesman.</strong> That's why I'm writing to you. The products work. What I don't have is the distribution, the sales muscle, and the runway to keep going without burning out. You might be able to help with all three — or tell me honestly if I'm daft. Either way, I'd rather hear it from you.
            </p>
          </div>

          {/* THE HONEST STATE */}
          <div style={{ marginBottom: 40, padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#a09588', marginBottom: 10 }}>WHERE THINGS ACTUALLY ARE</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { stat: '3', label: 'Products live' },
                { stat: '2', label: 'Taking payments' },
                { stat: '0', label: 'Paying subscribers' },
              ].map((f, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#2a2520', letterSpacing: '-0.02em' }}>{f.stat}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', color: '#8a7d6f', textTransform: 'uppercase', lineHeight: 1.3, marginTop: 2 }}>{f.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#8a7d6f', lineHeight: 1.5, margin: '14px 0 0', fontStyle: 'italic' }}>
              That last number is the honest one. People use the free tools. Nobody's paid yet. That's the gap I'm asking you to help me close.
            </p>
          </div>

          {/* THREE PRODUCTS — honest, grounded */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#a09588', marginBottom: 14 }}>THE THREE PRODUCTS</div>
            {products.map((p) => (
              <div key={p.name} style={{ marginBottom: 12, padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: p.color, letterSpacing: '-0.02em' }}>{p.name}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#a09588' }}>{p.tagline.toUpperCase()}</span>
                </div>
                <p style={{ fontSize: 13, color: '#4a4035', lineHeight: 1.6, margin: '0 0 10px' }}>{p.desc}</p>
                <p style={{ fontSize: 12, color: '#2a2520', lineHeight: 1.5, margin: '0 0 6px' }}>
                  <strong style={{ fontWeight: 700 }}>Where it's at:</strong> {p.where}
                </p>
                <p style={{ fontSize: 12, color: '#8a7d6f', lineHeight: 1.5, margin: 0 }}>
                  <strong style={{ fontWeight: 700, color: '#6b6055' }}>Honest:</strong> {p.honest}
                </p>
              </div>
            ))}
          </div>

          {/* WHAT I NEED — the real ask */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ padding: '24px 26px', background: 'rgba(184,134,11,0.06)', border: '1px solid rgba(184,134,11,0.2)', borderRadius: 12 }}>
              <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#b8860b', marginBottom: 12 }}>WHAT I'M ASKING</div>
              <div style={{ fontSize: 'clamp(20px, 4.5vw, 26px)', fontWeight: 900, color: '#2a2520', letterSpacing: '-0.02em', marginBottom: 14, lineHeight: 1.15 }}>
                Runway to get to revenue.<br />Your experience. Your network.
              </div>
              <p style={{ fontSize: 14, color: '#4a4035', lineHeight: 1.65, margin: '0 0 12px' }}>
                I need roughly <strong style={{ color: '#2a2520' }}>£30–40k</strong> to give me 6–12 months of runway — enough to keep building, stop stressing about the rent, and focus full-time on getting these products to paying customers. That's the honest ask. It would take the heat off and let me do what I'm good at.
              </p>
              <p style={{ fontSize: 14, color: '#4a4035', lineHeight: 1.65, margin: '0 0 12px' }}>
                Beyond the money, I'd value your head. You've sold a company. You know what investors look for, what channels actually work, and when someone's kidding themselves. I'd rather have one honest conversation with you than ten polished pitches.
              </p>
              <p style={{ fontSize: 14, color: '#4a4035', lineHeight: 1.65, margin: 0 }}>
                In return, you'd take equity in a new company — clean, separate from the CIC. I'm open on the exact number. I'd rather get the right partner at a fair price than squeeze every percent. <strong style={{ color: '#2a2520' }}>10% of all revenue goes to the CIC regardless</strong> — that's baked in, not negotiable, it's the whole point.
              </p>
            </div>
          </div>

          {/* WHY ME — honest, not boastful */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.24em', color: '#a09588', marginBottom: 14 }}>WHY ME</div>
            <div style={{ padding: '20px 22px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12 }}>
              <p style={{ fontSize: 13, color: '#4a4035', lineHeight: 1.65, margin: '0 0 10px' }}>
                I've built all three of these myself, on my own, over the last year. They work. They're live. They take real payments. I haven't raised a penny yet. That's either stupid or stubborn — probably both — but it means there's no fluff here. What you see is what exists.
              </p>
              <p style={{ fontSize: 13, color: '#4a4035', lineHeight: 1.65, margin: 0 }}>
                I'm not trying to build a unicorn. I'm trying to build something real that helps people and pays me a wage. If that sounds too small for you, I understand. But if it sounds honest, I'd like to talk.
              </p>
            </div>
          </div>

          {/* CONTACT — simple, human */}
          <div style={{ padding: '8px 0' }}>
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.02em', color: '#2a2520' }}>Brian Hughes</h2>
            <p style={{ fontSize: 12, color: '#8a7d6f', margin: '0 0 16px', lineHeight: 1.6 }}>
              Glasgow, Scotland · CIC formed · uf51.love
            </p>
            <a href="mailto:family@uf51.love?subject=For Graeme"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#2a2520', color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: '0.05em', borderRadius: 8, textDecoration: 'none' }}>
              family@uf51.love
            </a>
            <p style={{ marginTop: 18, fontSize: 12, color: '#a09588', lineHeight: 1.6, fontStyle: 'italic' }}>
              No pressure, Graeme. If it's not for you, that's fine — I'll still buy you a pint next time. ❤️
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

function UF51Icon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="13" stroke="#b8860b" strokeWidth="1.5" fill="none" />
      <path d="M8 15 L11 15 L12.5 9 L14 21 L15.5 11 L17 19 L18.5 13 L20 17 L22 15" stroke="#b8860b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}