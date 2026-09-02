import React from 'react';

// UF51 — Four products, one platform.
// A simple two-page overview. Enough to get someone interested; not a data room.

const PAPER = '#faf8f5';
const INK = '#1a1208';
const INK_SOFT = 'rgba(26,18,8,0.62)';
const INK_FAINT = 'rgba(26,18,8,0.40)';
const LINE = 'rgba(26,18,8,0.10)';

const PRODUCTS = [
  {
    name: 'PetSounds51',
    icon: '🐾',
    accent: '#d4a017',
    tagline: 'Sound therapy for anxious pets — built on peer-reviewed research.',
    problem: 'Around 70% of dogs show anxiety. Owners feel helpless, drugs are a last resort, and a behaviour consult can cost £200+.',
    solution: 'Targeted acoustic-therapy protocols through a simple web app. The Separation Anxiety protocol is free; the full library is subscription.',
    market: 'Global pet care ≈ $260B; pet wellness is the fastest-growing slice.',
    status: 'Live · Stripe-ready · pre-revenue',
    fits: 'Pets at Home · vet channel',
  },
  {
    name: 'SORTED',
    icon: '✉️',
    accent: '#ea580c',
    tagline: 'Decodes any scary letter into plain English — in seconds, any language.',
    problem: 'Millions get frightening letters — council tax, debt, eviction — and don’t understand them. UK legal aid has collapsed.',
    solution: 'Paste or photograph a letter → what it means, the deadline, the steps, and free local help. Private by design; nothing stored.',
    market: 'Global legal-aid gap — billions with no affordable help; grows with every rate rise.',
    status: 'Live · paid tier live · 100+ letters decoded',
    fits: 'Banks · FCA Consumer Duty',
  },
  {
    name: 'earth51',
    icon: '🌍',
    accent: '#16a34a',
    tagline: 'Snap it, clean it, earn it — civic action that rewards itself.',
    problem: 'Litter blights communities; councils are underfunded and reactive; the people who already pick up litter get nothing back.',
    solution: 'Snap litter → AI verifies the cleanup → log it → earn tokens (P51) redeemable for real value. A kid-facing scanner ships too.',
    market: 'UK councils spend £1B+/yr on street cleansing; ESG & school budgets rising.',
    status: 'Live · free · 63 cleanups · token economy',
    fits: 'Councils · ESG · schools',
  },
  {
    name: 'ZAPP',
    icon: '⚡',
    accent: '#7c3aed',
    tagline: 'Kids describe an idea — AI builds a real app. No accounts, no risk.',
    problem: 'Kids want to build with tech, but coding is a high barrier; most “kid” tools are locked-down games; parents worry about accounts and AI safety.',
    solution: 'A kid says what they want → a real, playable app in seconds. No accounts (COPPA-safe), device-local, with an honest “AI can be wrong” stamp.',
    market: 'Global EdTech ≈ $100B+; kids’ creative-AI is among the fastest-growing.',
    status: 'Live · free for kids · 10 apps built · 87 plays',
    fits: 'Schools · EdTech distributors',
  },
];

function ProductCard({ p }) {
  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${LINE}`,
      borderLeft: `4px solid ${p.accent}`,
      borderRadius: 14,
      padding: '18px 20px',
      marginBottom: 14,
      breakInside: 'avoid',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 2 }}>
        <span style={{ fontSize: 20 }}>{p.icon}</span>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: INK, margin: 0, letterSpacing: '-0.01em' }}>{p.name}</h3>
      </div>
      <p style={{ fontSize: 12.5, fontWeight: 600, color: p.accent, margin: '0 0 12px' }}>{p.tagline}</p>

      <div style={{ fontSize: 13, lineHeight: 1.55, color: INK_SOFT }}>
        <p style={{ margin: '0 0 7px' }}><span style={{ fontWeight: 800, color: INK_FAINT, fontSize: 9, letterSpacing: '0.12em' }}>PROBLEM — </span>{p.problem}</p>
        <p style={{ margin: '0 0 7px' }}><span style={{ fontWeight: 800, color: INK_FAINT, fontSize: 9, letterSpacing: '0.12em' }}>SOLUTION — </span>{p.solution}</p>
        <p style={{ margin: '0 0 12px' }}><span style={{ fontWeight: 800, color: INK_FAINT, fontSize: 9, letterSpacing: '0.12em' }}>MARKET — </span>{p.market}</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 10.5, fontWeight: 800, color: '#fff', background: INK, borderRadius: 999, padding: '4px 11px', letterSpacing: '0.03em' }}>{p.status}</span>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: p.accent, background: `${p.accent}12`, border: `1px solid ${p.accent}33`, borderRadius: 999, padding: '3px 10px' }}>Fits: {p.fits}</span>
      </div>
    </div>
  );
}

export default function UF51Overview() {
  return (
    <div style={{ background: PAPER, color: INK, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <style>{`@media print { .no-print { display: none !important; } body { background: #fff !important; } }`}</style>

      <div className="no-print" style={{ position: 'sticky', top: 0, zIndex: 10, background: PAPER, borderBottom: `1px solid ${LINE}`, padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: INK_FAINT, letterSpacing: '0.08em' }}>UF51 · PRODUCT OVERVIEW</span>
        <button onClick={() => window.print()} style={{ fontSize: 12, fontWeight: 800, color: '#fff', background: INK, border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', letterSpacing: '0.04em' }}>Save as PDF →</button>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '28px 18px 40px' }}>
        {/* HEADER */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color: INK_FAINT, margin: '0 0 6px', textTransform: 'uppercase' }}>Universal Frequency 51</p>
          <h1 style={{ fontSize: 27, fontWeight: 900, color: INK, margin: '0 0 6px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Four products. One platform.</h1>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: INK_SOFT, margin: 0, maxWidth: 600 }}>
            PetSounds51, SORTED, earth51 and ZAPP — four live products on one privacy-first, AI-powered core. Each solves a real problem for real people, today.
          </p>
        </div>

        {/* PROOF STRIP */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', padding: '11px 15px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12, marginBottom: 22 }}>
          {[['4', 'live products'], ['100+', 'letters decoded'], ['63', 'cleanups'], ['10', 'apps by kids'], ['2', 'on Stripe']].map(([n, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 17, fontWeight: 900, color: INK, letterSpacing: '-0.02em' }}>{n}</span>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: INK_FAINT, letterSpacing: '0.04em' }}>{l}</span>
            </div>
          ))}
        </div>

        {/* PRODUCTS */}
        {PRODUCTS.map(p => <ProductCard key={p.name} p={p} />)}

        {/* THREAD + CLOSE */}
        <div style={{ marginTop: 18, padding: '18px 20px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14 }}>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: INK_SOFT, margin: '0 0 10px' }}>
            <span style={{ fontWeight: 800, color: INK_FAINT, fontSize: 9, letterSpacing: '0.12em' }}>THE THREAD — </span>
            All four share one core: no account needed to start, works on any phone, free tier forever, device-local privacy, open source. Each new product is faster and cheaper to ship than the last.
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: INK_SOFT, margin: 0 }}>
            <span style={{ fontWeight: 800, color: INK_FAINT, fontSize: 9, letterSpacing: '0.12em' }}>WHERE IT IS — </span>
            PetSounds51 and SORTED are live with paid tiers on Stripe. earth51 and ZAPP are live and free, with token-economy and licensing paths opening next. Real usage, honest privacy, built to last.
          </p>
        </div>
      </div>
    </div>
  );
}